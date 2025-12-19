import * as THREE from "three";

class Move {
    constructor(speed = 0.1, moveVector = new THREE.Vector3(0, 0, 0)) {
        this.speed = speed;
        this.moveVector = moveVector;
    }
    joyUpdate(x, y) {
        // stickData = { xPosition, yPosition, x, y, cardinalDirection }
        this.moveVector.x = x; // -1 (esquerda) até 1 (direita)
        this.moveVector.z = y; // -1 (frente) até 1 (trás)
    }
    updateX(player) {
        this.moveVector.z = 0;
        this.updateXZ(player);
    }
    updateZ(player) {
        this.moveVector.x = 0;
        this.updateXZ(player);
    }
    updateXZ(player) {
        // Normaliza vetor (assim 8 direções funcionam bem)
        let dir = new THREE.Vector3(this.moveVector.x, 0, -this.moveVector.z);
        if (dir.length() > 0) {
            dir.normalize();
            player.position.add(dir.multiplyScalar(this.speed));
        }
    }
}
export default Move;
