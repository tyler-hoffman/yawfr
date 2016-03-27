define([
    'shaderCompiler',
    'text!shaders/vertex-shader',
    'text!shaders/fragment-shader'
  ], function(ShaderCompiler, vertextShader, fragmentShader) {

    var App = function(canvas) {
      var gl = canvas.getContext('webgl'),
          compiler = new ShaderCompiler(),
          program = compiler.compileProgram(gl, vertextShader, fragmentShader);

          gl.useProgram(program);

      // look up where the vertex data needs to go.
      var positionLocation = gl.getAttribLocation(program, 'a_position');
      var xMin = -1.0,
          xMax = 1.0,
          yMin = -1.0,
          yMax = 1.0;

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

      // draw
      gl.drawArrays(gl.TRIANGLES, 0, 6);

    };

    return App;
});
