(function($) {
  // drag Event
  $.jGraphics.registerAction({
    name: "draggable",
    fn: function() {
      var self = this;
      var axis = null;
      this.on('pointerdown', function(data) {
        axis = {
          x: data.offsetX,
          y: data.offsetY
        };
      });
      this.on('pointerup', function(data) {
        axis = null;
      });
      $(document).on('pointermove', function(data) {
        if (axis) {
          var objAxis = {};
          var oldAxis = axis;
          axis = {
            x: data.offsetX,
            y: data.offsetY
          }
          path = self.getPluginPath();
          if (path) {
          $.each(path.x, function(key, axisX) {
            objAxis[axisX] = self.attr(axisX) + (data.offsetX - oldAxis.x);
          })
          $.each(path.y, function(key, axisY) {
            objAxis[axisY] = self.attr(axisY) + (data.offsetY - oldAxis.y);
          })
          self.attr(objAxis);
        }
        }
      });
    }
  });
})(jQuery);
