const g_canvas = document.getElementById("myCanvas");
const g_ctx = g_canvas.getContext("2d");

const entityManager = new EntityManager();

function updateSimulation(du) {

  if (Math.random() < 0.01) {
    entityManager.createRandomObstacle();
  }

  // random fyrir new power-up
  if (Math.floor(Math.random()*1000) < 200) {
    entityManager.createPowerUp();
  }

  entityManager.update(du);
}

function gatherInputs() {

}

let xOff = 0;
function renderSimulation(ctx) {
  const width = g_images.street1.width;
  ctx.save();
  ctx.translate(xOff, 0);
  ctx.drawImage(g_images.street1, 0, 0);
  ctx.drawImage(g_images.street2, width, 0);
  ctx.drawImage(g_images.street1, width * 2, 0);
  xOff -= 3;
  xOff %= width * 2;
  ctx.restore();
  entityManager.render(ctx);
}

const g_images = {};

async function preload() {
  const requiredImages = {
    playerStand: '../megaman.png',
    playerJump: '../megamanjump.png',
    street1: '../street1.png',
    street2: '../street2.png'
  };

  const keys = Object.keys(requiredImages);

  try {
    for (let i = 0; i < keys.length; i++) {
      const image = await loadImage(requiredImages[keys[i]]);
      g_images[keys[i]] = image;
    }
    entityManager.createPlayer({
      jump: g_images.playerJump,
      stand: g_images.playerStand,
    });
    main.init();
  } catch (e) {
    console.error(e);
  }
}

preload();
