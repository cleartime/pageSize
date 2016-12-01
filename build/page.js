(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Page"] = factory();
	else
		root["Page"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports) {

	var CURRENT_PAGE_NUM = 1;//服务端返回当前页
	var PAGE_COUNT = 2;      //服务端返回总页数

	function Page(data){
		this.el = data.el || document.body;
		this.callback = null;
		CURRENT_PAGE_NUM  = this.currentPagenum = data.currentPagenum;
		PAGE_COUNT = data.pageCount;
		if(!!data.callback){
			this.callback = data.callback;
		}
		this.init();
	}


	/**
	 * 初始化
	 */
	Page.prototype.init = function(){
		this.setDom();
		this.chage();
	}


	/**
	 * dom注入
	 */
	Page.prototype.setDom = function () {
		var ohtml = '';
			ohtml +='<ul id="page-ul">';
			ohtml +='<li><a href = "" class = "page-prev'+this.dis(0)+'" >上一页</a></li>';
		for(var i = 1;i <= PAGE_COUNT;i++){
			ohtml +='<li><a href = ""  class = "page-li'+this.active(i)+'" >'+i+'</a></li>';
		}
			ohtml +='<li><a href = ""  class = "page-next'+this.dis(1)+'" >下一页</a></li>';
			ohtml +='</ul>';

		this.el.innerHTML = ohtml;
	}


	/**
	 * 按钮显示和隐藏
	 * @param  {String} num  0上一页1下一页
	 * @return {String} 添加的class             
	 */
	Page.prototype.dis = function (num) {
		if(!num){
			return CURRENT_PAGE_NUM > 1?'':' dis';
		}
		return CURRENT_PAGE_NUM < PAGE_COUNT?'':' dis';
	}

	/**
	 * 按钮高亮
	 * @param  {String} num  当前页
	 * @return {String} 添加的class           
	 */
	Page.prototype.active = function (num) {
		return num == CURRENT_PAGE_NUM  ? ' active' : '';
	}

	/**
	 * 按钮点击事件
	 */
	Page.prototype.chage = function(){
		var self = this;
		var ul = document.getElementById('page-ul');
		ul.addEventListener('click',function(e){
			e.preventDefault();
			var e = e || window.event;
			var target = e.target || e.srcElement;
			if(target.nodeName.toLowerCase() == ('a'|| 'li')){
				var data_li = target.classList;
				if(data_li.length>1){
					return
				}
				switch (data_li[0]){
					case 'page-prev':
					CURRENT_PAGE_NUM --;
					break;
					case 'page-next':
					CURRENT_PAGE_NUM ++;
					break;
					default:
					CURRENT_PAGE_NUM = target.innerText;
				}
				self.currentPagenum = CURRENT_PAGE_NUM;
				self.callback();
			}
		})
	}


	module.exports = function (data) {
		return new Page(data);
	};

/***/ }
/******/ ])
});
;