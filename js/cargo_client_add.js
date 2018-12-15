 mui.ready(function () {
   	 
})
 mui.plusReady(function () {
    mui('body').on('tap','#item1mobile .mui-table-view li:nth-child(1)',function(){
    	plus.webview.create("client.html","client_supplier.html",{},{}).show("noen")
   	})
    mui('body').on('tap','#item1mobile .mui-table-view li:nth-child(2)',function(){
    	if(!document.querySelector("#client_name").innerHTML){
    		mui.toast("请选择用户");
    	}
    }) 
 })