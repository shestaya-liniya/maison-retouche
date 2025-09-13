import { emitEvent, isTMA, mockTelegramEnv } from '@telegram-apps/sdk-solid'

// It is important, to mock the environment only for development purposes. When building the
// application, import.meta.env.DEV will become false, and the code inside will be tree-shaken,
// so you will not see it in your final bundle.
if (import.meta.env.DEV) {
  if (!(await isTMA('complete'))) {
    const themeParams = {
      bg_color: '#1e1e1e',
      section_bg_color: '#1c1c1c',
      secondary_bg_color: '#101010',
      text_color: '#ffffff',
      hint_color: '#7d7d7d',
      link_color: '#57a7e0',
      button_color: '#50a8eb',
      button_text_color: '#ffffff',
      header_bg_color: '#232326',
      accent_text_color: '#64b5ef',
      section_header_text_color: '#6cb6f8',
      subtitle_text_color: '#7e7e7f',
      destructive_text_color: '#ee686f',
      section_separator_color: '#000000',
      bottom_bar_bg_color: '#000000'
    } as const
    const noInsets = { left: 0, top: 0, bottom: 0, right: 0 } as const

    mockTelegramEnv({
      onEvent(e) {
        if (e[0] === 'web_app_request_theme') {
          return emitEvent('theme_changed', { theme_params: themeParams })
        }
        if (e[0] === 'web_app_request_viewport') {
          return emitEvent('viewport_changed', {
            height: window.innerHeight,
            width: window.innerWidth,
            is_expanded: true,
            is_state_stable: true
          })
        }
        if (e[0] === 'web_app_request_content_safe_area') {
          return emitEvent('content_safe_area_changed', noInsets)
        }
        if (e[0] === 'web_app_request_safe_area') {
          return emitEvent('safe_area_changed', noInsets)
        }
      },
      launchParams: {
        tgWebAppThemeParams: themeParams,
        tgWebAppData: new URLSearchParams([
          [
            'user',
            JSON.stringify({
              id: 1,
              first_name: 'Andrei',
              username: 'shestaya_liniya'
            })
          ],
          ['hash', ''],
          ['signature', ''],
          ['auth_date', Date.now().toString()]
        ]).toString(),
        tgWebAppStartParam: 'debug',
        tgWebAppVersion: '8',
        tgWebAppPlatform: 'tdesktop'
      }
    })

    console.info(
      '⚠️ As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.'
    )
  }
}
