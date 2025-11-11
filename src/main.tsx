import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import {PasswordVisibilityProvider} from "@/app/providers/PasswordVisibilityProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PasswordVisibilityProvider>
        <App />
    </PasswordVisibilityProvider>
  </StrictMode>,
)
