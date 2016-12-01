/**
 * Created by gxx on 16/12/1.
 */

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