export default ({html, preloadedState }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="/dist/bundle.css" />
        <link rel="icon" href="/favicon.ico">
        <title>${preloadedState.pageTitle}</title>
        <link href="https://fonts.googleapis.com/css?family=PT+Sans+Caption:400,700|PT+Sans:400,700|PT+Serif:400,400i,700,700i&amp;subset=cyrillic,cyrillic-ext,latin-ext" rel="stylesheet">
      </head>
      
      <body>
        <div id="root">${html}</div>
      </body>
      <script>
      // WARNING: See the following for security issues around embedding JSON in HTML:
      // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-84539897-3"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', 'UA-84539897-3');
      </script>
      <script src="/dist/bundle.js"></script>
    </html>
  `;
};