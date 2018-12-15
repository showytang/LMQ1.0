var n = {
	//url:"http://127.0.0.1:8080",
//	url:"http://192.168.43.175:8080",
//	url:"http://192.168.43.52:8080",
	url:"http://192.168.43.175:8080",
	//url: "http://100.71.170.138:8080",
	//获取参数
	getParam: function(selector) {
		var inputs = document.querySelector(selector).querySelectorAll("input");
		var textareas = document.querySelector(selector).querySelectorAll("textarea");
		var paramValue = {};
		for(var i = 0; i < inputs.length; i++) {
			var name = inputs[i].getAttribute("name");
			if(name) {
				paramValue[name] = inputs[i].value;
			}
		}
		for(var j = 0; textareas && j < textareas.length; j++) {
			var name = textareas[j].getAttribute("name");
			if(name) {
				paramValue[name] = inputs[j].value;
			}
		}
		return paramValue;
	},
	getSpanParam: function(selector, children) {
		var handle = document.querySelector(selector).querySelectorAll(children);
		var paramValue = [];
		console.log(handle.length)
		for(var i = 0; i < handle.length; i++) {
			var span = handle[i].querySelectorAll("span");
			var input = handle[i].querySelector("[type='checkbox']");
			var json = {};
			if(input == null) {
				for(var j = 0; j < span.length; j++) {
					var name = span[j].getAttribute("name");
					if(name) {
						json[name] = span[j].innerHTML;
					}
				}
				paramValue.push(json);
			} else {
				if(input.checked) {
					for(var j = 0; j < span.length; j++) {
						var name = span[j].getAttribute("name");
						if(name) {
							json[name] = span[j].innerHTML;
						}
					}
					paramValue.push(json);
				}

			}
			console.log("checkbox:" + input);

		}
		return paramValue;
	},
	verify: function(el) { /*验证input是否为空*/
		var parents = document.querySelectorAll(el)
		for(var i = 0; i < parents.length; i++) {
			if(parents[i].value === "") {
				return false;
			}

		}
		return true;
	},
	getGoodsParam: function(selector) {
		var paramValue = {};
			var span = selector.querySelectorAll("span");
			for(var j = 0; j < span.length; j++) {
				var name = span[j].getAttribute("name");
				if(name) {
					paramValue[name] = span[j].innerHTML;
				}
			}
		return paramValue;
	}
};
var obj=n;