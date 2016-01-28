import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  }

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />

          <link rel="apple-touch-icon" href="apple-touch-icon.png"/>
          <link href="/css/bootstrap.min.css" rel="stylesheet"/>
          <link href="/font-awesome/css/font-awesome.css" rel="stylesheet"/>
          <link href="/css/animate.css" rel="stylesheet"/>
          <link href="/css/style.css" rel="stylesheet"/>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {Object.keys(assets.styles).map((style, key) =>

            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}

        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
          <script src="/js/jquery-2.1.1.js"></script>
          <script src="/js/bootstrap.min.js"></script>
          <script src="/js/plugins/metisMenu/jquery.metisMenu.js"></script>
          <script src="/js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
          <script src="/js/plugins/flot/jquery.flot.js"></script>
          <script src="/js/plugins/flot/jquery.flot.tooltip.min.js"></script>
          <script src="/js/plugins/flot/jquery.flot.spline.js"></script>
          <script src="/js/plugins/flot/jquery.flot.resize.js"></script>
          <script src="/js/plugins/flot/jquery.flot.pie.js"></script>
          <script src="/js/plugins/peity/jquery.peity.min.js"></script>
          <script src="/js/demo/peity-demo.js"></script>
          <script src="/js/inspinia.js"></script>
          <script src="/js/plugins/pace/pace.min.js"></script>
          <script src="/js/plugins/jquery-ui/jquery-ui.min.js"></script>
          <script src="/js/plugins/gritter/jquery.gritter.min.js"></script>
          <script src="/js/plugins/sparkline/jquery.sparkline.min.js"></script>
          <script src="/js/demo/sparkline-demo.js"></script>
          <script src="/js/plugins/chartJs/Chart.min.js"></script>
          <script src="/js/plugins/toastr/toastr.min.js"></script>
          <script src="/js/site.js"></script>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>

        </body>
      </html>
    );
  }
}
