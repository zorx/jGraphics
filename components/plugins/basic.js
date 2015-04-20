// Register basic canvas elements with their respective args
var elements = [{
    name: "circle",
    args: [{cx:0}, {cy:0}, {r:5}],
    position: {x: "cx", y: "cy"}
  }, {
    name: "rect",
    args: [{x:0}, {y:0}, {width:100}, {height:100}],
    position: {x: "x", y: "y"}
  }, {
    name: "ellipse",
    args: [{cx:0}, {cy:0}, {rx:10}, {ry:10}],
    position: {x: "cx", y: "cy"}
  }, {
    name: "image",
    args: [{"xlink:href":"#"}, {x:0}, {y:10}],
    position: {x: "x", y: "y"}
  }, {
    name: "line",
    args: [{x1:0}, {y1:0}, {x2:10}, {y2:10}],
    position: {x: ["x1", "x2"], y: ["y1", "y2"]}
  }];

// Register each element through a plugin
$.each(elements, function(index, element) {
  $.jGraphics.registerPlugin({
    name: element.name,
    position: element.position,

    // How to construct future plugin instance
    construct: function (args) {
      var self = this;
      // Arguments is an array, not an object (accessed by indexes)
      $.each(element.args, function (index, defaultArgs) {
        $.each(defaultArgs, function(argName, argDefaultValue) {
          // Assigning object default attributes value (~extend)
          self[argName] = args[index] || element.args[index][argName];
        });
      });
    },

    // Display element instance
    render: function (instance) {
      // Create SVG element
      var svgElement = document.createElementNS("http://www.w3.org/2000/svg", element.name);

      // Assign arguments as attributes (position, size, etc.)
      $.each(instance.args, function(index, value) {
        svgElement.setAttribute(index, value);
      });

      // Apply attributes to DOM
      instance.attr(instance.args);

      // Returning SVG element to display
      return svgElement;
    }
  });
});
