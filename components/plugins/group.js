// Circle plugin (based on Arc)
$.jGraphics.registerPlugin({
  name: "group",
  construct: function(args) {
    this.list = args || [];
  },
  render: function(self) {
    var g = document.createElementNS("http://www.w3.org/2000/svg","g");
    g.setAttribute("id", self.args.id);
    $.each(self.args.list, function(key, plugin){
      if ($.jGraphics.isInstance(plugin)) {
        $("#"+plugin.id).appendTo(g);
      }
    });
    return g;
  }
})
