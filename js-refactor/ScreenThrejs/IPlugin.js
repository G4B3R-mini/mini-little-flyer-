export class IPlugin {
    constructor(obj){
        this.object = obj
        if (!obj) throw new Error("model not found");

        
    }
    update(){
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
        this.plugins.forEach(plugin => plugin.update(...p))
    }
register(plugin, sceneManager){
    this.plugins.push(plugin)
    if (plugin.object) {
        sceneManager.add(plugin.object)
    }
}
}
