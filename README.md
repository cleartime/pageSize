# PC分页,完美支持ie8+

下面就是见证奇迹的时刻

![pageabc.gif](http://upload-images.jianshu.io/upload_images/2887236-bc38a362c17acc6f.gif?imageMogr2/auto-orient/strip)

# 配置详情


		var config = {
			el: document.getElementById("page"), //绑定到你的dom
			pageCount:10,                        //总页数                  ps:如果后两项填写了则本字段失效,两者只需其一
			pagesize:20,                         //每页显示个数
			sizeCount:100,                       //总个数                  ps:pagesize和sizeCount必须同时存在
			pageA:1,                             //首页和尾页按钮不显示       
			pageB:1,                             //上一页和下一页不显示
			pageC:1,                             //手动跳转不显示           
			callback: function(res) {            //按钮点击的毁掉函数参数res表示当前页
				console.log(res)
			},
		};
		new Page(config);                        //启动
		
		
## 欢迎follow/star我的github:https://github.com/cleartime;
## 我的博客:http://cleartime.leanapp.cn/;