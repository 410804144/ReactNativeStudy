package com.reactnativestudy.module;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * 测试Module
 * @author chenkh
 * @date 2020-12-24
 */
public class TestModule extends ReactContextBaseJavaModule {

  public TestModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @NonNull
  @Override
  public String getName() {
    return "Test";
  }

  @ReactMethod
  public void testCallback(String text, Callback successCallback, Callback errorCallback) {
    if (null == text || "".equals(text)) {
      // 失败回调
      errorCallback.invoke(-1, "callback参数不能为空");
    } else {
      // 成功回调
      successCallback.invoke("callback接收到参数：" + text);
    }
  }

  @ReactMethod
  public void testPromise(String text, Promise promise) {
    if (null == text || "".equals(text)) {
      // 失败回调
      promise.reject("-1", "primise参数不能为空");
    } else {
      // 成功回调
      promise.resolve("promise接收到参数：" + text);
    }
  }
}
