export class Renderer {
    constructor(canvas, scene){
    
        const screen = canvas;
        this. ctx = screen.getContext('2d')
        this.scene = scene.setContext(this.ctx)

    }

     render(){
        this.clear()
    
    for (const objectId in this.scene.objects){
        const player = this.scene.objects[objectId].update()
    }}
    clear(){
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0,0,10,10)
    }
}


export class Scene{
    constructor(){
this.objects = {}
    }
    setContext(ctx){
        this.ctx = ctx
        return this
    }
    add(id, object){

        this.objects[id] = object.create(this.ctx)

    }

}