const g_canvas = document.getElementById("myCanvas");
const g_ctx = g_canvas.getContext("2d");

const entityManager = new EntityManager();
const countManager = new CounterManager();
const background1 = new Background(-1);
const background2 = new Background(-2);
const menu = new Menu();

const achievement = new Achievement();

const g_startTimer = 50*60;

// Global speed multiplier, simplifies speeding everything up
let g_speedMult = 1;

const TOGGLE_SPATIAL = keyCode('0');
const TOGGLE_MENU = 27; // Escape
let USE_SPATIAL = false;


function updateSimulation(du) {

  if (eatKey(TOGGLE_SPATIAL)) USE_SPATIAL = !USE_SPATIAL;


  if (Math.random() < 0.01) {
    entityManager.createRandomObstacle(du);
  }

  // random fyrir new power-up
  if (Math.floor(Math.random() * 10000) < 20) {
    entityManager.createRandomPowerUp();
  }

  achievement.update();
  background1.update(du);
  background2.update(du);
  entityManager.update(du);
  countManager.update(du);
}

function gatherInputs() {

}

function renderSimulation(ctx) {
  background1.render(ctx);
  background2.render(ctx);
  entityManager.render(ctx);
  countManager.render(ctx);
  achievement.render(ctx);

  if (USE_SPATIAL) spatialManager.render(ctx);
  if (useMenu){
    menu.render(ctx);
  } 
}

const g_images = {};


// Initial function after images have been loaded
function start() {
  entityManager.createPlayer();

  countManager.createCounter();
  
  background1.setImages([
    g_images.mountain,
  ]);

  background2.setImages([
    g_images.backtrans1,
    g_images.backtrans2,
    g_images.backtrans3,
    g_images.backtrans4,
  ]);

  main.init();
}

(async function preload() {
  const requiredImages = {
    playerJump: 'img/megamanjump.png',
    playerStand: 'img/megaman.png',
    backtrans1: 'img/background/backtrans1.png',
    backtrans2: 'img/background/backtrans2.png',
    backtrans3: 'img/background/backtrans3.png',
    backtrans4: 'img/background/backtrans4.png',
    mountain: 'img/background/mountain.jpg',
    car1: 'img/car/bill1.png',
    car2: 'img/car/bill2.png',
    car3: 'img/car/bill3.png',
    car4: 'img/car/bill4.png',
    monstertruck: 'img/car/monstertruck.png',
    bird: 'img/bird/bird.png',
    rocket: 'img/rocket.png',
    bjor1: 'img/beer/einstok.png',
    bjor2: 'img/beer/kaldi.png',
    bullet: 'img/bullet/bullet.png',
    gasoline: 'img/icons/gasoline.png',
    jetpack: 'img/icons/jetpack.png'
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
})();
