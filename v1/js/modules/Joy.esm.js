/*
 * Name          : joy.js
 * @author       : Roberto D'Amico (Bobboteck)
 * Last modified : 09.06.2020
 * Revision      : 1.1.6
 *
 * Modification History:
 * Date         Version     Modified By     Description
 * 2021-12-21   2.0.0       Roberto D'Amico New version of the project that integrates the callback functions, while
 *                                          maintaining compatibility with previous versions. Fixed Issue #27 too,
 *                                          thanks to @artisticfox8 for the suggestion.
 * 2020-06-09   1.1.6       Roberto D'Amico Fixed Issue #10 and #11
 * 2020-04-20   1.1.5       Roberto D'Amico Correct: Two sticks in a row, thanks to @liamw9534 for the suggestion
 * 2020-04-03               Roberto D'Amico Correct: InternalRadius when change the size of canvas, thanks to
 *                                          @vanslipon for the suggestion
 * 2020-01-07   1.1.4       Roberto D'Amico Close #6 by implementing a new parameter to set the functionality of
 *                                          auto-return to 0 position
 * 2019-11-18   1.1.3       Roberto D'Amico Close #5 correct indication of East direction
 * 2019-11-12   1.1.2       Roberto D'Amico Removed Fix #4 incorrectly introduced and restored operation with touch
 *                                          devices
 * 2019-11-12   1.1.1       Roberto D'Amico Fixed Issue #4 - Now JoyStick work in any position in the page, not only
 *                                          at 0,0
 *
 * The MIT License (MIT)
 *
 *  This file is part of the JoyStick Project (https://github.com/bobboteck/JoyStick).
 *        Copyright (c) 2015 Roberto D'Amico (Bobboteck).
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// joy.js (versão para modules)
/*
 * 2025-09-25   2.1.0       Gabriel Marques   Versão adaptada para ES6 Modules
 *                                           - Conversão para `export class JoyStick`
 *                                           - Compatibilidade com import maps
 *                                           - Ajustes de parâmetros default
 */
export class JoyStick {
  constructor(container, parameters = {}, callback = StickStatus => {}) {
    this.StickStatus = {
      xPosition: 0,
      yPosition: 0,
      x: 0,
      y: 0,
      cardinalDirection: "C"
    };

    let title = parameters.title ?? "joystick";
    let width = parameters.width ?? 0;
    let height = parameters.height ?? 0;
    this.internalFillColor = parameters.internalFillColor ?? "#00AA00";
    this.internalLineWidth = parameters.internalLineWidth ?? 2;
    this.internalStrokeColor = parameters.internalStrokeColor ?? "#003300";
    this.externalLineWidth = parameters.externalLineWidth ?? 2;
    this.externalStrokeColor = parameters.externalStrokeColor ?? "#008000";
    this.autoReturnToCenter = parameters.autoReturnToCenter ?? true;

    this.callback = callback;

    // Container
    this.objContainer = document.getElementById(container);
    this.objContainer.style.touchAction = "none";

    // Canvas
    this.canvas = document.createElement("canvas");
    this.canvas.id = title;
    if (width === 0) width = this.objContainer.clientWidth;
    if (height === 0) height = this.objContainer.clientHeight;
    this.canvas.width = width;
    this.canvas.height = height;
    this.objContainer.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");

    // Propriedades internas
    this.pressed = 0;
    this.touchId = null;
    this.circumference = 2 * Math.PI;
    this.internalRadius =
      (this.canvas.width - (this.canvas.width / 2 + 10)) / 2;
    this.maxMoveStick = this.internalRadius + 5;
    this.externalRadius = this.internalRadius + 30;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
    this.directionHorizontalLimitPos = this.canvas.width / 10;
    this.directionHorizontalLimitNeg = this.directionHorizontalLimitPos * -1;
    this.directionVerticalLimitPos = this.canvas.height / 10;
    this.directionVerticalLimitNeg = this.directionVerticalLimitPos * -1;
    this.movedX = this.centerX;
    this.movedY = this.centerY;

    // Eventos
    if ("ontouchstart" in document.documentElement) {
      this.canvas.addEventListener(
        "touchstart",
        e => this.onTouchStart(e),
        false
      );
      document.addEventListener("touchmove", e => this.onTouchMove(e), false);
      document.addEventListener("touchend", e => this.onTouchEnd(e), false);
    } else {
      this.canvas.addEventListener(
        "mousedown",
        e => this.onMouseDown(e),
        false
      );
      document.addEventListener("mousemove", e => this.onMouseMove(e), false);
      document.addEventListener("mouseup", e => this.onMouseUp(e), false);
    }

    this.drawExternal();
    this.drawInternal();
  }

  // ==== métodos privados adaptados ====
  drawExternal() {
    this.context.beginPath();
    this.context.arc(
      this.centerX,
      this.centerY,
      this.externalRadius,
      0,
      this.circumference,
      false
    );
    this.context.lineWidth = this.externalLineWidth;
    this.context.strokeStyle = this.externalStrokeColor;
    this.context.stroke();
  }

  drawInternal() {
    this.context.beginPath();
    if (this.movedX < this.internalRadius) this.movedX = this.maxMoveStick;
    if (this.movedX + this.internalRadius > this.canvas.width)
      this.movedX = this.canvas.width - this.maxMoveStick;
    if (this.movedY < this.internalRadius) this.movedY = this.maxMoveStick;
    if (this.movedY + this.internalRadius > this.canvas.height)
      this.movedY = this.canvas.height - this.maxMoveStick;

    const radius = Math.abs(this.internalRadius || 0);
    if (radius === 0) return; // evita desenhar se o raio for 0

    this.context.arc(
      this.movedX,
      this.movedY,
      radius,
      0,
      this.circumference,
      false
    );

    let grd = this.context.createRadialGradient(
      this.centerX,
      this.centerY,
      5,
      this.centerX,
      this.centerY,
      200
    );
    grd.addColorStop(0, this.internalFillColor);
    grd.addColorStop(1, this.internalStrokeColor);
    this.context.fillStyle = grd;
    this.context.fill();
    this.context.lineWidth = this.internalLineWidth;
    this.context.strokeStyle = this.internalStrokeColor;
    this.context.stroke();
  }

  // ==== eventos touch ====
  onTouchStart(event) {
    this.pressed = 1;
    this.touchId = event.targetTouches[0].identifier;
  }

  onTouchMove(event) {
    if (this.pressed === 1 && event.targetTouches[0].target === this.canvas) {
      this.movedX = event.targetTouches[0].pageX;
      this.movedY = event.targetTouches[0].pageY;

      if (this.canvas.offsetParent.tagName.toUpperCase() === "BODY") {
        this.movedX -= this.canvas.offsetLeft;
        this.movedY -= this.canvas.offsetTop;
      } else {
        this.movedX -= this.canvas.offsetParent.offsetLeft;
        this.movedY -= this.canvas.offsetParent.offsetTop;
      }

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawExternal();
      this.drawInternal();

      this.StickStatus.xPosition = this.movedX;
      this.StickStatus.yPosition = this.movedY;
      this.StickStatus.x = (
        100 *
        ((this.movedX - this.centerX) / this.maxMoveStick)
      ).toFixed();
      this.StickStatus.y = (
        100 *
        ((this.movedY - this.centerY) / this.maxMoveStick) *
        -1
      ).toFixed();
      this.StickStatus.cardinalDirection = this.getCardinalDirection();
      this.callback(this.StickStatus);
    }
  }

  onTouchEnd(event) {
    if (event.changedTouches[0].identifier !== this.touchId) return;

    this.pressed = 0;
    if (this.autoReturnToCenter) {
      this.movedX = this.centerX;
      this.movedY = this.centerY;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawExternal();
    this.drawInternal();

    this.StickStatus.xPosition = this.movedX;
    this.StickStatus.yPosition = this.movedY;
    this.StickStatus.x = (
      100 *
      ((this.movedX - this.centerX) / this.maxMoveStick)
    ).toFixed();
    this.StickStatus.y = (
      100 *
      ((this.movedY - this.centerY) / this.maxMoveStick) *
      -1
    ).toFixed();
    this.StickStatus.cardinalDirection = this.getCardinalDirection();
    this.callback(this.StickStatus);
  }

  // ==== eventos mouse ====
  onMouseDown(event) {
    this.pressed = 1;
  }

  onMouseMove(event) {
    if (this.pressed === 1) {
      this.movedX = event.pageX;
      this.movedY = event.pageY;

      if (this.canvas.offsetParent.tagName.toUpperCase() === "BODY") {
        this.movedX -= this.canvas.offsetLeft;
        this.movedY -= this.canvas.offsetTop;
      } else {
        this.movedX -= this.canvas.offsetParent.offsetLeft;
        this.movedY -= this.canvas.offsetParent.offsetTop;
      }

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawExternal();
      this.drawInternal();

      this.StickStatus.xPosition = this.movedX;
      this.StickStatus.yPosition = this.movedY;
      this.StickStatus.x = (
        100 *
        ((this.movedX - this.centerX) / this.maxMoveStick)
      ).toFixed();
      this.StickStatus.y = (
        100 *
        ((this.movedY - this.centerY) / this.maxMoveStick) *
        -1
      ).toFixed();
      this.StickStatus.cardinalDirection = this.getCardinalDirection();
      this.callback(this.StickStatus);
    }
  }

  onMouseUp(event) {
    this.pressed = 0;
    if (this.autoReturnToCenter) {
      this.movedX = this.centerX;
      this.movedY = this.centerY;
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawExternal();
    this.drawInternal();

    this.StickStatus.xPosition = this.movedX;
    this.StickStatus.yPosition = this.movedY;
    this.StickStatus.x = (
      100 *
      ((this.movedX - this.centerX) / this.maxMoveStick)
    ).toFixed();
    this.StickStatus.y = (
      100 *
      ((this.movedY - this.centerY) / this.maxMoveStick) *
      -1
    ).toFixed();
    this.StickStatus.cardinalDirection = this.getCardinalDirection();
    this.callback(this.StickStatus);
  }

  // ==== cálculo direção ====
  getCardinalDirection() {
    let result = "";
    let orizontal = this.movedX - this.centerX;
    let vertical = this.movedY - this.centerY;

    if (
      vertical >= this.directionVerticalLimitNeg &&
      vertical <= this.directionVerticalLimitPos
    )
      result = "C";
    if (vertical < this.directionVerticalLimitNeg) result = "N";
    if (vertical > this.directionVerticalLimitPos) result = "S";

    if (orizontal < this.directionHorizontalLimitNeg)
      result = result === "C" ? "W" : result + "W";
    if (orizontal > this.directionHorizontalLimitPos)
      result = result === "C" ? "E" : result + "E";

    return result;
  }

  // ==== métodos públicos ====
  GetWidth() {
    return this.canvas.width;
  }
  GetHeight() {
    return this.canvas.height;
  }
  GetPosX() {
    return this.movedX;
  }
  GetPosY() {
    return this.movedY;
  }
  GetX() {
    return (100 * ((this.movedX - this.centerX) / this.maxMoveStick)).toFixed();
  }
  GetY() {
    return (
      100 *
      ((this.movedY - this.centerY) / this.maxMoveStick) *
      -1
    ).toFixed();
  }
  GetDir() {
    return this.getCardinalDirection();
  }
}
