

export default class Phisic {}

const AmmoLib = await new Promise(resolve => {
  const script = document.createElement("script");
  // Usa o build WASM do Ammo.js do pacote do Three.js
  script.src = "./js/modules/r153/examples/jsm/libs/ammo.wasm.js";

  // Quando o script terminar de carregar, chama Ammo() e resolve a Promise
  script.onload = () => Ammo().then(resolve);
  document.body.appendChild(script);
});

