/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _scroller = __webpack_require__(1);

	var _scroller2 = _interopRequireDefault(_scroller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var scene = new _scroller2.default({
	  scene: document.getElementById('one')
	});

	var txt = document.getElementById('one_text');

	scene.subscribe(function (ratio) {
	  console.log('External ratio', ratio);
	  txt.style.transform = 'translateY(' + ratio * 2000 + 'px)';
	  txt.style.opacity = 1 - 5 * ratio;
	});

	var scene2 = new _scroller2.default({
	  scene: document.getElementById('two'),
	  triggerPoint: 'onHalf'
	});
	var txt2 = document.getElementById('two_text');

	scene2.subscribe(function (ratio) {
	  console.log('Ratio 2', ratio);
	  txt2.style.transform = 'translateY(' + ratio * 100 * 6 + 'px)';
	  txt2.style.opacity = 1 - ratio;
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/**
	Author: Kacper "kulak" Kula
	**/

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scroller = function () {
	  /**
	  options.scene - DOM element for a scene
	  options.triggerPoint: float || 'onEnter' || 'onLeave' || 'onHalf'
	  options.offset: float
	  duration: float
	  **/
	  function Scroller(options) {
	    _classCallCheck(this, Scroller);

	    this._sceneEl = options.scene;
	    this._offset = options._offset || 0;
	    this._triggerPoint = this.resolveTriggerPoint(options.triggerPoint);
	    this._duration = options.duration || 0;

	    this._subscribers = [];

	    window.addEventListener('scroll', window.requestAnimationFrame.bind(null, this.onScroll.bind(this)), { passive: true });
	  }

	  _createClass(Scroller, [{
	    key: 'resolveTriggerPoint',
	    value: function resolveTriggerPoint(point) {
	      switch (point) {
	        case 'onLeave':
	          return 0;
	        case 'onEnter':
	          return 1;
	        case 'onHalf':
	          return 0.5;
	        default:
	          return point || 0;
	      }
	    }
	  }, {
	    key: 'onScroll',
	    value: function onScroll(event) {
	      // console.log('Scroll', this.getRatio())
	      var ratio = this.getRatioRestricted();
	      this._subscribers.forEach(function (fn) {
	        return fn(ratio);
	      });
	    }
	  }, {
	    key: 'getRatio',
	    value: function getRatio() {
	      return (this.getParentScroll() - this.getOffset()) / this.getHeight();
	    }
	  }, {
	    key: 'getRatioRestricted',
	    value: function getRatioRestricted() {
	      return Math.min(1, Math.max(0, this.getRatio()));
	    }
	  }, {
	    key: 'getHeight',
	    value: function getHeight() {
	      return this._duration || this._sceneEl.offsetHeight;
	    }
	  }, {
	    key: 'getOffset',
	    value: function getOffset() {
	      return this._sceneEl.offsetTop - this._triggerPoint * this.getHeight() + this._offset;
	    }
	  }, {
	    key: 'getParentScroll',
	    value: function getParentScroll() {
	      return window.scrollY;
	    }
	  }, {
	    key: 'subscribe',
	    value: function subscribe(fn) {
	      this._subscribers.push(fn);
	      fn(this.getRatioRestricted());
	    }
	  }]);

	  return Scroller;
	}();

	exports.default = Scroller;

/***/ }
/******/ ]);