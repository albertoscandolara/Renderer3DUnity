import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { COMPRESSION_FORMATS } from '../../enums/compression formats';
import { UnityDemoConfig } from '../../models/unity config.dto';
import { PATHS } from '../../enums/paths';
import { Observable, Subscription, catchError, from, of, tap } from 'rxjs';
import {
  unityCanvas,
  unityContainer,
  unityLoadingBar,
  unityProgressBar,
} from '../../configurations/unity-selectors';
import { UnityService } from '../../services/unity service/unity.service';

@Component({
  selector: 'unity',
  templateUrl: './unity.component.html',
  styleUrls: ['./unity.component.scss'],
})
export class AppUnityComponent implements AfterViewInit, OnDestroy {
  static _unityContainerSelector: string = unityContainer;
  static _unityCanvasSelector: string = unityCanvas;
  static _unityLoadingBarSelector: string = unityLoadingBar;
  static _unityProgressBarSelector: string = unityProgressBar;

  private _unityInstanceSubscription!: Subscription;

  get unityContainerSelector(): string {
    return AppUnityComponent._unityContainerSelector;
  }

  get unityCanvasSelector(): string {
    return AppUnityComponent._unityCanvasSelector;
  }

  get unityLoadingBarSelector(): string {
    return AppUnityComponent._unityLoadingBarSelector;
  }

  get unityProgressBarSelector(): string {
    return AppUnityComponent._unityProgressBarSelector;
  }

  /**
   * Constructor
   * @constructor
   * @ignore
   */
  constructor(private _unityService: UnityService) {}

  /**
   * ngOnDestroy hook
   */
  ngOnDestroy(): void {
    this._unityInstanceSubscription?.unsubscribe();
  }

  /**
   * ngOnInit hook
   */
  async ngAfterViewInit() {
    const buildUrl: string = PATHS.UNITY_APP_CUBE;
    const compressionFormat: string = COMPRESSION_FORMATS.NONE;
    const config: UnityDemoConfig = {
      dataUrl: `${buildUrl}/Build.data${compressionFormat}`,
      frameworkUrl: `${buildUrl}/Build.framework.js${compressionFormat}`,
      codeUrl: `${buildUrl}/Build.wasm${compressionFormat}`,
      streamingAssetsUrl: 'StreamingAssets',
      companyName: 'Arcoda',
      productName: 'UnityRenderer',
      productVersion: '0.1',
      devicePixelRatio: 0,
    };

    const container =
      document.querySelector(`#${this.unityContainerSelector}`) ||
      new Element();
    const canvas: HTMLElement =
      document.querySelector(`#${this.unityCanvasSelector}`) ||
      new HTMLElement();
    const loadingBar: HTMLElement =
      document.querySelector(`#${this.unityLoadingBarSelector}`) ||
      new HTMLElement();
    const progressBarFull: HTMLElement =
      document.querySelector(`#${this.unityProgressBarSelector}`) ||
      new HTMLElement();
    // const mobileWarning: HTMLElement =
    //   document.querySelector('#unity-mobile-warning') || new HTMLElement();

    // if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    //   container.className = 'unity-mobile';
    //   config.devicePixelRatio = 1;
    //   mobileWarning.style.display = 'block';
    //   setTimeout(() => {
    //     mobileWarning.style.display = 'none';
    //   }, 5000);
    // }
    loadingBar.style.display = 'block';

    const createUnityInstanceObservable: Observable<any> = from(
      createUnityInstance(canvas, config, (progress: any) => {
        progressBarFull.style.width = progress * 100 + '%';
      })
    );

    this._unityInstanceSubscription = createUnityInstanceObservable
      .pipe(
        tap((unityInstance: any) => {
          this._unityService.unityInstance = unityInstance;
          loadingBar.style.display = 'none';
        }),
        tap(() => {
          this._unityService.registerWindowEventListeners();
        }),
        catchError((error: any) => {
          alert(error.message);
          return of();
        })
      )
      .subscribe();
  }
}
