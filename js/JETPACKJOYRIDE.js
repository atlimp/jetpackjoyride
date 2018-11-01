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

function requestPreloads() {
  const requiredImages = {
    player: '../megaman.png',
  };

  imagesPreload(requiredImages, g_images, () => {
    entityManager.createPlayer(g_images.player)
    main.init();
  });
}

requestPreloads();
