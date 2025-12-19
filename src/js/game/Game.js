import { GameCamera, GameRenderer, GameScene, GameScreen, ScreenThreejsGame } from "../ScreenThrejs/ScreenThreejsGame.js";


export class Game extends ScreenThreejsGame{
    constructor(
            screen = new GameScreen(),
            sceneManager = new GameScene(),
            renderManager = new GameRenderer(),
            cameramanager = new GameCamera()
    ){
        super(screen, sceneManager, renderManager, cameramanager)

    }
}





