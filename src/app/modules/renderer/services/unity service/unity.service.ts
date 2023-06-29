import { Injectable } from '@angular/core';
import * as toggleRotationJSON from '../../../../../configurations/toggle rotation payload.json';

/**
 * Service to handle Unity-Angular communications and data exchange
 */
@Injectable({
  providedIn: 'root',
})
export class UnityService {
  /**
   * Unity instance
   */
  private _unityInstance: any;

  /**
   * Constructor
   * @constructor
   * @ignore
   */
  constructor() {}

  /**
   * Unity instance getter
   */
  get unityInstance() {
    return this._unityInstance;
  }

  /**
   * Unity instance setter
   */
  set unityInstance(instance: any) {
    this._unityInstance = instance;
  }

  /**
   * Handle sending data/commands to Unity instance
   * @returns {void}
   */
  public toggleRotation(): void {
    this._unityInstance.SendMessage(
      'Cube',
      'ToggleRotation',
      JSON.stringify(toggleRotationJSON)
    );
  }

  /**
   * Toggle Unity instance fullscreen mode
   * @returns {void}
   */
  public toggleFullScreen(): void {
    this._unityInstance.SetFullscreen();
  }

  /**
   * Register window event listeners to retrieve data/commands from Unity instance
   * @returns {void}
   */
  public registerWindowEventListeners(): void {
    window.addEventListener('send', ((customEvent: CustomEvent) => {
      this._sendCallback(customEvent);
    }) as EventListener);
  }

  /**
   * Handle custom event from Unity
   * @param {CustomEvent} customEvent intercepted custom event
   * @returns {void}
   */
  private _sendCallback(customEvent: CustomEvent): void {
    console.log('log', JSON.parse(customEvent.detail));
  }
}
