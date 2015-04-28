(function($) {
  // drag Event
  $.jGraphics.registerAction({
    name: "draggable",
    fn: function() {
      var self = this;
      var axis = null;
      this.on('pointerdown', function(self, data) {
        axis = {
          x: data.pageX,
          y: data.pageY
        };
      });
      this.on('pointerup', function(self, data) {
        axis = null;
      });
      $(document).on('pointermove', function(data) {
        if (axis) {
          var objAxis = {};
          var oldAxis = axis;
          axis = {
            x: data.pageX,
            y: data.pageY
          }

          var followChildren = function(plugin) {
            $.each(plugin.args.list, function(index, jGPlug) {
              if (jGPlug.getPluginName() === "group") {
                followChildrens(jGPlug);
              } else {
                moveAxis(jGPlug, jGPlug.getPluginPosition());
              }
            });
          }

          var moveAxis = function(plugin, position) {
            if (position) {
              $.each(position.x, function(key, axisX) {
                objAxis[axisX] = plugin.attr(axisX) + (data.pageX - oldAxis.x);
              })
              $.each(position.y, function(key, axisY) {
                objAxis[axisY] = plugin.attr(axisY) + (data.pageY - oldAxis.y);
              })
              plugin.attr(objAxis);
            }
          }

          if (self.getPluginName() === "group") {
            followChildren(self);
          }else{
            moveAxis(self, self.getPluginPosition());
          }
        }
      });
    }
  });
})(jQuery);
