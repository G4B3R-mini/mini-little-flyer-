import * as THREE from "three";

/**
 * A utility class for creating and managing Three.js lighting in a scene.
 * Provides ambient and directional lighting with customizable styles and a callback mechanism.
 *
 * @class Light
 * @example
 * // Basic usage with default settings
 * const light = new Light((ambient, directional) => {
 *   scene.add(ambient);
 *   scene.add(directional);
 * });
 *
 * @example
 * // Custom styling
 * const customLight = new Light(
 *   (ambient, directional) => {
 *     scene.add(ambient);
 *     scene.add(directional);
 *   },
 *   {
 *     ambientLight: { COLOR: 0x404040 },
 *     directionalLight: { COLOR: 0xffffff }
 *   }
 * );
 */
export class Light {
    /**
     * Creates a new Light instance with ambient and directional lighting.
     *
     * @param {Function} [callback=(ambientLight, directionalLight) => {}] - Callback function executed after lights are created.
     *   Receives the ambient and directional light objects as parameters. Typically used to add lights to the scene.
     * @param {Object} [style] - Style configuration for the lights
     * @param {Object} [style.ambientLight] - Ambient light configuration
     * @param {number} [style.ambientLight.COLOR=0xffffff] - Hexadecimal color value for ambient light
     * @param {Object} [style.directionalLight] - Directional light configuration
     * @param {number} [style.directionalLight.COLOR=0xffffff] - Hexadecimal color value for directional light
     */
    constructor(
        callback = (ambientLight, directionalLight) => {},
        style = {
            ambientLight: { COLOR: 0xffffff },
            directionalLight: { COLOR: null, POSITION: null }
        }
    ) {
        /**
         * Ambient light that provides uniform lighting from all directions.
         * @type {THREE.AmbientLight}
         */
        this.ambientLight = new THREE.AmbientLight(
            style.ambientLight.COLOR,
            0.6
        );
        //  scene.add(ambientLight);

        // NOVO: Adiciona uma luz direcional para simular o sol e criar sombras.
        /**
         * Directional light that simulates sunlight and enables shadow casting.
         * Positioned at (5, 10, 7.5) to provide natural lighting angle.
         * @type {THREE.DirectionalLight}
         */
        this.directionalLight = new THREE.DirectionalLight(
            style.directionalLight.COLOR || 0xffffff,
            1.0
        ); // Cor branca, intensidade 100%
        this.directionalLight.position.set(
            style.directionalLight.POSITION || 5,
            10,
            7.5
        ); // Posição da luz

        // chama a funcao callback
        callback(this.ambientLight, this.directionalLight);
    }

    /**
     * Returns the ambient light object.
     *
     * @returns {THREE.AmbientLight} The ambient light instance
     */
    getAmbientLight() {
        return this.ambientLight;
    }

    /**
     * Returns the directional light object.
     *
     * @returns {THREE.DirectionalLight} The directional light instance
     */
    getDirectionalLight() {
        return this.directionalLight;
    }
    target(object) {
        this.directionalLight.target = object;
        this.ambientLight.target = object
    }
}
