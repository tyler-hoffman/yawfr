define([
    'shaderCompiler',
    'text!shaders/vertex-shader',
    'text!shaders/fragment-shader'
  ], function(ShaderCompiler, vertextShader, fragmentShader) {

    var App = function(canvas) {

      var gl = canvas.getContext('webgl'),
          compiler = new ShaderCompiler(),
          program = compiler.compileProgram(gl, vertextShader, fragmentShader),
          x = 0.0,
          y = 0.0,
          m = 2.0,
          scrollSpeed =  0.004;;


      gl.useProgram(program);

      // look up where the vertex data needs to go.
      var ratio = 13 / 8;
      compiler.bindRect(gl, program, 'a_position', -1.0, 1.0, -ratio, ratio);

      // draw
      var redraw = function() {
        compiler.bindRect(gl, program, 'a_bounds', x - m, x + m, y - m, y + m);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      };
      redraw();

      canvas.addEventListener('mousewheel', function(e) {
        var zoom = e.ctrlKey;

        if (zoom) {
          m *= Math.pow(1.01, e.deltaY);
        } else {
          x += e.deltaX * scrollSpeed * m;
          y -= e.deltaY * scrollSpeed * m;
        }

        redraw();
        e.preventDefault();
      });

    };

    return App;
});
