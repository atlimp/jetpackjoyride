const g_canvas = document.getElementById("myCanvas");
const g_ctx = g_canvas.getContext("2d");

const entityManager = new EntityManager();

function updateSimulation(du) {
  entityManager.update(du);
}

function gatherInputs() {

}

function renderSimulation(ctx) {
  entityManager.render(ctx);
}

const g_images = {};

async function preload() {
  const requiredImages = {
    playerStand: '../megaman.png',
    playerJump: '../megamanjump.png',
  };

  const keys = Object.keys(requiredImages);

  try {
    for (let i = 0; i < keys.length; i++) {
      const image = await loadImage(requiredImages[keys[i]]);
      g_images[keys[i]] = image;
    }
    entityManager.createPlayer({
      jump: new Sprite(g_images.playerJump),
      stand: new Sprite(g_images.playerStand),
    });
    main.init();
  } catch (e) {
    console.error(e);
  }
}

preload();
