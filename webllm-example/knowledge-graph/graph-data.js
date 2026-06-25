// Hand-authored concept graph: WebGPU/graphics rendering + general ML algorithms +
// LLM architecture/inference + agentic AI. Node ids are referenced by EDGES and by the
// offline embedding precompute script — keep ids stable once `node-embeddings.json` has
// been generated (Task 3); after adding/removing nodes, re-run that script.
export const NODES = [
  // --- graphics / WebGPU ---
  {
    id: 'gpu-device',
    title: 'GPUDevice',
    category: 'graphics',
    summary: 'The logical WebGPU device: owns buffers, pipelines, and the command queue shared by compute and '
      + 'render work.',
  },
  {
    id: 'command-encoder',
    title: 'Command Encoder',
    category: 'graphics',
    summary: 'Records compute and render passes into a command buffer; passes execute in submission order with no '
      + 'manual sync needed.',
  },
  {
    id: 'compute-pass',
    title: 'Compute Pass',
    category: 'graphics',
    summary: 'A sequence of compute pipeline dispatches; each dispatch runs a WGSL kernel over a 3D grid of '
      + 'workgroups.',
  },
  {
    id: 'render-pass',
    title: 'Render Pass',
    category: 'graphics',
    summary: 'Draws vertex/fragment pipelines into a color/depth attachment; can read textures written by an '
      + 'earlier compute pass.',
  },
  {
    id: 'wgsl',
    title: 'WGSL',
    category: 'graphics',
    summary: 'WebGPU Shading Language: the shader language for both compute and render pipelines, compiled by the '
      + 'browser/driver.',
  },
  {
    id: 'storage-buffer',
    title: 'Storage Buffer',
    category: 'graphics',
    summary: 'A GPUBuffer bound as `storage` so a shader can read and write arbitrary-length arrays, e.g. weights '
      + 'or particle positions.',
  },
  {
    id: 'storage-texture',
    title: 'Storage Texture',
    category: 'graphics',
    summary: 'A texture a compute shader can write directly; a render pass can then sample it, enabling '
      + 'compute-writes-render-reads pipelines.',
  },
  {
    id: 'workgroup',
    title: 'Workgroup',
    category: 'graphics',
    summary: 'A group of GPU threads that can share `workgroup` memory and synchronize with workgroupBarrier(), the '
      + 'unit of local reduction.',
  },
  {
    id: 'gpu-scheduling',
    title: 'GPU Command Scheduling',
    category: 'graphics',
    summary: 'Submitted command buffers execute roughly in order on one queue; a long compute pass can stall a '
      + 'render pass in the same frame.',
  },
  {
    id: 'async-readback',
    title: 'Async Buffer Readback',
    category: 'graphics',
    summary: 'Reading a GPU buffer back to JS requires mapAsync; double-buffering avoids blocking the render loop '
      + 'while waiting.',
  },
  {
    id: 'instanced-rendering',
    title: 'Instanced Rendering',
    category: 'graphics',
    summary: 'Drawing many copies of one mesh (e.g. graph nodes) in a single draw call, each with its own '
      + 'transform/color.',
  },
  {
    id: 'orbit-camera',
    title: 'Orbit Camera',
    category: 'graphics',
    summary: 'A camera that rotates around a fixed target point, the standard interaction model for inspecting a 3D '
      + 'scene.',
  },

  // --- general ML / algorithms ---
  {
    id: 'force-directed-layout',
    title: 'Force-Directed Layout',
    category: 'algorithm',
    summary: 'An N-body-style simulation where connected nodes attract and all nodes repel, converging graph '
      + 'topology into 3D positions.',
  },
  {
    id: 'autodiff',
    title: 'Automatic Differentiation',
    category: 'algorithm',
    summary: 'Computing exact gradients by propagating derivatives backward through the chain rule over a '
      + 'computation graph.',
  },
  {
    id: 'backpropagation',
    title: 'Backpropagation',
    category: 'algorithm',
    summary: 'Applying automatic differentiation specifically to neural network layers, computing gradients layer '
      + 'by layer from output to input.',
  },
  {
    id: 'gradient-descent',
    title: 'Gradient Descent',
    category: 'algorithm',
    summary: 'Updating parameters by subtracting a learning-rate-scaled gradient, the core loop of neural network '
      + 'training.',
  },
  {
    id: 'softmax',
    title: 'Softmax',
    category: 'algorithm',
    summary: 'Converts a vector of scores into a probability distribution; numerically stable implementations '
      + 'subtract the row max first.',
  },
  {
    id: 'loss-function',
    title: 'Loss Function',
    category: 'algorithm',
    summary: 'A scalar measuring prediction error; its gradient with respect to parameters drives every training '
      + 'update.',
  },
  {
    id: 'cross-entropy-loss',
    title: 'Cross-Entropy Loss',
    category: 'algorithm',
    summary: 'The standard loss for next-token prediction: penalizes low probability mass on the correct token.',
  },
  {
    id: 'regularization',
    title: 'Regularization',
    category: 'algorithm',
    summary: 'Techniques that discourage overfitting by penalizing model complexity or adding noise during '
      + 'training.',
  },
  {
    id: 'dropout',
    title: 'Dropout',
    category: 'algorithm',
    summary: 'Randomly zeroing activations during training so the network cannot rely on any single unit, '
      + 'improving generalization.',
  },
  {
    id: 'batch-normalization',
    title: 'Batch/Layer Normalization',
    category: 'algorithm',
    summary: 'Rescaling activations to stable mean/variance mid-network, which speeds up and stabilizes training.',
  },
  {
    id: 'overfitting',
    title: 'Overfitting',
    category: 'algorithm',
    summary: 'A model memorizing training data patterns that do not generalize, visible as a gap between train and '
      + 'validation loss.',
  },
  {
    id: 'cosine-similarity',
    title: 'Cosine Similarity',
    category: 'algorithm',
    summary: 'The cosine of the angle between two vectors; ignores magnitude, used to compare embeddings by '
      + 'direction alone.',
  },
  {
    id: 'nearest-neighbor-search',
    title: 'Nearest-Neighbor Search',
    category: 'algorithm',
    summary: 'Finding the vector(s) in a collection closest to a query vector under some distance metric.',
  },
  {
    id: 'approximate-nearest-neighbor',
    title: 'Approximate Nearest Neighbor',
    category: 'algorithm',
    summary: 'Trading a small amount of recall for large speedups when searching millions of vectors, e.g. via '
      + 'HNSW graphs.',
  },
  {
    id: 'clustering',
    title: 'Clustering',
    category: 'algorithm',
    summary: 'Grouping data points by similarity without labels; k-means is the canonical example.',
  },
  {
    id: 'dimensionality-reduction',
    title: 'Dimensionality Reduction',
    category: 'algorithm',
    summary: 'Projecting high-dimensional vectors (e.g. 384-d embeddings) into fewer dimensions for visualization '
      + 'or efficiency.',
  },
  {
    id: 'reinforcement-learning',
    title: 'Reinforcement Learning',
    category: 'algorithm',
    summary: 'Learning a policy that maximizes cumulative reward through trial-and-error interaction with an '
      + 'environment.',
  },
  {
    id: 'markov-decision-process',
    title: 'Markov Decision Process',
    category: 'algorithm',
    summary: 'The formalism behind RL: states, actions, transition probabilities, and rewards, with the Markov '
      + 'property that only the current state matters.',
  },
  {
    id: 'policy-gradient',
    title: 'Policy Gradient',
    category: 'algorithm',
    summary: 'Directly optimizing a policy\'s parameters by ascending the gradient of expected reward.',
  },
  {
    id: 'value-function',
    title: 'Value Function',
    category: 'algorithm',
    summary: 'Estimates expected future reward from a state, used to reduce variance in policy-gradient updates.',
  },
  {
    id: 'exploration-exploitation',
    title: 'Exploration vs. Exploitation',
    category: 'algorithm',
    summary: 'The core RL tradeoff between trying new actions to learn more and choosing the best-known action so '
      + 'far.',
  },
  {
    id: 'monte-carlo-tree-search',
    title: 'Monte Carlo Tree Search',
    category: 'algorithm',
    summary: 'Building a search tree by sampling random rollouts, used to plan moves without exhaustively exploring '
      + 'every branch.',
  },

  // --- LLM architecture, training, and inference ---
  {
    id: 'transformer',
    title: 'Transformer',
    category: 'llm',
    summary: 'A neural network architecture built from self-attention and feed-forward blocks, the basis of modern '
      + 'LLMs.',
  },
  {
    id: 'attention',
    title: 'Self-Attention',
    category: 'llm',
    summary: 'Each token computes a weighted sum over all other tokens using query/key/value projections, deciding '
      + 'what to "look at".',
  },
  {
    id: 'multi-head-attention',
    title: 'Multi-Head Attention',
    category: 'llm',
    summary: 'Running several attention computations in parallel on different learned projections, then '
      + 'concatenating the results.',
  },
  {
    id: 'cross-attention',
    title: 'Cross-Attention',
    category: 'llm',
    summary: 'Attention where queries come from one sequence and keys/values from another, e.g. decoder attending '
      + 'to an encoder.',
  },
  {
    id: 'causal-masking',
    title: 'Causal Masking',
    category: 'llm',
    summary: 'Blocking attention to future tokens during training/generation so each position only sees the past.',
  },
  {
    id: 'flash-attention',
    title: 'FlashAttention',
    category: 'llm',
    summary: 'A fused, tiled attention kernel that avoids materializing the full attention matrix, cutting memory '
      + 'traffic and runtime.',
  },
  {
    id: 'sparse-attention',
    title: 'Sparse Attention',
    category: 'llm',
    summary: 'Restricting each token to attend to a subset of others (not all), trading some context for '
      + 'sub-quadratic cost.',
  },
  {
    id: 'sliding-window-attention',
    title: 'Sliding-Window Attention',
    category: 'llm',
    summary: 'Each token attends only to a fixed-size window of recent tokens, bounding compute as sequence length '
      + 'grows.',
  },
  {
    id: 'mixture-of-experts',
    title: 'Mixture of Experts',
    category: 'llm',
    summary: 'Routing each token to a small subset of specialized feed-forward "expert" sub-networks instead of one '
      + 'dense block.',
  },
  {
    id: 'grouped-query-attention',
    title: 'Grouped-Query Attention',
    category: 'llm',
    summary: 'Sharing key/value projections across groups of attention heads to shrink the KV cache with minimal '
      + 'quality loss.',
  },
  {
    id: 'multi-query-attention',
    title: 'Multi-Query Attention',
    category: 'llm',
    summary: 'An extreme case of grouped-query attention: all heads share one key/value projection, minimizing KV '
      + 'cache size.',
  },
  {
    id: 'positional-encoding',
    title: 'Positional Encoding',
    category: 'llm',
    summary: 'Injecting token order information into a transformer, which otherwise treats input as an unordered '
      + 'set.',
  },
  {
    id: 'rotary-embeddings',
    title: 'Rotary Position Embeddings (RoPE)',
    category: 'llm',
    summary: 'Encoding position by rotating query/key vectors in pairs of dimensions, so attention scores depend on '
      + 'relative position.',
  },
  {
    id: 'rope-scaling',
    title: 'RoPE Scaling',
    category: 'llm',
    summary: 'Stretching or interpolating rotary frequencies to extend a model past its trained context length.',
  },
  {
    id: 'context-window',
    title: 'Context Window',
    category: 'llm',
    summary: 'The maximum number of tokens a model can attend to at once; exceeding it truncates or degrades '
      + 'output.',
  },
  {
    id: 'layer-normalization',
    title: 'Layer Normalization',
    category: 'llm',
    summary: 'Normalizing activations across the feature dimension within each transformer block to stabilize deep '
      + 'training.',
  },
  {
    id: 'rms-norm',
    title: 'RMSNorm',
    category: 'llm',
    summary: 'A simplified layer norm that rescales by root-mean-square only (no mean-centering), cheaper and used '
      + 'in most modern LLMs.',
  },
  {
    id: 'feed-forward-network',
    title: 'Feed-Forward Network',
    category: 'llm',
    summary: 'The per-token MLP block inside each transformer layer, applied identically and independently to every '
      + 'position.',
  },
  {
    id: 'kv-cache',
    title: 'KV Cache',
    category: 'llm',
    summary: 'Storing previously computed key/value vectors during generation avoids recomputing them for '
      + 'already-seen tokens.',
  },
  {
    id: 'paged-attention',
    title: 'PagedAttention',
    category: 'llm',
    summary: 'Managing the KV cache in fixed-size pages (like OS virtual memory) so many sequences can share GPU '
      + 'memory without fragmentation.',
  },
  {
    id: 'continuous-batching',
    title: 'Continuous Batching',
    category: 'llm',
    summary: 'Dynamically adding/removing sequences from an in-flight batch as they finish, keeping GPU utilization '
      + 'high under real traffic.',
  },
  {
    id: 'batch-inference',
    title: 'Batch Inference',
    category: 'llm',
    summary: 'Processing multiple sequences together so matrix multiplies amortize fixed overhead across more '
      + 'tokens per pass.',
  },
  {
    id: 'speculative-decoding',
    title: 'Speculative Decoding',
    category: 'llm',
    summary: 'A small draft model proposes several tokens ahead; the full model verifies them in one pass, '
      + 'skipping accepted tokens.',
  },
  {
    id: 'beam-search',
    title: 'Beam Search',
    category: 'llm',
    summary: 'Keeping the top-k highest-probability partial sequences at each step instead of just one, trading '
      + 'compute for better output.',
  },
  {
    id: 'greedy-decoding',
    title: 'Greedy Decoding',
    category: 'llm',
    summary: 'Always picking the single highest-probability next token; fast and deterministic but prone to '
      + 'repetitive output.',
  },
  {
    id: 'temperature-sampling',
    title: 'Temperature Sampling',
    category: 'llm',
    summary: 'Scaling logits before softmax to flatten (more random) or sharpen (more deterministic) the next-token '
      + 'distribution.',
  },
  {
    id: 'top-k-sampling',
    title: 'Top-k Sampling',
    category: 'llm',
    summary: 'Restricting sampling to the k highest-probability tokens, discarding the long unreliable tail.',
  },
  {
    id: 'top-p-sampling',
    title: 'Top-p (Nucleus) Sampling',
    category: 'llm',
    summary: 'Sampling from the smallest set of tokens whose cumulative probability exceeds p, adapting the cutoff '
      + 'to how confident the model is.',
  },
  {
    id: 'repetition-penalty',
    title: 'Repetition Penalty',
    category: 'llm',
    summary: 'Down-weighting tokens that already appeared, a heuristic fix for greedy/low-temperature decoding loops.',
  },
  {
    id: 'quantization',
    title: 'Quantization',
    category: 'llm',
    summary: 'Storing model weights in fewer bits (e.g. int4/int8) to shrink download size and memory, at some cost '
      + 'to precision.',
  },
  {
    id: 'gguf-format',
    title: 'GGUF Format',
    category: 'llm',
    summary: 'A single-file model format (used by llama.cpp) bundling quantized weights, tokenizer, and metadata '
      + 'for portable local inference.',
  },
  {
    id: 'onnx-runtime',
    title: 'ONNX Runtime',
    category: 'llm',
    summary: 'A cross-platform inference engine for the ONNX graph format; transformers.js runs ONNX models in the '
      + 'browser via WebAssembly/WebGPU.',
  },
  {
    id: 'model-export',
    title: 'Model Export',
    category: 'llm',
    summary: 'Converting a trained model from its training framework (e.g. PyTorch) into a portable inference '
      + 'format like ONNX or GGUF.',
  },
  {
    id: 'safetensors',
    title: 'Safetensors',
    category: 'llm',
    summary: 'A weights file format storing only raw tensors with a JSON header, avoiding the arbitrary-code-'
      + 'execution risk of Python pickle files.',
  },
  {
    id: 'model-parallelism',
    title: 'Model Parallelism',
    category: 'llm',
    summary: 'Splitting a single model\'s layers or tensors across multiple devices when it doesn\'t fit on one.',
  },
  {
    id: 'tensor-parallelism',
    title: 'Tensor Parallelism',
    category: 'llm',
    summary: 'Splitting individual weight matrices across devices, requiring communication within each layer\'s '
      + 'forward/backward pass.',
  },
  {
    id: 'pipeline-parallelism',
    title: 'Pipeline Parallelism',
    category: 'llm',
    summary: 'Assigning different transformer layers to different devices and streaming micro-batches through them '
      + 'like an assembly line.',
  },
  {
    id: 'data-parallelism',
    title: 'Data Parallelism',
    category: 'llm',
    summary: 'Replicating the whole model across devices, each processing a different data shard, then averaging '
      + 'gradients.',
  },
  {
    id: 'mixed-precision-training',
    title: 'Mixed-Precision Training',
    category: 'llm',
    summary: 'Using fp16/bf16 for most computation while keeping select values in fp32, for speed without losing '
      + 'training stability.',
  },
  {
    id: 'gradient-checkpointing',
    title: 'Gradient Checkpointing',
    category: 'llm',
    summary: 'Discarding intermediate activations and recomputing them during backprop, trading compute for the '
      + 'memory needed to train larger models.',
  },
  {
    id: 'lora',
    title: 'LoRA',
    category: 'llm',
    summary: 'Fine-tuning by adding small trainable low-rank matrices alongside frozen weights, cutting trainable '
      + 'parameters by orders of magnitude.',
  },
  {
    id: 'qlora',
    title: 'QLoRA',
    category: 'llm',
    summary: 'Combining LoRA fine-tuning with a quantized (e.g. 4-bit) frozen base model, enabling fine-tuning on '
      + 'much smaller GPUs.',
  },
  {
    id: 'peft',
    title: 'Parameter-Efficient Fine-Tuning',
    category: 'llm',
    summary: 'A family of techniques (LoRA, adapters, prompt tuning) that fine-tune a small fraction of parameters '
      + 'instead of the whole model.',
  },
  {
    id: 'pretraining',
    title: 'Pretraining',
    category: 'llm',
    summary: 'Training a model from scratch on a large, broad corpus with a generic objective like next-token '
      + 'prediction.',
  },
  {
    id: 'fine-tuning',
    title: 'Fine-Tuning',
    category: 'llm',
    summary: 'Further training a pretrained model on a smaller, task-specific dataset to specialize its behavior.',
  },
  {
    id: 'instruction-tuning',
    title: 'Instruction Tuning',
    category: 'llm',
    summary: 'Fine-tuning on (instruction, response) pairs so a base model learns to follow natural-language '
      + 'commands rather than just continue text.',
  },
  {
    id: 'rlhf',
    title: 'RLHF',
    category: 'llm',
    summary: 'Reinforcement Learning from Human Feedback: using human preference comparisons to train a reward '
      + 'model, then optimizing the LLM against it.',
  },
  {
    id: 'dpo',
    title: 'Direct Preference Optimization',
    category: 'llm',
    summary: 'Optimizing directly on human preference pairs with a closed-form loss, skipping RLHF\'s separate '
      + 'reward model and RL loop.',
  },
  {
    id: 'reward-model',
    title: 'Reward Model',
    category: 'llm',
    summary: 'A model trained to score outputs by predicted human preference, used as the optimization signal in '
      + 'RLHF.',
  },
  {
    id: 'constitutional-ai',
    title: 'Constitutional AI',
    category: 'llm',
    summary: 'Having a model critique and revise its own outputs against a written set of principles, reducing '
      + 'reliance on human-labeled feedback.',
  },
  {
    id: 'chain-of-thought',
    title: 'Chain-of-Thought Prompting',
    category: 'llm',
    summary: 'Prompting a model to write out intermediate reasoning steps before its final answer, often improving '
      + 'accuracy on multi-step problems.',
  },
  {
    id: 'few-shot-prompting',
    title: 'Few-Shot Prompting',
    category: 'llm',
    summary: 'Including a handful of example input/output pairs in the prompt so the model infers the task pattern.',
  },
  {
    id: 'zero-shot-prompting',
    title: 'Zero-Shot Prompting',
    category: 'llm',
    summary: 'Asking a model to perform a task with instructions alone, no examples, relying on what it learned '
      + 'during pretraining/tuning.',
  },
  {
    id: 'in-context-learning',
    title: 'In-Context Learning',
    category: 'llm',
    summary: 'A model adapting its behavior based purely on patterns in the current prompt, without any weight '
      + 'updates.',
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    category: 'llm',
    summary: 'Iteratively designing prompt wording and structure to reliably elicit a desired model behavior.',
  },
  {
    id: 'system-prompt',
    title: 'System Prompt',
    category: 'llm',
    summary: 'A privileged instruction block set by the application (not the end user) that frames the model\'s '
      + 'role and constraints for the whole conversation.',
  },
  {
    id: 'hallucination',
    title: 'Hallucination',
    category: 'llm',
    summary: 'A model generating fluent but factually false or unsupported content, a fundamental risk of '
      + 'next-token-prediction objectives.',
  },
  {
    id: 'perplexity',
    title: 'Perplexity',
    category: 'llm',
    summary: 'An exponentiated average negative log-likelihood; lower perplexity means the model assigned higher '
      + 'probability to the actual text.',
  },
  {
    id: 'distillation',
    title: 'Knowledge Distillation',
    category: 'llm',
    summary: 'Training a smaller "student" model to mimic a larger "teacher" model\'s output distribution, '
      + 'compressing capability into fewer parameters.',
  },
  {
    id: 'scaling-laws',
    title: 'Scaling Laws',
    category: 'llm',
    summary: 'Empirical power-law relationships between model size, data size, compute, and loss, used to predict '
      + 'performance before training.',
  },
  {
    id: 'emergent-abilities',
    title: 'Emergent Abilities',
    category: 'llm',
    summary: 'Capabilities (e.g. multi-step arithmetic) that appear abruptly past a model-scale threshold rather '
      + 'than improving smoothly.',
  },
  {
    id: 'byte-pair-encoding',
    title: 'Byte-Pair Encoding',
    category: 'llm',
    summary: 'A tokenizer training algorithm that iteratively merges the most frequent adjacent symbol pair into a '
      + 'new token.',
  },
  {
    id: 'sentencepiece',
    title: 'SentencePiece',
    category: 'llm',
    summary: 'A language-agnostic tokenizer library that treats text as a raw character stream, avoiding '
      + 'whitespace-based pre-tokenization assumptions.',
  },
  {
    id: 'wordpiece',
    title: 'WordPiece',
    category: 'llm',
    summary: 'A subword tokenization scheme (used by BERT) that merges symbol pairs to maximize training-data '
      + 'likelihood rather than raw frequency.',
  },
  {
    id: 'vocabulary-size',
    title: 'Vocabulary Size',
    category: 'llm',
    summary: 'The number of distinct tokens a model can emit; larger vocabularies shorten sequences but enlarge the '
      + 'embedding and output layers.',
  },
  {
    id: 'embedding-layer',
    title: 'Embedding Layer',
    category: 'llm',
    summary: 'A lookup table mapping each token id to a learned dense vector, the first layer of every transformer.',
  },
  {
    id: 'tokenization',
    title: 'Tokenization',
    category: 'llm',
    summary: 'Splitting text into subword units (tokens) a model operates on; byte-pair encoding is the dominant '
      + 'scheme.',
  },
  {
    id: 'embedding-similarity',
    title: 'Embedding Similarity',
    category: 'llm',
    summary: 'Mapping text to a vector and comparing vectors by cosine similarity to find semantically related '
      + 'content, deterministically.',
  },
  {
    id: 'vector-database',
    title: 'Vector Database',
    category: 'llm',
    summary: 'A datastore optimized for storing embeddings and answering nearest-neighbor queries at scale.',
  },
  {
    id: 'semantic-search',
    title: 'Semantic Search',
    category: 'llm',
    summary: 'Retrieving results by embedding similarity rather than exact keyword match, surfacing meaning-related '
      + 'content even with different wording.',
  },
  {
    id: 'reranking',
    title: 'Reranking',
    category: 'llm',
    summary: 'Re-scoring an initial set of retrieved candidates with a more accurate (often slower) model before '
      + 'returning the final top results.',
  },
  {
    id: 'retrieval-augmented-generation',
    title: 'Retrieval-Augmented Generation',
    category: 'llm',
    summary: 'Fetching relevant external text at query time and inserting it into the prompt, grounding generation '
      + 'in facts beyond the model\'s training data.',
  },
  {
    id: 'chunking',
    title: 'Chunking',
    category: 'llm',
    summary: 'Splitting long documents into smaller overlapping pieces before embedding, since both context windows '
      + 'and retrieval precision favor smaller units.',
  },
  {
    id: 'small-model-tradeoffs',
    title: 'Small-Model Tradeoffs',
    category: 'llm',
    summary: 'Sub-200M-parameter models follow instructions and reason far less reliably than larger ones; offload '
      + 'decisions to deterministic code where possible.',
  },

  // --- agentic AI ---
  {
    id: 'ai-agent',
    title: 'AI Agent',
    category: 'agent',
    summary: 'A system that uses an LLM to decide actions in a loop, observing results and adapting, rather than '
      + 'producing one-shot output.',
  },
  {
    id: 'react-pattern',
    title: 'ReAct (Reason + Act)',
    category: 'agent',
    summary: 'An agent pattern that interleaves explicit reasoning text with tool-call actions, using each '
      + 'observation to inform the next reasoning step.',
  },
  {
    id: 'tool-use',
    title: 'Tool Use',
    category: 'agent',
    summary: 'Letting a model invoke external functions (search, calculators, APIs) instead of relying solely on '
      + 'its own generated text.',
  },
  {
    id: 'function-calling',
    title: 'Function Calling',
    category: 'agent',
    summary: 'A model trained to emit structured arguments matching a declared function schema, which the host '
      + 'application then executes.',
  },
  {
    id: 'tool-calling-schema',
    title: 'Tool-Calling Schema',
    category: 'agent',
    summary: 'A machine-readable description (name, parameters, types) of an available tool, given to the model so '
      + 'it can format calls correctly.',
  },
  {
    id: 'planning',
    title: 'Planning',
    category: 'agent',
    summary: 'Generating an ordered sequence of intended actions toward a goal before (or while) executing them.',
  },
  {
    id: 'task-decomposition',
    title: 'Task Decomposition',
    category: 'agent',
    summary: 'Breaking one large, ambiguous goal into smaller, more tractable subtasks an agent can tackle one at a '
      + 'time.',
  },
  {
    id: 'hierarchical-planning',
    title: 'Hierarchical Planning',
    category: 'agent',
    summary: 'Planning at multiple levels of abstraction, where high-level steps are themselves expanded into '
      + 'detailed sub-plans only when reached.',
  },
  {
    id: 'goal-decomposition',
    title: 'Goal Decomposition',
    category: 'agent',
    summary: 'Splitting a high-level objective into concrete, independently verifiable subgoals.',
  },
  {
    id: 'subgoal',
    title: 'Subgoal',
    category: 'agent',
    summary: 'An intermediate objective whose completion is a prerequisite (but not the end) of the agent\'s overall '
      + 'task.',
  },
  {
    id: 'agent-memory',
    title: 'Agent Memory',
    category: 'agent',
    summary: 'State an agent persists across steps or sessions beyond what fits in a single prompt\'s context '
      + 'window.',
  },
  {
    id: 'short-term-memory',
    title: 'Short-Term Memory',
    category: 'agent',
    summary: 'The agent\'s working context for the current task — typically just the active conversation/scratchpad '
      + 'in the prompt.',
  },
  {
    id: 'long-term-memory',
    title: 'Long-Term Memory',
    category: 'agent',
    summary: 'Information persisted outside the prompt (e.g. in a vector database) and retrieved into context only '
      + 'when relevant.',
  },
  {
    id: 'episodic-memory',
    title: 'Episodic Memory',
    category: 'agent',
    summary: 'Records of specific past events or interactions an agent can recall, as opposed to general learned '
      + 'knowledge.',
  },
  {
    id: 'working-memory',
    title: 'Working Memory',
    category: 'agent',
    summary: 'The limited, actively-used slice of information an agent reasons over at a given step — bounded by '
      + 'the context window.',
  },
  {
    id: 'multi-agent-system',
    title: 'Multi-Agent System',
    category: 'agent',
    summary: 'Multiple specialized agents collaborating (or competing), each handling a sub-part of a larger task.',
  },
  {
    id: 'agent-orchestration',
    title: 'Agent Orchestration',
    category: 'agent',
    summary: 'A controller that routes tasks among multiple agents, manages turn-taking, and aggregates their '
      + 'results.',
  },
  {
    id: 'agent-communication',
    title: 'Agent Communication',
    category: 'agent',
    summary: 'The protocol or message format multiple agents use to exchange context, requests, and results.',
  },
  {
    id: 'blackboard-architecture',
    title: 'Blackboard Architecture',
    category: 'agent',
    summary: 'A shared workspace multiple agents read from and write to, coordinating indirectly through common '
      + 'state rather than direct messages.',
  },
  {
    id: 'self-reflection',
    title: 'Self-Reflection',
    category: 'agent',
    summary: 'An agent reviewing its own prior output or reasoning trace to identify mistakes before continuing or '
      + 'finalizing.',
  },
  {
    id: 'self-critique',
    title: 'Self-Critique',
    category: 'agent',
    summary: 'Prompting a model to evaluate its own answer against stated criteria, often as a separate pass before '
      + 'producing a revised answer.',
  },
  {
    id: 'self-consistency',
    title: 'Self-Consistency',
    category: 'agent',
    summary: 'Sampling several independent reasoning paths for the same problem and taking the most common final '
      + 'answer.',
  },
  {
    id: 'tree-of-thought',
    title: 'Tree of Thought',
    category: 'agent',
    summary: 'Exploring multiple branching reasoning paths and backtracking from dead ends, rather than committing '
      + 'to one linear chain of thought.',
  },
  {
    id: 'graph-of-thought',
    title: 'Graph of Thought',
    category: 'agent',
    summary: 'Generalizing tree-of-thought reasoning to a graph, allowing branches to merge and reuse shared '
      + 'intermediate conclusions.',
  },
  {
    id: 'autonomous-agent',
    title: 'Autonomous Agent',
    category: 'agent',
    summary: 'An agent that pursues a goal over many steps with minimal human intervention between them.',
  },
  {
    id: 'agentic-workflow',
    title: 'Agentic Workflow',
    category: 'agent',
    summary: 'A multi-step process where an LLM\'s outputs determine control flow (which step runs next), instead '
      + 'of a fixed predetermined sequence.',
  },
  {
    id: 'agent-loop',
    title: 'Agent Loop',
    category: 'agent',
    summary: 'The repeating cycle of observe, reason, act, and update state that drives an agent forward until its '
      + 'goal is met or it gives up.',
  },
  {
    id: 'observation-action-cycle',
    title: 'Observation-Action Cycle',
    category: 'agent',
    summary: 'The basic unit of agent execution: perceive the current environment state, choose an action, then '
      + 'perceive the resulting new state.',
  },
  {
    id: 'environment-interaction',
    title: 'Environment Interaction',
    category: 'agent',
    summary: 'The interface through which an agent\'s actions affect, and observations come from, the outside '
      + 'world (a filesystem, browser, API, etc).',
  },
  {
    id: 'sandboxing',
    title: 'Sandboxing',
    category: 'agent',
    summary: 'Running agent-executed code or actions in an isolated environment so mistakes or malicious output '
      + 'can\'t affect the host system.',
  },
  {
    id: 'code-execution-tool',
    title: 'Code Execution Tool',
    category: 'agent',
    summary: 'A tool letting an agent run generated code and read back stdout/errors, offloading exact computation '
      + 'the model itself does unreliably.',
  },
  {
    id: 'web-browsing-tool',
    title: 'Web Browsing Tool',
    category: 'agent',
    summary: 'A tool that lets an agent fetch and read live web pages, extending its knowledge past its training '
      + 'cutoff.',
  },
  {
    id: 'retrieval-tool',
    title: 'Retrieval Tool',
    category: 'agent',
    summary: 'A tool an agent calls to fetch relevant documents or facts on demand, the agentic counterpart to '
      + 'retrieval-augmented generation.',
  },
  {
    id: 'api-calling',
    title: 'API Calling',
    category: 'agent',
    summary: 'An agent invoking external web services as tools, e.g. to send an email or query a database.',
  },
  {
    id: 'structured-output',
    title: 'Structured Output',
    category: 'agent',
    summary: 'Constraining a model\'s generation to a fixed schema (e.g. JSON), so downstream code can parse it '
      + 'reliably.',
  },
  {
    id: 'json-mode',
    title: 'JSON Mode',
    category: 'agent',
    summary: 'An inference-time constraint that forces every generated token to keep the output valid JSON, often '
      + 'via grammar-constrained decoding.',
  },
  {
    id: 'guardrails',
    title: 'Guardrails',
    category: 'agent',
    summary: 'Validation layers (input filters, output checkers, action allow-lists) that catch unsafe or invalid '
      + 'agent behavior before it takes effect.',
  },
  {
    id: 'prompt-injection',
    title: 'Prompt Injection',
    category: 'agent',
    summary: 'Untrusted content (a web page, a tool result) containing instructions that hijack an agent into '
      + 'unintended behavior.',
  },
  {
    id: 'jailbreaking',
    title: 'Jailbreaking',
    category: 'agent',
    summary: 'Crafting prompts specifically designed to bypass a model\'s safety training or stated constraints.',
  },
  {
    id: 'agent-evaluation',
    title: 'Agent Evaluation',
    category: 'agent',
    summary: 'Measuring whether an agent actually completes multi-step tasks correctly, as opposed to evaluating a '
      + 'single model response in isolation.',
  },
  {
    id: 'benchmarking-agents',
    title: 'Benchmarking Agents',
    category: 'agent',
    summary: 'Standardized task suites (e.g. browsing, coding, tool-use tasks) used to compare agent frameworks and '
      + 'models on success rate, not just text quality.',
  },
  {
    id: 'human-in-the-loop',
    title: 'Human-in-the-Loop',
    category: 'agent',
    summary: 'Requiring explicit human approval before an agent executes a consequential or irreversible action.',
  },
  {
    id: 'agent-state-machine',
    title: 'Agent State Machine',
    category: 'agent',
    summary: 'Modeling an agent\'s workflow as explicit states and transitions, making its control flow auditable '
      + 'and constrained rather than fully free-form.',
  },
];

export const EDGES = [
  // graphics
  { from: 'gpu-device', to: 'command-encoder', relation: 'creates' },
  { from: 'command-encoder', to: 'compute-pass', relation: 'records' },
  { from: 'command-encoder', to: 'render-pass', relation: 'records' },
  { from: 'compute-pass', to: 'wgsl', relation: 'runs' },
  { from: 'render-pass', to: 'wgsl', relation: 'runs' },
  { from: 'compute-pass', to: 'storage-buffer', relation: 'reads/writes' },
  { from: 'compute-pass', to: 'storage-texture', relation: 'writes' },
  { from: 'render-pass', to: 'storage-texture', relation: 'samples' },
  { from: 'compute-pass', to: 'workgroup', relation: 'organizes threads into' },
  { from: 'workgroup', to: 'softmax', relation: 'used for reduction in' },
  { from: 'gpu-device', to: 'gpu-scheduling', relation: 'subject to' },
  { from: 'gpu-scheduling', to: 'async-readback', relation: 'motivates' },
  { from: 'async-readback', to: 'storage-buffer', relation: 'copies from' },
  { from: 'force-directed-layout', to: 'storage-buffer', relation: 'stores positions in' },
  { from: 'force-directed-layout', to: 'compute-pass', relation: 'implemented as' },
  { from: 'force-directed-layout', to: 'instanced-rendering', relation: 'visualized via' },
  { from: 'instanced-rendering', to: 'orbit-camera', relation: 'viewed through' },
  { from: 'instanced-rendering', to: 'gpu-device', relation: 'draws via' },
  { from: 'orbit-camera', to: 'gpu-device', relation: 'configures view for' },
  { from: 'storage-texture', to: 'gpu-device', relation: 'allocated on' },
  { from: 'workgroup', to: 'gpu-scheduling', relation: 'dispatched under' },

  // algorithms
  { from: 'autodiff', to: 'backpropagation', relation: 'generalizes to' },
  { from: 'backpropagation', to: 'gradient-descent', relation: 'feeds gradients to' },
  { from: 'gradient-descent', to: 'storage-buffer', relation: 'updates parameters in' },
  { from: 'gradient-descent', to: 'autodiff', relation: 'consumes gradients from' },
  { from: 'backpropagation', to: 'wgsl', relation: 'hand-written kernel in Demo1' },
  { from: 'softmax', to: 'gradient-descent', relation: 'differentiable for' },
  { from: 'gradient-descent', to: 'loss-function', relation: 'minimizes' },
  { from: 'loss-function', to: 'cross-entropy-loss', relation: 'specialized as' },
  { from: 'cross-entropy-loss', to: 'softmax', relation: 'applied after' },
  { from: 'loss-function', to: 'overfitting', relation: 'gap revealed by' },
  { from: 'overfitting', to: 'regularization', relation: 'mitigated by' },
  { from: 'regularization', to: 'dropout', relation: 'includes' },
  { from: 'regularization', to: 'batch-normalization', relation: 'complemented by' },
  { from: 'cosine-similarity', to: 'embedding-similarity', relation: 'underlies' },
  { from: 'cosine-similarity', to: 'nearest-neighbor-search', relation: 'used as metric in' },
  { from: 'nearest-neighbor-search', to: 'approximate-nearest-neighbor', relation: 'sped up by' },
  { from: 'approximate-nearest-neighbor', to: 'vector-database', relation: 'powers' },
  { from: 'clustering', to: 'dimensionality-reduction', relation: 'often paired with' },
  { from: 'dimensionality-reduction', to: 'embedding-similarity', relation: 'visualizes' },
  { from: 'reinforcement-learning', to: 'markov-decision-process', relation: 'formalized by' },
  { from: 'markov-decision-process', to: 'policy-gradient', relation: 'optimized via' },
  { from: 'policy-gradient', to: 'value-function', relation: 'variance-reduced by' },
  { from: 'reinforcement-learning', to: 'exploration-exploitation', relation: 'must balance' },
  { from: 'reinforcement-learning', to: 'monte-carlo-tree-search', relation: 'combined with in planning agents' },
  { from: 'reinforcement-learning', to: 'rlhf', relation: 'applied to LLMs as' },
  { from: 'policy-gradient', to: 'reward-model', relation: 'optimizes against' },

  // LLM core architecture
  { from: 'transformer', to: 'attention', relation: 'built from' },
  { from: 'attention', to: 'multi-head-attention', relation: 'generalized as' },
  { from: 'multi-head-attention', to: 'cross-attention', relation: 'specialized as' },
  { from: 'attention', to: 'softmax', relation: 'uses' },
  { from: 'attention', to: 'causal-masking', relation: 'restricted during generation by' },
  { from: 'attention', to: 'flash-attention', relation: 'accelerated by' },
  { from: 'attention', to: 'sparse-attention', relation: 'made sub-quadratic via' },
  { from: 'sparse-attention', to: 'sliding-window-attention', relation: 'instantiated as' },
  { from: 'transformer', to: 'mixture-of-experts', relation: 'feed-forward block replaced by' },
  { from: 'multi-head-attention', to: 'grouped-query-attention', relation: 'memory-optimized as' },
  { from: 'grouped-query-attention', to: 'multi-query-attention', relation: 'taken to the extreme as' },
  { from: 'transformer', to: 'positional-encoding', relation: 'requires' },
  { from: 'positional-encoding', to: 'rotary-embeddings', relation: 'modernized as' },
  { from: 'rotary-embeddings', to: 'rope-scaling', relation: 'extended via' },
  { from: 'rope-scaling', to: 'context-window', relation: 'extends' },
  { from: 'transformer', to: 'layer-normalization', relation: 'stabilized by' },
  { from: 'layer-normalization', to: 'rms-norm', relation: 'simplified as' },
  { from: 'transformer', to: 'feed-forward-network', relation: 'built from' },
  { from: 'attention', to: 'kv-cache', relation: 'optimized by' },
  { from: 'kv-cache', to: 'storage-buffer', relation: 'stored in' },
  { from: 'kv-cache', to: 'paged-attention', relation: 'memory-managed via' },
  { from: 'paged-attention', to: 'continuous-batching', relation: 'enables' },
  { from: 'continuous-batching', to: 'batch-inference', relation: 'specializes' },
  { from: 'batch-inference', to: 'speculative-decoding', relation: 'combined with' },
  { from: 'speculative-decoding', to: 'greedy-decoding', relation: 'verifies drafts via' },
  { from: 'greedy-decoding', to: 'beam-search', relation: 'generalized by' },
  { from: 'greedy-decoding', to: 'temperature-sampling', relation: 'randomized into' },
  { from: 'temperature-sampling', to: 'top-k-sampling', relation: 'combined with' },
  { from: 'temperature-sampling', to: 'top-p-sampling', relation: 'combined with' },
  { from: 'top-p-sampling', to: 'repetition-penalty', relation: 'often paired with' },

  // quantization / formats / training infra
  { from: 'transformer', to: 'quantization', relation: 'shrunk by' },
  { from: 'quantization', to: 'small-model-tradeoffs', relation: 'enables but stresses' },
  { from: 'quantization', to: 'gguf-format', relation: 'packaged as' },
  { from: 'gguf-format', to: 'onnx-runtime', relation: 'alternative to' },
  { from: 'onnx-runtime', to: 'gpu-device', relation: 'targets WebGPU backend via' },
  { from: 'model-export', to: 'onnx-runtime', relation: 'produces input for' },
  { from: 'model-export', to: 'gguf-format', relation: 'produces' },
  { from: 'model-export', to: 'safetensors', relation: 'produces' },
  { from: 'distillation', to: 'quantization', relation: 'often combined with' },
  { from: 'distillation', to: 'small-model-tradeoffs', relation: 'used to offset' },
  { from: 'model-parallelism', to: 'tensor-parallelism', relation: 'includes' },
  { from: 'model-parallelism', to: 'pipeline-parallelism', relation: 'includes' },
  { from: 'tensor-parallelism', to: 'data-parallelism', relation: 'combined with' },
  { from: 'mixed-precision-training', to: 'gradient-descent', relation: 'accelerates' },
  { from: 'gradient-checkpointing', to: 'backpropagation', relation: 'trades compute for memory in' },
  { from: 'lora', to: 'qlora', relation: 'combined with quantization as' },
  { from: 'lora', to: 'peft', relation: 'instance of' },
  { from: 'peft', to: 'fine-tuning', relation: 'cheaper alternative to full' },

  // training pipeline
  { from: 'pretraining', to: 'fine-tuning', relation: 'followed by' },
  { from: 'fine-tuning', to: 'instruction-tuning', relation: 'specialized as' },
  { from: 'instruction-tuning', to: 'rlhf', relation: 'followed by' },
  { from: 'rlhf', to: 'reward-model', relation: 'trains' },
  { from: 'rlhf', to: 'dpo', relation: 'simplified by' },
  { from: 'dpo', to: 'reward-model', relation: 'bypasses explicit' },
  { from: 'rlhf', to: 'constitutional-ai', relation: 'extended by' },
  { from: 'pretraining', to: 'scaling-laws', relation: 'predicted by' },
  { from: 'scaling-laws', to: 'emergent-abilities', relation: 'breaks down at' },
  { from: 'pretraining', to: 'cross-entropy-loss', relation: 'optimizes' },

  // tokenization / embeddings / retrieval
  { from: 'tokenization', to: 'byte-pair-encoding', relation: 'commonly implemented via' },
  { from: 'byte-pair-encoding', to: 'sentencepiece', relation: 'implemented by' },
  { from: 'byte-pair-encoding', to: 'wordpiece', relation: 'related to' },
  { from: 'tokenization', to: 'vocabulary-size', relation: 'determines' },
  { from: 'vocabulary-size', to: 'embedding-layer', relation: 'sizes' },
  { from: 'embedding-layer', to: 'transformer', relation: 'feeds tokens into' },
  { from: 'transformer', to: 'tokenization', relation: 'consumes tokens from' },
  { from: 'small-model-tradeoffs', to: 'embedding-similarity', relation: 'mitigated by offloading to' },
  { from: 'embedding-similarity', to: 'tokenization', relation: 'depends on' },
  { from: 'embedding-similarity', to: 'cosine-similarity', relation: 'computed via' },
  { from: 'embedding-similarity', to: 'vector-database', relation: 'stored for search in' },
  { from: 'vector-database', to: 'semantic-search', relation: 'powers' },
  { from: 'semantic-search', to: 'reranking', relation: 'refined by' },
  { from: 'semantic-search', to: 'retrieval-augmented-generation', relation: 'feeds' },
  { from: 'retrieval-augmented-generation', to: 'chunking', relation: 'requires' },
  { from: 'retrieval-augmented-generation', to: 'hallucination', relation: 'reduces risk of' },
  { from: 'chunking', to: 'context-window', relation: 'sized relative to' },

  // prompting / reasoning
  { from: 'in-context-learning', to: 'few-shot-prompting', relation: 'demonstrated by' },
  { from: 'few-shot-prompting', to: 'zero-shot-prompting', relation: 'contrasted with' },
  { from: 'in-context-learning', to: 'chain-of-thought', relation: 'extended by' },
  { from: 'chain-of-thought', to: 'self-consistency', relation: 'made robust via' },
  { from: 'prompt-engineering', to: 'few-shot-prompting', relation: 'includes' },
  { from: 'prompt-engineering', to: 'system-prompt', relation: 'shapes' },
  { from: 'system-prompt', to: 'guardrails', relation: 'reinforced by' },
  { from: 'hallucination', to: 'perplexity', relation: 'loosely correlated with' },
  { from: 'perplexity', to: 'cross-entropy-loss', relation: 'derived from' },
  { from: 'small-model-tradeoffs', to: 'transformer', relation: 'describes limits of' },
  { from: 'small-model-tradeoffs', to: 'hallucination', relation: 'worsens' },

  // agentic AI
  { from: 'ai-agent', to: 'transformer', relation: 'driven by an LLM built on' },
  { from: 'ai-agent', to: 'agent-loop', relation: 'executes via' },
  { from: 'agent-loop', to: 'observation-action-cycle', relation: 'repeats' },
  { from: 'observation-action-cycle', to: 'environment-interaction', relation: 'depends on' },
  { from: 'ai-agent', to: 'react-pattern', relation: 'commonly implements' },
  { from: 'react-pattern', to: 'tool-use', relation: 'interleaves reasoning with' },
  { from: 'react-pattern', to: 'chain-of-thought', relation: 'extends' },
  { from: 'tool-use', to: 'function-calling', relation: 'implemented via' },
  { from: 'function-calling', to: 'tool-calling-schema', relation: 'guided by' },
  { from: 'function-calling', to: 'structured-output', relation: 'requires' },
  { from: 'structured-output', to: 'json-mode', relation: 'enforced via' },
  { from: 'tool-use', to: 'code-execution-tool', relation: 'includes' },
  { from: 'tool-use', to: 'web-browsing-tool', relation: 'includes' },
  { from: 'tool-use', to: 'retrieval-tool', relation: 'includes' },
  { from: 'retrieval-tool', to: 'retrieval-augmented-generation', relation: 'agentic counterpart of' },
  { from: 'tool-use', to: 'api-calling', relation: 'includes' },
  { from: 'code-execution-tool', to: 'sandboxing', relation: 'requires' },
  { from: 'ai-agent', to: 'planning', relation: 'performs' },
  { from: 'planning', to: 'task-decomposition', relation: 'relies on' },
  { from: 'task-decomposition', to: 'subgoal', relation: 'produces' },
  { from: 'subgoal', to: 'goal-decomposition', relation: 'output of' },
  { from: 'planning', to: 'hierarchical-planning', relation: 'generalized as' },
  { from: 'planning', to: 'monte-carlo-tree-search', relation: 'can use' },
  { from: 'ai-agent', to: 'agent-memory', relation: 'maintains' },
  { from: 'agent-memory', to: 'short-term-memory', relation: 'divided into' },
  { from: 'agent-memory', to: 'long-term-memory', relation: 'divided into' },
  { from: 'long-term-memory', to: 'episodic-memory', relation: 'includes' },
  { from: 'short-term-memory', to: 'working-memory', relation: 'equivalent to' },
  { from: 'working-memory', to: 'context-window', relation: 'bounded by' },
  { from: 'long-term-memory', to: 'vector-database', relation: 'often stored in' },
  { from: 'ai-agent', to: 'self-reflection', relation: 'improved by' },
  { from: 'self-reflection', to: 'self-critique', relation: 'implemented as' },
  { from: 'self-critique', to: 'self-consistency', relation: 'complements' },
  { from: 'self-reflection', to: 'tree-of-thought', relation: 'extended into' },
  { from: 'tree-of-thought', to: 'graph-of-thought', relation: 'generalized as' },
  { from: 'ai-agent', to: 'autonomous-agent', relation: 'becomes, given enough independence' },
  { from: 'autonomous-agent', to: 'agentic-workflow', relation: 'composed into a larger' },
  { from: 'multi-agent-system', to: 'agent-orchestration', relation: 'coordinated by' },
  { from: 'agent-orchestration', to: 'agent-communication', relation: 'requires' },
  { from: 'agent-communication', to: 'blackboard-architecture', relation: 'can be implemented via' },
  { from: 'multi-agent-system', to: 'autonomous-agent', relation: 'composed of multiple' },
  { from: 'guardrails', to: 'prompt-injection', relation: 'defends against' },
  { from: 'prompt-injection', to: 'jailbreaking', relation: 'related attack to' },
  { from: 'guardrails', to: 'human-in-the-loop', relation: 'often paired with' },
  { from: 'human-in-the-loop', to: 'agent-state-machine', relation: 'inserted as an explicit state in' },
  { from: 'agent-state-machine', to: 'agentic-workflow', relation: 'formalizes control flow of' },
  { from: 'agent-evaluation', to: 'benchmarking-agents', relation: 'standardized via' },
  { from: 'agent-evaluation', to: 'hallucination', relation: 'must detect' },
  { from: 'agent-evaluation', to: 'agent-loop', relation: 'measures success of' },
  { from: 'small-model-tradeoffs', to: 'ai-agent', relation: 'motivates deterministic guardrails in' },
  { from: 'ai-agent', to: 'gpu-device', relation: 'local inference runs on' },
];
