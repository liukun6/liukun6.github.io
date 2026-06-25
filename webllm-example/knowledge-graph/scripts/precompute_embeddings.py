#!/usr/bin/env python3
"""One-time offline step: precompute node embeddings for the knowledge-graph demo.

Produces a static JSON file (node-embeddings.json) shipped with the page so the
browser never recomputes node embeddings -- only the user's query embedding at
runtime. The runtime query side uses transformers.js with
'Xenova/paraphrase-MiniLM-L3-v2', which is an ONNX export of the same weights as
the sentence-transformers model used here, with the same mean-pooling +
L2-normalization, so the precomputed node vectors and the runtime query vectors
live in the same space (cosine-similarity ranking is consistent).

Why Python (not Node): onnxruntime-node dropped Intel-macOS (x86_64) native
binaries, so the Node/transformers.js path cannot run on an Intel Mac. PyTorch
ships Intel-mac wheels, so this works locally.

Why a manual downloader: in networks where huggingface.co is blocked, the
hf-mirror.com mirror works for direct file GETs, but newer huggingface_hub
rejects the mirror during its HEAD-metadata validation. So we fetch the minimal
model snapshot ourselves with requests (following redirects to the real CDN) and
then load the model from that local directory with local_files_only=True.

Usage:
    python3 -m venv .venv
    .venv/bin/pip install -r example/knowledge-graph/scripts/requirements.txt
    # HF_ENDPOINT defaults to the hf-mirror.com mirror; override for direct HF:
    #   HF_ENDPOINT=https://huggingface.co .venv/bin/python <this script>
    .venv/bin/python example/knowledge-graph/scripts/precompute_embeddings.py
"""
import json
import os
import subprocess
import sys
from subprocess import CalledProcessError

import requests

GEN_MODEL_ID = "BAAI/bge-small-en-v1.5"
RUNTIME_MODEL_ID = "Xenova/bge-small-en-v1.5"

# Minimal file set needed to load the PyTorch sentence-transformers model.
MODEL_FILES = [
    "config.json",
    "config_sentence_transformers.json",
    "model.safetensors",
    "modules.json",
    "sentence_bert_config.json",
    "special_tokens_map.json",
    "tokenizer.json",
    "tokenizer_config.json",
    "vocab.txt",
    "1_Pooling/config.json",
]

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
GRAPH_DATA_JS = os.path.join(SCRIPT_DIR, "..", "graph-data.js")
OUT_PATH = os.path.join(SCRIPT_DIR, "..", "node-embeddings.json")
MODEL_DIR = os.path.join(REPO_ROOT, ".hf_models", "bge-small-en-v1.5")

HF_ENDPOINT = os.environ.get("HF_ENDPOINT", "https://hf-mirror.com").rstrip("/")


def ensure_model():
    """Download the minimal model snapshot to MODEL_DIR if not already present."""
    session = requests.Session()
    for rel in MODEL_FILES:
        dest = os.path.join(MODEL_DIR, rel)
        if os.path.exists(dest) and os.path.getsize(dest) > 0:
            continue
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        url = f"{HF_ENDPOINT}/{GEN_MODEL_ID}/resolve/main/{rel}"
        print(f"downloading {rel} ...")
        resp = session.get(url, timeout=120, allow_redirects=True)
        resp.raise_for_status()
        tmp_dest = dest + ".tmp"
        with open(tmp_dest, "wb") as f:
            f.write(resp.content)
        os.replace(tmp_dest, dest)
    print(f"model ready at {MODEL_DIR}")


def load_nodes():
    """Read NODES from graph-data.js (single source of truth) via Node.

    Node only parses the ES module here -- no native bindings involved -- so this
    is safe on platforms where onnxruntime-node has no binary.
    """
    script = (
        "import('file://' + process.argv[1])"
        ".then(m => process.stdout.write(JSON.stringify(m.NODES)))"
        ".catch(e => { console.error(e); process.exit(1); })"
    )
    try:
        out = subprocess.run(
            ["node", "--input-type=module", "-e", script, os.path.abspath(GRAPH_DATA_JS)],
            capture_output=True, text=True, check=True,
        )
    except CalledProcessError as e:
        sys.exit(f"Failed to read NODES from graph-data.js via node:\n{e.stderr}")
    return json.loads(out.stdout)


def main():
    ensure_model()
    # MODEL_DIR is a local path, so loading must not touch the network.
    os.environ.setdefault("HF_HUB_OFFLINE", "1")
    os.environ.setdefault("TRANSFORMERS_OFFLINE", "1")
    # Import after ensuring the model so a missing dep error surfaces clearly.
    from sentence_transformers import SentenceTransformer

    nodes = load_nodes()
    if not nodes:
        sys.exit("No nodes found in graph-data.js")

    model = SentenceTransformer(MODEL_DIR)

    vectors = {}
    dim = 0
    for node in nodes:
        text = f"{node['title']}. {node['summary']}"
        vec = model.encode(text, normalize_embeddings=True)
        dim = len(vec)
        vectors[node["id"]] = [round(float(x), 6) for x in vec]
        print(f"embedded {node['id']} (dim={dim})")

    payload = {
        "model": RUNTIME_MODEL_ID,
        "generatedBy": f"{GEN_MODEL_ID} (PyTorch / sentence-transformers)",
        "dim": dim,
        "vectors": vectors,
    }
    tmp_out_path = OUT_PATH + ".tmp"
    with open(tmp_out_path, "w") as f:
        json.dump(payload, f, indent=2)
    os.replace(tmp_out_path, OUT_PATH)
    print(f"wrote {os.path.abspath(OUT_PATH)} ({len(vectors)} nodes, dim={dim})")


if __name__ == "__main__":
    main()
