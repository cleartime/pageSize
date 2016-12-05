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

	/**
	 * Created by gxx on 16/12/1.
	 */

	var CURRENT_PAGE_NUM = 1;//服务端返回当前页
	var PAGE_COUNT = 2;      //服务端返回总页数

	function Page(data){
		this.el = data.el || document.body;
		this.pageA = !data.pageA;
		this.pageB = !data.pageB;
		this.pageC = !data.pageC;
		PAGE_COUNT = data.pageCount;
		if(data.sizeCount&&data.pagesize){
			PAGE_COUNT = Math.ceil(data.sizeCount/data.pagesize);
		}
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
		var A = '',B = '',C = '',D = '',E = '',F = '',G = '',H = '';
			A +='<ul id="page-ul" style = "width:'+((87*((this.pageA?2:0)+(this.pageB?2:0))+PAGE_COUNT*35)+((PAGE_COUNT+(this.pageA?2:0)+(this.pageB?2:0))*12)+(this.pageC?200:0))+'px">';
			B +='<li><a href = "" class = "page-head'+this.dis('head')+'" >首页</a></li>';
			C +='<li><a href = "" class = "page-prev'+this.dis('prev')+'" >上一页</a></li>';
		for(var i = 1;i <= PAGE_COUNT;i++){
			D +='<li><a href = ""  class = "page-li'+this.active(i)+'" >'+i+'</a></li>';
		}
			E +='<li><a href = ""  class = "page-next'+this.dis('next')+'" >下一页</a></li>';
			F +='<li><a href = "" class = "page-foot'+this.dis('foot')+'" >尾页</a></li>';
			G +='<li id = "page-submit" >跳到<input type="number" value = '+CURRENT_PAGE_NUM+' min="1" max='+PAGE_COUNT+' />页<a href = "" class="page-submit">确定</a></li>';
			H +='</ul>';
		this.el.innerHTML = A+(this.pageA?B:'')+(this.pageB?C:'')+D+(this.pageB?E:'')+(this.pageA?F:'')+(this.pageC?G:'')+H;
		this.createStyle();
	}



	/**
	 * 创建插件所需样式
	 */
	Page.prototype.createStyle = () => {
	    var style = document.getElementById('page-style');
	    if (style) {
	        return false; //已经创建了样式
	    }
	    style = document.createElement('style');
	    style.id = 'page-style';
	    style.type = 'text/css';
	    style.innerHTML = '#page-ul{width:433px;text-align:center;margin:30px auto}#page-ul li a{display:inline-block;float:left;font-size:14px;border:1px solid #f7f7f7;width:35px;height:35px;color:#757575;text-align:center;line-height:35px;margin-right:10px}#page-ul .page-head,#page-ul .page-foot,#page-ul .page-next,#page-ul .page-prev{width:87px;background:#fff;color:#757575}#page-ul .page-head.dis,#page-ul .page-foot.dis,#page-ul .page-next.dis,#page-ul .page-prev.dis{background:#e5e4e2;color:#fff}#page-ul li a.active{border:1px solid #b18247;color:#b18247}#page-ul #page-submit{height:35px;line-height:35px;float:left;width:200px;position:relative}#page-ul #page-submit input{margin:0 5px;border:1px solid #f7f7f7}#page-ul #page-submit a{margin-left:10px;margin-right:0;position:absolute}';
	    this.el.appendChild(style);
	};


	/**
	 * 按钮显示和隐藏
	 * @param  {String} num  0上一页1下一页
	 * @return {String} 添加的class             
	 */
	Page.prototype.dis = function (str) {
		if(str == 'prev' || str =='head'){
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
		var input = document.querySelectorAll('#page-submit input');
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
					case 'page-head':
					CURRENT_PAGE_NUM = 1;
					break;
					case 'page-foot':
					CURRENT_PAGE_NUM = PAGE_COUNT;
					break;
					case 'page-submit':
					if(input[0].value<=PAGE_COUNT&&input[0].value>=1){
						CURRENT_PAGE_NUM = input[0].value;
					}
					break;
					default:
					CURRENT_PAGE_NUM = target.innerText;
				}			
				self.callback(CURRENT_PAGE_NUM);
				self.init();
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