define(function() {

  var ShaderCompiler = function() {

  };

  ShaderCompiler.prototype.compileProgram = function(gl, vertexShaderSource, fragmentShaderSource) {
    var vertexShader = this.compileShader(
      gl, vertexShaderSource, gl.VERTEX_SHADER
    );
    var fragmentShader = this.compileShader(
      gl, fragmentShaderSource, gl.FRAGMENT_SHADER
    );

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    return program;
  };

  ShaderCompiler.prototype.compileShader = function(gl, source, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    } else {
      console.log(gl.getShaderInfoLog(shader));
      return null;
    }
  };

  ShaderCompiler.prototype.bindUniform2f = function(gl, program, name, x, y) {
    var location = gl.getUniformLocation(program, name);
    gl.uniform2f(location, x, y);
  };

  ShaderCompiler.prototype.bindRect = function(gl, program, name, xMin, xMax, yMin, yMax) {

    var positionLocation = gl.getAttribLocation(program, name);

    // Create a buffer and put a single clipspace rectangle in
    // it (2 triangles)
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            xMin, yMin,
            xMax, yMin,
            xMin, yMax,
            xMin, yMax,
            xMax, yMin,
            xMax, yMax]),
        gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  };

  return ShaderCompiler;

});
