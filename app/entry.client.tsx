import { RemixBrowser } from '@remix-run/react'
import { hydrateRoot } from 'react-dom/client'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'

import createEmotionCache from './createEmotionCache'
import theme from './theme'

const emotionCache = createEmotionCache()

hydrateRoot(
  document,
  <CacheProvider value={emotionCache}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <RemixBrowser />
    </ThemeProvider>
  </CacheProvider>
)
