import { dispatch } from '../third_party';
import EventList from './EventList';
import BaseEvent from './BaseEvent';

import InitAppEvent from './app/InitAppEvent';

import DragOverEvent from './dom/DragOverEvent';
import DropEvent from './dom/DropEvent';
import KeyDownEvent from './dom/KeyDownEvent';
import ResizeEvent from './dom/ResizeEvent';
import MessageEvent from './dom/MessageEvent';
import LoadFromHashEvent from './editor/LoadFromHashEvent';
import AutoSaveEvent from './editor/AutoSaveEvent';
import VREvent from './editor/VREvent';

import SetThemeEvent from './editor/SetThemeEvent';
import SetSceneEvent from './editor/SetSceneEvent';
import AddObjectEvent from './editor/AddObjectEvent';
import MoveObjectEvent from './editor/MoveObjectEvent';
import NameObjectEvent from './editor/NameObjectEvent';
import RemoveObjectEvent from './editor/RemoveObjectEvent';
import AddGeometryEvent from './editor/AddGeometryEvent';
import SetGeometryNameEvent from './editor/SetGeometryNameEvent';
import AddMaterialEvent from './editor/AddMaterialEvent';
import SetMaterialNameEvent from './editor/SetMaterialNameEvent';
import AddTextureEvent from './editor/AddTextureEvent';
import AddHelperEvent from './editor/AddHelperEvent';
import RemoveHelperEvent from './editor/RemoveHelperEvent';
import AddScriptEvent from './editor/AddScriptEvent';
import RemoveScriptEvent from './editor/RemoveScriptEvent';
import SelectEvent from './editor/SelectEvent';
import ClearEvent from './editor/ClearEvent';
import LoadEvent from './editor/LoadEvent';
import SaveEvent from './editor/SaveEvent';

import NewSceneEvent from './menu/scene/NewSceneEvent';
import LoadSceneEvent from './menu/scene/LoadSceneEvent';
import SaveSceneEvent from './menu/scene/SaveSceneEvent';
import PublishSceneEvent from './menu/scene/PublishSceneEvent';

/**
 * 事件执行器
 */
function EventDispatcher(app) {
    this.app = app;
    this.dispatch = dispatch.apply(dispatch, EventList);
    this.addDomEventListener();

    this.events = [
        // Application中的事件
        new DragOverEvent(this.app),
        new DropEvent(this.app),
        new KeyDownEvent(this.app),
        new ResizeEvent(this.app),
        //new MessageEvent(this.app),
        new LoadFromHashEvent(this.app),
        new AutoSaveEvent(this.app),
        new VREvent(this.app),
        new InitAppEvent(this.app),

        // Editor中的事件
        new SetThemeEvent(this.app),
        new SetSceneEvent(this.app),
        new AddObjectEvent(this.app),
        new MoveObjectEvent(this.app),
        new NameObjectEvent(this.app),
        new RemoveObjectEvent(this.app),
        new AddGeometryEvent(this.app),
        new SetGeometryNameEvent(this.app),
        new AddMaterialEvent(this.app),
        new SetMaterialNameEvent(this.app),
        new AddTextureEvent(this.app),
        new AddHelperEvent(this.app),
        new RemoveHelperEvent(this.app),
        new AddScriptEvent(this.app),
        new RemoveScriptEvent(this.app),
        new SelectEvent(this.app),
        new ClearEvent(this.app),
        new LoadEvent(this.app),
        new SaveEvent(this.app),

        // menubar中的事件
        new NewSceneEvent(this.app),
        new LoadSceneEvent(this.app),
        new SaveSceneEvent(this.app),
        new PublishSceneEvent(this.app),
    ];
}

EventDispatcher.prototype = Object.create(BaseEvent.prototype);
EventDispatcher.prototype.constructor = EventDispatcher;

/**
 * 启动
 */
EventDispatcher.prototype.start = function () {
    this.events.forEach(function (n) {
        n.start();
    });
};

/**
 * 停止
 */
EventDispatcher.prototype.stop = function () {
    this.events.forEach(function (n) {
        n.stop();
    });
};

/**
 * 执行事件
 * @param {*} eventName 
 * @param {*} _this 
 * @param {*} others 
 */
EventDispatcher.prototype.call = function (eventName, _this, ...others) {
    this.dispatch.call(eventName, _this, ...others);
};

/**
 * 监听事件
 * @param {*} eventName 
 * @param {*} callback 
 */
EventDispatcher.prototype.on = function (eventName, callback) {
    this.dispatch.on(eventName, callback);
};

/**
 * 监听dom事件
 */
EventDispatcher.prototype.addDomEventListener = function () {
    var container = this.app.container;
    container.addEventListener('click', (event) => {
        this.dispatch.call('click', this, event);
    });
    container.addEventListener('contextmenu', (event) => {
        this.dispatch.call('contextmenu', this, event);
        event.preventDefault();
        return false;
    });
    container.addEventListener('dblclick', (event) => {
        this.dispatch.call('dblclick', this, event);
    });
    document.addEventListener('keydown', (event) => {
        this.dispatch.call('keydown', this, event);
    });
    document.addEventListener('keyup', (event) => {
        this.dispatch.call('keyup', this, event);
    });
    container.addEventListener('mousedown', (event) => {
        this.dispatch.call('mousedown', this, event);
    });
    container.addEventListener('mousemove', (event) => {
        this.dispatch.call('mousemove', this, event);
    });
    container.addEventListener('mouseup', (event) => {
        this.dispatch.call('mouseup', this, event);
    });
    container.addEventListener('mousewheel', (event) => {
        this.dispatch.call('mousewheel', this, event);
    });
    window.addEventListener('resize', (event) => {
        this.dispatch.call('resize', this, event);
    }, false);
    document.addEventListener('dragover', (event) => {
        this.dispatch.call('dragover', this, event);
    }, false);
    document.addEventListener('drop', (event) => {
        this.dispatch.call('drop', this, event);
    }, false);
    window.addEventListener('message', (event) => {
        this.dispatch.call('message', this, event);
    });
};

export default EventDispatcher;