import * as THREE from "three";



/**
 * @class IPlugin
 * @classdesc Interface for creating plugins that can be registered with the PluginManager.
 */
export class IPlugin {
    constructor(obj){
        this.object = obj
        if (!obj) throw new Error("model not found");

        
    }
    /**
     * Method to be implemented by subclasses to define plugin behavior.
     * @param {...any} p - Parameters passed to the update method.
     */
    update(...p){
        throw new Error("Method úpdate' not implemented");
        
    }
}



export class PluginManager {
    constructor(observer=new PluginObserver()){
        this.observer = observer
    }
    notify(...p){
        this.observer.notify(...p)
    }
register(plugin, sceneManager){
   this.observer.register(plugin, sceneManager)
}

}


export class PluginObserver{
        constructor(){
        this.plugins = []
    }
    notify(...p){
        for (const plugin of this.plugins){
            plugin.update(...p)
        }
    }
register(plugin, sceneManager){

    this.plugins.push(plugin)
    if (plugin.object instanceof THREE.Object3D){ 
        sceneManager.add(plugin.object)
    }
}
}
