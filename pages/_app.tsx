import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import '../config/dayjs'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
export default MyApp
