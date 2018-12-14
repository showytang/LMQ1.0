var loginenter = {
	Login : function(name,pwd){
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
								yield db.put("user", data);
							});
							//跳转页面
							plus.webview.create("index.html","index.html",{},{}).show("none")
				  		} else{
				  			mui.toast("您输入的账号或者密码错误！")
				  			console.log("这是登入的用户"+JSON.stringify(data))
				  		}
					 	
				  	},
				  	error:function(xhr,type,errorThrown){
				  		mui.toast("您输入的账号或者密码错误！")
				  	}
				 	});
	}
}