
var v =null;
mui.plusReady(function() {
	var view = plus.webview.currentWebview();
	var cid = view.cid //客户ID
	v= new Vue({
		el: ".mui-content",
		data: {
			obj: null
		}
	})
	mui.ajax(obj.url + '/Customer/selectByPrimaryKey', {
		data: {
			id: cid
		},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			v.obj = data;
		},
		error: function(xhr, type, errorThrown) {
		}
	});
	/*跳转到修改该客户资料*/
	mui('body').on('tap', '.mui-icon-compose', function() {
		var cid=document.querySelector("[name=id]").value;
		plus.webview.create("update_client.html", "update_client.html", {}, {
			cid:cid
		}).show("none")
	})
})
