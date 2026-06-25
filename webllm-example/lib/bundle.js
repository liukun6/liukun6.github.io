function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return _regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function (t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
    return this;
  }), _regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function () {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine = function (e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine(e, r, n, t);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var GPUContext = /*#__PURE__*/function () {
  function GPUContext() {
    _classCallCheck(this, GPUContext);
    this.device = null;
    this.adapter = null;
  }
  return _createClass(GPUContext, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this = this;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!this.device) {
                _context.n = 1;
                break;
              }
              return _context.a(2, this.device);
            case 1:
              if (navigator.gpu) {
                _context.n = 2;
                break;
              }
              throw new Error('WebGPU is not supported by this browser.');
            case 2:
              _context.n = 3;
              return navigator.gpu.requestAdapter();
            case 3:
              this.adapter = _context.v;
              if (this.adapter) {
                _context.n = 4;
                break;
              }
              throw new Error('No appropriate GPUAdapter found.');
            case 4:
              _context.n = 5;
              return this.adapter.requestDevice();
            case 5:
              this.device = _context.v;
              if (this.device) {
                _context.n = 6;
                break;
              }
              throw new Error('Failed to create GPUDevice.');
            case 6:
              this.device.lost.then(function (info) {
                console.warn("WebGPU device lost: ".concat(info.message));
                _this.device = null;
              });
              return _context.a(2, this.device);
          }
        }, _callee, this);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "createShaderModule",
    value: function createShaderModule(code) {
      var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Shader Module';
      if (!this.device) throw new Error('GPUDevice is not initialized. Call init() first.');
      return this.device.createShaderModule({
        label: label,
        code: code
      });
    }
  }, {
    key: "createComputePipeline",
    value: function createComputePipeline(shaderModule) {
      var entryPoint = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'computeMain';
      var layout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'auto';
      var constants = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (!this.device) throw new Error('GPUDevice is not initialized. Call init() first.');
      return this.device.createComputePipeline({
        layout: layout,
        compute: {
          module: shaderModule,
          entryPoint: entryPoint,
          constants: constants
        }
      });
    }
  }]);
}();
var gpu = new GPUContext();

var Tensor = /*#__PURE__*/function () {
  function Tensor(shape) {
    var dataOrUsage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var usage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    _classCallCheck(this, Tensor);
    if (!gpu.device) {
      throw new Error('GPUDevice is not initialized. Call gpu.init() before instantiating Tensors.');
    }
    this.shape = shape;
    this.size = shape.reduce(function (a, b) {
      return a * b;
    }, 1);
    this.byteLength = this.size * Float32Array.BYTES_PER_ELEMENT;
    var defaultUsage = GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST;
    if (dataOrUsage instanceof Float32Array) {
      this.usage = usage !== null ? usage : defaultUsage;
      this.buffer = gpu.device.createBuffer({
        label: 'Tensor Buffer',
        size: this.byteLength,
        usage: this.usage,
        mappedAtCreation: true
      });
      new Float32Array(this.buffer.getMappedRange()).set(dataOrUsage);
      this.buffer.unmap();
    } else {
      this.usage = typeof dataOrUsage === 'number' ? dataOrUsage : defaultUsage;
      this.buffer = gpu.device.createBuffer({
        label: 'Tensor Buffer',
        size: this.byteLength,
        usage: this.usage
      });
    }
  }
  return _createClass(Tensor, [{
    key: "data",
    value: function () {
      var _data = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var readBuffer, encoder, copy;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (gpu.device) {
                _context.n = 1;
                break;
              }
              throw new Error('GPUDevice is not initialized.');
            case 1:
              readBuffer = gpu.device.createBuffer({
                label: 'Tensor Readback Buffer',
                size: this.byteLength,
                usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
              });
              encoder = gpu.device.createCommandEncoder();
              encoder.copyBufferToBuffer(this.buffer, 0, readBuffer, 0, this.byteLength);
              gpu.device.queue.submit([encoder.finish()]);
              _context.n = 2;
              return readBuffer.mapAsync(GPUMapMode.READ);
            case 2:
              copy = new Float32Array(readBuffer.getMappedRange()).slice();
              readBuffer.unmap();
              readBuffer.destroy();
              return _context.a(2, copy);
          }
        }, _callee, this);
      }));
      function data() {
        return _data.apply(this, arguments);
      }
      return data;
    }()
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.buffer) {
        this.buffer.destroy();
        this.buffer = null;
      }
    }
  }]);
}();

var addShaderCode = "\n@binding(0) @group(0) var<storage, read> a : array<f32>;\n@binding(1) @group(0) var<storage, read> b : array<f32>;\n@binding(2) @group(0) var<storage, read_write> c : array<f32>;\n\n@compute @workgroup_size(64)\nfn computeMain(@builtin(global_invocation_id) gid : vec3<u32>) {\n  let idx = gid.x;\n  if (idx >= arrayLength(&c)) {\n    return;\n  }\n  c[idx] = a[idx] + b[idx];\n}\n";
var addPipeline = null;
function add(tensorA, tensorB) {
  if (tensorA.size !== tensorB.size) {
    throw new Error("Tensor sizes must match for element-wise addition. Got ".concat(tensorA.size, " and ").concat(tensorB.size));
  }
  var device = gpu.device;
  if (!device) {
    throw new Error('GPUDevice is not initialized.');
  }

  // Create pipeline if it doesn't exist
  if (!addPipeline) {
    var shaderModule = gpu.createShaderModule(addShaderCode, 'Tensor Add Shader');
    addPipeline = gpu.createComputePipeline(shaderModule, 'computeMain');
  }

  // Create output tensor
  var tensorC = new Tensor(tensorA.shape);

  // Create Bind Group
  var bindGroup = device.createBindGroup({
    layout: addPipeline.getBindGroupLayout(0),
    entries: [{
      binding: 0,
      resource: {
        buffer: tensorA.buffer
      }
    }, {
      binding: 1,
      resource: {
        buffer: tensorB.buffer
      }
    }, {
      binding: 2,
      resource: {
        buffer: tensorC.buffer
      }
    }]
  });

  // Encode commands
  var encoder = device.createCommandEncoder({
    label: 'Add Encoder'
  });
  var pass = encoder.beginComputePass({
    label: 'Add Compute Pass'
  });
  pass.setPipeline(addPipeline);
  pass.setBindGroup(0, bindGroup);
  var workgroupCount = Math.ceil(tensorA.size / 64);
  pass.dispatchWorkgroups(workgroupCount);
  pass.end();
  device.queue.submit([encoder.finish()]);
  return tensorC;
}

var matmulShaderCode = "\nstruct Uniforms {\n  M: u32,\n  K: u32,\n  N: u32,\n}\n\n@binding(0) @group(0) var<uniform> uniforms : Uniforms;\n@binding(1) @group(0) var<storage, read> a : array<f32>;\n@binding(2) @group(0) var<storage, read> b : array<f32>;\n@binding(3) @group(0) var<storage, read_write> c : array<f32>;\n\n@compute @workgroup_size(16, 16)\nfn computeMain(@builtin(global_invocation_id) gid : vec3<u32>) {\n  let col = gid.x;\n  let row = gid.y;\n  \n  if (row >= uniforms.M || col >= uniforms.N) {\n    return;\n  }\n  \n  var sum = 0.0;\n  for (var i: u32 = 0; i < uniforms.K; i = i + 1) {\n    let aIdx = row * uniforms.K + i;\n    let bIdx = i * uniforms.N + col;\n    sum = sum + a[aIdx] * b[bIdx];\n  }\n  \n  let cIdx = row * uniforms.N + col;\n  c[cIdx] = sum;\n}\n";
var matmulPipeline = null;
function matmul(tensorA, tensorB) {
  if (tensorA.shape.length !== 2 || tensorB.shape.length !== 2) {
    throw new Error('Tensors must be 2D for matrix multiplication.');
  }
  var _tensorA$shape = _slicedToArray(tensorA.shape, 2),
    M = _tensorA$shape[0],
    K = _tensorA$shape[1];
  var _tensorB$shape = _slicedToArray(tensorB.shape, 2),
    K2 = _tensorB$shape[0],
    N = _tensorB$shape[1];
  if (K !== K2) {
    throw new Error("Dimension mismatch: A columns (".concat(K, ") must match B rows (").concat(K2, ")."));
  }
  var device = gpu.device;
  if (!device) {
    throw new Error('GPUDevice is not initialized.');
  }
  if (!matmulPipeline) {
    var shaderModule = gpu.createShaderModule(matmulShaderCode, 'Matmul Shader');
    matmulPipeline = gpu.createComputePipeline(shaderModule, 'computeMain');
  }

  // Create output tensor
  var tensorC = new Tensor([M, N]);

  // Create Uniform Buffer for dimensions
  var uniformData = new Uint32Array([M, K, N, 0]); // aligned to 16 bytes
  var uniformBuffer = device.createBuffer({
    label: 'Matmul Uniform Buffer',
    size: uniformData.byteLength,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });
  device.queue.writeBuffer(uniformBuffer, 0, uniformData);

  // Create Bind Group
  var bindGroup = device.createBindGroup({
    layout: matmulPipeline.getBindGroupLayout(0),
    entries: [{
      binding: 0,
      resource: {
        buffer: uniformBuffer
      }
    }, {
      binding: 1,
      resource: {
        buffer: tensorA.buffer
      }
    }, {
      binding: 2,
      resource: {
        buffer: tensorB.buffer
      }
    }, {
      binding: 3,
      resource: {
        buffer: tensorC.buffer
      }
    }]
  });

  // Encode and Dispatch
  var encoder = device.createCommandEncoder({
    label: 'Matmul Encoder'
  });
  var pass = encoder.beginComputePass({
    label: 'Matmul Compute Pass'
  });
  pass.setPipeline(matmulPipeline);
  pass.setBindGroup(0, bindGroup);
  var workgroupsX = Math.ceil(N / 16);
  var workgroupsY = Math.ceil(M / 16);
  pass.dispatchWorkgroups(workgroupsX, workgroupsY);
  pass.end();
  device.queue.submit([encoder.finish()]);

  // Clean up uniform buffer after submit
  // Note: we can't destroy the uniform buffer immediately if it's still being read, 
  // but WebGPU command submission schedules the buffer reads.
  // We can destroy it after queue execution or let GC handle it. Since we created it, 
  // we will let the GC collect it or do a manual destroy after a map or queue.onSubmittedWorkDone,
  // but for simplicity we will just let GC handle it, or we can clean it up after a task.
  // Actually, keeping uniformBuffer in JS scope is fine.

  return tensorC;
}

export { Tensor, add, gpu, matmul };
