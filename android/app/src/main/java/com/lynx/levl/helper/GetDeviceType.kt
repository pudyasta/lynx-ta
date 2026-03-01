package com.lynx.levl.helper

import android.content.Context
import android.content.res.Configuration
import android.app.UiModeManager

fun getDeviceType(context: Context): String {
    val uiModeManager = context.getSystemService(Context.UI_MODE_SERVICE) as UiModeManager

    return when {
        // Check for TV
        uiModeManager.currentModeType == Configuration.UI_MODE_TYPE_TELEVISION -> "TV"

        // Check for Tablet (Screen width >= 600dp is the standard threshold)
        context.resources.configuration.smallestScreenWidthDp >= 600 -> "Tablet"

        // Default to Phone
        else -> "Phone"
    }
}