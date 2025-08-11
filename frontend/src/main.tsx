import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { RefetchProvider } from '@/components/refetchProvider.tsx'
import Router from '@/Router.tsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { store } from '@/state/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RefetchProvider>
          <RouterProvider router={Router} />
        </RefetchProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
