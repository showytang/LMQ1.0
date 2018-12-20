document.write("<script src='js/mui.min.js'></script>");
document.write("<script src='js/loginUser.js' type='text/javascript'></script>");
var tzx={
	url:"http://192.168.43.76:8080/",
	// url:"http://127.0.0.1:8080/",
	// url:"http://172.20.10.3:8080/",
	// url:"http://192.168.42.41:8080/",
	// url:"http://192.168.191.1:8080/",
	timeName:['全部','本年','本季','本月','本周','本日','自定义'],//用于date(0-7)时间段表示的中文含义，
	queryIncomeType:[{queryCode:'queryXS',queryName:'销售收入'},{queryCode:'querySK',queryName:'收订金/欠款'},{queryCode:'queryJH',queryName:'进货支出'},{queryCode:'queryFK',queryName:'付订金/欠款'},{queryCode:'queryWY',queryName:'物业管理'}],
	showOptionCondition:[
		{optionname:'profit',optionvalue:'00111'},
		{optionname:'income',optionvalue:'00000'},
		{optionname:'operating',optionvalue:'00000'},
		{optionname:'rank',optionvalue:'00000'},
		{optionname:'sales',optionvalue:'00000'},
		{optionname:'purchasing',optionvalue:'00000'},
		{optionname:'stock',optionvalue:'00001'},
		{optionname:'stock',optionvalue:'00100'},
		{optionname:'pay',optionvalue:'01000'}
		],//用于date(0-7)显示隐藏除时间外的条件选择项 即：排序方式、供应商、客户、商品类型、商品，
	getFormPara:function(selector){
		var para={};
		var inputs=document.querySelectorAll(selector+" input");
		for (var v in inputs) {
			var name=v.getAttribute("name");
			para[name]=v.getAttribute("value")
		}
		return para;
	},
	/**
	 * 返回上一页
	 */
	back:function(current,name){
		// console.log(current+"-"+name)
// 		var currentwebview=plus.webview.getWebviewById(current).hide("slide-out-left");
// 		plus.webview.getWebviewById(name).show("slide-in-left");
		
		var currentV= plus.webview.getWebviewById(current)
		currentV.hide("slide-out-right")
		plus.webview.getWebviewById(currentV.opener().id).show("slide-in-left")
		var f=plus.webview.getWebviewById("filter.html")
		if(f!=null){
			plus.webview.getWebviewById("filter.html").close()
		}
	},
	/**
	 * 跳转到name页面
	 */
	gobtn:function(current,name){
		if(name==null){
			var newwebview=plus.webview.create(name,name,{},{});
		}
		var newwebview=plus.webview.create(name,name,{},{});
		var currentwebview=plus.webview.getWebviewById(current).hide("slide-out-right")
		newwebview.show("slide-in-right");
	},
	/**
	 * 跳转到筛选
	 */
	gotoFilter:function(current1){
		console.log("跳转-筛选"+current1)
		var filterwebview=plus.webview.getWebviewById("filter.html")
		if(filterwebview==null){
			filterwebview=plus.webview.create("filter.html","filter.html",{},{})
		}
		var currentwebview=plus.webview.getWebviewById(current1).hide("slide-out-right")
		filterwebview.show("slide-in-right")
		// filterwebview.evalJS("initCondition("+JSON.stringify(c)+")")
	},
	gotoDetailFilter:function(current1){
		console.log("跳转-筛选"+current1)
		var filterwebview=plus.webview.getWebviewById("filter.html")
		if(filterwebview==null){
			filterwebview=plus.webview.create("filter.html","filter.html",{},{})
		}
		var currentwebview=plus.webview.getWebviewById(current1).hide("slide-out-right")
		filterwebview.show("slide-in-right")
		// filterwebview.evalJS("initCondition("+JSON.stringify(c)+")")
	},
	/**
	 * 获取窗口宽高
	 */
	getWidthAndHeight:function(){
		var w=window.innerWidth
		var h=window.innerHeight
		return {h:h,w:w};
	}
}
