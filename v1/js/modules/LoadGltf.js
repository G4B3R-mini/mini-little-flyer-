import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class LoadGltf {
    constructor(
        url = "./model/retsu_unohana_bleach_mobile.glb",
        callback = gltf => {}
    ) {
        const glbLoader = new GLTFLoader();
        glbLoader.load(
            url,
            function (gltf) {
                callback(gltf);
                // model = gltf.scene; // É uma boa prática pegar a cena diretamente
                // model.position.set(0, 0, 0);
                // scene.add(model);
                // console.log("Modelo carregado com sucesso!", gltf);
            },
            undefined,
            function (err) {
                console.error("Ocorreu um erro ao carregar o modelo.", err);
            }
        );
    }
}
