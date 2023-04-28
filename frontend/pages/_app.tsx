import { AuthProvider } from "@descope/react-sdk"
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider projectId="P2P4RzIh6oCuvDB4fx67ifFMkaFN">
      <Component {...pageProps} />
    </AuthProvider>
  )
}
