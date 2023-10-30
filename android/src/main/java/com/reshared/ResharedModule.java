package com.reshared;

import android.app.Activity;
import android.app.Application;
import android.content.Intent;

import android.os.Build;
import androidx.annotation.RequiresApi;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ResharedModule extends ReactContextBaseJavaModule {
  public final String Log_Tag = "Reshared";

  private final ReactApplicationContext reactContext;
  private ResharedHelper resharedHelper;

  public ResharedModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    Application applicationContext = (Application) reactContext.getApplicationContext();
    resharedHelper = new ResharedHelper(applicationContext);
  }

  protected void onNewIntent(Intent intent) {
    Activity mActivity = getCurrentActivity();
    if(mActivity == null) { return; }
    mActivity.setIntent(intent);
  }

  @RequiresApi(api = Build.VERSION_CODES.KITKAT)
  @ReactMethod
  public void getFileNames(Promise promise){
    Activity mActivity = getCurrentActivity();
    if(mActivity == null) { return; }
    Intent intent = mActivity.getIntent();
    resharedHelper.sendFileNames(reactContext, intent, promise);
    mActivity.setIntent(null);
  }

  @ReactMethod
  public void clearFileNames(){
    Activity mActivity = getCurrentActivity();
    if(mActivity == null) { return; }
    Intent intent = mActivity.getIntent();
    resharedHelper.clearFileNames(intent);
  }

  @Override
  public String getName() {
    return "Reshared";
  }
}
