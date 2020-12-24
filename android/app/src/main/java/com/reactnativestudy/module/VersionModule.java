package com.reactnativestudy.module;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * 获取版本号Module
 * @author chenkh
 * @date 2020-12-23
 */
public class VersionModule extends ReactContextBaseJavaModule {

  public VersionModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @NonNull
  @Override
  public String getName() {
    return "AppVersion";
  }

  @ReactMethod
  public void getAppVersion(Callback successCallback, Callback failureCallback) {
    try {
      PackageInfo info = getPackageInfo();
      if (null != info) {
        successCallback.invoke(info.versionName);
      } else {
        failureCallback.invoke(-1, "获取版本号失败");
      }
    } catch (Exception e) {
      e.printStackTrace();
      failureCallback.invoke(-2, "获取版本号失败");
    }
  }

  /**
   * 获取APP信息
   *
   * @return APP信息
   */
  private PackageInfo getPackageInfo() {
    PackageManager manager = getReactApplicationContext().getPackageManager();
    try {
      return manager.getPackageInfo(getReactApplicationContext().getPackageName(), 0);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }
}
