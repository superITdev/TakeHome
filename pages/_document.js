import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
    render() {
        return (
            <Html lang={"en"}>
                <Head>
                    <meta name='description' content='Made by Darren Smith' />
                    <link rel='icon' href='/favicon.ico' />
                    <link rel='manifest' href='/manifest.json' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }

    static async getInitialProps(ctx) {
        const { renderPage } = ctx;
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props =>
            sheet.collectStyles(<App {...props} />)
        );
        return { ...page, styles: sheet.getStyleElement() };
    }
}

export default MyDocument