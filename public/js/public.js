webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(621);


/***/ },

/***/ 142:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Object$assign = __webpack_require__(10)['default'];
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = getElementProps;
	
	var _lodashForeach = __webpack_require__(15);
	
	var _lodashForeach2 = _interopRequireDefault(_lodashForeach);
	
	var _displays = __webpack_require__(108);
	
	var _displays2 = _interopRequireDefault(_displays);
	
	function getElementProps(element, display) {
	  var elementProps = element.props;
	
	  if (display !== 'desktop' && element.displayProps) {
	    (function () {
	      var changes = {};
	      (0, _lodashForeach2['default'])(_displays2['default'], function (value, displayIt) {
	        if (displayIt !== 'desktop' && value >= _displays2['default'][display] && element.displayProps[displayIt]) {
	          _Object$assign(changes, element.displayProps[displayIt]);
	        }
	      });
	      elementProps = _Object$assign({}, elementProps, changes);
	    })();
	  }
	
	  return elementProps;
	}
	
	module.exports = exports['default'];

/***/ },

/***/ 172:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Object$assign = __webpack_require__(10)['default'];
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = getElementStyleValues;
	
	var _lodashForeach = __webpack_require__(15);
	
	var _lodashForeach2 = _interopRequireDefault(_lodashForeach);
	
	var _displays = __webpack_require__(108);
	
	var _displays2 = _interopRequireDefault(_displays);
	
	function getElementStyleValues(defaults, options, displayOptions, display) {
	  var displayValues = {};
	  if (display !== 'desktop' && displayOptions) {
	    (0, _lodashForeach2['default'])(_displays2['default'], function (value, displayIt) {
	      if (displayIt !== 'desktop' && value >= _displays2['default'][display] && displayOptions[displayIt]) {
	        _Object$assign(displayValues, displayOptions[displayIt]);
	      }
	    });
	  }
	
	  return _Object$assign({}, defaults, options, displayValues);
	}
	
	module.exports = exports['default'];

/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = __webpack_require__(4)['default'];
	
	var _classCallCheck = __webpack_require__(3)['default'];
	
	var _defineProperty = __webpack_require__(22)['default'];
	
	var _Object$assign2 = __webpack_require__(10)['default'];
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _lodashFind = __webpack_require__(41);
	
	var _lodashFind2 = _interopRequireDefault(_lodashFind);
	
	var _lodashForeach = __webpack_require__(15);
	
	var _lodashForeach2 = _interopRequireDefault(_lodashForeach);
	
	var _relaxJss = __webpack_require__(135);
	
	var _getElementStyleValues = __webpack_require__(172);
	
	var _getElementStyleValues2 = _interopRequireDefault(_getElementStyleValues);
	
	var StylesManager = (function () {
	  function StylesManager() {
	    _classCallCheck(this, StylesManager);
	
	    this.stylesMap = {};
	    this.singleStylesheet = new _relaxJss.Stylesheet();
	  }
	
	  _createClass(StylesManager, [{
	    key: 'changeStyle',
	    value: function changeStyle(id, styleOptions, options, displayOptions, display, single) {
	      var stylesheet = single && this.singleStylesheet || new _relaxJss.Stylesheet();
	      var rules = styleOptions.rules((0, _getElementStyleValues2['default'])(styleOptions.defaults, options, displayOptions, display));
	      var classMap = stylesheet.createRules(rules);
	
	      this.stylesMap = _Object$assign2({}, this.stylesMap, _defineProperty({}, id, {
	        options: options,
	        displayOptions: displayOptions,
	        display: display,
	        stylesheet: stylesheet,
	        classMap: classMap
	      }));
	
	      return classMap;
	    }
	  }, {
	    key: 'getClassMap',
	    value: function getClassMap(id, styleOptions, options, displayOptions, display, single) {
	      var classMap = undefined;
	      var styleMap = this.stylesMap[id];
	      if (!styleMap || styleMap && (styleMap.options !== options || display !== 'desktop' && styleMap.displayOptions !== displayOptions || styleMap.displayOptions && styleMap.display !== display)) {
	        classMap = this.changeStyle(id, styleOptions, options, displayOptions, display, single);
	      } else {
	        classMap = styleMap.classMap;
	      }
	      return classMap;
	    }
	  }, {
	    key: 'getStyleOptions',
	    value: function getStyleOptions(style, elements) {
	      var result = style;
	      if (typeof style === 'string') {
	        (0, _lodashForeach2['default'])(elements, function (element) {
	          if (element.style && typeof element.style === 'object' && element.style.type === style) {
	            result = element.style;
	          }
	        });
	      }
	      return result;
	    }
	  }, {
	    key: 'processElement',
	    value: function processElement(element, elementProps, ElementClass, styles, elements, display) {
	      var single = arguments.length <= 6 || arguments[6] === undefined ? false : arguments[6];
	
	      var classMap = {};
	      if (ElementClass && ElementClass.style) {
	        var styleId = elementProps && elementProps.style || 'no_style';
	        var styleOptions = this.getStyleOptions(ElementClass.style, elements);
	
	        if (styleId === 'no_style' && !element.style) {
	          // Default style
	          classMap = this.getClassMap(styleOptions.type, styleOptions, styleOptions.defaults, element.displayStyle, display, single);
	        } else {
	          // Apply style
	          if (styleId === 'no_style') {
	            classMap = this.getClassMap(element.id, styleOptions, element.style, element.displayStyle, display, single);
	          } else {
	            var style = (0, _lodashFind2['default'])(styles, { _id: styleId });
	            if (style) {
	              classMap = this.getClassMap(styleId, styleOptions, style.options, style.displayOptions, display, single);
	            }
	          }
	        }
	      }
	      return classMap;
	    }
	  }]);
	
	  return StylesManager;
	})();
	
	exports['default'] = new StylesManager();
	module.exports = exports['default'];

/***/ },

/***/ 621:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	__webpack_require__(964);
	
	var _helpersRenderRoutes = __webpack_require__(203);
	
	var _helpersRenderRoutes2 = _interopRequireDefault(_helpersRenderRoutes);
	
	var _routersPublic = __webpack_require__(933);
	
	var _routersPublic2 = _interopRequireDefault(_routersPublic);
	
	(0, _helpersRenderRoutes2['default'])(_routersPublic2['default']);

/***/ },

/***/ 835:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__(7)['default'];
	
	var _inherits = __webpack_require__(6)['default'];
	
	var _createClass = __webpack_require__(4)['default'];
	
	var _classCallCheck = __webpack_require__(3)['default'];
	
	var _extends = __webpack_require__(11)['default'];
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _lodashForeach = __webpack_require__(15);
	
	var _lodashForeach2 = _interopRequireDefault(_lodashForeach);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _relaxFramework = __webpack_require__(5);
	
	var _relaxJss = __webpack_require__(135);
	
	var _helpersDisplays = __webpack_require__(108);
	
	var _helpersDisplays2 = _interopRequireDefault(_helpersDisplays);
	
	var _helpersGetElementProps = __webpack_require__(142);
	
	var _helpersGetElementProps2 = _interopRequireDefault(_helpersGetElementProps);
	
	var _helpersStylesheet = __webpack_require__(60);
	
	var _helpersStylesheet2 = _interopRequireDefault(_helpersStylesheet);
	
	var _helpersStylesManager = __webpack_require__(269);
	
	var _helpersStylesManager2 = _interopRequireDefault(_helpersStylesManager);
	
	var _helpersUtils = __webpack_require__(17);
	
	var _helpersUtils2 = _interopRequireDefault(_helpersUtils);
	
	var Page = (function (_Component) {
	  _inherits(Page, _Component);
	
	  function Page() {
	    _classCallCheck(this, Page);
	
	    _get(Object.getPrototypeOf(Page.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Page, [{
	    key: 'getInitState',
	    value: function getInitState() {
	      this.onResizeBind = this.onResize.bind(this);
	      this.renderElementBind = this.renderElement.bind(this);
	      this.renderChildrenBind = this.renderChildren.bind(this);
	
	      return {
	        mounted: false,
	        display: 'desktop'
	      };
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      window.addEventListener('resize', this.onResizeBind);
	      this.onResize();
	    }
	  }, {
	    key: 'onResize',
	    value: function onResize() {
	      var width = window.outerWidth;
	      // var height = window.outerHeight;
	
	      var display = 'desktop';
	      var amount = 99999;
	      (0, _lodashForeach2['default'])(_helpersDisplays2['default'], function (value, key) {
	        var dif = value - width;
	        if (width < value && dif < amount) {
	          amount = dif;
	          display = key;
	        }
	      });
	
	      this.setState({
	        mounted: true,
	        display: display
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var data = this.props.page.data;
	
	      var elements = data && data.body && this.renderChildren(data.body.children);
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(_relaxJss.Component, { stylesheet: _helpersStylesheet2['default'] }),
	        _react2['default'].createElement(_relaxJss.Component, { stylesheet: _helpersStylesManager2['default'].singleStylesheet }),
	        elements
	      );
	    }
	  }, {
	    key: 'renderChildren',
	    value: function renderChildren(children) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var result = undefined;
	      if (children instanceof Array) {
	        result = children.map(this.renderElement.bind(this, options));
	      } else {
	        result = children;
	      }
	      return result;
	    }
	  }, {
	    key: 'renderElement',
	    value: function renderElement(options, elementId) {
	      var display = this.state.display;
	      var _props = this.props;
	      var elements = _props.elements;
	      var styles = _props.styles;
	      var page = _props.page;
	
	      var element = page.data[elementId];
	
	      var ElementClass = elements[element.tag];
	      var elementProps = (0, _helpersGetElementProps2['default'])(element, this.state.display);
	
	      if (options.schemaEntry && options.elementsLinks && options.elementsLinks[element.id]) {
	        element = _helpersUtils2['default'].alterSchemaElementProps(options.elementsLinks[element.id], element, options.schemaEntry, elementProps);
	      }
	
	      var styleClassMap = _helpersStylesManager2['default'].processElement(element, elementProps, ElementClass, styles, elements, this.state.display, true);
	
	      if ((!element.hide || !element.hide[display]) && element.display !== false) {
	        return _react2['default'].createElement(
	          ElementClass,
	          _extends({}, elementProps, {
	            key: elementId,
	            element: element,
	            elementId: elementId,
	            styleClassMap: styleClassMap,
	            display: this.state.display,
	            renderElement: this.renderElementBind,
	            renderChildren: this.renderChildrenBind
	          }),
	          element.children && this.renderChildren(element.children, options)
	        );
	      }
	    }
	  }], [{
	    key: 'fragments',
	    value: {
	      page: {
	        title: 1,
	        data: 1
	      }
	    },
	    enumerable: true
	  }, {
	    key: 'propTypes',
	    value: {
	      elements: _react.PropTypes.object.isRequired,
	      styles: _react.PropTypes.array.isRequired,
	      page: _react.PropTypes.object
	    },
	    enumerable: true
	  }]);
	
	  return Page;
	})(_relaxFramework.Component);
	
	exports['default'] = Page;
	module.exports = exports['default'];

/***/ },

/***/ 860:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__(7)['default'];
	
	var _inherits = __webpack_require__(6)['default'];
	
	var _createClass = __webpack_require__(4)['default'];
	
	var _classCallCheck = __webpack_require__(3)['default'];
	
	var _extends = __webpack_require__(11)['default'];
	
	var _interopRequireWildcard = __webpack_require__(16)['default'];
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _clientActionsAdmin = __webpack_require__(34);
	
	var adminActions = _interopRequireWildcard(_clientActionsAdmin);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(14);
	
	var _redux = __webpack_require__(13);
	
	var _relaxFramework = __webpack_require__(5);
	
	var _componentsElements = __webpack_require__(138);
	
	var _componentsElements2 = _interopRequireDefault(_componentsElements);
	
	var _componentsPage = __webpack_require__(835);
	
	var _componentsPage2 = _interopRequireDefault(_componentsPage);
	
	var _helpersColors = __webpack_require__(25);
	
	var PublicPageContainer = (function (_Component) {
	  _inherits(PublicPageContainer, _Component);
	
	  function PublicPageContainer() {
	    _classCallCheck(this, _PublicPageContainer);
	
	    _get(Object.getPrototypeOf(_PublicPageContainer.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(PublicPageContainer, [{
	    key: 'getInitState',
	    value: function getInitState() {
	      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
	
	      var params = props.params;
	      (0, _helpersColors.updateColors)(this.props.colors);
	
	      return {
	        loading: false,
	        slug: params.slug,
	        entrySlug: params.entrySlug
	      };
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var _this = this;
	
	      var params = nextProps.params;
	
	      if (params.slug !== this.state.slug || params.entrySlug !== this.state.entrySlug) {
	        this.setState({
	          loading: true,
	          slug: params.slug,
	          entrySlug: params.entrySlug
	        }, function () {
	          _this.fetchData(nextProps);
	        });
	      }
	    }
	  }, {
	    key: 'fetchData',
	    value: function fetchData(props) {
	      var _this2 = this;
	
	      props.getAdmin(this.constructor.getQueryAndVariables(props)).done(function () {
	        _this2.setState({
	          loading: false
	        });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(_componentsPage2['default'], _extends({}, this.props, this.props.params, this.state, { elements: _componentsElements2['default'] }));
	    }
	  }], [{
	    key: 'getQueryAndVariables',
	    value: function getQueryAndVariables(props) {
	      var vars = {};
	      var fragments = _extends({}, PublicPageContainer.fragments);
	
	      if (props.params && props.params.slug && !props.params.entrySlug) {
	        vars.page = {
	          slug: {
	            value: props.params.slug,
	            type: 'String!'
	          }
	        };
	        fragments.page = _componentsPage2['default'].fragments.page;
	      } else if (props.params && props.params.slug && props.params.entrySlug) {
	        // TODO schema loading
	      } else {
	          // frontpage
	          fragments.page = _componentsPage2['default'].fragments.page;
	        }
	
	      return (0, _relaxFramework.buildQueryAndVariables)(fragments, vars);
	    }
	  }, {
	    key: 'fragments',
	    value: {
	      colors: {
	        _id: 1,
	        label: 1,
	        value: 1
	      },
	      styles: {
	        _id: 1,
	        type: 1,
	        options: 1
	      }
	    },
	    enumerable: true
	  }, {
	    key: 'propTypes',
	    value: {
	      params: _react.PropTypes.object.isRequired,
	      colors: _react.PropTypes.array.isRequired
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      params: {}
	    },
	    enumerable: true
	  }]);
	
	  var _PublicPageContainer = PublicPageContainer;
	  PublicPageContainer = (0, _reactRedux.connect)(function (state) {
	    return {
	      page: state.page.data,
	      styles: state.styles.data,
	      colors: state.colors.data
	    };
	  }, function (dispatch) {
	    return (0, _redux.bindActionCreators)(adminActions, dispatch);
	  })(PublicPageContainer) || PublicPageContainer;
	  return PublicPageContainer;
	})(_relaxFramework.Component);
	
	exports['default'] = PublicPageContainer;
	module.exports = exports['default'];

/***/ },

/***/ 933:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(116);
	
	var _clientHelpersGaSend = __webpack_require__(202);
	
	var _clientHelpersGaSend2 = _interopRequireDefault(_clientHelpersGaSend);
	
	var _containersPublicPage = __webpack_require__(860);
	
	var _containersPublicPage2 = _interopRequireDefault(_containersPublicPage);
	
	exports['default'] = [_react2['default'].createElement(_reactRouter.Route, { path: '/:slug', component: _containersPublicPage2['default'], onEnter: _clientHelpersGaSend2['default'] }), _react2['default'].createElement(_reactRouter.Route, { path: '/', component: _containersPublicPage2['default'], onEnter: _clientHelpersGaSend2['default'] })];
	module.exports = exports['default'];

/***/ },

/***/ 964:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});
//# sourceMappingURL=public.js.map