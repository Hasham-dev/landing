import Head from 'next/head'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import theme from 'theme'
import Nav from 'components/Navbar/Index'
import Footer from 'components/Footer/Index'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <title>First Lines</title>
        <link rel="shortcut icon" href="/img/chakra-logo.png" />
        <link rel="apple-touch-icon" href="/img/chakra-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content="NextJS with Chakra-ui Boilerplate" />
      </Head>
      <Nav />

      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  )
}

export default MyApp
