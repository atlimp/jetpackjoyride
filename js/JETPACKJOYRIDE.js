const g_canvas = document.getElementById("myCanvas");
const g_ctx = g_canvas.getContext("2d");

const entityManager = new EntityManager();
const background = new Background();

function updateSimulation(du) {

  if (Math.random() < 0.01) {
    entityManager.createRandomObstacle(du);
  }

  // random fyrir new power-up
  if (Math.random() < 0.01) {
    entityManager.createRandomPowerUp();
  }

  background.update(du);
  entityManager.update(du);
}

function gatherInputs() {

}

function renderSimulation(ctx) {
  background.render(ctx);
  entityManager.render(ctx);
}

const g_images = {};

function start() {
  entityManager.createPlayer({
    jump: g_images.playerJump,
    stand: g_images.playerStand
  });

  background.setImages([
    g_images.street1,
    g_images.street2
  ]);

  main.init();
}

async function preload() {
  const requiredImages = {
    playerJump: '../img/megamanjump.png',
    playerStand: '../img/megaman.png',
    street1: '../img/street1.png',
    street2: '../img/street2.png',
    car1: '../img/bill1.png',
    car2: '../img/bill2.png',
    car3: '../img/bill3.png',
    car4: '../img/bill4.png',
  };

  const keys = Object.keys(requiredImages);

  try {
    for (let i = 0; i < keys.length; i++) {
      const image = await loadImage(requiredImages[keys[i]]);
      g_images[keys[i]] = image;
    }

    start();
  } catch (e) {
    console.error(e);
  }
}

preload();
