import { ContainerElement } from "./element/containerElement";
import { BtnStartElement } from "./element/btnStartElement";
import { TitleElement } from "./element/titleElement";
import { SubTítuloElement } from "./element/subTitleElement";
import { UserInfoElement } from "./element/userInfoElement";

export class UIElementTypeInterface {
  constructor(name) {
    this.name = name;
    if (name === undefined) {
      throw new Error("UIElementType must have a name");
    }
  }
}

export class UIElementType extends UIElementTypeInterface {
  constructor(name) {
    super(name);
  }
}
export class UITYpeRoot extends UIElementType {
  constructor() {
    super("root");
  }
}

export class UIElementInterface {
  constructor(addElement, getElement) {
    this.addElementManager = addElement;
    this.getElement = getElement;
    this.el = null;
  }
  get() {
    throw new Error("get() must be implemented by subclasses");
  }

  addElement(el) {
    throw new Error("addElement() must be implemented by subclasses");
  }
}

export class IdUIElement extends UIElementInterface {
  constructor(
    id,
    addElement = new AddElement(),
    getElementById = new GetElementBYId()
  ) {
    super(addElement, getElementById);
    this.id = id;
  }
  get() {
    return this.getElementById.get(this.id);
  }
  addElement(el) {
    this.addElementManager.addElement(el, this);
  }
}

export class IGetElement {
  get(id) {
    throw new Error("get() must be implemented by subclasses");
  }
}
export class GetElementBYId extends IGetElement {
  get(id) {
    return document.getElementById(id);
  }
}

export class GetBodyElement extends IGetElement {
  constructor() {
    super();
  }
  get() {
    return document.body;
  }
}

export class Body extends UIElementInterface {
  constructor(
    addElement = new AddElement(),
    getElement = new GetBodyElement()
  ) {
    super(addElement, getElement);
  }
  get() {
    return this.getElement.get();
  }
  addElement(el) {
    this.addElementManager.addElement(el, this);
  }
}

export class Manager {
  constructor(factory = new UIElementFactory()) {
    this.factory = factory;
  }
  addElement(el, father) {
    const fatherElement = father ? father : "root";
    const fatherUIElement = this.factory.create(fatherElement);
    fatherUIElement.addElement(el);
  }
}

export class UIElementFactory {
  create(id) {
    switch (id) {
      case "root":
        return new Body();
      default:
        return new IdUIElement(id);
    }
  }
}

export class AddElement {
  addElement(el, parent) {
    parent.get().append(el.get());
  }
}

export class UIOrchestrator {
  constructor(uiCreator = new LobbyUICreater()) {
    this.uiCreator = uiCreator;
    this.title;
    this.subtitle;
    this.userInfo;
    this.startButton;
  }
  setupUIElements(fatherId) {
    const lobbyContainer = this.uiCreator
      .createLobbyContainer()
      .appendTo(fatherId);
    const lobbyConteinerId = lobbyContainer.getId();
    this.title = this.uiCreator.createTitleElement(
      "SKY RIDERS",
      lobbyConteinerId
    );
    this.subTitle = this.uiCreator.createSubtitleElement(
      "Prepare for Takeoff",
      lobbyConteinerId
    );
    this.userInfo = this.uiCreator.createUserInfo(
      "Ready to Fly",
      lobbyConteinerId
    );
    this.startButton = this.uiCreator.createStartButton(
      "START FLIGHT",
      lobbyConteinerId
    );
  }
}

export class LobbyUIOrchestrator {
  constructor(uiOrchestrator = new UIOrchestrator()) {
    this.uiOrchestrator = uiOrchestrator;
  }
  setupUIElements(fatherId) {
    this.uiOrchestrator.setupUIElements(fatherId);
  }
  getTitle() {
    return this.uiOrchestrator.title;
  }
  getSubTitle() {
    return this.uiOrchestrator.subTitle;
  }
  getUserInfo() {
    return this.uiOrchestrator.userInfo;
  }
  getStartButton() {
    return this.uiOrchestrator.startButton;
  }
}

export class LobbyUICreater {
  createLobbyContainer() {
    return new ContainerElement();
  }
  createTitleElement(title, fatherId) {
    return new TitleElement(title).appendTo(fatherId);
  }
  createStartButton(text, fatherId) {
    return new BtnStartElement(text).appendTo(fatherId);
  }
  createSubtitleElement(subTitle, fatherId) {
    return new SubTítuloElement(subTitle).appendTo(fatherId);
  }
  createUserInfo(userName, fatherId) {
    return new UserInfoElement(userName).appendTo(fatherId);
  }
}
