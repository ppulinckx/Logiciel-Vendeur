Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

Number.prototype.formatMoney = function(c, d, t){
	var n = this, 
	c = isNaN(c = Math.abs(c)) ? 2 : c, 
	d = d == undefined ? "," : d, 
	t = t == undefined ? "." : t, 
	s = n < 0 ? "-" : "", 
	i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
	j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function isNumeric(obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
}

function isString(obj) {
   return (typeof obj == 'string' || obj instanceof String); 
}

function positive(evt)
{
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if(charCode==44 || charCode==46) return true;
    else if (charCode > 31 && (charCode < 48 || charCode > 57))
    {
        return false;
    }
    return true;
}

function nummer(evt)
{
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if(charCode>=44 && charCode<=46) return true;
    else if (charCode > 31 && (charCode < 48 || charCode > 57))
    {
        return false;
    }
    return true;
}

function fprice(value, to) {
	var value = parseFloat(value);
	var to = to || 0;
	return value.toFixed(to).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function price(evt)
{
	var value = parseFloat(evt.target.value);
	var format = fprice(value);
	evt.target.value = format;
}

function get(name) {
	return sessionStorage.getItem(name);
}

function makeTabCumulus(coef, time) {
	var group = [];
	for(var i=0; i<time; i++) {
		group[i] = Math.pow(coef,i);	
	}
	return group; 
}

function makeCumulus(val, coef, times) {
	var times = Number(times) || 10;
	var sum = 0;
	for(var i=1;i<=times;i++) {
		sum += val;
		val *= coef;
	}
	return sum;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
