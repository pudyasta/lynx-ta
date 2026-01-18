package com.lynx.levl

import android.app.Activity
import android.content.Context
import android.os.Bundle
import com.lynx.levl.helper.getDeviceType
import com.lynx.tasm.LynxView
import com.lynx.tasm.LynxViewBuilder
import com.lynx.xelement.XElementBehaviors

val Context.appName: String
    get() = applicationInfo.loadLabel(packageManager).toString()

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val lynxView: LynxView = buildLynxView()
        setContentView(lynxView)

        lynxView.renderTemplateUrl("main.lynx.bundle", "")

        val deviceType = getDeviceType(application)

        val props = mapOf<String, Any>(
            "appTheme" to "light ",
            "appName" to applicationContext.appName,
            "device" to {
                "os" to "android"
                "type" to deviceType
                "deviceModel" to android.os.Build.MODEL
            },
        )
        lynxView.updateGlobalProps(props)
    }

    private fun buildLynxView(): LynxView {
        val viewBuilder: LynxViewBuilder = LynxViewBuilder()
        viewBuilder.addBehaviors(XElementBehaviors().create())
        viewBuilder.setTemplateProvider(DemoTemplateProvider(this))
        return viewBuilder.build(this)
    }
}