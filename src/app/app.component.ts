import { BrowserPlatformLocation } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { UnityService } from './modules/renderer/services/unity service/unity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '3DRendererUnity';

  @ViewChild('unityView') unityView: any = null;
  baseUrl: string = 'http://localhost:4200/';
  project: string = window.location.hash.replace('#', '');

  /**
   * Constructor
   * @param {BrowserPlatformLocation} browserPlatformLocation encapsulates all calls to DOM APIs
   * @constructor
   * @ignore
   */
  constructor(
    browserPlatformLocation: BrowserPlatformLocation,
    private _unityService: UnityService
  ) {
    const location: Location = (browserPlatformLocation as any)._location;
    this.baseUrl =
      location.origin + location.pathname.replace('index.html', '');
  }

  /**
   * Load project
   * @params {string} name
   * @returns {void}
   */
  load(name: string): void {
    this.project = name;
    this.unityView.loadProject(`${this.baseUrl}assets/${name}/${name}.json`);
  }

  /**
   * Send message to Unity application
   * @param {string} objectName
   * @param {string} methodName
   * @param {any} messageValue
   * @returns {void}
   */
  send(objectName: string, methodName: string, messageValue?: any): void {
    this.unityView.sendMessageToUnity(objectName, methodName, messageValue);
  }

  public toggleFullScreen(): void {
    this._unityService.toggleFullScreen();
  }

  public toggleRotation(): void {
    this._unityService.toggleRotation();
  }
}
