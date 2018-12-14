mui.ready(function() {
	/*显示单位数据框*/
	mui('body').on('tap', '#danwei', function() {
		document.querySelector(".danwei_data").style.display = "block"
	})
	/*隐藏单位,货品数据框*/
	mui('body').on('tap', 'header,nav,#sliderSegmentedControl', function() {
		document.querySelector(".danwei_data").style.display = "none"
		document.querySelector(".huoping_data").style.display = "none"
	})
	/*显示货品数据框*/
	mui('body').on('tap', '#huoping', function() {
		document.querySelector(".huoping_data").style.display = "block"
	})
	/*点击加号添加*/
	mui('body').on('tap', '.add', function() {
		var title = document.querySelector("#head_title").innerHTML;
		if(title == "客管") {
			var id = this.getAttribute("data_client")
			plus.webview.create(id, id, {}, {}).show()
		}
		if(title == "供应商") {
			var id = this.getAttribute("data_supplier")
			plus.webview.create(id, id, {}, {}).show()
		}
		if(title == "客户报价") {
			var id = this.getAttribute("data_cargo_client")
			plus.webview.create(id, id, {}, {}).show()
		}

	})
	/*输入框弹窗*/
	mui('body').on('tap', '.promptBtn', function() {
		lmqModel.open("设置客户报价", [{
			title: "单位",
			type: "text",
			bit: " ",
			name: "unit",
			placeholder: "台"
		}, {
			title: "零售价",
			type: "text",
			bit: "元",
			name: "priceOne",
			placeholder: "0.00"
		}, {
			title: "批发价",
			type: "text",
			bit: "元",
			name: "priceTwo",
			placeholder: "0.00"
		}, {
			title: "大客户",
			type: "text",
			bit: "元",
			name: "priceThree",
			placeholder: "0.00"
		}], function() { //取消回调
			alert("取消");
		}, function(data) { //确定回调
			alert(JSON.stringify(data));
		});
	})
	/*点击客户为详情按钮id属性添加客户ID*/
	mui('body').on('tap', '.item1mobile1 .mui-indexed-list-item', function() {
		var id = this.getAttribute("data-id")
		var name=this.getAttribute("data-name")
		var param=obj.getclient(id,name)	//客户的ID和名字的JSON对象
		alert(JSON.stringify(param))
		document.querySelector(".show_clientInfo").setAttribute("data-id", id)
	})
	
	/*点击供应商为详情按钮id属性添加供应商ID*/
	/*mui('body').on('tap', '.item2mobile .mui-indexed-list-item', function() {
		var id = this.getAttribute("data-id")
		var name=this.getAttribute("data-name")
		var param=obj.getclient(id,name)	//供应商的ID和名字的JSON对象
		alert(JSON.stringify(param))		
		document.querySelector(".show_supplierInfo").setAttribute("data-id", id)
	})*/
})
mui.plusReady(function() {
	/*webview显示客户详情*/
	mui('body').on('tap', '.show_clientInfo', function() {
		var id=this.getAttribute("data-id")
		document.querySelector("#picture").style.display = "none"
		document.querySelector(".mui-backdrop-action.mui-backdrop.mui-active,.mui-bar-backdrop.mui-backdrop.mui-active").style.opacity = "0"
		plus.webview.create("show_client.html", "show_client.html", {}, {
			cid:id
		}).show("none")
	})
	/*webview显示供应商详情*/
	mui('body').on('tap', '.show_supplierInfo', function() {
		var id=this.getAttribute("data-id")
		document.querySelector("#supplier").style.display = "none"
		document.querySelector(".mui-backdrop-action.mui-backdrop.mui-active, .mui-bar-backdrop.mui-backdrop.mui-active").style.opacity = "0"
		plus.webview.create("show_supplier.html", "show_supplier.html", {}, {
			cid:id
		}).show("none")
	})
})