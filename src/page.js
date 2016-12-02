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
}


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