package com.fantasyapp

import android.os.Bundle // ✅ Add this
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "FantasyApp"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  // ✅ ADD this to fix white screen and RNSScreen issue
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }
}
