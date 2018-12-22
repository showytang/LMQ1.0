var cid;
var pid;
var list=[]
mui.ready(function() {

})
mui.plusReady(function() {
	mui('body').on('tap', '#item1mobile .mui-table-view li:nth-child(1)', function() {
		plus.webview.create("client.html", "client.html", {}, {}).show("noen")
	})
	mui('body').on('tap', '#item1mobile .mui-table-view li:nth-child(2)', function() {
		if(!document.querySelector("#client_name").innerHTML) {
			mui.toast("请选择用户");
		} else {
			cid = this.getAttribute("data-id") //客户ID
			pid = this.getAttribute("data-pid") //客户类型ID
			plus.webview.create("goodsInstanceCustomer_h.html", "goodsInstanceCustomer_h.html", {}, {
				cid:cid,
				pid:pid
			}).show("none")
			/*plus.webview.getWebviewById("goodsInstanceCustomer_h.html").evalJS("getcid("+cid+")")
			plus.webview.getWebviewById("goodsInstanceCustomer_h.html").evalJS("getpid("+pid+")")*/
		}
	})
	//mui('body').on('click', '#hiden', function() {
		//var data = {}
		//data.cid = cid;
		//data.pid = pid;
		//plus.webview.getWebviewById("goodsInstanceCustomer.html").evalJS("getObj(" + JSON.stringify(data) + ")");
		//plus.webview.getWebviewById("goodsCustomerPrice.html").evalJS("getObj(" + JSON.stringify(data) + ")");
	//})
})

// function getJsonObj() {
// 	mui.trigger(document.querySelector("#hiden"), "click")
// }

/*添加*/
/*function quotelist(data) {
	var obj=eval("("+data+")")
	for(var i=0;i<list.length;i++){
		if(list[i].gid==obj.gid){
			alert("存在了")
		}
		list.push(obj)
	}
	alert(list.length)
}*/