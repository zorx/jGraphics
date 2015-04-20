// Group plugin (allows actions on multiple elements as a whole)
$.jGraphics.registerPlugin({
  name: "group",

  construct: function (args) {
    this.list = args || [];
  },

  // Display element instance
  render: function (self) {
    // Create SVG element where all childrens are placed
    var group = document.createElementNS("http://www.w3.org/2000/svg", "g");

    // ???
    group.setAttribute("id", self.args.id);

    // We place all (existing) childrens in that element
    $.each(self.args.list, function(key, plugin){
      if ($.jGraphics.isInstance(plugin)) {
        $("#" + plugin.id).appendTo(group);
      }
    });

    return group;
  }
})
