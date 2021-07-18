/**
 * Common utilities
 * @module glMatrix
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = Math.random;
/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
 */

function setMatrixArrayType(type) {
  ARRAY_TYPE = type;
}
var degree = Math.PI / 180;
/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */

function toRadian(a) {
  return a * degree;
}
/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */

function equals$9(a, b) {
  return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
if (!Math.hypot) Math.hypot = function () {
  var y = 0,
      i = arguments.length;

  while (i--) {
    y += arguments[i] * arguments[i];
  }

  return Math.sqrt(y);
};

var common = /*#__PURE__*/Object.freeze({
  __proto__: null,
  EPSILON: EPSILON,
  get ARRAY_TYPE () { return ARRAY_TYPE; },
  RANDOM: RANDOM,
  setMatrixArrayType: setMatrixArrayType,
  toRadian: toRadian,
  equals: equals$9
});

/**
 * 2x2 Matrix
 * @module mat2
 */

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */

function create$9() {
  var out = new ARRAY_TYPE(4);

  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
  }

  out[0] = 1;
  out[3] = 1;
  return out;
}
/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */

function clone$8(a) {
  var out = new ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */

function copy$a(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */

function identity$6(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */

function fromValues$8(m00, m01, m10, m11) {
  var out = new ARRAY_TYPE(4);
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}
/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */

function set$8(out, m00, m01, m10, m11) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m10;
  out[3] = m11;
  return out;
}
/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */

function transpose$3(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache
  // some values
  if (out === a) {
    var a1 = a[1];
    out[1] = a[2];
    out[2] = a1;
  } else {
    out[0] = a[0];
    out[1] = a[2];
    out[2] = a[1];
    out[3] = a[3];
  }

  return out;
}
/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */

function invert$5(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3]; // Calculate the determinant

  var det = a0 * a3 - a2 * a1;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = a3 * det;
  out[1] = -a1 * det;
  out[2] = -a2 * det;
  out[3] = a0 * det;
  return out;
}
/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the source matrix
 * @returns {mat2} out
 */

function adjoint$2(out, a) {
  // Caching this value is nessecary if out == a
  var a0 = a[0];
  out[0] = a[3];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a0;
  return out;
}
/**
 * Calculates the determinant of a mat2
 *
 * @param {ReadonlyMat2} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant$3(a) {
  return a[0] * a[3] - a[2] * a[1];
}
/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */

function multiply$a(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  return out;
}
/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */

function rotate$4(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  return out;
}
/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to rotate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/

function scale$9(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */

function fromRotation$4(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat2} out
 */

function fromScaling$3(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  return out;
}
/**
 * Returns a string representation of a mat2
 *
 * @param {ReadonlyMat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str$8(a) {
  return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
/**
 * Returns Frobenius norm of a mat2
 *
 * @param {ReadonlyMat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob$3(a) {
  return Math.hypot(a[0], a[1], a[2], a[3]);
}
/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {ReadonlyMat2} L the lower triangular matrix
 * @param {ReadonlyMat2} D the diagonal matrix
 * @param {ReadonlyMat2} U the upper triangular matrix
 * @param {ReadonlyMat2} a the input matrix to factorize
 */

function LDU(L, D, U, a) {
  L[2] = a[2] / a[0];
  U[0] = a[0];
  U[1] = a[1];
  U[3] = a[3] - L[2] * U[1];
  return [L, D, U];
}
/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */

function add$9(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @returns {mat2} out
 */

function subtract$7(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat2} a The first matrix.
 * @param {ReadonlyMat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals$8(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat2} a The first matrix.
 * @param {ReadonlyMat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals$8(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {ReadonlyMat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */

function multiplyScalar$3(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {ReadonlyMat2} a the first operand
 * @param {ReadonlyMat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */

function multiplyScalarAndAdd$3(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}
/**
 * Alias for {@link mat2.multiply}
 * @function
 */

var mul$8 = multiply$a;
/**
 * Alias for {@link mat2.subtract}
 * @function
 */

var sub$6 = subtract$7;

var mat2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$9,
  clone: clone$8,
  copy: copy$a,
  identity: identity$6,
  fromValues: fromValues$8,
  set: set$8,
  transpose: transpose$3,
  invert: invert$5,
  adjoint: adjoint$2,
  determinant: determinant$3,
  multiply: multiply$a,
  rotate: rotate$4,
  scale: scale$9,
  fromRotation: fromRotation$4,
  fromScaling: fromScaling$3,
  str: str$8,
  frob: frob$3,
  LDU: LDU,
  add: add$9,
  subtract: subtract$7,
  exactEquals: exactEquals$8,
  equals: equals$8,
  multiplyScalar: multiplyScalar$3,
  multiplyScalarAndAdd: multiplyScalarAndAdd$3,
  mul: mul$8,
  sub: sub$6
});

/**
 * 2x3 Matrix
 * @module mat2d
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, b,
 *  c, d,
 *  tx, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, b, 0,
 *  c, d, 0,
 *  tx, ty, 1]
 * </pre>
 * The last column is ignored so the array is shorter and operations are faster.
 */

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */

function create$8() {
  var out = new ARRAY_TYPE(6);

  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[4] = 0;
    out[5] = 0;
  }

  out[0] = 1;
  out[3] = 1;
  return out;
}
/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {ReadonlyMat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */

function clone$7(a) {
  var out = new ARRAY_TYPE(6);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}
/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the source matrix
 * @returns {mat2d} out
 */

function copy$9(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  return out;
}
/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */

function identity$5(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */

function fromValues$7(a, b, c, d, tx, ty) {
  var out = new ARRAY_TYPE(6);
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}
/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */

function set$7(out, a, b, c, d, tx, ty) {
  out[0] = a;
  out[1] = b;
  out[2] = c;
  out[3] = d;
  out[4] = tx;
  out[5] = ty;
  return out;
}
/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the source matrix
 * @returns {mat2d} out
 */

function invert$4(out, a) {
  var aa = a[0],
      ab = a[1],
      ac = a[2],
      ad = a[3];
  var atx = a[4],
      aty = a[5];
  var det = aa * ad - ab * ac;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = ad * det;
  out[1] = -ab * det;
  out[2] = -ac * det;
  out[3] = aa * det;
  out[4] = (ac * aty - ad * atx) * det;
  out[5] = (ab * atx - aa * aty) * det;
  return out;
}
/**
 * Calculates the determinant of a mat2d
 *
 * @param {ReadonlyMat2d} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant$2(a) {
  return a[0] * a[3] - a[1] * a[2];
}
/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @returns {mat2d} out
 */

function multiply$9(out, a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  out[0] = a0 * b0 + a2 * b1;
  out[1] = a1 * b0 + a3 * b1;
  out[2] = a0 * b2 + a2 * b3;
  out[3] = a1 * b2 + a3 * b3;
  out[4] = a0 * b4 + a2 * b5 + a4;
  out[5] = a1 * b4 + a3 * b5 + a5;
  return out;
}
/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */

function rotate$3(out, a, rad) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  out[0] = a0 * c + a2 * s;
  out[1] = a1 * c + a3 * s;
  out[2] = a0 * -s + a2 * c;
  out[3] = a1 * -s + a3 * c;
  out[4] = a4;
  out[5] = a5;
  return out;
}
/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to translate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/

function scale$8(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0 * v0;
  out[1] = a1 * v0;
  out[2] = a2 * v1;
  out[3] = a3 * v1;
  out[4] = a4;
  out[5] = a5;
  return out;
}
/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to translate
 * @param {ReadonlyVec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/

function translate$4(out, a, v) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var v0 = v[0],
      v1 = v[1];
  out[0] = a0;
  out[1] = a1;
  out[2] = a2;
  out[3] = a3;
  out[4] = a0 * v0 + a2 * v1 + a4;
  out[5] = a1 * v0 + a3 * v1 + a5;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */

function fromRotation$3(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = -s;
  out[3] = c;
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat2d} out
 */

function fromScaling$2(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = v[1];
  out[4] = 0;
  out[5] = 0;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {ReadonlyVec2} v Translation vector
 * @returns {mat2d} out
 */

function fromTranslation$3(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = v[0];
  out[5] = v[1];
  return out;
}
/**
 * Returns a string representation of a mat2d
 *
 * @param {ReadonlyMat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str$7(a) {
  return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")";
}
/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {ReadonlyMat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob$2(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], 1);
}
/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @returns {mat2d} out
 */

function add$8(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @returns {mat2d} out
 */

function subtract$6(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */

function multiplyScalar$2(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  return out;
}
/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {ReadonlyMat2d} a the first operand
 * @param {ReadonlyMat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */

function multiplyScalarAndAdd$2(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat2d} a The first matrix.
 * @param {ReadonlyMat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals$7(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat2d} a The first matrix.
 * @param {ReadonlyMat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals$7(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5));
}
/**
 * Alias for {@link mat2d.multiply}
 * @function
 */

var mul$7 = multiply$9;
/**
 * Alias for {@link mat2d.subtract}
 * @function
 */

var sub$5 = subtract$6;

var mat2d = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$8,
  clone: clone$7,
  copy: copy$9,
  identity: identity$5,
  fromValues: fromValues$7,
  set: set$7,
  invert: invert$4,
  determinant: determinant$2,
  multiply: multiply$9,
  rotate: rotate$3,
  scale: scale$8,
  translate: translate$4,
  fromRotation: fromRotation$3,
  fromScaling: fromScaling$2,
  fromTranslation: fromTranslation$3,
  str: str$7,
  frob: frob$2,
  add: add$8,
  subtract: subtract$6,
  multiplyScalar: multiplyScalar$2,
  multiplyScalarAndAdd: multiplyScalarAndAdd$2,
  exactEquals: exactEquals$7,
  equals: equals$7,
  mul: mul$7,
  sub: sub$5
});

/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */

function create$7() {
  var out = new ARRAY_TYPE(9);

  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
  }

  out[0] = 1;
  out[4] = 1;
  out[8] = 1;
  return out;
}
/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {ReadonlyMat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */

function fromMat4$1(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[4];
  out[4] = a[5];
  out[5] = a[6];
  out[6] = a[8];
  out[7] = a[9];
  out[8] = a[10];
  return out;
}
/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */

function clone$6(a) {
  var out = new ARRAY_TYPE(9);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function copy$8(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */

function fromValues$6(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  var out = new ARRAY_TYPE(9);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */

function set$6(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m10;
  out[4] = m11;
  out[5] = m12;
  out[6] = m20;
  out[7] = m21;
  out[8] = m22;
  return out;
}
/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */

function identity$4(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function transpose$2(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a12 = a[5];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a01;
    out[5] = a[7];
    out[6] = a02;
    out[7] = a12;
  } else {
    out[0] = a[0];
    out[1] = a[3];
    out[2] = a[6];
    out[3] = a[1];
    out[4] = a[4];
    out[5] = a[7];
    out[6] = a[2];
    out[7] = a[5];
    out[8] = a[8];
  }

  return out;
}
/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function invert$3(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b01 = a22 * a11 - a12 * a21;
  var b11 = -a22 * a10 + a12 * a20;
  var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

  var det = a00 * b01 + a01 * b11 + a02 * b21;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = b01 * det;
  out[1] = (-a22 * a01 + a02 * a21) * det;
  out[2] = (a12 * a01 - a02 * a11) * det;
  out[3] = b11 * det;
  out[4] = (a22 * a00 - a02 * a20) * det;
  out[5] = (-a12 * a00 + a02 * a10) * det;
  out[6] = b21 * det;
  out[7] = (-a21 * a00 + a01 * a20) * det;
  out[8] = (a11 * a00 - a01 * a10) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the source matrix
 * @returns {mat3} out
 */

function adjoint$1(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  out[0] = a11 * a22 - a12 * a21;
  out[1] = a02 * a21 - a01 * a22;
  out[2] = a01 * a12 - a02 * a11;
  out[3] = a12 * a20 - a10 * a22;
  out[4] = a00 * a22 - a02 * a20;
  out[5] = a02 * a10 - a00 * a12;
  out[6] = a10 * a21 - a11 * a20;
  out[7] = a01 * a20 - a00 * a21;
  out[8] = a00 * a11 - a01 * a10;
  return out;
}
/**
 * Calculates the determinant of a mat3
 *
 * @param {ReadonlyMat3} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant$1(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}
/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */

function multiply$8(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2];
  var a10 = a[3],
      a11 = a[4],
      a12 = a[5];
  var a20 = a[6],
      a21 = a[7],
      a22 = a[8];
  var b00 = b[0],
      b01 = b[1],
      b02 = b[2];
  var b10 = b[3],
      b11 = b[4],
      b12 = b[5];
  var b20 = b[6],
      b21 = b[7],
      b22 = b[8];
  out[0] = b00 * a00 + b01 * a10 + b02 * a20;
  out[1] = b00 * a01 + b01 * a11 + b02 * a21;
  out[2] = b00 * a02 + b01 * a12 + b02 * a22;
  out[3] = b10 * a00 + b11 * a10 + b12 * a20;
  out[4] = b10 * a01 + b11 * a11 + b12 * a21;
  out[5] = b10 * a02 + b11 * a12 + b12 * a22;
  out[6] = b20 * a00 + b21 * a10 + b22 * a20;
  out[7] = b20 * a01 + b21 * a11 + b22 * a21;
  out[8] = b20 * a02 + b21 * a12 + b22 * a22;
  return out;
}
/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to translate
 * @param {ReadonlyVec2} v vector to translate by
 * @returns {mat3} out
 */

function translate$3(out, a, v) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      x = v[0],
      y = v[1];
  out[0] = a00;
  out[1] = a01;
  out[2] = a02;
  out[3] = a10;
  out[4] = a11;
  out[5] = a12;
  out[6] = x * a00 + y * a10 + a20;
  out[7] = x * a01 + y * a11 + a21;
  out[8] = x * a02 + y * a12 + a22;
  return out;
}
/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */

function rotate$2(out, a, rad) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a10 = a[3],
      a11 = a[4],
      a12 = a[5],
      a20 = a[6],
      a21 = a[7],
      a22 = a[8],
      s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c * a00 + s * a10;
  out[1] = c * a01 + s * a11;
  out[2] = c * a02 + s * a12;
  out[3] = c * a10 - s * a00;
  out[4] = c * a11 - s * a01;
  out[5] = c * a12 - s * a02;
  out[6] = a20;
  out[7] = a21;
  out[8] = a22;
  return out;
}
/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to rotate
 * @param {ReadonlyVec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/

function scale$7(out, a, v) {
  var x = v[0],
      y = v[1];
  out[0] = x * a[0];
  out[1] = x * a[1];
  out[2] = x * a[2];
  out[3] = y * a[3];
  out[4] = y * a[4];
  out[5] = y * a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyVec2} v Translation vector
 * @returns {mat3} out
 */

function fromTranslation$2(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = v[0];
  out[7] = v[1];
  out[8] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */

function fromRotation$2(out, rad) {
  var s = Math.sin(rad),
      c = Math.cos(rad);
  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = -s;
  out[4] = c;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyVec2} v Scaling vector
 * @returns {mat3} out
 */

function fromScaling$1(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = v[1];
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}
/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat2d} a the matrix to copy
 * @returns {mat3} out
 **/

function fromMat2d(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = 0;
  out[3] = a[2];
  out[4] = a[3];
  out[5] = 0;
  out[6] = a[4];
  out[7] = a[5];
  out[8] = 1;
  return out;
}
/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */

function fromQuat$1(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[3] = yx - wz;
  out[6] = zx + wy;
  out[1] = yx + wz;
  out[4] = 1 - xx - zz;
  out[7] = zy - wx;
  out[2] = zx - wy;
  out[5] = zy + wx;
  out[8] = 1 - xx - yy;
  return out;
}
/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {ReadonlyMat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */

function normalFromMat4(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  return out;
}
/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */

function projection(out, width, height) {
  out[0] = 2 / width;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = -2 / height;
  out[5] = 0;
  out[6] = -1;
  out[7] = 1;
  out[8] = 1;
  return out;
}
/**
 * Returns a string representation of a mat3
 *
 * @param {ReadonlyMat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str$6(a) {
  return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
}
/**
 * Returns Frobenius norm of a mat3
 *
 * @param {ReadonlyMat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob$1(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
}
/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */

function add$7(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @returns {mat3} out
 */

function subtract$5(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {ReadonlyMat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */

function multiplyScalar$1(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  return out;
}
/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {ReadonlyMat3} a the first operand
 * @param {ReadonlyMat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */

function multiplyScalarAndAdd$1(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat3} a The first matrix.
 * @param {ReadonlyMat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals$6(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat3} a The first matrix.
 * @param {ReadonlyMat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals$6(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7],
      a8 = a[8];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7],
      b8 = b[8];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
}
/**
 * Alias for {@link mat3.multiply}
 * @function
 */

var mul$6 = multiply$8;
/**
 * Alias for {@link mat3.subtract}
 * @function
 */

var sub$4 = subtract$5;

var mat3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$7,
  fromMat4: fromMat4$1,
  clone: clone$6,
  copy: copy$8,
  fromValues: fromValues$6,
  set: set$6,
  identity: identity$4,
  transpose: transpose$2,
  invert: invert$3,
  adjoint: adjoint$1,
  determinant: determinant$1,
  multiply: multiply$8,
  translate: translate$3,
  rotate: rotate$2,
  scale: scale$7,
  fromTranslation: fromTranslation$2,
  fromRotation: fromRotation$2,
  fromScaling: fromScaling$1,
  fromMat2d: fromMat2d,
  fromQuat: fromQuat$1,
  normalFromMat4: normalFromMat4,
  projection: projection,
  str: str$6,
  frob: frob$1,
  add: add$7,
  subtract: subtract$5,
  multiplyScalar: multiplyScalar$1,
  multiplyScalarAndAdd: multiplyScalarAndAdd$1,
  exactEquals: exactEquals$6,
  equals: equals$6,
  mul: mul$6,
  sub: sub$4
});

/**
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */

function create$6() {
  var out = new ARRAY_TYPE(16);

  if (ARRAY_TYPE != Float32Array) {
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
  }

  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {ReadonlyMat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */

function clone$5(a) {
  var out = new ARRAY_TYPE(16);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function copy$7(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  out[8] = a[8];
  out[9] = a[9];
  out[10] = a[10];
  out[11] = a[11];
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */

function fromValues$5(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var out = new ARRAY_TYPE(16);
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */

function set$5(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  out[0] = m00;
  out[1] = m01;
  out[2] = m02;
  out[3] = m03;
  out[4] = m10;
  out[5] = m11;
  out[6] = m12;
  out[7] = m13;
  out[8] = m20;
  out[9] = m21;
  out[10] = m22;
  out[11] = m23;
  out[12] = m30;
  out[13] = m31;
  out[14] = m32;
  out[15] = m33;
  return out;
}
/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */

function identity$3(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function transpose$1(out, a) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if (out === a) {
    var a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a12 = a[6],
        a13 = a[7];
    var a23 = a[11];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a01;
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a02;
    out[9] = a12;
    out[11] = a[14];
    out[12] = a03;
    out[13] = a13;
    out[14] = a23;
  } else {
    out[0] = a[0];
    out[1] = a[4];
    out[2] = a[8];
    out[3] = a[12];
    out[4] = a[1];
    out[5] = a[5];
    out[6] = a[9];
    out[7] = a[13];
    out[8] = a[2];
    out[9] = a[6];
    out[10] = a[10];
    out[11] = a[14];
    out[12] = a[3];
    out[13] = a[7];
    out[14] = a[11];
    out[15] = a[15];
  }

  return out;
}
/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function invert$2(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  if (!det) {
    return null;
  }

  det = 1.0 / det;
  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}
/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the source matrix
 * @returns {mat4} out
 */

function adjoint(out, a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
  out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
  out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
  out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
  out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
  out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
  out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
  out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
  out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
  out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
  out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
  out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
  out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
  out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
  out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
  out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
  return out;
}
/**
 * Calculates the determinant of a mat4
 *
 * @param {ReadonlyMat4} a the source matrix
 * @returns {Number} determinant of a
 */

function determinant(a) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
  var b00 = a00 * a11 - a01 * a10;
  var b01 = a00 * a12 - a02 * a10;
  var b02 = a00 * a13 - a03 * a10;
  var b03 = a01 * a12 - a02 * a11;
  var b04 = a01 * a13 - a03 * a11;
  var b05 = a02 * a13 - a03 * a12;
  var b06 = a20 * a31 - a21 * a30;
  var b07 = a20 * a32 - a22 * a30;
  var b08 = a20 * a33 - a23 * a30;
  var b09 = a21 * a32 - a22 * a31;
  var b10 = a21 * a33 - a23 * a31;
  var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function multiply$7(out, a, b) {
  var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
  var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
  var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
  var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4];
  b1 = b[5];
  b2 = b[6];
  b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8];
  b1 = b[9];
  b2 = b[10];
  b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12];
  b1 = b[13];
  b2 = b[14];
  b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {mat4} out
 */

function translate$2(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}
/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {ReadonlyVec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/

function scale$6(out, a, v) {
  var x = v[0],
      y = v[1],
      z = v[2];
  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}
/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function rotate$1(out, a, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;
  var a00, a01, a02, a03;
  var a10, a11, a12, a13;
  var a20, a21, a22, a23;
  var b00, b01, b02;
  var b10, b11, b12;
  var b20, b21, b22;

  if (len < EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11]; // Construct the elements of the rotation matrix

  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }

  return out;
}
/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateX$4(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[4] = a10 * c + a20 * s;
  out[5] = a11 * c + a21 * s;
  out[6] = a12 * c + a22 * s;
  out[7] = a13 * c + a23 * s;
  out[8] = a20 * c - a10 * s;
  out[9] = a21 * c - a11 * s;
  out[10] = a22 * c - a12 * s;
  out[11] = a23 * c - a13 * s;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateY$4(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a20 = a[8];
  var a21 = a[9];
  var a22 = a[10];
  var a23 = a[11];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged rows
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}
/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function rotateZ$4(out, a, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad);
  var a00 = a[0];
  var a01 = a[1];
  var a02 = a[2];
  var a03 = a[3];
  var a10 = a[4];
  var a11 = a[5];
  var a12 = a[6];
  var a13 = a[7];

  if (a !== out) {
    // If the source and destination differ, copy the unchanged last row
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  } // Perform axis-specific matrix multiplication


  out[0] = a00 * c + a10 * s;
  out[1] = a01 * c + a11 * s;
  out[2] = a02 * c + a12 * s;
  out[3] = a03 * c + a13 * s;
  out[4] = a10 * c - a00 * s;
  out[5] = a11 * c - a01 * s;
  out[6] = a12 * c - a02 * s;
  out[7] = a13 * c - a03 * s;
  return out;
}
/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */

function fromTranslation$1(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyVec3} v Scaling vector
 * @returns {mat4} out
 */

function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @returns {mat4} out
 */

function fromRotation$1(out, rad, axis) {
  var x = axis[0],
      y = axis[1],
      z = axis[2];
  var len = Math.hypot(x, y, z);
  var s, c, t;

  if (len < EPSILON) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c; // Perform rotation-specific matrix multiplication

  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromXRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = c;
  out[6] = s;
  out[7] = 0;
  out[8] = 0;
  out[9] = -s;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromYRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = 0;
  out[2] = -s;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = s;
  out[9] = 0;
  out[10] = c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

function fromZRotation(out, rad) {
  var s = Math.sin(rad);
  var c = Math.cos(rad); // Perform axis-specific matrix multiplication

  out[0] = c;
  out[1] = s;
  out[2] = 0;
  out[3] = 0;
  out[4] = -s;
  out[5] = c;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @returns {mat4} out
 */

function fromRotationTranslation$1(out, q, v) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - (yy + zz);
  out[1] = xy + wz;
  out[2] = xz - wy;
  out[3] = 0;
  out[4] = xy - wz;
  out[5] = 1 - (xx + zz);
  out[6] = yz + wx;
  out[7] = 0;
  out[8] = xz + wy;
  out[9] = yz - wx;
  out[10] = 1 - (xx + yy);
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a new mat4 from a dual quat.
 *
 * @param {mat4} out Matrix
 * @param {ReadonlyQuat2} a Dual Quaternion
 * @returns {mat4} mat4 receiving operation result
 */

function fromQuat2(out, a) {
  var translation = new ARRAY_TYPE(3);
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

  if (magnitude > 0) {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
  } else {
    translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  }

  fromRotationTranslation$1(out, a, translation);
  return out;
}
/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getTranslation$2(out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];
  return out;
}
/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */

function getScaling(out, mat) {
  var m11 = mat[0];
  var m12 = mat[1];
  var m13 = mat[2];
  var m21 = mat[4];
  var m22 = mat[5];
  var m23 = mat[6];
  var m31 = mat[8];
  var m32 = mat[9];
  var m33 = mat[10];
  out[0] = Math.hypot(m11, m12, m13);
  out[1] = Math.hypot(m21, m22, m23);
  out[2] = Math.hypot(m31, m32, m33);
  return out;
}
/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */

function getRotation(out, mat) {
  var scaling = new ARRAY_TYPE(3);
  getScaling(scaling, mat);
  var is1 = 1 / scaling[0];
  var is2 = 1 / scaling[1];
  var is3 = 1 / scaling[2];
  var sm11 = mat[0] * is1;
  var sm12 = mat[1] * is2;
  var sm13 = mat[2] * is3;
  var sm21 = mat[4] * is1;
  var sm22 = mat[5] * is2;
  var sm23 = mat[6] * is3;
  var sm31 = mat[8] * is1;
  var sm32 = mat[9] * is2;
  var sm33 = mat[10] * is3;
  var trace = sm11 + sm22 + sm33;
  var S = 0;

  if (trace > 0) {
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (sm23 - sm32) / S;
    out[1] = (sm31 - sm13) / S;
    out[2] = (sm12 - sm21) / S;
  } else if (sm11 > sm22 && sm11 > sm33) {
    S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
    out[3] = (sm23 - sm32) / S;
    out[0] = 0.25 * S;
    out[1] = (sm12 + sm21) / S;
    out[2] = (sm31 + sm13) / S;
  } else if (sm22 > sm33) {
    S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
    out[3] = (sm31 - sm13) / S;
    out[0] = (sm12 + sm21) / S;
    out[1] = 0.25 * S;
    out[2] = (sm23 + sm32) / S;
  } else {
    S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
    out[3] = (sm12 - sm21) / S;
    out[0] = (sm31 + sm13) / S;
    out[1] = (sm23 + sm32) / S;
    out[2] = 0.25 * S;
  }

  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @returns {mat4} out
 */

function fromRotationTranslationScale(out, q, v, s) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out;
}
/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {ReadonlyVec3} v Translation vector
 * @param {ReadonlyVec3} s Scaling vector
 * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */

function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
  // Quaternion math
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var xy = x * y2;
  var xz = x * z2;
  var yy = y * y2;
  var yz = y * z2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  var sx = s[0];
  var sy = s[1];
  var sz = s[2];
  var ox = o[0];
  var oy = o[1];
  var oz = o[2];
  var out0 = (1 - (yy + zz)) * sx;
  var out1 = (xy + wz) * sx;
  var out2 = (xz - wy) * sx;
  var out4 = (xy - wz) * sy;
  var out5 = (1 - (xx + zz)) * sy;
  var out6 = (yz + wx) * sy;
  var out8 = (xz + wy) * sz;
  var out9 = (yz - wx) * sz;
  var out10 = (1 - (xx + yy)) * sz;
  out[0] = out0;
  out[1] = out1;
  out[2] = out2;
  out[3] = 0;
  out[4] = out4;
  out[5] = out5;
  out[6] = out6;
  out[7] = 0;
  out[8] = out8;
  out[9] = out9;
  out[10] = out10;
  out[11] = 0;
  out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
  out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
  out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
  out[15] = 1;
  return out;
}
/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {ReadonlyQuat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */

function fromQuat(out, q) {
  var x = q[0],
      y = q[1],
      z = q[2],
      w = q[3];
  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;
  var xx = x * x2;
  var yx = y * x2;
  var yy = y * y2;
  var zx = z * x2;
  var zy = z * y2;
  var zz = z * z2;
  var wx = w * x2;
  var wy = w * y2;
  var wz = w * z2;
  out[0] = 1 - yy - zz;
  out[1] = yx + wz;
  out[2] = zx - wy;
  out[3] = 0;
  out[4] = yx - wz;
  out[5] = 1 - xx - zz;
  out[6] = zy + wx;
  out[7] = 0;
  out[8] = zx + wy;
  out[9] = zy - wx;
  out[10] = 1 - xx - yy;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}
/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */

function frustum$1(out, left, right, bottom, top, near, far) {
  var rl = 1 / (right - left);
  var tb = 1 / (top - bottom);
  var nf = 1 / (near - far);
  out[0] = near * 2 * rl;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = near * 2 * tb;
  out[6] = 0;
  out[7] = 0;
  out[8] = (right + left) * rl;
  out[9] = (top + bottom) * tb;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = far * near * 2 * nf;
  out[15] = 0;
  return out;
}
/**
 * Generates a perspective projection matrix with the given bounds.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */

function perspective$1(out, fovy, aspect, near, far) {
  var f = 1.0 / Math.tan(fovy / 2),
      nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;

  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = 2 * far * near * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }

  return out;
}
/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function perspectiveFromFieldOfView(out, fov, near, far) {
  var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
  var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
  var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
  var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
  var xScale = 2.0 / (leftTan + rightTan);
  var yScale = 2.0 / (upTan + downTan);
  out[0] = xScale;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  out[4] = 0.0;
  out[5] = yScale;
  out[6] = 0.0;
  out[7] = 0.0;
  out[8] = -((leftTan - rightTan) * xScale * 0.5);
  out[9] = (upTan - downTan) * yScale * 0.5;
  out[10] = far / (near - far);
  out[11] = -1.0;
  out[12] = 0.0;
  out[13] = 0.0;
  out[14] = far * near / (near - far);
  out[15] = 0.0;
  return out;
}
/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */

function ortho$1(out, left, right, bottom, top, near, far) {
  var lr = 1 / (left - right);
  var bt = 1 / (bottom - top);
  var nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis.
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function lookAt$1(out, eye, center, up) {
  var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
  var eyex = eye[0];
  var eyey = eye[1];
  var eyez = eye[2];
  var upx = up[0];
  var upy = up[1];
  var upz = up[2];
  var centerx = center[0];
  var centery = center[1];
  var centerz = center[2];

  if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
    return identity$3(out);
  }

  z0 = eyex - centerx;
  z1 = eyey - centery;
  z2 = eyez - centerz;
  len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  x0 = upy * z2 - upz * z1;
  x1 = upz * z0 - upx * z2;
  x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);

  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  y0 = z1 * x2 - z2 * x1;
  y1 = z2 * x0 - z0 * x2;
  y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);

  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}
/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {ReadonlyVec3} eye Position of the viewer
 * @param {ReadonlyVec3} center Point the viewer is looking at
 * @param {ReadonlyVec3} up vec3 pointing up
 * @returns {mat4} out
 */

function targetTo(out, eye, target, up) {
  var eyex = eye[0],
      eyey = eye[1],
      eyez = eye[2],
      upx = up[0],
      upy = up[1],
      upz = up[2];
  var z0 = eyex - target[0],
      z1 = eyey - target[1],
      z2 = eyez - target[2];
  var len = z0 * z0 + z1 * z1 + z2 * z2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    z0 *= len;
    z1 *= len;
    z2 *= len;
  }

  var x0 = upy * z2 - upz * z1,
      x1 = upz * z0 - upx * z2,
      x2 = upx * z1 - upy * z0;
  len = x0 * x0 + x1 * x1 + x2 * x2;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
  }

  out[0] = x0;
  out[1] = x1;
  out[2] = x2;
  out[3] = 0;
  out[4] = z1 * x2 - z2 * x1;
  out[5] = z2 * x0 - z0 * x2;
  out[6] = z0 * x1 - z1 * x0;
  out[7] = 0;
  out[8] = z0;
  out[9] = z1;
  out[10] = z2;
  out[11] = 0;
  out[12] = eyex;
  out[13] = eyey;
  out[14] = eyez;
  out[15] = 1;
  return out;
}
/**
 * Returns a string representation of a mat4
 *
 * @param {ReadonlyMat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */

function str$5(a) {
  return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
/**
 * Returns Frobenius norm of a mat4
 *
 * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */

function frob(a) {
  return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function add$6(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  out[8] = a[8] + b[8];
  out[9] = a[9] + b[9];
  out[10] = a[10] + b[10];
  out[11] = a[11] + b[11];
  out[12] = a[12] + b[12];
  out[13] = a[13] + b[13];
  out[14] = a[14] + b[14];
  out[15] = a[15] + b[15];
  return out;
}
/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @returns {mat4} out
 */

function subtract$4(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  out[4] = a[4] - b[4];
  out[5] = a[5] - b[5];
  out[6] = a[6] - b[6];
  out[7] = a[7] - b[7];
  out[8] = a[8] - b[8];
  out[9] = a[9] - b[9];
  out[10] = a[10] - b[10];
  out[11] = a[11] - b[11];
  out[12] = a[12] - b[12];
  out[13] = a[13] - b[13];
  out[14] = a[14] - b[14];
  out[15] = a[15] - b[15];
  return out;
}
/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {ReadonlyMat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */

function multiplyScalar(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  out[8] = a[8] * b;
  out[9] = a[9] * b;
  out[10] = a[10] * b;
  out[11] = a[11] * b;
  out[12] = a[12] * b;
  out[13] = a[13] * b;
  out[14] = a[14] * b;
  out[15] = a[15] * b;
  return out;
}
/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {ReadonlyMat4} a the first operand
 * @param {ReadonlyMat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */

function multiplyScalarAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  out[4] = a[4] + b[4] * scale;
  out[5] = a[5] + b[5] * scale;
  out[6] = a[6] + b[6] * scale;
  out[7] = a[7] + b[7] * scale;
  out[8] = a[8] + b[8] * scale;
  out[9] = a[9] + b[9] * scale;
  out[10] = a[10] + b[10] * scale;
  out[11] = a[11] + b[11] * scale;
  out[12] = a[12] + b[12] * scale;
  out[13] = a[13] + b[13] * scale;
  out[14] = a[14] + b[14] * scale;
  out[15] = a[15] + b[15] * scale;
  return out;
}
/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function exactEquals$5(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {ReadonlyMat4} a The first matrix.
 * @param {ReadonlyMat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */

function equals$5(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var a8 = a[8],
      a9 = a[9],
      a10 = a[10],
      a11 = a[11];
  var a12 = a[12],
      a13 = a[13],
      a14 = a[14],
      a15 = a[15];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  var b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  var b8 = b[8],
      b9 = b[9],
      b10 = b[10],
      b11 = b[11];
  var b12 = b[12],
      b13 = b[13],
      b14 = b[14],
      b15 = b[15];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}
/**
 * Alias for {@link mat4.multiply}
 * @function
 */

var mul$5 = multiply$7;
/**
 * Alias for {@link mat4.subtract}
 * @function
 */

var sub$3 = subtract$4;

var mat4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$6,
  clone: clone$5,
  copy: copy$7,
  fromValues: fromValues$5,
  set: set$5,
  identity: identity$3,
  transpose: transpose$1,
  invert: invert$2,
  adjoint: adjoint,
  determinant: determinant,
  multiply: multiply$7,
  translate: translate$2,
  scale: scale$6,
  rotate: rotate$1,
  rotateX: rotateX$4,
  rotateY: rotateY$4,
  rotateZ: rotateZ$4,
  fromTranslation: fromTranslation$1,
  fromScaling: fromScaling,
  fromRotation: fromRotation$1,
  fromXRotation: fromXRotation,
  fromYRotation: fromYRotation,
  fromZRotation: fromZRotation,
  fromRotationTranslation: fromRotationTranslation$1,
  fromQuat2: fromQuat2,
  getTranslation: getTranslation$2,
  getScaling: getScaling,
  getRotation: getRotation,
  fromRotationTranslationScale: fromRotationTranslationScale,
  fromRotationTranslationScaleOrigin: fromRotationTranslationScaleOrigin,
  fromQuat: fromQuat,
  frustum: frustum$1,
  perspective: perspective$1,
  perspectiveFromFieldOfView: perspectiveFromFieldOfView,
  ortho: ortho$1,
  lookAt: lookAt$1,
  targetTo: targetTo,
  str: str$5,
  frob: frob,
  add: add$6,
  subtract: subtract$4,
  multiplyScalar: multiplyScalar,
  multiplyScalarAndAdd: multiplyScalarAndAdd,
  exactEquals: exactEquals$5,
  equals: equals$5,
  mul: mul$5,
  sub: sub$3
});

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */

function create$5() {
  var out = new ARRAY_TYPE(3);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  return out;
}
/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {ReadonlyVec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */

function clone$4(a) {
  var out = new ARRAY_TYPE(3);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Calculates the length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate length of
 * @returns {Number} length of a
 */

function length$6(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return Math.hypot(x, y, z);
}
/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */

function fromValues$4(x, y, z) {
  var out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the source vector
 * @returns {vec3} out
 */

function copy$6(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  return out;
}
/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */

function set$4(out, x, y, z) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}
/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function add$5(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function subtract$3(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  return out;
}
/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function multiply$6(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  return out;
}
/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function divide$3(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  return out;
}
/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to ceil
 * @returns {vec3} out
 */

function ceil$2(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out;
}
/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to floor
 * @returns {vec3} out
 */

function floor$2(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out;
}
/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function min$3(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  return out;
}
/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function max$3(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  return out;
}
/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to round
 * @returns {vec3} out
 */

function round$2(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out;
}
/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */

function scale$5(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  return out;
}
/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */

function scaleAndAdd$2(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} distance between a and b
 */

function distance$3(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return Math.hypot(x, y, z);
}
/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance$2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  return x * x + y * y + z * z;
}
/**
 * Calculates the squared length of a vec3
 *
 * @param {ReadonlyVec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength$4(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  return x * x + y * y + z * z;
}
/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to negate
 * @returns {vec3} out
 */

function negate$4(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  return out;
}
/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to invert
 * @returns {vec3} out
 */

function inverse$3(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
}
/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a vector to normalize
 * @returns {vec3} out
 */

function normalize$5(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var len = x * x + y * y + z * z;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  out[2] = a[2] * len;
  return out;
}
/**
 * Calculates the dot product of two vec3's
 *
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot$5(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @returns {vec3} out
 */

function cross$3(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2];
  var bx = b[0],
      by = b[1],
      bz = b[2];
  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}
/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function lerp$5(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  return out;
}
/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function hermite(out, a, b, c, d, t) {
  var factorTimes2 = t * t;
  var factor1 = factorTimes2 * (2 * t - 3) + 1;
  var factor2 = factorTimes2 * (t - 2) + t;
  var factor3 = factorTimes2 * (t - 1);
  var factor4 = factorTimes2 * (3 - 2 * t);
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the first operand
 * @param {ReadonlyVec3} b the second operand
 * @param {ReadonlyVec3} c the third operand
 * @param {ReadonlyVec3} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec3} out
 */

function bezier(out, a, b, c, d, t) {
  var inverseFactor = 1 - t;
  var inverseFactorTimesTwo = inverseFactor * inverseFactor;
  var factorTimes2 = t * t;
  var factor1 = inverseFactorTimesTwo * inverseFactor;
  var factor2 = 3 * t * inverseFactorTimesTwo;
  var factor3 = 3 * factorTimes2 * inverseFactor;
  var factor4 = factorTimes2 * t;
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */

function random$3(out, scale) {
  scale = scale || 1.0;
  var r = RANDOM() * 2.0 * Math.PI;
  var z = RANDOM() * 2.0 - 1.0;
  var zScale = Math.sqrt(1.0 - z * z) * scale;
  out[0] = Math.cos(r) * zScale;
  out[1] = Math.sin(r) * zScale;
  out[2] = z * scale;
  return out;
}
/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec3} out
 */

function transformMat4$2(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var w = m[3] * x + m[7] * y + m[11] * z + m[15];
  w = w || 1.0;
  out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
  out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
  out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
  return out;
}
/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyMat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */

function transformMat3$1(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x * m[0] + y * m[3] + z * m[6];
  out[1] = x * m[1] + y * m[4] + z * m[7];
  out[2] = x * m[2] + y * m[5] + z * m[8];
  return out;
}
/**
 * Transforms the vec3 with a quat
 * Can also be used for dual quaternions. (Multiply it with the real part)
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec3} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec3} out
 */

function transformQuat$1(out, a, q) {
  // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3];
  var x = a[0],
      y = a[1],
      z = a[2]; // var qvec = [qx, qy, qz];
  // var uv = vec3.cross([], qvec, a);

  var uvx = qy * z - qz * y,
      uvy = qz * x - qx * z,
      uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

  var uuvx = qy * uvz - qz * uvy,
      uuvy = qz * uvx - qx * uvz,
      uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

  var w2 = qw * 2;
  uvx *= w2;
  uvy *= w2;
  uvz *= w2; // vec3.scale(uuv, uuv, 2);

  uuvx *= 2;
  uuvy *= 2;
  uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

  out[0] = x + uvx + uuvx;
  out[1] = y + uvy + uuvy;
  out[2] = z + uvz + uuvz;
  return out;
}
/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateX$3(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0];
  r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
  r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateY$3(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
  r[1] = p[1];
  r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {ReadonlyVec3} a The vec3 point to rotate
 * @param {ReadonlyVec3} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec3} out
 */

function rotateZ$3(out, a, b, rad) {
  var p = [],
      r = []; //Translate point to the origin

  p[0] = a[0] - b[0];
  p[1] = a[1] - b[1];
  p[2] = a[2] - b[2]; //perform rotation

  r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
  r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
  r[2] = p[2]; //translate to correct position

  out[0] = r[0] + b[0];
  out[1] = r[1] + b[1];
  out[2] = r[2] + b[2];
  return out;
}
/**
 * Get the angle between two 3D vectors
 * @param {ReadonlyVec3} a The first operand
 * @param {ReadonlyVec3} b The second operand
 * @returns {Number} The angle in radians
 */

function angle$1(a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      bx = b[0],
      by = b[1],
      bz = b[2],
      mag1 = Math.sqrt(ax * ax + ay * ay + az * az),
      mag2 = Math.sqrt(bx * bx + by * by + bz * bz),
      mag = mag1 * mag2,
      cosine = mag && dot$5(a, b) / mag;
  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Set the components of a vec3 to zero
 *
 * @param {vec3} out the receiving vector
 * @returns {vec3} out
 */

function zero$2(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str$4(a) {
  return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals$4(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec3} a The first vector.
 * @param {ReadonlyVec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals$4(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}
/**
 * Alias for {@link vec3.subtract}
 * @function
 */

var sub$2 = subtract$3;
/**
 * Alias for {@link vec3.multiply}
 * @function
 */

var mul$4 = multiply$6;
/**
 * Alias for {@link vec3.divide}
 * @function
 */

var div$2 = divide$3;
/**
 * Alias for {@link vec3.distance}
 * @function
 */

var dist$2 = distance$3;
/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */

var sqrDist$2 = squaredDistance$2;
/**
 * Alias for {@link vec3.length}
 * @function
 */

var len$4 = length$6;
/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */

var sqrLen$4 = squaredLength$4;
/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach$3 = function () {
  var vec = create$5();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 3;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
    }

    return a;
  };
}();

var vec3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$5,
  clone: clone$4,
  length: length$6,
  fromValues: fromValues$4,
  copy: copy$6,
  set: set$4,
  add: add$5,
  subtract: subtract$3,
  multiply: multiply$6,
  divide: divide$3,
  ceil: ceil$2,
  floor: floor$2,
  min: min$3,
  max: max$3,
  round: round$2,
  scale: scale$5,
  scaleAndAdd: scaleAndAdd$2,
  distance: distance$3,
  squaredDistance: squaredDistance$2,
  squaredLength: squaredLength$4,
  negate: negate$4,
  inverse: inverse$3,
  normalize: normalize$5,
  dot: dot$5,
  cross: cross$3,
  lerp: lerp$5,
  hermite: hermite,
  bezier: bezier,
  random: random$3,
  transformMat4: transformMat4$2,
  transformMat3: transformMat3$1,
  transformQuat: transformQuat$1,
  rotateX: rotateX$3,
  rotateY: rotateY$3,
  rotateZ: rotateZ$3,
  angle: angle$1,
  zero: zero$2,
  str: str$4,
  exactEquals: exactEquals$4,
  equals: equals$4,
  sub: sub$2,
  mul: mul$4,
  div: div$2,
  dist: dist$2,
  sqrDist: sqrDist$2,
  len: len$4,
  sqrLen: sqrLen$4,
  forEach: forEach$3
});

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */

function create$4() {
  var out = new ARRAY_TYPE(4);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
  }

  return out;
}
/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {ReadonlyVec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */

function clone$3(a) {
  var out = new ARRAY_TYPE(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */

function fromValues$3(x, y, z, w) {
  var out = new ARRAY_TYPE(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the source vector
 * @returns {vec4} out
 */

function copy$5(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */

function set$3(out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out;
}
/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function add$4(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function subtract$2(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  out[2] = a[2] - b[2];
  out[3] = a[3] - b[3];
  return out;
}
/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function multiply$5(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  out[2] = a[2] * b[2];
  out[3] = a[3] * b[3];
  return out;
}
/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function divide$2(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  out[2] = a[2] / b[2];
  out[3] = a[3] / b[3];
  return out;
}
/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to ceil
 * @returns {vec4} out
 */

function ceil$1(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  out[3] = Math.ceil(a[3]);
  return out;
}
/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to floor
 * @returns {vec4} out
 */

function floor$1(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  out[3] = Math.floor(a[3]);
  return out;
}
/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function min$2(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  out[2] = Math.min(a[2], b[2]);
  out[3] = Math.min(a[3], b[3]);
  return out;
}
/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {vec4} out
 */

function max$2(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  out[2] = Math.max(a[2], b[2]);
  out[3] = Math.max(a[3], b[3]);
  return out;
}
/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to round
 * @returns {vec4} out
 */

function round$1(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  out[3] = Math.round(a[3]);
  return out;
}
/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */

function scale$4(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out;
}
/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */

function scaleAndAdd$1(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  out[2] = a[2] + b[2] * scale;
  out[3] = a[3] + b[3] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} distance between a and b
 */

function distance$2(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance$1(a, b) {
  var x = b[0] - a[0];
  var y = b[1] - a[1];
  var z = b[2] - a[2];
  var w = b[3] - a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Calculates the length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate length of
 * @returns {Number} length of a
 */

function length$5(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return Math.hypot(x, y, z, w);
}
/**
 * Calculates the squared length of a vec4
 *
 * @param {ReadonlyVec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength$3(a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  return x * x + y * y + z * z + w * w;
}
/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to negate
 * @returns {vec4} out
 */

function negate$3(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = -a[3];
  return out;
}
/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to invert
 * @returns {vec4} out
 */

function inverse$2(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
}
/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a vector to normalize
 * @returns {vec4} out
 */

function normalize$4(out, a) {
  var x = a[0];
  var y = a[1];
  var z = a[2];
  var w = a[3];
  var len = x * x + y * y + z * z + w * w;

  if (len > 0) {
    len = 1 / Math.sqrt(len);
  }

  out[0] = x * len;
  out[1] = y * len;
  out[2] = z * len;
  out[3] = w * len;
  return out;
}
/**
 * Calculates the dot product of two vec4's
 *
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot$4(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}
/**
 * Returns the cross-product of three vectors in a 4-dimensional space
 *
 * @param {ReadonlyVec4} result the receiving vector
 * @param {ReadonlyVec4} U the first vector
 * @param {ReadonlyVec4} V the second vector
 * @param {ReadonlyVec4} W the third vector
 * @returns {vec4} result
 */

function cross$2(out, u, v, w) {
  var A = v[0] * w[1] - v[1] * w[0],
      B = v[0] * w[2] - v[2] * w[0],
      C = v[0] * w[3] - v[3] * w[0],
      D = v[1] * w[2] - v[2] * w[1],
      E = v[1] * w[3] - v[3] * w[1],
      F = v[2] * w[3] - v[3] * w[2];
  var G = u[0];
  var H = u[1];
  var I = u[2];
  var J = u[3];
  out[0] = H * F - I * E + J * D;
  out[1] = -(G * F) + I * C - J * B;
  out[2] = G * E - H * C + J * A;
  out[3] = -(G * D) + H * B - I * A;
  return out;
}
/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the first operand
 * @param {ReadonlyVec4} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec4} out
 */

function lerp$4(out, a, b, t) {
  var ax = a[0];
  var ay = a[1];
  var az = a[2];
  var aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */

function random$2(out, scale) {
  scale = scale || 1.0; // Marsaglia, George. Choosing a Point from the Surface of a
  // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
  // http://projecteuclid.org/euclid.aoms/1177692644;

  var v1, v2, v3, v4;
  var s1, s2;

  do {
    v1 = RANDOM() * 2 - 1;
    v2 = RANDOM() * 2 - 1;
    s1 = v1 * v1 + v2 * v2;
  } while (s1 >= 1);

  do {
    v3 = RANDOM() * 2 - 1;
    v4 = RANDOM() * 2 - 1;
    s2 = v3 * v3 + v4 * v4;
  } while (s2 >= 1);

  var d = Math.sqrt((1 - s1) / s2);
  out[0] = scale * v1;
  out[1] = scale * v2;
  out[2] = scale * v3 * d;
  out[3] = scale * v4 * d;
  return out;
}
/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec4} out
 */

function transformMat4$1(out, a, m) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
  out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
  return out;
}
/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {ReadonlyVec4} a the vector to transform
 * @param {ReadonlyQuat} q quaternion to transform with
 * @returns {vec4} out
 */

function transformQuat(out, a, q) {
  var x = a[0],
      y = a[1],
      z = a[2];
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3]; // calculate quat * vec

  var ix = qw * x + qy * z - qz * y;
  var iy = qw * y + qz * x - qx * z;
  var iz = qw * z + qx * y - qy * x;
  var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

  out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
  out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
  out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  out[3] = a[3];
  return out;
}
/**
 * Set the components of a vec4 to zero
 *
 * @param {vec4} out the receiving vector
 * @returns {vec4} out
 */

function zero$1(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  out[2] = 0.0;
  out[3] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str$3(a) {
  return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals$3(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec4} a The first vector.
 * @param {ReadonlyVec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals$3(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
}
/**
 * Alias for {@link vec4.subtract}
 * @function
 */

var sub$1 = subtract$2;
/**
 * Alias for {@link vec4.multiply}
 * @function
 */

var mul$3 = multiply$5;
/**
 * Alias for {@link vec4.divide}
 * @function
 */

var div$1 = divide$2;
/**
 * Alias for {@link vec4.distance}
 * @function
 */

var dist$1 = distance$2;
/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */

var sqrDist$1 = squaredDistance$1;
/**
 * Alias for {@link vec4.length}
 * @function
 */

var len$3 = length$5;
/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */

var sqrLen$3 = squaredLength$3;
/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach$2 = function () {
  var vec = create$4();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 4;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      vec[2] = a[i + 2];
      vec[3] = a[i + 3];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
      a[i + 2] = vec[2];
      a[i + 3] = vec[3];
    }

    return a;
  };
}();

var vec4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$4,
  clone: clone$3,
  fromValues: fromValues$3,
  copy: copy$5,
  set: set$3,
  add: add$4,
  subtract: subtract$2,
  multiply: multiply$5,
  divide: divide$2,
  ceil: ceil$1,
  floor: floor$1,
  min: min$2,
  max: max$2,
  round: round$1,
  scale: scale$4,
  scaleAndAdd: scaleAndAdd$1,
  distance: distance$2,
  squaredDistance: squaredDistance$1,
  length: length$5,
  squaredLength: squaredLength$3,
  negate: negate$3,
  inverse: inverse$2,
  normalize: normalize$4,
  dot: dot$4,
  cross: cross$2,
  lerp: lerp$4,
  random: random$2,
  transformMat4: transformMat4$1,
  transformQuat: transformQuat,
  zero: zero$1,
  str: str$3,
  exactEquals: exactEquals$3,
  equals: equals$3,
  sub: sub$1,
  mul: mul$3,
  div: div$1,
  dist: dist$1,
  sqrDist: sqrDist$1,
  len: len$3,
  sqrLen: sqrLen$3,
  forEach: forEach$2
});

/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */

function create$3() {
  var out = new ARRAY_TYPE(4);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
  }

  out[3] = 1;
  return out;
}
/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */

function identity$2(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}
/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyVec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/

function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}
/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {ReadonlyQuat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */

function getAxisAngle(out_axis, q) {
  var rad = Math.acos(q[3]) * 2.0;
  var s = Math.sin(rad / 2.0);

  if (s > EPSILON) {
    out_axis[0] = q[0] / s;
    out_axis[1] = q[1] / s;
    out_axis[2] = q[2] / s;
  } else {
    // If s is zero, return any axis (no rotation - axis does not matter)
    out_axis[0] = 1;
    out_axis[1] = 0;
    out_axis[2] = 0;
  }

  return rad;
}
/**
 * Gets the angular distance between two unit quaternions
 *
 * @param  {ReadonlyQuat} a     Origin unit quaternion
 * @param  {ReadonlyQuat} b     Destination unit quaternion
 * @return {Number}     Angle, in radians, between the two quaternions
 */

function getAngle(a, b) {
  var dotproduct = dot$3(a, b);
  return Math.acos(2 * dotproduct * dotproduct - 1);
}
/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {quat} out
 */

function multiply$4(out, a, b) {
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateX$2(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateY$2(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var by = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out;
}
/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {ReadonlyQuat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */

function rotateZ$2(out, a, rad) {
  rad *= 0.5;
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bz = Math.sin(rad),
      bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out;
}
/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate W component of
 * @returns {quat} out
 */

function calculateW(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out;
}
/**
 * Calculate the exponential of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @returns {quat} out
 */

function exp(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var et = Math.exp(w);
  var s = r > 0 ? et * Math.sin(r) / r : 0;
  out[0] = x * s;
  out[1] = y * s;
  out[2] = z * s;
  out[3] = et * Math.cos(r);
  return out;
}
/**
 * Calculate the natural logarithm of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @returns {quat} out
 */

function ln(out, a) {
  var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
  var r = Math.sqrt(x * x + y * y + z * z);
  var t = r > 0 ? Math.atan2(r, w) / r : 0;
  out[0] = x * t;
  out[1] = y * t;
  out[2] = z * t;
  out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
  return out;
}
/**
 * Calculate the scalar power of a unit quaternion.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate the exponential of
 * @param {Number} b amount to scale the quaternion by
 * @returns {quat} out
 */

function pow(out, a, b) {
  ln(out, a);
  scale$3(out, out, b);
  exp(out, out);
  return out;
}
/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  var ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  var bx = b[0],
      by = b[1],
      bz = b[2],
      bw = b[3];
  var omega, cosom, sinom, scale0, scale1; // calc cosine

  cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  } // calculate coefficients


  if (1.0 - cosom > EPSILON) {
    // standard case (slerp)
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  } // calculate final values


  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out;
}
/**
 * Generates a random unit quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */

function random$1(out) {
  // Implementation of http://planning.cs.uiuc.edu/node198.html
  // TODO: Calling random 3 times is probably not the fastest solution
  var u1 = RANDOM();
  var u2 = RANDOM();
  var u3 = RANDOM();
  var sqrt1MinusU1 = Math.sqrt(1 - u1);
  var sqrtU1 = Math.sqrt(u1);
  out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
  out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
  out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
  out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
  return out;
}
/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate inverse of
 * @returns {quat} out
 */

function invert$1(out, a) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3];
  var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
  var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out;
}
/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quat to calculate conjugate of
 * @returns {quat} out
 */

function conjugate$1(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out;
}
/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyMat3} m rotation matrix
 * @returns {quat} out
 * @function
 */

function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;

  if (fTrace > 0.0) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0); // 2w

    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot; // 1/(4w)

    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    // |w| <= 1/2
    var i = 0;
    if (m[4] > m[0]) i = 1;
    if (m[8] > m[i * 3 + i]) i = 2;
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }

  return out;
}
/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */

function fromEuler(out, x, y, z) {
  var halfToRad = 0.5 * Math.PI / 180.0;
  x *= halfToRad;
  y *= halfToRad;
  z *= halfToRad;
  var sx = Math.sin(x);
  var cx = Math.cos(x);
  var sy = Math.sin(y);
  var cy = Math.cos(y);
  var sz = Math.sin(z);
  var cz = Math.cos(z);
  out[0] = sx * cy * cz - cx * sy * sz;
  out[1] = cx * sy * cz + sx * cy * sz;
  out[2] = cx * cy * sz - sx * sy * cz;
  out[3] = cx * cy * cz + sx * sy * sz;
  return out;
}
/**
 * Returns a string representation of a quatenion
 *
 * @param {ReadonlyQuat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str$2(a) {
  return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
}
/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {ReadonlyQuat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */

var clone$2 = clone$3;
/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */

var fromValues$2 = fromValues$3;
/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the source quaternion
 * @returns {quat} out
 * @function
 */

var copy$4 = copy$5;
/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */

var set$2 = set$3;
/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {quat} out
 * @function
 */

var add$3 = add$4;
/**
 * Alias for {@link quat.multiply}
 * @function
 */

var mul$2 = multiply$4;
/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {ReadonlyQuat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */

var scale$3 = scale$4;
/**
 * Calculates the dot product of two quat's
 *
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

var dot$3 = dot$4;
/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 * @function
 */

var lerp$3 = lerp$4;
/**
 * Calculates the length of a quat
 *
 * @param {ReadonlyQuat} a vector to calculate length of
 * @returns {Number} length of a
 */

var length$4 = length$5;
/**
 * Alias for {@link quat.length}
 * @function
 */

var len$2 = length$4;
/**
 * Calculates the squared length of a quat
 *
 * @param {ReadonlyQuat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */

var squaredLength$2 = squaredLength$3;
/**
 * Alias for {@link quat.squaredLength}
 * @function
 */

var sqrLen$2 = squaredLength$2;
/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */

var normalize$3 = normalize$4;
/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyQuat} a The first quaternion.
 * @param {ReadonlyQuat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

var exactEquals$2 = exactEquals$3;
/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {ReadonlyQuat} a The first vector.
 * @param {ReadonlyQuat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

var equals$2 = equals$3;
/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {ReadonlyVec3} a the initial vector
 * @param {ReadonlyVec3} b the destination vector
 * @returns {quat} out
 */

var rotationTo = function () {
  var tmpvec3 = create$5();
  var xUnitVec3 = fromValues$4(1, 0, 0);
  var yUnitVec3 = fromValues$4(0, 1, 0);
  return function (out, a, b) {
    var dot = dot$5(a, b);

    if (dot < -0.999999) {
      cross$3(tmpvec3, xUnitVec3, a);
      if (len$4(tmpvec3) < 0.000001) cross$3(tmpvec3, yUnitVec3, a);
      normalize$5(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross$3(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize$3(out, out);
    }
  };
}();
/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {ReadonlyQuat} a the first operand
 * @param {ReadonlyQuat} b the second operand
 * @param {ReadonlyQuat} c the third operand
 * @param {ReadonlyQuat} d the fourth operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat} out
 */

var sqlerp = function () {
  var temp1 = create$3();
  var temp2 = create$3();
  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));
    return out;
  };
}();
/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {ReadonlyVec3} view  the vector representing the viewing direction
 * @param {ReadonlyVec3} right the vector representing the local "right" direction
 * @param {ReadonlyVec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */

var setAxes = function () {
  var matr = create$7();
  return function (out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];
    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];
    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];
    return normalize$3(out, fromMat3(out, matr));
  };
}();

var quat = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$3,
  identity: identity$2,
  setAxisAngle: setAxisAngle,
  getAxisAngle: getAxisAngle,
  getAngle: getAngle,
  multiply: multiply$4,
  rotateX: rotateX$2,
  rotateY: rotateY$2,
  rotateZ: rotateZ$2,
  calculateW: calculateW,
  exp: exp,
  ln: ln,
  pow: pow,
  slerp: slerp,
  random: random$1,
  invert: invert$1,
  conjugate: conjugate$1,
  fromMat3: fromMat3,
  fromEuler: fromEuler,
  str: str$2,
  clone: clone$2,
  fromValues: fromValues$2,
  copy: copy$4,
  set: set$2,
  add: add$3,
  mul: mul$2,
  scale: scale$3,
  dot: dot$3,
  lerp: lerp$3,
  length: length$4,
  len: len$2,
  squaredLength: squaredLength$2,
  sqrLen: sqrLen$2,
  normalize: normalize$3,
  exactEquals: exactEquals$2,
  equals: equals$2,
  rotationTo: rotationTo,
  sqlerp: sqlerp,
  setAxes: setAxes
});

/**
 * Dual Quaternion<br>
 * Format: [real, dual]<br>
 * Quaternion format: XYZW<br>
 * Make sure to have normalized dual quaternions, otherwise the functions may not work as intended.<br>
 * @module quat2
 */

/**
 * Creates a new identity dual quat
 *
 * @returns {quat2} a new dual quaternion [real -> rotation, dual -> translation]
 */

function create$2() {
  var dq = new ARRAY_TYPE(8);

  if (ARRAY_TYPE != Float32Array) {
    dq[0] = 0;
    dq[1] = 0;
    dq[2] = 0;
    dq[4] = 0;
    dq[5] = 0;
    dq[6] = 0;
    dq[7] = 0;
  }

  dq[3] = 1;
  return dq;
}
/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {ReadonlyQuat2} a dual quaternion to clone
 * @returns {quat2} new dual quaternion
 * @function
 */

function clone$1(a) {
  var dq = new ARRAY_TYPE(8);
  dq[0] = a[0];
  dq[1] = a[1];
  dq[2] = a[2];
  dq[3] = a[3];
  dq[4] = a[4];
  dq[5] = a[5];
  dq[6] = a[6];
  dq[7] = a[7];
  return dq;
}
/**
 * Creates a new dual quat initialized with the given values
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} new dual quaternion
 * @function
 */

function fromValues$1(x1, y1, z1, w1, x2, y2, z2, w2) {
  var dq = new ARRAY_TYPE(8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  dq[4] = x2;
  dq[5] = y2;
  dq[6] = z2;
  dq[7] = w2;
  return dq;
}
/**
 * Creates a new dual quat from the given values (quat and translation)
 *
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component (translation)
 * @param {Number} y2 Y component (translation)
 * @param {Number} z2 Z component (translation)
 * @returns {quat2} new dual quaternion
 * @function
 */

function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
  var dq = new ARRAY_TYPE(8);
  dq[0] = x1;
  dq[1] = y1;
  dq[2] = z1;
  dq[3] = w1;
  var ax = x2 * 0.5,
      ay = y2 * 0.5,
      az = z2 * 0.5;
  dq[4] = ax * w1 + ay * z1 - az * y1;
  dq[5] = ay * w1 + az * x1 - ax * z1;
  dq[6] = az * w1 + ax * y1 - ay * x1;
  dq[7] = -ax * x1 - ay * y1 - az * z1;
  return dq;
}
/**
 * Creates a dual quat from a quaternion and a translation
 *
 * @param {ReadonlyQuat2} dual quaternion receiving operation result
 * @param {ReadonlyQuat} q a normalized quaternion
 * @param {ReadonlyVec3} t tranlation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */

function fromRotationTranslation(out, q, t) {
  var ax = t[0] * 0.5,
      ay = t[1] * 0.5,
      az = t[2] * 0.5,
      bx = q[0],
      by = q[1],
      bz = q[2],
      bw = q[3];
  out[0] = bx;
  out[1] = by;
  out[2] = bz;
  out[3] = bw;
  out[4] = ax * bw + ay * bz - az * by;
  out[5] = ay * bw + az * bx - ax * bz;
  out[6] = az * bw + ax * by - ay * bx;
  out[7] = -ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Creates a dual quat from a translation
 *
 * @param {ReadonlyQuat2} dual quaternion receiving operation result
 * @param {ReadonlyVec3} t translation vector
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */

function fromTranslation(out, t) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = t[0] * 0.5;
  out[5] = t[1] * 0.5;
  out[6] = t[2] * 0.5;
  out[7] = 0;
  return out;
}
/**
 * Creates a dual quat from a quaternion
 *
 * @param {ReadonlyQuat2} dual quaternion receiving operation result
 * @param {ReadonlyQuat} q the quaternion
 * @returns {quat2} dual quaternion receiving operation result
 * @function
 */

function fromRotation(out, q) {
  out[0] = q[0];
  out[1] = q[1];
  out[2] = q[2];
  out[3] = q[3];
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}
/**
 * Creates a new dual quat from a matrix (4x4)
 *
 * @param {quat2} out the dual quaternion
 * @param {ReadonlyMat4} a the matrix
 * @returns {quat2} dual quat receiving operation result
 * @function
 */

function fromMat4(out, a) {
  //TODO Optimize this
  var outer = create$3();
  getRotation(outer, a);
  var t = new ARRAY_TYPE(3);
  getTranslation$2(t, a);
  fromRotationTranslation(out, outer, t);
  return out;
}
/**
 * Copy the values from one dual quat to another
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the source dual quaternion
 * @returns {quat2} out
 * @function
 */

function copy$3(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  out[4] = a[4];
  out[5] = a[5];
  out[6] = a[6];
  out[7] = a[7];
  return out;
}
/**
 * Set a dual quat to the identity dual quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @returns {quat2} out
 */

function identity$1(out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  out[4] = 0;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  return out;
}
/**
 * Set the components of a dual quat to the given values
 *
 * @param {quat2} out the receiving quaternion
 * @param {Number} x1 X component
 * @param {Number} y1 Y component
 * @param {Number} z1 Z component
 * @param {Number} w1 W component
 * @param {Number} x2 X component
 * @param {Number} y2 Y component
 * @param {Number} z2 Z component
 * @param {Number} w2 W component
 * @returns {quat2} out
 * @function
 */

function set$1(out, x1, y1, z1, w1, x2, y2, z2, w2) {
  out[0] = x1;
  out[1] = y1;
  out[2] = z1;
  out[3] = w1;
  out[4] = x2;
  out[5] = y2;
  out[6] = z2;
  out[7] = w2;
  return out;
}
/**
 * Gets the real part of a dual quat
 * @param  {quat} out real part
 * @param  {ReadonlyQuat2} a Dual Quaternion
 * @return {quat} real part
 */

var getReal = copy$4;
/**
 * Gets the dual part of a dual quat
 * @param  {quat} out dual part
 * @param  {ReadonlyQuat2} a Dual Quaternion
 * @return {quat} dual part
 */

function getDual(out, a) {
  out[0] = a[4];
  out[1] = a[5];
  out[2] = a[6];
  out[3] = a[7];
  return out;
}
/**
 * Set the real component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {ReadonlyQuat} q a quaternion representing the real part
 * @returns {quat2} out
 * @function
 */

var setReal = copy$4;
/**
 * Set the dual component of a dual quat to the given quaternion
 *
 * @param {quat2} out the receiving quaternion
 * @param {ReadonlyQuat} q a quaternion representing the dual part
 * @returns {quat2} out
 * @function
 */

function setDual(out, q) {
  out[4] = q[0];
  out[5] = q[1];
  out[6] = q[2];
  out[7] = q[3];
  return out;
}
/**
 * Gets the translation of a normalized dual quat
 * @param  {vec3} out translation
 * @param  {ReadonlyQuat2} a Dual Quaternion to be decomposed
 * @return {vec3} translation
 */

function getTranslation$1(out, a) {
  var ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3];
  out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
  out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
  out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
  return out;
}
/**
 * Translates a dual quat by the given vector
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to translate
 * @param {ReadonlyVec3} v vector to translate by
 * @returns {quat2} out
 */

function translate$1(out, a, v) {
  var ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3],
      bx1 = v[0] * 0.5,
      by1 = v[1] * 0.5,
      bz1 = v[2] * 0.5,
      ax2 = a[4],
      ay2 = a[5],
      az2 = a[6],
      aw2 = a[7];
  out[0] = ax1;
  out[1] = ay1;
  out[2] = az1;
  out[3] = aw1;
  out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
  out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
  out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
  out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
  return out;
}
/**
 * Rotates a dual quat around the X axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */

function rotateX$1(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  rotateX$2(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat around the Y axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */

function rotateY$1(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  rotateY$2(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat around the Z axis
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {number} rad how far should the rotation be
 * @returns {quat2} out
 */

function rotateZ$1(out, a, rad) {
  var bx = -a[0],
      by = -a[1],
      bz = -a[2],
      bw = a[3],
      ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7],
      ax1 = ax * bw + aw * bx + ay * bz - az * by,
      ay1 = ay * bw + aw * by + az * bx - ax * bz,
      az1 = az * bw + aw * bz + ax * by - ay * bx,
      aw1 = aw * bw - ax * bx - ay * by - az * bz;
  rotateZ$2(out, a, rad);
  bx = out[0];
  by = out[1];
  bz = out[2];
  bw = out[3];
  out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  return out;
}
/**
 * Rotates a dual quat by a given quaternion (a * q)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {ReadonlyQuat} q quaternion to rotate by
 * @returns {quat2} out
 */

function rotateByQuatAppend(out, a, q) {
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      ax = a[0],
      ay = a[1],
      az = a[2],
      aw = a[3];
  out[0] = ax * qw + aw * qx + ay * qz - az * qy;
  out[1] = ay * qw + aw * qy + az * qx - ax * qz;
  out[2] = az * qw + aw * qz + ax * qy - ay * qx;
  out[3] = aw * qw - ax * qx - ay * qy - az * qz;
  ax = a[4];
  ay = a[5];
  az = a[6];
  aw = a[7];
  out[4] = ax * qw + aw * qx + ay * qz - az * qy;
  out[5] = ay * qw + aw * qy + az * qx - ax * qz;
  out[6] = az * qw + aw * qz + ax * qy - ay * qx;
  out[7] = aw * qw - ax * qx - ay * qy - az * qz;
  return out;
}
/**
 * Rotates a dual quat by a given quaternion (q * a)
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat} q quaternion to rotate by
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @returns {quat2} out
 */

function rotateByQuatPrepend(out, q, a) {
  var qx = q[0],
      qy = q[1],
      qz = q[2],
      qw = q[3],
      bx = a[0],
      by = a[1],
      bz = a[2],
      bw = a[3];
  out[0] = qx * bw + qw * bx + qy * bz - qz * by;
  out[1] = qy * bw + qw * by + qz * bx - qx * bz;
  out[2] = qz * bw + qw * bz + qx * by - qy * bx;
  out[3] = qw * bw - qx * bx - qy * by - qz * bz;
  bx = a[4];
  by = a[5];
  bz = a[6];
  bw = a[7];
  out[4] = qx * bw + qw * bx + qy * bz - qz * by;
  out[5] = qy * bw + qw * by + qz * bx - qx * bz;
  out[6] = qz * bw + qw * bz + qx * by - qy * bx;
  out[7] = qw * bw - qx * bx - qy * by - qz * bz;
  return out;
}
/**
 * Rotates a dual quat around a given axis. Does the normalisation automatically
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the dual quaternion to rotate
 * @param {ReadonlyVec3} axis the axis to rotate around
 * @param {Number} rad how far the rotation should be
 * @returns {quat2} out
 */

function rotateAroundAxis(out, a, axis, rad) {
  //Special case for rad = 0
  if (Math.abs(rad) < EPSILON) {
    return copy$3(out, a);
  }

  var axisLength = Math.hypot(axis[0], axis[1], axis[2]);
  rad = rad * 0.5;
  var s = Math.sin(rad);
  var bx = s * axis[0] / axisLength;
  var by = s * axis[1] / axisLength;
  var bz = s * axis[2] / axisLength;
  var bw = Math.cos(rad);
  var ax1 = a[0],
      ay1 = a[1],
      az1 = a[2],
      aw1 = a[3];
  out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
  out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
  out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
  out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
  var ax = a[4],
      ay = a[5],
      az = a[6],
      aw = a[7];
  out[4] = ax * bw + aw * bx + ay * bz - az * by;
  out[5] = ay * bw + aw * by + az * bx - ax * bz;
  out[6] = az * bw + aw * bz + ax * by - ay * bx;
  out[7] = aw * bw - ax * bx - ay * by - az * bz;
  return out;
}
/**
 * Adds two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @returns {quat2} out
 * @function
 */

function add$2(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  out[4] = a[4] + b[4];
  out[5] = a[5] + b[5];
  out[6] = a[6] + b[6];
  out[7] = a[7] + b[7];
  return out;
}
/**
 * Multiplies two dual quat's
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @returns {quat2} out
 */

function multiply$3(out, a, b) {
  var ax0 = a[0],
      ay0 = a[1],
      az0 = a[2],
      aw0 = a[3],
      bx1 = b[4],
      by1 = b[5],
      bz1 = b[6],
      bw1 = b[7],
      ax1 = a[4],
      ay1 = a[5],
      az1 = a[6],
      aw1 = a[7],
      bx0 = b[0],
      by0 = b[1],
      bz0 = b[2],
      bw0 = b[3];
  out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
  out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
  out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
  out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
  out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
  out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
  out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
  out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
  return out;
}
/**
 * Alias for {@link quat2.multiply}
 * @function
 */

var mul$1 = multiply$3;
/**
 * Scales a dual quat by a scalar number
 *
 * @param {quat2} out the receiving dual quat
 * @param {ReadonlyQuat2} a the dual quat to scale
 * @param {Number} b amount to scale the dual quat by
 * @returns {quat2} out
 * @function
 */

function scale$2(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  out[4] = a[4] * b;
  out[5] = a[5] * b;
  out[6] = a[6] * b;
  out[7] = a[7] * b;
  return out;
}
/**
 * Calculates the dot product of two dual quat's (The dot product of the real parts)
 *
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */

var dot$2 = dot$3;
/**
 * Performs a linear interpolation between two dual quats's
 * NOTE: The resulting dual quaternions won't always be normalized (The error is most noticeable when t = 0.5)
 *
 * @param {quat2} out the receiving dual quat
 * @param {ReadonlyQuat2} a the first operand
 * @param {ReadonlyQuat2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {quat2} out
 */

function lerp$2(out, a, b, t) {
  var mt = 1 - t;
  if (dot$2(a, b) < 0) t = -t;
  out[0] = a[0] * mt + b[0] * t;
  out[1] = a[1] * mt + b[1] * t;
  out[2] = a[2] * mt + b[2] * t;
  out[3] = a[3] * mt + b[3] * t;
  out[4] = a[4] * mt + b[4] * t;
  out[5] = a[5] * mt + b[5] * t;
  out[6] = a[6] * mt + b[6] * t;
  out[7] = a[7] * mt + b[7] * t;
  return out;
}
/**
 * Calculates the inverse of a dual quat. If they are normalized, conjugate is cheaper
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a dual quat to calculate inverse of
 * @returns {quat2} out
 */

function invert(out, a) {
  var sqlen = squaredLength$1(a);
  out[0] = -a[0] / sqlen;
  out[1] = -a[1] / sqlen;
  out[2] = -a[2] / sqlen;
  out[3] = a[3] / sqlen;
  out[4] = -a[4] / sqlen;
  out[5] = -a[5] / sqlen;
  out[6] = -a[6] / sqlen;
  out[7] = a[7] / sqlen;
  return out;
}
/**
 * Calculates the conjugate of a dual quat
 * If the dual quaternion is normalized, this function is faster than quat2.inverse and produces the same result.
 *
 * @param {quat2} out the receiving quaternion
 * @param {ReadonlyQuat2} a quat to calculate conjugate of
 * @returns {quat2} out
 */

function conjugate(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  out[4] = -a[4];
  out[5] = -a[5];
  out[6] = -a[6];
  out[7] = a[7];
  return out;
}
/**
 * Calculates the length of a dual quat
 *
 * @param {ReadonlyQuat2} a dual quat to calculate length of
 * @returns {Number} length of a
 * @function
 */

var length$3 = length$4;
/**
 * Alias for {@link quat2.length}
 * @function
 */

var len$1 = length$3;
/**
 * Calculates the squared length of a dual quat
 *
 * @param {ReadonlyQuat2} a dual quat to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */

var squaredLength$1 = squaredLength$2;
/**
 * Alias for {@link quat2.squaredLength}
 * @function
 */

var sqrLen$1 = squaredLength$1;
/**
 * Normalize a dual quat
 *
 * @param {quat2} out the receiving dual quaternion
 * @param {ReadonlyQuat2} a dual quaternion to normalize
 * @returns {quat2} out
 * @function
 */

function normalize$2(out, a) {
  var magnitude = squaredLength$1(a);

  if (magnitude > 0) {
    magnitude = Math.sqrt(magnitude);
    var a0 = a[0] / magnitude;
    var a1 = a[1] / magnitude;
    var a2 = a[2] / magnitude;
    var a3 = a[3] / magnitude;
    var b0 = a[4];
    var b1 = a[5];
    var b2 = a[6];
    var b3 = a[7];
    var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = (b0 - a0 * a_dot_b) / magnitude;
    out[5] = (b1 - a1 * a_dot_b) / magnitude;
    out[6] = (b2 - a2 * a_dot_b) / magnitude;
    out[7] = (b3 - a3 * a_dot_b) / magnitude;
  }

  return out;
}
/**
 * Returns a string representation of a dual quatenion
 *
 * @param {ReadonlyQuat2} a dual quaternion to represent as a string
 * @returns {String} string representation of the dual quat
 */

function str$1(a) {
  return "quat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ")";
}
/**
 * Returns whether or not the dual quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyQuat2} a the first dual quaternion.
 * @param {ReadonlyQuat2} b the second dual quaternion.
 * @returns {Boolean} true if the dual quaternions are equal, false otherwise.
 */

function exactEquals$1(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
}
/**
 * Returns whether or not the dual quaternions have approximately the same elements in the same position.
 *
 * @param {ReadonlyQuat2} a the first dual quat.
 * @param {ReadonlyQuat2} b the second dual quat.
 * @returns {Boolean} true if the dual quats are equal, false otherwise.
 */

function equals$1(a, b) {
  var a0 = a[0],
      a1 = a[1],
      a2 = a[2],
      a3 = a[3],
      a4 = a[4],
      a5 = a[5],
      a6 = a[6],
      a7 = a[7];
  var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3],
      b4 = b[4],
      b5 = b[5],
      b6 = b[6],
      b7 = b[7];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7));
}

var quat2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$2,
  clone: clone$1,
  fromValues: fromValues$1,
  fromRotationTranslationValues: fromRotationTranslationValues,
  fromRotationTranslation: fromRotationTranslation,
  fromTranslation: fromTranslation,
  fromRotation: fromRotation,
  fromMat4: fromMat4,
  copy: copy$3,
  identity: identity$1,
  set: set$1,
  getReal: getReal,
  getDual: getDual,
  setReal: setReal,
  setDual: setDual,
  getTranslation: getTranslation$1,
  translate: translate$1,
  rotateX: rotateX$1,
  rotateY: rotateY$1,
  rotateZ: rotateZ$1,
  rotateByQuatAppend: rotateByQuatAppend,
  rotateByQuatPrepend: rotateByQuatPrepend,
  rotateAroundAxis: rotateAroundAxis,
  add: add$2,
  multiply: multiply$3,
  mul: mul$1,
  scale: scale$2,
  dot: dot$2,
  lerp: lerp$2,
  invert: invert,
  conjugate: conjugate,
  length: length$3,
  len: len$1,
  squaredLength: squaredLength$1,
  sqrLen: sqrLen$1,
  normalize: normalize$2,
  str: str$1,
  exactEquals: exactEquals$1,
  equals: equals$1
});

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */

function create$1() {
  var out = new ARRAY_TYPE(2);

  if (ARRAY_TYPE != Float32Array) {
    out[0] = 0;
    out[1] = 0;
  }

  return out;
}
/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {ReadonlyVec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */

function clone(a) {
  var out = new ARRAY_TYPE(2);
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */

function fromValues(x, y) {
  var out = new ARRAY_TYPE(2);
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the source vector
 * @returns {vec2} out
 */

function copy$2(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}
/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */

function set(out, x, y) {
  out[0] = x;
  out[1] = y;
  return out;
}
/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function add$1(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  return out;
}
/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function subtract$1(out, a, b) {
  out[0] = a[0] - b[0];
  out[1] = a[1] - b[1];
  return out;
}
/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function multiply$2(out, a, b) {
  out[0] = a[0] * b[0];
  out[1] = a[1] * b[1];
  return out;
}
/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function divide$1(out, a, b) {
  out[0] = a[0] / b[0];
  out[1] = a[1] / b[1];
  return out;
}
/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to ceil
 * @returns {vec2} out
 */

function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  return out;
}
/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to floor
 * @returns {vec2} out
 */

function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  return out;
}
/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function min$1(out, a, b) {
  out[0] = Math.min(a[0], b[0]);
  out[1] = Math.min(a[1], b[1]);
  return out;
}
/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec2} out
 */

function max$1(out, a, b) {
  out[0] = Math.max(a[0], b[0]);
  out[1] = Math.max(a[1], b[1]);
  return out;
}
/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to round
 * @returns {vec2} out
 */

function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  return out;
}
/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */

function scale$1(out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  return out;
}
/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */

function scaleAndAdd(out, a, b, scale) {
  out[0] = a[0] + b[0] * scale;
  out[1] = a[1] + b[1] * scale;
  return out;
}
/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} distance between a and b
 */

function distance$1(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return Math.hypot(x, y);
}
/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} squared distance between a and b
 */

function squaredDistance(a, b) {
  var x = b[0] - a[0],
      y = b[1] - a[1];
  return x * x + y * y;
}
/**
 * Calculates the length of a vec2
 *
 * @param {ReadonlyVec2} a vector to calculate length of
 * @returns {Number} length of a
 */

function length$2(a) {
  var x = a[0],
      y = a[1];
  return Math.hypot(x, y);
}
/**
 * Calculates the squared length of a vec2
 *
 * @param {ReadonlyVec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */

function squaredLength(a) {
  var x = a[0],
      y = a[1];
  return x * x + y * y;
}
/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to negate
 * @returns {vec2} out
 */

function negate$2(out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  return out;
}
/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to invert
 * @returns {vec2} out
 */

function inverse$1(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
}
/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a vector to normalize
 * @returns {vec2} out
 */

function normalize$1(out, a) {
  var x = a[0],
      y = a[1];
  var len = x * x + y * y;

  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
  }

  out[0] = a[0] * len;
  out[1] = a[1] * len;
  return out;
}
/**
 * Calculates the dot product of two vec2's
 *
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {Number} dot product of a and b
 */

function dot$1(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}
/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @returns {vec3} out
 */

function cross$1(out, a, b) {
  var z = a[0] * b[1] - a[1] * b[0];
  out[0] = out[1] = 0;
  out[2] = z;
  return out;
}
/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the first operand
 * @param {ReadonlyVec2} b the second operand
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
 * @returns {vec2} out
 */

function lerp$1(out, a, b, t) {
  var ax = a[0],
      ay = a[1];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  return out;
}
/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */

function random(out, scale) {
  scale = scale || 1.0;
  var r = RANDOM() * 2.0 * Math.PI;
  out[0] = Math.cos(r) * scale;
  out[1] = Math.sin(r) * scale;
  return out;
}
/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y;
  out[1] = m[1] * x + m[3] * y;
  return out;
}
/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat2d} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat2d(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[2] * y + m[4];
  out[1] = m[1] * x + m[3] * y + m[5];
  return out;
}
/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat3} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat3(out, a, m) {
  var x = a[0],
      y = a[1];
  out[0] = m[0] * x + m[3] * y + m[6];
  out[1] = m[1] * x + m[4] * y + m[7];
  return out;
}
/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {ReadonlyVec2} a the vector to transform
 * @param {ReadonlyMat4} m matrix to transform with
 * @returns {vec2} out
 */

function transformMat4(out, a, m) {
  var x = a[0];
  var y = a[1];
  out[0] = m[0] * x + m[4] * y + m[12];
  out[1] = m[1] * x + m[5] * y + m[13];
  return out;
}
/**
 * Rotate a 2D vector
 * @param {vec2} out The receiving vec2
 * @param {ReadonlyVec2} a The vec2 point to rotate
 * @param {ReadonlyVec2} b The origin of the rotation
 * @param {Number} rad The angle of rotation in radians
 * @returns {vec2} out
 */

function rotate(out, a, b, rad) {
  //Translate point to the origin
  var p0 = a[0] - b[0],
      p1 = a[1] - b[1],
      sinC = Math.sin(rad),
      cosC = Math.cos(rad); //perform rotation and translate to correct position

  out[0] = p0 * cosC - p1 * sinC + b[0];
  out[1] = p0 * sinC + p1 * cosC + b[1];
  return out;
}
/**
 * Get the angle between two 2D vectors
 * @param {ReadonlyVec2} a The first operand
 * @param {ReadonlyVec2} b The second operand
 * @returns {Number} The angle in radians
 */

function angle(a, b) {
  var x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1],
      // mag is the product of the magnitudes of a and b
  mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2),
      // mag &&.. short circuits if mag == 0
  cosine = mag && (x1 * x2 + y1 * y2) / mag; // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1

  return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**
 * Set the components of a vec2 to zero
 *
 * @param {vec2} out the receiving vector
 * @returns {vec2} out
 */

function zero(out) {
  out[0] = 0.0;
  out[1] = 0.0;
  return out;
}
/**
 * Returns a string representation of a vector
 *
 * @param {ReadonlyVec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */

function str(a) {
  return "vec2(" + a[0] + ", " + a[1] + ")";
}
/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {ReadonlyVec2} a The first vector.
 * @param {ReadonlyVec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}
/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {ReadonlyVec2} a The first vector.
 * @param {ReadonlyVec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */

function equals(a, b) {
  var a0 = a[0],
      a1 = a[1];
  var b0 = b[0],
      b1 = b[1];
  return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
}
/**
 * Alias for {@link vec2.length}
 * @function
 */

var len = length$2;
/**
 * Alias for {@link vec2.subtract}
 * @function
 */

var sub = subtract$1;
/**
 * Alias for {@link vec2.multiply}
 * @function
 */

var mul = multiply$2;
/**
 * Alias for {@link vec2.divide}
 * @function
 */

var div = divide$1;
/**
 * Alias for {@link vec2.distance}
 * @function
 */

var dist = distance$1;
/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */

var sqrDist = squaredDistance;
/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */

var sqrLen = squaredLength;
/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */

var forEach$1 = function () {
  var vec = create$1();
  return function (a, stride, offset, count, fn, arg) {
    var i, l;

    if (!stride) {
      stride = 2;
    }

    if (!offset) {
      offset = 0;
    }

    if (count) {
      l = Math.min(count * stride + offset, a.length);
    } else {
      l = a.length;
    }

    for (i = offset; i < l; i += stride) {
      vec[0] = a[i];
      vec[1] = a[i + 1];
      fn(vec, vec, arg);
      a[i] = vec[0];
      a[i + 1] = vec[1];
    }

    return a;
  };
}();

var vec2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create: create$1,
  clone: clone,
  fromValues: fromValues,
  copy: copy$2,
  set: set,
  add: add$1,
  subtract: subtract$1,
  multiply: multiply$2,
  divide: divide$1,
  ceil: ceil,
  floor: floor,
  min: min$1,
  max: max$1,
  round: round,
  scale: scale$1,
  scaleAndAdd: scaleAndAdd,
  distance: distance$1,
  squaredDistance: squaredDistance,
  length: length$2,
  squaredLength: squaredLength,
  negate: negate$2,
  inverse: inverse$1,
  normalize: normalize$1,
  dot: dot$1,
  cross: cross$1,
  lerp: lerp$1,
  random: random,
  transformMat2: transformMat2,
  transformMat2d: transformMat2d,
  transformMat3: transformMat3,
  transformMat4: transformMat4,
  rotate: rotate,
  angle: angle,
  zero: zero,
  str: str,
  exactEquals: exactEquals,
  equals: equals,
  len: len,
  sub: sub,
  mul: mul,
  div: div,
  dist: dist,
  sqrDist: sqrDist,
  sqrLen: sqrLen,
  forEach: forEach$1
});

var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  glMatrix: common,
  mat2: mat2,
  mat2d: mat2d,
  mat3: mat3,
  mat4: mat4,
  quat: quat,
  quat2: quat2,
  vec2: vec2,
  vec3: vec3,
  vec4: vec4
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var webglObjLoader_min = createCommonjsModule(function (module, exports) {
!function(e,t){module.exports=t();}("undefined"!=typeof self?self:commonjsGlobal,(function(){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var s=t[a]={i:a,l:!1,exports:{}};return e[a].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a});},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0});},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(a,s,function(t){return e[t]}.bind(null,s));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}({"./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: OBJ, Attribute, DuplicateAttributeException, Layout, Material, MaterialLibrary, Mesh, TYPES, downloadModels, downloadMeshes, initMeshBuffers, deleteMeshBuffers, version */function(module,__webpack_exports__,__webpack_require__){eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OBJ", function() { return OBJ; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });\n/* harmony import */ var _mesh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mesh */ "./src/mesh.ts");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Mesh", function() { return _mesh__WEBPACK_IMPORTED_MODULE_0__["default"]; });\n\n/* harmony import */ var _material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./material */ "./src/material.ts");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Material", function() { return _material__WEBPACK_IMPORTED_MODULE_1__["Material"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MaterialLibrary", function() { return _material__WEBPACK_IMPORTED_MODULE_1__["MaterialLibrary"]; });\n\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout */ "./src/layout.ts");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Attribute", function() { return _layout__WEBPACK_IMPORTED_MODULE_2__["Attribute"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DuplicateAttributeException", function() { return _layout__WEBPACK_IMPORTED_MODULE_2__["DuplicateAttributeException"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return _layout__WEBPACK_IMPORTED_MODULE_2__["Layout"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TYPES", function() { return _layout__WEBPACK_IMPORTED_MODULE_2__["TYPES"]; });\n\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "downloadModels", function() { return _utils__WEBPACK_IMPORTED_MODULE_3__["downloadModels"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "downloadMeshes", function() { return _utils__WEBPACK_IMPORTED_MODULE_3__["downloadMeshes"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initMeshBuffers", function() { return _utils__WEBPACK_IMPORTED_MODULE_3__["initMeshBuffers"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deleteMeshBuffers", function() { return _utils__WEBPACK_IMPORTED_MODULE_3__["deleteMeshBuffers"]; });\n\n\n\n\n\nconst version = "2.0.3";\nconst OBJ = {\n    Attribute: _layout__WEBPACK_IMPORTED_MODULE_2__["Attribute"],\n    DuplicateAttributeException: _layout__WEBPACK_IMPORTED_MODULE_2__["DuplicateAttributeException"],\n    Layout: _layout__WEBPACK_IMPORTED_MODULE_2__["Layout"],\n    Material: _material__WEBPACK_IMPORTED_MODULE_1__["Material"],\n    MaterialLibrary: _material__WEBPACK_IMPORTED_MODULE_1__["MaterialLibrary"],\n    Mesh: _mesh__WEBPACK_IMPORTED_MODULE_0__["default"],\n    TYPES: _layout__WEBPACK_IMPORTED_MODULE_2__["TYPES"],\n    downloadModels: _utils__WEBPACK_IMPORTED_MODULE_3__["downloadModels"],\n    downloadMeshes: _utils__WEBPACK_IMPORTED_MODULE_3__["downloadMeshes"],\n    initMeshBuffers: _utils__WEBPACK_IMPORTED_MODULE_3__["initMeshBuffers"],\n    deleteMeshBuffers: _utils__WEBPACK_IMPORTED_MODULE_3__["deleteMeshBuffers"],\n    version,\n};\n/**\n * @namespace\n */\n\n\n\n//# sourceURL=webpack:///./src/index.ts?');},"./src/layout.ts":
/*!***********************!*\
  !*** ./src/layout.ts ***!
  \***********************/
/*! exports provided: TYPES, DuplicateAttributeException, Attribute, Layout */function(module,__webpack_exports__,__webpack_require__){eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TYPES", function() { return TYPES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DuplicateAttributeException", function() { return DuplicateAttributeException; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attribute", function() { return Attribute; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });\nvar TYPES;\n(function (TYPES) {\n    TYPES["BYTE"] = "BYTE";\n    TYPES["UNSIGNED_BYTE"] = "UNSIGNED_BYTE";\n    TYPES["SHORT"] = "SHORT";\n    TYPES["UNSIGNED_SHORT"] = "UNSIGNED_SHORT";\n    TYPES["FLOAT"] = "FLOAT";\n})(TYPES || (TYPES = {}));\n/**\n * An exception for when two or more of the same attributes are found in the\n * same layout.\n * @private\n */\nclass DuplicateAttributeException extends Error {\n    /**\n     * Create a DuplicateAttributeException\n     * @param {Attribute} attribute - The attribute that was found more than\n     *        once in the {@link Layout}\n     */\n    constructor(attribute) {\n        super(`found duplicate attribute: ${attribute.key}`);\n    }\n}\n/**\n * Represents how a vertex attribute should be packed into an buffer.\n * @private\n */\nclass Attribute {\n    /**\n     * Create an attribute. Do not call this directly, use the predefined\n     * constants.\n     * @param {string} key - The name of this attribute as if it were a key in\n     *        an Object. Use the camel case version of the upper snake case\n     *        const name.\n     * @param {number} size - The number of components per vertex attribute.\n     *        Must be 1, 2, 3, or 4.\n     * @param {string} type - The data type of each component for this\n     *        attribute. Possible values:<br/>\n     *        "BYTE": signed 8-bit integer, with values in [-128, 127]<br/>\n     *        "SHORT": signed 16-bit integer, with values in\n     *            [-32768, 32767]<br/>\n     *        "UNSIGNED_BYTE": unsigned 8-bit integer, with values in\n     *            [0, 255]<br/>\n     *        "UNSIGNED_SHORT": unsigned 16-bit integer, with values in\n     *            [0, 65535]<br/>\n     *        "FLOAT": 32-bit floating point number\n     * @param {boolean} normalized - Whether integer data values should be\n     *        normalized when being casted to a float.<br/>\n     *        If true, signed integers are normalized to [-1, 1].<br/>\n     *        If true, unsigned integers are normalized to [0, 1].<br/>\n     *        For type "FLOAT", this parameter has no effect.\n     */\n    constructor(key, size, type, normalized = false) {\n        this.key = key;\n        this.size = size;\n        this.type = type;\n        this.normalized = normalized;\n        switch (type) {\n            case "BYTE":\n            case "UNSIGNED_BYTE":\n                this.sizeOfType = 1;\n                break;\n            case "SHORT":\n            case "UNSIGNED_SHORT":\n                this.sizeOfType = 2;\n                break;\n            case "FLOAT":\n                this.sizeOfType = 4;\n                break;\n            default:\n                throw new Error(`Unknown gl type: ${type}`);\n        }\n        this.sizeInBytes = this.sizeOfType * size;\n    }\n}\n/**\n * A class to represent the memory layout for a vertex attribute array. Used by\n * {@link Mesh}\'s TBD(...) method to generate a packed array from mesh data.\n * <p>\n * Layout can sort of be thought of as a C-style struct declaration.\n * {@link Mesh}\'s TBD(...) method will use the {@link Layout} instance to\n * pack an array in the given attribute order.\n * <p>\n * Layout also is very helpful when calling a WebGL context\'s\n * <code>vertexAttribPointer</code> method. If you\'ve created a buffer using\n * a Layout instance, then the same Layout instance can be used to determine\n * the size, type, normalized, stride, and offset parameters for\n * <code>vertexAttribPointer</code>.\n * <p>\n * For example:\n * <pre><code>\n *\n * const index = glctx.getAttribLocation(shaderProgram, "pos");\n * glctx.vertexAttribPointer(\n *   layout.position.size,\n *   glctx[layout.position.type],\n *   layout.position.normalized,\n *   layout.position.stride,\n *   layout.position.offset);\n * </code></pre>\n * @see {@link Mesh}\n */\nclass Layout {\n    /**\n     * Create a Layout object. This constructor will throw if any duplicate\n     * attributes are given.\n     * @param {Array} ...attributes - An ordered list of attributes that\n     *        describe the desired memory layout for each vertex attribute.\n     *        <p>\n     *\n     * @see {@link Mesh}\n     */\n    constructor(...attributes) {\n        this.attributes = attributes;\n        this.attributeMap = {};\n        let offset = 0;\n        let maxStrideMultiple = 0;\n        for (const attribute of attributes) {\n            if (this.attributeMap[attribute.key]) {\n                throw new DuplicateAttributeException(attribute);\n            }\n            // Add padding to satisfy WebGL\'s requirement that all\n            // vertexAttribPointer calls have an offset that is a multiple of\n            // the type size.\n            if (offset % attribute.sizeOfType !== 0) {\n                offset += attribute.sizeOfType - (offset % attribute.sizeOfType);\n                console.warn("Layout requires padding before " + attribute.key + " attribute");\n            }\n            this.attributeMap[attribute.key] = {\n                attribute: attribute,\n                size: attribute.size,\n                type: attribute.type,\n                normalized: attribute.normalized,\n                offset: offset,\n            };\n            offset += attribute.sizeInBytes;\n            maxStrideMultiple = Math.max(maxStrideMultiple, attribute.sizeOfType);\n        }\n        // Add padding to the end to satisfy WebGL\'s requirement that all\n        // vertexAttribPointer calls have a stride that is a multiple of the\n        // type size. Because we\'re putting differently sized attributes into\n        // the same buffer, it must be padded to a multiple of the largest\n        // type size.\n        if (offset % maxStrideMultiple !== 0) {\n            offset += maxStrideMultiple - (offset % maxStrideMultiple);\n            console.warn("Layout requires padding at the back");\n        }\n        this.stride = offset;\n        for (const attribute of attributes) {\n            this.attributeMap[attribute.key].stride = this.stride;\n        }\n    }\n}\n// Geometry attributes\n/**\n * Attribute layout to pack a vertex\'s x, y, & z as floats\n *\n * @see {@link Layout}\n */\nLayout.POSITION = new Attribute("position", 3, TYPES.FLOAT);\n/**\n * Attribute layout to pack a vertex\'s normal\'s x, y, & z as floats\n *\n * @see {@link Layout}\n */\nLayout.NORMAL = new Attribute("normal", 3, TYPES.FLOAT);\n/**\n * Attribute layout to pack a vertex\'s normal\'s x, y, & z as floats.\n * <p>\n * This value will be computed on-the-fly based on the texture coordinates.\n * If no texture coordinates are available, the generated value will default to\n * 0, 0, 0.\n *\n * @see {@link Layout}\n */\nLayout.TANGENT = new Attribute("tangent", 3, TYPES.FLOAT);\n/**\n * Attribute layout to pack a vertex\'s normal\'s bitangent x, y, & z as floats.\n * <p>\n * This value will be computed on-the-fly based on the texture coordinates.\n * If no texture coordinates are available, the generated value will default to\n * 0, 0, 0.\n * @see {@link Layout}\n */\nLayout.BITANGENT = new Attribute("bitangent", 3, TYPES.FLOAT);\n/**\n * Attribute layout to pack a vertex\'s texture coordinates\' u & v as floats\n *\n * @see {@link Layout}\n */\nLayout.UV = new Attribute("uv", 2, TYPES.FLOAT);\n// Material attributes\n/**\n * Attribute layout to pack an unsigned short to be interpreted as a the index\n * into a {@link Mesh}\'s materials list.\n * <p>\n * The intention of this value is to send all of the {@link Mesh}\'s materials\n * into multiple shader uniforms and then reference the current one by this\n * vertex attribute.\n * <p>\n * example glsl code:\n *\n * <pre><code>\n *  // this is bound using MATERIAL_INDEX\n *  attribute int materialIndex;\n *\n *  struct Material {\n *    vec3 diffuse;\n *    vec3 specular;\n *    vec3 specularExponent;\n *  };\n *\n *  uniform Material materials[MAX_MATERIALS];\n *\n *  // ...\n *\n *  vec3 diffuse = materials[materialIndex];\n *\n * </code></pre>\n * TODO: More description & test to make sure subscripting by attributes even\n * works for webgl\n *\n * @see {@link Layout}\n */\nLayout.MATERIAL_INDEX = new Attribute("materialIndex", 1, TYPES.SHORT);\nLayout.MATERIAL_ENABLED = new Attribute("materialEnabled", 1, TYPES.UNSIGNED_SHORT);\nLayout.AMBIENT = new Attribute("ambient", 3, TYPES.FLOAT);\nLayout.DIFFUSE = new Attribute("diffuse", 3, TYPES.FLOAT);\nLayout.SPECULAR = new Attribute("specular", 3, TYPES.FLOAT);\nLayout.SPECULAR_EXPONENT = new Attribute("specularExponent", 3, TYPES.FLOAT);\nLayout.EMISSIVE = new Attribute("emissive", 3, TYPES.FLOAT);\nLayout.TRANSMISSION_FILTER = new Attribute("transmissionFilter", 3, TYPES.FLOAT);\nLayout.DISSOLVE = new Attribute("dissolve", 1, TYPES.FLOAT);\nLayout.ILLUMINATION = new Attribute("illumination", 1, TYPES.UNSIGNED_SHORT);\nLayout.REFRACTION_INDEX = new Attribute("refractionIndex", 1, TYPES.FLOAT);\nLayout.SHARPNESS = new Attribute("sharpness", 1, TYPES.FLOAT);\nLayout.MAP_DIFFUSE = new Attribute("mapDiffuse", 1, TYPES.SHORT);\nLayout.MAP_AMBIENT = new Attribute("mapAmbient", 1, TYPES.SHORT);\nLayout.MAP_SPECULAR = new Attribute("mapSpecular", 1, TYPES.SHORT);\nLayout.MAP_SPECULAR_EXPONENT = new Attribute("mapSpecularExponent", 1, TYPES.SHORT);\nLayout.MAP_DISSOLVE = new Attribute("mapDissolve", 1, TYPES.SHORT);\nLayout.ANTI_ALIASING = new Attribute("antiAliasing", 1, TYPES.UNSIGNED_SHORT);\nLayout.MAP_BUMP = new Attribute("mapBump", 1, TYPES.SHORT);\nLayout.MAP_DISPLACEMENT = new Attribute("mapDisplacement", 1, TYPES.SHORT);\nLayout.MAP_DECAL = new Attribute("mapDecal", 1, TYPES.SHORT);\nLayout.MAP_EMISSIVE = new Attribute("mapEmissive", 1, TYPES.SHORT);\n\n\n//# sourceURL=webpack:///./src/layout.ts?');},"./src/material.ts":
/*!*************************!*\
  !*** ./src/material.ts ***!
  \*************************/
/*! exports provided: Material, MaterialLibrary */function(module,__webpack_exports__,__webpack_require__){eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Material", function() { return Material; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialLibrary", function() { return MaterialLibrary; });\n/**\n * The Material class.\n */\nclass Material {\n    constructor(name) {\n        this.name = name;\n        /**\n         * Constructor\n         * @param {String} name the unique name of the material\n         */\n        // The values for the following attibutes\n        // are an array of R, G, B normalized values.\n        // Ka - Ambient Reflectivity\n        this.ambient = [0, 0, 0];\n        // Kd - Defuse Reflectivity\n        this.diffuse = [0, 0, 0];\n        // Ks\n        this.specular = [0, 0, 0];\n        // Ke\n        this.emissive = [0, 0, 0];\n        // Tf\n        this.transmissionFilter = [0, 0, 0];\n        // d\n        this.dissolve = 0;\n        // valid range is between 0 and 1000\n        this.specularExponent = 0;\n        // either d or Tr; valid values are normalized\n        this.transparency = 0;\n        // illum - the enum of the illumination model to use\n        this.illumination = 0;\n        // Ni - Set to "normal" (air).\n        this.refractionIndex = 1;\n        // sharpness\n        this.sharpness = 0;\n        // map_Kd\n        this.mapDiffuse = emptyTextureOptions();\n        // map_Ka\n        this.mapAmbient = emptyTextureOptions();\n        // map_Ks\n        this.mapSpecular = emptyTextureOptions();\n        // map_Ns\n        this.mapSpecularExponent = emptyTextureOptions();\n        // map_d\n        this.mapDissolve = emptyTextureOptions();\n        // map_aat\n        this.antiAliasing = false;\n        // map_bump or bump\n        this.mapBump = emptyTextureOptions();\n        // disp\n        this.mapDisplacement = emptyTextureOptions();\n        // decal\n        this.mapDecal = emptyTextureOptions();\n        // map_Ke\n        this.mapEmissive = emptyTextureOptions();\n        // refl - when the reflection type is a cube, there will be multiple refl\n        //        statements for each side of the cube. If it\'s a spherical\n        //        reflection, there should only ever be one.\n        this.mapReflections = [];\n    }\n}\nconst SENTINEL_MATERIAL = new Material("sentinel");\n/**\n * https://en.wikipedia.org/wiki/Wavefront_.obj_file\n * http://paulbourke.net/dataformats/mtl/\n */\nclass MaterialLibrary {\n    constructor(data) {\n        this.data = data;\n        /**\n         * Constructs the Material Parser\n         * @param mtlData the MTL file contents\n         */\n        this.currentMaterial = SENTINEL_MATERIAL;\n        this.materials = {};\n        this.parse();\n    }\n    /* eslint-disable camelcase */\n    /* the function names here disobey camelCase conventions\n     to make parsing/routing easier. see the parse function\n     documentation for more information. */\n    /**\n     * Creates a new Material object and adds to the registry.\n     * @param tokens the tokens associated with the directive\n     */\n    parse_newmtl(tokens) {\n        const name = tokens[0];\n        // console.info(\'Parsing new Material:\', name);\n        this.currentMaterial = new Material(name);\n        this.materials[name] = this.currentMaterial;\n    }\n    /**\n     * See the documenation for parse_Ka below for a better understanding.\n     *\n     * Given a list of possible color tokens, returns an array of R, G, and B\n     * color values.\n     *\n     * @param tokens the tokens associated with the directive\n     * @return {*} a 3 element array containing the R, G, and B values\n     * of the color.\n     */\n    parseColor(tokens) {\n        if (tokens[0] == "spectral") {\n            throw new Error("The MTL parser does not support spectral curve files. You will " +\n                "need to convert the MTL colors to either RGB or CIEXYZ.");\n        }\n        if (tokens[0] == "xyz") {\n            throw new Error("The MTL parser does not currently support XYZ colors. Either convert the " +\n                "XYZ values to RGB or create an issue to add support for XYZ");\n        }\n        // from my understanding of the spec, RGB values at this point\n        // will either be 3 floats or exactly 1 float, so that\'s the check\n        // that i\'m going to perform here\n        if (tokens.length == 3) {\n            const [x, y, z] = tokens;\n            return [parseFloat(x), parseFloat(y), parseFloat(z)];\n        }\n        // Since tokens at this point has a length of 3, we\'re going to assume\n        // it\'s exactly 1, skipping the check for 2.\n        const value = parseFloat(tokens[0]);\n        // in this case, all values are equivalent\n        return [value, value, value];\n    }\n    /**\n     * Parse the ambient reflectivity\n     *\n     * A Ka directive can take one of three forms:\n     *   - Ka r g b\n     *   - Ka spectral file.rfl\n     *   - Ka xyz x y z\n     * These three forms are mutually exclusive in that only one\n     * declaration can exist per material. It is considered a syntax\n     * error otherwise.\n     *\n     * The "Ka" form specifies the ambient reflectivity using RGB values.\n     * The "g" and "b" values are optional. If only the "r" value is\n     * specified, then the "g" and "b" values are assigned the value of\n     * "r". Values are normally in the range 0.0 to 1.0. Values outside\n     * of this range increase or decrease the reflectivity accordingly.\n     *\n     * The "Ka spectral" form specifies the ambient reflectivity using a\n     * spectral curve. "file.rfl" is the name of the ".rfl" file containing\n     * the curve data. "factor" is an optional argument which is a multiplier\n     * for the values in the .rfl file and defaults to 1.0 if not specified.\n     *\n     * The "Ka xyz" form specifies the ambient reflectivity using CIEXYZ values.\n     * "x y z" are the values of the CIEXYZ color space. The "y" and "z" arguments\n     * are optional and take on the value of the "x" component if only "x" is\n     * specified. The "x y z" values are normally in the range of 0.0 to 1.0 and\n     * increase or decrease ambient reflectivity accordingly outside of that\n     * range.\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_Ka(tokens) {\n        this.currentMaterial.ambient = this.parseColor(tokens);\n    }\n    /**\n     * Diffuse Reflectivity\n     *\n     * Similar to the Ka directive. Simply replace "Ka" with "Kd" and the rules\n     * are the same\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_Kd(tokens) {\n        this.currentMaterial.diffuse = this.parseColor(tokens);\n    }\n    /**\n     * Spectral Reflectivity\n     *\n     * Similar to the Ka directive. Simply replace "Ks" with "Kd" and the rules\n     * are the same\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_Ks(tokens) {\n        this.currentMaterial.specular = this.parseColor(tokens);\n    }\n    /**\n     * Emissive\n     *\n     * The amount and color of light emitted by the object.\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_Ke(tokens) {\n        this.currentMaterial.emissive = this.parseColor(tokens);\n    }\n    /**\n     * Transmission Filter\n     *\n     * Any light passing through the object is filtered by the transmission\n     * filter, which only allows specific colors to pass through. For example, Tf\n     * 0 1 0 allows all of the green to pass through and filters out all of the\n     * red and blue.\n     *\n     * Similar to the Ka directive. Simply replace "Ks" with "Tf" and the rules\n     * are the same\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_Tf(tokens) {\n        this.currentMaterial.transmissionFilter = this.parseColor(tokens);\n    }\n    /**\n     * Specifies the dissolve for the current material.\n     *\n     * Statement: d [-halo] `factor`\n     *\n     * Example: "d 0.5"\n     *\n     * The factor is the amount this material dissolves into the background. A\n     * factor of 1.0 is fully opaque. This is the default when a new material is\n     * created. A factor of 0.0 is fully dissolved (completely transparent).\n     *\n     * Unlike a real transparent material, the dissolve does not depend upon\n     * material thickness nor does it have any spectral character. Dissolve works\n     * on all illumination models.\n     *\n     * The dissolve statement allows for an optional "-halo" flag which indicates\n     * that a dissolve is dependent on the surface orientation relative to the\n     * viewer. For example, a sphere with the following dissolve, "d -halo 0.0",\n     * will be fully dissolved at its center and will appear gradually more opaque\n     * toward its edge.\n     *\n     * "factor" is the minimum amount of dissolve applied to the material. The\n     * amount of dissolve will vary between 1.0 (fully opaque) and the specified\n     * "factor". The formula is:\n     *\n     *    dissolve = 1.0 - (N*v)(1.0-factor)\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_d(tokens) {\n        // this ignores the -halo option as I can\'t find any documentation on what\n        // it\'s supposed to be.\n        this.currentMaterial.dissolve = parseFloat(tokens.pop() || "0");\n    }\n    /**\n     * The "illum" statement specifies the illumination model to use in the\n     * material. Illumination models are mathematical equations that represent\n     * various material lighting and shading effects.\n     *\n     * The illumination number can be a number from 0 to 10. The following are\n     * the list of illumination enumerations and their summaries:\n     * 0. Color on and Ambient off\n     * 1. Color on and Ambient on\n     * 2. Highlight on\n     * 3. Reflection on and Ray trace on\n     * 4. Transparency: Glass on, Reflection: Ray trace on\n     * 5. Reflection: Fresnel on and Ray trace on\n     * 6. Transparency: Refraction on, Reflection: Fresnel off and Ray trace on\n     * 7. Transparency: Refraction on, Reflection: Fresnel on and Ray trace on\n     * 8. Reflection on and Ray trace off\n     * 9. Transparency: Glass on, Reflection: Ray trace off\n     * 10. Casts shadows onto invisible surfaces\n     *\n     * Example: "illum 2" to specify the "Highlight on" model\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_illum(tokens) {\n        this.currentMaterial.illumination = parseInt(tokens[0]);\n    }\n    /**\n     * Optical Density (AKA Index of Refraction)\n     *\n     * Statement: Ni `index`\n     *\n     * Example: Ni 1.0\n     *\n     * Specifies the optical density for the surface. `index` is the value\n     * for the optical density. The values can range from 0.001 to 10.  A value of\n     * 1.0 means that light does not bend as it passes through an object.\n     * Increasing the optical_density increases the amount of bending. Glass has\n     * an index of refraction of about 1.5. Values of less than 1.0 produce\n     * bizarre results and are not recommended\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_Ni(tokens) {\n        this.currentMaterial.refractionIndex = parseFloat(tokens[0]);\n    }\n    /**\n     * Specifies the specular exponent for the current material. This defines the\n     * focus of the specular highlight.\n     *\n     * Statement: Ns `exponent`\n     *\n     * Example: "Ns 250"\n     *\n     * `exponent` is the value for the specular exponent. A high exponent results\n     * in a tight, concentrated highlight. Ns Values normally range from 0 to\n     * 1000.\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_Ns(tokens) {\n        this.currentMaterial.specularExponent = parseInt(tokens[0]);\n    }\n    /**\n     * Specifies the sharpness of the reflections from the local reflection map.\n     *\n     * Statement: sharpness `value`\n     *\n     * Example: "sharpness 100"\n     *\n     * If a material does not have a local reflection map defined in its material\n     * defintions, sharpness will apply to the global reflection map defined in\n     * PreView.\n     *\n     * `value` can be a number from 0 to 1000. The default is 60. A high value\n     * results in a clear reflection of objects in the reflection map.\n     *\n     * Tip: sharpness values greater than 100 introduce aliasing effects in\n     * flat surfaces that are viewed at a sharp angle.\n     *\n     * @param tokens the tokens associated with the directive\n     */\n    parse_sharpness(tokens) {\n        this.currentMaterial.sharpness = parseInt(tokens[0]);\n    }\n    /**\n     * Parses the -cc flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -cc flag\n     * @param options the Object of all image options\n     */\n    parse_cc(values, options) {\n        options.colorCorrection = values[0] == "on";\n    }\n    /**\n     * Parses the -blendu flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -blendu flag\n     * @param options the Object of all image options\n     */\n    parse_blendu(values, options) {\n        options.horizontalBlending = values[0] == "on";\n    }\n    /**\n     * Parses the -blendv flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -blendv flag\n     * @param options the Object of all image options\n     */\n    parse_blendv(values, options) {\n        options.verticalBlending = values[0] == "on";\n    }\n    /**\n     * Parses the -boost flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -boost flag\n     * @param options the Object of all image options\n     */\n    parse_boost(values, options) {\n        options.boostMipMapSharpness = parseFloat(values[0]);\n    }\n    /**\n     * Parses the -mm flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -mm flag\n     * @param options the Object of all image options\n     */\n    parse_mm(values, options) {\n        options.modifyTextureMap.brightness = parseFloat(values[0]);\n        options.modifyTextureMap.contrast = parseFloat(values[1]);\n    }\n    /**\n     * Parses and sets the -o, -s, and -t  u, v, and w values\n     *\n     * @param values the values passed to the -o, -s, -t flag\n     * @param {Object} option the Object of either the -o, -s, -t option\n     * @param {Integer} defaultValue the Object of all image options\n     */\n    parse_ost(values, option, defaultValue) {\n        while (values.length < 3) {\n            values.push(defaultValue.toString());\n        }\n        option.u = parseFloat(values[0]);\n        option.v = parseFloat(values[1]);\n        option.w = parseFloat(values[2]);\n    }\n    /**\n     * Parses the -o flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -o flag\n     * @param options the Object of all image options\n     */\n    parse_o(values, options) {\n        this.parse_ost(values, options.offset, 0);\n    }\n    /**\n     * Parses the -s flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -s flag\n     * @param options the Object of all image options\n     */\n    parse_s(values, options) {\n        this.parse_ost(values, options.scale, 1);\n    }\n    /**\n     * Parses the -t flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -t flag\n     * @param options the Object of all image options\n     */\n    parse_t(values, options) {\n        this.parse_ost(values, options.turbulence, 0);\n    }\n    /**\n     * Parses the -texres flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -texres flag\n     * @param options the Object of all image options\n     */\n    parse_texres(values, options) {\n        options.textureResolution = parseFloat(values[0]);\n    }\n    /**\n     * Parses the -clamp flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -clamp flag\n     * @param options the Object of all image options\n     */\n    parse_clamp(values, options) {\n        options.clamp = values[0] == "on";\n    }\n    /**\n     * Parses the -bm flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -bm flag\n     * @param options the Object of all image options\n     */\n    parse_bm(values, options) {\n        options.bumpMultiplier = parseFloat(values[0]);\n    }\n    /**\n     * Parses the -imfchan flag and updates the options object with the values.\n     *\n     * @param values the values passed to the -imfchan flag\n     * @param options the Object of all image options\n     */\n    parse_imfchan(values, options) {\n        options.imfChan = values[0];\n    }\n    /**\n     * This only exists for relection maps and denotes the type of reflection.\n     *\n     * @param values the values passed to the -type flag\n     * @param options the Object of all image options\n     */\n    parse_type(values, options) {\n        options.reflectionType = values[0];\n    }\n    /**\n     * Parses the texture\'s options and returns an options object with the info\n     *\n     * @param tokens all of the option tokens to pass to the texture\n     * @return {Object} a complete object of objects to apply to the texture\n     */\n    parseOptions(tokens) {\n        const options = emptyTextureOptions();\n        let option;\n        let values;\n        const optionsToValues = {};\n        tokens.reverse();\n        while (tokens.length) {\n            // token is guaranteed to exists here, hence the explicit "as"\n            const token = tokens.pop();\n            if (token.startsWith("-")) {\n                option = token.substr(1);\n                optionsToValues[option] = [];\n            }\n            else if (option) {\n                optionsToValues[option].push(token);\n            }\n        }\n        for (option in optionsToValues) {\n            if (!optionsToValues.hasOwnProperty(option)) {\n                continue;\n            }\n            values = optionsToValues[option];\n            const optionMethod = this[`parse_${option}`];\n            if (optionMethod) {\n                optionMethod.bind(this)(values, options);\n            }\n        }\n        return options;\n    }\n    /**\n     * Parses the given texture map line.\n     *\n     * @param tokens all of the tokens representing the texture\n     * @return a complete object of objects to apply to the texture\n     */\n    parseMap(tokens) {\n        // according to wikipedia:\n        // (https://en.wikipedia.org/wiki/Wavefront_.obj_file#Vendor_specific_alterations)\n        // there is at least one vendor that places the filename before the options\n        // rather than after (which is to spec). All options start with a \'-\'\n        // so if the first token doesn\'t start with a \'-\', we\'re going to assume\n        // it\'s the name of the map file.\n        let optionsString;\n        let filename = "";\n        if (!tokens[0].startsWith("-")) {\n            [filename, ...optionsString] = tokens;\n        }\n        else {\n            filename = tokens.pop();\n            optionsString = tokens;\n        }\n        const options = this.parseOptions(optionsString);\n        options.filename = filename.replace(/\\\\/g, "/");\n        return options;\n    }\n    /**\n     * Parses the ambient map.\n     *\n     * @param tokens list of tokens for the map_Ka direcive\n     */\n    parse_map_Ka(tokens) {\n        this.currentMaterial.mapAmbient = this.parseMap(tokens);\n    }\n    /**\n     * Parses the diffuse map.\n     *\n     * @param tokens list of tokens for the map_Kd direcive\n     */\n    parse_map_Kd(tokens) {\n        this.currentMaterial.mapDiffuse = this.parseMap(tokens);\n    }\n    /**\n     * Parses the specular map.\n     *\n     * @param tokens list of tokens for the map_Ks direcive\n     */\n    parse_map_Ks(tokens) {\n        this.currentMaterial.mapSpecular = this.parseMap(tokens);\n    }\n    /**\n     * Parses the emissive map.\n     *\n     * @param tokens list of tokens for the map_Ke direcive\n     */\n    parse_map_Ke(tokens) {\n        this.currentMaterial.mapEmissive = this.parseMap(tokens);\n    }\n    /**\n     * Parses the specular exponent map.\n     *\n     * @param tokens list of tokens for the map_Ns direcive\n     */\n    parse_map_Ns(tokens) {\n        this.currentMaterial.mapSpecularExponent = this.parseMap(tokens);\n    }\n    /**\n     * Parses the dissolve map.\n     *\n     * @param tokens list of tokens for the map_d direcive\n     */\n    parse_map_d(tokens) {\n        this.currentMaterial.mapDissolve = this.parseMap(tokens);\n    }\n    /**\n     * Parses the anti-aliasing option.\n     *\n     * @param tokens list of tokens for the map_aat direcive\n     */\n    parse_map_aat(tokens) {\n        this.currentMaterial.antiAliasing = tokens[0] == "on";\n    }\n    /**\n     * Parses the bump map.\n     *\n     * @param tokens list of tokens for the map_bump direcive\n     */\n    parse_map_bump(tokens) {\n        this.currentMaterial.mapBump = this.parseMap(tokens);\n    }\n    /**\n     * Parses the bump map.\n     *\n     * @param tokens list of tokens for the bump direcive\n     */\n    parse_bump(tokens) {\n        this.parse_map_bump(tokens);\n    }\n    /**\n     * Parses the disp map.\n     *\n     * @param tokens list of tokens for the disp direcive\n     */\n    parse_disp(tokens) {\n        this.currentMaterial.mapDisplacement = this.parseMap(tokens);\n    }\n    /**\n     * Parses the decal map.\n     *\n     * @param tokens list of tokens for the map_decal direcive\n     */\n    parse_decal(tokens) {\n        this.currentMaterial.mapDecal = this.parseMap(tokens);\n    }\n    /**\n     * Parses the refl map.\n     *\n     * @param tokens list of tokens for the refl direcive\n     */\n    parse_refl(tokens) {\n        this.currentMaterial.mapReflections.push(this.parseMap(tokens));\n    }\n    /**\n     * Parses the MTL file.\n     *\n     * Iterates line by line parsing each MTL directive.\n     *\n     * This function expects the first token in the line\n     * to be a valid MTL directive. That token is then used\n     * to try and run a method on this class. parse_[directive]\n     * E.g., the `newmtl` directive would try to call the method\n     * parse_newmtl. Each parsing function takes in the remaining\n     * list of tokens and updates the currentMaterial class with\n     * the attributes provided.\n     */\n    parse() {\n        const lines = this.data.split(/\\r?\\n/);\n        for (let line of lines) {\n            line = line.trim();\n            if (!line || line.startsWith("#")) {\n                continue;\n            }\n            const [directive, ...tokens] = line.split(/\\s/);\n            const parseMethod = this[`parse_${directive}`];\n            if (!parseMethod) {\n                console.warn(`Don\'t know how to parse the directive: "${directive}"`);\n                continue;\n            }\n            // console.log(`Parsing "${directive}" with tokens: ${tokens}`);\n            parseMethod.bind(this)(tokens);\n        }\n        // some cleanup. These don\'t need to be exposed as public data.\n        delete this.data;\n        this.currentMaterial = SENTINEL_MATERIAL;\n    }\n}\nfunction emptyTextureOptions() {\n    return {\n        colorCorrection: false,\n        horizontalBlending: true,\n        verticalBlending: true,\n        boostMipMapSharpness: 0,\n        modifyTextureMap: {\n            brightness: 0,\n            contrast: 1,\n        },\n        offset: { u: 0, v: 0, w: 0 },\n        scale: { u: 1, v: 1, w: 1 },\n        turbulence: { u: 0, v: 0, w: 0 },\n        clamp: false,\n        textureResolution: null,\n        bumpMultiplier: 1,\n        imfChan: null,\n        filename: "",\n    };\n}\n\n\n//# sourceURL=webpack:///./src/material.ts?');},"./src/mesh.ts":
/*!*********************!*\
  !*** ./src/mesh.ts ***!
  \*********************/
/*! exports provided: default */function(module,__webpack_exports__,__webpack_require__){eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mesh; });\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ "./src/layout.ts");\n\n/**\n * The main Mesh class. The constructor will parse through the OBJ file data\n * and collect the vertex, vertex normal, texture, and face information. This\n * information can then be used later on when creating your VBOs. See\n * OBJ.initMeshBuffers for an example of how to use the newly created Mesh\n */\nclass Mesh {\n    /**\n     * Create a Mesh\n     * @param {String} objectData - a string representation of an OBJ file with\n     *     newlines preserved.\n     * @param {Object} options - a JS object containing valid options. See class\n     *     documentation for options.\n     * @param {bool} options.enableWTextureCoord - Texture coordinates can have\n     *     an optional "w" coordinate after the u and v coordinates. This extra\n     *     value can be used in order to perform fancy transformations on the\n     *     textures themselves. Default is to truncate to only the u an v\n     *     coordinates. Passing true will provide a default value of 0 in the\n     *     event that any or all texture coordinates don\'t provide a w value.\n     *     Always use the textureStride attribute in order to determine the\n     *     stride length of the texture coordinates when rendering the element\n     *     array.\n     * @param {bool} options.calcTangentsAndBitangents - Calculate the tangents\n     *     and bitangents when loading of the OBJ is completed. This adds two new\n     *     attributes to the Mesh instance: `tangents` and `bitangents`.\n     */\n    constructor(objectData, options) {\n        this.name = "";\n        this.indicesPerMaterial = [];\n        this.materialsByIndex = {};\n        this.tangents = [];\n        this.bitangents = [];\n        options = options || {};\n        options.materials = options.materials || {};\n        options.enableWTextureCoord = !!options.enableWTextureCoord;\n        // the list of unique vertex, normal, texture, attributes\n        this.vertexNormals = [];\n        this.textures = [];\n        // the indicies to draw the faces\n        this.indices = [];\n        this.textureStride = options.enableWTextureCoord ? 3 : 2;\n        /*\n        The OBJ file format does a sort of compression when saving a model in a\n        program like Blender. There are at least 3 sections (4 including textures)\n        within the file. Each line in a section begins with the same string:\n          * \'v\': indicates vertex section\n          * \'vn\': indicates vertex normal section\n          * \'f\': indicates the faces section\n          * \'vt\': indicates vertex texture section (if textures were used on the model)\n        Each of the above sections (except for the faces section) is a list/set of\n        unique vertices.\n\n        Each line of the faces section contains a list of\n        (vertex, [texture], normal) groups.\n\n        **Note:** The following documentation will use a capital "V" Vertex to\n        denote the above (vertex, [texture], normal) groups whereas a lowercase\n        "v" vertex is used to denote an X, Y, Z coordinate.\n\n        Some examples:\n            // the texture index is optional, both formats are possible for models\n            // without a texture applied\n            f 1/25 18/46 12/31\n            f 1//25 18//46 12//31\n\n            // A 3 vertex face with texture indices\n            f 16/92/11 14/101/22 1/69/1\n\n            // A 4 vertex face\n            f 16/92/11 40/109/40 38/114/38 14/101/22\n\n        The first two lines are examples of a 3 vertex face without a texture applied.\n        The second is an example of a 3 vertex face with a texture applied.\n        The third is an example of a 4 vertex face. Note: a face can contain N\n        number of vertices.\n\n        Each number that appears in one of the groups is a 1-based index\n        corresponding to an item from the other sections (meaning that indexing\n        starts at one and *not* zero).\n\n        For example:\n            `f 16/92/11` is saying to\n              - take the 16th element from the [v] vertex array\n              - take the 92nd element from the [vt] texture array\n              - take the 11th element from the [vn] normal array\n            and together they make a unique vertex.\n        Using all 3+ unique Vertices from the face line will produce a polygon.\n\n        Now, you could just go through the OBJ file and create a new vertex for\n        each face line and WebGL will draw what appears to be the same model.\n        However, vertices will be overlapped and duplicated all over the place.\n\n        Consider a cube in 3D space centered about the origin and each side is\n        2 units long. The front face (with the positive Z-axis pointing towards\n        you) would have a Top Right vertex (looking orthogonal to its normal)\n        mapped at (1,1,1) The right face would have a Top Left vertex (looking\n        orthogonal to its normal) at (1,1,1) and the top face would have a Bottom\n        Right vertex (looking orthogonal to its normal) at (1,1,1). Each face\n        has a vertex at the same coordinates, however, three distinct vertices\n        will be drawn at the same spot.\n\n        To solve the issue of duplicate Vertices (the `(vertex, [texture], normal)`\n        groups), while iterating through the face lines, when a group is encountered\n        the whole group string (\'16/92/11\') is checked to see if it exists in the\n        packed.hashindices object, and if it doesn\'t, the indices it specifies\n        are used to look up each attribute in the corresponding attribute arrays\n        already created. The values are then copied to the corresponding unpacked\n        array (flattened to play nice with WebGL\'s ELEMENT_ARRAY_BUFFER indexing),\n        the group string is added to the hashindices set and the current unpacked\n        index is used as this hashindices value so that the group of elements can\n        be reused. The unpacked index is incremented. If the group string already\n        exists in the hashindices object, its corresponding value is the index of\n        that group and is appended to the unpacked indices array.\n       */\n        const verts = [];\n        const vertNormals = [];\n        const textures = [];\n        const materialNamesByIndex = [];\n        const materialIndicesByName = {};\n        // keep track of what material we\'ve seen last\n        let currentMaterialIndex = -1;\n        let currentObjectByMaterialIndex = 0;\n        // unpacking stuff\n        const unpacked = {\n            verts: [],\n            norms: [],\n            textures: [],\n            hashindices: {},\n            indices: [[]],\n            materialIndices: [],\n            index: 0,\n        };\n        const VERTEX_RE = /^v\\s/;\n        const NORMAL_RE = /^vn\\s/;\n        const TEXTURE_RE = /^vt\\s/;\n        const FACE_RE = /^f\\s/;\n        const WHITESPACE_RE = /\\s+/;\n        const USE_MATERIAL_RE = /^usemtl/;\n        // array of lines separated by the newline\n        const lines = objectData.split("\\n");\n        for (let line of lines) {\n            line = line.trim();\n            if (!line || line.startsWith("#")) {\n                continue;\n            }\n            const elements = line.split(WHITESPACE_RE);\n            elements.shift();\n            if (VERTEX_RE.test(line)) {\n                // if this is a vertex\n                verts.push(...elements);\n            }\n            else if (NORMAL_RE.test(line)) {\n                // if this is a vertex normal\n                vertNormals.push(...elements);\n            }\n            else if (TEXTURE_RE.test(line)) {\n                let coords = elements;\n                // by default, the loader will only look at the U and V\n                // coordinates of the vt declaration. So, this truncates the\n                // elements to only those 2 values. If W texture coordinate\n                // support is enabled, then the texture coordinate is\n                // expected to have three values in it.\n                if (elements.length > 2 && !options.enableWTextureCoord) {\n                    coords = elements.slice(0, 2);\n                }\n                else if (elements.length === 2 && options.enableWTextureCoord) {\n                    // If for some reason W texture coordinate support is enabled\n                    // and only the U and V coordinates are given, then we supply\n                    // the default value of 0 so that the stride length is correct\n                    // when the textures are unpacked below.\n                    coords.push("0");\n                }\n                textures.push(...coords);\n            }\n            else if (USE_MATERIAL_RE.test(line)) {\n                const materialName = elements[0];\n                // check to see if we\'ve ever seen it before\n                if (!(materialName in materialIndicesByName)) {\n                    // new material we\'ve never seen\n                    materialNamesByIndex.push(materialName);\n                    materialIndicesByName[materialName] = materialNamesByIndex.length - 1;\n                    // push new array into indices\n                    // already contains an array at index zero, don\'t add\n                    if (materialIndicesByName[materialName] > 0) {\n                        unpacked.indices.push([]);\n                    }\n                }\n                // keep track of the current material index\n                currentMaterialIndex = materialIndicesByName[materialName];\n                // update current index array\n                currentObjectByMaterialIndex = currentMaterialIndex;\n            }\n            else if (FACE_RE.test(line)) {\n                // if this is a face\n                /*\n                split this face into an array of Vertex groups\n                for example:\n                   f 16/92/11 14/101/22 1/69/1\n                becomes:\n                  [\'16/92/11\', \'14/101/22\', \'1/69/1\'];\n                */\n                const triangles = triangulate(elements);\n                for (const triangle of triangles) {\n                    for (let j = 0, eleLen = triangle.length; j < eleLen; j++) {\n                        const hash = triangle[j] + "," + currentMaterialIndex;\n                        if (hash in unpacked.hashindices) {\n                            unpacked.indices[currentObjectByMaterialIndex].push(unpacked.hashindices[hash]);\n                        }\n                        else {\n                            /*\n                        Each element of the face line array is a Vertex which has its\n                        attributes delimited by a forward slash. This will separate\n                        each attribute into another array:\n                            \'19/92/11\'\n                        becomes:\n                            Vertex = [\'19\', \'92\', \'11\'];\n                        where\n                            Vertex[0] is the vertex index\n                            Vertex[1] is the texture index\n                            Vertex[2] is the normal index\n                         Think of faces having Vertices which are comprised of the\n                         attributes location (v), texture (vt), and normal (vn).\n                         */\n                            const vertex = triangle[j].split("/");\n                            // it\'s possible for faces to only specify the vertex\n                            // and the normal. In this case, vertex will only have\n                            // a length of 2 and not 3 and the normal will be the\n                            // second item in the list with an index of 1.\n                            const normalIndex = vertex.length - 1;\n                            /*\n                         The verts, textures, and vertNormals arrays each contain a\n                         flattend array of coordinates.\n\n                         Because it gets confusing by referring to Vertex and then\n                         vertex (both are different in my descriptions) I will explain\n                         what\'s going on using the vertexNormals array:\n\n                         vertex[2] will contain the one-based index of the vertexNormals\n                         section (vn). One is subtracted from this index number to play\n                         nice with javascript\'s zero-based array indexing.\n\n                         Because vertexNormal is a flattened array of x, y, z values,\n                         simple pointer arithmetic is used to skip to the start of the\n                         vertexNormal, then the offset is added to get the correct\n                         component: +0 is x, +1 is y, +2 is z.\n\n                         This same process is repeated for verts and textures.\n                         */\n                            // Vertex position\n                            unpacked.verts.push(+verts[(+vertex[0] - 1) * 3 + 0]);\n                            unpacked.verts.push(+verts[(+vertex[0] - 1) * 3 + 1]);\n                            unpacked.verts.push(+verts[(+vertex[0] - 1) * 3 + 2]);\n                            // Vertex textures\n                            if (textures.length) {\n                                const stride = options.enableWTextureCoord ? 3 : 2;\n                                unpacked.textures.push(+textures[(+vertex[1] - 1) * stride + 0]);\n                                unpacked.textures.push(+textures[(+vertex[1] - 1) * stride + 1]);\n                                if (options.enableWTextureCoord) {\n                                    unpacked.textures.push(+textures[(+vertex[1] - 1) * stride + 2]);\n                                }\n                            }\n                            // Vertex normals\n                            unpacked.norms.push(+vertNormals[(+vertex[normalIndex] - 1) * 3 + 0]);\n                            unpacked.norms.push(+vertNormals[(+vertex[normalIndex] - 1) * 3 + 1]);\n                            unpacked.norms.push(+vertNormals[(+vertex[normalIndex] - 1) * 3 + 2]);\n                            // Vertex material indices\n                            unpacked.materialIndices.push(currentMaterialIndex);\n                            // add the newly created Vertex to the list of indices\n                            unpacked.hashindices[hash] = unpacked.index;\n                            unpacked.indices[currentObjectByMaterialIndex].push(unpacked.hashindices[hash]);\n                            // increment the counter\n                            unpacked.index += 1;\n                        }\n                    }\n                }\n            }\n        }\n        this.vertices = unpacked.verts;\n        this.vertexNormals = unpacked.norms;\n        this.textures = unpacked.textures;\n        this.vertexMaterialIndices = unpacked.materialIndices;\n        this.indices = unpacked.indices[currentObjectByMaterialIndex];\n        this.indicesPerMaterial = unpacked.indices;\n        this.materialNames = materialNamesByIndex;\n        this.materialIndices = materialIndicesByName;\n        this.materialsByIndex = {};\n        if (options.calcTangentsAndBitangents) {\n            this.calculateTangentsAndBitangents();\n        }\n    }\n    /**\n     * Calculates the tangents and bitangents of the mesh that forms an orthogonal basis together with the\n     * normal in the direction of the texture coordinates. These are useful for setting up the TBN matrix\n     * when distorting the normals through normal maps.\n     * Method derived from: http://www.opengl-tutorial.org/intermediate-tutorials/tutorial-13-normal-mapping/\n     *\n     * This method requires the normals and texture coordinates to be parsed and set up correctly.\n     * Adds the tangents and bitangents as members of the class instance.\n     */\n    calculateTangentsAndBitangents() {\n        console.assert(!!(this.vertices &&\n            this.vertices.length &&\n            this.vertexNormals &&\n            this.vertexNormals.length &&\n            this.textures &&\n            this.textures.length), "Missing attributes for calculating tangents and bitangents");\n        const unpacked = {\n            tangents: [...new Array(this.vertices.length)].map(_ => 0),\n            bitangents: [...new Array(this.vertices.length)].map(_ => 0),\n        };\n        // Loop through all faces in the whole mesh\n        const indices = this.indices;\n        const vertices = this.vertices;\n        const normals = this.vertexNormals;\n        const uvs = this.textures;\n        for (let i = 0; i < indices.length; i += 3) {\n            const i0 = indices[i + 0];\n            const i1 = indices[i + 1];\n            const i2 = indices[i + 2];\n            const x_v0 = vertices[i0 * 3 + 0];\n            const y_v0 = vertices[i0 * 3 + 1];\n            const z_v0 = vertices[i0 * 3 + 2];\n            const x_uv0 = uvs[i0 * 2 + 0];\n            const y_uv0 = uvs[i0 * 2 + 1];\n            const x_v1 = vertices[i1 * 3 + 0];\n            const y_v1 = vertices[i1 * 3 + 1];\n            const z_v1 = vertices[i1 * 3 + 2];\n            const x_uv1 = uvs[i1 * 2 + 0];\n            const y_uv1 = uvs[i1 * 2 + 1];\n            const x_v2 = vertices[i2 * 3 + 0];\n            const y_v2 = vertices[i2 * 3 + 1];\n            const z_v2 = vertices[i2 * 3 + 2];\n            const x_uv2 = uvs[i2 * 2 + 0];\n            const y_uv2 = uvs[i2 * 2 + 1];\n            const x_deltaPos1 = x_v1 - x_v0;\n            const y_deltaPos1 = y_v1 - y_v0;\n            const z_deltaPos1 = z_v1 - z_v0;\n            const x_deltaPos2 = x_v2 - x_v0;\n            const y_deltaPos2 = y_v2 - y_v0;\n            const z_deltaPos2 = z_v2 - z_v0;\n            const x_uvDeltaPos1 = x_uv1 - x_uv0;\n            const y_uvDeltaPos1 = y_uv1 - y_uv0;\n            const x_uvDeltaPos2 = x_uv2 - x_uv0;\n            const y_uvDeltaPos2 = y_uv2 - y_uv0;\n            const rInv = x_uvDeltaPos1 * y_uvDeltaPos2 - y_uvDeltaPos1 * x_uvDeltaPos2;\n            const r = 1.0 / Math.abs(rInv < 0.0001 ? 1.0 : rInv);\n            // Tangent\n            const x_tangent = (x_deltaPos1 * y_uvDeltaPos2 - x_deltaPos2 * y_uvDeltaPos1) * r;\n            const y_tangent = (y_deltaPos1 * y_uvDeltaPos2 - y_deltaPos2 * y_uvDeltaPos1) * r;\n            const z_tangent = (z_deltaPos1 * y_uvDeltaPos2 - z_deltaPos2 * y_uvDeltaPos1) * r;\n            // Bitangent\n            const x_bitangent = (x_deltaPos2 * x_uvDeltaPos1 - x_deltaPos1 * x_uvDeltaPos2) * r;\n            const y_bitangent = (y_deltaPos2 * x_uvDeltaPos1 - y_deltaPos1 * x_uvDeltaPos2) * r;\n            const z_bitangent = (z_deltaPos2 * x_uvDeltaPos1 - z_deltaPos1 * x_uvDeltaPos2) * r;\n            // Gram-Schmidt orthogonalize\n            //t = glm::normalize(t - n * glm:: dot(n, t));\n            const x_n0 = normals[i0 * 3 + 0];\n            const y_n0 = normals[i0 * 3 + 1];\n            const z_n0 = normals[i0 * 3 + 2];\n            const x_n1 = normals[i1 * 3 + 0];\n            const y_n1 = normals[i1 * 3 + 1];\n            const z_n1 = normals[i1 * 3 + 2];\n            const x_n2 = normals[i2 * 3 + 0];\n            const y_n2 = normals[i2 * 3 + 1];\n            const z_n2 = normals[i2 * 3 + 2];\n            // Tangent\n            const n0_dot_t = x_tangent * x_n0 + y_tangent * y_n0 + z_tangent * z_n0;\n            const n1_dot_t = x_tangent * x_n1 + y_tangent * y_n1 + z_tangent * z_n1;\n            const n2_dot_t = x_tangent * x_n2 + y_tangent * y_n2 + z_tangent * z_n2;\n            const x_resTangent0 = x_tangent - x_n0 * n0_dot_t;\n            const y_resTangent0 = y_tangent - y_n0 * n0_dot_t;\n            const z_resTangent0 = z_tangent - z_n0 * n0_dot_t;\n            const x_resTangent1 = x_tangent - x_n1 * n1_dot_t;\n            const y_resTangent1 = y_tangent - y_n1 * n1_dot_t;\n            const z_resTangent1 = z_tangent - z_n1 * n1_dot_t;\n            const x_resTangent2 = x_tangent - x_n2 * n2_dot_t;\n            const y_resTangent2 = y_tangent - y_n2 * n2_dot_t;\n            const z_resTangent2 = z_tangent - z_n2 * n2_dot_t;\n            const magTangent0 = Math.sqrt(x_resTangent0 * x_resTangent0 + y_resTangent0 * y_resTangent0 + z_resTangent0 * z_resTangent0);\n            const magTangent1 = Math.sqrt(x_resTangent1 * x_resTangent1 + y_resTangent1 * y_resTangent1 + z_resTangent1 * z_resTangent1);\n            const magTangent2 = Math.sqrt(x_resTangent2 * x_resTangent2 + y_resTangent2 * y_resTangent2 + z_resTangent2 * z_resTangent2);\n            // Bitangent\n            const n0_dot_bt = x_bitangent * x_n0 + y_bitangent * y_n0 + z_bitangent * z_n0;\n            const n1_dot_bt = x_bitangent * x_n1 + y_bitangent * y_n1 + z_bitangent * z_n1;\n            const n2_dot_bt = x_bitangent * x_n2 + y_bitangent * y_n2 + z_bitangent * z_n2;\n            const x_resBitangent0 = x_bitangent - x_n0 * n0_dot_bt;\n            const y_resBitangent0 = y_bitangent - y_n0 * n0_dot_bt;\n            const z_resBitangent0 = z_bitangent - z_n0 * n0_dot_bt;\n            const x_resBitangent1 = x_bitangent - x_n1 * n1_dot_bt;\n            const y_resBitangent1 = y_bitangent - y_n1 * n1_dot_bt;\n            const z_resBitangent1 = z_bitangent - z_n1 * n1_dot_bt;\n            const x_resBitangent2 = x_bitangent - x_n2 * n2_dot_bt;\n            const y_resBitangent2 = y_bitangent - y_n2 * n2_dot_bt;\n            const z_resBitangent2 = z_bitangent - z_n2 * n2_dot_bt;\n            const magBitangent0 = Math.sqrt(x_resBitangent0 * x_resBitangent0 +\n                y_resBitangent0 * y_resBitangent0 +\n                z_resBitangent0 * z_resBitangent0);\n            const magBitangent1 = Math.sqrt(x_resBitangent1 * x_resBitangent1 +\n                y_resBitangent1 * y_resBitangent1 +\n                z_resBitangent1 * z_resBitangent1);\n            const magBitangent2 = Math.sqrt(x_resBitangent2 * x_resBitangent2 +\n                y_resBitangent2 * y_resBitangent2 +\n                z_resBitangent2 * z_resBitangent2);\n            unpacked.tangents[i0 * 3 + 0] += x_resTangent0 / magTangent0;\n            unpacked.tangents[i0 * 3 + 1] += y_resTangent0 / magTangent0;\n            unpacked.tangents[i0 * 3 + 2] += z_resTangent0 / magTangent0;\n            unpacked.tangents[i1 * 3 + 0] += x_resTangent1 / magTangent1;\n            unpacked.tangents[i1 * 3 + 1] += y_resTangent1 / magTangent1;\n            unpacked.tangents[i1 * 3 + 2] += z_resTangent1 / magTangent1;\n            unpacked.tangents[i2 * 3 + 0] += x_resTangent2 / magTangent2;\n            unpacked.tangents[i2 * 3 + 1] += y_resTangent2 / magTangent2;\n            unpacked.tangents[i2 * 3 + 2] += z_resTangent2 / magTangent2;\n            unpacked.bitangents[i0 * 3 + 0] += x_resBitangent0 / magBitangent0;\n            unpacked.bitangents[i0 * 3 + 1] += y_resBitangent0 / magBitangent0;\n            unpacked.bitangents[i0 * 3 + 2] += z_resBitangent0 / magBitangent0;\n            unpacked.bitangents[i1 * 3 + 0] += x_resBitangent1 / magBitangent1;\n            unpacked.bitangents[i1 * 3 + 1] += y_resBitangent1 / magBitangent1;\n            unpacked.bitangents[i1 * 3 + 2] += z_resBitangent1 / magBitangent1;\n            unpacked.bitangents[i2 * 3 + 0] += x_resBitangent2 / magBitangent2;\n            unpacked.bitangents[i2 * 3 + 1] += y_resBitangent2 / magBitangent2;\n            unpacked.bitangents[i2 * 3 + 2] += z_resBitangent2 / magBitangent2;\n            // TODO: check handedness\n        }\n        this.tangents = unpacked.tangents;\n        this.bitangents = unpacked.bitangents;\n    }\n    /**\n     * @param layout - A {@link Layout} object that describes the\n     * desired memory layout of the generated buffer\n     * @return The packed array in the ... TODO\n     */\n    makeBufferData(layout) {\n        const numItems = this.vertices.length / 3;\n        const buffer = new ArrayBuffer(layout.stride * numItems);\n        buffer.numItems = numItems;\n        const dataView = new DataView(buffer);\n        for (let i = 0, vertexOffset = 0; i < numItems; i++) {\n            vertexOffset = i * layout.stride;\n            // copy in the vertex data in the order and format given by the\n            // layout param\n            for (const attribute of layout.attributes) {\n                const offset = vertexOffset + layout.attributeMap[attribute.key].offset;\n                switch (attribute.key) {\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].POSITION.key:\n                        dataView.setFloat32(offset, this.vertices[i * 3], true);\n                        dataView.setFloat32(offset + 4, this.vertices[i * 3 + 1], true);\n                        dataView.setFloat32(offset + 8, this.vertices[i * 3 + 2], true);\n                        break;\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].UV.key:\n                        dataView.setFloat32(offset, this.textures[i * 2], true);\n                        dataView.setFloat32(offset + 4, this.textures[i * 2 + 1], true);\n                        break;\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].NORMAL.key:\n                        dataView.setFloat32(offset, this.vertexNormals[i * 3], true);\n                        dataView.setFloat32(offset + 4, this.vertexNormals[i * 3 + 1], true);\n                        dataView.setFloat32(offset + 8, this.vertexNormals[i * 3 + 2], true);\n                        break;\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].MATERIAL_INDEX.key:\n                        dataView.setInt16(offset, this.vertexMaterialIndices[i], true);\n                        break;\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].AMBIENT.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.ambient[0], true);\n                        dataView.setFloat32(offset + 4, material.ambient[1], true);\n                        dataView.setFloat32(offset + 8, material.ambient[2], true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].DIFFUSE.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.diffuse[0], true);\n                        dataView.setFloat32(offset + 4, material.diffuse[1], true);\n                        dataView.setFloat32(offset + 8, material.diffuse[2], true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].SPECULAR.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.specular[0], true);\n                        dataView.setFloat32(offset + 4, material.specular[1], true);\n                        dataView.setFloat32(offset + 8, material.specular[2], true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].SPECULAR_EXPONENT.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.specularExponent, true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].EMISSIVE.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.emissive[0], true);\n                        dataView.setFloat32(offset + 4, material.emissive[1], true);\n                        dataView.setFloat32(offset + 8, material.emissive[2], true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].TRANSMISSION_FILTER.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.transmissionFilter[0], true);\n                        dataView.setFloat32(offset + 4, material.transmissionFilter[1], true);\n                        dataView.setFloat32(offset + 8, material.transmissionFilter[2], true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].DISSOLVE.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.dissolve, true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].ILLUMINATION.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setInt16(offset, material.illumination, true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].REFRACTION_INDEX.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.refractionIndex, true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].SHARPNESS.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setFloat32(offset, material.sharpness, true);\n                        break;\n                    }\n                    case _layout__WEBPACK_IMPORTED_MODULE_0__["Layout"].ANTI_ALIASING.key: {\n                        const materialIndex = this.vertexMaterialIndices[i];\n                        const material = this.materialsByIndex[materialIndex];\n                        if (!material) {\n                            console.warn(\'Material "\' +\n                                this.materialNames[materialIndex] +\n                                \'" not found in mesh. Did you forget to call addMaterialLibrary(...)?"\');\n                            break;\n                        }\n                        dataView.setInt16(offset, material.antiAliasing ? 1 : 0, true);\n                        break;\n                    }\n                }\n            }\n        }\n        return buffer;\n    }\n    makeIndexBufferData() {\n        const buffer = new Uint16Array(this.indices);\n        buffer.numItems = this.indices.length;\n        return buffer;\n    }\n    makeIndexBufferDataForMaterials(...materialIndices) {\n        const indices = new Array().concat(...materialIndices.map(mtlIdx => this.indicesPerMaterial[mtlIdx]));\n        const buffer = new Uint16Array(indices);\n        buffer.numItems = indices.length;\n        return buffer;\n    }\n    addMaterialLibrary(mtl) {\n        for (const name in mtl.materials) {\n            if (!(name in this.materialIndices)) {\n                // This material is not referenced by the mesh\n                continue;\n            }\n            const material = mtl.materials[name];\n            // Find the material index for this material\n            const materialIndex = this.materialIndices[material.name];\n            // Put the material into the materialsByIndex object at the right\n            // spot as determined when the obj file was parsed\n            this.materialsByIndex[materialIndex] = material;\n        }\n    }\n}\nfunction* triangulate(elements) {\n    if (elements.length <= 3) {\n        yield elements;\n    }\n    else if (elements.length === 4) {\n        yield [elements[0], elements[1], elements[2]];\n        yield [elements[2], elements[3], elements[0]];\n    }\n    else {\n        for (let i = 1; i < elements.length - 1; i++) {\n            yield [elements[0], elements[i], elements[i + 1]];\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./src/mesh.ts?');},"./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: downloadModels, downloadMeshes, initMeshBuffers, deleteMeshBuffers */function(module,__webpack_exports__,__webpack_require__){eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadModels", function() { return downloadModels; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadMeshes", function() { return downloadMeshes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initMeshBuffers", function() { return initMeshBuffers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteMeshBuffers", function() { return deleteMeshBuffers; });\n/* harmony import */ var _mesh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mesh */ "./src/mesh.ts");\n/* harmony import */ var _material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./material */ "./src/material.ts");\n\n\nfunction downloadMtlTextures(mtl, root) {\n    const mapAttributes = [\n        "mapDiffuse",\n        "mapAmbient",\n        "mapSpecular",\n        "mapDissolve",\n        "mapBump",\n        "mapDisplacement",\n        "mapDecal",\n        "mapEmissive",\n    ];\n    if (!root.endsWith("/")) {\n        root += "/";\n    }\n    const textures = [];\n    for (const materialName in mtl.materials) {\n        if (!mtl.materials.hasOwnProperty(materialName)) {\n            continue;\n        }\n        const material = mtl.materials[materialName];\n        for (const attr of mapAttributes) {\n            const mapData = material[attr];\n            if (!mapData || !mapData.filename) {\n                continue;\n            }\n            const url = root + mapData.filename;\n            textures.push(fetch(url)\n                .then(response => {\n                if (!response.ok) {\n                    throw new Error();\n                }\n                return response.blob();\n            })\n                .then(function (data) {\n                const image = new Image();\n                image.src = URL.createObjectURL(data);\n                mapData.texture = image;\n                return new Promise(resolve => (image.onload = resolve));\n            })\n                .catch(() => {\n                console.error(`Unable to download texture: ${url}`);\n            }));\n        }\n    }\n    return Promise.all(textures);\n}\nfunction getMtl(modelOptions) {\n    if (!(typeof modelOptions.mtl === "string")) {\n        return modelOptions.obj.replace(/\\.obj$/, ".mtl");\n    }\n    return modelOptions.mtl;\n}\n/**\n * Accepts a list of model request objects and returns a Promise that\n * resolves when all models have been downloaded and parsed.\n *\n * The list of model objects follow this interface:\n * {\n *  obj: \'path/to/model.obj\',\n *  mtl: true | \'path/to/model.mtl\',\n *  downloadMtlTextures: true | false\n *  mtlTextureRoot: \'/models/suzanne/maps\'\n *  name: \'suzanne\'\n * }\n *\n * The `obj` attribute is required and should be the path to the\n * model\'s .obj file relative to the current repo (absolute URLs are\n * suggested).\n *\n * The `mtl` attribute is optional and can either be a boolean or\n * a path to the model\'s .mtl file relative to the current URL. If\n * the value is `true`, then the path and basename given for the `obj`\n * attribute is used replacing the .obj suffix for .mtl\n * E.g.: {obj: \'models/foo.obj\', mtl: true} would search for \'models/foo.mtl\'\n *\n * The `name` attribute is optional and is a human friendly name to be\n * included with the parsed OBJ and MTL files. If not given, the base .obj\n * filename will be used.\n *\n * The `downloadMtlTextures` attribute is a flag for automatically downloading\n * any images found in the MTL file and attaching them to each Material\n * created from that file. For example, if material.mapDiffuse is set (there\n * was data in the MTL file), then material.mapDiffuse.texture will contain\n * the downloaded image. This option defaults to `true`. By default, the MTL\'s\n * URL will be used to determine the location of the images.\n *\n * The `mtlTextureRoot` attribute is optional and should point to the location\n * on the server that this MTL\'s texture files are located. The default is to\n * use the MTL file\'s location.\n *\n * @returns {Promise} the result of downloading the given list of models. The\n * promise will resolve with an object whose keys are the names of the models\n * and the value is its Mesh object. Each Mesh object will automatically\n * have its addMaterialLibrary() method called to set the given MTL data (if given).\n */\nfunction downloadModels(models) {\n    const finished = [];\n    for (const model of models) {\n        if (!model.obj) {\n            throw new Error(\'"obj" attribute of model object not set. The .obj file is required to be set \' +\n                "in order to use downloadModels()");\n        }\n        const options = {\n            indicesPerMaterial: !!model.indicesPerMaterial,\n            calcTangentsAndBitangents: !!model.calcTangentsAndBitangents,\n        };\n        // if the name is not provided, dervive it from the given OBJ\n        let name = model.name;\n        if (!name) {\n            const parts = model.obj.split("/");\n            name = parts[parts.length - 1].replace(".obj", "");\n        }\n        const namePromise = Promise.resolve(name);\n        const meshPromise = fetch(model.obj)\n            .then(response => response.text())\n            .then(data => {\n            return new _mesh__WEBPACK_IMPORTED_MODULE_0__["default"](data, options);\n        });\n        let mtlPromise;\n        // Download MaterialLibrary file?\n        if (model.mtl) {\n            const mtl = getMtl(model);\n            mtlPromise = fetch(mtl)\n                .then(response => response.text())\n                .then((data) => {\n                const material = new _material__WEBPACK_IMPORTED_MODULE_1__["MaterialLibrary"](data);\n                if (model.downloadMtlTextures !== false) {\n                    let root = model.mtlTextureRoot;\n                    if (!root) {\n                        // get the directory of the MTL file as default\n                        root = mtl.substr(0, mtl.lastIndexOf("/"));\n                    }\n                    // downloadMtlTextures returns a Promise that\n                    // is resolved once all of the images it\n                    // contains are downloaded. These are then\n                    // attached to the map data objects\n                    return Promise.all([Promise.resolve(material), downloadMtlTextures(material, root)]);\n                }\n                return Promise.all([Promise.resolve(material), undefined]);\n            })\n                .then((value) => {\n                return value[0];\n            });\n        }\n        const parsed = [namePromise, meshPromise, mtlPromise];\n        finished.push(Promise.all(parsed));\n    }\n    return Promise.all(finished).then(ms => {\n        // the "finished" promise is a list of name, Mesh instance,\n        // and MaterialLibary instance. This unpacks and returns an\n        // object mapping name to Mesh (Mesh points to MTL).\n        const models = {};\n        for (const model of ms) {\n            const [name, mesh, mtl] = model;\n            mesh.name = name;\n            if (mtl) {\n                mesh.addMaterialLibrary(mtl);\n            }\n            models[name] = mesh;\n        }\n        return models;\n    });\n}\n/**\n * Takes in an object of `mesh_name`, `\'/url/to/OBJ/file\'` pairs and a callback\n * function. Each OBJ file will be ajaxed in and automatically converted to\n * an OBJ.Mesh. When all files have successfully downloaded the callback\n * function provided will be called and passed in an object containing\n * the newly created meshes.\n *\n * **Note:** In order to use this function as a way to download meshes, a\n * webserver of some sort must be used.\n *\n * @param {Object} nameAndAttrs an object where the key is the name of the mesh and the value is the url to that mesh\'s OBJ file\n *\n * @param {Function} completionCallback should contain a function that will take one parameter: an object array where the keys will be the unique object name and the value will be a Mesh object\n *\n * @param {Object} meshes In case other meshes are loaded separately or if a previously declared variable is desired to be used, pass in a (possibly empty) json object of the pattern: { \'<mesh_name>\': OBJ.Mesh }\n *\n */\nfunction downloadMeshes(nameAndURLs, completionCallback, meshes) {\n    if (meshes === undefined) {\n        meshes = {};\n    }\n    const completed = [];\n    for (const mesh_name in nameAndURLs) {\n        if (!nameAndURLs.hasOwnProperty(mesh_name)) {\n            continue;\n        }\n        const url = nameAndURLs[mesh_name];\n        completed.push(fetch(url)\n            .then(response => response.text())\n            .then(data => {\n            return [mesh_name, new _mesh__WEBPACK_IMPORTED_MODULE_0__["default"](data)];\n        }));\n    }\n    Promise.all(completed).then(ms => {\n        for (const [name, mesh] of ms) {\n            meshes[name] = mesh;\n        }\n        return completionCallback(meshes);\n    });\n}\nfunction _buildBuffer(gl, type, data, itemSize) {\n    const buffer = gl.createBuffer();\n    const arrayView = type === gl.ARRAY_BUFFER ? Float32Array : Uint16Array;\n    gl.bindBuffer(type, buffer);\n    gl.bufferData(type, new arrayView(data), gl.STATIC_DRAW);\n    buffer.itemSize = itemSize;\n    buffer.numItems = data.length / itemSize;\n    return buffer;\n}\n/**\n * Takes in the WebGL context and a Mesh, then creates and appends the buffers\n * to the mesh object as attributes.\n *\n * @param {WebGLRenderingContext} gl the `canvas.getContext(\'webgl\')` context instance\n * @param {Mesh} mesh a single `OBJ.Mesh` instance\n *\n * The newly created mesh attributes are:\n *\n * Attrbute | Description\n * :--- | ---\n * **normalBuffer**       |contains the model&#39;s Vertex Normals\n * normalBuffer.itemSize  |set to 3 items\n * normalBuffer.numItems  |the total number of vertex normals\n * |\n * **textureBuffer**      |contains the model&#39;s Texture Coordinates\n * textureBuffer.itemSize |set to 2 items\n * textureBuffer.numItems |the number of texture coordinates\n * |\n * **vertexBuffer**       |contains the model&#39;s Vertex Position Coordinates (does not include w)\n * vertexBuffer.itemSize  |set to 3 items\n * vertexBuffer.numItems  |the total number of vertices\n * |\n * **indexBuffer**        |contains the indices of the faces\n * indexBuffer.itemSize   |is set to 1\n * indexBuffer.numItems   |the total number of indices\n *\n * A simple example (a lot of steps are missing, so don\'t copy and paste):\n *\n *     const gl   = canvas.getContext(\'webgl\'),\n *         mesh = OBJ.Mesh(obj_file_data);\n *     // compile the shaders and create a shader program\n *     const shaderProgram = gl.createProgram();\n *     // compilation stuff here\n *     ...\n *     // make sure you have vertex, vertex normal, and texture coordinate\n *     // attributes located in your shaders and attach them to the shader program\n *     shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");\n *     gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);\n *\n *     shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");\n *     gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);\n *\n *     shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");\n *     gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);\n *\n *     // create and initialize the vertex, vertex normal, and texture coordinate buffers\n *     // and save on to the mesh object\n *     OBJ.initMeshBuffers(gl, mesh);\n *\n *     // now to render the mesh\n *     gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);\n *     gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);\n *     // it\'s possible that the mesh doesn\'t contain\n *     // any texture coordinates (e.g. suzanne.obj in the development branch).\n *     // in this case, the texture vertexAttribArray will need to be disabled\n *     // before the call to drawElements\n *     if(!mesh.textures.length){\n *       gl.disableVertexAttribArray(shaderProgram.textureCoordAttribute);\n *     }\n *     else{\n *       // if the texture vertexAttribArray has been previously\n *       // disabled, then it needs to be re-enabled\n *       gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);\n *       gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureBuffer);\n *       gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, mesh.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);\n *     }\n *\n *     gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);\n *     gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);\n *\n *     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.mesh.indexBuffer);\n *     gl.drawElements(gl.TRIANGLES, model.mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);\n */\nfunction initMeshBuffers(gl, mesh) {\n    mesh.normalBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertexNormals, 3);\n    mesh.textureBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.textures, mesh.textureStride);\n    mesh.vertexBuffer = _buildBuffer(gl, gl.ARRAY_BUFFER, mesh.vertices, 3);\n    mesh.indexBuffer = _buildBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, mesh.indices, 1);\n    return mesh;\n}\nfunction deleteMeshBuffers(gl, mesh) {\n    gl.deleteBuffer(mesh.normalBuffer);\n    gl.deleteBuffer(mesh.textureBuffer);\n    gl.deleteBuffer(mesh.vertexBuffer);\n    gl.deleteBuffer(mesh.indexBuffer);\n}\n\n\n//# sourceURL=webpack:///./src/utils.ts?');},0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */function(module,exports,__webpack_require__){eval('module.exports = __webpack_require__(/*! /home/aaron/google_drive/projects/webgl-obj-loader/src/index.ts */"./src/index.ts");\n\n\n//# sourceURL=webpack:///multi_./src/index.ts?');}})}));
});

var webglObjLoader_min$1 = unwrapExports(webglObjLoader_min);

/* @license twgl.js 4.19.1 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
Available via the MIT license.
see: http://github.com/greggman/twgl.js for details */
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 *
 * Vec3 math math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new Vec3. In other words you can do this
 *
 *     var v = v3.cross(v1, v2);  // Creates a new Vec3 with the cross product of v1 x v2.
 *
 * or
 *
 *     var v = v3.create();
 *     v3.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always save to pass any vector as the destination. So for example
 *
 *     v3.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
 *
 * @module twgl/v3
 */

let VecType = Float32Array;

/**
 * A JavaScript array with 3 values or a Float32Array with 3 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link module:twgl/v3.setDefaultType}.
 * @typedef {(number[]|Float32Array)} Vec3
 * @memberOf module:twgl/v3
 */

/**
 * Sets the type this library creates for a Vec3
 * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
 * @return {constructor} previous constructor for Vec3
 * @memberOf module:twgl/v3
 */
function setDefaultType(ctor) {
  const oldType = VecType;
  VecType = ctor;
  return oldType;
}

/**
 * Creates a vec3; may be called with x, y, z to set initial values.
 * @param {number} [x] Initial x value.
 * @param {number} [y] Initial y value.
 * @param {number} [z] Initial z value.
 * @return {module:twgl/v3.Vec3} the created vector
 * @memberOf module:twgl/v3
 */
function create(x, y, z) {
  const dst = new VecType(3);
  if (x) {
    dst[0] = x;
  }
  if (y) {
    dst[1] = y;
  }
  if (z) {
    dst[2] = z;
  }
  return dst;
}

/**
 * Adds two vectors; assumes a and b have the same dimension.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A vector tha tis the sum of a and b.
 * @memberOf module:twgl/v3
 */
function add(a, b, dst) {
  dst = dst || new VecType(3);

  dst[0] = a[0] + b[0];
  dst[1] = a[1] + b[1];
  dst[2] = a[2] + b[2];

  return dst;
}

/**
 * Subtracts two vectors.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A vector that is the difference of a and b.
 * @memberOf module:twgl/v3
 */
function subtract(a, b, dst) {
  dst = dst || new VecType(3);

  dst[0] = a[0] - b[0];
  dst[1] = a[1] - b[1];
  dst[2] = a[2] - b[2];

  return dst;
}

/**
 * Performs linear interpolation on two vectors.
 * Given vectors a and b and interpolation coefficient t, returns
 * a + t * (b - a).
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {number} t Interpolation coefficient.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The linear interpolated result.
 * @memberOf module:twgl/v3
 */
function lerp(a, b, t, dst) {
  dst = dst || new VecType(3);

  dst[0] = a[0] + t * (b[0] - a[0]);
  dst[1] = a[1] + t * (b[1] - a[1]);
  dst[2] = a[2] + t * (b[2] - a[2]);

  return dst;
}

/**
 * Performs linear interpolation on two vectors.
 * Given vectors a and b and interpolation coefficient vector t, returns
 * a + t * (b - a).
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} t Interpolation coefficients vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} the linear interpolated result.
 * @memberOf module:twgl/v3
 */
function lerpV(a, b, t, dst) {
  dst = dst || new VecType(3);

  dst[0] = a[0] + t[0] * (b[0] - a[0]);
  dst[1] = a[1] + t[1] * (b[1] - a[1]);
  dst[2] = a[2] + t[2] * (b[2] - a[2]);

  return dst;
}

/**
 * Return max values of two vectors.
 * Given vectors a and b returns
 * [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The max components vector.
 * @memberOf module:twgl/v3
 */
function max(a, b, dst) {
  dst = dst || new VecType(3);

  dst[0] = Math.max(a[0], b[0]);
  dst[1] = Math.max(a[1], b[1]);
  dst[2] = Math.max(a[2], b[2]);

  return dst;
}

/**
 * Return min values of two vectors.
 * Given vectors a and b returns
 * [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The min components vector.
 * @memberOf module:twgl/v3
 */
function min(a, b, dst) {
  dst = dst || new VecType(3);

  dst[0] = Math.min(a[0], b[0]);
  dst[1] = Math.min(a[1], b[1]);
  dst[2] = Math.min(a[2], b[2]);

  return dst;
}

/**
 * Multiplies a vector by a scalar.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {number} k The scalar.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The scaled vector.
 * @memberOf module:twgl/v3
 */
function mulScalar(v, k, dst) {
  dst = dst || new VecType(3);

  dst[0] = v[0] * k;
  dst[1] = v[1] * k;
  dst[2] = v[2] * k;

  return dst;
}

/**
 * Divides a vector by a scalar.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {number} k The scalar.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The scaled vector.
 * @memberOf module:twgl/v3
 */
function divScalar(v, k, dst) {
  dst = dst || new VecType(3);

  dst[0] = v[0] / k;
  dst[1] = v[1] / k;
  dst[2] = v[2] / k;

  return dst;
}

/**
 * Computes the cross product of two vectors; assumes both vectors have
 * three entries.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of a cross b.
 * @memberOf module:twgl/v3
 */
function cross(a, b, dst) {
  dst = dst || new VecType(3);

  const t1 = a[2] * b[0] - a[0] * b[2];
  const t2 = a[0] * b[1] - a[1] * b[0];
  dst[0] = a[1] * b[2] - a[2] * b[1];
  dst[1] = t1;
  dst[2] = t2;

  return dst;
}

/**
 * Computes the dot product of two vectors; assumes both vectors have
 * three entries.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @return {number} dot product
 * @memberOf module:twgl/v3
 */
function dot(a, b) {
  return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);
}

/**
 * Computes the length of vector
 * @param {module:twgl/v3.Vec3} v vector.
 * @return {number} length of vector.
 * @memberOf module:twgl/v3
 */
function length$1(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}

/**
 * Computes the square of the length of vector
 * @param {module:twgl/v3.Vec3} v vector.
 * @return {number} square of the length of vector.
 * @memberOf module:twgl/v3
 */
function lengthSq(v) {
  return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
}

/**
 * Computes the distance between 2 points
 * @param {module:twgl/v3.Vec3} a vector.
 * @param {module:twgl/v3.Vec3} b vector.
 * @return {number} distance between a and b
 * @memberOf module:twgl/v3
 */
function distance(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Computes the square of the distance between 2 points
 * @param {module:twgl/v3.Vec3} a vector.
 * @param {module:twgl/v3.Vec3} b vector.
 * @return {number} square of the distance between a and b
 * @memberOf module:twgl/v3
 */
function distanceSq(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return dx * dx + dy * dy + dz * dz;
}

/**
 * Divides a vector by its Euclidean length and returns the quotient.
 * @param {module:twgl/v3.Vec3} a The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The normalized vector.
 * @memberOf module:twgl/v3
 */
function normalize(a, dst) {
  dst = dst || new VecType(3);

  const lenSq = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
  const len = Math.sqrt(lenSq);
  if (len > 0.00001) {
    dst[0] = a[0] / len;
    dst[1] = a[1] / len;
    dst[2] = a[2] / len;
  } else {
    dst[0] = 0;
    dst[1] = 0;
    dst[2] = 0;
  }

  return dst;
}

/**
 * Negates a vector.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} -v.
 * @memberOf module:twgl/v3
 */
function negate(v, dst) {
  dst = dst || new VecType(3);

  dst[0] = -v[0];
  dst[1] = -v[1];
  dst[2] = -v[2];

  return dst;
}

/**
 * Copies a vector.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A copy of v.
 * @memberOf module:twgl/v3
 */
function copy(v, dst) {
  dst = dst || new VecType(3);

  dst[0] = v[0];
  dst[1] = v[1];
  dst[2] = v[2];

  return dst;
}

/**
 * Multiplies a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of products of entries of a and
 *     b.
 * @memberOf module:twgl/v3
 */
function multiply(a, b, dst) {
  dst = dst || new VecType(3);

  dst[0] = a[0] * b[0];
  dst[1] = a[1] * b[1];
  dst[2] = a[2] * b[2];

  return dst;
}

/**
 * Divides a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of quotients of entries of a and
 *     b.
 * @memberOf module:twgl/v3
 */
function divide(a, b, dst) {
  dst = dst || new VecType(3);

  dst[0] = a[0] / b[0];
  dst[1] = a[1] / b[1];
  dst[2] = a[2] / b[2];

  return dst;
}

var v3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  add: add,
  copy: copy,
  create: create,
  cross: cross,
  distance: distance,
  distanceSq: distanceSq,
  divide: divide,
  divScalar: divScalar,
  dot: dot,
  lerp: lerp,
  lerpV: lerpV,
  length: length$1,
  lengthSq: lengthSq,
  max: max,
  min: min,
  mulScalar: mulScalar,
  multiply: multiply,
  negate: negate,
  normalize: normalize,
  setDefaultType: setDefaultType,
  subtract: subtract
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * 4x4 Matrix math math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new matrix. In other words you can do this
 *
 *     const mat = m4.translation([1, 2, 3]);  // Creates a new translation matrix
 *
 * or
 *
 *     const mat = m4.create();
 *     m4.translation([1, 2, 3], mat);  // Puts translation matrix in mat.
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always save to pass any matrix as the destination. So for example
 *
 *     const mat = m4.identity();
 *     const trans = m4.translation([1, 2, 3]);
 *     m4.multiply(mat, trans, mat);  // Multiplies mat * trans and puts result in mat.
 *
 * @module twgl/m4
 */
let MatType = Float32Array;

/**
 * A JavaScript array with 16 values or a Float32Array with 16 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link module:twgl/m4.setDefaultType}.
 * @typedef {(number[]|Float32Array)} Mat4
 * @memberOf module:twgl/m4
 */

/**
 * Sets the type this library creates for a Mat4
 * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
 * @return {constructor} previous constructor for Mat4
 * @memberOf module:twgl/m4
 */
function setDefaultType$1(ctor) {
  const oldType = MatType;
  MatType = ctor;
  return oldType;
}

/**
 * Negates a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} -m.
 * @memberOf module:twgl/m4
 */
function negate$1(m, dst) {
  dst = dst || new MatType(16);

  dst[ 0] = -m[ 0];
  dst[ 1] = -m[ 1];
  dst[ 2] = -m[ 2];
  dst[ 3] = -m[ 3];
  dst[ 4] = -m[ 4];
  dst[ 5] = -m[ 5];
  dst[ 6] = -m[ 6];
  dst[ 7] = -m[ 7];
  dst[ 8] = -m[ 8];
  dst[ 9] = -m[ 9];
  dst[10] = -m[10];
  dst[11] = -m[11];
  dst[12] = -m[12];
  dst[13] = -m[13];
  dst[14] = -m[14];
  dst[15] = -m[15];

  return dst;
}

/**
 * Copies a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] The matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} A copy of m.
 * @memberOf module:twgl/m4
 */
function copy$1(m, dst) {
  dst = dst || new MatType(16);

  dst[ 0] = m[ 0];
  dst[ 1] = m[ 1];
  dst[ 2] = m[ 2];
  dst[ 3] = m[ 3];
  dst[ 4] = m[ 4];
  dst[ 5] = m[ 5];
  dst[ 6] = m[ 6];
  dst[ 7] = m[ 7];
  dst[ 8] = m[ 8];
  dst[ 9] = m[ 9];
  dst[10] = m[10];
  dst[11] = m[11];
  dst[12] = m[12];
  dst[13] = m[13];
  dst[14] = m[14];
  dst[15] = m[15];

  return dst;
}

/**
 * Creates an n-by-n identity matrix.
 *
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} An n-by-n identity matrix.
 * @memberOf module:twgl/m4
 */
function identity(dst) {
  dst = dst || new MatType(16);

  dst[ 0] = 1;
  dst[ 1] = 0;
  dst[ 2] = 0;
  dst[ 3] = 0;
  dst[ 4] = 0;
  dst[ 5] = 1;
  dst[ 6] = 0;
  dst[ 7] = 0;
  dst[ 8] = 0;
  dst[ 9] = 0;
  dst[10] = 1;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;

  return dst;
}

/**
 * Takes the transpose of a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The transpose of m.
 * @memberOf module:twgl/m4
 */
 function transpose(m, dst) {
  dst = dst || new MatType(16);
  if (dst === m) {
    let t;

    t = m[1];
    m[1] = m[4];
    m[4] = t;

    t = m[2];
    m[2] = m[8];
    m[8] = t;

    t = m[3];
    m[3] = m[12];
    m[12] = t;

    t = m[6];
    m[6] = m[9];
    m[9] = t;

    t = m[7];
    m[7] = m[13];
    m[13] = t;

    t = m[11];
    m[11] = m[14];
    m[14] = t;
    return dst;
  }

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const m30 = m[3 * 4 + 0];
  const m31 = m[3 * 4 + 1];
  const m32 = m[3 * 4 + 2];
  const m33 = m[3 * 4 + 3];

  dst[ 0] = m00;
  dst[ 1] = m10;
  dst[ 2] = m20;
  dst[ 3] = m30;
  dst[ 4] = m01;
  dst[ 5] = m11;
  dst[ 6] = m21;
  dst[ 7] = m31;
  dst[ 8] = m02;
  dst[ 9] = m12;
  dst[10] = m22;
  dst[11] = m32;
  dst[12] = m03;
  dst[13] = m13;
  dst[14] = m23;
  dst[15] = m33;

  return dst;
}

/**
 * Computes the inverse of a 4-by-4 matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The inverse of m.
 * @memberOf module:twgl/m4
 */
function inverse(m, dst) {
  dst = dst || new MatType(16);

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const m30 = m[3 * 4 + 0];
  const m31 = m[3 * 4 + 1];
  const m32 = m[3 * 4 + 2];
  const m33 = m[3 * 4 + 3];
  const tmp_0  = m22 * m33;
  const tmp_1  = m32 * m23;
  const tmp_2  = m12 * m33;
  const tmp_3  = m32 * m13;
  const tmp_4  = m12 * m23;
  const tmp_5  = m22 * m13;
  const tmp_6  = m02 * m33;
  const tmp_7  = m32 * m03;
  const tmp_8  = m02 * m23;
  const tmp_9  = m22 * m03;
  const tmp_10 = m02 * m13;
  const tmp_11 = m12 * m03;
  const tmp_12 = m20 * m31;
  const tmp_13 = m30 * m21;
  const tmp_14 = m10 * m31;
  const tmp_15 = m30 * m11;
  const tmp_16 = m10 * m21;
  const tmp_17 = m20 * m11;
  const tmp_18 = m00 * m31;
  const tmp_19 = m30 * m01;
  const tmp_20 = m00 * m21;
  const tmp_21 = m20 * m01;
  const tmp_22 = m00 * m11;
  const tmp_23 = m10 * m01;

  const t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
      (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
  const t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
      (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
  const t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
      (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
  const t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
      (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

  const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

  dst[ 0] = d * t0;
  dst[ 1] = d * t1;
  dst[ 2] = d * t2;
  dst[ 3] = d * t3;
  dst[ 4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
          (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
  dst[ 5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
          (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
  dst[ 6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
          (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
  dst[ 7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
          (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
  dst[ 8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
          (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
  dst[ 9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
          (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
  dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
          (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
  dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
          (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
  dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
          (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
  dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
          (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
  dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
          (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
  dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
          (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

  return dst;
}

/**
 * Multiplies two 4-by-4 matrices with a on the left and b on the right
 * @param {module:twgl/m4.Mat4} a The matrix on the left.
 * @param {module:twgl/m4.Mat4} b The matrix on the right.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix product of a and b.
 * @memberOf module:twgl/m4
 */
function multiply$1(a, b, dst) {
  dst = dst || new MatType(16);

  const a00 = a[0];
  const a01 = a[1];
  const a02 = a[2];
  const a03 = a[3];
  const a10 = a[ 4 + 0];
  const a11 = a[ 4 + 1];
  const a12 = a[ 4 + 2];
  const a13 = a[ 4 + 3];
  const a20 = a[ 8 + 0];
  const a21 = a[ 8 + 1];
  const a22 = a[ 8 + 2];
  const a23 = a[ 8 + 3];
  const a30 = a[12 + 0];
  const a31 = a[12 + 1];
  const a32 = a[12 + 2];
  const a33 = a[12 + 3];
  const b00 = b[0];
  const b01 = b[1];
  const b02 = b[2];
  const b03 = b[3];
  const b10 = b[ 4 + 0];
  const b11 = b[ 4 + 1];
  const b12 = b[ 4 + 2];
  const b13 = b[ 4 + 3];
  const b20 = b[ 8 + 0];
  const b21 = b[ 8 + 1];
  const b22 = b[ 8 + 2];
  const b23 = b[ 8 + 3];
  const b30 = b[12 + 0];
  const b31 = b[12 + 1];
  const b32 = b[12 + 2];
  const b33 = b[12 + 3];

  dst[ 0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
  dst[ 1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
  dst[ 2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
  dst[ 3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
  dst[ 4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
  dst[ 5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
  dst[ 6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
  dst[ 7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
  dst[ 8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
  dst[ 9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
  dst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
  dst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
  dst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
  dst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
  dst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
  dst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;

  return dst;
}

/**
 * Sets the translation component of a 4-by-4 matrix to the given
 * vector.
 * @param {module:twgl/m4.Mat4} a The matrix.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix with translation set.
 * @memberOf module:twgl/m4
 */
function setTranslation(a, v, dst) {
  dst = dst || identity();
  if (a !== dst) {
    dst[ 0] = a[ 0];
    dst[ 1] = a[ 1];
    dst[ 2] = a[ 2];
    dst[ 3] = a[ 3];
    dst[ 4] = a[ 4];
    dst[ 5] = a[ 5];
    dst[ 6] = a[ 6];
    dst[ 7] = a[ 7];
    dst[ 8] = a[ 8];
    dst[ 9] = a[ 9];
    dst[10] = a[10];
    dst[11] = a[11];
  }
  dst[12] = v[0];
  dst[13] = v[1];
  dst[14] = v[2];
  dst[15] = 1;
  return dst;
}

/**
 * Returns the translation component of a 4-by-4 matrix as a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The translation component of m.
 * @memberOf module:twgl/m4
 */
function getTranslation(m, dst) {
  dst = dst || create();
  dst[0] = m[12];
  dst[1] = m[13];
  dst[2] = m[14];
  return dst;
}

/**
 * Returns an axis of a 4x4 matrix as a vector with 3 entries
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} axis The axis 0 = x, 1 = y, 2 = z;
 * @return {module:twgl/v3.Vec3} [dst] vector.
 * @return {module:twgl/v3.Vec3} The axis component of m.
 * @memberOf module:twgl/m4
 */
function getAxis(m, axis, dst) {
  dst = dst || create();
  const off = axis * 4;
  dst[0] = m[off + 0];
  dst[1] = m[off + 1];
  dst[2] = m[off + 2];
  return dst;
}

/**
 * Sets an axis of a 4x4 matrix as a vector with 3 entries
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v the axis vector
 * @param {number} axis The axis  0 = x, 1 = y, 2 = z;
 * @param {module:twgl/m4.Mat4} [dst] The matrix to set. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix with axis set.
 * @memberOf module:twgl/m4
 */
function setAxis(a, v, axis, dst) {
  if (dst !== a) {
    dst = copy$1(a, dst);
  }
  const off = axis * 4;
  dst[off + 0] = v[0];
  dst[off + 1] = v[1];
  dst[off + 2] = v[2];
  return dst;
}

/**
 * Computes a 4-by-4 perspective transformation matrix given the angular height
 * of the frustum, the aspect ratio, and the near and far clipping planes.  The
 * arguments define a frustum extending in the negative z direction.  The given
 * angle is the vertical angle of the frustum, and the horizontal angle is
 * determined to produce the given aspect ratio.  The arguments near and far are
 * the distances to the near and far clipping planes.  Note that near and far
 * are not z coordinates, but rather they are distances along the negative
 * z-axis.  The matrix generated sends the viewing frustum to the unit box.
 * We assume a unit box extending from -1 to 1 in the x and y dimensions and
 * from 0 to 1 in the z dimension.
 * @param {number} fieldOfViewYInRadians The camera angle from top to bottom (in radians).
 * @param {number} aspect The aspect ratio width / height.
 * @param {number} zNear The depth (negative z coordinate)
 *     of the near clipping plane.
 * @param {number} zFar The depth (negative z coordinate)
 *     of the far clipping plane.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective matrix.
 * @memberOf module:twgl/m4
 */
function perspective(fieldOfViewYInRadians, aspect, zNear, zFar, dst) {
  dst = dst || new MatType(16);

  const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
  const rangeInv = 1.0 / (zNear - zFar);

  dst[0]  = f / aspect;
  dst[1]  = 0;
  dst[2]  = 0;
  dst[3]  = 0;

  dst[4]  = 0;
  dst[5]  = f;
  dst[6]  = 0;
  dst[7]  = 0;

  dst[8]  = 0;
  dst[9]  = 0;
  dst[10] = (zNear + zFar) * rangeInv;
  dst[11] = -1;

  dst[12] = 0;
  dst[13] = 0;
  dst[14] = zNear * zFar * rangeInv * 2;
  dst[15] = 0;

  return dst;
}

/**
 * Computes a 4-by-4 orthogonal transformation matrix given the left, right,
 * bottom, and top dimensions of the near clipping plane as well as the
 * near and far clipping plane distances.
 * @param {number} left Left side of the near clipping plane viewport.
 * @param {number} right Right side of the near clipping plane viewport.
 * @param {number} bottom Bottom of the near clipping plane viewport.
 * @param {number} top Top of the near clipping plane viewport.
 * @param {number} near The depth (negative z coordinate)
 *     of the near clipping plane.
 * @param {number} far The depth (negative z coordinate)
 *     of the far clipping plane.
 * @param {module:twgl/m4.Mat4} [dst] Output matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective matrix.
 * @memberOf module:twgl/m4
 */
function ortho(left, right, bottom, top, near, far, dst) {
  dst = dst || new MatType(16);

  dst[0]  = 2 / (right - left);
  dst[1]  = 0;
  dst[2]  = 0;
  dst[3]  = 0;

  dst[4]  = 0;
  dst[5]  = 2 / (top - bottom);
  dst[6]  = 0;
  dst[7]  = 0;

  dst[8]  = 0;
  dst[9]  = 0;
  dst[10] = 2 / (near - far);
  dst[11] = 0;

  dst[12] = (right + left) / (left - right);
  dst[13] = (top + bottom) / (bottom - top);
  dst[14] = (far + near) / (near - far);
  dst[15] = 1;

  return dst;
}

/**
 * Computes a 4-by-4 perspective transformation matrix given the left, right,
 * top, bottom, near and far clipping planes. The arguments define a frustum
 * extending in the negative z direction. The arguments near and far are the
 * distances to the near and far clipping planes. Note that near and far are not
 * z coordinates, but rather they are distances along the negative z-axis. The
 * matrix generated sends the viewing frustum to the unit box. We assume a unit
 * box extending from -1 to 1 in the x and y dimensions and from 0 to 1 in the z
 * dimension.
 * @param {number} left The x coordinate of the left plane of the box.
 * @param {number} right The x coordinate of the right plane of the box.
 * @param {number} bottom The y coordinate of the bottom plane of the box.
 * @param {number} top The y coordinate of the right plane of the box.
 * @param {number} near The negative z coordinate of the near plane of the box.
 * @param {number} far The negative z coordinate of the far plane of the box.
 * @param {module:twgl/m4.Mat4} [dst] Output matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective projection matrix.
 * @memberOf module:twgl/m4
 */
function frustum(left, right, bottom, top, near, far, dst) {
  dst = dst || new MatType(16);

  const dx = (right - left);
  const dy = (top - bottom);
  const dz = (near - far);

  dst[ 0] = 2 * near / dx;
  dst[ 1] = 0;
  dst[ 2] = 0;
  dst[ 3] = 0;
  dst[ 4] = 0;
  dst[ 5] = 2 * near / dy;
  dst[ 6] = 0;
  dst[ 7] = 0;
  dst[ 8] = (left + right) / dx;
  dst[ 9] = (top + bottom) / dy;
  dst[10] = far / dz;
  dst[11] = -1;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = near * far / dz;
  dst[15] = 0;

  return dst;
}

let xAxis;
let yAxis;
let zAxis;

/**
 * Computes a 4-by-4 look-at transformation.
 *
 * This is a matrix which positions the camera itself. If you want
 * a view matrix (a matrix which moves things in front of the camera)
 * take the inverse of this.
 *
 * @param {module:twgl/v3.Vec3} eye The position of the eye.
 * @param {module:twgl/v3.Vec3} target The position meant to be viewed.
 * @param {module:twgl/v3.Vec3} up A vector pointing up.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The look-at matrix.
 * @memberOf module:twgl/m4
 */
function lookAt(eye, target, up, dst) {
  dst = dst || new MatType(16);

  xAxis = xAxis || create();
  yAxis = yAxis || create();
  zAxis = zAxis || create();

  normalize(
      subtract(eye, target, zAxis), zAxis);
  normalize(cross(up, zAxis, xAxis), xAxis);
  normalize(cross(zAxis, xAxis, yAxis), yAxis);

  dst[ 0] = xAxis[0];
  dst[ 1] = xAxis[1];
  dst[ 2] = xAxis[2];
  dst[ 3] = 0;
  dst[ 4] = yAxis[0];
  dst[ 5] = yAxis[1];
  dst[ 6] = yAxis[2];
  dst[ 7] = 0;
  dst[ 8] = zAxis[0];
  dst[ 9] = zAxis[1];
  dst[10] = zAxis[2];
  dst[11] = 0;
  dst[12] = eye[0];
  dst[13] = eye[1];
  dst[14] = eye[2];
  dst[15] = 1;

  return dst;
}

/**
 * Creates a 4-by-4 matrix which translates by the given vector v.
 * @param {module:twgl/v3.Vec3} v The vector by
 *     which to translate.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The translation matrix.
 * @memberOf module:twgl/m4
 */
function translation(v, dst) {
  dst = dst || new MatType(16);

  dst[ 0] = 1;
  dst[ 1] = 0;
  dst[ 2] = 0;
  dst[ 3] = 0;
  dst[ 4] = 0;
  dst[ 5] = 1;
  dst[ 6] = 0;
  dst[ 7] = 0;
  dst[ 8] = 0;
  dst[ 9] = 0;
  dst[10] = 1;
  dst[11] = 0;
  dst[12] = v[0];
  dst[13] = v[1];
  dst[14] = v[2];
  dst[15] = 1;
  return dst;
}

/**
 * Translates the given 4-by-4 matrix by the given vector v.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The vector by
 *     which to translate.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The translated matrix.
 * @memberOf module:twgl/m4
 */
function translate(m, v, dst) {
  dst = dst || new MatType(16);

  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  const m00 = m[0];
  const m01 = m[1];
  const m02 = m[2];
  const m03 = m[3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const m30 = m[3 * 4 + 0];
  const m31 = m[3 * 4 + 1];
  const m32 = m[3 * 4 + 2];
  const m33 = m[3 * 4 + 3];

  if (m !== dst) {
    dst[ 0] = m00;
    dst[ 1] = m01;
    dst[ 2] = m02;
    dst[ 3] = m03;
    dst[ 4] = m10;
    dst[ 5] = m11;
    dst[ 6] = m12;
    dst[ 7] = m13;
    dst[ 8] = m20;
    dst[ 9] = m21;
    dst[10] = m22;
    dst[11] = m23;
  }

  dst[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
  dst[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
  dst[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
  dst[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;

  return dst;
}

/**
 * Creates a 4-by-4 matrix which rotates around the x-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */
function rotationX(angleInRadians, dst) {
  dst = dst || new MatType(16);

  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  dst[ 0] = 1;
  dst[ 1] = 0;
  dst[ 2] = 0;
  dst[ 3] = 0;
  dst[ 4] = 0;
  dst[ 5] = c;
  dst[ 6] = s;
  dst[ 7] = 0;
  dst[ 8] = 0;
  dst[ 9] = -s;
  dst[10] = c;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;

  return dst;
}

/**
 * Rotates the given 4-by-4 matrix around the x-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */
function rotateX(m, angleInRadians, dst) {
  dst = dst || new MatType(16);

  const m10 = m[4];
  const m11 = m[5];
  const m12 = m[6];
  const m13 = m[7];
  const m20 = m[8];
  const m21 = m[9];
  const m22 = m[10];
  const m23 = m[11];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  dst[4]  = c * m10 + s * m20;
  dst[5]  = c * m11 + s * m21;
  dst[6]  = c * m12 + s * m22;
  dst[7]  = c * m13 + s * m23;
  dst[8]  = c * m20 - s * m10;
  dst[9]  = c * m21 - s * m11;
  dst[10] = c * m22 - s * m12;
  dst[11] = c * m23 - s * m13;

  if (m !== dst) {
    dst[ 0] = m[ 0];
    dst[ 1] = m[ 1];
    dst[ 2] = m[ 2];
    dst[ 3] = m[ 3];
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }

  return dst;
}

/**
 * Creates a 4-by-4 matrix which rotates around the y-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */
function rotationY(angleInRadians, dst) {
  dst = dst || new MatType(16);

  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  dst[ 0] = c;
  dst[ 1] = 0;
  dst[ 2] = -s;
  dst[ 3] = 0;
  dst[ 4] = 0;
  dst[ 5] = 1;
  dst[ 6] = 0;
  dst[ 7] = 0;
  dst[ 8] = s;
  dst[ 9] = 0;
  dst[10] = c;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;

  return dst;
}

/**
 * Rotates the given 4-by-4 matrix around the y-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */
function rotateY(m, angleInRadians, dst) {
  dst = dst || new MatType(16);

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  dst[ 0] = c * m00 - s * m20;
  dst[ 1] = c * m01 - s * m21;
  dst[ 2] = c * m02 - s * m22;
  dst[ 3] = c * m03 - s * m23;
  dst[ 8] = c * m20 + s * m00;
  dst[ 9] = c * m21 + s * m01;
  dst[10] = c * m22 + s * m02;
  dst[11] = c * m23 + s * m03;

  if (m !== dst) {
    dst[ 4] = m[ 4];
    dst[ 5] = m[ 5];
    dst[ 6] = m[ 6];
    dst[ 7] = m[ 7];
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }

  return dst;
}

/**
 * Creates a 4-by-4 matrix which rotates around the z-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */
function rotationZ(angleInRadians, dst) {
  dst = dst || new MatType(16);

  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  dst[ 0] = c;
  dst[ 1] = s;
  dst[ 2] = 0;
  dst[ 3] = 0;
  dst[ 4] = -s;
  dst[ 5] = c;
  dst[ 6] = 0;
  dst[ 7] = 0;
  dst[ 8] = 0;
  dst[ 9] = 0;
  dst[10] = 1;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;

  return dst;
}

/**
 * Rotates the given 4-by-4 matrix around the z-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */
function rotateZ(m, angleInRadians, dst) {
  dst = dst || new MatType(16);

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  dst[ 0] = c * m00 + s * m10;
  dst[ 1] = c * m01 + s * m11;
  dst[ 2] = c * m02 + s * m12;
  dst[ 3] = c * m03 + s * m13;
  dst[ 4] = c * m10 - s * m00;
  dst[ 5] = c * m11 - s * m01;
  dst[ 6] = c * m12 - s * m02;
  dst[ 7] = c * m13 - s * m03;

  if (m !== dst) {
    dst[ 8] = m[ 8];
    dst[ 9] = m[ 9];
    dst[10] = m[10];
    dst[11] = m[11];
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }

  return dst;
}

/**
 * Creates a 4-by-4 matrix which rotates around the given axis by the given
 * angle.
 * @param {module:twgl/v3.Vec3} axis The axis
 *     about which to rotate.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} A matrix which rotates angle radians
 *     around the axis.
 * @memberOf module:twgl/m4
 */
function axisRotation(axis, angleInRadians, dst) {
  dst = dst || new MatType(16);

  let x = axis[0];
  let y = axis[1];
  let z = axis[2];
  const n = Math.sqrt(x * x + y * y + z * z);
  x /= n;
  y /= n;
  z /= n;
  const xx = x * x;
  const yy = y * y;
  const zz = z * z;
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  const oneMinusCosine = 1 - c;

  dst[ 0] = xx + (1 - xx) * c;
  dst[ 1] = x * y * oneMinusCosine + z * s;
  dst[ 2] = x * z * oneMinusCosine - y * s;
  dst[ 3] = 0;
  dst[ 4] = x * y * oneMinusCosine - z * s;
  dst[ 5] = yy + (1 - yy) * c;
  dst[ 6] = y * z * oneMinusCosine + x * s;
  dst[ 7] = 0;
  dst[ 8] = x * z * oneMinusCosine + y * s;
  dst[ 9] = y * z * oneMinusCosine - x * s;
  dst[10] = zz + (1 - zz) * c;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;

  return dst;
}

/**
 * Rotates the given 4-by-4 matrix around the given axis by the
 * given angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} axis The axis
 *     about which to rotate.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */
function axisRotate(m, axis, angleInRadians, dst) {
  dst = dst || new MatType(16);

  let x = axis[0];
  let y = axis[1];
  let z = axis[2];
  const n = Math.sqrt(x * x + y * y + z * z);
  x /= n;
  y /= n;
  z /= n;
  const xx = x * x;
  const yy = y * y;
  const zz = z * z;
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  const oneMinusCosine = 1 - c;

  const r00 = xx + (1 - xx) * c;
  const r01 = x * y * oneMinusCosine + z * s;
  const r02 = x * z * oneMinusCosine - y * s;
  const r10 = x * y * oneMinusCosine - z * s;
  const r11 = yy + (1 - yy) * c;
  const r12 = y * z * oneMinusCosine + x * s;
  const r20 = x * z * oneMinusCosine + y * s;
  const r21 = y * z * oneMinusCosine - x * s;
  const r22 = zz + (1 - zz) * c;

  const m00 = m[0];
  const m01 = m[1];
  const m02 = m[2];
  const m03 = m[3];
  const m10 = m[4];
  const m11 = m[5];
  const m12 = m[6];
  const m13 = m[7];
  const m20 = m[8];
  const m21 = m[9];
  const m22 = m[10];
  const m23 = m[11];

  dst[ 0] = r00 * m00 + r01 * m10 + r02 * m20;
  dst[ 1] = r00 * m01 + r01 * m11 + r02 * m21;
  dst[ 2] = r00 * m02 + r01 * m12 + r02 * m22;
  dst[ 3] = r00 * m03 + r01 * m13 + r02 * m23;
  dst[ 4] = r10 * m00 + r11 * m10 + r12 * m20;
  dst[ 5] = r10 * m01 + r11 * m11 + r12 * m21;
  dst[ 6] = r10 * m02 + r11 * m12 + r12 * m22;
  dst[ 7] = r10 * m03 + r11 * m13 + r12 * m23;
  dst[ 8] = r20 * m00 + r21 * m10 + r22 * m20;
  dst[ 9] = r20 * m01 + r21 * m11 + r22 * m21;
  dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
  dst[11] = r20 * m03 + r21 * m13 + r22 * m23;

  if (m !== dst) {
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }

  return dst;
}

/**
 * Creates a 4-by-4 matrix which scales in each dimension by an amount given by
 * the corresponding entry in the given vector; assumes the vector has three
 * entries.
 * @param {module:twgl/v3.Vec3} v A vector of
 *     three entries specifying the factor by which to scale in each dimension.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The scaling matrix.
 * @memberOf module:twgl/m4
 */
function scaling(v, dst) {
  dst = dst || new MatType(16);

  dst[ 0] = v[0];
  dst[ 1] = 0;
  dst[ 2] = 0;
  dst[ 3] = 0;
  dst[ 4] = 0;
  dst[ 5] = v[1];
  dst[ 6] = 0;
  dst[ 7] = 0;
  dst[ 8] = 0;
  dst[ 9] = 0;
  dst[10] = v[2];
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;

  return dst;
}

/**
 * Scales the given 4-by-4 matrix in each dimension by an amount
 * given by the corresponding entry in the given vector; assumes the vector has
 * three entries.
 * @param {module:twgl/m4.Mat4} m The matrix to be modified.
 * @param {module:twgl/v3.Vec3} v A vector of three entries specifying the
 *     factor by which to scale in each dimension.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The scaled matrix.
 * @memberOf module:twgl/m4
 */
function scale(m, v, dst) {
  dst = dst || new MatType(16);

  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];

  dst[ 0] = v0 * m[0 * 4 + 0];
  dst[ 1] = v0 * m[0 * 4 + 1];
  dst[ 2] = v0 * m[0 * 4 + 2];
  dst[ 3] = v0 * m[0 * 4 + 3];
  dst[ 4] = v1 * m[1 * 4 + 0];
  dst[ 5] = v1 * m[1 * 4 + 1];
  dst[ 6] = v1 * m[1 * 4 + 2];
  dst[ 7] = v1 * m[1 * 4 + 3];
  dst[ 8] = v2 * m[2 * 4 + 0];
  dst[ 9] = v2 * m[2 * 4 + 1];
  dst[10] = v2 * m[2 * 4 + 2];
  dst[11] = v2 * m[2 * 4 + 3];

  if (m !== dst) {
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }

  return dst;
}

/**
 * Takes a 4-by-4 matrix and a vector with 3 entries,
 * interprets the vector as a point, transforms that point by the matrix, and
 * returns the result as a vector with 3 entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The point.
 * @param {module:twgl/v3.Vec3} [dst] optional vec3 to store result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed point.
 * @memberOf module:twgl/m4
 */
function transformPoint(m, v, dst) {
  dst = dst || create();
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  const d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];

  dst[0] = (v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d;
  dst[1] = (v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d;
  dst[2] = (v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d;

  return dst;
}

/**
 * Takes a 4-by-4 matrix and a vector with 3 entries, interprets the vector as a
 * direction, transforms that direction by the matrix, and returns the result;
 * assumes the transformation of 3-dimensional space represented by the matrix
 * is parallel-preserving, i.e. any combination of rotation, scaling and
 * translation, but not a perspective distortion. Returns a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The direction.
 * @param {module:twgl/v3.Vec3} [dst] optional Vec3 to store result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed direction.
 * @memberOf module:twgl/m4
 */
function transformDirection(m, v, dst) {
  dst = dst || create();

  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];

  dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
  dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
  dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];

  return dst;
}

/**
 * Takes a 4-by-4 matrix m and a vector v with 3 entries, interprets the vector
 * as a normal to a surface, and computes a vector which is normal upon
 * transforming that surface by the matrix. The effect of this function is the
 * same as transforming v (as a direction) by the inverse-transpose of m.  This
 * function assumes the transformation of 3-dimensional space represented by the
 * matrix is parallel-preserving, i.e. any combination of rotation, scaling and
 * translation, but not a perspective distortion.  Returns a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The normal.
 * @param {module:twgl/v3.Vec3} [dst] The direction. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed normal.
 * @memberOf module:twgl/m4
 */
function transformNormal(m, v, dst) {
  dst = dst || create();
  const mi = inverse(m);
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];

  dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
  dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
  dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];

  return dst;
}

var m4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  axisRotate: axisRotate,
  axisRotation: axisRotation,
  copy: copy$1,
  frustum: frustum,
  getAxis: getAxis,
  getTranslation: getTranslation,
  identity: identity,
  inverse: inverse,
  lookAt: lookAt,
  multiply: multiply$1,
  negate: negate$1,
  ortho: ortho,
  perspective: perspective,
  rotateX: rotateX,
  rotateY: rotateY,
  rotateZ: rotateZ,
  rotationX: rotationX,
  rotationY: rotationY,
  rotationZ: rotationZ,
  scale: scale,
  scaling: scaling,
  setAxis: setAxis,
  setDefaultType: setDefaultType$1,
  setTranslation: setTranslation,
  transformDirection: transformDirection,
  transformNormal: transformNormal,
  transformPoint: transformPoint,
  translate: translate,
  translation: translation,
  transpose: transpose
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/* DataType */
const BYTE                           = 0x1400;
const UNSIGNED_BYTE                  = 0x1401;
const SHORT                          = 0x1402;
const UNSIGNED_SHORT                 = 0x1403;
const INT                            = 0x1404;
const UNSIGNED_INT                   = 0x1405;
const FLOAT                          = 0x1406;
const UNSIGNED_SHORT_4_4_4_4       = 0x8033;
const UNSIGNED_SHORT_5_5_5_1       = 0x8034;
const UNSIGNED_SHORT_5_6_5         = 0x8363;
const HALF_FLOAT                   = 0x140B;
const UNSIGNED_INT_2_10_10_10_REV  = 0x8368;
const UNSIGNED_INT_10F_11F_11F_REV = 0x8C3B;
const UNSIGNED_INT_5_9_9_9_REV     = 0x8C3E;
const FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8DAD;
const UNSIGNED_INT_24_8            = 0x84FA;

const glTypeToTypedArray = {};
{
  const tt = glTypeToTypedArray;
  tt[BYTE]                           = Int8Array;
  tt[UNSIGNED_BYTE]                  = Uint8Array;
  tt[SHORT]                          = Int16Array;
  tt[UNSIGNED_SHORT]                 = Uint16Array;
  tt[INT]                            = Int32Array;
  tt[UNSIGNED_INT]                   = Uint32Array;
  tt[FLOAT]                          = Float32Array;
  tt[UNSIGNED_SHORT_4_4_4_4]         = Uint16Array;
  tt[UNSIGNED_SHORT_5_5_5_1]         = Uint16Array;
  tt[UNSIGNED_SHORT_5_6_5]           = Uint16Array;
  tt[HALF_FLOAT]                     = Uint16Array;
  tt[UNSIGNED_INT_2_10_10_10_REV]    = Uint32Array;
  tt[UNSIGNED_INT_10F_11F_11F_REV]   = Uint32Array;
  tt[UNSIGNED_INT_5_9_9_9_REV]       = Uint32Array;
  tt[FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
  tt[UNSIGNED_INT_24_8]              = Uint32Array;
}

/**
 * Get the GL type for a typedArray
 * @param {ArrayBufferView} typedArray a typedArray
 * @return {number} the GL type for array. For example pass in an `Int8Array` and `gl.BYTE` will
 *   be returned. Pass in a `Uint32Array` and `gl.UNSIGNED_INT` will be returned
 * @memberOf module:twgl/typedArray
 */
function getGLTypeForTypedArray(typedArray) {
  if (typedArray instanceof Int8Array)         { return BYTE; }           // eslint-disable-line
  if (typedArray instanceof Uint8Array)        { return UNSIGNED_BYTE; }  // eslint-disable-line
  if (typedArray instanceof Uint8ClampedArray) { return UNSIGNED_BYTE; }  // eslint-disable-line
  if (typedArray instanceof Int16Array)        { return SHORT; }          // eslint-disable-line
  if (typedArray instanceof Uint16Array)       { return UNSIGNED_SHORT; } // eslint-disable-line
  if (typedArray instanceof Int32Array)        { return INT; }            // eslint-disable-line
  if (typedArray instanceof Uint32Array)       { return UNSIGNED_INT; }   // eslint-disable-line
  if (typedArray instanceof Float32Array)      { return FLOAT; }          // eslint-disable-line
  throw new Error('unsupported typed array type');
}

/**
 * Get the GL type for a typedArray type
 * @param {ArrayBufferView} typedArrayType a typedArray constructor
 * @return {number} the GL type for type. For example pass in `Int8Array` and `gl.BYTE` will
 *   be returned. Pass in `Uint32Array` and `gl.UNSIGNED_INT` will be returned
 * @memberOf module:twgl/typedArray
 */
function getGLTypeForTypedArrayType(typedArrayType) {
  if (typedArrayType === Int8Array)         { return BYTE; }           // eslint-disable-line
  if (typedArrayType === Uint8Array)        { return UNSIGNED_BYTE; }  // eslint-disable-line
  if (typedArrayType === Uint8ClampedArray) { return UNSIGNED_BYTE; }  // eslint-disable-line
  if (typedArrayType === Int16Array)        { return SHORT; }          // eslint-disable-line
  if (typedArrayType === Uint16Array)       { return UNSIGNED_SHORT; } // eslint-disable-line
  if (typedArrayType === Int32Array)        { return INT; }            // eslint-disable-line
  if (typedArrayType === Uint32Array)       { return UNSIGNED_INT; }   // eslint-disable-line
  if (typedArrayType === Float32Array)      { return FLOAT; }          // eslint-disable-line
  throw new Error('unsupported typed array type');
}

/**
 * Get the typed array constructor for a given GL type
 * @param {number} type the GL type. (eg: `gl.UNSIGNED_INT`)
 * @return {function} the constructor for a the corresponding typed array. (eg. `Uint32Array`).
 * @memberOf module:twgl/typedArray
 */
function getTypedArrayTypeForGLType(type) {
  const CTOR = glTypeToTypedArray[type];
  if (!CTOR) {
    throw new Error('unknown gl type');
  }
  return CTOR;
}

const isArrayBuffer = typeof SharedArrayBuffer !== 'undefined'
  ? function isArrayBufferOrSharedArrayBuffer(a) {
    return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
  }
  : function isArrayBuffer(a) {
    return a && a.buffer && a.buffer instanceof ArrayBuffer;
  };

var typedarrays = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getGLTypeForTypedArray: getGLTypeForTypedArray,
  getGLTypeForTypedArrayType: getGLTypeForTypedArrayType,
  getTypedArrayTypeForGLType: getTypedArrayTypeForGLType,
  isArrayBuffer: isArrayBuffer
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/* eslint no-console: "off" */

/**
 * Copy named properties
 *
 * @param {string[]} names names of properties to copy
 * @param {object} src object to copy properties from
 * @param {object} dst object to copy properties to
 * @private
 */
function copyNamedProperties(names, src, dst) {
  names.forEach(function(name) {
    const value = src[name];
    if (value !== undefined) {
      dst[name] = value;
    }
  });
}

/**
 * Copies properties from source to dest only if a matching key is in dest
 *
 * @param {Object.<string, ?>} src the source
 * @param {Object.<string, ?>} dst the dest
 * @private
 */
function copyExistingProperties(src, dst) {
  Object.keys(dst).forEach(function(key) {
    if (dst.hasOwnProperty(key) && src.hasOwnProperty(key)) {  /* eslint no-prototype-builtins: 0 */
      dst[key] = src[key];
    }
  });
}

function error(...args) {
  console.error(...args);
}

function warn(...args) {
  console.warn(...args);
}

function isBuffer$1(gl, t) {
  return typeof WebGLBuffer !== 'undefined' && t instanceof WebGLBuffer;
}

function isRenderbuffer(gl, t) {
  return typeof WebGLRenderbuffer !== 'undefined' && t instanceof WebGLRenderbuffer;
}

function isShader(gl, t) {
  return typeof WebGLShader !== 'undefined' && t instanceof WebGLShader;
}

function isTexture(gl, t) {
  return typeof WebGLTexture !== 'undefined' && t instanceof WebGLTexture;
}

function isSampler(gl, t) {
  return typeof WebGLSampler !== 'undefined' && t instanceof WebGLSampler;
}

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

const STATIC_DRAW                  = 0x88e4;
const ARRAY_BUFFER                 = 0x8892;
const ELEMENT_ARRAY_BUFFER         = 0x8893;
const BUFFER_SIZE                  = 0x8764;

const BYTE$1                         = 0x1400;
const UNSIGNED_BYTE$1                = 0x1401;
const SHORT$1                        = 0x1402;
const UNSIGNED_SHORT$1               = 0x1403;
const INT$1                          = 0x1404;
const UNSIGNED_INT$1                 = 0x1405;
const FLOAT$1                        = 0x1406;
const defaults = {
  attribPrefix: "",
};

/**
 * Sets the default attrib prefix
 *
 * When writing shaders I prefer to name attributes with `a_`, uniforms with `u_` and varyings with `v_`
 * as it makes it clear where they came from. But, when building geometry I prefer using un-prefixed names.
 *
 * In other words I'll create arrays of geometry like this
 *
 *     var arrays = {
 *       position: ...
 *       normal: ...
 *       texcoord: ...
 *     };
 *
 * But need those mapped to attributes and my attributes start with `a_`.
 *
 * @deprecated see {@link module:twgl.setDefaults}
 * @param {string} prefix prefix for attribs
 * @memberOf module:twgl/attributes
 */
function setAttributePrefix(prefix) {
  defaults.attribPrefix = prefix;
}

function setDefaults(newDefaults) {
  copyExistingProperties(newDefaults, defaults);
}

function setBufferFromTypedArray(gl, type, buffer, array, drawType) {
  gl.bindBuffer(type, buffer);
  gl.bufferData(type, array, drawType || STATIC_DRAW);
}

/**
 * Given typed array creates a WebGLBuffer and copies the typed array
 * into it.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {ArrayBuffer|SharedArrayBuffer|ArrayBufferView|WebGLBuffer} typedArray the typed array. Note: If a WebGLBuffer is passed in it will just be returned. No action will be taken
 * @param {number} [type] the GL bind type for the buffer. Default = `gl.ARRAY_BUFFER`.
 * @param {number} [drawType] the GL draw type for the buffer. Default = 'gl.STATIC_DRAW`.
 * @return {WebGLBuffer} the created WebGLBuffer
 * @memberOf module:twgl/attributes
 */
function createBufferFromTypedArray(gl, typedArray, type, drawType) {
  if (isBuffer$1(gl, typedArray)) {
    return typedArray;
  }
  type = type || ARRAY_BUFFER;
  const buffer = gl.createBuffer();
  setBufferFromTypedArray(gl, type, buffer, typedArray, drawType);
  return buffer;
}

function isIndices(name) {
  return name === "indices";
}

// This is really just a guess. Though I can't really imagine using
// anything else? Maybe for some compression?
function getNormalizationForTypedArray(typedArray) {
  if (typedArray instanceof Int8Array)    { return true; }  // eslint-disable-line
  if (typedArray instanceof Uint8Array)   { return true; }  // eslint-disable-line
  return false;
}

// This is really just a guess. Though I can't really imagine using
// anything else? Maybe for some compression?
function getNormalizationForTypedArrayType(typedArrayType) {
  if (typedArrayType === Int8Array)    { return true; }  // eslint-disable-line
  if (typedArrayType === Uint8Array)   { return true; }  // eslint-disable-line
  return false;
}

function getArray(array) {
  return array.length ? array : array.data;
}

const texcoordRE = /coord|texture/i;
const colorRE = /color|colour/i;

function guessNumComponentsFromName(name, length) {
  let numComponents;
  if (texcoordRE.test(name)) {
    numComponents = 2;
  } else if (colorRE.test(name)) {
    numComponents = 4;
  } else {
    numComponents = 3;  // position, normals, indices ...
  }

  if (length % numComponents > 0) {
    throw new Error(`Can not guess numComponents for attribute '${name}'. Tried ${numComponents} but ${length} values is not evenly divisible by ${numComponents}. You should specify it.`);
  }

  return numComponents;
}

function getNumComponents(array, arrayName) {
  return array.numComponents || array.size || guessNumComponentsFromName(arrayName, getArray(array).length);
}

function makeTypedArray(array, name) {
  if (isArrayBuffer(array)) {
    return array;
  }

  if (isArrayBuffer(array.data)) {
    return array.data;
  }

  if (Array.isArray(array)) {
    array = {
      data: array,
    };
  }

  let Type = array.type;
  if (!Type) {
    if (isIndices(name)) {
      Type = Uint16Array;
    } else {
      Type = Float32Array;
    }
  }
  return new Type(array.data);
}

/**
 * The info for an attribute. This is effectively just the arguments to `gl.vertexAttribPointer` plus the WebGLBuffer
 * for the attribute.
 *
 * @typedef {Object} AttribInfo
 * @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
 *    disabled and set to this constant value and all other values will be ignored.
 * @property {number} [numComponents] the number of components for this attribute.
 * @property {number} [size] synonym for `numComponents`.
 * @property {number} [type] the type of the attribute (eg. `gl.FLOAT`, `gl.UNSIGNED_BYTE`, etc...) Default = `gl.FLOAT`
 * @property {boolean} [normalize] whether or not to normalize the data. Default = false
 * @property {number} [offset] offset into buffer in bytes. Default = 0
 * @property {number} [stride] the stride in bytes per element. Default = 0
 * @property {number} [divisor] the divisor in instances. Default = undefined. Note: undefined = don't call gl.vertexAttribDivisor
 *    where as anything else = do call it with this value
 * @property {WebGLBuffer} buffer the buffer that contains the data for this attribute
 * @property {number} [drawType] the draw type passed to gl.bufferData. Default = gl.STATIC_DRAW
 * @memberOf module:twgl
 */

/**
 * Use this type of array spec when TWGL can't guess the type or number of components of an array
 * @typedef {Object} FullArraySpec
 * @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
 *    disabled and set to this constant value and all other values will be ignored.
 * @property {(number|number[]|ArrayBufferView)} data The data of the array. A number alone becomes the number of elements of type.
 * @property {number} [numComponents] number of components for `vertexAttribPointer`. Default is based on the name of the array.
 *    If `coord` is in the name assumes `numComponents = 2`.
 *    If `color` is in the name assumes `numComponents = 4`.
 *    otherwise assumes `numComponents = 3`
 * @property {constructor} [type] type. This is only used if `data` is a JavaScript array. It is the constructor for the typedarray. (eg. `Uint8Array`).
 * For example if you want colors in a `Uint8Array` you might have a `FullArraySpec` like `{ type: Uint8Array, data: [255,0,255,255, ...], }`.
 * @property {number} [size] synonym for `numComponents`.
 * @property {boolean} [normalize] normalize for `vertexAttribPointer`. Default is true if type is `Int8Array` or `Uint8Array` otherwise false.
 * @property {number} [stride] stride for `vertexAttribPointer`. Default = 0
 * @property {number} [offset] offset for `vertexAttribPointer`. Default = 0
 * @property {number} [divisor] divisor for `vertexAttribDivisor`. Default = undefined. Note: undefined = don't call gl.vertexAttribDivisor
 *    where as anything else = do call it with this value
 * @property {string} [attrib] name of attribute this array maps to. Defaults to same name as array prefixed by the default attribPrefix.
 * @property {string} [name] synonym for `attrib`.
 * @property {string} [attribName] synonym for `attrib`.
 * @property {WebGLBuffer} [buffer] Buffer to use for this attribute. This lets you use your own buffer
 *    but you will need to supply `numComponents` and `type`. You can effectively pass an `AttribInfo`
 *    to provide this. Example:
 *
 *         const bufferInfo1 = twgl.createBufferInfoFromArrays(gl, {
 *           position: [1, 2, 3, ... ],
 *         });
 *         const bufferInfo2 = twgl.createBufferInfoFromArrays(gl, {
 *           position: bufferInfo1.attribs.position,  // use the same buffer from bufferInfo1
 *         });
 *
 * @memberOf module:twgl
 */

/**
 * An individual array in {@link module:twgl.Arrays}
 *
 * When passed to {@link module:twgl.createBufferInfoFromArrays} if an ArraySpec is `number[]` or `ArrayBufferView`
 * the types will be guessed based on the name. `indices` will be `Uint16Array`, everything else will
 * be `Float32Array`. If an ArraySpec is a number it's the number of floats for an empty (zeroed) buffer.
 *
 * @typedef {(number|number[]|ArrayBufferView|module:twgl.FullArraySpec)} ArraySpec
 * @memberOf module:twgl
 */

/**
 * This is a JavaScript object of arrays by name. The names should match your shader's attributes. If your
 * attributes have a common prefix you can specify it by calling {@link module:twgl.setAttributePrefix}.
 *
 *     Bare JavaScript Arrays
 *
 *         var arrays = {
 *            position: [-1, 1, 0],
 *            normal: [0, 1, 0],
 *            ...
 *         }
 *
 *     Bare TypedArrays
 *
 *         var arrays = {
 *            position: new Float32Array([-1, 1, 0]),
 *            color: new Uint8Array([255, 128, 64, 255]),
 *            ...
 *         }
 *
 * *   Will guess at `numComponents` if not specified based on name.
 *
 *     If `coord` is in the name assumes `numComponents = 2`
 *
 *     If `color` is in the name assumes `numComponents = 4`
 *
 *     otherwise assumes `numComponents = 3`
 *
 * Objects with various fields. See {@link module:twgl.FullArraySpec}.
 *
 *     var arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *     };
 *
 * @typedef {Object.<string, module:twgl.ArraySpec>} Arrays
 * @memberOf module:twgl
 */


/**
 * Creates a set of attribute data and WebGLBuffers from set of arrays
 *
 * Given
 *
 *      var arrays = {
 *        position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *        texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *        normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *        color:    { numComponents: 4, data: [255, 255, 255, 255, 255, 0, 0, 255, 0, 0, 255, 255], type: Uint8Array, },
 *        indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *      };
 *
 * returns something like
 *
 *      var attribs = {
 *        position: { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        texcoord: { numComponents: 2, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        normal:   { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        color:    { numComponents: 4, type: gl.UNSIGNED_BYTE, normalize: true,  buffer: WebGLBuffer, },
 *      };
 *
 * notes:
 *
 * *   Arrays can take various forms
 *
 *     Bare JavaScript Arrays
 *
 *         var arrays = {
 *            position: [-1, 1, 0],
 *            normal: [0, 1, 0],
 *            ...
 *         }
 *
 *     Bare TypedArrays
 *
 *         var arrays = {
 *            position: new Float32Array([-1, 1, 0]),
 *            color: new Uint8Array([255, 128, 64, 255]),
 *            ...
 *         }
 *
 * *   Will guess at `numComponents` if not specified based on name.
 *
 *     If `coord` is in the name assumes `numComponents = 2`
 *
 *     If `color` is in the name assumes `numComponents = 4`
 *
 *     otherwise assumes `numComponents = 3`
 *
 * @param {WebGLRenderingContext} gl The webgl rendering context.
 * @param {module:twgl.Arrays} arrays The arrays
 * @param {module:twgl.BufferInfo} [srcBufferInfo] a BufferInfo to copy from
 *   This lets you share buffers. Any arrays you supply will override
 *   the buffers from srcBufferInfo.
 * @return {Object.<string, module:twgl.AttribInfo>} the attribs
 * @memberOf module:twgl/attributes
 */
function createAttribsFromArrays(gl, arrays) {
  const attribs = {};
  Object.keys(arrays).forEach(function(arrayName) {
    if (!isIndices(arrayName)) {
      const array = arrays[arrayName];
      const attribName = array.attrib || array.name || array.attribName || (defaults.attribPrefix + arrayName);
      if (array.value) {
        if (!Array.isArray(array.value) && !isArrayBuffer(array.value)) {
          throw new Error('array.value is not array or typedarray');
        }
        attribs[attribName] = {
          value: array.value,
        };
      } else {
        let buffer;
        let type;
        let normalization;
        let numComponents;
        if (array.buffer && array.buffer instanceof WebGLBuffer) {
          buffer = array.buffer;
          numComponents = array.numComponents || array.size;
          type = array.type;
          normalization = array.normalize;
        } else if (typeof array === "number" || typeof array.data === "number") {
          const numValues = array.data || array;
          const arrayType = array.type || Float32Array;
          const numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
          type = getGLTypeForTypedArrayType(arrayType);
          normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArrayType(arrayType);
          numComponents = array.numComponents || array.size || guessNumComponentsFromName(arrayName, numValues);
          buffer = gl.createBuffer();
          gl.bindBuffer(ARRAY_BUFFER, buffer);
          gl.bufferData(ARRAY_BUFFER, numBytes, array.drawType || STATIC_DRAW);
        } else {
          const typedArray = makeTypedArray(array, arrayName);
          buffer = createBufferFromTypedArray(gl, typedArray, undefined, array.drawType);
          type = getGLTypeForTypedArray(typedArray);
          normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArray(typedArray);
          numComponents = getNumComponents(array, arrayName);
        }
        attribs[attribName] = {
          buffer:        buffer,
          numComponents: numComponents,
          type:          type,
          normalize:     normalization,
          stride:        array.stride || 0,
          offset:        array.offset || 0,
          divisor:       array.divisor === undefined ? undefined : array.divisor,
          drawType:      array.drawType,
        };
      }
    }
  });
  gl.bindBuffer(ARRAY_BUFFER, null);
  return attribs;
}

/**
 * Sets the contents of a buffer attached to an attribInfo
 *
 * This is helper function to dynamically update a buffer.
 *
 * Let's say you make a bufferInfo
 *
 *     var arrays = {
 *        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
 *        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
 *        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
 *        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
 *     };
 *     var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
 *
 *  And you want to dynamically update the positions. You could do this
 *
 *     // assuming arrays.position has already been updated with new data.
 *     twgl.setAttribInfoBufferFromArray(gl, bufferInfo.attribs.position, arrays.position);
 *
 * @param {WebGLRenderingContext} gl
 * @param {AttribInfo} attribInfo The attribInfo who's buffer contents to set. NOTE: If you have an attribute prefix
 *   the name of the attribute will include the prefix.
 * @param {ArraySpec} array Note: it is arguably inefficient to pass in anything but a typed array because anything
 *    else will have to be converted to a typed array before it can be used by WebGL. During init time that
 *    inefficiency is usually not important but if you're updating data dynamically best to be efficient.
 * @param {number} [offset] an optional offset into the buffer. This is only an offset into the WebGL buffer
 *    not the array. To pass in an offset into the array itself use a typed array and create an `ArrayBufferView`
 *    for the portion of the array you want to use.
 *
 *        var someArray = new Float32Array(1000); // an array with 1000 floats
 *        var someSubArray = new Float32Array(someArray.buffer, offsetInBytes, sizeInUnits); // a view into someArray
 *
 *    Now you can pass `someSubArray` into setAttribInfoBufferFromArray`
 * @memberOf module:twgl/attributes
 */
function setAttribInfoBufferFromArray(gl, attribInfo, array, offset) {
  array = makeTypedArray(array);
  if (offset !== undefined) {
    gl.bindBuffer(ARRAY_BUFFER, attribInfo.buffer);
    gl.bufferSubData(ARRAY_BUFFER, offset, array);
  } else {
    setBufferFromTypedArray(gl, ARRAY_BUFFER, attribInfo.buffer, array, attribInfo.drawType);
  }
}

function getBytesPerValueForGLType(gl, type) {
  if (type === BYTE$1)           return 1;  // eslint-disable-line
  if (type === UNSIGNED_BYTE$1)  return 1;  // eslint-disable-line
  if (type === SHORT$1)          return 2;  // eslint-disable-line
  if (type === UNSIGNED_SHORT$1) return 2;  // eslint-disable-line
  if (type === INT$1)            return 4;  // eslint-disable-line
  if (type === UNSIGNED_INT$1)   return 4;  // eslint-disable-line
  if (type === FLOAT$1)          return 4;  // eslint-disable-line
  return 0;
}

// Tries to get the number of elements from a set of arrays.
const positionKeys = ['position', 'positions', 'a_position'];
function getNumElementsFromNonIndexedArrays(arrays) {
  let key;
  let ii;
  for (ii = 0; ii < positionKeys.length; ++ii) {
    key = positionKeys[ii];
    if (key in arrays) {
      break;
    }
  }
  if (ii === positionKeys.length) {
    key = Object.keys(arrays)[0];
  }
  const array = arrays[key];
  const length = getArray(array).length;
  const numComponents = getNumComponents(array, key);
  const numElements = length / numComponents;
  if (length % numComponents > 0) {
    throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
  }
  return numElements;
}

function getNumElementsFromAttributes(gl, attribs) {
  let key;
  let ii;
  for (ii = 0; ii < positionKeys.length; ++ii) {
    key = positionKeys[ii];
    if (key in attribs) {
      break;
    }
    key = defaults.attribPrefix + key;
    if (key in attribs) {
      break;
    }
  }
  if (ii === positionKeys.length) {
    key = Object.keys(attribs)[0];
  }
  const attrib = attribs[key];
  gl.bindBuffer(ARRAY_BUFFER, attrib.buffer);
  const numBytes = gl.getBufferParameter(ARRAY_BUFFER, BUFFER_SIZE);
  gl.bindBuffer(ARRAY_BUFFER, null);

  const bytesPerValue = getBytesPerValueForGLType(gl, attrib.type);
  const totalElements = numBytes / bytesPerValue;
  const numComponents = attrib.numComponents || attrib.size;
  // TODO: check stride
  const numElements = totalElements / numComponents;
  if (numElements % 1 !== 0) {
    throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
  }
  return numElements;
}

/**
 * @typedef {Object} BufferInfo
 * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
 * @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
 * @property {WebGLBuffer} [indices] The indices `ELEMENT_ARRAY_BUFFER` if any indices exist.
 * @property {Object.<string, module:twgl.AttribInfo>} [attribs] The attribs appropriate to call `setAttributes`
 * @memberOf module:twgl
 */

/**
 * Creates a BufferInfo from an object of arrays.
 *
 * This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
 * {@link module:twgl:drawBufferInfo}.
 *
 * Given an object like
 *
 *     var arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *     };
 *
 *  Creates an BufferInfo like this
 *
 *     bufferInfo = {
 *       numElements: 4,        // or whatever the number of elements is
 *       indices: WebGLBuffer,  // this property will not exist if there are no indices
 *       attribs: {
 *         position: { buffer: WebGLBuffer, numComponents: 3, },
 *         normal:   { buffer: WebGLBuffer, numComponents: 3, },
 *         texcoord: { buffer: WebGLBuffer, numComponents: 2, },
 *       },
 *     };
 *
 *  The properties of arrays can be JavaScript arrays in which case the number of components
 *  will be guessed.
 *
 *     var arrays = {
 *        position: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0],
 *        texcoord: [0, 0, 0, 1, 1, 0, 1, 1],
 *        normal:   [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
 *        indices:  [0, 1, 2, 1, 2, 3],
 *     };
 *
 *  They can also be TypedArrays
 *
 *     var arrays = {
 *        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
 *        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
 *        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
 *        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
 *     };
 *
 *  Or AugmentedTypedArrays
 *
 *     var positions = createAugmentedTypedArray(3, 4);
 *     var texcoords = createAugmentedTypedArray(2, 4);
 *     var normals   = createAugmentedTypedArray(3, 4);
 *     var indices   = createAugmentedTypedArray(3, 2, Uint16Array);
 *
 *     positions.push([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]);
 *     texcoords.push([0, 0, 0, 1, 1, 0, 1, 1]);
 *     normals.push([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
 *     indices.push([0, 1, 2, 1, 2, 3]);
 *
 *     var arrays = {
 *        position: positions,
 *        texcoord: texcoords,
 *        normal:   normals,
 *        indices:  indices,
 *     };
 *
 * For the last example it is equivalent to
 *
 *     var bufferInfo = {
 *       attribs: {
 *         position: { numComponents: 3, buffer: gl.createBuffer(), },
 *         texcoord: { numComponents: 2, buffer: gl.createBuffer(), },
 *         normal: { numComponents: 3, buffer: gl.createBuffer(), },
 *       },
 *       indices: gl.createBuffer(),
 *       numElements: 6,
 *     };
 *
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.position.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.position, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.texcoord.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.texcoord, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.normal.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.normal, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInfo.indices);
 *     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, arrays.indices, gl.STATIC_DRAW);
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.Arrays} arrays Your data
 * @param {module:twgl.BufferInfo} [srcBufferInfo] An existing
 *        buffer info to start from. WebGLBuffers etc specified
 *        in the srcBufferInfo will be used in a new BufferInfo
 *        with any arrays specified overriding the ones in
 *        srcBufferInfo.
 * @return {module:twgl.BufferInfo} A BufferInfo
 * @memberOf module:twgl/attributes
 */
function createBufferInfoFromArrays(gl, arrays, srcBufferInfo) {
  const newAttribs = createAttribsFromArrays(gl, arrays);
  const bufferInfo = Object.assign({}, srcBufferInfo ? srcBufferInfo : {});
  bufferInfo.attribs = Object.assign({}, srcBufferInfo ? srcBufferInfo.attribs : {}, newAttribs);
  const indices = arrays.indices;
  if (indices) {
    const newIndices = makeTypedArray(indices, "indices");
    bufferInfo.indices = createBufferFromTypedArray(gl, newIndices, ELEMENT_ARRAY_BUFFER);
    bufferInfo.numElements = newIndices.length;
    bufferInfo.elementType = getGLTypeForTypedArray(newIndices);
  } else if (!bufferInfo.numElements) {
    bufferInfo.numElements = getNumElementsFromAttributes(gl, bufferInfo.attribs);
  }

  return bufferInfo;
}

/**
 * Creates a buffer from an array, typed array, or array spec
 *
 * Given something like this
 *
 *     [1, 2, 3],
 *
 * or
 *
 *     new Uint16Array([1,2,3]);
 *
 * or
 *
 *     {
 *        data: [1, 2, 3],
 *        type: Uint8Array,
 *     }
 *
 * returns a WebGLBuffer that contains the given data.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {module:twgl.ArraySpec} array an array, typed array, or array spec.
 * @param {string} arrayName name of array. Used to guess the type if type can not be derived otherwise.
 * @return {WebGLBuffer} a WebGLBuffer containing the data in array.
 * @memberOf module:twgl/attributes
 */
function createBufferFromArray(gl, array, arrayName) {
  const type = arrayName === "indices" ? ELEMENT_ARRAY_BUFFER : ARRAY_BUFFER;
  const typedArray = makeTypedArray(array, arrayName);
  return createBufferFromTypedArray(gl, typedArray, type);
}

/**
 * Creates buffers from arrays or typed arrays
 *
 * Given something like this
 *
 *     var arrays = {
 *        positions: [1, 2, 3],
 *        normals: [0, 0, 1],
 *     }
 *
 * returns something like
 *
 *     buffers = {
 *       positions: WebGLBuffer,
 *       normals: WebGLBuffer,
 *     }
 *
 * If the buffer is named 'indices' it will be made an ELEMENT_ARRAY_BUFFER.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {module:twgl.Arrays} arrays
 * @return {Object<string, WebGLBuffer>} returns an object with one WebGLBuffer per array
 * @memberOf module:twgl/attributes
 */
function createBuffersFromArrays(gl, arrays) {
  const buffers = { };
  Object.keys(arrays).forEach(function(key) {
    buffers[key] = createBufferFromArray(gl, arrays[key], key);
  });

  // Ugh!
  if (arrays.indices) {
    buffers.numElements = arrays.indices.length;
    buffers.elementType = getGLTypeForTypedArray(makeTypedArray(arrays.indices));
  } else {
    buffers.numElements = getNumElementsFromNonIndexedArrays(arrays);
  }

  return buffers;
}

var attributes = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createAttribsFromArrays: createAttribsFromArrays,
  createBuffersFromArrays: createBuffersFromArrays,
  createBufferFromArray: createBufferFromArray,
  createBufferFromTypedArray: createBufferFromTypedArray,
  createBufferInfoFromArrays: createBufferInfoFromArrays,
  setAttribInfoBufferFromArray: setAttribInfoBufferFromArray,
  setAttributePrefix: setAttributePrefix,
  setAttributeDefaults_: setDefaults,
  getNumComponents_: getNumComponents,
  getArray_: getArray
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

const getArray$1 = getArray;  // eslint-disable-line
const getNumComponents$1 = getNumComponents;  // eslint-disable-line

/**
 * @typedef {(Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array)} TypedArray
 */

/**
 * Add `push` to a typed array. It just keeps a 'cursor'
 * and allows use to `push` values into the array so we
 * don't have to manually compute offsets
 * @param {TypedArray} typedArray TypedArray to augment
 * @param {number} numComponents number of components.
 * @private
 */
function augmentTypedArray(typedArray, numComponents) {
  let cursor = 0;
  typedArray.push = function() {
    for (let ii = 0; ii < arguments.length; ++ii) {
      const value = arguments[ii];
      if (value instanceof Array || isArrayBuffer(value)) {
        for (let jj = 0; jj < value.length; ++jj) {
          typedArray[cursor++] = value[jj];
        }
      } else {
        typedArray[cursor++] = value;
      }
    }
  };
  typedArray.reset = function(opt_index) {
    cursor = opt_index || 0;
  };
  typedArray.numComponents = numComponents;
  Object.defineProperty(typedArray, 'numElements', {
    get: function() {
      return this.length / this.numComponents | 0;
    },
  });
  return typedArray;
}

/**
 * creates a typed array with a `push` function attached
 * so that you can easily *push* values.
 *
 * `push` can take multiple arguments. If an argument is an array each element
 * of the array will be added to the typed array.
 *
 * Example:
 *
 *     const array = createAugmentedTypedArray(3, 2);  // creates a Float32Array with 6 values
 *     array.push(1, 2, 3);
 *     array.push([4, 5, 6]);
 *     // array now contains [1, 2, 3, 4, 5, 6]
 *
 * Also has `numComponents` and `numElements` properties.
 *
 * @param {number} numComponents number of components
 * @param {number} numElements number of elements. The total size of the array will be `numComponents * numElements`.
 * @param {constructor} opt_type A constructor for the type. Default = `Float32Array`.
 * @return {ArrayBufferView} A typed array.
 * @memberOf module:twgl/primitives
 */
function createAugmentedTypedArray(numComponents, numElements, opt_type) {
  const Type = opt_type || Float32Array;
  return augmentTypedArray(new Type(numComponents * numElements), numComponents);
}

function allButIndices(name) {
  return name !== "indices";
}

/**
 * Given indexed vertices creates a new set of vertices un-indexed by expanding the indexed vertices.
 * @param {Object.<string, TypedArray>} vertices The indexed vertices to deindex
 * @return {Object.<string, TypedArray>} The deindexed vertices
 * @memberOf module:twgl/primitives
 */
function deindexVertices(vertices) {
  const indices = vertices.indices;
  const newVertices = {};
  const numElements = indices.length;

  function expandToUnindexed(channel) {
    const srcBuffer = vertices[channel];
    const numComponents = srcBuffer.numComponents;
    const dstBuffer = createAugmentedTypedArray(numComponents, numElements, srcBuffer.constructor);
    for (let ii = 0; ii < numElements; ++ii) {
      const ndx = indices[ii];
      const offset = ndx * numComponents;
      for (let jj = 0; jj < numComponents; ++jj) {
        dstBuffer.push(srcBuffer[offset + jj]);
      }
    }
    newVertices[channel] = dstBuffer;
  }

  Object.keys(vertices).filter(allButIndices).forEach(expandToUnindexed);

  return newVertices;
}

/**
 * flattens the normals of deindexed vertices in place.
 * @param {Object.<string, TypedArray>} vertices The deindexed vertices who's normals to flatten
 * @return {Object.<string, TypedArray>} The flattened vertices (same as was passed in)
 * @memberOf module:twgl/primitives
 */
function flattenNormals(vertices) {
  if (vertices.indices) {
    throw new Error('can not flatten normals of indexed vertices. deindex them first');
  }

  const normals = vertices.normal;
  const numNormals = normals.length;
  for (let ii = 0; ii < numNormals; ii += 9) {
    // pull out the 3 normals for this triangle
    const nax = normals[ii + 0];
    const nay = normals[ii + 1];
    const naz = normals[ii + 2];

    const nbx = normals[ii + 3];
    const nby = normals[ii + 4];
    const nbz = normals[ii + 5];

    const ncx = normals[ii + 6];
    const ncy = normals[ii + 7];
    const ncz = normals[ii + 8];

    // add them
    let nx = nax + nbx + ncx;
    let ny = nay + nby + ncy;
    let nz = naz + nbz + ncz;

    // normalize them
    const length = Math.sqrt(nx * nx + ny * ny + nz * nz);

    nx /= length;
    ny /= length;
    nz /= length;

    // copy them back in
    normals[ii + 0] = nx;
    normals[ii + 1] = ny;
    normals[ii + 2] = nz;

    normals[ii + 3] = nx;
    normals[ii + 4] = ny;
    normals[ii + 5] = nz;

    normals[ii + 6] = nx;
    normals[ii + 7] = ny;
    normals[ii + 8] = nz;
  }

  return vertices;
}

function applyFuncToV3Array(array, matrix, fn) {
  const len = array.length;
  const tmp = new Float32Array(3);
  for (let ii = 0; ii < len; ii += 3) {
    fn(matrix, [array[ii], array[ii + 1], array[ii + 2]], tmp);
    array[ii    ] = tmp[0];
    array[ii + 1] = tmp[1];
    array[ii + 2] = tmp[2];
  }
}

function transformNormal$1(mi, v, dst) {
  dst = dst || create();
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];

  dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
  dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
  dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];

  return dst;
}

/**
 * Reorients directions by the given matrix..
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */
function reorientDirections(array, matrix) {
  applyFuncToV3Array(array, matrix, transformDirection);
  return array;
}

/**
 * Reorients normals by the inverse-transpose of the given
 * matrix..
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */
function reorientNormals(array, matrix) {
  applyFuncToV3Array(array, inverse(matrix), transformNormal$1);
  return array;
}

/**
 * Reorients positions by the given matrix. In other words, it
 * multiplies each vertex by the given matrix.
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */
function reorientPositions(array, matrix) {
  applyFuncToV3Array(array, matrix, transformPoint);
  return array;
}

/**
 * @typedef {(number[]|TypedArray)} NativeArrayOrTypedArray
 */

/**
 * Reorients arrays by the given matrix. Assumes arrays have
 * names that contains 'pos' could be reoriented as positions,
 * 'binorm' or 'tan' as directions, and 'norm' as normals.
 *
 * @param {Object.<string, NativeArrayOrTypedArray>} arrays The vertices to reorient
 * @param {module:twgl/m4.Mat4} matrix matrix to reorient by.
 * @return {Object.<string, NativeArrayOrTypedArray>} same arrays that were passed in.
 * @memberOf module:twgl/primitives
 */
function reorientVertices(arrays, matrix) {
  Object.keys(arrays).forEach(function(name) {
    const array = arrays[name];
    if (name.indexOf("pos") >= 0) {
      reorientPositions(array, matrix);
    } else if (name.indexOf("tan") >= 0 || name.indexOf("binorm") >= 0) {
      reorientDirections(array, matrix);
    } else if (name.indexOf("norm") >= 0) {
      reorientNormals(array, matrix);
    }
  });
  return arrays;
}

/**
 * Creates XY quad BufferInfo
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0, 0.5);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {Object.<string, WebGLBuffer>} the created XY Quad BufferInfo
 * @memberOf module:twgl/primitives
 * @function createXYQuadBuffers
 */

/**
 * Creates XY quad Buffers
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0, 0.5);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {module:twgl.BufferInfo} the created XY Quad buffers
 * @memberOf module:twgl/primitives
 * @function createXYQuadBufferInfo
 */

/**
 * Creates XY quad vertices
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadVertices(1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadVertices(1, 0, 0.5);
 *
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {Object.<string, TypedArray>} the created XY Quad vertices
 * @memberOf module:twgl/primitives
 */
function createXYQuadVertices(size, xOffset, yOffset) {
  size = size || 2;
  xOffset = xOffset || 0;
  yOffset = yOffset || 0;
  size *= 0.5;
  return {
    position: {
      numComponents: 2,
      data: [
        xOffset + -1 * size, yOffset + -1 * size,
        xOffset +  1 * size, yOffset + -1 * size,
        xOffset + -1 * size, yOffset +  1 * size,
        xOffset +  1 * size, yOffset +  1 * size,
      ],
    },
    normal: [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
    ],
    texcoord: [
      0, 0,
      1, 0,
      0, 1,
      1, 1,
    ],
    indices: [ 0, 1, 2, 2, 1, 3 ],
  };
}

/**
 * Creates XZ plane BufferInfo.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {module:twgl.BufferInfo} The created plane BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createPlaneBufferInfo
 */

/**
 * Creates XZ plane buffers.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {Object.<string, WebGLBuffer>} The created plane buffers.
 * @memberOf module:twgl/primitives
 * @function createPlaneBuffers
 */

/**
 * Creates XZ plane vertices.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {Object.<string, TypedArray>} The created plane vertices.
 * @memberOf module:twgl/primitives
 */
function createPlaneVertices(
    width,
    depth,
    subdivisionsWidth,
    subdivisionsDepth,
    matrix) {
  width = width || 1;
  depth = depth || 1;
  subdivisionsWidth = subdivisionsWidth || 1;
  subdivisionsDepth = subdivisionsDepth || 1;
  matrix = matrix || identity();

  const numVertices = (subdivisionsWidth + 1) * (subdivisionsDepth + 1);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);

  for (let z = 0; z <= subdivisionsDepth; z++) {
    for (let x = 0; x <= subdivisionsWidth; x++) {
      const u = x / subdivisionsWidth;
      const v = z / subdivisionsDepth;
      positions.push(
          width * u - width * 0.5,
          0,
          depth * v - depth * 0.5);
      normals.push(0, 1, 0);
      texcoords.push(u, v);
    }
  }

  const numVertsAcross = subdivisionsWidth + 1;
  const indices = createAugmentedTypedArray(
      3, subdivisionsWidth * subdivisionsDepth * 2, Uint16Array);

  for (let z = 0; z < subdivisionsDepth; z++) {  // eslint-disable-line
    for (let x = 0; x < subdivisionsWidth; x++) {  // eslint-disable-line
      // Make triangle 1 of quad.
      indices.push(
          (z + 0) * numVertsAcross + x,
          (z + 1) * numVertsAcross + x,
          (z + 0) * numVertsAcross + x + 1);

      // Make triangle 2 of quad.
      indices.push(
          (z + 1) * numVertsAcross + x,
          (z + 1) * numVertsAcross + x + 1,
          (z + 0) * numVertsAcross + x + 1);
    }
  }

  const arrays = reorientVertices({
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices: indices,
  }, matrix);
  return arrays;
}

/**
 * Creates sphere BufferInfo.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {module:twgl.BufferInfo} The created sphere BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createSphereBufferInfo
 */

/**
 * Creates sphere buffers.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {Object.<string, WebGLBuffer>} The created sphere buffers.
 * @memberOf module:twgl/primitives
 * @function createSphereBuffers
 */

/**
 * Creates sphere vertices.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {Object.<string, TypedArray>} The created sphere vertices.
 * @memberOf module:twgl/primitives
 */
function createSphereVertices(
    radius,
    subdivisionsAxis,
    subdivisionsHeight,
    opt_startLatitudeInRadians,
    opt_endLatitudeInRadians,
    opt_startLongitudeInRadians,
    opt_endLongitudeInRadians) {
  if (subdivisionsAxis <= 0 || subdivisionsHeight <= 0) {
    throw new Error('subdivisionAxis and subdivisionHeight must be > 0');
  }

  opt_startLatitudeInRadians = opt_startLatitudeInRadians || 0;
  opt_endLatitudeInRadians = opt_endLatitudeInRadians || Math.PI;
  opt_startLongitudeInRadians = opt_startLongitudeInRadians || 0;
  opt_endLongitudeInRadians = opt_endLongitudeInRadians || (Math.PI * 2);

  const latRange = opt_endLatitudeInRadians - opt_startLatitudeInRadians;
  const longRange = opt_endLongitudeInRadians - opt_startLongitudeInRadians;

  // We are going to generate our sphere by iterating through its
  // spherical coordinates and generating 2 triangles for each quad on a
  // ring of the sphere.
  const numVertices = (subdivisionsAxis + 1) * (subdivisionsHeight + 1);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals   = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);

  // Generate the individual vertices in our vertex buffer.
  for (let y = 0; y <= subdivisionsHeight; y++) {
    for (let x = 0; x <= subdivisionsAxis; x++) {
      // Generate a vertex based on its spherical coordinates
      const u = x / subdivisionsAxis;
      const v = y / subdivisionsHeight;
      const theta = longRange * u + opt_startLongitudeInRadians;
      const phi = latRange * v + opt_startLatitudeInRadians;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);
      const ux = cosTheta * sinPhi;
      const uy = cosPhi;
      const uz = sinTheta * sinPhi;
      positions.push(radius * ux, radius * uy, radius * uz);
      normals.push(ux, uy, uz);
      texcoords.push(1 - u, v);
    }
  }

  const numVertsAround = subdivisionsAxis + 1;
  const indices = createAugmentedTypedArray(3, subdivisionsAxis * subdivisionsHeight * 2, Uint16Array);
  for (let x = 0; x < subdivisionsAxis; x++) {  // eslint-disable-line
    for (let y = 0; y < subdivisionsHeight; y++) {  // eslint-disable-line
      // Make triangle 1 of quad.
      indices.push(
          (y + 0) * numVertsAround + x,
          (y + 0) * numVertsAround + x + 1,
          (y + 1) * numVertsAround + x);

      // Make triangle 2 of quad.
      indices.push(
          (y + 1) * numVertsAround + x,
          (y + 0) * numVertsAround + x + 1,
          (y + 1) * numVertsAround + x + 1);
    }
  }

  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices: indices,
  };
}

/**
 * Array of the indices of corners of each face of a cube.
 * @type {Array.<number[]>}
 * @private
 */
const CUBE_FACE_INDICES = [
  [3, 7, 5, 1],  // right
  [6, 2, 0, 4],  // left
  [6, 7, 3, 2],  // ??
  [0, 1, 5, 4],  // ??
  [7, 6, 4, 5],  // front
  [2, 3, 1, 0],  // back
];

/**
 * Creates a BufferInfo for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] width, height and depth of the cube.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCubeBufferInfo
 */

/**
 * Creates the buffers and indices for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] width, height and depth of the cube.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCubeBuffers
 */

/**
 * Creates the vertices and indices for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {number} [size] width, height and depth of the cube.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */
function createCubeVertices(size) {
  size = size || 1;
  const k = size / 2;

  const cornerVertices = [
    [-k, -k, -k],
    [+k, -k, -k],
    [-k, +k, -k],
    [+k, +k, -k],
    [-k, -k, +k],
    [+k, -k, +k],
    [-k, +k, +k],
    [+k, +k, +k],
  ];

  const faceNormals = [
    [+1, +0, +0],
    [-1, +0, +0],
    [+0, +1, +0],
    [+0, -1, +0],
    [+0, +0, +1],
    [+0, +0, -1],
  ];

  const uvCoords = [
    [1, 0],
    [0, 0],
    [0, 1],
    [1, 1],
  ];

  const numVertices = 6 * 4;
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals   = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2 , numVertices);
  const indices   = createAugmentedTypedArray(3, 6 * 2, Uint16Array);

  for (let f = 0; f < 6; ++f) {
    const faceIndices = CUBE_FACE_INDICES[f];
    for (let v = 0; v < 4; ++v) {
      const position = cornerVertices[faceIndices[v]];
      const normal = faceNormals[f];
      const uv = uvCoords[v];

      // Each face needs all four vertices because the normals and texture
      // coordinates are not all the same.
      positions.push(position);
      normals.push(normal);
      texcoords.push(uv);

    }
    // Two triangles make a square face.
    const offset = 4 * f;
    indices.push(offset + 0, offset + 1, offset + 2);
    indices.push(offset + 0, offset + 2, offset + 3);
  }

  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices: indices,
  };
}

/**
 * Creates a BufferInfo for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {module:twgl.BufferInfo} The created cone BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createTruncatedConeBufferInfo
 */

/**
 * Creates buffers for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {Object.<string, WebGLBuffer>} The created cone buffers.
 * @memberOf module:twgl/primitives
 * @function createTruncatedConeBuffers
 */

/**
 * Creates vertices for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis. .
 *
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {Object.<string, TypedArray>} The created cone vertices.
 * @memberOf module:twgl/primitives
 */
function createTruncatedConeVertices(
    bottomRadius,
    topRadius,
    height,
    radialSubdivisions,
    verticalSubdivisions,
    opt_topCap,
    opt_bottomCap) {
  if (radialSubdivisions < 3) {
    throw new Error('radialSubdivisions must be 3 or greater');
  }

  if (verticalSubdivisions < 1) {
    throw new Error('verticalSubdivisions must be 1 or greater');
  }

  const topCap = (opt_topCap === undefined) ? true : opt_topCap;
  const bottomCap = (opt_bottomCap === undefined) ? true : opt_bottomCap;

  const extra = (topCap ? 2 : 0) + (bottomCap ? 2 : 0);

  const numVertices = (radialSubdivisions + 1) * (verticalSubdivisions + 1 + extra);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals   = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  const indices   = createAugmentedTypedArray(3, radialSubdivisions * (verticalSubdivisions + extra / 2) * 2, Uint16Array);

  const vertsAroundEdge = radialSubdivisions + 1;

  // The slant of the cone is constant across its surface
  const slant = Math.atan2(bottomRadius - topRadius, height);
  const cosSlant = Math.cos(slant);
  const sinSlant = Math.sin(slant);

  const start = topCap ? -2 : 0;
  const end = verticalSubdivisions + (bottomCap ? 2 : 0);

  for (let yy = start; yy <= end; ++yy) {
    let v = yy / verticalSubdivisions;
    let y = height * v;
    let ringRadius;
    if (yy < 0) {
      y = 0;
      v = 1;
      ringRadius = bottomRadius;
    } else if (yy > verticalSubdivisions) {
      y = height;
      v = 1;
      ringRadius = topRadius;
    } else {
      ringRadius = bottomRadius +
        (topRadius - bottomRadius) * (yy / verticalSubdivisions);
    }
    if (yy === -2 || yy === verticalSubdivisions + 2) {
      ringRadius = 0;
      v = 0;
    }
    y -= height / 2;
    for (let ii = 0; ii < vertsAroundEdge; ++ii) {
      const sin = Math.sin(ii * Math.PI * 2 / radialSubdivisions);
      const cos = Math.cos(ii * Math.PI * 2 / radialSubdivisions);
      positions.push(sin * ringRadius, y, cos * ringRadius);
      if (yy < 0) {
        normals.push(0, -1, 0);
      } else if (yy > verticalSubdivisions) {
        normals.push(0, 1, 0);
      } else if (ringRadius === 0.0) {
        normals.push(0, 0, 0);
      } else {
        normals.push(sin * cosSlant, sinSlant, cos * cosSlant);
      }
      texcoords.push((ii / radialSubdivisions), 1 - v);
    }
  }

  for (let yy = 0; yy < verticalSubdivisions + extra; ++yy) {  // eslint-disable-line
    if (yy === 1 && topCap || yy === verticalSubdivisions + extra - 2 && bottomCap) {
      continue;
    }
    for (let ii = 0; ii < radialSubdivisions; ++ii) {  // eslint-disable-line
      indices.push(vertsAroundEdge * (yy + 0) + 0 + ii,
                   vertsAroundEdge * (yy + 0) + 1 + ii,
                   vertsAroundEdge * (yy + 1) + 1 + ii);
      indices.push(vertsAroundEdge * (yy + 0) + 0 + ii,
                   vertsAroundEdge * (yy + 1) + 1 + ii,
                   vertsAroundEdge * (yy + 1) + 0 + ii);
    }
  }

  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices: indices,
  };
}

/**
 * Expands RLE data
 * @param {number[]} rleData data in format of run-length, x, y, z, run-length, x, y, z
 * @param {number[]} [padding] value to add each entry with.
 * @return {number[]} the expanded rleData
 * @private
 */
function expandRLEData(rleData, padding) {
  padding = padding || [];
  const data = [];
  for (let ii = 0; ii < rleData.length; ii += 4) {
    const runLength = rleData[ii];
    const element = rleData.slice(ii + 1, ii + 4);
    element.push.apply(element, padding);
    for (let jj = 0; jj < runLength; ++jj) {
      data.push.apply(data, element);
    }
  }
  return data;
}

/**
 * Creates 3D 'F' BufferInfo.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function create3DFBufferInfo
 */

/**
 * Creates 3D 'F' buffers.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function create3DFBuffers
 */

/**
 * Creates 3D 'F' vertices.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color arrays.
 *
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */
function create3DFVertices() {

  const positions = [
    // left column front
    0,   0,  0,
    0, 150,  0,
    30,   0,  0,
    0, 150,  0,
    30, 150,  0,
    30,   0,  0,

    // top rung front
    30,   0,  0,
    30,  30,  0,
    100,   0,  0,
    30,  30,  0,
    100,  30,  0,
    100,   0,  0,

    // middle rung front
    30,  60,  0,
    30,  90,  0,
    67,  60,  0,
    30,  90,  0,
    67,  90,  0,
    67,  60,  0,

    // left column back
      0,   0,  30,
     30,   0,  30,
      0, 150,  30,
      0, 150,  30,
     30,   0,  30,
     30, 150,  30,

    // top rung back
     30,   0,  30,
    100,   0,  30,
     30,  30,  30,
     30,  30,  30,
    100,   0,  30,
    100,  30,  30,

    // middle rung back
     30,  60,  30,
     67,  60,  30,
     30,  90,  30,
     30,  90,  30,
     67,  60,  30,
     67,  90,  30,

    // top
      0,   0,   0,
    100,   0,   0,
    100,   0,  30,
      0,   0,   0,
    100,   0,  30,
      0,   0,  30,

    // top rung front
    100,   0,   0,
    100,  30,   0,
    100,  30,  30,
    100,   0,   0,
    100,  30,  30,
    100,   0,  30,

    // under top rung
    30,   30,   0,
    30,   30,  30,
    100,  30,  30,
    30,   30,   0,
    100,  30,  30,
    100,  30,   0,

    // between top rung and middle
    30,   30,   0,
    30,   60,  30,
    30,   30,  30,
    30,   30,   0,
    30,   60,   0,
    30,   60,  30,

    // top of middle rung
    30,   60,   0,
    67,   60,  30,
    30,   60,  30,
    30,   60,   0,
    67,   60,   0,
    67,   60,  30,

    // front of middle rung
    67,   60,   0,
    67,   90,  30,
    67,   60,  30,
    67,   60,   0,
    67,   90,   0,
    67,   90,  30,

    // bottom of middle rung.
    30,   90,   0,
    30,   90,  30,
    67,   90,  30,
    30,   90,   0,
    67,   90,  30,
    67,   90,   0,

    // front of bottom
    30,   90,   0,
    30,  150,  30,
    30,   90,  30,
    30,   90,   0,
    30,  150,   0,
    30,  150,  30,

    // bottom
    0,   150,   0,
    0,   150,  30,
    30,  150,  30,
    0,   150,   0,
    30,  150,  30,
    30,  150,   0,

    // left side
    0,   0,   0,
    0,   0,  30,
    0, 150,  30,
    0,   0,   0,
    0, 150,  30,
    0, 150,   0,
  ];

  const texcoords = [
    // left column front
    0.22, 0.19,
    0.22, 0.79,
    0.34, 0.19,
    0.22, 0.79,
    0.34, 0.79,
    0.34, 0.19,

    // top rung front
    0.34, 0.19,
    0.34, 0.31,
    0.62, 0.19,
    0.34, 0.31,
    0.62, 0.31,
    0.62, 0.19,

    // middle rung front
    0.34, 0.43,
    0.34, 0.55,
    0.49, 0.43,
    0.34, 0.55,
    0.49, 0.55,
    0.49, 0.43,

    // left column back
    0, 0,
    1, 0,
    0, 1,
    0, 1,
    1, 0,
    1, 1,

    // top rung back
    0, 0,
    1, 0,
    0, 1,
    0, 1,
    1, 0,
    1, 1,

    // middle rung back
    0, 0,
    1, 0,
    0, 1,
    0, 1,
    1, 0,
    1, 1,

    // top
    0, 0,
    1, 0,
    1, 1,
    0, 0,
    1, 1,
    0, 1,

    // top rung front
    0, 0,
    1, 0,
    1, 1,
    0, 0,
    1, 1,
    0, 1,

    // under top rung
    0, 0,
    0, 1,
    1, 1,
    0, 0,
    1, 1,
    1, 0,

    // between top rung and middle
    0, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,

    // top of middle rung
    0, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,

    // front of middle rung
    0, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,

    // bottom of middle rung.
    0, 0,
    0, 1,
    1, 1,
    0, 0,
    1, 1,
    1, 0,

    // front of bottom
    0, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,

    // bottom
    0, 0,
    0, 1,
    1, 1,
    0, 0,
    1, 1,
    1, 0,

    // left side
    0, 0,
    0, 1,
    1, 1,
    0, 0,
    1, 1,
    1, 0,
  ];

  const normals = expandRLEData([
    // left column front
    // top rung front
    // middle rung front
    18, 0, 0, 1,

    // left column back
    // top rung back
    // middle rung back
    18, 0, 0, -1,

    // top
    6, 0, 1, 0,

    // top rung front
    6, 1, 0, 0,

    // under top rung
    6, 0, -1, 0,

    // between top rung and middle
    6, 1, 0, 0,

    // top of middle rung
    6, 0, 1, 0,

    // front of middle rung
    6, 1, 0, 0,

    // bottom of middle rung.
    6, 0, -1, 0,

    // front of bottom
    6, 1, 0, 0,

    // bottom
    6, 0, -1, 0,

    // left side
    6, -1, 0, 0,
  ]);

  const colors = expandRLEData([
        // left column front
        // top rung front
        // middle rung front
      18, 200,  70, 120,

        // left column back
        // top rung back
        // middle rung back
      18, 80, 70, 200,

        // top
      6, 70, 200, 210,

        // top rung front
      6, 200, 200, 70,

        // under top rung
      6, 210, 100, 70,

        // between top rung and middle
      6, 210, 160, 70,

        // top of middle rung
      6, 70, 180, 210,

        // front of middle rung
      6, 100, 70, 210,

        // bottom of middle rung.
      6, 76, 210, 100,

        // front of bottom
      6, 140, 210, 80,

        // bottom
      6, 90, 130, 110,

        // left side
      6, 160, 160, 220,
  ], [255]);

  const numVerts = positions.length / 3;

  const arrays = {
    position: createAugmentedTypedArray(3, numVerts),
    texcoord: createAugmentedTypedArray(2,  numVerts),
    normal: createAugmentedTypedArray(3, numVerts),
    color: createAugmentedTypedArray(4, numVerts, Uint8Array),
    indices: createAugmentedTypedArray(3, numVerts / 3, Uint16Array),
  };

  arrays.position.push(positions);
  arrays.texcoord.push(texcoords);
  arrays.normal.push(normals);
  arrays.color.push(colors);

  for (let ii = 0; ii < numVerts; ++ii) {
    arrays.indices.push(ii);
  }

  return arrays;
}

/**
 * Creates crescent BufferInfo.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCresentBufferInfo
 */

/**
 * Creates crescent buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCresentBuffers
 */

/**
 * Creates crescent vertices.
 *
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 * @function createCresentBuffers
 */

/**
 * Creates crescent BufferInfo.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCrescentBufferInfo
 */

/**
 * Creates crescent buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCrescentBuffers
 */

/**
 * Creates crescent vertices.
 *
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */
 function createCrescentVertices(
    verticalRadius,
    outerRadius,
    innerRadius,
    thickness,
    subdivisionsDown,
    startOffset,
    endOffset) {
  if (subdivisionsDown <= 0) {
    throw new Error('subdivisionDown must be > 0');
  }

  startOffset = startOffset || 0;
  endOffset   = endOffset || 1;

  const subdivisionsThick = 2;

  const offsetRange = endOffset - startOffset;
  const numVertices = (subdivisionsDown + 1) * 2 * (2 + subdivisionsThick);
  const positions   = createAugmentedTypedArray(3, numVertices);
  const normals     = createAugmentedTypedArray(3, numVertices);
  const texcoords   = createAugmentedTypedArray(2, numVertices);

  function lerp(a, b, s) {
    return a + (b - a) * s;
  }

  function createArc(arcRadius, x, normalMult, normalAdd, uMult, uAdd) {
    for (let z = 0; z <= subdivisionsDown; z++) {
      const uBack = x / (subdivisionsThick - 1);
      const v = z / subdivisionsDown;
      const xBack = (uBack - 0.5) * 2;
      const angle = (startOffset + (v * offsetRange)) * Math.PI;
      const s = Math.sin(angle);
      const c = Math.cos(angle);
      const radius = lerp(verticalRadius, arcRadius, s);
      const px = xBack * thickness;
      const py = c * verticalRadius;
      const pz = s * radius;
      positions.push(px, py, pz);
      const n = add(multiply([0, s, c], normalMult), normalAdd);
      normals.push(n);
      texcoords.push(uBack * uMult + uAdd, v);
    }
  }

  // Generate the individual vertices in our vertex buffer.
  for (let x = 0; x < subdivisionsThick; x++) {
    const uBack = (x / (subdivisionsThick - 1) - 0.5) * 2;
    createArc(outerRadius, x, [1, 1, 1], [0,     0, 0], 1, 0);
    createArc(outerRadius, x, [0, 0, 0], [uBack, 0, 0], 0, 0);
    createArc(innerRadius, x, [1, 1, 1], [0,     0, 0], 1, 0);
    createArc(innerRadius, x, [0, 0, 0], [uBack, 0, 0], 0, 1);
  }

  // Do outer surface.
  const indices = createAugmentedTypedArray(3, (subdivisionsDown * 2) * (2 + subdivisionsThick), Uint16Array);

  function createSurface(leftArcOffset, rightArcOffset) {
    for (let z = 0; z < subdivisionsDown; ++z) {
      // Make triangle 1 of quad.
      indices.push(
          leftArcOffset + z + 0,
          leftArcOffset + z + 1,
          rightArcOffset + z + 0);

      // Make triangle 2 of quad.
      indices.push(
          leftArcOffset + z + 1,
          rightArcOffset + z + 1,
          rightArcOffset + z + 0);
    }
  }

  const numVerticesDown = subdivisionsDown + 1;
  // front
  createSurface(numVerticesDown * 0, numVerticesDown * 4);
  // right
  createSurface(numVerticesDown * 5, numVerticesDown * 7);
  // back
  createSurface(numVerticesDown * 6, numVerticesDown * 2);
  // left
  createSurface(numVerticesDown * 3, numVerticesDown * 1);

  return {
    position: positions,
    normal:   normals,
    texcoord: texcoords,
    indices:  indices,
  };
}

/**
 * Creates cylinder BufferInfo. The cylinder will be created around the origin
 * along the y-axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of cylinder.
 * @param {number} height Height of cylinder.
 * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
 * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
 * @param {boolean} [topCap] Create top cap. Default = true.
 * @param {boolean} [bottomCap] Create bottom cap. Default = true.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCylinderBufferInfo
 */

 /**
  * Creates cylinder buffers. The cylinder will be created around the origin
  * along the y-axis.
  *
  * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
  * @param {number} radius Radius of cylinder.
  * @param {number} height Height of cylinder.
  * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
  * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
  * @param {boolean} [topCap] Create top cap. Default = true.
  * @param {boolean} [bottomCap] Create bottom cap. Default = true.
  * @return {Object.<string, WebGLBuffer>} The created buffers.
  * @memberOf module:twgl/primitives
  * @function createCylinderBuffers
  */

 /**
  * Creates cylinder vertices. The cylinder will be created around the origin
  * along the y-axis.
  *
  * @param {number} radius Radius of cylinder.
  * @param {number} height Height of cylinder.
  * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
  * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
  * @param {boolean} [topCap] Create top cap. Default = true.
  * @param {boolean} [bottomCap] Create bottom cap. Default = true.
  * @return {Object.<string, TypedArray>} The created vertices.
  * @memberOf module:twgl/primitives
  */
function createCylinderVertices(
    radius,
    height,
    radialSubdivisions,
    verticalSubdivisions,
    topCap,
    bottomCap) {
  return createTruncatedConeVertices(
      radius,
      radius,
      height,
      radialSubdivisions,
      verticalSubdivisions,
      topCap,
      bottomCap);
}

/**
 * Creates BufferInfo for a torus
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createTorusBufferInfo
 */

/**
 * Creates buffers for a torus
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createTorusBuffers
 */

/**
 * Creates vertices for a torus
 *
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */
function createTorusVertices(
    radius,
    thickness,
    radialSubdivisions,
    bodySubdivisions,
    startAngle,
    endAngle) {
  if (radialSubdivisions < 3) {
    throw new Error('radialSubdivisions must be 3 or greater');
  }

  if (bodySubdivisions < 3) {
    throw new Error('verticalSubdivisions must be 3 or greater');
  }

  startAngle = startAngle || 0;
  endAngle = endAngle || Math.PI * 2;
  const range = endAngle - startAngle;

  const radialParts = radialSubdivisions + 1;
  const bodyParts   = bodySubdivisions + 1;
  const numVertices = radialParts * bodyParts;
  const positions   = createAugmentedTypedArray(3, numVertices);
  const normals     = createAugmentedTypedArray(3, numVertices);
  const texcoords   = createAugmentedTypedArray(2, numVertices);
  const indices     = createAugmentedTypedArray(3, (radialSubdivisions) * (bodySubdivisions) * 2, Uint16Array);

  for (let slice = 0; slice < bodyParts; ++slice) {
    const v = slice / bodySubdivisions;
    const sliceAngle = v * Math.PI * 2;
    const sliceSin = Math.sin(sliceAngle);
    const ringRadius = radius + sliceSin * thickness;
    const ny = Math.cos(sliceAngle);
    const y = ny * thickness;
    for (let ring = 0; ring < radialParts; ++ring) {
      const u = ring / radialSubdivisions;
      const ringAngle = startAngle + u * range;
      const xSin = Math.sin(ringAngle);
      const zCos = Math.cos(ringAngle);
      const x = xSin * ringRadius;
      const z = zCos * ringRadius;
      const nx = xSin * sliceSin;
      const nz = zCos * sliceSin;
      positions.push(x, y, z);
      normals.push(nx, ny, nz);
      texcoords.push(u, 1 - v);
    }
  }

  for (let slice = 0; slice < bodySubdivisions; ++slice) {  // eslint-disable-line
    for (let ring = 0; ring < radialSubdivisions; ++ring) {  // eslint-disable-line
      const nextRingIndex  = 1 + ring;
      const nextSliceIndex = 1 + slice;
      indices.push(radialParts * slice          + ring,
                   radialParts * nextSliceIndex + ring,
                   radialParts * slice          + nextRingIndex);
      indices.push(radialParts * nextSliceIndex + ring,
                   radialParts * nextSliceIndex + nextRingIndex,
                   radialParts * slice          + nextRingIndex);
    }
  }

  return {
    position: positions,
    normal:   normals,
    texcoord: texcoords,
    indices:  indices,
  };
}


/**
 * Creates a disc BufferInfo. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createDiscBufferInfo
 */

/**
 * Creates disc buffers. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createDiscBuffers
 */

/**
 * Creates disc vertices. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */
function createDiscVertices(
    radius,
    divisions,
    stacks,
    innerRadius,
    stackPower) {
  if (divisions < 3) {
    throw new Error('divisions must be at least 3');
  }

  stacks = stacks ? stacks : 1;
  stackPower = stackPower ? stackPower : 1;
  innerRadius = innerRadius ? innerRadius : 0;

  // Note: We don't share the center vertex because that would
  // mess up texture coordinates.
  const numVertices = (divisions + 1) * (stacks + 1);

  const positions = createAugmentedTypedArray(3, numVertices);
  const normals   = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  const indices   = createAugmentedTypedArray(3, stacks * divisions * 2, Uint16Array);

  let firstIndex = 0;
  const radiusSpan = radius - innerRadius;
  const pointsPerStack = divisions + 1;

  // Build the disk one stack at a time.
  for (let stack = 0; stack <= stacks; ++stack) {
    const stackRadius = innerRadius + radiusSpan * Math.pow(stack / stacks, stackPower);

    for (let i = 0; i <= divisions; ++i) {
      const theta = 2.0 * Math.PI * i / divisions;
      const x = stackRadius * Math.cos(theta);
      const z = stackRadius * Math.sin(theta);

      positions.push(x, 0, z);
      normals.push(0, 1, 0);
      texcoords.push(1 - (i / divisions), stack / stacks);
      if (stack > 0 && i !== divisions) {
        // a, b, c and d are the indices of the vertices of a quad.  unless
        // the current stack is the one closest to the center, in which case
        // the vertices a and b connect to the center vertex.
        const a = firstIndex + (i + 1);
        const b = firstIndex + i;
        const c = firstIndex + i - pointsPerStack;
        const d = firstIndex + (i + 1) - pointsPerStack;

        // Make a quad of the vertices a, b, c, d.
        indices.push(a, b, c);
        indices.push(a, c, d);
      }
    }

    firstIndex += divisions + 1;
  }

  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices: indices,
  };
}

/**
 * creates a random integer between 0 and range - 1 inclusive.
 * @param {number} range
 * @return {number} random value between 0 and range - 1 inclusive.
 * @private
 */
function randInt(range) {
  return Math.random() * range | 0;
}

/**
 * Used to supply random colors
 * @callback RandomColorFunc
 * @param {number} ndx index of triangle/quad if unindexed or index of vertex if indexed
 * @param {number} channel 0 = red, 1 = green, 2 = blue, 3 = alpha
 * @return {number} a number from 0 to 255
 * @memberOf module:twgl/primitives
 */

/**
 * @typedef {Object} RandomVerticesOptions
 * @property {number} [vertsPerColor] Defaults to 3 for non-indexed vertices
 * @property {module:twgl/primitives.RandomColorFunc} [rand] A function to generate random numbers
 * @memberOf module:twgl/primitives
 */

/**
 * Creates an augmentedTypedArray of random vertex colors.
 * If the vertices are indexed (have an indices array) then will
 * just make random colors. Otherwise assumes they are triangles
 * and makes one random color for every 3 vertices.
 * @param {Object.<string, AugmentedTypedArray>} vertices Vertices as returned from one of the createXXXVertices functions.
 * @param {module:twgl/primitives.RandomVerticesOptions} [options] options.
 * @return {Object.<string, AugmentedTypedArray>} same vertices as passed in with `color` added.
 * @memberOf module:twgl/primitives
 */
function makeRandomVertexColors(vertices, options) {
  options = options || {};
  const numElements = vertices.position.numElements;
  const vColors = createAugmentedTypedArray(4, numElements, Uint8Array);
  const rand = options.rand || function(ndx, channel) {
    return channel < 3 ? randInt(256) : 255;
  };
  vertices.color = vColors;
  if (vertices.indices) {
    // just make random colors if index
    for (let ii = 0; ii < numElements; ++ii) {
      vColors.push(rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3));
    }
  } else {
    // make random colors per triangle
    const numVertsPerColor = options.vertsPerColor || 3;
    const numSets = numElements / numVertsPerColor;
    for (let ii = 0; ii < numSets; ++ii) {  // eslint-disable-line
      const color = [rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3)];
      for (let jj = 0; jj < numVertsPerColor; ++jj) {
        vColors.push(color);
      }
    }
  }
  return vertices;
}

/**
 * creates a function that calls fn to create vertices and then
 * creates a buffers for them
 * @private
 */
function createBufferFunc(fn) {
  return function(gl) {
    const arrays = fn.apply(this, Array.prototype.slice.call(arguments, 1));
    return createBuffersFromArrays(gl, arrays);
  };
}

/**
 * creates a function that calls fn to create vertices and then
 * creates a bufferInfo object for them
 * @private
 */
function createBufferInfoFunc(fn) {
  return function(gl) {
    const arrays = fn.apply(null,  Array.prototype.slice.call(arguments, 1));
    return createBufferInfoFromArrays(gl, arrays);
  };
}

const arraySpecPropertyNames = [
  "numComponents",
  "size",
  "type",
  "normalize",
  "stride",
  "offset",
  "attrib",
  "name",
  "attribName",
];

/**
 * Copy elements from one array to another
 *
 * @param {Array|TypedArray} src source array
 * @param {Array|TypedArray} dst dest array
 * @param {number} dstNdx index in dest to copy src
 * @param {number} [offset] offset to add to copied values
 * @private
 */
function copyElements(src, dst, dstNdx, offset) {
  offset = offset || 0;
  const length = src.length;
  for (let ii = 0; ii < length; ++ii) {
    dst[dstNdx + ii] = src[ii] + offset;
  }
}

/**
 * Creates an array of the same time
 *
 * @param {(number[]|ArrayBufferView|module:twgl.FullArraySpec)} srcArray array who's type to copy
 * @param {number} length size of new array
 * @return {(number[]|ArrayBufferView|module:twgl.FullArraySpec)} array with same type as srcArray
 * @private
 */
function createArrayOfSameType(srcArray, length) {
  const arraySrc = getArray$1(srcArray);
  const newArray = new arraySrc.constructor(length);
  let newArraySpec = newArray;
  // If it appears to have been augmented make new one augmented
  if (arraySrc.numComponents && arraySrc.numElements) {
    augmentTypedArray(newArray, arraySrc.numComponents);
  }
  // If it was a full spec make new one a full spec
  if (srcArray.data) {
    newArraySpec = {
      data: newArray,
    };
    copyNamedProperties(arraySpecPropertyNames, srcArray, newArraySpec);
  }
  return newArraySpec;
}

/**
 * Concatenates sets of vertices
 *
 * Assumes the vertices match in composition. For example
 * if one set of vertices has positions, normals, and indices
 * all sets of vertices must have positions, normals, and indices
 * and of the same type.
 *
 * Example:
 *
 *      const cubeVertices = twgl.primitives.createCubeVertices(2);
 *      const sphereVertices = twgl.primitives.createSphereVertices(1, 10, 10);
 *      // move the sphere 2 units up
 *      twgl.primitives.reorientVertices(
 *          sphereVertices, twgl.m4.translation([0, 2, 0]));
 *      // merge the sphere with the cube
 *      const cubeSphereVertices = twgl.primitives.concatVertices(
 *          [cubeVertices, sphereVertices]);
 *      // turn them into WebGL buffers and attrib data
 *      const bufferInfo = twgl.createBufferInfoFromArrays(gl, cubeSphereVertices);
 *
 * @param {module:twgl.Arrays[]} arrays Array of arrays of vertices
 * @return {module:twgl.Arrays} The concatenated vertices.
 * @memberOf module:twgl/primitives
 */
function concatVertices(arrayOfArrays) {
  const names = {};
  let baseName;
  // get names of all arrays.
  // and numElements for each set of vertices
  for (let ii = 0; ii < arrayOfArrays.length; ++ii) {
    const arrays = arrayOfArrays[ii];
    Object.keys(arrays).forEach(function(name) {  // eslint-disable-line
      if (!names[name]) {
        names[name] = [];
      }
      if (!baseName && name !== 'indices') {
        baseName = name;
      }
      const arrayInfo = arrays[name];
      const numComponents = getNumComponents$1(arrayInfo, name);
      const array = getArray$1(arrayInfo);
      const numElements = array.length / numComponents;
      names[name].push(numElements);
    });
  }

  // compute length of combined array
  // and return one for reference
  function getLengthOfCombinedArrays(name) {
    let length = 0;
    let arraySpec;
    for (let ii = 0; ii < arrayOfArrays.length; ++ii) {
      const arrays = arrayOfArrays[ii];
      const arrayInfo = arrays[name];
      const array = getArray$1(arrayInfo);
      length += array.length;
      if (!arraySpec || arrayInfo.data) {
        arraySpec = arrayInfo;
      }
    }
    return {
      length: length,
      spec: arraySpec,
    };
  }

  function copyArraysToNewArray(name, base, newArray) {
    let baseIndex = 0;
    let offset = 0;
    for (let ii = 0; ii < arrayOfArrays.length; ++ii) {
      const arrays = arrayOfArrays[ii];
      const arrayInfo = arrays[name];
      const array = getArray$1(arrayInfo);
      if (name === 'indices') {
        copyElements(array, newArray, offset, baseIndex);
        baseIndex += base[ii];
      } else {
        copyElements(array, newArray, offset);
      }
      offset += array.length;
    }
  }

  const base = names[baseName];

  const newArrays = {};
  Object.keys(names).forEach(function(name) {
    const info = getLengthOfCombinedArrays(name);
    const newArraySpec = createArrayOfSameType(info.spec, info.length);
    copyArraysToNewArray(name, base, getArray$1(newArraySpec));
    newArrays[name] = newArraySpec;
  });
  return newArrays;
}

/**
 * Creates a duplicate set of vertices
 *
 * This is useful for calling reorientVertices when you
 * also want to keep the original available
 *
 * @param {module:twgl.Arrays} arrays of vertices
 * @return {module:twgl.Arrays} The duplicated vertices.
 * @memberOf module:twgl/primitives
 */
function duplicateVertices(arrays) {
  const newArrays = {};
  Object.keys(arrays).forEach(function(name) {
    const arraySpec = arrays[name];
    const srcArray = getArray$1(arraySpec);
    const newArraySpec = createArrayOfSameType(arraySpec, srcArray.length);
    copyElements(srcArray, getArray$1(newArraySpec), 0);
    newArrays[name] = newArraySpec;
  });
  return newArrays;
}

const create3DFBufferInfo = createBufferInfoFunc(create3DFVertices);
const create3DFBuffers = createBufferFunc(create3DFVertices);
const createCubeBufferInfo = createBufferInfoFunc(createCubeVertices);
const createCubeBuffers = createBufferFunc(createCubeVertices);
const createPlaneBufferInfo = createBufferInfoFunc(createPlaneVertices);
const createPlaneBuffers = createBufferFunc(createPlaneVertices);
const createSphereBufferInfo = createBufferInfoFunc(createSphereVertices);
const createSphereBuffers = createBufferFunc(createSphereVertices);
const createTruncatedConeBufferInfo = createBufferInfoFunc(createTruncatedConeVertices);
const createTruncatedConeBuffers = createBufferFunc(createTruncatedConeVertices);
const createXYQuadBufferInfo = createBufferInfoFunc(createXYQuadVertices);
const createXYQuadBuffers = createBufferFunc(createXYQuadVertices);
const createCrescentBufferInfo = createBufferInfoFunc(createCrescentVertices);
const createCrescentBuffers = createBufferFunc(createCrescentVertices);
const createCylinderBufferInfo = createBufferInfoFunc(createCylinderVertices);
const createCylinderBuffers = createBufferFunc(createCylinderVertices);
const createTorusBufferInfo = createBufferInfoFunc(createTorusVertices);
const createTorusBuffers = createBufferFunc(createTorusVertices);
const createDiscBufferInfo = createBufferInfoFunc(createDiscVertices);
const createDiscBuffers = createBufferFunc(createDiscVertices);

// these were mis-spelled until 4.12
const createCresentBufferInfo = createCrescentBufferInfo;
const createCresentBuffers = createCrescentBuffers;
const createCresentVertices = createCrescentVertices;

var primitives = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create3DFBufferInfo: create3DFBufferInfo,
  create3DFBuffers: create3DFBuffers,
  create3DFVertices: create3DFVertices,
  createAugmentedTypedArray: createAugmentedTypedArray,
  createCubeBufferInfo: createCubeBufferInfo,
  createCubeBuffers: createCubeBuffers,
  createCubeVertices: createCubeVertices,
  createPlaneBufferInfo: createPlaneBufferInfo,
  createPlaneBuffers: createPlaneBuffers,
  createPlaneVertices: createPlaneVertices,
  createSphereBufferInfo: createSphereBufferInfo,
  createSphereBuffers: createSphereBuffers,
  createSphereVertices: createSphereVertices,
  createTruncatedConeBufferInfo: createTruncatedConeBufferInfo,
  createTruncatedConeBuffers: createTruncatedConeBuffers,
  createTruncatedConeVertices: createTruncatedConeVertices,
  createXYQuadBufferInfo: createXYQuadBufferInfo,
  createXYQuadBuffers: createXYQuadBuffers,
  createXYQuadVertices: createXYQuadVertices,
  createCresentBufferInfo: createCresentBufferInfo,
  createCresentBuffers: createCresentBuffers,
  createCresentVertices: createCresentVertices,
  createCrescentBufferInfo: createCrescentBufferInfo,
  createCrescentBuffers: createCrescentBuffers,
  createCrescentVertices: createCrescentVertices,
  createCylinderBufferInfo: createCylinderBufferInfo,
  createCylinderBuffers: createCylinderBuffers,
  createCylinderVertices: createCylinderVertices,
  createTorusBufferInfo: createTorusBufferInfo,
  createTorusBuffers: createTorusBuffers,
  createTorusVertices: createTorusVertices,
  createDiscBufferInfo: createDiscBufferInfo,
  createDiscBuffers: createDiscBuffers,
  createDiscVertices: createDiscVertices,
  deindexVertices: deindexVertices,
  flattenNormals: flattenNormals,
  makeRandomVertexColors: makeRandomVertexColors,
  reorientDirections: reorientDirections,
  reorientNormals: reorientNormals,
  reorientPositions: reorientPositions,
  reorientVertices: reorientVertices,
  concatVertices: concatVertices,
  duplicateVertices: duplicateVertices
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * Gets the gl version as a number
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {number} version of gl
 * @private
 */
//function getVersionAsNumber(gl) {
//  return parseFloat(gl.getParameter(gl.VERSION).substr(6));
//}

/**
 * Check if context is WebGL 2.0
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {bool} true if it's WebGL 2.0
 * @memberOf module:twgl
 */
function isWebGL2(gl) {
  // This is the correct check but it's slow
  //  return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0") === 0;
  // This might also be the correct check but I'm assuming it's slow-ish
  // return gl instanceof WebGL2RenderingContext;
  return !!gl.texStorage2D;
}

/**
 * Check if context is WebGL 1.0
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {bool} true if it's WebGL 1.0
 * @memberOf module:twgl
 */
function isWebGL1(gl) {
  // This is the correct check but it's slow
  // const version = getVersionAsNumber(gl);
  // return version <= 1.0 && version > 0.0;  // because as of 2016/5 Edge returns 0.96
  // This might also be the correct check but I'm assuming it's slow-ish
  // return gl instanceof WebGLRenderingContext;
  return !gl.texStorage2D;
}

/**
 * Gets a string for WebGL enum
 *
 * Note: Several enums are the same. Without more
 * context (which function) it's impossible to always
 * give the correct enum. As it is, for matching values
 * it gives all enums. Checking the WebGL2RenderingContext
 * that means
 *
 *      0     = ZERO | POINT | NONE | NO_ERROR
 *      1     = ONE | LINES | SYNC_FLUSH_COMMANDS_BIT
 *      32777 = BLEND_EQUATION_RGB | BLEND_EQUATION_RGB
 *      36662 = COPY_READ_BUFFER | COPY_READ_BUFFER_BINDING
 *      36663 = COPY_WRITE_BUFFER | COPY_WRITE_BUFFER_BINDING
 *      36006 = FRAMEBUFFER_BINDING | DRAW_FRAMEBUFFER_BINDING
 *
 * It's also not useful for bits really unless you pass in individual bits.
 * In other words
 *
 *     const bits = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
 *     twgl.glEnumToString(gl, bits);  // not going to work
 *
 * Note that some enums only exist on extensions. If you
 * want them to show up you need to pass the extension at least
 * once. For example
 *
 *     const ext = gl.getExtension('WEBGL_compressed_texture_s3tc');
 *     if (ext) {
 *        twgl.glEnumToString(ext, 0);  // just prime the function
 *
 *        ..later..
 *
 *        const internalFormat = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
 *        console.log(twgl.glEnumToString(gl, internalFormat));
 *
 * Notice I didn't have to pass the extension the second time. This means
 * you can have place that generically gets an enum for texture formats for example.
 * and as long as you primed the function with the extensions
 *
 * If you're using `twgl.addExtensionsToContext` to enable your extensions
 * then twgl will automatically get the extension's enums.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext or any extension object
 * @param {number} value the value of the enum you want to look up.
 * @return {string} enum string or hex value
 * @memberOf module:twgl
 * @function glEnumToString
 */
const glEnumToString = (function() {
  const haveEnumsForType = {};
  const enums = {};

  function addEnums(gl) {
    const type = gl.constructor.name;
    if (!haveEnumsForType[type]) {
      for (const key in gl) {
        if (typeof gl[key] === 'number') {
          const existing = enums[gl[key]];
          enums[gl[key]] = existing ? `${existing} | ${key}` : key;
        }
      }
      haveEnumsForType[type] = true;
    }
  }

  return function glEnumToString(gl, value) {
    addEnums(gl);
    return enums[value] || (typeof value === 'number' ? `0x${value.toString(16)}` : value);
  };
}());

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  glEnumToString: glEnumToString,
  isWebGL1: isWebGL1,
  isWebGL2: isWebGL2
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
const defaults$1 = {
  textureColor: new Uint8Array([128, 192, 255, 255]),
  textureOptions: {},
  crossOrigin: undefined,
};
const isArrayBuffer$1 = isArrayBuffer;

// Should we make this on demand?
const getShared2DContext = function() {
  let s_ctx;
  return function getShared2DContext() {
    s_ctx = s_ctx ||
        ((typeof document !== 'undefined' && document.createElement)
          ? document.createElement("canvas").getContext("2d")
          : null);
    return s_ctx;
  };
}();

// NOTE: Chrome supports 2D canvas in a Worker (behind flag as of v64 but
//       not only does Firefox NOT support it but Firefox freezes immediately
//       if you try to create one instead of just returning null and continuing.
//  : (global.OffscreenCanvas && (new global.OffscreenCanvas(1, 1)).getContext("2d"));  // OffscreenCanvas may not support 2d

// NOTE: We can maybe remove some of the need for the 2d canvas. In WebGL2
// we can use the various unpack settings. Otherwise we could try using
// the ability of an ImageBitmap to be cut. Unfortunately cutting an ImageBitmap
// is async and the current TWGL code expects a non-Async result though that
// might not be a problem. ImageBitmap though is not available in Edge or Safari
// as of 2018-01-02

/* PixelFormat */
const ALPHA                          = 0x1906;
const RGB                            = 0x1907;
const RGBA                           = 0x1908;
const LUMINANCE                      = 0x1909;
const LUMINANCE_ALPHA                = 0x190A;
const DEPTH_COMPONENT                = 0x1902;
const DEPTH_STENCIL                  = 0x84F9;

/* TextureWrapMode */
// const REPEAT                         = 0x2901;
// const MIRRORED_REPEAT                = 0x8370;
const CLAMP_TO_EDGE                  = 0x812f;

/* TextureMagFilter */
const NEAREST                        = 0x2600;
const LINEAR                         = 0x2601;

/* TextureMinFilter */
// const NEAREST_MIPMAP_NEAREST         = 0x2700;
// const LINEAR_MIPMAP_NEAREST          = 0x2701;
// const NEAREST_MIPMAP_LINEAR          = 0x2702;
// const LINEAR_MIPMAP_LINEAR           = 0x2703;

/* Texture Target */
const TEXTURE_2D                     = 0x0de1;
const TEXTURE_CUBE_MAP               = 0x8513;
const TEXTURE_3D                     = 0x806f;
const TEXTURE_2D_ARRAY               = 0x8c1a;

/* Cubemap Targets */
const TEXTURE_CUBE_MAP_POSITIVE_X    = 0x8515;
const TEXTURE_CUBE_MAP_NEGATIVE_X    = 0x8516;
const TEXTURE_CUBE_MAP_POSITIVE_Y    = 0x8517;
const TEXTURE_CUBE_MAP_NEGATIVE_Y    = 0x8518;
const TEXTURE_CUBE_MAP_POSITIVE_Z    = 0x8519;
const TEXTURE_CUBE_MAP_NEGATIVE_Z    = 0x851a;

/* Texture Parameters */
const TEXTURE_MIN_FILTER             = 0x2801;
const TEXTURE_MAG_FILTER             = 0x2800;
const TEXTURE_WRAP_S                 = 0x2802;
const TEXTURE_WRAP_T                 = 0x2803;
const TEXTURE_WRAP_R                 = 0x8072;
const TEXTURE_MIN_LOD                = 0x813a;
const TEXTURE_MAX_LOD                = 0x813b;
const TEXTURE_BASE_LEVEL             = 0x813c;
const TEXTURE_MAX_LEVEL              = 0x813d;


/* Pixel store */
const UNPACK_ALIGNMENT                   = 0x0cf5;
const UNPACK_ROW_LENGTH                  = 0x0cf2;
const UNPACK_IMAGE_HEIGHT                = 0x806e;
const UNPACK_SKIP_PIXELS                 = 0x0cf4;
const UNPACK_SKIP_ROWS                   = 0x0cf3;
const UNPACK_SKIP_IMAGES                 = 0x806d;
const UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;
const UNPACK_PREMULTIPLY_ALPHA_WEBGL     = 0x9241;
const UNPACK_FLIP_Y_WEBGL                = 0x9240;

const R8                           = 0x8229;
const R8_SNORM                     = 0x8F94;
const R16F                         = 0x822D;
const R32F                         = 0x822E;
const R8UI                         = 0x8232;
const R8I                          = 0x8231;
const RG16UI                       = 0x823A;
const RG16I                        = 0x8239;
const RG32UI                       = 0x823C;
const RG32I                        = 0x823B;
const RG8                          = 0x822B;
const RG8_SNORM                    = 0x8F95;
const RG16F                        = 0x822F;
const RG32F                        = 0x8230;
const RG8UI                        = 0x8238;
const RG8I                         = 0x8237;
const R16UI                        = 0x8234;
const R16I                         = 0x8233;
const R32UI                        = 0x8236;
const R32I                         = 0x8235;
const RGB8                         = 0x8051;
const SRGB8                        = 0x8C41;
const RGB565                       = 0x8D62;
const RGB8_SNORM                   = 0x8F96;
const R11F_G11F_B10F               = 0x8C3A;
const RGB9_E5                      = 0x8C3D;
const RGB16F                       = 0x881B;
const RGB32F                       = 0x8815;
const RGB8UI                       = 0x8D7D;
const RGB8I                        = 0x8D8F;
const RGB16UI                      = 0x8D77;
const RGB16I                       = 0x8D89;
const RGB32UI                      = 0x8D71;
const RGB32I                       = 0x8D83;
const RGBA8                        = 0x8058;
const SRGB8_ALPHA8                 = 0x8C43;
const RGBA8_SNORM                  = 0x8F97;
const RGB5_A1                      = 0x8057;
const RGBA4                        = 0x8056;
const RGB10_A2                     = 0x8059;
const RGBA16F                      = 0x881A;
const RGBA32F                      = 0x8814;
const RGBA8UI                      = 0x8D7C;
const RGBA8I                       = 0x8D8E;
const RGB10_A2UI                   = 0x906F;
const RGBA16UI                     = 0x8D76;
const RGBA16I                      = 0x8D88;
const RGBA32I                      = 0x8D82;
const RGBA32UI                     = 0x8D70;

const DEPTH_COMPONENT16            = 0x81A5;
const DEPTH_COMPONENT24            = 0x81A6;
const DEPTH_COMPONENT32F           = 0x8CAC;
const DEPTH32F_STENCIL8            = 0x8CAD;
const DEPTH24_STENCIL8             = 0x88F0;

/* DataType */
const BYTE$2                         = 0x1400;
const UNSIGNED_BYTE$2                = 0x1401;
const SHORT$2                        = 0x1402;
const UNSIGNED_SHORT$2               = 0x1403;
const INT$2                          = 0x1404;
const UNSIGNED_INT$2                 = 0x1405;
const FLOAT$2                        = 0x1406;
const UNSIGNED_SHORT_4_4_4_4$1       = 0x8033;
const UNSIGNED_SHORT_5_5_5_1$1       = 0x8034;
const UNSIGNED_SHORT_5_6_5$1         = 0x8363;
const HALF_FLOAT$1                   = 0x140B;
const HALF_FLOAT_OES               = 0x8D61;  // Thanks Khronos for making this different >:(
const UNSIGNED_INT_2_10_10_10_REV$1  = 0x8368;
const UNSIGNED_INT_10F_11F_11F_REV$1 = 0x8C3B;
const UNSIGNED_INT_5_9_9_9_REV$1     = 0x8C3E;
const FLOAT_32_UNSIGNED_INT_24_8_REV$1 = 0x8DAD;
const UNSIGNED_INT_24_8$1            = 0x84FA;

const RG                           = 0x8227;
const RG_INTEGER                   = 0x8228;
const RED                          = 0x1903;
const RED_INTEGER                  = 0x8D94;
const RGB_INTEGER                  = 0x8D98;
const RGBA_INTEGER                 = 0x8D99;

const formatInfo = {};
{
  // NOTE: this is named `numColorComponents` vs `numComponents` so we can let Uglify mangle
  // the name.
  const f = formatInfo;
  f[ALPHA]           = { numColorComponents: 1, };
  f[LUMINANCE]       = { numColorComponents: 1, };
  f[LUMINANCE_ALPHA] = { numColorComponents: 2, };
  f[RGB]             = { numColorComponents: 3, };
  f[RGBA]            = { numColorComponents: 4, };
  f[RED]             = { numColorComponents: 1, };
  f[RED_INTEGER]     = { numColorComponents: 1, };
  f[RG]              = { numColorComponents: 2, };
  f[RG_INTEGER]      = { numColorComponents: 2, };
  f[RGB]             = { numColorComponents: 3, };
  f[RGB_INTEGER]     = { numColorComponents: 3, };
  f[RGBA]            = { numColorComponents: 4, };
  f[RGBA_INTEGER]    = { numColorComponents: 4, };
  f[DEPTH_COMPONENT] = { numColorComponents: 1, };
  f[DEPTH_STENCIL]   = { numColorComponents: 2, };
}

/**
 * @typedef {Object} TextureFormatDetails
 * @property {number} textureFormat format to pass texImage2D and similar functions.
 * @property {boolean} colorRenderable true if you can render to this format of texture.
 * @property {boolean} textureFilterable true if you can filter the texture, false if you can ony use `NEAREST`.
 * @property {number[]} type Array of possible types you can pass to texImage2D and similar function
 * @property {Object.<number,number>} bytesPerElementMap A map of types to bytes per element
 * @private
 */

let s_textureInternalFormatInfo;
function getTextureInternalFormatInfo(internalFormat) {
  if (!s_textureInternalFormatInfo) {
    // NOTE: these properties need unique names so we can let Uglify mangle the name.
    const t = {};
    // unsized formats
    t[ALPHA]              = { textureFormat: ALPHA,           colorRenderable: true,  textureFilterable: true,  bytesPerElement: [1, 2, 2, 4],        type: [UNSIGNED_BYTE$2, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$2], };
    t[LUMINANCE]          = { textureFormat: LUMINANCE,       colorRenderable: true,  textureFilterable: true,  bytesPerElement: [1, 2, 2, 4],        type: [UNSIGNED_BYTE$2, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$2], };
    t[LUMINANCE_ALPHA]    = { textureFormat: LUMINANCE_ALPHA, colorRenderable: true,  textureFilterable: true,  bytesPerElement: [2, 4, 4, 8],        type: [UNSIGNED_BYTE$2, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$2], };
    t[RGB]                = { textureFormat: RGB,             colorRenderable: true,  textureFilterable: true,  bytesPerElement: [3, 6, 6, 12, 2],    type: [UNSIGNED_BYTE$2, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$2, UNSIGNED_SHORT_5_6_5$1], };
    t[RGBA]               = { textureFormat: RGBA,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4, 8, 8, 16, 2, 2], type: [UNSIGNED_BYTE$2, HALF_FLOAT$1, HALF_FLOAT_OES, FLOAT$2, UNSIGNED_SHORT_4_4_4_4$1, UNSIGNED_SHORT_5_5_5_1$1], };
    t[DEPTH_COMPONENT]    = { textureFormat: DEPTH_COMPONENT, colorRenderable: true,  textureFilterable: false, bytesPerElement: [2, 4],              type: [UNSIGNED_INT$2, UNSIGNED_SHORT$2], };

    // sized formats
    t[R8]                 = { textureFormat: RED,             colorRenderable: true,  textureFilterable: true,  bytesPerElement: [1],        type: [UNSIGNED_BYTE$2], };
    t[R8_SNORM]           = { textureFormat: RED,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [1],        type: [BYTE$2], };
    t[R16F]               = { textureFormat: RED,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [4, 2],     type: [FLOAT$2, HALF_FLOAT$1], };
    t[R32F]               = { textureFormat: RED,             colorRenderable: false, textureFilterable: false, bytesPerElement: [4],        type: [FLOAT$2], };
    t[R8UI]               = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [1],        type: [UNSIGNED_BYTE$2], };
    t[R8I]                = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [1],        type: [BYTE$2], };
    t[R16UI]              = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [2],        type: [UNSIGNED_SHORT$2], };
    t[R16I]               = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [2],        type: [SHORT$2], };
    t[R32UI]              = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_INT$2], };
    t[R32I]               = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [INT$2], };
    t[RG8]                = { textureFormat: RG,              colorRenderable: true,  textureFilterable: true,  bytesPerElement: [2],        type: [UNSIGNED_BYTE$2], };
    t[RG8_SNORM]          = { textureFormat: RG,              colorRenderable: false, textureFilterable: true,  bytesPerElement: [2],        type: [BYTE$2], };
    t[RG16F]              = { textureFormat: RG,              colorRenderable: false, textureFilterable: true,  bytesPerElement: [8, 4],     type: [FLOAT$2, HALF_FLOAT$1], };
    t[RG32F]              = { textureFormat: RG,              colorRenderable: false, textureFilterable: false, bytesPerElement: [8],        type: [FLOAT$2], };
    t[RG8UI]              = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [2],        type: [UNSIGNED_BYTE$2], };
    t[RG8I]               = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [2],        type: [BYTE$2], };
    t[RG16UI]             = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_SHORT$2], };
    t[RG16I]              = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [SHORT$2], };
    t[RG32UI]             = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [8],        type: [UNSIGNED_INT$2], };
    t[RG32I]              = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [8],        type: [INT$2], };
    t[RGB8]               = { textureFormat: RGB,             colorRenderable: true,  textureFilterable: true,  bytesPerElement: [3],        type: [UNSIGNED_BYTE$2], };
    t[SRGB8]              = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [3],        type: [UNSIGNED_BYTE$2], };
    t[RGB565]             = { textureFormat: RGB,             colorRenderable: true,  textureFilterable: true,  bytesPerElement: [3, 2],     type: [UNSIGNED_BYTE$2, UNSIGNED_SHORT_5_6_5$1], };
    t[RGB8_SNORM]         = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [3],        type: [BYTE$2], };
    t[R11F_G11F_B10F]     = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [12, 6, 4], type: [FLOAT$2, HALF_FLOAT$1, UNSIGNED_INT_10F_11F_11F_REV$1], };
    t[RGB9_E5]            = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [12, 6, 4], type: [FLOAT$2, HALF_FLOAT$1, UNSIGNED_INT_5_9_9_9_REV$1], };
    t[RGB16F]             = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [12, 6],    type: [FLOAT$2, HALF_FLOAT$1], };
    t[RGB32F]             = { textureFormat: RGB,             colorRenderable: false, textureFilterable: false, bytesPerElement: [12],       type: [FLOAT$2], };
    t[RGB8UI]             = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [3],        type: [UNSIGNED_BYTE$2], };
    t[RGB8I]              = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [3],        type: [BYTE$2], };
    t[RGB16UI]            = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [6],        type: [UNSIGNED_SHORT$2], };
    t[RGB16I]             = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [6],        type: [SHORT$2], };
    t[RGB32UI]            = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [12],       type: [UNSIGNED_INT$2], };
    t[RGB32I]             = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [12],       type: [INT$2], };
    t[RGBA8]              = { textureFormat: RGBA,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4],        type: [UNSIGNED_BYTE$2], };
    t[SRGB8_ALPHA8]       = { textureFormat: RGBA,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4],        type: [UNSIGNED_BYTE$2], };
    t[RGBA8_SNORM]        = { textureFormat: RGBA,            colorRenderable: false, textureFilterable: true,  bytesPerElement: [4],        type: [BYTE$2], };
    t[RGB5_A1]            = { textureFormat: RGBA,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4, 2, 4],  type: [UNSIGNED_BYTE$2, UNSIGNED_SHORT_5_5_5_1$1, UNSIGNED_INT_2_10_10_10_REV$1], };
    t[RGBA4]              = { textureFormat: RGBA,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4, 2],     type: [UNSIGNED_BYTE$2, UNSIGNED_SHORT_4_4_4_4$1], };
    t[RGB10_A2]           = { textureFormat: RGBA,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4],        type: [UNSIGNED_INT_2_10_10_10_REV$1], };
    t[RGBA16F]            = { textureFormat: RGBA,            colorRenderable: false, textureFilterable: true,  bytesPerElement: [16, 8],    type: [FLOAT$2, HALF_FLOAT$1], };
    t[RGBA32F]            = { textureFormat: RGBA,            colorRenderable: false, textureFilterable: false, bytesPerElement: [16],       type: [FLOAT$2], };
    t[RGBA8UI]            = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_BYTE$2], };
    t[RGBA8I]             = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [BYTE$2], };
    t[RGB10_A2UI]         = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_INT_2_10_10_10_REV$1], };
    t[RGBA16UI]           = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [8],        type: [UNSIGNED_SHORT$2], };
    t[RGBA16I]            = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [8],        type: [SHORT$2], };
    t[RGBA32I]            = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [16],       type: [INT$2], };
    t[RGBA32UI]           = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [16],       type: [UNSIGNED_INT$2], };
    // Sized Internal
    t[DEPTH_COMPONENT16]  = { textureFormat: DEPTH_COMPONENT, colorRenderable: true,  textureFilterable: false, bytesPerElement: [2, 4],     type: [UNSIGNED_SHORT$2, UNSIGNED_INT$2], };
    t[DEPTH_COMPONENT24]  = { textureFormat: DEPTH_COMPONENT, colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_INT$2], };
    t[DEPTH_COMPONENT32F] = { textureFormat: DEPTH_COMPONENT, colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [FLOAT$2], };
    t[DEPTH24_STENCIL8]   = { textureFormat: DEPTH_STENCIL,   colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_INT_24_8$1], };
    t[DEPTH32F_STENCIL8]  = { textureFormat: DEPTH_STENCIL,   colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [FLOAT_32_UNSIGNED_INT_24_8_REV$1], };

    Object.keys(t).forEach(function(internalFormat) {
      const info = t[internalFormat];
      info.bytesPerElementMap = {};
      info.bytesPerElement.forEach(function(bytesPerElement, ndx) {
        const type = info.type[ndx];
        info.bytesPerElementMap[type] = bytesPerElement;
      });
    });
    s_textureInternalFormatInfo = t;
  }
  return s_textureInternalFormatInfo[internalFormat];
}

/**
 * Gets the number of bytes per element for a given internalFormat / type
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @param {number} type The type parameter for texImage2D etc..
 * @return {number} the number of bytes per element for the given internalFormat, type combo
 * @memberOf module:twgl/textures
 */
function getBytesPerElementForInternalFormat(internalFormat, type) {
  const info = getTextureInternalFormatInfo(internalFormat);
  if (!info) {
    throw "unknown internal format";
  }
  const bytesPerElement = info.bytesPerElementMap[type];
  if (bytesPerElement === undefined) {
    throw "unknown internal format";
  }
  return bytesPerElement;
}

/**
 * Info related to a specific texture internalFormat as returned
 * from {@link module:twgl/textures.getFormatAndTypeForInternalFormat}.
 *
 * @typedef {Object} TextureFormatInfo
 * @property {number} format Format to pass to texImage2D and related functions
 * @property {number} type Type to pass to texImage2D and related functions
 * @memberOf module:twgl/textures
 */

/**
 * Gets the format and type for a given internalFormat
 *
 * @param {number} internalFormat The internal format
 * @return {module:twgl/textures.TextureFormatInfo} the corresponding format and type,
 * @memberOf module:twgl/textures
 */
function getFormatAndTypeForInternalFormat(internalFormat) {
  const info = getTextureInternalFormatInfo(internalFormat);
  if (!info) {
    throw "unknown internal format";
  }
  return {
    format: info.textureFormat,
    type: info.type[0],
  };
}

/**
 * Returns true if value is power of 2
 * @param {number} value number to check.
 * @return true if value is power of 2
 * @private
 */
function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}

/**
 * Gets whether or not we can generate mips for the given
 * internal format.
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {number} width The width parameter from texImage2D etc..
 * @param {number} height The height parameter from texImage2D etc..
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @return {boolean} true if we can generate mips
 * @memberOf module:twgl/textures
 */
function canGenerateMipmap(gl, width, height, internalFormat) {
  if (!isWebGL2(gl)) {
    return isPowerOf2(width) && isPowerOf2(height);
  }
  const info = getTextureInternalFormatInfo(internalFormat);
  if (!info) {
    throw "unknown internal format";
  }
  return info.colorRenderable && info.textureFilterable;
}

/**
 * Gets whether or not we can generate mips for the given format
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @return {boolean} true if we can generate mips
 * @memberOf module:twgl/textures
 */
function canFilter(internalFormat) {
  const info = getTextureInternalFormatInfo(internalFormat);
  if (!info) {
    throw "unknown internal format";
  }
  return info.textureFilterable;
}

/**
 * Gets the number of components for a given image format.
 * @param {number} format the format.
 * @return {number} the number of components for the format.
 * @memberOf module:twgl/textures
 */
function getNumComponentsForFormat(format) {
  const info = formatInfo[format];
  if (!info) {
    throw "unknown format: " + format;
  }
  return info.numColorComponents;
}

/**
 * Gets the texture type for a given array type.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @return {number} the gl texture type
 * @private
 */
function getTextureTypeForArrayType(gl, src, defaultType) {
  if (isArrayBuffer$1(src)) {
    return getGLTypeForTypedArray(src);
  }
  return defaultType || UNSIGNED_BYTE$2;
}

function guessDimensions(gl, target, width, height, numElements) {
  if (numElements % 1 !== 0) {
    throw "can't guess dimensions";
  }
  if (!width && !height) {
    const size = Math.sqrt(numElements / (target === TEXTURE_CUBE_MAP ? 6 : 1));
    if (size % 1 === 0) {
      width = size;
      height = size;
    } else {
      width = numElements;
      height = 1;
    }
  } else if (!height) {
    height = numElements / width;
    if (height % 1) {
      throw "can't guess dimensions";
    }
  } else if (!width) {
    width = numElements / height;
    if (width % 1) {
      throw "can't guess dimensions";
    }
  }
  return {
    width: width,
    height: height,
  };
}

/**
 * Sets the default texture color.
 *
 * The default texture color is used when loading textures from
 * urls. Because the URL will be loaded async we'd like to be
 * able to use the texture immediately. By putting a 1x1 pixel
 * color in the texture we can start using the texture before
 * the URL has loaded.
 *
 * @param {number[]} color Array of 4 values in the range 0 to 1
 * @deprecated see {@link module:twgl.setDefaults}
 * @memberOf module:twgl/textures
 */
function setDefaultTextureColor(color) {
  defaults$1.textureColor = new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
}

function setDefaults$1(newDefaults) {
  copyExistingProperties(newDefaults, defaults$1);
  if (newDefaults.textureColor) {
    setDefaultTextureColor(newDefaults.textureColor);
  }
}

/**
 * A function to generate the source for a texture.
 * @callback TextureFunc
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options the texture options
 * @return {*} Returns any of the things documented for `src` for {@link module:twgl.TextureOptions}.
 * @memberOf module:twgl
 */

/**
 * Texture options passed to most texture functions. Each function will use whatever options
 * are appropriate for its needs. This lets you pass the same options to all functions.
 *
 * Note: A `TexImageSource` is defined in the WebGL spec as a `HTMLImageElement`, `HTMLVideoElement`,
 * `HTMLCanvasElement`, `ImageBitmap`, or `ImageData`.
 *
 * @typedef {Object} TextureOptions
 * @property {number} [target] the type of texture `gl.TEXTURE_2D` or `gl.TEXTURE_CUBE_MAP`. Defaults to `gl.TEXTURE_2D`.
 * @property {number} [level] the mip level to affect. Defaults to 0. Note, if set auto will be considered false unless explicitly set to true.
 * @property {number} [width] the width of the texture. Only used if src is an array or typed array or null.
 * @property {number} [height] the height of a texture. Only used if src is an array or typed array or null.
 * @property {number} [depth] the depth of a texture. Only used if src is an array or type array or null and target is `TEXTURE_3D` .
 * @property {number} [min] the min filter setting (eg. `gl.LINEAR`). Defaults to `gl.NEAREST_MIPMAP_LINEAR`
 *     or if texture is not a power of 2 on both dimensions then defaults to `gl.LINEAR`.
 * @property {number} [mag] the mag filter setting (eg. `gl.LINEAR`). Defaults to `gl.LINEAR`
 * @property {number} [minMag] both the min and mag filter settings.
 * @property {number} [internalFormat] internal format for texture. Defaults to `gl.RGBA`
 * @property {number} [format] format for texture. Defaults to `gl.RGBA`.
 * @property {number} [type] type for texture. Defaults to `gl.UNSIGNED_BYTE` unless `src` is ArrayBufferView. If `src`
 *     is ArrayBufferView defaults to type that matches ArrayBufferView type.
 * @property {number} [wrap] Texture wrapping for both S and T (and R if TEXTURE_3D or WebGLSampler). Defaults to `gl.REPEAT` for 2D unless src is WebGL1 and src not npot and `gl.CLAMP_TO_EDGE` for cube
 * @property {number} [wrapS] Texture wrapping for S. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [wrapT] Texture wrapping for T. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [wrapR] Texture wrapping for R. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [minLod] TEXTURE_MIN_LOD setting
 * @property {number} [maxLod] TEXTURE_MAX_LOD setting
 * @property {number} [baseLevel] TEXTURE_BASE_LEVEL setting
 * @property {number} [maxLevel] TEXTURE_MAX_LEVEL setting
 * @property {number} [unpackAlignment] The `gl.UNPACK_ALIGNMENT` used when uploading an array. Defaults to 1.
 * @property {number[]|ArrayBufferView} [color] Color to initialize this texture with if loading an image asynchronously.
 *     The default use a blue 1x1 pixel texture. You can set another default by calling `twgl.setDefaults`
 *     or you can set an individual texture's initial color by setting this property. Example: `[1, .5, .5, 1]` = pink
 * @property {number} [premultiplyAlpha] Whether or not to premultiply alpha. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {number} [flipY] Whether or not to flip the texture vertically on upload. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {number} [colorspaceConversion] Whether or not to let the browser do colorspace conversion of the texture on upload. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {boolean} [auto] If `undefined` or `true`, in WebGL1, texture filtering is set automatically for non-power of 2 images and
 *    mips are generated for power of 2 images. In WebGL2 mips are generated if they can be. Note: if `level` is set above
 *    then then `auto` is assumed to be `false` unless explicity set to `true`.
 * @property {number[]} [cubeFaceOrder] The order that cube faces are pulled out of an img or set of images. The default is
 *
 *     [gl.TEXTURE_CUBE_MAP_POSITIVE_X,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
 *      gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
 *      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]
 *
 * @property {(number[]|ArrayBufferView|TexImageSource|TexImageSource[]|string|string[]|module:twgl.TextureFunc)} [src] source for texture
 *
 *    If `string` then it's assumed to be a URL to an image. The image will be downloaded async. A usable
 *    1x1 pixel texture will be returned immediately. The texture will be updated once the image has downloaded.
 *    If `target` is `gl.TEXTURE_CUBE_MAP` will attempt to divide image into 6 square pieces. 1x6, 6x1, 3x2, 2x3.
 *    The pieces will be uploaded in `cubeFaceOrder`
 *
 *    If `string[]` or `TexImageSource[]` and target is `gl.TEXTURE_CUBE_MAP` then it must have 6 entries, one for each face of a cube map.
 *
 *    If `string[]` or `TexImageSource[]` and target is `gl.TEXTURE_2D_ARRAY` then each entry is a slice of the a 2d array texture
 *    and will be scaled to the specified width and height OR to the size of the first image that loads.
 *
 *    If `TexImageSource` then it wil be used immediately to create the contents of the texture. Examples `HTMLImageElement`,
 *    `HTMLCanvasElement`, `HTMLVideoElement`.
 *
 *    If `number[]` or `ArrayBufferView` it's assumed to be data for a texture. If `width` or `height` is
 *    not specified it is guessed as follows. First the number of elements is computed by `src.length / numComponents`
 *    where `numComponents` is derived from `format`. If `target` is `gl.TEXTURE_CUBE_MAP` then `numElements` is divided
 *    by 6. Then
 *
 *    *   If neither `width` nor `height` are specified and `sqrt(numElements)` is an integer then width and height
 *        are set to `sqrt(numElements)`. Otherwise `width = numElements` and `height = 1`.
 *
 *    *   If only one of `width` or `height` is specified then the other equals `numElements / specifiedDimension`.
 *
 * If `number[]` will be converted to `type`.
 *
 * If `src` is a function it will be called with a `WebGLRenderingContext` and these options.
 * Whatever it returns is subject to these rules. So it can return a string url, an `HTMLElement`
 * an array etc...
 *
 * If `src` is undefined then an empty texture will be created of size `width` by `height`.
 *
 * @property {string} [crossOrigin] What to set the crossOrigin property of images when they are downloaded.
 *    default: undefined. Also see {@link module:twgl.setDefaults}.
 *
 * @memberOf module:twgl
 */

/**
 * Sets any packing state that will be set based on the options.
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @private
 */
function setPackState(gl, options) {
  if (options.colorspaceConversion !== undefined) {
    gl.pixelStorei(UNPACK_COLORSPACE_CONVERSION_WEBGL, options.colorspaceConversion);
  }
  if (options.premultiplyAlpha !== undefined) {
    gl.pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.premultiplyAlpha);
  }
  if (options.flipY !== undefined) {
    gl.pixelStorei(UNPACK_FLIP_Y_WEBGL, options.flipY);
  }
}

/**
 * Set skip state to defaults
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @private
 */
function setSkipStateToDefault(gl) {
  gl.pixelStorei(UNPACK_ALIGNMENT, 4);
  if (isWebGL2(gl)) {
    gl.pixelStorei(UNPACK_ROW_LENGTH, 0);
    gl.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
    gl.pixelStorei(UNPACK_SKIP_PIXELS, 0);
    gl.pixelStorei(UNPACK_SKIP_ROWS, 0);
    gl.pixelStorei(UNPACK_SKIP_IMAGES, 0);
  }
}

/**
 * Sets the parameters of a texture or sampler
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {number|WebGLSampler} target texture target or sampler
 * @param {function()} parameteriFn texParameteri or samplerParameteri fn
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @private
 */
function setTextureSamplerParameters(gl, target, parameteriFn, options) {
  if (options.minMag) {
    parameteriFn.call(gl, target, TEXTURE_MIN_FILTER, options.minMag);
    parameteriFn.call(gl, target, TEXTURE_MAG_FILTER, options.minMag);
  }
  if (options.min) {
    parameteriFn.call(gl, target, TEXTURE_MIN_FILTER, options.min);
  }
  if (options.mag) {
    parameteriFn.call(gl, target, TEXTURE_MAG_FILTER, options.mag);
  }
  if (options.wrap) {
    parameteriFn.call(gl, target, TEXTURE_WRAP_S, options.wrap);
    parameteriFn.call(gl, target, TEXTURE_WRAP_T, options.wrap);
    if (target === TEXTURE_3D || isSampler(gl, target)) {
      parameteriFn.call(gl, target, TEXTURE_WRAP_R, options.wrap);
    }
  }
  if (options.wrapR) {
    parameteriFn.call(gl, target, TEXTURE_WRAP_R, options.wrapR);
  }
  if (options.wrapS) {
    parameteriFn.call(gl, target, TEXTURE_WRAP_S, options.wrapS);
  }
  if (options.wrapT) {
    parameteriFn.call(gl, target, TEXTURE_WRAP_T, options.wrapT);
  }
  if (options.minLod) {
    parameteriFn.call(gl, target, TEXTURE_MIN_LOD, options.minLod);
  }
  if (options.maxLod) {
    parameteriFn.call(gl, target, TEXTURE_MAX_LOD, options.maxLod);
  }
  if (options.baseLevel) {
    parameteriFn.call(gl, target, TEXTURE_BASE_LEVEL, options.baseLevel);
  }
  if (options.maxLevel) {
    parameteriFn.call(gl, target, TEXTURE_MAX_LEVEL, options.maxLevel);
  }
}

/**
 * Sets the texture parameters of a texture.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 */
function setTextureParameters(gl, tex, options) {
  const target = options.target || TEXTURE_2D;
  gl.bindTexture(target, tex);
  setTextureSamplerParameters(gl, target, gl.texParameteri, options);
}

/**
 * Sets the sampler parameters of a sampler.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLSampler} sampler the WebGLSampler to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @memberOf module:twgl/textures
 */
function setSamplerParameters(gl, sampler, options) {
  setTextureSamplerParameters(gl, sampler, gl.samplerParameteri, options);
}

/**
 * Creates a new sampler object and sets parameters.
 *
 * Example:
 *
 *      const sampler = twgl.createSampler(gl, {
 *        minMag: gl.NEAREST,         // sets both TEXTURE_MIN_FILTER and TEXTURE_MAG_FILTER
 *        wrap: gl.CLAMP_TO_NEAREST,  // sets both TEXTURE_WRAP_S and TEXTURE_WRAP_T and TEXTURE_WRAP_R
 *      });
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string,module:twgl.TextureOptions>} options A object of TextureOptions one per sampler.
 * @return {Object.<string,WebGLSampler>} the created samplers by name
 * @private
 */
function createSampler(gl, options) {
  const sampler = gl.createSampler();
  setSamplerParameters(gl, sampler, options);
  return sampler;
}

/**
 * Creates a multiple sampler objects and sets parameters on each.
 *
 * Example:
 *
 *      const samplers = twgl.createSamplers(gl, {
 *        nearest: {
 *          minMag: gl.NEAREST,
 *        },
 *        nearestClampS: {
 *          minMag: gl.NEAREST,
 *          wrapS: gl.CLAMP_TO_NEAREST,
 *        },
 *        linear: {
 *          minMag: gl.LINEAR,
 *        },
 *        nearestClamp: {
 *          minMag: gl.NEAREST,
 *          wrap: gl.CLAMP_TO_EDGE,
 *        },
 *        linearClamp: {
 *          minMag: gl.LINEAR,
 *          wrap: gl.CLAMP_TO_EDGE,
 *        },
 *        linearClampT: {
 *          minMag: gl.LINEAR,
 *          wrapT: gl.CLAMP_TO_EDGE,
 *        },
 *      });
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set on the sampler
 * @private
 */
function createSamplers(gl, samplerOptions) {
  const samplers = {};
  Object.keys(samplerOptions).forEach(function(name) {
    samplers[name] = createSampler(gl, samplerOptions[name]);
  });
  return samplers;
}

/**
 * Makes a 1x1 pixel
 * If no color is passed in uses the default color which can be set by calling `setDefaultTextureColor`.
 * @param {(number[]|ArrayBufferView)} [color] The color using 0-1 values
 * @return {Uint8Array} Unit8Array with color.
 * @private
 */
function make1Pixel(color) {
  color = color || defaults$1.textureColor;
  if (isArrayBuffer$1(color)) {
    return color;
  }
  return new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
}

/**
 * Sets filtering or generates mips for texture based on width or height
 * If width or height is not passed in uses `options.width` and//or `options.height`
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @param {number} [width] width of texture
 * @param {number} [height] height of texture
 * @param {number} [internalFormat] The internalFormat parameter from texImage2D etc..
 * @memberOf module:twgl/textures
 */
function setTextureFilteringForSize(gl, tex, options, width, height, internalFormat) {
  options = options || defaults$1.textureOptions;
  internalFormat = internalFormat || RGBA;
  const target = options.target || TEXTURE_2D;
  width = width || options.width;
  height = height || options.height;
  gl.bindTexture(target, tex);
  if (canGenerateMipmap(gl, width, height, internalFormat)) {
    gl.generateMipmap(target);
  } else {
    const filtering = canFilter(internalFormat) ? LINEAR : NEAREST;
    gl.texParameteri(target, TEXTURE_MIN_FILTER, filtering);
    gl.texParameteri(target, TEXTURE_MAG_FILTER, filtering);
    gl.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
    gl.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
  }
}

function shouldAutomaticallySetTextureFilteringForSize(options) {
  return options.auto === true || (options.auto === undefined && options.level === undefined);
}

/**
 * Gets an array of cubemap face enums
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @return {number[]} cubemap face enums
 * @private
 */
function getCubeFaceOrder(gl, options) {
  options = options || {};
  return options.cubeFaceOrder || [
      TEXTURE_CUBE_MAP_POSITIVE_X,
      TEXTURE_CUBE_MAP_NEGATIVE_X,
      TEXTURE_CUBE_MAP_POSITIVE_Y,
      TEXTURE_CUBE_MAP_NEGATIVE_Y,
      TEXTURE_CUBE_MAP_POSITIVE_Z,
      TEXTURE_CUBE_MAP_NEGATIVE_Z,
    ];
}

/**
 * @typedef {Object} FaceInfo
 * @property {number} face gl enum for texImage2D
 * @property {number} ndx face index (0 - 5) into source data
 * @ignore
 */

/**
 * Gets an array of FaceInfos
 * There's a bug in some NVidia drivers that will crash the driver if
 * `gl.TEXTURE_CUBE_MAP_POSITIVE_X` is not uploaded first. So, we take
 * the user's desired order from his faces to WebGL and make sure we
 * do the faces in WebGL order
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @return {FaceInfo[]} cubemap face infos. Arguably the `face` property of each element is redundant but
 *    it's needed internally to sort the array of `ndx` properties by `face`.
 * @private
 */
function getCubeFacesWithNdx(gl, options) {
  const faces = getCubeFaceOrder(gl, options);
  // work around bug in NVidia drivers. We have to upload the first face first else the driver crashes :(
  const facesWithNdx = faces.map(function(face, ndx) {
    return { face: face, ndx: ndx };
  });
  facesWithNdx.sort(function(a, b) {
    return a.face - b.face;
  });
  return facesWithNdx;
}

/**
 * Set a texture from the contents of an element. Will also set
 * texture filtering or generate mips based on the dimensions of the element
 * unless `options.auto === false`. If `target === gl.TEXTURE_CUBE_MAP` will
 * attempt to slice image into 1x6, 2x3, 3x2, or 6x1 images, one for each face.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {HTMLElement} element a canvas, img, or video element.
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 * @kind function
 */
function setTextureFromElement(gl, tex, element, options) {
  options = options || defaults$1.textureOptions;
  const target = options.target || TEXTURE_2D;
  const level = options.level || 0;
  let width = element.width;
  let height = element.height;
  const internalFormat = options.internalFormat || options.format || RGBA;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || formatType.type;
  setPackState(gl, options);
  gl.bindTexture(target, tex);
  if (target === TEXTURE_CUBE_MAP) {
    // guess the parts
    const imgWidth  = element.width;
    const imgHeight = element.height;
    let size;
    let slices;
    if (imgWidth / 6 === imgHeight) {
      // It's 6x1
      size = imgHeight;
      slices = [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0];
    } else if (imgHeight / 6 === imgWidth) {
      // It's 1x6
      size = imgWidth;
      slices = [0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5];
    } else if (imgWidth / 3 === imgHeight / 2) {
      // It's 3x2
      size = imgWidth / 3;
      slices = [0, 0, 1, 0, 2, 0, 0, 1, 1, 1, 2, 1];
    } else if (imgWidth / 2 === imgHeight / 3) {
      // It's 2x3
      size = imgWidth / 2;
      slices = [0, 0, 1, 0, 0, 1, 1, 1, 0, 2, 1, 2];
    } else {
      throw "can't figure out cube map from element: " + (element.src ? element.src : element.nodeName);
    }
    const ctx = getShared2DContext();
    if (ctx) {
      ctx.canvas.width = size;
      ctx.canvas.height = size;
      width = size;
      height = size;
      getCubeFacesWithNdx(gl, options).forEach(function(f) {
        const xOffset = slices[f.ndx * 2 + 0] * size;
        const yOffset = slices[f.ndx * 2 + 1] * size;
        ctx.drawImage(element, xOffset, yOffset, size, size, 0, 0, size, size);
        gl.texImage2D(f.face, level, internalFormat, format, type, ctx.canvas);
      });
      // Free up the canvas memory
      ctx.canvas.width = 1;
      ctx.canvas.height = 1;
    } else if (typeof createImageBitmap !== 'undefined') {
      // NOTE: It seems like we should prefer ImageBitmap because unlike canvas it's
      // note lossy? (alpha is not premultiplied? although I'm not sure what
      width = size;
      height = size;
      getCubeFacesWithNdx(gl, options).forEach(function(f) {
        const xOffset = slices[f.ndx * 2 + 0] * size;
        const yOffset = slices[f.ndx * 2 + 1] * size;
        // We can't easily use a default texture color here as it would have to match
        // the type across all faces where as with a 2D one there's only one face
        // so we're replacing everything all at once. It also has to be the correct size.
        // On the other hand we need all faces to be the same size so as one face loads
        // the rest match else the texture will be un-renderable.
        gl.texImage2D(f.face, level, internalFormat, size, size, 0, format, type, null);
        createImageBitmap(element, xOffset, yOffset, size, size, {
          premultiplyAlpha: 'none',
          colorSpaceConversion: 'none',
        })
        .then(function(imageBitmap) {
          setPackState(gl, options);
          gl.bindTexture(target, tex);
          gl.texImage2D(f.face, level, internalFormat, format, type, imageBitmap);
          if (shouldAutomaticallySetTextureFilteringForSize(options)) {
            setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
          }
        });
      });
    }
  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
    const smallest = Math.min(element.width, element.height);
    const largest = Math.max(element.width, element.height);
    const depth = largest / smallest;
    if (depth % 1 !== 0) {
      throw "can not compute 3D dimensions of element";
    }
    const xMult = element.width  === largest ? 1 : 0;
    const yMult = element.height === largest ? 1 : 0;
    gl.pixelStorei(UNPACK_ALIGNMENT, 1);
    gl.pixelStorei(UNPACK_ROW_LENGTH, element.width);
    gl.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
    gl.pixelStorei(UNPACK_SKIP_IMAGES, 0);
    gl.texImage3D(target, level, internalFormat, smallest, smallest, smallest, 0, format, type, null);
    for (let d = 0; d < depth; ++d) {
      const srcX = d * smallest * xMult;
      const srcY = d * smallest * yMult;
      gl.pixelStorei(UNPACK_SKIP_PIXELS, srcX);
      gl.pixelStorei(UNPACK_SKIP_ROWS, srcY);
      gl.texSubImage3D(target, level, 0, 0, d, smallest, smallest, 1, format, type, element);
    }
    setSkipStateToDefault(gl);
  } else {
    gl.texImage2D(target, level, internalFormat, format, type, element);
  }
  if (shouldAutomaticallySetTextureFilteringForSize(options)) {
    setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
  }
  setTextureParameters(gl, tex, options);
}

function noop() {
}

/**
 * Checks whether the url's origin is the same so that we can set the `crossOrigin`
 * @param {string} url url to image
 * @returns {boolean} true if the window's origin is the same as image's url
 * @private
 */
function urlIsSameOrigin(url) {
  if (typeof document !== 'undefined') {
    // for IE really
    const a = document.createElement('a');
    a.href = url;
    return a.hostname === location.hostname &&
           a.port     === location.port &&
           a.protocol === location.protocol;
  } else {
    const localOrigin = (new URL(location.href)).origin;
    const urlOrigin = (new URL(url, location.href)).origin;
    return urlOrigin === localOrigin;
  }
}

function setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin) {
  return crossOrigin === undefined && !urlIsSameOrigin(url)
     ? 'anonymous'
     : crossOrigin;
}

/**
 * Loads an image
 * @param {string} url url to image
 * @param {string} crossOrigin
 * @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
 *     if there was an error
 * @return {HTMLImageElement} the image being loaded.
 * @private
 */
function loadImage$1(url, crossOrigin, callback) {
  callback = callback || noop;
  let img;
  crossOrigin = crossOrigin !== undefined ? crossOrigin : defaults$1.crossOrigin;
  crossOrigin = setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin);
  if (typeof Image !== 'undefined') {
    img = new Image();
    if (crossOrigin !== undefined) {
      img.crossOrigin = crossOrigin;
    }

    const clearEventHandlers = function clearEventHandlers() {
      img.removeEventListener('error', onError);  // eslint-disable-line
      img.removeEventListener('load', onLoad);  // eslint-disable-line
      img = null;
    };

    const onError = function onError() {
      const msg = "couldn't load image: " + url;
      error(msg);
      callback(msg, img);
      clearEventHandlers();
    };

    const onLoad = function onLoad() {
      callback(null, img);
      clearEventHandlers();
    };

    img.addEventListener('error', onError);
    img.addEventListener('load', onLoad);
    img.src = url;
    return img;
  } else if (typeof ImageBitmap !== 'undefined') {
    let err;
    let bm;
    const cb = function cb() {
      callback(err, bm);
    };

    const options = {};
    if (crossOrigin) {
      options.mode = 'cors'; // TODO: not sure how to translate image.crossOrigin
    }
    fetch(url, options).then(function(response) {
      if (!response.ok) {
        throw response;
      }
      return response.blob();
    }).then(function(blob) {
      return createImageBitmap(blob, {
        premultiplyAlpha: 'none',
        colorSpaceConversion: 'none',
      });
    }).then(function(bitmap) {
      // not sure if this works. We don't want
      // to catch the user's error. So, call
      // the callback in a timeout so we're
      // not in this scope inside the promise.
      bm = bitmap;
      setTimeout(cb);
    }).catch(function(e) {
      err = e;
      setTimeout(cb);
    });
    img = null;
  }
  return img;
}

/**
 * check if object is a TexImageSource
 *
 * @param {Object} obj Object to test
 * @return {boolean} true if object is a TexImageSource
 * @private
 */
function isTexImageSource(obj) {
  return (typeof ImageBitmap !== 'undefined' && obj instanceof ImageBitmap) ||
         (typeof ImageData !== 'undefined'  && obj instanceof ImageData) ||
         (typeof HTMLElement !== 'undefined'  && obj instanceof HTMLElement);
}

/**
 * if obj is an TexImageSource then just
 * uses it otherwise if obj is a string
 * then load it first.
 *
 * @param {string|TexImageSource} obj
 * @param {string} crossOrigin
 * @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
 *     if there was an error
 * @private
 */
function loadAndUseImage(obj, crossOrigin, callback) {
  if (isTexImageSource(obj)) {
    setTimeout(function() {
      callback(null, obj);
    });
    return obj;
  }

  return loadImage$1(obj, crossOrigin, callback);
}

/**
 * Sets a texture to a 1x1 pixel color. If `options.color === false` is nothing happens. If it's not set
 * the default texture color is used which can be set by calling `setDefaultTextureColor`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 */
function setTextureTo1PixelColor(gl, tex, options) {
  options = options || defaults$1.textureOptions;
  const target = options.target || TEXTURE_2D;
  gl.bindTexture(target, tex);
  if (options.color === false) {
    return;
  }
  // Assume it's a URL
  // Put 1x1 pixels in texture. That makes it renderable immediately regardless of filtering.
  const color = make1Pixel(options.color);
  if (target === TEXTURE_CUBE_MAP) {
    for (let ii = 0; ii < 6; ++ii) {
      gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE$2, color);
    }
  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
    gl.texImage3D(target, 0, RGBA, 1, 1, 1, 0, RGBA, UNSIGNED_BYTE$2, color);
  } else {
    gl.texImage2D(target, 0, RGBA, 1, 1, 0, RGBA, UNSIGNED_BYTE$2, color);
  }
}

/**
 * The src image(s) used to create a texture.
 *
 * When you call {@link module:twgl.createTexture} or {@link module:twgl.createTextures}
 * you can pass in urls for images to load into the textures. If it's a single url
 * then this will be a single HTMLImageElement. If it's an array of urls used for a cubemap
 * this will be a corresponding array of images for the cubemap.
 *
 * @typedef {HTMLImageElement|HTMLImageElement[]} TextureSrc
 * @memberOf module:twgl
 */

/**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback TextureReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} texture the texture.
 * @param {module:twgl.TextureSrc} source image(s) used to as the src for the texture
 * @memberOf module:twgl
 */

/**
 * A callback for when all images have finished downloading and been uploaded into their respective textures
 * @callback TexturesReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {Object.<string, WebGLTexture>} textures the created textures by name. Same as returned by {@link module:twgl.createTextures}.
 * @param {Object.<string, module:twgl.TextureSrc>} sources the image(s) used for the texture by name.
 * @memberOf module:twgl
 */

/**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback CubemapReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} tex the texture.
 * @param {HTMLImageElement[]} imgs the images for each face.
 * @memberOf module:twgl
 */

/**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback ThreeDReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} tex the texture.
 * @param {HTMLImageElement[]} imgs the images for each slice.
 * @memberOf module:twgl
 */

/**
 * Loads a texture from an image from a Url as specified in `options.src`
 * If `options.color !== false` will set the texture to a 1x1 pixel color so that the texture is
 * immediately useable. It will be updated with the contents of the image once the image has finished
 * downloading. Filtering options will be set as appropriate for image unless `options.auto === false`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.TextureReadyCallback} [callback] A function to be called when the image has finished loading. err will
 *    be non null if there was an error.
 * @return {HTMLImageElement} the image being downloaded.
 * @memberOf module:twgl/textures
 */
function loadTextureFromUrl(gl, tex, options, callback) {
  callback = callback || noop;
  options = options || defaults$1.textureOptions;
  setTextureTo1PixelColor(gl, tex, options);
  // Because it's async we need to copy the options.
  options = Object.assign({}, options);
  const img = loadAndUseImage(options.src, options.crossOrigin, function(err, img) {
    if (err) {
      callback(err, tex, img);
    } else {
      setTextureFromElement(gl, tex, img, options);
      callback(null, tex, img);
    }
  });
  return img;
}

/**
 * Loads a cubemap from 6 urls or TexImageSources as specified in `options.src`. Will set the cubemap to a 1x1 pixel color
 * so that it is usable immediately unless `option.color === false`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.CubemapReadyCallback} [callback] A function to be called when all the images have finished loading. err will
 *    be non null if there was an error.
 * @memberOf module:twgl/textures
 */
function loadCubemapFromUrls(gl, tex, options, callback) {
  callback = callback || noop;
  const urls = options.src;
  if (urls.length !== 6) {
    throw "there must be 6 urls for a cubemap";
  }
  const level = options.level || 0;
  const internalFormat = options.internalFormat || options.format || RGBA;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || UNSIGNED_BYTE$2;
  const target = options.target || TEXTURE_2D;
  if (target !== TEXTURE_CUBE_MAP) {
    throw "target must be TEXTURE_CUBE_MAP";
  }
  setTextureTo1PixelColor(gl, tex, options);
  // Because it's async we need to copy the options.
  options = Object.assign({}, options);
  let numToLoad = 6;
  const errors = [];
  const faces = getCubeFaceOrder(gl, options);
  let imgs;  // eslint-disable-line

  function uploadImg(faceTarget) {
    return function(err, img) {
      --numToLoad;
      if (err) {
        errors.push(err);
      } else {
        if (img.width !== img.height) {
          errors.push("cubemap face img is not a square: " + img.src);
        } else {
          setPackState(gl, options);
          gl.bindTexture(target, tex);

          // So assuming this is the first image we now have one face that's img sized
          // and 5 faces that are 1x1 pixel so size the other faces
          if (numToLoad === 5) {
            // use the default order
            getCubeFaceOrder().forEach(function(otherTarget) {
              // Should we re-use the same face or a color?
              gl.texImage2D(otherTarget, level, internalFormat, format, type, img);
            });
          } else {
            gl.texImage2D(faceTarget, level, internalFormat, format, type, img);
          }

          if (shouldAutomaticallySetTextureFilteringForSize(options)) {
            gl.generateMipmap(target);
          }
        }
      }

      if (numToLoad === 0) {
        callback(errors.length ? errors : undefined, tex, imgs);
      }
    };
  }

  imgs = urls.map(function(url, ndx) {
    return loadAndUseImage(url, options.crossOrigin, uploadImg(faces[ndx]));
  });
}

/**
 * Loads a 2d array or 3d texture from urls OR TexImageSources as specified in `options.src`.
 * Will set the texture to a 1x1 pixel color
 * so that it is usable immediately unless `option.color === false`.
 *
 * If the width and height is not specified the width and height of the first
 * image loaded will be used. Note that since images are loaded async
 * which image downloads first is unknown.
 *
 * If an image is not the same size as the width and height it will be scaled
 * to that width and height.
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.ThreeDReadyCallback} [callback] A function to be called when all the images have finished loading. err will
 *    be non null if there was an error.
 * @memberOf module:twgl/textures
 */
function loadSlicesFromUrls(gl, tex, options, callback) {
  callback = callback || noop;
  const urls = options.src;
  const internalFormat = options.internalFormat || options.format || RGBA;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || UNSIGNED_BYTE$2;
  const target = options.target || TEXTURE_2D_ARRAY;
  if (target !== TEXTURE_3D && target !== TEXTURE_2D_ARRAY) {
    throw "target must be TEXTURE_3D or TEXTURE_2D_ARRAY";
  }
  setTextureTo1PixelColor(gl, tex, options);
  // Because it's async we need to copy the options.
  options = Object.assign({}, options);
  let numToLoad = urls.length;
  const errors = [];
  let imgs;  // eslint-disable-line
  const level = options.level || 0;
  let width = options.width;
  let height = options.height;
  const depth = urls.length;
  let firstImage = true;

  function uploadImg(slice) {
    return function(err, img) {
      --numToLoad;
      if (err) {
        errors.push(err);
      } else {
        setPackState(gl, options);
        gl.bindTexture(target, tex);

        if (firstImage) {
          firstImage = false;
          width = options.width || img.width;
          height = options.height || img.height;
          gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);

          // put it in every slice otherwise some slices will be 0,0,0,0
          for (let s = 0; s < depth; ++s) {
            gl.texSubImage3D(target, level, 0, 0, s, width, height, 1, format, type, img);
          }
        } else {
          let src = img;
          let ctx;
          if (img.width !== width || img.height !== height) {
            // Size the image to fix
            ctx = getShared2DContext();
            src = ctx.canvas;
            ctx.canvas.width = width;
            ctx.canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
          }

          gl.texSubImage3D(target, level, 0, 0, slice, width, height, 1, format, type, src);

          // free the canvas memory
          if (ctx && src === ctx.canvas) {
            ctx.canvas.width = 0;
            ctx.canvas.height = 0;
          }
        }

        if (shouldAutomaticallySetTextureFilteringForSize(options)) {
          gl.generateMipmap(target);
        }
      }

      if (numToLoad === 0) {
        callback(errors.length ? errors : undefined, tex, imgs);
      }
    };
  }

  imgs = urls.map(function(url, ndx) {
    return loadAndUseImage(url, options.crossOrigin, uploadImg(ndx));
  });
}

/**
 * Sets a texture from an array or typed array. If the width or height is not provided will attempt to
 * guess the size. See {@link module:twgl.TextureOptions}.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {(number[]|ArrayBufferView)} src An array or typed arry with texture data.
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 */
function setTextureFromArray(gl, tex, src, options) {
  options = options || defaults$1.textureOptions;
  const target = options.target || TEXTURE_2D;
  gl.bindTexture(target, tex);
  let width = options.width;
  let height = options.height;
  let depth = options.depth;
  const level = options.level || 0;
  const internalFormat = options.internalFormat || options.format || RGBA;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || getTextureTypeForArrayType(gl, src, formatType.type);
  if (!isArrayBuffer$1(src)) {
    const Type = getTypedArrayTypeForGLType(type);
    src = new Type(src);
  } else if (src instanceof Uint8ClampedArray) {
    src = new Uint8Array(src.buffer);
  }

  const bytesPerElement = getBytesPerElementForInternalFormat(internalFormat, type);
  const numElements = src.byteLength / bytesPerElement;  // TODO: check UNPACK_ALIGNMENT?
  if (numElements % 1) {
    throw "length wrong size for format: " + glEnumToString(gl, format);
  }
  let dimensions;
  if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
    if (!width && !height && !depth) {
      const size = Math.cbrt(numElements);
      if (size % 1 !== 0) {
        throw "can't guess cube size of array of numElements: " + numElements;
      }
      width = size;
      height = size;
      depth = size;
    } else if (width && (!height || !depth)) {
      dimensions = guessDimensions(gl, target, height, depth, numElements / width);
      height = dimensions.width;
      depth = dimensions.height;
    } else if (height && (!width || !depth)) {
      dimensions = guessDimensions(gl, target, width, depth, numElements / height);
      width = dimensions.width;
      depth = dimensions.height;
    } else {
      dimensions = guessDimensions(gl, target, width, height, numElements / depth);
      width = dimensions.width;
      height = dimensions.height;
    }
  } else {
    dimensions = guessDimensions(gl, target, width, height, numElements);
    width = dimensions.width;
    height = dimensions.height;
  }
  setSkipStateToDefault(gl);
  gl.pixelStorei(UNPACK_ALIGNMENT, options.unpackAlignment || 1);
  setPackState(gl, options);
  if (target === TEXTURE_CUBE_MAP) {
    const elementsPerElement = bytesPerElement / src.BYTES_PER_ELEMENT;
    const faceSize = numElements / 6 * elementsPerElement;

    getCubeFacesWithNdx(gl, options).forEach(f => {
      const offset = faceSize * f.ndx;
      const data = src.subarray(offset, offset + faceSize);
      gl.texImage2D(f.face, level, internalFormat, width, height, 0, format, type, data);
    });
  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
    gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, src);
  } else {
    gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, src);
  }
  return {
    width: width,
    height: height,
    depth: depth,
    type: type,
  };
}

/**
 * Sets a texture with no contents of a certain size. In other words calls `gl.texImage2D` with `null`.
 * You must set `options.width` and `options.height`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @memberOf module:twgl/textures
 */
function setEmptyTexture(gl, tex, options) {
  const target = options.target || TEXTURE_2D;
  gl.bindTexture(target, tex);
  const level = options.level || 0;
  const internalFormat = options.internalFormat || options.format || RGBA;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || formatType.type;
  setPackState(gl, options);
  if (target === TEXTURE_CUBE_MAP) {
    for (let ii = 0; ii < 6; ++ii) {
      gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, options.width, options.height, 0, format, type, null);
    }
  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
    gl.texImage3D(target, level, internalFormat, options.width, options.height, options.depth, 0, format, type, null);
  } else {
    gl.texImage2D(target, level, internalFormat, options.width, options.height, 0, format, type, null);
  }
}

/**
 * Creates a texture based on the options passed in.
 *
 * Note: may reset UNPACK_ALIGNMENT, UNPACK_ROW_LENGTH, UNPACK_IMAGE_HEIGHT, UNPACK_SKIP_IMAGES
 * UNPACK_SKIP_PIXELS, and UNPACK_SKIP_ROWS
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.TextureReadyCallback} [callback] A callback called when an image has been downloaded and uploaded to the texture.
 * @return {WebGLTexture} the created texture.
 * @memberOf module:twgl/textures
 */
function createTexture(gl, options, callback) {
  callback = callback || noop;
  options = options || defaults$1.textureOptions;
  const tex = gl.createTexture();
  const target = options.target || TEXTURE_2D;
  let width  = options.width  || 1;
  let height = options.height || 1;
  const internalFormat = options.internalFormat || RGBA;
  gl.bindTexture(target, tex);
  if (target === TEXTURE_CUBE_MAP) {
    // this should have been the default for cubemaps :(
    gl.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE);
    gl.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE);
  }
  let src = options.src;
  if (src) {
    if (typeof src === "function") {
      src = src(gl, options);
    }
    if (typeof (src) === "string") {
      loadTextureFromUrl(gl, tex, options, callback);
    } else if (isArrayBuffer$1(src) ||
               (Array.isArray(src) && (
                    typeof src[0] === 'number' ||
                    Array.isArray(src[0]) ||
                    isArrayBuffer$1(src[0]))
               )
              ) {
      const dimensions = setTextureFromArray(gl, tex, src, options);
      width  = dimensions.width;
      height = dimensions.height;
    } else if (Array.isArray(src) && (typeof (src[0]) === 'string' || isTexImageSource(src[0]))) {
      if (target === TEXTURE_CUBE_MAP) {
        loadCubemapFromUrls(gl, tex, options, callback);
      } else {
        loadSlicesFromUrls(gl, tex, options, callback);
      }
    } else { // if (isTexImageSource(src))
      setTextureFromElement(gl, tex, src, options);
      width  = src.width;
      height = src.height;
    }
  } else {
    setEmptyTexture(gl, tex, options);
  }
  if (shouldAutomaticallySetTextureFilteringForSize(options)) {
    setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
  }
  setTextureParameters(gl, tex, options);
  return tex;
}

/**
 * Resizes a texture based on the options passed in.
 *
 * Note: This is not a generic resize anything function.
 * It's mostly used by {@link module:twgl.resizeFramebufferInfo}
 * It will use `options.src` if it exists to try to determine a `type`
 * otherwise it will assume `gl.UNSIGNED_BYTE`. No data is provided
 * for the texture. Texture parameters will be set accordingly
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the texture to resize
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {number} [width] the new width. If not passed in will use `options.width`
 * @param {number} [height] the new height. If not passed in will use `options.height`
 * @param {number} [depth] the new depth. If not passed in will use `options.depth`
 * @memberOf module:twgl/textures
 */
function resizeTexture(gl, tex, options, width, height, depth) {
  width = width || options.width;
  height = height || options.height;
  depth = depth || options.depth;
  const target = options.target || TEXTURE_2D;
  gl.bindTexture(target, tex);
  const level = options.level || 0;
  const internalFormat = options.internalFormat || options.format || RGBA;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  let type;
  const src = options.src;
  if (!src) {
    type = options.type || formatType.type;
  } else if (isArrayBuffer$1(src) || (Array.isArray(src) && typeof (src[0]) === 'number')) {
    type = options.type || getTextureTypeForArrayType(gl, src, formatType.type);
  } else {
    type = options.type || formatType.type;
  }
  if (target === TEXTURE_CUBE_MAP) {
    for (let ii = 0; ii < 6; ++ii) {
      gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, width, height, 0, format, type, null);
    }
  } else if (target === TEXTURE_3D || target === TEXTURE_2D_ARRAY) {
    gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
  } else {
    gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
  }
}

/**
 * Check if a src is an async request.
 * if src is a string we're going to download an image
 * if src is an array of strings we're going to download cubemap images
 * @param {*} src The src from a TextureOptions
 * @returns {bool} true if src is async.
 * @private
 */
function isAsyncSrc(src) {
  return typeof src === 'string' ||
         (Array.isArray(src) && typeof src[0] === 'string');
}

/**
 * Creates a bunch of textures based on the passed in options.
 *
 * Example:
 *
 *     const textures = twgl.createTextures(gl, {
 *       // a power of 2 image
 *       hftIcon: { src: "images/hft-icon-16.png", mag: gl.NEAREST },
 *       // a non-power of 2 image
 *       clover: { src: "images/clover.jpg" },
 *       // From a canvas
 *       fromCanvas: { src: ctx.canvas },
 *       // A cubemap from 6 images
 *       yokohama: {
 *         target: gl.TEXTURE_CUBE_MAP,
 *         src: [
 *           'images/yokohama/posx.jpg',
 *           'images/yokohama/negx.jpg',
 *           'images/yokohama/posy.jpg',
 *           'images/yokohama/negy.jpg',
 *           'images/yokohama/posz.jpg',
 *           'images/yokohama/negz.jpg',
 *         ],
 *       },
 *       // A cubemap from 1 image (can be 1x6, 2x3, 3x2, 6x1)
 *       goldengate: {
 *         target: gl.TEXTURE_CUBE_MAP,
 *         src: 'images/goldengate.jpg',
 *       },
 *       // A 2x2 pixel texture from a JavaScript array
 *       checker: {
 *         mag: gl.NEAREST,
 *         min: gl.LINEAR,
 *         src: [
 *           255,255,255,255,
 *           192,192,192,255,
 *           192,192,192,255,
 *           255,255,255,255,
 *         ],
 *       },
 *       // a 1x2 pixel texture from a typed array.
 *       stripe: {
 *         mag: gl.NEAREST,
 *         min: gl.LINEAR,
 *         format: gl.LUMINANCE,
 *         src: new Uint8Array([
 *           255,
 *           128,
 *           255,
 *           128,
 *           255,
 *           128,
 *           255,
 *           128,
 *         ]),
 *         width: 1,
 *       },
 *     });
 *
 * Now
 *
 * *   `textures.hftIcon` will be a 2d texture
 * *   `textures.clover` will be a 2d texture
 * *   `textures.fromCanvas` will be a 2d texture
 * *   `textures.yohohama` will be a cubemap texture
 * *   `textures.goldengate` will be a cubemap texture
 * *   `textures.checker` will be a 2d texture
 * *   `textures.stripe` will be a 2d texture
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string,module:twgl.TextureOptions>} options A object of TextureOptions one per texture.
 * @param {module:twgl.TexturesReadyCallback} [callback] A callback called when all textures have been downloaded.
 * @return {Object.<string,WebGLTexture>} the created textures by name
 * @memberOf module:twgl/textures
 */
function createTextures(gl, textureOptions, callback) {
  callback = callback || noop;
  let numDownloading = 0;
  const errors = [];
  const textures = {};
  const images = {};

  function callCallbackIfReady() {
    if (numDownloading === 0) {
      setTimeout(function() {
        callback(errors.length ? errors : undefined, textures, images);
      }, 0);
    }
  }

  Object.keys(textureOptions).forEach(function(name) {
    const options = textureOptions[name];
    let onLoadFn;
    if (isAsyncSrc(options.src)) {
      onLoadFn = function(err, tex, img) {
        images[name] = img;
        --numDownloading;
        if (err) {
          errors.push(err);
        }
        callCallbackIfReady();
      };
      ++numDownloading;
    }
    textures[name] = createTexture(gl, options, onLoadFn);
  });

  // queue the callback if there are no images to download.
  // We do this because if your code is structured to wait for
  // images to download but then you comment out all the async
  // images your code would break.
  callCallbackIfReady();

  return textures;
}

var textures = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setTextureDefaults_: setDefaults$1,
  createSampler: createSampler,
  createSamplers: createSamplers,
  setSamplerParameters: setSamplerParameters,
  createTexture: createTexture,
  setEmptyTexture: setEmptyTexture,
  setTextureFromArray: setTextureFromArray,
  loadTextureFromUrl: loadTextureFromUrl,
  setTextureFromElement: setTextureFromElement,
  setTextureFilteringForSize: setTextureFilteringForSize,
  setTextureParameters: setTextureParameters,
  setDefaultTextureColor: setDefaultTextureColor,
  createTextures: createTextures,
  resizeTexture: resizeTexture,
  canGenerateMipmap: canGenerateMipmap,
  canFilter: canFilter,
  getNumComponentsForFormat: getNumComponentsForFormat,
  getBytesPerElementForInternalFormat: getBytesPerElementForInternalFormat,
  getFormatAndTypeForInternalFormat: getFormatAndTypeForInternalFormat
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * Low level shader program related functions
 *
 * You should generally not need to use these functions. They are provided
 * for those cases where you're doing something out of the ordinary
 * and you need lower level access.
 *
 * For backward compatibility they are available at both `twgl.programs` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/programs
 */

const error$1 = error;
const warn$1 = warn;
function getElementById(id) {
  return (typeof document !== 'undefined' && document.getElementById)
      ? document.getElementById(id)
      : null;
}

const TEXTURE0                       = 0x84c0;
const DYNAMIC_DRAW                   = 0x88e8;

const ARRAY_BUFFER$1                   = 0x8892;
const ELEMENT_ARRAY_BUFFER$1           = 0x8893;
const UNIFORM_BUFFER                 = 0x8a11;
const TRANSFORM_FEEDBACK_BUFFER      = 0x8c8e;

const TRANSFORM_FEEDBACK             = 0x8e22;

const COMPILE_STATUS                 = 0x8b81;
const LINK_STATUS                    = 0x8b82;
const FRAGMENT_SHADER                = 0x8b30;
const VERTEX_SHADER                  = 0x8b31;
const SEPARATE_ATTRIBS               = 0x8c8d;

const ACTIVE_UNIFORMS                = 0x8b86;
const ACTIVE_ATTRIBUTES              = 0x8b89;
const TRANSFORM_FEEDBACK_VARYINGS    = 0x8c83;
const ACTIVE_UNIFORM_BLOCKS          = 0x8a36;
const UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER   = 0x8a44;
const UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 0x8a46;
const UNIFORM_BLOCK_DATA_SIZE                     = 0x8a40;
const UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES        = 0x8a43;

const FLOAT$3                         = 0x1406;
const FLOAT_VEC2                    = 0x8B50;
const FLOAT_VEC3                    = 0x8B51;
const FLOAT_VEC4                    = 0x8B52;
const INT$3                           = 0x1404;
const INT_VEC2                      = 0x8B53;
const INT_VEC3                      = 0x8B54;
const INT_VEC4                      = 0x8B55;
const BOOL                          = 0x8B56;
const BOOL_VEC2                     = 0x8B57;
const BOOL_VEC3                     = 0x8B58;
const BOOL_VEC4                     = 0x8B59;
const FLOAT_MAT2                    = 0x8B5A;
const FLOAT_MAT3                    = 0x8B5B;
const FLOAT_MAT4                    = 0x8B5C;
const SAMPLER_2D                    = 0x8B5E;
const SAMPLER_CUBE                  = 0x8B60;
const SAMPLER_3D                    = 0x8B5F;
const SAMPLER_2D_SHADOW             = 0x8B62;
const FLOAT_MAT2x3                  = 0x8B65;
const FLOAT_MAT2x4                  = 0x8B66;
const FLOAT_MAT3x2                  = 0x8B67;
const FLOAT_MAT3x4                  = 0x8B68;
const FLOAT_MAT4x2                  = 0x8B69;
const FLOAT_MAT4x3                  = 0x8B6A;
const SAMPLER_2D_ARRAY              = 0x8DC1;
const SAMPLER_2D_ARRAY_SHADOW       = 0x8DC4;
const SAMPLER_CUBE_SHADOW           = 0x8DC5;
const UNSIGNED_INT$3                  = 0x1405;
const UNSIGNED_INT_VEC2             = 0x8DC6;
const UNSIGNED_INT_VEC3             = 0x8DC7;
const UNSIGNED_INT_VEC4             = 0x8DC8;
const INT_SAMPLER_2D                = 0x8DCA;
const INT_SAMPLER_3D                = 0x8DCB;
const INT_SAMPLER_CUBE              = 0x8DCC;
const INT_SAMPLER_2D_ARRAY          = 0x8DCF;
const UNSIGNED_INT_SAMPLER_2D       = 0x8DD2;
const UNSIGNED_INT_SAMPLER_3D       = 0x8DD3;
const UNSIGNED_INT_SAMPLER_CUBE     = 0x8DD4;
const UNSIGNED_INT_SAMPLER_2D_ARRAY = 0x8DD7;

const TEXTURE_2D$1                    = 0x0DE1;
const TEXTURE_CUBE_MAP$1              = 0x8513;
const TEXTURE_3D$1                    = 0x806F;
const TEXTURE_2D_ARRAY$1              = 0x8C1A;

const typeMap = {};

/**
 * Returns the corresponding bind point for a given sampler type
 */
function getBindPointForSamplerType(gl, type) {
  return typeMap[type].bindPoint;
}

// This kind of sucks! If you could compose functions as in `var fn = gl[name];`
// this code could be a lot smaller but that is sadly really slow (T_T)

function floatSetter(gl, location) {
  return function(v) {
    gl.uniform1f(location, v);
  };
}

function floatArraySetter(gl, location) {
  return function(v) {
    gl.uniform1fv(location, v);
  };
}

function floatVec2Setter(gl, location) {
  return function(v) {
    gl.uniform2fv(location, v);
  };
}

function floatVec3Setter(gl, location) {
  return function(v) {
    gl.uniform3fv(location, v);
  };
}

function floatVec4Setter(gl, location) {
  return function(v) {
    gl.uniform4fv(location, v);
  };
}

function intSetter(gl, location) {
  return function(v) {
    gl.uniform1i(location, v);
  };
}

function intArraySetter(gl, location) {
  return function(v) {
    gl.uniform1iv(location, v);
  };
}

function intVec2Setter(gl, location) {
  return function(v) {
    gl.uniform2iv(location, v);
  };
}

function intVec3Setter(gl, location) {
  return function(v) {
    gl.uniform3iv(location, v);
  };
}

function intVec4Setter(gl, location) {
  return function(v) {
    gl.uniform4iv(location, v);
  };
}

function uintSetter(gl, location) {
  return function(v) {
    gl.uniform1ui(location, v);
  };
}

function uintArraySetter(gl, location) {
  return function(v) {
    gl.uniform1uiv(location, v);
  };
}

function uintVec2Setter(gl, location) {
  return function(v) {
    gl.uniform2uiv(location, v);
  };
}

function uintVec3Setter(gl, location) {
  return function(v) {
    gl.uniform3uiv(location, v);
  };
}

function uintVec4Setter(gl, location) {
  return function(v) {
    gl.uniform4uiv(location, v);
  };
}

function floatMat2Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix2fv(location, false, v);
  };
}

function floatMat3Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix3fv(location, false, v);
  };
}

function floatMat4Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix4fv(location, false, v);
  };
}

function floatMat23Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix2x3fv(location, false, v);
  };
}

function floatMat32Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix3x2fv(location, false, v);
  };
}

function floatMat24Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix2x4fv(location, false, v);
  };
}

function floatMat42Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix4x2fv(location, false, v);
  };
}

function floatMat34Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix3x4fv(location, false, v);
  };
}

function floatMat43Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix4x3fv(location, false, v);
  };
}

function samplerSetter(gl, type, unit, location) {
  const bindPoint = getBindPointForSamplerType(gl, type);
  return isWebGL2(gl) ? function(textureOrPair) {
    let texture;
    let sampler;
    if (isTexture(gl, textureOrPair)) {
      texture = textureOrPair;
      sampler = null;
    } else {
      texture = textureOrPair.texture;
      sampler = textureOrPair.sampler;
    }
    gl.uniform1i(location, unit);
    gl.activeTexture(TEXTURE0 + unit);
    gl.bindTexture(bindPoint, texture);
    gl.bindSampler(unit, sampler);
  } : function(texture) {
    gl.uniform1i(location, unit);
    gl.activeTexture(TEXTURE0 + unit);
    gl.bindTexture(bindPoint, texture);
  };
}

function samplerArraySetter(gl, type, unit, location, size) {
  const bindPoint = getBindPointForSamplerType(gl, type);
  const units = new Int32Array(size);
  for (let ii = 0; ii < size; ++ii) {
    units[ii] = unit + ii;
  }

  return isWebGL2(gl) ? function(textures) {
    gl.uniform1iv(location, units);
    textures.forEach(function(textureOrPair, index) {
      gl.activeTexture(TEXTURE0 + units[index]);
      let texture;
      let sampler;
      if (isTexture(gl, textureOrPair)) {
        texture = textureOrPair;
        sampler = null;
      } else {
        texture = textureOrPair.texture;
        sampler = textureOrPair.sampler;
      }
      gl.bindSampler(unit, sampler);
      gl.bindTexture(bindPoint, texture);
    });
  } : function(textures) {
    gl.uniform1iv(location, units);
    textures.forEach(function(texture, index) {
      gl.activeTexture(TEXTURE0 + units[index]);
      gl.bindTexture(bindPoint, texture);
    });
  };
}

typeMap[FLOAT$3]                         = { Type: Float32Array, size:  4, setter: floatSetter,      arraySetter: floatArraySetter, };
typeMap[FLOAT_VEC2]                    = { Type: Float32Array, size:  8, setter: floatVec2Setter,  };
typeMap[FLOAT_VEC3]                    = { Type: Float32Array, size: 12, setter: floatVec3Setter,  };
typeMap[FLOAT_VEC4]                    = { Type: Float32Array, size: 16, setter: floatVec4Setter,  };
typeMap[INT$3]                           = { Type: Int32Array,   size:  4, setter: intSetter,        arraySetter: intArraySetter, };
typeMap[INT_VEC2]                      = { Type: Int32Array,   size:  8, setter: intVec2Setter,    };
typeMap[INT_VEC3]                      = { Type: Int32Array,   size: 12, setter: intVec3Setter,    };
typeMap[INT_VEC4]                      = { Type: Int32Array,   size: 16, setter: intVec4Setter,    };
typeMap[UNSIGNED_INT$3]                  = { Type: Uint32Array,  size:  4, setter: uintSetter,       arraySetter: uintArraySetter, };
typeMap[UNSIGNED_INT_VEC2]             = { Type: Uint32Array,  size:  8, setter: uintVec2Setter,   };
typeMap[UNSIGNED_INT_VEC3]             = { Type: Uint32Array,  size: 12, setter: uintVec3Setter,   };
typeMap[UNSIGNED_INT_VEC4]             = { Type: Uint32Array,  size: 16, setter: uintVec4Setter,   };
typeMap[BOOL]                          = { Type: Uint32Array,  size:  4, setter: intSetter,        arraySetter: intArraySetter, };
typeMap[BOOL_VEC2]                     = { Type: Uint32Array,  size:  8, setter: intVec2Setter,    };
typeMap[BOOL_VEC3]                     = { Type: Uint32Array,  size: 12, setter: intVec3Setter,    };
typeMap[BOOL_VEC4]                     = { Type: Uint32Array,  size: 16, setter: intVec4Setter,    };
typeMap[FLOAT_MAT2]                    = { Type: Float32Array, size: 16, setter: floatMat2Setter,  };
typeMap[FLOAT_MAT3]                    = { Type: Float32Array, size: 36, setter: floatMat3Setter,  };
typeMap[FLOAT_MAT4]                    = { Type: Float32Array, size: 64, setter: floatMat4Setter,  };
typeMap[FLOAT_MAT2x3]                  = { Type: Float32Array, size: 24, setter: floatMat23Setter, };
typeMap[FLOAT_MAT2x4]                  = { Type: Float32Array, size: 32, setter: floatMat24Setter, };
typeMap[FLOAT_MAT3x2]                  = { Type: Float32Array, size: 24, setter: floatMat32Setter, };
typeMap[FLOAT_MAT3x4]                  = { Type: Float32Array, size: 48, setter: floatMat34Setter, };
typeMap[FLOAT_MAT4x2]                  = { Type: Float32Array, size: 32, setter: floatMat42Setter, };
typeMap[FLOAT_MAT4x3]                  = { Type: Float32Array, size: 48, setter: floatMat43Setter, };
typeMap[SAMPLER_2D]                    = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
typeMap[SAMPLER_CUBE]                  = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1, };
typeMap[SAMPLER_3D]                    = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D$1,       };
typeMap[SAMPLER_2D_SHADOW]             = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
typeMap[SAMPLER_2D_ARRAY]              = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1, };
typeMap[SAMPLER_2D_ARRAY_SHADOW]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1, };
typeMap[SAMPLER_CUBE_SHADOW]           = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1, };
typeMap[INT_SAMPLER_2D]                = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
typeMap[INT_SAMPLER_3D]                = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D$1,       };
typeMap[INT_SAMPLER_CUBE]              = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1, };
typeMap[INT_SAMPLER_2D_ARRAY]          = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1, };
typeMap[UNSIGNED_INT_SAMPLER_2D]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
typeMap[UNSIGNED_INT_SAMPLER_3D]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D$1,       };
typeMap[UNSIGNED_INT_SAMPLER_CUBE]     = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1, };
typeMap[UNSIGNED_INT_SAMPLER_2D_ARRAY] = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1, };

function floatAttribSetter(gl, index) {
  return function(b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      switch (b.value.length) {
        case 4:
          gl.vertexAttrib4fv(index, b.value);
          break;
        case 3:
          gl.vertexAttrib3fv(index, b.value);
          break;
        case 2:
          gl.vertexAttrib2fv(index, b.value);
          break;
        case 1:
          gl.vertexAttrib1fv(index, b.value);
          break;
        default:
          throw new Error('the length of a float constant value must be between 1 and 4!');
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribPointer(
          index, b.numComponents || b.size, b.type || FLOAT$3, b.normalize || false, b.stride || 0, b.offset || 0);
      if (b.divisor !== undefined) {
        gl.vertexAttribDivisor(index, b.divisor);
      }
    }
  };
}

function intAttribSetter(gl, index) {
  return function(b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      if (b.value.length === 4) {
        gl.vertexAttrib4iv(index, b.value);
      } else {
        throw new Error('The length of an integer constant value must be 4!');
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribIPointer(
          index, b.numComponents || b.size, b.type || INT$3, b.stride || 0, b.offset || 0);
      if (b.divisor !== undefined) {
        gl.vertexAttribDivisor(index, b.divisor);
      }
    }
  };
}

function uintAttribSetter(gl, index) {
  return function(b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      if (b.value.length === 4) {
        gl.vertexAttrib4uiv(index, b.value);
      } else {
        throw new Error('The length of an unsigned integer constant value must be 4!');
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribIPointer(
          index, b.numComponents || b.size, b.type || UNSIGNED_INT$3, b.stride || 0, b.offset || 0);
      if (b.divisor !== undefined) {
        gl.vertexAttribDivisor(index, b.divisor);
      }
    }
  };
}

function matAttribSetter(gl, index, typeInfo) {
  const defaultSize = typeInfo.size;
  const count = typeInfo.count;

  return function(b) {
    gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
    const numComponents = b.size || b.numComponents || defaultSize;
    const size = numComponents / count;
    const type = b.type || FLOAT$3;
    const typeInfo = typeMap[type];
    const stride = typeInfo.size * numComponents;
    const normalize = b.normalize || false;
    const offset = b.offset || 0;
    const rowOffset = stride / count;
    for (let i = 0; i < count; ++i) {
      gl.enableVertexAttribArray(index + i);
      gl.vertexAttribPointer(
          index + i, size, type, normalize, stride, offset + rowOffset * i);
      if (b.divisor !== undefined) {
        gl.vertexAttribDivisor(index + i, b.divisor);
      }
    }
  };
}



const attrTypeMap = {};
attrTypeMap[FLOAT$3]             = { size:  4, setter: floatAttribSetter, };
attrTypeMap[FLOAT_VEC2]        = { size:  8, setter: floatAttribSetter, };
attrTypeMap[FLOAT_VEC3]        = { size: 12, setter: floatAttribSetter, };
attrTypeMap[FLOAT_VEC4]        = { size: 16, setter: floatAttribSetter, };
attrTypeMap[INT$3]               = { size:  4, setter: intAttribSetter,   };
attrTypeMap[INT_VEC2]          = { size:  8, setter: intAttribSetter,   };
attrTypeMap[INT_VEC3]          = { size: 12, setter: intAttribSetter,   };
attrTypeMap[INT_VEC4]          = { size: 16, setter: intAttribSetter,   };
attrTypeMap[UNSIGNED_INT$3]      = { size:  4, setter: uintAttribSetter,  };
attrTypeMap[UNSIGNED_INT_VEC2] = { size:  8, setter: uintAttribSetter,  };
attrTypeMap[UNSIGNED_INT_VEC3] = { size: 12, setter: uintAttribSetter,  };
attrTypeMap[UNSIGNED_INT_VEC4] = { size: 16, setter: uintAttribSetter,  };
attrTypeMap[BOOL]              = { size:  4, setter: intAttribSetter,   };
attrTypeMap[BOOL_VEC2]         = { size:  8, setter: intAttribSetter,   };
attrTypeMap[BOOL_VEC3]         = { size: 12, setter: intAttribSetter,   };
attrTypeMap[BOOL_VEC4]         = { size: 16, setter: intAttribSetter,   };
attrTypeMap[FLOAT_MAT2]        = { size:  4, setter: matAttribSetter,   count: 2, };
attrTypeMap[FLOAT_MAT3]        = { size:  9, setter: matAttribSetter,   count: 3, };
attrTypeMap[FLOAT_MAT4]        = { size: 16, setter: matAttribSetter,   count: 4, };

const errorRE = /ERROR:\s*\d+:(\d+)/gi;
function addLineNumbersWithError(src, log = '', lineOffset = 0) {
  // Note: Error message formats are not defined by any spec so this may or may not work.
  const matches = [...log.matchAll(errorRE)];
  const lineNoToErrorMap = new Map(matches.map((m, ndx) => {
    const lineNo = parseInt(m[1]);
    const next = matches[ndx + 1];
    const end = next ? next.index : log.length;
    const msg = log.substring(m.index, end);
    return [lineNo - 1, msg];
  }));
  return src.split('\n').map((line, lineNo) => {
    const err = lineNoToErrorMap.get(lineNo);
    return `${lineNo + 1 + lineOffset}: ${line}${err ? `\n\n^^^ ${err}` : ''}`;
  }).join('\n');
}

/**
 * Error Callback
 * @callback ErrorCallback
 * @param {string} msg error message.
 * @param {number} [lineOffset] amount to add to line number
 * @memberOf module:twgl
 */

const spaceRE = /^[ \t]*\n/;

/**
 * Loads a shader.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {string} shaderSource The shader source.
 * @param {number} shaderType The type of shader.
 * @param {module:twgl.ErrorCallback} opt_errorCallback callback for errors.
 * @return {WebGLShader} The created shader.
 * @private
 */
function loadShader$1(gl, shaderSource, shaderType, opt_errorCallback) {
  const errFn = opt_errorCallback || error$1;
  // Create the shader object
  const shader = gl.createShader(shaderType);

  // Remove the first end of line because WebGL 2.0 requires
  // #version 300 es
  // as the first line. No whitespace allowed before that line
  // so
  //
  // <script>
  // #version 300 es
  // </script>
  //
  // Has one line before it which is invalid according to GLSL ES 3.00
  //
  let lineOffset = 0;
  if (spaceRE.test(shaderSource)) {
    lineOffset = 1;
    shaderSource = shaderSource.replace(spaceRE, '');
  }

  // Load the shader source
  gl.shaderSource(shader, shaderSource);

  // Compile the shader
  gl.compileShader(shader);

  // Check the compile status
  const compiled = gl.getShaderParameter(shader, COMPILE_STATUS);
  if (!compiled) {
    // Something went wrong during compilation; get the error
    const lastError = gl.getShaderInfoLog(shader);
    errFn(`${addLineNumbersWithError(shaderSource, lastError, lineOffset)}\nError compiling ${glEnumToString(gl, shaderType)}: ${lastError}`);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/**
 * @typedef {Object} ProgramOptions
 * @property {function(string)} [errorCallback] callback for errors
 * @property {Object.<string,number>} [attribLocations] a attribute name to location map
 * @property {(module:twgl.BufferInfo|Object.<string,module:twgl.AttribInfo>|string[])} [transformFeedbackVaryings] If passed
 *   a BufferInfo will use the attribs names inside. If passed an object of AttribInfos will use the names from that object. Otherwise
 *   you can pass an array of names.
 * @property {number} [transformFeedbackMode] the mode to pass `gl.transformFeedbackVaryings`. Defaults to `SEPARATE_ATTRIBS`.
 * @memberOf module:twgl
 */

/**
 * Gets the program options based on all these optional arguments
 * @param {module:twgl.ProgramOptions|string[]} [opt_attribs] Options for the program or an array of attribs names. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {module:twgl.ProgramOptions} an instance of ProgramOptions based on the arguments passed in
 * @private
 */
function getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
  let transformFeedbackVaryings;
  let transformFeedbackMode;
  if (typeof opt_locations === 'function') {
    opt_errorCallback = opt_locations;
    opt_locations = undefined;
  }
  if (typeof opt_attribs === 'function') {
    opt_errorCallback = opt_attribs;
    opt_attribs = undefined;
  } else if (opt_attribs && !Array.isArray(opt_attribs)) {
    // If we have an errorCallback we can just return this object
    // Otherwise we need to construct one with default errorCallback
    if (opt_attribs.errorCallback) {
      return opt_attribs;
    }
    const opt = opt_attribs;
    opt_errorCallback = opt.errorCallback;
    opt_attribs = opt.attribLocations;
    transformFeedbackVaryings = opt.transformFeedbackVaryings;
    transformFeedbackMode = opt.transformFeedbackMode;
  }

  const options = {
    errorCallback: opt_errorCallback || error$1,
    transformFeedbackVaryings: transformFeedbackVaryings,
    transformFeedbackMode: transformFeedbackMode,
  };

  if (opt_attribs) {
    let attribLocations = {};
    if (Array.isArray(opt_attribs)) {
      opt_attribs.forEach(function(attrib,  ndx) {
        attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
      });
    } else {
      attribLocations = opt_attribs;
    }
    options.attribLocations = attribLocations;
  }

  return options;
}

const defaultShaderType = [
  "VERTEX_SHADER",
  "FRAGMENT_SHADER",
];

function getShaderTypeFromScriptType(gl, scriptType) {
  if (scriptType.indexOf("frag") >= 0) {
    return FRAGMENT_SHADER;
  } else if (scriptType.indexOf("vert") >= 0) {
    return VERTEX_SHADER;
  }
  return undefined;
}

function deleteShaders(gl, shaders) {
  shaders.forEach(function(shader) {
    gl.deleteShader(shader);
  });
}

/**
 * Creates a program, attaches (and/or compiles) shaders, binds attrib locations, links the
 * program and calls useProgram.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgram(gl, [vs, fs], options);
 *     twgl.createProgram(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLShader[]|string[]} shaders The shaders to attach, or element ids for their source, or strings that contain their source
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error.
 * @memberOf module:twgl/programs
 */
function createProgram$1(
    gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  const realShaders = [];
  const newShaders = [];
  for (let ndx = 0; ndx < shaders.length; ++ndx) {
    let shader = shaders[ndx];
    if (typeof (shader) === 'string') {
      const elem = getElementById(shader);
      const src = elem ? elem.text : shader;
      let type = gl[defaultShaderType[ndx]];
      if (elem && elem.type) {
        type = getShaderTypeFromScriptType(gl, elem.type) || type;
      }
      shader = loadShader$1(gl, src, type, progOptions.errorCallback);
      newShaders.push(shader);
    }
    if (isShader(gl, shader)) {
      realShaders.push(shader);
    }
  }

  if (realShaders.length !== shaders.length) {
    progOptions.errorCallback("not enough shaders for program");
    deleteShaders(gl, newShaders);
    return null;
  }

  const program = gl.createProgram();
  realShaders.forEach(function(shader) {
    gl.attachShader(program, shader);
  });
  if (progOptions.attribLocations) {
    Object.keys(progOptions.attribLocations).forEach(function(attrib) {
      gl.bindAttribLocation(program, progOptions.attribLocations[attrib], attrib);
    });
  }
  let varyings = progOptions.transformFeedbackVaryings;
  if (varyings) {
    if (varyings.attribs) {
      varyings = varyings.attribs;
    }
    if (!Array.isArray(varyings)) {
      varyings = Object.keys(varyings);
    }
    gl.transformFeedbackVaryings(program, varyings, progOptions.transformFeedbackMode || SEPARATE_ATTRIBS);
  }
  gl.linkProgram(program);

  // Check the link status
  const linked = gl.getProgramParameter(program, LINK_STATUS);
  if (!linked) {
    // something went wrong with the link
    const lastError = gl.getProgramInfoLog(program);
    progOptions.errorCallback(`${
      realShaders.map(shader => {
        const src = addLineNumbersWithError(gl.getShaderSource(shader), '', 0);
        const type = gl.getShaderParameter(shader, gl.SHADER_TYPE);
        return `${glEnumToString(gl, type)}\n${src}}`;
      }).join('\n')
    }\nError in program linking: ${lastError}`);

    gl.deleteProgram(program);
    deleteShaders(gl, newShaders);
    return null;
  }
  return program;
}

/**
 * Loads a shader from a script tag.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {string} scriptId The id of the script tag.
 * @param {number} [opt_shaderType] The type of shader. If not passed in it will
 *     be derived from the type of the script tag.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors.
 * @return {WebGLShader?} The created shader or null if error.
 * @private
 */
function createShaderFromScript(
    gl, scriptId, opt_shaderType, opt_errorCallback) {
  let shaderSource = "";
  const shaderScript = getElementById(scriptId);
  if (!shaderScript) {
    throw new Error(`unknown script element: ${scriptId}`);
  }
  shaderSource = shaderScript.text;

  const shaderType = opt_shaderType || getShaderTypeFromScriptType(gl, shaderScript.type);
  if (!shaderType) {
    throw new Error('unknown shader type');
  }

  return loadShader$1(gl, shaderSource, shaderType, opt_errorCallback);
}

/**
 * Creates a program from 2 script tags.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_options);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderScriptIds Array of ids of the script
 *        tags for the shaders. The first is assumed to be the
 *        vertex shader, the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error.
 * @memberOf module:twgl/programs
 */
function createProgramFromScripts(
    gl, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  const shaders = [];
  for (let ii = 0; ii < shaderScriptIds.length; ++ii) {
    const shader = createShaderFromScript(
        gl, shaderScriptIds[ii], gl[defaultShaderType[ii]], progOptions.errorCallback);
    if (!shader) {
      return null;
    }
    shaders.push(shader);
  }
  return createProgram$1(gl, shaders, progOptions);
}

/**
 * Creates a program from 2 sources.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_options);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderSources Array of sources for the
 *        shaders. The first is assumed to be the vertex shader,
 *        the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error.
 * @memberOf module:twgl/programs
 */
function createProgramFromSources(
    gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  const shaders = [];
  for (let ii = 0; ii < shaderSources.length; ++ii) {
    const shader = loadShader$1(
        gl, shaderSources[ii], gl[defaultShaderType[ii]], progOptions.errorCallback);
    if (!shader) {
      return null;
    }
    shaders.push(shader);
  }
  return createProgram$1(gl, shaders, progOptions);
}

/**
 * Returns true if attribute/uniform is a reserved/built in
 *
 * It makes no sense to me why GL returns these because it's
 * illegal to call `gl.getUniformLocation` and `gl.getAttribLocation`
 * with names that start with `gl_` (and `webgl_` in WebGL)
 *
 * I can only assume they are there because they might count
 * when computing the number of uniforms/attributes used when you want to
 * know if you are near the limit. That doesn't really make sense
 * to me but the fact that these get returned are in the spec.
 *
 * @param {WebGLActiveInfo} info As returned from `gl.getActiveUniform` or
 *    `gl.getActiveAttrib`.
 * @return {bool} true if it's reserved
 * @private
 */
function isBuiltIn(info) {
  const name = info.name;
  return name.startsWith("gl_") || name.startsWith("webgl_");
}

/**
 * Creates setter functions for all uniforms of a shader
 * program.
 *
 * @see {@link module:twgl.setUniforms}
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program the program to create setters for.
 * @returns {Object.<string, function>} an object with a setter by name for each uniform
 * @memberOf module:twgl/programs
 */
function createUniformSetters(gl, program) {
  let textureUnit = 0;

  /**
   * Creates a setter for a uniform of the given program with it's
   * location embedded in the setter.
   * @param {WebGLProgram} program
   * @param {WebGLUniformInfo} uniformInfo
   * @returns {function} the created setter.
   */
  function createUniformSetter(program, uniformInfo, location) {
    const isArray = uniformInfo.name.endsWith("[0]");
    const type = uniformInfo.type;
    const typeInfo = typeMap[type];
    if (!typeInfo) {
      throw new Error(`unknown type: 0x${type.toString(16)}`); // we should never get here.
    }
    let setter;
    if (typeInfo.bindPoint) {
      // it's a sampler
      const unit = textureUnit;
      textureUnit += uniformInfo.size;
      if (isArray) {
        setter = typeInfo.arraySetter(gl, type, unit, location, uniformInfo.size);
      } else {
        setter = typeInfo.setter(gl, type, unit, location, uniformInfo.size);
      }
    } else {
      if (typeInfo.arraySetter && isArray) {
        setter = typeInfo.arraySetter(gl, location);
      } else {
        setter = typeInfo.setter(gl, location);
      }
    }
    setter.location = location;
    return setter;
  }

  const uniformSetters = { };
  const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);

  for (let ii = 0; ii < numUniforms; ++ii) {
    const uniformInfo = gl.getActiveUniform(program, ii);
    if (isBuiltIn(uniformInfo)) {
        continue;
    }
    let name = uniformInfo.name;
    // remove the array suffix.
    if (name.endsWith("[0]")) {
      name = name.substr(0, name.length - 3);
    }
    const location = gl.getUniformLocation(program, uniformInfo.name);
    // the uniform will have no location if it's in a uniform block
    if (location) {
      uniformSetters[name] = createUniformSetter(program, uniformInfo, location);
    }
  }
  return uniformSetters;
}

/**
 * @typedef {Object} TransformFeedbackInfo
 * @property {number} index index of transform feedback
 * @property {number} type GL type
 * @property {number} size 1 - 4
 * @memberOf module:twgl
 */

/**
 * Create TransformFeedbackInfo for passing to bindTransformFeedbackInfo.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program an existing WebGLProgram.
 * @return {Object<string, module:twgl.TransformFeedbackInfo>}
 * @memberOf module:twgl
 */
function createTransformFeedbackInfo(gl, program) {
  const info = {};
  const numVaryings = gl.getProgramParameter(program, TRANSFORM_FEEDBACK_VARYINGS);
  for (let ii = 0; ii < numVaryings; ++ii) {
    const varying = gl.getTransformFeedbackVarying(program, ii);
    info[varying.name] = {
      index: ii,
      type: varying.type,
      size: varying.size,
    };
  }
  return info;
}

/**
 * Binds buffers for transform feedback.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {(module:twgl.ProgramInfo|Object<string, module:twgl.TransformFeedbackInfo>)} transformFeedbackInfo A ProgramInfo or TransformFeedbackInfo.
 * @param {(module:twgl.BufferInfo|Object<string, module:twgl.AttribInfo>)} [bufferInfo] A BufferInfo or set of AttribInfos.
 * @memberOf module:twgl
 */
function bindTransformFeedbackInfo(gl, transformFeedbackInfo, bufferInfo) {
  if (transformFeedbackInfo.transformFeedbackInfo) {
    transformFeedbackInfo = transformFeedbackInfo.transformFeedbackInfo;
  }
  if (bufferInfo.attribs) {
    bufferInfo = bufferInfo.attribs;
  }
  for (const name in bufferInfo) {
    const varying = transformFeedbackInfo[name];
    if (varying) {
      const buf = bufferInfo[name];
      if (buf.offset) {
        gl.bindBufferRange(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer, buf.offset, buf.size);
      } else {
        gl.bindBufferBase(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer);
      }
    }
  }
}

/**
 * Creates a transform feedback and sets the buffers
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {module:twgl.ProgramInfo} programInfo A ProgramInfo as returned from {@link module:twgl.createProgramInfo}
 * @param {(module:twgl.BufferInfo|Object<string, module:twgl.AttribInfo>)} [bufferInfo] A BufferInfo or set of AttribInfos.
 * @return {WebGLTransformFeedback} the created transform feedback
 * @memberOf module:twgl
 */
function createTransformFeedback(gl, programInfo, bufferInfo) {
  const tf = gl.createTransformFeedback();
  gl.bindTransformFeedback(TRANSFORM_FEEDBACK, tf);
  gl.useProgram(programInfo.program);
  bindTransformFeedbackInfo(gl, programInfo, bufferInfo);
  gl.bindTransformFeedback(TRANSFORM_FEEDBACK, null);
  return tf;
}

/**
 * @typedef {Object} UniformData
 * @property {number} type The WebGL type enum for this uniform
 * @property {number} size The number of elements for this uniform
 * @property {number} blockNdx The block index this uniform appears in
 * @property {number} offset The byte offset in the block for this uniform's value
 * @memberOf module:twgl
 */

/**
 * The specification for one UniformBlockObject
 *
 * @typedef {Object} BlockSpec
 * @property {number} index The index of the block.
 * @property {number} size The size in bytes needed for the block
 * @property {number[]} uniformIndices The indices of the uniforms used by the block. These indices
 *    correspond to entries in a UniformData array in the {@link module:twgl.UniformBlockSpec}.
 * @property {bool} usedByVertexShader Self explanatory
 * @property {bool} usedByFragmentShader Self explanatory
 * @property {bool} used Self explanatory
 * @memberOf module:twgl
 */

/**
 * A `UniformBlockSpec` represents the data needed to create and bind
 * UniformBlockObjects for a given program
 *
 * @typedef {Object} UniformBlockSpec
 * @property {Object.<string, module:twgl.BlockSpec> blockSpecs The BlockSpec for each block by block name
 * @property {UniformData[]} uniformData An array of data for each uniform by uniform index.
 * @memberOf module:twgl
 */

/**
 * Creates a UniformBlockSpec for the given program.
 *
 * A UniformBlockSpec represents the data needed to create and bind
 * UniformBlockObjects
 *
 * @param {WebGL2RenderingContext} gl A WebGL2 Rendering Context
 * @param {WebGLProgram} program A WebGLProgram for a successfully linked program
 * @return {module:twgl.UniformBlockSpec} The created UniformBlockSpec
 * @memberOf module:twgl/programs
 */
function createUniformBlockSpecFromProgram(gl, program) {
  const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
  const uniformData = [];
  const uniformIndices = [];

  for (let ii = 0; ii < numUniforms; ++ii) {
    uniformIndices.push(ii);
    uniformData.push({});
    const uniformInfo = gl.getActiveUniform(program, ii);
    if (isBuiltIn(uniformInfo)) {
      break;
    }
    uniformData[ii].name = uniformInfo.name;
  }

  [
    [ "UNIFORM_TYPE", "type" ],
    [ "UNIFORM_SIZE", "size" ],  // num elements
    [ "UNIFORM_BLOCK_INDEX", "blockNdx" ],
    [ "UNIFORM_OFFSET", "offset", ],
  ].forEach(function(pair) {
    const pname = pair[0];
    const key = pair[1];
    gl.getActiveUniforms(program, uniformIndices, gl[pname]).forEach(function(value, ndx) {
      uniformData[ndx][key] = value;
    });
  });

  const blockSpecs = {};

  const numUniformBlocks = gl.getProgramParameter(program, ACTIVE_UNIFORM_BLOCKS);
  for (let ii = 0; ii < numUniformBlocks; ++ii) {
    const name = gl.getActiveUniformBlockName(program, ii);
    const blockSpec = {
      index: gl.getUniformBlockIndex(program, name),
      usedByVertexShader: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
      usedByFragmentShader: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
      size: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_DATA_SIZE),
      uniformIndices: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES),
    };
    blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
    blockSpecs[name] = blockSpec;
  }

  return {
    blockSpecs: blockSpecs,
    uniformData: uniformData,
  };
}

const arraySuffixRE = /\[\d+\]\.$/;  // better way to check?

const pad = (v, padding) => ((v + (padding - 1)) / padding | 0) * padding;

function createUniformBlockUniformSetter(view, Type, typeSize, paddedSize, isArray) {
  if (isArray) {
    const numElements = typeSize / Type.BYTES_PER_ELEMENT;
    const numPaddedElements = paddedSize / Type.BYTES_PER_ELEMENT;
    return function(value) {
      let dst = 0;
      for (let src = 0; src < value.length; src += numElements) {
        for (let i = 0; i < numElements; ++i) {
          view[dst + i] = value[src + i];
        }
        dst += numPaddedElements;
      }
    };
  } else {
    return function(value) {
      if (value.length) {
        view.set(value);
      } else {
        view[0] = value;
      }
    };
  }
}

/**
 * Represents a UniformBlockObject including an ArrayBuffer with all the uniform values
 * and a corresponding WebGLBuffer to hold those values on the GPU
 *
 * @typedef {Object} UniformBlockInfo
 * @property {string} name The name of the block
 * @property {ArrayBuffer} array The array buffer that contains the uniform values
 * @property {Float32Array} asFloat A float view on the array buffer. This is useful
 *    inspecting the contents of the buffer in the debugger.
 * @property {WebGLBuffer} buffer A WebGL buffer that will hold a copy of the uniform values for rendering.
 * @property {number} [offset] offset into buffer
 * @property {Object<string, ArrayBufferView>} uniforms A uniform name to ArrayBufferView map.
 *   each Uniform has a correctly typed `ArrayBufferView` into array at the correct offset
 *   and length of that uniform. So for example a float uniform would have a 1 float `Float32Array`
 *   view. A single mat4 would have a 16 element `Float32Array` view. An ivec2 would have an
 *   `Int32Array` view, etc.
 * @property {Object<string, function>} setters A setter for this uniform.
 *   The reason to use setters is elements of arrays are padded to vec4 sizes which
 *   means if you want to set an array of 4 floats you'd need to set 16 values
 *   (or set elements 0, 4, 8, 12). In other words
 *   `someBlockInfo.uniforms.some4FloatArrayUniform.set([0, , , , 1, , , , 2, , , , 3])`
 *   where as the setter handles just passing in [0, 1, 2, 3] either directly as in
 *   `someBlockInfo.setter.some4FloatArrayUniform.set([0, 1, 2, 3])` (not recommended)
 *   or via {@link module:twgl.setBlockUniforms}
 * @memberOf module:twgl
 */

/**
 * Creates a `UniformBlockInfo` for the specified block
 *
 * Note: **If the blockName matches no existing blocks a warning is printed to the console and a dummy
 * `UniformBlockInfo` is returned**. This is because when debugging GLSL
 * it is common to comment out large portions of a shader or for example set
 * the final output to a constant. When that happens blocks get optimized out.
 * If this function did not create dummy blocks your code would crash when debugging.
 *
 * @param {WebGL2RenderingContext} gl A WebGL2RenderingContext
 * @param {WebGLProgram} program A WebGLProgram
 * @param {module:twgl.UniformBlockSpec} uniformBlockSpec. A UniformBlockSpec as returned
 *     from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {string} blockName The name of the block.
 * @return {module:twgl.UniformBlockInfo} The created UniformBlockInfo
 * @memberOf module:twgl/programs
 */
function createUniformBlockInfoFromProgram(gl, program, uniformBlockSpec, blockName) {
  const blockSpecs = uniformBlockSpec.blockSpecs;
  const uniformData = uniformBlockSpec.uniformData;
  const blockSpec = blockSpecs[blockName];
  if (!blockSpec) {
    warn$1("no uniform block object named:", blockName);
    return {
      name: blockName,
      uniforms: {},
    };
  }
  const array = new ArrayBuffer(blockSpec.size);
  const buffer = gl.createBuffer();
  const uniformBufferIndex = blockSpec.index;
  gl.bindBuffer(UNIFORM_BUFFER, buffer);
  gl.uniformBlockBinding(program, blockSpec.index, uniformBufferIndex);

  let prefix = blockName + ".";
  if (arraySuffixRE.test(prefix)) {
    prefix = prefix.replace(arraySuffixRE, ".");
  }
  const uniforms = {};
  const setters = {};
  blockSpec.uniformIndices.forEach(function(uniformNdx) {
    const data = uniformData[uniformNdx];
    const typeInfo = typeMap[data.type];
    const Type = typeInfo.Type;
    const paddedSize = pad(typeInfo.size, 16);
    const length = typeInfo.size + (data.size - 1) * paddedSize;
    let name = data.name;
    if (name.startsWith(prefix)) {
      name = name.substr(prefix.length);
    }
    const isArray = name.endsWith('[0]');
    if (isArray) {
      name = name.substr(0, name.length - 3);
    }
    const uniformView = new Type(array, data.offset, length / Type.BYTES_PER_ELEMENT);
    uniforms[name] = uniformView;
    setters[name] = createUniformBlockUniformSetter(uniformView, Type, typeInfo.size, paddedSize, isArray);
  });
  return {
    name: blockName,
    array,
    asFloat: new Float32Array(array),  // for debugging
    buffer,
    uniforms,
    setters,
  };
}

/**
 * Creates a `UniformBlockInfo` for the specified block
 *
 * Note: **If the blockName matches no existing blocks a warning is printed to the console and a dummy
 * `UniformBlockInfo` is returned**. This is because when debugging GLSL
 * it is common to comment out large portions of a shader or for example set
 * the final output to a constant. When that happens blocks get optimized out.
 * If this function did not create dummy blocks your code would crash when debugging.
 *
 * @param {WebGL2RenderingContext} gl A WebGL2RenderingContext
 * @param {module:twgl.ProgramInfo} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo}
 * @param {string} blockName The name of the block.
 * @return {module:twgl.UniformBlockInfo} The created UniformBlockInfo
 * @memberOf module:twgl/programs
 */
function createUniformBlockInfo(gl, programInfo, blockName) {
  return createUniformBlockInfoFromProgram(gl, programInfo.program, programInfo.uniformBlockSpec, blockName);
}

/**
 * Binds a uniform block to the matching uniform block point.
 * Matches by blocks by name so blocks must have the same name not just the same
 * structure.
 *
 * If you have changed any values and you upload the values into the corresponding WebGLBuffer
 * call {@link module:twgl.setUniformBlock} instead.
 *
 * @param {WebGL2RenderingContext} gl A WebGL 2 rendering context.
 * @param {(module:twgl.ProgramInfo|module:twgl.UniformBlockSpec)} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo} or or `UniformBlockSpec` as
 *     returned from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo a `UniformBlockInfo` as returned from
 *     {@link module:twgl.createUniformBlockInfo}.
 * @return {bool} true if buffer was bound. If the programInfo has no block with the same block name
 *     no buffer is bound.
 * @memberOf module:twgl/programs
 */
function bindUniformBlock(gl, programInfo, uniformBlockInfo) {
  const uniformBlockSpec = programInfo.uniformBlockSpec || programInfo;
  const blockSpec = uniformBlockSpec.blockSpecs[uniformBlockInfo.name];
  if (blockSpec) {
    const bufferBindIndex = blockSpec.index;
    gl.bindBufferRange(UNIFORM_BUFFER, bufferBindIndex, uniformBlockInfo.buffer, uniformBlockInfo.offset || 0, uniformBlockInfo.array.byteLength);
    return true;
  }
  return false;
}

/**
 * Uploads the current uniform values to the corresponding WebGLBuffer
 * and binds that buffer to the program's corresponding bind point for the uniform block object.
 *
 * If you haven't changed any values and you only need to bind the uniform block object
 * call {@link module:twgl.bindUniformBlock} instead.
 *
 * @param {WebGL2RenderingContext} gl A WebGL 2 rendering context.
 * @param {(module:twgl.ProgramInfo|module:twgl.UniformBlockSpec)} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo} or or `UniformBlockSpec` as
 *     returned from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo a `UniformBlockInfo` as returned from
 *     {@link module:twgl.createUniformBlockInfo}.
 * @memberOf module:twgl/programs
 */
function setUniformBlock(gl, programInfo, uniformBlockInfo) {
  if (bindUniformBlock(gl, programInfo, uniformBlockInfo)) {
    gl.bufferData(UNIFORM_BUFFER, uniformBlockInfo.array, DYNAMIC_DRAW);
  }
}

/**
 * Sets values of a uniform block object
 *
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo A UniformBlockInfo as returned by {@link module:twgl.createUniformBlockInfo}.
 * @param {Object.<string, ?>} values A uniform name to value map where the value is correct for the given
 *    type of uniform. So for example given a block like
 *
 *       uniform SomeBlock {
 *         float someFloat;
 *         vec2 someVec2;
 *         vec3 someVec3Array[2];
 *         int someInt;
 *       }
 *
 *  You can set the values of the uniform block with
 *
 *       twgl.setBlockUniforms(someBlockInfo, {
 *          someFloat: 12.3,
 *          someVec2: [1, 2],
 *          someVec3Array: [1, 2, 3, 4, 5, 6],
 *          someInt: 5,
 *       }
 *
 *  Arrays can be JavaScript arrays or typed arrays
 *
 *  Any name that doesn't match will be ignored
 * @memberOf module:twgl/programs
 */
function setBlockUniforms(uniformBlockInfo, values) {
  const setters = uniformBlockInfo.setters;
  for (const name in values) {
    const setter = setters[name];
    if (setter) {
      const value = values[name];
      setter(value);
    }
  }
}

/**
 * Set uniforms and binds related textures.
 *
 * example:
 *
 *     const programInfo = createProgramInfo(
 *         gl, ["some-vs", "some-fs"]);
 *
 *     const tex1 = gl.createTexture();
 *     const tex2 = gl.createTexture();
 *
 *     ... assume we setup the textures with data ...
 *
 *     const uniforms = {
 *       u_someSampler: tex1,
 *       u_someOtherSampler: tex2,
 *       u_someColor: [1,0,0,1],
 *       u_somePosition: [0,1,1],
 *       u_someMatrix: [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ],
 *     };
 *
 *     gl.useProgram(program);
 *
 * This will automatically bind the textures AND set the
 * uniforms.
 *
 *     twgl.setUniforms(programInfo, uniforms);
 *
 * For the example above it is equivalent to
 *
 *     var texUnit = 0;
 *     gl.activeTexture(gl.TEXTURE0 + texUnit);
 *     gl.bindTexture(gl.TEXTURE_2D, tex1);
 *     gl.uniform1i(u_someSamplerLocation, texUnit++);
 *     gl.activeTexture(gl.TEXTURE0 + texUnit);
 *     gl.bindTexture(gl.TEXTURE_2D, tex2);
 *     gl.uniform1i(u_someSamplerLocation, texUnit++);
 *     gl.uniform4fv(u_someColorLocation, [1, 0, 0, 1]);
 *     gl.uniform3fv(u_somePositionLocation, [0, 1, 1]);
 *     gl.uniformMatrix4fv(u_someMatrix, false, [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ]);
 *
 * Note it is perfectly reasonable to call `setUniforms` multiple times. For example
 *
 *     const uniforms = {
 *       u_someSampler: tex1,
 *       u_someOtherSampler: tex2,
 *     };
 *
 *     const moreUniforms {
 *       u_someColor: [1,0,0,1],
 *       u_somePosition: [0,1,1],
 *       u_someMatrix: [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ],
 *     };
 *
 *     twgl.setUniforms(programInfo, uniforms);
 *     twgl.setUniforms(programInfo, moreUniforms);
 *
 * You can also add WebGLSamplers to uniform samplers as in
 *
 *     const uniforms = {
 *       u_someSampler: {
 *         texture: someWebGLTexture,
 *         sampler: someWebGLSampler,
 *       },
 *     };
 *
 * In which case both the sampler and texture will be bound to the
 * same unit.
 *
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters a `ProgramInfo` as returned from `createProgramInfo` or the setters returned from
 *        `createUniformSetters`.
 * @param {Object.<string, ?>} values an object with values for the
 *        uniforms.
 *   You can pass multiple objects by putting them in an array or by calling with more arguments.For example
 *
 *     const sharedUniforms = {
 *       u_fogNear: 10,
 *       u_projection: ...
 *       ...
 *     };
 *
 *     const localUniforms = {
 *       u_world: ...
 *       u_diffuseColor: ...
 *     };
 *
 *     twgl.setUniforms(programInfo, sharedUniforms, localUniforms);
 *
 *     // is the same as
 *
 *     twgl.setUniforms(programInfo, [sharedUniforms, localUniforms]);
 *
 *     // is the same as
 *
 *     twgl.setUniforms(programInfo, sharedUniforms);
 *     twgl.setUniforms(programInfo, localUniforms};
 *
 * @memberOf module:twgl/programs
 */
function setUniforms(setters, values) {  // eslint-disable-line
  const actualSetters = setters.uniformSetters || setters;
  const numArgs = arguments.length;
  for (let aNdx = 1; aNdx < numArgs; ++aNdx) {
    const values = arguments[aNdx];
    if (Array.isArray(values)) {
      const numValues = values.length;
      for (let ii = 0; ii < numValues; ++ii) {
        setUniforms(actualSetters, values[ii]);
      }
    } else {
      for (const name in values) {
        const setter = actualSetters[name];
        if (setter) {
          setter(values[name]);
        }
      }
    }
  }
}

/**
 * Alias for `setUniforms`
 * @function
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters a `ProgramInfo` as returned from `createProgramInfo` or the setters returned from
 *        `createUniformSetters`.
 * @param {Object.<string, ?>} values an object with values for the
 * @memberOf module:twgl/programs
 */
const setUniformsAndBindTextures = setUniforms;

/**
 * Creates setter functions for all attributes of a shader
 * program. You can pass this to {@link module:twgl.setBuffersAndAttributes} to set all your buffers and attributes.
 *
 * @see {@link module:twgl.setAttributes} for example
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program the program to create setters for.
 * @return {Object.<string, function>} an object with a setter for each attribute by name.
 * @memberOf module:twgl/programs
 */
function createAttributeSetters(gl, program) {
  const attribSetters = {
  };

  const numAttribs = gl.getProgramParameter(program, ACTIVE_ATTRIBUTES);
  for (let ii = 0; ii < numAttribs; ++ii) {
    const attribInfo = gl.getActiveAttrib(program, ii);
    if (isBuiltIn(attribInfo)) {
        continue;
    }
    const index = gl.getAttribLocation(program, attribInfo.name);
    const typeInfo = attrTypeMap[attribInfo.type];
    const setter = typeInfo.setter(gl, index, typeInfo);
    setter.location = index;
    attribSetters[attribInfo.name] = setter;
  }

  return attribSetters;
}

/**
 * Sets attributes and binds buffers (deprecated... use {@link module:twgl.setBuffersAndAttributes})
 *
 * Example:
 *
 *     const program = createProgramFromScripts(
 *         gl, ["some-vs", "some-fs");
 *
 *     const attribSetters = createAttributeSetters(program);
 *
 *     const positionBuffer = gl.createBuffer();
 *     const texcoordBuffer = gl.createBuffer();
 *
 *     const attribs = {
 *       a_position: {buffer: positionBuffer, numComponents: 3},
 *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
 *     };
 *
 *     gl.useProgram(program);
 *
 * This will automatically bind the buffers AND set the
 * attributes.
 *
 *     setAttributes(attribSetters, attribs);
 *
 * Properties of attribs. For each attrib you can add
 * properties:
 *
 * *   type: the type of data in the buffer. Default = gl.FLOAT
 * *   normalize: whether or not to normalize the data. Default = false
 * *   stride: the stride. Default = 0
 * *   offset: offset into the buffer. Default = 0
 * *   divisor: the divisor for instances. Default = undefined
 *
 * For example if you had 3 value float positions, 2 value
 * float texcoord and 4 value uint8 colors you'd setup your
 * attribs like this
 *
 *     const attribs = {
 *       a_position: {buffer: positionBuffer, numComponents: 3},
 *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
 *       a_color: {
 *         buffer: colorBuffer,
 *         numComponents: 4,
 *         type: gl.UNSIGNED_BYTE,
 *         normalize: true,
 *       },
 *     };
 *
 * @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
 * @param {Object.<string, module:twgl.AttribInfo>} buffers AttribInfos mapped by attribute name.
 * @memberOf module:twgl/programs
 * @deprecated use {@link module:twgl.setBuffersAndAttributes}
 */
function setAttributes(setters, buffers) {
  for (const name in buffers) {
    const setter = setters[name];
    if (setter) {
      setter(buffers[name]);
    }
  }
}

/**
 * Sets attributes and buffers including the `ELEMENT_ARRAY_BUFFER` if appropriate
 *
 * Example:
 *
 *     const programInfo = createProgramInfo(
 *         gl, ["some-vs", "some-fs");
 *
 *     const arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *     };
 *
 *     const bufferInfo = createBufferInfoFromArrays(gl, arrays);
 *
 *     gl.useProgram(programInfo.program);
 *
 * This will automatically bind the buffers AND set the
 * attributes.
 *
 *     setBuffersAndAttributes(gl, programInfo, bufferInfo);
 *
 * For the example above it is equivalent to
 *
 *     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
 *     gl.enableVertexAttribArray(a_positionLocation);
 *     gl.vertexAttribPointer(a_positionLocation, 3, gl.FLOAT, false, 0, 0);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
 *     gl.enableVertexAttribArray(a_texcoordLocation);
 *     gl.vertexAttribPointer(a_texcoordLocation, 4, gl.FLOAT, false, 0, 0);
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters A `ProgramInfo` as returned from {@link module:twgl.createProgramInfo} or Attribute setters as returned from {@link module:twgl.createAttributeSetters}
 * @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} buffers a `BufferInfo` as returned from {@link module:twgl.createBufferInfoFromArrays}.
 *   or a `VertexArrayInfo` as returned from {@link module:twgl.createVertexArrayInfo}
 * @memberOf module:twgl/programs
 */
function setBuffersAndAttributes(gl, programInfo, buffers) {
  if (buffers.vertexArrayObject) {
    gl.bindVertexArray(buffers.vertexArrayObject);
  } else {
    setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
    if (buffers.indices) {
      gl.bindBuffer(ELEMENT_ARRAY_BUFFER$1, buffers.indices);
    }
  }
}

/**
 * @typedef {Object} ProgramInfo
 * @property {WebGLProgram} program A shader program
 * @property {Object<string, function>} uniformSetters object of setters as returned from createUniformSetters,
 * @property {Object<string, function>} attribSetters object of setters as returned from createAttribSetters,
 * @property {module:twgl.UniformBlockSpec} [uniformBlockSpace] a uniform block spec for making UniformBlockInfos with createUniformBlockInfo etc..
 * @property {Object<string, module:twgl.TransformFeedbackInfo>} [transformFeedbackInfo] info for transform feedbacks
 * @memberOf module:twgl
 */

/**
 * Creates a ProgramInfo from an existing program.
 *
 * A ProgramInfo contains
 *
 *     programInfo = {
 *        program: WebGLProgram,
 *        uniformSetters: object of setters as returned from createUniformSetters,
 *        attribSetters: object of setters as returned from createAttribSetters,
 *     }
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {WebGLProgram} program an existing WebGLProgram.
 * @return {module:twgl.ProgramInfo} The created ProgramInfo.
 * @memberOf module:twgl/programs
 */
function createProgramInfoFromProgram(gl, program) {
  const uniformSetters = createUniformSetters(gl, program);
  const attribSetters = createAttributeSetters(gl, program);
  const programInfo = {
    program: program,
    uniformSetters: uniformSetters,
    attribSetters: attribSetters,
  };

  if (isWebGL2(gl)) {
    programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl, program);
    programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl, program);
  }

  return programInfo;
}

/**
 * Creates a ProgramInfo from 2 sources.
 *
 * A ProgramInfo contains
 *
 *     programInfo = {
 *        program: WebGLProgram,
 *        uniformSetters: object of setters as returned from createUniformSetters,
 *        attribSetters: object of setters as returned from createAttribSetters,
 *     }
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramInfo(gl, [vs, fs], options);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderSources Array of sources for the
 *        shaders or ids. The first is assumed to be the vertex shader,
 *        the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {module:twgl.ProgramInfo?} The created ProgramInfo or null if it failed to link or compile
 * @memberOf module:twgl/programs
 */
function createProgramInfo(
    gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  let good = true;
  shaderSources = shaderSources.map(function(source) {
    // Lets assume if there is no \n it's an id
    if (source.indexOf("\n") < 0) {
      const script = getElementById(source);
      if (!script) {
        progOptions.errorCallback("no element with id: " + source);
        good = false;
      } else {
        source = script.text;
      }
    }
    return source;
  });
  if (!good) {
    return null;
  }
  const program = createProgramFromSources(gl, shaderSources, progOptions);
  if (!program) {
    return null;
  }
  return createProgramInfoFromProgram(gl, program);
}

var programs = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createAttributeSetters: createAttributeSetters,
  createProgram: createProgram$1,
  createProgramFromScripts: createProgramFromScripts,
  createProgramFromSources: createProgramFromSources,
  createProgramInfo: createProgramInfo,
  createProgramInfoFromProgram: createProgramInfoFromProgram,
  createUniformSetters: createUniformSetters,
  createUniformBlockSpecFromProgram: createUniformBlockSpecFromProgram,
  createUniformBlockInfoFromProgram: createUniformBlockInfoFromProgram,
  createUniformBlockInfo: createUniformBlockInfo,
  createTransformFeedback: createTransformFeedback,
  createTransformFeedbackInfo: createTransformFeedbackInfo,
  bindTransformFeedbackInfo: bindTransformFeedbackInfo,
  setAttributes: setAttributes,
  setBuffersAndAttributes: setBuffersAndAttributes,
  setUniforms: setUniforms,
  setUniformsAndBindTextures: setUniformsAndBindTextures,
  setUniformBlock: setUniformBlock,
  setBlockUniforms: setBlockUniforms,
  bindUniformBlock: bindUniformBlock
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

const TRIANGLES                      = 0x0004;
const UNSIGNED_SHORT$3                 = 0x1403;

/**
 * Drawing related functions
 *
 * For backward compatibility they are available at both `twgl.draw` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/draw
 */

/**
 * Calls `gl.drawElements` or `gl.drawArrays`, whichever is appropriate
 *
 * normally you'd call `gl.drawElements` or `gl.drawArrays` yourself
 * but calling this means if you switch from indexed data to non-indexed
 * data you don't have to remember to update your draw call.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} bufferInfo A BufferInfo as returned from {@link module:twgl.createBufferInfoFromArrays} or
 *   a VertexArrayInfo as returned from {@link module:twgl.createVertexArrayInfo}
 * @param {number} [type] eg (gl.TRIANGLES, gl.LINES, gl.POINTS, gl.TRIANGLE_STRIP, ...). Defaults to `gl.TRIANGLES`
 * @param {number} [count] An optional count. Defaults to bufferInfo.numElements
 * @param {number} [offset] An optional offset. Defaults to 0.
 * @param {number} [instanceCount] An optional instanceCount. if set then `drawArraysInstanced` or `drawElementsInstanced` will be called
 * @memberOf module:twgl/draw
 */
function drawBufferInfo(gl, bufferInfo, type, count, offset, instanceCount) {
  type = type === undefined ? TRIANGLES : type;
  const indices = bufferInfo.indices;
  const elementType = bufferInfo.elementType;
  const numElements = count === undefined ? bufferInfo.numElements : count;
  offset = offset === undefined ? 0 : offset;
  if (elementType || indices) {
    if (instanceCount !== undefined) {
      gl.drawElementsInstanced(type, numElements, elementType === undefined ? UNSIGNED_SHORT$3 : bufferInfo.elementType, offset, instanceCount);
    } else {
      gl.drawElements(type, numElements, elementType === undefined ? UNSIGNED_SHORT$3 : bufferInfo.elementType, offset);
    }
  } else {
    if (instanceCount !== undefined) {
      gl.drawArraysInstanced(type, offset, numElements, instanceCount);
    } else {
      gl.drawArrays(type, offset, numElements);
    }
  }
}

/**
 * A DrawObject is useful for putting objects in to an array and passing them to {@link module:twgl.drawObjectList}.
 *
 * You need either a `BufferInfo` or a `VertexArrayInfo`.
 *
 * @typedef {Object} DrawObject
 * @property {boolean} [active] whether or not to draw. Default = `true` (must be `false` to be not true). In other words `undefined` = `true`
 * @property {number} [type] type to draw eg. `gl.TRIANGLES`, `gl.LINES`, etc...
 * @property {module:twgl.ProgramInfo} programInfo A ProgramInfo as returned from {@link module:twgl.createProgramInfo}
 * @property {module:twgl.BufferInfo} [bufferInfo] A BufferInfo as returned from {@link module:twgl.createBufferInfoFromArrays}
 * @property {module:twgl.VertexArrayInfo} [vertexArrayInfo] A VertexArrayInfo as returned from {@link module:twgl.createVertexArrayInfo}
 * @property {Object<string, ?>} uniforms The values for the uniforms.
 *   You can pass multiple objects by putting them in an array. For example
 *
 *     var sharedUniforms = {
 *       u_fogNear: 10,
 *       u_projection: ...
 *       ...
 *     };
 *
 *     var localUniforms = {
 *       u_world: ...
 *       u_diffuseColor: ...
 *     };
 *
 *     var drawObj = {
 *       ...
 *       uniforms: [sharedUniforms, localUniforms],
 *     };
 *
 * @property {number} [offset] the offset to pass to `gl.drawArrays` or `gl.drawElements`. Defaults to 0.
 * @property {number} [count] the count to pass to `gl.drawArrays` or `gl.drawElements`. Defaults to bufferInfo.numElements.
 * @property {number} [instanceCount] the number of instances. Defaults to undefined.
 * @memberOf module:twgl
 */

/**
 * Draws a list of objects
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {DrawObject[]} objectsToDraw an array of objects to draw.
 * @memberOf module:twgl/draw
 */
function drawObjectList(gl, objectsToDraw) {
  let lastUsedProgramInfo = null;
  let lastUsedBufferInfo = null;

  objectsToDraw.forEach(function(object) {
    if (object.active === false) {
      return;
    }

    const programInfo = object.programInfo;
    const bufferInfo = object.vertexArrayInfo || object.bufferInfo;
    let bindBuffers = false;
    const type = object.type === undefined ? TRIANGLES : object.type;

    if (programInfo !== lastUsedProgramInfo) {
      lastUsedProgramInfo = programInfo;
      gl.useProgram(programInfo.program);

      // We have to rebind buffers when changing programs because we
      // only bind buffers the program uses. So if 2 programs use the same
      // bufferInfo but the 1st one uses only positions the when the
      // we switch to the 2nd one some of the attributes will not be on.
      bindBuffers = true;
    }

    // Setup all the needed attributes.
    if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
      if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject && !bufferInfo.vertexArrayObject) {
        gl.bindVertexArray(null);
      }
      lastUsedBufferInfo = bufferInfo;
      setBuffersAndAttributes(gl, programInfo, bufferInfo);
    }

    // Set the uniforms.
    setUniforms(programInfo, object.uniforms);

    // Draw
    drawBufferInfo(gl, bufferInfo, type, object.count, object.offset, object.instanceCount);
  });

  if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject) {
    gl.bindVertexArray(null);
  }
}

var draw = /*#__PURE__*/Object.freeze({
  __proto__: null,
  drawBufferInfo: drawBufferInfo,
  drawObjectList: drawObjectList
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

const FRAMEBUFFER                    = 0x8d40;
const RENDERBUFFER                   = 0x8d41;
const TEXTURE_2D$2                     = 0x0de1;

const UNSIGNED_BYTE$3                  = 0x1401;

/* PixelFormat */
const DEPTH_COMPONENT$1                = 0x1902;
const RGBA$1                           = 0x1908;
const DEPTH_COMPONENT24$1              = 0x81a6;
const DEPTH_COMPONENT32F$1             = 0x8cac;
const DEPTH24_STENCIL8$1               = 0x88f0;
const DEPTH32F_STENCIL8$1              = 0x8cad;

/* Framebuffer Object. */
const RGBA4$1                          = 0x8056;
const RGB5_A1$1                        = 0x8057;
const RGB565$1                         = 0x8D62;
const DEPTH_COMPONENT16$1              = 0x81A5;
const STENCIL_INDEX                  = 0x1901;
const STENCIL_INDEX8                 = 0x8D48;
const DEPTH_STENCIL$1                  = 0x84F9;
const COLOR_ATTACHMENT0              = 0x8CE0;
const DEPTH_ATTACHMENT               = 0x8D00;
const STENCIL_ATTACHMENT             = 0x8D20;
const DEPTH_STENCIL_ATTACHMENT       = 0x821A;

/* TextureWrapMode */
const CLAMP_TO_EDGE$1                  = 0x812F;

/* TextureMagFilter */
const LINEAR$1                         = 0x2601;

/**
 * The options for a framebuffer attachment.
 *
 * Note: For a `format` that is a texture include all the texture
 * options from {@link module:twgl.TextureOptions} for example
 * `min`, `mag`, `clamp`, etc... Note that unlike {@link module:twgl.TextureOptions}
 * `auto` defaults to `false` for attachment textures but `min` and `mag` default
 * to `gl.LINEAR` and `wrap` defaults to `CLAMP_TO_EDGE`
 *
 * @typedef {Object} AttachmentOptions
 * @property {number} [attachmentPoint] The attachment point. Defaults
 *   to `gl.COLOR_ATTACHMENT0 + ndx` unless type is a depth or stencil type
 *   then it's gl.DEPTH_ATTACHMENT or `gl.DEPTH_STENCIL_ATTACHMENT` depending
 *   on the format or attachment type.
 * @property {number} [format] The format. If one of `gl.RGBA4`,
 *   `gl.RGB565`, `gl.RGB5_A1`, `gl.DEPTH_COMPONENT16`,
 *   `gl.STENCIL_INDEX8` or `gl.DEPTH_STENCIL` then will create a
 *   renderbuffer. Otherwise will create a texture. Default = `gl.RGBA`
 * @property {number} [type] The type. Used for texture. Default = `gl.UNSIGNED_BYTE`.
 * @property {number} [target] The texture target for `gl.framebufferTexture2D`.
 *   Defaults to `gl.TEXTURE_2D`. Set to appropriate face for cube maps.
 * @property {number} [level] level for `gl.framebufferTexture2D`. Defaults to 0.
 * @property {number} [layer] layer for `gl.framebufferTextureLayer`. Defaults to undefined.
 *   If set then `gl.framebufferTextureLayer` is called, if not then `gl.framebufferTexture2D`
 * @property {WebGLObject} [attachment] An existing renderbuffer or texture.
 *    If provided will attach this Object. This allows you to share
 *    attachments across framebuffers.
 * @memberOf module:twgl
 * @mixes module:twgl.TextureOptions
 */

const defaultAttachments = [
  { format: RGBA$1, type: UNSIGNED_BYTE$3, min: LINEAR$1, wrap: CLAMP_TO_EDGE$1, },
  { format: DEPTH_STENCIL$1, },
];

const attachmentsByFormat = {};
attachmentsByFormat[DEPTH_STENCIL$1] = DEPTH_STENCIL_ATTACHMENT;
attachmentsByFormat[STENCIL_INDEX] = STENCIL_ATTACHMENT;
attachmentsByFormat[STENCIL_INDEX8] = STENCIL_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT16$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT24$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT32F$1] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH24_STENCIL8$1] = DEPTH_STENCIL_ATTACHMENT;
attachmentsByFormat[DEPTH32F_STENCIL8$1] = DEPTH_STENCIL_ATTACHMENT;

function getAttachmentPointForFormat(format, internalFormat) {
  return attachmentsByFormat[format] || attachmentsByFormat[internalFormat];
}

const renderbufferFormats = {};
renderbufferFormats[RGBA4$1] = true;
renderbufferFormats[RGB5_A1$1] = true;
renderbufferFormats[RGB565$1] = true;
renderbufferFormats[DEPTH_STENCIL$1] = true;
renderbufferFormats[DEPTH_COMPONENT16$1] = true;
renderbufferFormats[STENCIL_INDEX] = true;
renderbufferFormats[STENCIL_INDEX8] = true;

function isRenderbufferFormat(format) {
  return renderbufferFormats[format];
}

/**
 * @typedef {Object} FramebufferInfo
 * @property {WebGLFramebuffer} framebuffer The WebGLFramebuffer for this framebufferInfo
 * @property {WebGLObject[]} attachments The created attachments in the same order as passed in to {@link module:twgl.createFramebufferInfo}.
 * @property {number} width The width of the framebuffer and its attachments
 * @property {number} height The width of the framebuffer and its attachments
 * @memberOf module:twgl
 */

/**
 * Creates a framebuffer and attachments.
 *
 * This returns a {@link module:twgl.FramebufferInfo} because it needs to return the attachments as well as the framebuffer.
 *
 * The simplest usage
 *
 *     // create an RGBA/UNSIGNED_BYTE texture and DEPTH_STENCIL renderbuffer
 *     const fbi = twgl.createFramebufferInfo(gl);
 *
 * More complex usage
 *
 *     // create an RGB565 renderbuffer and a STENCIL_INDEX8 renderbuffer
 *     const attachments = [
 *       { format: RGB565, mag: NEAREST },
 *       { format: STENCIL_INDEX8 },
 *     ]
 *     const fbi = twgl.createFramebufferInfo(gl, attachments);
 *
 * Passing in a specific size
 *
 *     const width = 256;
 *     const height = 256;
 *     const fbi = twgl.createFramebufferInfo(gl, attachments, width, height);
 *
 * **Note!!** It is up to you to check if the framebuffer is renderable by calling `gl.checkFramebufferStatus`.
 * [WebGL1 only guarantees 3 combinations of attachments work](https://www.khronos.org/registry/webgl/specs/latest/1.0/#6.6).
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.AttachmentOptions[]} [attachments] which attachments to create. If not provided the default is a framebuffer with an
 *    `RGBA`, `UNSIGNED_BYTE` texture `COLOR_ATTACHMENT0` and a `DEPTH_STENCIL` renderbuffer `DEPTH_STENCIL_ATTACHMENT`.
 * @param {number} [width] the width for the attachments. Default = size of drawingBuffer
 * @param {number} [height] the height for the attachments. Default = size of drawingBuffer
 * @return {module:twgl.FramebufferInfo} the framebuffer and attachments.
 * @memberOf module:twgl/framebuffers
 */
function createFramebufferInfo(gl, attachments, width, height) {
  const target = FRAMEBUFFER;
  const fb = gl.createFramebuffer();
  gl.bindFramebuffer(target, fb);
  width  = width  || gl.drawingBufferWidth;
  height = height || gl.drawingBufferHeight;
  attachments = attachments || defaultAttachments;
  let colorAttachmentCount = 0;
  const framebufferInfo = {
    framebuffer: fb,
    attachments: [],
    width: width,
    height: height,
  };
  attachments.forEach(function(attachmentOptions) {
    let attachment = attachmentOptions.attachment;
    const format = attachmentOptions.format;
    let attachmentPoint = attachmentOptions.attachmentPoint || getAttachmentPointForFormat(format, attachmentOptions.internalFormat);
    if (!attachmentPoint) {
      attachmentPoint = COLOR_ATTACHMENT0 + colorAttachmentCount++;
    }
    if (!attachment) {
      if (isRenderbufferFormat(format)) {
        attachment = gl.createRenderbuffer();
        gl.bindRenderbuffer(RENDERBUFFER, attachment);
        gl.renderbufferStorage(RENDERBUFFER, format, width, height);
      } else {
        const textureOptions = Object.assign({}, attachmentOptions);
        textureOptions.width = width;
        textureOptions.height = height;
        if (textureOptions.auto === undefined) {
          textureOptions.auto = false;
          textureOptions.min = textureOptions.min || textureOptions.minMag || LINEAR$1;
          textureOptions.mag = textureOptions.mag || textureOptions.minMag || LINEAR$1;
          textureOptions.wrapS = textureOptions.wrapS || textureOptions.wrap || CLAMP_TO_EDGE$1;
          textureOptions.wrapT = textureOptions.wrapT || textureOptions.wrap || CLAMP_TO_EDGE$1;
        }
        attachment = createTexture(gl, textureOptions);
      }
    }
    if (isRenderbuffer(gl, attachment)) {
      gl.framebufferRenderbuffer(target, attachmentPoint, RENDERBUFFER, attachment);
    } else if (isTexture(gl, attachment)) {
      if (attachmentOptions.layer !== undefined) {
        gl.framebufferTextureLayer(
          target,
          attachmentPoint,
          attachment,
          attachmentOptions.level || 0,
          attachmentOptions.layer);
      } else {
        gl.framebufferTexture2D(
            target,
            attachmentPoint,
            attachmentOptions.target || TEXTURE_2D$2,
            attachment,
            attachmentOptions.level || 0);
      }
    } else {
      throw new Error('unknown attachment type');
    }
    framebufferInfo.attachments.push(attachment);
  });
  return framebufferInfo;
}

/**
 * Resizes the attachments of a framebuffer.
 *
 * You need to pass in the same `attachments` as you passed in {@link module:twgl.createFramebufferInfo}
 * because TWGL has no idea the format/type of each attachment.
 *
 * The simplest usage
 *
 *     // create an RGBA/UNSIGNED_BYTE texture and DEPTH_STENCIL renderbuffer
 *     const fbi = twgl.createFramebufferInfo(gl);
 *
 *     ...
 *
 *     function render() {
 *       if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
 *         // resize the attachments
 *         twgl.resizeFramebufferInfo(gl, fbi);
 *       }
 *
 * More complex usage
 *
 *     // create an RGB565 renderbuffer and a STENCIL_INDEX8 renderbuffer
 *     const attachments = [
 *       { format: RGB565, mag: NEAREST },
 *       { format: STENCIL_INDEX8 },
 *     ]
 *     const fbi = twgl.createFramebufferInfo(gl, attachments);
 *
 *     ...
 *
 *     function render() {
 *       if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
 *         // resize the attachments to match
 *         twgl.resizeFramebufferInfo(gl, fbi, attachments);
 *       }
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.FramebufferInfo} framebufferInfo a framebufferInfo as returned from {@link module:twgl.createFramebufferInfo}.
 * @param {module:twgl.AttachmentOptions[]} [attachments] the same attachments options as passed to {@link module:twgl.createFramebufferInfo}.
 * @param {number} [width] the width for the attachments. Default = size of drawingBuffer
 * @param {number} [height] the height for the attachments. Default = size of drawingBuffer
 * @memberOf module:twgl/framebuffers
 */
function resizeFramebufferInfo(gl, framebufferInfo, attachments, width, height) {
  width  = width  || gl.drawingBufferWidth;
  height = height || gl.drawingBufferHeight;
  framebufferInfo.width = width;
  framebufferInfo.height = height;
  attachments = attachments || defaultAttachments;
  attachments.forEach(function(attachmentOptions, ndx) {
    const attachment = framebufferInfo.attachments[ndx];
    const format = attachmentOptions.format;
    if (isRenderbuffer(gl, attachment)) {
      gl.bindRenderbuffer(RENDERBUFFER, attachment);
      gl.renderbufferStorage(RENDERBUFFER, format, width, height);
    } else if (isTexture(gl, attachment)) {
      resizeTexture(gl, attachment, attachmentOptions, width, height);
    } else {
      throw new Error('unknown attachment type');
    }
  });
}

/**
 * Binds a framebuffer
 *
 * This function pretty much solely exists because I spent hours
 * trying to figure out why something I wrote wasn't working only
 * to realize I forget to set the viewport dimensions.
 * My hope is this function will fix that.
 *
 * It is effectively the same as
 *
 *     gl.bindFramebuffer(gl.FRAMEBUFFER, someFramebufferInfo.framebuffer);
 *     gl.viewport(0, 0, someFramebufferInfo.width, someFramebufferInfo.height);
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.FramebufferInfo|null} [framebufferInfo] a framebufferInfo as returned from {@link module:twgl.createFramebufferInfo}.
 *   If falsy will bind the canvas.
 * @param {number} [target] The target. If not passed `gl.FRAMEBUFFER` will be used.
 * @memberOf module:twgl/framebuffers
 */

function bindFramebufferInfo(gl, framebufferInfo, target) {
  target = target || FRAMEBUFFER;
  if (framebufferInfo) {
    gl.bindFramebuffer(target, framebufferInfo.framebuffer);
    gl.viewport(0, 0, framebufferInfo.width, framebufferInfo.height);
  } else {
    gl.bindFramebuffer(target, null);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  }
}

var framebuffers = /*#__PURE__*/Object.freeze({
  __proto__: null,
  bindFramebufferInfo: bindFramebufferInfo,
  createFramebufferInfo: createFramebufferInfo,
  resizeFramebufferInfo: resizeFramebufferInfo
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * vertex array object related functions
 *
 * You should generally not need to use these functions. They are provided
 * for those cases where you're doing something out of the ordinary
 * and you need lower level access.
 *
 * For backward compatibility they are available at both `twgl.attributes` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/vertexArrays
 */

const ELEMENT_ARRAY_BUFFER$2           = 0x8893;

/**
 * @typedef {Object} VertexArrayInfo
 * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
 * @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
 * @property {WebGLVertexArrayObject} [vertexArrayObject] a vertex array object
 * @memberOf module:twgl
 */

/**
 * Creates a VertexArrayInfo from a BufferInfo and one or more ProgramInfos
 *
 * This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
 * {@link module:twgl:drawBufferInfo}.
 *
 * > **IMPORTANT:** Vertex Array Objects are **not** a direct analog for a BufferInfo. Vertex Array Objects
 *   assign buffers to specific attributes at creation time. That means they can only be used with programs
 *   who's attributes use the same attribute locations for the same purposes.
 *
 * > Bind your attribute locations by passing an array of attribute names to {@link module:twgl.createProgramInfo}
 *   or use WebGL 2's GLSL ES 3's `layout(location = <num>)` to make sure locations match.
 *
 * also
 *
 * > **IMPORTANT:** After calling twgl.setBuffersAndAttribute with a BufferInfo that uses a Vertex Array Object
 *   that Vertex Array Object will be bound. That means **ANY MANIPULATION OF ELEMENT_ARRAY_BUFFER or ATTRIBUTES**
 *   will affect the Vertex Array Object state.
 *
 * > Call `gl.bindVertexArray(null)` to get back manipulating the global attributes and ELEMENT_ARRAY_BUFFER.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.ProgramInfo|module:twgl.ProgramInfo[]} programInfo a programInfo or array of programInfos
 * @param {module:twgl.BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
 *
 *    You need to make sure every attribute that will be used is bound. So for example assume shader 1
 *    uses attributes A, B, C and shader 2 uses attributes A, B, D. If you only pass in the programInfo
 *    for shader 1 then only attributes A, B, and C will have their attributes set because TWGL doesn't
 *    now attribute D's location.
 *
 *    So, you can pass in both shader 1 and shader 2's programInfo
 *
 * @return {module:twgl.VertexArrayInfo} The created VertexArrayInfo
 *
 * @memberOf module:twgl/vertexArrays
 */
function createVertexArrayInfo(gl, programInfos, bufferInfo) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  if (!programInfos.length) {
    programInfos = [programInfos];
  }
  programInfos.forEach(function(programInfo) {
    setBuffersAndAttributes(gl, programInfo, bufferInfo);
  });
  gl.bindVertexArray(null);
  return {
    numElements: bufferInfo.numElements,
    elementType: bufferInfo.elementType,
    vertexArrayObject: vao,
  };
}

/**
 * Creates a vertex array object and then sets the attributes on it
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
 * @param {Object.<string, module:twgl.AttribInfo>} attribs AttribInfos mapped by attribute name.
 * @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
 * @memberOf module:twgl/vertexArrays
 */
function createVAOAndSetAttributes(gl, setters, attribs, indices) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  setAttributes(setters, attribs);
  if (indices) {
    gl.bindBuffer(ELEMENT_ARRAY_BUFFER$2, indices);
  }
  // We unbind this because otherwise any change to ELEMENT_ARRAY_BUFFER
  // like when creating buffers for other stuff will mess up this VAO's binding
  gl.bindVertexArray(null);
  return vao;
}

/**
 * Creates a vertex array object and then sets the attributes
 * on it
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {Object.<string, function>| module:twgl.ProgramInfo} programInfo as returned from createProgramInfo or Attribute setters as returned from createAttributeSetters
 * @param {module:twgl.BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
 * @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
 * @memberOf module:twgl/vertexArrays
 */
function createVAOFromBufferInfo(gl, programInfo, bufferInfo) {
  return createVAOAndSetAttributes(gl, programInfo.attribSetters || programInfo, bufferInfo.attribs, bufferInfo.indices);
}

var vertexArrays = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createVertexArrayInfo: createVertexArrayInfo,
  createVAOAndSetAttributes: createVAOAndSetAttributes,
  createVAOFromBufferInfo: createVAOFromBufferInfo
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
const defaults$2 = {
  addExtensionsToContext: true,
};

/**
 * Various default settings for twgl.
 *
 * Note: You can call this any number of times. Example:
 *
 *     twgl.setDefaults({ textureColor: [1, 0, 0, 1] });
 *     twgl.setDefaults({ attribPrefix: 'a_' });
 *
 * is equivalent to
 *
 *     twgl.setDefaults({
 *       textureColor: [1, 0, 0, 1],
 *       attribPrefix: 'a_',
 *     });
 *
 * @typedef {Object} Defaults
 * @property {string} [attribPrefix] The prefix to stick on attributes
 *
 *   When writing shaders I prefer to name attributes with `a_`, uniforms with `u_` and varyings with `v_`
 *   as it makes it clear where they came from. But, when building geometry I prefer using un-prefixed names.
 *
 *   In other words I'll create arrays of geometry like this
 *
 *       const arrays = {
 *         position: ...
 *         normal: ...
 *         texcoord: ...
 *       };
 *
 *   But need those mapped to attributes and my attributes start with `a_`.
 *
 *   Default: `""`
 *
 * @property {number[]} [textureColor] Array of 4 values in the range 0 to 1
 *
 *   The default texture color is used when loading textures from
 *   urls. Because the URL will be loaded async we'd like to be
 *   able to use the texture immediately. By putting a 1x1 pixel
 *   color in the texture we can start using the texture before
 *   the URL has loaded.
 *
 *   Default: `[0.5, 0.75, 1, 1]`
 *
 * @property {string} [crossOrigin]
 *
 *   If not undefined sets the crossOrigin attribute on images
 *   that twgl creates when downloading images for textures.
 *
 *   Also see {@link module:twgl.TextureOptions}.
 *
 * @property {bool} [addExtensionsToContext]
 *
 *   If true, then, when twgl will try to add any supported WebGL extensions
 *   directly to the context under their normal GL names. For example
 *   if ANGLE_instances_arrays exists then twgl would enable it,
 *   add the functions `vertexAttribDivisor`, `drawArraysInstanced`,
 *   `drawElementsInstanced`, and the constant `VERTEX_ATTRIB_ARRAY_DIVISOR`
 *   to the `WebGLRenderingContext`.
 *
 * @memberOf module:twgl
 */

/**
 * Sets various defaults for twgl.
 *
 * In the interest of terseness which is kind of the point
 * of twgl I've integrated a few of the older functions here
 *
 * @param {module:twgl.Defaults} newDefaults The default settings.
 * @memberOf module:twgl
 */
function setDefaults$2(newDefaults) {
  copyExistingProperties(newDefaults, defaults$2);
  setDefaults(newDefaults);  // eslint-disable-line
  setDefaults$1(newDefaults);  // eslint-disable-line
}

const prefixRE = /^(.*?)_/;
function addExtensionToContext(gl, extensionName) {
  glEnumToString(gl, 0);
  const ext = gl.getExtension(extensionName);
  if (ext) {
    const enums = {};
    const fnSuffix = prefixRE.exec(extensionName)[1];
    const enumSuffix = '_' + fnSuffix;
    for (const key in ext) {
      const value = ext[key];
      const isFunc = typeof (value) === 'function';
      const suffix = isFunc ? fnSuffix : enumSuffix;
      let name = key;
      // examples of where this is not true are WEBGL_compressed_texture_s3tc
      // and WEBGL_compressed_texture_pvrtc
      if (key.endsWith(suffix)) {
        name = key.substring(0, key.length - suffix.length);
      }
      if (gl[name] !== undefined) {
        if (!isFunc && gl[name] !== value) {
          warn(name, gl[name], value, key);
        }
      } else {
        if (isFunc) {
          gl[name] = function(origFn) {
            return function() {
              return origFn.apply(ext, arguments);
            };
          }(value);
        } else {
          gl[name] = value;
          enums[name] = value;
        }
      }
    }
    // pass the modified enums to glEnumToString
    enums.constructor = {
      name: ext.constructor.name,
    };
    glEnumToString(enums, 0);
  }
  return ext;
}

/*
 * If you're wondering why the code doesn't just iterate
 * over all extensions using `gl.getExtensions` is that it's possible
 * some future extension is incompatible with this code. Rather than
 * have thing suddenly break it seems better to manually add to this
 * list.
 *
 */
const supportedExtensions = [
  'ANGLE_instanced_arrays',
  'EXT_blend_minmax',
  'EXT_color_buffer_float',
  'EXT_color_buffer_half_float',
  'EXT_disjoint_timer_query',
  'EXT_disjoint_timer_query_webgl2',
  'EXT_frag_depth',
  'EXT_sRGB',
  'EXT_shader_texture_lod',
  'EXT_texture_filter_anisotropic',
  'OES_element_index_uint',
  'OES_standard_derivatives',
  'OES_texture_float',
  'OES_texture_float_linear',
  'OES_texture_half_float',
  'OES_texture_half_float_linear',
  'OES_vertex_array_object',
  'WEBGL_color_buffer_float',
  'WEBGL_compressed_texture_atc',
  'WEBGL_compressed_texture_etc1',
  'WEBGL_compressed_texture_pvrtc',
  'WEBGL_compressed_texture_s3tc',
  'WEBGL_compressed_texture_s3tc_srgb',
  'WEBGL_depth_texture',
  'WEBGL_draw_buffers',
];

/**
 * Attempts to enable all of the following extensions
 * and add their functions and constants to the
 * `WebGLRenderingContext` using their normal non-extension like names.
 *
 *      ANGLE_instanced_arrays
 *      EXT_blend_minmax
 *      EXT_color_buffer_float
 *      EXT_color_buffer_half_float
 *      EXT_disjoint_timer_query
 *      EXT_disjoint_timer_query_webgl2
 *      EXT_frag_depth
 *      EXT_sRGB
 *      EXT_shader_texture_lod
 *      EXT_texture_filter_anisotropic
 *      OES_element_index_uint
 *      OES_standard_derivatives
 *      OES_texture_float
 *      OES_texture_float_linear
 *      OES_texture_half_float
 *      OES_texture_half_float_linear
 *      OES_vertex_array_object
 *      WEBGL_color_buffer_float
 *      WEBGL_compressed_texture_atc
 *      WEBGL_compressed_texture_etc1
 *      WEBGL_compressed_texture_pvrtc
 *      WEBGL_compressed_texture_s3tc
 *      WEBGL_compressed_texture_s3tc_srgb
 *      WEBGL_depth_texture
 *      WEBGL_draw_buffers
 *
 * For example if `ANGLE_instanced_arrays` exists then the functions
 * `drawArraysInstanced`, `drawElementsInstanced`, `vertexAttribDivisor`
 * and the constant `VERTEX_ATTRIB_ARRAY_DIVISOR` are added to the
 * `WebGLRenderingContext`.
 *
 * Note that if you want to know if the extension exists you should
 * probably call `gl.getExtension` for each extension. Alternatively
 * you can check for the existence of the functions or constants that
 * are expected to be added. For example
 *
 *    if (gl.drawBuffers) {
 *      // Either WEBGL_draw_buffers was enabled OR you're running in WebGL2
 *      ....
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @memberOf module:twgl
 */
function addExtensionsToContext(gl) {
  for (let ii = 0; ii < supportedExtensions.length; ++ii) {
    addExtensionToContext(gl, supportedExtensions[ii]);
  }
}

/**
 * Creates a webgl context.
 * @param {HTMLCanvasElement} canvas The canvas tag to get
 *     context from. If one is not passed in one will be
 *     created.
 * @return {WebGLRenderingContext} The created context.
 * @private
 */
function create3DContext(canvas, opt_attribs) {
  const names = ["webgl", "experimental-webgl"];
  let context = null;
  for (let ii = 0; ii < names.length; ++ii) {
    context = canvas.getContext(names[ii], opt_attribs);
    if (context) {
      if (defaults$2.addExtensionsToContext) {
        addExtensionsToContext(context);
      }
      break;
    }
  }
  return context;
}

/**
 * Gets a WebGL1 context.
 *
 * Note: Will attempt to enable Vertex Array Objects
 * and add WebGL2 entry points. (unless you first set defaults with
 * `twgl.setDefaults({enableVertexArrayObjects: false})`;
 *
 * @param {HTMLCanvasElement} canvas a canvas element.
 * @param {WebGLContextAttributes} [opt_attribs] optional webgl context creation attributes
 * @return {WebGLRenderingContext} The created context.
 * @memberOf module:twgl
 */
function getWebGLContext(canvas, opt_attribs) {
  const gl = create3DContext(canvas, opt_attribs);
  return gl;
}

/**
 * Creates a webgl context.
 *
 * Will return a WebGL2 context if possible.
 *
 * You can check if it's WebGL2 with
 *
 *     twgl.isWebGL2(gl);
 *
 * @param {HTMLCanvasElement} canvas The canvas tag to get
 *     context from. If one is not passed in one will be
 *     created.
 * @return {WebGLRenderingContext} The created context.
 */
function createContext(canvas, opt_attribs) {
  const names = ["webgl2", "webgl", "experimental-webgl"];
  let context = null;
  for (let ii = 0; ii < names.length; ++ii) {
    context = canvas.getContext(names[ii], opt_attribs);
    if (context) {
      if (defaults$2.addExtensionsToContext) {
        addExtensionsToContext(context);
      }
      break;
    }
  }
  return context;
}

/**
 * Gets a WebGL context.  Will create a WebGL2 context if possible.
 *
 * You can check if it's WebGL2 with
 *
 *    function isWebGL2(gl) {
 *      return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0 ") == 0;
 *    }
 *
 * Note: For a WebGL1 context will attempt to enable Vertex Array Objects
 * and add WebGL2 entry points. (unless you first set defaults with
 * `twgl.setDefaults({enableVertexArrayObjects: false})`;
 *
 * @param {HTMLCanvasElement} canvas a canvas element.
 * @param {WebGLContextAttributes} [opt_attribs] optional webgl context creation attributes
 * @return {WebGLRenderingContext} The created context.
 * @memberOf module:twgl
 */
function getContext(canvas, opt_attribs) {
  const gl = createContext(canvas, opt_attribs);
  return gl;
}

/**
 * Resize a canvas to match the size it's displayed.
 * @param {HTMLCanvasElement} canvas The canvas to resize.
 * @param {number} [multiplier] So you can pass in `window.devicePixelRatio` or other scale value if you want to.
 * @return {boolean} true if the canvas was resized.
 * @memberOf module:twgl
 */
function resizeCanvasToDisplaySize(canvas, multiplier) {
  multiplier = multiplier || 1;
  multiplier = Math.max(0, multiplier);
  const width  = canvas.clientWidth  * multiplier | 0;
  const height = canvas.clientHeight * multiplier | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

var twglFull_module = /*#__PURE__*/Object.freeze({
  __proto__: null,
  addExtensionsToContext: addExtensionsToContext,
  attributes: attributes,
  bindFramebufferInfo: bindFramebufferInfo,
  bindTransformFeedbackInfo: bindTransformFeedbackInfo,
  bindUniformBlock: bindUniformBlock,
  canFilter: canFilter,
  canGenerateMipmap: canGenerateMipmap,
  createAttribsFromArrays: createAttribsFromArrays,
  createAttributeSetters: createAttributeSetters,
  createBufferFromArray: createBufferFromArray,
  createBufferFromTypedArray: createBufferFromTypedArray,
  createBufferInfoFromArrays: createBufferInfoFromArrays,
  createBuffersFromArrays: createBuffersFromArrays,
  createFramebufferInfo: createFramebufferInfo,
  createProgram: createProgram$1,
  createProgramFromScripts: createProgramFromScripts,
  createProgramFromSources: createProgramFromSources,
  createProgramInfo: createProgramInfo,
  createProgramInfoFromProgram: createProgramInfoFromProgram,
  createSampler: createSampler,
  createSamplers: createSamplers,
  createTexture: createTexture,
  createTextures: createTextures,
  createTransformFeedback: createTransformFeedback,
  createTransformFeedbackInfo: createTransformFeedbackInfo,
  createUniformBlockInfo: createUniformBlockInfo,
  createUniformBlockInfoFromProgram: createUniformBlockInfoFromProgram,
  createUniformBlockSpecFromProgram: createUniformBlockSpecFromProgram,
  createUniformSetters: createUniformSetters,
  createVAOAndSetAttributes: createVAOAndSetAttributes,
  createVAOFromBufferInfo: createVAOFromBufferInfo,
  createVertexArrayInfo: createVertexArrayInfo,
  draw: draw,
  drawBufferInfo: drawBufferInfo,
  drawObjectList: drawObjectList,
  framebuffers: framebuffers,
  getArray_: getArray,
  getBytesPerElementForInternalFormat: getBytesPerElementForInternalFormat,
  getContext: getContext,
  getFormatAndTypeForInternalFormat: getFormatAndTypeForInternalFormat,
  getGLTypeForTypedArray: getGLTypeForTypedArray,
  getGLTypeForTypedArrayType: getGLTypeForTypedArrayType,
  getNumComponentsForFormat: getNumComponentsForFormat,
  getNumComponents_: getNumComponents,
  getTypedArrayTypeForGLType: getTypedArrayTypeForGLType,
  getWebGLContext: getWebGLContext,
  glEnumToString: glEnumToString,
  isArrayBuffer: isArrayBuffer,
  isWebGL1: isWebGL1,
  isWebGL2: isWebGL2,
  loadTextureFromUrl: loadTextureFromUrl,
  m4: m4,
  primitives: primitives,
  programs: programs,
  resizeCanvasToDisplaySize: resizeCanvasToDisplaySize,
  resizeFramebufferInfo: resizeFramebufferInfo,
  resizeTexture: resizeTexture,
  setAttribInfoBufferFromArray: setAttribInfoBufferFromArray,
  setAttributeDefaults_: setDefaults,
  setAttributePrefix: setAttributePrefix,
  setAttributes: setAttributes,
  setBlockUniforms: setBlockUniforms,
  setBuffersAndAttributes: setBuffersAndAttributes,
  setDefaultTextureColor: setDefaultTextureColor,
  setDefaults: setDefaults$2,
  setEmptyTexture: setEmptyTexture,
  setSamplerParameters: setSamplerParameters,
  setTextureDefaults_: setDefaults$1,
  setTextureFilteringForSize: setTextureFilteringForSize,
  setTextureFromArray: setTextureFromArray,
  setTextureFromElement: setTextureFromElement,
  setTextureParameters: setTextureParameters,
  setUniformBlock: setUniformBlock,
  setUniforms: setUniforms,
  setUniformsAndBindTextures: setUniformsAndBindTextures,
  textures: textures,
  typedarrays: typedarrays,
  utils: utils,
  v3: v3,
  vertexArrays: vertexArrays
});

function assert$2(condition, message) {
  if (!condition) {
    throw new Error(message || 'loader assertion failed.');
  }
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var globals$1 = {
  self: typeof self !== 'undefined' && self,
  window: typeof window !== 'undefined' && window,
  global: typeof global !== 'undefined' && global,
  document: typeof document !== 'undefined' && document
};
var self_ = globals$1.self || globals$1.window || globals$1.global;
var window_ = globals$1.window || globals$1.self || globals$1.global;
var global_$1 = globals$1.global || globals$1.self || globals$1.window;
var document_ = globals$1.document || {};
var isBrowser$1 = (typeof process === "undefined" ? "undefined" : _typeof(process)) !== 'object' || String(process) !== '[object process]' || process.browser;
var isWorker = typeof importScripts === 'function';
var matches$1 = typeof process !== 'undefined' && process.version && process.version.match(/v([0-9]*)/);
var nodeVersion = matches$1 && parseFloat(matches$1[1]) || 0;

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function getTransferList(object) {
  var recursive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var transfers = arguments.length > 2 ? arguments[2] : undefined;
  var transfersSet = transfers || new Set();

  if (!object) ; else if (isTransferable(object)) {
    transfersSet.add(object);
  } else if (isTransferable(object.buffer)) {
    transfersSet.add(object.buffer);
  } else if (ArrayBuffer.isView(object)) ; else if (recursive && _typeof(object) === 'object') {
    for (var key in object) {
      getTransferList(object[key], recursive, transfersSet);
    }
  }

  return transfers === undefined ? Array.from(transfersSet) : [];
}

function isTransferable(object) {
  if (!object) {
    return false;
  }

  if (object instanceof ArrayBuffer) {
    return true;
  }

  if (typeof MessagePort !== 'undefined' && object instanceof MessagePort) {
    return true;
  }

  if (typeof ImageBitmap !== 'undefined' && object instanceof ImageBitmap) {
    return true;
  }

  if (typeof OffscreenCanvas !== 'undefined' && object instanceof OffscreenCanvas) {
    return true;
  }

  return false;
}

var VERSION$7 = "2.3.13" ;
function validateLoaderVersion(loader) {
  var coreVersion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : VERSION$7;
  assert$2(loader, 'no loader provided');
  var loaderVersion = loader.version;

  if (!coreVersion || !loaderVersion) {
    return;
  }

  coreVersion = parseVersion(coreVersion);
  loaderVersion = parseVersion(loaderVersion);
}

function parseVersion(version) {
  var parts = version.split('.').map(Number);
  return {
    major: parts[0],
    minor: parts[1]
  };
}

function _AwaitValue(value) {
  this.wrapped = value;
}

function _awaitAsyncGenerator(value) {
  return new _AwaitValue(value);
}

function AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var wrappedAwait = value instanceof _AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
        if (wrappedAwait) {
          resume(key === "return" ? "return" : "next", arg);
          return;
        }

        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: true
        });
        break;

      case "throw":
        front.reject(value);
        break;

      default:
        front.resolve({
          value: value,
          done: false
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen["return"] !== "function") {
    this["return"] = undefined;
  }
}

if (typeof Symbol === "function" && Symbol.asyncIterator) {
  AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
    return this;
  };
}

AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

AsyncGenerator.prototype["throw"] = function (arg) {
  return this._invoke("throw", arg);
};

AsyncGenerator.prototype["return"] = function (arg) {
  return this._invoke("return", arg);
};

function _wrapAsyncGenerator(fn) {
  return function () {
    return new AsyncGenerator(fn.apply(this, arguments));
  };
}

function _asyncIterator(iterable) {
  var method;

  if (typeof Symbol !== "undefined") {
    if (Symbol.asyncIterator) {
      method = iterable[Symbol.asyncIterator];
      if (method != null) return method.call(iterable);
    }

    if (Symbol.iterator) {
      method = iterable[Symbol.iterator];
      if (method != null) return method.call(iterable);
    }
  }

  throw new TypeError("Object is not async iterable");
}

function makeTransformIterator(_x, _x2, _x3) {
  return _makeTransformIterator.apply(this, arguments);
}

function _makeTransformIterator() {
  _makeTransformIterator = _wrapAsyncGenerator(regenerator.mark(function _callee(asyncIterator, IncrementalTransform, options) {
    var transform, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, chunk, _output, output;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            transform = new IncrementalTransform(options);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context.prev = 3;
            _iterator = _asyncIterator(asyncIterator);

          case 5:
            _context.next = 7;
            return _awaitAsyncGenerator(_iterator.next());

          case 7:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 11;
            return _awaitAsyncGenerator(_step.value);

          case 11:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 23;
              break;
            }

            chunk = _value;
            _context.next = 16;
            return _awaitAsyncGenerator(transform.write(chunk));

          case 16:
            _output = _context.sent;

            if (!_output) {
              _context.next = 20;
              break;
            }

            _context.next = 20;
            return _output;

          case 20:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 23:
            _context.next = 29;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](3);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 29:
            _context.prev = 29;
            _context.prev = 30;

            if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
              _context.next = 34;
              break;
            }

            _context.next = 34;
            return _awaitAsyncGenerator(_iterator["return"]());

          case 34:
            _context.prev = 34;

            if (!_didIteratorError) {
              _context.next = 37;
              break;
            }

            throw _iteratorError;

          case 37:
            return _context.finish(34);

          case 38:
            return _context.finish(29);

          case 39:
            _context.next = 41;
            return _awaitAsyncGenerator(transform.end());

          case 41:
            output = _context.sent;

            if (!output) {
              _context.next = 45;
              break;
            }

            _context.next = 45;
            return output;

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 25, 29, 39], [30,, 34, 38]]);
  }));
  return _makeTransformIterator.apply(this, arguments);
}

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  return Constructor;
}

var workerURLCache = new Map();
function getWorkerURL(workerSource) {
  assert$2(typeof workerSource === 'string', 'worker source');

  if (workerSource.startsWith('url(') && workerSource.endsWith(')')) {
    var workerUrl = workerSource.match(/^url\((.*)\)$/)[1];

    if (workerUrl && !workerUrl.startsWith('http')) {
      return workerUrl;
    }

    workerSource = buildScript(workerUrl);
  }

  var workerURL = workerURLCache.get(workerSource);

  if (!workerURL) {
    var blob = new Blob([workerSource], {
      type: 'application/javascript'
    });
    workerURL = URL.createObjectURL(blob);
    workerURLCache.set(workerSource, workerURL);
  }

  return workerURL;
}

function buildScript(workerUrl) {
  return "try {\n  importScripts('".concat(workerUrl, "');\n} catch (error) {\n  console.error(error);\n}");
}

var count = 0;

function defaultOnMessage(_ref) {
  var data = _ref.data,
      resolve = _ref.resolve;
  resolve(data);
}

var WorkerThread = function () {
  function WorkerThread(_ref2) {
    var source = _ref2.source,
        _ref2$name = _ref2.name,
        name = _ref2$name === void 0 ? "web-worker-".concat(count++) : _ref2$name,
        onMessage = _ref2.onMessage;

    _classCallCheck$1(this, WorkerThread);

    var url = getWorkerURL(source);
    this.worker = new Worker(url, {
      name: name
    });
    this.name = name;
    this.onMessage = onMessage || defaultOnMessage;
  }

  _createClass$1(WorkerThread, [{
    key: "process",
    value: function () {
      var _process = _asyncToGenerator(regenerator.mark(function _callee(data) {
        var _this = this;

        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  _this.worker.onmessage = function (event) {
                    _this.onMessage({
                      worker: _this.worker,
                      data: event.data,
                      resolve: resolve,
                      reject: reject
                    });
                  };

                  _this.worker.onerror = function (error) {
                    var message = "".concat(_this.name, ": WorkerThread.process() failed");

                    if (error.message) {
                      message += " ".concat(error.message, " ").concat(error.filename, ":").concat(error.lineno, ":").concat(error.colno);
                    }

                    var betterError = new Error(message);
                    console.error(error);
                    reject(betterError);
                  };

                  var transferList = getTransferList(data);

                  _this.worker.postMessage(data, transferList);
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function process(_x) {
        return _process.apply(this, arguments);
      }

      return process;
    }()
  }, {
    key: "destroy",
    value: function destroy() {
      this.worker.terminate();
      this.worker = null;
    }
  }]);

  return WorkerThread;
}();

var WorkerPool = function () {
  function WorkerPool(_ref) {
    var source = _ref.source,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'unnamed' : _ref$name,
        _ref$maxConcurrency = _ref.maxConcurrency,
        maxConcurrency = _ref$maxConcurrency === void 0 ? 1 : _ref$maxConcurrency,
        onMessage = _ref.onMessage,
        _ref$onDebug = _ref.onDebug,
        onDebug = _ref$onDebug === void 0 ? function () {} : _ref$onDebug,
        _ref$reuseWorkers = _ref.reuseWorkers,
        reuseWorkers = _ref$reuseWorkers === void 0 ? true : _ref$reuseWorkers;

    _classCallCheck$1(this, WorkerPool);

    this.source = source;
    this.name = name;
    this.maxConcurrency = maxConcurrency;
    this.onMessage = onMessage;
    this.onDebug = onDebug;
    this.jobQueue = [];
    this.idleQueue = [];
    this.count = 0;
    this.isDestroyed = false;
    this.reuseWorkers = reuseWorkers;
  }

  _createClass$1(WorkerPool, [{
    key: "destroy",
    value: function destroy() {
      this.idleQueue.forEach(function (worker) {
        return worker.destroy();
      });
      this.isDestroyed = true;
    }
  }, {
    key: "process",
    value: function process(data, jobName) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.jobQueue.push({
          data: data,
          jobName: jobName,
          resolve: resolve,
          reject: reject
        });

        _this._startQueuedJob();
      });
    }
  }, {
    key: "_startQueuedJob",
    value: function () {
      var _startQueuedJob2 = _asyncToGenerator(regenerator.mark(function _callee() {
        var worker, job;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.jobQueue.length) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                worker = this._getAvailableWorker();

                if (worker) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                job = this.jobQueue.shift();
                this.onDebug({
                  message: 'processing',
                  worker: worker.name,
                  job: job.jobName,
                  backlog: this.jobQueue.length
                });
                _context.prev = 7;
                _context.t0 = job;
                _context.next = 11;
                return worker.process(job.data);

              case 11:
                _context.t1 = _context.sent;

                _context.t0.resolve.call(_context.t0, _context.t1);

                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t2 = _context["catch"](7);
                job.reject(_context.t2);

              case 18:
                _context.prev = 18;

                this._onWorkerDone(worker);

                return _context.finish(18);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 15, 18, 21]]);
      }));

      function _startQueuedJob() {
        return _startQueuedJob2.apply(this, arguments);
      }

      return _startQueuedJob;
    }()
  }, {
    key: "_onWorkerDone",
    value: function _onWorkerDone(worker) {
      if (this.isDestroyed) {
        worker.destroy();
        return;
      }

      if (this.reuseWorkers) {
        this.idleQueue.push(worker);
      } else {
        worker.destroy();
        this.count--;
      }

      this._startQueuedJob();
    }
  }, {
    key: "_getAvailableWorker",
    value: function _getAvailableWorker() {
      if (this.idleQueue.length > 0) {
        return this.idleQueue.shift();
      }

      if (this.count < this.maxConcurrency) {
        this.count++;
        var name = "".concat(this.name.toLowerCase(), " (#").concat(this.count, " of ").concat(this.maxConcurrency, ")");
        return new WorkerThread({
          source: this.source,
          onMessage: this.onMessage,
          name: name
        });
      }

      return null;
    }
  }]);

  return WorkerPool;
}();

var DEFAULT_MAX_CONCURRENCY = 5;

var WorkerFarm = function () {
  _createClass$1(WorkerFarm, null, [{
    key: "isSupported",
    value: function isSupported() {
      return typeof Worker !== 'undefined';
    }
  }]);

  function WorkerFarm(_ref) {
    var _ref$maxConcurrency = _ref.maxConcurrency,
        maxConcurrency = _ref$maxConcurrency === void 0 ? DEFAULT_MAX_CONCURRENCY : _ref$maxConcurrency,
        _ref$onMessage = _ref.onMessage,
        onMessage = _ref$onMessage === void 0 ? null : _ref$onMessage,
        _ref$onDebug = _ref.onDebug,
        onDebug = _ref$onDebug === void 0 ? function () {} : _ref$onDebug,
        _ref$reuseWorkers = _ref.reuseWorkers,
        reuseWorkers = _ref$reuseWorkers === void 0 ? true : _ref$reuseWorkers;

    _classCallCheck$1(this, WorkerFarm);

    this.maxConcurrency = maxConcurrency;
    this.onMessage = onMessage;
    this.onDebug = onDebug;
    this.workerPools = new Map();
    this.reuseWorkers = reuseWorkers;
  }

  _createClass$1(WorkerFarm, [{
    key: "setProps",
    value: function setProps(props) {
      if ('maxConcurrency' in props) {
        this.maxConcurrency = props.maxConcurrency;
      }

      if ('onDebug' in props) {
        this.onDebug = props.onDebug;
      }

      if ('reuseWorkers' in props) {
        this.reuseWorkers = props.reuseWorkers;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.workerPools.forEach(function (workerPool) {
        return workerPool.destroy();
      });
    }
  }, {
    key: "process",
    value: function () {
      var _process = _asyncToGenerator(regenerator.mark(function _callee(workerSource, workerName, data) {
        var workerPool;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                workerPool = this._getWorkerPool(workerSource, workerName);
                return _context.abrupt("return", workerPool.process(data));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function process(_x, _x2, _x3) {
        return _process.apply(this, arguments);
      }

      return process;
    }()
  }, {
    key: "_getWorkerPool",
    value: function _getWorkerPool(workerSource, workerName) {
      var workerPool = this.workerPools.get(workerName);

      if (!workerPool) {
        workerPool = new WorkerPool({
          source: workerSource,
          name: workerName,
          onMessage: onWorkerMessage$1.bind(null, this.onMessage),
          maxConcurrency: this.maxConcurrency,
          onDebug: this.onDebug,
          reuseWorkers: this.reuseWorkers
        });
        this.workerPools.set(workerName, workerPool);
      }

      return workerPool;
    }
  }]);

  return WorkerFarm;
}();

function onWorkerMessage$1(onMessage, _ref2) {
  var worker = _ref2.worker,
      data = _ref2.data,
      resolve = _ref2.resolve,
      reject = _ref2.reject;

  if (onMessage) {
    onMessage({
      worker: worker,
      data: data,
      resolve: resolve,
      reject: reject
    });
    return;
  }

  switch (data.type) {
    case 'done':
      resolve(data.result);
      break;

    case 'error':
      reject(data.message);
      break;
  }
}

var ChildProcess = {};

var node = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ChildProcess
});

var VERSION$6 = "2.3.13" ;
var loadLibraryPromises = {};
function loadLibrary(_x) {
  return _loadLibrary.apply(this, arguments);
}

function _loadLibrary() {
  _loadLibrary = _asyncToGenerator(regenerator.mark(function _callee(libraryUrl) {
    var moduleName,
        options,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            moduleName = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};

            if (moduleName) {
              libraryUrl = getLibraryUrl(libraryUrl, moduleName, options);
            }

            loadLibraryPromises[libraryUrl] = loadLibraryPromises[libraryUrl] || loadLibraryFromFile(libraryUrl);
            _context.next = 6;
            return loadLibraryPromises[libraryUrl];

          case 6:
            return _context.abrupt("return", _context.sent);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadLibrary.apply(this, arguments);
}

function getLibraryUrl(library, moduleName, options) {
  var modules = options.modules || {};

  if (modules[library]) {
    return modules[library];
  }

  if (!isBrowser$1) {
    return "modules/".concat(moduleName, "/dist/libs/").concat(library);
  }

  if (options.CDN) {
    assert$2(options.CDN.startsWith('http'));
    return "".concat(options.CDN, "/").concat(moduleName, "@").concat(VERSION$6, "/dist/libs/").concat(library);
  }

  if (isWorker) {
    return "../src/libs/".concat(library);
  }

  return "modules/".concat(moduleName, "/src/libs/").concat(library);
}

function loadLibraryFromFile(_x2) {
  return _loadLibraryFromFile.apply(this, arguments);
}

function _loadLibraryFromFile() {
  _loadLibraryFromFile = _asyncToGenerator(regenerator.mark(function _callee2(libraryUrl) {
    var _response, response, scriptSource;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!libraryUrl.endsWith('wasm')) {
              _context2.next = 7;
              break;
            }

            _context2.next = 3;
            return fetch(libraryUrl);

          case 3:
            _response = _context2.sent;
            _context2.next = 6;
            return _response.arrayBuffer();

          case 6:
            return _context2.abrupt("return", _context2.sent);

          case 7:
            if (isBrowser$1) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", undefined && undefined(libraryUrl));

          case 9:
            if (!isWorker) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", importScripts(libraryUrl));

          case 11:
            _context2.next = 13;
            return fetch(libraryUrl);

          case 13:
            response = _context2.sent;
            _context2.next = 16;
            return response.text();

          case 16:
            scriptSource = _context2.sent;
            return _context2.abrupt("return", loadLibraryFromString(scriptSource, libraryUrl));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadLibraryFromFile.apply(this, arguments);
}

function loadLibraryFromString(scriptSource, id) {
  if (!isBrowser$1) {
    return undefined && undefined(scriptSource, id);
  }

  if (isWorker) {
    eval.call(global_$1, scriptSource);
    return null;
  }

  var script = document.createElement('script');
  script.id = id;

  try {
    script.appendChild(document.createTextNode(scriptSource));
  } catch (e) {
    script.text = scriptSource;
  }

  document.body.appendChild(script);
  return null;
}

function getFirstCharacters$1(data) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

  if (typeof data === 'string') {
    return data.slice(0, length);
  } else if (ArrayBuffer.isView(data)) {
    return getMagicString$2(data.buffer, data.byteOffset, length);
  } else if (data instanceof ArrayBuffer) {
    var byteOffset = 0;
    return getMagicString$2(data, byteOffset, length);
  }

  return '';
}
function getMagicString$2(arrayBuffer, byteOffset, length) {
  if (arrayBuffer.byteLength <= byteOffset + length) {
    return '';
  }

  var dataView = new DataView(arrayBuffer);
  var magic = '';

  for (var i = 0; i < length; i++) {
    magic += String.fromCharCode(dataView.getUint8(byteOffset + i));
  }

  return magic;
}

function parseJSON(string) {
  try {
    return JSON.parse(string);
  } catch (_) {
    throw new Error("Failed to parse JSON from data starting with \"".concat(getFirstCharacters$1(string), "\""));
  }
}

function _createForOfIteratorHelper$a(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$c(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$c(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$c(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$c(o, minLen); }

function _arrayLikeToArray$c(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function toArrayBuffer(data) {
  if (undefined) {
    data = undefined(data);
  }

  if (data instanceof ArrayBuffer) {
    return data;
  }

  if (ArrayBuffer.isView(data)) {
    return data.buffer;
  }

  if (typeof data === 'string') {
    var text = data;
    var uint8Array = new TextEncoder().encode(text);
    return uint8Array.buffer;
  }

  if (data && _typeof(data) === 'object' && data._toArrayBuffer) {
    return data._toArrayBuffer();
  }

  return assert$2(false);
}
function compareArrayBuffers(arrayBuffer1, arrayBuffer2, byteLength) {
  byteLength = byteLength || arrayBuffer1.byteLength;

  if (arrayBuffer1.byteLength < byteLength || arrayBuffer2.byteLength < byteLength) {
    return false;
  }

  var array1 = new Uint8Array(arrayBuffer1);
  var array2 = new Uint8Array(arrayBuffer2);

  for (var i = 0; i < array1.length; ++i) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}
function concatenateArrayBuffers() {
  for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  var sourceArrays = sources.map(function (source2) {
    return source2 instanceof ArrayBuffer ? new Uint8Array(source2) : source2;
  });
  var byteLength = sourceArrays.reduce(function (length, typedArray) {
    return length + typedArray.byteLength;
  }, 0);
  var result = new Uint8Array(byteLength);
  var offset = 0;

  var _iterator = _createForOfIteratorHelper$a(sourceArrays),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var sourceArray = _step.value;
      result.set(sourceArray, offset);
      offset += sourceArray.byteLength;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result.buffer;
}
function sliceArrayBuffer(arrayBuffer, byteOffset, byteLength) {
  var subArray = byteLength !== undefined ? new Uint8Array(arrayBuffer).subarray(byteOffset, byteOffset + byteLength) : new Uint8Array(arrayBuffer).subarray(byteOffset);
  var arrayCopy = new Uint8Array(subArray);
  return arrayCopy.buffer;
}

function padTo4Bytes(byteLength) {
  return byteLength + 3 & ~3;
}
function getZeroOffsetArrayBuffer(arrayBuffer, byteOffset, byteLength) {
  return sliceArrayBuffer(arrayBuffer, byteOffset, byteLength);
}
function copyToArray(source, target, targetOffset) {
  var sourceArray;

  if (source instanceof ArrayBuffer) {
    sourceArray = new Uint8Array(source);
  } else {
    var srcByteOffset = source.byteOffset;
    var srcByteLength = source.byteLength;
    sourceArray = new Uint8Array(source.buffer, srcByteOffset, srcByteLength);
  }

  target.set(sourceArray, targetOffset);
  return targetOffset + padTo4Bytes(sourceArray.byteLength);
}

function copyPaddedArrayBufferToDataView(dataView, byteOffset, sourceBuffer) {
  var paddedLength = padTo4Bytes(sourceBuffer.byteLength);
  var padLength = paddedLength - sourceBuffer.byteLength;

  if (dataView) {
    var targetArray = new Uint8Array(dataView.buffer, dataView.byteOffset + byteOffset, sourceBuffer.byteLength);
    var sourceArray = new Uint8Array(sourceBuffer);
    targetArray.set(sourceArray);

    for (var i = 0; i < padLength; ++i) {
      dataView.setUint8(byteOffset + sourceBuffer.byteLength + i, 0x20);
    }
  }

  byteOffset += paddedLength;
  return byteOffset;
}
function copyPaddedStringToDataView(dataView, byteOffset, string) {
  var textEncoder = new TextEncoder();
  var stringBuffer = textEncoder.encode(string);
  byteOffset = copyPaddedArrayBufferToDataView(dataView, byteOffset, stringBuffer);
  return byteOffset;
}

var pathPrefix = '';
var fileAliases = {};
function setPathPrefix(prefix) {
  pathPrefix = prefix;
}
function getPathPrefix() {
  return pathPrefix;
}
function resolvePath(filename) {
  for (var alias in fileAliases) {
    if (filename.startsWith(alias)) {
      var replacement = fileAliases[alias];
      filename = filename.replace(alias, replacement);
    }
  }

  if (!filename.startsWith('http://') && !filename.startsWith('https://')) {
    filename = "".concat(pathPrefix).concat(filename);
  }

  return filename;
}

function makeTextDecoderIterator(_x, _x2) {
  return _makeTextDecoderIterator.apply(this, arguments);
}

function _makeTextDecoderIterator() {
  _makeTextDecoderIterator = _wrapAsyncGenerator(regenerator.mark(function _callee(arrayBufferIterator, options) {
    var textDecoder, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, arrayBuffer;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            textDecoder = new TextDecoder(options);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context.prev = 3;
            _iterator = _asyncIterator(arrayBufferIterator);

          case 5:
            _context.next = 7;
            return _awaitAsyncGenerator(_iterator.next());

          case 7:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 11;
            return _awaitAsyncGenerator(_step.value);

          case 11:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 19;
              break;
            }

            arrayBuffer = _value;
            _context.next = 16;
            return typeof arrayBuffer === 'string' ? arrayBuffer : textDecoder.decode(arrayBuffer, {
              stream: true
            });

          case 16:
            _iteratorNormalCompletion = true;
            _context.next = 5;
            break;

          case 19:
            _context.next = 25;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](3);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 25:
            _context.prev = 25;
            _context.prev = 26;

            if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
              _context.next = 30;
              break;
            }

            _context.next = 30;
            return _awaitAsyncGenerator(_iterator["return"]());

          case 30:
            _context.prev = 30;

            if (!_didIteratorError) {
              _context.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return _context.finish(30);

          case 34:
            return _context.finish(25);

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 21, 25, 35], [26,, 30, 34]]);
  }));
  return _makeTextDecoderIterator.apply(this, arguments);
}

function makeTextEncoderIterator(_x3, _x4) {
  return _makeTextEncoderIterator.apply(this, arguments);
}

function _makeTextEncoderIterator() {
  _makeTextEncoderIterator = _wrapAsyncGenerator(regenerator.mark(function _callee2(textIterator, options) {
    var textEncoder, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _value2, text;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            textEncoder = new TextEncoder();
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _context2.prev = 3;
            _iterator2 = _asyncIterator(textIterator);

          case 5:
            _context2.next = 7;
            return _awaitAsyncGenerator(_iterator2.next());

          case 7:
            _step2 = _context2.sent;
            _iteratorNormalCompletion2 = _step2.done;
            _context2.next = 11;
            return _awaitAsyncGenerator(_step2.value);

          case 11:
            _value2 = _context2.sent;

            if (_iteratorNormalCompletion2) {
              _context2.next = 19;
              break;
            }

            text = _value2;
            _context2.next = 16;
            return typeof text === 'string' ? textEncoder.encode(text) : text;

          case 16:
            _iteratorNormalCompletion2 = true;
            _context2.next = 5;
            break;

          case 19:
            _context2.next = 25;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](3);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 25:
            _context2.prev = 25;
            _context2.prev = 26;

            if (!(!_iteratorNormalCompletion2 && _iterator2["return"] != null)) {
              _context2.next = 30;
              break;
            }

            _context2.next = 30;
            return _awaitAsyncGenerator(_iterator2["return"]());

          case 30:
            _context2.prev = 30;

            if (!_didIteratorError2) {
              _context2.next = 33;
              break;
            }

            throw _iteratorError2;

          case 33:
            return _context2.finish(30);

          case 34:
            return _context2.finish(25);

          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 21, 25, 35], [26,, 30, 34]]);
  }));
  return _makeTextEncoderIterator.apply(this, arguments);
}

function makeLineIterator(_x5) {
  return _makeLineIterator.apply(this, arguments);
}

function _makeLineIterator() {
  _makeLineIterator = _wrapAsyncGenerator(regenerator.mark(function _callee3(textIterator) {
    var previous, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _value3, textChunk, eolIndex, line;

    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            previous = '';
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _context3.prev = 3;
            _iterator3 = _asyncIterator(textIterator);

          case 5:
            _context3.next = 7;
            return _awaitAsyncGenerator(_iterator3.next());

          case 7:
            _step3 = _context3.sent;
            _iteratorNormalCompletion3 = _step3.done;
            _context3.next = 11;
            return _awaitAsyncGenerator(_step3.value);

          case 11:
            _value3 = _context3.sent;

            if (_iteratorNormalCompletion3) {
              _context3.next = 26;
              break;
            }

            textChunk = _value3;
            previous += textChunk;
            eolIndex = void 0;

          case 16:
            if (!((eolIndex = previous.indexOf('\n')) >= 0)) {
              _context3.next = 23;
              break;
            }

            line = previous.slice(0, eolIndex + 1);
            previous = previous.slice(eolIndex + 1);
            _context3.next = 21;
            return line;

          case 21:
            _context3.next = 16;
            break;

          case 23:
            _iteratorNormalCompletion3 = true;
            _context3.next = 5;
            break;

          case 26:
            _context3.next = 32;
            break;

          case 28:
            _context3.prev = 28;
            _context3.t0 = _context3["catch"](3);
            _didIteratorError3 = true;
            _iteratorError3 = _context3.t0;

          case 32:
            _context3.prev = 32;
            _context3.prev = 33;

            if (!(!_iteratorNormalCompletion3 && _iterator3["return"] != null)) {
              _context3.next = 37;
              break;
            }

            _context3.next = 37;
            return _awaitAsyncGenerator(_iterator3["return"]());

          case 37:
            _context3.prev = 37;

            if (!_didIteratorError3) {
              _context3.next = 40;
              break;
            }

            throw _iteratorError3;

          case 40:
            return _context3.finish(37);

          case 41:
            return _context3.finish(32);

          case 42:
            if (!(previous.length > 0)) {
              _context3.next = 45;
              break;
            }

            _context3.next = 45;
            return previous;

          case 45:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 28, 32, 42], [33,, 37, 41]]);
  }));
  return _makeLineIterator.apply(this, arguments);
}

function makeNumberedLineIterator(_x6) {
  return _makeNumberedLineIterator.apply(this, arguments);
}

function _makeNumberedLineIterator() {
  _makeNumberedLineIterator = _wrapAsyncGenerator(regenerator.mark(function _callee4(lineIterator) {
    var counter, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _value4, line;

    return regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            counter = 1;
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _context4.prev = 3;
            _iterator4 = _asyncIterator(lineIterator);

          case 5:
            _context4.next = 7;
            return _awaitAsyncGenerator(_iterator4.next());

          case 7:
            _step4 = _context4.sent;
            _iteratorNormalCompletion4 = _step4.done;
            _context4.next = 11;
            return _awaitAsyncGenerator(_step4.value);

          case 11:
            _value4 = _context4.sent;

            if (_iteratorNormalCompletion4) {
              _context4.next = 20;
              break;
            }

            line = _value4;
            _context4.next = 16;
            return {
              counter: counter,
              line: line
            };

          case 16:
            counter++;

          case 17:
            _iteratorNormalCompletion4 = true;
            _context4.next = 5;
            break;

          case 20:
            _context4.next = 26;
            break;

          case 22:
            _context4.prev = 22;
            _context4.t0 = _context4["catch"](3);
            _didIteratorError4 = true;
            _iteratorError4 = _context4.t0;

          case 26:
            _context4.prev = 26;
            _context4.prev = 27;

            if (!(!_iteratorNormalCompletion4 && _iterator4["return"] != null)) {
              _context4.next = 31;
              break;
            }

            _context4.next = 31;
            return _awaitAsyncGenerator(_iterator4["return"]());

          case 31:
            _context4.prev = 31;

            if (!_didIteratorError4) {
              _context4.next = 34;
              break;
            }

            throw _iteratorError4;

          case 34:
            return _context4.finish(31);

          case 35:
            return _context4.finish(26);

          case 36:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 22, 26, 36], [27,, 31, 35]]);
  }));
  return _makeNumberedLineIterator.apply(this, arguments);
}

function forEach(_x, _x2) {
  return _forEach.apply(this, arguments);
}

function _forEach() {
  _forEach = _asyncToGenerator(regenerator.mark(function _callee(iterator, visitor) {
    var _yield$iterator$next, done, value, cancel;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:

            _context.next = 3;
            return iterator.next();

          case 3:
            _yield$iterator$next = _context.sent;
            done = _yield$iterator$next.done;
            value = _yield$iterator$next.value;

            if (!done) {
              _context.next = 9;
              break;
            }

            iterator["return"]();
            return _context.abrupt("return");

          case 9:
            cancel = visitor(value);

            if (!cancel) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return");

          case 12:
            _context.next = 0;
            break;

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _forEach.apply(this, arguments);
}

function concatenateChunksAsync(_x3) {
  return _concatenateChunksAsync.apply(this, arguments);
}

function _concatenateChunksAsync() {
  _concatenateChunksAsync = _asyncToGenerator(regenerator.mark(function _callee2(asyncIterator) {
    var arrayBuffers, strings, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, chunk;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            arrayBuffers = [];
            strings = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context2.prev = 4;
            _iterator = _asyncIterator(asyncIterator);

          case 6:
            _context2.next = 8;
            return _iterator.next();

          case 8:
            _step = _context2.sent;
            _iteratorNormalCompletion = _step.done;
            _context2.next = 12;
            return _step.value;

          case 12:
            _value = _context2.sent;

            if (_iteratorNormalCompletion) {
              _context2.next = 19;
              break;
            }

            chunk = _value;

            if (typeof chunk === 'string') {
              strings.push(chunk);
            } else {
              arrayBuffers.push(chunk);
            }

          case 16:
            _iteratorNormalCompletion = true;
            _context2.next = 6;
            break;

          case 19:
            _context2.next = 25;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 25:
            _context2.prev = 25;
            _context2.prev = 26;

            if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
              _context2.next = 30;
              break;
            }

            _context2.next = 30;
            return _iterator["return"]();

          case 30:
            _context2.prev = 30;

            if (!_didIteratorError) {
              _context2.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return _context2.finish(30);

          case 34:
            return _context2.finish(25);

          case 35:
            if (!(strings.length > 0)) {
              _context2.next = 38;
              break;
            }

            assert$2(arrayBuffers.length === 0);
            return _context2.abrupt("return", strings.join(''));

          case 38:
            return _context2.abrupt("return", concatenateArrayBuffers.apply(void 0, arrayBuffers));

          case 39:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 21, 25, 35], [26,, 30, 34]]);
  }));
  return _concatenateChunksAsync.apply(this, arguments);
}

function getHiResTimestamp() {
  var timestamp;

  if (typeof window !== 'undefined' && window.performance) {
    timestamp = window.performance.now();
  } else if (typeof process !== 'undefined' && process.hrtime) {
    var timeParts = process.hrtime();
    timestamp = timeParts[0] * 1000 + timeParts[1] / 1e6;
  } else {
    timestamp = Date.now();
  }

  return timestamp;
}

var Stat = function () {
  function Stat(name, type) {
    _classCallCheck$1(this, Stat);

    this.name = name;
    this.type = type;
    this.sampleSize = 1;
    this.reset();
  }

  _createClass$1(Stat, [{
    key: "setSampleSize",
    value: function setSampleSize(samples) {
      this.sampleSize = samples;
      return this;
    }
  }, {
    key: "incrementCount",
    value: function incrementCount() {
      this.addCount(1);
      return this;
    }
  }, {
    key: "decrementCount",
    value: function decrementCount() {
      this.subtractCount(1);
      return this;
    }
  }, {
    key: "addCount",
    value: function addCount(value) {
      this._count += value;
      this._samples++;

      this._checkSampling();

      return this;
    }
  }, {
    key: "subtractCount",
    value: function subtractCount(value) {
      this._count -= value;
      this._samples++;

      this._checkSampling();

      return this;
    }
  }, {
    key: "addTime",
    value: function addTime(time) {
      this._time += time;
      this.lastTiming = time;
      this._samples++;

      this._checkSampling();

      return this;
    }
  }, {
    key: "timeStart",
    value: function timeStart() {
      this._startTime = getHiResTimestamp();
      this._timerPending = true;
      return this;
    }
  }, {
    key: "timeEnd",
    value: function timeEnd() {
      if (!this._timerPending) {
        return this;
      }

      this.addTime(getHiResTimestamp() - this._startTime);
      this._timerPending = false;

      this._checkSampling();

      return this;
    }
  }, {
    key: "getSampleAverageCount",
    value: function getSampleAverageCount() {
      return this.sampleSize > 0 ? this.lastSampleCount / this.sampleSize : 0;
    }
  }, {
    key: "getSampleAverageTime",
    value: function getSampleAverageTime() {
      return this.sampleSize > 0 ? this.lastSampleTime / this.sampleSize : 0;
    }
  }, {
    key: "getSampleHz",
    value: function getSampleHz() {
      return this.lastSampleTime > 0 ? this.sampleSize / (this.lastSampleTime / 1000) : 0;
    }
  }, {
    key: "getAverageCount",
    value: function getAverageCount() {
      return this.samples > 0 ? this.count / this.samples : 0;
    }
  }, {
    key: "getAverageTime",
    value: function getAverageTime() {
      return this.samples > 0 ? this.time / this.samples : 0;
    }
  }, {
    key: "getHz",
    value: function getHz() {
      return this.time > 0 ? this.samples / (this.time / 1000) : 0;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.time = 0;
      this.count = 0;
      this.samples = 0;
      this.lastTiming = 0;
      this.lastSampleTime = 0;
      this.lastSampleCount = 0;
      this._count = 0;
      this._time = 0;
      this._samples = 0;
      this._startTime = 0;
      this._timerPending = false;
      return this;
    }
  }, {
    key: "_checkSampling",
    value: function _checkSampling() {
      if (this._samples === this.sampleSize) {
        this.lastSampleTime = this._time;
        this.lastSampleCount = this._count;
        this.count += this._count;
        this.time += this._time;
        this.samples += this._samples;
        this._time = 0;
        this._count = 0;
        this._samples = 0;
      }
    }
  }]);

  return Stat;
}();

var Stats = function () {
  function Stats(_ref) {
    var id = _ref.id,
        stats = _ref.stats;

    _classCallCheck$1(this, Stats);

    this.id = id;
    this.stats = {};

    this._initializeStats(stats);

    Object.seal(this);
  }

  _createClass$1(Stats, [{
    key: "get",
    value: function get(name) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'count';
      return this._getOrCreate({
        name: name,
        type: type
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      for (var key in this.stats) {
        this.stats[key].reset();
      }

      return this;
    }
  }, {
    key: "forEach",
    value: function forEach(fn) {
      for (var key in this.stats) {
        fn(this.stats[key]);
      }
    }
  }, {
    key: "getTable",
    value: function getTable() {
      var table = {};
      this.forEach(function (stat) {
        table[stat.name] = {
          time: stat.time || 0,
          count: stat.count || 0,
          average: stat.getAverageTime() || 0,
          hz: stat.getHz() || 0
        };
      });
      return table;
    }
  }, {
    key: "_initializeStats",
    value: function _initializeStats() {
      var _this = this;

      var stats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      stats.forEach(function (stat) {
        return _this._getOrCreate(stat);
      });
    }
  }, {
    key: "_getOrCreate",
    value: function _getOrCreate(stat) {
      if (!stat || !stat.name) {
        return null;
      }

      var name = stat.name,
          type = stat.type;

      if (!this.stats[name]) {
        if (stat instanceof Stat) {
          this.stats[name] = stat;
        } else {
          this.stats[name] = new Stat(name, type);
        }
      }

      return this.stats[name];
    }
  }, {
    key: "size",
    get: function get() {
      return Object.keys(this.stats).length;
    }
  }]);

  return Stats;
}();

function ownKeys$b(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$b(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$b(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var STAT_QUEUED_REQUESTS = 'Queued Requests';
var STAT_ACTIVE_REQUESTS = 'Active Requests';
var STAT_CANCELLED_REQUESTS = 'Cancelled Requests';
var STAT_QUEUED_REQUESTS_EVER = 'Queued Requests Ever';
var STAT_ACTIVE_REQUESTS_EVER = 'Active Requests Ever';
var DEFAULT_PROPS = {
  id: 'request-scheduler',
  throttleRequests: true,
  maxRequests: 6
};

var RequestScheduler = function () {
  function RequestScheduler() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck$1(this, RequestScheduler);

    this.props = _objectSpread$a(_objectSpread$a({}, DEFAULT_PROPS), props);
    this.requestQueue = [];
    this.activeRequestCount = 0;
    this.requestMap = new Map();
    this.stats = new Stats({
      id: props.id
    });
    this.stats.get(STAT_QUEUED_REQUESTS);
    this.stats.get(STAT_ACTIVE_REQUESTS);
    this.stats.get(STAT_CANCELLED_REQUESTS);
    this.stats.get(STAT_QUEUED_REQUESTS_EVER);
    this.stats.get(STAT_ACTIVE_REQUESTS_EVER);
    this._deferredUpdate = null;
  }

  _createClass$1(RequestScheduler, [{
    key: "scheduleRequest",
    value: function scheduleRequest(handle) {
      var getPriority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
        return 0;
      };

      if (!this.props.throttleRequests) {
        return Promise.resolve({
          done: function done() {}
        });
      }

      if (this.requestMap.has(handle)) {
        return this.requestMap.get(handle);
      }

      var request = {
        handle: handle,
        getPriority: getPriority
      };
      var promise = new Promise(function (resolve) {
        request.resolve = resolve;
        return request;
      });
      this.requestQueue.push(request);
      this.requestMap.set(handle, promise);

      this._issueNewRequests();

      return promise;
    }
  }, {
    key: "_issueRequest",
    value: function _issueRequest(request) {
      var _this = this;

      var handle = request.handle,
          resolve = request.resolve;
      var isDone = false;

      var done = function done() {
        if (!isDone) {
          isDone = true;

          _this.requestMap["delete"](handle);

          _this.activeRequestCount--;

          _this._issueNewRequests();
        }
      };

      this.activeRequestCount++;
      return resolve ? resolve({
        done: done
      }) : Promise.resolve({
        done: done
      });
    }
  }, {
    key: "_issueNewRequests",
    value: function _issueNewRequests() {
      var _this2 = this;

      if (!this._deferredUpdate) {
        this._deferredUpdate = setTimeout(function () {
          return _this2._issueNewRequestsAsync();
        }, 0);
      }
    }
  }, {
    key: "_issueNewRequestsAsync",
    value: function _issueNewRequestsAsync() {
      this._deferredUpdate = null;
      var freeSlots = Math.max(this.props.maxRequests - this.activeRequestCount, 0);

      if (freeSlots === 0) {
        return;
      }

      this._updateAllRequests();

      for (var i = 0; i < freeSlots; ++i) {
        if (this.requestQueue.length > 0) {
          var request = this.requestQueue.shift();

          this._issueRequest(request);
        }
      }
    }
  }, {
    key: "_updateAllRequests",
    value: function _updateAllRequests() {
      var requestQueue = this.requestQueue;

      for (var i = 0; i < requestQueue.length; ++i) {
        var request = requestQueue[i];

        if (!this._updateRequest(request)) {
          requestQueue.splice(i, 1);
          this.requestMap["delete"](request.handle);
          i--;
        }
      }

      requestQueue.sort(function (a, b) {
        return a.priority - b.priority;
      });
    }
  }, {
    key: "_updateRequest",
    value: function _updateRequest(request) {
      request.priority = request.getPriority(request.handle);

      if (request.priority < 0) {
        request.resolve(null);
        return false;
      }

      return true;
    }
  }]);

  return RequestScheduler;
}();

function _arrayLikeToArray$b(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$b(arr);
}

function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray$b(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$b(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$b(o, minLen);
}

function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$b(arr) || _nonIterableSpread$1();
}

function getMeshBoundingBox(attributes) {
  if (!attributes || !attributes.POSITION) {
    return null;
  }

  var minX = Infinity;
  var minY = Infinity;
  var minZ = Infinity;
  var maxX = -Infinity;
  var maxY = -Infinity;
  var maxZ = -Infinity;
  var positions = attributes.POSITION.value;
  var len = positions && positions.length;

  if (!len) {
    return null;
  }

  for (var i = 0; i < len; i += 3) {
    var x = positions[i];
    var y = positions[i + 1];
    var z = positions[i + 2];
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    minZ = z < minZ ? z : minZ;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
    maxZ = z > maxZ ? z : maxZ;
  }

  return [[minX, minY, minZ], [maxX, maxY, maxZ]];
}

var isBoolean = function isBoolean(x) {
  return typeof x === 'boolean';
};

var isFunction = function isFunction(x) {
  return typeof x === 'function';
};

var isObject = function isObject(x) {
  return x !== null && _typeof(x) === 'object';
};
var isPureObject = function isPureObject(x) {
  return isObject(x) && x.constructor === {}.constructor;
};
var isPromise = function isPromise(x) {
  return isObject(x) && isFunction(x.then);
};
var isIterable = function isIterable(x) {
  return x && typeof x[Symbol.iterator] === 'function';
};
var isAsyncIterable = function isAsyncIterable(x) {
  return x && typeof x[Symbol.asyncIterator] === 'function';
};
var isIterator = function isIterator(x) {
  return x && isFunction(x.next);
};
var isResponse = function isResponse(x) {
  return typeof Response !== 'undefined' && x instanceof Response || x && x.arrayBuffer && x.text && x.json;
};
var isBlob = function isBlob(x) {
  return typeof Blob !== 'undefined' && x instanceof Blob;
};
var isWritableDOMStream = function isWritableDOMStream(x) {
  return isObject(x) && isFunction(x.abort) && isFunction(x.getWriter);
};
var isReadableDOMStream = function isReadableDOMStream(x) {
  return typeof ReadableStream !== 'undefined' && x instanceof ReadableStream || isObject(x) && isFunction(x.tee) && isFunction(x.cancel) && isFunction(x.getReader);
};
var isBuffer = function isBuffer(x) {
  return x && _typeof(x) === 'object' && x.isBuffer;
};
var isWritableNodeStream = function isWritableNodeStream(x) {
  return isObject(x) && isFunction(x.end) && isFunction(x.write) && isBoolean(x.writable);
};
var isReadableNodeStream = function isReadableNodeStream(x) {
  return isObject(x) && isFunction(x.read) && isFunction(x.pipe) && isBoolean(x.readable);
};
var isReadableStream = function isReadableStream(x) {
  return isReadableDOMStream(x) || isReadableNodeStream(x);
};
var isWritableStream = function isWritableStream(x) {
  return isWritableDOMStream(x) || isWritableNodeStream(x);
};

var DATA_URL_PATTERN = /^data:([-\w.]+\/[-\w.+]+)(;|,)/;
var MIME_TYPE_PATTERN = /^([-\w.]+\/[-\w.+]+)/;
function parseMIMEType(mimeString) {
  if (typeof mimeString !== 'string') {
    return '';
  }

  var matches = mimeString.match(MIME_TYPE_PATTERN);

  if (matches) {
    return matches[1];
  }

  return mimeString;
}
function parseMIMETypeFromURL(dataUrl) {
  if (typeof dataUrl !== 'string') {
    return '';
  }

  var matches = dataUrl.match(DATA_URL_PATTERN);

  if (matches) {
    return matches[1];
  }

  return '';
}

var QUERY_STRING_PATTERN = /\?.*/;
function getResourceUrlAndType(resource) {
  if (isResponse(resource)) {
    var contentType = parseMIMEType(resource.headers.get('content-type'));
    var urlType = parseMIMETypeFromURL(resource.url);
    return {
      url: stripQueryString(resource.url || ''),
      type: contentType || urlType || null
    };
  }

  if (isBlob(resource)) {
    return {
      url: stripQueryString(resource.name || ''),
      type: resource.type || ''
    };
  }

  if (typeof resource === 'string') {
    return {
      url: stripQueryString(resource),
      type: parseMIMETypeFromURL(resource)
    };
  }

  return {
    url: '',
    type: ''
  };
}
function getResourceContentLength(resource) {
  if (isResponse(resource)) {
    return resource.headers['content-length'] || -1;
  }

  if (isBlob(resource)) {
    return resource.size;
  }

  if (typeof resource === 'string') {
    return resource.length;
  }

  if (resource instanceof ArrayBuffer) {
    return resource.byteLength;
  }

  if (ArrayBuffer.isView(resource)) {
    return resource.byteLength;
  }

  return -1;
}

function stripQueryString(url) {
  return url.replace(QUERY_STRING_PATTERN, '');
}

function makeResponse(_x) {
  return _makeResponse.apply(this, arguments);
}

function _makeResponse() {
  _makeResponse = _asyncToGenerator(regenerator.mark(function _callee(resource) {
    var headers, contentLength, _getResourceUrlAndTyp, url, type, initialDataUrl, response;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!isResponse(resource)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", resource);

          case 2:
            headers = {};
            contentLength = getResourceContentLength(resource);

            if (contentLength >= 0) {
              headers['content-length'] = String(contentLength);
            }

            _getResourceUrlAndTyp = getResourceUrlAndType(resource), url = _getResourceUrlAndTyp.url, type = _getResourceUrlAndTyp.type;

            if (type) {
              headers['content-type'] = type;
            }

            _context.next = 9;
            return getInitialDataUrl(resource);

          case 9:
            initialDataUrl = _context.sent;

            if (initialDataUrl) {
              headers['x-first-bytes'] = initialDataUrl;
            }

            if (typeof resource === 'string') {
              resource = new TextEncoder().encode(resource);
            }

            response = new Response(resource, {
              headers: headers
            });
            Object.defineProperty(response, 'url', {
              value: url
            });
            return _context.abrupt("return", response);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _makeResponse.apply(this, arguments);
}

function checkResponse(_x2) {
  return _checkResponse.apply(this, arguments);
}

function _checkResponse() {
  _checkResponse = _asyncToGenerator(regenerator.mark(function _callee2(response) {
    var message;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (response.ok) {
              _context2.next = 5;
              break;
            }

            _context2.next = 3;
            return getResponseError(response);

          case 3:
            message = _context2.sent;
            throw new Error(message);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _checkResponse.apply(this, arguments);
}

function getResponseError(_x3) {
  return _getResponseError.apply(this, arguments);
}

function _getResponseError() {
  _getResponseError = _asyncToGenerator(regenerator.mark(function _callee3(response) {
    var message, contentType, text;
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            message = "Failed to fetch resource ".concat(response.url, " (").concat(response.status, "): ");
            _context3.prev = 1;
            contentType = response.headers.get('Content-Type');
            text = response.statusText;

            if (!contentType.includes('application/json')) {
              _context3.next = 11;
              break;
            }

            _context3.t0 = text;
            _context3.t1 = " ";
            _context3.next = 9;
            return response.text();

          case 9:
            _context3.t2 = _context3.sent;
            text = _context3.t0 += _context3.t1.concat.call(_context3.t1, _context3.t2);

          case 11:
            message += text;
            message = message.length > 60 ? "".concat(message.slice(60), "...") : message;
            _context3.next = 17;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t3 = _context3["catch"](1);

          case 17:
            return _context3.abrupt("return", message);

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 15]]);
  }));
  return _getResponseError.apply(this, arguments);
}

function getInitialDataUrl(_x4) {
  return _getInitialDataUrl.apply(this, arguments);
}

function _getInitialDataUrl() {
  _getInitialDataUrl = _asyncToGenerator(regenerator.mark(function _callee4(resource) {
    var INITIAL_DATA_LENGTH, blobSlice, slice, base64;
    return regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            INITIAL_DATA_LENGTH = 5;

            if (!(typeof resource === 'string')) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", "data:,".concat(resource.slice(0, INITIAL_DATA_LENGTH)));

          case 3:
            if (!(resource instanceof Blob)) {
              _context4.next = 8;
              break;
            }

            blobSlice = resource.slice(0, 5);
            _context4.next = 7;
            return new Promise(function (resolve) {
              var reader = new FileReader();

              reader.onload = function (event) {
                return resolve(event.target && event.target.result);
              };

              reader.readAsDataURL(blobSlice);
            });

          case 7:
            return _context4.abrupt("return", _context4.sent);

          case 8:
            if (!(resource instanceof ArrayBuffer)) {
              _context4.next = 12;
              break;
            }

            slice = resource.slice(0, INITIAL_DATA_LENGTH);
            base64 = arrayBufferToBase64(slice);
            return _context4.abrupt("return", "data:base64,".concat(base64));

          case 12:
            return _context4.abrupt("return", null);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getInitialDataUrl.apply(this, arguments);
}

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);

  for (var i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

function getErrorMessageFromResponse(_x) {
  return _getErrorMessageFromResponse.apply(this, arguments);
}

function _getErrorMessageFromResponse() {
  _getErrorMessageFromResponse = _asyncToGenerator(regenerator.mark(function _callee(response) {
    var message, contentType;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            message = "Failed to fetch resource ".concat(response.url, " (").concat(response.status, "): ");
            _context.prev = 1;
            contentType = response.headers.get('Content-Type');

            if (!contentType.includes('application/json')) {
              _context.next = 10;
              break;
            }

            _context.t0 = message;
            _context.next = 7;
            return response.text();

          case 7:
            message = _context.t0 += _context.sent;
            _context.next = 11;
            break;

          case 10:
            message += response.statusText;

          case 11:
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t1 = _context["catch"](1);
            return _context.abrupt("return", message);

          case 16:
            return _context.abrupt("return", message);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 13]]);
  }));
  return _getErrorMessageFromResponse.apply(this, arguments);
}

function fetchFile(_x) {
  return _fetchFile.apply(this, arguments);
}

function _fetchFile() {
  _fetchFile = _asyncToGenerator(regenerator.mark(function _callee(url) {
    var options,
        response,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

            if (!(typeof url !== 'string')) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return makeResponse(url);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
            url = resolvePath(url);
            _context.next = 8;
            return fetch(url, options);

          case 8:
            response = _context.sent;

            if (!(!response.ok && options["throws"])) {
              _context.next = 15;
              break;
            }

            _context.t0 = Error;
            _context.next = 13;
            return getErrorMessageFromResponse(response);

          case 13:
            _context.t1 = _context.sent;
            throw new _context.t0(_context.t1);

          case 15:
            return _context.abrupt("return", response);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchFile.apply(this, arguments);
}

var DEFAULT_OPTIONS = {
  dataType: 'arraybuffer',
  nothrow: true
};

var isDataURL = function isDataURL(url) {
  return url.startsWith('data:');
};

function readFileSyncBrowser(uri, options) {
  options = getReadFileOptions(options);

  if (isDataURL(uri)) ;

  if (!options.nothrow) {
    assert$2(false);
  }

  return null;
}

function getReadFileOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  options = Object.assign({}, DEFAULT_OPTIONS, options);
  options.responseType = options.responseType || options.dataType;
  return options;
}

function readFileSync(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  url = resolvePath(url);

  if (!isBrowser$1 && undefined) {
    return undefined(url, options);
  }

  return readFileSyncBrowser(url, options);
}

function writeFile(filePath, arrayBufferOrString, options) {
  filePath = resolvePath(filePath);

  if (!isBrowser$1 && undefined) {
    return undefined(filePath, arrayBufferOrString, options);
  }

  return assert$2(false);
}
function writeFileSync(filePath, arrayBufferOrString, options) {
  filePath = resolvePath(filePath);

  if (!isBrowser$1 && undefined) {
    return undefined(filePath, arrayBufferOrString, options);
  }

  return assert$2(false);
}

var NullLog = function () {
  function NullLog() {
    _classCallCheck$1(this, NullLog);
  }

  _createClass$1(NullLog, [{
    key: "log",
    value: function log() {
      return function (_) {};
    }
  }, {
    key: "info",
    value: function info() {
      return function (_) {};
    }
  }, {
    key: "warn",
    value: function warn() {
      return function (_) {};
    }
  }, {
    key: "error",
    value: function error() {
      return function (_) {};
    }
  }]);

  return NullLog;
}();
var ConsoleLog = function () {
  function ConsoleLog() {
    _classCallCheck$1(this, ConsoleLog);

    this.console = console;
  }

  _createClass$1(ConsoleLog, [{
    key: "log",
    value: function log() {
      var _this$console$log;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_this$console$log = this.console.log).bind.apply(_this$console$log, [this.console].concat(args));
    }
  }, {
    key: "info",
    value: function info() {
      var _this$console$info;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return (_this$console$info = this.console.info).bind.apply(_this$console$info, [this.console].concat(args));
    }
  }, {
    key: "warn",
    value: function warn() {
      var _this$console$warn;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return (_this$console$warn = this.console.warn).bind.apply(_this$console$warn, [this.console].concat(args));
    }
  }, {
    key: "error",
    value: function error() {
      var _this$console$error;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return (_this$console$error = this.console.error).bind.apply(_this$console$error, [this.console].concat(args));
    }
  }]);

  return ConsoleLog;
}();

function _createForOfIteratorHelper$9(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$a(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$a(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$a(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$a(o, minLen); }

function _arrayLikeToArray$a(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$a(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var DEFAULT_LOADER_OPTIONS = {
  baseUri: '',
  fetch: null,
  CDN: 'https://unpkg.com/@loaders.gl',
  worker: true,
  log: new ConsoleLog(),
  metadata: false,
  transforms: [],
  reuseWorkers: true
};
var DEPRECATED_LOADER_OPTIONS = {
  dataType: '(no longer used)',
  method: 'fetch.method',
  headers: 'fetch.headers',
  body: 'fetch.body',
  mode: 'fetch.mode',
  credentials: 'fetch.credentials',
  cache: 'fetch.cache',
  redirect: 'fetch.redirect',
  referrer: 'fetch.referrer',
  referrerPolicy: 'fetch.referrerPolicy',
  integrity: 'fetch.integrity',
  keepalive: 'fetch.keepalive',
  signal: 'fetch.signal'
};
var getGlobalLoaderState = function getGlobalLoaderState() {
  global_$1.loaders = global_$1.loaders || {};
  var loaders = global_$1.loaders;
  loaders._state = loaders._state || {};
  return loaders._state;
};

var getGlobalLoaderOptions = function getGlobalLoaderOptions() {
  var state = getGlobalLoaderState();
  state.globalOptions = state.globalOptions || _objectSpread$9({}, DEFAULT_LOADER_OPTIONS);
  return state.globalOptions;
};

function setGlobalOptions(options) {
  var state = getGlobalLoaderState();
  var globalOptions = getGlobalLoaderOptions();
  state.globalOptions = normalizeOptionsInternal(globalOptions, options);
}
function normalizeOptions(options, loader, loaders, url) {
  loaders = loaders || [];
  loaders = Array.isArray(loaders) ? loaders : [loaders];
  validateOptions(options, loaders);
  return normalizeOptionsInternal(loader, options, url);
}
function getFetchFunction(options, context) {
  var globalOptions = getGlobalLoaderOptions();
  var fetch = options.fetch || globalOptions.fetch;

  if (typeof fetch === 'function') {
    return fetch;
  }

  if (isObject(fetch)) {
    return function (url) {
      return fetchFile(url, fetch);
    };
  }

  if (context && context.fetch) {
    return context.fetch;
  }

  return function (url) {
    return fetchFile(url, options);
  };
}

function validateOptions(options, loaders) {
  var log = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console;
  validateOptionsObject(options, null, log, DEFAULT_LOADER_OPTIONS, DEPRECATED_LOADER_OPTIONS, loaders);

  var _iterator = _createForOfIteratorHelper$9(loaders),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var loader = _step.value;
      var idOptions = options && options[loader.id] || {};
      var loaderOptions = loader.options && loader.options[loader.id] || {};
      var deprecatedOptions = loader.defaultOptions && loader.defaultOptions[loader.id] || {};
      validateOptionsObject(idOptions, loader.id, log, loaderOptions, deprecatedOptions, loaders);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function validateOptionsObject(options, id, log, defaultOptions, deprecatedOptions, loaders) {
  var loaderName = id || 'Top level';
  var prefix = id ? "".concat(id, ".") : '';

  for (var key in options) {
    var isSubOptions = !id && isObject(options[key]);

    if (!(key in defaultOptions)) {
      if (key in deprecatedOptions) {
        log.warn("".concat(loaderName, " loader option '").concat(prefix).concat(key, "' deprecated, use '").concat(deprecatedOptions[key], "'"));
      } else if (!isSubOptions) {
        var suggestion = findSimilarOption(key, loaders);
        log.warn("".concat(loaderName, " loader option '").concat(prefix).concat(key, "' not recognized. ").concat(suggestion));
      }
    }
  }
}

function findSimilarOption(optionKey, loaders) {
  var lowerCaseOptionKey = optionKey.toLowerCase();
  var bestSuggestion = '';

  var _iterator2 = _createForOfIteratorHelper$9(loaders),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var loader = _step2.value;

      for (var key in loader.options) {
        if (optionKey === key) {
          return "Did you mean '".concat(loader.id, ".").concat(key, "'?");
        }

        var lowerCaseKey = key.toLowerCase();
        var isPartialMatch = lowerCaseOptionKey.startsWith(lowerCaseKey) || lowerCaseKey.startsWith(lowerCaseOptionKey);

        if (isPartialMatch) {
          bestSuggestion = bestSuggestion || "Did you mean '".concat(loader.id, ".").concat(key, "'?");
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return bestSuggestion;
}

function normalizeOptionsInternal(loader, options, url) {
  var loaderDefaultOptions = loader.options || {};

  var mergedOptions = _objectSpread$9({}, loaderDefaultOptions);

  if (mergedOptions.log === null) {
    mergedOptions.log = new NullLog();
  }

  mergeNestedFields(mergedOptions, getGlobalLoaderOptions());
  mergeNestedFields(mergedOptions, options);
  addUrlOptions(mergedOptions, url);
  return mergedOptions;
}

function mergeNestedFields(mergedOptions, options) {
  for (var key in options) {
    if (key in options) {
      var value = options[key];

      if (isPureObject(value) && isPureObject(mergedOptions[key])) {
        mergedOptions[key] = _objectSpread$9(_objectSpread$9({}, mergedOptions[key]), options[key]);
      } else {
        mergedOptions[key] = options[key];
      }
    }
  }
}

function addUrlOptions(options, url) {
  if (url && !options.baseUri) {
    options.baseUri = url;
  }
}

function setLoaderOptions(options) {
  setGlobalOptions(options);
}

function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$9(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function isLoaderObject(loader) {
  if (!loader) {
    return false;
  }

  if (Array.isArray(loader)) {
    loader = loader[0];
  }

  var hasParser = loader.parseTextSync || loader.parseSync || loader.parse || loader.parseStream || loader.parseInBatches;
  var loaderOptions = loader.options && loader.options[loader.id];
  hasParser = hasParser || loaderOptions && loaderOptions.workerUrl;
  return hasParser;
}
function normalizeLoader(loader) {
  assert$2(loader, 'null loader');
  assert$2(isLoaderObject(loader), 'invalid loader');
  var options;

  if (Array.isArray(loader)) {
    options = loader[1];
    loader = loader[0];
    loader = _objectSpread$8(_objectSpread$8({}, loader), {}, {
      options: _objectSpread$8(_objectSpread$8({}, loader.options), options)
    });
  }

  if (loader.extension) {
    loader.extensions = loader.extensions || loader.extension;
    delete loader.extension;
  }

  if (!Array.isArray(loader.extensions)) {
    loader.extensions = [loader.extensions];
  }

  assert$2(loader.extensions && loader.extensions.length > 0 && loader.extensions[0]);

  if (loader.parseTextSync || loader.parseText) {
    loader.text = true;
  }

  if (!loader.text) {
    loader.binary = true;
  }

  return loader;
}

function _createForOfIteratorHelper$8(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$9(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$9(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$9(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen); }

function _arrayLikeToArray$9(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getGlobalLoaderRegistry = function getGlobalLoaderRegistry() {
  var state = getGlobalLoaderState();
  state.loaderRegistry = state.loaderRegistry || [];
  return state.loaderRegistry;
};

function registerLoaders(loaders) {
  var loaderRegistry = getGlobalLoaderRegistry();
  loaders = Array.isArray(loaders) ? loaders : [loaders];

  var _iterator = _createForOfIteratorHelper$8(loaders),
      _step;

  try {
    var _loop = function _loop() {
      var loader = _step.value;
      var normalizedLoader = normalizeLoader(loader);

      if (!loaderRegistry.find(function (registeredLoader) {
        return normalizedLoader === registeredLoader;
      })) {
        loaderRegistry.unshift(normalizedLoader);
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function getRegisteredLoaders() {
  return getGlobalLoaderRegistry();
}
function _unregisterLoaders() {
  var state = getGlobalLoaderState();
  state.loaderRegistry = [];
}

var _marked$2 = regenerator.mark(makeStringIterator);

function makeStringIterator(string) {
  var options,
      _options$chunkSize,
      chunkSize,
      offset,
      textEncoder,
      chunkLength,
      chunk,
      _args = arguments;

  return regenerator.wrap(function makeStringIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          _options$chunkSize = options.chunkSize, chunkSize = _options$chunkSize === void 0 ? 256 * 1024 : _options$chunkSize;
          offset = 0;
          textEncoder = new TextEncoder();

        case 4:
          if (!(offset < string.length)) {
            _context.next = 12;
            break;
          }

          chunkLength = Math.min(string.length - offset, chunkSize);
          chunk = string.slice(offset, offset + chunkLength);
          offset += chunkLength;
          _context.next = 10;
          return textEncoder.encode(chunk);

        case 10:
          _context.next = 4;
          break;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$2);
}

var _marked$1 = regenerator.mark(makeArrayBufferIterator);

function makeArrayBufferIterator(arrayBuffer) {
  var options,
      _options$chunkSize,
      chunkSize,
      byteOffset,
      chunkByteLength,
      chunk,
      sourceArray,
      chunkArray,
      _args = arguments;

  return regenerator.wrap(function makeArrayBufferIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          _options$chunkSize = options.chunkSize, chunkSize = _options$chunkSize === void 0 ? 256 * 1024 : _options$chunkSize;
          byteOffset = 0;

        case 3:
          if (!(byteOffset < arrayBuffer.byteLength)) {
            _context.next = 14;
            break;
          }

          chunkByteLength = Math.min(arrayBuffer.byteLength - byteOffset, chunkSize);
          chunk = new ArrayBuffer(chunkByteLength);
          sourceArray = new Uint8Array(arrayBuffer, byteOffset, chunkByteLength);
          chunkArray = new Uint8Array(chunk);
          chunkArray.set(sourceArray);
          byteOffset += chunkByteLength;
          _context.next = 12;
          return chunk;

        case 12:
          _context.next = 3;
          break;

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$1);
}

var DEFAULT_CHUNK_SIZE = 1024 * 1024;
function makeBlobIterator(_x) {
  return _makeBlobIterator.apply(this, arguments);
}

function _makeBlobIterator() {
  _makeBlobIterator = _wrapAsyncGenerator(regenerator.mark(function _callee(file) {
    var options,
        chunkSize,
        offset,
        end,
        chunk,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            chunkSize = options.chunkSize || DEFAULT_CHUNK_SIZE;
            offset = 0;

          case 3:
            if (!(offset < file.size)) {
              _context.next = 13;
              break;
            }

            end = offset + chunkSize;
            _context.next = 7;
            return _awaitAsyncGenerator(readFileSlice$1(file, offset, end));

          case 7:
            chunk = _context.sent;
            offset = end;
            _context.next = 11;
            return chunk;

          case 11:
            _context.next = 3;
            break;

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _makeBlobIterator.apply(this, arguments);
}

function readFileSlice$1(_x2, _x3, _x4) {
  return _readFileSlice$1.apply(this, arguments);
}

function _readFileSlice$1() {
  _readFileSlice$1 = _asyncToGenerator(regenerator.mark(function _callee2(file, offset, end) {
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return new Promise(function (resolve, reject) {
              var slice = file.slice(offset, end);
              var fileReader = new FileReader();

              fileReader.onload = function (event) {
                return resolve(event.target && event.target.result);
              };

              fileReader.onerror = function (error) {
                return reject(error);
              };

              fileReader.readAsArrayBuffer(slice);
            });

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _readFileSlice$1.apply(this, arguments);
}

function makeStreamIterator(stream) {
  if (isBrowser$1 || nodeVersion >= 10) {
    if (typeof stream[Symbol.asyncIterator] === 'function') {
      return makeToArrayBufferIterator(stream);
    }

    if (typeof stream.getIterator === 'function') {
      return stream.getIterator();
    }
  }

  return isBrowser$1 ? makeBrowserStreamIterator(stream) : makeNodeStreamIterator(stream);
}

function makeToArrayBufferIterator(_x) {
  return _makeToArrayBufferIterator.apply(this, arguments);
}

function _makeToArrayBufferIterator() {
  _makeToArrayBufferIterator = _wrapAsyncGenerator(regenerator.mark(function _callee(asyncIterator) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, chunk;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context.prev = 2;
            _iterator = _asyncIterator(asyncIterator);

          case 4:
            _context.next = 6;
            return _awaitAsyncGenerator(_iterator.next());

          case 6:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 10;
            return _awaitAsyncGenerator(_step.value);

          case 10:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 18;
              break;
            }

            chunk = _value;
            _context.next = 15;
            return toArrayBuffer(chunk);

          case 15:
            _iteratorNormalCompletion = true;
            _context.next = 4;
            break;

          case 18:
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](2);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 24:
            _context.prev = 24;
            _context.prev = 25;

            if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
              _context.next = 29;
              break;
            }

            _context.next = 29;
            return _awaitAsyncGenerator(_iterator["return"]());

          case 29:
            _context.prev = 29;

            if (!_didIteratorError) {
              _context.next = 32;
              break;
            }

            throw _iteratorError;

          case 32:
            return _context.finish(29);

          case 33:
            return _context.finish(24);

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 20, 24, 34], [25,, 29, 33]]);
  }));
  return _makeToArrayBufferIterator.apply(this, arguments);
}

function makeBrowserStreamIterator(_x2) {
  return _makeBrowserStreamIterator.apply(this, arguments);
}

function _makeBrowserStreamIterator() {
  _makeBrowserStreamIterator = _wrapAsyncGenerator(regenerator.mark(function _callee2(stream) {
    var reader, _yield$_awaitAsyncGen, done, value;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            reader = stream.getReader();
            _context2.prev = 1;

          case 2:

            _context2.next = 5;
            return _awaitAsyncGenerator(reader.read());

          case 5:
            _yield$_awaitAsyncGen = _context2.sent;
            done = _yield$_awaitAsyncGen.done;
            value = _yield$_awaitAsyncGen.value;

            if (!done) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return");

          case 10:
            _context2.next = 12;
            return toArrayBuffer(value);

          case 12:
            _context2.next = 2;
            break;

          case 14:
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](1);
            reader.releaseLock();

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 16]]);
  }));
  return _makeBrowserStreamIterator.apply(this, arguments);
}

function makeNodeStreamIterator(_x3) {
  return _makeNodeStreamIterator.apply(this, arguments);
}

function _makeNodeStreamIterator() {
  _makeNodeStreamIterator = _wrapAsyncGenerator(regenerator.mark(function _callee3(stream) {
    var data;
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _awaitAsyncGenerator(stream);

          case 2:
            stream = _context3.sent;

          case 3:

            data = stream.read();

            if (!(data !== null)) {
              _context3.next = 9;
              break;
            }

            _context3.next = 8;
            return toArrayBuffer(data);

          case 8:
            return _context3.abrupt("continue", 3);

          case 9:
            if (!stream._readableState.ended) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return");

          case 11:
            _context3.next = 13;
            return _awaitAsyncGenerator(onceReadable(stream));

          case 13:
            _context3.next = 3;
            break;

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _makeNodeStreamIterator.apply(this, arguments);
}

function onceReadable(_x4) {
  return _onceReadable.apply(this, arguments);
}

function _onceReadable() {
  _onceReadable = _asyncToGenerator(regenerator.mark(function _callee4(stream) {
    return regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise(function (resolve) {
              stream.once('readable', resolve);
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _onceReadable.apply(this, arguments);
}

function makeIterator(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof data === 'string') {
    return makeStringIterator(data, options);
  }

  if (data instanceof ArrayBuffer) {
    return makeArrayBufferIterator(data, options);
  }

  if (isBlob(data)) {
    return makeBlobIterator(data, options);
  }

  if (isReadableStream(data)) {
    return makeStreamIterator(data);
  }

  if (isResponse(data)) {
    return makeStreamIterator(data.body);
  }

  return assert$2(false);
}

var ERR_DATA = 'Cannot convert supplied data type';
function getArrayBufferOrStringFromDataSync(data, loader) {
  if (loader.text && typeof data === 'string') {
    return data;
  }

  if (data instanceof ArrayBuffer) {
    var arrayBuffer = data;

    if (loader.text && !loader.binary) {
      var textDecoder = new TextDecoder('utf8');
      return textDecoder.decode(arrayBuffer);
    }

    return arrayBuffer;
  }

  if (ArrayBuffer.isView(data) || isBuffer(data)) {
    if (loader.text && !loader.binary) {
      var _textDecoder = new TextDecoder('utf8');

      return _textDecoder.decode(data);
    }

    var _arrayBuffer = data.buffer;
    var byteLength = data.byteLength || data.length;

    if (data.byteOffset !== 0 || byteLength !== _arrayBuffer.byteLength) {
      _arrayBuffer = _arrayBuffer.slice(data.byteOffset, data.byteOffset + byteLength);
    }

    return _arrayBuffer;
  }

  throw new Error(ERR_DATA);
}
function getArrayBufferOrStringFromData(_x, _x2) {
  return _getArrayBufferOrStringFromData.apply(this, arguments);
}

function _getArrayBufferOrStringFromData() {
  _getArrayBufferOrStringFromData = _asyncToGenerator(regenerator.mark(function _callee(data, loader) {
    var isArrayBuffer, response;
    return regenerator.wrap(function _callee$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isArrayBuffer = data instanceof ArrayBuffer || ArrayBuffer.isView(data);

            if (!(typeof data === 'string' || isArrayBuffer)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", getArrayBufferOrStringFromDataSync(data, loader));

          case 3:
            if (!isBlob(data)) {
              _context3.next = 7;
              break;
            }

            _context3.next = 6;
            return makeResponse(data);

          case 6:
            data = _context3.sent;

          case 7:
            if (!isResponse(data)) {
              _context3.next = 21;
              break;
            }

            response = data;
            _context3.next = 11;
            return checkResponse(response);

          case 11:
            if (!loader.binary) {
              _context3.next = 17;
              break;
            }

            _context3.next = 14;
            return response.arrayBuffer();

          case 14:
            _context3.t0 = _context3.sent;
            _context3.next = 20;
            break;

          case 17:
            _context3.next = 19;
            return response.text();

          case 19:
            _context3.t0 = _context3.sent;

          case 20:
            return _context3.abrupt("return", _context3.t0);

          case 21:
            if (isReadableStream(data)) {
              data = makeIterator(data);
            }

            if (!(isIterable(data) || isAsyncIterable(data))) {
              _context3.next = 24;
              break;
            }

            return _context3.abrupt("return", concatenateChunksAsync(data));

          case 24:
            throw new Error(ERR_DATA);

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee);
  }));
  return _getArrayBufferOrStringFromData.apply(this, arguments);
}

function getAsyncIteratorFromData(_x3) {
  return _getAsyncIteratorFromData.apply(this, arguments);
}

function _getAsyncIteratorFromData() {
  _getAsyncIteratorFromData = _asyncToGenerator(regenerator.mark(function _callee2(data) {
    return regenerator.wrap(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!isIterator(data)) {
              _context4.next = 2;
              break;
            }

            return _context4.abrupt("return", data);

          case 2:
            if (!isResponse(data)) {
              _context4.next = 6;
              break;
            }

            _context4.next = 5;
            return checkResponse(data);

          case 5:
            return _context4.abrupt("return", makeIterator(data.body));

          case 6:
            if (!(isBlob(data) || isReadableStream(data))) {
              _context4.next = 8;
              break;
            }

            return _context4.abrupt("return", makeIterator(data));

          case 8:
            if (!isAsyncIterable(data)) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", data[Symbol.asyncIterator]());

          case 10:
            return _context4.abrupt("return", getIteratorFromData(data));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee2);
  }));
  return _getAsyncIteratorFromData.apply(this, arguments);
}

function getIteratorFromData(data) {
  if (ArrayBuffer.isView(data)) {
    return regenerator.mark(function oneChunk() {
      return regenerator.wrap(function oneChunk$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return data.buffer;

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, oneChunk);
    })();
  }

  if (data instanceof ArrayBuffer) {
    return regenerator.mark(function oneChunk() {
      return regenerator.wrap(function oneChunk$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return data;

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, oneChunk);
    })();
  }

  if (isIterator(data)) {
    return data;
  }

  if (isIterable(data)) {
    return data[Symbol.iterator]();
  }

  throw new Error(ERR_DATA);
}

function getReadableStream(_x4) {
  return _getReadableStream.apply(this, arguments);
}

function _getReadableStream() {
  _getReadableStream = _asyncToGenerator(regenerator.mark(function _callee3(data) {
    var response;
    return regenerator.wrap(function _callee3$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!isReadableStream(data)) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt("return", data);

          case 2:
            if (!isResponse(data)) {
              _context5.next = 4;
              break;
            }

            return _context5.abrupt("return", data.body);

          case 4:
            _context5.next = 6;
            return makeResponse(data);

          case 6:
            response = _context5.sent;
            return _context5.abrupt("return", response.body);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee3);
  }));
  return _getReadableStream.apply(this, arguments);
}

function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$8(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function getLoaderContext(context, options) {
  var previousContext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (previousContext) {
    return previousContext;
  }

  context = _objectSpread$7({
    fetch: getFetchFunction(options || {}, context)
  }, context);

  if (!Array.isArray(context.loaders)) {
    context.loaders = null;
  }

  return context;
}
function getLoaders(loaders, context) {
  if (!context && loaders && !Array.isArray(loaders)) {
    return loaders;
  }

  var candidateLoaders;

  if (loaders) {
    candidateLoaders = Array.isArray(loaders) ? loaders : [loaders];
  }

  if (context && context.loaders) {
    var contextLoaders = Array.isArray(context.loaders) ? context.loaders : [context.loaders];
    candidateLoaders = candidateLoaders ? [].concat(_toConsumableArray$1(candidateLoaders), _toConsumableArray$1(contextLoaders)) : contextLoaders;
  }

  return candidateLoaders && candidateLoaders.length ? candidateLoaders : null;
}

var VERSION$5 = "2.3.13" ;
function canParseWithWorker(loader, data, options, context) {
  if (!WorkerFarm.isSupported()) {
    return false;
  }

  var loaderOptions = options && options[loader.id];

  if (options.worker === 'local' && loaderOptions && loaderOptions.localWorkerUrl || options.worker && loaderOptions && loaderOptions.workerUrl) {
    return loader.useWorker ? loader.useWorker(options) : true;
  }

  return false;
}
function parseWithWorker(loader, data, options, context) {
  var _ref = options || {},
      worker = _ref.worker;

  var loaderOptions = options && options[loader.id] || {};
  var workerUrl = worker === 'local' ? loaderOptions.localWorkerUrl : loaderOptions.workerUrl;
  var workerSource = "url(".concat(workerUrl, ")");
  var workerName = loader.name;
  var workerFarm = getWorkerFarm(options);
  options = JSON.parse(JSON.stringify(options));
  var warning = loader.version !== VERSION$5 ? "(core version ".concat(VERSION$5, ")") : '';
  return workerFarm.process(workerSource, "".concat(workerName, "-worker@").concat(loader.version).concat(warning), {
    arraybuffer: toArrayBuffer(data),
    options: options,
    source: "loaders.gl@".concat(VERSION$5),
    type: 'parse'
  });
}
var _workerFarm = null;

function getWorkerFarm() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var props = {};

  if (options.maxConcurrency) {
    props.maxConcurrency = options.maxConcurrency;
  }

  if (options.onDebug) {
    props.onDebug = options.onDebug;
  }

  if ('reuseWorkers' in options) {
    props.reuseWorkers = options.reuseWorkers;
  }

  if (!_workerFarm) {
    _workerFarm = new WorkerFarm({
      onMessage: onWorkerMessage
    });
  }

  _workerFarm.setProps(props);

  return _workerFarm;
}

function onWorkerMessage(_x) {
  return _onWorkerMessage.apply(this, arguments);
}

function _onWorkerMessage() {
  _onWorkerMessage = _asyncToGenerator(regenerator.mark(function _callee(_ref2) {
    var worker, data, resolve, reject, result;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            worker = _ref2.worker, data = _ref2.data, resolve = _ref2.resolve, reject = _ref2.reject;
            _context.t0 = data.type;
            _context.next = _context.t0 === 'done' ? 4 : _context.t0 === 'parse' ? 6 : _context.t0 === 'error' ? 17 : 19;
            break;

          case 4:
            resolve(data.result);
            return _context.abrupt("break", 19);

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return parse$2(data.arraybuffer, data.options, data.url);

          case 9:
            result = _context.sent;
            worker.postMessage({
              type: 'parse-done',
              id: data.id,
              result: result
            }, getTransferList(result));
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t1 = _context["catch"](6);
            worker.postMessage({
              type: 'parse-error',
              id: data.id,
              message: _context.t1.message
            });

          case 16:
            return _context.abrupt("break", 19);

          case 17:
            reject(data.message);
            return _context.abrupt("break", 19);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 13]]);
  }));
  return _onWorkerMessage.apply(this, arguments);
}

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper$7(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$8(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$8(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$8(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen); }

function _arrayLikeToArray$8(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var EXT_PATTERN = /\.([^.]+)$/;
function selectLoader(_x) {
  return _selectLoader.apply(this, arguments);
}

function _selectLoader() {
  _selectLoader = _asyncToGenerator(regenerator.mark(function _callee(data) {
    var loaders,
        options,
        context,
        loader,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            loaders = _args.length > 1 && _args[1] !== undefined ? _args[1] : [];
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            context = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
            loader = selectLoaderSync(data, loaders, _objectSpread$6(_objectSpread$6({}, options), {}, {
              nothrow: true
            }), context);

            if (!loader) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", loader);

          case 6:
            if (!isBlob(data)) {
              _context.next = 11;
              break;
            }

            _context.next = 9;
            return readFileSlice$1(data, 0, 10);

          case 9:
            data = _context.sent;
            loader = selectLoaderSync(data, loaders, options, context);

          case 11:
            if (!(!loader && !options.nothrow)) {
              _context.next = 13;
              break;
            }

            throw new Error(getNoValidLoaderMessage(data));

          case 13:
            return _context.abrupt("return", loader);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _selectLoader.apply(this, arguments);
}

function selectLoaderSync(data) {
  var loaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (loaders && !Array.isArray(loaders)) {
    return normalizeLoader(loaders);
  }

  loaders = [].concat(_toConsumableArray$1(loaders || []), _toConsumableArray$1(getRegisteredLoaders()));
  normalizeLoaders(loaders);

  var _getResourceUrlAndTyp = getResourceUrlAndType(data),
      url = _getResourceUrlAndTyp.url,
      type = _getResourceUrlAndTyp.type;

  var loader = findLoaderByUrl(loaders, url || context.url);
  loader = loader || findLoaderByContentType(loaders, type);
  loader = loader || findLoaderByExamingInitialData(loaders, data);

  if (!loader && !options.nothrow) {
    throw new Error(getNoValidLoaderMessage(data));
  }

  return loader;
}

function getNoValidLoaderMessage(data) {
  var _getResourceUrlAndTyp2 = getResourceUrlAndType(data),
      url = _getResourceUrlAndTyp2.url,
      type = _getResourceUrlAndTyp2.type;

  var message = 'No valid loader found';

  if (data) {
    message += " data: \"".concat(getFirstCharacters(data), "\", contentType: \"").concat(type, "\"");
  }

  if (url) {
    message += " url: ".concat(url);
  }

  return message;
}

function normalizeLoaders(loaders) {
  var _iterator = _createForOfIteratorHelper$7(loaders),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var loader = _step.value;
      normalizeLoader(loader);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function findLoaderByUrl(loaders, url) {
  var match = url && url.match(EXT_PATTERN);
  var extension = match && match[1];
  return extension && findLoaderByExtension(loaders, extension);
}

function findLoaderByExtension(loaders, extension) {
  extension = extension.toLowerCase();

  var _iterator2 = _createForOfIteratorHelper$7(loaders),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var loader = _step2.value;

      var _iterator3 = _createForOfIteratorHelper$7(loader.extensions),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var loaderExtension = _step3.value;

          if (loaderExtension.toLowerCase() === extension) {
            return loader;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return null;
}

function findLoaderByContentType(loaders, mimeType) {
  var _iterator4 = _createForOfIteratorHelper$7(loaders),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var loader = _step4.value;

      if (loader.mimeTypes && loader.mimeTypes.includes(mimeType)) {
        return loader;
      }

      if (mimeType === "application/x.".concat(loader.id)) {
        return loader;
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  return null;
}

function findLoaderByExamingInitialData(loaders, data) {
  if (!data) {
    return null;
  }

  var _iterator5 = _createForOfIteratorHelper$7(loaders),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var loader = _step5.value;

      if (typeof data === 'string') {
        if (testDataAgainstText(data, loader)) {
          return loader;
        }
      } else if (ArrayBuffer.isView(data)) {
        if (testDataAgainstBinary(data.buffer, data.byteOffset, loader)) {
          return loader;
        }
      } else if (data instanceof ArrayBuffer) {
        var byteOffset = 0;

        if (testDataAgainstBinary(data, byteOffset, loader)) {
          return loader;
        }
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  return null;
}

function testDataAgainstText(data, loader) {
  return loader.testText && loader.testText(data);
}

function testDataAgainstBinary(data, byteOffset, loader) {
  var tests = Array.isArray(loader.tests) ? loader.tests : [loader.tests];
  return tests.some(function (test) {
    return testBinary(data, byteOffset, loader, test);
  });
}

function testBinary(data, byteOffset, loader, test) {
  if (test instanceof ArrayBuffer) {
    return compareArrayBuffers(test, data, test.byteLength);
  }

  switch (_typeof(test)) {
    case 'function':
      return test(data, loader);

    case 'string':
      var magic = getMagicString$1(data, byteOffset, test.length);
      return test === magic;

    default:
      return false;
  }
}

function getFirstCharacters(data) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

  if (typeof data === 'string') {
    return data.slice(0, length);
  } else if (ArrayBuffer.isView(data)) {
    return getMagicString$1(data.buffer, data.byteOffset, length);
  } else if (data instanceof ArrayBuffer) {
    var byteOffset = 0;
    return getMagicString$1(data, byteOffset, length);
  }

  return '';
}

function getMagicString$1(arrayBuffer, byteOffset, length) {
  if (arrayBuffer.byteLength < byteOffset + length) {
    return '';
  }

  var dataView = new DataView(arrayBuffer);
  var magic = '';

  for (var i = 0; i < length; i++) {
    magic += String.fromCharCode(dataView.getUint8(byteOffset + i));
  }

  return magic;
}

function parse$2(_x, _x2, _x3, _x4) {
  return _parse$2.apply(this, arguments);
}

function _parse$2() {
  _parse$2 = _asyncToGenerator(regenerator.mark(function _callee(data, loaders, options, context) {
    var _getResourceUrlAndTyp, url, candidateLoaders, loader;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            assert$2(!context || typeof context !== 'string', 'parse no longer accepts final url');

            if (loaders && !Array.isArray(loaders) && !isLoaderObject(loaders)) {
              context = options;
              options = loaders;
              loaders = null;
            }

            _context.next = 4;
            return data;

          case 4:
            data = _context.sent;
            options = options || {};
            _getResourceUrlAndTyp = getResourceUrlAndType(data), url = _getResourceUrlAndTyp.url;
            candidateLoaders = getLoaders(loaders, context);
            _context.next = 10;
            return selectLoader(data, candidateLoaders, options);

          case 10:
            loader = _context.sent;

            if (loader) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", null);

          case 13:
            options = normalizeOptions(options, loader, candidateLoaders, url);
            context = getLoaderContext({
              url: url,
              parse: parse$2,
              loaders: candidateLoaders
            }, options, context);
            _context.next = 17;
            return parseWithLoader(loader, data, options, context);

          case 17:
            return _context.abrupt("return", _context.sent);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parse$2.apply(this, arguments);
}

function parseWithLoader(_x5, _x6, _x7, _x8) {
  return _parseWithLoader.apply(this, arguments);
}

function _parseWithLoader() {
  _parseWithLoader = _asyncToGenerator(regenerator.mark(function _callee2(loader, data, options, context) {
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            validateLoaderVersion(loader);
            _context2.next = 3;
            return getArrayBufferOrStringFromData(data, loader);

          case 3:
            data = _context2.sent;

            if (!(loader.parseTextSync && typeof data === 'string')) {
              _context2.next = 7;
              break;
            }

            options.dataType = 'text';
            return _context2.abrupt("return", loader.parseTextSync(data, options, context, loader));

          case 7:
            if (!canParseWithWorker(loader, data, options)) {
              _context2.next = 11;
              break;
            }

            _context2.next = 10;
            return parseWithWorker(loader, data, options);

          case 10:
            return _context2.abrupt("return", _context2.sent);

          case 11:
            if (!(loader.parseText && typeof data === 'string')) {
              _context2.next = 15;
              break;
            }

            _context2.next = 14;
            return loader.parseText(data, options, context, loader);

          case 14:
            return _context2.abrupt("return", _context2.sent);

          case 15:
            if (!loader.parse) {
              _context2.next = 19;
              break;
            }

            _context2.next = 18;
            return loader.parse(data, options, context, loader);

          case 18:
            return _context2.abrupt("return", _context2.sent);

          case 19:
            assert$2(!loader.parseSync);
            return _context2.abrupt("return", assert$2(false));

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _parseWithLoader.apply(this, arguments);
}

function parseSync$1(data, loaders, options, context) {
  assert$2(!context || typeof context !== 'string', 'parseSync no longer accepts final url');

  if (!Array.isArray(loaders) && !isLoaderObject(loaders)) {
    context = options;
    options = loaders;
    loaders = null;
  }

  options = options || {};
  var candidateLoaders = getLoaders(loaders, context);
  var loader = selectLoaderSync(data, candidateLoaders, options);

  if (!loader) {
    return null;
  }

  options = normalizeOptions(options, loader, candidateLoaders);

  var _getResourceUrlAndTyp = getResourceUrlAndType(data),
      url = _getResourceUrlAndTyp.url;

  context = getLoaderContext({
    url: url,
    parseSync: parseSync$1,
    loaders: loaders
  }, options);
  return parseWithLoaderSync(loader, data, options, context);
}

function parseWithLoaderSync(loader, data, options, context) {
  data = getArrayBufferOrStringFromDataSync(data, loader);

  if (loader.parseTextSync && typeof data === 'string') {
    return loader.parseTextSync(data, options, context, loader);
  }

  if (loader.parseSync) {
    return loader.parseSync(data, options, context, loader);
  }

  throw new Error("".concat(loader.name, " loader: 'parseSync' not supported by this loader, use 'parse' instead. ").concat(context.url || ''));
}

function _asyncGeneratorDelegate(inner, awaitWrap) {
  var iter = {},
      waiting = false;

  function pump(key, value) {
    waiting = true;
    value = new Promise(function (resolve) {
      resolve(inner[key](value));
    });
    return {
      done: false,
      value: awaitWrap(value)
    };
  }

  if (typeof Symbol === "function" && Symbol.iterator) {
    iter[Symbol.iterator] = function () {
      return this;
    };
  }

  iter.next = function (value) {
    if (waiting) {
      waiting = false;
      return value;
    }

    return pump("next", value);
  };

  if (typeof inner["throw"] === "function") {
    iter["throw"] = function (value) {
      if (waiting) {
        waiting = false;
        throw value;
      }

      return pump("throw", value);
    };
  }

  if (typeof inner["return"] === "function") {
    iter["return"] = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }

      return pump("return", value);
    };
  }

  return iter;
}

function _createForOfIteratorHelper$6(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$7(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$7(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$7(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen); }

function _arrayLikeToArray$7(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function parseInBatches(_x2, _x3, _x4, _x5) {
  return _parseInBatches.apply(this, arguments);
}

function _parseInBatches() {
  _parseInBatches = _asyncToGenerator(regenerator.mark(function _callee(data, loaders, options, context) {
    var _getResourceUrlAndTyp, url, loader;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            assert$2(!context || typeof context !== 'string', 'parseInBatches no longer accepts final url');

            if (!Array.isArray(loaders) && !isLoaderObject(loaders)) {
              context = options;
              options = loaders;
              loaders = null;
            }

            _context.next = 4;
            return data;

          case 4:
            data = _context.sent;
            options = options || {};
            _getResourceUrlAndTyp = getResourceUrlAndType(data), url = _getResourceUrlAndTyp.url;
            _context.next = 9;
            return selectLoader(data, loaders, options);

          case 9:
            loader = _context.sent;

            if (loader) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", null);

          case 12:
            options = normalizeOptions(options, loader, loaders, url);
            context = getLoaderContext({
              url: url,
              parseInBatches: parseInBatches,
              parse: parse$2,
              loaders: loaders
            }, options, context);
            _context.next = 16;
            return parseWithLoaderInBatches(loader, data, options, context);

          case 16:
            return _context.abrupt("return", _context.sent);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseInBatches.apply(this, arguments);
}

function parseWithLoaderInBatches(_x6, _x7, _x8, _x9) {
  return _parseWithLoaderInBatches.apply(this, arguments);
}

function _parseWithLoaderInBatches() {
  _parseWithLoaderInBatches = _asyncToGenerator(regenerator.mark(function _callee3(loader, data, options, context) {
    var outputIterator, metadataBatch, makeMetadataBatchIterator, _makeMetadataBatchIterator;

    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _makeMetadataBatchIterator = function _makeMetadataBatchIte2() {
              _makeMetadataBatchIterator = _wrapAsyncGenerator(regenerator.mark(function _callee2(iterator) {
                return regenerator.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return metadataBatch;

                      case 2:
                        return _context2.delegateYield(_asyncGeneratorDelegate(_asyncIterator(iterator), _awaitAsyncGenerator), "t0", 3);

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));
              return _makeMetadataBatchIterator.apply(this, arguments);
            };

            makeMetadataBatchIterator = function _makeMetadataBatchIte(_x) {
              return _makeMetadataBatchIterator.apply(this, arguments);
            };

            _context3.next = 4;
            return parseToOutputIterator(loader, data, options, context);

          case 4:
            outputIterator = _context3.sent;

            if (options.metadata) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", outputIterator);

          case 7:
            metadataBatch = {
              batchType: 'metadata',
              metadata: {
                _loader: loader,
                _context: context
              },
              data: [],
              bytesUsed: 0
            };
            return _context3.abrupt("return", makeMetadataBatchIterator(outputIterator));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _parseWithLoaderInBatches.apply(this, arguments);
}

function parseToOutputIterator(_x10, _x11, _x12, _x13) {
  return _parseToOutputIterator.apply(this, arguments);
}

function _parseToOutputIterator() {
  _parseToOutputIterator = _asyncToGenerator(regenerator.mark(function _callee5(loader, data, options, context) {
    var inputIterator, iteratorChain, stream, parseChunkInBatches, _parseChunkInBatches;

    return regenerator.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _parseChunkInBatches = function _parseChunkInBatches3() {
              _parseChunkInBatches = _wrapAsyncGenerator(regenerator.mark(function _callee4() {
                var inputIterator, arrayBuffer;
                return regenerator.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return _awaitAsyncGenerator(getAsyncIteratorFromData(data));

                      case 2:
                        inputIterator = _context4.sent;
                        _context4.next = 5;
                        return _awaitAsyncGenerator(concatenateChunksAsync(inputIterator));

                      case 5:
                        arrayBuffer = _context4.sent;
                        _context4.next = 8;
                        return loader.parse(arrayBuffer, options, context, loader);

                      case 8:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));
              return _parseChunkInBatches.apply(this, arguments);
            };

            parseChunkInBatches = function _parseChunkInBatches2() {
              return _parseChunkInBatches.apply(this, arguments);
            };

            if (!loader.parseInBatches) {
              _context5.next = 10;
              break;
            }

            _context5.next = 5;
            return getAsyncIteratorFromData(data);

          case 5:
            inputIterator = _context5.sent;
            iteratorChain = applyInputTransforms(inputIterator, options);
            _context5.next = 9;
            return loader.parseInBatches(iteratorChain, options, context, loader);

          case 9:
            return _context5.abrupt("return", _context5.sent);

          case 10:
            if (!loader.parseStreamInBatches) {
              _context5.next = 17;
              break;
            }

            _context5.next = 13;
            return getReadableStream(data);

          case 13:
            stream = _context5.sent;

            if (!stream) {
              _context5.next = 17;
              break;
            }

            if (options.transforms) {
              console.warn('options.transforms not implemented for loaders that use `parseStreamInBatches`');
            }

            return _context5.abrupt("return", loader.parseStreamInBatches(stream, options, context));

          case 17:
            _context5.next = 19;
            return parseChunkInBatches();

          case 19:
            return _context5.abrupt("return", _context5.sent);

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _parseToOutputIterator.apply(this, arguments);
}

function applyInputTransforms(inputIterator, options) {
  var iteratorChain = inputIterator;

  var _iterator = _createForOfIteratorHelper$6(options.transforms || []),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var Transform = _step.value;
      iteratorChain = makeTransformIterator(iteratorChain, Transform, options);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return iteratorChain;
}

function load(_x, _x2, _x3) {
  return _load.apply(this, arguments);
}

function _load() {
  _load = _asyncToGenerator(regenerator.mark(function _callee(url, loaders, options) {
    var fetch, data;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!Array.isArray(loaders) && !isLoaderObject(loaders)) {
              options = loaders;
              loaders = null;
            }

            fetch = getFetchFunction(options || {});
            data = url;

            if (!(typeof url === 'string')) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return fetch(url);

          case 6:
            data = _context.sent;
            _context.next = 10;
            break;

          case 9:
            url = null;

          case 10:
            if (!isBlob(url)) {
              _context.next = 15;
              break;
            }

            _context.next = 13;
            return fetch(url);

          case 13:
            data = _context.sent;
            url = null;

          case 15:
            _context.next = 17;
            return parse$2(data, loaders, options);

          case 17:
            return _context.abrupt("return", _context.sent);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _load.apply(this, arguments);
}

function loadInBatches(files, loaders, options) {
  if (!Array.isArray(loaders) && !isLoaderObject(loaders)) {
    options = loaders;
    loaders = null;
  }

  var fetch = getFetchFunction(options || {});

  if (!Array.isArray(files)) {
    return loadOneFileInBatches(files, loaders, options, fetch);
  }

  var promises = files.map(function (file) {
    return loadOneFileInBatches(file, loaders, options, fetch);
  });
  return promises;
}

function loadOneFileInBatches(_x, _x2, _x3, _x4) {
  return _loadOneFileInBatches.apply(this, arguments);
}

function _loadOneFileInBatches() {
  _loadOneFileInBatches = _asyncToGenerator(regenerator.mark(function _callee(file, loaders, options, fetch) {
    var url, response;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(typeof file === 'string')) {
              _context.next = 8;
              break;
            }

            url = file;
            _context.next = 4;
            return fetch(url);

          case 4:
            response = _context.sent;
            _context.next = 7;
            return parseInBatches(response, loaders, options);

          case 7:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.next = 10;
            return parseInBatches(file, loaders, options);

          case 10:
            return _context.abrupt("return", _context.sent);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadOneFileInBatches.apply(this, arguments);
}

function getTemporaryFilename(filename) {
  return "/tmp/".concat(filename);
}

function encode$4(_x, _x2, _x3, _x4) {
  return _encode.apply(this, arguments);
}

function _encode() {
  _encode = _asyncToGenerator(regenerator.mark(function _callee(data, writer, options, url) {
    var batches, chunks, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, batch, tmpInputFilename, tmpOutputFilename, outputFilename, response;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!writer.encode) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return writer.encode(data, options);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
            if (!writer.encodeSync) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", writer.encodeSync(data, options));

          case 6:
            if (!writer.encodeText) {
              _context.next = 12;
              break;
            }

            _context.t0 = new TextEncoder();
            _context.next = 10;
            return writer.encodeText(data, options);

          case 10:
            _context.t1 = _context.sent;
            return _context.abrupt("return", _context.t0.encode.call(_context.t0, _context.t1));

          case 12:
            if (!writer.encodeInBatches) {
              _context.next = 51;
              break;
            }

            batches = encodeInBatches(data, writer, options);
            chunks = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context.prev = 17;
            _iterator = _asyncIterator(batches);

          case 19:
            _context.next = 21;
            return _iterator.next();

          case 21:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 25;
            return _step.value;

          case 25:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 32;
              break;
            }

            batch = _value;
            chunks.push(batch);

          case 29:
            _iteratorNormalCompletion = true;
            _context.next = 19;
            break;

          case 32:
            _context.next = 38;
            break;

          case 34:
            _context.prev = 34;
            _context.t2 = _context["catch"](17);
            _didIteratorError = true;
            _iteratorError = _context.t2;

          case 38:
            _context.prev = 38;
            _context.prev = 39;

            if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
              _context.next = 43;
              break;
            }

            _context.next = 43;
            return _iterator["return"]();

          case 43:
            _context.prev = 43;

            if (!_didIteratorError) {
              _context.next = 46;
              break;
            }

            throw _iteratorError;

          case 46:
            return _context.finish(43);

          case 47:
            return _context.finish(38);

          case 48:
            _context.next = 50;
            return concatenateArrayBuffers.apply(void 0, chunks);

          case 50:
            return _context.abrupt("return", _context.sent);

          case 51:
            if (!(!isBrowser$1 && writer.encodeURLtoURL)) {
              _context.next = 63;
              break;
            }

            tmpInputFilename = getTemporaryFilename('input');
            _context.next = 55;
            return writeFile(tmpInputFilename, data);

          case 55:
            tmpOutputFilename = getTemporaryFilename('output');
            _context.next = 58;
            return encodeURLtoURL(tmpInputFilename, tmpOutputFilename, writer, options);

          case 58:
            outputFilename = _context.sent;
            _context.next = 61;
            return fetchFile(outputFilename);

          case 61:
            response = _context.sent;
            return _context.abrupt("return", response.arrayBuffer());

          case 63:
            throw new Error('Writer could not encode data');

          case 64:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[17, 34, 38, 48], [39,, 43, 47]]);
  }));
  return _encode.apply(this, arguments);
}

function encodeSync$2(data, writer, options, url) {
  if (writer.encodeSync) {
    return writer.encodeSync(data, options);
  }

  throw new Error('Writer could not synchronously encode data');
}
function encodeText(_x5, _x6, _x7, _x8) {
  return _encodeText.apply(this, arguments);
}

function _encodeText() {
  _encodeText = _asyncToGenerator(regenerator.mark(function _callee2(data, writer, options, url) {
    var arrayBuffer;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(writer.text && writer.encodeText)) {
              _context2.next = 4;
              break;
            }

            _context2.next = 3;
            return writer.encodeText(data, options);

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
            if (!(writer.text && (writer.encode || writer.encodeInBatches))) {
              _context2.next = 9;
              break;
            }

            _context2.next = 7;
            return encode$4(data, writer, options);

          case 7:
            arrayBuffer = _context2.sent;
            return _context2.abrupt("return", new TextDecoder().decode(arrayBuffer));

          case 9:
            throw new Error('Writer could not encode data as text');

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _encodeText.apply(this, arguments);
}

function encodeInBatches(data, writer, options, url) {
  if (writer.encodeInBatches) {
    var dataIterator = getIterator(data);
    return writer.encodeInBatches(dataIterator, options);
  }

  throw new Error('Writer could not encode data in batches');
}

function getIterator(data) {
  var dataIterator = [{
    table: data,
    start: 0,
    end: data.length
  }];
  return dataIterator;
}

function encodeURLtoURL(_x9, _x10, _x11, _x12) {
  return _encodeURLtoURL.apply(this, arguments);
}

function _encodeURLtoURL() {
  _encodeURLtoURL = _asyncToGenerator(regenerator.mark(function _callee3(inputUrl, outputUrl, writer, options) {
    var outputFilename;
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            inputUrl = resolvePath(inputUrl);
            outputUrl = resolvePath(outputUrl);

            if (!(isBrowser$1 || !writer.encodeURLtoURL)) {
              _context3.next = 4;
              break;
            }

            throw new Error();

          case 4:
            _context3.next = 6;
            return writer.encodeURLtoURL(inputUrl, outputUrl, options);

          case 6:
            outputFilename = _context3.sent;
            return _context3.abrupt("return", outputFilename);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _encodeURLtoURL.apply(this, arguments);
}

function save(data, url, writer, options) {
  var encodedData = encode$4(data, writer, options, url);
  return writeFile(url, encodedData);
}
function saveSync(data, url, writer, options) {
  var encodedData = encodeSync$2(data, writer, options);
  return writeFileSync(url, encodedData);
}

var VERSION$4 = "2.3.13" ;
var NullLoader = {
  id: 'image',
  name: 'Images',
  version: VERSION$4,
  mimeTypes: ['application/x.empty'],
  extensions: ['null'],
  parse: function () {
    var _parse = _asyncToGenerator(regenerator.mark(function _callee(arrayBuffer, options) {
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", arrayBuffer);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function parse(_x, _x2) {
      return _parse.apply(this, arguments);
    }

    return parse;
  }(),
  parseSync: function parseSync(arrayBuffer, options) {
    return arrayBuffer;
  },
  parseInBatches: function () {
    var _parseInBatches2 = _asyncToGenerator(regenerator.mark(function _callee3(asyncIterator, options) {
      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", function () {
                var _parseInBatches = _wrapAsyncGenerator(regenerator.mark(function _callee2() {
                  return regenerator.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          return _context2.delegateYield(_asyncGeneratorDelegate(_asyncIterator(asyncIterator), _awaitAsyncGenerator), "t0", 1);

                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                function parseInBatches() {
                  return _parseInBatches.apply(this, arguments);
                }

                return parseInBatches;
              }()());

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function parseInBatches(_x3, _x4) {
      return _parseInBatches2.apply(this, arguments);
    }

    return parseInBatches;
  }(),
  tests: [function () {
    return false;
  }],
  options: {}
};

function fetchProgress(_x, _x2) {
  return _fetchProgress.apply(this, arguments);
}

function _fetchProgress() {
  _fetchProgress = _asyncToGenerator(regenerator.mark(function _callee(response, onProgress) {
    var onDone,
        onError,
        body,
        contentLength,
        totalBytes,
        progressStream,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            onDone = _args.length > 2 && _args[2] !== undefined ? _args[2] : function () {};
            onError = _args.length > 3 && _args[3] !== undefined ? _args[3] : function () {};
            _context.next = 4;
            return response;

          case 4:
            response = _context.sent;

            if (response.ok) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", response);

          case 7:
            body = response.body;

            if (body) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", response);

          case 10:
            contentLength = response.headers.get('content-length');
            totalBytes = contentLength && parseInt(contentLength, 10);

            if (contentLength > 0) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", response);

          case 14:
            if (!(typeof ReadableStream === 'undefined' || !body.getReader)) {
              _context.next = 16;
              break;
            }

            return _context.abrupt("return", response);

          case 16:
            progressStream = new ReadableStream({
              start: function start(controller) {
                var reader = body.getReader();
                read(controller, reader, 0, totalBytes, onProgress, onDone, onError);
              }
            });
            return _context.abrupt("return", new Response(progressStream));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchProgress.apply(this, arguments);
}

function read(_x3, _x4, _x5, _x6, _x7, _x8, _x9) {
  return _read.apply(this, arguments);
}

function _read() {
  _read = _asyncToGenerator(regenerator.mark(function _callee2(controller, reader, loadedBytes, totalBytes, onProgress, onDone, onError) {
    var _yield$reader$read, done, value, percent;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return reader.read();

          case 3:
            _yield$reader$read = _context2.sent;
            done = _yield$reader$read.done;
            value = _yield$reader$read.value;

            if (!done) {
              _context2.next = 10;
              break;
            }

            onDone();
            controller.close();
            return _context2.abrupt("return");

          case 10:
            loadedBytes += value.byteLength;
            percent = Math.round(loadedBytes / totalBytes * 100);
            onProgress(percent, {
              loadedBytes: loadedBytes,
              totalBytes: totalBytes
            });
            controller.enqueue(value);
            _context2.next = 16;
            return read(controller, reader, loadedBytes, totalBytes, onProgress, onDone, onError);

          case 16:
            _context2.next = 22;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            controller.error(_context2.t0);
            onError(_context2.t0);

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 18]]);
  }));
  return _read.apply(this, arguments);
}

var BrowserFileSystem = function () {
  function BrowserFileSystem(files) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck$1(this, BrowserFileSystem);

    this._fetch = options.fetch || fetch;
    this.files = {};

    for (var i = 0; i < files.length; ++i) {
      var file = files[i];
      this.files[file.name] = file;
    }

    this.fetch = this.fetch.bind(this);
  }

  _createClass$1(BrowserFileSystem, [{
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator(regenerator.mark(function _callee(path) {
        var options,
            fallbackFetch,
            file,
            response,
            _args = arguments;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

                if (!path.includes('://')) {
                  _context.next = 4;
                  break;
                }

                fallbackFetch = options.fetch || this._fetch;
                return _context.abrupt("return", fallbackFetch(path, options));

              case 4:
                file = this.files[path];

                if (!file) {
                  _context.next = 9;
                  break;
                }

                response = new Response(this.files[path]);
                Object.defineProperty(response, 'url', {
                  value: path
                });
                return _context.abrupt("return", response);

              case 9:
                return _context.abrupt("return", new Response(path, {
                  status: 400,
                  statusText: 'NOT FOUND'
                }));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetch(_x) {
        return _fetch.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: "readdir",
    value: function () {
      var _readdir = _asyncToGenerator(regenerator.mark(function _callee2() {
        var files, path;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                files = [];

                for (path in this.files) {
                  files.push(path);
                }

                return _context2.abrupt("return", files);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function readdir() {
        return _readdir.apply(this, arguments);
      }

      return readdir;
    }()
  }, {
    key: "stat",
    value: function () {
      var _stat = _asyncToGenerator(regenerator.mark(function _callee3(path, options) {
        var file;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                file = this.files[path];

                if (file) {
                  _context3.next = 3;
                  break;
                }

                throw new Error("No such file: ".concat(path));

              case 3:
                return _context3.abrupt("return", {
                  size: file.size
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function stat(_x2, _x3) {
        return _stat.apply(this, arguments);
      }

      return stat;
    }()
  }, {
    key: "unlink",
    value: function () {
      var _unlink = _asyncToGenerator(regenerator.mark(function _callee4(pathname) {
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                delete this.files[pathname];

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function unlink(_x4) {
        return _unlink.apply(this, arguments);
      }

      return unlink;
    }()
  }, {
    key: "open",
    value: function () {
      var _open = _asyncToGenerator(regenerator.mark(function _callee5(pathname) {
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.files[pathname]);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function open(_x5) {
        return _open.apply(this, arguments);
      }

      return open;
    }()
  }, {
    key: "read",
    value: function () {
      var _read = _asyncToGenerator(regenerator.mark(function _callee6(fd, _ref) {
        var _ref$buffer, buffer, _ref$length, length, _ref$position, position, file, arrayBuffer;

        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _ref$buffer = _ref.buffer, buffer = _ref$buffer === void 0 ? null : _ref$buffer, _ref.offset, _ref$length = _ref.length, length = _ref$length === void 0 ? buffer.byteLength : _ref$length, _ref$position = _ref.position, position = _ref$position === void 0 ? null : _ref$position;
                file = fd;
                _context6.next = 4;
                return readFileSlice(file, position, position + length);

              case 4:
                arrayBuffer = _context6.sent;
                return _context6.abrupt("return", arrayBuffer);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function read(_x6, _x7) {
        return _read.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "close",
    value: function () {
      var _close = _asyncToGenerator(regenerator.mark(function _callee7(fd) {
        return regenerator.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function close(_x8) {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }]);

  return BrowserFileSystem;
}();

function readFileSlice(_x9, _x10, _x11) {
  return _readFileSlice.apply(this, arguments);
}

function _readFileSlice() {
  _readFileSlice = _asyncToGenerator(regenerator.mark(function _callee8(file, start, end) {
    var slice;
    return regenerator.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            slice = file.slice(start, end);
            _context8.next = 3;
            return new Promise(function (resolve, reject) {
              var fileReader = new FileReader();

              fileReader.onload = function (event) {
                return resolve(event.target && event.target.result);
              };

              fileReader.onerror = function (error) {
                return reject(error);
              };

              fileReader.readAsArrayBuffer(slice);
            });

          case 3:
            return _context8.abrupt("return", _context8.sent);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _readFileSlice.apply(this, arguments);
}

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  fetchFile: fetchFile,
  readFileSync: readFileSync,
  writeFile: writeFile,
  writeFileSync: writeFileSync,
  setLoaderOptions: setLoaderOptions,
  registerLoaders: registerLoaders,
  parse: parse$2,
  parseSync: parseSync$1,
  parseInBatches: parseInBatches,
  selectLoader: selectLoader,
  selectLoaderSync: selectLoaderSync,
  load: load,
  loadInBatches: loadInBatches,
  encode: encode$4,
  encodeSync: encodeSync$2,
  encodeInBatches: encodeInBatches,
  encodeText: encodeText,
  encodeURLtoURL: encodeURLtoURL,
  save: save,
  saveSync: saveSync,
  makeIterator: makeIterator,
  NullLoader: NullLoader,
  setPathPrefix: setPathPrefix,
  getPathPrefix: getPathPrefix,
  resolvePath: resolvePath,
  RequestScheduler: RequestScheduler,
  _fetchProgress: fetchProgress,
  _BrowserFileSystem: BrowserFileSystem,
  _unregisterLoaders: _unregisterLoaders,
  isBrowser: isBrowser$1,
  isWorker: isWorker,
  self: self_,
  window: window_,
  global: global_$1,
  document: document_,
  assert: assert$2,
  forEach: forEach,
  concatenateChunksAsync: concatenateChunksAsync,
  makeTextDecoderIterator: makeTextDecoderIterator,
  makeTextEncoderIterator: makeTextEncoderIterator,
  makeLineIterator: makeLineIterator,
  makeNumberedLineIterator: makeNumberedLineIterator,
  isPromise: isPromise,
  isIterable: isIterable,
  isAsyncIterable: isAsyncIterable,
  isIterator: isIterator,
  isResponse: isResponse,
  isReadableStream: isReadableStream,
  isWritableStream: isWritableStream
});

var KHR_BINARY_GLTF = 'KHR_binary_glTF';
var KHR_DRACO_MESH_COMPRESSION = 'KHR_draco_mesh_compression';
var KHR_LIGHTS_PUNCTUAL = 'KHR_lights_punctual';
var KHR_MATERIALS_UNLIT = 'KHR_materials_unlit';
var KHR_TECHNIQUES_WEBGL = 'KHR_techniques_webgl';
var UBER_POINT_CLOUD_EXTENSION = 'UBER_draco_point_cloud_compression';

function assert$1(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

var globals = {
  self: typeof self !== 'undefined' && self,
  window: typeof window !== 'undefined' && window,
  global: typeof global !== 'undefined' && global,
  document: typeof document !== 'undefined' && document
};
var global_ = globals.global || globals.self || globals.window;
var isBrowser = (typeof process === "undefined" ? "undefined" : _typeof(process)) !== 'object' || String(process) !== '[object process]' || process.browser;
var matches = typeof process !== 'undefined' && process.version && process.version.match(/v([0-9]*)/);
matches && parseFloat(matches[1]) || 0;

var _parseImageNode = global_._parseImageNode;
var IMAGE_SUPPORTED = typeof Image !== 'undefined';
var IMAGE_BITMAP_SUPPORTED = typeof ImageBitmap !== 'undefined';
var NODE_IMAGE_SUPPORTED = Boolean(_parseImageNode);
var DATA_SUPPORTED = isBrowser ? true : NODE_IMAGE_SUPPORTED;
function isImageTypeSupported(type) {
  switch (type) {
    case 'auto':
      return IMAGE_BITMAP_SUPPORTED || IMAGE_SUPPORTED || DATA_SUPPORTED;

    case 'imagebitmap':
      return IMAGE_BITMAP_SUPPORTED;

    case 'image':
      return IMAGE_SUPPORTED;

    case 'data':
      return DATA_SUPPORTED;

    case 'html':
      return IMAGE_SUPPORTED;

    case 'ndarray':
      return DATA_SUPPORTED;

    default:
      throw new Error("@loaders.gl/images: image ".concat(type, " not supported in this environment"));
  }
}
function getDefaultImageType() {
  if (IMAGE_BITMAP_SUPPORTED) {
    return 'imagebitmap';
  }

  if (IMAGE_SUPPORTED) {
    return 'image';
  }

  if (DATA_SUPPORTED) {
    return 'data';
  }

  throw new Error("Install '@loaders.gl/polyfills' to parse images under Node.js");
}

function isImage(image) {
  return Boolean(getImageTypeOrNull(image));
}
function getImageType(image) {
  var format = getImageTypeOrNull(image);

  if (!format) {
    throw new Error('Not an image');
  }

  return format;
}
function getImageData(image) {
  switch (getImageType(image)) {
    case 'data':
      return image;

    case 'image':
    case 'imagebitmap':
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');

      if (context) {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, image.width, image.height);
      }

    default:
      return assert$1(false);
  }
}

function getImageTypeOrNull(image) {
  if (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) {
    return 'imagebitmap';
  }

  if (typeof Image !== 'undefined' && image instanceof Image) {
    return 'image';
  }

  if (image && _typeof(image) === 'object' && image.data && image.width && image.height) {
    return 'data';
  }

  return null;
}

var SVG_DATA_URL_PATTERN = /^data:image\/svg\+xml/;
var SVG_URL_PATTERN = /\.svg((\?|#).*)?$/;
function isSVG(url) {
  return url && (SVG_DATA_URL_PATTERN.test(url) || SVG_URL_PATTERN.test(url));
}
function getBlobOrSVGDataUrl(arrayBuffer, url) {
  if (isSVG(url)) {
    var textDecoder = new TextDecoder();
    var xmlText = textDecoder.decode(arrayBuffer);
    var src = "data:image/svg+xml;base64,".concat(btoa(xmlText));
    return src;
  }

  return getBlob(arrayBuffer, url);
}
function getBlob(arrayBuffer, url) {
  if (isSVG(url)) {
    throw new Error('SVG cannot be parsed directly to imagebitmap');
  }

  return new Blob([new Uint8Array(arrayBuffer)]);
}

function parseToImage(_x, _x2, _x3) {
  return _parseToImage.apply(this, arguments);
}

function _parseToImage() {
  _parseToImage = _asyncToGenerator(regenerator.mark(function _callee(arrayBuffer, options, url) {
    var blobOrDataUrl, URL, objectUrl;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            blobOrDataUrl = getBlobOrSVGDataUrl(arrayBuffer, url);
            URL = self.URL || self.webkitURL;
            objectUrl = typeof blobOrDataUrl !== 'string' && URL.createObjectURL(blobOrDataUrl);
            _context.prev = 3;
            _context.next = 6;
            return loadToImage(objectUrl || blobOrDataUrl, options);

          case 6:
            return _context.abrupt("return", _context.sent);

          case 7:
            _context.prev = 7;

            if (objectUrl) {
              URL.revokeObjectURL(objectUrl);
            }

            return _context.finish(7);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3,, 7, 10]]);
  }));
  return _parseToImage.apply(this, arguments);
}

function loadToImage(_x4, _x5) {
  return _loadToImage.apply(this, arguments);
}

function _loadToImage() {
  _loadToImage = _asyncToGenerator(regenerator.mark(function _callee2(url, options) {
    var image;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            image = new Image();
            image.src = url;

            if (!(options.image && options.image.decode && image.decode)) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return image.decode();

          case 5:
            return _context2.abrupt("return", image);

          case 6:
            _context2.next = 8;
            return new Promise(function (resolve, reject) {
              try {
                image.onload = function () {
                  return resolve(image);
                };

                image.onerror = function (err) {
                  return reject(new Error("Could not load image ".concat(url, ": ").concat(err)));
                };
              } catch (error) {
                reject(error);
              }
            });

          case 8:
            return _context2.abrupt("return", _context2.sent);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadToImage.apply(this, arguments);
}

var EMPTY_OBJECT = {};
var imagebitmapOptionsSupported = true;
function parseToImageBitmap(_x, _x2, _x3) {
  return _parseToImageBitmap.apply(this, arguments);
}

function _parseToImageBitmap() {
  _parseToImageBitmap = _asyncToGenerator(regenerator.mark(function _callee(arrayBuffer, options, url) {
    var blob, image, imagebitmapOptions;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!isSVG(url)) {
              _context.next = 7;
              break;
            }

            _context.next = 3;
            return parseToImage(arrayBuffer, options, url);

          case 3:
            image = _context.sent;
            blob = image;
            _context.next = 8;
            break;

          case 7:
            blob = getBlob(arrayBuffer, url);

          case 8:
            imagebitmapOptions = options && options.imagebitmap;
            _context.next = 11;
            return safeCreateImageBitmap(blob, imagebitmapOptions);

          case 11:
            return _context.abrupt("return", _context.sent);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseToImageBitmap.apply(this, arguments);
}

function safeCreateImageBitmap(_x4) {
  return _safeCreateImageBitmap.apply(this, arguments);
}

function _safeCreateImageBitmap() {
  _safeCreateImageBitmap = _asyncToGenerator(regenerator.mark(function _callee2(blob) {
    var imagebitmapOptions,
        _args2 = arguments;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            imagebitmapOptions = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;

            if (isEmptyObject(imagebitmapOptions) || !imagebitmapOptionsSupported) {
              imagebitmapOptions = null;
            }

            if (!imagebitmapOptions) {
              _context2.next = 13;
              break;
            }

            _context2.prev = 3;
            _context2.next = 6;
            return createImageBitmap(blob, imagebitmapOptions);

          case 6:
            return _context2.abrupt("return", _context2.sent);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](3);
            console.warn(_context2.t0);
            imagebitmapOptionsSupported = false;

          case 13:
            _context2.next = 15;
            return createImageBitmap(blob);

          case 15:
            return _context2.abrupt("return", _context2.sent);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 9]]);
  }));
  return _safeCreateImageBitmap.apply(this, arguments);
}

function isEmptyObject(object) {
  for (var key in object || EMPTY_OBJECT) {
    return false;
  }

  return true;
}

var BIG_ENDIAN = false;
var LITTLE_ENDIAN = true;
function getBinaryImageMetadata(binaryData) {
  var dataView = toDataView(binaryData);
  return getPngMetadata(dataView) || getJpegMetadata(dataView) || getGifMetadata(dataView) || getBmpMetadata(dataView);
}

function getPngMetadata(binaryData) {
  var dataView = toDataView(binaryData);
  var isPng = dataView.byteLength >= 24 && dataView.getUint32(0, BIG_ENDIAN) === 0x89504e47;

  if (!isPng) {
    return null;
  }

  return {
    mimeType: 'image/png',
    width: dataView.getUint32(16, BIG_ENDIAN),
    height: dataView.getUint32(20, BIG_ENDIAN)
  };
}

function getGifMetadata(binaryData) {
  var dataView = toDataView(binaryData);
  var isGif = dataView.byteLength >= 10 && dataView.getUint32(0, BIG_ENDIAN) === 0x47494638;

  if (!isGif) {
    return null;
  }

  return {
    mimeType: 'image/gif',
    width: dataView.getUint16(6, LITTLE_ENDIAN),
    height: dataView.getUint16(8, LITTLE_ENDIAN)
  };
}

function getBmpMetadata(binaryData) {
  var dataView = toDataView(binaryData);
  var isBmp = dataView.byteLength >= 14 && dataView.getUint16(0, BIG_ENDIAN) === 0x424d && dataView.getUint32(2, LITTLE_ENDIAN) === dataView.byteLength;

  if (!isBmp) {
    return null;
  }

  return {
    mimeType: 'image/bmp',
    width: dataView.getUint32(18, LITTLE_ENDIAN),
    height: dataView.getUint32(22, LITTLE_ENDIAN)
  };
}

function getJpegMetadata(binaryData) {
  var dataView = toDataView(binaryData);
  var isJpeg = dataView.byteLength >= 3 && dataView.getUint16(0, BIG_ENDIAN) === 0xffd8 && dataView.getUint8(2) === 0xff;

  if (!isJpeg) {
    return null;
  }

  var _getJpegMarkers = getJpegMarkers(),
      tableMarkers = _getJpegMarkers.tableMarkers,
      sofMarkers = _getJpegMarkers.sofMarkers;

  var i = 2;

  while (i + 9 < dataView.byteLength) {
    var marker = dataView.getUint16(i, BIG_ENDIAN);

    if (sofMarkers.has(marker)) {
      return {
        mimeType: 'image/jpeg',
        height: dataView.getUint16(i + 5, BIG_ENDIAN),
        width: dataView.getUint16(i + 7, BIG_ENDIAN)
      };
    }

    if (!tableMarkers.has(marker)) {
      return null;
    }

    i += 2;
    i += dataView.getUint16(i, BIG_ENDIAN);
  }

  return null;
}

function getJpegMarkers() {
  var tableMarkers = new Set([0xffdb, 0xffc4, 0xffcc, 0xffdd, 0xfffe]);

  for (var i = 0xffe0; i < 0xfff0; ++i) {
    tableMarkers.add(i);
  }

  var sofMarkers = new Set([0xffc0, 0xffc1, 0xffc2, 0xffc3, 0xffc5, 0xffc6, 0xffc7, 0xffc9, 0xffca, 0xffcb, 0xffcd, 0xffce, 0xffcf, 0xffde]);
  return {
    tableMarkers: tableMarkers,
    sofMarkers: sofMarkers
  };
}

function toDataView(data) {
  if (data instanceof DataView) {
    return data;
  }

  if (ArrayBuffer.isView(data)) {
    return new DataView(data.buffer);
  }

  if (data instanceof ArrayBuffer) {
    return new DataView(data);
  }

  throw new Error('toDataView');
}

function parseToNodeImage(arrayBuffer, options) {
  var _ref = getBinaryImageMetadata(arrayBuffer) || {},
      mimeType = _ref.mimeType;

  var _parseImageNode = global_._parseImageNode;
  assert$1(_parseImageNode);
  return _parseImageNode(arrayBuffer, mimeType, options);
}

function parseImage(_x, _x2, _x3) {
  return _parseImage.apply(this, arguments);
}

function _parseImage() {
  _parseImage = _asyncToGenerator(regenerator.mark(function _callee(arrayBuffer, options, context) {
    var imageOptions, imageType, _ref, url, loadType, image;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = options || {};
            imageOptions = options.image || {};
            imageType = imageOptions.type || 'auto';
            _ref = context || {}, url = _ref.url;
            loadType = getLoadableImageType(imageType);
            _context.t0 = loadType;
            _context.next = _context.t0 === 'imagebitmap' ? 8 : _context.t0 === 'image' ? 12 : _context.t0 === 'data' ? 16 : 20;
            break;

          case 8:
            _context.next = 10;
            return parseToImageBitmap(arrayBuffer, options, url);

          case 10:
            image = _context.sent;
            return _context.abrupt("break", 21);

          case 12:
            _context.next = 14;
            return parseToImage(arrayBuffer, options, url);

          case 14:
            image = _context.sent;
            return _context.abrupt("break", 21);

          case 16:
            _context.next = 18;
            return parseToNodeImage(arrayBuffer, options);

          case 18:
            image = _context.sent;
            return _context.abrupt("break", 21);

          case 20:
            assert$1(false);

          case 21:
            if (imageType === 'data') {
              image = getImageData(image);
            }

            return _context.abrupt("return", image);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseImage.apply(this, arguments);
}

function getLoadableImageType(type) {
  switch (type) {
    case 'auto':
    case 'data':
      return getDefaultImageType();

    default:
      isImageTypeSupported(type);
      return type;
  }
}

var VERSION$3 = "2.3.13" ;
var EXTENSIONS$1 = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'svg'];
var MIME_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/bmp', 'image/vnd.microsoft.icon', 'image/svg+xml'];
var ImageLoader = {
  id: 'image',
  name: 'Images',
  version: VERSION$3,
  mimeTypes: MIME_TYPES,
  extensions: EXTENSIONS$1,
  parse: parseImage,
  tests: [function (arrayBuffer) {
    return Boolean(getBinaryImageMetadata(new DataView(arrayBuffer)));
  }],
  options: {
    image: {
      type: 'auto',
      decode: true
    }
  }
};

function getBinaryImageMIMEType(arrayBuffer) {
  var metadata = getBinaryImageMetadata(arrayBuffer);
  return metadata ? metadata.mimeType : null;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'assert failed: gltf');
  }
}

function resolveUrl(url, options) {
  var absolute = url.startsWith('data:') || url.startsWith('http:') || url.startsWith('https:');

  if (absolute) {
    return url;
  }

  var baseUrl = options.baseUri || options.uri;

  if (!baseUrl) {
    throw new Error("'baseUri' must be provided to resolve relative url ".concat(url));
  }

  return baseUrl.substr(0, baseUrl.lastIndexOf('/') + 1) + url;
}

function getTypedArrayForBufferView(json, buffers, bufferViewIndex) {
  var bufferView = json.bufferViews[bufferViewIndex];
  assert(bufferView);
  var bufferIndex = bufferView.buffer;
  var binChunk = buffers[bufferIndex];
  assert(binChunk);
  var byteOffset = (bufferView.byteOffset || 0) + binChunk.byteOffset;
  return new Uint8Array(binChunk.arrayBuffer, byteOffset, bufferView.byteLength);
}

function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit$1(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$b(arr, i) || _nonIterableRest$1();
}

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var loadDecoderPromise;
function loadDracoDecoderModule(_x) {
  return _loadDracoDecoderModule.apply(this, arguments);
}

function _loadDracoDecoderModule() {
  _loadDracoDecoderModule = _asyncToGenerator(regenerator.mark(function _callee(options) {
    var modules;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            modules = options.modules || {};

            if (modules.draco3d) {
              loadDecoderPromise = loadDecoderPromise || new Promise(function (resolve) {
                var draco = modules.draco3d.createDecoderModule({
                  onModuleLoaded: function onModuleLoaded() {
                    resolve({
                      draco: draco
                    });
                  }
                });
              });
            } else {
              loadDecoderPromise = loadDecoderPromise || loadDracoDecoder(options);
            }

            _context.next = 4;
            return loadDecoderPromise;

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadDracoDecoderModule.apply(this, arguments);
}

function loadDracoDecoder(_x3) {
  return _loadDracoDecoder.apply(this, arguments);
}

function _loadDracoDecoder() {
  _loadDracoDecoder = _asyncToGenerator(regenerator.mark(function _callee3(options) {
    var DracoDecoderModule, wasmBinary, _yield$Promise$all, _yield$Promise$all2;

    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = options.draco && options.draco.decoderType;
            _context3.next = _context3.t0 === 'js' ? 3 : _context3.t0 === 'wasm' ? 7 : 7;
            break;

          case 3:
            _context3.next = 5;
            return loadLibrary('draco_decoder.js', 'draco', options);

          case 5:
            DracoDecoderModule = _context3.sent;
            return _context3.abrupt("break", 21);

          case 7:
            _context3.t1 = Promise;
            _context3.next = 10;
            return loadLibrary('draco_wasm_wrapper.js', 'draco', options);

          case 10:
            _context3.t2 = _context3.sent;
            _context3.next = 13;
            return loadLibrary('draco_decoder.wasm', 'draco', options);

          case 13:
            _context3.t3 = _context3.sent;
            _context3.t4 = [_context3.t2, _context3.t3];
            _context3.next = 17;
            return _context3.t1.all.call(_context3.t1, _context3.t4);

          case 17:
            _yield$Promise$all = _context3.sent;
            _yield$Promise$all2 = _slicedToArray$1(_yield$Promise$all, 2);
            DracoDecoderModule = _yield$Promise$all2[0];
            wasmBinary = _yield$Promise$all2[1];

          case 21:
            DracoDecoderModule = DracoDecoderModule || global_$1.DracoDecoderModule;
            _context3.next = 24;
            return initializeDracoDecoder(DracoDecoderModule, wasmBinary);

          case 24:
            return _context3.abrupt("return", _context3.sent);

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _loadDracoDecoder.apply(this, arguments);
}

function initializeDracoDecoder(DracoDecoderModule, wasmBinary) {
  var options = {};

  if (wasmBinary) {
    options.wasmBinary = wasmBinary;
  }

  return new Promise(function (resolve) {
    DracoDecoderModule(_objectSpread$5(_objectSpread$5({}, options), {}, {
      onModuleLoaded: function onModuleLoaded(draco) {
        return resolve({
          draco: draco
        });
      }
    }));
  });
}

var GEOMETRY_TYPE = {
  TRIANGULAR_MESH: 0,
  POINT_CLOUD: 1
};
var DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP = {
  POSITION: 'POSITION',
  NORMAL: 'NORMAL',
  COLOR: 'COLOR_0',
  TEX_COORD: 'TEXCOORD_0'
};
var DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP = {
  1: Int8Array,
  2: Uint8Array,
  3: Int16Array,
  4: Uint16Array,
  5: Int32Array,
  6: Uint32Array,
  9: Float32Array
};

var DracoParser = function () {
  function DracoParser(draco) {
    _classCallCheck$1(this, DracoParser);

    this.draco = draco;
    this.drawMode = 'TRIANGLE';
    this.metadataQuerier = {};
  }

  _createClass$1(DracoParser, [{
    key: "destroy",
    value: function destroy() {}
  }, {
    key: "destroyGeometry",
    value: function destroyGeometry(dracoGeometry) {
      if (dracoGeometry) {
        this.draco.destroy(dracoGeometry.dracoGeometry);
      }
    }
  }, {
    key: "parseSync",
    value: function parseSync(arrayBuffer) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.metadataQuerier = new this.draco.MetadataQuerier();
      var buffer = new this.draco.DecoderBuffer();
      buffer.Init(new Int8Array(arrayBuffer), arrayBuffer.byteLength);
      var decoder = new this.draco.Decoder();
      var data = {};
      var dracoStatus;
      var dracoGeometry;
      var header;

      try {
        var geometryType = decoder.GetEncodedGeometryType(buffer);

        switch (geometryType) {
          case this.draco.TRIANGULAR_MESH:
            dracoGeometry = new this.draco.Mesh();
            dracoStatus = decoder.DecodeBufferToMesh(buffer, dracoGeometry);
            header = {
              type: GEOMETRY_TYPE.TRIANGULAR_MESH,
              faceCount: dracoGeometry.num_faces(),
              attributeCount: dracoGeometry.num_attributes(),
              vertexCount: dracoGeometry.num_points()
            };
            break;

          case this.draco.POINT_CLOUD:
            dracoGeometry = new this.draco.PointCloud();
            dracoStatus = decoder.DecodeBufferToPointCloud(buffer, dracoGeometry);
            header = {
              type: GEOMETRY_TYPE.POINT_CLOUD,
              attributeCount: dracoGeometry.num_attributes(),
              vertexCount: dracoGeometry.num_points()
            };
            break;

          default:
            throw new Error('Unknown DRACO geometry type.');
        }

        if (!dracoStatus.ok() || !dracoGeometry.ptr) {
          var message = "DRACO decompression failed: ".concat(dracoStatus.error_msg());

          if (dracoGeometry) {
            this.draco.destroy(dracoGeometry);
          }

          throw new Error(message);
        }

        data.loaderData = {
          header: header
        };

        this._extractDRACOGeometry(decoder, dracoGeometry, geometryType, data, options);

        var metadata = this._getGeometryMetadata(decoder, dracoGeometry);

        data.header = {
          vertexCount: header.vertexCount,
          boundingBox: getMeshBoundingBox(data.attributes),
          metadata: metadata
        };
      } finally {
        this.draco.destroy(decoder);
        this.draco.destroy(buffer);
        this.draco.destroy(dracoGeometry);
        this.draco.destroy(this.metadataQuerier);
      }

      return data;
    }
  }, {
    key: "_extractDRACOGeometry",
    value: function _extractDRACOGeometry(decoder, dracoGeometry, geometryType, geometry, options) {
      var attributes = this._getAttributes(decoder, dracoGeometry, options);

      var positionAttribute = attributes.POSITION;

      if (!positionAttribute) {
        throw new Error('DRACO decompressor: No position attribute found.');
      }

      if (geometryType === this.draco.TRIANGULAR_MESH) {
        attributes.indices = this.drawMode === 'TRIANGLE_STRIP' ? this._getMeshStripIndices(decoder, dracoGeometry) : this._getMeshFaceIndices(decoder, dracoGeometry);
        geometry.mode = this.drawMode === 'TRIANGLE_STRIP' ? 5 : 4;
      } else {
        geometry.mode = 0;
      }

      if (attributes.indices) {
        geometry.indices = {
          value: attributes.indices,
          size: 1
        };
        delete attributes.indices;
      }

      geometry.attributes = attributes;
      return geometry;
    }
  }, {
    key: "getPositionAttributeMetadata",
    value: function getPositionAttributeMetadata(positionAttribute) {
      this.metadata = this.metadata || {};
      this.metadata.attributes = this.metadata.attributes || {};
      var posTransform = new this.draco.AttributeQuantizationTransform();

      if (posTransform.InitFromAttribute(positionAttribute)) {
        this.metadata.attributes.position.isQuantized = true;
        this.metadata.attributes.position.maxRange = posTransform.range();
        this.metadata.attributes.position.numQuantizationBits = posTransform.quantization_bits();
        this.metadata.attributes.position.minValues = new Float32Array(3);

        for (var i = 0; i < 3; ++i) {
          this.metadata.attributes.position.minValues[i] = posTransform.min_value(i);
        }
      }

      this.draco.destroy(posTransform);
    }
  }, {
    key: "_getAttributes",
    value: function _getAttributes(decoder, dracoGeometry, options) {
      var attributes = {};
      var numPoints = dracoGeometry.num_points();

      for (var attributeId = 0; attributeId < dracoGeometry.num_attributes(); attributeId++) {
        var dracoAttribute = decoder.GetAttribute(dracoGeometry, attributeId);

        var attributeMetadata = this._getAttributeMetadata(decoder, dracoGeometry, attributeId);

        var attributeData = {
          uniqueId: dracoAttribute.unique_id(),
          attributeType: dracoAttribute.attribute_type(),
          dataType: DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP[dracoAttribute.data_type()],
          size: dracoAttribute.size(),
          numComponents: dracoAttribute.num_components(),
          byteOffset: dracoAttribute.byte_offset(),
          byteStride: dracoAttribute.byte_stride(),
          normalized: dracoAttribute.normalized(),
          metadata: attributeMetadata
        };

        var attributeName = this._deduceAttributeName(attributeData, options);

        var _this$_getAttributeTy = this._getAttributeTypedArray(decoder, dracoGeometry, dracoAttribute, attributeName),
            typedArray = _this$_getAttributeTy.typedArray;

        attributes[attributeName] = {
          value: typedArray,
          size: typedArray.length / numPoints,
          metadata: attributeMetadata
        };
      }

      return attributes;
    }
  }, {
    key: "_getMeshFaceIndices",
    value: function _getMeshFaceIndices(decoder, dracoGeometry) {
      var numFaces = dracoGeometry.num_faces();
      var numIndices = numFaces * 3;
      var indices = new Uint32Array(numIndices);
      var dracoArray = new this.draco.DracoInt32Array();

      for (var i = 0; i < numFaces; ++i) {
        decoder.GetFaceFromMesh(dracoGeometry, i, dracoArray);
        var index = i * 3;
        indices[index] = dracoArray.GetValue(0);
        indices[index + 1] = dracoArray.GetValue(1);
        indices[index + 2] = dracoArray.GetValue(2);
      }

      this.draco.destroy(dracoArray);
      return indices;
    }
  }, {
    key: "_getMeshStripIndices",
    value: function _getMeshStripIndices(decoder, dracoGeometry) {
      var dracoArray = new this.draco.DracoInt32Array();
      decoder.GetTriangleStripsFromMesh(dracoGeometry, dracoArray);
      var indices = new Uint32Array(dracoArray.size());

      for (var i = 0; i < dracoArray.size(); ++i) {
        indices[i] = dracoArray.GetValue(i);
      }

      this.draco.destroy(dracoArray);
      return indices;
    }
  }, {
    key: "_getAttributeTypedArray",
    value: function _getAttributeTypedArray(decoder, dracoGeometry, dracoAttribute, attributeName) {
      if (dracoAttribute.ptr === 0) {
        var message = "DRACO decode bad attribute ".concat(attributeName);
        throw new Error(message);
      }

      var attributeType = DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP[dracoAttribute.data_type()];
      var numComponents = dracoAttribute.num_components();
      var numPoints = dracoGeometry.num_points();
      var numValues = numPoints * numComponents;
      var dracoArray;
      var typedArray;

      switch (attributeType) {
        case Float32Array:
          dracoArray = new this.draco.DracoFloat32Array();
          decoder.GetAttributeFloatForAllPoints(dracoGeometry, dracoAttribute, dracoArray);
          typedArray = new Float32Array(numValues);
          break;

        case Int8Array:
          dracoArray = new this.draco.DracoInt8Array();
          decoder.GetAttributeInt8ForAllPoints(dracoGeometry, dracoAttribute, dracoArray);
          typedArray = new Int8Array(numValues);
          break;

        case Int16Array:
          dracoArray = new this.draco.DracoInt16Array();
          decoder.GetAttributeInt16ForAllPoints(dracoGeometry, dracoAttribute, dracoArray);
          typedArray = new Int16Array(numValues);
          break;

        case Int32Array:
          dracoArray = new this.draco.DracoInt32Array();
          decoder.GetAttributeInt32ForAllPoints(dracoGeometry, dracoAttribute, dracoArray);
          typedArray = new Int32Array(numValues);
          break;

        case Uint8Array:
          dracoArray = new this.draco.DracoUInt8Array();
          decoder.GetAttributeUInt8ForAllPoints(dracoGeometry, dracoAttribute, dracoArray);
          typedArray = new Uint8Array(numValues);
          break;

        case Uint16Array:
          dracoArray = new this.draco.DracoUInt16Array();
          decoder.GetAttributeUInt16ForAllPoints(dracoGeometry, dracoAttribute, dracoArray);
          typedArray = new Uint16Array(numValues);
          break;

        case Uint32Array:
          dracoArray = new this.draco.DracoUInt32Array();
          decoder.GetAttributeUInt32ForAllPoints(dracoGeometry, dracoAttribute, dracoArray);
          typedArray = new Uint32Array(numValues);
          break;

        default:
          var errorMsg = 'DRACO decoder: unexpected attribute type.';
          throw new Error(errorMsg);
      }

      for (var i = 0; i < numValues; i++) {
        typedArray[i] = dracoArray.GetValue(i);
      }

      this.draco.destroy(dracoArray);
      return {
        typedArray: typedArray,
        components: numComponents
      };
    }
  }, {
    key: "_deduceAttributeName",
    value: function _deduceAttributeName(attributeData, options) {
      var _options$extraAttribu = options.extraAttributes,
          extraAttributes = _options$extraAttribu === void 0 ? {} : _options$extraAttribu;

      if (extraAttributes && _typeof(extraAttributes) === 'object') {
        for (var _i = 0, _Object$entries = Object.entries(extraAttributes); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray$1(_Object$entries[_i], 2),
              attributeName = _Object$entries$_i[0],
              attributeUniqueId = _Object$entries$_i[1];

          if (attributeUniqueId === attributeData.uniqueId) {
            return attributeName;
          }
        }
      }

      for (var dracoAttributeConstant in DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP) {
        var attributeType = this.draco[dracoAttributeConstant];

        if (attributeData.attributeType === attributeType) {
          return DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP[dracoAttributeConstant];
        }
      }

      if (attributeData.metadata) {
        var entryName = options.attributeNameEntry || 'name';

        if (attributeData.metadata[entryName]) {
          return attributeData.metadata[entryName].string;
        }
      }

      return "CUSTOM_ATTRIBUTE_".concat(attributeData.uniqueId);
    }
  }, {
    key: "_getGeometryMetadata",
    value: function _getGeometryMetadata(decoder, dracoGeometry) {
      var dracoMetadata = decoder.GetMetadata(dracoGeometry);
      return this._queryDracoMetadata(dracoMetadata);
    }
  }, {
    key: "_getAttributeMetadata",
    value: function _getAttributeMetadata(decoder, dracoGeometry, attributeId) {
      var dracoMetadata = decoder.GetAttributeMetadata(dracoGeometry, attributeId);
      return this._queryDracoMetadata(dracoMetadata);
    }
  }, {
    key: "_queryDracoMetadata",
    value: function _queryDracoMetadata(dracoMetadata) {
      if (!dracoMetadata || !dracoMetadata.ptr) {
        return {};
      }

      var result = {};
      var numEntries = this.metadataQuerier.NumEntries(dracoMetadata);

      for (var entryIndex = 0; entryIndex < numEntries; entryIndex++) {
        var entryName = this.metadataQuerier.GetEntryName(dracoMetadata, entryIndex);
        result[entryName] = {
          "int": this.metadataQuerier.GetIntEntry(dracoMetadata, entryName),
          string: this.metadataQuerier.GetStringEntry(dracoMetadata, entryName),
          "double": this.metadataQuerier.GetDoubleEntry(dracoMetadata, entryName),
          intArray: this.metadataQuerier.GetIntEntryArray(dracoMetadata, entryName)
        };
      }

      return result;
    }
  }, {
    key: "decode",
    value: function decode(arrayBuffer, options) {
      return this.parseSync(arrayBuffer, options);
    }
  }]);

  return DracoParser;
}();

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var VERSION$2 = "2.3.13" ;
var DracoWorkerLoader = {
  id: 'draco',
  name: 'Draco',
  version: VERSION$2,
  extensions: ['drc'],
  mimeTypes: ['application/octet-stream'],
  binary: true,
  tests: ['DRACO'],
  options: {
    draco: {
      decoderType: (typeof WebAssembly === "undefined" ? "undefined" : _typeof(WebAssembly)) === 'object' ? 'wasm' : 'js',
      libraryPath: "libs/",
      workerUrl: "https://unpkg.com/@loaders.gl/draco@".concat(VERSION$2, "/dist/draco-loader.worker.js"),
      localWorkerUrl: "modules/draco/dist/draco-loader.worker.dev.js",
      extraAttributes: {}
    }
  }
};
var DracoLoader = _objectSpread$4(_objectSpread$4({}, DracoWorkerLoader), {}, {
  parse: parse$1
});

function parse$1(_x, _x2, _x3, _x4) {
  return _parse$1.apply(this, arguments);
}

function _parse$1() {
  _parse$1 = _asyncToGenerator(regenerator.mark(function _callee(arrayBuffer, options, context, loader) {
    var _yield$loadDracoDecod, draco, dracoParser;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return loadDracoDecoderModule(options);

          case 2:
            _yield$loadDracoDecod = _context.sent;
            draco = _yield$loadDracoDecod.draco;
            dracoParser = new DracoParser(draco);
            _context.prev = 5;
            return _context.abrupt("return", dracoParser.parseSync(arrayBuffer, _objectSpread$4({
              extraAttributes: options.draco && options.draco.extraAttributes || null
            }, options.parseOptions || {})));

          case 7:
            _context.prev = 7;
            dracoParser.destroy();
            return _context.finish(7);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5,, 7, 10]]);
  }));
  return _parse$1.apply(this, arguments);
}

var TYPES = ['SCALAR', 'VEC2', 'VEC3', 'VEC4'];
var ARRAY_TO_COMPONENT_TYPE = new Map([[Int8Array, 5120], [Uint8Array, 5121], [Int16Array, 5122], [Uint16Array, 5123], [Uint32Array, 5125], [Float32Array, 5126]]);
var ATTRIBUTE_TYPE_TO_COMPONENTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
var ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
};
var ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
function getAccessorTypeFromSize(size) {
  var type = TYPES[size - 1];
  return type || TYPES[0];
}
function getComponentTypeFromArray(typedArray) {
  var componentType = ARRAY_TO_COMPONENT_TYPE.get(typedArray.constructor);

  if (!componentType) {
    throw new Error('Illegal typed array');
  }

  return componentType;
}
function getAccessorArrayTypeAndLength(accessor, bufferView) {
  var ArrayType = ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY[accessor.componentType];
  var components = ATTRIBUTE_TYPE_TO_COMPONENTS[accessor.type];
  var bytesPerComponent = ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE[accessor.componentType];
  var length = accessor.count * components;
  var byteLength = accessor.count * components * bytesPerComponent;
  assert(byteLength >= 0 && byteLength <= bufferView.byteLength);
  return {
    ArrayType: ArrayType,
    length: length,
    byteLength: byteLength
  };
}

var GLTFScenegraph = function () {
  function GLTFScenegraph(gltf) {
    _classCallCheck$1(this, GLTFScenegraph);

    if (gltf instanceof GLTFScenegraph) {
      return gltf;
    }

    if (!gltf) {
      gltf = {
        json: {
          asset: {
            version: '2.0',
            generator: 'loaders.gl'
          },
          buffers: []
        },
        buffers: []
      };
    }

    this.byteLength = 0;
    this.gltf = gltf;
    assert(this.gltf.json);
  }

  _createClass$1(GLTFScenegraph, [{
    key: "getApplicationData",
    value: function getApplicationData(key) {
      var data = this.json[key];
      return data;
    }
  }, {
    key: "getExtraData",
    value: function getExtraData(key) {
      var extras = this.json.extras || {};
      return extras[key];
    }
  }, {
    key: "getExtension",
    value: function getExtension(extensionName) {
      var isExtension = this.getUsedExtensions().find(function (name) {
        return name === extensionName;
      });
      var extensions = this.json.extensions || {};
      return isExtension ? extensions[extensionName] || true : null;
    }
  }, {
    key: "getRequiredExtension",
    value: function getRequiredExtension(extensionName) {
      var isRequired = this.getRequiredExtensions().find(function (name) {
        return name === extensionName;
      });
      return isRequired ? this.getExtension(extensionName) : null;
    }
  }, {
    key: "getRequiredExtensions",
    value: function getRequiredExtensions() {
      return this.json.extensionsRequired || [];
    }
  }, {
    key: "getUsedExtensions",
    value: function getUsedExtensions() {
      return this.json.extensionsUsed || [];
    }
  }, {
    key: "getObjectExtension",
    value: function getObjectExtension(object, extensionName) {
      var extensions = object.extensions || {};
      return extensions[extensionName];
    }
  }, {
    key: "getScene",
    value: function getScene(index) {
      return this.getObject('scenes', index);
    }
  }, {
    key: "getNode",
    value: function getNode(index) {
      return this.getObject('nodes', index);
    }
  }, {
    key: "getSkin",
    value: function getSkin(index) {
      return this.getObject('skins', index);
    }
  }, {
    key: "getMesh",
    value: function getMesh(index) {
      return this.getObject('meshes', index);
    }
  }, {
    key: "getMaterial",
    value: function getMaterial(index) {
      return this.getObject('materials', index);
    }
  }, {
    key: "getAccessor",
    value: function getAccessor(index) {
      return this.getObject('accessors', index);
    }
  }, {
    key: "getCamera",
    value: function getCamera(index) {
      return null;
    }
  }, {
    key: "getTexture",
    value: function getTexture(index) {
      return this.getObject('textures', index);
    }
  }, {
    key: "getSampler",
    value: function getSampler(index) {
      return this.getObject('samplers', index);
    }
  }, {
    key: "getImage",
    value: function getImage(index) {
      return this.getObject('images', index);
    }
  }, {
    key: "getBufferView",
    value: function getBufferView(index) {
      return this.getObject('bufferViews', index);
    }
  }, {
    key: "getBuffer",
    value: function getBuffer(index) {
      return this.getObject('buffers', index);
    }
  }, {
    key: "getObject",
    value: function getObject(array, index) {
      if (_typeof(index) === 'object') {
        return index;
      }

      var object = this.json[array] && this.json[array][index];

      if (!object) {
        throw new Error("glTF file error: Could not find ".concat(array, "[").concat(index, "]"));
      }

      return object;
    }
  }, {
    key: "getTypedArrayForBufferView",
    value: function getTypedArrayForBufferView(bufferView) {
      bufferView = this.getBufferView(bufferView);
      var bufferIndex = bufferView.buffer;
      var binChunk = this.gltf.buffers[bufferIndex];
      assert(binChunk);
      var byteOffset = (bufferView.byteOffset || 0) + binChunk.byteOffset;
      return new Uint8Array(binChunk.arrayBuffer, byteOffset, bufferView.byteLength);
    }
  }, {
    key: "getTypedArrayForAccessor",
    value: function getTypedArrayForAccessor(accessor) {
      accessor = this.getAccessor(accessor);
      var bufferView = this.getBufferView(accessor.bufferView);
      var buffer = this.getBuffer(bufferView.buffer);
      var arrayBuffer = buffer.data;

      var _getAccessorArrayType = getAccessorArrayTypeAndLength(accessor, bufferView),
          ArrayType = _getAccessorArrayType.ArrayType,
          length = _getAccessorArrayType.length;

      var byteOffset = bufferView.byteOffset + accessor.byteOffset;
      return new ArrayType(arrayBuffer, byteOffset, length);
    }
  }, {
    key: "getTypedArrayForImageData",
    value: function getTypedArrayForImageData(image) {
      image = this.getAccessor(image);
      var bufferView = this.getBufferView(image.bufferView);
      var buffer = this.getBuffer(bufferView.buffer);
      var arrayBuffer = buffer.data;
      var byteOffset = bufferView.byteOffset || 0;
      return new Uint8Array(arrayBuffer, byteOffset, bufferView.byteLength);
    }
  }, {
    key: "addApplicationData",
    value: function addApplicationData(key, data) {
      this.json[key] = data;
      return this;
    }
  }, {
    key: "addExtraData",
    value: function addExtraData(key, data) {
      this.json.extras = this.json.extras || {};
      this.json.extras[key] = data;
      return this;
    }
  }, {
    key: "addObjectExtension",
    value: function addObjectExtension(object, extensionName, data) {
      assert(data);
      object.extensions = object.extensions || {};
      object.extensions[extensionName] = data;
      this.registerUsedExtension(extensionName);
      return this;
    }
  }, {
    key: "setObjectExtension",
    value: function setObjectExtension(object, extensionName, data) {
      var extensions = object.extensions || {};
      extensions[extensionName] = data;
    }
  }, {
    key: "removeObjectExtension",
    value: function removeObjectExtension(object, extensionName) {
      var extensions = object.extensions || {};
      var extension = extensions[extensionName];
      delete extensions[extensionName];
      return extension;
    }
  }, {
    key: "addExtension",
    value: function addExtension(extensionName) {
      var extensionData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      assert(extensionData);
      this.json.extensions = this.json.extensions || {};
      this.json.extensions[extensionName] = extensionData;
      this.registerUsedExtension(extensionName);
      return extensionData;
    }
  }, {
    key: "addRequiredExtension",
    value: function addRequiredExtension(extensionName) {
      var extensionData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      assert(extensionData);
      this.addExtension(extensionName, extensionData);
      this.registerRequiredExtension(extensionName);
      return extensionData;
    }
  }, {
    key: "registerUsedExtension",
    value: function registerUsedExtension(extensionName) {
      this.json.extensionsUsed = this.json.extensionsUsed || [];

      if (!this.json.extensionsUsed.find(function (ext) {
        return ext === extensionName;
      })) {
        this.json.extensionsUsed.push(extensionName);
      }
    }
  }, {
    key: "registerRequiredExtension",
    value: function registerRequiredExtension(extensionName) {
      this.registerUsedExtension(extensionName);
      this.json.extensionsRequired = this.json.extensionsRequired || [];

      if (!this.json.extensionsRequired.find(function (ext) {
        return ext === extensionName;
      })) {
        this.json.extensionsRequired.push(extensionName);
      }
    }
  }, {
    key: "removeExtension",
    value: function removeExtension(extensionName) {
      if (this.json.extensionsRequired) {
        this._removeStringFromArray(this.json.extensionsRequired, extensionName);
      }

      if (this.json.extensionsUsed) {
        this._removeStringFromArray(this.json.extensionsUsed, extensionName);
      }

      if (this.json.extensions) {
        delete this.json.extensions[extensionName];
      }
    }
  }, {
    key: "addMesh",
    value: function addMesh(attributes, indices) {
      var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

      var accessors = this._addAttributes(attributes);

      var glTFMesh = {
        primitives: [{
          attributes: accessors,
          indices: indices,
          mode: mode
        }]
      };
      this.json.meshes = this.json.meshes || [];
      this.json.meshes.push(glTFMesh);
      return this.json.meshes.length - 1;
    }
  }, {
    key: "addPointCloud",
    value: function addPointCloud(attributes) {
      var accessorIndices = this._addAttributes(attributes);

      var glTFMesh = {
        primitives: [{
          attributes: accessorIndices,
          mode: 0
        }]
      };
      this.json.meshes = this.json.meshes || [];
      this.json.meshes.push(glTFMesh);
      return this.json.meshes.length - 1;
    }
  }, {
    key: "addImage",
    value: function addImage(imageData, mimeType) {
      mimeType = mimeType || getBinaryImageMIMEType(imageData);
      var bufferViewIndex = this.addBufferView(imageData);
      var glTFImage = {
        bufferView: bufferViewIndex,
        mimeType: mimeType
      };
      this.json.images = this.json.images || [];
      this.json.images.push(glTFImage);
      return this.json.images.length - 1;
    }
  }, {
    key: "addBufferView",
    value: function addBufferView(buffer) {
      var byteLength = buffer.byteLength;
      assert(Number.isFinite(byteLength));
      this.sourceBuffers = this.sourceBuffers || [];
      this.sourceBuffers.push(buffer);
      var glTFBufferView = {
        buffer: 0,
        byteOffset: this.byteLength,
        byteLength: byteLength
      };
      this.byteLength += padTo4Bytes(byteLength);
      this.json.bufferViews = this.json.bufferViews || [];
      this.json.bufferViews.push(glTFBufferView);
      return this.json.bufferViews.length - 1;
    }
  }, {
    key: "addAccessor",
    value: function addAccessor(bufferViewIndex, accessor) {
      var glTFAccessor = {
        bufferView: bufferViewIndex,
        type: getAccessorTypeFromSize(accessor.size),
        componentType: accessor.componentType,
        count: accessor.count
      };
      this.json.accessors = this.json.accessors || [];
      this.json.accessors.push(glTFAccessor);
      return this.json.accessors.length - 1;
    }
  }, {
    key: "addBinaryBuffer",
    value: function addBinaryBuffer(sourceBuffer) {
      var accessor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        size: 3
      };
      var bufferViewIndex = this.addBufferView(sourceBuffer);
      var accessorDefaults = {
        size: accessor.size,
        componentType: getComponentTypeFromArray(sourceBuffer),
        count: Math.round(sourceBuffer.length / accessor.size)
      };
      return this.addAccessor(bufferViewIndex, Object.assign(accessorDefaults, accessor));
    }
  }, {
    key: "createBinaryChunk",
    value: function createBinaryChunk() {
      if (this.arrayBuffer) {
        return;
      }

      var totalByteLength = this.byteLength;
      var arrayBuffer = new ArrayBuffer(totalByteLength);
      var targetArray = new Uint8Array(arrayBuffer);
      var dstByteOffset = 0;

      for (var i = 0; i < this.sourceBuffers.length; i++) {
        var sourceBuffer = this.sourceBuffers[i];
        dstByteOffset = copyToArray(sourceBuffer, targetArray, dstByteOffset);
      }

      this.json.buffers[0].byteLength = totalByteLength;
      this.arrayBuffer = arrayBuffer;
      this.sourceBuffers = [];
    }
  }, {
    key: "_removeStringFromArray",
    value: function _removeStringFromArray(array, string) {
      var found = true;

      while (found) {
        var index = array.indexOf(string);

        if (index > -1) {
          array.splice(index, 1);
        } else {
          found = false;
        }
      }
    }
  }, {
    key: "json",
    get: function get() {
      return this.gltf.json;
    }
  }]);

  return GLTFScenegraph;
}();

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function getGLTFAccessors(attributes) {
  var jsonAccessors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var accessors = {};

  for (var name in attributes) {
    var attribute = attributes[name];

    if (name !== 'indices') {
      var glTFAccessor = getGLTFAccessor(attribute, jsonAccessors[name] || {});
      accessors[name] = glTFAccessor;
    }
  }

  return accessors;
}
function getGLTFAccessor(attribute) {
  var jsonAccessor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _getAccessorData = getAccessorData(attribute),
      buffer = _getAccessorData.buffer,
      size = _getAccessorData.size,
      count = _getAccessorData.count;

  var glTFAccessor = _objectSpread$3(_objectSpread$3({}, jsonAccessor), {}, {
    value: buffer,
    size: size,
    bufferView: null,
    byteOffset: 0,
    count: count,
    type: getAccessorTypeFromSize(size),
    componentType: getComponentTypeFromArray(buffer)
  });

  return glTFAccessor;
}

function getAccessorData(attribute) {
  var buffer = attribute;
  var size = 1;
  var count = 0;

  if (attribute && attribute.value) {
    buffer = attribute.value;
    size = attribute.size || 1;
  }

  if (buffer) {
    if (!ArrayBuffer.isView(buffer)) {
      buffer = toTypedArray(buffer, Float32Array);
    }

    count = buffer.length / size;
  }

  return {
    buffer: buffer,
    size: size,
    count: count
  };
}

function toTypedArray(array, ArrayType) {
  var convertTypedArrays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!array) {
    return null;
  }

  if (Array.isArray(array)) {
    return new ArrayType(array);
  }

  if (convertTypedArrays && !(array instanceof ArrayType)) {
    return new ArrayType(array);
  }

  return array;
}

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked = regenerator.mark(makeMeshPrimitiveIterator);

function _createForOfIteratorHelper$5(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$6(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$6(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }

function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function decode$4(_x, _x2, _x3) {
  return _decode.apply(this, arguments);
}

function _decode() {
  _decode = _asyncToGenerator(regenerator.mark(function _callee(gltfData, options, context) {
    var scenegraph, promises, _iterator4, _step4, primitive;

    return regenerator.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (options.gltf.decompressMeshes) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            scenegraph = new GLTFScenegraph(gltfData);
            promises = [];
            _iterator4 = _createForOfIteratorHelper$5(makeMeshPrimitiveIterator(scenegraph));

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                primitive = _step4.value;

                if (scenegraph.getObjectExtension(primitive, KHR_DRACO_MESH_COMPRESSION)) {
                  promises.push(decompressPrimitive(primitive, scenegraph, options, context));
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }

            _context2.next = 8;
            return Promise.all(promises);

          case 8:
            scenegraph.removeExtension(KHR_DRACO_MESH_COMPRESSION);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }));
  return _decode.apply(this, arguments);
}

function encode$3(gltfData) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var scenegraph = new GLTFScenegraph(gltfData);

  var _iterator = _createForOfIteratorHelper$5(scenegraph.json.meshes || []),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var mesh = _step.value;
      compressMesh(mesh, options);
      scenegraph.addRequiredExtension(KHR_DRACO_MESH_COMPRESSION);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function decompressPrimitive(_x4, _x5, _x6, _x7) {
  return _decompressPrimitive.apply(this, arguments);
}

function _decompressPrimitive() {
  _decompressPrimitive = _asyncToGenerator(regenerator.mark(function _callee2(primitive, scenegraph, options, context) {
    var compressedPrimitive, buffer, bufferCopy, parse, dracoOptions, decodedData, originalAccessors, _i, _arr, _arr$_i, name, index;

    return regenerator.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            compressedPrimitive = scenegraph.getObjectExtension(primitive, KHR_DRACO_MESH_COMPRESSION);
            buffer = scenegraph.getTypedArrayForBufferView(compressedPrimitive.bufferView);
            bufferCopy = getZeroOffsetArrayBuffer(buffer.buffer, buffer.byteOffset);
            parse = context.parse;
            dracoOptions = _objectSpread$2({}, options);
            delete dracoOptions['3d-tiles'];
            _context3.next = 8;
            return parse(bufferCopy, DracoLoader, dracoOptions, context);

          case 8:
            decodedData = _context3.sent;
            originalAccessors = {};

            for (_i = 0, _arr = [].concat(_toConsumableArray$1(Object.entries(primitive.attributes)), [['indices', primitive.indices]]); _i < _arr.length; _i++) {
              _arr$_i = _slicedToArray$1(_arr[_i], 2), name = _arr$_i[0], index = _arr$_i[1];
              originalAccessors[name] = scenegraph.getAccessor(index);
            }

            primitive.attributes = getGLTFAccessors(decodedData.attributes, originalAccessors);

            if (decodedData.indices) {
              primitive.indices = getGLTFAccessor(decodedData.indices, originalAccessors.indices || {});
            }

            checkPrimitive(primitive);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2);
  }));
  return _decompressPrimitive.apply(this, arguments);
}

function compressMesh(attributes, indices) {
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var context = arguments.length > 4 ? arguments[4] : undefined;

  if (!options.DracoWriter || !options.DracoLoader) {
    throw new Error('DracoWriter/DracoLoader not available');
  }

  var compressedData = options.DracoWriter.encodeSync({
    attributes: attributes
  });
  var parseSync = context.parseSync;
  var decodedData = parseSync({
    attributes: attributes
  });

  var fauxAccessors = options._addFauxAttributes(decodedData.attributes);

  var bufferViewIndex = options.addBufferView(compressedData);
  var glTFMesh = {
    primitives: [{
      attributes: fauxAccessors,
      mode: mode,
      extensions: _defineProperty$1({}, KHR_DRACO_MESH_COMPRESSION, {
        bufferView: bufferViewIndex,
        attributes: fauxAccessors
      })
    }]
  };
  return glTFMesh;
}

function checkPrimitive(primitive) {
  if (!primitive.attributes && Object.keys(primitive.attributes).length > 0) {
    throw new Error('Empty glTF primitive detected: Draco decompression failure?');
  }
}

function makeMeshPrimitiveIterator(scenegraph) {
  var _iterator2, _step2, mesh, _iterator3, _step3, primitive;

  return regenerator.wrap(function makeMeshPrimitiveIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iterator2 = _createForOfIteratorHelper$5(scenegraph.json.meshes || []);
          _context.prev = 1;

          _iterator2.s();

        case 3:
          if ((_step2 = _iterator2.n()).done) {
            _context.next = 24;
            break;
          }

          mesh = _step2.value;
          _iterator3 = _createForOfIteratorHelper$5(mesh.primitives);
          _context.prev = 6;

          _iterator3.s();

        case 8:
          if ((_step3 = _iterator3.n()).done) {
            _context.next = 14;
            break;
          }

          primitive = _step3.value;
          _context.next = 12;
          return primitive;

        case 12:
          _context.next = 8;
          break;

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](6);

          _iterator3.e(_context.t0);

        case 19:
          _context.prev = 19;

          _iterator3.f();

          return _context.finish(19);

        case 22:
          _context.next = 3;
          break;

        case 24:
          _context.next = 29;
          break;

        case 26:
          _context.prev = 26;
          _context.t1 = _context["catch"](1);

          _iterator2.e(_context.t1);

        case 29:
          _context.prev = 29;

          _iterator2.f();

          return _context.finish(29);

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 26, 29, 32], [6, 16, 19, 22]]);
}

var KHR_draco_mesh_compression = /*#__PURE__*/Object.freeze({
  __proto__: null,
  decode: decode$4,
  encode: encode$3
});

function _createForOfIteratorHelper$4(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$5(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }

function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function decode$3(gltfData, options) {
  var gltfScenegraph = new GLTFScenegraph(gltfData);
  var json = gltfScenegraph.json;
  var extension = gltfScenegraph.getExtension(KHR_LIGHTS_PUNCTUAL);

  if (extension) {
    gltfScenegraph.json.lights = extension.lights;
    gltfScenegraph.removeExtension(KHR_LIGHTS_PUNCTUAL);
  }

  var _iterator = _createForOfIteratorHelper$4(json.nodes || []),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;
      var nodeExtension = gltfScenegraph.getObjectExtension(node, KHR_LIGHTS_PUNCTUAL);

      if (nodeExtension) {
        node.light = nodeExtension.light;
      }

      gltfScenegraph.removeObjectExtension(node, KHR_LIGHTS_PUNCTUAL);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function encode$2(gltfData, options) {
  var gltfScenegraph = new GLTFScenegraph(gltfData);
  var json = gltfScenegraph.json;

  if (json.lights) {
    var extension = gltfScenegraph.addExtension(KHR_LIGHTS_PUNCTUAL);
    assert(!extension.lights);
    extension.lights = json.lights;
    delete json.lights;
  }

  if (gltfScenegraph.json.lights) {
    var _iterator2 = _createForOfIteratorHelper$4(gltfScenegraph.json.lights),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var light = _step2.value;
        var node = light.node;
        gltfScenegraph.addObjectExtension(node, KHR_LIGHTS_PUNCTUAL, light);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    delete gltfScenegraph.json.lights;
  }
}

var KHR_lights_punctual = /*#__PURE__*/Object.freeze({
  __proto__: null,
  decode: decode$3,
  encode: encode$2
});

function _createForOfIteratorHelper$3(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }

function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function decode$2(gltfData, options) {
  var gltfScenegraph = new GLTFScenegraph(gltfData);
  var json = gltfScenegraph.json;
  gltfScenegraph.removeExtension(KHR_MATERIALS_UNLIT);

  var _iterator = _createForOfIteratorHelper$3(json.materials || []),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var material = _step.value;
      var extension = material.extensions && material.extensions.KHR_materials_unlit;

      if (extension) {
        material.unlit = true;
      }

      gltfScenegraph.removeObjectExtension(material, KHR_MATERIALS_UNLIT);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function encode$1(gltfData, options) {
  var gltfScenegraph = new GLTFScenegraph(gltfData);
  var json = gltfScenegraph.json;

  if (gltfScenegraph.materials) {
    var _iterator2 = _createForOfIteratorHelper$3(json.materials),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var material = _step2.value;

        if (material.unlit) {
          delete material.unlit;
          gltfScenegraph.addObjectExtension(material, KHR_MATERIALS_UNLIT, {});
          gltfScenegraph.addExtension(KHR_MATERIALS_UNLIT);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
}

var KHR_materials_unlit = /*#__PURE__*/Object.freeze({
  __proto__: null,
  decode: decode$2,
  encode: encode$1
});

function _createForOfIteratorHelper$2(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function decode$1(gltfData, options) {
  var gltfScenegraph = new GLTFScenegraph(gltfData);
  var json = gltfScenegraph.json;
  var extension = gltfScenegraph.getExtension(KHR_TECHNIQUES_WEBGL);

  if (extension) {
    var techniques = resolveTechniques(extension, gltfScenegraph);

    var _iterator = _createForOfIteratorHelper$2(json.materials || []),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var material = _step.value;
        var materialExtension = gltfScenegraph.getObjectExtension(material, KHR_TECHNIQUES_WEBGL);

        if (materialExtension) {
          material.technique = Object.assign({}, materialExtension, techniques[materialExtension.technique]);
          material.technique.values = resolveValues(material.technique, gltfScenegraph);
        }

        gltfScenegraph.removeObjectExtension(material, KHR_TECHNIQUES_WEBGL);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    gltfScenegraph.removeExtension(KHR_TECHNIQUES_WEBGL);
  }
}
function encode(gltfData, options) {}

function resolveTechniques(_ref, gltfScenegraph) {
  var _ref$programs = _ref.programs,
      programs = _ref$programs === void 0 ? [] : _ref$programs,
      _ref$shaders = _ref.shaders,
      shaders = _ref$shaders === void 0 ? [] : _ref$shaders,
      _ref$techniques = _ref.techniques,
      techniques = _ref$techniques === void 0 ? [] : _ref$techniques;
  var textDecoder = new TextDecoder();
  shaders.forEach(function (shader) {
    if (Number.isFinite(shader.bufferView)) {
      shader.code = textDecoder.decode(gltfScenegraph.getTypedArrayForBufferView(shader.bufferView));
    } else {
      throw new Error('KHR_techniques_webgl: no shader code');
    }
  });
  programs.forEach(function (program) {
    program.fragmentShader = shaders[program.fragmentShader];
    program.vertexShader = shaders[program.vertexShader];
  });
  techniques.forEach(function (technique) {
    technique.program = programs[technique.program];
  });
  return techniques;
}

function resolveValues(technique, gltfScenegraph) {
  var values = Object.assign({}, technique.values);
  Object.keys(technique.uniforms || {}).forEach(function (uniform) {
    if (technique.uniforms[uniform].value && !(uniform in values)) {
      values[uniform] = technique.uniforms[uniform].value;
    }
  });
  Object.keys(values).forEach(function (uniform) {
    if (_typeof(values[uniform]) === 'object' && values[uniform].index !== undefined) {
      values[uniform].texture = gltfScenegraph.getTexture(values[uniform].index);
    }
  });
  return values;
}

var KHR_techniques_webgl = /*#__PURE__*/Object.freeze({
  __proto__: null,
  decode: decode$1,
  encode: encode
});

var EXTENSIONS = {
  KHR_draco_mesh_compression: KHR_draco_mesh_compression,
  KHR_lights_punctual: KHR_lights_punctual,
  KHR_materials_unlit: KHR_materials_unlit,
  KHR_techniques_webgl: KHR_techniques_webgl
};
function decodeExtensions(_x) {
  return _decodeExtensions.apply(this, arguments);
}

function _decodeExtensions() {
  _decodeExtensions = _asyncToGenerator(regenerator.mark(function _callee(gltf) {
    var options,
        context,
        extensionName,
        excludes,
        exclude,
        extension,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            context = _args.length > 2 ? _args[2] : undefined;
            options.gltf = options.gltf || {};
            _context.t0 = regenerator.keys(EXTENSIONS);

          case 4:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 14;
              break;
            }

            extensionName = _context.t1.value;
            excludes = options.gltf.excludeExtensions || {};
            exclude = extensionName in excludes && !excludes[extensionName];

            if (exclude) {
              _context.next = 12;
              break;
            }

            extension = EXTENSIONS[extensionName];
            _context.next = 12;
            return extension.decode(gltf, options, context);

          case 12:
            _context.next = 4;
            break;

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _decodeExtensions.apply(this, arguments);
}

var MAGIC_glTF$1 = 0x676c5446;
var GLB_FILE_HEADER_SIZE = 12;
var GLB_CHUNK_HEADER_SIZE = 8;
var GLB_CHUNK_TYPE_JSON = 0x4e4f534a;
var GLB_CHUNK_TYPE_BIN = 0x004e4942;
var GLB_CHUNK_TYPE_JSON_XVIZ_DEPRECATED = 0;
var GLB_CHUNK_TYPE_BIX_XVIZ_DEPRECATED = 1;
var GLB_V1_CONTENT_FORMAT_JSON = 0x0;
var LE$1 = true;

function getMagicString(dataView) {
  var byteOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return "".concat(String.fromCharCode(dataView.getUint8(byteOffset + 0))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 1))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 2))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 3)));
}

function isGLB(arrayBuffer) {
  var byteOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var dataView = new DataView(arrayBuffer);
  var _options$magic = options.magic,
      magic = _options$magic === void 0 ? MAGIC_glTF$1 : _options$magic;
  var magic1 = dataView.getUint32(byteOffset, false);
  return magic1 === magic || magic1 === MAGIC_glTF$1;
}
function parseGLBSync(glb, arrayBuffer) {
  var byteOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var dataView = new DataView(arrayBuffer);
  glb.type = getMagicString(dataView, byteOffset + 0);
  glb.version = dataView.getUint32(byteOffset + 4, LE$1);
  var byteLength = dataView.getUint32(byteOffset + 8, LE$1);
  glb.header = {
    byteOffset: byteOffset,
    byteLength: byteLength
  };
  glb.json = {};
  glb.binChunks = [];
  byteOffset += GLB_FILE_HEADER_SIZE;

  switch (glb.version) {
    case 1:
      return parseGLBV1(glb, dataView, byteOffset);

    case 2:
      return parseGLBV2(glb, dataView, byteOffset, {});

    default:
      throw new Error("Invalid GLB version ".concat(glb.version, ". Only supports v1 and v2."));
  }
}

function parseGLBV1(glb, dataView, byteOffset, options) {
  assert$2(glb.header.byteLength > GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE);
  var contentLength = dataView.getUint32(byteOffset + 0, LE$1);
  var contentFormat = dataView.getUint32(byteOffset + 4, LE$1);
  byteOffset += GLB_CHUNK_HEADER_SIZE;
  assert$2(contentFormat === GLB_V1_CONTENT_FORMAT_JSON);
  parseJSONChunk(glb, dataView, byteOffset, contentLength);
  byteOffset += contentLength;
  byteOffset += parseBINChunk(glb, dataView, byteOffset, glb.header.byteLength);
  return byteOffset;
}

function parseGLBV2(glb, dataView, byteOffset, options) {
  assert$2(glb.header.byteLength > GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE);
  parseGLBChunksSync(glb, dataView, byteOffset, options);
  return byteOffset + glb.header.byteLength;
}

function parseGLBChunksSync(glb, dataView, byteOffset, options) {
  while (byteOffset + 8 <= glb.header.byteLength) {
    var chunkLength = dataView.getUint32(byteOffset + 0, LE$1);
    var chunkFormat = dataView.getUint32(byteOffset + 4, LE$1);
    byteOffset += GLB_CHUNK_HEADER_SIZE;

    switch (chunkFormat) {
      case GLB_CHUNK_TYPE_JSON:
        parseJSONChunk(glb, dataView, byteOffset, chunkLength);
        break;

      case GLB_CHUNK_TYPE_BIN:
        parseBINChunk(glb, dataView, byteOffset, chunkLength);
        break;

      case GLB_CHUNK_TYPE_JSON_XVIZ_DEPRECATED:
        if (!options.glb.strict) {
          parseJSONChunk(glb, dataView, byteOffset, chunkLength);
        }

        break;

      case GLB_CHUNK_TYPE_BIX_XVIZ_DEPRECATED:
        if (!options.glb.strict) {
          parseBINChunk(glb, dataView, byteOffset, chunkLength);
        }

        break;
    }

    byteOffset += padTo4Bytes(chunkLength);
  }

  return byteOffset;
}

function parseJSONChunk(glb, dataView, byteOffset, chunkLength, options) {
  var jsonChunk = new Uint8Array(dataView.buffer, byteOffset, chunkLength);
  var textDecoder = new TextDecoder('utf8');
  var jsonText = textDecoder.decode(jsonChunk);
  glb.json = JSON.parse(jsonText);
  return padTo4Bytes(chunkLength);
}

function parseBINChunk(glb, dataView, byteOffset, chunkLength, options) {
  glb.header.hasBinChunk = true;
  glb.binChunks.push({
    byteOffset: byteOffset,
    byteLength: chunkLength,
    arrayBuffer: dataView.buffer
  });
  return padTo4Bytes(chunkLength);
}

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function decode(gltfData, options) {
  var gltfScenegraph = new GLTFScenegraph(gltfData);
  var json = gltfScenegraph.json;

  var _iterator = _createForOfIteratorHelper$1(json.images || []),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;
      var extension = gltfScenegraph.removeObjectExtension(node, KHR_BINARY_GLTF);

      if (extension) {
        Object.assign(node, extension);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (json.buffers && json.buffers[0]) {
    delete json.buffers[0].uri;
  }

  gltfScenegraph.removeExtension(KHR_BINARY_GLTF);
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var GLTF_ARRAYS = {
  accessors: 'accessor',
  animations: 'animation',
  buffers: 'buffer',
  bufferViews: 'bufferView',
  images: 'image',
  materials: 'material',
  meshes: 'mesh',
  nodes: 'node',
  samplers: 'sampler',
  scenes: 'scene',
  skins: 'skin',
  textures: 'texture'
};
var GLTF_KEYS = {
  accessor: 'accessors',
  animations: 'animation',
  buffer: 'buffers',
  bufferView: 'bufferViews',
  image: 'images',
  material: 'materials',
  mesh: 'meshes',
  node: 'nodes',
  sampler: 'samplers',
  scene: 'scenes',
  skin: 'skins',
  texture: 'textures'
};

var GLTFV1Normalizer = function () {
  function GLTFV1Normalizer(gltf) {
    _classCallCheck$1(this, GLTFV1Normalizer);

    this.idToIndexMap = {
      animations: {},
      accessors: {},
      buffers: {},
      bufferViews: {},
      images: {},
      materials: {},
      meshes: {},
      nodes: {},
      samplers: {},
      scenes: {},
      skins: {},
      textures: {}
    };
  }

  _createClass$1(GLTFV1Normalizer, [{
    key: "normalize",
    value: function normalize(gltf, options) {
      this.json = gltf.json;
      var json = gltf.json;

      switch (json.asset && json.asset.version) {
        case '2.0':
          return;

        case undefined:
        case '1.0':
          break;

        default:
          console.warn("glTF: Unknown version ".concat(json.asset.version));
          return;
      }

      if (!options.normalize) {
        throw new Error('glTF v1 is not supported.');
      }

      console.warn('Converting glTF v1 to glTF v2 format. This is experimental and may fail.');

      this._addAsset(json);

      this._convertTopLevelObjectsToArrays(json);

      decode(gltf);

      this._convertObjectIdsToArrayIndices(json);

      this._updateObjects(json);
    }
  }, {
    key: "_addAsset",
    value: function _addAsset(json) {
      json.asset = json.asset || {};
      json.asset.version = '2.0';
      json.asset.generator = json.asset.generator || 'Normalized to glTF 2.0 by loaders.gl';
    }
  }, {
    key: "_convertTopLevelObjectsToArrays",
    value: function _convertTopLevelObjectsToArrays(json) {
      for (var arrayName in GLTF_ARRAYS) {
        this._convertTopLevelObjectToArray(json, arrayName);
      }
    }
  }, {
    key: "_convertTopLevelObjectToArray",
    value: function _convertTopLevelObjectToArray(json, mapName) {
      var objectMap = json[mapName];

      if (!objectMap || Array.isArray(objectMap)) {
        return;
      }

      json[mapName] = [];

      for (var id in objectMap) {
        var object = objectMap[id];
        object.id = object.id || id;
        var index = json[mapName].length;
        json[mapName].push(object);
        this.idToIndexMap[mapName][id] = index;
      }
    }
  }, {
    key: "_convertObjectIdsToArrayIndices",
    value: function _convertObjectIdsToArrayIndices(json) {
      for (var arrayName in GLTF_ARRAYS) {
        this._convertIdsToIndices(json, arrayName);
      }

      if ('scene' in json) {
        json.scene = this._convertIdToIndex(json.scene, 'scene');
      }

      var _iterator = _createForOfIteratorHelper(json.textures),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var texture = _step.value;

          this._convertTextureIds(texture);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(json.meshes),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var mesh = _step2.value;

          this._convertMeshIds(mesh);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var _iterator3 = _createForOfIteratorHelper(json.nodes),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var node = _step3.value;

          this._convertNodeIds(node);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var _iterator4 = _createForOfIteratorHelper(json.scenes),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _node = _step4.value;

          this._convertSceneIds(_node);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "_convertTextureIds",
    value: function _convertTextureIds(texture) {
      if (texture.source) {
        texture.source = this._convertIdToIndex(texture.source, 'image');
      }
    }
  }, {
    key: "_convertMeshIds",
    value: function _convertMeshIds(mesh) {
      var _iterator5 = _createForOfIteratorHelper(mesh.primitives),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var primitive = _step5.value;
          var attributes = primitive.attributes,
              indices = primitive.indices,
              material = primitive.material;

          for (var attributeName in attributes) {
            attributes[attributeName] = this._convertIdToIndex(attributes[attributeName], 'accessor');
          }

          if (indices) {
            primitive.indices = this._convertIdToIndex(indices, 'accessor');
          }

          if (material) {
            primitive.material = this._convertIdToIndex(material, 'material');
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  }, {
    key: "_convertNodeIds",
    value: function _convertNodeIds(node) {
      var _this = this;

      if (node.children) {
        node.children = node.children.map(function (child) {
          return _this._convertIdToIndex(child, 'node');
        });
      }
    }
  }, {
    key: "_convertSceneIds",
    value: function _convertSceneIds(scene) {
      var _this2 = this;

      if (scene.nodes) {
        scene.nodes = scene.nodes.map(function (node) {
          return _this2._convertIdToIndex(node, 'node');
        });
      }
    }
  }, {
    key: "_convertIdsToIndices",
    value: function _convertIdsToIndices(json, topLevelArrayName) {
      var _iterator6 = _createForOfIteratorHelper(json[topLevelArrayName]),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var object = _step6.value;

          for (var key in object) {
            var id = object[key];

            var index = this._convertIdToIndex(id, key);

            object[key] = index;
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  }, {
    key: "_convertIdToIndex",
    value: function _convertIdToIndex(id, key) {
      var arrayName = GLTF_KEYS[key];

      if (arrayName in this.idToIndexMap) {
        var index = this.idToIndexMap[arrayName][id];

        if (!Number.isFinite(index)) {
          throw new Error("gltf v1: failed to resolve ".concat(key, " with id ").concat(id));
        }

        return index;
      }

      return id;
    }
  }, {
    key: "_updateObjects",
    value: function _updateObjects(json) {
      var _iterator7 = _createForOfIteratorHelper(this.json.buffers),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var buffer = _step7.value;
          delete buffer.type;
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    }
  }]);

  return GLTFV1Normalizer;
}();

function normalizeGLTFV1(gltf) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new GLTFV1Normalizer().normalize(gltf, options);
}

var _DEFAULT_SAMPLER;

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var COMPONENTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
var BYTES = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
};
var GL_SAMPLER = {
  TEXTURE_MAG_FILTER: 0x2800,
  TEXTURE_MIN_FILTER: 0x2801,
  TEXTURE_WRAP_S: 0x2802,
  TEXTURE_WRAP_T: 0x2803,
  REPEAT: 0x2901,
  LINEAR: 0x2601,
  NEAREST_MIPMAP_LINEAR: 0x2702
};
var SAMPLER_PARAMETER_GLTF_TO_GL = {
  magFilter: GL_SAMPLER.TEXTURE_MAG_FILTER,
  minFilter: GL_SAMPLER.TEXTURE_MIN_FILTER,
  wrapS: GL_SAMPLER.TEXTURE_WRAP_S,
  wrapT: GL_SAMPLER.TEXTURE_WRAP_T
};
var DEFAULT_SAMPLER = (_DEFAULT_SAMPLER = {}, _defineProperty$1(_DEFAULT_SAMPLER, GL_SAMPLER.TEXTURE_MAG_FILTER, GL_SAMPLER.LINEAR), _defineProperty$1(_DEFAULT_SAMPLER, GL_SAMPLER.TEXTURE_MIN_FILTER, GL_SAMPLER.NEAREST_MIPMAP_LINEAR), _defineProperty$1(_DEFAULT_SAMPLER, GL_SAMPLER.TEXTURE_WRAP_S, GL_SAMPLER.REPEAT), _defineProperty$1(_DEFAULT_SAMPLER, GL_SAMPLER.TEXTURE_WRAP_, GL_SAMPLER.REPEAT), _DEFAULT_SAMPLER);

function getBytesFromComponentType(componentType) {
  return BYTES[componentType];
}

function getSizeFromAccessorType(type) {
  return COMPONENTS[type];
}

var GLTFPostProcessor = function () {
  function GLTFPostProcessor() {
    _classCallCheck$1(this, GLTFPostProcessor);
  }

  _createClass$1(GLTFPostProcessor, [{
    key: "postProcess",
    value: function postProcess(gltf) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var json = gltf.json,
          _gltf$buffers = gltf.buffers,
          buffers = _gltf$buffers === void 0 ? [] : _gltf$buffers,
          _gltf$images = gltf.images,
          images = _gltf$images === void 0 ? [] : _gltf$images,
          _gltf$baseUri = gltf.baseUri,
          baseUri = _gltf$baseUri === void 0 ? '' : _gltf$baseUri;
      assert(json);
      this.baseUri = baseUri;
      this.json = json;
      this.buffers = buffers;
      this.images = images;

      this._resolveTree(this.json, options);

      return this.json;
    }
  }, {
    key: "_resolveTree",
    value: function _resolveTree(json) {
      var _this = this;

      if (json.bufferViews) {
        json.bufferViews = json.bufferViews.map(function (bufView, i) {
          return _this._resolveBufferView(bufView, i);
        });
      }

      if (json.images) {
        json.images = json.images.map(function (image, i) {
          return _this._resolveImage(image, i);
        });
      }

      if (json.samplers) {
        json.samplers = json.samplers.map(function (sampler, i) {
          return _this._resolveSampler(sampler, i);
        });
      }

      if (json.textures) {
        json.textures = json.textures.map(function (texture, i) {
          return _this._resolveTexture(texture, i);
        });
      }

      if (json.accessors) {
        json.accessors = json.accessors.map(function (accessor, i) {
          return _this._resolveAccessor(accessor, i);
        });
      }

      if (json.materials) {
        json.materials = json.materials.map(function (material, i) {
          return _this._resolveMaterial(material, i);
        });
      }

      if (json.meshes) {
        json.meshes = json.meshes.map(function (mesh, i) {
          return _this._resolveMesh(mesh, i);
        });
      }

      if (json.nodes) {
        json.nodes = json.nodes.map(function (node, i) {
          return _this._resolveNode(node, i);
        });
      }

      if (json.skins) {
        json.skins = json.skins.map(function (skin, i) {
          return _this._resolveSkin(skin, i);
        });
      }

      if (json.scenes) {
        json.scenes = json.scenes.map(function (scene, i) {
          return _this._resolveScene(scene, i);
        });
      }

      if (json.scene !== undefined) {
        json.scene = json.scenes[this.json.scene];
      }
    }
  }, {
    key: "getScene",
    value: function getScene(index) {
      return this._get('scenes', index);
    }
  }, {
    key: "getNode",
    value: function getNode(index) {
      return this._get('nodes', index);
    }
  }, {
    key: "getSkin",
    value: function getSkin(index) {
      return this._get('skins', index);
    }
  }, {
    key: "getMesh",
    value: function getMesh(index) {
      return this._get('meshes', index);
    }
  }, {
    key: "getMaterial",
    value: function getMaterial(index) {
      return this._get('materials', index);
    }
  }, {
    key: "getAccessor",
    value: function getAccessor(index) {
      return this._get('accessors', index);
    }
  }, {
    key: "getCamera",
    value: function getCamera(index) {
      return null;
    }
  }, {
    key: "getTexture",
    value: function getTexture(index) {
      return this._get('textures', index);
    }
  }, {
    key: "getSampler",
    value: function getSampler(index) {
      return this._get('samplers', index);
    }
  }, {
    key: "getImage",
    value: function getImage(index) {
      return this._get('images', index);
    }
  }, {
    key: "getBufferView",
    value: function getBufferView(index) {
      return this._get('bufferViews', index);
    }
  }, {
    key: "getBuffer",
    value: function getBuffer(index) {
      return this._get('buffers', index);
    }
  }, {
    key: "_get",
    value: function _get(array, index) {
      if (_typeof(index) === 'object') {
        return index;
      }

      var object = this.json[array] && this.json[array][index];

      if (!object) {
        console.warn("glTF file error: Could not find ".concat(array, "[").concat(index, "]"));
      }

      return object;
    }
  }, {
    key: "_resolveScene",
    value: function _resolveScene(scene, index) {
      var _this2 = this;

      scene.id = scene.id || "scene-".concat(index);
      scene.nodes = (scene.nodes || []).map(function (node) {
        return _this2.getNode(node);
      });
      return scene;
    }
  }, {
    key: "_resolveNode",
    value: function _resolveNode(node, index) {
      var _this3 = this;

      node.id = node.id || "node-".concat(index);

      if (node.children) {
        node.children = node.children.map(function (child) {
          return _this3.getNode(child);
        });
      }

      if (node.mesh !== undefined) {
        node.mesh = this.getMesh(node.mesh);
      }

      if (node.camera !== undefined) {
        node.camera = this.getCamera(node.camera);
      }

      if (node.skin !== undefined) {
        node.skin = this.getSkin(node.skin);
      }

      return node;
    }
  }, {
    key: "_resolveSkin",
    value: function _resolveSkin(skin, index) {
      skin.id = skin.id || "skin-".concat(index);
      skin.inverseBindMatrices = this.getAccessor(skin.inverseBindMatrices);
      return skin;
    }
  }, {
    key: "_resolveMesh",
    value: function _resolveMesh(mesh, index) {
      var _this4 = this;

      mesh.id = mesh.id || "mesh-".concat(index);

      if (mesh.primitives) {
        mesh.primitives = mesh.primitives.map(function (primitive) {
          primitive = _objectSpread$1({}, primitive);
          var attributes = primitive.attributes;
          primitive.attributes = {};

          for (var attribute in attributes) {
            primitive.attributes[attribute] = _this4.getAccessor(attributes[attribute]);
          }

          if (primitive.indices !== undefined) {
            primitive.indices = _this4.getAccessor(primitive.indices);
          }

          if (primitive.material !== undefined) {
            primitive.material = _this4.getMaterial(primitive.material);
          }

          return primitive;
        });
      }

      return mesh;
    }
  }, {
    key: "_resolveMaterial",
    value: function _resolveMaterial(material, index) {
      material.id = material.id || "material-".concat(index);

      if (material.normalTexture) {
        material.normalTexture = _objectSpread$1({}, material.normalTexture);
        material.normalTexture.texture = this.getTexture(material.normalTexture.index);
      }

      if (material.occlusionTexture) {
        material.occlustionTexture = _objectSpread$1({}, material.occlustionTexture);
        material.occlusionTexture.texture = this.getTexture(material.occlusionTexture.index);
      }

      if (material.emissiveTexture) {
        material.emmisiveTexture = _objectSpread$1({}, material.emmisiveTexture);
        material.emissiveTexture.texture = this.getTexture(material.emissiveTexture.index);
      }

      if (material.pbrMetallicRoughness) {
        material.pbrMetallicRoughness = _objectSpread$1({}, material.pbrMetallicRoughness);
        var mr = material.pbrMetallicRoughness;

        if (mr.baseColorTexture) {
          mr.baseColorTexture = _objectSpread$1({}, mr.baseColorTexture);
          mr.baseColorTexture.texture = this.getTexture(mr.baseColorTexture.index);
        }

        if (mr.metallicRoughnessTexture) {
          mr.metallicRoughnessTexture = _objectSpread$1({}, mr.metallicRoughnessTexture);
          mr.metallicRoughnessTexture.texture = this.getTexture(mr.metallicRoughnessTexture.index);
        }
      }

      return material;
    }
  }, {
    key: "_resolveAccessor",
    value: function _resolveAccessor(accessor, index) {
      accessor.id = accessor.id || "accessor-".concat(index);

      if (accessor.bufferView !== undefined) {
        accessor.bufferView = this.getBufferView(accessor.bufferView);
      }

      accessor.bytesPerComponent = getBytesFromComponentType(accessor.componentType);
      accessor.components = getSizeFromAccessorType(accessor.type);
      accessor.bytesPerElement = accessor.bytesPerComponent * accessor.components;

      if (accessor.bufferView) {
        var buffer = accessor.bufferView.buffer;

        var _getAccessorArrayType = getAccessorArrayTypeAndLength(accessor, accessor.bufferView),
            ArrayType = _getAccessorArrayType.ArrayType,
            length = _getAccessorArrayType.length;

        var byteOffset = (accessor.bufferView.byteOffset || 0) + (accessor.byteOffset || 0) + buffer.byteOffset;
        accessor.value = new ArrayType(buffer.arrayBuffer, byteOffset, length);
      }

      return accessor;
    }
  }, {
    key: "_resolveTexture",
    value: function _resolveTexture(texture, index) {
      texture.id = texture.id || "texture-".concat(index);
      texture.sampler = 'sampler' in texture ? this.getSampler(texture.sampler) : DEFAULT_SAMPLER;
      texture.source = this.getImage(texture.source);
      return texture;
    }
  }, {
    key: "_resolveSampler",
    value: function _resolveSampler(sampler, index) {
      sampler.id = sampler.id || "sampler-".concat(index);
      sampler.parameters = {};

      for (var key in sampler) {
        var glEnum = this._enumSamplerParameter(key);

        if (glEnum !== undefined) {
          sampler.parameters[glEnum] = sampler[key];
        }
      }

      return sampler;
    }
  }, {
    key: "_enumSamplerParameter",
    value: function _enumSamplerParameter(key) {
      return SAMPLER_PARAMETER_GLTF_TO_GL[key];
    }
  }, {
    key: "_resolveImage",
    value: function _resolveImage(image, index) {
      image.id = image.id || "image-".concat(index);

      if (image.bufferView !== undefined) {
        image.bufferView = this.getBufferView(image.bufferView);
      }

      var preloadedImage = this.images[index];

      if (preloadedImage) {
        image.image = preloadedImage;
      }

      return image;
    }
  }, {
    key: "_resolveBufferView",
    value: function _resolveBufferView(bufferView, index) {
      bufferView.id = bufferView.id || "bufferView-".concat(index);
      var bufferIndex = bufferView.buffer;
      bufferView.buffer = this.buffers[bufferIndex];
      var arrayBuffer = this.buffers[bufferIndex].arrayBuffer;
      var byteOffset = this.buffers[bufferIndex].byteOffset || 0;

      if ('byteOffset' in bufferView) {
        byteOffset += bufferView.byteOffset;
      }

      bufferView.data = new Uint8Array(arrayBuffer, byteOffset, bufferView.byteLength);
      return bufferView;
    }
  }, {
    key: "_resolveCamera",
    value: function _resolveCamera(camera, index) {
      camera.id = camera.id || "camera-".concat(index);

      if (camera.perspective) ;

      if (camera.orthographic) ;

      return camera;
    }
  }]);

  return GLTFPostProcessor;
}();

function postProcessGLTF(gltf, options) {
  return new GLTFPostProcessor().postProcess(gltf, options);
}

function parseGLTF(_x, _x2) {
  return _parseGLTF.apply(this, arguments);
}

function _parseGLTF() {
  _parseGLTF = _asyncToGenerator(regenerator.mark(function _callee(gltf, arrayBufferOrString) {
    var byteOffset,
        options,
        context,
        promises,
        _promise,
        promise,
        _args = arguments;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            byteOffset = _args.length > 2 && _args[2] !== undefined ? _args[2] : 0;
            options = _args.length > 3 ? _args[3] : undefined;
            context = _args.length > 4 ? _args[4] : undefined;
            parseGLTFContainerSync(gltf, arrayBufferOrString, byteOffset, options);
            normalizeGLTFV1(gltf, {
              normalize: options.gltf.normalize
            });
            promises = [];

            if (!(options.gltf.loadBuffers && gltf.json.buffers)) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return loadBuffers(gltf, options, context);

          case 9:
            if (options.gltf.loadImages) {
              _promise = loadImages(gltf, options, context);
              promises.push(_promise);
            }

            promise = decodeExtensions(gltf, options, context);
            promises.push(promise);
            _context.next = 14;
            return Promise.all(promises);

          case 14:
            return _context.abrupt("return", options.gltf.postProcess ? postProcessGLTF(gltf, options) : gltf);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseGLTF.apply(this, arguments);
}

function parseGLTFContainerSync(gltf, data, byteOffset, options) {
  if (options.uri) {
    gltf.baseUri = options.uri;
  }

  if (data instanceof ArrayBuffer && !isGLB(data, byteOffset, options)) {
    var textDecoder = new TextDecoder();
    data = textDecoder.decode(data);
  }

  if (typeof data === 'string') {
    gltf.json = parseJSON(data);
  } else if (data instanceof ArrayBuffer) {
    var glb = {};
    byteOffset = parseGLBSync(glb, data, byteOffset, options);
    assert(glb.type === 'glTF', "Invalid GLB magic string ".concat(glb.type));
    gltf._glb = glb;
    gltf.json = glb.json;
  } else {
    assert(false, "GLTF: must be ArrayBuffer or string");
  }

  var buffers = gltf.json.buffers || [];
  gltf.buffers = new Array(buffers.length).fill(null);

  if (gltf._glb && gltf._glb.header.hasBinChunk) {
    var binChunks = gltf._glb.binChunks;
    gltf.buffers[0] = {
      arrayBuffer: binChunks[0].arrayBuffer,
      byteOffset: binChunks[0].byteOffset,
      byteLength: binChunks[0].byteLength
    };
  }

  var images = gltf.json.images || [];
  gltf.images = new Array(images.length).fill({});
}

function loadBuffers(_x3, _x4, _x5) {
  return _loadBuffers.apply(this, arguments);
}

function _loadBuffers() {
  _loadBuffers = _asyncToGenerator(regenerator.mark(function _callee2(gltf, options, context) {
    var i, buffer, fetch, uri, response, arrayBuffer;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < gltf.json.buffers.length)) {
              _context2.next = 18;
              break;
            }

            buffer = gltf.json.buffers[i];

            if (!buffer.uri) {
              _context2.next = 15;
              break;
            }

            fetch = context.fetch;
            assert(fetch);
            uri = resolveUrl(buffer.uri, options);
            _context2.next = 9;
            return fetch(uri);

          case 9:
            response = _context2.sent;
            _context2.next = 12;
            return response.arrayBuffer();

          case 12:
            arrayBuffer = _context2.sent;
            gltf.buffers[i] = {
              arrayBuffer: arrayBuffer,
              byteOffset: 0,
              byteLength: arrayBuffer.byteLength
            };
            delete buffer.uri;

          case 15:
            ++i;
            _context2.next = 1;
            break;

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadBuffers.apply(this, arguments);
}

function loadImages(_x6, _x7, _x8) {
  return _loadImages.apply(this, arguments);
}

function _loadImages() {
  _loadImages = _asyncToGenerator(regenerator.mark(function _callee3(gltf, options, context) {
    var images, promises, i;
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            images = gltf.json.images || [];
            promises = [];

            for (i = 0; i < images.length; ++i) {
              promises.push(loadImage(gltf, images[i], i, options, context));
            }

            _context3.next = 5;
            return Promise.all(promises);

          case 5:
            return _context3.abrupt("return", _context3.sent);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _loadImages.apply(this, arguments);
}

function loadImage(_x9, _x10, _x11, _x12, _x13) {
  return _loadImage.apply(this, arguments);
}

function _loadImage() {
  _loadImage = _asyncToGenerator(regenerator.mark(function _callee4(gltf, image, i, options, context) {
    var fetch, parse, arrayBuffer, uri, response, array, parsedImage;
    return regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            fetch = context.fetch, parse = context.parse;

            if (!image.uri) {
              _context4.next = 9;
              break;
            }

            uri = resolveUrl(image.uri, options);
            _context4.next = 5;
            return fetch(uri);

          case 5:
            response = _context4.sent;
            _context4.next = 8;
            return response.arrayBuffer();

          case 8:
            arrayBuffer = _context4.sent;

          case 9:
            if (Number.isFinite(image.bufferView)) {
              array = getTypedArrayForBufferView(gltf.json, gltf.buffers, image.bufferView);
              arrayBuffer = getZeroOffsetArrayBuffer(array.buffer, array.byteOffset, array.byteLength);
            }

            assert(arrayBuffer, 'glTF image has no data');
            _context4.next = 13;
            return parse(arrayBuffer, ImageLoader, {}, context);

          case 13:
            parsedImage = _context4.sent;
            gltf.images[i] = parsedImage;

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _loadImage.apply(this, arguments);
}

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var VERSION$1 = "2.3.13" ;
var GLTFLoader = {
  id: 'gltf',
  name: 'glTF',
  version: VERSION$1,
  extensions: ['gltf', 'glb'],
  mimeTypes: ['model/gltf+json', 'model/gltf-binary'],
  text: true,
  binary: true,
  tests: ['glTF'],
  parse: parse,
  options: {
    gltf: {
      normalize: false,
      loadBuffers: true,
      loadImages: true,
      decompressMeshes: true,
      postProcess: true
    },
    baseUri: '',
    log: console
  },
  deprecatedOptions: {
    fetchImages: 'gltf.loadImages',
    createImages: 'gltf.loadImages',
    decompress: 'gltf.decompressMeshes',
    postProcess: 'gltf.postProcess',
    gltf: {
      decompress: 'gltf.decompressMeshes'
    }
  }
};
function parse(_x) {
  return _parse.apply(this, arguments);
}

function _parse() {
  _parse = _asyncToGenerator(regenerator.mark(function _callee(arrayBuffer) {
    var options,
        context,
        _options,
        _options$byteOffset,
        byteOffset,
        gltf,
        _args = arguments;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            context = _args.length > 2 ? _args[2] : undefined;
            options = _objectSpread(_objectSpread({}, GLTFLoader.options), options);
            options.gltf = _objectSpread(_objectSpread({}, GLTFLoader.options.gltf), options.gltf);
            addDeprecatedGLTFOptions(options);
            _options = options, _options$byteOffset = _options.byteOffset, byteOffset = _options$byteOffset === void 0 ? 0 : _options$byteOffset;
            gltf = {};
            _context.next = 9;
            return parseGLTF(gltf, arrayBuffer, byteOffset, options, context);

          case 9:
            return _context.abrupt("return", _context.sent);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parse.apply(this, arguments);
}

function addDeprecatedGLTFOptions(options) {
  if ('fetchImages' in options) {
    options.gltf.loadImages = options.fetchImages;
  }

  if ('createImages' in options) {
    options.gltf.loadImages = options.createImages;
  }

  if ('fetchLinkedResources' in options) {
    options.gltf.fetchBuffers = options.fetchLinkedResources;
  }

  if ('decompress' in options) {
    options.gltf.decompressMeshes = options.decompress;
  }

  if ('decompress' in options.gltf) {
    options.gltf.decompressMeshes = options.gltf.decompress;
  }

  if ('postProcess' in options) {
    options.gltf.postProcess = options.postProcess;
  }
}

var MAGIC_glTF = 0x46546c67;
var MAGIC_JSON = 0x4e4f534a;
var MAGIC_BIN = 0x004e4942;
var LE = true;
function encodeGLBSync(glb, dataView) {
  var byteOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var _glb$magic = glb.magic,
      magic = _glb$magic === void 0 ? MAGIC_glTF : _glb$magic,
      _glb$version = glb.version,
      version = _glb$version === void 0 ? 2 : _glb$version,
      _glb$json = glb.json,
      json = _glb$json === void 0 ? {} : _glb$json,
      binary = glb.binary;
  var byteOffsetStart = byteOffset;

  if (dataView) {
    dataView.setUint32(byteOffset + 0, magic, LE);
    dataView.setUint32(byteOffset + 4, version, LE);
    dataView.setUint32(byteOffset + 8, 0, LE);
  }

  var byteOffsetFileLength = byteOffset + 8;
  byteOffset += 12;
  var byteOffsetJsonHeader = byteOffset;

  if (dataView) {
    dataView.setUint32(byteOffset + 0, 0, LE);
    dataView.setUint32(byteOffset + 4, MAGIC_JSON, LE);
  }

  byteOffset += 8;
  var jsonString = JSON.stringify(json);
  byteOffset = copyPaddedStringToDataView(dataView, byteOffset, jsonString);

  if (dataView) {
    var jsonByteLength = byteOffset - byteOffsetJsonHeader - 8;
    dataView.setUint32(byteOffsetJsonHeader + 0, jsonByteLength, LE);
  }

  if (binary) {
    var byteOffsetBinHeader = byteOffset;

    if (dataView) {
      dataView.setUint32(byteOffset + 0, 0, LE);
      dataView.setUint32(byteOffset + 4, MAGIC_BIN, LE);
    }

    byteOffset += 8;
    byteOffset = copyPaddedArrayBufferToDataView(dataView, byteOffset, binary);

    if (dataView) {
      var binByteLength = byteOffset - byteOffsetBinHeader - 8;
      dataView.setUint32(byteOffsetBinHeader + 0, binByteLength, LE);
    }
  }

  if (dataView) {
    var fileByteLength = byteOffset - byteOffsetStart;
    dataView.setUint32(byteOffsetFileLength, fileByteLength, LE);
  }

  return byteOffset;
}

function encodeGLTFSync(gltf, arrayBuffer, byteOffset, options) {
  convertBuffersToBase64(gltf);
  return encodeGLBSync(gltf, arrayBuffer, byteOffset, options);
}

function convertBuffersToBase64(gltf) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$firstBuffer = _ref.firstBuffer,
      firstBuffer = _ref$firstBuffer === void 0 ? 0 : _ref$firstBuffer;

  if (gltf.buffers && gltf.buffers.length > firstBuffer) {
    throw new Error('encodeGLTF: multiple buffers not yet implemented');
  }
}

var gltfWriter = {
  name: 'glTF',
  extensions: ['glb'],
  mimeTypes: ['model/gltf-binary'],
  encodeSync: encodeSync$1,
  binary: true,
  options: {}
};

function encodeSync$1(gltf) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$byteOffset = options.byteOffset,
      byteOffset = _options$byteOffset === void 0 ? 0 : _options$byteOffset;
  var byteLength = encodeGLTFSync(gltf, null, byteOffset, options);
  var arrayBuffer = new ArrayBuffer(byteLength);
  var dataView = new DataView(arrayBuffer);
  encodeGLTFSync(gltf, dataView, byteOffset, options);
  return arrayBuffer;
}

var VERSION = "2.3.13" ;
var glbLoader = {
  id: 'glb',
  name: 'GLB',
  version: VERSION,
  extensions: ['glb'],
  mimeTypes: ['model/gltf-binary'],
  binary: true,
  parse: function () {
    var _parse = _asyncToGenerator(regenerator.mark(function _callee(arrayBuffer, options) {
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", parseSync(arrayBuffer, options));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function parse(_x, _x2) {
      return _parse.apply(this, arguments);
    }

    return parse;
  }(),
  parseSync: parseSync,
  options: {
    glb: {
      strict: false
    }
  }
};

function parseSync(arrayBuffer, options) {
  var _options$byteOffset = options.byteOffset,
      byteOffset = _options$byteOffset === void 0 ? 0 : _options$byteOffset;
  var glb = {};
  parseGLBSync(glb, arrayBuffer, byteOffset, options);
  return glb;
}

var glbWriter = {
  name: 'GLB',
  extensions: ['glb'],
  mimeTypes: ['model/gltf-binary'],
  encodeSync: encodeSync,
  binary: true,
  options: {
    glb: {}
  }
};

function encodeSync(glb, options) {
  var _options$byteOffset = options.byteOffset,
      byteOffset = _options$byteOffset === void 0 ? 0 : _options$byteOffset;
  var byteLength = encodeGLBSync(glb, null, byteOffset, options);
  var arrayBuffer = new ArrayBuffer(byteLength);
  var dataView = new DataView(arrayBuffer);
  encodeGLBSync(glb, dataView, byteOffset, options);
  return arrayBuffer;
}

var GLBBuilder = function () {
  function GLBBuilder() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck$1(this, GLBBuilder);

    this.byteLength = 0;
    this.json = {
      buffers: [{
        byteLength: 0
      }],
      bufferViews: [],
      accessors: [],
      images: [],
      meshes: []
    };
    this.sourceBuffers = [];
    this.log = options.log || console;
  }

  _createClass$1(GLBBuilder, [{
    key: "getByteLength",
    value: function getByteLength() {
      return this.byteLength;
    }
  }, {
    key: "isImage",
    value: function isImage$1(imageData) {
      return isImage(imageData);
    }
  }, {
    key: "encodeSync",
    value: function encodeSync() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.encodeAsGLB(options);
    }
  }, {
    key: "encodeAsGLB",
    value: function encodeAsGLB() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this._packBinaryChunk();

      if (options.magic) {
        console.warn('Custom glTF magic number no longer supported');
      }

      var glb = {
        version: 2,
        json: this.json,
        binary: this.arrayBuffer
      };
      var byteLength = encodeGLBSync(glb, null, 0, options);
      var glbArrayBuffer = new ArrayBuffer(byteLength);
      var dataView = new DataView(glbArrayBuffer);
      encodeGLBSync(glb, dataView, 0, options);
      return glbArrayBuffer;
    }
  }, {
    key: "addApplicationData",
    value: function addApplicationData(key, data) {
      this.json[key] = data;
      return this;
    }
  }, {
    key: "addBuffer",
    value: function addBuffer(sourceBuffer) {
      var accessor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        size: 3
      };
      var bufferViewIndex = this.addBufferView(sourceBuffer);
      var accessorDefaults = {
        size: accessor.size,
        componentType: getComponentTypeFromArray(sourceBuffer),
        count: Math.round(sourceBuffer.length / accessor.size)
      };
      return this.addAccessor(bufferViewIndex, Object.assign(accessorDefaults, accessor));
    }
  }, {
    key: "addBufferView",
    value: function addBufferView(buffer) {
      var byteLength = buffer.byteLength || buffer.length;
      this.json.bufferViews.push({
        buffer: 0,
        byteOffset: this.byteLength,
        byteLength: byteLength
      });
      this.byteLength += padTo4Bytes(byteLength);
      this.sourceBuffers.push(buffer);
      return this.json.bufferViews.length - 1;
    }
  }, {
    key: "addAccessor",
    value: function addAccessor(bufferViewIndex, accessor) {
      this.json.accessors.push({
        bufferView: bufferViewIndex,
        type: getAccessorTypeFromSize(accessor.size),
        componentType: accessor.componentType,
        count: accessor.count
      });
      return this.json.accessors.length - 1;
    }
  }, {
    key: "_pack",
    value: function _pack() {
      this._packBinaryChunk();

      return {
        arrayBuffer: this.arrayBuffer,
        json: this.json
      };
    }
  }, {
    key: "_packBinaryChunk",
    value: function _packBinaryChunk() {
      if (this.arrayBuffer) {
        return;
      }

      var totalByteLength = this.byteLength;
      var arrayBuffer = new ArrayBuffer(totalByteLength);
      var targetArray = new Uint8Array(arrayBuffer);
      var dstByteOffset = 0;

      for (var i = 0; i < this.sourceBuffers.length; i++) {
        var sourceBuffer = this.sourceBuffers[i];
        dstByteOffset = copyToArray(sourceBuffer, targetArray, dstByteOffset);
      }

      this.json.buffers[0].byteLength = totalByteLength;
      this.arrayBuffer = arrayBuffer;
      this.sourceBuffers = [];
    }
  }, {
    key: "_getInternalCounts",
    value: function _getInternalCounts() {
      return {
        buffers: this.json.buffers.length,
        bufferViews: this.json.bufferViews.length,
        accessors: this.json.accessors.length,
        images: this.json.images.length
      };
    }
  }]);

  return GLBBuilder;
}();

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  KHR_DRACO_MESH_COMPRESSION: KHR_DRACO_MESH_COMPRESSION,
  UBER_POINT_CLOUD_EXTENSION: UBER_POINT_CLOUD_EXTENSION,
  GLTFLoader: GLTFLoader,
  GLTFWriter: gltfWriter,
  GLBLoader: glbLoader,
  GLBWriter: glbWriter,
  GLTFScenegraph: GLTFScenegraph,
  postProcessGLTF: postProcessGLTF,
  GLBBuilder: GLBBuilder,
  encodeGLTFSync: encodeGLTFSync
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Camera = /*#__PURE__*/function () {
  function Camera(parameters) {
    _classCallCheck(this, Camera);

    this.position = clone$4([0, 0, 0]);
    this.target = clone$4([0, 0, 0]); // Fix forward vertical, can not calculate right by cross forward and up

    this.up = clone$4([0, 1, 0.00000001]);
    this.viewMatrix = create$6();
    this.projectionMatrix = create$6();
    this.projectionMatrixInverse = create$6();
    this.needUpdateViewMat = true;
    this.needUpdateProjMat = true;
    this.zoom = 1.0; // Carmera type:  OrthoCamera | PerspectiveCamera

    this.type = parameters.type !== undefined ? parameters.type : 'OrthoCamera';

    if (parameters.type === 'OrthoCamera') {
      this.left = parameters.left !== undefined ? parameters.left : -1;
      this.right = parameters.right !== undefined ? parameters.right : 1;
      this.top = parameters.top !== undefined ? parameters.top : 1;
      this.bottom = parameters.bottom !== undefined ? parameters.bottom : -1;
      this.near = parameters.near !== undefined ? parameters.near : -1;
      this.far = parameters.far !== undefined ? parameters.far : 1;
    } else if (parameters.type === 'PerspectiveCamera') {
      this.fov = parameters.fov !== undefined ? parameters.fov : 45;
      this.aspect = parameters.aspect !== undefined ? parameters.aspect : 1;
      this.near = parameters.near !== undefined ? parameters.near : 0.1;
      this.far = parameters.far !== undefined ? parameters.far : 1000;
    }

    this.updateProjectionMatrix();
  }
  /**
   * Set camera position
   * @param {x, y, z} point
   */


  _createClass(Camera, [{
    key: "setPosition",
    value: function setPosition(x, y, z) {
      this.position = clone$4([x, y, z]);
      this.updateViewMatrix();
    }
    /**
     * Set camera up direction
     * @param {x, y, z} point
     */

  }, {
    key: "setUp",
    value: function setUp(x, y, z) {
      this.up = clone$4([x, y, z]);
      this.updateViewMatrix();
    }
    /**
     * Set camera zoom
     * @param {Number} zoom
     */

  }, {
    key: "setZoom",
    value: function setZoom(zoom) {
      this.zoom = zoom;
      this.updateProjectionMatrix();
    }
    /**
     * Camera look at center point, update view matrix
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     */

  }, {
    key: "lookAt",
    value: function lookAt(x, y, z) {
      this.target = clone$4([x, y, z]);
      this.updateViewMatrix();
    }
  }, {
    key: "updateViewMatrix",
    value: function updateViewMatrix() {
      lookAt$1(this.viewMatrix, this.position, this.target, this.up);
      this.needUpdateViewMat = true;
    }
    /**
     * Update projection matrix and it's inverse
     */

  }, {
    key: "updateProjectionMatrix",
    value: function updateProjectionMatrix() {
      if (this.type === 'OrthoCamera') {
        var dx = (this.right - this.left) / (2 * this.zoom);
        var dy = (this.top - this.bottom) / (2 * this.zoom);
        var cx = (this.right + this.left) / 2;
        var cy = (this.top + this.bottom) / 2;
        ortho$1(this.projectionMatrix, cx - dx, cx + dx, cy - dy, cy + dy, this.near, this.far);
      } else if (this.type === 'PerspectiveCamera') {
        var fovRadians = toRadian(this.fov / this.zoom); // Math.PI * this.fov / 180

        perspective$1(this.projectionMatrix, fovRadians, this.aspect, this.near, this.far);
      }

      invert$2(this.projectionMatrixInverse, this.projectionMatrix);
      this.needUpdateProjMat = true;
    }
  }]);

  return Camera;
}();

var MouseBottons = {
  left: 0,
  middle: 1,
  right: 2
};
var DefaultOptions = {
  minZoom: 0.5,
  maxZoom: 10,
  zoomScale: 0.02,
  rotateSpeed: 0.8
}; // https://stackoverflow.com/questions/5527601/normalizing-mousewheel-speed-across-browsers?noredirect=1&lq=1

function normalizeWheelSpeed(event) {
  var normalized;

  if (event.wheelDelta) {
    normalized = event.wheelDelta % 120 === 0 ? event.wheelDelta / 120 : event.wheelDelta / 12;
  } else {
    var rawAmmount = event.deltaY ? event.deltaY : event.detail;
    normalized = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
  }

  return normalized;
}

var Control = /*#__PURE__*/function () {
  function Control(camera, canvasElem) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Control);

    this.camera = camera;
    this.canvasElem = canvasElem;
    this.options = _objectSpread2(_objectSpread2({}, DefaultOptions), options); // vertical rotate angle limits

    this.minPolarAngle = -Math.PI / 2;
    this.maxPolarAngle = Math.PI / 2; // horizontal rotate angle limits

    this.minAzimuthAngle = -Math.PI;
    this.maxAziumthAngle = Math.PI; // zoom limits
    // camera look at point
    // this.target = vec3.clone([0, 0, 0])

    this.rotateStart = null;
    this.rotateEnd = null;

    this.onMousedown = function (event) {
      event.preventDefault();

      switch (event.button) {
        case MouseBottons.left:
          _this.rotateStart = clone([event.clientX, event.clientY]);

          _this.canvasElem.addEventListener('mousemove', _this.onMousemove, false);

          _this.canvasElem.addEventListener('mouseup', _this.onMouseup, false);

          break;
      }
    };

    this.onMousemove = function (event) {
      _this.rotateEnd = clone([event.clientX, event.clientY]);
      var rotateDelta = sub(create$1(), _this.rotateEnd, _this.rotateStart);
      var _this$canvasElem = _this.canvasElem,
          clientHeight = _this$canvasElem.clientHeight,
          clientWidth = _this$canvasElem.clientWidth;
      var maxAziumthAngle = _this.maxAziumthAngle,
          minAzimuthAngle = _this.minAzimuthAngle,
          maxPolarAngle = _this.maxPolarAngle,
          minPolarAngle = _this.minPolarAngle;
      var speed = _this.options.rotateSpeed / _this.camera.zoom;
      var aziumAngle = speed * (maxAziumthAngle - minAzimuthAngle) * rotateDelta[0] / clientHeight;
      var polarAngle = speed * (maxPolarAngle - minPolarAngle) * rotateDelta[1] / clientWidth;
      var position = _this.camera.position;
      var R = distance$3(position, _this.camera.target);
      var theta = Math.atan2(position[2], position[0]) + aziumAngle;
      var phi = Math.asin(position[1] / R) + polarAngle;
      phi = Math.min(Math.max(phi, _this.minPolarAngle), _this.maxPolarAngle); // console.log('phi: ' + phi)
      // console.log('theta: ' + theta)
      // console.log('aziumAngle: ' + aziumAngle)

      var z = R * Math.cos(phi) * Math.sin(theta);
      var x = R * Math.cos(phi) * Math.cos(theta);
      var y = R * Math.sin(phi); // const rotateAziumPosition = vec3.rotateY(vec3.create(), this.camera.position, this.camera.target, aziumAngle)
      // const rotateAxis = vec3.normalize(vec3.create(), [rotateAziumPosition[2], 0, -rotateAziumPosition[0]])
      // const polarMatrix = mat4.fromRotation(mat4.create(), polarAngle, rotateAxis)
      // const rotatePolarPosition = vec3.transformMat4(vec3.create(), rotateAziumPosition, polarMatrix)

      _this.camera.setPosition(x, y, z);

      _this.rotateStart = clone(_this.rotateEnd);
    };

    this.onMouseup = function () {
      _this.canvasElem.removeEventListener('mousemove', _this.onMousemove, false);

      _this.canvasElem.removeEventListener('mouseup', _this.onMouseup, false);
    };

    this.onMousewheel = function (event) {
      event.preventDefault();
      event.stopPropagation();
      var _this$options = _this.options,
          minZoom = _this$options.minZoom,
          maxZoom = _this$options.maxZoom,
          zoomScale = _this$options.zoomScale;
      var delta = normalizeWheelSpeed(event);
      var zoom = _this.camera.zoom;
      zoom = Math.max(minZoom, Math.min(maxZoom, zoom * (1 + zoomScale * delta)));

      _this.camera.setZoom(zoom);
    };
  }

  _createClass(Control, [{
    key: "start",
    value: function start() {
      this.canvasElem.addEventListener('mousedown', this.onMousedown, false);
      this.canvasElem.addEventListener('wheel', this.onMousewheel, false);
      this.canvasElem.addEventListener('mouseleave', this.onMouseup, false);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.canvasElem.removeEventListener('mousedown', this.onMousedown, false);
      this.canvasElem.removeEventListener('wheel', this.onMousewheel, false);
      this.canvasElem.removeEventListener('mousemove', this.onMousemove, false);
      this.canvasElem.removeEventListener('mouseup', this.onMouseup, false);
      this.canvasElem.removeEventListener('mouseleave', this.onMouseup, false);
    }
  }]);

  return Control;
}();

var Light = /*#__PURE__*/function () {
  function Light(_ref) {
    var _ref$ambientColor = _ref.ambientColor,
        ambientColor = _ref$ambientColor === void 0 ? [1, 1, 1] : _ref$ambientColor,
        _ref$ambientIntensity = _ref.ambientIntensity,
        ambientIntensity = _ref$ambientIntensity === void 0 ? 1 : _ref$ambientIntensity,
        _ref$diffuseColor = _ref.diffuseColor,
        diffuseColor = _ref$diffuseColor === void 0 ? [1, 1, 1] : _ref$diffuseColor,
        _ref$diffuseIntensity = _ref.diffuseIntensity,
        diffuseIntensity = _ref$diffuseIntensity === void 0 ? 1 : _ref$diffuseIntensity,
        _ref$specularColor = _ref.specularColor,
        specularColor = _ref$specularColor === void 0 ? [1, 1, 1] : _ref$specularColor,
        _ref$specularIntensit = _ref.specularIntensity,
        specularIntensity = _ref$specularIntensit === void 0 ? 1 : _ref$specularIntensit,
        _ref$shininess = _ref.shininess,
        shininess = _ref$shininess === void 0 ? 16 : _ref$shininess,
        _ref$position = _ref.position,
        position = _ref$position === void 0 ? [0, 0, 0] : _ref$position;

    _classCallCheck(this, Light);

    this.ambientColor = clone$4(ambientColor);
    this.ambientIntensity = ambientIntensity;
    this.diffuseColor = clone$4(diffuseColor);
    this.diffuseIntensity = diffuseIntensity;
    this.specularColor = clone$4(specularColor);
    this.specularIntensity = specularIntensity;
    this.shininess = shininess;
    this.position = clone$4(position);
    this.needUpdatePosition = true; // if (parameters.mode === undefined || parameters.mode === 'Standard') {
    // } else if (parameters.mode === 'Sunlight') {
    //   this.needUpdateDirection = true
    // }
  }

  _createClass(Light, [{
    key: "setPosition",
    value: function setPosition(x, y, z) {
      this.position = clone$4([x, y, z]);
      this.needUpdatePosition = true;
    }
  }]);

  return Light;
}();

/**
 * webgl utils library
 *
 */
function getGLContext(canvas) {
  var names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
  var context = null;

  for (var i = 0, len = names.length; i < len; i++) {
    try {
      context = canvas.getContext(names[i]);
    } catch (error) {}

    if (context) {
      break;
    }
  }

  return context;
}
function loadShader(gl, type, source) {
  var shader = gl.createShader(type);

  try {
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log("Failed to compile shader".concat(gl.getShaderInfoLog(shader)));
      gl.deleteShader(shader);
      return null;
    }
  } catch (error) {
    console.log(error);
  }

  return shader;
}
function createProgram(gl, vShaderSource, fShaderSource) {
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vShaderSource);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fShaderSource);

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  var program = gl.createProgram();

  if (!program) {
    return null;
  } // Attach the shader objects；Link the program object


  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program); // Check the result of linking

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log("Failed to link program: ".concat(gl.getProgramInfoLog(program)));
    gl.deleteProgram(program); // gl.deleteShader(fragmentShader);
    // gl.deleteShader(vertexShader);

    return null;
  }

  return program;
}

function getUniforms(gl, program) {
  var uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  var uniforms = {};

  for (var i = 0; i < uniformCount; i++) {
    var info = gl.getActiveUniform(program, i);
    uniforms[info.name] = gl.getUniformLocation(program, info.name);
  }

  return uniforms;
}

function getAttributes(gl, program) {
  var attribCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  var attributes = {};

  for (var i = 0; i < attribCount; i++) {
    var info = gl.getActiveAttrib(program, i);
    attributes[info.name] = gl.getAttribLocation(program, info.name);
  }

  return attributes;
}

var Program = /*#__PURE__*/function () {
  // cachedAttributes;
  // #cachedUniforms;
  function Program(gl, vShaderSource, fShaderSource) {
    _classCallCheck(this, Program);

    // this.glVertexShader = WebGLUtils.loadShader(vertexShader)
    // this.glFragmentShader = WebGLUtils.loadShader(fragmentShader)
    this.gl = gl;
    this.program = createProgram(gl, vShaderSource, fShaderSource);
    this.gl.useProgram(this.program);
  }

  _createClass(Program, [{
    key: "uniforms",
    get: function get() {
      if (this.cachedUniforms === undefined) {
        this.cachedUniforms = getUniforms(this.gl, this.program);
      }

      return this.cachedUniforms;
    }
  }, {
    key: "attributes",
    get: function get() {
      if (this.cachedAttributes === undefined) {
        this.cachedAttributes = getAttributes(this.gl, this.program);
      }

      return this.cachedAttributes;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.gl.deleteProgram(this.program);
      this.program = undefined;
      this.cachedAttributes = undefined;
      this.cachedUniforms = undefined;
    }
  }]);

  return Program;
}();

var Renderer = /*#__PURE__*/function () {
  function Renderer(_ref) {
    var canvas = _ref.canvas,
        camera = _ref.camera,
        light = _ref.light,
        vertexShader = _ref.vertexShader,
        fragmentShader = _ref.fragmentShader;

    _classCallCheck(this, Renderer);

    this.geometries = [];
    this.canvas = canvas;
    this.camera = camera;
    this.light = light; // Get the device pixel ratio, falling back to 1.

    var dpr = Math.max(window.devicePixelRatio || 2, 2); // Get the size of the canvas in CSS pixels.

    var rect = this.canvas.getBoundingClientRect(); // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.

    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.gl = getGLContext(this.canvas);
    this.gl.getExtension('OES_standard_derivatives');
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE); // this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    this.updateShader(vertexShader, fragmentShader);

    if (this.light) {
      this.updateLightProgram();
    }
  }

  _createClass(Renderer, [{
    key: "updateShader",
    value: function updateShader(vertexShader, fragmentShader) {
      this.program = new Program(this.gl, vertexShader, fragmentShader);
    }
  }, {
    key: "updateLightProgram",
    value: function updateLightProgram() {
      var _this$gl4;

      var uniforms = this.program.uniforms;
      var _this$light = this.light,
          ambientColor = _this$light.ambientColor,
          ambientIntensity = _this$light.ambientIntensity,
          diffuseColor = _this$light.diffuseColor,
          diffuseIntensity = _this$light.diffuseIntensity,
          specularColor = _this$light.specularColor,
          specularIntensity = _this$light.specularIntensity,
          shininess = _this$light.shininess;

      if (uniforms.u_ambientProduct) {
        var _this$gl;

        var ambient = scale$5(create$5(), ambientColor, ambientIntensity);

        (_this$gl = this.gl).uniform3f.apply(_this$gl, [uniforms.u_ambientProduct].concat(_toConsumableArray(ambient)));
      }

      if (uniforms.u_diffuseProduct) {
        var _this$gl2;

        var diffuse = scale$5(create$5(), diffuseColor, diffuseIntensity);

        (_this$gl2 = this.gl).uniform3f.apply(_this$gl2, [uniforms.u_diffuseProduct].concat(_toConsumableArray(diffuse)));
      }

      if (uniforms.u_specularProduct) {
        var _this$gl3;

        var specular = scale$5(create$5(), specularColor, specularIntensity);

        (_this$gl3 = this.gl).uniform3f.apply(_this$gl3, [uniforms.u_specularProduct].concat(_toConsumableArray(specular)));

        this.gl.uniform1f(uniforms.u_shininess, shininess);
      }

      (_this$gl4 = this.gl).uniform3f.apply(_this$gl4, [uniforms.u_lightPosition].concat(_toConsumableArray(this.light.position)));
    }
  }, {
    key: "addGeometry",
    value: function addGeometry(geometry) {
      // if (gridTile instanceof GridTile) {
      //   this.geometries.push(gridTile)
      // }
      this.geometries.push(geometry);
    }
  }, {
    key: "clearGeometry",
    value: function clearGeometry() {
      this.geometries = [];
    }
  }, {
    key: "render",
    value: function render() {
      var _gl = this.gl;

      _gl.clearColor(1.0, 1.0, 1.0, 1.0);

      _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);

      var uniforms = this.program.uniforms; // _gl.uniform3f(uniform.u_lightPosition, ...this.light.position)
      // _gl.uniformMatrix4fv(uniform.u_projectionMatrix, false, this.camera.projectionMatrix)
      // _gl.uniformMatrix4fv(uniform.u_viewMatrix, false, this.camera.viewMatrix)

      if (this.camera.needUpdateViewMat) {
        _gl.uniformMatrix4fv(uniforms.u_viewMatrix, false, this.camera.viewMatrix);

        this.camera.needUpdateViewMat = false;
      }

      if (this.camera.needUpdateProjMat) {
        _gl.uniformMatrix4fv(uniforms.u_projectionMatrix, false, this.camera.projectionMatrix);

        this.camera.needUpdateProjMat = false;
      }

      if (this.light && this.light.needUpdatePosition) {
        _gl.uniform3f.apply(_gl, [uniforms.u_lightPosition].concat(_toConsumableArray(this.light.position)));

        this.light.needUpdatePosition = false;
      }

      if (this.light && this.light.needUpdateProgram) {
        this.updateLightProgram();
        this.light.needUpdateProgram = false;
      }

      for (var i = this.geometries.length - 1; i > -1; i--) {
        this.renderGeometry(this.geometries[i]);
      }
    }
  }, {
    key: "renderGeometry",
    value: function renderGeometry(geometry) {
      var _gl = this.gl;
      var programAttribs = this.program.attributes;
      var programUniforms = this.program.uniforms;
      var attributes = geometry.attributes;

      if (attributes.position && attributes.position.needUpdate) {
        attributes.position.buffer = _gl.createBuffer();

        _gl.bindBuffer(_gl.ARRAY_BUFFER, attributes.position.buffer);

        _gl.bufferData(_gl.ARRAY_BUFFER, attributes.position.array, _gl.STATIC_DRAW);

        _gl.enableVertexAttribArray(programAttribs.a_position);

        _gl.vertexAttribPointer(programAttribs.a_position, 3, _gl.FLOAT, false, 0, 0);

        attributes.position.needUpdate = false;
      }

      if (attributes.normal && attributes.normal.needUpdate) {
        attributes.normal.buffer = _gl.createBuffer();

        _gl.bindBuffer(_gl.ARRAY_BUFFER, attributes.normal.buffer);

        _gl.bufferData(_gl.ARRAY_BUFFER, attributes.normal.array, _gl.STATIC_DRAW);

        _gl.enableVertexAttribArray(programAttribs.a_normal);

        _gl.vertexAttribPointer(programAttribs.a_normal, 3, _gl.FLOAT, false, 0, 0);

        attributes.normal.needUpdate = false;
      }

      if (attributes.barycentric && attributes.barycentric.needUpdate) {
        attributes.barycentric.buffer = _gl.createBuffer();

        _gl.bindBuffer(_gl.ARRAY_BUFFER, attributes.barycentric.buffer);

        _gl.bufferData(_gl.ARRAY_BUFFER, attributes.barycentric.array, _gl.STATIC_DRAW);

        _gl.enableVertexAttribArray(programAttribs.a_barycentric);

        _gl.vertexAttribPointer(programAttribs.a_barycentric, 3, _gl.FLOAT, false, 0, 0);

        attributes.barycentric.needUpdate = false;
      } // if (!geometry.wireframe) {
      //   _gl.disableVertexAttribArray(programAttribs.a_barycentric);
      // }


      if (attributes.color && attributes.color.needUpdate) {
        attributes.color.buffer = _gl.createBuffer();

        _gl.bindBuffer(_gl.ARRAY_BUFFER, attributes.color.buffer);

        _gl.bufferData(_gl.ARRAY_BUFFER, attributes.color.array, _gl.STATIC_DRAW);

        _gl.enableVertexAttribArray(programAttribs.a_color);

        _gl.vertexAttribPointer(programAttribs.a_color, attributes.color.itemSize, _gl.FLOAT, false, 0, 0);

        attributes.color.needUpdate = false;
      }

      if (geometry.modelMatrix) {
        _gl.uniformMatrix4fv(programUniforms.u_modelMatrix, false, geometry.modelMatrix);
      } else {
        _gl.uniformMatrix4fv(programUniforms.u_modelMatrix, false, create$6());
      } // TRIANGLES LINE_STRIP


      _gl.drawArrays(_gl.TRIANGLES, 0, attributes.position.count);
    }
  }, {
    key: "renderOBJ",
    value: function renderOBJ(model, layout) {
      var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var gl = this.gl;
      var programAttribs = this.program.attributes;
      var programUniforms = this.program.uniforms;

      if (model.needUpdate) {
        model.mesh = {}; // Create the vertex buffer for this mesh

        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        var vertexData = model.makeBufferData(layout);
        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
        vertexBuffer.numItems = vertexData.numItems;
        vertexBuffer.layout = layout;
        model.mesh.vertexBuffer = vertexBuffer; // Create the index buffer for this mesh

        var indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        var indexData;
        var materialIndices = Object.values(model.materialIndices);

        if (materialIndices.length > 0) {
          indexData = model.makeIndexBufferDataForMaterials.apply(model, _toConsumableArray(materialIndices));
        } else {
          indexData = new Int16Array(model.indices);
          indexData.numItems = model.indices.length;
        }

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexData, gl.STATIC_DRAW);
        indexBuffer.numItems = indexData.numItems;
        model.mesh.indexBuffer = indexBuffer;
        model.needUpdate = false;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, model.mesh.vertexBuffer);

      for (var _i = 0, _Object$entries = Object.entries(attrs); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            attrName = _Object$entries$_i[0],
            layoutKey = _Object$entries$_i[1];

        var attriLocation = programAttribs[attrName];

        if (Number.isFinite(attriLocation) && attriLocation !== -1) {
          var attr = layout.attributeMap[layoutKey];
          gl.enableVertexAttribArray(attriLocation);
          gl.vertexAttribPointer(attriLocation, attr.size, gl[attr.type], attr.normalized, attr.stride, attr.offset);
        }
      }

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.mesh.indexBuffer);
      gl.uniformMatrix4fv(programUniforms.u_modelMatrix, false, create$6());
      gl.drawElements(gl.TRIANGLES, model.mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }
  }]);

  return Renderer;
}();

var BufferAttribute = /*#__PURE__*/function () {
  function BufferAttribute() {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var itemSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
    var normalized = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, BufferAttribute);

    this.array = array;
    this.itemSize = itemSize;
    this.normalized = normalized;
    this.count = this.array.length / itemSize;
    this.needUpdate = true;
    this.updateRange = {
      offset: 0,
      count: -1
    };
    this.offset = 0;
  }

  _createClass(BufferAttribute, [{
    key: "insertVec3",
    value: function insertVec3(vec3) {
      this.array[this.offset++] = vec3[0];
      this.array[this.offset++] = vec3[1];
      this.array[this.offset++] = vec3[2];
    }
  }]);

  return BufferAttribute;
}();

export { BufferAttribute, Camera, Control, Light, webglObjLoader_min$1 as OBJ, Program, Renderer, index$2 as glMatrix, index$1 as loadersCore, index as loadersGLTF, twglFull_module as twgl };
