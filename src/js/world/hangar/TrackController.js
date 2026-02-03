
export class TrackController {
  constructor(settings = {}) {
    // Configurações padrão
    this.settings = Object.assign(
      {
        runway: {
          Width: 3,
          Height: 0.2,
          Length: 35,
          color: 0x404040,
          roughness: 0.8,
          position: { x: 0, y: 0, z: -12.5 },
          receiveShadow: true,
        },

        line: {
          Width: 0.3,
          Height: 0.21,
          Length: 1.5,
          Spacing: 2.8,
          color: 0xffff00,
          PositionX: 0,
          PositionY: 0.01,
          PositionZ: 21.5,
          lines: 10,
          count: 15,
        },
      },
      settings
    );
  }
  get() {
    return this.settings;
  }
}