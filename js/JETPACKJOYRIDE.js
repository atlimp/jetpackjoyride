const g_canvas = document.getElementById("myCanvas");
const g_ctx = g_canvas.getContext("2d");

let entityManager;
let countManager;
let background1;
let background2;
let menu;
let themesong;


let g_quit = false;

const achievement = new Achievement();

const g_startTimer = 50*60;


// Global speed multiplier, simplifies speeding everything up
let g_speedMult = 1;
let g_timeSpeedMult = 1;

const TOGGLE_SPATIAL = keyCode('0');
const TOGGLE_MENU = 27; // Escape

const TOGGLE_MUTE = keyCode('M');
let MUTED = false;
let USE_SPATIAL = false;


function updateSimulation(du) {
  const counter = countManager.counters[0].minutes - 49;
  g_timeSpeedMult = util.map(counter, 1, 10, 1, 3);

  if (eatKey(TOGGLE_SPATIAL)) USE_SPATIAL = !USE_SPATIAL;

  if (Math.random() < counter * 0.01) {
    entityManager.createRandomObstacle();
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
const g_audio = {
  horn1: 'audio/car-horn-hectic.wav',
  horn2: 'audio/car-horn-short.wav',
  pop: 'audio/pop.flac',
  scream: 'audio/scream-no.wav',
  seagull: 'audio/seagull.ogg',
  rocket: 'audio/woosh.mp3',
  theme: 'audio/theme.mp3',
  gun: 'audio/gun.wav',
  deadBird: 'audio/deadBird.wav',
  deadCar: 'audio/deadcar.wav'
};

function initVariables() {
  entityManager = new EntityManager();
  spatialManager.reset();
  countManager = new CounterManager();
  background1 = new Background(-1);
  background2 = new Background(-2);
  menu = new Menu();
}

function initialStart() {
  initVariables();
  menu.setText('Jetpack Joyride!');
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



// Initial function after images have been loaded
function start() {
  if (!themesong) themesong = util.playAudio(g_audio.theme, 1, true);
  initVariables();
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
    jetpack: 'img/icons/jetpack.png',
  };

  const keys = Object.keys(requiredImages);

  try {
    for (let i = 0; i < keys.length; i++) {
      const image = await loadImage(requiredImages[keys[i]]);
      g_images[keys[i]] = image;
    }

    initialStart();
  } catch (e) {
    console.error(e);
  }
})();
