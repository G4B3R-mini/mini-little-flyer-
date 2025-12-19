import * as THREE from "three";

export class Ceu {
    constructor(scene) {
        // luz branca e reglexo no chao
        this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
        this.hemiLight.position.set(0, 200, 0);

        scene.add(this.hemiLight);
    }
}
