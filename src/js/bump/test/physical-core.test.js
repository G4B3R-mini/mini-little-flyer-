// Teste básico para o módulo Physic (physical-core.js)
// Para rodar: use um runner como Jest ou adapte para seu ambiente

import Physic from '../physical-core.js';

describe('Physic', () => {
  it('deve criar uma instância corretamente', async () => {
    const instance = new Physic();
    expect(instance).toBeInstanceOf(Physic);
    expect(instance.AmmoLib).toBeNull();
    expect(instance.physicsWorld).toBeNull();
    expect(Array.isArray(instance.rigidBodies)).toBe(true);
  });

  it('deve lançar erro se tentar criar corpo rígido sem inicializar', () => {
    const instance = new Physic();
    expect(() => instance.createRigidBody({}, {}, 1)).toThrow();
  });

  // Testes de métodos async e integração com Ammo.js exigem ambiente com DOM e script de Ammo
  // Exemplo de mock ou skip para ambiente Node puro
});


