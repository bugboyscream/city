
let hydra, hydraCanvas;
hydraCanvas = document.createElement("canvas");
hydraCanvas.width = 1920;
hydraCanvas.height = 1080;
hydraCanvas.id = "hydraCanvas";
document.querySelector("a-assets").appendChild(hydraCanvas);

hydra = new Hydra({
  canvas: hydraCanvas,
  enableStreamCapture: false,
  detectAudio: false,
  width: 1920,
  height: 1080,
});


//shape(200,0.1,0).scale(0.5,0.5).repeat(20,20).scrollY(0,-0.1).rotate(0,0.1).add(src(o0).color(1,0,0).scrollX(0.001),0.9).out()

osc(100, 0.02, 1.1)
.mult(osc(10,10,()=>Math.sin(time)*3).saturate(3).kaleid(200))
    .kaleid(1)
    .color(14, 3, 27)
    .rotate(0, 1)
    .scale(2)
      .out()
 
let delta = 0;

// https://github.com/aframevr/aframe/issues/3936
AFRAME.registerComponent("canvas-updater", {
  dependencies: ["geometry", "material"],

  tick: function() {
    var el = this.el;
    var material;

    material = el.getObject3D("mesh").material;
    if (!material.map) {
      return;
    }
    material.map.needsUpdate = true;
  }
});


AFRAME.registerComponent("aframe-init", {
  init: function() {
    document.querySelector("a-torus-knot").setAttribute("canvas-updater", "");
    document.querySelector("a-torus-knot").setAttribute("material", "src:#hydraCanvas");
  },
   tick: function(time, deltaTime) {
    delta += deltaTime;
  }
});
