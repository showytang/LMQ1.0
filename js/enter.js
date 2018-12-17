var loginenter = {
	Login : function(name,pwd){
		console.log(name)
		console.log(pwd)
		console.log(n.url)
		mui.ajax(n.url+'/User/queryuser',{
	  	data:{
	  		name:name,
			pwd:pwd
	  	},
	  	dataType:'json',//服务器返回json格式数据
	  	type:'post',//HTTP请求类型
	  	timeout:10000,//超时时间设置为10秒；
	  	success:function(data){
	  		if (data!=null) {
	  			data.active="true";
	  			console.log("这是登入的用户"+JSON.stringify(data))
	  			/*存入本地数据库*/
	  			async(function*() {
	  				var db = yield new DB("LMQ");
	  				data.defaultStore = data.store;
					yield db.put("user", data);
					/*data.id="1";
					yield db.put("store", data);*/
				});
				//跳转页面
				plus.webview.create("index.html","index.html",{},{}).show("none")
	  		} else{
	  			mui.toast("你没有对象您输入的账号或者密码错误！")
	  		}
	  	},
	  	error:function(xhr,type,errorThrown){
	  		mui.toast("您输入的账号或者密码错误！")
	  	}
	 	});
	}
}