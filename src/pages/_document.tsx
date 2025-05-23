/* eslint-disable react/display-name */
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): React.JSX.Element {
    return (
      <Html lang={"en"}>
        <Head>
          <meta charSet={"utf-8"} />

          {/* Preconnect */}
          <link
            rel={"preconnect"}
            href={"https://api.fontshare.com"}
            crossOrigin={"anonymous"}
          />

          <link
            rel={"stylesheet"}
            href={
              "https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,301,701,300,501,401,901,400&f[]=panchang@400&display=swap"
            }
          />

          {/* Favicon */}
          <link
            rel={"apple-touch-icon"}
            sizes={"180x180"}
            href={"/static/images/favicon/apple-touch-icon.png"}
          />
          <link
            rel={"icon"}
            type={"image/png"}
            sizes={"32x32"}
            href={"/static/images/favicon/favicon-32x32.png"}
          />
          <link
            rel={"icon"}
            type={"image/png"}
            sizes={"16x16"}
            href={"/static/images/favicon/favicon-16x16.png"}
          />

          {/* Manifest */}
          <link rel={"manifest"} href={"/manifest.json"} />
          <script
            defer
            src={"https://analytics.eu.umami.is/script.js"}
            data-website-id={"0aa1be33-7fae-4cd7-9418-af9aafbb04ee"}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
