/**
 * 获取本周、本季度、本月、上月的开始日期、结束日期
 */
var now = new Date(); //当前日期 
var nowDayOfWeek = now.getDay(); //今天本周的第几天 
var nowDay = now.getDate(); //当前日 
var nowMonth = now.getMonth(); //当前月 
var nowYear = now.getYear(); //当前年 
nowYear += (nowYear < 2000) ? 1900 : 0; //

var lastMonthDate = new Date(); //上月日期
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();

//格式化日期：yyyy-MM-dd 
function formatDate(date) {
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();
	if(mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if(myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return(myyear + "-" + mymonth + "-" + myweekday);
}
//获得当天的格式化日期：yyyy-MM-dd 
function formatNowDate() {
	var myyear = now.getFullYear();
	var mymonth = now.getMonth() + 1;
	var myweekday = now.getDate();
	if(mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if(myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return(myyear + "-" + mymonth + "-" + myweekday);
}
//获得某月的天数 
function getMonthDays(myMonth) {
	var monthStartDate = new Date(nowYear, myMonth, 1);
	var monthEndDate = new Date(nowYear, myMonth + 1, 1);
	var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
	return days;
}
//获得本周的开始日期 
function getWeekStartDate() {
	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
	return formatDate(weekStartDate);
}

//获得本周的结束日期 
function getWeekEndDate() {
	var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek) + 1);
	return formatDate(weekEndDate);
}

//获得本月的开始日期 
function getMonthStartDate() {
	var monthStartDate = new Date(nowYear, nowMonth, 1);
	return formatDate(monthStartDate);
}

//获得本月的结束日期 
function getMonthEndDate() {
	var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
	return formatDate(monthEndDate);
}

//获得上月开始时间
function getLastMonthStartDate() {
	var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
	if(lastMonth=11){
		lastMonthStartDate = new Date(nowYear-1, lastMonth, 1);
	}
	return formatDate(lastMonthStartDate);
}

//获得上月结束时间
function getLastMonthEndDate() {
	var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
	if(lastMonth=11){
		lastMonthEndDate = new Date(nowYear-1, lastMonth, getMonthDays(lastMonth));
	}
	return formatDate(lastMonthEndDate);
}
//获得昨天开始时间
function getYesterDayStartDate() {
	var now = new Date;
	now.setDate(now.getDate() - 1);
	return formatDate(now);
}
//获得昨天结束时间
function getYesterDayEndDate() {
	var now = new Date;
	now.setDate(now.getDate() - 1);
	return formatDate(now);
}
//获得今天的开始时间
function getDayStartDate() {
	return formatDate(new Date);
}
//获得今天的结束时间
function getDayEndDate() {
	return formatDate(new Date);
}
//获得昨天的开始时间
function getYearStartDate() {
	var yearStarDate = new Date(nowYear, 0, 1);
	return formatDate(yearStarDate);
}
//获得昨天的结束时间
function getYearEndDate() {
	var yearEndDate = new Date(nowYear, 11, 31);
	return formatDate(yearEndDate);
}