import {
  backButton,
  bindThemeParamsCssVars,
  bindViewportCssVars,
  emitEvent,
  init as initSDK,
  mockTelegramEnv,
  mountMainButton,
  mountMiniAppSync,
  mountThemeParamsSync,
  mountViewport,
  postEvent,
  restoreInitData,
  setDebug,
  setMainButtonParams,
  setMiniAppBackgroundColor,
  setMiniAppBottomBarColor,
  setMiniAppHeaderColor,
  themeParamsBackgroundColor,
  themeParamsSectionBackgroundColor,
  themeParamsState
} from '@telegram-apps/sdk-solid'

import { formatThemeParamsCssVar, formatViewportCssVar } from './utils'

export async function init({
  debug,
  ...options
}: {
  debug?: boolean
  eruda?: boolean
  mockForMacOS?: boolean
  mockForWebK?: boolean
}): Promise<void> {
  setDebug(debug)
  initSDK()
  // Telegram for macOS has a ton of bugs, including cases, when the client doesn't
  // even response to the "web_app_request_theme" method. It also generates an incorrect
  // event for the "web_app_request_safe_area" method.
  //
  // In turn, Telegram Web K doesn't respond to both
  // "web_app_request_safe_area" and "web_app_request_content_safe_area" methods.
  const { mockForMacOS, mockForWebK } = options
  if (mockForMacOS || mockForWebK) {
    const noInsets = { left: 0, top: 0, right: 0, bottom: 0 }
    mockTelegramEnv({
      onEvent(event, next) {
        if (mockForMacOS && event[0] === 'web_app_request_theme') {
          return emitEvent('theme_changed', {
            theme_params: themeParamsState()
          })
        }
        if (event[0] === 'web_app_request_content_safe_area') {
          return emitEvent('content_safe_area_changed', noInsets)
        }
        if (mockForWebK && event[0] === 'web_app_request_safe_area') {
          return emitEvent('safe_area_changed', noInsets)
        }
        next()
      }
    })
  }

  // Initialize required components.
  restoreInitData()

  if (mountViewport.isAvailable()) {
    await mountViewport({ timeout: 3000 })
    bindViewportCssVars(formatViewportCssVar)
  }
  if (mountThemeParamsSync.isAvailable()) {
    mountThemeParamsSync()
    bindThemeParamsCssVars(formatThemeParamsCssVar)
  }
  if (backButton.isSupported()) {
    backButton.mount()
  }
  if (mountMainButton.isAvailable()) {
    mountMainButton()
    setMainButtonParams({ isVisible: false })
  }
  mountMiniAppSync.ifAvailable()

  postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false })

  const sectionBackgroundColor = themeParamsSectionBackgroundColor()
  const backgroundColor = themeParamsBackgroundColor()

  if (sectionBackgroundColor && backgroundColor) {
    setMiniAppHeaderColor(backgroundColor)
    setMiniAppBackgroundColor(sectionBackgroundColor)
    setMiniAppBottomBarColor(sectionBackgroundColor)
  }
}
