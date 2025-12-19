
export class TrackControler {
  constructor(settings = {}) {
    // Configurações padrão
    this.settings = Object.assign(
      {
        runway: {
          Width: 3,
          Height: 0.2,
          Length: 20,
          color: 0x404040,
          roughness: 0.8,
          position: { x: 0, y: -2, z: -5 },
          receiveShadow: true,
        },

        line: {
          Width: 0.3,
          Height: 0.21,
          Length: 1.5,
          Spacing: 2.5,
          color: 0xffff00,
        },
      },
      settings
    );
  }
  get() {
    return this.settings;
  }
}