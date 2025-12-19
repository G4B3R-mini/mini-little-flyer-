export class IsolatedButton {
    constructor(buttonId, onPress, onRelease) {
        this.button = document.getElementById(buttonId);
        this.pressed = false;
        this.touchId = null;
        this.onPress = onPress;
        this.onRelease = onRelease;
                                                         
        // Estilos para efeitos visuais
        this.button.style.transition = "all 0.1s ease";
        this.button.style.cursor = "pointer";

        // Eventos de toque
        this.button.addEventListener("touchstart", e =>
            this.handleTouchStart(e)
        );
        document.addEventListener("touchend", e => this.handleTouchEnd(e));

        // Eventos de mouse
        this.button.addEventListener("mousedown", e => this.handleMouseDown(e));
        document.addEventListener("mouseup", e => this.handleMouseUp(e));

        // Efeito hover
        this.button.addEventListener("mouseenter", () => this.addHoverEffect());
        this.button.addEventListener("mouseleave", () =>
            this.removeHoverEffect()
        );
    }

    addHoverEffect() {
        if (!this.pressed) {
            this.button.style.filter = "brightness(1.1)";
            this.button.style.transform = "scale(1.02)";
        }
    }

    removeHoverEffect() {
        if (!this.pressed) {
            this.button.style.filter = "brightness(1)";
            this.button.style.transform = "scale(1)";
        }
    }

    addPressEffect() {
        this.button.style.transform = "scale(0.95)";
        this.button.style.filter = "brightness(0.9)";
        this.button.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.3)";
    }

    removePressEffect() {
        this.button.style.transform = "scale(1)";
        this.button.style.filter = "brightness(1)";
        this.button.style.boxShadow = "";
    }

    handleTouchStart(e) {
        e.preventDefault();
        if (!this.pressed) {
            this.pressed = true;
            this.touchId = e.touches[0].identifier;
            this.addPressEffect();
            this.onPress?.();
        }
    }

    handleTouchEnd(e) {
        for (let touch of e.changedTouches) {
            if (touch.identifier === this.touchId) {
                this.pressed = false;
                this.touchId = null;
                this.removePressEffect();
                this.onRelease?.();
                break;
            }
        }
    }

    handleMouseDown(e) {
        if (!this.pressed) {
            this.pressed = true;
            this.addPressEffect();
            this.onPress?.();
        }
    }

    handleMouseUp(e) {
        if (this.pressed) {
            this.pressed = false;
            this.removePressEffect();
            this.onRelease?.();
        }
    }

    isPressed() {
        return this.pressed;
    }
}
