var login = {
	getLogin : function(){
		
		return {id:1,store:{id:1}};
		
		async(function*() { //同步
			var db = yield new DB("LMQ");
			var user = yield db.index("user","active","true");
			console.log(JSON.stringify(user));
			/*console.log("这是当前登入的用户哈哈哈"+JSON.stringify(user[0].active).equals(true))*/
			if(user[0]){
				return user[0];
			}else{
				mui.alert('你还没有登录!','提示','确定',function (e) {
					plus.webview.create("admin.html", "admin.html", {}, {}).show("none");
				},'div')
				return null;
			}
		});
	}
}
	