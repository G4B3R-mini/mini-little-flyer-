import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


export class IModelLoaderAdapter {


  /**
   * 
   * @param {string} file  url ou path do modelo
   * @param {Function} callback callback que recebe o modelo
   * @returns  
   */
  load(file, callback=(model)=>{}) {
    throw new Error("Method 'load' not implemented");
  }
  /**
   * 
   * @param {String} file  url ou path do modelo
   * @returns {Promise<any>}
   */
  loadAsync(file) {
    throw new Error("Method 'loadAsync' not implemented");
  }
}


/**
 * @param {GLTFLoader, } loader
 * @param { IModelLoaderSync} sync
 * @param { IModelLoaderAsync} async
 */
export class ModelLoaderAdapter extends IModelLoaderAdapter {
  constructor(
loader ,
sync=new ModelLoaderSync(),
async=new ModelLoaderAsync()
  ) {
    super();
    this.loader = loader
    this.syncLoaderManager = sync
    this.asyncLoaderManager = async 
  }
  load(file, callback = (model) => {}) {
this.syncLoaderManager.load(file, this.loader, callback)
  }

 async loadAsync(file){
    return this.asyncLoaderManager.load(file, this.loader)
  }
}



export class IModelLoaderAsync{
      /**
   * @param {string} file
   * @returns {Promise<any>}
   */
    load(){
         throw new Error("Method 'load' not implemented");
    }
} 

export class IModelLoaderSync{
      /**
   * @param {string} file
   * @returns {Promise<any>}
   */
    load(){
         throw new Error("Method 'load' not implemented");
    }
} 


// ============== MUDAR ===========================
// MAISD DE UMA RESPONSABILIDADE: chama o load, chama o callback, logica de erro

export class ModelLoaderSync extends IModelLoaderSync{
  load(file, glbLoader, callback = (gltf) => {}) {
    glbLoader.load(
      file,
      function (gltf) {
        callback(gltf);
      },
      undefined,
      function (err) {
        console.error("Ocorreu um erro ao carregar o modelo.", err);
      }
    );
  }
}
export class ModelLoaderAsync extends IModelLoaderAsync {
  async load(file, glbLoader) {
    return await glbLoader.loadAsync(file);
  }
}


export class IFileMode{
  get(){
      throw new Error("Method 'get' not implemented");
  }
}


export class FileModel {
  constructor(file) {
    this.file = file;
  }
  get() {
    return this.file;
  }
}
