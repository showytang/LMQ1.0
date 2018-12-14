//1.0被我们修改成了样式需要依附mui，可以自己吧样式加上去 不过我们选择放弃，目前的问题是弹出窗体后还是能滑动后面的内容
//2.0 修改不需要依附mui，解决了弹出窗体后能被滑动背景的问题，目前发现的问题是弹出model的宽不可控
var lmqModel = {
	//创建定层盒子
	model: document.createElement("div"),
	init: function() {
		//设置盒子样式
		this.model.style.border = "1px solid #d4d4d3";
		this.model.style.borderRadius = "5px";
		this.model.style.background = "#fff";
		//this.model.style.width = "240px";
		//设置未fixed固定位置
		this.model.style.position = "fixed";
		this.model.style.zIndex = 1001;
		//关闭盒子的滑动 防止穿透
		this.model.addEventListener('touchmove', this.bodyScroll, false);

		//添加mui样式
		//this.model.classList.add("mui-input-group");

	},
	/**
	 * @method open
	 * @param {Object} title 字符串类型 标题
	 * @param {Object} content []类型 中间内容 例如[{title: "价格",type: "text",bit: "元",name: "price",placeholder : "统一输入价格"}] 
	 * @param {Object} cancel 取消回调函数
	 * @param {Object} cfm 成功回调
	 */
	//打开
	open: function(title, content, cancel, cfm) {
		//创建窗体
		this.init();
		//创建遮罩层
		this.createMark();
		//关闭滑动
		//判断传入的值是否存在
		//判断标题是否传入
		if(title) {
			var titleElm = document.createElement("div");
			titleElm.innerHTML = title;
			titleElm.style.textAlign = "center";
			titleElm.style.background = "#EEE9E9";
			titleElm.style.color = "#000";
			titleElm.style.padding = "8px 0px";
			//将创建好的窗体放入model窗体中
			this.model.appendChild(titleElm);
		}
		//判断传入的内容数组
		if(content) {
			//循环添加
			for(var c in content) {
				var item = content[c];
				var itemElm = document.createElement("div");
				//itemElm.style.background = "#fff";
				//itemElm.style.marginLeft="13px";
				//				itemElm.style.padding = "5px 2px"
				//itemElm.style.textAlign = "center";
				//添加mui样式
				itemElm.classList.add("mui-input-row");

				//是否有标题
				if(item.title) {
					var label = document.createElement("label");
					label.style.width = "28%";
					label.innerHTML = item.title;
					itemElm.appendChild(label);
				}
				var input = document.createElement("input");
				input.style.borderBottom = "1px solid #c8c7cc";
				input.style.borderRadius = "0px";

				if(item.type) {
					input.type = item.type;
				} else {
					input.type = "text";
				}
				input.placeholder = item.placeholder;
				input.name = item.name;
				itemElm.appendChild(input);
				if(item.bit) {
					var label = document.createElement("label");
					label.style.float = "left";
					label.style.width = "10%";
					label.innerHTML = item.bit;
					itemElm.appendChild(label);
				}
				input.style.margin = "0px 5px";
				input.style.width = "50%";
				input.style.float = "left";
				this.model.appendChild(itemElm);
			}
		}
		var btnElm = document.createElement("div");
		btnElm.style.display = "flex";
		btnElm.style.justifyContent = "space-around";
		btnElm.style.marginTop = "10px";
		//btnElm.style.marginBottom = "0px";
		//触摸取消事件
		if(cancel) {
			var cancelBtn = document.createElement("button");
			cancelBtn.style.width = "50%";
			cancelBtn.style.borderRadius = "0px";
			cancelBtn.style.fontWeight = "bold";
			cancelBtn.style.fontSize = "1em";
			cancelBtn.innerHTML = "取消";
			(function(op) {

				cancelBtn.addEventListener("tap", function() {
					cancel();
					//删除 删除会出现删除不干净的情况 原因length发生变化导致
					for(var i = 0; i < op.model.children.length;) {
						op.model.children[i].remove();
					}

					op.model.remove();
					op.mark.remove();
				})
			})(this);
			cancelBtn.classList.add("mui-btn");
			btnElm.appendChild(cancelBtn);
		}
		//触摸确定事件
		if(cfm) {
			var cfmBtn = document.createElement("button");
			cfmBtn.style.width = "50%";
			cfmBtn.style.borderRadius = "0px";
			cfmBtn.style.fontWeight = "bold";
			cfmBtn.innerHTML = "确定";
			cfmBtn.classList.add("mui-btn");
			cfmBtn.style.fontSize = "1em";
			//确定按钮事件
			(function(op) {
				cfmBtn.addEventListener("tap", function(x) {
					cfm(op.getParam(op.model));
					//删除 删除会出现删除不干净的情况 原因length发生变化导致
					for(var i = 0; i < op.model.children.length;) {
						op.model.children[i].remove();
					}
					op.model.remove();
					op.mark.remove();
				});
			})(this);
			btnElm.appendChild(cfmBtn);
		}
		if(btnElm.children.length > 0) {
			btnElm.style.marginBottom = "0px";
		}
		this.model.appendChild(btnElm);
		document.querySelector("body").appendChild(this.model);
		//获得屏幕的高度
		var height = window.screen.availHeight;
		//获得窗体的高度
		var mHeight = document.defaultView.getComputedStyle(this.model, null).height;
		var top = (height - parseInt(mHeight) * 2) / 2;
		this.model.style.top = top + "px";
		//获取窗体的宽度
		var width = document.defaultView.getComputedStyle(this.model, null).width;
		var left = (document.body.clientWidth - parseInt(width)) / 2;
		this.model.style.left = left + "px";
	},
	//获取参数
	getParam: function() {
		var inputs = this.model.querySelectorAll("input");
		var paramValue = {};
		for(var i = 0; i < inputs.length; i++) {
			var name = inputs[i].getAttribute("name");
			if(name) {
				paramValue[name] = inputs[i].value;
			}
		}
		return paramValue;
	},
	mark: document.createElement("div"),
	//遮罩层
	createMark: function() {
		var m = this.mark;
		this.mark.style.position = "fixed";
		this.mark.style.width = "100%";
		this.mark.style.height = "100%";
		this.mark.style.background = "gray";
		this.mark.style.opacity = "0.2";
		this.mark.style.zIndex = 1000;
		this.mark.style.top = '0px';
		document.querySelector("body").appendChild(this.mark);
		//关闭遮掩层的滑动 防止穿透
		this.mark.addEventListener('touchmove', this.bodyScroll, false);
		(function(op) {
			//触摸遮掩层效果
			m.addEventListener("tap", function() {
				//删除 删除会出现删除不干净的情况 原因length发生变化导致
				for(var i = 0; i < op.model.children.length;) {
					op.model.children[i].remove();
				}
				op.model.remove();
				m.remove();

			})
		})(this)
	},
	//开启和关闭滑动操作
	bodyScroll: function(event) {
		event.preventDefault();
	}

}