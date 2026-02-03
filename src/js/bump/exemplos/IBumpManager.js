

export class IBumpManager{
constructor(){

}

}
export class IBumpConfig{

}


export class IBumpObject{


}


export class IBumpGhost{}

export class IBumpGhostLst{
}

export class IBumpRigidBody{

}

export class IBumpRigidBodyLst{
    add(rigidBody){
        throw new Error("method 'add' not implemented");
    }
    notify(){
        throw new Error("method 'notify' not implemented");
    }
    
}

export class IBumpShape{
    
}


