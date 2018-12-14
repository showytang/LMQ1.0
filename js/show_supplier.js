 mui.plusReady(function () {
 	/*跳转到供应商资料*/
     mui('body').on('tap','.mui-icon-compose',function(){
     	//供应商ID
     	var supplierid=document.querySelector("[type=hidden]").value
     	plus.webview.create("update_supplier.html","update_supplier.html",{},{
     		supplierid:supplierid
     	}).show("none")
   	})
 })