/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import { googleAnalyticsId } from '../../config';

class Html extends Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    css: PropTypes.string,
    body: PropTypes.string.isRequired,
    entry: PropTypes.string.isRequired,
    initialState: PropTypes.string.isRequired
  };

  static defaultProps = {
    title: '',
    description: ''
  };

  trackingCode() {
    return ({
      __html: `(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=` +
      `function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;` +
      `e=o.createElement(i);r=o.getElementsByTagName(i)[0];` +
      `e.src='https://www.google-analytics.com/analytics.js';` +
      `r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));` +
      `ga('create','${googleAnalyticsId}','auto');ga('send','pageview');`
    });
  }

  render() {
    return (
      <html className="no-js" lang="">
      <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <title>{this.props.title}</title>
        <meta name="description" content={this.props.description}/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="apple-touch-icon" href="apple-touch-icon.png"/>
        <link href="css/bootstrap.min.css" rel="stylesheet"/>
        <link href="font-awesome/css/font-awesome.css" rel="stylesheet"/>
        <link href="css/animate.css" rel="stylesheet"/>
        <link href="css/style.css" rel="stylesheet"/>
        <style id="css" dangerouslySetInnerHTML={{ __html: this.props.css }} />
      </head>
      <body className="pace-done fixed-sidebar">
      <div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }}/>
      <script src={this.props.entry}></script>
      <script src="js/jquery-2.1.1.js"></script>
      <script src="js/bootstrap.min.js"></script>
      <script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
      <script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
      <script src="js/plugins/flot/jquery.flot.js"></script>
      <script src="js/plugins/flot/jquery.flot.tooltip.min.js"></script>
      <script src="js/plugins/flot/jquery.flot.spline.js"></script>
      <script src="js/plugins/flot/jquery.flot.resize.js"></script>
      <script src="js/plugins/flot/jquery.flot.pie.js"></script>
      <script src="js/plugins/peity/jquery.peity.min.js"></script>
      <script src="js/demo/peity-demo.js"></script>
      <script src="js/inspinia.js"></script>
      <script src="js/plugins/pace/pace.min.js"></script>
      <script src="js/plugins/jquery-ui/jquery-ui.min.js"></script>
      <script src="js/plugins/gritter/jquery.gritter.min.js"></script>
      <script src="js/plugins/sparkline/jquery.sparkline.min.js"></script>
      <script src="js/demo/sparkline-demo.js"></script>
      <script src="js/plugins/chartJs/Chart.min.js"></script>
      <script src="js/plugins/toastr/toastr.min.js"></script>
      <script src="js/site.js"></script>
      </body>
      </html>
    );
  }

}

export default Html;
