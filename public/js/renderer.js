define(function() {
  var Renderer = Class.extend({
    init: function(app, canvas) {
      this.app = app;
      this.canvas = canvas;

      this.context = (canvas && canvas.getContext) ? canvas.getContext("2d") : null;
    },

    renderFrame: function() {
      this.paintItBlack();
      this.drawSimulation(this.app.simulation);
    },

    paintItBlack: function() {
      this.context.save();
        this.context.fillStyle = "#20201f";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.restore();
    },

    drawSimulation: function(simulation) {
      this.drawQuadtree(simulation.tree);
      this.drawRects(simulation.rects);
    },

    drawRects: function(rects) {
      _.each(rects, this.drawRect, this);
    },

    drawRect: function(rect) {
      var x = rect.x - rect.width / 2,
          y = rect.y - rect.height / 2;

      this.context.save();
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(x, y, rect.width, rect.height);
      this.context.restore();
    },

    drawQuadtree: function(tree) {
      this.drawNode(tree.root);
    },

    drawNode: function(node) {
      if (node.nodes.length) {
        _.each(node.nodes, this.drawNode, this);
      }

      this.context.save();
        this.context.strokeStyle = "#50b4a2";
        this.context.strokeRect(
          node._bounds.x,
          node._bounds.y,
          node._bounds.width,
          node._bounds.height
        );
      this.context.restore();
    }
  });

  return Renderer;
});