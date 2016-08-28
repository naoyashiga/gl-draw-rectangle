const gl = require('webgl-context')()
const canvas = document.body.appendChild(gl.canvas)

const app = require('canvas-loop')(canvas, {
  scale: 1
})

const glslify = require('glslify')
const vert = glslify('./index.vert')
const frag = glslify('./index.frag')

var shaderProgram

createShaders()
createVertices()
render()

// app.on('tick', render)

app.start()

function createShaders() {

  var vertexShader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vertexShader, vert)
  gl.compileShader(vertexShader)

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, frag)
  gl.compileShader(fragmentShader)

  shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)
  gl.useProgram(shaderProgram)
}

function createVertices() {
  var vertices = [
    0, 0, 0
  ];

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  var coords = gl.getAttribLocation(shaderProgram, "coords");
  gl.vertexAttribPointer(coords, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coords);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  var pointSize = gl.getAttribLocation(shaderProgram, "pointSize");
  gl.vertexAttrib1f(pointSize, 200);

  var color = gl.getUniformLocation(shaderProgram, "color");
  gl.uniform4f(color, 1, 1, 0, 1);
}

function render() {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.disable(gl.DEPTH_TEST)
  gl.disable(gl.CULL_FACE)

  gl.drawArrays(gl.POINTS, 0, 1);
}
