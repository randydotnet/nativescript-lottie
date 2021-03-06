/**********************************************************************************
* (c) 2017, Brad Martin.
* Licensed under the MIT license.
*
* Version 1.0.0                                           bradwaynemartin@gmail.com
**********************************************************************************/
"use strict";

import { View, Property } from "tns-core-modules/ui/content-view";
import { LottieViewBase, srcProperty, loopProperty, autoPlayProperty } from "./nativescript-lottie.common";

declare var com: any;
declare var android: any;
declare var org: any;

const LottieAnimationView: any = com.airbnb.lottie.LottieAnimationView;

export class LottieView extends LottieViewBase {

  public cacheStrategy: CacheStrategy;

  constructor() {
    super();
  }

  /// com.airbnb.lottie.LottieAnimationView
  get android(): any {
    return this.nativeView;
  }

  public createNativeView(): View {
    let nativeView = new LottieAnimationView(this._context);

    try {

      if (this.src) {
        if (this.cacheStrategy) {
          nativeView.setAnimation(this.src, this.cacheStrategy);
        } else {
          nativeView.setAnimation(this.src);
        }
      } else {
        throw new Error("The src property is required.");
      }

      if (this.loop) {
        nativeView.loop(true);
      }

      if (this.autoPlay) {
        nativeView.playAnimation();
      }

    } catch (error) {
      console.log(error);
    }

    return nativeView;
  }

  // [srcProperty.setNative](src: string) {

  // }

  // [loopProperty.setNative](loop: boolean) {

  // }

  // [cacheStrategyProperty.setNative](cacheStrategy: CacheStrategy) {

  // }

  // [autoPlayProperty.setNative](autoPlay: boolean) {

  // }


  public playAnimation(): void {
    if (this.nativeView) {
      this.nativeView.playAnimation();
    }
  }


  public isAnimating(): boolean {
    let isAnimating = false;
    if (this.nativeView.isAnimating()) {
      isAnimating = true;
    }
    return isAnimating;
  }


  public setProgress(value): void {
    if (value) {
      this.nativeView.setProgress(value);
    }
  }


  public cancelAnimation(): void {
    if (this.nativeView) {
      this.nativeView.cancelAnimation();
    }
  }

}

const cacheStrategyProperty = new Property<LottieView, CacheStrategy>({
  name: "cacheStrategy"
});

cacheStrategyProperty.register(LottieView);

/**
 * Caching strategy for compositions that will be reused frequently.
 * Weak or Strong indicates the GC reference strength of the composition in the cache.
 */
export enum CacheStrategy {
  None = com.airbnb.lottie.LottieAnimationView.CacheStrategy.None,
  Weak = com.airbnb.lottie.LottieAnimationView.CacheStrategy.Weak,
  Strong = com.airbnb.lottie.LottieAnimationView.CacheStrategy.Strong
}
