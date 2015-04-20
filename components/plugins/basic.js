/* register Basic Elements with default args */
var listElements = [
  {name:"circle", args:[{cx:0}, {cy:0}, {r:5}], path: {x: "cx", y: "cy"}},
  {name:"rect", args:[{x:0}, {y:0}, {width:100}, {height:100}], path: {x: "x", y: "y"}},
  {name:"ellipse", args:[{cx:0}, {cy:0}, {rx:10}, {ry:10}], path: {x: "cx", y: "cy"}},
  {name:"image", args:[{"xlink:href":"#"}, {x:0}, {y:10}], path: {x: "x", y: "y"}},
  {name:"line", args:[{x1:0}, {y1:0}, {x2:10}, {y2:10}], path: {x: ["x1", "x2"], y: ["y1", "y2"]}}
];

$.each(listElements, function(key, element) {
  // Circle plugin (based on Arc)
  $.jGraphics.registerPlugin({
    name: element.name,
    path: element.path,
    construct: function(args) {
      var self = this;
      $.each(element.args, function (key, defaultArgs) {
        $.each(defaultArgs, function(argName, argDefaultValue) {
          self[argName] = args[key] || element.args[key][argName];
        });
      });
    },
    render: function(self) {
      var svgElement = document.createElementNS("http://www.w3.org/2000/svg",element.name);
      $.each(self.args, function(key, value) {
        svgElement.setAttribute(key, value);
      });
      self.attr(self.args);
      return svgElement;
    }
  });
});
