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

          var followChildrens = function(plugin) {
            $.each(plugin.args.list, function(index, jGPlug) {
              if (jGPlug.getPluginName() === "group") {
                followChildrens(jGPlug);
              } else {
                moveAxis(jGPlug, jGPlug.getPluginPath());
              }
            });
          }

          var moveAxis = function(plugin, path) {
            if (path) {
              $.each(path.x, function(key, axisX) {
                objAxis[axisX] = plugin.attr(axisX) + (data.offsetX - oldAxis.x);
              })
              $.each(path.y, function(key, axisY) {
                objAxis[axisY] = plugin.attr(axisY) + (data.offsetY - oldAxis.y);
              })
              plugin.attr(objAxis);
            }
          }

          if (self.getPluginName() === "group") {
            followChildrens(self);
          }else{
            moveAxis(self, self.getPluginPath());
          }
        }
      });
    }
  });
})(jQuery);
