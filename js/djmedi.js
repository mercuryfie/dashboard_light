
function moveto(id){
	if(id=="top"){
		var top=0;
	}else if(id!=""){
		var top=$('#'+id).position().top;
	}
	$( 'html, body' ).animate( { scrollTop : top }, 200 );
}

function getDeliveryItem(id) {
	$('#loader').addClass('js-active');
	//$('body').css('overflow', 'hidden');

	///-----------------------------------------------
	/// DOO :: ë°œì†¡ìš”ì²­ ë²„íŠ¼ì„ í´ë¦­ì‹œ í˜¸ì¶œë˜ëŠ” í•¨ìˆ˜ 
	///-----------------------------------------------
	medicallayer("modal.delivery",id, "");
	//var url="/inc/modal.delivery.php";
	//$("#modallayer").remove();
	//$("body").prepend("<div id='modallayer'></div>");
	//$("#modallayer").load(url, function(){callproductlist(id);});
	///-----------------------------------------------
}
//íŒì—…
function medicallayer(id, seq, title)
{
	$("#modallayer").remove();
	var txt="<div id='modallayer'></div>";
	$("body").prepend(txt);
	var url="/inc/"+id+".php";
	if(!isEmpty(seq))
	{
		url+="?seq="+seq;
	}

	if(!isEmpty(id)&&id=="modal.delivery")
	{
		$("#modallayer").load(url,function(){callproductlist(seq)});
	}
	else if(!isEmpty(id)&&id=="modal.impossible")
	{
		$("#modallayer").load(url,function(){ callapi("GET","recipe",getdata("medicineImpossiblelist")+"&medicode="+seq+"&no="+title); });
	}
	else if(!isEmpty(id)&&id=="modal.impossibleNHIS")
	{
		$("#modallayer").load(url,function(){ callapi("GET","recipe",getdata("medicineNHISImpossiblelist")+"&medicode="+seq+"&no="+title); });
	}
	else if(!isEmpty(id)&&id=="modal.patient")//í™˜ìžì •ë³´ desc
	{		
		$("#modallayer").load(url,function(){patientdesc(seq);});
	}
	else if(!isEmpty(id)&&id=="modal.option.comment-modify" || !isEmpty(id)&&id=="modal.option.advice-snote" || !isEmpty(id)&&id=="modal.option.advice-download")//ì¡°ì œì§€ì‹œ & ë³µìš©ì§€ì‹œ 
	{		
		$("#modallayer").load(url,function(){$("input[name=mdSeq]").val(seq); callapi("GET","member",getdata("memberdocxdesc")+"&mdSeq="+seq); if(!isEmpty(seq)){$("#updateID").text("ìˆ˜ì •");} });
	}
	else if(!isEmpty(id)&&id=="modal.auth")//ê¶Œí•œì •ë³´
	{		
		$("#modallayer").load(url,function(){memberauthdesc(seq);});
	}
	else if(!isEmpty(id)&&id=="modal.payment.cancel")
	{
		$("#modallayer").load(url,function(){callpaymentdesc(seq);});
	}
	else if(!isEmpty(id)&&id=="modal.memo")//ë©”ëª¨
	{		
		$("#modallayer").load(url,function(){memodesc(seq);});
	}
	else if(!isEmpty(id)&&id=="modal.orderchange")//ë©”ëª¨
	{		
		$("#modallayer").load(url,function(){orderchangedesc(seq);});
	}
	else if(!isEmpty(id)&&id=="modal.medioper")
	{
		url+="&no="+title;
		$("#modallayer").load(url);
	}
	else if(!isEmpty(id)&&id=="modal.products")
	{		
		url+="&type="+title;
		$("#modallayer").load(url,function(){productsdesc(seq, title);});
	}
	else if(!isEmpty(id)&&id=="modal.recivetied")
	{
		$("#modallayer").load(url,function(){callapi("GET","order",getdata("cartreceivetied")+"&seq="+seq); });
	}
	else
	{
		if(!isEmpty(title))
		{
			$("#modallayer").load(url, function(){$("#modalTitle").text(title);});
		}
		else
		{
			$("#modallayer").load(url);
		}
	}	
}
function requestDelivery(id) {
	$('#loader').addClass('js-active');
	$('body').css('overflow', 'hidden');

	setTimeout(function(){
		$('#loader').removeClass('js-active');
		$('#requestDelivery').addClass('js-active')
	}, 2000);
}

function removeHistory(id) {
	if(confirm('ë‚´ì—­ì„ ì‚­ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?')) {
		// ajax...

		alert('ë‚´ì—­ì´ ì‚­ì œ ë˜ì—ˆìŠµë‹ˆë‹¤.');
	}
}

function setSlider() {
    var stepsSlider = document.getElementById('steps-slider');
    var input0 = document.getElementById('value-0');
    var input1 = document.getElementById('value-1');
    var inputs = [input0, input1];
    noUiSlider.create(stepsSlider, {
      start: [1, 50],
      connect: true,
      range: {
        'min': 1,
        'max': 100
      },
      format: wNumb({
        decimals: 0
      }),
    });
    stepsSlider.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = values[handle];
    });
}

///======================
//ê³µí†µìœ¼ë¡œ ì“°ì´ëŠ” jquery 
///======================

///ë¹ˆê°’ì²´í¬
function isEmpty(value)
{
   if( value == "" || value == "undefined" || value == "null" || value == null || typeof value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) )
   {
	  return true;
   }
   else
   {
	  return false;
   }
}
//defineì— ì…‹íŒ…ëœ url 
function getUrlData(name)
{
	return $("#NET_"+name).attr("value");
}
///ì½¤ë§ˆ í‘œì‹œ
function comma(str)
{
	str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
///ì½¤ë§ˆì™€ ì†Œìˆ˜ì  í•œìžë¦¬ê¹Œì§€
function commasFixed(n)
{
	n=parseFloat(n);
	n=n.toFixed(1);
    var parts=n.toString().split(".");
	return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ((parseInt(parts[1]) > 0) ? "." + parts[1] : "");
}
///ì½¤ë§ˆì™€ ì†Œìˆ˜ì  ë‘ìžë¦¬ê¹Œì§€
function commasFixed2(n)
{
	n=parseFloat(n);
	n=n.toFixed(2);
    var parts=n.toString().split(".");
	return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ((parseInt(parts[1]) > 0) ? "." + parts[1] : "");
}
///ì½¤ë§ˆì œê±°
function removeComma(n)
{
	//if( typeof n == "undefined" || n == null || n == "" ) 
	if(isEmpty(n))
	{
		return "0"; }
	var txtNumber = '' + n;
	return txtNumber.replace(/(,)/g, "");
}
///jquery cookie set
function setCookie(cname, cvalue) 
{
	var nowdate = new Date();//1ì‹œê°„ 
	nowdate.setTime(nowdate.getTime() + 24 * 60 * 60  * 1000);
	//Cookies.set(cname, cvalue, { expires: nowdate, path: '/',  secure: false });
	Cookies.set(cname, cvalue, { expires: 1, path: '/', domain: getUrlData("DOMAIN"), secure: false });
}
///jquery cookie get
function getCookie(cname) 
{
	if(Cookies.get(cname)==undefined){
		var ckname ="";
	}else{
		var ckname =Cookies.get(cname);
	}
	return ckname;
}
///juqery cookie delete
function deleteAllCookies()
{
	var cookies = Cookies.get();
	for(var cookie in cookies) 
	{
		var ckpop=cookie.substring(0,6);
		if(cookie == "mck_language" || cookie == "mck_languageName" || ckpop=="mck_pop" || cookie=="mck_saveid"){}
		else
		{
			deleteCookie(cookie);
		}
	}
}
//ê²€ìƒ‰ì–´ë„ í•¨ê»˜ ë¬¶ì–´ì„œ api
function getdata(apiCode)
{
	var data="apiCode="+apiCode+"&language=kor";
	//radio data
	$(".radiodata").each(function()
	{
		var name=$(this).attr("name");
		if(!isEmpty(name))
		{
			var value=$("input:radio[name="+name+"]:checked").val();
			if(data.indexOf("&"+name+"=")!=-1){}
			else
			{
				data+="&"+name+"="+encodeURIComponent(value);
			}
		}
	});

	$(".ajaxdata").each(function(){
		var name=$(this).attr("name");
		if(apiCode=="doctormedicinelist" && name=="totalMedicine"){} //ì•½ìž¬ì¶”ê°€ íŒì—…ì°½ api ë¦¬ìŠ¤íŠ¸ì—ì„œëŠ” totalmedicineì„ ë„˜ê²¨ì£¼ì§€ ì•ŠëŠ”ë‹¤. ì•ˆê·¸ëŸ¬ë©´ Request-URI Too Long ì—ëŸ¬ë‚¨  
		else
		{
			data+="&"+name+"="+encodeURIComponent($(this).val());
		}
	});

	$(".searpatient").each(function()
	{
		var name=$(this).attr("name");
		//console.log("name="+name);
		if(!isEmpty(name))
		{
			data+="&"+name+"="+encodeURIComponent($(this).val());
		}
	});
	$(".searorder").each(function()
	{
		var name=$(this).attr("name");
		//console.log("searorder name="+name);
		if(!isEmpty(name))
		{
			data+="&"+name+"="+encodeURIComponent($(this).val());
			//console.log("searorder data="+data);
		}
	});
	
	return data;
}
///calldeliveryapi
function calldeliveryapi(type,group,data)
{
	var furl=getUrlData("API_DELIVERY")+group+"/";
	if(type=="GET")furl+="?";
	
	var key=getCookie("mck_authkey");
	var id=getCookie("mck_meLoginid");
	var ck_cfcode=getCookie("mck_cfcode");
	data=data+"&ckCfcode="+ck_cfcode;

	//console.log("calldeliveryapi url = " + furl+data+", key = "+key+", id = " + id);

	$.ajax({
		type : type, //method
		url : furl,
		data : data,
		//headers : {"ck_authkey" : key, "ck_meLoginid" : id },
		success : function (result) {
			chkMember(type, result);
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
   });
	 return;
}
///callapi :: async : false ëŠ” í¬íŠ¸ì› ê²°ì œì—ì„œ ë¬¸ì œê°€ ìƒê²¨ì„œ.. ë„£ìœ¼ë©´ ì•ˆë¨..
function callapi(type,group,data)
{
	if(group=="migration/transfer"){
		var furl=getUrlData("API_MIGRATION")+"transfer/";
	}else{
		var furl=getUrlData("API_MEDICAL")+group+"/";
	}
	if(type=="GET")furl+="?";
	
	var key=getCookie("mck_authkey");
	var id=getCookie("mck_meLoginid");
	var ck_cfcode=getCookie("mck_cfcode");
	data=data+"&ckCfcode="+ck_cfcode;

	console.log("callapi url = " + furl+data+", key = "+key+", id = " + id);

	$.ajax({
		type : type, //method
		url : furl,
		data : data,
		//headers : {"ck_authkey" : key, "ck_meLoginid" : id },
		success : function (result) {
			chkMember(type, result);
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
   });
	 return;
}
///callapi í›„ì— ì²˜ë¦¬í•  í•¨ìˆ˜ 
function chkMember(type, result)
{
	var remoteip=$("input[name=remoteip]").val();
	//console.log("remoteip = " +remoteip);
	/*
	if(remoteip=="59.7.50.122")
	{
	*/
		if(result.indexOf("DBERR_MSG")!=-1)
		{
			var NET_SERVER_MSG=$("#NET_SERVER_MSG").attr("value");
			var NET_SERVER_TITLE=$("#NET_SERVER_TITLE").attr("value");
			//alert("["+NET_SERVER_TITLE+"]\n"+NET_SERVER_MSG);
			var ck_cfcode=getCookie("mck_cfcode");
			//console.log("ck_cfcode="+ck_cfcode);
			$("#noticeDiv").remove();
			goscreen('');
			var noticeDiv="<div id='noticeDiv'></div>";
			$("#wrapper").before(noticeDiv);
			$("#noticeDiv").html(NET_SERVER_MSG);
		}
		else
		{
			var obj = JSON.parse(result);
			if(obj["apiCode"]=="configcompanylist" && obj["code"] == "djmedi"){
				getcompanylist(obj);
			} else if(obj["apiCode"]=="paymethodlist" || obj["apiCode"]=="paymethoddelete" || obj["apiCode"]=="paypassupdate" || (obj["apiCode"]=="billingkeyupdate" && obj["ctype"]=="myinfo")){
				makepage_al(result);
			} else{
				makepage(result);
			}
		}
	/*
	}
	else
	{
		var NET_SERVER_MSG=$("#NET_SERVER_MSG").attr("value");
		var NET_SERVER_TITLE=$("#NET_SERVER_TITLE").attr("value");
		//alert("["+NET_SERVER_TITLE+"]\n"+NET_SERVER_MSG);
		var ck_cfcode=getCookie("mck_cfcode");
		console.log("ck_cfcode="+ck_cfcode);
		$("#noticeDiv").remove();
		goscreen('');
		var noticeDiv="<div id='noticeDiv'></div>";
		$("#wrapper").before(noticeDiv);
		$("#noticeDiv").html(NET_SERVER_MSG);
	}
	*/
}


/*
//í•„ìˆ˜ë°ì´í„° ì²˜ë¦¬
function ajaxnec()
{
	var nec="Y";
	$(".ajaxnec").each(function(){
		$("#" + $(this).data("chk_layer")).hide();
		var dt=$(this).val();
		if(isEmpty(dt))
		{
			$("#" + $(this).data("chk_layer")).show().html("<span class=\"error_message red\">í•„ìˆ˜ì •ë³´ìž…ë‹ˆë‹¤.</span>");
			nec="N";
		}
	});
	return nec;
}

*/
//í•„ìˆ˜ë°ì´í„° ì²˜ë¦¬
function ajaxnec()
{
	var nec="Y";
	$(".ajaxnec").each(function(){
		var dt=$(this).val();
		if(isEmpty(dt))
		{
			var title=$(this).attr("placeholder");
			if (title=="ì„±ë³„")
			{
				alert("("+title+") ì„ íƒ í•´ì£¼ì„¸ìš”.");				
			} else {
				alert("("+title+") ìž…ë ¥ í•´ì£¼ì„¸ìš”.");
			}
			nec="N";
			return false;
		}
	});
	return nec;
}

//select box parsing 
function parserselect(pgid, list, name, title)
{
	var txt='';
	txt='<select name="'+name+'" id="'+name+'" class="ajaxdata" title="'+title+'" >';
	$.each(list, function(val) {
		var chkY=list[val]["cdValue"];
		var bcls="";
		if(chkY=="Y")//ê¸°ë³¸ë² ì´ìŠ¤ ì„ íƒ 
		{
			bcls="selected";
		}
		txt+='<option value="'+list[val]["cdCode"]+'" '+bcls+'>'+list[val]["cdName"]+'</option>';
	});
	txt+='</select>';

	$("#"+pgid).html(txt);
}
///ì˜¤ëŠ˜ë‚ ì§œ ë½‘ì•„ì˜¤ê¸°  20190124(ë…„ì›”ì¼) - yearcntê°€ 2ì´ë©´ 190124
function getNowDate()
{
	var date = new Date();
	var year = date.getFullYear();
	var month = new String(date.getMonth()+1);
	var day = new String(date.getDate());

	return nowDate = year + "." + pad(month,2) + "." + pad(day,2);
}
///í˜„ìž¬ì‹œê°„ ë½‘ì•„ì˜¤ê¸°  20190124120000(ë…„ì›”ì¼ì‹œë¶„ì´ˆ) - yearcntê°€ 2ì´ë©´ 190124
function getNowTime()
{
	var date = new Date();
	var nowTime =date.getFullYear()+pad(date.getMonth()+1,2)+pad(date.getDate(),2);
			nowTime+=pad(date.getHours(),2)+pad(date.getMinutes(),2)+pad(date.getSeconds(),2);
	return nowTime;
}
//í˜„ìž¬ìš”ì¼ ë½‘ì•„ì˜¤ê¸° 
function getNowDay()
{
	var week=["sun","mon","tue","wed","thu","fri","sat"];
	var weektxt=["ì¼","ì›”","í™”","ìˆ˜","ëª©","ê¸ˆ","í† "];
	var day =new Date().getDay();
	var nowDay =[week[day],weektxt[day]];
	return nowDay;
}
//ë‚´ì¼ë‚ ì§œ ë½‘ì•„ì˜¤ê¸° 
function getTomorrowDate()
{ 
	var today = new Date(); 
	var tomorrow = new Date(today.valueOf() + (24*60*60*1000)); 
	var year = tomorrow.getFullYear(); 
	var month = tomorrow.getMonth() + 1; 
	var day = tomorrow.getDate(); 

	return nowDate = year + "." + pad(month,2) + "." + pad(day,2);
}
///ìžë¦¿ìˆ˜
function pad(n, width)
{
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

//ë”ë³´ê¸° 
function viewmore(dir, apicode, page, tpage)
{
	//ë”ë³´ê¸° 
	$("input[name=page]").val(page);
	page=parseInt(page)+1;
	if(page <= tpage)
	{
		$("#viewmoreDiv").html("<a href=javascript:gopage('"+page+"')><span>ìƒí’ˆë”ë³´ê¸°</span></a>");
	}
	else
	{
		$("#viewmoreDiv").html('<a href="javascript:;"><span style="background:none;">ë§ˆì§€ë§‰ ë°ì´í„° ìž…ë‹ˆë‹¤..</span></a>');
	}
}
//ë”ë³´ê¸° í´ë¦­ì‹œ api call 
function callviewmore(dir, apicode, page)
{
	$("input[name=page]").val(page);
	var urldata="&page="+page+"&viewmore=Y";
	callapi("GET",dir,getdata(apicode)+urldata);
}
///ìˆ«ìžë§Œ ì ê¸°
function onlynumber(evt, check)
{
	if(isEmpty(check)){check=false;}

	var _value = event.srcElement.value;

	//í•œê¸€ì‚­ì œ
	event.srcElement.value=_value.replace( /[ã„±-ã…Ž|ã…-ã…£|ê°€-íž£]/g, '' );

	//ì˜ì–´ì‚­ì œ
	_value = event.srcElement.value;
	event.srcElement.value=_value.replace( /[a-z]/gi, '' );

	//íŠ¹ìˆ˜ë¬¸ìžì‚­ì œ
	_value = event.srcElement.value;
	event.srcElement.value=_value.replace( /[`~!@#$%^&*|\\\'\";:\/?]/gi, '' );

	//ê³µë°± ì‚­ì œ
	_value = event.srcElement.value;
	event.srcElement.value=_value.replace( /^\s*/, '' );

	//ìµœì¢…ì ìœ¼ë¡œ floatë¡œ ë³€í™˜í›„ ì†Œìˆ˜ì  í•œìžë¦¬
	_value = event.srcElement.value;
	_value = !(isEmpty(_value)) ? _value : 0;

	if(check == true)//ì†Œìˆ˜ì 
		event.srcElement.value=parseFloat(_value).toFixed(2);
	else //ì •ìˆ˜
		event.srcElement.value=parseInt(_value);

}
//ì „í™”ë²ˆí˜¸, íœ´ëŒ€í°ë²ˆí˜¸ ìˆ«ìžë§Œ ìž…ë ¥í•˜ê²Œ í•˜ê¸° 
function changePhoneNumber(evt)
{
	var _value = event.srcElement.value;
	//í•œê¸€ì‚­ì œ
	event.srcElement.value=_value.replace( /[ã„±-ã…Ž|ã…-ã…£|ê°€-íž£]/g, '' );

	//ì˜ì–´ì‚­ì œ
	_value = event.srcElement.value;
	event.srcElement.value=_value.replace( /[a-z]/gi, '' );

	//íŠ¹ìˆ˜ë¬¸ìžì‚­ì œ
	_value = event.srcElement.value;
	event.srcElement.value=_value.replace( /[`~!@#$%^&*|\\\'\";:\/?]/gi, '' );

	//ê³µë°± ì‚­ì œ
	_value = event.srcElement.value;
	event.srcElement.value=_value.replace( /^\s*/, '' );

	//ìµœì¢…ì ìœ¼ë¡œ floatë¡œ ë³€í™˜í›„ ì†Œìˆ˜ì  í•œìžë¦¬
	_value = event.srcElement.value;
	_value = !(isEmpty(_value)) ? _value : "";

	event.srcElement.value = _value;

}
///ì „í™”ë²ˆí˜¸ ì²´í¬ 
function chkPhone(phoneno, phonetitle)
{
	var regExpPhone = /^\d{2,3}-\d{3,4}-\d{4}$/;
	var regExpPhone2 = /^\d{4}-\d{4}$/;
	var regExpPhone3 = /^\d{3,4}-\d{3,4}-\d{4}$/;
	var bak_phoneno=phoneno;
	//console.log("chkPhone==>",phoneno, !regExpPhone.test(phoneno), !regExpPhone2.test(phoneno), !regExpPhone3.test(phoneno));

	bak_phoneno=bak_phoneno.replace(/\-/g,"");
	bak_phoneno=bak_phoneno.replace(" ","");

	if(isEmpty(bak_phoneno))
	{
		alert(phonetitle + " ì „í™”ë²ˆí˜¸ë¥¼ ìž…ë ¥í•´ ì£¼ì„¸ìš”1.");
		return false;
	}
	if (!regExpPhone.test(phoneno) && !regExpPhone2.test(phoneno) && !regExpPhone3.test(phoneno)) 
	{
		alert(phonetitle + " ì „í™”ë²ˆí˜¸ë¥¼ ë°”ë¥´ê²Œ ìž…ë ¥í•´ ì£¼ì„¸ìš”1.");
		return false;
	}


	var moarr=phoneno.split("-");
	if(!isEmpty(moarr))
	{
		if(moarr[0]=="00" && moarr[1]=="000")
		{
			alert(phonetitle+" ì „í™”ë²ˆí˜¸ë¥¼ ë°”ë¥´ê²Œ ìž…ë ¥í•´ ì£¼ì„¸ìš”2.");
			return false;
		}
		if(moarr[0]=="00" && moarr[1]=="0000")
		{
			alert(phonetitle+" ì „í™”ë²ˆí˜¸ë¥¼ ë°”ë¥´ê²Œ ìž…ë ¥í•´ ì£¼ì„¸ìš”3.");
			return false;
		}

		if(moarr[0]=="000" && moarr[1]=="0000")
		{
			alert(phonetitle+" ì „í™”ë²ˆí˜¸ë¥¼ ë°”ë¥´ê²Œ ìž…ë ¥í•´ ì£¼ì„¸ìš”4.");
			return false;
		}

		if(moarr[0]=="0000" && moarr[1]=="0000")
		{
			alert(phonetitle+" ì „í™”ë²ˆí˜¸ë¥¼ ë°”ë¥´ê²Œ ìž…ë ¥í•´ ì£¼ì„¸ìš”5.");
			return false;
		}

		if(moarr[1]=="0000" && moarr[2]=="0000")
		{
			alert(phonetitle+" ì „í™”ë²ˆí˜¸ë¥¼ ë°”ë¥´ê²Œ ìž…ë ¥í•´ ì£¼ì„¸ìš”5.");
			return false;
		}
	}
	//// /(02|0[3-9]{1}[0-9]{1})-[1-9]{1}[0-9]{2,3}-[0-9]{4}$/;
    //var regExp = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
	///(^02|^0502|^0504|^0505|^0506|^0507|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/
	var regExp_ctn=/^(01[016789]{1}|02|0502|0504|0505|0506|0507|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/;
	var result = regExp_ctn.test(phoneno);
	if(result==false &&  regExpPhone2.test(phoneno)==false)//1644-0072 ì²˜ëŸ¼ ë‘ìžë¦¬ ì¶”ê°€
	{
		alert(phonetitle+" ì „í™”ë²ˆí˜¸ë¥¼ ë°”ë¥´ê²Œ ìž…ë ¥í•´ ì£¼ì„¸ìš”6.");
		return false;
	}



	return true;
}
///íœ´ëŒ€ì „í™” ì²´í¬ 
function chkMobile(mobileno, mobiletitle)
{
	var regExpMobile = /^\d{2,3}-\d{3,4}-\d{4}$/;
	var bak_mobileno=mobileno;

	bak_mobileno=bak_mobileno.replace(/\-/g,"");
	bak_mobileno=bak_mobileno.replace(" ","");

	if(isEmpty(bak_mobileno))
	{
		alert(mobiletitle+" íœ´ëŒ€ì „í™”ë¥¼ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
		return false;
	}

	if (!regExpMobile.test(mobileno)) 
	{
		alert(mobiletitle+" íœ´ëŒ€ì „í™”ë¥¼ ë°”ë¥´ê²Œ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
		return false;
	}

	var moarr=mobileno.split("-");
	if(!isEmpty(moarr))
	{
		if(moarr[0]=="000" && moarr[1]=="0000")
		{
			alert(mobiletitle+" íœ´ëŒ€ì „í™”ë¥¼ ë°”ë¥´ê²Œ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
			return false;
		}

		if(moarr[1]=="0000" && moarr[2]=="0000")
		{
			alert(mobiletitle+" íœ´ëŒ€ì „í™”ë¥¼ ë°”ë¥´ê²Œ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
			return false;
		}
	}

    //var regExp = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
	var regExp_ctn = /^(01[016789]{1}|02|0502|0504|0505|0506|0507|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/;
    var result = regExp_ctn.test(mobileno);
	if(result==false)
	{
		alert(mobiletitle+" íœ´ëŒ€ì „í™”ë¥¼ ë°”ë¥´ê²Œ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
		return false;
	}
    //console.log(result);

	return true;
}
//ì•„ì´ë””ìž…ë ¥(ìˆ«ìžì™€ì˜ë¬¸ë§Œê°€ëŠ¥)
function changeID(evt)
{
	var _value = event.srcElement.value;
	//í•œê¸€ì‚­ì œ
	event.srcElement.value=_value.replace( /[ã„±-ã…Ž|ã…-ã…£|ê°€-íž£]/g, '' );

	//ìµœì¢…ì ìœ¼ë¡œ floatë¡œ ë³€í™˜í›„ ì†Œìˆ˜ì  í•œìžë¦¬
	_value = event.srcElement.value;
	_value = !(isEmpty(_value)) ? _value : "";
	event.srcElement.value = _value;
}
///ì˜ˆë¹„ì¡°ì œ ë°œì†¡ë¦¬ìŠ¤íŠ¸ 
function callproductlist(code)
{
	var urldata="&code="+code;
	callapi("GET","goods",getdata("productslist")+urldata);
}
///ì˜ˆë¹„ì¡°ì œ ë°œì†¡ ê·¸ë¦¬ê¸° 
function viewproductslist(list)
{
	var item='';
	$('#deliveryList').html('');
	if(!isEmpty(list))
	{
		if(getCookie("mck_cfcode") == "cy")
		{
			item+='<li class="deliveryList__title"><dl><dd class="title">í’ˆëª©ëª…</dd><dd class="price">ì²˜ë°©ê°€</dd></dl></li>';
		}
		else
		{
			item+='<li class="deliveryList__title"><dl><dd class="title">ìƒí’ˆëª…</dd><dd class="price">ê°€ê²©</dd></dl></li>';
		}
		$.each(list ,function(index, val){ 
			var chk=val["predata"]["psChk"];
			var bomgoodslist=val["predata"]["bomgoodslist"];			

			var gdBomCapa=val["gdBomCapa"];  //ì‚¬ì „ì²©ë°© ìš”êµ¬ëŸ‰
			var psCnt    =val["predata"]["psCnt"]; // ì‚¬ì „ì²˜ë°©ë‚¨ì€ëŸ‰

			item += '<li class="deliveryList__item">';
				item+='<div class="thumb">'+getImgSrc(val["afThumbUrl"])+'</div>';
				if(val["gdSoldout"]=="Y")
				{
					item+='<p class="name" onclick="alert(\'í’ˆì ˆìž…ë‹ˆë‹¤.\')" style="cursor:pointer">'+val["gdName"]+'</p>';
				}
				else
				{
					item+='<p class="name" onclick=\'closemodal("modalDeliveryList");location.href="/goods/#1|'+val["gdCode"]+'|"\' style="cursor:pointer">'+val["gdName"]+'</p>';
				}
				
				//for(var i=0;i<bomgoodslist.length;i++)
				//{
				//	item+='<p>'+bomgoodslist[i]["bomtext"]+"("+bomgoodslist[i]["bomcnt"]+")"+'</p><br>';
				//}
				if(chkAuthority("goods")=="pos")
				{
					item+='<strong class="price">'+comma(val["gdSalesprice"])+'</strong>\n';
				}
				if(val["gdSoldout"]=="Y")
				{
					item+='<span onclick="alert(\'í’ˆì ˆìž…ë‹ˆë‹¤.\')" style="cursor:pointer">í’ˆì ˆ</span>\n';
				}
				else
				{
					/*
					if(chk=="Y"){
						item+='<a href="javascript:goProductorder(\''+val["gdGoods"]+'\', \''+val["gdCode"]+'\')">ë°œì†¡ìš”ì²­</a>\n';
					}
					*/
					if(chk=="Y" && psCnt>=gdBomCapa){ // ì‚¬ì „ì²˜ë°©ë‚¨ì€ëŸ‰ >= ìš”êµ¬ëŸ‰
						item+='<a href="javascript:goProductorder(\''+val["gdGoods"]+'\', \''+val["gdCode"]+'\')">ë°œì†¡ìš”ì²­</a>\n';
					}
					else if(chk=="Y" && psCnt < gdBomCapa){
						item+='<span>ì˜ˆë¹„ì¡°ì œí•„ìš”</span>\n';
					}
					else if(chk=="P")
					{
						item+='<span>ì¤€ë¹„ì¤‘</span>\n';
					}
					else if(chk=="N")
					{
						item+='<span>ì˜ˆë¹„ì¡°ì œí•„ìš”</span>\n';
					}
					else
					{
						item+='<span>ìˆ˜ëŸ‰ë¶€ì¡±</span>\n';
					}
				}

				item+='      </li>';
		});
	}

	else
	{
		if(getCookie("mck_cfcode") == "cy")
		{
			item='ë°œì†¡ê°€ëŠ¥í•œ í’ˆëª©ì´ ì—†ìŠµë‹ˆë‹¤.';
		}
		else
		{
			item='ë°œì†¡ê°€ëŠ¥í•œ ìƒí’ˆì´ ì—†ìŠµë‹ˆë‹¤.';
		}

	}
	$('#deliveryList').append(item);
	$('#loader').removeClass('js-active');
	$('#modalDeliveryList').addClass('js-active');
}

///modal ë‹«ê¸° 
function closemodal(id)
{
	$("#"+id).remove();
	$("#modallayer").remove();
}
//ë°œì†¡ìš”ì²­ë²„íŠ¼ í´ë¦­ì‹œ 
function goProductorder(goods,code)
{
	location.href="/goods/productorder.php?goods="+goods+"&product="+code;
}
//ë°œì†¡ìš”ì²­ë²„íŠ¼ í´ë¦­ì‹œ 
function goProductorder2(goods,code)
{
	location.href="/goods/productorder.php?goods="+code+"&product="+code;
}
//---------------------
///ìš°íŽ¸ë²ˆí˜¸
//---------------------
//ìš°íŽ¸ë²ˆí˜¸ê²€ìƒ‰
function getzip2(zipfld,addrfld)
{
	$("#viewlayer").remove();
	var width=800;
	var height=600;
	var arr=popupcenter(width,height).split("|");
	var top=arr[0];
	var left=arr[1];
	goscreen('');
	var style="position:fixed;top:0;left:0;z-index:10000;background:#fff;overflow:hidden;";
		style+="display:block;width:"+width+"px;height:"+height+"px;margin:"+top+"px 0 0 "+left+"px;";
	$("body").prepend("<div id='viewlayer' style='"+style+"'></div>");

	$("#viewlayer").load("../_module/postal/index.php?zipfld="+zipfld+"&addrfld="+addrfld);
}
//ìš°íŽ¸ë²ˆí˜¸ê²€ìƒ‰
function getzip(zipfld,addrfld){
	medicalviewlayer("../_module/postal/index.php?zipfld="+zipfld+"&addrfld="+addrfld,800,600,"ìš°íŽ¸ë²ˆí˜¸ê²€ìƒ‰","");
}

function medicalviewlayer(url,width,height,code)
{
	$("#viewlayer").remove();

	if(width==""||width==undefined){width=900;}
	if(height==""||height==undefined){height=600;}
	if(code=="img"){
		width = $(window).width() - 50;
		height = $(window).height() - 50;
	}
	var arr=popupcenter(width,height).split("|");
	var top=arr[0];
	var left=arr[1];
	goscreen('');
	var style="position:fixed;top:0;left:0;z-index:3000;background:#fff;overflow:hidden;";
		style+="display:block;width:"+width+"px;height:"+height+"px;margin:"+top+"px 0 0 "+left+"px;";
	$("body").prepend("<div id='viewlayer' style='"+style+"'></div>");

	if(code=="html"||code=="img"){
		$("#viewlayer").html(url);
	}else{
		$("#viewlayer").load(url);
	}
	
}

function goscreen(type)
{
	if(type=="close"){
		$("#screen").fadeOut(300).remove();
	}else{
		$("#screen").remove();
		var dh = $(document).height();
		var style="background:#000;filter:alpha(opacity=30);opacity:0.3;position:fixed;top:0;left:0;width:100%;height:"+dh+"px;z-index:2500;";
		var txt="<div id='screen' style='"+style+"'></div>";
		$("body").prepend(txt);
	}
}
function closediv(id)
{
	goscreen("close");
	$("#"+id).remove();
}

//í™”ë©´ì¤‘ì•™íŒì—…ë ˆì´ì–´
function popupcenter(dw,dh){
	var winwidth = $(window).width();
	var winheight = $(window).height();

	if(winheight>screen.height){
		winheight=screen.height;
	}
	var left=(parseInt(winwidth)-dw)/2;
	var top=(parseInt(winheight))/2-(dh/2);

	return top+"|"+left;
}
//---------------------

///--------------------------------------------------------------
///ì˜ˆë¹„ì¡°ì œì²˜ë°©ê³¼ ìƒìš©ì²˜ë°©ì—ì„œ ê°™ì´ ê³µë™ìœ¼ë¡œ ì“°ì´ëŠ” í•¨ìˆ˜
///ë°°ì†¡ì •ë³´, êµí™˜/í™˜ë¶ˆ ì‹ ì²­ì•ˆë‚´, êµí™˜/í™˜ë¶ˆ ì•ˆë‚´, êµí™˜/í™˜ë¶ˆ ê¸°ì¤€ 
function viewEtcSetting(data)
{
	var cfShipinfo=cfErguide=cfErinfo=cfErstandard=tmp=""
		var txt=new Array();
		$.each(data,function(idx, val){
			
			var tmp="";
			$.each(val,function(idx2, val2){
				switch(val2["pgType"]){
					case "100":
						tmp+="<p>"+val2["pgContents"]+"</p>";
						break;
					case "500":
						tmp+=val2["pgContents"];
						break;
				}
			});
			
			switch(idx){
				case "shipinfo":
					$("#cfShipinfoDiv").html(tmp);//ë°°ì†¡ì •ë³´
					break;
				case "erguide":
					$("#cfErguideDiv").html(tmp);//ë°°ì†¡ì •ë³´
					break;
				case "erstandard":
					$("#cfErstandardDiv").html(tmp);//ë°°ì†¡ì •ë³´
					break;
			}
		});
	/*
	var cfShipinfo=obj["cfShipinfo"].replace(/\n/g,'<br/>');
	var cfErguide=obj["cfErguide"].replace(/\n/g,'<br/>');
	var cfErinfo=obj["cfErinfo"].replace(/\n/g,'<br/>');
	var cfErstandard=obj["cfErstandard"].replace(/\n/g,'<br/>');

	$("#cfShipinfoDiv").html(cfShipinfo);//ë°°ì†¡ì •ë³´
	$("#cfErguideDiv").html(cfErguide);//êµí™˜/í™˜ë¶ˆ ì‹ ì²­ì•ˆë‚´
	$("#cfErinfoDiv").html(cfErinfo);//êµí™˜/í™˜ë¶ˆ ì•ˆë‚´
	$("#cfErstandardDiv").html(cfErstandard);//êµí™˜/í™˜ë¶ˆ ê¸°ì¤€ 
	*/
}
//ì—°ê´€ìƒí’ˆ
function viewProductList(type, list)
{
	var data='';
	if(!isEmpty(list))
	{
		$.each(list ,function(index, val){ 
			var productUrl=goGoodsUrl(val["gdCode"]);
			data+='<li class="productList__item">';
			data+='	<div class="productList__content">';
			data+='		<div class="thumbnail" onclick="javascript:goRelateUrl(\''+productUrl+'\')" style="cursor:pointer;">';
			data+=getImgSrc(val["afUrl"])+'';
			data+='		</div>';
			data+='		<div class="info">';
			data+='			<div class="flex">';
			if(!isEmpty(val["predata"]) && val["predata"]["chk"]=="Y")
			{
				data+='<span style="background-color: #66b39e;color:white;">ë°œì†¡ê°€ëŠ¥</span> <span>'+comma(val["predata"]["cnt"])+'ea</span>';
			}
			else if(!isEmpty(val["predata"]) &&  val["predata"]["chk"]=="P")
			{
				data+='<span>ì¤€ë¹„ì¤‘</span> <span>ì¡°ì œì™„ë£Œ('+val["predata"]["date"]+')</span>';
			}
			else
			{
				data+='<span>ì˜ˆë¹„ì¡°ì œ í•„ìš”</span> <span>ì¡°ì œê¸°ê°„ '+val["gdWating"]+'</span>ì¼';
			}
			//data+='				<span>ì˜ˆë¹„ì¡°ì œ í•„ìš”</span> ì¡°ì œê¸°ê°„ '+val["gdWating"]+'ì¼';
			data+='			</div>';
			data+='			<p class="description">'+val["gdName"]+'</p>';
			data+='		</div>';
			data+='		<div class="actions">';
			data+='			<a href="'+productUrl+'" class="button"><span>ì˜ˆë¹„ì¡°ì œ</span></a>';
			data+='			<a href="javascript:getDeliveryItem(\''+val["gdCode"]+'\')" class="button"><span class="delivery">ë°œì†¡ìš”ì²­</span></a>';
			data+='		</div>';
			data+='	</div>';
			data+='</li>';
		});
	}

	$("#productlistDiv").html(data);
}
function goRelateUrl(url)
{
	location.href=url;
}
///goods url ì£¼ì†Œ 
function goGoodsUrl(gdcode)
{
	var url="";
	url="/goods/goods.php?goods="+gdcode;
	return url;
}
//product url ì£¼ì†Œ 
function goProductUrl(gdcode)
{
	var url="";
//	url="/goods/product.php?type="+type+"&goods="+gdcode;
	url="/goods/#1|"+gdcode+"|";
	location.href=url;
	//return url;
}
///--------------------------------------------------------------
//ì˜ˆë¹„ì¡°ì œì²˜ë°©, íƒ•ì œì²˜ë°©ì—ì„œ ê³µí†µìœ¼ë¡œ ì“°ì´ëŠ” ì²˜ë°©ìš”ì•½ 
function viewcommpresummary(type, typename, obj)
{
	var today=medicalName=doctorName="";
	if(!isEmpty(obj))
	{
		today=!isEmpty(obj["orderDate"])?obj["orderDate"]:getNowDate();
		medicalName=!isEmpty(obj["medicalName"])?obj["medicalName"]:$("input[name=medicalName]").val();
		doctorName=!isEmpty(obj["doctorName"])?obj["doctorName"]:$("input[name=doctorName]").val();
	}
	else
	{
		today=getNowDate();
		medicalName=$("input[name=medicalName]").val();
		doctorName=$("input[name=doctorName]").val();
	}
	
	if(type=="decoction" || type=="herbal" || type=="powder" || type=="decopill" || type=="ointments") 
	{
		var data=viewselmatype(type);
		$("#typeDiv").html(data);
	}
	else
	{
		//ì²˜ë°©ë¶„ë¥˜ 
		$("#typeDiv").text(typename);
	}
	//ì²˜ë°©ì¼ìž
	$("#todayDiv").text(today);
	//ì²˜ë°©ê¸°ê´€
	$("#medicalDiv").text(medicalName);
	//ì²˜ë°©ì˜
	$("#doctorDiv").text(doctorName);
}
function viewselmatype(type)
{
	var matype=$("textarea[name=cfmatypelist]").val();
	var selcls="";
	var txt='<div class="select">';
		txt+='<select name="selmatype" id="selmatype" onchange="changeselmatype()" class="ajaxdata">';
	if(!isEmpty(matype))
	{
		var cfmatypelist=JSON.parse(matype);
		for(var i=0;i<cfmatypelist.length;i++)
		{
			selcls="";
			if(cfmatypelist[i]["cdCode"]==type){selcls=" selected ";}
			txt+='<option value="'+cfmatypelist[i]["cdCode"]+'" '+selcls+'>'+cfmatypelist[i]["cdName"]+'</option>';
		}
	}
	else
	{
		var carr=["decoction","herbal","powder","decopill","ointments"];
		var tarr=["íƒ•ì œ","ì²©ì œ","ì‚°ì œ","í™˜ì œ","ê³ ì œ"];

		for(var i=0;i<carr.length;i++)
		{
			selcls="";
			if(carr[i]==type){selcls=" selected ";}
			txt+='<option value="'+carr[i]+'" '+selcls+'>'+tarr[i]+'</option>';
		}
	}
		txt+='</select>';
		txt+='</div>';

	return txt;
}
function changeselmatype()
{
	var selmatype=$("select[name=selmatype]").val();
	if(isEmpty(selmatype))selmatype=$("input[name=selmatype]").val();
	var medicalseq=$("input[name=medicalseq]").val(); 
	if(!isEmpty(medicalseq))
	{
		if(confirm("ê¸°ì¡´ì²˜ë°©ì´ ìžˆìŠµë‹ˆë‹¤. ìƒˆë¡œìš´ ì²˜ë°©ì„ ì§„í–‰í•˜ì‹œê² ìŠµë‹ˆê¹Œ?"))
		{
			goPillChart(selmatype);
		}	
	}
	else
	{
		goPillChart(selmatype);
	}
}
///í•œì˜ì›ë“±ê¸‰
function chkGrade(grade)
{
	grade=!isEmpty(grade) ? grade : "E";

	if(grade=="A" || grade=="B" || grade=="C" || grade=="D" || grade=="E")
	{
		return grade.toUpperCase();
	}
	else
	{
		return "";
	}
}

//ê²€ìƒ‰ì´ˆê¸°í™”
function reset(){
	$(".seardata").each(function(){
		$(this).val("");
	});
	setTimeout("golist();",500);
}
//ê²€ìƒ‰ë°ì´í„°
function seardata(){
	var data="";
	$(".seardata").each(function(){
		var name=$(this).attr("name");
		//select:selected radio:checked checkbox: checked,  prop
		var val=encodeURI($(this).val());
		if(val!=""){
			data+="&"+name+"="+val;
		}
	});
	$("input[name=search]").val(data);
	data=encodeURIComponent(data);
	return data;
}

//ê²€ìƒ‰ë°ì´í„°
function listdata(){
	var data="";
	$(".listdata").each(function(){
		var name=$(this).attr("name");
		var val=encodeURI($(this).val());
		if(val!=""){
			data+="&"+name+"="+val;
		}
	});
	return data;
}

function ajaxdata(){
	var data="";
	$(".ajaxdata").each(function(){
		var name=$(this).attr("name");
		var val=encodeURI($(this).val());
		if(val!=""){
			data+="&"+name+"="+val;
		}
	});
	return data;
}

function gethash(){
	var hs=location.hash.split("|");
	var seq=$("input[name=seq]").val();
	var page=$("input[name=page]").val();
	var search=decodeURIComponent(seardata());
	var mod=$("input[name=mod]").val();
	if(hs[2]==undefined)hs[2]="";
	if(!isEmpty(hs[2]))
	{
		if(encodeURIComponent(hs[2])!=seardata()){

			$("input[name=page]").val(1);
			page=1;
		}
	}
	location.hash=page+"|"+seq+"|"+decodeURIComponent(seardata())+"|"+mod;
	return;
}

// ìƒì„¸ë³´ê¸°
function goview(seq){
	$("input[name=seq]").val(seq);
	$("input[name=mod]").val("");
	gethash();
}
function goviewtitle(seq,title){
	$("input[name=seq]").val(seq);
	$("input[name=rc_title]").val(title);
	gethash();
}
// ë¦¬ìŠ¤íŠ¸
function golist(){
	$("input[name=seq]").val("");
	$("input[name=mod]").val("");
	gethash();
}
// ì“°ê¸°
function gowrite(code){
	if(code=="add")$("input[name=seq]").val("add");
	if(code=="add")
	{
		$("input[name=mod]").val("reg");
	}
	else if(code=="update")
	{
		$("input[name=mod]").val("mod");
	}
	gethash();
}
// ë³µì‚¬
function gocopy(){
	var flag = true;
	//if(getCookie("mck_cfcode") == "cy"){		
		$.each($('#recipeMedi .mm_state') ,function(index, val){
			//console.log(index , $(val).attr('data-attr1'));
			if($(val).attr('data-attr1') != 'Y'){			
				flag = false;
				alert('[ì•½ìž¬ë³€ê²½í•„ìš”] í•­ëª©ì˜ ì•½ìž¬ ë³€ê²½í›„\n ë‹¤ì‹œì‹œë„í•´ì£¼ì„¸ìš”.');
				return false;
			}			
		});	
	//}

	if(flag){
		$("input[name=mod]").val("reg");
		gethash();
	}

}
// íŽ˜ì´ì§•
function gopage(page){
	$("input[name=page]").val(page);
	gethash();
}
// ê²€ìƒ‰
function gosearch(){
	var btnsearch=$("#btnsearch").data("search");
	console.log("gosearch btnsearch = " + btnsearch);
	if(btnsearch=="ok"){return;}
	//var search="search="+$("input[name=searchTxt]").val();
	var searchTxt=$("input[name=searchTxt]").val();
	const korean = /[ã„±-ã…Ž]/;
 
	if(!isEmpty(searchTxt))
	{
		if(searchTxt.length<2 || korean.test(searchTxt)==true)
		{
			alert("ë‘ê¸€ìžì´ìƒë§Œ ê²€ìƒ‰ ë©ë‹ˆë‹¤.");
			return;
		}
		var search=seardata();
		$("input[name=search]").val(search);
		$("input[name=page]").val(1);
		gethash();
	}
	else
	{
		var search=seardata();
		$("input[name=search]").val(search);
		$("input[name=page]").val(1);
		gethash();
	}
}

function paging(tpage, page, block, psize){
	block=parseInt(block);
	psize=parseInt(psize);
	var prev=next=0;
	var inloop = (parseInt((page - 1) / block) * block) + 1;
	prev = inloop - 1;
	next = inloop + block;
	var txt="";
	var link = "";
	if(prev<1){
		link = "";prev = 1;
	}else{
		link = "gopage("+prev+", "+psize+","+block+");";
	}
	//txt+="<a href='javascript:gopage(1,"+psize+","+block+");' class=''></a>";
	txt+="<a href='javascript:"+link+";' class='arrow arrow-prev'>ì´ì „</a>";
	if(tpage<1){//ë°ì´í„°ê°€ ì—†ì„ ê²½ìš°
		txt+="<a href='javascript:gopage(1);' class='"+cls+"'>1</a>";
	}else{
		for (var i=inloop;i < inloop + block;i++){
			if (i <= tpage){
				if(i==page){var cls="active";}else{var cls="";}
				txt+="<a href='javascript:gopage("+i+");' class='"+cls+"'>"+i+"</a>";
			}
		}
	}
	if(next>tpage){
		link = "";next=tpage;
	}else{
		link = "gopage("+next+")";
	}
	txt+="<a href='javascript:"+link+";' class='arrow arrow-next'>ë‹¤ìŒ</a>";
	//txt+="<a href='javascript:gopage("+tpage+");' class='last'>&nbsp;</a>";
	txt+="";
	$("#paging").html(txt);
	return false;
}

function spaging(id,tpage, page, block, psize){
	
	block=parseInt(block);
	psize=parseInt(psize);
	var prev=next=0;
	var inloop = (parseInt((page - 1) / block) * block) + 1;
	prev = inloop - 1;
	next = inloop + block;
	var txt="";
	var link = "";

	if(prev>1){
		txt+="<a href=javascript:subpage('"+id+"',"+prev+") class='arrow arrow-prev'>ì´ì „</a>";
	}
	if(tpage<1){//ë°ì´í„°ê°€ ì—†ì„ ê²½ìš°
		txt+="<a href=javascript:subpage('"+id+"',1) class='"+cls+"'>1</a>";
	}else{
		for (var i=inloop;i < inloop + block;i++){
			if (i <= tpage){
				if(i==page){var cls="active";}else{var cls="";}
				txt+="<a href=javascript:subpage('"+id+"',"+i+") class='"+cls+"'>"+i+"</a>";
			}
		}
	}
	if(next<tpage){
		txt+="<a href=javascript:subpage('"+id+"',"+next+") class='arrow arrow-next'>ë‹¤ìŒ</a>";
	}
	txt+="";
	$("#"+id).html(txt);
	return false;
}

function subpage(id,page){
	//$("input[name=page]").remove();
	//$("#"+id).before("<input type='hidden' name='page' class='ajaxdata' value='"+page+"'>");
	$("input[name=page]").val(page);

	switch(id)
	{
	case "papg":
		callapi("GET","patient",getdata("patientlist"));//í™”ë©´ì— 6ê°œë°–ì— ì•ˆë³´ìž„ 
		break;
	case "rcpg":
		var pgrecipe=$("#reNHISrecipe").hasClass("active");
		var pgmedicine=$("#reNHISmedicine").hasClass("active");

		if(pgrecipe==true)
		{
			callrecipeapi();
		}
		if(pgmedicine==true)
		{
			callNHISmedicineapi();
		}
		break;
	case "recipepapg":
		searchrecipe(page);
		break;
	case "medicinepg":
		medicinelist(page);
		break;
	case "doctormedicinepg":
		doctormedicinelist(page);
		break;
	case "pagingpop":
		var productsseq=$("input[name=productsseq]").val();
		var productstype=$("input[name=productstype]").val();
		callapi("GET","goods",getdata("productsstaffdesc")+"&seq="+productsseq+"&type="+productstype+"&page="+page);
		break;
	}
}
function changeordertieddata(chkdata)
{
	$("#deliverysel").attr("disabled", chkdata);
	$("input[name=deliveryDate]").attr("disabled", chkdata);
	$("input[name=reReceiverType]").prop("disabled", chkdata);
	$("#receivebtnid").attr("disabled", chkdata);

	$("input[name=receiveName]").attr("disabled", chkdata);
	$("input[name=receivePhone]").attr("disabled", chkdata);
	$("input[name=receiveMobile]").attr("disabled", chkdata);
	$("input[name=receiveZipcode]").attr("disabled", chkdata);
	$("input[name=receiveAddress]").attr("disabled", chkdata);
	$("input[name=receiveAddressDesc]").attr("disabled", chkdata);
}
///ìž„ì‹œì €ìž¥, ì²˜ë°©í•˜ê¸°ë“±.. ì €ìž¥í›„ì— ì–´ë””ë¡œê°ˆì§€ 
function getorderregist(json)
{
	if(json["resultCode"]=="200")
	{
		var seq=json["seq"];
		var keycode=json["keyCode"];
		var orderCode=json["orderCode"];
		var type=json["type"];
		var jsonData=json["jsonData"];
		var orderStatus=json["orderStatus"];
		var obj=JSON.parse(jsonData);
		obj["orderInfo"][0]["keycode"]=keycode;

		//console.log("getorderregistgetorderregistgetorderregist type = " + type);

		if(type=="reorder" || type=="next")
		{
			$("input[name=medicalseq]").val(seq);
			$("input[name=medicalkeycode]").val(keycode);
			$("input[name=medicalordercode]").val(orderCode);
			$("textarea[name=join_jsondata]").val(JSON.stringify(obj));
		}
		
		if(type=="cart")
		{
			if(orderStatus=="payment" || orderStatus=="done")
			{
				alert("ë°°ì†¡ì •ë³´ê°€ ìˆ˜ì •ë˜ì—ˆìŠµë‹ˆë‹¤.");
				//location.href="/mypage/myorder.php";
				location.replace("/mypage/myorder.php");
			}
			else
			{
				if(getCookie("mck_cfcode") == "cy")
				{
					alert("ìž¥ë°”êµ¬ë‹ˆë¡œ ë‹´ì•˜ìŠµë‹ˆë‹¤. ì²˜ë°©ì„ ì™„ë£Œí•´ì•¼ íƒ•ì „ì‹¤ì— ì „ë‹¬ë©ë‹ˆë‹¤.");
				}
				else
				{
					alert("ìž¥ë°”êµ¬ë‹ˆë¡œ ë‹´ì•˜ìŠµë‹ˆë‹¤. ì£¼ë¬¸ì„ ì™„ë£Œí•´ì•¼ íƒ•ì „ì‹¤ì— ì „ë‹¬ë©ë‹ˆë‹¤.");
				}
				//location.href="/mypage/mycart.php";
				location.replace("/mypage/mycart.php");
			}
		}
		else if(type=="reorder") //ìž¬ì²˜ë°©
		{
			alert("ìž¬ì²˜ë°©ë˜ì—ˆìŠµë‹ˆë‹¤.");
			if(json["orderTypeCode"]=="NHIS")//ì²©ì•½ì€ ì—¬ê¸°ë¡œ!
			{
				//location.href="/goods/NHISchart.php?seq="+seq+"&type="+json["orderTypeCode"];
				location.replace("/goods/NHISchart.php?seq="+seq+"&type="+json["orderTypeCode"]);
			}
			else
			{
				//location.href="/goods/chart.php?seq="+seq+"&type="+json["orderTypeCode"];
				location.replace("/goods/chart.php?seq="+seq+"&type="+json["orderTypeCode"]);
			}
		}	
		else if(type=="next") //ë‹¤ìŒë‹¨ê³„ ë°°ì†¡ì§€ì •ë³´ìž…ë ¥ 
		{
			if(json["orderTypeCode"]=="NHIS")//ì²©ì•½ì€ ì—¬ê¸°ë¡œ!
			{
				//location.href="/goods/NHISchartorder.php?seq="+seq+"&type="+json["orderTypeCode"];
				location.replace("/goods/NHISchartorder.php?seq="+seq+"&type="+json["orderTypeCode"]);
			}
			else
			{
				var reorderseq=$("input[name=reorderseq]").val();
				if(!isEmpty(reorderseq))
				{
					//location.href="/goods/chartorder.php?seq="+seq+"&type="+json["orderTypeCode"]+"&reorderseq="+reorderseq;
					location.replace("/goods/chartorder.php?seq="+seq+"&type="+json["orderTypeCode"]+"&reorderseq="+reorderseq);
				}
				else
				{
					//location.href="/goods/chartorder.php?seq="+seq+"&type="+json["orderTypeCode"];
					location.replace("/goods/chartorder.php?seq="+seq+"&type="+json["orderTypeCode"]);
				}
			}
		}
		else
		{
			if(isEmpty(type) || type=="prev")
			{
				alert("ìž„ì‹œì €ìž¥ë˜ì—ˆìŠµë‹ˆë‹¤. ì²˜ë°©ë‚´ì—­ìœ¼ë¡œ ì´ë™í•©ë‹ˆë‹¤.");
				//location.href="/mypage/myorder.php";
				location.replace("/mypage/myorder.php");
			}
		}
	}
	else
	{
		alert("["+json["apiCode"]+"]"+json["resultCode"]+" - "+json["resultMessage"]);
	}
}
function chkallmedicinecode(code)
{
	var chk=false;
	var chkmedi=medicode="";
	if(!isEmpty(code))
	{
		$("#meditbl tbody tr").each(function()
		{
			medicode=$(this).children("td").eq(0).find("input").val();//ì•½ìž¬ì½”ë“œ
			chkmedi+=","+medicode;
		});
		chkmedi+=",";
		//console.log("chkmedi = " + chkmedi);
		if(!isEmpty(chkmedi))
		{
			if(chkmedi.indexOf(","+code+",")!=-1)
			{
				chk=true;
			}
		}
		else
		{
			chk=false;
		}
	}
	else
	{
		$("#meditbl tbody tr").each(function()
		{
			medicode=$(this).children("td").eq(0).find("input").val();//ì•½ìž¬ì½”ë“œ
			//console.log("chkallmedicinecode chkmedi2 = " + chkmedi+", medicode = " + medicode);
			if((chk==false && (chkmedi.indexOf(","+medicode+",")!=-1)))
			{
				chk=true;
			}
			chkmedi+=","+medicode+",";
		});
	}

	return chk;
}
function chkallmedicinecapa()
{
	var chk=false;
	$("#meditbl tbody tr").each(function()
	{
		var mdType=$(this).data("type");
		var mmUnit=$(this).data("unit");
		var mediName=$(this).children("td").eq(1).text();//ì•½ìž¬ëª…
		var mediCapa=$(this).children("td").eq(3).find("input").val();//ì²©ë‹¹ì•½ìž¬ëŸ‰

		if((chk==false && parseFloat(mediCapa)<=0) || ($.isNumeric(mediCapa)==false))
		{
			chk=true;
		}
	});

	return chk;
}
function chkallmedicineamount()
{
	var chk=false;
	$("#meditbl tbody tr").each(function()
	{
		var mediiszero=$(this).data("iszero");
		mediiszero=!isEmpty(mediiszero)?mediiszero:"N";
		var mediName=$(this).children("td").eq(1).find("span").text();//ì•½ìž¬ëª…
		var mediAmount=$(this).children("td").eq(5).find(".amount").attr("value");//ì²©ë‹¹ì•½ìž¬ë¹„
		console.log("mediName = "+mediName+", mediiszero = " + mediiszero+", mediAmount = " + mediAmount);

		if((chk==false && parseFloat(mediAmount)<=0) || ($.isNumeric(mediAmount)==false))
		{
			if(mediiszero=="Y"){}//ì•½ìž¬ê°€0ì›ë„ì²˜ë°©ê°€ëŠ¥ 
			else
			{
				chk=true;
			}
		}
	});

	return chk;
}
function chkallmedicineuse()
{
	var chk=false;
	$("#meditbl tbody tr").each(function()
	{
		var mediUse=$(this).attr("data-use");
		var mediMaker=$(this).attr("data-maker");
		var mediName=$(this).children("td").eq(1).find("span").text();//ì•½ìž¬ëª…

		if(chk==false && mediUse!='Y')
		{
			chk=true;
		}
		/*if(!isEmpty(mediMaker) && mediMaker=="8071")
		{
			chk=true;
		}*/
	});

	return chk;
}
function chkallmedicinemaker()
{
	var chk=false;
	$("#meditbl tbody tr").each(function()
	{
		var mediName=$(this).children("td").eq(1).find("span").text();//ì•½ìž¬ëª…
		var mediMakerTxt=$(this).children("td").eq(2).find("select").children("option:selected").text()
		if(chk==false && isEmpty(mediMakerTxt))
		{
			chk=true;
		}
	});

	return chk;
}

//DOO::ë³µì•½ì„¤ì • - 20220418 
function saveadvicesetting()
{
	var doseDay=$("select[name=doseDay]").children("option:selected").val();
	var doseDaytxt=$("select[name=doseDay]").children("option:selected").text();
	var packCountDay=$("select[name=packCountDay]").children("option:selected").val();
	var packCountDaytxt=$("select[name=packCountDay]").children("option:selected").text();
	var doseRule=$("select[name=doseRule]").children("option:selected").val();
	var doseRuletxt=$("select[name=doseRule]").children("option:selected").text();

	var adviceoption1=$("textarea[name=adviceoption1]").val();
	var adviceoption2=$("textarea[name=adviceoption2]").val();
	var adviceoption3=$("textarea[name=adviceoption3]").val();

	var advicesetting={};

	advicesetting["doseDay"]=!isEmpty(doseDay)?doseDay:"";
	advicesetting["doseDaytxt"]=!isEmpty(doseDaytxt)?doseDaytxt:"";

	advicesetting["packCountDay"]=!isEmpty(packCountDay)?packCountDay:"";	
	advicesetting["packCountDaytxt"]=!isEmpty(packCountDaytxt)?packCountDaytxt:"";

	advicesetting["doseRule"]=!isEmpty(doseRule)?doseRule:"";	
	advicesetting["doseRuletxt"]=!isEmpty(doseRuletxt)?doseRuletxt:"";

	advicesetting["adviceoption1"]=!isEmpty(adviceoption1)?adviceoption1:"";
	advicesetting["adviceoption2"]=!isEmpty(adviceoption2)?adviceoption2:"";
	advicesetting["adviceoption3"]=!isEmpty(doseRule)?adviceoption3:"";

	return advicesetting;
}
function checkgoodshpl(dir)
{
	if(getCookie("mck_cfcode") == "cy")
	{
		var receiveName=$("input[name=receiveName]").val();
		var receiveZipcode=$("input[name=receiveZipcode]").val();
		var receiveAddress=$("input[name=receiveAddress]").val();
		var receiveAddressDesc=$("input[name=receiveAddressDesc]").val();
		var receivePhone=$("input[name=receivePhone]").val();
		var receiveMobile=$("input[name=receiveMobile]").val();

		if(!confirm("â€» ì²˜ë°©ì „ ìˆ˜ì·¨ì •ë³´ í™•ì¸í•´ì£¼ì„¸ìš”!\nìˆ˜ì·¨ì¸ : "+receiveName+"\nì „í™”ë²ˆí˜¸ : "+receivePhone+"\níœ´ëŒ€í° : "+receiveMobile+"\nì£¼ì†Œ : ["+receiveZipcode+"] "+receiveAddress+" " + receiveAddressDesc))
		{
			return false;
		}
	}
	var orderdelivery=$("#deliverysel").val();
	if(orderdelivery=="hpl")
	{
		var medicalkeycode=$("input[name=medicalkeycode]").val();
		var receiveZipcode=$("input[name=receiveZipcode]").val();
		var receiveAddress=$("input[name=receiveAddress]").val();
		var receiveAddressDesc=$("input[name=receiveAddressDesc]").val();
		var receiveAddr=receiveAddress+" "+receiveAddressDesc;
		calldeliveryapi("POST","iHPL",getdata("checkhpl")+"&odCode="+medicalkeycode+"&zipcode="+receiveZipcode+"&receiveaddress="+encodeURIComponent(receiveAddr)+"&dir="+dir);
	}
	else
	{
		saveGoods(dir);
	}
}
function checkNHIShpl(dir)
{
	if(getCookie("mck_cfcode") == "cy")
	{
		var receiveName=$("input[name=receiveName]").val();
		var receiveZipcode=$("input[name=receiveZipcode]").val();
		var receiveAddress=$("input[name=receiveAddress]").val();
		var receiveAddressDesc=$("input[name=receiveAddressDesc]").val();
		var receivePhone=$("input[name=receivePhone]").val();
		var receiveMobile=$("input[name=receiveMobile]").val();

		if(!confirm("â€» ì²˜ë°©ì „ ìˆ˜ì·¨ì •ë³´ í™•ì¸í•´ì£¼ì„¸ìš”!\nìˆ˜ì·¨ì¸ : "+receiveName+"\nì „í™”ë²ˆí˜¸ : "+receivePhone+"\níœ´ëŒ€í° : "+receiveMobile+"\nì£¼ì†Œ : ["+receiveZipcode+"] "+receiveAddress+" " + receiveAddressDesc))
		{
			return false;
		}
	}
	var orderdelivery=$("input[name=orderdelivery]").val();
	if(orderdelivery=="hpl")
	{
		var medicalkeycode=$("input[name=medicalkeycode]").val();
		var receiveAddress=$("input[name=receiveAddress]").val();
		var receiveAddressDesc=$("input[name=receiveAddressDesc]").val();
		var receiveAddr=receiveAddress+" "+receiveAddressDesc;
		calldeliveryapi("POST","iHPL",getdata("checkhpl")+"&odCode="+medicalkeycode+"&receiveaddress="+receiveAddr+"&dir="+dir);
	}
	else
	{
		saveNHISOrder(dir);
	}
}
function checkhpl(dir)
{
	if(getCookie("mck_cfcode") == "cy")
	{
		var receiveName=$("input[name=receiveName]").val();
		var receiveZipcode=$("input[name=receiveZipcode]").val();
		var receiveAddress=$("input[name=receiveAddress]").val();
		var receiveAddressDesc=$("input[name=receiveAddressDesc]").val();
		var receivePhone=$("input[name=receivePhone]").val();
		var receiveMobile=$("input[name=receiveMobile]").val();

		if(!confirm("â€» ì²˜ë°©ì „ ìˆ˜ì·¨ì •ë³´ í™•ì¸í•´ì£¼ì„¸ìš”!\nìˆ˜ì·¨ì¸ : "+receiveName+"\nì „í™”ë²ˆí˜¸ : "+receivePhone+"\níœ´ëŒ€í° : "+receiveMobile+"\nì£¼ì†Œ : ["+receiveZipcode+"] "+receiveAddress+" " + receiveAddressDesc))
		{
			return false;
		}
	}
	var orderdelivery=$("input[name=orderdelivery]").val();
	if(orderdelivery=="hpl")
	{
		var medicalkeycode=$("input[name=medicalkeycode]").val();
		var receiveAddress=$("input[name=receiveAddress]").val();
		var receiveAddressDesc=$("input[name=receiveAddressDesc]").val();
		var receiveAddr=receiveAddress+" "+receiveAddressDesc;
		calldeliveryapi("POST","iHPL",getdata("checkhpl")+"&odCode="+medicalkeycode+"&receiveaddress="+receiveAddr+"&dir="+dir);
	}
	else
	{
		saveOrder(dir);
	}
}
function checkTAhpl(dir)
{
	if(getCookie("mck_cfcode") == "cy")
	{
		var receiveName=$("input[name=receiveName]").val();
		var receiveZipcode=$("input[name=receiveZipcode]").val();
		var receiveAddress=$("input[name=receiveAddress]").val();
		var receiveAddressDesc=$("input[name=receiveAddressDesc]").val();
		var receivePhone=$("input[name=receivePhone]").val();
		var receiveMobile=$("input[name=receiveMobile]").val();

		if(!confirm("â€» ì²˜ë°©ì „ ìˆ˜ì·¨ì •ë³´ í™•ì¸í•´ì£¼ì„¸ìš”!\nìˆ˜ì·¨ì¸ : "+receiveName+"\nì „í™”ë²ˆí˜¸ : "+receivePhone+"\níœ´ëŒ€í° : "+receiveMobile+"\nì£¼ì†Œ : ["+receiveZipcode+"] "+receiveAddress+" " + receiveAddressDesc))
		{
			return false;
		}
	}
	var orderdelivery=$("input[name=orderdelivery]").val();
	if(orderdelivery=="hpl")
	{
		var medicalkeycode=$("input[name=medicalkeycode]").val();
		var receiveAddress=$("input[name=receiveAddress]").val();
		var receiveAddressDesc=$("input[name=receiveAddressDesc]").val();
		var receiveAddr=receiveAddress+" "+receiveAddressDesc;
		calldeliveryapi("POST","iHPL",getdata("checkhpl")+"&odCode="+medicalkeycode+"&receiveaddress="+receiveAddr+"&dir="+dir);
	}
	else
	{
		saveTAOrder(dir);
	}
}
function calcdecoctotalml()
{
	//íˆ¬ìž…ë¬¼ëŸ‰ì€ ë‚˜ì˜¬ë¬¼ëŸ‰cc+ì•½ìž¬ë¬´ê²Œ*1.3+ì¦ë°œëŸ‰1000cc(2ì‹œê°„íƒ•ì „ì‹œ) ë¡œ ê³„ì‚°í•˜ì§€ ì•Šìœ¼ì‹¤ê¹Œìš”?
	//íŒ©ìˆ˜+3 í•˜ê¸° (ì´ˆí”¼,ìƒ˜í”Œë“±)
	//ì¦ë°œëŸ‰ ì‹œê°„ë‹¹ 500 ê¸°ì¤€ 
	var medicapa=$("#totCapa").data("medicapa"); //ì•½ìž¬ë¬´ê²Œ 
	medicapa=parseFloat(medicapa)*1.3;

	var dcTime=$("select[name=dcTime]").children("option:selected").val();
	var addwater=0;
	if(!isEmpty(dcTime))
	{
		addwater=500*(dcTime/60); //ì¦ë°œëŸ‰
	}
	
	var packCnt=$("select[name=packCnt]").val();
	var packCapa=$("select[name=packCapa]").val();
	var decoctionTotalml=parseInt(packCnt)*parseInt(packCapa); //ë‚˜ì˜¬ë¬¼ëŸ‰cc
	var chkdecocml=decoctionTotalml + medicapa + addwater;

	return chkdecocml;
}
function chkdecoctotalml()
{
	var chkdecocml=calcdecoctotalml();
	if(parseInt(chkdecocml)>15000)
	{
		return true;
	}
	return false;
}
///ì²˜ë°©ì €ìž¥í•˜ê¸° 
function saveOrder(dir)
{
	if(getCookie("mck_cfcode") == "hp")
	{
		if(chkdecoctotalml()==true)
		{
			alert("[ì²˜ë°©ë¶ˆê°€]\níƒ•ì „ì€ íƒ•ì „ë¬¼ëŸ‰ ê¸°ì¤€ 15,000 ì´ë‚´ì—ì„œ ì§„í–‰ë©ë‹ˆë‹¤. ë§Œì¼ íƒ•ì „ë¬¼ëŸ‰ 15,000ì„ ì´ˆê³¼í•˜ëŠ” ì²˜ë°©ì„ ë„£ìœ¼ì‹œë ¤ë©´ ì²˜ë°©ì„ ë¶„ë¦¬í•˜ì—¬ ë„£ì–´ ì£¼ì‹­ì‹œì˜¤.");
			return;
		}
	}

	if(getCookie("mck_cfcode")=="on")
	{
		var boxmincapa=getboxmedidivon().data("mincapa");
		var boxmaxcapa=getboxmedidivon().data("capa");
		var packCnt=$("select[name=packCnt]").val();
		//í•œì•½ë°•ìŠ¤ìµœì†Œ ìµœëŒ€ì— ë”°ë¼ íŒ©ìˆ˜ë¥¼  ì•Œë¦¼ì°½ 
		boxmincapa=parseInt(boxmincapa);
		boxmaxcapa=parseInt(boxmaxcapa);
		packCnt=parseInt(packCnt);
		console.log("boxmincapa = " + boxmincapa+", boxmaxcapa = " + boxmaxcapa + ", packCnt = "+packCnt);

		if(boxmincapa > packCnt)
		{
			$("select[name=packCnt]").val(boxmincapa);
			alert("[ì²˜ë°©ë¶ˆê°€] ì„ íƒí•˜ì‹  í•œì•½ë°•ìŠ¤ì˜ ìµœì €íŒ©ìˆ˜ì€ "+boxmincapa+"íŒ© ìž…ë‹ˆë‹¤.\në‹¤ì‹œ ì„ íƒí•´ ì£¼ì„¸ìš”.");
			return;
		}

		if(packCnt > boxmaxcapa)
		{
			$("select[name=packCnt]").val(boxmaxcapa);
			alert("[ì²˜ë°©ë¶ˆê°€] ì„ íƒí•˜ì‹  í•œì•½ë°•ìŠ¤ì˜ ìµœëŒ€íŒ©ìˆ˜ì€ "+boxmaxcapa+"íŒ© ìž…ë‹ˆë‹¤.\në‹¤ì‹œ ì„ íƒí•´ ì£¼ì„¸ìš”.");
			resetCnt();
			return;
		}
	}

	var medicodechk=chkallmedicinecode("");
	if(medicodechk==true)
	{
		alert("[ì²˜ë°©ë¶ˆê°€]\nê°™ì€ ì•½ìž¬ê°€ ìžˆìŠµë‹ˆë‹¤. ì•½ìž¬ë¥¼ í™•ì¸í•´ ì£¼ì„¸ìš”.");
		return;
	}

	//DOO:: ì—¬ê¸°ì—ì„œ jsondataë¥¼ ë§ìž 
	var capachk=chkallmedicinecapa();

	if(capachk==true)
	{
		alert("[ì²˜ë°©ë¶ˆê°€]\nì²˜ë°©ëŸ‰ì´ ìž˜ëª»ëœ(0í¬í•¨) ì•½ìž¬ê°€ ìžˆìŠµë‹ˆë‹¤. ë‹¤ì‹œ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
		return;
	}

	var usechk=chkallmedicineuse();
	if(usechk==true)
	{
		alert("[ì²˜ë°©ë¶ˆê°€]\nì²˜ë°©í• ìˆ˜ì—†ëŠ” ì•½ìž¬ê°€ ìžˆìŠµë‹ˆë‹¤.");
		return;
	} 

	var amountchk=chkallmedicineamount();

	if(amountchk==true)
	{
		alert("[ì²˜ë°©ë¶ˆê°€]\nê°€ê²©ì´ ì—†ëŠ” ì•½ìž¬ê°€ ìžˆìŠµë‹ˆë‹¤.");
		return;
	} 

	//ë³µìš©ì§€ ë°°ê²½ 240911
	var orderadvicebg=$("#advicebg").val();

	var miIsadvice=$("input[name=miIsadvice]").val();
	miIsadvice=!isEmpty(miIsadvice)?miIsadvice:"N";
	if(miIsadvice=="Y")
	{
		var orderadvicefile=$("textarea[name=orderadvicefile]").val();
		if(!isEmpty(CKEDITOR.instances.editor)){
			var orderAdvice=CKEDITOR.instances.editor.getData();
		}
		//console.log("orderadvicefile = " + orderadvicefile);
		//console.log("orderAdvice = " + orderAdvice);

		if(isEmpty(orderadvicefile) && isEmpty(orderAdvice))
		{
			alert("[ì²˜ë°©ë¶ˆê°€]\në³µìš©ë²•ì´ ì—†ìŠµë‹ˆë‹¤.");
			return;
		}
	}

	var orderAdviceKey=$("select[name=advicesel]").val();

	if(!isEmpty(orderAdviceKey)&&parseInt(orderAdviceKey)>0)
	{
		var orderAdviceName=$("select[name=advicesel]").children("option:selected").text();
		if(!isEmpty(CKEDITOR.instances.editor)){
			var orderAdvice=CKEDITOR.instances.editor.getData();
		}
		var orderadvicefile=$("textarea[name=orderadvicefile]").val();
		if(isEmpty(orderadvicefile) && isEmpty(orderAdvice))
		{
			alert("[ì²˜ë°©ë¶ˆê°€]"+orderAdviceName+"ì´(ê°€)\nì„ íƒë˜ì—ˆì§€ë§Œ ë‚´ìš©ì€ ì—†ìŠµë‹ˆë‹¤.\në³µìš©ë²•ì„ ë‹¤ì‹œ í™•ì¸í•´ ì£¼ì„¸ìš”.");
			return;
		}
	}

	var odmrdesc=$("#odmrdesc").val();
	if(odmrdesc=="marking08" || odmrdesc=="marking09" || odmrdesc=="marking18")
	{
		var mr_linetxt1=$("input[name=mr_linetxt1]").val();
		if(odmrdesc=="marking09" || odmrdesc=="marking18")
		{
			if(isEmpty(mr_linetxt1))
			{
				alert("ë§ˆí‚¹ ìž…ë ¥ë¬¸êµ¬1ì„ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
				return;
			}
		}
		var chkmr=chkmarkingtextreg(mr_linetxt1);
		if(chkmr==false)
		{
			alert("ë§ˆí‚¹ ìž…ë ¥ë¬¸êµ¬1ì€ ìˆ«ìž,ë¬¸ìž,íŠ¹ìˆ˜ë¬¸ìž ~!%*()_|-?,.<>{}[]/ ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤.");
			return;
		}
		if(odmrdesc=="marking08")
		{
			var mr_linetxt2=$("input[name=mr_linetxt2]").val();
			var chkmr=chkmarkingtextreg(mr_linetxt2);
			if(chkmr==false)
			{
				alert("ë§ˆí‚¹ ìž…ë ¥ë¬¸êµ¬2ì€ ìˆ«ìž,ë¬¸ìž,íŠ¹ìˆ˜ë¬¸ìž ~!%*()_|-?,.<>{}[]/ ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤.");
				return;
			}
		}
	}


	var selmatype=$("select[name=selmatype]").children("option:selected").val();

	if(selmatype=="ointments" || selmatype=="decopill" || selmatype=="powder" || selmatype=="herbal")
	{
		var matypeminsettingdata=$("textarea[name=matypeminsetting]").val();
		var decopillstick=0
		if(!isEmpty(matypeminsettingdata))
		{
			var selmatypecapa=0;
			var matypeminsetting=JSON.parse(matypeminsettingdata);
			$.each(matypeminsetting,function(idx, val){
				if(val["code"]==selmatype)
				{
					selmatypecapa=val["data"];
					return false;
				}
			});
			$.each(matypeminsetting,function(idx, val){
				if(val["code"]=="decopillstick")
				{
					decopillstick=val["data"];
					return false;
				}
			});
			selmatypecapa=parseInt(selmatypecapa);

			var medicapa=$("#totCapa").data("medicapa");

			if(parseInt(medicapa) < parseInt(selmatypecapa))
			{
				alert("[ì²˜ë°©ë¶ˆê°€]\n"+selmatypecapa+"g ì´ìƒë¶€í„° ì²˜ë°© ê°€ëŠ¥í•©ë‹ˆë‹¤. ì´ì•½ìž¬ëŸ‰ì„ í™•ì¸í•´ ì£¼ì„¸ìš”.");
				return;
			}
		}

		if(selmatype=="decopill")
		{
			var category=getpacktypedivon().data("category");
			var stickcapa=$("select[name=stickcapa]").val();
			if(category=="stick" && isEmpty(stickcapa))
			{
				alert("[ì²˜ë°©ë¶ˆê°€] ìŠ¤í‹±ìš©ëŸ‰ì„ ì„ íƒí•´ ì£¼ì„¸ìš”.");
				return;
			}

			if(category=="stick" && chkstickmincapa()==false)
			{
				alert("[ì²˜ë°©ë¶ˆê°€] ìŠ¤í‹±í¬ìž¥ì€ ì•½ìž¬  "+decopillstick+"g ì´ìƒë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤.");
				return;
			}

		}
	}
	else
	{
		if(selmatype=="decoction")
		{
			var specialDecoc=$("select[name=specialDecoc]").children("option:selected").val();
			if(isEmpty(specialDecoc))
			{
				alert("[ì²˜ë°©ë¶ˆê°€] íƒ•ì „ë²•ì„ í™•ì¸í•´ ì£¼ì„¸ìš”.");
				return;
			}

			var dcTitle=$("select[name=dcTitle]").children("option:selected").val();
			if(isEmpty(dcTitle))
			{
				alert("[ì²˜ë°©ë¶ˆê°€] íƒ•ì „ë°©ì‹ì„ í™•ì¸í•´ ì£¼ì„¸ìš”.");
				return;
			}

			var packtypecapa=getpacktypedivon().data("capa");//$("select[name=packtype]").children("option:selected").data("capa");
			var packCapa=$("select[name=packCapa]").val();
			var packtypemincapa=getpacktypedivon().data("mincapa");
			if(parseInt(packtypemincapa) > parseInt(packCapa))
			{
				if(getCookie("mck_cfcode")!="hm")
				{
					$("select[name=packCapa]").val(packtypemincapa);
				}
				//console.log("2222");
				alert("[ì²˜ë°©ë¶ˆê°€] ì„ íƒí•˜ì‹  íŒŒìš°ì¹˜ì˜ ìµœì €ìš©ëŸ‰ì€ "+packtypemincapa+"ml ìž…ë‹ˆë‹¤.\në‹¤ì‹œ ì„ íƒí•´ ì£¼ì„¸ìš”.");
				return;
			}
		
			if(parseInt(packtypecapa) < parseInt(packCapa))
			{
				if(getCookie("mck_cfcode")!="hm")
				{
					$("select[name=packCapa]").val(packtypecapa);
				}
				//console.log("packtypecapa="+packtypecapa+", packCapa = " + packCapa);
				alert("[ì²˜ë°©ë¶ˆê°€] ì„ íƒí•˜ì‹  íŒŒìš°ì¹˜ì˜ ìµœëŒ€ìš©ëŸ‰ì€ "+packtypecapa+"ml ìž…ë‹ˆë‹¤.\në‹¤ì‹œ ì„ íƒí•´ ì£¼ì„¸ìš”.");
				return;
			}

			var packCnt=$("select[name=packCnt]").val();
			var minpackcapa=getpacktypedivon().data("maxcapa");//íŒŒìš°ì¹˜ì—ì„œ ìµœì†ŒíŒ©ìˆ˜
			packCnt=parseInt(packCnt);
			minpackcapa=parseInt(minpackcapa);

			if(packCnt < minpackcapa)
			{
				$("select[name=packCnt]").val(packCnt);
				alert("[ì²˜ë°©ë¶ˆê°€] ì„ íƒí•˜ì‹  íŒŒìš°ì¹˜ì˜ ìµœì†ŒíŒ©ìˆ˜ëŠ” "+minpackcapa+"íŒ© ìž…ë‹ˆë‹¤.\në‹¤ì‹œ ì„ íƒí•´ ì£¼ì„¸ìš”.");
				return;
			}

			
		}
	}

	var json=JSON.parse($("textarea[name=join_jsondata]").val());
	var medicalseq=$("input[name=medicalseq]").val();
	var keycode=$("input[name=medicalkeycode]").val();//json["orderInfo"][0]["keycode"];
	var ordercode=$("input[name=medicalordercode]").val();//json["orderInfo"][0]["orderCode"];
	var orderdate=json["orderInfo"][0]["orderDate"];
	var deliveryDate=json["orderInfo"][0]["deliveryDate"];
	var miGrade=$("input[name=miGrade]").val();

	if(isEmpty(ordercode) && isEmpty(keycode))
	{
		var orderaddr=createOrderCode();
		ordercode="DJ";
		orderdate=orderaddr["orderdate"];
	}

	deliveryDate=!isEmpty($("input[name=deliveryDate]").val())?$("input[name=deliveryDate]").val():getNowDate();

	json["orderInfo"][0]["keycode"]=keycode;//ì£¼ë¬¸ì½”ë“œ, ë¶€ì‚°ëŒ€ì£¼ë¬¸ì½”ë“œ
	json["deliveryInfo"][0]["patientreceiver"]="N";

	console.log("DOO:: dir : " + dir);

	if(dir=="" || dir=="next")//ìž„ì‹œì €ìž¥ì´ê±°ë‚˜ ë‹¤ìŒë‹¨ê³„
	{
		orderStatus="temp";

		var odpacktype=$("input[name=odpacktype]").val();//íŒŒìš°ì¹˜ 
		var odmedibox=$("input[name=odmedibox]").val();//í•œì•½ë°•ìŠ¤ 
		var medicount=$("#meditbl tbody tr").length;//ì•½ìž¬ ê°¯ìˆ˜ 
		var patientcode=$("input[name=patientcode]").val();//í™˜ìžì½”ë“œ 
		var odtitle=$("input[name=odTitle]").val();

		if(isEmpty(patientcode))
		{
			alert("í™˜ìžë¥¼ ì„ íƒí•´ ì£¼ì„¸ìš”.");
			return;
		}

		if(isEmpty(medicount) || medicount<=0)
		{
			alert("ì•½ìž¬ë¥¼ ì„ íƒí•´ ì£¼ì„¸ìš”.");
			return;
		}

		if(chkMedicineCapa()==false)
		{
			alert("ì•½ìž¬ì˜ ì²©ëŸ‰ì„ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
			return;
		}

		if(isEmpty(odtitle))
		{
			alert("ì²˜ë°©ëª…ì„ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
			return;
		}

		if(dir!="")
		{
			if(isEmpty(odpacktype))
			{
				alert("íŒŒìš°ì¹˜ë¥¼ ì„ íƒí•´ ì£¼ì„¸ìš”.");
				return;
			}

			if(selmatype=="decoction" || selmatype=="ointments" || selmatype=="NHISchart" || selmatype=="herbal")
			{
				if(isEmpty(odmedibox))
				{
					alert("í•œì•½ë°•ìŠ¤ë¥¼ ì„ íƒí•´ ì£¼ì„¸ìš”.");
					return;
				}
			}
		}

		var deliveryDate=$("input[name=deliveryDate]").val();
		if(isEmpty(deliveryDate))
		{
			alert("ë°°ì†¡ì¶œê³ ì¼ì„ ì„ íƒ í•´ ì£¼ì„¸ìš”.");
			return;
		}
	
		var medicalId=$("input[name=medicalId]").val();
		var medicalName=$("input[name=medicalName]").val();


		var doctorId=$("input[name=doctorId]").val();
		var doctorName=$("input[name=doctorName]").val();
		//ìž„ì‹œì €ìž¥ì´ë‚˜ ë°°ì†¡ì •ë³´ ìˆ˜ì •ì‹œì— ì²˜ë°©í•œ í•œì˜ì‚¬ì½”ë“œê°€ ë°”ë€œ..
		if(!isEmpty(json["orderInfo"][0]["doctorCode"]))
		{
			doctorId=json["orderInfo"][0]["doctorCode"];
		}
		else
		{
			doctorId=$("input[name=doctorId]").val();
		}
		if(!isEmpty(json["orderInfo"][0]["doctorName"]))
		{
			doctorName=json["orderInfo"][0]["doctorName"];
		}
		else
		{
			doctorName=$("input[name=doctorName]").val();
		}

		var odTitle=$("input[name=odTitle]").val();
		if(!isEmpty(CKEDITOR.instances.editor)){
			var orderAdvice=CKEDITOR.instances.editor.getData();//$("textarea[name=orderAdvice]").val();
		}
		var orderComment=$("textarea[name=orderComment]").val();
		var orderStatus=json["orderInfo"][0]["orderStatus"];
		var orderadvicefile=$("textarea[name=orderadvicefile]").val();
		var orderadvicefilekey=$("input[name=mdFileIdx]").val();
		if(!isEmpty(orderadvicefile))
		{
			orderadvicefile="|"+orderadvicefile;
		}
		else
		{
			orderadvicefile="";
		}

		var markingcomment=$("input[name=markingcomment]").val();
		var orderAdviceKey=$("select[name=advicesel]").val();
		var orderCommentKey=$("select[name=commentsel]").val();
		var orderAdviceName=$("select[name=advicesel]").children("option:selected").text();
		var orderCommentName=$("select[name=commentsel]").children("option:selected").text();
		var orderCommentContents=$("select[name=commentsel]").children("option:selected").data("contents");
		var orderDelivery=$("#deliverysel option:selected").val();
		var orderDeliveryName=$("#deliverysel option:selected").text();
		var cautionadvice=$("textarea[name=cautionadvice]").val();
		var qualityreport=$("select[name=qualityreport]").children("option:selected").val();
		var qualityreportName=$("select[name=qualityreport]").children("option:selected").text();

		medicalId=!isEmpty(medicalId)?medicalId:getCookie("mck_miUserid");
		medicalName=!isEmpty(medicalName)?medicalName:getCookie("mck_miName");
		doctorId=!isEmpty(doctorId)?doctorId:getCookie("mck_meUserId");
		doctorName=!isEmpty(doctorName)?doctorName:getCookie("mck_meName");
		
		//ìž‘ì€ë”°ì˜´í‘œ ì—†ì• ìž
		if(!isEmpty(orderComment))
		{
			orderComment = orderComment.replace(/'/g, "");
			orderComment = orderComment.replace(/\n/g, "<br>");//í–‰ë°”ê¿ˆì œê±°
			orderComment = orderComment.replace(/\r/g, "<br>");//ì—”í„°ì œê±°
		}

		if(!isEmpty(orderCommentContents))
		{
			orderCommentContents = orderCommentContents.replace(/'/g, "");
		}

		if(!isEmpty(orderAdvice))
		{
			orderAdvice = orderAdvice.replace(/'/g, "");
			//orderAdvice = orderAdvice.replace(/\n/g, "<br>");//í–‰ë°”ê¿ˆì œê±°
			//orderAdvice = orderAdvice.replace(/\r/g, "<br>");//ì—”í„°ì œê±°
		}

		var selmatype=$("select[name=selmatype]").children("option:selected").val();
		var selmatypename=$("select[name=selmatype]").children("option:selected").text();

		//ì£¼ë¬¸ì •ë³´
		json["orderInfo"][0]["keycode"]=keycode;//ì£¼ë¬¸ì½”ë“œ, ë¶€ì‚°ëŒ€ì£¼ë¬¸ì½”ë“œ
		json["orderInfo"][0]["orderCode"]=ordercode;//ì£¼ë¬¸ì½”ë“œ, ë¶€ì‚°ëŒ€ì£¼ë¬¸ì½”ë“œ
		json["orderInfo"][0]["orderDate"]=orderdate;//ì£¼ë¬¸ì¼
		json["orderInfo"][0]["deliveryDate"]=deliveryDate;//ë°°ì†¡í¬ë§ì¼
		json["orderInfo"][0]["medicalCode"]=medicalId;//í•œì˜ì›ì½”ë“œ
		json["orderInfo"][0]["medicalName"]=medicalName;//í•œì˜ì›
		json["orderInfo"][0]["medicalGrade"]=miGrade;//í•œì˜ì›ë“±ê¸‰ 
		json["orderInfo"][0]["doctorCode"]=doctorId;//ì²˜ë°©ìžì½”ë“œ
		json["orderInfo"][0]["doctorName"]=doctorName;//ì²˜ë°©ìž
		json["orderInfo"][0]["orderTitle"]=odTitle;//ì²˜ë°©ëª…
		json["orderInfo"][0]["orderTypeCode"]=selmatype;//ì¡°ì œíƒ€ìž…ì½”ë“œ
		json["orderInfo"][0]["orderType"]=selmatypename;//ì¡°ì œíƒ€ìž…ëª…
		json["orderInfo"][0]["orderCount"]=1;//ì£¼ë¬¸ê°¯ìˆ˜
		json["orderInfo"][0]["productCode"]="";//ì²˜ë°©ì½”ë“œ
		json["orderInfo"][0]["productCodeName"]="";//ì²˜ë°©ì½”ë“œëª…
		json["orderInfo"][0]["markingcomment"]=markingcomment;//ìˆ˜ë™ë§ˆí‚¹ìš”ì²­ì‚¬í•­
		//240911 ë³µì•½ì§€ë„ì„œë°°ê²½
		json["orderInfo"][0]["orderAdviceBG"]=orderadvicebg;//ë³µì•½ì§€ë„ì„œë°°ê²½
		json["orderInfo"][0]["orderAdvice"]=orderAdvice;//ë³µì•½ì§€ë„ì„œ
		json["orderInfo"][0]["orderAdviceKey"]=orderAdviceKey;//ì¡°ì œì§€ì‹œ
		json["orderInfo"][0]["orderAdviceName"]=orderAdviceName;//ì¡°ì œì§€ì‹œ
		json["orderInfo"][0]["orderComment"]=orderComment;//ì¡°ì œì§€ì‹œ
		json["orderInfo"][0]["orderCommentKey"]=orderCommentKey;//ë³µì•½ì§€ë„ì„œ
		json["orderInfo"][0]["orderCommentName"]=orderCommentName;//ë³µì•½ì§€ë„ì„œ
		json["orderInfo"][0]["orderCommentContents"]=orderCommentContents;//ë³µì•½ì§€ë„ì„œ
		json["orderInfo"][0]["orderStatus"]=orderStatus;//ì£¼ë¬¸ìƒíƒœ cart(ìž¥ë°”êµ¬ë‹ˆ),paid(ê²°ìž¬ì™„ë£Œ),done(ë“±ë¡ì™„ë£Œ)
		json["orderInfo"][0]["orderDelivery"]=orderDelivery;//íƒë°°ì‚¬
		json["orderInfo"][0]["orderDeliveryName"]=orderDeliveryName;//íƒë°°ì‚¬ì´ë¦„ 
		json["orderInfo"][0]["cautionadvice"]=cautionadvice;
		json["orderInfo"][0]["qualityreport"]=qualityreport;
		json["orderInfo"][0]["qualityreportName"]=qualityreportName;
		//DOO::ë³µì•½ì„¤ì • - 20220418 
		json["orderInfo"][0]["orderadvicesetting"]=saveadvicesetting();
		json["orderInfo"][0]["orderadvicefile"]=orderadvicefile;
		json["orderInfo"][0]["orderadvicefilekey"]=orderadvicefilekey;

		var od_adminmemo=$("input[name=od_adminmemo]").val();
		od_adminmemo=!isEmpty(od_adminmemo)?od_adminmemo:"";
		json["orderInfo"][0]["od_adminmemo"]=od_adminmemo;
		
		if(selmatype=="herbal") //ì²©ì œ 
		{
			var selherbalpacking=$("select[name=selherbalpacking]").children("option:selected").val();
			var selherbalpackingtxt=$("select[name=selherbalpacking]").children("option:selected").text();
			selherbalpacking=!isEmpty(selherbalpacking)?selherbalpacking:"";
			selherbalpackingtxt=!isEmpty(selherbalpackingtxt)?selherbalpackingtxt:"";

			json["orderInfo"][0]["herbalpacking"]=selherbalpacking;
			json["orderInfo"][0]["herbalpackingName"]=selherbalpackingtxt;
		}
		else if(selmatype=="powder") //ì‚°ì œ 
		{
			var finenesstotal=$("input[name=finenesstotal]").val();
			var finenessunit=$("input[name=finenessunit]").val();
			var finenesscapa=$("input[name=finenesscapa]").val();
			var pFinenessDiv=$("select[name=pFinenessDiv]").children("option:selected").val();
			var pFinenessDivName=$("select[name=pFinenessDiv]").children("option:selected").text();

			//ì‚°ì œ 
			json["orderInfo"][0]["fineness"]=pFinenessDiv;
			json["orderInfo"][0]["finenessname"]=pFinenessDivName;
			json["orderInfo"][0]["finenessunit"]=finenessunit;
			json["orderInfo"][0]["finenesscapa"]=finenesscapa;
			json["orderInfo"][0]["finenesstotal"]=finenesstotal;
		}
		else if(selmatype=="decopill") //í™˜ì œ 
		{
			var pillBindersDiv=$("select[name=pillBindersDiv]").children("option:selected").val();//ê²°í•©ì œ 
			var pillBindersName=$("select[name=pillBindersDiv]").children("option:selected").text();//ê²°í•©ì œ 
			var pillShapeDiv=$("select[name=pillShapeDiv]").children("option:selected").val();//ì œí˜• 
			var pillShapeName=$("select[name=pillShapeDiv]").children("option:selected").text();//ì œí˜• 
			var pFinenessDiv=$("select[name=pFinenessDiv]").children("option:selected").val();//ë¶„ë§ë„ 
			var pFinenessName=$("select[name=pFinenessDiv]").children("option:selected").text();//ë¶„ë§ë„ 

			var finenesscapa=$("input[name=finenesscapa]").val();
			var finenessunit=$("input[name=finenessunit]").val();
			var finenesstotal=$("input[name=finenesstotal]").val();

			var binderscapa=$("input[name=binderscapa]").val();
			var bindersunit=$("input[name=bindersunit]").val();
			var binderstotal=$("input[name=binderstotal]").val();

			var shapecapa=$("input[name=shapecapa]").val();
			var shapeunit=$("input[name=shapeunit]").val();
			var shapetotal=$("input[name=shapetotal]").val();
			var shapetotalcnt=$("input[name=shapetotalcnt]").val();

			//ë¶„ë§ë„
			json["orderInfo"][0]["fineness"]=pFinenessDiv;
			json["orderInfo"][0]["finenessname"]=pFinenessName;
			//ì œë¶„ì™„ì„±ëŸ‰ 
			json["orderInfo"][0]["finenesscapa"]=finenesscapa;
			json["orderInfo"][0]["finenessunit"]=finenessunit;
			json["orderInfo"][0]["finenesstotal"]=finenesstotal;

			//ì œí˜• 
			json["orderInfo"][0]["shape"]=pillShapeDiv;
			json["orderInfo"][0]["shapename"]=pillShapeName;
			//ì œí™˜ì™„ì„±ëŸ‰ 
			json["orderInfo"][0]["shapecapa"]=shapecapa;
			json["orderInfo"][0]["shapeunit"]=shapeunit;
			json["orderInfo"][0]["shapetotal"]=shapetotal;
			json["orderInfo"][0]["shapetotalcnt"]=shapetotalcnt;

			//ê²°í•©ì œ 
			json["orderInfo"][0]["binders"]=pillBindersDiv;
			json["orderInfo"][0]["bindersname"]=pillBindersName;
			//ê²°í•©ì œëŸ‰ 
			json["orderInfo"][0]["binderscapa"]=binderscapa;
			json["orderInfo"][0]["bindersunit"]=bindersunit;
			json["orderInfo"][0]["binderstotal"]=binderstotal;

			//ê¸ˆë°•
			var goldfoil=$("#goldfoil option:selected").val();
			var goldfoiltitle=$("#goldfoil option:selected").text();
			var goldfoilprice=$("#goldfoil option:selected").data("price");
			json["orderInfo"][0]["goldfoil"]=goldfoil;
			json["orderInfo"][0]["goldfoiltitle"]=goldfoiltitle;
			json["orderInfo"][0]["goldfoilprice"]=goldfoilprice;

			//ì½”íŒ…
			//1.ì¢…ë¥˜
			var decopillcoating={};
			var coatingkind=$("#coatingkind option:selected").val();
			var coatingkindtitle=$("#coatingkind option:selected").text();
			var coatingkindmedicode=$("#coatingkind option:selected").data("code");
			var coatingkindprice=$("#coatingkind option:selected").data("price");
			decopillcoating["coatingkind"]=coatingkind;
			decopillcoating["coatingkindtitle"]=coatingkindtitle;
			decopillcoating["coatingkindmedicode"]=coatingkindmedicode;
			decopillcoating["coatingkindprice"]=coatingkindprice;
			//2.ì¹¼ë¼ì¢…ë¥˜
			var coatingcolor=$("#coatingcolor option:selected").val();
			var coatingcolortitle=$("#coatingcolor option:selected").text();
			var coatingcolormedicode=$("#coatingcolor option:selected").data("code");
			var coatingcolorprice=$("#coatingcolor option:selected").data("price");
			decopillcoating["coatingcolor"]=coatingcolor;
			decopillcoating["coatingcolortitle"]=coatingcolortitle;
			decopillcoating["coatingcolormedicode"]=coatingcolormedicode;
			decopillcoating["coatingcolorprice"]=coatingcolorprice;
			//3.í–¥ê¸°ì¢…ë¥˜
			var coatingflavor=$("#coatingflavor option:selected").val();
			var coatingflavortitle=$("#coatingflavor option:selected").text();
			var coatingflavormedicode=$("#coatingflavor option:selected").data("code");
			var coatingflavorprice=$("#coatingflavor option:selected").data("price");
			decopillcoating["coatingflavor"]=coatingflavor;
			decopillcoating["coatingflavortitle"]=coatingflavortitle;
			decopillcoating["coatingflavormedicode"]=coatingflavormedicode;
			decopillcoating["coatingflavorprice"]=coatingflavorprice;

			json["orderInfo"][0]["coating"]=decopillcoating;

			//ë†ì¶•í™˜
			//ë†ì¶•í™˜ë¹„ìœ¨
			var concentrationrate=$("select[name=concentrationrate]").children("option:selected").val(); 
			var concentdata=$("textarea[name=concentjson]").val();
			if(!isEmpty(concentdata))
			{
				var concent=JSON.parse(concentdata);
				json["orderInfo"][0]["concentjson"]=concent;
			}
			else
			{
				json["orderInfo"][0]["concentjson"]="";
			}
			

			//ìŠ¤í‹±ìš©ëŸ‰ 
			var stickcapa=$("#stickcapa").val();
			json["orderInfo"][0]["decopillstick"]="";
			if(!isEmpty(stickcapa))
			{
				json["orderInfo"][0]["decopillstick"]=stickcapa;
			}
			//ìŠ¤í‹±ì¸ì‡„ 
			var decopillstickprt={};
			var stickprtcode=$("select[name=selstickprt]").children("option:selected").val();
			var stickprtname=$("select[name=selstickprt]").children("option:selected").text();
			var stickprtimg=$("select[name=selstickprt]").children("option:selected").data("img");
			var stickprtvalue=$("select[name=selstickprt]").children("option:selected").data("value");
			var stickprtdata=$("#stickprtdata").text();
			//console.log("DOO::stick",stickprtcode, stickprtname, stickprtimg);
			//alert(stickprtcode+" / "+stickprtname+" / "+stickprtimg);
			decopillstickprt["stickprtcode"]="";
			decopillstickprt["stickprtname"]="";
			decopillstickprt["stickprtimg"]="";
			decopillstickprt["stickprtvalue"]="";
			decopillstickprt["stickprtdata"]="";
			if(!isEmpty(stickprtcode))
			{
				decopillstickprt["stickprtcode"]=stickprtcode;
				decopillstickprt["stickprtname"]=stickprtname;
				decopillstickprt["stickprtimg"]=stickprtimg;
				decopillstickprt["stickprtvalue"]=stickprtvalue;
				decopillstickprt["stickprtdata"]=stickprtdata;
			}
			json["orderInfo"][0]["stickprt"]=decopillstickprt;

		}
		else if(selmatype=="ointments")//ì—°ì¡°ì œ 
		{
			//ìŠ¤í‹±ë¬´ê²Œ
			var ointmentsStick=$("#ointmentsStick option:selected").val(); //ìŠ¤í‹±g 
			//ìˆ˜ëŸ‰ì„ íƒ
			var ointmentsQuantity=$("#ointmentsQuantityDiv option:selected").val();
			//ë¹„ìœ¨ì„ íƒ
			var ointmentsRatio=$("#ointmentsRatioDiv option:selected").val();
			var ointmentsRatiotxt=$("#ointmentsRatioDiv option:selected").text();
			//ì²©ìˆ˜
			var ointmentschub=$("#ointmentschub").text();
			//ì²©ë‹¹ì•½ìž¬ëŸ‰
			var ointmentschubmedi=$("#ointmentschubmedi").text();
			//ì•½ìž¬ì´ëŸ‰
			var ointmentstotalmedi=$("#ointmentstotalmedi").data("capa");
			//ë¶€í˜•ì œì¢…ë¥˜
			var excipientKind=$("#excipientKindDiv option:selected").val();
			var excipientKindtxt=$("#excipientKindDiv option:selected").text();
			//ë¶€í˜•ì œë¹„ìœ¨
			var excipientRatio=$("#excipientRatioDiv option:selected").val();
			var excipientRatiotxt=$("#excipientRatioDiv option:selected").text();			
			//ë†ì¶•ì•¡ë¹„ìœ¨
			var concentrateRatio=$("#concentrateRatio").text();
			//ë¶€í˜•ìž¬ì‚¬ìš©ëŸ‰
			var excipientCapa=$("#excipientCapa").text();
			//ë†ì¶•ì•¡ì‚¬ìš©ëŸ‰
			var concentrateCapa=$("#concentrateCapa").text();
			//íƒ•ì „ë²• 
			var ointmentsspecialDecoc=$("#ointmentsspecialDecoc option:selected").val();
			var ointmentsspecialDecoctxt=$("#ointmentsspecialDecoc option:selected").text();

			json["orderInfo"][0]["orderCount"]=ointmentsQuantity;//ì£¼ë¬¸ê°¯ìˆ˜

			json["orderInfo"][0]["ointmentsStick"]=ointmentsStick;
			json["orderInfo"][0]["ointmentsQuantity"]=ointmentsQuantity;
			json["orderInfo"][0]["ointmentsRatio"]=ointmentsRatio;
			json["orderInfo"][0]["ointmentsRatiotxt"]=ointmentsRatiotxt;

			json["orderInfo"][0]["ointmentschub"]=ointmentschub;
			json["orderInfo"][0]["ointmentschubmedi"]=ointmentschubmedi;
			json["orderInfo"][0]["ointmentstotalmedi"]=ointmentstotalmedi;

			json["orderInfo"][0]["excipientKind"]=excipientKind;
			json["orderInfo"][0]["excipientKindtxt"]=excipientKindtxt;

			json["orderInfo"][0]["ointmentsSpecial"]=ointmentsspecialDecoc;
			json["orderInfo"][0]["ointmentsSpecialtxt"]=ointmentsspecialDecoctxt;

			json["orderInfo"][0]["excipientRatio"]=excipientRatio;
			json["orderInfo"][0]["excipientRatiotxt"]=excipientRatiotxt;

			json["orderInfo"][0]["concentrateRatio"]=concentrateRatio;
			json["orderInfo"][0]["excipientCapa"]=excipientCapa;
			json["orderInfo"][0]["concentrateCapa"]=concentrateCapa;

			//ìŠ¤í‹±ì¸ì‡„ 
			var decopillstickprt={};
			var stickprtcode=$("select[name=selstickprt]").children("option:selected").val();
			var stickprtname=$("select[name=selstickprt]").children("option:selected").text();
			var stickprtimg=$("select[name=selstickprt]").children("option:selected").data("img");
			var stickprtvalue=$("select[name=selstickprt]").children("option:selected").data("value");
			var stickprtdata=$("#stickprtdata").text();
			decopillstickprt["stickprtcode"]="";
			decopillstickprt["stickprtname"]="";
			decopillstickprt["stickprtimg"]="";
			decopillstickprt["stickprtvalue"]="";
			decopillstickprt["stickprtdata"]="";
			if(!isEmpty(stickprtcode))
			{
				decopillstickprt["stickprtcode"]=stickprtcode;
				decopillstickprt["stickprtname"]=stickprtname;
				decopillstickprt["stickprtimg"]=stickprtimg;
				decopillstickprt["stickprtvalue"]=stickprtvalue;
				decopillstickprt["stickprtdata"]=stickprtdata;
			}
			json["orderInfo"][0]["stickprt"]=decopillstickprt;
		}
		
		//í™˜ìžì •ë³´
		json["patientInfo"][0]=savepatient();

		//ì²˜ë°©ì •ë³´
		var chubCnt=$("select[name=chubCnt]").val();
		var packCnt=$("select[name=packCnt]").val();
		var packCapa=$("select[name=packCapa]").val();

		json["recipeInfo"][0]["chubCnt"]=chubCnt;
		json["recipeInfo"][0]["packCnt"]=packCnt;
		json["recipeInfo"][0]["packCapa"]=packCapa;

		if(selmatype=="decoction")
		{
			if(isEmpty(chubCnt))
			{
				alert("ì²©ìˆ˜ë¥¼ ì„ íƒ í•´ ì£¼ì„¸ìš”.");
				return;
			}
			if(isEmpty(packCnt))
			{
				alert("íŒ©ìˆ˜ë¥¼ ì„ íƒ í•´ ì£¼ì„¸ìš”.");
				return;
			}
			if(isEmpty(packCapa))
			{
				alert("íŒ©ìš©ëŸ‰ì„ ì„ íƒ í•´ ì£¼ì„¸ìš”.");
				return;
			}
		}

		//ì•½ìž¬
		var mdarr=new Array();
		//ë³„ì „ 
		var sdarr=new Array();
		var isNok=false;
		$("#meditbl tbody tr").each(function()
		{
			var mediHerb=$(this).attr("data-herb");
			var mdType=$(this).attr("data-type");
			var mmIsZero=$(this).attr("data-iszero");
			var mmUnit=$(this).attr("data-unit");
			var mediType=$(this).children("td").eq(6).find("select").val();//ì²˜ë°©íƒ€ìž…
			var mediCode=$(this).children("td").eq(0).find("input").val(); //ì•½ìž¬ì½”ë“œ
			var mediName=$(this).children("td").eq(1).find("span.mtitle").text();//ì•½ìž¬ëª…
			var mediPoison="";//ë…ì„± ( 0 , 1)
			var mediDismatch=""; //ìƒê·¹ ( 0 , 1)
			var mediOrigin="";//ì›ì‚°ì§€ì½”ë“œ
			var mediOriginTxt=$(this).children("td").eq(2).find("span.origin").text();//ì›ì‚°ì§€ëª… 
			var mediMaker="";
			var mediMakerTxt=$(this).children("td").eq(2).find("span.maker").text();//ì œì¡°ì‚¬ëª…  
			var mediCapa=$(this).children("td").eq(3).find("input").val();//ì²©ë‹¹ì•½ìž¬ëŸ‰
			var mediAmount=$(this).children("td").eq(5).find(".amount").attr("value");//ì²©ë‹¹ì•½ìž¬ë¹„
			var mediTotalAmount=$(this).children("td").eq(5).find(".amount").data("total");//í† íƒˆì•½ìž¬ë¹„
			var mediselcapa=$(this).children("td").eq(3).find("select").val();//ê°¯ìˆ˜ 
			
			var mdata={};
			mdata["mediType"]=mediType;
			mdata["mediHerb"]=mediHerb;
			mdata["mediCode"]=mediCode;
			mdata["mediName"]=mediName;
			mdata["mediPoison"]=mediPoison;
			mdata["mediDismatch"]=mediDismatch;
			mdata["mediOrigin"]=mediOrigin;
			mdata["mediOriginTxt"]=mediOriginTxt;
			mdata["mediMaker"]=mediMaker;
			mdata["mediMakerTxt"]=mediMakerTxt;
			mdata["mediCapa"]=mediCapa;
			mdata["mediAmount"]=mediAmount;
			mdata["mediTotalAmount"]=mediTotalAmount;
			mdata["mmIsZero"]=mmIsZero;
			mdata["mmUnit"]=mmUnit;
			mdata["mediselcapa"]=mediselcapa;

			//ë…¹ìš©ì²´í¬ 
			if(isNok==false)
			{
				isNok=chkcfMeditime(mediHerb);
				//console.log("mediHerb = "+mediHerb+", isNok = " + isNok);
			}

			if(mdType=="sweet")
			{
				var sdata={}; 
				sdata["sweetType"]="medicine";
				sdata["sweetCode"]=mediCode;
				sdata["sweetOrigin"]=mediOrigin;
				sdata["sweetOriginTxt"]=mediOriginTxt;
				sdata["sweetName"]=mediName;
				sdata["sweetCapa"]=mediCapa;
				sdata["sweetPrice"]=mediAmount;
				sdata["sweetPrice"]=mediAmount;
				sdata["sweetTotalAmount"]=mediTotalAmount;
				if(!isEmpty(mmUnit)&&parseInt(mmUnit)>0)
				{
					var mediselCapa=$(this).children("td").eq(3).find("select").val();//ì²©ë‹¹ì•½ìž¬ëŸ‰
					sdata["mediselcapa"]=mediselCapa;
				}

				sdarr.push(sdata);
			}
			else
			{			
				mdarr.push(mdata);
			}

		});
		json["recipeInfo"][0]["totalMedicine"]=mdarr;
		var rcMedioper=$("textarea[name=rcMedioper]").val();
		if(!isEmpty(rcMedioper))
		{
			json["recipeInfo"][0]["rcMedioper"]=JSON.parse(rcMedioper);
		}
		

		//ë³„ì „-í”„ë¡ íŠ¸ì—ëŠ” ê°ë¯¸ì œë¡œ ë˜ì–´ìžˆì§€ë§Œ ì‚¬ì‹¤ì€ ë³„ì „ì´ë‹¤  
		var sweetcode=$("select[name=sugar]").val();
		var sweettitle=$("select[name=sugar]").children("option:selected").text();
		var sweetcapa=$("select[name=sugarvol]").val();
		var sweetprice=$("select[name=sugar]").children("option:selected").data("price");

		
		if(!isEmpty(sweetcode))
		{
			var sdata={}; 
			sdata["sweetType"]="sweet";
			sdata["sweetCode"]=sweetcode;
			sdata["sweetName"]=sweettitle;
			sdata["sweetCapa"]=sweetcapa;
			sdata["sweetPrice"]=sweetprice;
			sdarr.push(sdata);
		}

		//ë‹¹ë„
		var sugarbrix=$("#sugarbrix option:selected").val();
		if(!isEmpty(sugarbrix))
		{
			var sdata={}; 
			var sugar_code=$("#sugarkinds option:selected").val();
			var sugar_name=$("#sugarkinds option:selected").text();
			var sugar_brix=$("#sugarbrix option:selected").data("brix");
			var sugar_price=$("#sugarkinds option:selected").data("price");
			var sugartotalamount=$("input[name=sugartotalamount]").val();
			sugar_brix=sugar_brix/100;
			var sugar_capa=parseFloat(packCnt) * parseFloat(packCapa) * parseFloat(sugar_brix);
			sdata["sweetType"]="";
			sdata["sweetCode"]=sugar_code;
			sdata["sweetName"]=sugar_name;
			sdata["sweetCapa"]=sugar_capa;
			sdata["sweetPrice"]=sugar_price;
			sdata["sweetTotalAmount"]=sugartotalamount;
			
			sdarr.push(sdata);
		}
		//í–¥ê¸°
		var flavor=$("#flavor option:selected").val();
		if(!isEmpty(flavor))
		{
			var sdata={}; 
			var flavor_code=$("#flavorkinds option:selected").val();
			var flavor_name=$("#flavorkinds option:selected").text();
			var flavor_price=$("#flavorkinds option:selected").data("price");
			var flavor_odor=$("#flavor option:selected").data("odor");
			var flavortotalamount=$("input[name=flavortotalamount]").val();
			flavor_odor=flavor_odor/100;
			var flavor_capa=parseFloat(packCnt) * parseFloat(packCapa) * parseFloat(flavor_odor);
			sdata["sweetType"]="";
			sdata["sweetCode"]=flavor_code;
			sdata["sweetName"]=flavor_name;
			sdata["sweetCapa"]=flavor_capa;
			sdata["sweetPrice"]=flavor_price;
			sdata["sweetTotalAmount"]=flavortotalamount;
			sdarr.push(sdata);
		}

		//ìží•˜ê±°ì•°í”Œ
		var zahager=$("#zahager option:selected").val();
		if(!isEmpty(zahager))
		{
			var zahagerprice=$("#zahager option:selected").data("price");
			var zahagercode=$("#zahager option:selected").data("code");
			var zahagercnt=$("#zahager option:selected").data("cnt");
			var zahagerunit=$("#zahager option:selected").data("unit");
			var zahagertotalamount=$("input[name=zahagertotalamount]").val();
			var sdata={}; 
			sdata["sweetType"]="";
			sdata["sweetCode"]=zahagercode;
			sdata["sweetName"]="ìží•˜ê±°ì•°í”Œ "+zahager;
			sdata["sweetCapa"]=parseFloat(zahagercnt) * parseFloat(zahagerunit);
			sdata["sweetPrice"]=zahagerprice;
			sdata["sweetTotalAmount"]=zahagertotalamount;
			sdarr.push(sdata);
		}
		//ë…¹ìš©í‹´í¬ì•°í”Œ
		var velvet=$("#velvet option:selected").val();
		if(!isEmpty(velvet))
		{
			var velvetprice=$("#velvet option:selected").data("price");
			var velvetwater=$("#velvet option:selected").data("water");
			var velvetcode=$("#velvet option:selected").data("code");
			var velvetcnt=$("#velvet option:selected").data("cnt");
			var velvetunit=$("#velvet option:selected").data("unit");
			var velvettotalamount=$("input[name=velvettotalamount]").val();
			var sdata={}; 
			sdata["sweetType"]="";
			sdata["sweetCode"]=velvetcode;
			sdata["sweetName"]="ë…¹ìš©í‹´í¬ì•°í”Œ "+velvet;
			sdata["sweetCapa"]=parseFloat(velvetcnt) * parseFloat(velvetunit);
			sdata["sweetPrice"]=velvetprice;
			sdata["sweetTotalAmount"]=velvettotalamount;
			sdarr.push(sdata);
		}

		//ë°œíš¨ìˆ˜
		var fermentedwater=$("#fermentedwater option:selected").val();
		if(!isEmpty(fermentedwater))
		{
			var fermentedwaterprice=$("#fermentedwater option:selected").data("price");
			var fermentedwaterwater=$("#fermentedwater option:selected").data("water");
			var fermentedwatercode=$("#fermentedwater option:selected").data("code");
			var fermentedwatercnt=$("#fermentedwater option:selected").data("cnt");
			var fermentedwaterunit=$("#fermentedwater option:selected").data("unit");
			var fermentedwatertotalamount=$("input[name=fermentedwatertotalamount]").val();
			var sdata={}; 
			sdata["sweetType"]="";
			sdata["sweetCode"]=fermentedwatercode;
			sdata["sweetName"]="ë°œíš¨ìˆ˜ "+fermentedwater;
			sdata["sweetCapa"]=parseFloat(fermentedwatercnt);
			sdata["sweetPrice"]=fermentedwaterprice;
			sdata["sweetTotalAmount"]=fermentedwatertotalamount;
			sdarr.push(sdata);
		}
		
		json["recipeInfo"][0]["sweetMedi"]=sdarr;


		var decocjsondata=$("textarea[name=decocdata]").val();
		var decocdata=(!isEmpty(decocjsondata)?JSON.parse(decocjsondata):"");

		//íƒ•ì „ì •ë³´ 
		var dcTitle=$("select[name=dcTitle]").children("option:selected").val();
		var dcTitletxt=$("select[name=dcTitle]").children("option:selected").text();
		json["decoctionInfo"][0]["dcTitle"]=dcTitle;//íƒ•ì „ë²• 
		json["decoctionInfo"][0]["dcTitletxt"]=dcTitletxt;//íƒ•ì „ë²• 
		//íƒ•ì „ì‹œê°„
		var dcTime=$("select[name=dcTime]").children("option:selected").val();
		/*if(getCookie("mck_cfcode")=="on")
		{
			json["decoctionInfo"][0]["dcTime"]="90";//íƒ•ì „ì‹œê°„ 
		}
		else*/
		{
			json["decoctionInfo"][0]["dcTime"]=dcTime;//íƒ•ì „ì‹œê°„  
		}

		//íƒ•ì „ë¬¼ëŸ‰ê³„ì‚° 
		var type=getdecotype();
		if(type=="spout")
		{
			var cfDecocwater=$("input[name=cfDecocwaterGS]").val();
		}
		else if(type=="big")
		{
			var cfDecocwater=$("input[name=cfDecocwaterGH]").val();
		}
		else
		{
			var cfDecocwater=$("input[name=cfDecocwater]").val();
		}

		json["decoctionInfo"][0]["cfDecocwater"]=cfDecocwater;
		//íƒ•ì „ë¬¼ëŸ‰ 
		var dcWater=$("input[name=dcWater]").val();
		json["decoctionInfo"][0]["dcWater"]=dcWater;

		//console.log("DOO::  cfDecocwater = " + cfDecocwater+", dcWater = " + dcWater);


		//ì•Œì½œ
		var dcAlcohol=$("input[name=dcAlcohol]").val();
		json["decoctionInfo"][0]["dcAlcohol"]=dcAlcohol;

		//íŠ¹ìˆ˜íƒ•ì „ì •ë³´
		var specialDecoc=$("select[name=specialDecoc]").children("option:selected").val();
		var specialDecoctxt=$("select[name=specialDecoc]").children("option:selected").text();
		var specialprice=$("select[name=specialDecoc]").children("option:selected").data("price");
		var specialcapa=$("select[name=specialDecoc]").children("option:selected").data("capa");
		var specialmedicine=$("select[name=specialDecoc]").children("option:selected").data("value");
		var specialpersonnel=$("input[name=specialpersonnel]").val();
		json["decoctionInfo"][0]["specialDecoc"]=specialDecoc;//íŠ¹ìˆ˜íƒ•ì „ì½”ë“œ
		json["decoctionInfo"][0]["specialDecoctxt"]=specialDecoctxt;//íŠ¹ìˆ˜íƒ•ì „ëª… ì˜ˆ)ì£¼ìˆ˜ìƒë°˜
		json["decoctionInfo"][0]["specialDecocprice"]=specialprice;//íŠ¹ìˆ˜íƒ•ì „ë¹„ 
		json["decoctionInfo"][0]["specialDecocper"]=specialcapa;//íŠ¹ìˆ˜íƒ•ì „ë¹„ 
		json["decoctionInfo"][0]["specialDecocmedicine"]=specialmedicine;//íŠ¹ìˆ˜íƒ•ì „ë¹„ 
		json["decoctionInfo"][0]["specialDecocworkprice"]=specialpersonnel;//íŠ¹ìˆ˜íƒ•ì „ë¹„ 


		if($("input:checkbox[name='rehash']").is(":checked")==true)
		{
			json["decoctionInfo"][0]["rehashDecoc"]="Y";
		}
		else
		{
			json["decoctionInfo"][0]["rehashDecoc"]="N";
		}

		//ëƒ‰ì¹¨
		if($("input:checkbox[name='naengchim']").is(":checked")==true)
		{
			json["decoctionInfo"][0]["naengchimDecoc"]="Y";
		}
		else
		{
			json["decoctionInfo"][0]["naengchimDecoc"]="N";
		}
		//ì•½ë°¥ 
		if($("input:checkbox[name='residue']").is(":checked")==true)
		{
			json["decoctionInfo"][0]["residueDecoc"]="Y";
		}
		else
		{
			json["decoctionInfo"][0]["residueDecoc"]="N";
		}
		//console.log("naengchim : "+$("input:checkbox[name='naengchim']").is(":checked"));
		//console.log("naengchimDecoc : "+json["decoctionInfo"][0]["naengchimDecoc"]);

		json["decoctionInfo"][0]["decocdata"]=decocdata;//íƒ•ì „ë²• 

		//ë§ˆí‚¹ì •ë³´
		json["markingInfo"][0]=setmarkingInfo();//ë§ˆí‚¹ì½”ë“œ

		//í¬ìž¥ìž¬ì •ë³´
		var parr=new Array();
		var pdata={};
		//íŒŒìš°ì¹˜
		pdata["packType"]="pouch"; //í¬ìž¥ìž¬ì¢…ë¥˜ pouch(íŒŒìš°ì¹˜),medibox(í•œì•½ë°•ìŠ¤),delibox(ë°°ì†¡ë°•ìŠ¤)
		pdata["packCode"]=$("input[name=odpacktype]").val(); //í¬ìž¥ìž¬ì½”ë“œ
		pdata["packName"]=$("input[name=odpacktypetitle]").val(); //í¬ìž¥ìž¬ëª…
		pdata["packImage"]=$("input[name=odpacktypeimg]").val(); //í¬ìž¥ìž¬ì´ë¯¸ì§€ URL
		pdata["packAmount"]=$("input[name=odpacktypeprice]").val(); //ê°œë³„í¬ìž¥ìž¬ë¹„
		pdata["packCapa"]="0";
		pdata["packCategory"]=$("input[name=odpackcategory]").val(); //í¬ìž¥ìž¬ì¹´í…Œê³ ë¦¬ 
		
		parr.push(pdata);
		var pdata1={};
		//í•œì•½ë°•ìŠ¤
		pdata1["packType"]="medibox"; //í¬ìž¥ìž¬ì¢…ë¥˜ pouch(íŒŒìš°ì¹˜),medibox(í•œì•½ë°•ìŠ¤),delibox(ë°°ì†¡ë°•ìŠ¤)
		pdata1["packCode"]=$("input[name=odmedibox]").val(); //í¬ìž¥ìž¬ì½”ë“œ
		pdata1["packName"]=$("input[name=odmediboxtitle]").val(); //í¬ìž¥ìž¬ëª…
		pdata1["packImage"]=$("input[name=odmediboximg]").val(); //í¬ìž¥ìž¬ì´ë¯¸ì§€ URL
		pdata1["packAmount"]=$("input[name=odmediboxprice]").val(); //ê°œë³„í¬ìž¥ìž¬ë¹„
		pdata1["packCapa"]=$("input[name=odmediboxcapa]").val(); //ê°œë³„í¬ìž¥ìž¬ë¹„
		
		parr.push(pdata1);

		var pdata2={};
		//ë°°ì†¡ë°•ìŠ¤
		pdata2["packType"]="delibox"; //í¬ìž¥ìž¬ì¢…ë¥˜ pouch(íŒŒìš°ì¹˜),medibox(í•œì•½ë°•ìŠ¤),delibox(ë°°ì†¡ë°•ìŠ¤)
		pdata2["packCode"]=$("input[name=odboxdeli]").val(); //í¬ìž¥ìž¬ì½”ë“œ
		pdata2["packName"]=$("input[name=odboxdelititle]").val(); //í¬ìž¥ìž¬ëª…
		pdata2["packImage"]=$("input[name=odboxdeliimg]").val(); //í¬ìž¥ìž¬ì´ë¯¸ì§€ URL
		pdata2["packAmount"]=$("input[name=odboxdeliprice]").val(); //ê°œë³„í¬ìž¥ìž¬ë¹„
		pdata2["packCapa"]="0";
		parr.push(pdata2);

		json["packageInfo"]=parr;
	
		//ë°•ìŠ¤ë¼ë²¨
		var boxcode=$("#boxlabel").val();
		var boxtitle=$("#boxlabel option:selected").attr("data-title");
		var boxdesc=$("#boxlabel option:selected").text();

		var boxdata={};
		var boxarr=new Array();
		boxdata["code"]=boxcode;
		boxdata["title"]=boxtitle;
		boxdata["desc"]=boxdesc;
		boxarr.push(boxdata);
		json["labelInfo"][0]["boxlabel"]=boxarr;

		//ê²°ìž¬ì •ë³´
		var paysugar=$("#paySugar").text();
		paysugar=!isEmpty(paysugar)?paysugar:0;

		var paySpecial=$("#paySpecial").text();
		paySpecial=!isEmpty(paySpecial)?paySpecial:0;

		var cfmkprice=$("input[name=cfmkprice]").val();//ì œë¹„
		var cfdcprice=$("input[name=cfdcprice]").val();//íƒ•ì „ë¹„
		var cfpkprice=$("input[name=cfpkprice]").val();//í¬ìž¥ë¹„
		var cfreprice=$("input[name=cfreprice]").val();//ë°°ì†¡ë¹„ 

		//console.log("DOO::íƒ•ì „ë¹„ cfdcprice  = " + cfdcprice);

 		var cfdcaddprice=$("#DECOdctimePrice").text();
		cfdcaddprice=!isEmpty(cfdcaddprice)?cfdcaddprice:0;

		json["paymentInfo"][0]["cfmkprice"]=cfmkprice;
		json["paymentInfo"][0]["cfdcprice"]=cfdcprice;
		json["paymentInfo"][0]["cfpkprice"]=cfpkprice;
		json["paymentInfo"][0]["cfreprice"]=cfreprice;
		json["paymentInfo"][0]["cfdcaddprice"]=cfdcaddprice;

		var amountTotal=amountMedicine=amountPharmacy=amountDecoction=amountPackaging=amountDelivery=0;
		if(!isEmpty($("textarea[name=amountjson]").val()))
		{
			var amountjson=JSON.parse($("textarea[name=amountjson]").val());
			amountTotal=amountjson["totalamount"];
			var totmedicine=totmaking=totdecoction=totpacking=totsweet=0;
			if(!isEmpty(amountjson["medicine"]))
			{
				var totmediarr=amountjson["medicine"].split(",");
				totmedicine=parseFloat(totmediarr[1]);
			}
			if(!isEmpty(amountjson["medioper"]))
			{
				totmedicine+=parseFloat(amountjson["medioper"]);
			}
			if(!isEmpty(amountjson["sweet"]))
			{
				var totsweetarr=amountjson["sweet"].split(",");
				totsweet+=parseFloat(totsweetarr[4]);
			}
			if(!isEmpty(amountjson["medisweet"]))
			{
				totsweet+=parseFloat(amountjson["medisweet"]);
			}
			if(!isEmpty(amountjson["sweetsugar"]))
			{
				var totsweetsugar=amountjson["sweetsugar"].split(",");
				totsweet+=parseFloat(totsweetsugar[4]);
			}
			if(!isEmpty(amountjson["sweetflavor"]))
			{
				var totsweetflavor=amountjson["sweetflavor"].split(",");
				totsweet+=parseFloat(totsweetflavor[4]);
			}
			if(!isEmpty(amountjson["sweetzahager"]))
			{
				var totsweetzahager=amountjson["sweetzahager"].split(",");
				totsweet+=parseFloat(totsweetzahager[4]);
			}
			if(!isEmpty(amountjson["sweetvelvet"]))
			{
				var totsweetvelvet=amountjson["sweetvelvet"].split(",");
				totsweet+=parseFloat(totsweetvelvet[4]);
			}
			if(!isEmpty(amountjson["sweetfermentedwater"]))
			{
				var totsweetfermentedwater=amountjson["sweetfermentedwater"].split(",");
				totsweet+=parseFloat(totsweetfermentedwater[4]);
			}
			if(!isEmpty(amountjson["making"]))
			{
				var totmakingarr=amountjson["making"].split(",");
				totmaking=parseFloat(totmakingarr[2]);
			}
			if(!isEmpty(amountjson["infirst"]))
			{
				totmaking+=parseFloat(amountjson["infirst"]);
			}
			if(!isEmpty(amountjson["inafter"]))
			{
				totmaking+=parseFloat(amountjson["inafter"]);
			}
			if(!isEmpty(amountjson["medicinecount"]))
			{
				var totmedicountarr=amountjson["medicinecount"].split(",");
				totmaking+=parseFloat(totmedicountarr[1]);
			}
			if(!isEmpty(amountjson["decoction"]))
			{
				var totdecoctionarr=amountjson["decoction"].split(",");
				totdecoction=parseFloat(totdecoctionarr[2]);
			}
			if(!isEmpty(amountjson["powder"]))
			{
				var totpowderarr=amountjson["powder"].split(",");
				totdecoction+=parseFloat(totpowderarr[2]);
			}
			if(!isEmpty(amountjson["herbal"]))
			{
				var totherbalarr=amountjson["herbal"].split(",");
				totdecoction+=parseFloat(totherbalarr[2]);
			}
			if(!isEmpty(amountjson["decopill"]))
			{
				var totdecopillarr=amountjson["decopill"].split(",");
				totdecoction+=parseFloat(totdecopillarr[2]);
			}
			if(!isEmpty(amountjson["coating"]))
			{
				var totdecopillarr=amountjson["coating"].split(",");
				totdecoction+=parseFloat(totdecopillarr[2]);
			}
			if(!isEmpty(amountjson["decopilldiscount"]))
			{
				var totdecopillarr=amountjson["decopilldiscount"].split(",");
				totdecoction+=parseFloat(totdecopillarr[2]);
			}
			if(!isEmpty(amountjson["coatingflavor"]))
			{
				var totdecopillarr=amountjson["coatingflavor"].split(",");
				totdecoction+=parseFloat(totdecopillarr[2]);
			}
			if(!isEmpty(amountjson["concent"]))
			{
				var totdecopillarr=amountjson["concent"].split(",");
				totdecoction+=parseFloat(totdecopillarr[2]);
			}

			if(!isEmpty(amountjson["ointment"]))
			{
				totdecoction+=parseFloat(amountjson["ointment"]);
			}
			if(!isEmpty(amountjson["excipient"]))
			{
				totdecoction+=parseFloat(amountjson["excipient"]);
			}
			if(!isEmpty(amountjson["ointmentspecial"]))
			{
				totdecoction+=parseFloat(amountjson["ointmentspecial"]);
			}
			if(!isEmpty(amountjson["rehash"]))
			{
				totdecoction+=parseFloat(amountjson["rehash"]);
			}
			if(!isEmpty(amountjson["naengchim"]))
			{
				totdecoction+=parseFloat(amountjson["naengchim"]);
			}
			if(!isEmpty(amountjson["residue"]))
			{
				totdecoction+=parseFloat(amountjson["residue"]);
			}
			if(!isEmpty(amountjson["special"]))
			{
				var totspecialarr=amountjson["special"].split(",");
				totdecoction+=parseFloat(totspecialarr[3]);
				if(!isEmpty(amountjson["specialpersonnel"]))
				{
					totdecoction+=parseFloat(amountjson["specialpersonnel"]);
				}
			}
			if(!isEmpty(amountjson["decoctime"]))
			{
				var totdctimearr=amountjson["decoctime"].split(",");
				totdecoction+=parseFloat(totdctimearr[1]);
			}
			if(!isEmpty(amountjson["goldfoil"]))
			{
				var totgoldfoilarr=amountjson["goldfoil"].split(",");
				totdecoction+=parseFloat(totgoldfoilarr[3]);
			}

			if(!isEmpty(amountjson["packing"]))
			{
				var totpackingarr=amountjson["packing"].split(",");
				totpacking=parseFloat(totpackingarr[2]);
			}
			if(!isEmpty(amountjson["poutch"]))
			{
				var totpoutchgarr=amountjson["poutch"].split(",");
				totpacking+=parseFloat(totpoutchgarr[3]);
			}
			if(!isEmpty(amountjson["medibox"]))
			{
				var totmediboxgarr=amountjson["medibox"].split(",");
				totpacking+=parseFloat(totmediboxgarr[3]);
			}
			if(!isEmpty(amountjson["delibox"]))
			{
				var totdeliboxgarr=amountjson["delibox"].split(",");
				totpacking+=parseFloat(totdeliboxgarr[3]);
			}
			if(!isEmpty(amountjson["packingoption"]))
			{
				totpacking+=parseFloat(amountjson["packingoption"]);
			}

			amountMedicine=totmedicine;
			amountSweet=totsweet;
			amountPharmacy=totmaking;
			amountDecoction=totdecoction;
			amountPackaging=totpacking;
			amountDelivery=amountjson["release"];
		}
		json["paymentInfo"][0]["amountJson"]=amountjson;
		json["paymentInfo"][0]["amountTotal"]=amountTotal;//ì´í•©ê³„ 
		json["paymentInfo"][0]["amountMedicine"]=amountMedicine;//ì´ì•½ìž¬ë¹„ 
		json["paymentInfo"][0]["amountAddmedi"]=amountSweet;//ë³„ì „ 
		json["paymentInfo"][0]["amountSugar"]=paysugar;
		json["paymentInfo"][0]["amountSpecial"]=paySpecial;
		json["paymentInfo"][0]["amountPharmacy"]=amountPharmacy;//ì¡°ì œë¹„
		json["paymentInfo"][0]["amountDecoction"]=amountDecoction;//íƒ•ì „ë¹„
		json["paymentInfo"][0]["amountPackaging"]=amountPackaging;//í¬ìž¥ë¹„
		json["paymentInfo"][0]["amountDelivery"]=amountDelivery;//ë°°ì†¡ë¹„;
		json["paymentInfo"][0]["amountInfirst"]="0";//ì„ ì „ë¹„
		json["paymentInfo"][0]["amountInafter"]="0";//í›„í•˜ë¹„ 


	}		
	else if(dir=="prev" || dir=="cart")//ì ‘ìˆ˜ 
	{
		//ë°›ëŠ”ì‚¬ëžŒ, ë³´ë‚´ëŠ”ì‚¬ëžŒ ì •ë³´ 
		if(checkreceiver()==true)
		{
			if(checksender()==true)
			{				
				json["deliveryInfo"][0]=savesenderreceiver();
			}
			else
			{
				return;
			}
		}
		else
		{
			return;
		}

		if(dir=="prev")//ì´ì „ë‹¨ê³„
		{
			orderStatus="temp";
		}
		else
		{
			var jsonos=$("input[name=medicalorderstatus]").val();

			if(jsonos=="payment")
			{
				orderStatus="payment";
			}
			else if(jsonos=="done")
			{
				orderStatus="done";
			}
			else
			{
				orderStatus="cart";
			}

			if($("input:checkbox[name='patientreceiver']").is(":checked")==true)
			{
				json["deliveryInfo"][0]["patientreceiver"]="Y";
			}
		}

		json["orderInfo"][0]["orderStatus"]=orderStatus;//ì£¼ë¬¸ìƒíƒœ cart(ìž¥ë°”êµ¬ë‹ˆ),paid(ê²°ìž¬ì™„ë£Œ),done(ë“±ë¡ì™„ë£Œ)
	
	}

	json["deliveryInfo"][0]["receiveTied"]=!isEmpty($("input[name=receiveTied]").val())?$("input[name=receiveTied]").val():"";

	//ìž„ì‹œì €ìž¥, ë‹¤ìŒë‹¨ê³„, ì ‘ìˆ˜ì—ë„ ì €ìž¥í•˜ìž! 

	$("textarea[name=join_jsondata]").val(JSON.stringify(json));

	orderupdate(dir);

}
///ì£¼ë¬¸ì—…ë°ì´íŠ¸ 
function orderupdate(dir)
{
	var data = $("textarea[name=join_jsondata]").val();
	dir=!isEmpty(dir)?dir:"";
	var doctorId=$("input[name=doctorId]").val();
	if(!isEmpty(data))
	{
		callapi("POST","goods","data="+encodeURIComponent(data)+"&dir="+dir+"&doctorId="+doctorId);  //apicode=orderregist
	}
}

////ì²˜ë°©í•˜ê¸°, ìƒìš”ì²˜ë°©ì—ì„œ ê°™ì´ ì“°ì´ëŠ” í•¨ìˆ˜ë“¤ 
///ì¡°ì œì§€ì‹œ 
function viewcomment(list,key,contents)
{
	//ì¡°ì œì§€ì‹œ
	$("#commentsel").html("");
	$("#commentseldiv").hide();
	$("#commentspandiv").hide();
	var txt="";
	if(!isEmpty(list))
	{
		$("#commentseldiv").show();
		txt+='<option value="">ì„ íƒì•ˆí•¨</option>';
		txt+='<option value="0">ì§ì ‘ìž…ë ¥</option>';
		$.each(list, function(idx, val){
			var seq=val["mdSeq"];
			var title=val["mdTitle"];
			var contents=val["mdContents"];
			txt+='<option value="'+seq+'" data-contents="'+contents+'">'+title+'</option>';
		});
		$("#commentsel").html(txt);
	}
	else
	{
		$("#commentspandiv").show();
		$("#commentseldiv").show();
		txt+='<option value="">ì„ íƒì•ˆí•¨</option>';
		txt+='<option value="0">ì§ì ‘ìž…ë ¥</option>';
		$("#commentsel").html(txt);
	}
	if(!isEmpty(key))
	{
		$("#commentsel option[value="+key+"]").attr("selected", "selected");
	}
	else
	{
		chaengecomment();
	}
	if(!isEmpty(contents))
	{
		var orderComment=contents;
		orderComment=orderComment.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
		$("textarea[name=orderComment]").val(orderComment);
	}
	else
	{
		$("textarea[name=orderComment]").val("");
	}
}
///ë³µìš©ì§€ì‹œ 
function viewadvice(list,key,contents)
{
	$("#advicesel").html("");
	$("#adviceseldiv").hide();	
	$("#advicespandiv").hide();
	$("#advicesettingdiv").hide();
	$("#adviceoptiondiv1").hide();
	$("#adviceoptiondiv2").hide();
	$("#adviceoptiondiv3").hide();

	var txt="";
	if(!isEmpty(list))
	{
		$("#adviceseldiv").show();
		txt+='<option value="">ì„ íƒì•ˆí•¨</option>';
		txt+='<option value="0">ì§ì ‘ìž…ë ¥</option>';
		$.each(list, function(idx, val){
			var seq=val["mdSeq"];
			var title=val["mdTitle"];
			txt+='<option value="'+seq+'">'+title+'</option>';
		});
		$("#advicesel").html(txt);
	}
	else
	{
		
		$("#adviceseldiv").show();
		txt+='<option value="">ì„ íƒì•ˆí•¨</option>';
		txt+='<option value="0">ì§ì ‘ìž…ë ¥</option>';
		$("#advicesel").html(txt);
	}
	if(!isEmpty(key) || key=="0")
	{
		$("input[name=orderAdviceKey]").val(key);
		//$("#advicesel option[value="+key+"]").attr("selected", "selected");
		$("#advicesel option[value="+key+"]").prop("selected", true).trigger("change");
		//console.log("viewadvice  key = " + key);
	}

	if(!isEmpty(contents))
	{
		$("#advicespandiv").show();
	}
	else
	{
		changeadvice();
	}
	if(!isEmpty(contents))
	{
		$("textarea[name=orderAdvice]").val(contents);
		$("#orderAdviceDiv").html(contents);
		
		if(!isEmpty(CKEDITOR.instances.editor)){
			CKEDITOR.instances.editor.setData(contents,function(){CKEDITOR.instances.editor.setData(contents);});
		}
	}
	else
	{
		$("textarea[name=orderAdvice]").val("");
		$("#orderAdviceDiv").html("");
		if(!isEmpty(CKEDITOR.instances.editor)){
			CKEDITOR.instances.editor.setData(contents);
		}
		//CKEDITOR.instances.editor.setData(contents);
	}
}
function chaengecomment()
{
	var commentsel=$("select[name=commentsel]").children("option:selected").val();
	if(!isEmpty(commentsel))
	{
		$("#commentdiv").show();
		var orderCommentContents=$("select[name=commentsel]").children("option:selected").data("contents");
		$("textarea[name=orderComment]").val(orderCommentContents);
		onkeyupcomment();
	}
	else
	{
		$("textarea[name=orderComment]").val("");
		$("#commentdiv").hide();
	}
}
function changeadvice()
{
	var odvicekey=$("input[name=orderAdviceKey]").val();
	var seq=$("select[name=advicesel]").val();
	var ck_cfcode=getCookie("mck_cfcode");
	//console.log("changeadvice odvicekey = " + odvicekey + ", seq = " + seq+"ck_cfcode"+ck_cfcode);

	if(!isEmpty(seq))
	{
		$("#advicespandiv").show();
		if(parseInt(seq)==0)
		{
			
			if(ck_cfcode=="hm" || ck_cfcode=="dj"){
				$("#advicetxt").show();
			}
			
			$("#advicesettingdiv").hide();
			$("#adviceoptiondiv1").hide();
			$("#adviceoptiondiv2").hide();
			$("#adviceoptiondiv3").hide();
		}
		else
		{
			callapi("GET","member",getdata("memberadvicedesc")+"&seq="+seq);
			$("#advicetxt").hide();
		}
		$("input[name=orderAdviceKey]").val(seq);
	}
	else
	{
		//ì„ íƒì•ˆí•¨ìž„..
		$("#adviceseldiv").hide();	
		$("#advicesettingdiv").hide();
		$("#advicespandiv").hide();
		$("#adviceoptiondiv1").hide();
		$("#adviceoptiondiv2").hide();
		$("#adviceoptiondiv3").hide();
		$("#advicetxt").hide();
		$("#advicesel option:eq(0)").prop("selected", true);
		$("#orderAdviceDiv").html("");
		$("textarea[name=adviceoption1]").val("");
		$("textarea[name=adviceoption2]").val("");
		$("textarea[name=adviceoption3]").val("");
		$("textarea[name=orderAdvice]").val("");
		$("textarea[name=originorderAdvice]").val("");
		if(!isEmpty(CKEDITOR.instances.editor))
		{
			CKEDITOR.instances.editor.setData("");
		}
	}
}
function changeadviceoption()
{
	var orderAdvice=$("textarea[name=orderAdvice]").val();
	if(!isEmpty(orderAdvice))
	{
		changeadvicedata();
	}
}
function viewadvicefile(nowadvicefilekey, nowadvicefile, nowadvicefilename)
{
	if(!isEmpty(nowadvicefile))
	{		
		var sliceRs = nowadvicefile.slice(-3);
		
		if(sliceRs=="png" || sliceRs=="bmp" || sliceRs=="jpeg" || sliceRs=="jpg" || sliceRs=="gif" || sliceRs=="PNG" || sliceRs=="JPEG" || sliceRs=="JPG" || sliceRs=="GIF" || sliceRs=="BMP" )
		{
			var imghtml = "<a href=\"javascript:void(0);\" id=\"img_id_"+nowadvicefilekey+"\" data-seq='"+nowadvicefilekey+"' >";
			imghtml+="<img src=\"" + (nowadvicefile) + "\" class='selProductFile' title='Click to remove'>";
		}
		else
		{
			var imghtml = "<a href=javascript:download('"+(nowadvicefile)+"','"+encodeURIComponent(nowadvicefilename)+"') id='orderadvicename'><span>"+nowadvicefilename+"</span></a>";
			//imghtml+="<span>"+nowadvicefilename+"</span>";
		}			
		imghtml+="</a>";

		$(".imgs_wrap").html(imghtml);
	}
}
function viewmemberadvicedesc(obj)
{
	var afUrl = obj["afUrl"];
	if( afUrl != undefined && afUrl != "" ){
		$("textarea[name=orderadvicefile]").val(afUrl);		
		//console.log($(".ip_mdFileIdx").val());
		$(".ip_mdFileIdx").val(obj["mdFileidx"]);	
		//console.log($(".ip_mdFileIdx").val());
		
	}
	var bakorderadvicefile=$("textarea[name=orderadvicefile]").val();
	var bakmdFileIdx=$("input[name=mdFileIdx]").val();
	var nowadvicefile=bakorderadvicefile;
	var nowadvicefilekey=bakmdFileIdx;
	var nowadvicefilename="";
	//console.log("viewmemberadvicedesc bakorderadvicefile = " + bakorderadvicefile);
	//console.log("viewmemberadvicedesc bakorderadvicefile = " + obj["afName"]);

	if(isEmpty(bakorderadvicefile))
	{
		nowadvicefile=obj["afUrl"];
		nowadvicefilekey=obj["mdFileidx"];
		nowadvicefilename=!isEmpty(obj["data"])?obj["data"][0]["afName"]:obj["af_name"];
		nowadvicefilename=!isEmpty(nowadvicefilename)?nowadvicefilename:obj["afName"];
		$("input[name=mdFileIdx]").val(obj["mdFileidx"]);//ë³µìš©ì§€ì‹œì²¨ë¶€ ==> ê°’ ë³€ê²½ì´ ì•ˆë˜ëŠ” ë“¯?
		$("textarea[name=orderadvicefile]").val(obj["afUrl"]);
	}
	else
	{
		nowadvicefilename=!isEmpty(obj["data"])?obj["data"][0]["afName"]:obj["af_name"];
		nowadvicefilename=!isEmpty(nowadvicefilename)?nowadvicefilename:obj["afName"];
	}
	if(!isEmpty(nowadvicefile))
	{
		viewadvicefile(nowadvicefilekey, nowadvicefile, nowadvicefilename);
	}

	$("#orderAdviceDiv").html(obj["mdContents"]);
	$("textarea[name=orderAdvice]").val(obj["mdContents"]);
	$("textarea[name=originorderAdvice]").val(obj["mdContents"]);
	
	if(!isEmpty(obj["mdContents"]))
	{
		changeadvicedata();
	}
}
function changeadvicedata()
{
	//console.log("changeadvicedata changeadvicedata changeadvicedata");
	var ck_miName=!isEmpty(getCookie("mck_miName"))?getCookie("mck_miName"):"[í•œì˜ì›ëª…]";
	var ck_meName=!isEmpty(getCookie("mck_meName"))?getCookie("mck_meName"):"[í•œì˜ì‚¬ëª…]";
	var patientname=$("input[name=patientname]").val();
	patientname=!isEmpty(patientname)?patientname:"[í™˜ìžëª…]";

	if(getCookie("mck_cfcode") == "hs" && (  getCookie("mck_miUserid") == "4000906379" || getCookie("mck_miUserid") == "3365437925"  )){
		patientname  = patientname.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi,"");
	}

	var odTitle=$("input[name=odTitle]").val();
	odTitle=!isEmpty(odTitle)?odTitle:"[ì²˜ë°©ëª…]";

	var doseDaytxt=$("select[name=doseDay]").children("option:selected").text();
	var packCountDaytxt=$("select[name=packCountDay]").children("option:selected").text();
	var doseRuletxt=$("select[name=doseRule]").children("option:selected").text();

	var advicesetting="ì´íˆ¬ì•½ì¼ìˆ˜ : "+doseDaytxt+" x ì¼ë³µìš©íŒ©ìˆ˜ : "+packCountDaytxt+" ìš©ë²• : "+doseRuletxt;

	var adviceoption1=$("textarea[name=adviceoption1]").val();
	adviceoption1=!isEmpty(adviceoption1)?adviceoption1:"[ì˜µì…˜1]";
	var adviceoption2=$("textarea[name=adviceoption2]").val();
	adviceoption2=!isEmpty(adviceoption2)?adviceoption2:"[ì˜µì…˜2]";
	var adviceoption3=$("textarea[name=adviceoption3]").val();
	adviceoption3=!isEmpty(adviceoption3)?adviceoption3:"[ì˜µì…˜3]";

	var contents=$("textarea[name=orderAdvice]").val();
	var origincontents=$("textarea[name=originorderAdvice]").val();

	
	if(!isEmpty(origincontents)){
		if(origincontents.indexOf("[ë³µì•½ì„¤ì •]")!==-1)
		{
			$("#advicesettingdiv").show();
		}

		if(origincontents.indexOf("[ì˜µì…˜1]")!==-1)
		{
			$("#adviceoptiondiv1").show();
		}

		if(origincontents.indexOf("[ì˜µì…˜2]")!==-1)
		{
			$("#adviceoptiondiv2").show();
		}

		if(origincontents.indexOf("[ì˜µì…˜3]")!==-1)
		{
			$("#adviceoptiondiv3").show();
		}
	}
	
	

	$("input[name=ckeditorreadonly]").val("false");
	
	if(!isEmpty(contents))
 	{		
		contents=contents.replace(/\[í•œì˜ì›ëª…\]/gi, ck_miName);
		contents=contents.replace(/\[í•œì˜ì‚¬ëª…\]/gi, ck_meName);
		contents=contents.replace(/\[í™˜ìžëª…\]/gi, patientname);
		contents=contents.replace(/\[ì²˜ë°©ëª…\]/gi, odTitle);
		contents=contents.replace(/\[ë³µì•½ì„¤ì •\]/gi, advicesetting);
		contents=contents.replace(/\[ì˜µì…˜1\]/gi, adviceoption1);
		contents=contents.replace(/\[ì˜µì…˜2\]/gi, adviceoption2);
		contents=contents.replace(/\[ì˜µì…˜3\]/gi, adviceoption3);

		var cal_packCnt = $("select[name=packCnt]").val();
		if(isEmpty(cal_packCnt))
		{
			cal_packCnt=$("input[name=packcnt]").val();
			if(isEmpty(cal_packCnt))
			{
				cal_packCnt="";
			}
		}
		//console.log("cal_packCnt = " + cal_packCnt);
		if(!isEmpty(cal_packCnt))
		{
			contents=contents.replace(/\[íŒ©ìˆ˜\]/gi, cal_packCnt);		
			for(var i = 0; i< 6 ; i++){ // 
				contents=contents.replace('[íŒ©ìˆ˜*1/2]', Math.floor(cal_packCnt/2) );
				contents=contents.replace('[íŒ©ìˆ˜*1/3]', Math.floor(cal_packCnt/3));
			}
		}
	}
	else
	{
		contents="";
	}

	$("#orderAdviceDiv").html(contents);
	$("textarea[name=orderAdvice]").val(contents);
	if(!isEmpty(CKEDITOR.instances.editor))
	{
		CKEDITOR.instances.editor.setData(contents,function(){CKEDITOR.instances.editor.setData(contents);});
	}
}
function deladvicecontents()
{
	$("#advicesel option:eq(0)").prop("selected", true);
	$("#orderAdviceDiv").html("");
	$("input[name=mdFileIdx]").val("");
	$("textarea[name=orderadvicefile]").val("");
	$("textarea[name=adviceoption1]").val("");
	$("textarea[name=adviceoption2]").val("");
	$("textarea[name=adviceoption3]").val("");
	$("textarea[name=orderAdvice]").val("");
	$("textarea[name=originorderAdvice]").val("");
	$("#imgs_wrap_id").html("");
	$(".imgs_wrap").html("");
	$("#input_imgs").val("");
	if(!isEmpty(CKEDITOR.instances.editor))
	{
		CKEDITOR.instances.editor.setData("");
	}
	
}
//saveí• ë•Œ í™˜ìžì •ë³´ ì €ìž¥í•˜ê¸° 
function savepatient()
{
	var json={};
	//í™˜ìžì •ë³´
	var birth=$("input[name=patientbirth]").val();
	birth=birth.replace(".","-");
	json["patientCode"]=$("input[name=patientcode]").val();
	json["patientChartno"]=$("input[name=patientchartno]").val();
	json["patientName"]=$("input[name=patientname]").val();
	json["patientGender"]=$("input[name=patientgender]").val();
	json["patientGendertxt"]=$("input[name=patientgendertxt]").val();
	json["patientBirth"]=birth;
	json["patientAge"]=$("input[name=patientage]").val();
	json["patientPhone"]=$("input[name=patientphone]").val();
	json["patientMobile"]=$("input[name=patientmobile]").val();
	json["patientZipcode"]=$("input[name=patientzipcode]").val();
	json["patientAddr"]=$("input[name=patientaddr]").val();
	json["patientmemo"]=$("textarea[name=patientmemo]").val();  //ì²˜ë°©ë©”ëª¨ì¶”ê°€
	json["patientmedical"]=$("input[name=patientmedical]").val();//í•œì˜ì›ìœ¼ë¡œí–ˆëŠ”ì§€
	//console.log("savepatient  patientmedical = " + $("input[name=patientmedical]").val());
	
	return json;
}
//íƒ•ì œì²˜ë°©ì—ì„œ ìž„ì‹œì €ìž¥ëœ í™˜ìžì •ë³´ ë¶ˆëŸ¬ì˜¤ê¸° 
function setpatient(obj)
{
	var patientChartno=!isEmpty(obj["patientChartno"])?obj["patientChartno"]:"";
	var patientCode=!isEmpty(obj["patientCode"])?obj["patientCode"]:"";
	var patientName=!isEmpty(obj["patientName"])?obj["patientName"]:"";
	var patientGender=!isEmpty(obj["patientGender"])?obj["patientGender"]:"";
	var patientGendertxt=!isEmpty(obj["patientGendertxt"])?obj["patientGendertxt"]:"";
	var patientBirth=!isEmpty(obj["patientBirth"])?obj["patientBirth"]:"";
	var patientAge=!isEmpty(obj["patientAge"])?obj["patientAge"]:"";
	var patientPhone=!isEmpty(obj["patientPhone"])?obj["patientPhone"]:"";
	var patientZipcode=!isEmpty(obj["patientZipcode"])?obj["patientZipcode"]:"";
	var patientAddr=obj["patientAddr0"]+"||"+obj["patientAddr1"];	
	var patientmemo=!isEmpty(obj["patientmemo"])?obj["patientmemo"]:"";
	var patientmedical=!isEmpty(obj["patientmedical"])?obj["patientmedical"]:"";
	
	//í™˜ìžì •ë³´ 
	$("input[name=patientcode]").val(patientCode);
	$("input[name=patientchartno]").val(patientChartno);
	$("input[name=patientname]").val(patientName);
	$("input[name=patientgender]").val(patientGender);
	$("input[name=patientbirth]").val(patientBirth);
	$("input[name=patientphone]").val(patientPhone);
	$("input[name=patientzipcode]").val(patientZipcode);
	$("input[name=patientaddr]").val(patientAddr);
	$("textarea[name=patientmemo]").val(patientmemo); 
	$("input[name=patientage]").val(patientAge);
	$("input[name=patientmedical]").val(patientmedical);
	$("input[name=patientgendertxt]").val(patientGendertxt);
	$("input[name=patientDiv]").val("");

	//console.log("patientmedical = " + $("input[name=patientmedical]").val());
	if(!isEmpty(patientCode))
	{
		var data=patientName+"( "+patientGendertxt+" / "+patientAge+"ì„¸ ) "+patientChartno;
		$("input[name=patientDiv]").val(data);
	}
}
function callmedicalpatient()
{
	$("input[name=patientmedical]").val("1");
	callapi("POST","patient",getdata("patientmedicaldesc"));
}
//ì²˜ë°©ì—ì„œ ì“°ì´ëŠ” í™˜ìžê´€ë ¨ UIí™”ë©´ 
function viewpatient(code, obj)
{
	var txt="";
	var filename=$("#MY_FILE_NAME").attr("value");
	console.log(obj);
	if(code=="medicaldesc")
	{
		$("#searchpatientdiv").show();
	}
	else
	{
		$("#searchpatientdiv").hide();
	}
	$("input[name=patientmedical]").val("");
	switch(code){
		case "medicaldesc"://í™˜ìžë¥¼ í•œì˜ì›ìœ¼ë¡œ ì²˜ë°© 
				//ì•„ëž˜ëŠ” ì²˜ë°©í• ë•Œ order_medicalì— ë“¤ì–´ê°ˆ ë‚´ìš©ë“¤
				//ì²˜ë°© í™˜ìžì½”ë“œ
				$("input[name=patientcode]").val(obj["miUserid"]);//í™˜ìžì½”ë“œë¥¼ í•œì˜ì›ì½”ë“œë¡œ ë„£ì–´ì•¼ í•˜ëŠ”ì§€.. 
				//ì²˜ë°© í™˜ìžëª…
				$("input[name=patientname]").val(obj["miName"]);
				//ì²˜ë°© í™˜ìžì„±ë³„
				$("input[name=patientgender]").val(obj["miSex"]);
				//ì²˜ë°© í™˜ìžì„±ë³„txt
				$("input[name=patientgendertxt]").val(obj["miSexName"]);
				//ì²˜ë°© í™˜ìžìƒì¼
				$("input[name=patientbirth]").val(obj["miBirth"]);
				//ì²˜ë°© í™˜ìž ë‚˜ì´ 
				$("input[name=patientage]").val(obj["miAge"]);
				//ì²˜ë°© í™˜ìžì „í™”ë²ˆí˜¸ 
				$("input[name=patientphone]").val(obj["miPhone"]);
				//ì²˜ë°© í™˜ìžì „í™”ë²ˆí˜¸ 
				$("input[name=patientmobile]").val(obj["miMobile"]);
				//ì²˜ë°© í™˜ìžë©”ëª¨ 
				$("textarea[name=patientmemo]").val(obj["miRemark"]);
				//ì²˜ë°© ìš°íŽ¸ë²ˆí˜¸ 
				$("input[name=patientzipcode]").val(obj["miZipcode"]);
				//ì²˜ë°© ì£¼ì†Œ 
				$("input[name=patientaddr]").val(obj["miAddress"]);
				//ì²˜ë°© ì°¨íŠ¸ë²ˆí˜¸  
				$("input[name=patientchartno]").val(obj["miChartno"]);
				$("input[name=patientmedical]").val("1");

				var data=obj["miName"];
				$("input[name=patientDiv]").val(data);
				
				var reReceiverType=$("input[name='reReceiverType']:checked").val();
				
				if(reReceiverType=="" || reReceiverType=="patient")
				{
					$("input[name=reReceiverType]:radio[value=patient]").prop("checked", true).trigger("click");
				}
			break;
		case "desc":
			var colNm6= 'ë¹„ê³ '; 	
			var colNm6ValNm = "meData";
			if(getCookie("mck_cfcode") == 'hs'){
				colNm6= 'ìµœê·¼ì²˜ë°©ì¼'; 
				colNm6ValNm = "orderLastDate";
			}

			txt+="<table>";
			txt+="	<colgroup><col width=\"125\"><col></colgroup>";
			if(!isEmpty(obj))
			{
				var meData=!isEmpty(obj[colNm6ValNm])?obj[colNm6ValNm]:"";				
				txt+="	<tbody>";
				txt+="	<tr><th class='text-left'>ì°¨íŠ¸ë²ˆí˜¸</th><td class='text-left'>"+obj["meChartno"]+"</td></tr>";
				txt+="	<tr><th class='text-left'>í™˜ìžëª…</th><td class='text-left'>"+obj["meName"]+"</td></tr>";
				txt+="	<tr><th class='text-left'>ì„±ë³„/ë‚˜ì´</th><td class='text-left'>"+obj["meSexName"]+" / "+obj["meAge"]+"</td></tr>";
				txt+="	<tr><th class='text-left'>ì—°ë½ì²˜</th><td class='text-left'>"+obj["meMobile"]+"</td></tr>";
				txt+="	<tr><th class='text-left'>ì£¼ì†Œ</th><td class='text-left'>"+obj["meAddress"]+"</td></tr>";
				txt+="	<tr><th class='text-left'>"+colNm6+"</th><td class='text-left'>"+meData+"</td></tr>";
				txt+="	</tbody>";

				//ì•„ëž˜ëŠ” ì²˜ë°©í• ë•Œ order_medicalì— ë“¤ì–´ê°ˆ ë‚´ìš©ë“¤
				//ì²˜ë°© í™˜ìžì½”ë“œ
				$("input[name=patientcode]").val(obj["meUserid"]);
				//ì²˜ë°© í™˜ìžëª…
				$("input[name=patientname]").val(obj["meName"]);
				//ì²˜ë°© í™˜ìžì„±ë³„
				$("input[name=patientgender]").val(obj["meSex"]);
				//ì²˜ë°© í™˜ìžì„±ë³„txt
				$("input[name=patientgendertxt]").val(obj["meSexName"]);
				//ì²˜ë°© í™˜ìžìƒì¼
				$("input[name=patientbirth]").val(obj["meBirth"]);
				//ì²˜ë°© í™˜ìž ë‚˜ì´ 
				$("input[name=patientage]").val(obj["meAge"]);
				//ì²˜ë°© í™˜ìžì „í™”ë²ˆí˜¸ 
				$("input[name=patientphone]").val(obj["mePhone"]);
				//ì²˜ë°© í™˜ìžì „í™”ë²ˆí˜¸ 
				$("input[name=patientmobile]").val(obj["meMobile"]);
				//ì²˜ë°© í™˜ìžë©”ëª¨ 
				$("textarea[name=patientmemo]").val(obj["meRemark"]);
				//ì²˜ë°© ìš°íŽ¸ë²ˆí˜¸ 
				$("input[name=patientzipcode]").val(obj["meZipcode"]);
				//ì²˜ë°© ì£¼ì†Œ 
				$("input[name=patientaddr]").val(obj["meAddressall"]);
				//ì²˜ë°© ì°¨íŠ¸ë²ˆí˜¸  
				$("input[name=patientchartno]").val(obj["meChartno"]);

				var data=obj["meName"]+"( "+obj["meSexName"]+" / "+obj["meAge"]+"ì„¸ ) "+obj["meChartno"];
				$("input[name=patientDiv]").val(data);

				

				var reReceiverType=$("input[name='reReceiverType']:checked").val();
				
				if(reReceiverType=="patient")
				{
					$("input[name=reReceiverType]:input[value=patient]").prop("checked", true).trigger("click");
				}

				var json=JSON.parse($("textarea[name=join_jsondata]").val());
				console.log("beforebeforebeforebeforebeforebefore");
				console.log(json);
				if(json["deliveryInfo"][0]["receiveType"]=="patient")
				{
					json["deliveryInfo"][0]["receiveName"]=obj["meName"]; //ë°›ëŠ”ì‚¬ëžŒ
					json["deliveryInfo"][0]["receivePhone"]=obj["mePhone"]; //ë°›ëŠ”ì‚¬ëžŒ ì „í™”ë²ˆí˜¸
					json["deliveryInfo"][0]["receiveMobile"]=obj["meMobile"]; //ë°›ëŠ”ì‚¬ëžŒ íœ´ëŒ€í°ë²ˆí˜¸
					json["deliveryInfo"][0]["receiveZipcode"]=obj["meZipcode"]; //ë°›ëŠ”ì‚¬ëžŒ ìš°íŽ¸ë²ˆí˜¸
					json["deliveryInfo"][0]["receiveAddress"]=obj["meAddress0"]; //ë°›ëŠ”ì‚¬ëžŒ ì£¼ì†Œ
					json["deliveryInfo"][0]["receiveAddressDesc"]=obj["meAddress1"]; //ë°›ëŠ”ì‚¬ëžŒ ìƒì„¸ì£¼ì†Œ
				}
				console.log("afterafterafterafterafter");
				console.log(json);

				$("textarea[name=join_jsondata]").val(JSON.stringify(json));




				// ì´ì „ë©”ëª¨ ì¶”ê°€ by ì˜ì§„ 2022.01.12
				$("#beforememo").html(obj["cautionadvice"]);
				$("#beforememo").css("overflow-y","auto");
				$("#beforememo").css("width","100%");
				$("#beforememo").css("padding-left","1em");


				changeadvice();
				
			}
			else
			{
				txt+="<tr><td colspan=\"2\">ì„ íƒ ëœ í™˜ìž ì •ë³´ê°€ ì—†ìŠµë‹ˆë‹¤.</td></tr>";
			}
			txt+="</table>";
			break;
		case "info":
			var patientDiv=$("input[name=patientDiv]").val();
			txt+=selyears("patient");
			txt+="<table>";
			txt+="	<colgroup><col width=\"60\"><col><col width=\"60\"><col width=\"80\"></colgroup>";
			txt+="	<thead>";
			txt+="  <tr><th>í™˜ìžëª…</th><th colspan='3'>"+patientDiv+"</th></tr>";
			txt+="  <tr><th class='text-center'>ì²˜ë°©ì¼</th><th>ì²˜ë°©ëª…</th><th class='text-center'>ì²©/íŒ©</th><th>ì²˜ë°©ì˜</th></tr>";
			txt+="  </thead>";
			txt+="	<tbody>";
			txt+="	<tr><td colSpan=\"4\" style=\"text-align:left;\">ì´ ê²€ìƒ‰ ê±´ìˆ˜ <span className=\"mint\">" + obj["list"].length + "</span> ê±´</td></tr>";
			if(!isEmpty(obj["list"]))
			{
				$.each(obj["list"] ,function(index, val){
					txt+="	<tr onclick=\"callorderdesc('"+val["seq"]+"', '"+encodeURI(val["ordertitle"])+"','all')\">";
					txt+="		<td class='text-center'>"+val["orderdate"]+"</td>";					
					txt+="		<td class='txt_line'>"+val["ordertitle"]+"</td>";
					txt+="		<td class='text-center'>"+val["chubcnt"]+"/"+val["packcnt"]+"</td>";
					txt+="		<td class='txt_line'>"+val["doctorname"]+"</td>";
					txt+="	</tr>";
				});
			}
			else
			{
				txt += "	<tr>";
				txt += "		<td colspan=\"4\">ë°ì´í„°ê°€ ì—†ìŠµë‹ˆë‹¤.</td>";
				txt += "	</tr>";
			}
			txt+="	</tbody>";
			txt+="</table>";
			txt += "<div class=\"pagination small mb-4\" id=\"papg\"></div>";
			break;
		case "list":
			$("#searchpatientdiv").show();
			var colNm5= 'ë¹„ê³ '; 
			if(getCookie("mck_cfcode") == 'hs'){
				colNm5= 'ìµœê·¼ì²˜ë°©ì¼'; 
			}
			txt += "<table>";
			txt += "	<colgroup>";
			txt += "		<col>";
			txt += "		<col>";
			txt += "		<col>";
			txt += "		<col>";
			txt += "		<col>";
			txt += "	</colgroup>";
			txt += "	<thead>";
			txt += "	<tr>";
			txt += "		<th class='text-left'>ì°¨íŠ¸ë²ˆí˜¸</th>";
			txt += "		<th class='text-left'>í™˜ìžëª…</th>";
			txt += "		<th>ì„±ë³„/ë‚˜ì´</th>";
			txt += "		<th class='text-left'>"+colNm5+"</th>";
			txt += "		<th class='text-center' style='width:60px;'>ìˆ˜ì •</th>";
			txt += "	</tr>";
			txt += "	<tr>";
			txt += "		<td colSpan=\"5\" style=\"text-align:left;\">";
			txt += "			ì´ <span class=\"mint\">" + obj["tcnt"] + "</span> ê±´";
			if(filename=="chart" || filename=="productorder" || filename=="chartTA")
			{
				txt += "			<a href=\"javascript:callmedicalpatient();\" class=\"button small ml-auto\" id='pamedical'>í•œì˜ì›ìœ¼ë¡œì²˜ë°©</a>";
			}
			if(getCookie("mck_miUserid") == '4000906379' || getCookie("mck_miUserid") == '3365437925'){
				txt += "			<a href=\"javascript:callCrmPatient();\" class=\"button small ml-auto mint \" style=\"float:right;width:100px;font-size:14px;padding:0 5px;line-height:25px;height:25px;min-width:auto;border-radius:1.5em;\" id='crmbtn'>CRMì—°ë™</a> ";
			}
			txt += "		</td>";
			txt += "	</tr>";
			txt += "	</thead>";
			txt += "	<tbody>";

			if(!isEmpty(obj["list"]))
			{
				$.each(obj["list"] ,function(index, val){
					txt += "	<tr style=\"cursor: pointer;\" >";
					txt += "		<td onclick=\"callpatientdesc('"+val["meSeq"]+"','"+val["meUserid"]+"')\" class='text-left'>"+val["meChartno"]+"</td>";
					txt += "		<td onclick=\"callpatientdesc('"+val["meSeq"]+"','"+val["meUserid"]+"')\" class='text-left'>"+val["meName"]+"</td>";
					txt += "		<td onclick=\"callpatientdesc('"+val["meSeq"]+"','"+val["meUserid"]+"')\" >"+val["meSexName"]+" / "+val["meAge"]+"</td>";
					txt += "		<td onclick=\"callpatientdesc('"+val["meSeq"]+"','"+val["meUserid"]+"')\" class='text-left'>"+val["orderLastDate"]+"</td>";
					txt += "		<td onclick=\"updatePatientModal('"+val["meSeq"]+"')\" class='text-left'><span style='padding:3px 5px;line-height:20px;' class='button small ml-auto'>ìˆ˜ì •</span></td>";
					//txt += "		<td onclick=\"updatePatientModal('"+val["meSeq"]+"')\" class='text-left'><span style='' class=''>"+getIconUpdate(30,'ìˆ˜ì •')+"</span></td>";
					txt += "	</tr>";
				});
			}
			else
			{
				txt += "	<tr>";
				txt += "		<td colspan=\"5\">ë°ì´í„°ê°€ ì—†ìŠµë‹ˆë‹¤.</td>";
				txt += "	</tr>";
			}
			txt += "	</tbody>";
			txt += "</table>";
			txt += "<div class=\"pagination small mb-4\" id=\"papg\"></div>";
			break;
		case "add":
			break;
	}
	if(code=="medicaldesc"){}
	else
	{
		$("#patientinfo").html(txt);
		if(code=="list"){
			spaging("papg",obj["tpage"], obj["page"], obj["block"], obj["psize"]);
		}
		else
		{
			$("#papg").html("");
		}

		changepacking('marking');

	}
	if(obj!=null){
		if(!isEmpty(obj["selectyears"]))
		{
			$(".searpatient").val(obj["selectyears"]);
		}
	}
	
}

function callCrmPatient(){
	callapi("GET","patient",getdata("callcrm"));
}

function updatePatientModal(meUserid){
	medicallayer('modal.patient','|'+meUserid+'|modal','');
}


function removePatientClass()
{
	//$("#searchPatientLayer").hide();
	$("#ptdesc").removeClass("active");
	$("#ptinfo").removeClass("active");
	$("#ptlist").removeClass("active");
	$("#ptadd").removeClass("active");
}
//ì²˜ë°©í™˜ìž, ì²˜ë°©ë‚´ì—­, í™˜ìžê²€ìƒ‰, í™˜ìžì¶”ê°€ í´ë¦­ì‹œ
function callpatient(type)
{
	removePatientClass();
	var code=$("input[name=patientcode]").val();
	//console.log("type = "+ type+", code = " + code);

	$("#searchPatientLayer").css("display","block");
	switch(type)
	{
	case "desc":
		var patientmedical=$("input[name=patientmedical]").val();
		if(!isEmpty(patientmedical) && patientmedical=="1"){$("#ptlist").addClass("active"); return false;}
		$("#ptdesc").addClass("active");
		if(!isEmpty(code))
		{
			callapi("POST","patient",getdata("patientdesc")+"&code="+code);
		}
		else
		{
			viewpatient("desc",null);
		}
		break;
	case "info":
		var patientmedical=$("input[name=patientmedical]").val();
		
		if(!isEmpty(patientmedical) && patientmedical=="1"){$("#ptlist").addClass("active"); return false;}
		$("#ptinfo").addClass("active");
		if(!isEmpty(code))
		{
			callapi("GET","patient",getdata("patientinfo")+"&code="+code+"&page=1");
		}else{		
			var phtml= "";
			phtml+="<table><tr><td >ì„ íƒ ëœ í™˜ìž ì •ë³´ê°€ ì—†ìŠµë‹ˆë‹¤.</td></tr></table>";				
			$("#patientinfo").html(phtml);
		}
		break;
	case "list":
		var goodsview=$("input[name=goodsview]").val();
		if(!isEmpty(goodsview) && goodsview=="TMD"){}
		else
		{
			clearpatient();
			//$("#searchPatientLayer").show();
			$("#ptlist").addClass("active");		
			// clearpatient() ì—ì„œ í˜¸ì¶œí•¨ ì¤‘ë³µí˜¸ì¶œ ë˜ê³  ìžˆìŒ
			//callapi("GET","patient",getdata("patientlist"));//í™”ë©´ì— 6ê°œë°–ì— ì•ˆë³´ìž„
		}
		break;
	case "add":
		$("#ptadd").addClass("active");
		//alert("ì¤€ë¹„ì¤‘ìž…ë‹ˆë‹¤.");
		medicallayer('modal.patient','','');
		break;
	case "tab-list":
		clearpatient(type);
		$("#ptlist").addClass("active");	
		break;
	}
}
function patientFocus()
{
	$("input[name=searpatientTxt]").focus();
}
//í™˜ìžì •ë³´ ìƒì„¸ ë¿Œë¦¬ê¸°
function patientdesc(seq)
{
	if(!isEmpty(seq))
	{
		$("#patientaddbtn").hide();
		$("#patientupdatebtn").show();
		var arr = seq.split("|");  
				
		var param = "&patientseq="+arr[1];
		try{
			if(arr.length == 3){
				param += "&calltype="+arr[2];
			}
		}catch (e) {}
		
		callapi("POST","patient",getdata("patientdesc")+param);
	}
}
function searchpatient()
{
	removePatientClass();
	$("#ptlist").addClass("active");
	$("input[name=page]").val(1);// ê²€ìƒ‰ì‹œ page 1
	callapi("GET","patient",getdata("patientlist"));//í™”ë©´ì— 6ê°œë°–ì— ì•ˆë³´ìž„ 
}
//í™˜ìžë¦¬ìŠ¤íŠ¸ì—ì„œ í™˜ìžì´ë¦„ í´ë¦­ì‹œ 
function callpatientdesc(seq, code)
{
	removePatientClass();

	var ck_cfcode=getCookie("mck_cfcode");
	var old_patientcode     = $("input[name=patientcode]").val(); // ê¸°ì¡´ í™˜ìžì½”ë“œ
	var new_patientcode     = code;  // ìƒˆë¡œìš´ í™˜ìžì½”ë“œ
	var initCartPatinetFlag = $("#initCartPatinetFlag").val(); // ìž¥ë°”êµ¬ë‹ˆ ì§„ìž…í›„ í™˜ìž ìµœì´ˆ ë³€ê²½ ìœ ë¬´
	var advicesel           = $("#advicesel").val();// ë³µìš©ë²• ì§ì ‘ì„ íƒìœ¼ë¡œ ëœê²½ìš°..
	var odmrdesc            = $("#odmrdesc").val();// ë§ˆí‚¹ ìž…ë ¥ë¬¸êµ¬ marking08 , marking09
	var old_odmrdesc		= $("#old_odmrdesc").val();
	
	//DOO::hsë§Œ í•´ë‹¹ë˜ì—ˆëŠ”ë° ëª¨ë‘ ì ìš©ë„ë¡ ìˆ˜ì • - 20230608  ck_cfcode == "hs"  && 
	//if( !isEmpty($("input[name=medicalseq]").val())  && old_patientcode != new_patientcode && initCartPatinetFlag == 1 && advicesel == 0 )
	if( old_patientcode != new_patientcode && parseInt(advicesel) >= 0 )
	{		
		var msg = "ë³µìš©ë²•";
		if( (odmrdesc == "marking08" || odmrdesc == "marking09") && (old_odmrdesc == "marking08" || old_odmrdesc == "marking09") ){		
			msg += ", ë§ˆí‚¹(ìž…ë ¥ë¬¸êµ¬)";
		}
		// ë³µìš©ì„œ ì²´í¬ ì§ì ‘ìž…ë ¥ ìƒíƒœì—ë§Œ ë°”ê¿”ì¤˜ì•¼í•¨
		if(!confirm(msg+'ì´ ì´ˆê¸°í™” ë©ë‹ˆë‹¤.\ní™˜ìžë¥¼ ë³€ê²½í•˜ì‹œê² ìŠµë‹ˆê¹Œ?')){
			return false;
		}
		$("#advicesel").val(''); //ë³µìš©ë²• ì´ˆê¸°í™”
		$("input[name=initCartPatinetFlag]").val(0);
		if( (odmrdesc == "marking08" || odmrdesc == "marking09") && (old_odmrdesc == "marking08" || old_odmrdesc == "marking09") ){		
			$("input[name=mr_linetxt1]").val("");
			$("input[name=mr_linetxt2]").val("");			
		}// if	
	}// if

	$("input[name=patientmedical]").val("");
	$("#ptdesc").addClass("active");
	$("input[name=patientcode]").val(code);	

	if(callcheckorder('patient')==false)
	{
		callapi("POST","patient",getdata("patientdesc")+"&patientseq="+seq);
	}

	
}
function callcheckorder(type)
{
	var patientcode=$("input[name=patientcode]").val();
	var chkTitle=$("input[name=chkTitle]").val();
	var odSeq=$("input[name=odSeq]").val();
	var productcode=$("input[name=productcode]").val();
	productcode=!isEmpty(productcode)?productcode:"";
	if(!isEmpty(chkTitle) && !isEmpty(patientcode))
	{
		callapi("GET","recipe",getdata("checkorderpatient")+"&type="+type+"&odSeq="+odSeq+"&chkTitle="+chkTitle+"&patientcode="+patientcode+"&productcode="+productcode);
		return true;
	}
	return false;
}
///í™˜ìžì²˜ë°©ë‚´ì—­ì—ì„œ ì²˜ë°©í´ë¦­ì‹œ, ì´ì „ì²˜ë°©ì—ì„œ ì²˜ë°©í´ë¦­ì‹œ 
function callorderdesc(seq, title, calltype)
{
	$("input[name=chkTitle]").val(title);
	$("input[name=odSeq]").val(seq);
	var selmatype=$("select[name=selmatype]").val();
	callapi("GET","patient",getdata("previousorderdesc")+"&seq="+seq+"&calltype="+calltype+"&selmatype="+selmatype);
}
//ì¶”ì²œì²˜ë°© 
function callrecomdesc(seq, title)
{
	$("input[name=chkTitle]").val(title);
	$("input[name=odSeq]").val(seq);
	if(callcheckorder('recom')==false)
	{
		callapi("GET","recipe",getdata("recomdesc")+"&seq="+seq);
	}
}
//ê°œì¸ë°©ì œ 
function calldoctordesc(seq, title)
{
	$("input[name=chkTitle]").val(title);
	$("input[name=odSeq]").val(seq);
	if(callcheckorder('doctor')==false)
	{
		callapi("GET","recipe",getdata("recipedoctordesc")+"&seq="+seq+"&recipetype=chart");
	}
}
//ìžë³´ì²˜ë°©  
function callrecipetadesc(seq,product,title)
{
	$("input[name=chkTitle]").val(title);
	$("input[name=odSeq]").val(seq);
	$("input[name=productcode]").val(product);
	if(callcheckorder('recipeta')==false)
	{
		callapi("GET","recipe",getdata("recipetadesc")+"&seq="+seq+"&product="+product);
	}
}
//
function getmeditype(type)
{
	if(type=="inmain")
	{
		return "ì¼ë°˜";
	}
	else if(type=="infirst")
	{
		return "ì„ ì „";
	}
	else if(type=="inafter")
	{
		return "í›„í•˜";
	}
	else if(type=="inlast")
	{
		return "ë³„ì „";
	}
}
///ê°ë¯¸ì œ(ë³„ì „)ì— ì•°í”Œì´ ìžˆëŠ”ì§€ ì²´í¬ 
function chkSweetample(title)
{
	if(!isEmpty(title)){
		if(title.indexOf("ì•°í”Œ")!=-1)
		{
			return true;
		}
	}
	return false;
}
//ì•½ìž¬ëŸ‰ ì²´í¬ 
function chkMedicineCapa()
{
	var chk="Y";
	$(".chubamt").each(function(){
		var val=$(this).val();
		if(isEmpty(val) || parseFloat(val)==0)
		{
			chk="N";
		}
	});

	if(chk=="N")
	{
		return false;
	}

	return true;
}
//ë¼ë””ì˜¤ë²„íŠ¼ 
function viewradio(pgid,list,name,data)
{
	var txt=checked="";
	var i=0;
	$.each(list, function(idx, val)
	{
		var id=name+""+i;
		checked="";

		if(data==val["cdCode"])
		{
			checked="checked";
		}
		txt+='<label class="checkItem" for="'+id+'">';
		txt+='	<input type="radio" name="'+name+'" id="'+id+'" class="ajaxdata" value="'+val["cdCode"]+'" '+checked+'  onclick="clickRadio(this);">';
		txt+='<span>'+val["cdName"]+'</span>';
		txt+='</label>';
		i++;
	});
	console.log(pgid);
	//ë°›ëŠ”ì‚¬ëžŒì˜ ê²½ìš° í•´ì™¸ë°°ì†¡ì¶”ê°€
	if(pgid=="reReceiverType"){
		txt+='<div id="receiveoverseadiv" style="margin-top:5px;display:inline-block;">';
		txt+='<input type="checkbox" id="receiveoversea" name="receiveoversea" value="" onclick="receiveoversea();" class="ajaxdata chkbox">';
		txt+='&nbsp;&nbsp;í•´ì™¸ë°°ì†¡</div>	';
	}

	$("#"+pgid).html(txt);
}
function receiveoversea(){
	var type=$("input[name=reReceiverType]:checked").val();
	var chk=$("#receiveoversea").prop("checked");
	if(type=="sudong"){
		$("#receiveAddrOversea input").val("");
		if(chk==true){
			$("#zipcodeDiv").hide();
			$("input[name=receiveAddress]").attr({"readonly":false,"placeholder":"ìƒì„¸ì£¼ì†Œ"});
			$("input[name=receiveAddressDesc]").attr("placeholder","ë„ì‹œëª…, êµ­ê°€ëª…, ìš°íŽ¸ë²ˆí˜¸");
			//í™˜ìžì˜ë£Œê¸°ê´€ í´ë¦­ë¹„í™œì„±í™”
			$("#reReceiverType0").attr("disabled",true);
			$("#reReceiverType1").attr("disabled",true);
			$("#reReceiverType0").next("span").css("opacity","0.5");
			$("#reReceiverType1").next("span").css("opacity","0.5");
		}else{
			$("#zipcodeDiv").show();
			$("#zipcodeDiv .input").css({"width":"30%","display":"inline-block"});
			$("input[name=receiveAddress]").attr({"readonly":true,"placeholder":"ì,ë©´,ë™ ì„ íƒ"});
			$("input[name=receiveAddressDesc]").attr("placeholder","ìƒì„¸ì£¼ì†Œ");
			$("#reReceiverType0").attr("disabled",false);
			$("#reReceiverType1").attr("disabled",false);
			$("#reReceiverType0").next("span").css("opacity","1");
			$("#reReceiverType1").next("span").css("opacity","1");
		}
	}else{
		$("#receiveoversea").prop("checked",false).css("background","none");
		$("#receiveoversea").next("span").css("background","fff");
		alert("ìƒˆë¡œìž…ë ¥ì¸ ê²½ìš°ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤.")
	}
}
function clickRadio(obj)
{
	var msgtxt="";
	var radioname=obj.name;
	var radiovalue=obj.value;
	var ck_cfcode=getCookie("mck_cfcode");
	var receiveTied=$("input[name=receiveTied]").val();

	switch(radioname)
	{
	case "reSendType"://ë°œì‹ ì¸ì„ íƒ
		var sendName=sendPhone=sendMobile=sendZipcode=sendAddress=sendAddressDesc="";
		switch(radiovalue)
		{
		case "medical"://ì˜ë£Œê¸°ê´€
			if(isEmpty(receiveTied))
			{
				if(ck_cfcode=="hs")
				{
					$("#reReceiverType0").attr('disabled', false);
					$("#reReceiverType1").attr('disabled', true);
					$("#reReceiverType2").attr('disabled', false);
					$("#reReceiverType0").prop('checked', true);
					$("#reReceiverType0").trigger("click");
				}
				else
				{
					$("#reReceiverType0").attr('disabled', false);
					$("#reReceiverType1").attr('disabled', false);
					$("#reReceiverType2").attr('disabled', false);
					$("#reReceiverType0").prop('checked', true);
					$("#reReceiverType2").trigger("click");
				}
			}
			//ì˜ë£Œê¸°ê´€ëª… 
			sendName=$("input[name=medicalName]").val();
			//ì˜ë£Œê¸°ê´€ ì „í™”ë²ˆí˜¸ 
			sendPhone=$("input[name=medicalPhone]").val();
			//ì˜ë£Œê¸°ê´€ ì „í™”ë²ˆí˜¸ 
			sendMobile=$("input[name=medicalMobile]").val();
			//ì˜ë£Œê¸°ê´€ ìš°íŽ¸ë²ˆí˜¸ 
			sendZipcode=$("input[name=medicalZipcode]").val();
			//ì˜ë£Œê¸°ê´€ ì£¼ì†Œ 
			if(!isEmpty($("input[name=medicalAddress]").val()))
			{
				var raddr=$("input[name=medicalAddress]").val().split("||");
				sendAddress=raddr[0];
				sendAddressDesc=raddr[1];
			}
			msgtxt="ì˜ë£Œê¸°ê´€ì˜ ì •ë³´ê°€ ì—†ìŠµë‹ˆë‹¤. ë‹¤ì‹œ ë¡œê·¸ì¸í•´ ì£¼ì„¸ìš”.";
			break;
		case "base"://íƒ•ì „ì‹¤
			if(isEmpty(receiveTied))
			{
				if(ck_cfcode=="hs")
				{
					$("#reReceiverType0").attr('disabled', true);
					$("#reReceiverType1").attr('disabled', false);
					$("#reReceiverType2").attr('disabled', false);
					$("#reReceiverType1").prop('checked', true);
					$("#reReceiverType1").trigger("click");
				}
				else
				{
					$("#reReceiverType0").attr('disabled', false);
					$("#reReceiverType1").attr('disabled', false);
					$("#reReceiverType2").attr('disabled', false);
					$("#reReceiverType1").prop('checked', true);
					$("#reReceiverType1").trigger("click");
				}
			}

			//ì˜ë£Œê¸°ê´€ëª… 
			sendName=$("input[name=baseName]").val();
			//ì˜ë£Œê¸°ê´€ ì „í™”ë²ˆí˜¸ 
			sendPhone=$("input[name=basePhone]").val();
			//ì˜ë£Œê¸°ê´€ ì „í™”ë²ˆí˜¸ 
			sendMobile=$("input[name=baseMobile]").val();
			//ì˜ë£Œê¸°ê´€ ìš°íŽ¸ë²ˆí˜¸ 
			sendZipcode=$("input[name=baseZipcode]").val();
			//ì˜ë£Œê¸°ê´€ ì£¼ì†Œ 
			if(!isEmpty($("input[name=baseAddress]").val()))
			{
				var raddr=$("input[name=baseAddress]").val().split("||");
				sendAddress=raddr[0];
				sendAddressDesc=raddr[1];
			}
			msgtxt="íƒ•ì „ì‹¤ì˜ ì •ë³´ê°€ ì—†ìŠµë‹ˆë‹¤. ê´€ë¦¬ìžì—ê²Œ ë¬¸ì˜í•´ ì£¼ì„¸ìš”.";
			break;
		case "sudong"://ìƒˆë¡œìž…ë ¥
			if(isEmpty(receiveTied))
			{
				$("#reReceiverType0").attr('disabled', false);
				$("#reReceiverType1").attr('disabled', false);
				$("#reReceiverType2").attr('disabled', false);
			}
			sendName=sendPhone=sendMobile=sendZipcode=sendAddress=sendAddressDesc="";
			break;
		}

		$("input[name=sendName]").val(sendName);
		$("input[name=sendPhone]").val(sendPhone);
		$("input[name=sendMobile]").val(sendMobile);
		$("input[name=sendZipcode]").val(sendZipcode);
		$("input[name=sendAddress]").val(sendAddress);
		$("input[name=sendAddressDesc]").val(sendAddressDesc);
		break;
	case "reReceiverType"://ìˆ˜ì‹ ì¸ì„ íƒ
		$("input[name=receiveName]").removeAttr("readonly");
		$("input[name=receivePhone]").removeAttr("readonly");
		$("input[name=receiveMobile]").removeAttr("readonly");
		$("input[name=receiveZipcode]").removeAttr("readonly");
		$("input[name=receiveAddressDesc]").removeAttr("readonly");
		//console.log("reReceiverTypereReceiverTypereReceiverTypereReceiverType");

		var receiveName=receivePhone=receiveMobile=receiveZipcode=receiveAddress=receiveAddressDesc="";
		switch(radiovalue)
		{
		case "patient"://í™˜ìž
			//$("#receiveoverseadiv").show();
			$("#zipcodeDiv").show();
			$("#receivebtnid").show();
			var patientmedical=$("input[name=patientmedical]").val();
			//console.log("patientmedical = " + patientmedical);
			if(patientmedical=="1")
			{
				$("#patientreceiverdiv").hide();
			}
			else
			{
				$("#patientreceiverdiv").show();
			}
			//ì²˜ë°© í™˜ìžëª…
			receiveName=$("input[name=patientname]").val();
			//ì²˜ë°© í™˜ìžì „í™”ë²ˆí˜¸ 
			receivePhone=$("input[name=patientphone]").val();
			//ì²˜ë°© í™˜ìžì „í™”ë²ˆí˜¸ 
			receiveMobile=$("input[name=patientmobile]").val();
			//ì²˜ë°© ìš°íŽ¸ë²ˆí˜¸ 
			receiveZipcode=$("input[name=patientzipcode]").val();
			//ì²˜ë°© ì£¼ì†Œ 
			if(!isEmpty($("input[name=patientaddr]").val()))
			{
				var raddr=$("input[name=patientaddr]").val().split("||");
				receiveAddress=!isEmpty(raddr[0])?raddr[0]:"";
				receiveAddressDesc=!isEmpty(raddr[1])?raddr[1]:"";
			}
			msgtxt="";//í™˜ìžë¥¼ ë¨¼ì € ì„ íƒí•´ ì£¼ì„¸ìš”.";
			
			if(ck_cfcode=="cy")
			{
				$("input[name=receiveName]").attr("readonly",true);
				//$("input[name=receivePhone]").attr("readonly",true);
				//$("input[name=receiveMobile]").attr("readonly",true);
				$("input[name=receiveZipcode]").attr("readonly",true);
				$("input[name=receiveAddress]").attr("readonly",true);
				$("input[name=receiveAddressDesc]").attr("readonly",true);
				$("#receivebtnid").hide();
			}
			break;
		case "medical"://ì˜ë£Œê¸°ê´€
			$("#receivebtnid").show();
			$("#patientreceiverdiv").hide();
			//ì˜ë£Œê¸°ê´€ëª… 
			receiveName=$("input[name=medicalName]").val();
			//ì˜ë£Œê¸°ê´€ ì „í™”ë²ˆí˜¸ 
			receivePhone=$("input[name=medicalPhone]").val();
			//ì˜ë£Œê¸°ê´€ ì „í™”ë²ˆí˜¸ 
			receiveMobile=$("input[name=medicalMobile]").val();
			//ì˜ë£Œê¸°ê´€ ìš°íŽ¸ë²ˆí˜¸ 
			receiveZipcode=$("input[name=medicalZipcode]").val();
			//ì˜ë£Œê¸°ê´€ ì£¼ì†Œ 
			if(!isEmpty($("input[name=medicalAddress]").val()))
			{
				var raddr=$("input[name=medicalAddress]").val().split("||");
				receiveAddress=raddr[0];
				receiveAddressDesc=raddr[1];
			}
			msgtxt="ì˜ë£Œê¸°ê´€ì˜ ì •ë³´ê°€ ì—†ìŠµë‹ˆë‹¤. ë‹¤ì‹œ ë¡œê·¸ì¸í•´ ì£¼ì„¸ìš”.";
			
			if(ck_cfcode=="cy")
			{
				$("input[name=receiveName]").attr("readonly",true);
				//$("input[name=receivePhone]").attr("readonly",true);
				//$("input[name=receiveMobile]").attr("readonly",true);
				$("input[name=receiveZipcode]").attr("readonly",true);
				$("input[name=receiveAddress]").attr("readonly",true);
				$("input[name=receiveAddressDesc]").attr("readonly",true);
				$("#receivebtnid").hide();
			}
			break;
		case "sudong"://ìƒˆë¡œìž…ë ¥
			$("#receivebtnid").show();
			$("#receiveoverseadiv").show();
			$("#patientreceiverdiv").hide();
			receiveName=receivePhone=receiveMobile=receiveZipcode=receiveAddress=receiveAddressDesc="";
			var orderdelivery=$("input[name=orderdelivery]").val();
			if(orderdelivery=="pickup")
			{
				//íƒ•ì „ì‹¤ ëª… 
				receiveName=$("input[name=baseName]").val();
				//íƒ•ì „ì‹¤ ì „í™”ë²ˆí˜¸ 
				receivePhone=$("input[name=basePhone]").val();
				//íƒ•ì „ì‹¤ ì „í™”ë²ˆí˜¸ 
				receiveMobile=$("input[name=baseMobile]").val();
				//íƒ•ì „ì‹¤ ìš°íŽ¸ë²ˆí˜¸ 
				receiveZipcode=$("input[name=baseZipcode]").val();
				//íƒ•ì „ì‹¤ ì£¼ì†Œ 
				if(!isEmpty($("input[name=baseAddress]").val()))
				{
					var raddr=$("input[name=baseAddress]").val().split("||");
					receiveAddress=raddr[0];
					receiveAddressDesc=raddr[1];
				}
			}
			break;
		}

		if(radiovalue!="sudong"&&isEmpty(receiveName))
		{
			if(!isEmpty(msgtxt))
			{
				alert(msgtxt);
			}
		}

		$("input[name=receiveName]").val(receiveName);
		$("input[name=receivePhone]").val(receivePhone);
		$("input[name=receiveMobile]").val(receiveMobile);
		$("input[name=receiveZipcode]").val(receiveZipcode);
		$("input[name=receiveAddress]").val(receiveAddress);
		$("input[name=receiveAddressDesc]").val(receiveAddressDesc);
		break;
	}
}
//ë°›ëŠ”ì‚¬ëžŒì²´í¬ 
function checkreceiver()
{
	//ë°›ëŠ”ì‚¬ëžŒ
	var receiveName=$("input[name=receiveName]").val();
	var receiveZipcode=$("input[name=receiveZipcode]").val();
	var receiveAddress=$("input[name=receiveAddress]").val();
	var receiveAddressDesc=$("input[name=receiveAddressDesc]").val();
	var receivePhone=$("input[name=receivePhone]").val();
	var receiveMobile=$("input[name=receiveMobile]").val();

	if(isEmpty(receiveName))
	{
		alert("ìˆ˜ì‹ ì¸ ì´ë¦„ì´ ì—†ìŠµë‹ˆë‹¤.");
		return false;
	}

	//if(isEmpty(receivePhone))
	//{
	//	alert("ìˆ˜ì‹ ì¸ ì—°ë½ì²˜ê°€ ì—†ìŠµë‹ˆë‹¤.");
	//	return false;
	//}
	if(isEmpty(receiveMobile))
	{
		alert("ìˆ˜ì‹ ì¸ íœ´ëŒ€í°ì´ ì—†ìŠµë‹ˆë‹¤.");
		return false;
	}
	//if(chkPhone(receivePhone,"ìˆ˜ì‹ ì¸")==false)
	//{
	//	return false;
	//}
	var overseachk=$("#receiveoversea").prop("checked");
	if(overseachk==false){
		if(chkMobile(receiveMobile,"ìˆ˜ì‹ ì¸")==false)
		{
			return false;
		}
	}
	if(isEmpty(receiveZipcode) && overseachk==false)
	{
		alert("ìˆ˜ì‹ ì¸ ìš°íŽ¸ë²ˆí˜¸ê°€ ì—†ìŠµë‹ˆë‹¤.");
		return false;
	}
	if(isEmpty(receiveAddress))
	{
		alert("ìˆ˜ì‹ ì¸ ì£¼ì†Œê°€ ì—†ìŠµë‹ˆë‹¤.");
		return false;
	}
	if(isEmpty(receiveAddressDesc) || receiveAddressDesc==" ")
	{
		alert("ìˆ˜ì‹ ì¸ ìƒì„¸ì£¼ì†Œê°€ ì—†ìŠµë‹ˆë‹¤.");
		return false;
	}

	return true;
}
//ë³´ë‚´ëŠ”ì‚¬ëžŒì²´í¬ 
function checksender()
{
	//ë³´ë‚´ëŠ”ì‚¬ëžŒ
	var sendName=$("input[name=sendName]").val();
	var sendZipcode=$("input[name=sendZipcode]").val();
	var sendAddress=$("input[name=sendAddress]").val();
	var sendAddressDesc=$("input[name=sendAddressDesc]").val();
	var sendPhone=$("input[name=sendPhone]").val();
	var sendMobile=$("input[name=sendMobile]").val();

	if(isEmpty(sendName))
	{
		alert("ë°œì‹ ì¸ ì´ë¦„ì´ ì—†ìŠµë‹ˆë‹¤.");
		return false;
	}
	if(isEmpty(sendPhone))
	{
		alert("ë°œì‹ ì¸ ì—°ë½ì²˜ê°€ ì—†ìŠµë‹ˆë‹¤.");
		return false;
	}
	//if(isEmpty(sendMobile))
	//{
	//	alert("ë°œì‹ ì¸ íœ´ëŒ€í°ì´ ì—†ìŠµë‹ˆë‹¤.");
	//	return false;
	//}

	if(chkPhone(sendPhone,"ë°œì‹ ì¸")==false)
	{
		return false;
	}
	//if(chkMobile(sendMobile,"ë°œì‹ ì¸")==false)
	//{
	//	return false;
	//}

	if(isEmpty(sendZipcode))
	{
		alert("ë°œì‹ ì¸ ìš°íŽ¸ë²ˆí˜¸ê°€ ì—†ìŠµë‹ˆë‹¤.");
		return false;
	}
	if(isEmpty(sendAddress))
	{
		alert("ë°œì‹ ì¸ ì£¼ì†Œê°€ ì—†ìŠµë‹ˆë‹¤.");
		return false;
	}
	if(isEmpty(sendAddressDesc) || sendAddressDesc==" ")
	{
		alert("ë°œì‹ ì¸ ìƒì„¸ì£¼ì†Œê°€ ì—†ìŠµë‹ˆë‹¤.");
		return false;
	}
	return true;
}
//ì €ìž¥í• ë°›ëŠ”ì‚¬ëžŒë³´ë‚´ëŠ”ì‚¬ëžŒ 
function savesenderreceiver()
{
	var json={};
	//ë°›ëŠ”ì‚¬ëžŒ
	var receiveName=$("input[name=receiveName]").val();
	var receiveZipcode=$("input[name=receiveZipcode]").val();
	var receiveAddress=$("input[name=receiveAddress]").val();
	var receiveAddressDesc=$("input[name=receiveAddressDesc]").val();
	var receivePhone=$("input[name=receivePhone]").val();
	var receiveMobile=$("input[name=receiveMobile]").val();

	//ë³´ë‚´ëŠ”ì‚¬ëžŒ
	var sendName=$("input[name=sendName]").val();
	var sendZipcode=$("input[name=sendZipcode]").val();
	var sendAddress=$("input[name=sendAddress]").val();
	var sendAddressDesc=$("input[name=sendAddressDesc]").val();
	var sendPhone=$("input[name=sendPhone]").val();
	var sendMobile=$("input[name=sendMobile]").val();
	
	//ë°°ì†¡ìš”ì²­ì‚¬í•­ 
	var receiveComment=$("textarea[name=receiveComment]").val();
	if(!isEmpty(receiveComment))
	{
		receiveComment = receiveComment.replace(/'/g, "");
	}

	//ë°œì‹ ì¸ì„ íƒ
	var reSendType=$("input[name=reSendType]:checked").val();
	//ìˆ˜ì‹ ì¸ì„ íƒ
	var reReceiverType=$("input[name=reReceiverType]:checked").val();

	json["deliType"]="delivery"; //ë°°ì†¡ì¢…ë¥˜ delivery (íƒë°°) -- ë¬´ì¡°ê±´ 

	json["sendType"]=reSendType;
	json["sendName"]=sendName; //ë³´ë‚´ëŠ”ì‚¬ëžŒ
	json["sendPhone"]=sendPhone; //ë³´ë‚´ëŠ”ì‚¬ëžŒ ì „í™”ë²ˆí˜¸
	json["sendMobile"]=sendMobile; //ë³´ë‚´ëŠ”ì‚¬ëžŒ íœ´ëŒ€í°ë²ˆí˜¸
	json["sendZipcode"]=sendZipcode; //ë³´ë‚´ëŠ”ì‚¬ëžŒ ìš°íŽ¸ë²ˆí˜¸
	json["sendAddress"]=sendAddress; //ë³´ë‚´ëŠ”ì‚¬ëžŒ ì£¼ì†Œ
	json["sendAddressDesc"]=sendAddressDesc; //ë³´ë‚´ëŠ”ì‚¬ëžŒ ìƒì„¸ì£¼ì†Œ

	var overseachk=$("#receiveoversea").prop("checked");
	if(overseachk==true)receiveZipcode="00000";
	
	json["receiveOversea"]=overseachk;
	json["receiveType"]=reReceiverType;
	json["receiveName"]=receiveName; //ë°›ëŠ”ì‚¬ëžŒ
	json["receivePhone"]=receivePhone; //ë°›ëŠ”ì‚¬ëžŒ ì „í™”ë²ˆí˜¸
	json["receiveMobile"]=receiveMobile; //ë°›ëŠ”ì‚¬ëžŒ íœ´ëŒ€í°ë²ˆí˜¸
	json["receiveZipcode"]=receiveZipcode; //ë°›ëŠ”ì‚¬ëžŒ ìš°íŽ¸ë²ˆí˜¸
	json["receiveAddress"]=receiveAddress; //ë°›ëŠ”ì‚¬ëžŒ ì£¼ì†Œ
	json["receiveAddressDesc"]=receiveAddressDesc; //ë°›ëŠ”ì‚¬ëžŒ ìƒì„¸ì£¼ì†Œ

	json["receiveComment"]=receiveComment; //ë°°ì†¡ìš”êµ¬ì‚¬í•­

	json["receiveTied"]=""; //ë¬¶ìŒë°°ì†¡ë§ˆìŠ¤í„°ì£¼ë¬¸ì½”ë“œ (ë¶€ì‚°ëŒ€ì£¼ë¬¸ì½”ë“œ)
	
	return json;
}
//ì£¼ë¬¸ì½”ë“œìƒì„±í•˜ê¸° 
function createOrderCode()
{
	var json={};
	var d=new Date();
	var month=("0" + (d.getMonth() + 1)).slice(-2);
	var day=("0" + d.getDate()).slice(-2);
	var hour=("0" + d.getHours()).slice(-2);
	var minute=("0" + d.getMinutes()).slice(-2);
	var second=("0" + d.getSeconds()).slice(-2);
	ordercode="MDD"+d.getFullYear()+month+day+hour+minute+second;
	orderdate=d.getFullYear()+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
	
	$("input[name=medicalordercode]").val(ordercode);

	json["ordercode"]=ordercode;
	json["orderdate"]=orderdate;
	return json;
}
//í•œì˜ì›ì •ë³´
function setMedicalInfo(info)
{
	var miPhone=!isEmpty(info["miPhone"])?info["miPhone"]:"";
	var miMobile=!isEmpty(info["miMobile"])?info["miMobile"]:miPhone;
	if(isEmpty(miPhone))
	{
		miPhone=miMobile;
	}
	$("input[name=medicalPhone]").val(miPhone);
	$("input[name=medicalMobile]").val(miMobile);
	$("input[name=medicalZipcode]").val(info["miZipcode"]);
	$("input[name=medicalAddress]").val(info["miAddress"]);
}
//íƒ•ì „ì‹¤ì •ë³´ 
function setBaseInfo(info)
{
	var cfPhone=!isEmpty(info["cfDecophone"])?info["cfDecophone"]:"";
	var cfMobile=!isEmpty(info["cfDecomobile"])?info["cfDecomobile"]:cfPhone;
	if(isEmpty(cfPhone))
	{
		cfPhone=cfMobile;
	}

	$("input[name=baseName]").val(info["cfDeconame"]);
	$("input[name=basePhone]").val(cfPhone);
	$("input[name=baseMobile]").val(cfMobile);
	$("input[name=baseZipcode]").val(info["cfDecozipcode"]);
	$("input[name=baseAddress]").val(info["cfDecoaddress"]);
}
function chkNoneMedical()
{
	/*
		var miname=getCookie("mck_miName");
		if(miname=="ì¤€íšŒì›" || miname=="ë¬´ì†Œì†í•œì˜ì‚¬")
		{
			return true;
		}
		return false;
	*/
	var medistat=getCookie("mck_medistat");
	var miStatus=getCookie("mck_miStatus");
	if(medistat=="confirm" && miStatus=="confirm")
	{
		return false;

	}
	return true;
}
function chkuserID(code)
{
	var meUserId=getCookie("mck_meUserId");
	var chkCode = chkNoneMedical()==true;
	if (isEmpty(meUserId))
	{
		alert("ë¡œê·¸ì¸ í›„ ì‚¬ìš© ê°€ëŠ¥í•©ë‹ˆë‹¤.");
		location.href="/member/login.php";
		return;
	}
	switch(code)
	{
		case "chart":
			if(chkAuthority("recipe")!="imp")
			{
				goGoodsChart();
			}
			else
			{
				alert("í•œì˜ì›ì— ê¶Œí•œì„ ìš”ì²­í•˜ì„¸ìš”.");
				return;
			}
			break;
		case "NHISchart":
			if(chkAuthority("recipe")!="imp")
			{
				goNHISChart();
			}
			else
			{
				alert("í•œì˜ì›ì— ê¶Œí•œì„ ìš”ì²­í•˜ì„¸ìš”.");
				return;
			}
			break;
		case "chartTA":
			if(chkAuthority("recipe")!="imp")
			{
				gochartTA();
			}
			else
			{
				alert("í•œì˜ì›ì— ê¶Œí•œì„ ìš”ì²­í•˜ì„¸ìš”.");
				return;
			}
			break;
		case "decopill": case "powder": case "herbal": case "ointments": 
			if(chkAuthority("recipe")!="imp")
			{
				goPillChart(code);
			}
			else
			{
				alert("í•œì˜ì›ì— ê¶Œí•œì„ ìš”ì²­í•˜ì„¸ìš”.");
				return;
			}
			break;
		case "myorder":
			goMypageOrder();
			break;
		case "mypayment":
			goPayment();
			break;
		case "patientcare":
			if(chkCode)
			{
				alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
				return;
			}
			location.href="/goods/"+code+".php";
			break;
		case "goods":
			if(chkCode)
			{
				alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
				return;
			}
			if(chkAuthority("goods")!="imp")
			{
				location.href="/"+code+"/";
			}
			else
			{
				alert("í•œì˜ì›ì— ê¶Œí•œì„ ìš”ì²­í•˜ì„¸ìš”.");
				return;
			}
			break;
		case "myscription":
			if(chkCode)
			{
				alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
				return;
			}
			location.href="/mypage/myscription.php";
			break;
		case "commercial":
			if(chkCode)
			{
				alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
				return;
			}
			location.href="/"+code+"/";
			break;
		case "medihub":
			if(chkCode)
			{
				alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
				return;
			}
			location.href="/medihub";
			break;
		case "myrecipe":
			if(chkCode)
			{
				alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
				return;
			}
			location.href="/mypage/myrecipe.php";
			break;
		case "plan":
			if(chkCode)
			{
				alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
				return;
			}
			if(chkAuthority("goods")!="imp")
			{
				location.href="/goods/"+code+".php";
			}
			else
			{
				alert("í•œì˜ì›ì— ê¶Œí•œì„ ìš”ì²­í•˜ì„¸ìš”.");
				return;
			}
			break;
	}
}
function goPillChart(code)
{
	if(chkNoneMedical()==true)
	{
		alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
		return;
	}
	location.href="/goods/chart.php?type="+code;
}
function goNHISChart()
{
	if(chkNoneMedical()==true)
	{
		alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
		return;
	}
	location.href="/goods/NHISchart.php";
}
function gochartTA()
{
	if(chkNoneMedical()==true)
	{
		alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
		return;
	}
	location.href="/goods/chartTA.php";
}
function goGoodsChart()
{
	if(chkNoneMedical()==true)
	{
		alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
		return;
	}
	location.href="/goods/chart.php";
}
function goMypageOrder()
{
	if(chkNoneMedical()==true)
	{
		alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
		return;
	}
	location.href="/mypage/myorder.php";
}
function goPayment()
{
	if(chkNoneMedical()==true)
	{
		alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
		return;
	}
	location.href="/mypage/mypayment.php";
}
function goviewurl(type, seq, inuse, orderstatus, odStatus, gcode, pcode)
{
	if(inuse=="C" || odStatus=="cancel")
	{
		alert("ì·¨ì†Œëœ ì²˜ë°©ìž…ë‹ˆë‹¤.");
		return;
	}
	var url="";
	switch(orderstatus)
	{
	case "temp"://ìž„ì‹œì €ìž¥
	case "cart"://ìž¥ë°”êµ¬ë‹ˆ
		url=getOneUrl(type,seq, gcode, pcode);//1ë²ˆíŽ˜ì´ì§€ 
		break;	
	case "payment"://ê²°ì œëŒ€ê¸°
		url=getTwoUrl(type,seq, gcode, pcode);//2ë²ˆíŽ˜ì´ì§€ 
		break;
	case "cartorder"://ì²˜ë°©ë‚´ì—­ì—ì„œ ìž¥ë°”êµ¬ë‹ˆëŠ” ìƒì„¸íŽ˜ì´ì§€ë¡œ ë³´ì—¬ì¤€ë‹¤ 
	case "done"://ê²°ì œì™„ë£Œ 
		url=getThreeUrl(type,seq, gcode, pcode);//3ë²ˆíŽ˜ì´ì§€ 
		break;
	}	
	//location.href=url;
	location.replace(url);
}
function getselectyears()
{
	var surl="";
	var selectyears=$("select[name=selectyears]").val();
	var selectyears2=$("select[name=selectyears]").val();
	console.log("selectyears = "+selectyears+", selectyears2 =   + selectyears2");
	if(!isEmpty(selectyears) && parseInt(selectyears)<2023)
	{
		surl="&selectyears="+selectyears;
	}
	//ìœ„ ë™ìž‘ì•ˆí• ë•Œ ë§ŽìŒ
	surl="";
	if(!isEmpty(location.hash)){
		var hdata=location.hash.replace("#","").split("|");
		var searchData=hdata[2];
		var selectyears="";
		if(!isEmpty(searchData)){
			var sarr=searchData.split("&");
			//console.log(sarr);
			$(sarr).each(function(idx, val){
				var sarr2=val.split("=");
				if(sarr2[0]=="selectyears"){
					surl="&selectyears="+sarr2[1];
				}
			});
		}
	}
	console.log(surl);
	return surl;
}
//ì²˜ë°©íŽ˜ì´ì§€ 1ë²ˆ : ì²˜ë°©ê¸°ë¡ ëª¨ë‘ ì¡´ìž¬, ìƒí’ˆì •ë³´ì œì™¸ íƒ•ì œì²˜ë°©í¬í•¨  ëª¨ë‘ ìˆ˜ì •ê°€ëŠ¥
function getOneUrl(type,seq,gcode,pcode)
{
	var url="";
	switch(type)
	{
	case "goods": //ì•½ì†
		url="/goods/productorder.php?goods="+gcode+"&product="+pcode+"&seq="+seq+"&view=TMD";//ì™„
		break;
	case "decoction"://íƒ•ì œ
	case "herbal"://ì²©ì œ 
	case "powder"://ì‚°ì œ  
	case "decopill"://í™˜ì œ 
	case "ointments"://ê³ ì œ 
		url="/goods/chart.php?seq="+seq+"&view=TMD&type="+type;//ì™„
		break;
	case "decoctionta"://ìžë³´ 
		url="/goods/chartTA.php?seq="+seq+"&view=TMD&type="+type;//ì™„
		break;
	case "commercial"://ìƒìš© 
		url="/goods/commercialorder.php?seq="+seq+"&goods="+pcode+"&view=TMD";//ì™„
		break;
	case "NHIS"://ì²©ì•½
		url="/goods/NHISchart.php?seq="+seq+"&view=TMD";//ì™„
		break;
	}
	var selectyears=getselectyears();
	if(!isEmpty(selectyears))
	{
		url+=selectyears;
	}
	return url;
}
//ì²˜ë°©íŽ˜ì´ì§€ 2ë²ˆ : ë°°ì†¡ì •ë³´ë§Œ ìˆ˜ì •ê°€ëŠ¥
function getTwoUrl(type,seq,gcode,pcode)
{
	var url="";
	switch(type)
	{
	case "goods": //ì•½ì†
		url="/goods/productorder.php?goods="+gcode+"&product="+pcode+"&seq="+seq+"&view=CPD";//ì™„
		break;
	case "decoction"://íƒ•ì œ
	case "herbal"://ì²©ì œ 
	case "powder"://ì‚°ì œ  
	case "decopill"://í™˜ì œ 
	case "ointments"://ê³ ì œ 
		url="/goods/chartorder.php?seq="+seq+"&view=CPD&type="+type;//ì™„
		break;
	case "decoctionta"://ìžë³´ 
		url="/goods/chartTA.php?seq="+seq+"&view=CPD&type="+type;//ì™„
		break;
	case "commercial"://ìƒìš© 
		url="/goods/commercialorder.php?seq="+seq+"&goods="+pcode+"&view=CPD";//ì™„
		break;
	case "NHIS"://ì²©ì•½ 
		url="/goods/NHISchartorder.php?seq="+seq+"&view=CPD";//ì™„
		break;
	}
	var selectyears=getselectyears();
	if(!isEmpty(selectyears))
	{
		url+=selectyears;
	}
	return url;
}
//ì²˜ë°©íŽ˜ì´ì§€ 3ë²ˆ : ì „ì²´ ìˆ˜ì •ì•ˆë¨(ë·°íŽ˜ì´ì§€)
function getThreeUrl(type,seq,gcode,pcode)
{
	var url="";
	switch(type)
	{
	case "goods": //ì•½ì†
		url="/goods/orderdetail.php?type=goods&goods="+gcode+"&product="+pcode+"&seq="+seq;
		break;
	case "decoction"://íƒ•ì œ
	case "herbal"://ì²©ì œ 
	case "powder"://ì‚°ì œ  
	case "decopill"://í™˜ì œ 
	case "ointments"://ê³ ì œ
	case "pill":
		var newtype=type;
		if(type=="pill"){newtype="decopill";}
		url="/goods/orderdetail.php?type="+newtype+"&seq="+seq;
		break;
	case "decoctionta"://ìžë³´ 
		url="/goods/orderdetail.php?type="+type+"&seq="+seq;//ì™„
		break;
	case "commercial"://ìƒìš© 
		url="/goods/orderdetail.php?type=commercial&seq="+seq;
		break;
	case "NHIS"://ì²©ì•½
		url="/goods/orderdetail.php?type=NHIS&seq="+seq;
		break;
	}
	var selectyears=getselectyears();
	if(!isEmpty(selectyears))
	{
		url+=selectyears;
	}
	var page=$("input[name=page]").val();
	if(!isEmpty(page))
	{
		url+="&page="+page;
	}
	console.log("url = " + url);
	return url;
}
//ì²©ì•½ë¹„ìš©ì•ˆë‚´ 
function setNHISPriceDetail(amountJson)
{
	var NHISchubCnt=NHISmeditotPrice=NHISmkPrice=NHISmkCnt=NHISmktotPrice=NHISdcPrice=NHISdcCnt=NHISdctotPrice=NHISpkPrice=NHISpkCnt=NHISpktotPrice=NHISretotPrice=NHIStotalAmount=0;

	//ì•½ìž¬ë¹„
	if(!isEmpty(amountJson["medicine"]))
	{
		var medicinearr=amountJson["medicine"].split(",");
		NHISchubCnt=medicinearr[0];
		NHISmeditotPrice=medicinearr[1];
	}
	$("#NHISchubCnt").text(commasFixed2(NHISchubCnt));
	$("#NHISmeditotPrice").text(commasFixed2(NHISmeditotPrice));

	//ì²©ì•½ì¡°ì œíƒ•ì „ë¹„ 
	var  NHISmkdata="";
	if(!isEmpty(amountJson["making"]))
	{
		var makingarr=amountJson["making"].split(",");
		NHISmktotPrice=makingarr[2];
	}
	if(!isEmpty(amountJson["makingtxt"]))
	{
		NHISmkdata=amountJson["makingtxt"];
	}
	$("#NHISmkdata").text(NHISmkdata);
	$("#NHISmktotPrice").text(commasFixed2(NHISmktotPrice));

	//íƒ•ì „ë¹„ 
	var NHISdcdata="";
	if(!isEmpty(amountJson["decoction"]))
	{
		var decoctionarr=amountJson["decoction"].split(",");//íƒ•ì „ë¹„  
		NHISdctotPrice=decoctionarr[2];
	}
	if(!isEmpty(amountJson["decoctiontxt"]))
	{
		NHISdcdata=amountJson["decoctiontxt"];
	}
	$("#NHISdcdata").text(NHISdcdata);
	$("#NHISdctotPrice").text(commasFixed2(NHISdctotPrice));

	$("#amount_sugardiv").hide();
	$("#amount_flavordiv").hide();

	//í–¥ê¸° 
	var DECOflavortitle="";
	var NHISsweetflavor=0;
	if(!isEmpty(amountJson["sweetflavor"]))
	{
		$("#amount_flavordiv").show();
		var sweetflavorarr=amountJson["sweetflavor"].split(",");
		NHISsweetflavor=sweetflavorarr[4];
	}
	$("#DECOflavortotPrice").text(commasFixed2(NHISsweetflavor));
	if(!isEmpty(amountJson["sweetflavortxt"]))
	{
		DECOflavortitle=amountJson["sweetflavortxt"];
	}
	$("#DECOflavortitle").text(DECOflavortitle);

	//ë‹¹ë„  
	var DECOsugartitle="";
	var DECOsugartotPrice=0;
	if(!isEmpty(amountJson["sweetsugar"]))
	{
		$("#amount_sugardiv").show();
		var sweetflavorarr=amountJson["sweetsugar"].split(",");
		DECOsugartotPrice=sweetflavorarr[4];
	}
	$("#DECOsugartotPrice").text(commasFixed2(DECOsugartotPrice));
	if(!isEmpty(amountJson["sweetsugartxt"]))
	{
		DECOsugartitle=amountJson["sweetsugartxt"];
	}
	$("#DECOsugartitle").text(DECOsugartitle);

	$("#amount_zahagerdiv").hide();
	if(!isEmpty(amountJson["sweetzahager"])) //ìží•˜ê±° 
	{
		var totsweetzahager=amountJson["sweetzahager"].split(",");
		if(!isEmpty(amountJson["sweetzahagertxt"]))
		{
			$("#DECOzahagertitle").text(amountJson["sweetzahagertxt"]);
		}
		else
		{
			$("#DECOzahagertitle").text("");
		}
		$("#DECOzahagertotPrice").text(commasFixed(totsweetzahager[4]));
		$("#amount_zahagerdiv").show();
	}
	$("#amount_velvetdiv").hide();
	if(!isEmpty(amountJson["sweetvelvet"])) //2022-12-05í‹´í¬ 
	{			
		var totsweetvelvet=amountJson["sweetvelvet"].split(",");
		if(!isEmpty(amountJson["sweetvelvettxt"]))
		{
			$("#DECOvelvettitle").text(amountJson["sweetvelvettxt"]);
		}
		else
		{
			$("#DECOvelvettitle").text("");
		}
		$("#DECOvelvettotPrice").text(commasFixed(totsweetvelvet[4]));
		$("#amount_velvetdiv").show();
	}
	//í¬ìž¥ë¹„
	$("#amount_packdiv").hide();
	var NHISpkdata="";
	//console.log(amountJson);
	if(!isEmpty(amountJson["packing"]))
	{		
		var packinggarr=amountJson["packing"].split(",");//í¬ìž¥ë¹„ 
		if(parseInt(packinggarr[2])>0)
		{
			$("#amount_packdiv").show();
			NHISpktotPrice=packinggarr[2];
		}
	}
	if(!isEmpty(amountJson["packingtxt"]))
	{
		NHISpkdata=amountJson["packingtxt"];
	}
	$("#NHISpkdata").text(NHISpkdata);
	$("#NHISpktotPrice").text(commasFixed2(NHISpktotPrice));

	//íŒ©ë‹¹í¬ìž¥ë¹„
	$("#amount_packdiv2").hide();
	var NHISpadata="";
	var NHISpatotPrice=0;
	if(!isEmpty(amountJson["packing2"]))
	{		
		var packinggarr=amountJson["packing2"].split(",");//í¬ìž¥ë¹„ 
		if(parseInt(packinggarr[2])>0)
		{
			$("#amount_packdiv2").show();
			NHISpatotPrice=packinggarr[2];
		}
	}
	if(!isEmpty(amountJson["packingtxt2"]))
	{
		NHISpadata=amountJson["packingtxt2"];
	}
	$("#NHISpadata").text(NHISpadata);
	$("#NHISpatotPrice").text(commasFixed2(NHISpatotPrice));

	//ë°°ì†¡ë¹„
	var NHISredeliverydata="";
	if(!isEmpty(amountJson["release"]))
	{
		NHISretotPrice=amountJson["release"];
	}
	if(!isEmpty(amountJson["releasetxt"]))
	{
		NHISredeliverydata=amountJson["releasetxt"];
	}
	$("#NHISredeliverydata").text(NHISredeliverydata);
	$("#NHISretotPrice").text(commasFixed2(NHISretotPrice));

	//ì´í•©ê³„ 
	if(!isEmpty(amountJson["totalamount"]))
	{
		NHIStotalAmount=amountJson["totalamount"];
	}
	$("#NHIStotalAmount").text(commasFixed2(NHIStotalAmount));


	/*
	//1.ì•½ìž¬ë¹„ 
	$("#NHISchubCnt").text(commasFixed2(NHISchubCnt));
	$("#NHISmeditotPrice").text(commasFixed2(NHISmeditotPrice));
	//2.ì¡°ì œë¹„ 
	$("#NHISmkPrice").text(commasFixed2(NHISmkPrice));
	$("#NHISmkCnt").text(commasFixed2(NHISmkCnt));

	//3.íƒ•ì „ë¹„ 
	$("#NHISdcPrice").text(commasFixed2(NHISdcPrice));
	$("#NHISdcCnt").text(commasFixed2(NHISdcCnt));
	
	//4.í¬ìž¥ë¹„
	$("#NHISpkPrice").text(commasFixed2(NHISpkPrice));
	$("#NHISpkCnt").text(commasFixed2(NHISpkCnt));
	
	//5.ë°°ì†¡ë¹„ 
	
	//6.ì´í•©ê³„
	
	*/
}
function setmarkingInfo()
{
	var markType=$("select[name=odmrdesc]").children("option:selected").val();
	var markText=$("select[name=odmrdesc]").children("option:selected").data("desc");
	var mr_linetxt1=$("input[name=mr_linetxt1]").val();
	var mr_linetxt2=$("input[name=mr_linetxt2]").val();
	var mdata={};
	mdata["markType"]=markType;
	mdata["markText"]=markText;
	mdata["mrlinetxt1"]=!isEmpty(mr_linetxt1)?mr_linetxt1:"";
	mdata["mrlinetxt2"]=!isEmpty(mr_linetxt2)?mr_linetxt2:"";
	return mdata;
}
function getMarkingInfo(markingInfo)
{
	if(!isEmpty(markingInfo))
	{
		var markText=markingInfo["markText"];
		var mrlinetxt1=markingInfo["mrlinetxt1"];
		var mrlinetxt2=markingInfo["mrlinetxt2"];

		if(!isEmpty(markText))
		{
			if(markText.indexOf("ìž…ë ¥ë¬¸êµ¬1")!=-1)
			{
				markText=markText.replace("ìž…ë ¥ë¬¸êµ¬1",mrlinetxt1);
			}    
			if(markText.indexOf("ìž…ë ¥ë¬¸êµ¬2")!=-1)
			{
				markText=markText.replace("ìž…ë ¥ë¬¸êµ¬2",mrlinetxt2);
			}
			if(markText.indexOf("ìž…ë ¥ë¬¸êµ¬")!=-1)
			{
				markText=markText.replace("ìž…ë ¥ë¬¸êµ¬",mrlinetxt1);
			}
		}
	}
	else
	{
		markText="No Marking";
	}

	return markText;
}
///ì²˜ë°©ì €ìž¥í•˜ê¸° 
function saveNHISOrder(dir)
{
	if(getCookie("mck_cfcode") == "hp")
	{
		//í•œí“¨ì–´ë§Œ íƒ•ì „ 15000ê¹Œì§€ë§Œ ê°€ëŠ¥í•˜ë„ë¡ ì˜ˆì™¸ì²˜ë¦¬ 
		var packCnt=$("select[name=packCnt]").val();
		var packCapa=$("select[name=packCapa]").val();
		var decoctionTotalml=parseInt(packCnt)*parseInt(packCapa);
		if(parseInt(decoctionTotalml)>15000)
		{
			alert("[ì²˜ë°©ë¶ˆê°€]\níƒ•ì „ì€ íƒ•ì „ë¬¼ëŸ‰ ê¸°ì¤€ 15,000 ì´ë‚´ì—ì„œ ì§„í–‰ë©ë‹ˆë‹¤. ë§Œì¼ íƒ•ì „ë¬¼ëŸ‰ 15,000ì„ ì´ˆê³¼í•˜ëŠ” ì²˜ë°©ì„ ë„£ìœ¼ì‹œë ¤ë©´ ì²˜ë°©ì„ ë¶„ë¦¬í•˜ì—¬ ë„£ì–´ ì£¼ì‹­ì‹œì˜¤.");
			return;
		}
	}

	var makerchk=chkallmedicinemaker();
	if(makerchk==true)
	{
		alert("[ì²˜ë°©ë¶ˆê°€]\nì²˜ë°©í• ìˆ˜ì—†ëŠ” ì•½ìž¬ê°€ ìžˆìŠµë‹ˆë‹¤.");
		return;
	}

	var capachk=chkallmedicinecapa();

	if(capachk==true)
	{
		alert("[ì²˜ë°©ë¶ˆê°€]\nì²˜ë°©ëŸ‰ì´ ìž˜ëª»ëœ(0í¬í•¨) ì•½ìž¬ê°€ ìžˆìŠµë‹ˆë‹¤. ë‹¤ì‹œ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
		return;
	}

	var amountchk=chkallmedicineamount();

	if(amountchk==true)
	{
		alert("[ì²˜ë°©ë¶ˆê°€]\nê°€ê²©ì´ ì—†ëŠ” ì•½ìž¬ê°€ ìžˆìŠµë‹ˆë‹¤.");
		return;
	} 

	var miIsadvice=$("input[name=miIsadvice]").val();
	miIsadvice=!isEmpty(miIsadvice)?miIsadvice:"N";
	if(miIsadvice=="Y")
	{
		var orderadvicefile=$("textarea[name=orderadvicefile]").val();
		if(!isEmpty(CKEDITOR.instances.editor)){
			var orderAdvice=CKEDITOR.instances.editor.getData();
		}

		if(isEmpty(orderadvicefile) && isEmpty(orderAdvice))
		{
			alert("[ì²˜ë°©ë¶ˆê°€]\në³µìš©ë²•ì´ ì—†ìŠµë‹ˆë‹¤.");
			return;
		}
	}

	var odmrdesc=$("#odmrdesc").val();
	if(odmrdesc=="marking08" || odmrdesc=="marking09" || odmrdesc=="marking18")
	{
		var mr_linetxt1=$("input[name=mr_linetxt1]").val();
		if(odmrdesc=="marking09" || odmrdesc=="marking18")
		{
			if(isEmpty(mr_linetxt1))
			{
				alert("ë§ˆí‚¹ ìž…ë ¥ë¬¸êµ¬1ì„ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
				return;
			}
		}
		var chkmr=chkmarkingtextreg(mr_linetxt1);
		if(chkmr==false)
		{
			alert("ë§ˆí‚¹ ìž…ë ¥ë¬¸êµ¬1ì€ ìˆ«ìž,ë¬¸ìž,íŠ¹ìˆ˜ë¬¸ìž ~!%*()_|-?,.<>{}[]/ ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤.");
			return;
		}
		if(odmrdesc=="marking08")
		{
			var mr_linetxt2=$("input[name=mr_linetxt2]").val();
			var chkmr=chkmarkingtextreg(mr_linetxt2);
			if(chkmr==false)
			{
				alert("ë§ˆí‚¹ ìž…ë ¥ë¬¸êµ¬2ì€ ìˆ«ìž,ë¬¸ìž,íŠ¹ìˆ˜ë¬¸ìž ~!%*()_|-?,.<>{}[]/ ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤.");
				return;
			}
		}
	}

	var json=JSON.parse($("textarea[name=join_jsondata]").val());
	var medicalseq=$("input[name=medicalseq]").val();
	var keycode=$("input[name=medicalkeycode]").val();
	var ordercode=$("input[name=medicalordercode]").val();
	var orderdate=json["orderInfo"][0]["orderDate"];
	var deliveryDate=json["orderInfo"][0]["deliveryDate"];
	var miGrade=$("input[name=miGrade]").val();

	var rcNHISmedi="";
	if(!isEmpty($("textarea[name=rcNHISmedi]").val()))
	{
		rcNHISmedi=JSON.parse($("textarea[name=rcNHISmedi]").val());
	}

	//if(isEmpty(ordercode) && isEmpty(keycode))
	if(isEmpty(ordercode))
	{
		var orderaddr=createOrderCode();
		ordercode="DJ";
		orderdate=orderaddr["orderdate"];
	}

	deliveryDate=!isEmpty($("input[name=deliveryDate]").val())?$("input[name=deliveryDate]").val():getNowDate();

	json["orderInfo"][0]["keycode"]=keycode;//ì£¼ë¬¸ì½”ë“œ, ë¶€ì‚°ëŒ€ì£¼ë¬¸ì½”ë“œ
	json["deliveryInfo"][0]["patientreceiver"]="N";
	if(dir=="" || dir=="next")//ìž„ì‹œì €ìž¥ì´ê±°ë‚˜ ë‹¤ìŒë‹¨ê³„
	{
		orderStatus="temp";

		var odpacktype=$("input[name=odpacktype]").val();//íŒŒìš°ì¹˜ 
		var odmedibox=$("input[name=odmedibox]").val();//í•œì•½ë°•ìŠ¤ 
		var medicount=$("#meditbl tbody tr").length;//ì•½ìž¬ ê°¯ìˆ˜ 
		var patientcode=$("input[name=patientcode]").val();//í™˜ìžì½”ë“œ 
		var odtitle=$("input[name=odTitle]").val();
		var nhismediname=$("input[name=nhismediname]").val();//ì§ˆë³‘ë¶„ë¥˜ê¸°í˜¸
		var nhismediadvice=$("input[name=nhismediadvice]").val();//ì²©ì•½ìš©ë²• 
		var nhismedidays=$("select[name=nhismedidays]").val();//ì²©ì•½1ì¼ë³µìš©íŒ©ìˆ˜ 
		var productcode=$("input[name=productcode]").val();

		if(isEmpty(patientcode))
		{
			alert("í™˜ìžë¥¼ ì„ íƒí•´ ì£¼ì„¸ìš”.");
			return;
		}

		if(isEmpty(medicount) || medicount<=0)
		{
			alert("ì•½ìž¬ë¥¼ ì„ íƒí•´ ì£¼ì„¸ìš”.");
			return;
		}

		if(chkMedicineCapa()==false)
		{
			alert("ì•½ìž¬ì˜ ì²©ëŸ‰ì„ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
			return;
		}

		if(isEmpty(odtitle))
		{
			alert("ì²˜ë°©ëª…ì„ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
			return;
		}
		if(isEmpty(nhismediname))
		{
			alert("ì§ˆë³‘ë¶„ë¥˜ê¸°í˜¸ë¥¼ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
			return;
		}
		if(isEmpty(nhismediadvice))
		{
			alert("ì²©ì•½ìš©ë²•ì„ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
			return;
		}

		if(isEmpty(productcode))
		{
			alert("ì²©ì•½ë°ì´í„°ë¥¼ í™•ì¸í•´ ì£¼ì„¸ìš”.");
			return;
		}

		if(dir!="")
		{
			if(isEmpty(odpacktype))
			{
				alert("íŒŒìš°ì¹˜ë¥¼ ì„ íƒí•´ ì£¼ì„¸ìš”.");
				return;
			}

			if(isEmpty(odmedibox))
			{
				alert("í•œì•½ë°•ìŠ¤ë¥¼ ì„ íƒí•´ ì£¼ì„¸ìš”.");
				return;
			}
		}
	
		var medicalId=$("input[name=medicalId]").val();
		var medicalName=$("input[name=medicalName]").val();

		var doctorId=$("input[name=doctorId]").val();
		var doctorName=$("input[name=doctorName]").val();

		//ìž„ì‹œì €ìž¥ì´ë‚˜ ë°°ì†¡ì •ë³´ ìˆ˜ì •ì‹œì— ì²˜ë°©í•œ í•œì˜ì‚¬ì½”ë“œê°€ ë°”ë€œ..
		if(!isEmpty(json["orderInfo"][0]["doctorCode"]))
		{
			doctorId=json["orderInfo"][0]["doctorCode"];
		}
		else
		{
			doctorId=$("input[name=doctorId]").val();
		}
		if(!isEmpty(json["orderInfo"][0]["doctorName"]))
		{
			doctorName=json["orderInfo"][0]["doctorName"];
		}
		else
		{
			doctorName=$("input[name=doctorName]").val();
		}


		var odTitle=$("input[name=odTitle]").val();
		if(!isEmpty(CKEDITOR.instances.editor)){
			var orderAdvice=CKEDITOR.instances.editor.getData();//$("textarea[name=orderAdvice]").val();
		}
		var orderComment=$("textarea[name=orderComment]").val();
		var orderStatus=json["orderInfo"][0]["orderStatus"];

		var orderAdviceKey=$("select[name=advicesel]").val();
		var orderCommentKey=$("select[name=commentsel]").val();
		var orderAdviceName=$("select[name=advicesel]").children("option:selected").text();
		var orderCommentName=$("select[name=commentsel]").children("option:selected").text();
		var orderCommentContents=$("select[name=commentsel]").children("option:selected").data("contents");

		var orderDelivery=$("#deliverysel option:selected").val();
		var orderDeliveryName=$("#deliverysel option:selected").text();

		var qualityreport=$("select[name=qualityreport]").children("option:selected").val();
		var qualityreportName=$("select[name=qualityreport]").children("option:selected").text();

		medicalId=!isEmpty(medicalId)?medicalId:getCookie("mck_miUserid");
		medicalName=!isEmpty(medicalName)?medicalName:getCookie("mck_miName");
		doctorId=!isEmpty(doctorId)?doctorId:getCookie("mck_meUserId");
		doctorName=!isEmpty(doctorName)?doctorName:getCookie("mck_meName");

		//ì²©ì•½ì„ íƒí•œ goods ì½”ë“œ 
		var productcode=$("input[name=productcode]").val();

		var orderadvicefile=$("textarea[name=orderadvicefile]").val();
		var orderadvicefilekey=$("input[name=mdFileIdx]").val();
		if(!isEmpty(orderadvicefile))
		{
			orderadvicefile="|"+orderadvicefile;
		}
		else
		{
			orderadvicefile="";
		}
		
		if(!isEmpty(orderComment))
		{
			orderComment = orderComment.replace(/'/g, "");
		}

		if(!isEmpty(orderCommentContents))
		{
			orderCommentContents = orderCommentContents.replace(/'/g, "");
		}

		if(!isEmpty(orderAdvice))
		{
			orderAdvice = orderAdvice.replace(/'/g, "");
			//orderAdvice = orderAdvice.replace(/\n/g, "<br>");//í–‰ë°”ê¿ˆì œê±°
			//orderAdvice = orderAdvice.replace(/\r/g, "<br>");//ì—”í„°ì œê±°
		}
		
		//ì£¼ë¬¸ì •ë³´
		json["orderInfo"][0]["keycode"]=keycode;//ì£¼ë¬¸ì½”ë“œ, ë¶€ì‚°ëŒ€ì£¼ë¬¸ì½”ë“œ
		json["orderInfo"][0]["orderCode"]=ordercode;//ì£¼ë¬¸ì½”ë“œ, ë¶€ì‚°ëŒ€ì£¼ë¬¸ì½”ë“œ
		json["orderInfo"][0]["orderDate"]=orderdate;//ì£¼ë¬¸ì¼
		json["orderInfo"][0]["deliveryDate"]=deliveryDate;//ë°°ì†¡í¬ë§ì¼
		json["orderInfo"][0]["medicalCode"]=medicalId;//í•œì˜ì›ì½”ë“œ
		json["orderInfo"][0]["medicalName"]=medicalName;//í•œì˜ì›
		json["orderInfo"][0]["medicalGrade"]=miGrade;//í•œì˜ì›ë“±ê¸‰ 
		json["orderInfo"][0]["doctorCode"]=doctorId;//ì²˜ë°©ìžì½”ë“œ
		json["orderInfo"][0]["doctorName"]=doctorName;//ì²˜ë°©ìž
		json["orderInfo"][0]["orderTitle"]=odTitle;//ì²˜ë°©ëª…
		json["orderInfo"][0]["orderTypeCode"]="NHIS";//ì¡°ì œíƒ€ìž…ì½”ë“œ
		json["orderInfo"][0]["orderType"]="ì²©ì•½";//ì¡°ì œíƒ€ìž…ëª…
		json["orderInfo"][0]["orderCount"]=1;//ì£¼ë¬¸ê°¯ìˆ˜
		json["orderInfo"][0]["productCode"]=productcode;//ì²˜ë°©ì½”ë“œ
		json["orderInfo"][0]["productCodeName"]=odTitle;//ì²˜ë°©ì½”ë“œëª…
		json["orderInfo"][0]["orderAdvice"]=orderAdvice;//ë³µì•½ì§€ë„ì„œ
		json["orderInfo"][0]["orderAdviceKey"]=orderAdviceKey;//ì¡°ì œì§€ì‹œ
		json["orderInfo"][0]["orderAdviceName"]=orderAdviceName;//ì¡°ì œì§€ì‹œ
		json["orderInfo"][0]["orderComment"]=orderComment;//ì¡°ì œì§€ì‹œ
		json["orderInfo"][0]["orderCommentKey"]=orderCommentKey;//ë³µì•½ì§€ë„ì„œ
		json["orderInfo"][0]["orderCommentName"]=orderCommentName;//ë³µì•½ì§€ë„ì„œ
		json["orderInfo"][0]["orderCommentContents"]=orderCommentContents;//ë³µì•½ì§€ë„ì„œ
		json["orderInfo"][0]["orderStatus"]=orderStatus;//ì£¼ë¬¸ìƒíƒœ cart(ìž¥ë°”êµ¬ë‹ˆ),paid(ê²°ìž¬ì™„ë£Œ),done(ë“±ë¡ì™„ë£Œ)
		json["orderInfo"][0]["orderDelivery"]=orderDelivery;//íƒë°°ì‚¬
		json["orderInfo"][0]["orderDeliveryName"]=orderDeliveryName;//íƒë°°ì‚¬ì´ë¦„
		json["orderInfo"][0]["qualityreport"]=qualityreport;
		json["orderInfo"][0]["qualityreportName"]=qualityreportName;

		//DOO::ì²©ì•½ì§ˆë³‘ë¶„ë¥˜ê¸°í˜¸, ì²©ì•½ìš©ë²•, ì²©ì•½1ì¼ë³µìš©íŒ©ìˆ˜ ì¶”ê°€í•¨ 
		json["orderInfo"][0]["nhismediname"]=nhismediname;
		json["orderInfo"][0]["nhismediadvice"]=nhismediadvice;
		json["orderInfo"][0]["nhismedidays"]=nhismedidays;
		

		//DOO::ë³µì•½ì„¤ì • - 20220418 
		json["orderInfo"][0]["orderadvicesetting"]=saveadvicesetting();
		json["orderInfo"][0]["orderadvicefile"]=orderadvicefile;
		json["orderInfo"][0]["orderadvicefilekey"]=orderadvicefilekey;

		var od_adminmemo=$("input[name=od_adminmemo]").val();
		od_adminmemo=!isEmpty(od_adminmemo)?od_adminmemo:"";
		json["orderInfo"][0]["od_adminmemo"]=od_adminmemo;
		

		//í™˜ìžì •ë³´
		json["patientInfo"][0]=savepatient();

		//ì²˜ë°©ì •ë³´
		var chubCnt=$("select[name=chubCnt]").val();
		var packCnt=$("select[name=packCnt]").val();
		var packCapa=$("select[name=packCapa]").val();
		var ndaytaken=$("select[name=selndaytaken]").val();

		json["recipeInfo"][0]["chubCnt"]=chubCnt;
		json["recipeInfo"][0]["packCnt"]=packCnt;
		json["recipeInfo"][0]["packCapa"]=packCapa;
		json["recipeInfo"][0]["ndaytaken"]=ndaytaken;
		json["recipeInfo"][0]["rcNHISmedi"]=rcNHISmedi;
		//ì•½ìž¬
		var mdarr=new Array();
		$("#meditbl tbody tr").each(function()
		{
			var mediType="inmain";//ì²˜ë°©íƒ€ìž…
			var mediHerb=$(this).attr("data-herb");
			var mmIsZero=$(this).attr("data-iszero");
			var mmUnit=$(this).attr("data-unit");
			var mediCode=$(this).attr("data-code");//.children("td").eq(0).find("input").val(); //ì•½ìž¬ì½”ë“œ
			var mediName=$(this).children("td").eq(1).find("span").text();//ì•½ìž¬ëª…
			var mediPoison="";//ë…ì„± ( 0 , 1)
			var mediDismatch=""; //ìƒê·¹ ( 0 , 1)
			var mediOrigin="";//ì›ì‚°ì§€ì½”ë“œ
			var mediOriginTxt=$(this).children("td").eq(1).find("input.mdorigin").val();//ì›ì‚°ì§€ëª… 
			var mediMaker="";
			var mediMakerTxt=$(this).children("td").eq(2).find("select").children("option:selected").data("maker");
			var mediCapa=$(this).children("td").eq(3).find("input.chubamt").val();//ì²©ë‹¹ì•½ìž¬ëŸ‰
			var mediAmount=$(this).children("td").eq(5).find(".amount").attr("value");//ì²©ë‹¹ì•½ìž¬ë¹„
			var mediTotalAmount=$(this).children("td").eq(5).find(".amount").data("total");//ì²©ë‹¹ì•½ìž¬ë¹„
			var mediselcapa=$(this).children("td").eq(3).find("select").val();//ê°¯ìˆ˜ 


			var mdata={};
			mdata["mediType"]=mediType;
			mdata["mediHerb"]=mediHerb;
			mdata["mediCode"]=mediCode;
			mdata["mediName"]=mediName;
			mdata["mediPoison"]=mediPoison;
			mdata["mediDismatch"]=mediDismatch;
			mdata["mediOrigin"]=mediOrigin;
			mdata["mediOriginTxt"]=mediOriginTxt;
			mdata["mediMaker"]=mediMaker;
			mdata["mediMakerTxt"]=mediMakerTxt;
			mdata["mediCapa"]=mediCapa;
			mdata["mediAmount"]=mediAmount;
			mdata["mediTotalAmount"]=mediTotalAmount;
			mdata["mmIsZero"]=mmIsZero;
			mdata["mmUnit"]=mmUnit;
			mdata["mediselcapa"]=!isEmpty(mediselcapa)?mediselcapa:0;
			
			mdarr.push(mdata);

		});

		json["recipeInfo"][0]["totalMedicine"]=mdarr;


		//ë³„ì „-í”„ë¡ íŠ¸ì—ëŠ” ê°ë¯¸ì œë¡œ ë˜ì–´ìžˆì§€ë§Œ ì‚¬ì‹¤ì€ ë³„ì „ì´ë‹¤  
		var sdarr=new Array();
		var sweetcode=$("select[name=sugar]").val();
		var sweettitle=$("select[name=sugar]").children("option:selected").text();
		var sweetcapa=$("select[name=sugarvol]").val();
		var sweetprice=$("select[name=sugar]").children("option:selected").data("price");
		var sdata={}; 
		if(!isEmpty(sweetcode))
		{
			sdata["sweetCode"]=sweetcode;
			sdata["sweetName"]=sweettitle;
			sdata["sweetCapa"]=sweetcapa;
			sdata["sweetPrice"]=sweetprice;
			sdarr.push(sdata);
		}
		//ë‹¹ë„
		var sugarbrix=$("#sugarbrix option:selected").val();
		if(!isEmpty(sugarbrix))
		{
			var sdata={}; 
			var sugar_code=$("#sugarkinds option:selected").val();
			var sugar_name=$("#sugarkinds option:selected").text();
			var sugar_brix=$("#sugarbrix option:selected").data("brix");
			var sugar_price=$("#sugarkinds option:selected").data("price");
			var sugartotalamount=$("input[name=sugartotalamount]").val();
			sugar_brix=sugar_brix/100;
			var sugar_capa=parseFloat(packCnt) * parseFloat(packCapa) * parseFloat(sugar_brix);

			sdata["sweetCode"]=sugar_code;
			sdata["sweetName"]=sugar_name;
			sdata["sweetCapa"]=sugar_capa;
			sdata["sweetPrice"]=sugar_price;
			sdata["sweetTotalAmount"]=sugartotalamount;
			sdarr.push(sdata);
		}
		//í–¥ê¸°
		var flavor=$("#flavor option:selected").val();
		if(!isEmpty(flavor))
		{
			var sdata={}; 
			var flavor_code=$("#flavorkinds option:selected").val();
			var flavor_name=$("#flavorkinds option:selected").text();
			var flavor_price=$("#flavorkinds option:selected").data("price");
			var flavor_odor=$("#flavor option:selected").data("odor");
			var flavortotalamount=$("input[name=flavortotalamount]").val();
			flavor_odor=flavor_odor/100;
			var flavor_capa=parseFloat(packCnt) * parseFloat(packCapa) * parseFloat(flavor_odor);

			sdata["sweetCode"]=flavor_code;
			sdata["sweetName"]=flavor_name;
			sdata["sweetCapa"]=flavor_capa;
			sdata["sweetPrice"]=flavor_price;
			sdata["sweetTotalAmount"]=flavortotalamount;
			sdarr.push(sdata);
		}
		//ìží•˜ê±°ì•°í”Œ
		var zahager=$("#zahager option:selected").val();
		if(!isEmpty(zahager))
		{
			var zahagerprice=$("#zahager option:selected").data("price");
			var zahagercode=$("#zahager option:selected").data("code");
			var zahagercnt=$("#zahager option:selected").data("cnt");
			var zahagerunit=$("#zahager option:selected").data("unit");
			var zahagertotalamount=$("input[name=zahagertotalamount]").val();
			var sdata={}; 
			sdata["sweetType"]="";
			sdata["sweetCode"]=zahagercode;
			sdata["sweetName"]="ìží•˜ê±°ì•°í”Œ "+zahager;
			sdata["sweetCapa"]=parseFloat(zahagercnt) * parseFloat(zahagerunit);
			sdata["sweetPrice"]=zahagerprice;
			sdata["sweetTotalAmount"]=zahagertotalamount;
			sdarr.push(sdata);
		}
		//ë…¹ìš©í‹´í¬ì•°í”Œ
		var velvet=$("#velvet option:selected").val();
		if(!isEmpty(velvet))
		{
			var velvetprice=$("#velvet option:selected").data("price");
			var velvetwater=$("#velvet option:selected").data("water");
			var velvetcode=$("#velvet option:selected").data("code");
			var velvetcnt=$("#velvet option:selected").data("cnt");
			var velvetunit=$("#velvet option:selected").data("unit");
			var velvettotalamount=$("input[name=velvettotalamount]").val();
			var sdata={}; 
			sdata["sweetType"]="";
			sdata["sweetCode"]=velvetcode;
			sdata["sweetName"]="ë…¹ìš©í‹´í¬ì•°í”Œ "+velvet;
			sdata["sweetCapa"]=parseFloat(velvetcnt) * parseFloat(velvetunit);
			sdata["sweetPrice"]=velvetprice;
			sdata["sweetTotalAmount"]=velvettotalamount;
			sdarr.push(sdata);
		}
		//ë°œíš¨ìˆ˜
		var fermentedwater=$("#fermentedwater option:selected").val();
		if(!isEmpty(fermentedwater))
		{
			var fermentedwaterprice=$("#fermentedwater option:selected").data("price");
			var fermentedwaterwater=$("#fermentedwater option:selected").data("water");
			var fermentedwatercode=$("#fermentedwater option:selected").data("code");
			var fermentedwatercnt=$("#fermentedwater option:selected").data("cnt");
			var fermentedwaterunit=$("#fermentedwater option:selected").data("unit");
			var fermentedwatertotalamount=$("input[name=fermentedwatertotalamount]").val();
			var sdata={}; 
			sdata["sweetCode"]=fermentedwatercode;
			sdata["sweetName"]="ë°œíš¨ìˆ˜ "+fermentedwater;
			sdata["sweetCapa"]=parseFloat(fermentedwatercnt);
			sdata["sweetPrice"]=fermentedwaterprice;
			sdata["sweetTotalAmount"]=fermentedwatertotalamount;
			sdarr.push(sdata);
		}

		json["recipeInfo"][0]["sweetMedi"]=sdarr;

		var sdata={}; 
		sdata["sugarCode"]="";
		sdata["sugarName"]="";
		sdata["sugarCapa"]="";
		sdata["sugarPrice"]="";
		if(!isEmpty(sdata["sugarCode"]))
		{
			sdarr.push(sdata);
		}
		json["recipeInfo"][0]["sugarMedi"]=sdarr;

		//ì²©ì•½ì€ íƒ•ì „ê³¼ íŠ¹ìˆ˜íƒ•ì „ì€ ê¸°ë³¸ìœ¼ë¡œ ì…‹íŒ…ë˜ì–´ ê°„ë‹¤. 
		//íƒ•ì „ì •ë³´ 
		var dcTitle="decoctype07";
		var dcTitletxt="ë¬´ì••";
		json["decoctionInfo"][0]["dcTitle"]=dcTitle;//íƒ•ì „ë²• 
		json["decoctionInfo"][0]["dcTitletxt"]=dcTitletxt;//íƒ•ì „ë²• 

		//íƒ•ì „ì‹œê°„
		var dcTime=$("select[name=dcTime]").children("option:selected").val();
		/*if(getCookie("mck_cfcode")=="on")
		{
			json["decoctionInfo"][0]["dcTime"]="90";//íƒ•ì „ì‹œê°„ 
		}
		else*/
		{
			json["decoctionInfo"][0]["dcTime"]=dcTime;//íƒ•ì „ì‹œê°„ 
		}

		//íŠ¹ìˆ˜íƒ•ì „ì •ë³´
		var specialDecoc="spdecoc00";
		var specialDecoctxt="í‘œì¤€(ì„ ë¬´í›„ë¬¸)";
		var specialprice="0";
		json["decoctionInfo"][0]["specialDecoc"]=specialDecoc;//íŠ¹ìˆ˜íƒ•ì „ì½”ë“œ
		json["decoctionInfo"][0]["specialDecoctxt"]=specialDecoctxt;//íŠ¹ìˆ˜íƒ•ì „ëª… ì˜ˆ)ì£¼ìˆ˜ìƒë°˜
		json["decoctionInfo"][0]["specialDecocprice"]=specialprice;//íŠ¹ìˆ˜íƒ•ì „ë¹„ 

		var decocjsondata=$("textarea[name=decocdata]").val();
		var decocdata=(!isEmpty(decocjsondata)?JSON.parse(decocjsondata):"");
		json["decoctionInfo"][0]["decocdata"]=decocdata;//íƒ•ì „ë²• 

		//ë§ˆí‚¹ì •ë³´
		json["markingInfo"][0]=setmarkingInfo();//ë§ˆí‚¹ì½”ë“œ

		//í¬ìž¥ìž¬ì •ë³´
		var parr=new Array();
		var pdata={};
		//íŒŒìš°ì¹˜
		pdata["packType"]="pouch"; //í¬ìž¥ìž¬ì¢…ë¥˜ pouch(íŒŒìš°ì¹˜),medibox(í•œì•½ë°•ìŠ¤),delibox(ë°°ì†¡ë°•ìŠ¤)
		pdata["packCode"]=$("input[name=odpacktype]").val(); //í¬ìž¥ìž¬ì½”ë“œ
		pdata["packName"]=$("input[name=odpacktypetitle]").val(); //í¬ìž¥ìž¬ëª…
		pdata["packImage"]=$("input[name=odpacktypeimg]").val(); //í¬ìž¥ìž¬ì´ë¯¸ì§€ URL
		pdata["packAmount"]=$("input[name=odpacktypeprice]").val(); //ê°œë³„í¬ìž¥ìž¬ë¹„
		pdata["packCapa"]="0";
		parr.push(pdata);
		var pdata1={};
		//í•œì•½ë°•ìŠ¤
		pdata1["packType"]="medibox"; //í¬ìž¥ìž¬ì¢…ë¥˜ pouch(íŒŒìš°ì¹˜),medibox(í•œì•½ë°•ìŠ¤),delibox(ë°°ì†¡ë°•ìŠ¤)
		pdata1["packCode"]=$("input[name=odmedibox]").val(); //í¬ìž¥ìž¬ì½”ë“œ
		pdata1["packName"]=$("input[name=odmediboxtitle]").val(); //í¬ìž¥ìž¬ëª…
		pdata1["packImage"]=$("input[name=odmediboximg]").val(); //í¬ìž¥ìž¬ì´ë¯¸ì§€ URL
		pdata1["packAmount"]=$("input[name=odmediboxprice]").val(); //ê°œë³„í¬ìž¥ìž¬ë¹„
		pdata1["packCapa"]=$("input[name=odmediboxcapa]").val(); //ê°œë³„í¬ìž¥ìž¬ë¹„
		
		parr.push(pdata1);

		//ë°•ìŠ¤ë¼ë²¨
		var boxcode=$("#boxlabel").val();
		var boxtitle=$("#boxlabel option:selected").attr("data-title");
		var boxdesc=$("#boxlabel option:selected").text();
		var boxdata={};
		var boxarr=new Array();
		boxdata["code"]=boxcode;
		boxdata["title"]=boxtitle;
		boxdata["desc"]=boxdesc;
		boxarr.push(boxdata);
		json["labelInfo"][0]["boxlabel"]=boxarr;

		//json["labelInfo"][0]["boxlabel"]=[{
		//	"code":	boxcode,"title":boxtitle,"desc":boxdesc
		//}];

		var pdata2={};
		//ë°°ì†¡ë°•ìŠ¤
		pdata2["packType"]="delibox"; //í¬ìž¥ìž¬ì¢…ë¥˜ pouch(íŒŒìš°ì¹˜),medibox(í•œì•½ë°•ìŠ¤),delibox(ë°°ì†¡ë°•ìŠ¤)
		pdata2["packCode"]=$("input[name=odboxdeli]").val(); //í¬ìž¥ìž¬ì½”ë“œ
		pdata2["packName"]=$("input[name=odboxdelititle]").val(); //í¬ìž¥ìž¬ëª…
		pdata2["packImage"]=$("input[name=odboxdeliimg]").val(); //í¬ìž¥ìž¬ì´ë¯¸ì§€ URL
		pdata2["packAmount"]=$("input[name=odboxdeliprice]").val(); //ê°œë³„í¬ìž¥ìž¬ë¹„
		pdata2["packCapa"]="0";
		parr.push(pdata2);

		json["packageInfo"]=parr;

		//ì²©ì•½ê°€ê²© 
		var cfNHISmkprice=$("input[name=cfNHISmkprice]").val();//ì²©ì•½ì¡°ì œë¹„
		var cfNHISdcprice=$("input[name=cfNHISdcprice]").val();//ì²©ì•½íƒ•ì „ë¹„
		var cfNHISpkprice=$("input[name=cfNHISpkprice]").val();//ì²©ì•½í¬ìž¥ë¹„
		var cfNHISreprice=$("input[name=cfNHISreprice]").val();//ì²©ì•½ë°°ì†¡ë¹„ 

		cfNHISmkprice=!isEmpty(cfNHISmkprice)?cfNHISmkprice:0;
		cfNHISdcprice=!isEmpty(cfNHISdcprice)?cfNHISdcprice:0;
		cfNHISpkprice=!isEmpty(cfNHISpkprice)?cfNHISpkprice:0;
		cfNHISreprice=!isEmpty(cfNHISreprice)?cfNHISreprice:0;

		json["paymentInfo"][0]["cfNHISmkprice"]=cfNHISmkprice;
		json["paymentInfo"][0]["cfNHISdcprice"]=cfNHISdcprice;
		json["paymentInfo"][0]["cfNHISpkprice"]=cfNHISpkprice;
		json["paymentInfo"][0]["cfNHISreprice"]=cfNHISreprice;

		var amountTotal=amountMedicine=amountSweet=amountPharmacy=amountDecoction=amountPackaging=amountDelivery=0;
		if(!isEmpty($("textarea[name=amountjson]").val()))
		{
			var amountjson=JSON.parse($("textarea[name=amountjson]").val());
			amountTotal=amountjson["totalamount"];
			var totmedicine=totmaking=totdecoction=totpacking=totsweet=0;
			if(!isEmpty(amountjson["medicine"]))
			{
				var totmediarr=amountjson["medicine"].split(",");
				totmedicine=parseFloat(totmediarr[1]);
			}
			if(!isEmpty(amountjson["making"]))
			{
				var totmakingarr=amountjson["making"].split(",");
				totmaking=parseFloat(totmakingarr[2]);
			}
			if(!isEmpty(amountjson["sweet"]))
			{
				var totsweetarr=amountjson["sweet"].split(",");
				totsweet+=parseFloat(totsweetarr[4]);
			}
			if(!isEmpty(amountjson["sweetsugar"]))
			{
				var totsweetsugar=amountjson["sweetsugar"].split(",");
				totsweet+=parseFloat(totsweetsugar[4]);
			}
			if(!isEmpty(amountjson["sweetflavor"]))
			{
				var totsweetflavor=amountjson["sweetflavor"].split(",");
				totsweet+=parseFloat(totsweetflavor[4]);
			}
			if(!isEmpty(amountjson["sweetzahager"]))
			{
				var totsweetzahager=amountjson["sweetzahager"].split(",");
				totsweet+=parseFloat(totsweetzahager[4]);
			}
			if(!isEmpty(amountjson["sweetvelvet"]))
			{
				var totsweetvelvet=amountjson["sweetvelvet"].split(",");
				totsweet+=parseFloat(totsweetvelvet[4]);
			}
			if(!isEmpty(amountjson["decoction"]))
			{
				var totdecoctionarr=amountjson["decoction"].split(",");
				totdecoction=parseFloat(totdecoctionarr[2]);
			}
			if(!isEmpty(amountjson["packing"]))
			{
				var totpackingarr=amountjson["packing"].split(",");
				totpacking=parseFloat(totpackingarr[2]);
			}
			if(!isEmpty(amountjson["packing2"]))
			{
				var totpackingarr=amountjson["packing2"].split(",");
				totpacking+=parseFloat(totpackingarr[2]);
			}
			amountMedicine=totmedicine;
			amountSweet=totsweet;
			amountPharmacy=totmaking;
			amountDecoction=totdecoction;
			amountPackaging=totpacking;
			amountDelivery=amountjson["release"];
		}
		json["paymentInfo"][0]["amountJson"]=amountjson;
		json["paymentInfo"][0]["amountTotal"]=amountTotal;//ì´í•©ê³„ 
		json["paymentInfo"][0]["amountMedicine"]=amountMedicine;//ì´ì•½ìž¬ë¹„ 
		json["paymentInfo"][0]["amountAddmedi"]=amountSweet;//ë³„ì „ 
		json["paymentInfo"][0]["amountSugar"]="0";
		json["paymentInfo"][0]["amountSpecial"]="0";
		json["paymentInfo"][0]["amountPharmacy"]=amountPharmacy;//ì¡°ì œë¹„
		json["paymentInfo"][0]["amountDecoction"]=amountDecoction;//íƒ•ì „ë¹„
		json["paymentInfo"][0]["amountPackaging"]=amountPackaging;//í¬ìž¥ë¹„
		json["paymentInfo"][0]["amountDelivery"]=amountDelivery;//ë°°ì†¡ë¹„;
		json["paymentInfo"][0]["amountInfirst"]="0";//ì„ ì „ë¹„
		json["paymentInfo"][0]["amountInafter"]="0";//í›„í•˜ë¹„ 


	}		
	else if(dir=="prev" || dir=="cart")//ì ‘ìˆ˜ 
	{
		//ë°›ëŠ”ì‚¬ëžŒ, ë³´ë‚´ëŠ”ì‚¬ëžŒ ì •ë³´ 
		if(checkreceiver()==true)
		{
			if(checksender()==true)
			{				
				json["deliveryInfo"][0]=savesenderreceiver();
			}
			else
			{
				return;
			}
		}
		else
		{
			return;
		}

		if(dir=="prev")//ì´ì „ë‹¨ê³„
		{
			orderStatus="temp";
		}
		else
		{
			var jsonos=$("input[name=medicalorderstatus]").val();
			if(jsonos=="payment")
			{
				orderStatus="payment";
			}
			else if(jsonos=="done")
			{
				orderStatus="done";
			}
			else
			{
				orderStatus="cart";
			}

			if($("input:checkbox[name='patientreceiver']").is(":checked")==true)
			{
				json["deliveryInfo"][0]["patientreceiver"]="Y";
			}
			
		}

		json["orderInfo"][0]["orderStatus"]=orderStatus;//ì£¼ë¬¸ìƒíƒœ cart(ìž¥ë°”êµ¬ë‹ˆ),paid(ê²°ìž¬ì™„ë£Œ),done(ë“±ë¡ì™„ë£Œ)
		
	}

	//ìž„ì‹œì €ìž¥, ë‹¤ìŒë‹¨ê³„, ì ‘ìˆ˜ì—ë„ ì €ìž¥í•˜ìž! 
	json["deliveryInfo"][0]["receiveTied"]=!isEmpty($("input[name=receiveTied]").val())?$("input[name=receiveTied]").val():"";


	$("textarea[name=join_jsondata]").val(JSON.stringify(json));

	orderupdate(dir);

}
function goOrderLayer(btntype)
{
	clslayer("linklayer");
	var type=$("input[name=oltype]").val();
	var seq=$("input[name=olseq]").val();
	var keycode=$("input[name=keycode]").val();
	var goodscode=$("input[name=olgoodscode]").val();
	var productcode=$("input[name=olproductcode]").val();
	var title=$("input[name=oltitle]").val();
	var patientname=$("input[name=olpatientname]").val();

	switch(btntype)
	{
	case "reorder"://ìž¬ì£¼ë¬¸
		if(confirm("ìž¬ì£¼ë¬¸ í•˜ì‹œê² ìŠµë‹ˆê¹Œ?\nì²˜ë°©ëª…:"+title))
		{
			callapi("GET","order",getdata("orderreorderupdate")+"&seq="+seq);
		}
		break;
	case "ordercancel"://ì²˜ë°©ì·¨ì†Œ 
		if(confirm("ì²˜ë°©ì„ ì·¨ì†Œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?\nì²˜ë°©ëª…:"+title+"\ní™˜ìžëª…:"+patientname))
		{
			callapi("GET","order",getdata("ordercancelupdate")+"&seq="+seq);
		}
		break;
	case "cartdel"://ìž¥ë°”êµ¬ë‹ˆì‚­ì œ
		if(confirm("ì²˜ë°©ì„ ìž¥ë°”êµ¬ë‹ˆì—ì„œ ì‚­ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?\nì²˜ë°©ëª…:"+title+"\ní™˜ìžëª…:"+patientname))
		{
			callapi("GET","order",getdata("ordercartdelete")+"&seq="+seq);
		}
		break;
	case "tempdel"://ìž„ì‹œì €ìž¥ì‚­ì œ 
		if(confirm("ìž„ì‹œì²˜ë°©ì„ ì‚­ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?\nì²˜ë°©ëª…:"+title))
		{
			callapi("GET","order",getdata("ordertempdelete")+"&seq="+seq);
		}
		break;
	case "addr"://ì£¼ì†Œìˆ˜ì • 
		var url=getTwoUrl(type,seq,goodscode,productcode);
		location.href=url;
		break;
	case "docudown"://ì£¼ì†Œìˆ˜ì • 
		var url=getUrlData("MANAGER_URL")+"/99_LayerPop/document.NHIS.php?code="+keycode;
		window.open(url, "NHISReport", "width=900,height=1000");
		break;
	case "paymentcancel"://ê²°ì œì·¨ì†Œ 
		if(confirm("ê²°ì œì·¨ì†Œë¥¼ í•˜ì‹œê² ìŠµë‹ˆê¹Œ?\nì²˜ë°©ëª…:"+title+"\ní™˜ìžëª…:"+patientname))
		{
			callapi("POST","order",getdata("paymentcardcancel")+"&seq="+seq);
		}
		break;
	case "recart"://ìž¬ê²°ì œ 
		if(confirm("ìž¬ê²°ì œë¥¼ ì§„í–‰í•˜ì‹œê² ìŠµë‹ˆê¹Œ??\nì²˜ë°©ëª…:"+title+"\ní™˜ìžëª…:"+patientname))
		{
			callapi("POST","order",getdata("recartupdate")+"&seq="+seq);
		}
		break;
	case "salesslip"://ë§¤ì¶œì „í‘œë³´ê¸° 
		callapi("POST","order",getdata("salesslip")+"&seq="+seq);
		break;
	}
}
function clslayer(id){
	$("."+id).remove();
}
function golayer(type, seq, inuse, orderstatus, odStatus, title, goodscode, productcode, keycode,patientname)
{
	golayerlast(type, seq, inuse, orderstatus, odStatus, title, goodscode, productcode, keycode,patientname,"","");
}
function golayerlast(type, seq, inuse, orderstatus, odStatus, title, goodscode, productcode, keycode,patientname,pmStatus,pmPaytype)
{
	if(inuse=="C")
	{
		if(!isEmpty(pmStatus) && pmStatus!="cancel")
		{
			alert("ì·¨ì†Œëœ ì²˜ë°©ìž…ë‹ˆë‹¤.");
			return;
		}
	}

	{
		clslayer("linklayer");
		var status=odStatus.split("_");
		$("input[name=oltype]").val(type);
		$("input[name=olseq]").val(seq);
		$("input[name=keycode]").val(keycode);
		$("input[name=olgoodscode]").val(goodscode);
		$("input[name=olproductcode]").val(productcode);
		$("input[name=oltitle]").val(title);
		$("input[name=olpatientname]").val(patientname);
		var txt="<ul id='linklayer' class='linklayer'>";
			txt+="<span class='clslayer' onclick=clslayer('linklayer')>X</span>";
			if(inuse!="C")
			{
				txt+="<li id='idTmpDel'><a href=\"javascript:goviewurl('"+type+"', '"+seq+"', '"+inuse+"', '"+orderstatus+"', '"+odStatus+"', '"+goodscode+"', '"+productcode+"')\">ì²˜ë°©ë‚´ìš©ë°”ë¡œê°€ê¸°</a></li>";
			}

			if(type=="decoction" && orderstatus=="done" && odStatus=="done"){
				txt+="<li id='idreNewOrder'><a href=\"javascript:goOrderLayer('reorder')\">ìž¬ì£¼ë¬¸</a></li>";
			}
			if(orderstatus=="temp"){
				txt+="<li id='idTmpDel'><a href=\"javascript:goOrderLayer('tempdel')\">ìž„ì‹œì €ìž¥ì‚­ì œ</a></li>";
			}
			
			if(orderstatus=="cart" || (orderstatus=="payment" && pmStatus=='')){
				txt+="<li id='idTmpDel'><a href=\"javascript:goOrderLayer('cartdel')\">ìž¥ë°”êµ¬ë‹ˆì‚­ì œ</a></li>";
			}
			if(orderstatus=="payment"){
				txt+="<li id='idOrderCancel'><a href=\"javascript:goOrderLayer('ordercancel')\">ì²˜ë°©ì·¨ì†Œ</a></li>";
				if(!isEmpty(pmStatus) && pmStatus!="waiting")
				{
					txt+="<li id='idOrderCancel'><a href=\"javascript:goOrderLayer('recart')\">ìž¬ê²°ì œ</a></li>";
				}
			}
			if(orderstatus=="done"  && odStatus=="paid"){
				txt+="<li id='idOrderCancel'><a href=\"javascript:goOrderLayer('paymentcancel')\">ê²°ì œì·¨ì†Œ</a></li>";
			}
			if(orderstatus=="done" && odStatus=="done"){
				txt+="<li id='idDocuDown'><a href=\"javascript:goOrderLayer('docudown')\">ë“±ë¡ì°¸ì¡°ìžë£Œ</a></li>";
			}
			if(orderstatus=="done" && pmStatus=="done" && pmPaytype=="CREDIT")
			{
				txt+="<li id='idDocuDown'><a href=\"javascript:goOrderLayer('salesslip')\">ë§¤ì¶œì „í‘œë³´ê¸°</a></li>";
			}

			if(pmStatus=="cancel" && pmPaytype=="CREDIT")
			{
				txt+="<li id='idDocuDown'><a href=\"javascript:goOrderLayer('salesslip')\">ë§¤ì¶œì „í‘œë³´ê¸°</a></li>";
			}

			if((orderstatus=="payment" && pmStatus!='')
					|| (type=="goods" && orderstatus=="done" && status[0]=="paid")
					|| (type!="goods" && (status[0]=="paid" || status[0]=="making" || status[0]=="decoction") ) ){
				txt+="<li id='idAddrChange'><a href=\"javascript:goOrderLayer('addr')\">ì£¼ì†Œìˆ˜ì •</a></li>";
			}
			txt+="</ul>";
		$("#odtr"+seq).prepend(txt);
	}
}

//10ì›ë‹¨ìœ„ 
function setPriceFloor(price)
{
	return Math.floor(parseFloat(price)/10)*10;
}
function math_floor(price)
{
	return Math.floor(price);
}

//í•œì˜ì› ìŠ¹ì¸ íŒì—…
function medicalApproval(medicalname,meUserId)
{
	if(confirm(" '"+medicalname+"' ì†Œì†í•œì˜ì‚¬ë¡œ ìŠ¹ì¸í•˜ì‹œê² ìŠµë‹ˆê¹Œ?"))
	{
		callapi("POST","member",getdata("goregularmemberupdate")+"&meUserId="+meUserId);
		location.href="/member/logout.php";
	}
}

//ë‚˜ì¤‘ì— jqueryë¡œ ì´ë™í•´ì•¼í•¨..ì˜ˆë¹„ì¡°ì œì²˜ë°©, ìƒìš©ì²˜ë°©, ì²©ì•½ì²˜ë°©ì—ì„œë„ ì“°ìž„
function addpatientupdate(ptype)
{	
	if(isEmpty(ptype))
	{
		ptype='add';
	}
	if(ajaxnec()=="Y")
	{
		//í™˜ìžëª… 
		//	var apatientNamePattern = /[0-9]|[ã„±-ã…Žã…-ã…£]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
		var apatientNamePattern = /^[ã„±-ã…Ž|ê°€-íž£|a-z|A-Z]+$/; // í•œê¸€ ì˜ë¬¸ë§Œ ìž…ë ¥
		var apatientName=$("input[name=apatientName]").val().trim();
		$("input[name=apatientName]").val(apatientName);
	
		
		if (!apatientNamePattern.test(apatientName)) 
		{	
			alert("í™˜ìžëª…ì€ í•œê¸€,ì˜ë¬¸ë§Œ ìž…ë ¥ í•´ì£¼ì„¸ìš”.");
			return false;
		}
		
		//ìƒë…„ì›”ì¼ 
		if(getCookie("mck_cfcode")!="hm")
		{
			var datatimeRegexp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/; ///[0-9]{4}-[0-9]{2}-[0-9]{2}/;
			var apatientBrith=$("input[name=apatientBrith]").val();
			if ( !datatimeRegexp.test(apatientBrith) ) 
			{
				alert("ìƒë…„ì›”ì¼ì€ yyyy-mm-dd í˜•ì‹ìœ¼ë¡œ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
				return false;
			}
			var apatientPhone=$("input[name=apatientPhone]").val();
			var apatientMobile=$("input[name=apatientMobile]").val();

			if(isEmpty(apatientMobile))
			{
				alert("íœ´ëŒ€í°ì„ ìž…ë ¥í•´ ì£¼ì„¸ìš”.");
				return false;
			}

			if(!isEmpty(apatientPhone))
			{
				if(chkPhone(apatientPhone,"í™˜ìž")==false)
				{
					return false;
				}
			}
			if(chkMobile(apatientMobile,"í™˜ìž")==false)
			{
				return false;
			}
			
		}
		
		var apatientSex=$("#apatientSex option:selected").val();

		if(ptype=="update")
		{
			var meSeq=$("input[name=meSeq]").val();
			if(!isEmpty(meSeq))
			{
				callapi("POST","patient",getdata("changepatientupdate")+"&apatientSex="+apatientSex+"&meSeq="+meSeq);
			}
		}
		else
		{
			callapi("POST","patient",getdata("patientupdate")+"&apatientSex="+apatientSex);
		}

	}
	
}
function chkAuthority(type)
{
	//[{"code":"memid","data":"imp"},{"code":"recipe","data":"pos"},{"code":"goods","data":"hos"},{"code":"patient","data":"hos"},{"code":"order","data":"pos"},{"code":"tpayment","data":"pos"}]

	var ck_meAuthority=getCookie("mck_meAuthority");
	if(!isEmpty(ck_meAuthority)){
		if(ck_meAuthority.indexOf(type) != -1)
		{
			var arr=ck_meAuthority.split(",");
			for(var i=0;i<arr.length;i++)
			{
				var arr2=arr[i].split("_");
				if(arr2[0]==type)
				{
					return arr2[1];
				}
			}
			return "imp";
		}
	}
	return "imp";
}

/**
 * javascript í•œê¸€í¬í—˜ ê¸€ìž ìžë¥´ê¸°
 * @param len
 * @returns {string}
 */
String.prototype.cut = function(len) {
	var str = this;
	var newText = str.replace(/(<([^>]+)>)/ig,"");
	var s = 0;
	for (var i=0; i<newText.length; i++) {
		s += (newText.charCodeAt(i) > 128) ? 2 : 1;
		if (s > len) return newText.substring(0,i) + "...";
	}
	return newText;
}

function searching(search){
	var sarr=search.split("&");
	$.each(sarr, function(idx, val){
		var sarr1=val.split("=");
		if(sarr1[1]!="" && sarr1[1]!=undefined){
			//sarr1,,  searSelect ëŠ” ë³„ë„ì²˜ë¦¬
			$("input[name="+sarr1[0]+"]").val(decodeURIComponent(sarr1[1]));
			if(sarr1[0]=="searchCate"){
					$("#ca"+sarr1[1]).addClass("on");
			}
		}
	});
}
function getImgSrc(imgsrc)
{
	var str='<img src="/assets/images/noimg.png">';

	if(!isEmpty(imgsrc) && imgsrc!="NoIMG")
	{
		str='<img src="'+imgsrc+'" onerror=this.src="/assets/images/noimg.png">';
	}

	return str;
}
function viewprevpatientdata()
{
	var json=JSON.parse($("textarea[name=join_jsondata]").val());

	///í™˜ìžì •ë³´ 
	$("#patientName").text(json["patientInfo"][0]["patientName"]);
	$("#patientChartno").text(json["patientInfo"][0]["patientChartno"]);
	$("#patientMobile").text(json["patientInfo"][0]["patientMobile"]);

	$("input[name=patientcode]").val(json["patientInfo"][0]["patientCode"]);
	$("input[name=patientchartno]").val(json["patientInfo"][0]["patientChartno"]);
	$("input[name=patientname]").val(json["patientInfo"][0]["patientName"]);
	$("input[name=patientgender]").val(json["patientInfo"][0]["patientGender"]);
	$("input[name=patientbirth]").val(json["patientInfo"][0]["patientBirth"]);
	$("input[name=patientphone]").val(json["patientInfo"][0]["patientPhone"]);
	$("input[name=patientmobile]").val(json["patientInfo"][0]["patientMobile"]);
	
	$("input[name=patientzipcode]").val(json["patientInfo"][0]["patientZipcode"]);
	$("input[name=patientaddr]").val(json["patientInfo"][0]["patientAddr"]);
	$("textarea[name=patientmemo]").val(json["patientInfo"][0]["patientmemo"]); 
	$("input[name=patientage]").val(json["patientInfo"][0]["patientAge"]);
	$("input[name=patientgendertxt]").val(json["patientInfo"][0]["patientGendertxt"]);
	$("input[name=patientmedical]").val("");
	if(json["patientInfo"][0]["patientmedical"]=="1")
	{
		$("input[name=patientmedical]").val("1");
	}
	//console.log("patientmedical = " + $("input[name=patientmedical]").val());
	//console.log(json["patientInfo"]);

	var addr=json["patientInfo"][0]["patientAddr"];
	addr=addr.replace("||"," ");
	var addrs="("+json["patientInfo"][0]["patientZipcode"]+") "+addr;
	$("#patientAddr").text(addrs);
}
function chknotprescription(category)
{
	//DOO::240313 - disease290 ë§ˆì¼ë¦¬ì§€,disease320 ê°œì¸ê²°ì œ,disease998 í•œë°©ìš©í’ˆ,disease360 ì‘´ëœ¸ ëŠ” ì‚¬ì „ì²˜ë°©ì•ˆí•˜ê³  ë°”ë¡œ ë°œì†¡ìš”ì²­ê°€ëŠ¥í•˜ê²Œ í•˜ìž 
	if(category=="disease290" || category=="disease320" || category=="disease998" || category=="disease360") 
	{
		return true;
	}
	return false; 
}
function viewgoodsproductlist(id, obj)
{
	var ck_cfcode=getCookie("mck_cfcode");
	var cfgoodsorder=$("input[name=cfgoodsorder]").val();
	//console.log("cfgoodsorder = " + cfgoodsorder);

	var txt="";
	if(isEmpty(obj["viewmore"]))
	{
		$("#"+id).html("");
	}

	if(!isEmpty(obj["list"]))
	{
		$.each(obj["list"] ,function(index, val){ 

				txt='<li class="productList__item">';
				txt+='	<div class="productList__content">';

				if(isEmpty(getCookie("mck_meLoginid")) && getCookie("mck_cfcode")=="hm" && val["gdCategory"]=="disease360"){
					txt+='		<div class="thumbnail">';
				}
				else if(val["gdSoldout"]=="Y")
				{
					txt+='		<div class="thumbnail" onclick="alert(\'í’ˆì ˆìž…ë‹ˆë‹¤.\')" style="cursor:pointer;">';
				}
				else
				{
					if(cfgoodsorder == "goods")
					{
						var goodsurl=goGoodsUrl(val["gdCode"]);
						if(chknotprescription(val["pdType"])==true)
						{
							txt+='		<div class="thumbnail" onclick=\'location.href="/goods/#1|'+val["gdCode"]+'|"\' style="cursor:pointer;">';
						}
						else
						{
							txt+='		<div class="thumbnail" onclick="javascript:goRelateUrl(\''+goodsurl+'\')" style="cursor:pointer;">';
						}
					}
					else
					{
						if(id=="mainGoods" || id=="gwlistID"){
							txt+='		<div class="thumbnail" onclick=\'location.href="/goods/#1|'+val["gdCode"]+'|"\' style="cursor:pointer;">';
						}else{
							txt+='		<div class="thumbnail" onclick="goview(\''+val["gdCode"]+'\')" style="cursor:pointer;">';
						}
					}
				}
				txt+=getImgSrc(val["gdImgurl"]);
				txt+='		</div>';
				txt+='		<div class="info">';
				txt+='			<p class="description">'+val["gdName"]+'</p>';
				//DOO::ì›ëž˜ ì²­ì—°ë§Œ ê¸°íšì „ ìƒí’ˆê°€ê²©ì„ ë³´ì˜€ëŠ”ë° ONë„ ìƒí’ˆê°€ê²©ìš”ì²­í•˜ì—¬ ë‹¤ ë³´ì´ë„ë¡ ì²˜ë¦¬í•¨ (ìƒí’ˆì´ì—¬ì„œëª¨ë‘ ë³´ì´ê²Œí•¨) - 240308 
				//if(ck_cfcode == "cy"){
				if(obj["cfgoodsorder"]=="product")
				{
					if(chkAuthority("goods")=="pos"){
						txt+='			<p class="descriptionPrice">'+val["gdPrice"]+'</p>';
					}
				}
				else
				{
					if(chknotprescription(val["gdCategory"])==true)
					{

						if(chkAuthority("goods")=="pos"){
							txt+='			<p class="descriptionPrice">'+val["gdPrice"]+'</p>';
						}else if(isEmpty(getCookie("mck_meLoginid")) && getCookie("mck_cfcode")=="hm" && val["gdCategory"]=="disease360" && chkAuthority("goods")=="imp"){ //í•´ë°€ í•˜ë‹ˆë§ˆì„ ë¡œê·¸ì¸ì „ ì ‘ì† ê°€ëŠ¥ -> ìƒí’ˆ ë¦¬ìŠ¤íŠ¸ ê°€ê²© í‘œì‹œ sy 240905
							txt+='			<p class="descriptionPrice">'+val["gdPrice"]+'</p>';
						}
					}
				}
				//}				

				if(chknotprescription(val["gdCategory"])==false)
				{
					txt+='			<div class="flex">';
					if(val["psChk"]=="Y")
					{
						txt+='<span style="background-color: #66b39e;color:white;">ë°œì†¡ê°€ëŠ¥</span> <span>'+comma(val["psCnt"])+' ea</span>';
					}
					else if(val["psChk"]=="P")
					{
						txt+='<span>ì¤€ë¹„ì¤‘</span> <span>ì¡°ì œì™„ë£Œ('+val["psDate"]+')</span>';
					}
					else
					{
						txt+='<span>ì‚¬ì „ì²˜ë°© í•„ìš”</span> <span>ì¡°ì œê¸°ê°„ '+val["gdWating"]+'ì¼</span>';
					}
					txt+='			</div>';
				}
				
				//console.log(val["psChk"]);
				txt+='		</div>';
				txt+='		<div class="actions">';

				//í•´ë°€ í•˜ë‹ˆë§ˆì„ ë¡œê·¸ì¸ì „ ì ‘ì† ê°€ëŠ¥ sy 240905
				if(isEmpty(getCookie("mck_meLoginid")) && getCookie("mck_cfcode")=="hm" && val["gdCategory"]=="disease360"){
					txt+='<a href="javascript:" class="button"><span class="delivery">ì „í™”ë¬¸ì˜ ìš”ë§</span></a>';
				}
				else if(val["gdSoldout"]=="Y")
				{
					txt+='<a href="javascript:void(0);" onclick="alert(\'í’ˆì ˆìž…ë‹ˆë‹¤.\')" class="button" ><span>í’ˆì ˆ</span></a>';
				}
				else
				{
					if(chknotprescription(val["gdCategory"])==true)
					{
						txt+='<a href="javascript:goProductorder2(\''+val["gdbomCode"]+'\',\''+val["gdCode"]+'\')" class="button"><span class="delivery">ë°œì†¡ìš”ì²­</span></a>';
					}
					else
					{
						if(val["psChk"]=="Y")
						{
							if(cfgoodsorder == "goods")
							{
								txt+='<a href="/goods/goods.php?type='+val["gdCategory"]+'&goods='+val["gdCode"]+'&pretab=pre" class="button"><span>ì‚¬ì „ì²˜ë°©</span></a>';
								txt+='<a href="javascript:getDeliveryItem(\''+val["gdCode"]+'\')" class="button"><span class="delivery">ë°œì†¡ìš”ì²­</span></a>';
					
							}
							else
							{
								if(parseInt(val["goodsmaxcnt"])>1)
								{
									txt+='<a href="javascript:goProductUrl(\''+val["gdCode"]+'\', \''+val["gdCategory"]+'\');" class="button"><span>ì‚¬ì „ì²˜ë°©</span></a>';
								}
								else
								{
									txt+='<a href="/goods/goods.php?type='+val["gdCategory"]+'&goods='+val["gdbomCode"]+'&pretab=pre" class="button"><span>ì‚¬ì „ì²˜ë°©</span></a>';
								}
								txt+='<a href="javascript:goProductorder(\''+val["gdbomCode"]+'\',\''+val["gdCode"]+'\')" class="button"><span class="delivery">ë°œì†¡ìš”ì²­</span></a>';
							}				
						}
						else
						{
							if(cfgoodsorder == "goods")
							{
								txt+='<a href="/goods/goods.php?type='+val["gdCategory"]+'&goods='+val["gdCode"]+'&pretab=pre" class="button"><span>ì‚¬ì „ì²˜ë°©</span></a>';
								txt+='<a href="javascript:getDeliveryItem(\''+val["gdCode"]+'\')" class="button"><span class="delivery">ë°œì†¡ìš”ì²­</span></a>';
							}
							else
							{
								if(parseInt(val["goodsmaxcnt"])>1)
								{
									txt+='<a href="javascript:goProductUrl(\''+val["gdCode"]+'\', \''+val["gdCategory"]+'\');" class="button"><span>ì‚¬ì „ì²˜ë°©</span></a>';
								}
								else
								{
									txt+='<a href="/goods/goods.php?type='+val["gdCategory"]+'&goods='+val["gdbomCode"]+'&pretab=pre" class="button"><span>ì‚¬ì „ì²˜ë°©</span></a>';
								}
							}
						}
					}
				}
				txt+='		</div>';
				txt+='	</div>';
				txt+='</li>';

				$("#"+id).append(txt);
		});
	}
	$("#"+id).data("page",obj["page"]);

	$("#goodstotal").text(obj["tcnt"]);

	//ë”ë³´ê¸°
	var npage= parseInt($("input[name=page]").val());
	//viewmore("goods", obj["apiCode"], npage, obj["tpage"]);
	viewmore("goods", obj["apiCode"], obj["page"], obj["tpage"]);
}

//ì½˜í…ì¸ ìœ¼ë¡œ ì´ë™
function goContents(code,seq)
{
	if(seq!=""){
		location.href="/contents/"+code+"_detail.php?seq="+seq;
	}else{
		location.href="/contents/"+code+".php";
	}
}
//ê¸°ì„±ì²˜ë°©ìœ„ì¹˜ì—ì„œ ë©”ì¸ì—ì„œë„ ê°™ì´ ì“°ì´ê¸°ì— ì—¬ê¸°ë‹¤ ë¶™ìž„ 
function gocommercialorder(code)
{
	if(chkNoneMedical()==true)
	{
		alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
		return;
	}
	var url="";
	url="/goods/commercialorder.php?goods="+code;
	location.href=url;
}
//ê¸°ì„±ì²˜ë°©ìœ„ì¹˜ì—ì„œ ë©”ì¸ì—ì„œë„ ê°™ì´ ì“°ì´ê¸°ì— ì—¬ê¸°ë‹¤ ë¶™ìž„ 
function gocommercialdesc(code)
{
	if(chkNoneMedical()==true)
	{
		alert("í•œì˜ì›ì— ì†Œì†ëœ í•œì˜ì‚¬ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤");
		return;
	}
	var url="";
	//url="/goods/commercialdesc.php?goods="+code;
	url="/commercial/#1|"+code+"|";
	location.href=url;
}
//íƒ•ì œë¹„ìš©ì•ˆë‚´ 
function setDECOPriceDetail(amountJson)
{
	var DECOchubCnt=DECOmeditotPrice=DECOmkPrice=DECOmkCnt=DECOmktotPrice=DECOdcPrice=DECOdcCnt=DECOdctotPrice=DECOpilltotPrice=DECOpkPrice=DECOpkCnt=DECOpktotPrice=DECOretotPrice=DECOtotalAmount=medisweet=0;

	//console.log(amountJson);
	if(isEmpty(amountJson)){return;}

	$("#amount_packdiv").hide();
	$("#amount_poutchdiv").hide();
	$("#amount_mediboxdiv").hide();
	$("#amount_packdiv2").hide();

	if(!isEmpty(amountJson["medicine"]))
	{
		var medicinearr=amountJson["medicine"].split(",");//ì•½ìž¬ë¹„
		DECOchubCnt=medicinearr[0];
		DECOmeditotPrice=medicinearr[1];
	}
	if(!isEmpty(amountJson["making"]))
	{
		var makingarr=amountJson["making"].split(",");//ì¡°ì œë¹„
		DECOmkPrice=makingarr[0];
		DECOmkCnt=makingarr[1];
		DECOmktotPrice=makingarr[2];
	}
	
	if(!isEmpty(amountJson["makingtxt"]))
	{
		$("#DECOmktitle").text(amountJson["makingtxt"]);
	}

	$("#amount_medisweetdiv").hide();
	if(!isEmpty(amountJson["medisweettxt"]))
	{		
		$("#amount_medisweetdiv").show();

		var medisweetarr=amountJson["medisweettxt"].split("|||");
		var medisweetdata="";
		for(var j=0;j<medisweetarr.length;j++)
		{
			if(!isEmpty(medisweetarr)&&!isEmpty(medisweetarr[j]))
			{
				var msweetarr=medisweetarr[j].split(",");
				medisweetdata+='<div class="flex"><span>'+msweetarr[0]+'</span><strong class="ml-auto">'+commasFixed(msweetarr[1])+'</strong>ì›</div>';
			}
		}
		$("#medisweettd").html(medisweetdata);

		medisweet=amountJson["medisweet"];
	}

	$("#medicinecountdiv").hide();
	$("#medicountCnt").text("");
	$("#medicountPrice").text("");
	if(!isEmpty(amountJson["medicinecount"]))
	{
		var medicinecountarr=amountJson["medicinecount"].split(",");  
		$("#medicinecountdiv").show();
		$("#medicountCnt").text(medicinecountarr[0]);
		$("#medicountPrice").text(commasFixed(medicinecountarr[1]));
	}


	$("#amount_operdiv").hide();
	if(!isEmpty(amountJson["medioper"]))
	{
		$("#amount_operdiv").show();
		$("#tot_opertotalprice").text(commasFixed2(amountJson["medioper"]));
	}
	$("#amount_decocdiv").hide();
	if(!isEmpty(amountJson["decoction"]))
	{
		var decoctionarr=amountJson["decoction"].split(",");//íƒ•ì „ë¹„  
		if(parseInt(decoctionarr[2])>0)
		{
			$("#amount_decocdiv").show();
		}
		DECOdcPrice=decoctionarr[0];
		DECOdcCnt=decoctionarr[1];
		DECOdctotPrice=decoctionarr[2];
	}
	if(!isEmpty(amountJson["decoctiontxt"]))
	{
		$("#DECOdcpricedata").text(amountJson["decoctiontxt"]);
	}

	
	$("#amount_decopilldiv").hide();
	if(!isEmpty(amountJson["decopill"]))
	{
		var decopillarr=amountJson["decopill"].split(",");//ì œí™˜ë¹„   
		if(parseInt(decopillarr[2])>0)
		{
			$("#amount_decopilldiv").show();
		}
		DECOpilltotPrice=decopillarr[2];
	}
	if(!isEmpty(amountJson["decopilltxt"]))
	{
		$("#DECOpillpricedata").text(amountJson["decopilltxt"]);
	}

	$("#amount_ointmentsdiv").hide();
	$("#ointmentdiv").hide();
	$("#excipientdiv").hide();
	$("#ointmentspecialDiv").hide();
	if(!isEmpty(amountJson["ointment"]))
	{
		$("#amount_ointmentsdiv").show();
		$("#ointmentdiv").show();
		$("#DECOointmenttotPrice").text(commasFixed2(amountJson["ointment"]));
	}
	if(!isEmpty(amountJson["excipient"]))
	{
		$("#amount_ointmentsdiv").show();
		$("#excipientdiv").show();
		$("#DECOexcipienttotPrice").text(commasFixed2(amountJson["excipient"]));
		$("#DECOexcipientpricedata").text(amountJson["excipienttxt"]);
	}

	if(!isEmpty(amountJson["ointmentspecial"]))
	{
		$("#amount_ointmentsdiv").show();
		$("#ointmentspecialDiv").show();
		$("#DECOointmentspecialtotPrice").text(commasFixed2(amountJson["ointmentspecial"]));
		$("#DECOointmentspecialTitle").text(amountJson["ointmentspecialtxt"]);
	}


	$("#amount_packdiv").hide();
	$("#packoptionDiv").hide();
	if(!isEmpty(amountJson["packing"]))
	{
		var packinggarr=amountJson["packing"].split(",");//í¬ìž¥ë¹„ 
		//console.log(packinggarr);
		if(parseInt(packinggarr[2])>0)
		{
			$("#amount_packdiv").show();
			$("#packoptionDiv").show();
		}
		DECOpkPrice=packinggarr[0];
		DECOpkCnt=packinggarr[1];
		DECOpktotPrice=packinggarr[2];
	}
	if(!isEmpty(amountJson["packingtxt"]))
	{
		$("#DECOpkpacktypedata").text(amountJson["packingtxt"]);
	}
	$("#medioptionDiv").hide();
	if(!isEmpty(amountJson["packingoption"]))
	{
		$("#medioptionDiv").show();
		$("#DECOmedioptiontotalPrice").text(amountJson["packingoption"]);
	}
	if(!isEmpty(amountJson["packingoptiontxt"]))
	{
		$("#DECOmedioptionTitle").text(amountJson["packingoptiontxt"]);
	}
	
	if(!isEmpty(amountJson["release"]))
	{
		DECOretotPrice=amountJson["release"];
	}
	if(!isEmpty(amountJson["releasetxt"]))
	{
		$("#DECOredeliverydata").text(amountJson["releasetxt"]);
	}
	
	if(!isEmpty(amountJson["totalamount"]))
	{
		DECOtotalAmount=amountJson["totalamount"];
	}
	//ì„ ì „ë¹„
	$("#infirstDiv").hide();
	if(!isEmpty(amountJson["infirst"]))
	{
		$("#infirstDiv").show();
		$("#DECOinfirsttotalprice").text(commasFixed2(amountJson["infirst"]));
	}
	//í›„í•˜ë¹„
	$("#inafterDiv").hide();
	if(!isEmpty(amountJson["inafter"]))
	{
		$("#inafterDiv").show();
		$("#DECOinaftertotalprice").text(commasFixed2(amountJson["inafter"]));
	}
	//ìž¬íƒ•ë¹„
	$("#rehashDiv").hide();
	if(!isEmpty(amountJson["rehash"]))
	{
		$("#rehashDiv").show();
		$("#DECOrehashTitle").text(amountJson["rehashtxt"]);
		$("#DECOrehashtotalprice").text(commasFixed2(amountJson["rehash"]));
	}
	//ëƒ‰ì¹¨ë¹„ 
	$("#naengchimDiv").hide();
	if(!isEmpty(amountJson["naengchim"]))
	{
		$("#naengchimDiv").show();
		$("#DECOnaengchimtotalprice").text(commasFixed2(amountJson["naengchim"]));
	}
	//ì•½ë°¥ 
	$("#residueDiv").hide();
	if(!isEmpty(amountJson["residue"]))
	{
		$("#residueDiv").show();
		$("#residuetotalprice").text(commasFixed2(amountJson["residue"]));
	}
	//console.log("poutch = " + amountJson["poutch"]);
	if(!isEmpty(amountJson["poutch"]))
	{
		$("#amount_poutchdiv").hide();
		var poutcharr=amountJson["poutch"].split(",");//íŒŒìš°ì¹˜ 
		//console.log("poutcharr = " + poutcharr[3]);
		if(parseInt(poutcharr[3]))
		{	
			$("#DECOpackName").text(amountJson["poutchtxt"]);
			$("#DECOpacktotPrice").text(commasFixed2(poutcharr[3]));
			$("#amount_packdiv2").show();
			$("#amount_poutchdiv").show();
			$("#amount_packdiv").show();
		}
	}

	if(!isEmpty(amountJson["medibox"]))
	{
		$("#amount_packdiv2").show();
		$("#amount_mediboxdiv").show();
		var mediboxarr=amountJson["medibox"].split(",");//í•œì•½ë°•ìŠ¤ 
		$("#amount_mediboxdiv").hide();
		if(parseInt(mediboxarr[3])!=0)
		{
			$("#amount_packdiv").show();
			$("#amount_mediboxdiv").show();
			if(!isEmpty(amountJson["mediboxtxt"]))
			{
				$("#DECOboxtitledata").text(amountJson["mediboxtxt"]);
			}
			else
			{
				$("#DECOboxtitledata").text();
			}
			$("#DECOboxtotPrice").text(commasFixed2(mediboxarr[3]));
		}

	}

	$("#amount_packdiv3").hide();
	$("#amount_deliboxdiv").hide();
	if(!isEmpty(amountJson["delibox"]))
	{
		var deliboxarr=amountJson["delibox"].split(",");//í•œì•½ë°•ìŠ¤ 
		//console.log("delibox= " + amountJson["delibox"]);
		if(!isEmpty(deliboxarr[3]) && parseInt(deliboxarr[3])>0)
		{
			$("#amount_packdiv2").show();
			$("#amount_packdiv3").show();
			$("#amount_deliboxdiv").show();
			if(!isEmpty(amountJson["deliboxtxt"]))
			{
				$("#DECOdeliboxtitledata").text(amountJson["deliboxtxt"]);
			}
			else
			{
				$("#DECOdeliboxtitledata").text();
			}
			$("#DECOdeliboxtotPrice").text(commasFixed2(deliboxarr[3]));
		}
	}

	$("#amount_sweetdiv").hide();
	if(!isEmpty(amountJson["sweet"]))
	{
		$("#amount_sweetdiv").show();
		var sweetarr=amountJson["sweet"].split(",");//ê°ë¯¸ì œ  
		$("#DECOsweetName").text(sweetarr[0]);
		$("#DECOsweetPrice").text(sweetarr[1]);
		$("#DECOsweetCnt").text(sweetarr[2]);
		$("#DECOsweetdan").text(sweetarr[3]);
		$("#DECOsweetdan2").text(sweetarr[3]);
		$("#DECOsweettotPrice").text(sweetarr[4]);
	}

	$("#amount_sugardiv").hide();
	if(!isEmpty(amountJson["sweetsugar"]))
	{
		var totsweetsugar=amountJson["sweetsugar"].split(",");
		if(!isEmpty(amountJson["sweetsugartxt"]))
		{
			$("#DECOsugartitle").text(amountJson["sweetsugartxt"]);
		}
		else
		{
			$("#DECOsugartitle").text("");
		}
		$("#DECOsugartotPrice").text(commasFixed(totsweetsugar[4]));
		$("#amount_sugardiv").show();
	}
	$("#amount_flavordiv").hide();
	if(!isEmpty(amountJson["sweetflavor"]))
	{
		var totsweetflavor=amountJson["sweetflavor"].split(",");
		if(!isEmpty(amountJson["sweetflavortxt"]))
		{
			$("#DECOflavortitle").text(amountJson["sweetflavortxt"]);
		}
		else
		{
			$("#DECOflavortitle").text("");
		}
		$("#DECOflavortotPrice").text(commasFixed(totsweetflavor[4]));
		$("#amount_flavordiv").show();
	}
	$("#amount_zahagerdiv").hide();
	if(!isEmpty(amountJson["sweetzahager"])) //ìží•˜ê±° 
	{
		var totsweetzahager=amountJson["sweetzahager"].split(",");
		if(!isEmpty(amountJson["sweetzahagertxt"]))
		{
			$("#DECOzahagertitle").text(amountJson["sweetzahagertxt"]);
		}
		else
		{
			$("#DECOzahagertitle").text("");
		}
		$("#DECOzahagertotPrice").text(commasFixed(totsweetzahager[4]));
		$("#amount_zahagerdiv").show();
	}
	$("#amount_velvetdiv").hide();
	if(!isEmpty(amountJson["sweetvelvet"])) //2022-12-05í‹´í¬ 
	{			
		var totsweetvelvet=amountJson["sweetvelvet"].split(",");
		if(!isEmpty(amountJson["sweetvelvettxt"]))
		{
			$("#DECOvelvettitle").text(amountJson["sweetvelvettxt"]);
		}
		else
		{
			$("#DECOvelvettitle").text("");
		}
		$("#DECOvelvettotPrice").text(commasFixed(totsweetvelvet[4]));
		$("#amount_velvetdiv").show();
	}

	$("#amount_fermentedwaterdiv").hide();
	if(!isEmpty(amountJson["sweetfermentedwater"])) //2022-12-05í‹´í¬ 
	{			
		var totsweetfermentedwater=amountJson["sweetfermentedwater"].split(",");
		if(!isEmpty(amountJson["sweetfermentedwatertxt"]))
		{
			$("#DECOfermentedwatertitle").text(amountJson["sweetfermentedwatertxt"]);
		}
		else
		{
			$("#DECOfermentedwatertitle").text("");
		}
		$("#DECOfermentedwatertotPrice").text(commasFixed(totsweetfermentedwater[4]));
		$("#amount_fermentedwaterdiv").show();
	}

	$("#dcspecialDiv").hide();
	$("#dcspecialpDiv").hide();
	if(!isEmpty(amountJson["special"]))
	{
		var totspecial=amountJson["special"].split(",");		
		if(!isEmpty(amountJson["specialtxt"]))
		{
			$("#DECOspecialTitle").text(amountJson["specialtxt"]);
		}
		else
		{
			$("#DECOspecialTitle").text("");
		}
		$("#DECOspecialtotPrice").text(commasFixed(totspecial[3]));
		$("#dcspecialDiv").show();
		
		if(!isEmpty(amountJson["specialpersonnel"])&&parseInt(amountJson["specialpersonnel"])>0)
		{
			$("#dcspecialpDiv").show();
			$("#DECOspecialptotPrice").text(commasFixed(amountJson["specialpersonnel"]));
		}
		else
		{
			$("#DECOspecialptotPrice").text("");
		}

		
	}
	//ì œë¶„ë¹„ 
	$("#amount_powderdiv").hide();
	if(!isEmpty(amountJson["powder"]))
	{
		$("#amount_powderdiv").show();
		var totpowder=amountJson["powder"].split(",");
		$("#DECOpwpricedata").text(amountJson["powdertxt"]);
		$("#DECOpwtotPrice").text(commasFixed2(totpowder));
	}

	//ì²©ì œê¸°ë³¸ë£Œ 
	$("#amount_herbaldiv").hide();
	if(!isEmpty(amountJson["herbal"]))
	{
		$("#amount_herbaldiv").show();
		var totherbal=amountJson["herbal"].split(",");
		$("#DECOhbpricedata").text(amountJson["herbaltxt"]);
		$("#DECOhbtotPrice").text(commasFixed2(totherbal));
	}

	//ì¶”ê°€ì‹œê°„íƒ•ì €ë¹„
	$("#dctimeDiv").hide();
	if(!isEmpty(amountJson["decoctime"]))
	{
		$("#dctimeDiv").show();
		var totdctime=amountJson["decoctime"].split(",");
		$("#DECOdctime").text(totdctime[0]);
		$("#DECOdctimePrice").text(commasFixed2(totdctime[1]));
	}

	//ê¸ˆë°•
	$("#goldfoildiv").hide();
	if(!isEmpty(amountJson["goldfoil"]))
	{
		var totgoldfoil=amountJson["goldfoil"].split(",");
		if(!isEmpty(totgoldfoil[3]) && parseInt(totgoldfoil[3])>0)
		{		
			$("#DECOgoldfoildata").text(amountJson["goldfoiltxt"]);
			$("#DECOgoldfoiltotPrice").text(commasFixed2(totgoldfoil[3]));
			$("#goldfoildiv").show();
		}
		else
		{
			$("#DECOgoldfoildata").text("");
			$("#DECOgoldfoiltotPrice").text("");
		}
	}

	//ì½”íŒ…ë¹„-ê¿€,ìˆ™ì§€í™©,ì¹¼ë¼ì½”íŒ…
	$("#coatingdiv").hide();
	$("#coatingflavordiv").hide();
	$("#DECOcoatingdata").text("");
	$("#DECOcoatingPrice").text("");
	$("#DECOcoatingflavordata").text("");
	$("#DECOcoatingflavorPrice").text("");
	if(!isEmpty(amountJson["coating"]))
	{
		var totcoating=amountJson["coating"].split(",");
		if(!isEmpty(totcoating[2]) && parseInt(totcoating[2])>0)
		{
			$("#coatingdiv").show();
			$("#DECOcoatingdata").text(amountJson["coatingtxt"]);
			$("#DECOcoatingPrice").text(commasFixed2(totcoating[2]));
		}
	}	
	//í–¥ê¸°ì½”íŒ… 	
	if(!isEmpty(amountJson["coatingflavor"]))
	{
		var totcoatingflavor=amountJson["coatingflavor"].split(",");
		if(!isEmpty(totcoatingflavor[2]) && parseInt(totcoatingflavor[2])>0)
		{
			$("#coatingflavordiv").show();
			$("#DECOcoatingflavordata").text(amountJson["coatingflavortxt"]);
			$("#DECOcoatingflavorPrice").text(commasFixed2(totcoatingflavor[2]));
		}
	}
	//ë†ì¶•í™˜ë¹„ 
	$("#amount_concentdiv").hide();
	$("#DECOconcentdata").text("");
	$("#DECOconcenttotPrice").text("");
	if(!isEmpty(amountJson["concent"]))
	{
		var totconcent=amountJson["concent"].split(",");
		if(!isEmpty(totconcent[2]) && parseInt(totconcent[2])>0)
		{
			$("#amount_concentdiv").show();
			$("#DECOconcentdata").text(amountJson["concenttxt"]);
			$("#DECOconcenttotPrice").text(commasFixed2(totconcent[2]));
		}
	}

	//ì œí™˜ë¹„í• ì¸ 
	$("#decopilldiscountdiv").hide();
	$("#DECOpilldiscountpricedata").text("");
	$("#DECOpilldiscountprice").text("");
	if(!isEmpty(amountJson["decopilldiscount"]))
	{
		var totconcent=amountJson["decopilldiscount"].split(",");
		if(!isEmpty(totconcent[2]))// && parseInt(totconcent[2])>0)
		{
			$("#decopilldiscountdiv").show();
			$("#DECOpilldiscountpricedata").text(amountJson["decopilldiscounttxt"]);
			$("#DECOpilldiscountprice").text(commasFixed2(totconcent[2]));
		}
	}
	

	//1.ì•½ìž¬ë¹„ 
	$("#DECOchubCnt").text(commasFixed2(DECOchubCnt));
	$("#DECOmeditotPrice").text(commasFixed2(DECOmeditotPrice));
	//2.ì¡°ì œë¹„ 
	$("#DECOmktotPrice").text(commasFixed2(DECOmktotPrice));
	//3.íƒ•ì „ë¹„ 
	$("#DECOdctotPrice").text(commasFixed2(DECOdctotPrice));
	//ì œí™˜ë¹„
	$("#DECOpilltotPrice").text(commasFixed2(DECOpilltotPrice));
	//4.í¬ìž¥ë¹„
	$("#DECOpktotPrice").text(commasFixed2(DECOpktotPrice));
	//5.ë°°ì†¡ë¹„ 
	$("#DECOretotPrice").text(commasFixed2(DECOretotPrice));
	//6.ì´í•©ê³„
	$("#DECOtotalAmount").text(commasFixed2(DECOtotalAmount));
}
//íƒ•ì œë¹„ìš©ì•ˆë‚´ 
function setDECOTAPriceDetail(amountJson)
{
	var DECOchubCnt=DECOmeditotPrice=DECOmkPrice=DECOmkCnt=DECOmktotPrice=DECOdcPrice=DECOdcCnt=DECOdctotPrice=DECOpilltotPrice=DECOpkPrice=DECOpkCnt=DECOpktotPrice=DECOretotPrice=DECOtotalAmount=medisweet=0;

	//console.log(amountJson);


	if(!isEmpty(amountJson["making"]))
	{
		var makingarr=amountJson["making"].split(",");//ì²˜ë°©ë¹„
		DECOmkPrice=makingarr[0];
		DECOmkCnt=makingarr[1];
		DECOmktotPrice=makingarr[2];
	}
	if(!isEmpty(amountJson["packing"]))
	{
		var packinggarr=amountJson["packing"].split(",");//í¬ìž¥ë¹„ 
		DECOpkPrice=packinggarr[0];
		DECOpkCnt=packinggarr[1];
		DECOpktotPrice=packinggarr[2];
	}
	if(!isEmpty(amountJson["release"]))
	{
		DECOretotPrice=amountJson["release"];
	}
	if(!isEmpty(amountJson["totalamount"]))
	{
		DECOtotalAmount=amountJson["totalamount"];
	}

	//1.ì²˜ë°©ë¹„ 
	$("#TAmkdata").text(amountJson["makingtxt"]);
	$("#TAmktotPrice").text(commasFixed2(DECOmktotPrice));
	//2.í¬ìž¥ë¹„ 
	$("#DECOpkpacktypedata").text(amountJson["packingtxt"]);
	$("#DECOpktotPrice").text(commasFixed2(DECOpktotPrice));
	//3.ë°°ì†¡ë¹„ 
	$("#DECOredeliverydata").text(amountJson["releasetxt"]);
	$("#DECOdctotPrice").text(commasFixed2(DECOretotPrice));
	//4.ì´í•©ê³„
	$("#DECOtotalAmount").text(commasFixed2(DECOtotalAmount));
}
function download(url, name){
	$("#filedown").remove();
	var div="<iframe id='filedown' style='width:0;height:0;'></iframe>";
	$("body").prepend(div);
	$("#filedown").attr("src","/inc/download.php?url="+url+"&name="+encodeURIComponent(name));
}

function viewmodalpage(obj)
{
	var txt="";
	$("#pgTitle").text(obj["pgTitle"]);
	$.each(obj["list"] ,function(index, val){
		switch(val["pgType"]){
			case "100":
				txt+="<div class='subTit flex items-center justify-between'><h3>"+val["pgContents"]+"</h3></div>";
			break;
			case "500":
				txt+="<div class='scroll cont'>"+val["pgContents"]+"</div>";
			break;
		}
	});
	$("#modal__body").html(txt);
}

function recipechart(type){

	var flag = true;
	if(type != 'recom'){	// ì¶”ì²œì²˜ë°©ì€ ë„˜ì–´ê°ˆìˆ˜ ìžˆë„ë¡	
		$.each($('#recipeMedi .mm_state') ,function(index, val){
			//console.log(index , $(val).attr('data-attr1'));
			if($(val).attr('data-attr1') != 'Y'){			
				flag = false;
				var msg =  '[ì•½ìž¬ë³€ê²½í•„ìš”] í•­ëª©ì˜ ì•½ìž¬ ë³€ê²½í›„\n ë‹¤ì‹œì‹œë„í•´ì£¼ì„¸ìš”.';
				if(type == 'recom'){
					msg = 'ì²˜ë°© ë¶ˆê°€ëŠ¥í•œ ì•½ìž¬ê°€ ìžˆìŠµë‹ˆë‹¤.';
				}
				alert(msg);					
				return false;
			}			
		});	
	}

	if(flag){
		var recipe=$("input[name=seq]").val();
		var title=$("input[name=rc_title]").val();
		setCookie("mck_recipe", type+"_"+recipe+"_"+title);
		location.href="/goods/chart.php";
	}
	
}

function getpage(code){
	callapi("GET","contents",getdata("page")+"&code="+code);
}
function inputPhoneNumber(obj)
{
	var number = obj.value.replace(/[^0-9]/g, "");
	var testDate = number.replace(/(^02|^0502|^0504|^0505|^0506|^0507|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-");
	obj.value=testDate;
}
function inputMobileNumber(obj)
{
	var number = obj.value.replace(/[^0-9]/g, ""); 
	var phone = "";
	if(number.length < 4) 
	{ 
		phone=number; 
	} 
	else if(number.length < 7) 
	{ 
		phone += number.substr(0, 3); phone += "-"; phone += number.substr(3); 
	} 
	else if(number.length < 11) 
	{ 
		phone += number.substr(0, 3); phone += "-"; phone += number.substr(3, 3); phone += "-"; phone += number.substr(6); 
	} 
	else 
	{ 
		phone += number.substr(0, 3); phone += "-"; phone += number.substr(3, 4); phone += "-"; phone += number.substr(7); 
	}
	obj.value = phone;
}
function inputBirthNumber(obj)
{
	var number = obj.value.replace(/[^0-9]/g, ""); 
	var formatNum = "";
	if(number.length>=8) 
	{ 
		number=number.substr(0,8);
		formatNum = number.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
	} 
	else
	{
		formatNum = number.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');	
	} 
	obj.value = formatNum;
}
//ìƒë°˜,ìƒì™¸,ì´ë¬¼ì§ˆ,ë³€ì§ˆ,ë…ì„±,ìœ íš¨ì„±ë¶„,ë„í•‘ 
function viewcomponentdesc(obj)
{
	var type="";
	$(".component .active").each(function(){
		type=$(this).attr("id");
	});

	$("textarea[name=componentdata]").val("");
	if(!isEmpty(obj["list"]))
	{
		$("textarea[name=componentdata]").val(JSON.stringify(obj["list"]));

		callcomponent(type);
	}
}
function callcomponent(code)
{
	var jscomponent=$("textarea[name=componentdata]").val();
	$("#cpdifferent").removeClass("active");
	$("#cpreduce").removeClass("active");
	$("#cpgarbage").removeClass("active");
	$("#cprots").removeClass("active");
	$("#cppoison").removeClass("active");
	$("#cpingredient").removeClass("active");
	$("#cpdoping").removeClass("active");


	if(!isEmpty(jscomponent))
	{
		var component=JSON.parse(jscomponent);
		$("#componenttbl tbody").html("");
		var txt="";
		var mmdifferent=mmreduce=mmgarbage=mmrots=mmpoison=mmingredient=mmdoping=0;
		
		$.each(component ,function(index, val){
			if(!isEmpty(val["mmdifferent"])){mmdifferent++;}
			if(!isEmpty(val["mmreduce"])){mmreduce++;}
			if(!isEmpty(val["mmgarbage"])){mmgarbage++;}
			if(!isEmpty(val["mmrots"])){mmrots++;}
			if(!isEmpty(val["mmpoison"])){mmpoison++;}
			if(!isEmpty(val["mmingredient"])){mmingredient++;}
			if(!isEmpty(val["mmdoping"])){mmdoping++;}

			var codedata="";
			switch(code)
			{
			case "cpdifferent":
				$('#cpdifferent').addClass("active");
				codedata=val["mmdifferent"];
				break;
			case "cpreduce":
				$('#cpreduce').addClass("active");
				codedata=val["mmreduce"];
				break;
			case "cpgarbage":
				$('#cpgarbage').addClass("active");
				codedata=val["mmgarbage"];
				break;
			case "cprots":
				$('#cprots').addClass("active");
				codedata=val["mmrots"];
				break;
			case "cppoison":
				$('#cppoison').addClass("active");
				codedata=val["mmpoison"];
				break;
			case "cpingredient":
				$('#cpingredient').addClass("active");
				codedata=val["mmingredient"];
				break;
			case "cpdoping":
				$('#cpdoping').addClass("active");
				codedata=val["mmdoping"];
				break;
			}
			if(!isEmpty(codedata))
			{
				txt+="<tr>" +
					"<td class='text-left'>"+val["mmTItle"]+"</td>" +
					"<td class='text-left'>"+codedata+"</td>" +
					"</tr>";
			}
		});
		$("#componenttbl tbody").html(txt);


	}

	if(parseInt(mmdifferent)>0){ $("#cpdifferenti").addClass("dot"); }
	if(parseInt(mmreduce)>0){ $("#cpreducei").addClass("dot"); }
	if(parseInt(mmgarbage)>0){ $("#cpgarbagei").addClass("dot"); }
	if(parseInt(mmrots)>0){ $("#cprotsi").addClass("dot"); }
	if(parseInt(mmpoison)>0){ $("#cppoisoni").addClass("dot"); }
	if(parseInt(mmingredient)>0){ $("#cpingredienti").addClass("dot"); }
	if(parseInt(mmdoping)>0){ $("#cpdopingi").addClass("dot"); }

}
//íƒë°°ì‚¬ì„ íƒ 
function viewdelivery(list, data, ordertypecode)
{
	//console.log("ordertypecode:"+ordertypecode);
	$("#deliverysel").html("");
	var txt="";
	if(!isEmpty(list))
	{
		$.each(list, function(idx, val){
			var dvCode=val["dvCode"];
			var dvName=val["dvName"];
			var dvPrice=val["dvPrice"];
			if(!(ordertypecode=="goods" && dvCode=="hpl")){
				txt+='<option value="'+dvCode+'" data-price="'+dvPrice+'">'+dvName+'</option>';
			}
		});
		$("#deliverysel").html(txt);
	}

	if(!isEmpty(data))
	{
		$("#deliverysel option[value="+data+"]").attr("selected", "selected");
		changedelivery(ordertypecode);
	}
}
function chkhpltied(delitype)
{
	var mck_cfcode=getCookie("mck_cfcode");
	if(delitype=="hpl" && mck_cfcode=="hp")
	{
		return true;
	}
	return false;
}
function changedelivery(ordertypecode)
{
	$("input[name=deliveryDate]").val("");
	var orderDelivery=$("#deliverysel option:selected").val();
	var mck_cfcode=getCookie("mck_cfcode");
	
	if(orderDelivery=="logen" || orderDelivery=="pickup" || orderDelivery=="quick" || orderDelivery=="cj" || (chkhpltied(orderDelivery)==true))
	{
		if((orderDelivery=="logen" && ordertypecode=="decoction") || (orderDelivery=="logen" && ordertypecode=="NHIS") || (orderDelivery=="cj" && ordertypecode=="decoction") || (orderDelivery=="cj" && ordertypecode=="NHIS") || (orderDelivery=="hpl" && ordertypecode=="decoction") || (orderDelivery=="hpl" && ordertypecode=="NHIS"))
		{
			//ë¬¶ìŒë°°ì†¡ ë¶ˆê°€ 
			viewtiedparentlist(null);
		}
		else
		{
			//ë¬¶ìŒë°°ì†¡ê°€ëŠ¥
			callapi("POST","goods",getdata("changeordertiedlist")+"&orderDelivery="+orderDelivery+"&ordertypecode="+ordertypecode);
		}
	}
	else
	{
		//ë¬¶ìŒë°°ì†¡ ë¶ˆê°€ 
		viewtiedparentlist(null);
	}

	if(ordertypecode=="goods")
	{
		if(orderDelivery=="pickup")
		{
			$("input[name=orderdelivery]").val(orderDelivery);
			$("input[name=reReceiverType]:input[value=sudong]").prop("checked", true).trigger("click");
		}
		
	}
	resetCnt();


	getdelidate("basic");
}
function viewtiedparentlist(obj)
{
	$("#deliverytiedlist").html("");
	var receiveTied=$("input[name=receiveTied]").val();
	receiveTied=!isEmpty(receiveTied)?receiveTied:"";
	var txt="<option value='' data-parentcode='' >ë¬¶ìŒë°°ì†¡ì—†ìŒ</option>";
	if(!isEmpty(obj) && !isEmpty(obj["ordertiedparentlist"]))
	{
		$.each(obj["ordertiedparentlist"], function(idx, val){
			var odSeq=val["odSeq"];
			var ordercode=val["ordercode"];
			var ordertitle=val["ordertitle"];
			var deliverydate=val["deliverydate"];
			var patientname=val["patientname"];
			var receivename=val["receivename"];
			var receivezipcode=val["receivezipcode"];
			var receiveaddress=val["receiveaddress"];
			if(receiveTied==ordercode)
			{
				txt+='<option value="'+ordercode+'" data-parentcode="'+ordercode+'" selected>'+'['+receivezipcode+'] '+receiveaddress+' / '+ordertitle+'('+ordercode+')</option>';
			}
			else
			{
				txt+='<option value="'+ordercode+'" data-parentcode="'+ordercode+'">'+'['+receivezipcode+'] '+receiveaddress+' / '+ordertitle+'('+ordercode+')</option>';
			}
		});
	}
	$("#deliverytiedlist").html(txt);

	//if(!isEmpty(data))
	//{
	//	$("#deliverytiedlist option[value="+data+"]").attr("selected", "selected");
	//}
}
function changedeliverytied()
{
	//ë¬¶ìŒë°°ì†¡ 
	var parentcode=$("#deliverytiedlist option:selected").data("parentcode");
	var receiveTied=!isEmpty($("input[name=receiveTied]").val())?$("input[name=receiveTied]").val():"";
	
	var msg="ë¬¶ìŒë°°ì†¡ì„ í•´ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?";
	if(!isEmpty(parentcode))
	{
		msg="ë¬¶ìŒë°°ì†¡ì„ ì‹ ì²­í•˜ì‹œê² ìŠµë‹ˆê¹Œ?";
	}
	if(confirm(msg))
	{
		var chkcallapi=false;
		if(!isEmpty(parentcode) && !isEmpty(receiveTied)) //
		{
			if(parentcode==receiveTied)
			{
				
			}
			else
			{
				alert("[ì„ íƒë¶ˆê°€] ì´ë¯¸ ì‹ ì²­í•œ ë¬¶ìŒë°°ì†¡ì´ ìžˆìŠµë‹ˆë‹¤.");
			}
		}
		else
		{
			chkcallapi=true;
			getdelidate("basic");
		}
		if(chkcallapi==true)
		{
			//ì£¼ì†Œë³€ê²½, ë°°ì†¡í¬ë§ì¼ ë³€ê²½ 
			callapi("GET","goods",getdata("changeordertieddesc")+"&parentcode="+parentcode);
		}
	}
	else
	{
		if(!isEmpty(parentcode))
		{
			$("#deliverytiedlist").val("");
			changeordertieddata(false);
			getdelidate("basic");
		}
		else
		{
			$("#deliverytiedlist").val(receiveTied);
			changeordertieddata(true);
		}
	}
}
// ì „í™”ë²ˆí˜¸ í™•ì¸
function isMobile()
{
	var chk =  smsnec();
	if (chk == "Y")
	{
		callapi("POST","member",getdata("ismobile"));
	}
	return;
}

function authmobile(){
	var chk =  smsnec();
	var auth=$("input[name=authNo]").val();
	if(auth==""){
		chk="N";
		alert("ìŠ¹ì¸ë²ˆí˜¸ë¥¼ ìž…ë ¥í•˜ì„¸ìš”");
	}

	if (chk == "Y")
	{
		clearInterval(timer);
		callapi("POST","member",getdata("authmobile"));
	}
	return;
}

// ì´ë¦„ í•œê¸€ ì˜ì†ŒëŒ€ë¬¸ìž ì²´í¬
function checkKor(str)
{
	$("#namechk").html('');
	var nameReg = /^[ê°€-íž£a-zA-Z]{2,20}$/g;
	var name=$("input[name=meName]").val();
	var _value = event.srcElement.value;
	if (!isEmpty(name))
	{
		if (!nameReg.test(name) && name)
		{
			event.srcElement.value=_value.replace(/[ã„±-ã…Ž|ã…-ã…£|0-9|!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\â‚©\s]/g, '' );
			$("#namechk").show().html("<span class=\"error_message red\">ì´ë¦„ì€ 2ìž ì´ìƒì˜ í•œê¸€,ì˜ì†ŒëŒ€ë¬¸ìž ê°€ëŠ¥í•©ë‹ˆë‹¤.</span>");
			return false;
		} else {
			$("#namechk").show().html("<span class=\"error_message\">ì‚¬ìš©ê°€ëŠ¥í•©ë‹ˆë‹¤.</span>");
			return true;
		}
	}
}

//ì˜ë¬¸ í˜¼í•© ì²´í¬ì™€ ì•„ì´ë”” ì¤‘ë³µí™•ì¸
function loginid_check()
{
	$("#idchktxt").html('');
	$("input[name=idchk]").val(0);
	var id=$("input[name=meLoginid]").val();
	var idReg = /^[a-z0-9_-]{5,20}$/g;

	if(!isEmpty(id))
	{
		if(!idReg.test(id) && $("input[name=meLoginid]").val())
		{
			$("#idchktxt").show().html("<span class=\"error_message red\">ì•„ì´ë””ëŠ” 5~20ìžì˜ ì˜ë¬¸ ì†Œë¬¸ìž ì‚¬ìš©í•´ì£¼ì„¸ìš”</span>");
			return false;
		}
		else
		{
			callapi("GET","member",getdata("medicalidchk"));
			return false;
		}
	}
}
// ë¹„ë°€ë²ˆí˜¸ íŒ¨í„´ ì²´í¬ (8ìž ì´ìƒ, ë¬¸ìž, ìˆ«ìž, íŠ¹ìˆ˜ë¬¸ìž í¬í•¨ì—¬ë¶€ ì²´í¬)
function checkPasswordPattern(str) {
	var pattern1 = /[0-8]/; // ìˆ«ìž
	var pattern2 = /[a-zA-Z]/; // ë¬¸ìž
	var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // íŠ¹ìˆ˜ë¬¸ìž

	if(!pattern1.test(str) || !pattern2.test(str) || !pattern3.test(str) || str.length < 8 || str.length > 15) {
		$("#passwordchk").show().html('<span class="error_message red">ë¹„ë°€ë²ˆí˜¸ëŠ” 8~15ìžë¦¬ ì´ìƒ ë¬¸ìž, ìˆ«ìž, íŠ¹ìˆ˜ë¬¸ìžë¡œ êµ¬ì„±í•˜ì—¬ì•¼ í•©ë‹ˆë‹¤.</span> ');

		return false;
	} else {
		return true;
	}
}


//í•„ìˆ˜ë°ì´í„° ì²˜ë¦¬
function smsnec()
{
	var nec="Y";
	var txt="";

	var meMobile0=$("select[name=meMobile0]").val();
	var meMobile1=$("input[name=meMobile1]").val();
	var meMobile2=$("input[name=meMobile2]").val();
	var meMobile=meMobile0+"-"+meMobile1+"-"+meMobile2;
	$("input[name=meMobile]").val(meMobile);

	$(".smsnec").each(function(val){
		var dat=$(this).val();
		if(isEmpty(dat))
		{
			nec="N";
			txt+=$(this).attr("placeholder");
			return false;
		}
	});
	if(nec=="N"){
		alert("("+txt+") ìž…ë ¥ í•´ì£¼ì„¸ìš”.");
	}
	return nec;
}

//ë¬¸ìžë‚¨ì€ì‹œê°„í‘œì‹œ
function remain(id, txt){
	var t=$("#"+id).text().split(":");
	var m=parseInt($.trim(t[0]));
	var s=parseInt($.trim(t[1]));
	if(s<1){
		if(m>0){
			m=m - 1;
			s=59;
		}else{
			clearInterval(timer);
		}
	}else{
		s=s - 1;
	}
	if(s<10)s="0"+s;
	if(!isEmpty(txt))
	{
		var remain=txt+"<span>ë‚¨ì€ ì‹œê°„ <i  id='remain'>"+m+" : "+s+"</i></span>";
	}
	else
	{
		var remain="<span>ë‚¨ì€ ì‹œê°„ <i  id='remain'>"+m+" : "+s+"</i></span>";
	}
	$("#remaindiv").html(remain);
}

	//ë¹„ë°€ë²ˆí˜¸ ì²´í¬
	function password_check()
	{
		//$("#passwordchk").html(' ë¹„ë°€ë²ˆí˜¸ëŠ” 8~15ìžë¦¬ ì´ìƒ ë¬¸ìž, ìˆ«ìž, íŠ¹ìˆ˜ë¬¸ìžë¡œ êµ¬ì„±í•˜ì—¬ì•¼í•©ë‹ˆë‹¤.');
		var pwd=$("input[name=passwordDiv]").val();

		if(checkPasswordPattern(pwd)==true)
		{
			$("#passwordchk").show().html('<span class="error_message">ì‚¬ìš© ê°€ëŠ¥í•©ë‹ˆë‹¤</span> ');
			var pwd2=$("input[name=passwordDiv2]").val();

			if(pwd==pwd2)
			{
				$("#passwordchk2").show().html('<span class="error_message">ì‚¬ìš© ê°€ëŠ¥í•©ë‹ˆë‹¤</span> ');
				$("#passchk").val(1);
			}
			else if(!pwd2)
			{
				$("#passwordchk2").show().html('<span class="error_message red">ë¹„ë°€ë²ˆí˜¸ í™•ì¸ëž€ì„ ìž…ë ¥í•´ ì£¼ì„¸ìš”.</span> ');
				$("#passchk").val(0);
			}
			else
			{
				$("#passwordchk2").show().html('<span class="error_message red">ë¹„ë°€ë²ˆí˜¸ê°€ ì„œë¡œ ë§žì§€ ì•ŠìŠµë‹ˆë‹¤.</span> ');
				$("#passchk").val(0);
			}
			return false;
		}else{
			$("#passwordchk2").show().html('<span class="error_message red">ë¹„ë°€ë²ˆí˜¸ëŠ” 8~15ìžë¦¬ ë¬¸ìž, ìˆ«ìž, íŠ¹ìˆ˜ë¬¸ìžë¡œ êµ¬ì„±í•˜ì—¬ì•¼í•©ë‹ˆë‹¤.</span> ');
			$("#passchk").val(0);
		}
	}

	//========================
	/// ì•½ìž¬ê²€ìƒ‰, ê°œì¸ë°©ì œ, ì´ì „ì²˜ë°©, ë°©ì œì‚¬ì „ searchtxtë¥¼ ì´ìš©í•˜ì—¬ ê²€ìƒ‰ 
	function searchrecipe(page)
	{
		if(isEmpty(page))
		{
			page=1;
		}
		var type="";
		$(".recipe .active").each(function(){
			type=$(this).attr("id");
		});


		switch(type)
		{
		case "remedicine"://ì•½ìž¬ê²€ìƒ‰ - ì•½ìž¬ëª…, ì´ëª…
			callrecipe("medicine", page);
			break;
		case "redoctor"://ê°œì¸ë°©ì œ  - ì²˜ë°©ëª… 
			callrecipe("doctor", page);
			break;
		case "reuser"://ì´ì „ì²˜ë°© - ì²˜ë°©ëª…, í™˜ìžëª…
			callrecipe("user", page);
			break;
		case "rebook"://ë°©ì œì‚¬ì „ - ì²˜ë°©ëª…ìœ¼ë¡œ ê²€ìƒ‰
			callrecipe("book", page);
			break;
		case "recom"://ì¶”ì²œì²˜ë°© 
			callrecipe("recom", page);
			break;
		case "chartta"://ìžë³´ì²˜ë°©
			callrecipe("chartta", page);
			break;
		}
	}
///
	///ì•½ìž¬ê²€ìƒ‰,ê°œì¸ë°©ì œ, ì´ì „ì²˜ë°©, ë°©ì œì‚¬ì „
	function callrecipe(code, page)
	{
		//console.log(code);
		if(code!="user" && code!="userinit"){
			$("#recipeselDiv .sel").remove();
		}
		if(isEmpty(page))
		{
			page=1;
		}
		$("#remedicine").removeClass("active");
		$("#redoctor").removeClass("active");
		$("#reuser").removeClass("active");
		$("#rebook").removeClass("active");
		$("#recom").removeClass("active");

		$("#medicinesel").hide();
		$("#doctorsel").hide();
		$("#usersel").hide();
		$("#booksel").hide();

		var search="";
		switch(code)
		{
			case "medicineinit"://ì•½ìž¬ê²€ìƒ‰ í´ë¦­ì‹œ
				$('#ck0').prop('checked', true);
				$("input[name=searchTxt]").val("");
				$("input[name=searchConsonantTxt]").val("");
			case "medicine"://ì•½ìž¬ê²€ìƒ‰
				var searchTxt=$("input[name=searchTxt]").val();
				var searchType=$("select[name=medicinesel]").val();
				var searchConsonantTxt=$("input[name=searchConsonantTxt]").val();
				$("#remedicine").addClass("active");
				$("#medicinesel").show();
				search="&page="+page+"&searchType="+searchType+"&searchTxt="+searchTxt+"&searchConsonantTxt="+searchConsonantTxt;
				callapi("GET","recipe",getdata("medicinelist")+search);
				$("input[name=searchTxt]").val(searchTxt);
				break;
			case "doctorinit"://ê°œì¸ë°©ì œ í´ë¦­ì‹œ
				$('#ck0').prop('checked', true);
				$("input[name=searchTxt]").val("");
				$("input[name=searchConsonantTxt]").val("");
			case "doctor"://ê°œì¸ë°©ì œ
				var searchTxt=$("input[name=searchTxt]").val();
				var searchType=$("select[name=doctorsel]").val();
				var searchConsonantTxt=$("input[name=searchConsonantTxt]").val();
				$("#redoctor").addClass("active");
				$("#doctorsel").show();
				search="&page="+page+"&searchType="+searchType+"&searchTxt="+searchTxt+"&searchConsonantTxt="+searchConsonantTxt;
				callapi("GET","recipe",getdata("recipedoctorlist")+search);
				break;
			case "userinit"://ì´ì „ì²˜ë°© í´ë¦­ì‹œ
			case "userorderinit":
				//ë…„ë„ì˜¤í”ˆ
				$("input[name=searchTxt]").before(selyears("order"));
				$('#ck0').prop('checked', true);
				$("input[name=searchTxt]").val("");
				$("input[name=searchConsonantTxt]").val("");
				if(code=="userorderinit")
				{
					$(".searorder").val(page);
					page=1;
				}
			case "user"://ì´ì „ì²˜ë°©
				var searchTxt=$("input[name=searchTxt]").val();
				var searchType="title";//$("select[name=usersel]").val();
				var searchConsonantTxt=$("input[name=searchConsonantTxt]").val();
				$("#reuser").addClass("active");
				$("#usersel").show();
				search="&page="+page+"&searchType="+searchType+"&searchTxt="+searchTxt+"&searchConsonantTxt="+searchConsonantTxt;
				callapi("GET","recipe",getdata("recipeuserlist")+search);
				break;
			case "bookinit"://ë°©ì œì‚¬ì „ í´ë¦­ì‹œ
				$('#ck0').prop('checked', true);
				$("input[name=searchTxt]").val("");
				$("input[name=searchConsonantTxt]").val("");
			case "book"://ë°©ì œì‚¬ì „
				var searchTxt=$("input[name=searchTxt]").val();
				var searchType=$("select[name=booksel]").val();
				var searchConsonantTxt=$("input[name=searchConsonantTxt]").val();
				$("#rebook").addClass("active");
				$("#booksel").show();

				switch(searchType)
				{
					case "title":
						search="&page="+page+"&searchType="+searchType+"&searchTxt="+searchTxt+"&searchConsonantTxt="+searchConsonantTxt;
						break;
					case "sourcetit":
						search="&page="+page+"&searchType="+searchType+"&searchTxt="+searchTxt+"&searchConsonantTxt="+searchConsonantTxt;
						break;
				}
				callapi("GET","recipe",getdata("uniquesclist")+search);
				break;
			case "recominit":
				$('#ck0').prop('checked', true);
				$("input[name=searchTxt]").val("");
				$("input[name=searchConsonantTxt]").val("");
			case "recom":
				var searchTxt=$("input[name=searchTxt]").val();
				var searchType="title";//$("select[name=recomsel]").val();
				var searchConsonantTxt=$("input[name=searchConsonantTxt]").val();
				$("#recom").addClass("active");
				//$("#recomsel").show();
				search="&page="+page+"&searchType="+searchType+"&searchTxt="+searchTxt+"&searchConsonantTxt="+searchConsonantTxt;
				callapi("GET","recipe",getdata("recomlist")+search);
				break;
			case "charttainit":
				$('#ck0').prop('checked', true);
				$("input[name=searchTxt]").val("");
				$("input[name=searchConsonantTxt]").val("");
			case "chartta":
				var searchTxt=$("input[name=searchTxt]").val();
				var searchType="title";
				search="&page="+page+"&searchType="+searchType+"&searchTxt="+searchTxt;
				callapi("GET","recipe",getdata("recipetalist")+search);
				break;
		}
	}
	function delmakercfcode()
	{
		var ck_cfcode=getCookie("mck_cfcode");
		if(ck_cfcode=="hs" || ck_cfcode=="hp" || ck_cfcode=="on")
		{
			return true;
		}
		return false;
	}
	//ì•½ìž¬ê²€ìƒ‰í™”ë©´
	function viewrecipemedicine(obj)
	{
		var ck_cfcode=getCookie("mck_cfcode");

		var makertitle = "";
		var makercol   = "";
		var makertotcol= 4;
		//ì•ˆì‹¬ í•œí“¨ì–´ ì œì¡°ì‚¬ì œê±°
		if(delmakercfcode()==false){
			makercol   = "<col width='80'>";
			makertitle = "<th style='text-align:right;'>ì œì¡°ì‚¬</th>";
			makertotcol = 5;
		}

		var txt="";
		txt+="<table class='tbMediSearch'>";
		txt+="	<colgroup><col><col width='70'>"+makercol+"<col width='70'><col width='40'></colgroup>";
		txt+="	<thead>";
		//txt+="	<tr><th class='text-left'>ì•½ìž¬ëª…</th><th class='text-left'>ì›ì‚°ì§€</th><th class='text-left'>ì œì¡°ì‚¬</th><th class='text-right'>ê°€ê²©(g)</th></tr>";
		txt+="	<tr><th class='text-left'>ì•½ìž¬ëª…</th><th style='text-align:right;'>ì›ì‚°ì§€</th>"+makertitle+"<th class='text-right'>ê°€ê²©(g)</th><th class=''></th></tr>";
		txt+="	</thead>";
		txt+="	<tbody>";
		txt+="	<tr><td colspan='"+makertotcol+"' style='text-align:left;'>ì´ <span class='mint'>" + commasFixed(obj["tcnt"]) + "</span> ê±´</td></tr>";
		if(!isEmpty(obj) && !isEmpty(obj["list"]))
		{
			$.each(obj["list"] ,function(index, val){
				if(chkAuthority("recipe")=="pos")
				{
					var mdprice=val["mdPrice"];
				}
				else
				{
					var mdprice="-";
				}
				var mdType=val["mdType"];
				var mdTypetxt="";
				if(mdType=="sweet" || mdType=="alcohol")
				{
					mdTypetxt="(ë³„)";
				}
				txt+="<tr>";
				txt+="	<td class='text-left'><a href=\"javascript:setMedicine('"+val["seq"]+"');\">"+mdTypetxt+" "+val["mmTitle"]+"</a></td>";
				txt+="	<td class='text-right' style='text-align:center;'>"+val["mdOrigin"]+"</td>";
				if(delmakercfcode()==false){
					var mdMaker = val["mdMaker"].replace("(ë¹„ê·œê²©)", "").replace("ì˜ë†ì¡°í•©", "").replace("(ì£¼)", "").replace("[ì£¼]", "").replace("(ë†)", "").replace(/ /gi, "");
					txt+="	<td class='text-right'>"+mdMaker+"</td>";
				}
				txt+="	<td class='text-right'>"+mdprice+"</td>";
				var ico="";
				if(!isEmpty(val["herbinfo"])){
					ico="<img src='/assets/images/inew_personalcontrol.png' onclick=\"popherb('"+val["seq"]+"','"+val["herbinfo"]+"');\">";
				}
				txt+="<td class='ico'>"+ico+"</td>";
				txt+="</tr> ";
			});
		}
		else
		{
			txt+="	<tr>" +
				"<td colspan='"+makertotcol+"'>ë°ì´í„°ê°€ ì—†ìŠµë‹ˆë‹¤.</td>" +
				"</tr>";
		}
		txt+="	</tbody>";
		txt+="</table>";
		txt+="<div class='pagination small2 mb-4' id='recipepapg'></div>";
		return txt;

	}
	//ê°œì¸ë°©ì œ í™”ë©´
	function viewrecipedoctor(obj)
	{
		var txt="";

		txt+="<table>";
		txt+="	<colgroup><col width='60'><col><col width='50'><col width='50'></colgroup>";
		txt+="	<thead>";
		txt+="	<tr><th class='text-left'>í•œì˜ì‚¬ëª…</th><th class='text-left'>ì²˜ë°©ëª…</th><th class='text-right'>ì•½ë¯¸</th><th class='text-right'></th></tr>";
		txt+="	</thead>";
		txt+="	<tbody>";
		txt+="	<tr><td colspan='4' style='text-align:left;'>ì´ <span class='mint'>" + commasFixed(obj["tcnt"]) + "</span> ê±´</td></tr>";
		if(!isEmpty(obj) && !isEmpty(obj["list"]))
		{
			$.each(obj["list"] ,function(index, val){
				txt+="<tr style='cursor:pointer;'>";
				txt+="<td class='text-left'>"+val["doctorname"]+"</td>";
				txt+="<td class='text-left'><a href=\"javascript:calldoctordesc('"+val["seq"]+"','"+encodeURI(val["rcTitle"])+"')\">"+val["rcTitle"]+"</a></td>";
				txt+="<td class='text-right'>"+val["medicnt"]+"</td>";
				txt+="<td class='ico'><img src='/assets/images/inew_personalcontrol.png' onclick=\"poprecipe('doctor',"+val["seq"]+");\"></td>";
				txt+="</tr>";
			});
		}
		else
		{
			txt+="<tr><td colspan='4'>ë°ì´í„°ê°€ ì—†ìŠµë‹ˆë‹¤.</td></tr>";
		}

		txt+="</table>";
		txt+="<div class='pagination small2 mb-4' id='recipepapg'></div>";
		return txt;
	}
	//ì´ì „ì²˜ë°©í™”ë©´
	function viewrecipeuser(obj)
	{
		//console.log("viewrecipeuserviewrecipeuserviewrecipeuserviewrecipeuser");
		var txt="";
		txt+="<table>";
		txt+="	<colgroup><col width='70'><col width='60'><col><col width='50'><col width='60'><col width='50'></colgroup>";
		txt+="	<thead>";
		txt+="	<tr><th class='text-center'>ì²˜ë°©ì¼</th><th class='text-center'>í™˜ìžëª…</th><th class='text-left'>ì²˜ë°©ëª…</th><th  class='text-center'>ì²©/íŒ©</th><th class='text-center'>ì²˜ë°©ì˜</th><th></th></tr>";
		txt+="	</thead>";
		txt+="	<tbody>";
		txt+="	<tr><td colspan='6' style='text-align:left;'>ì´ <span class='mint'>" + commasFixed(obj["tcnt"]) + "</span> ê±´</td></tr>";
		if(!isEmpty(obj) && !isEmpty(obj["list"]))
		{
			$.each(obj["list"] ,function(index, val){
				txt+="<tr style='cursor:pointer;'>";
				txt+="<td class='text-center'>"+val["orderdate"].substring(2,10)+"</td>";
				txt+="<td class='text-center'>"+val["patientname"]+"</td>";
				txt+="<td class='text-left txt_line'><a href=\"javascript:callorderdesc('"+val["seq"]+"','"+encodeURI(val["ordertitle"])+"','pre')\">"+val["ordertitle"]+"</a></td>";
				txt+="<td class='text-center'>"+val["chubcnt"]+"/"+val["packcnt"]+"</td>";
				txt+="<td class='text-center'>"+val["doctorname"].substring(0,5)+"</td>";
				txt+="<td class='ico'><img src='/assets/images/inew_personalcontrol.png' onclick=\"poprecipe('user',"+val["rcseq"]+");\"></td>";
				txt+="</tr>";
			});
		}
		else
		{
			txt+="<tr><td colspan='6'>ë°ì´í„°ê°€ ì—†ìŠµë‹ˆë‹¤.</td></tr>";
		}

		txt+="</table>";
		txt+="<div class='pagination small2 mb-4' id='recipepapg'></div>";
		return txt;
	}
	//ë°©ì œì‚¬ì „
	function viewrecipebook(obj)
	{
		var txt="";
		txt+="<table>";
		txt+="	<colgroup><col width='140'><col><col width='60'></colgroup>";
		txt+="	<thead>";
		txt+="	<tr><th>ì¶œì „</th><th>ë°©ì œëª…</th><th>ì•½ë¯¸</th></tr>";
		txt+="	</thead>";
		txt+="	<tbody>";
		txt+="	<tr><td colspan='3' style='text-align:left;'>ì´ <span class='mint'>" + commasFixed(obj["tcnt"]) + "</span> ê±´</td></tr>";
		if(!isEmpty(obj) && !isEmpty(obj["list"]))
		{
			$.each(obj["list"] ,function(index, val){
				txt+="<tr style='cursor:pointer;'>";
				txt+="<td>"+val["rcSourcetit"]+"</td>";
				txt+="<td class='txt_line'>"+val["rcTitle"]+"</td>";
				txt+="<td>"+val["medicinecnt"]+"</td>";
				txt+="</tr>";
			});
		}
		else
		{
			txt+="<tr><td colspan='3'>ë°ì´í„°ê°€ ì—†ìŠµë‹ˆë‹¤.</td></tr>";
		}

		txt+="</table>";
		txt+="<div class='pagination small2 mb-4' id='recipepapg'></div>";
		return txt;
	}
	//ì¶”ì²œì²˜ë°©
	function viewreciperecom(obj)
	{
		var txt="";
		
		var colHtml   = ""; var colCnt    = 3; var titleHtml = ""; var dataHtml  = "";
		if(getCookie("mck_cfcode") == "cy"){
			colHtml   = "<col width='120'>";
			colCnt    = 4;
			titleHtml = "<th class='text-center'>ì¶œì²˜</th>";
		}		

		txt+="<table>";
		txt+="	<colgroup><col>"+colHtml+"<col width='40'><col width='50'></colgroup>";
		txt+="	<thead>";
		txt+="	<tr><th class='text-left'>ì²˜ë°©ëª…</th>"+titleHtml+"<th class='text-right'>ì•½ë¯¸</th><th></th></tr>";
		txt+="	</thead>";
		txt+="	<tbody>";
		txt+="	<tr><td colspan='"+colCnt+"' style='text-align:left;'>ì´ <span class='mint'>" + commasFixed(obj["tcnt"]) + "</span> ê±´</td></tr>";
		if(!isEmpty(obj) && !isEmpty(obj["list"]))
		{
			$.each(obj["list"] ,function(index, val){
				txt+="<tr style='cursor:pointer;'>";
				txt+="<td class='text-left txt_line'><a href=\"javascript:callrecomdesc('"+val["seq"]+"','"+encodeURI(val["rcTitle"])+"')\">"+val["rcTitle"]+"</a></td>";
				if(getCookie("mck_cfcode") == "cy"){
					txt+="<td class='text-left' style='padding:7px 3px;'>"+val["rbTitle"]+"</td>";
				}
				txt+="<td class='text-right'>"+val["rcMediCnt"]+"</td>";
				txt+="<td class='ico'><img src='/assets/images/inew_personalcontrol.png' onclick=\"poprecipe('recom',"+val["seq"]+");\"></td>";
				txt+="</tr>";
			});
		}
		else
		{
			txt+="<tr><td colspan='"+colCnt+"'>ë°ì´í„°ê°€ ì—†ìŠµë‹ˆë‹¤.</td></tr>";
		}

		txt+="</table>";
		txt+="<div class='pagination small2 mb-4' id='recipepapg'></div>";
		return txt;
	}

	function poprecipe(type, seq){
		callapi("GET","recipe",getdata("poprecipe")+"&type="+type+"&seq="+seq);
	}

	function popherb(seq,code){
		callapi("GET","medihub",getdata("popherb")+"&seq="+seq+"&medicode="+code);
	}
	//ìžë³´ì²˜ë°© 
	function viewrecipeta(obj)
	{
		var txt="";
		txt+="<table>";
		txt+="	<colgroup><col width=''><col width='50'><col width='50'></colgroup>";
		txt+="	<thead>";
		txt+="	<tr><th class='text-left'>ì²˜ë°©ëª…</th><th class='text-right'>ì•½ë¯¸</th><th class='text-right'></th></tr>";
		txt+="	</thead>";
		txt+="	<tbody>";
		txt+="	<tr><td colspan='3' style='text-align:left;'>ì´ <span class='mint'>" + commasFixed(obj["tcnt"]) + "</span> ê±´</td></tr>";
		if(!isEmpty(obj) && !isEmpty(obj["list"]))
		{
			$.each(obj["list"] ,function(index, val){
				txt+="<tr style='cursor:pointer;'>";
				txt+="<td class='text-left'><a href=\"javascript:callrecipetadesc('"+val["seq"]+"','"+val["productcode"]+"','"+encodeURI(val["rcTitle"])+"')\">"+val["rcTitle"]+"</a></td>";
				txt+="<td class='text-right'>"+val["medicnt"]+"</td>";
				txt+="<td class='ico'><img src='/assets/images/inew_personalcontrol.png' onclick=\"poprecipe('recipeta',"+val["seq"]+");\"></td>";
				txt+="</tr>";
			});
		}
		else
		{
			txt+="<tr><td colspan='3'>ë°ì´í„°ê°€ ì—†ìŠµë‹ˆë‹¤.</td></tr>";
		}

		txt+="</table>";
		txt+="<div class='pagination small2 mb-4' id='recipepapg'></div>";
		return txt;
	}

	///ì•½ìž¬ê²€ìƒ‰, ê°œì¸ë°©ì œ, ì´ì „ì²˜ë°©, ë°©ì œì‚¬ì „
	function viewrecipe(type,obj)
	{
		var txt="";
		switch(type)
		{
			case "medicine"://ì•½ìž¬ê²€ìƒ‰ - ì•½ìž¬ëª…, ì´ëª…
				txt=viewrecipemedicine(obj);
				break;
			case "doctor"://ê°œì¸ë°©ì œ  - ì²˜ë°©ëª…
				txt=viewrecipedoctor(obj);
				break;
			case "user"://ì´ì „ì²˜ë°© - ì²˜ë°©ëª…, í™˜ìžëª…
				txt=viewrecipeuser(obj);
				break;
			case "book"://ë°©ì œì‚¬ì „ - ì²˜ë°©ëª…ìœ¼ë¡œ ê²€ìƒ‰
				txt=viewrecipebook(obj);
				break;
			case "recom"://ì¶”ì²œì²˜ë°©
				txt=viewreciperecom(obj);
				break;
			case "ck1":// ã„±
				txt=viewrecipemedicine(obj);
				break;
			case "reta"://ìžë³´ì²˜ë°© 
				txt=viewrecipeta(obj);
				break;
		}
		$("#recipeDiv").html(txt);
		spaging("recipepapg",obj["tpage"], obj["page"], obj["block"], obj["psize"]);


		if(!isEmpty(obj["selectyears"]))
		{
			$(".searorder").val(obj["selectyears"]);
		}
	}
	function resetmeditbldata(title)
	{
		var no=$("#meditbl tbody tr").length;
		if(parseInt(no)>0)
		{
			if(confirm("ì²˜ë°©ì„ í•©ë°©í•˜ì‹œê² ìŠµë‹ˆê¹Œ?"))
			{
				var beforetitle=$("input[name=odTitle]").val();
				$("input[name=odTitle]").val(beforetitle+" "+title);
			}
			else
			{
				$("#meditbl tbody").html("");
				$("input[name=odTitle]").val(title);

				//ë‹¹ë„
				$("#sugarbrix option:eq(0)").prop("selected", true);
				//í–¥ê¸°
				$("#flavor option:eq(0)").prop("selected", true);
				//ë‹¹ë„ì„ íƒ
				$("#sugarkinds option:eq(0)").prop("selected", true);
				//í–¥ê¸°ì„ íƒ
				$("#flavorkinds option:eq(0)").prop("selected", true);
				//ìží•˜ê±°
				$("#zahager option:eq(0)").prop("selected", true);
				//ë…¹ìš©í‹´í¬ 
				$("#velvet option:eq(0)").prop("selected", true);
			}

			changeadvice();
		}
		else
		{
			$("#meditbl tbody").html("");
			$("input[name=odTitle]").val(title);
		}
		//console.log("resetmeditbldata   changeadvicedata");
		changeadvicedata();

	}
	function resetmeditblalldata(title)
	{
		var no=$("#meditbl tbody tr").length;
		if(parseInt(no)>0)
		{
			if(confirm("ì²˜ë°©ì„ í•©ë°©í•˜ì‹œê² ìŠµë‹ˆê¹Œ?"))
			{
				var beforetitle=$("input[name=odTitle]").val();
				$("input[name=odTitle]").val(beforetitle+" "+title);
			}
			else
			{
				$("#meditbl tbody").html("");
				$("input[name=odTitle]").val(title);

				//ë‹¹ë„
				$("#sugarbrix option:eq(0)").prop("selected", true);
				//í–¥ê¸°
				$("#flavor option:eq(0)").prop("selected", true);
				//ë‹¹ë„ì„ íƒ
				$("#sugarkinds option:eq(0)").prop("selected", true);
				//í–¥ê¸°ì„ íƒ
				$("#flavorkinds option:eq(0)").prop("selected", true);
				//ìží•˜ê±°
				$("#zahager option:eq(0)").prop("selected", true);
				//ë…¹ìš©í‹´í¬ 
				$("#velvet option:eq(0)").prop("selected", true);
			}

			changeadvice();
		}
		else
		{
			$("#meditbl tbody").html("");
			$("input[name=odTitle]").val(title);
		}

	}
	//í™˜ìž ì²˜ë°©ë‚´ì—­ì—ì„œ í´ë¦­ì‹œ, ì´ì „ì²˜ë°©ì—ì„œ ì²˜ë°©í´ë¦­ì‹œ ---> ì•½ìž¬ê°€ê²©ì„ ë‹¤ì‹œ ìž¬ì •ì˜í•´ì•¼í•¨
	function viewpreviousorderdesc(obj)
	{
		if(obj["calltype"]=="all")
		{
			$("input[name=previousorder]").val("Y");
			$("input[name=previouspack]").val(obj["packCnt"]);
		}

		var ordertypecode=!isEmpty(obj["ordertypecode"])?obj["ordertypecode"]:"decoction";

		//ì²©ìˆ˜
		if(!isEmpty(obj["chubCnt"]))
		{
			$("select[name=chubCnt]").val(obj["chubCnt"]);
		}

		//íŒ©ìˆ˜
		if(!isEmpty(obj["packCnt"]))
		{
			$("select[name=packCnt]").val(obj["packCnt"]);
		}
		
		//íŒ©ìš©ëŸ‰
		if(!isEmpty(obj["packCapa"]))
		{
			$("select[name=packCapa]").val(obj["packCapa"]);
		}
		
		//íƒ•ì „ë²• 
		if(!isEmpty(obj["specialDecoc"]))
		{
			$("select[name=specialDecoc]").val(obj["specialDecoc"]);
		}
		//íƒ•ì „ë°©ì‹ 
		if(!isEmpty(obj["dcTitle"]))
		{
			$("select[name=dcTitle]").val(obj["dcTitle"]);
		}
		//íƒ•ì „ì‹œê°„ 
		if(!isEmpty(obj["dcTime"]))
		{
			$("select[name=dcTime]").val(obj["dcTime"]);
			var seldctime=$("select[name=dcTime]").val();
			if(isEmpty(seldctime))
			{
				$("#dcTime option:eq(0)").prop("selected", true);
			}
		}

		//ì²˜ë°©ëª… 
		var orderTitle=!isEmpty(obj["orderTitle"])?obj["orderTitle"]:"";
		$("input[name=odTitle]").val(orderTitle);

		if(!isEmpty(obj["herbalpacking"]))
		{
			$("#selherbalpacking option[value="+obj["herbalpacking"]+"]").attr("selected", "selected");
		}
		//DOO::ì‚°ì œë¶„ë§ë„ - 20220613
		if(!isEmpty(obj["pillFineness"]))
		{
			$("#pFinenessDiv option[value="+obj["pillFineness"]+"]").attr("selected", "selected");
		}

		//DOO::ì œí˜• - 20220718
		if(!isEmpty(obj["dcShape"]))
		{
			$("#pillShapeDiv option[value="+obj["dcShape"]+"]").attr("selected", "selected");
		}

		//DOO::ê²°í•©ì œ - 20220718
		if(!isEmpty(obj["dcBinders"]))
		{
			$("#pillBindersDiv option[value="+obj["dcBinders"]+"]").attr("selected", "selected");
		}

		//ì—°ì¡°ì œìŠ¤í‹± 
		if(!isEmpty(obj["ointmentsStick"]))
		{
			$("#ointmentsStick option[value="+obj["ointmentsStick"]+"]").attr("selected", "selected");
		}

		//DOO::ë¹„ìœ¨ì„ íƒ - 20220722
		if(!isEmpty(obj["ointmentsRatio"]))
		{
			$("#ointmentsRatioDiv option[value="+obj["ointmentsRatio"]+"]").attr("selected", "selected");
		}

		//DOO::ì—°ì¡°ì œìˆ˜ëŸ‰ - 20220722
		if(!isEmpty(obj["ointmentsQuantity"]))
		{
			$("#ointmentsQuantityDiv option[value="+obj["ointmentsQuantity"]+"]").attr("selected", "selected");
		}

		//DOO::ë¶€í˜•ì œë¹„ìœ¨ - 20220722
		if(!isEmpty(obj["excipientRatio"]))
		{
			$("#excipientRatioDiv option[value="+obj["excipientRatio"]+"]").attr("selected", "selected");
		}

		//DOO::ë¶€í˜•ì œì¢…ë¥˜ - 20220722
		if(!isEmpty(obj["excipientKind"]))
		{
			$("#excipientKindDiv option[value="+obj["excipientKind"]+"]").attr("selected", "selected");
		}

		//ì—°ì¡°ì œíƒ•ì „ë²• 
		if(!isEmpty(obj["ointmentsSpecial"]))
		{
			$("#ointmentsspecialDecoc option[value="+obj["ointmentsSpecial"]+"]").attr("selected", "selected");
		}
		
		if(ordertypecode!="decoction")
		{
			changemilling();
		}


		$("#beforememo").text(obj["cautionadvice"]);
		$("input[name=cfDecocwater]").val(obj["cfDecocwater"]);

		//ë²•ì œ 
		if(!isEmpty(obj["rcMedioper"]))
		{
			$("textarea[name=rcMedioper]").val(JSON.stringify(obj["rcMedioper"]));
		}
			

		//ì²˜ë°©ì•½ìž¬ë¦¬ìŠ¤íŠ¸
		if(!isEmpty(ordertypecode) && ordertypecode=="NHIS")
		{
			$("input[name=productcode]").val(obj["productCode"]);

			//ì²©ì•½ì§ˆë³‘ë¶„ë¥˜ê¸°í˜¸ 
			if(!isEmpty(obj["mediname"])){var mediname=obj["mediname"];}else{var mediname=""};
			$("textarea[name=nhismedinamejson]").val(JSON.stringify(obj["NHISkcd8"]));//ì²©ì•½ì§ˆë³‘ë¶„ë¥˜ê¸°í˜¸ 

			//ì§ˆë³‘ë¶„ë¥˜ê¸°í˜¸
			var category=JSON.parse($("textarea[name=nhismedinamejson]").val());
			var nhismediname="";
			$(category[obj["gd_category"]]).each(function(idx, val){
				nhismediname+="<option value='"+val["code"]+"|"+val["detail"]+"'>["+val["code"]+"] "+val["detail"];
			});
			$("#selnhismediname").html(nhismediname);
			selnhisrecipe('nhismediname');

			//ì²©ì•½ìƒí•œê¸ˆì•¡
			$("textarea[name=NHISUlPrice]").val(JSON.stringify(obj["NHISUlPrice"]));
			$("input[name=npCategory]").val(obj["gd_category"]);
			$("input[name=npType]").val(obj["gd_type"]);

			//ì§ˆë³‘ë¶„ë¥˜ê¸°í˜¸ 
			if(!isEmpty(obj["mediname"]))
			{
				$("select[name=selnhismediname]").val(obj["mediname"]);//ì²©ì•½ìš©ë²• 
				var seloption=$("select[name=selnhismediname]").val();
				if(isEmpty(seloption))
				{
					$("#selnhismediname option:eq(0)").prop("selected", true);
					$("input[name=nhismediname]").val($("select[name=selnhismediname]").val());//ì²©ì•½ìš©ë²• 
				}
				else
				{
					$("input[name=nhismediname]").val(obj["mediname"]);//ì²©ì•½ìš©ë²• 
				}
			}
			else
			{
				$("#selnhismediname option:eq(0)").prop("selected", true);
				$("input[name=nhismediname]").val($("select[name=selnhismediname]").val()); 
			}
			//ì²©ì•½ìš©ë²• 
			if(!isEmpty(obj["mediadvice"]))
			{
				$("select[name=selnhismediadvice]").val(obj["mediadvice"]);//ì²©ì•½ìš©ë²• 
				var seloption=$("select[name=selnhismediadvice]").val();
				if(isEmpty(seloption))
				{
					$("#selnhismediadvice option:eq(0)").prop("selected", true);
					$("input[name=nhismediadvice]").val($("select[name=selnhismediadvice]").val());//ì²©ì•½ìš©ë²• 
				}
				else
				{
					$("input[name=nhismediadvice]").val(obj["mediadvice"]);//ì²©ì•½ìš©ë²• 
				}
			}
			else
			{
				$("#selnhismediadvice option:eq(0)").prop("selected", true);
				$("input[name=nhismediadvice]").val($("select[name=selnhismediadvice]").val());//ì²©ì•½ìš©ë²• 
			}
			$("select[name=nhismedidays]").val(obj["medidays"]);//ì²©ì•½1ì¼ë³µìš©íŒ©ìˆ˜ 

			selnhisrecipe('nhismedidays');

			if(!isEmpty(obj["rcNHISmedi"]))
			{
				$("textarea[name=rcNHISmedi]").val(obj["rcNHISmedi"]);
				setNHISmedicinejson();
			}
			$("#meditbl tbody").html("");
			if(!isEmpty(obj["medicinelist"]))
			{
				$.each(obj["medicinelist"],function(idx, val){
					addmediNHIStbl(val, obj["makerlist"]);
				});
			}
		}
		else
		{
			//console.log("calltype = " + obj["calltype"]);
			//ì²˜ë°©ì•½ìž¬ë¦¬ìŠ¤íŠ¸
			if(obj["calltype"]=="all")
			{
				resetmeditblalldata(obj["orderTitle"]);
			}
			else
			{
				resetmeditbldata(obj["orderTitle"]);
			}
			var data=[];
			var rc_medicine="";
			if(!isEmpty(obj["totalMedicine"]))
			{
				$.each(obj["totalMedicine"],function(idx, val){
					data["mdCode"]=val["mediCode"];
					data["mediHerb"]=val["mediHerb"];
					data["mdType"]="medicine";
					data["mediType"]=val["mediType"];
					data["mdTitle"]=val["mediName"];
					data["mdOrigin"]=val["mediOriginTxt"];
					data["mdMaker"]=val["mediMakerTxt"];
					data["mdPrice"]=val["mediAmount"];
					data["mediCapa"]=val["mediCapa"];
					data["mediWater"]=val["mediWater"];
					data["mediOper"]=val["mediOper"];
					data["mmUse"]=val["mmUse"];
					data["mediMaker"]=val["mediMaker"];
					data["mmIsZero"]=val["mmIsZero"];
					data["mmUnit"]=val["mmUnit"];
					data["mediselcapa"]=val["mediselcapa"];
					data["sublist"]=val["sublist"];

					if(val["mmUse"]=="Y")
					{
						if(!isEmpty(val["sublist"]) && val["sublist"].length>1)
						{
							data["mdCode"]=val["sublist"][0]["mediCode"];
							data["mediHerb"]=val["sublist"][0]["mediHerb"];
							data["mdType"]="medicine";
							data["mediType"]=val["sublist"][0]["mediType"];
							data["mdTitle"]=val["sublist"][0]["mediName"];
							data["mdOrigin"]=val["sublist"][0]["mediOriginTxt"];
							data["mdMaker"]=val["sublist"][0]["mediMakerTxt"];
							data["mdPrice"]=val["sublist"][0]["mediAmount"];
							data["mediCapa"]=val["sublist"][0]["mediCapa"];
							data["mediWater"]=val["sublist"][0]["mediWater"];
							data["mediOper"]=val["sublist"][0]["mediOper"];
							data["mmUse"]=val["sublist"][0]["mmUse"];
							data["mediMaker"]=val["sublist"][0]["mediMaker"];
							data["mmIsZero"]=val["sublist"][0]["mmIsZero"];
							data["mmUnit"]=val["sublist"][0]["mmUnit"];
							data["mediselcapa"]=val["sublist"][0]["mediselcapa"];
							data["sublist"]=val["sublist"];

							rc_medicine+="|"+val["sublist"][0]["mediCode"];
							addmeditbl(data);
						}
						else
						{
							rc_medicine+="|"+val["mediCode"];
							addmeditbl(data);
						}
					}
					else
					{				
						
						if(!isEmpty(val["sublist"]) && val["sublist"].length>0)
						{
							data["mdCode"]=val["sublist"][0]["mediCode"];
							data["mediHerb"]=val["sublist"][0]["mediHerb"];
							data["mdType"]="medicine";
							data["mediType"]=val["sublist"][0]["mediType"];
							data["mdTitle"]=val["sublist"][0]["mediName"];
							data["mdOrigin"]=val["sublist"][0]["mediOriginTxt"];
							data["mdMaker"]=val["sublist"][0]["mediMakerTxt"];
							data["mdPrice"]=val["sublist"][0]["mediAmount"];
							data["mediCapa"]=val["sublist"][0]["mediCapa"];
							data["mediWater"]=val["sublist"][0]["mediWater"];
							data["mediOper"]=val["sublist"][0]["mediOper"];
							data["mmUse"]=val["sublist"][0]["mmUse"];
							data["mediMaker"]=val["sublist"][0]["mediMaker"];
							data["mmIsZero"]=val["sublist"][0]["mmIsZero"];
							data["mmUnit"]=val["sublist"][0]["mmUnit"];
							data["mediselcapa"]=val["sublist"][0]["mediselcapa"];
							data["sublist"]=val["sublist"];

							rc_medicine+="|"+val["sublist"][0]["mediCode"];
							addmeditbl(data);
						}
						else
						{
							rc_medicine+="|"+val["mediCode"];
							addmeditbl(data);
						}
					}


				});
			}
		}

		if(!isEmpty(obj["sweetMedi"]))
		{
			$.each(obj["sweetMedi"],function(idx, val){
				if(val["sweetType"]=="medicine")
				{
					data["mdCode"]=val["sweetCode"];
					data["mediHerb"]=val["mediHerb"];
					data["mdType"]="sweet";
					data["mdTitle"]=val["sweetName"];
					data["mdOrigin"]=val["sweetOriginTxt"];
					data["mdMaker"]="";
					data["mdPrice"]=val["sweetPrice"];
					data["mediCapa"]=val["sweetCapa"];
					data["mediWater"]=val["sweetWater"];
					data["mediOper"]="";
					data["mmUse"]=val["mmUse"];
					data["mediMaker"]=val["mediMaker"];
					data["mmIsZero"]=val["mmIsZero"];
					data["mmUnit"]=val["mmUnit"];
					data["mediselcapa"]=val["mediselcapa"];
					//console.log(data);
					addmeditbl(data);
				}
			});
		}


		//ë‹¹ë„ 
		if(!isEmpty(obj["sugarBrix"]))
		{
			$("#sugarkinds").removeAttr("disabled");
			$("#sugarbrix option[value="+obj["sugarBrix"]+"]").prop("selected",true);
		}
		//í–¥ê¸°
		if(!isEmpty(obj["flavor"]))
		{
			$("#flavorkinds").removeAttr("disabled");
			$("#flavor option[value="+obj["flavor"]+"]").prop("selected", true);
		}
		//ë‹¹ë„ì„ íƒ 
		if(!isEmpty(obj["sugarkinds"]))
		{
			$("#sugarkinds option[value="+obj["sugarkinds"]+"]").prop("selected", true);
		}
		
		//í–¥ê¸°ì„ íƒ 
		if(!isEmpty(obj["flavorkinds"]))
		{
			$("#flavorkinds option[value="+obj["flavorkinds"]+"]").prop("selected",true);
		}
		
		//ìží•˜ê±° 
		if(!isEmpty(obj["zahager"]))
		{
			$("#zahager option[value="+obj["zahager"]+"]").prop("selected", true);
		}
		
		//ë…¹ìš©í‹´í¬ 
		if(!isEmpty(obj["velvet"]))
		{
			$("#velvet option[value="+obj["velvet"]+"]").prop("selected",true);
		}
		
		$("input[name=odmedibox]").val(obj["odmedibox"]);
		//í¬ìž¥ìž¬
		viewpacking(obj["packing"], obj);

		//ë§ˆí‚¹ 
		if(!isEmpty(obj["markType"]))
		{
			$("#odmrdesc option[value="+obj["markType"]+"]").attr("selected", "selected");
			changepacking('marking');
		}
		if(!isEmpty(obj["mrlinetxt1"]))
		{
			$("input[name=mr_linetxt1]").val(obj["mrlinetxt1"]);
		}
		if(!isEmpty(obj["mrlinetxt2"]))
		{
			$("input[name=mr_linetxt2]").val(obj["mrlinetxt2"]);
		}

		//ë°•ìŠ¤ë¼ë²¨ 
		if(!isEmpty(obj["boxlabel"]))
		{
			$("#boxlabel option[value="+obj["boxlabel"]["code"]+"]").prop("selected",true);
		}

		resetCnt();

		if(!isEmpty(rc_medicine))
		{
			callapi("GET","recipe",getdata("componentdesc")+"&medicine="+rc_medicine);
		}

		$("input[name=od_adminmemo]").val("");
		if(obj["calltype"]=="all") //ìž¬ì²˜ë°©
		{
			//ê´€ë¦¬ìžë©”ëª¨ ì¶”ê°€ 
			var od_adminmemo=obj["od_adminmemo"];
			$("input[name=od_adminmemo]").val(od_adminmemo);

			//console.log(obj["newpatientInfo"]);
			///í™˜ìžì •ë³´ 
			$("#patientName").text(obj["newpatientInfo"]["patientName"]);
			$("#patientChartno").text(obj["newpatientInfo"]["patientChartno"]);
			$("#patientMobile").text(obj["newpatientInfo"]["patientMobile"]);

			$("input[name=patientcode]").val(obj["newpatientInfo"]["patientCode"]);
			$("input[name=patientchartno]").val(obj["newpatientInfo"]["patientChartno"]);
			$("input[name=patientname]").val(obj["newpatientInfo"]["patientName"]);
			$("input[name=patientgender]").val(obj["newpatientInfo"]["patientGender"]);
			$("input[name=patientbirth]").val(obj["newpatientInfo"]["patientBirth"]);
			$("input[name=patientphone]").val(obj["newpatientInfo"]["patientPhone"]);
			$("input[name=patientmobile]").val(obj["newpatientInfo"]["patientMobile"]);
			
			$("input[name=patientzipcode]").val(obj["newpatientInfo"]["patientZipcode"]);
			$("input[name=patientaddr]").val(obj["newpatientInfo"]["patientAddr"]);
			$("textarea[name=patientmemo]").val(obj["newpatientInfo"]["patientmemo"]); 
			$("input[name=patientage]").val(obj["newpatientInfo"]["patientAge"]);
			$("input[name=patientgendertxt]").val(obj["newpatientInfo"]["patientGendertxt"]);
			
			if(!isEmpty(obj["newpatientInfo"]["patientAddr"]))
			{
				var addr=obj["newpatientInfo"]["patientAddr"].replace("||"," ");
			}
			else
			{
				var addr="";
			}

			if(!isEmpty(obj["newpatientInfo"]["patientZipcode"]))	
			{
				var addrs="("+obj["newpatientInfo"]["patientZipcode"]+") "+addr;
			}
			else
			{
				var addrs=""+addr;
			}

			$("#patientAddr").text(addrs);
			
			var data=obj["newpatientInfo"]["patientName"]+"( "+obj["newpatientInfo"]["patientGendertxt"]+" / "+obj["newpatientInfo"]["patientAge"]+"ì„¸ ) "+obj["newpatientInfo"]["patientChartno"];
			$("input[name=patientDiv]").val(data);	


			//console.log(obj["newadviceInfo"]);

			//ë³µìš©ë²• 
			if(!isEmpty(obj["newadviceInfo"]["orderAdvice"]))
			{
				$("#advicespandiv").show();
				$("input[name=orderAdviceKey]").val(obj["newadviceInfo"]["orderAdviceKey"]);
				$("#advicesel option[value="+obj["newadviceInfo"]["orderAdviceKey"]+"]").attr("selected", "selected");
				//$("#advicesel option[value="+obj["newadviceInfo"]["orderAdviceKey"]+"]").prop("selected", true);

				$("textarea[name=orderadvicefile]").val(obj["newadviceInfo"]["orderadvicefile"]);
				$("input[name=mdFileIdx]").val(obj["newadviceInfo"]["orderadvicefilekey"]);
				viewadvicefile(obj["newadviceInfo"]["orderadvicefilekey"], obj["newadviceInfo"]["orderadvicefile"], obj["newadviceInfo"]["af_name"]);
				$("textarea[name=orderAdvice]").val(obj["newadviceInfo"]["orderAdvice"]);
				$("#orderAdviceDiv").html(obj["newadviceInfo"]["orderAdvice"]);
				CKEDITOR.instances.editor.setData(obj["newadviceInfo"]["orderAdvice"],function(){CKEDITOR.instances.editor.setData(obj["newadviceInfo"]["orderAdvice"]);});
			}
			else
			{
				if(!isEmpty(obj["newadviceInfo"]["orderadvicefile"]))
				{
					$("textarea[name=orderadvicefile]").val(obj["newadviceInfo"]["orderadvicefile"]);
					$("input[name=mdFileIdx]").val(obj["newadviceInfo"]["orderadvicefilekey"]);
					viewadvicefile(obj["newadviceInfo"]["orderadvicefilekey"], obj["newadviceInfo"]["orderadvicefile"], obj["newadviceInfo"]["af_name"]);
				}
			}



			//ì¡°ì œì§€ì‹œ
			if(!isEmpty(obj["newcommentInfo"]["orderComment"]))
			{
				$("#commentdiv").show();
				$("#commentsel option[value=0]").attr("selected", "selected");
				$("textarea[name=orderComment]").val(obj["newcommentInfo"]["orderComment"]);
			}

			//í’ˆì§ˆë³´ì¦ì„œ
			if(!isEmpty(obj["qualityreport"]))
			{
				$("#qualityreport option[value="+obj["qualityreport"]+"]").attr("selected", "selected");
			}

			//ë°°ì†¡ì •ë³´ 
			$("input[name=reorderseq]").val(obj["seq"]);
		}
		else
		{
			$("input[name=reorderseq]").val("");
		}

	}
	//ê°œì¸ë°©ì œ
	function viewrecipedoctordesc(obj)
	{
		// ê°œì¸ë°©ì œ ë²•ì œ ì •ë³´
		if(!isEmpty(obj["rcMedioper"])){
			$("textarea[name=rcMedioper]").val(JSON.stringify(obj["rcMedioper"]));
		}

		//ì²˜ë°©ì•½ìž¬ë¦¬ìŠ¤íŠ¸
		resetmeditbldata(obj["data"]["rcTitle"]);
		var data=[];
		var rc_medicine="";
		if(!isEmpty(obj["totalMedicine"]))
		{
			$.each(obj["totalMedicine"],function(idx, val){
				data["mdCode"]=val["mediCode"];
				data["mediHerb"]=val["mediHerb"];
				data["mdType"]="medicine";
				data["mediType"]=val["mediType"];
				data["mdTitle"]=val["mediName"];
				data["mdOrigin"]=val["mediOriginTxt"];
				data["mdMaker"]=val["mediMakerTxt"];
				data["mdPrice"]=val["mediAmount"];
				data["mediCapa"]=val["mediCapa"];
				data["mediWater"]=val["mediWater"];
				data["mediOper"]=val["mediOper"];
				data["mmUse"]=val["mmUse"];
				data["mediMaker"]=val["mediMaker"];
				data["mmIsZero"]=val["mmIsZero"];
				data["mmUnit"]=val["mmUnit"];
				data["mediselcapa"]=val["mediselcapa"];
				data["sublist"]=val["sublist"];

				if(val["mmUse"]=="Y")
				{
					if(!isEmpty(val["sublist"]) && val["sublist"].length>1)
					{
						//console.log(val["sublist"]);
						data["mdCode"]=val["sublist"][0]["mediCode"];
						data["mediHerb"]=val["sublist"][0]["mediHerb"];
						data["mdType"]="medicine";
						data["mediType"]=val["sublist"][0]["mediType"];
						data["mdTitle"]=val["sublist"][0]["mediName"];
						data["mdOrigin"]=val["sublist"][0]["mediOriginTxt"];
						data["mdMaker"]=val["sublist"][0]["mediMakerTxt"];
						data["mdPrice"]=val["sublist"][0]["mediAmount"];
						data["mediCapa"]=val["sublist"][0]["mediCapa"];
						data["mediWater"]=val["sublist"][0]["mediWater"];
						data["mediOper"]=val["sublist"][0]["mediOper"];
						data["mmUse"]=val["sublist"][0]["mmUse"];
						data["mediMaker"]=val["sublist"][0]["mediMaker"];
						data["mmIsZero"]=val["sublist"][0]["mmIsZero"];
						data["mmUnit"]=val["sublist"][0]["mmUnit"];
						data["mediselcapa"]=val["sublist"][0]["mediselcapa"];
						data["sublist"]=val["sublist"];

						rc_medicine+="|"+val["sublist"][0]["mediCode"];
						addmeditbl(data);
					}
					else
					{
						rc_medicine+="|"+val["mediCode"];
						addmeditbl(data);
					}
				}
				else
				{
					if(!isEmpty(val["sublist"]) && val["sublist"].length>0)
					{
						data["mdCode"]=val["sublist"][0]["mediCode"];
						data["mediHerb"]=val["sublist"][0]["mediHerb"];
						data["mdType"]="medicine";
						data["mediType"]=val["sublist"][0]["mediType"];
						data["mdTitle"]=val["sublist"][0]["mediName"];
						data["mdOrigin"]=val["sublist"][0]["mediOriginTxt"];
						data["mdMaker"]=val["sublist"][0]["mediMakerTxt"];
						data["mdPrice"]=val["sublist"][0]["mediAmount"];
						data["mediCapa"]=val["sublist"][0]["mediCapa"];
						data["mediWater"]=val["sublist"][0]["mediWater"];
						data["mediOper"]=val["sublist"][0]["mediOper"];
						data["mmUse"]=val["sublist"][0]["mmUse"];
						data["mediMaker"]=val["sublist"][0]["mediMaker"];
						data["mmIsZero"]=val["sublist"][0]["mmIsZero"];
						data["mmUnit"]=val["sublist"][0]["mmUnit"];
						data["mediselcapa"]=val["sublist"][0]["mediselcapa"];
						data["sublist"]=val["sublist"];

						rc_medicine+="|"+val["sublist"][0]["mediCode"];
						addmeditbl(data);
					}
					else
					{
						rc_medicine+="|"+val["mediCode"];
						addmeditbl(data);
					}
				}
			});
		}

		if(!isEmpty(obj["sweetMedi"]))
		{
			$.each(obj["sweetMedi"],function(idx, val){
				if(val["mediType"]=="inlast")
				{
					data["mdCode"]=val["mediCode"];
					data["mediHerb"]=val["mediHerb"];
					data["mdType"]="sweet";
					data["mdTitle"]=val["mediName"];
					data["mdOrigin"]=val["mediOriginTxt"];
					data["mdMaker"]="";
					data["mdPrice"]=val["mediAmount"];
					data["mediCapa"]=val["mediCapa"];
					data["mediWater"]=val["mediWater"];
					data["mediOper"]="";
					data["mmUse"]=val["mmUse"];
					data["mediMaker"]=val["mediMaker"];
					data["mmIsZero"]=val["mmIsZero"];
					data["mmUnit"]=val["mmUnit"];
					data["mediselcapa"]=val["mediselcapa"];
					//console.log(data);
					addmeditbl(data);
				}
			});
		}

		//íƒ•ì „ë²•
		if(!isEmpty(obj["data"]["rcDctype"]))
		{
			$("select[name=specialDecoc]").val(obj["data"]["rcDctype"]);
		}
		//ì²©ìˆ˜
		if(!isEmpty(obj["data"]["rcChub"]))
		{
			$("select[name=chubCnt]").val(obj["data"]["rcChub"]);
		}
		//íŒ©ìˆ˜
		if(!isEmpty(obj["data"]["rcPackcnt"]))
		{
			$("select[name=packCnt]").val(obj["data"]["rcPackcnt"]);
		}
		//íŒ©ìš©ëŸ‰
		if(!isEmpty(obj["data"]["rcPackcnt"]))
		{
			$("select[name=packCapa").val(obj["data"]["rcPackcapa"]);
		}
		//íŒŒìš°ì¹˜
		console.log("rcPacktype = "+obj["data"]["rcPacktype"]+", category : "+obj["data"]["rcpackCategory"]);
		if(!isEmpty(obj["data"]["rcpackCategory"]))
		{
			$('input[name="packCategory"]:input[value='+obj["data"]["rcpackCategory"]+']').prop("checked",true);
		}
		if(!isEmpty(obj["data"]["rcPacktype"]))
		{	
			var rpackcategory=$('input[name="packCategory"]:checked').val();
			//console.log("rpackcategory = " + rpackcategory);
			var chkrcpack="";
			$("#packtype option").each(function(){
				var pvalue=$(this).val();
				if(!isEmpty(obj["data"]["rcPacktype"]) && obj["data"]["rcPacktype"]==pvalue)
				{
					chkrcpack="OK";	
				}

				//console.log("pvalue = " + pvalue +", rcPacktype = " + obj["data"]["rcPacktype"]);
			});

			//console.log("chkrcpack = " + chkrcpack);

			if(chkrcpack=="OK")
			{
				setpacktypedivon(obj["data"]["rcPacktype"]);
				//console.log("6666 changepacktype");
				changepacktype();
			}
			else
			{
				if(rpackcategory=="standing")
				{
					$('input[name="packCategory"]:input[value=standing]').attr("checked",true);
				}
				else if(rpackcategory=="spout")
				{
					$('input[name="packCategory"]:input[value=spout]').attr("checked",true);
				}
				setpacktypedivon(obj["data"]["rcPacktype"]);
				//console.log("7777 changepacktype");
				changepacktype3(obj["data"]["rcPacktype"], obj["data"]["rcMedibox"]);
			}
		}

		//í•œì•½ë°•ìŠ¤
		console.log("rcMedibox = "+obj["data"]["rcMedibox"]+", option  = " + obj["data"]["rcmedioption"]);
		if(!isEmpty(obj["data"]["rcmedioption"]))
		{
			$('input[name="boxCategory"]:input[value='+obj["data"]["rcmedioption"]+']').prop("checked",true);
		}
		if(!isEmpty(obj["data"]["rcMedibox"]))
		{
			setboxmedidivon(obj["data"]["rcMedibox"]);
			changepacking('medi');
			//console.log("setboxmedidivonsetboxmedidivonsetboxmedidivonsetboxmedidivon");
		}
		
		try{
			//ë‹¹ë„ 
			if(!isEmpty(obj["data"]["rcSugarbrix"]))
			{
				$("#sugarkinds").removeAttr("disabled");
				$("#sugarbrix option[value="+obj["data"]["rcSugarbrix"]+"]").attr("selected", "selected");
			}
			//í–¥ê¸°
			if(!isEmpty(obj["data"]["rcFlavor"]))
			{
				$("#flavorkinds").removeAttr("disabled");
				$("#flavor option[value="+obj["data"]["rcFlavor"]+"]").attr("selected", "selected");
			}
			//ë‹¹ë„ì„ íƒ 
			if(!isEmpty(obj["data"]["rcSugarkinds"]))
			{
				$("#sugarkinds option[value="+obj["data"]["rcSugarkinds"]+"]").attr("selected", "selected");
			}
			//í–¥ê¸°ì„ íƒ 
			if(!isEmpty(obj["data"]["rcFlavorkinds"]))
			{
				$("#flavorkinds option[value="+obj["data"]["rcFlavorkinds"]+"]").attr("selected", "selected");
			}
		}catch(e){
			console.log('ê°œì¸ë°©ì œ í–¥ê¸° ë‹¹ë„ ì„¸íŒ… ì˜¤ë¥˜');
			console.log(e);
		}


		//ë³µìš©ë²•
		if(!isEmpty(obj["data"]["rcUsage"]))
		{
			$("#advicespandiv").show();
			$("input[name=orderAdviceKey]").val(0);
			$("#advicesel option[value=0]").prop("selected", true);//.trigger("change");

			setTimeout(function(){
				$("textarea[name=orderAdvice]").val(obj["data"]["rcUsage"]);
				$("#orderAdviceDiv").html(obj["data"]["rcUsage"]);
				console.log("rcUsage : " + obj["data"]["rcUsage"]);
				CKEDITOR.instances.editor.insertText(obj["data"]["rcUsage"],function(){CKEDITOR.instances.editor.insertText(obj["data"]["rcUsage"]);});
			}, 500);
		}
		

		if(!isEmpty(rc_medicine))
		{
			callapi("GET","recipe",getdata("componentdesc")+"&medicine="+rc_medicine);
		}
	}

	//ì•½ìž¬í‘œì‹œ
	function viewmedicines(totalmedicine){
		var rc_medicine="";
		var data=[];
		$.each(totalmedicine,function(idx, val){
			data["mdCode"]=val["mediCode"];
			data["mediHerb"]=val["mediHerb"];
			data["mediType"]=val["mediType"];
			data["mdTitle"]=val["mediName"];
			data["mdOrigin"]=val["mediOriginTxt"];
			data["mdMaker"]=val["mediMakerTxt"];
			data["mdPrice"]=val["mediAmount"];
			data["mediCapa"]=val["mediCapa"];
			data["mediWater"]=val["mediWater"];
			data["mediOper"]=val["mediOper"];
			data["mmUse"]=val["mmUse"];
			data["mediMaker"]=val["mediMaker"];
			data["mmIsZero"]=val["mmIsZero"];
			data["mmUnit"]=val["mmUnit"];
			data["mediselcapa"]=val["mediselcapa"];
			data["sublist"]=val["sublist"];
		
			if(val["mmUse"]=="Y")
			{
				if(!isEmpty(val["sublist"]) && val["sublist"].length>1)
				{
					//console.log(val["sublist"]);
					data["mdCode"]=val["sublist"][0]["mediCode"];
					data["mediHerb"]=val["sublist"][0]["mediHerb"];
					data["mediType"]=val["sublist"][0]["mediType"];
					data["mdTitle"]=val["sublist"][0]["mediName"];
					data["mdOrigin"]=val["sublist"][0]["mediOriginTxt"];
					data["mdMaker"]=val["sublist"][0]["mediMakerTxt"];
					data["mdPrice"]=val["sublist"][0]["mediAmount"];
					data["mediCapa"]=val["sublist"][0]["mediCapa"];
					data["mediWater"]=val["sublist"][0]["mediWater"];
					data["mediOper"]=val["sublist"][0]["mediOper"];
					data["mmUse"]=val["sublist"][0]["mmUse"];
					data["mediMaker"]=val["sublist"][0]["mediMaker"];
					data["mmIsZero"]=val["sublist"][0]["mmIsZero"];
					data["mmUnit"]=val["sublist"][0]["mmUnit"];
					data["mediselcapa"]=val["sublist"][0]["mediselcapa"];
					data["sublist"]=val["sublist"];

					rc_medicine+="|"+val["sublist"][0]["mediCode"];
					addmeditbl(data);
				}
				else
				{
					rc_medicine+="|"+val["mediCode"];
					addmeditbl(data);
				}
			}
			else
			{					
				if(!isEmpty(val["sublist"]) && val["sublist"].length>0)
				{
					data["mdCode"]=val["sublist"][0]["mediCode"];
					data["mediHerb"]=val["sublist"][0]["mediHerb"];
					data["mediType"]=val["sublist"][0]["mediType"];
					data["mdTitle"]=val["sublist"][0]["mediName"];
					data["mdOrigin"]=val["sublist"][0]["mediOriginTxt"];
					data["mdMaker"]=val["sublist"][0]["mediMakerTxt"];
					data["mdPrice"]=val["sublist"][0]["mediAmount"];
					data["mediCapa"]=val["sublist"][0]["mediCapa"];
					data["mediWater"]=val["sublist"][0]["mediWater"];
					data["mediOper"]=val["sublist"][0]["mediOper"];
					data["mmUse"]=val["sublist"][0]["mmUse"];
					data["mediMaker"]=val["sublist"][0]["mediMaker"];
					data["mmIsZero"]=val["sublist"][0]["mmIsZero"];
					data["mmUnit"]=val["sublist"][0]["mmUnit"];
					data["mediselcapa"]=val["sublist"][0]["mediselcapa"];
					data["sublist"]=val["sublist"];

					rc_medicine+="|"+val["sublist"][0]["mediCode"];
					addmeditbl(data);
				}
				else 
				{
					rc_medicine+="|"+val["mediCode"];
					addmeditbl(data);
				}
			}
			if(!isEmpty(rc_medicine))
			{
				callapi("GET","recipe",getdata("componentdesc")+"&medicine="+rc_medicine);
			}
		});
	}
	//ë¹ ë¥´ì²˜ë°©ìƒì„¸
	function viewfastrecipe(obj)
	{
		var rc_medicine="";
		//ì²˜ë°©ì•½ìž¬ë¦¬ìŠ¤íŠ¸
		if(!isEmpty(obj["totalMedicine"]))
		{
			viewmedicines(obj["totalMedicine"]);
		}
	}
	//ì¶”ì²œì²˜ë°©ìƒì„¸
	function viewrecomdesc(obj)
	{
		var rc_medicine="";
		//ì²˜ë°©ì•½ìž¬ë¦¬ìŠ¤íŠ¸
		resetmeditbldata(obj["rcTitle"]);
		if(!isEmpty(obj["totalMedicine"]))
		{
			viewmedicines(obj["totalMedicine"]);
		}
	}
	function getmediopervalue(medicode)
	{
		var valuetxt="";
		//ë²•ì œ 
		var rc_medioper=$("textarea[name=rcMedioper]").val();
		if(!isEmpty(rc_medioper))
		{
			var rcMedioper=JSON.parse(rc_medioper);
			if(!isEmpty(rcMedioper[medicode]))
			{
				valuetxt=rcMedioper[medicode]["opervalue"];
			}
		}
		return valuetxt;
	}
	function delmediopervalue(medicode)
	{
		var valuetxt="";
		//ë²•ì œ 
		var rc_medioper=$("textarea[name=rcMedioper]").val();
		if(!isEmpty(rc_medioper))
		{
			medioperlist=JSON.parse(rc_medioper);
			if(!isEmpty(medioperlist[medicode]))
			{
				delete medioperlist[medicode];
				var jsonoper=JSON.stringify(medioperlist);
				$("textarea[name=rcMedioper]").val(jsonoper);
			}
		}
	}

	function changeselmedi(no)
	{
		var medicoe=$("select[name=cmedi"+no+"]").children("option:selected").val();
		var mediname=$("select[name=cmedi"+no+"]").children("option:selected").data("name");
		var mediorigin=$("select[name=cmedi"+no+"]").children("option:selected").data("origin");
		var mediprice=$("select[name=cmedi"+no+"]").children("option:selected").data("price");
		var medimaker=$("select[name=cmedi"+no+"]").children("option:selected").data("maker");
		var medioper=$("select[name=cmedi"+no+"]").children("option:selected").data("oper");
		var mediherb=$("select[name=cmedi"+no+"]").children("option:selected").data("herb");
		
		var mediType=$(this).children("td").eq(6).find("select").val();//ì²˜ë°©íƒ€ìž…
		var mediCode=$(this).children("td").eq(0).find("input").val(); //ì•½ìž¬ì½”ë“œ
		var mediName=$(this).children("td").eq(1).find("span.mtitle").text();//ì•½ìž¬ëª…

		var mediOriginTxt=$(this).children("td").eq(2).find("span.origin").text();//ì›ì‚°ì§€ëª… 
		var mediMaker="";
		var mediMakerTxt=$(this).children("td").eq(2).find("span.maker").text();//ì œì¡°ì‚¬ëª…  
		var mediCapa=$(this).children("td").eq(3).find("input").val();//ì²©ë‹¹ì•½ìž¬ëŸ‰
		var mediAmount=$(this).children("td").eq(5).find(".amount").attr("value");//ì²©ë‹¹ì•½ìž¬ë¹„

		$("#tr"+no).data("maker", medimaker);
		$("#tr"+no).data("herb", mediherb);
		$("#tr"+no).children("td").eq(0).find("input").val(medicoe);//ì•½ìž¬ì½”ë“œ
		$("#tr"+no).children("td").eq(1).find("span.mtitle").text(mediname);//ì•½ìž¬ëª…
		$("#tr"+no).children("td").eq(2).find("span.origin").text(mediorigin);//ì›ì‚°ì§€ëª… 
		$("#tr"+no).children("td").eq(2).find("span.maker").text(medimaker);//ì œì¡°ì‚¬ëª…  
		$("#tr"+no).children("td").eq(5).find(".amount").attr("value", mediprice);//ì²©ë‹¹ì•½ìž¬ë¹„

		if(!isEmpty(medioper))
		{
			medioper=decodeURI(medioper);
			var operjson=JSON.parse(medioper);
			//console.log(operjson);
			var cnt=0;
			for(var i=0;i<operjson.length;i++)
			{
				if(operjson[i]["use"]=="Y")
				{
					cnt++;
				}
			}

			if(cnt>0)
			{
				$("#btnoper"+no).show();
			}
			else
			{
				$("#btnoper"+no).hide();
			}
		}
		else
		{
			$("#btnoper"+no).hide();
		}

		resetCnt();

	}
	function getchkmedioper(medioper)
	{
		if(!isEmpty(medioper))
		{
			var operjson=JSON.parse(medioper);
			var cnt=0;
			for(var i=0;i<operjson.length;i++)
			{
				if(operjson[i]["use"]=="Y")
				{
					cnt++;
				}
			}

			if(cnt>0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}

	function selmedicinelist(no, list)
	{
		var ck_cfcode=getCookie("mck_cfcode");
		var txt1="";
		txt1="<div class='select' style='width:78%;display:inline-block;'>";
		txt1+="<select name='cmedi"+no+"' id='cmedi"+no+"' onchange='changeselmedi("+no+");' >";
		for(var m=0;m<list.length;m++)
		{
			if(ck_cfcode=="cy")
			{
				txt1+="<option value='"+list[m]["mediCode"]+"' data-name='"+list[m]["mediName"]+"' data-origin='"+list[m]["mediOriginTxt"]+"' data-price='"+list[m]["mediAmount"]+"' data-maker='"+list[m]["mediMakerTxt"]+"' data-oper='"+encodeURI(list[m]["mediOper"])+"'>"+list[m]["mediName"]+"</option>";
			}
			else
			{
				txt1+="<option value='"+list[m]["mediCode"]+"' data-name='"+list[m]["mediName"]+"' data-origin='"+list[m]["mediOriginTxt"]+"' data-price='"+list[m]["mediAmount"]+"' data-maker='"+list[m]["mediMakerTxt"]+"' data-oper='"+encodeURI(list[m]["mediOper"])+"'>"+list[m]["mediName"]+" / "+list[m]["mediOriginTxt"]+" / "+list[m]["mediAmount"]+"</option>";
			}
		}
		txt1+="</select>";
		txt1+="<textarea name='cmeditxtarea"+no+"' id='cmeditxtarea"+no+"' style='display:none;'>"+JSON.stringify(list)+"</textarea>";
		txt1+="</div>";
		return txt1;
	}
	//ì²˜ë°©ë‚´ìš©> ì•½ìž¬ì¶”ê°€
	function addmeditbl(json)
	{
		var selmatype=$("select[name=selmatype]").children("option:selected").val();
		if(json["mediCapa"]!=null){var mediCapa=json["mediCapa"];}else{var mediCapa=0;}
		var medicode=chkmedi=medipro=chkpro="";
		var code=json["mdCode"];
		$("#meditbl tbody").each(function()
		{
			$($(this).children("tr")).each(function()
			{
				medicode = $(this).children("td").eq(0).children("input").val();
				var medititle = $(this).children("td").eq(1).children(".mtitle").text();
				chkmedi+=","+medicode;
				//console.log("medicode = "+medicode+", medititle = " + medititle+", code = " + code);
				if(medicode == code)
				{
					//console.log("ê°™ì€ì•½ìž¬ê°€ ìžˆë‹¤~  medicode = " +medicode+", medititle =" + medititle);
					var medipro = $(this).children("td").eq(3).find("input").val();
					if(parseInt(medipro) < parseInt(mediCapa))
					{
						$(this).children("td").eq(3).find("input").val(mediCapa);
					}
					else if(parseInt(medipro) > parseInt(mediCapa))
					{
						$(this).children("td").eq(3).find("input").val(medipro);
					}
				}
			});
		});
		var addmedichk=true;
		chkmedi+=",";
		if(!isEmpty(chkmedi))
		{
			//console.log("chkmedi = "+chkmedi);
			if(chkmedi.indexOf(","+code+",")!=-1)
			{
				addmedichk=false;
				//console.log("addmedichk = "+addmedichk+", code="+code);
			}
		}
		else
		{
			addmedichk=true;
		}

		if(addmedichk==false)
		{
			//alert("ì´ë¯¸ ì„ íƒí•œ ì•½ìž¬ìž…ë‹ˆë‹¤"+code+", chkmedi = " + chkmedi);
		}
		else
		{
			//var no=$("#meditbl tbody tr").length + 1;
			var no=$("#meditbl tbody tr").filter(":last").attr("id");
			//console.log("222 no = " + no);
			if(!isEmpty(no))
			{
				no=no.replace("tr","");
				no=parseInt(no)+1;
			}
			else
			{
				no=$("#meditbl tbody tr").length + 1;
			}
			
			//console.log("no = " + no);
			
			var mmUse=!isEmpty(json["mmUse"])?json["mmUse"]:"D";
			var mediMaker=!isEmpty(json["mediMaker"])?json["mediMaker"]:"";
			var selmedidata="";
			if(!isEmpty(json["sublist"]))
			{
				if(json["sublist"].length>1)
				{
					selmedidata=selmedicinelist(no, json["sublist"]);
				}
			}
			//console.log(json);
			//console.log("mmUse = " + mmUse);
			
			//ë¹ ë¥¸ì²˜ë°©ì¸ê²½ìš° ì•½ìž¬ë³€ê²½ê°€ëŠ¥
			var isfast=$("#fastrecipe").hasClass("fastrecipe");
			var txt="<tr id='tr"+no+"' data-use='"+mmUse+"' data-maker='"+mediMaker+"' data-herb='"+json["mediHerb"]+"' data-type='"+json["mdType"]+"' data-iszero='"+json["mmIsZero"]+"' data-unit='"+json["mmUnit"]+"' >";
					txt+="<td><span>"+no+"</span><input type='hidden' name='mdcode"+no+"' id='mdcode"+no+"' value='"+code+"'></td>";
					txt+="<td class='product-name' style='text-align:left;'>";
					if(!isEmpty(mmUse) && mmUse!="Y" || !isEmpty(mediMaker) && mediMaker=="8071" || isfast==true)//8071:ì¶”ì²œì²˜ë°©
					{
						txt+="<span id='title"+no+"' class='mtitle'>"+json["mdTitle"]+"</span>";
						var mediopername=getmediopervalue(code);
						txt+="<span id='mediopertitle"+no+"' class='cmedioper' style='font-size: 15px;color: lightseagreen;'>"+mediopername+"</span>";
						txt+="<div id='btnUse"+no+"' class='btnBox' style='display:inline-block;padding-left:5px;'><button type='button' class='btn btngreen' style='width:60px;' onclick=orderImpossible('"+no+"','"+code+"');>ì•½ìž¬ë³€ê²½</button></div>";
					}
					else
					{
						if(!isEmpty(selmedidata))
						{
							txt+="<span id='title"+no+"' class='mtitle' style='display:none;'>"+json["mdTitle"]+"</span>";
							txt+=selmedidata;
						}
						else
						{
							txt+="<span id='title"+no+"' class='mtitle'>"+json["mdTitle"]+"</span>";
						}						
						var mediopername=getmediopervalue(code);
						txt+="<span id='mediopertitle"+no+"' class='cmedioper' style='font-size: 15px;color: lightseagreen;'>"+mediopername+"</span>";
						
						var chkmedioper=getchkmedioper(json["mediOper"]);
						if(chkmedioper==true)
						{
							//console.log("mediopername = "+mediopername);
							if(isEmpty(mediopername))
							{
								txt+="<div id='btnoper"+no+"' class='btnBox' style='display:inline-block;padding-left:5px;'><button type='button' class='btn btnblue' onclick=medicallayermedioper('"+no+"','"+code+"');>ë²•ì œ</button></div>";
							}
						}
					}
					txt+="</td>";				
					txt+="<td style='padding : 7px 3px 7px 3px;text-align:right;'>"
					if(getCookie("mck_cfcode") == "cy"){
						txt+=" <span id='maker"+no+"' class='maker'>"+json["mdMaker"]+"</span>/";
					}					
					txt+="<span id='origin"+no+"' class='origin'>"+json["mdOrigin"]+"</span>";
					txt+="<input type='hidden' name='mdwater' class='water' placeholder='' value='"+json["mediWater"]+"' readonly>";
					txt+="</td>";

					if(json["mdType"]=="sweet"&&!isEmpty(json["mmUnit"])&&parseInt(json["mmUnit"])>0)
					{
						txt+="<td>";
						txt+="<div class='select'>";
						txt+="<select name='selcapa' id='selcapa"+no+"' class='ajaxdata schubamt' tabindex='"+(no+1)+"' onchange='resetCnt();' >";
						var selected="";
						for(var i=1;i<11;i++)
						{
							selected="";
							if(json["mediselcapa"]==i)
							{
								selected=" selected ";
							}
							txt+="<option value='"+i+"' "+selected+">"+i+"ê°œ</option>";
						}
						txt+="</select>";
						txt+="<input type='hidden' id='capa"+no+"' name='capa' value='"+mediCapa+"' class='schubamt innumber'>";
						txt+="</div>";
						txt+="</td>";
					}
					else
					{
						txt+="<td>";
						txt+="<div class='input input2'>";
						txt+="<input type='text' id='capa"+no+"' name='capa' placeholder='' value='"+mediCapa+"' class='schubamt innumber' tabindex='"+(no+1)+"' ";
						txt+="onkeydown=\"limitCapa('dn',this.id);\" onkeyup=\"limitCapa('up',this.id);capaonkeyup(event);\" onfocus='this.select();' maxlength='7' onchange='onlynumber(event, true);'>";
						txt+="<span>g</span>";
						txt+="</div>";
						txt+="</td>";
					}

					txt+="<td>";
					txt+="<div class='input input2'>";
					txt+="<input type='text' name='tcapa' placeholder='' value='0' class='innumber' readonly>";
					txt+="<span>g</span>";
					txt+="</div>";
					txt+="</td>";
					txt+="<td style='text-align: right;'>";
					txt+="<span class='amount' value='"+json["mdPrice"]+"'>0</span>";
					txt+="<span class='won'>ì›</span>";
					txt+="</td>";
					if(selmatype=="powder" || selmatype=="decopill" || selmatype=="ointments"){}
					else
					{
						if(getCookie("mck_cfcode")!="on")
						{
							if(json["mdType"]=="sweet" || json["mdType"]=="alcohol")
							{
								txt+="<td style='padding:7px 3px;'>ë³„ì „</td>";
							}
							else
							{
								txt+="<td style='padding:7px 3px;'>";
								txt+="<div class='select'>";
								txt+="<select name='mediType' id='mediType' onchange='resetCnt()' style='padding:0 0.5em;' > ";
								var carr=["infirst","inmain","inafter"];
								var tarr=["ì„ ì „","ì¼ë°˜","í›„í•˜"];
								for(var m=0;m<carr.length;m++){
									if(json["mediType"]==carr[m]){var cls=" selected";}else{var cls=" ";}
									txt+="<option value='"+carr[m]+"' "+cls+">"+tarr[m]+"</option>";
								}
								txt+="</select>";
								txt+="</div>";
								txt+="</td>";
							}
						}
					}


					txt+="<td style='padding:5px;'><a href=javascript:deletemedi('"+no+"');>"+getIconDel()+"</a></td>";
					txt+="</tr>";
				
				if(json["mdType"]=="sweet" || json["mdType"]=="alcohol")
				{
					$("#meditbl tbody").append(txt);
				}
				else
				{
					$("#meditbl tbody").append(txt);
				}

		}

		//var maxno=no+1;
		//("#searchmTxt").attr('tabindex',0).focus();

		//setTimeout("$('input[name=capa]').focus();",300);
		setTimeout("$('input[name=searchmTxt]').focus();",300);
		setTimeout("resetdctime();",200);
		setTimeout("resetCnt();",300);
		//initialize_table();
		
	}
	function resetqualityreport()
	{
		var ck_cfcode=getCookie("mck_cfcode");
		if(ck_cfcode=="hp")
		{
			$("#qualityreportth").hide();
			$("#qualityreporttd").hide();
			var chknok=false;
			///ì•½ìž¬ë¦¬ìŠ¤íŠ¸
			$("#meditbl tbody tr").each(function(idx, val){
				var mediherb=$(this).data("herb");
				//ë…¹ìš©ì²´í¬ 
				if(chknok==false)
				{
					chknok=chkcfMeditime(mediherb);
				}
			});
			if(chknok==true)
			{
				$("#qualityreportth").show();
				$("#qualityreporttd").show();
			}
		}
	}
	function resetdctime()
	{
		var chknok=false;
		///ì•½ìž¬ë¦¬ìŠ¤íŠ¸
		$("#meditbl tbody tr").each(function(idx, val){
			var mediherb=$(this).data("herb");
			//ë…¹ìš©ì²´í¬ 
			if(chknok==false)
			{
				chknok=chkcfMeditime(mediherb);
			}
		});
		//ë…¹ìš©ìžˆëŠ”ì§€ ì²´í¬ 
		var ck_cfcode=getCookie("mck_cfcode");
		viewdctime(chknok);
	}
	///ë³„ì „(ê°ë¯¸ì œ)ë¥¼ ì„ íƒì‹œ
	function changesweet()
	{
		$("#sugarvolDiv").html();
		var data="";
		var sugar=$("select[name=sugar]").val();
		$("#amount_sweetdiv").hide();
		if(!isEmpty(sugar))
		{
			$("#amount_sweetdiv").show();
			var sugartxt=$("select[name=sugar]").children("option:selected").text();
			data+='<div class="select">';
			data+='<select name="sugarvol" id="sugarvol" onchange="resetCnt();" class="ajaxdata">';
			if(chkSweetample(sugartxt)==true)
			{
				for(var i=0;i<10;i++)
				{
					data+='<option value="'+(i+1)+'" data-dan="ê°œ">'+(i+1)+' ê°œ</option>';
				}

			}
			else
			{
				var larr=["5","10","15","20","25","30","100","200"];
				for(var i=0;i<larr.length;i++)
				{
					data+='<option value="'+(larr[i])+'" data-dan="ml">'+(larr[i])+' ml</option>';
				}
			}
			data+='</select>';
		}

		$("#sugarvolDiv").html(data);
		resetCnt();
	}
	//ì•½ìž¬ì¶”ê°€ (ì•½ìž¬í•˜ë‚˜ì”©ì¶”ê°€)
	function setMedicine(seq)
	{
		closediv('poprecipe');
		callapi("GET","recipe",getdata("medicinedesc")+"&seq="+seq);
	}
	//ì²©ì•½ì•½ìž¬ 
	function setNHISMedicine(seq)
	{
		callapi("GET","recipe",getdata("NHISmedicinedesc")+"&seq="+seq);
	}
	///ì•½ìž¬ì¶”ê°€
	function addrecipemedicine(json)
	{
		json["mediType"]="inmain";
		var chkmedi=false;
		var rc_medicine="";
		$("#meditbl tbody tr").each(function()
		{
			var mediCode=$(this).children("td").eq(0).find("input").val(); //ì•½ìž¬ì½”ë“œ
			rc_medicine+="|"+mediCode;
			var mediCodeArr=mediCode;
			var jsonmediArr=json["mdCode"];
			mediCodeHub=mediCodeArr;
			jsonCodeHub=jsonmediArr;
			//console.log("mediCodeHub = "+mediCodeHub+", jsonCodeHub = " + jsonCodeHub);

			if(mediCodeHub==jsonCodeHub)
			{
				chkmedi=true;
			}
		});

		if(chkmedi==true)
		{
			alert("ì´ë¯¸ ì¶”ê°€ëœ ì•½ìž¬ìž…ë‹ˆë‹¤.");
		}
		else
		{
			addmeditbl(json);
			rc_medicine+="|"+json["mdCode"];
			if(!isEmpty(rc_medicine))
			{
				callapi("GET","recipe",getdata("componentdesc")+"&medicine="+rc_medicine);
			}
		}
	}
	function deletemedi(no)
	{
		var delmedicode=$("#tr"+no).children("td").eq(0).children("input").val();
		delmediopervalue(delmedicode);
		$("#tr"+no).remove();

		

		var rc_medicine="";
		$("#meditbl tbody tr").each(function(idx, val){
			var medicode=$(this).children("td").eq(0).children("input").val();
			rc_medicine+="|"+medicode;
		});


		resetdctime();

		resetCnt();

		if(!isEmpty(rc_medicine))
		{
			callapi("GET","recipe",getdata("componentdesc")+"&medicine="+rc_medicine);
		}
	}
	function orderImpossible(no,medicode)
	{
		medicallayer('modal.impossible',medicode,no);
	}
	function orderNHISImpossible(no,medicode)
	{
		medicallayer('modal.impossibleNHIS',medicode,no);
	}
	//DOO::20220401 - ë²•ì œ 
	function medicallayermedioper(no,medicode)
	{
		medicallayer('modal.medioper',medicode,no);
	}

	function getMediTypeName(meditype)
	{
		switch(meditype)
		{
		case "infirst":
			return "ì„ ì „";
		case "inmain":
			return "ì¼ë°˜";
		case "inafter":
			return "í›„í•˜";
		case "inlast":
			return "ë³„ì „";
		}
	}
	/*function viewmedicineboxlist__(obj)
	{
		var data=sdata="";
		var i=0;

		$("#searchResult").html('');
		if(!isEmpty(obj["list"]))
		{
			$(obj["list"]).each(function( index, value )
			{
				var mdPrice=value["mdPrice"];
				sdata=value["mdCode"]+","+value["mmTitle"]+","+value["mdOrigin"]+","+mdPrice+","+value["mdWater"];
				data="<li class='list-group-item' onmouseover='onChangeHover("+i+");'>";
				data+="<a href='javascript:searchResultOnclick("+value["seq"]+");'>";
				data+="<span id='md"+value["seq"]+"' data-seq='"+value["seq"]+"' data-value='"+sdata+"'>"+value["mmTitle"]+"</span> "+value["mdOrigin"]+" / "+mdPrice+"<?=$txtdt['7124']?>";
				data+="</a>";
				data+="</li>";

				$("#searchResult").append(data);
				i++;
			});

			$('li.list-group-item').eq(0).addClass('selected');				
		}
	}*/

	//******************************************************************************
	// DOO:: chartì™€ NHISchartì—ì„œ íŒŒìš°ì¹˜, í•œì•½ë°•ìŠ¤, í¬ìž¥ë°•ìŠ¤ ê°™ì´ ì“°ìž„..ê³µë™ìœ¼ë¡œ ëºŒ
	//******************************************************************************
	// ì „ì—­ìœ¼ë¡œ ì‚¬ìš© - pbAircapUse(ì—ì–´ìº¡ ì‚¬ìš©ìœ ë¬´) by ì˜ì§„ 2021.10.26
	var pack_data = new Array();
	var box_data = new Array();
	var boxmedi_data = '';
	var obj_packing = '';	// ì „ì—­ì‚¬ìš©ìœ¼ë¡œ

	function viewboxdeli(data, obj)
	{
		var _default_odboxdeli = '';

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// ìŠ¤íƒ ë”©ê³¼ í•œì•½ë°•ìŠ¤ì— pbAircapUse(ì—ì–´ìº¡ ì‚¬ìš©ìœ ë¬´) Yê°€ ìžˆë‹¤ë©´ ì—ì–´ìº¡ ë³´ì—¬ì£¼ê¸° by ì˜ì§„ 2021.10.26
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//boxdeli_data = data["boxdeli"];
		boxmedi_data = data["boxmedi"];
		obj_packing = obj["packing"];

		if(!isEmpty(obj["packing"]["packtype"]))
		{
			$.each(obj["packing"]["packtype"], function(idx, val){
				//pack_data[val["pbCode"]] = val["pbAircapUse"]; //ì—ì–´ìº¡ ìœ ë¬´
				pack_data[val["pbCode"]] = val["pbOptionType"]; //ì˜µì…˜ì¢…ë¥˜
			});
		}
		
		// ì„ íƒí•œê±° ì—ì–´ìº¡ìœ ë¬´ ê°€ì ¸ì˜¤ê¸°
		var pack_air_check 	= pack_data[getpacktypedivon().attr("value")];//pack_data[$("select[name=packtype]").children("option:selected").val()];
		var box_air_check 	= box_data[getboxmedidivon().attr("value")];//box_data[$("select[name=boxmedi]").children("option:selected").val()];
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////	

		var i=price=0;
		var txt=stxt="";
		var cfcode=getCookie("mck_cfcode");
		var firstboxdeli="";
		if(cfcode!="on")
		{
			txt='<option value="" data-img="" data-price="">ì„ íƒì•ˆí•¨</option>';
		}
		var stxt='<dl class="packimg">';
		$.each(data["boxdeli"], function(idx, val){

			if(val["pbDefault"]=='Y')
			{
				_default_odboxdeli = val["pbCode"];
			}

			if(val["pbAircapUse"]=='Y') // í¬ìž¥ë°•ìŠ¤ê°€ ì—ì–´ìº¡ì´ë¼ë©´ ìŠ¤íƒ ë”©, í•œì•½ë°•ìŠ¤ë„ ê°™ì´ ì²´í¬í•œë‹¤.
			{
				if(pack_air_check=='Y' && box_air_check=='Y')
				{

					if(isEmpty(firstboxdeli))
					{
						firstboxdeli=val["pbCode"];
					}

					price=val["pbPrice"];
					txt+='<option value="'+val["pbCode"]+'" data-img="'+val["afThumbUrl"]+'" data-price="'+price+'">'+val["pbTitle"]+'</option>';


					stxt+='<dd id="boxdelidd'+idx+'" onclick="addBoxDeliClass('+idx+');" value="'+val["pbCode"]+'" data-img="'+val["afThumbUrl"]+'" data-price="'+price+'" data-capa="'+val["pbMaxcnt"]+'" data-mincapa="'+val["pbMincnt"]+'" data-option="'+val["pbOptionType"]+'"><img src="'+val["afThumbUrl"]+'"><span>'+val["pbTitle"]+'</span></dd>';
				}
			}
			else
			{		
				if(isEmpty(firstboxdeli))
				{
					firstboxdeli=val["pbCode"];
				}

				price=val["pbPrice"];
				txt+='<option value="'+val["pbCode"]+'" data-img="'+val["afThumbUrl"]+'" data-price="'+price+'">'+val["pbTitle"]+'</option>';

				stxt+='<dd id="boxdelidd'+idx+'" onclick="addBoxDeliClass('+idx+');" value="'+val["pbCode"]+'" data-img="'+val["afThumbUrl"]+'" data-price="'+price+'" data-capa="'+val["pbMaxcnt"]+'" data-mincapa="'+val["pbMincnt"]+'" data-option="'+val["pbOptionType"]+'"><img src="'+val["afThumbUrl"]+'"><span>'+val["pbTitle"]+'</span></dd>';
			}
		});
		stxt+='</dl>';

		$("#boxdeli").html(txt);
		$("#boxdelidiv").html(stxt);

		var selodboxdeli=$("input[name=odboxdeli]").val();

		if(!isEmpty(obj["odboxdeli"]))
		{
			//$("#boxdeli option[value="+obj["odboxdeli"]+"]").attr("selected", "selected");
			if(!isEmpty(selodboxdeli))
			{
				setboxdelidivon(selodboxdeli);
			}
			else
			{
				setboxdelidivon(obj["odboxdeli"]);
			}

			$("input[name=odboxdeli]").val(obj["odboxdeli"]); //í¬ìž¥ìž¬ì½”ë“œ
			$("input[name=odboxdelititle]").val(obj["odboxdelititle"]); //í¬ìž¥ìž¬ëª…
			$("input[name=odboxdeliimg]").val(obj["odboxdeliimg"]); //í¬ìž¥ìž¬ì´ë¯¸ì§€ URL
			$("input[name=odboxdeliprice]").val(obj["odboxdeliprice"]); //ê°œë³„í¬ìž¥ìž¬ë¹„
		}
		

		// í¬ìž¥ë°•ìŠ¤ ë””í´íŠ¸ ê°’(ê´€ë¦¬ìž ê¸°ë³¸ê°’ ì„¤ì •) by ì˜ì§„ 2022.01.26
		if(!isEmpty(_default_odboxdeli) || !isEmpty(obj["odboxdeli"]))
		{
			if(!isEmpty(obj["odboxdeli"])) _default_odboxdeli = obj["odboxdeli"];
			//$("#boxdeli option[value="+_default_odboxdeli+"]").attr("selected", "selected");
			if(!isEmpty(selodboxdeli))
			{
				setboxdelidivon(selodboxdeli);
			}
			else
			{
				setboxdelidivon(_default_odboxdeli);
			}
			var imgurl=getboxdelidivon().data("img");//$("select[name=boxdeli]").children("option:selected").data("img");		
			var boxdeliname=getboxdelidivon().children("span").text();//$("select[name=boxdeli]").children("option:selected").text();
			if(!isEmpty(imgurl)) $("#boxdeliimg").html(getImgSrc(imgurl));
			if(!isEmpty(boxdeliname)) $("#boxdeliname").html(boxdeliname);
		}

		if((isEmpty(_default_odboxdeli) && isEmpty(obj["odboxdeli"]) && !isEmpty(firstboxdeli)) || (isEmpty(getboxdelidivon().attr("value")) && !isEmpty(firstboxdeli)))
		{
			
			if(!isEmpty(selodboxdeli))
			{
				setboxdelidivon(selodboxdeli);
			}
			else
			{
				setboxdelidivon(firstboxdeli);
			}
			var imgurl=getboxdelidivon().data("img");//$("select[name=boxdeli]").children("option:selected").data("img");
			var boxdeliname=getboxdelidivon().children("span").text();//$("select[name=boxdeli]").children("option:selected").text();
			if(!isEmpty(imgurl)) $("#boxdeliimg").html(getImgSrc(imgurl));
			if(!isEmpty(boxdeliname)) $("#boxdeliname").html(boxdeliname);	
		}

		changepacking('deli');
	}
	function viewboxmedi(data,obj, type) // type='ALL'
	{
		if(isEmpty(type))
		{
			type='B';
		}
		var _default_odmedibox = '';	// ë””í´íŠ¸ ê°’(ê´€ë¦¬ìž ê¸°ë³¸ê°’ ì„¤ì •)
		var i=price=0;
		var txt="";
		var medicalseq=$("input[name=medicalseq]").val();
		$('#boxcateb').hide();
		$('#boxcatea').hide();
		$('#boxcatev').hide();
		$('#boxcates').hide();
		var ck_cfcode=getCookie("mck_cfcode");

		var cfPouchbase=$("input[name=cfPouchbase]").val();
		cfPouchbase=!isEmpty(cfPouchbase)?cfPouchbase:"share";

		if(cfPouchbase=="share")
		{
			var chkb=chka=chkv=chks=0;
			if(!isEmpty(obj["odmedibox"]))
			{
				var medicate="B";
				$.each(data["boxmedi"], function(idx, val){
					if(val["pbCode"]==obj["odmedibox"])
					{
						medicate=val["pbOptionType"];
						return false;
					}
				});

				$('input[name="boxCategory"]:input[value='+medicate+']').attr("checked",true);
			}
		}
		
		// í˜„ìž¬ ì„ íƒëœ íŒŒìš°ì¹˜ ì˜µì…˜ ì¢…ë¥˜ ê°€ì ¸ì˜¤ê¸° by ì˜ì§„ 2022.01.26
		var pboptiontype = getpacktypedivon().data("option");//$("select[name=packtype]").children("option:selected").data("option");
		var pbcategory = getpacktypedivon().data("category");//$("select[name=packtype]").children("option:selected").data("category");
		var boxCategory=$('input[name="boxCategory"]:checked').val();
	//	console.log("viewboxmedi _default_odmedibox = "+_default_odmedibox+", odmedibox="+obj["odmedibox"]);
		chkb=chka=chkv=chks=0;
		var selmatype=$("select[name=selmatype]").val();
		if(selmatype=="decopill")
		{
			var cfcode=getCookie("mck_cfcode");
			if(cfcode!='hs')
			{
				txt+='<option value="" data-img="" data-price="" data-capa="" data-option="">ë°•ìŠ¤ì—†ìŒ</option>';	
			}
		}
	
		var firstboxmedi="";
		if(!isEmpty(data["boxmedi"]))
		{
			var stxt='<dl class="packimg">';

			$.each(data["boxmedi"], function(idx, val){
					if(val["pbOptionType"]=="B") chkb++;
					if(val["pbOptionType"]=="A") chka++;
					if(val["pbOptionType"]=="V") chkv++;
					if(val["pbOptionType"]=="S") chks++;
					//console.log("viewboxmedi  pboptiontype = "+pboptiontype+", valoptiontype="+val["pbOptionType"]+", cfPouchbase= "+cfPouchbase+", type = "+type+", cfPouchbase = "+cfPouchbase+", boxmedi==>pbCode = "+val["pbCode"]);
		
					if(type == 'ALL')
					{
						val["pbTitle"] = val["pbTitle"].replace(":::","-");

						price=val["pbPrice"];
						txt+='<option value="'+val["pbCode"]+'" data-img="'+val["afThumbUrl"]+'" data-price="'+price+'" data-capa="'+val["pbCapa"]+'" data-mincapa="'+val["pbMincnt"]+'"  data-option="'+val["pbOptionType"]+'">'+val["pbTitle"]+'</option>';

						stxt+='<dd id="boxmedidd'+idx+'" onclick="addBoxMediClass('+idx+');" value="'+val["pbCode"]+'" data-img="'+val["afThumbUrl"]+'" data-price="'+price+'" data-capa="'+val["pbCapa"]+'" data-mincapa="'+val["pbMincnt"]+'" data-option="'+val["pbOptionType"]+'"><img src="'+val["afThumbUrl"]+'"><span>'+val["pbTitle"]+'</span></dd>';

						if(isEmpty(firstboxmedi))
						{
							firstboxmedi=val["pbCode"];
						}
					}
					else
					{		
						if(!isEmpty(pboptiontype))
						{
							if((cfPouchbase=="share" && (pboptiontype.indexOf(val["pbOptionType"])!=-1) && boxCategory==val["pbOptionType"]) || (cfPouchbase=="combine"))
							{
								if(val["pbDefault"]=='Y' && isEmpty(_default_odmedibox))
								{
									_default_odmedibox = val["pbCode"];
								}

								val["pbTitle"] = val["pbTitle"].replace(":::","-");

								price=val["pbPrice"];

								//console.log("viewboxmedi  _default_odmedibox = "+_default_odmedibox+", pbCategory = " + val["pbCategory"] + ", pbcategory = " + pbcategory + ", pbCode = "+ val["pbCode"]);

								//if(val["pbCategory"]=="etc" || (ck_cfcode=="hs" && pbcategory==val["pbCategory"]) || ck_cfcode!="hs")
								if(val["pbCategory"]=="etc" || (pbcategory==val["pbCategory"]))
								{
									txt+='<option value="'+val["pbCode"]+'" data-img="'+val["afThumbUrl"]+'" data-price="'+price+'" data-mincapa="'+val["pbMincnt"]+'" data-capa="'+val["pbCapa"]+'" data-option="'+val["pbOptionType"]+'">'+val["pbTitle"]+'</option>';						

									stxt+='<dd id="boxmedidd'+idx+'" onclick="addBoxMediClass('+idx+');" value="'+val["pbCode"]+'" data-img="'+val["afThumbUrl"]+'" data-price="'+price+'" data-mincapa="'+val["pbMincnt"]+'" data-capa="'+val["pbCapa"]+'" data-option="'+val["pbOptionType"]+'"><img src="'+val["afThumbUrl"]+'"><span>'+val["pbTitle"]+'</span></dd>';

									if(isEmpty(firstboxmedi))
									{
										firstboxmedi=val["pbCode"];
									}
								}
							}
						}
						else
						{
							//txt+='<option value="" data-img="" data-price="" data-capa="" data-option="">ì„ íƒ</option>';

							//stxt+='<dd id="boxmedidd'+idx+'" onclick="addBoxMediClass('+idx+');" value="" data-img="" data-price="" data-capa="" data-option=""><span>ì„ íƒ</span></dd>';
						}
					}

			});

			stxt+="</dl>";
		}
		
		//console.log("viewboxmedi chkb = "+chkb+", chka = "+chka+", chkv = "+chkv+", chks = "+chks);

		if(isEmpty(txt))
		{
			txt='<option value="">ë°ì´í„°ê°€ ì—†ìŠµë‹ˆë‹¤.</option>';
		}

		if(!isEmpty(stxt) && stxt=='<dl class="packimg"></dl>')
		{
			stxt="";
		}

		$("#boxmedi").html(txt);
		$("#boxmedidiv").html(stxt);

		var selodmedibox=$("input[name=odmedibox]").val();

		//console.log("viewboxmedi  _default_odmedibox = "+_default_odmedibox+", odmedibox = "+obj["odmedibox"]+", firstboxmedi = "+firstboxmedi+", selodmedibox = "+selodmedibox+", getboxmedidivon : " + getboxmedidivon().attr("value"));
		if(!isEmpty(obj["odmedibox"]))
		{
			//$("#boxmedi option[value="+obj["odmedibox"]+"]").attr("selected", "selected");
			if(!isEmpty(selodmedibox))
			{
				setboxmedidivon(selodmedibox);
			}
			else
			{
				setboxmedidivon(obj["odmedibox"]);
			}

			$("input[name=odmedibox]").val(obj["odmedibox"]); //í¬ìž¥ìž¬ì½”ë“œ
			$("input[name=odmediboxtitle]").val(obj["odmediboxtitle"]); //í¬ìž¥ìž¬ëª…
			$("input[name=odmediboximg]").val(obj["odmediboximg"]); //í¬ìž¥ìž¬ì´ë¯¸ì§€ URL
			$("input[name=odmediboxprice]").val(obj["odmediboxprice"]); //ê°œë³„í¬ìž¥ìž¬ë¹„
			$("input[name=odmedipboptiontype]").val(obj["odmedipboptiontype"]); //ê°œë³„í¬ìž¥ìž¬ë¹„
		}
		
		// í•œì•½ë°•ìŠ¤ ë””í´íŠ¸ ê°’(ê´€ë¦¬ìž ê¸°ë³¸ê°’ ì„¤ì •) by ì˜ì§„ 2022.01.26
		if(!isEmpty(_default_odmedibox) || !isEmpty(obj["odmedibox"]))
		{
			if(!isEmpty(obj["odmedibox"])) _default_odmedibox = obj["odmedibox"];
			//$("#boxmedi option[value="+_default_odmedibox+"]").attr("selected", "selected");
			if(!isEmpty(selodmedibox))
			{
				setboxmedidivon(selodmedibox);
			}
			else
			{
				setboxmedidivon(_default_odmedibox);
			}

			var imgurl=getboxmedidivon().data("img");//$("select[name=boxmedi]").children("option:selected").data("img");
			var boxmediname=getboxmedidivon().children("span").text();//$("select[name=boxmedi]").children("option:selected").text();
			if(!isEmpty(imgurl)) $("#boxmediimg").html(getImgSrc(imgurl));
			if(!isEmpty(packtypename)) $("#boxmediname").html(boxmediname);	
		}

	
		if((isEmpty(_default_odmedibox) && isEmpty(obj["odmedibox"]) && !isEmpty(firstboxmedi)) || (isEmpty(getboxmedidivon().attr("value")) && !isEmpty(firstboxmedi)))
		{
			if(!isEmpty(selodmedibox))
			{
				setboxmedidivon(selodmedibox);
				if(isEmpty(getboxmedidivon().attr("value")))
				{
					setboxmedidivon(firstboxmedi);
				}
				//console.log("1212getboxmedidivon : " + getboxmedidivon().attr("value"));
			}
			else
			{
				setboxmedidivon(firstboxmedi);
				//console.log("2323getboxmedidivon : " + getboxmedidivon().attr("value"));
			}

			//console.log("getboxmedidivon : " + getboxmedidivon().attr("value"));
			var imgurl=getboxmedidivon().data("img");//$("select[name=boxmedi]").children("option:selected").data("img");
			var boxmediname=getboxmedidivon().children("span").text();//$("select[name=boxmedi]").children("option:selected").text();
			if(!isEmpty(imgurl)) $("#boxmediimg").html(getImgSrc(imgurl));
			if(!isEmpty(packtypename)) $("#boxmediname").html(boxmediname);	

			//console.log("viewboxmedi111  _default_odmedibox = "+_default_odmedibox+", odmedibox = "+obj["odmedibox"]+", firstboxmedi = "+firstboxmedi+", selodmedibox = "+selodmedibox+", getboxmedidivon : " + getboxmedidivon().attr("value"));
		}
		else
		{
			//console.log("viewboxmedi22  _default_odmedibox = "+_default_odmedibox+", odmedibox = "+obj["odmedibox"]+", firstboxmedi = "+firstboxmedi+", selodmedibox = "+selodmedibox+", getboxmedidivon : " + getboxmedidivon().attr("value"));
		}
		
		if(cfPouchbase=="share")
		{
			if(parseInt(chkb)>0)
			{
				$('#boxcateb').show();
			}
			if(parseInt(chka)>0)
			{
				$('#boxcatea').show();
			}
			if(parseInt(chkv)>0)
			{
				$('#boxcatev').show();
			}
			if(parseInt(chks)>0)
			{
				$('#boxcates').show();
			}
		}

		changepacking('medi');

	}
	function viewpacktype(data, obj)
	{
		var _default_odpacktype='';
		var i=price=0;
		var txt="";
		$('#packcatestanding').hide();
		$('#packcatespout').hide();
		$('#packcateetc').hide();

		var chkspoutcnt=chkstandcnt=chketccnt=0;

		var cfPouchbase=$("input[name=cfPouchbase]").val();
		cfPouchbase=!isEmpty(cfPouchbase)?cfPouchbase:"share";
		if(cfPouchbase=="share")
		{
			var poutchcate="standing";
			$.each(data["packtype"], function(idx, val){
				if(val["pbCategory"]=="standing") chkstandcnt++;
				if(val["pbCategory"]=="spout") chkspoutcnt++;
				if(val["pbCategory"]=="etc") chketccnt++;
				if(val["pbCode"]==obj["odpacktype"])
				{
					poutchcate=val["pbCategory"];
					return false;
				}
			});
			if(chkstandcnt==0&&chkspoutcnt==0&&chketccnt>0)
			{
				poutchcate="etc";
			}
			else if(chkstandcnt==0)
			{
				poutchcate="spout";
			}
			$('input[name="packCategory"]:input[value='+poutchcate+']').attr("checked",true);
		
			var packcategory=$('input[name="packCategory"]:checked').val();
		}

		//console.log("viewpacktype cfPouchbase = "+cfPouchbase+", poutchcate = " + poutchcate +", packcategory = " + packcategory);
		var packCapa=$("select[name=packCapa]").children("option:selected").val();

		var selmatype=$("select[name=selmatype]").val();
		var pillShapeDiv=$("select[name=pillShapeDiv]").children("option:selected").val();//ì œí˜• 
	
		//íŒŒìš°ì¹˜
		var stxt="";
		txt='<dl class="packimg">';
		chkspoutcnt=chkstandcnt=chketccnt=0;
		var firstpacktype="";
		$.each(data["packtype"], function(idx, val){

			if(val["pbCategory"]=="standing") chkstandcnt++;
			if(val["pbCategory"]=="spout") chkspoutcnt++;
			if(val["pbCategory"]=="etc") chketccnt++;

			var decopillcategory="";
			if(selmatype=="decopill")
			{
				cfPouchbase="";
				//íƒ„ìžëŒ€ :	1.ë¹„ë‹í¬ìž¥(ì§€í¼ë°±)
				//			2.ì²­ë³‘(ê¸ˆê³µì§„ë‹¨ì²­ë³‘,í‘ì²˜ë³‘,ë©”íƒˆì²­ë³‘,íˆ¬ëª…ì²­ë³‘,ì„ íƒì•ˆí•¨ë“±..) / ì¼€ì´ìŠ¤ì„ íƒ, ì”°ë§ì„ íƒ, ê¸ˆë°•ì„ íƒ 
				//			3.ì‚¬íƒ•í¬ìž¥ (ì‚¬íƒ•í¬ìž¥,ì‚¬íƒ•í¬ìž¥ì•ˆí•¨)
				if(!isEmpty(pillShapeDiv) && pillShapeDiv.indexOf("tanjadae")!=-1)
				{
					if(getCookie("mck_cfcode")=="hm")
					{
						if(val["pbCategory"]=="bottle" || val["pbCategory"]=="candy" || val["pbCategory"]=="zipper")
						{
							if(decopillcategory.indexOf(val["pbCategory"])!=-1){}
							else
							{
								decopillcategory+=val["pbCategory"];
								if(val["pbDefault"]=='Y' && isEmpty(_default_odpacktype))
								{
									_default_odpacktype = val["pbCode"];
								}

							}
						}
					}
					else
					{
						if(val["pbCategory"]=="vinyl" || val["pbCategory"]=="etc" || val["pbCategory"]=="bottle" || val["pbCategory"]=="candy" || val["pbCategory"]=="zipper")
						{
							if(decopillcategory.indexOf(val["pbCategory"])!=-1){}
							else
							{
								decopillcategory+=val["pbCategory"];
								if(val["pbDefault"]=='Y' && isEmpty(_default_odpacktype))
								{
									_default_odpacktype = val["pbCode"];
								}

							}
						}
					}
				}
				else if(!isEmpty(pillShapeDiv) && pillShapeDiv.indexOf("aengdudae")!=-1)
				{
					if(getCookie("mck_cfcode")=="hm")
					{
						if(val["pbCategory"]=="zipper")
						{
							if(decopillcategory.indexOf(val["pbCategory"])!=-1){}
							else
							{
								decopillcategory+=val["pbCategory"];
								if(val["pbDefault"]=='Y' && isEmpty(_default_odpacktype))
								{
									_default_odpacktype = val["pbCode"];
								}

							}
						}
					}
					else
					{
						if(val["pbCategory"]=="vinyl" || val["pbCategory"]=="etc" || val["pbCategory"]=="onetouch" || val["pbCategory"]=="zipper")
						{
							if(decopillcategory.indexOf(val["pbCategory"])!=-1){}
							else
							{
								decopillcategory+=val["pbCategory"];

								if(val["pbDefault"]=='Y' && isEmpty(_default_odpacktype))
								{
									_default_odpacktype = val["pbCode"];
								}

							}
						}
					}
				}
				else
				{
					if(val["pbCategory"]=="vinyl" || val["pbCategory"]=="etc" || val["pbCategory"]=="onetouch" || val["pbCategory"]=="stick" || val["pbCategory"]=="vacuum" || val["pbCategory"]=="standzipper")
					{
						if(decopillcategory.indexOf(val["pbCategory"])!=-1){}
						else
						{
							decopillcategory+=val["pbCategory"];

							if(val["pbDefault"]=='Y' && isEmpty(_default_odpacktype))
							{
								_default_odpacktype = val["pbCode"];
							}
						}
					}
				}
				//console.log("í™˜ì œ íŒŒìš°ì¹˜..ì •ë¦¬í•˜ìž " , cfPouchbase, packcategory,  pillShapeDiv, val["pbCategory"], val["pbCode"],  val["pbTitle"], decopillcategory);
			}
			else if(selmatype=="powder" || selmatype=="herbal" || selmatype=="ointments")
			{
				decopillcategory+=val["pbCategory"];
				if(val["pbDefault"]=='Y' && isEmpty(_default_odpacktype))
				{
					_default_odpacktype = val["pbCode"];
				}
			}
			else
			{
				if(val["pbDefault"]=='Y' && isEmpty(_default_odpacktype))
				{
					_default_odpacktype = val["pbCode"];
				}
			}
			

			if((cfPouchbase=="share" && packcategory==val["pbCategory"]) || (cfPouchbase=="combine") || (!isEmpty(decopillcategory)&&decopillcategory.indexOf(val["pbCategory"])!=-1)) //ê°™ì€ ì¹´í…Œê³ ë¦¬ë§Œ ì •ë ¬ 
			{
				price=val["pbPrice"];

				stxt+='<option value="'+val["pbCode"]+'" data-img="'+val["afThumbUrl"]+'" data-price="'+price+'" data-option="'+val["pbOptionType"]+'" data-category="'+val["pbCategory"]+'" data-marking="'+val["pbCodeOnly"]+'" data-capa="'+val["pbCapa"]+'" data-maxcapa="'+val["pbMaxcnt"]+'"  data-mincapa="'+val["pbMincnt"]+'">'+val["pbTitle"]+'</option>';

				txt+='<dd id="packtypedd'+idx+'"  onclick="addPackTypeClass('+idx+');" value="'+val["pbCode"]+'" data-img="'+val["afThumbUrl"]+'" data-price="'+price+'" data-option="'+val["pbOptionType"]+'" data-category="'+val["pbCategory"]+'" data-marking="'+val["pbCodeOnly"]+'" data-capa="'+val["pbCapa"]+'" data-maxcapa="'+val["pbMaxcnt"]+'" data-mincapa="'+val["pbMincnt"]+'"><img src="'+val["afThumbUrl"]+'"><span>'+val["pbTitle"]+'</span></dd>';

				var packtypecapa=getpacktypedivon().data("capa");//$("select[name=packtype]").children("option:selected").data("capa");

				if(isEmpty(firstpacktype) && (parseInt(val["pbCapa"]) >= parseInt(packCapa)))
				{
					firstpacktype=val["pbCode"];
				}
			}
		});
		txt+="</dl>";
		$("#packtype").html(stxt);
		$("#packtypediv").html(txt);

		//console.log("viewpacktype _default_odpacktype = " + _default_odpacktype+", odpacktype = " + obj["odpacktype"]);

		if(!isEmpty(obj["odpacktype"]))
		{
			var exists=false;

			$('#packtypediv .packimg dd').each( function() { 
				var value = $(this).attr("value");
				if(value==obj["odpacktype"])
				{
					exists=true;
				}
			});

			//console.log("viewpacktype exists = " + exists);

			if(exists==true)
			{
				$("#packtype option[value="+obj["odpacktype"]+"]").attr("selected", "selected");

				setpacktypedivon(obj["odpacktype"]);
				
				$("input[name=odpacktype]").val(obj["odpacktype"]); //í¬ìž¥ìž¬ì½”ë“œ
				$("input[name=odpacktypetitle]").val(obj["odpacktypetitle"]); //í¬ìž¥ìž¬ëª…
				$("input[name=odpacktypeimg]").val(obj["odpacktypeimg"]); //í¬ìž¥ìž¬ì´ë¯¸ì§€ URL
				$("input[name=odpacktypeprice]").val(obj["odpacktypeprice"]); //ê°œë³„í¬ìž¥ìž¬ë¹„
				$("input[name=odmediboxcapa]").val(obj["odmediboxcapa"]); //ê°œë³„í¬ìž¥ìž¬ë¹„
				$("input[name=odpboptiontype]").val(obj["odpboptiontype"]); //íŒŒìš°ì¹˜ ì˜µì…˜ì¢…ë¥˜ ê°€ì ¸ì˜¤ê¸° by ì˜ì§„ 2021.11.30
				$("input[name=odpackcategory]").val(obj["odpackcategory"]); //í¬ìž¥ìž¬ì¹´í…Œê³ ë¦¬	
			}
			else
			{
				obj["odpacktype"]=_default_odpacktype;
			}
		}
		
		// íŒŒìš°ì¹˜ ë””í´íŠ¸ ê°’(ê´€ë¦¬ìž ê¸°ë³¸ê°’ ì„¤ì •) by ì˜ì§„ 2022.01.26
		if(!isEmpty(_default_odpacktype) || !isEmpty(obj["odpacktype"]))
		{
			if(!isEmpty(obj["odpacktype"])) _default_odpacktype = obj["odpacktype"];

			//console.log("_default_odpacktype = " + _default_odpacktype+", odpacktype = " + obj["odpacktype"]);

			$("#packtype option[value="+_default_odpacktype+"]").attr("selected", "selected");
			setpacktypedivon(_default_odpacktype);

			var imgurl=getpacktypedivon().data("img");//$("select[name=packtype]").children("option:selected").data("img");
			var packtypename=getpacktypedivon().children("span").text();//$("select[name=packtype]").children("option:selected").text();
			if(!isEmpty(imgurl)) $("#packtypeimg").html(getImgSrc(imgurl));
			if(!isEmpty(packtypename)) $("#packtypename").html(packtypename);	
		}


		//console.log("viewpacktype  getpacktypedivon : " + getpacktypedivon().attr("value"));

		//ì¹´í…Œê³ ë¦¬ í´ë¦­ì‹œì— _default_odpacktype obj["odpacktype"] ë°ì´í„°ê°€ ì—†ì„ì‹œì— ì²«ë²ˆì§¸ê»„ë¡œ ì²˜ë¦¬í•˜ê¸° ìœ„í•´ì„œ 
		if((isEmpty(_default_odpacktype) && isEmpty(obj["odpacktype"]) && !isEmpty(firstpacktype)) || (isEmpty(getpacktypedivon().attr("value")) && !isEmpty(firstpacktype)))
		{
			setpacktypedivon(firstpacktype);
			var imgurl=getpacktypedivon().data("img");//$("select[name=packtype]").children("option:selected").data("img");
			var packtypename=getpacktypedivon().children("span").text();//$("select[name=packtype]").children("option:selected").text();
			if(!isEmpty(imgurl)) $("#packtypeimg").html(getImgSrc(imgurl));
			if(!isEmpty(packtypename)) $("#packtypename").html(packtypename);
		}

		if(cfPouchbase=="share")
		{
			if(parseInt(chkstandcnt)>0)
			{
				$('#packcatestanding').show();
			}
			if(parseInt(chkspoutcnt)>0)
			{
				$('#packcatespout').show();
			}
			if(parseInt(chketccnt)>0)
			{
				$('#packcateetc').show();
			}
		}

 		changepacking('pack');
	}
	//íŒŒìš°ì¹˜ 
	function getpacktypedivon()
	{
		return $("#packtypediv .packimg dd.on");
	}
	function setpacktypedivon(odpacktype)
	{
		$("#packtypediv .packimg dd").removeClass("on");
		$('#packtypediv .packimg dd').each( function() { 
			var value = $(this).attr("value");
			if(value==odpacktype)
			{
				$(this).addClass("on");
			}
		});
	}
	function addPackTypeClass(idx)
	{
		var packCapa=$("select[name=packCapa]").children("option:selected").val();
		var maxcapa=$("#packtypedd"+idx).data("capa");//$("select[name=packtype]").children("option:selected").data("capa");
		var mincapa=$("#packtypedd"+idx).data("mincapa");//$("select[name=packtype]").children("option:selected").data("capa");
		var packCnt=$("select[name=packCnt]").val();
		var minpackcapa=$("#packtypedd"+idx).data("maxcapa");//íŒŒìš°ì¹˜ì—ì„œ ìµœì†ŒíŒ©ìˆ˜

		
		var selmatype=$("select[name=selmatype]").children("option:selected").val();	
		//$("#stickth").hide();
		//$("#sticktd").hide();
		$("#stickcapa").attr("disabled", true);
		if(selmatype=="decopill")
		{
			$("#selstickprt").attr("disabled", true);
			$("#stickprtimg").addClass("del");
			var category=$("#packtypedd"+idx).data("category");
			var matypeminsettingdata=$("textarea[name=matypeminsetting]").val();
			var selmatypecapa=0;
			var totCapa=$("#totCapa").data("medicapa");
			if(!isEmpty(matypeminsettingdata))
			{
				var matypeminsetting=JSON.parse(matypeminsettingdata);
				$.each(matypeminsetting,function(idx, val){
					if(val["code"]=="decopillstick")
					{
						selmatypecapa=val["data"];
						return false;
					}
				});
				selmatypecapa=parseInt(selmatypecapa);
			}
			//console.log("DOO :: 111 selmatypecapa = " + selmatypecapa);

			if(parseInt(selmatypecapa)>0&&parseInt(totCapa)>0&&parseInt(totCapa)>=parseInt(selmatypecapa))
			{
				if(category=="stick")
				{
					$("#stickcapa").removeAttr("disabled"); 
					$("#selstickprt").removeAttr("disabled"); 
					$("#stickprtimg").removeClass("del");					
					if(getCookie("mck_cfcode")=="hs")
					{
						$("#stickcapa").val("3");
					}
				}
				else
				{
					$("#stickcapa").val("");
					$("#selstickprt option[value=100]").attr("selected", "selected");
				}
			}
			else
			{
				$("#stickcapa").val("");
				$("#selstickprt option[value=100]").attr("selected", "selected");
				if(category=="stick")
				{
					alert("ìŠ¤í‹±í¬ìž¥ì€ ì•½ìž¬ "+selmatypecapa+"g ì´ìƒë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤.");
					return;
				}
				
			}
		}
		else
		{
			$("#stickcapa").val("");
			$("#stickprt option[value=100]").attr("selected", "selected");
		}
		

		//console.log("addPackTypeClass packCapa = "+packCapa+", maxcapa = " + maxcapa);
		mincapa=parseInt(mincapa);
		maxcapa=parseInt(maxcapa);
		packCapa=parseInt(packCapa);

		packCnt=parseInt(packCnt);
		minpackcapa=parseInt(minpackcapa);

		if(packCnt < minpackcapa)
		{
			$("select[name=packCnt]").val(packCnt);
			$("#packtypediv").hide();
			alert("[ì²˜ë°©ë¶ˆê°€] ì„ íƒí•˜ì‹  íŒŒìš°ì¹˜ì˜ ìµœì†ŒíŒ©ìˆ˜ëŠ” "+minpackcapa+"íŒ© ìž…ë‹ˆë‹¤.\në‹¤ì‹œ ì„ íƒí•´ ì£¼ì„¸ìš”.");
			return;
		}
	
		if(packCapa < mincapa)
		{
			if(getCookie("mck_cfcode")!="hm")
			{
				$("select[name=packCapa]").val(mincapa);			
				$("#packtypediv .packimg dd").removeClass("on");
				$("#packtypedd"+idx).addClass("on");
				//console.log("8888 changepacktype");
				changepacktype();
				$("#packtypediv").hide();
			}
			//console.log("33333");
			alert("[ì²˜ë°©ë¶ˆê°€] ì„ íƒí•˜ì‹  íŒŒìš°ì¹˜ì˜ ìµœì €ìš©ëŸ‰ì€ "+mincapa+"ml ìž…ë‹ˆë‹¤.\në‹¤ì‹œ ì„ íƒí•´ ì£¼ì„¸ìš”.");
			return;
		}
	
		if(packCapa > maxcapa)
		{
			alert("[ì²˜ë°©ë¶ˆê°€] ì„ íƒí•˜ì‹  íŒŒìš°ì¹˜ì˜ ìµœëŒ€ìš©ëŸ‰ì€ "+maxcapa+"ml ìž…ë‹ˆë‹¤.\në‹¤ì‹œ ì„ íƒí•´ ì£¼ì„¸ìš”.");
			return;
		}

		//console.log("idx = "+idx);
		$("#packtypediv .packimg dd").removeClass("on");
		$("#packtypedd"+idx).addClass("on");
		//console.log("9999 changepacktype");
		changepacktype();
		$("#packtypediv").hide();
	}
	//í•œì•½ë°•ìŠ¤
	function getboxmedidivon()
	{
		return $("#boxmedidiv .packimg dd.on");
	}
	function setboxmedidivon(boxmedi)
	{
		$("#boxmedidiv .packimg dd").removeClass("on");
		$('#boxmedidiv .packimg dd').each( function() { 
			var value = $(this).attr("value");
			if(value==boxmedi)
			{
				$(this).addClass("on");
			}
		});
	}
	function addBoxMediClass(idx)
	{
		var ck_cfcode=getCookie("mck_cfcode");
		if(ck_cfcode=="on")
		{
			var boxmincapa=$('#boxmedidd'+idx).data("mincapa");//getboxmedidivon().data("mincapa");
			var boxmaxcapa=$('#boxmedidd'+idx).data("capa");//getboxmedidivon().data("capa");
			var packCnt=$("select[name=packCnt]").val();
			//í•œì•½ë°•ìŠ¤ìµœì†Œ ìµœëŒ€ì— ë”°ë¼ íŒ©ìˆ˜ë¥¼  ì•Œë¦¼ì°½ 
			boxmincapa=parseInt(boxmincapa);
			boxmaxcapa=parseInt(boxmaxcapa);
			packCnt=parseInt(packCnt);
			//console.log("boxmincapa = " + boxmincapa+", boxmaxcapa = " + boxmaxcapa + ", packCnt = "+packCnt);

			if(boxmincapa > packCnt)
			{
				alert("[ì²˜ë°©ë¶ˆê°€] ì„ íƒí•˜ì‹  í•œì•½ë°•ìŠ¤ì˜ ìµœì €íŒ©ìˆ˜ì€ "+boxmincapa+"íŒ© ìž…ë‹ˆë‹¤.\në‹¤ì‹œ ì„ íƒí•´ ì£¼ì„¸ìš”.");
				return;
			}

			if(packCnt > boxmaxcapa)
			{
				alert("[ì²˜ë°©ë¶ˆê°€] ì„ íƒí•˜ì‹  í•œì•½ë°•ìŠ¤ì˜ ìµœëŒ€íŒ©ìˆ˜ì€ "+boxmaxcapa+"íŒ© ìž…ë‹ˆë‹¤.\në‹¤ì‹œ ì„ íƒí•´ ì£¼ì„¸ìš”.");
				resetCnt();
				return;
			}
		}

		//console.log("idx = "+idx);
		$("#boxmedidiv .packimg dd").removeClass("on");
		$("#boxmedidd"+idx).addClass("on");
		changepacking('medi');
		$("#boxmedidiv").hide();
	}
	//í¬ìž¥ë°•ìŠ¤
	function getboxdelidivon()
	{
		return $("#boxdelidiv .packimg dd.on");
	}
	function setboxdelidivon(boxdeli)
	{
		$("#boxdelidiv .packimg dd").removeClass("on");
		$('#boxdelidiv .packimg dd').each( function() { 
			var value = $(this).attr("value");
			if(value==boxdeli)
			{
				$(this).addClass("on");
			}
		});
	}
	function addBoxDeliClass(idx)
	{
		//console.log("idx = "+idx);
		$("#boxdelidiv .packimg dd").removeClass("on");
		$("#boxdelidd"+idx).addClass("on");
		changepacking('deli');
		$("#boxdelidiv").hide();
	}
	function changestickprt()
	{
		var selmatype=$("select[name=selmatype]").val();
		if((!isEmpty(selmatype)&&selmatype=='decopill') || (!isEmpty(selmatype)&&selmatype=='ointments')){}else{ return; }
		var code=$("select[name=selstickprt]").children("option:selected").data("code");
		var imgurl=$("select[name=selstickprt]").children("option:selected").data("img");
		var value=$("select[name=selstickprt]").children("option:selected").data("value");

		var cdvalue=decodeURI(value);
		var data="";
		if(!isEmpty(cdvalue))
		{
			var odTitle=$("input[name=odTitle]").val();
			odTitle=!isEmpty(odTitle)?odTitle:"í™˜ëª…";
			var mi_name=$("input[name=medicalName]").val();
			mi_name=!isEmpty(mi_name)?mi_name:"í•œì˜ì›ëª…";
			var mi_phone=$("input[name=medicalPhone]").val();
			mi_phone=!isEmpty(mi_phone)?mi_phone:"í•œì˜ì›ì—°ë½ì²˜";

			cdvalue = cdvalue.replace('[od_title]', odTitle);
			cdvalue = cdvalue.replace('[mi_name]', mi_name);
			cdvalue = cdvalue.replace('[mi_phone]', mi_phone);
		}
		else
		{
			cdvalue="";
		}
		$("#stickprtimg").html(getImgSrc(imgurl));
		$("#stickprtdata").html(cdvalue);
	}
	function chkstickmincapa()
	{
		var matypeminsettingdata=$("textarea[name=matypeminsetting]").val();
		var selmatypecapa=0;
		var totCapa=$("#totCapa").data("medicapa");

		if(!isEmpty(matypeminsettingdata))
		{
			var matypeminsetting=JSON.parse(matypeminsettingdata);
			$.each(matypeminsetting,function(idx, val){
				if(val["code"]=="decopillstick")
				{
					selmatypecapa=val["data"];
					return false;
				}
			});
			selmatypecapa=parseInt(selmatypecapa);
		}

		if(parseInt(selmatypecapa)>0&&parseInt(totCapa)>0&&parseInt(totCapa)>=parseInt(selmatypecapa))
		{
			return true;
		}
		return false;
	}
	///íŒŒìš°ì¹˜, í•œì•½ë°•ìŠ¤, ë°°ì†¡ë°•ìŠ¤ ì„ íƒì‹œ imageë¥¼ ë°”ê¿”ì£¼ê¸° ìœ„í•´ì„œ
	function changepacking(type)
	{
		var imgsrc=imgurl=title=price=code=capa=option=category="";
		var selmatype=$("select[name=selmatype]").children("option:selected").val();
		switch(type)
		{
		case "pack":
			code=getpacktypedivon().attr("value");//$("select[name=packtype]").children("option:selected").val();
			title=getpacktypedivon().children("span").text();//$("select[name=packtype]").children("option:selected").text();
			price=getpacktypedivon().data("price");//$("select[name=packtype]").children("option:selected").data("price");
			option=getpacktypedivon().data("option");//$("select[name=packtype]").children("option:selected").data("option"); // íŒŒìš°ì¹˜ ì˜µì…˜ì¢…ë¥˜ by ì˜ì§„ 2021.11.30
			imgurl=getpacktypedivon().data("img");//$("select[name=packtype]").children("option:selected").data("img");
			category=getpacktypedivon().data("category");//$("select[name=packtype]").children("option:selected").data("category"); // íŒŒìš°ì¹˜ ì¹´í…Œê³ ë¦¬ 
			imgsrc=(imgurl);
			$("#packtypeimg").html(getImgSrc(imgsrc));
			$("#packtypename").text(title);
			console.log("changepacking pack code = " + code+", category = " + category);
			if(!isEmpty(code))
			{
				$("input[name=odpacktypetitle]").val(title);
				$("input[name=odpacktypeprice]").val(price);
				$("input[name=odpacktype]").val(code);
				$("input[name=odpacktypeimg]").val(imgsrc);
				$("input[name=odpboptiontype]").val(option); // íŒŒìš°ì¹˜ ì˜µì…˜ì¢…ë¥˜ by ì˜ì§„ 2021.11.30
				$("input[name=odpackcategory]").val(category); // íŒŒìš°ì¹˜ ì¹´í…Œê³ ë¦¬
			}
			else
			{
				$("input[name=odpacktypetitle]").val("");
				$("input[name=odpacktypeprice]").val("");
				$("input[name=odpacktype]").val("");
				$("input[name=odpacktypeimg]").val("");
				$("input[name=odpboptiontype]").val("");
				$("input[name=odpackcategory]").val("");

				$("#packtypeimg").html('<img src="/assets/images/packbox_alert_nodata.png">');
				$("#packtypename").text('íŒŒìš°ì¹˜ê°€ ì—†ìŠµë‹ˆë‹¤.');
			}
			if(selmatype=="decopill")
			{
				if(category=="stick")
				{
					if(chkstickmincapa()==true)
					{
						//console.log("DOO :: 444444");
						$("#stickcapa").removeAttr("disabled"); 
						$("#selstickprt").removeAttr("disabled"); 
						$("#stickprtimg").removeClass("del");	
					}
				}
				else
				{
					$("#stickcapa").val("");
					$("#selstickprt option[value=100]").attr("selected", "selected");
				}
			}
			break;
		case "medi":
			code=getboxmedidivon().attr("value");//$("select[name=boxmedi]").children("option:selected").val();
			title=getboxmedidivon().children("span").text();//$("select[name=boxmedi]").children("option:selected").text();
			price=getboxmedidivon().data("price");//$("select[name=boxmedi]").children("option:selected").data("price");
			imgurl=getboxmedidivon().data("img");//$("select[name=boxmedi]").children("option:selected").data("img");
			capa=getboxmedidivon().data("capa");//$("select[name=boxmedi]").children("option:selected").data("capa");
			option=getboxmedidivon().data("option");//$("select[name=boxmedi]").children("option:selected").data("option");
			imgsrc=(imgurl);
			$("#boxmediimg").html(getImgSrc(imgsrc));
			$("#boxmediname").text(title);
			//console.log("changepacking medi code = " + code);
			if(!isEmpty(code))
			{
				$("input[name=odmediboxtitle]").val(title);
				$("input[name=odmediboxprice]").val(price);
				$("input[name=odmedibox]").val(code);
				$("input[name=odmediboximg]").val(imgsrc);
				$("input[name=odmediboxcapa]").val(capa);
				$("input[name=odmedipboptiontype]").val(option);
			}
			else
			{
				$("input[name=odmediboxtitle]").val("");
				$("input[name=odmediboxprice]").val("");
				$("input[name=odmedibox]").val("");
				$("input[name=odmediboximg]").val("");
				$("input[name=odmediboxcapa]").val("");
				$("input[name=odmedipboptiontype]").val("");

				if(getCookie("mck_cfcode")=="hs" && isEmpty(code))
				{
					$("#boxmediimg").html('<img src="/assets/images/packbox_alert.png">');
					$("#boxmediname").text('í•œì•½ë°•ìŠ¤ê°€ ì—†ìŠµë‹ˆë‹¤.');
				}
				else
				{
					$("#boxmediimg").html('<img src="/assets/images/packbox_alert_nodata.png">');
					$("#boxmediname").text('í•œì•½ë°•ìŠ¤ê°€ ì—†ìŠµë‹ˆë‹¤.');
				}
			}
			break;
		case "deli":
			code=getboxdelidivon().attr("value");//$("select[name=boxdeli]").children("option:selected").val();
			title=getboxdelidivon().children("span").text();//$("select[name=boxdeli]").children("option:selected").text();
			price=getboxdelidivon().data("price");//$("select[name=boxdeli]").children("option:selected").data("price");
			imgurl=getboxdelidivon().data("img");//$("select[name=boxdeli]").children("option:selected").data("img");
			imgsrc=(imgurl);
			$("#boxdeliimg").html(getImgSrc(imgsrc));
			$("#boxdeliname").text(title);
			//console.log("changepacking deli code = " + code);
			if(!isEmpty(code))
			{												
				$("input[name=odboxdelititle]").val(title);
				$("input[name=odboxdeliprice]").val(price);
				$("input[name=odboxdeli]").val(code);
				$("input[name=odboxdeliimg]").val(imgsrc);
			}
			else
			{
				$("input[name=odboxdelititle]").val("");
				$("input[name=odboxdeliprice]").val("");
				$("input[name=odboxdeli]").val("");
				$("input[name=odboxdeliimg]").val("");

				$("#boxdeliimg").html('<img src="/assets/images/packbox_alert_nodata.png">');
				$("#boxdeliname").text('í¬ìž¥ë°•ìŠ¤ê°€ ì—†ìŠµë‹ˆë‹¤.');
			}
			break;
		case "marking":
			code=$("select[name=odmrdesc]").children("option:selected").val();
			var desc=$("select[name=odmrdesc]").children("option:selected").data("desc");
			var value=$("select[name=odmrdesc]").children("option:selected").data("value");
			$("#markingdiv").html("<p>"+desc+"</p>");
			$("input[name=old_odmrdesc]").val(code);
			if(!isEmpty(value))
			{
				var cdvalue=decodeURI(value);
				var data="";
				if(!isEmpty(cdvalue)){

					cdvalue = cdvalue.replace('<br/>', ' + ');
					cdvalue = cdvalue.replace('<br/>', ' + ');
					cdvalue = cdvalue.replace('<br/>', ' + ');

					var od_code="";
					od_code=!isEmpty(od_code)?od_code:"ì£¼ë¬¸ë²ˆí˜¸";
					var od_name=$("input[name=patientname]").val();
					od_name=!isEmpty(od_name)?od_name:"í™˜ìžëª…";
					var mi_name=$("input[name=medicalName]").val();
					mi_name=!isEmpty(mi_name)?mi_name:"í•œì˜ì›ëª…";
					var mi_phone=$("input[name=medicalPhone]").val();
					mi_phone=!isEmpty(mi_phone)?mi_phone:"í•œì˜ì›ì—°ë½ì²˜";
					var ma_date="";
					ma_date=!isEmpty(ma_date)?ma_date:"ì¡°ì œì¼";
					var line1=$("input[name=mr_linetxt1]").val();
					line1=!isEmpty(line1)?'<div class="input"><input type="text" name="mr_linetxt1" id="mr_linetxt1" class="reqdata" value="'+line1+'" onchange="onchangemr(event, 1);" placeholder="ìµœëŒ€ 10ìž ê¹Œì§€ ìž…ë ¥ê°€ëŠ¥í•©ë‹ˆë‹¤." maxlength="10"/></div>':'<div class="input"><input type="text" name="mr_linetxt1" id="mr_linetxt1" class="reqdata" value="" onchange="onchangemr(event, 1);"  placeholder="ìµœëŒ€ 10ìž ê¹Œì§€ ìž…ë ¥ê°€ëŠ¥í•©ë‹ˆë‹¤." maxlength="10"/></div>';
					var line2=$("input[name=mr_linetxt2]").val();
					line2=!isEmpty(line2)?'<div class="input"><input type="text" name="mr_linetxt2" id="mr_linetxt2" class="reqdata" value="'+line2+'" onchange="onchangemr(event, 2);"  placeholder="ìµœëŒ€ 10ìž ê¹Œì§€ ìž…ë ¥ê°€ëŠ¥í•©ë‹ˆë‹¤." maxlength="10"/></div>':'<div class="input"><input type="text" name="mr_linetxt2" id="mr_linetxt2" class="reqdata" value="" onchange="onchangemr(event, 2);"  placeholder="ìµœëŒ€ 10ìž ê¹Œì§€ ìž…ë ¥ê°€ëŠ¥í•©ë‹ˆë‹¤." maxlength="10"/></div>';
					
					cdvalue = cdvalue.replace('[od_code]', od_code);
					cdvalue = cdvalue.replace('[re_name]', od_name);
					cdvalue = cdvalue.replace('[od_name]', od_name);
					cdvalue = cdvalue.replace('[mi_name]', mi_name);
					cdvalue = cdvalue.replace('[mi_phone]', mi_phone);
					cdvalue = cdvalue.replace('[ma_date]', ma_date);
					cdvalue = cdvalue.replace('[line1]', line1);
					cdvalue = cdvalue.replace('[line2]', line2);

				}
				$("#markinginput").html(cdvalue);
			}
			else
			{
				$("#markinginput").html("No Marking");
			}
			break;
		}

		var orderchange=$("#orderCreateModal").hasClass("orderchange");
		var option=$("#optionCreateModal").hasClass("option");
		if(orderchange==true || option==true){}
		else
		{		
			resetCnt();
		}
	}
	function chkmarkingtextreg(val)
	{
		var _bakvalue = val;
		var _value = val;

		//í•œê¸€,ìˆ«ìž,ì˜ì–´ì‚­ì œ
		_value=_value.replace(/[ê°€-íž£ã„±-ã…Žã…-ã…£a-zA-Z0-9]/gi, '');

		//íŠ¹ìˆ˜ë¬¸ìžì‚­ì œ ~!%*()_|-?,.<>{}[]/
		var reg=/[`~!%*()_|+\-?;:,.<>\{\}\[\]\\\/ ]/gim;
		_value=_value.replace(reg,'');

		if(!isEmpty(_value))
		{
			return false;
		}
		return true;
	}
	function onchangemr(evt, check)
	{
		var chkmr=chkmarkingtextreg(event.srcElement.value);
		if(chkmr==false)
		{
			alert("ë§ˆí‚¹ ìž…ë ¥ë¬¸êµ¬"+check+"ì€ ìˆ«ìž,ë¬¸ìž,íŠ¹ìˆ˜ë¬¸ìž ~!%*()_|-?,.<>{}[]/ ë§Œ ê°€ëŠ¥í•©ë‹ˆë‹¤.");
		}
	}
	function viewmarking(data, obj)
	{
		var ck_cfcode=getCookie("mck_cfcode");
		var odmrdesc=$("#odmrdesc").val();
		var selodmrdesc=$("input[name=old_odmrdesc]").val();
		var packmarking=getpacktypedivon().data("marking");//$("select[name=packtype]").children("option:selected").data("marking");
		var markingy=chkmarking="";

		var selmr_linetxt1=$("input[name=mr_linetxt1]").val();
		var selmr_linetxt2=$("input[name=mr_linetxt2]").val();

		//console.log("selmr_linetxt1 = "+selmr_linetxt1+",selmr_linetxt2 = " + selmr_linetxt2+", mrlinetxt1="+obj["mrlinetxt1"]+", mrlinetxt2="+obj["mrlinetxt2"]);

		if(!isEmpty(packmarking))
		{
			var markingarr=packmarking.split(",");
			var markinglist=new Array();
			for(var i=0;i<markingarr.length;i++)
			{
				var arr=markingarr[i].split("|");
				if(arr[1]=="Y")
				{
					markingy=arr[0];
				}
				if(ck_cfcode=="hs" && !isEmpty(obj["markType"]) && arr[0]==obj["markType"])
				{
					chkmarking="Y";
				}
				markinglist.push(arr[0]);
			}
		}
		//ë§ˆí‚¹
		$("#odmrdesc").html("");
		txt="";
		$.each(obj["mrDescList"], function(idx, val){
			if($.inArray(val["cdCode"], markinglist) != -1){
				txt+='<option value="'+val["cdCode"]+'" data-desc="'+val["cdDesc"]+'" data-value="'+encodeURI(val["cdValue"])+'">'+val["cdDesc"]+'</option>';	
			}
		});
		$("#odmrdesc").html(txt);
		if(!isEmpty(obj["markType"]))
		{
			if(!isEmpty(selodmrdesc))
			{
				$("#odmrdesc option[value="+selodmrdesc+"]").attr("selected", "selected");
				$("input[name=old_odmrdesc]").val(selodmrdesc);
			}
			else
			{
				if(ck_cfcode=="hs" && isEmpty(chkmarking) && !isEmpty(markingy))
				{
					$("#odmrdesc option[value="+markingy+"]").attr("selected", "selected");
					$("input[name=old_odmrdesc]").val(markingy);
				}
				else
				{
					$("#odmrdesc option[value="+obj["markType"]+"]").attr("selected", "selected");
					$("input[name=old_odmrdesc]").val(obj["markType"]);
				}
			}
			changepacking('marking');
		}
		else
		{
			if(!isEmpty(selodmrdesc))
			{
				$("#odmrdesc option[value="+selodmrdesc+"]").attr("selected", "selected");
				$("input[name=old_odmrdesc]").val(selodmrdesc);
			}
			else
			{
				if(!isEmpty(markingy))
				{
					$("#odmrdesc option[value="+markingy+"]").attr("selected", "selected");
					changepacking('marking');
					$("input[name=old_odmrdesc]").val(markingy);	
				}
			}
		}

		if(!isEmpty(selmr_linetxt1))
		{
			$("input[name=mr_linetxt1]").val(selmr_linetxt1);
		}
		else
		{
			$("input[name=mr_linetxt1]").val(obj["mrlinetxt1"]);
		}

		if(!isEmpty(selmr_linetxt2))
		{
			$("input[name=mr_linetxt2]").val(selmr_linetxt2);
		}
		else
		{
			$("input[name=mr_linetxt2]").val(obj["mrlinetxt2"]);
		}		
		
			
	}
	///íŒŒìš°ì¹˜, í•œì•½ë°•ìŠ¤, ë°°ì†¡ë°•ìŠ¤
	function viewpacking(data, obj)
	{
		//íŒŒìš°ì¹˜
		viewpacktype(data, obj);
		//í•œì•½ë°•ìŠ¤
		viewboxmedi(data,obj);
		//ë°°ì†¡ë°•ìŠ¤
		viewboxdeli(data,obj);
	}
	function clickpackCategory(obj, type)
	{
		var odmrdesc=$("#odmrdesc").val();
		//console.log("clickpackCategory  changepackcategory odmrdesc = " + odmrdesc);
		callapi("GET","goods",getdata("changepackcategory")+"&type="+type+"&odmrdesc="+odmrdesc);
	}
 	function changepacktype3(packtype, medibox)
	{
		var odmrdesc=$("#odmrdesc").val();
		var selmatype=$("select[name=selmatype]").children("option:selected").val();
		//console.log("changepacktype3 changepackcategory packtype = "+packtype+", medibox = "+medibox+", odmrdesc = " + odmrdesc);
		if(!isEmpty(packtype))
		{
			if(isEmpty(selmatype) && isNHIS=="NHISchart")
			{
				callapi("GET","goods",getdata("changepackcategory")+"&type=NHIS&selpacktype="+packtype+"&odmrdesc="+odmrdesc);
			}
			else
			{
				callapi("GET","goods",getdata("changepackcategory")+"&type="+selmatype+"&selpacktype="+packtype+"&odmrdesc="+odmrdesc+"&selmedibox="+medibox);
			}
		}
	}
 	function changepacktype2(packtype)
	{
		var odmrdesc=$("#odmrdesc").val();
		var selmatype=$("select[name=selmatype]").children("option:selected").val();
		//console.log("changepacktype2 changepackcategory packtype = "+packtype+", odmrdesc = " + odmrdesc);
		if(!isEmpty(packtype))
		{
			if(isEmpty(selmatype) && isNHIS=="NHISchart")
			{
				callapi("GET","goods",getdata("changepackcategory")+"&type=NHIS&selpacktype="+packtype+"&odmrdesc="+odmrdesc);
			}
			else
			{
				callapi("GET","goods",getdata("changepackcategory")+"&type="+selmatype+"&selpacktype="+packtype+"&odmrdesc="+odmrdesc);
			}
		}
	}
	function changepacktype()
	{
		var isNHIS=$('input[name="isNHIS"]').val();
		var packcategory=$('input[name="packCategory"]:checked').val();
		var selmatype=$("select[name=selmatype]").children("option:selected").val();		
		var packCapa=$("select[name=packCapa]").children("option:selected").val();
		var odmrdesc=$("#odmrdesc").val();

		var packtype=getpacktypedivon().attr("value");//$("select[name=packtype]").children("option:selected").val();
		var maxcapa=getpacktypedivon().data("capa");//$("select[name=packtype]").children("option:selected").data("capa");

		//console.log("changepacktype packtype = "+packtype + ", maxcapa = " + maxcapa+", odmrdesc = " + odmrdesc);

		maxcapa=parseInt(maxcapa);
		packCapa=parseInt(packCapa);

		//DOO::ìž ì‹œë‹¤ë¥¸ê³³ì´ë¡œì´ë™ í´ë¦­í•˜ëŠ”ê³³ìœ¼ë¡œ ì´ë™ 
		/*
		if(packCapa > maxcapa)
		{
			$("#packtype option:eq(0)").prop("selected", true);
			alert("[ì²˜ë°©ë¶ˆê°€] ì„ íƒí•˜ì‹  íŒŒìš°ì¹˜ì˜ ìµœëŒ€ìš©ëŸ‰ì€ "+maxcapa+"ml ìž…ë‹ˆë‹¤.\në‹¤ì‹œ ì„ íƒí•´ ì£¼ì„¸ìš”.");
			return;
		}
		*/

		//console.log("changepacktype changepackcategory packtype = "+packtype);
		if(!isEmpty(packtype))
		{
			if(isEmpty(selmatype) && isNHIS=="NHISchart")
			{
				callapi("GET","goods",getdata("changepackcategory")+"&type=NHIS&selpacktype="+packtype+"&odmrdesc="+odmrdesc);
			}
			else
			{
				callapi("GET","goods",getdata("changepackcategory")+"&type="+selmatype+"&selpacktype="+packtype+"&odmrdesc="+odmrdesc);
			}
		}
		else
		{
			if(selmatype=="decopill")
			{
				callapi("GET","goods",getdata("changepackcategory")+"&type=decopill&selpacktype="+packtype);
			}
		}
	}

	// í•œì•½ë°•ìŠ¤ í´ë¦­(ì¼ë°˜, ì—ì–´ìº¡, ì§„ê³µ, ì‹œí‹°ë¡œí¼) by ì˜ì§„ 2022.01.19
	function clickboxCategory(type)
	{		
		// ì„ íƒê°’		
		$("input:radio[name='boxCategory']:radio[value="+type+"]").prop('checked', true);
		// obj_packing ì „ì—­ë³€ìˆ˜
		viewboxmedi(obj_packing, '', type);
	}

	function viewchangepackcategory(obj)
	{
		viewpacktype(obj["packing"], obj);
		viewboxdeli(obj["packing"],obj); // ìŠ¤íƒ ë”©, ìŠ¤íŒŒìš°íŠ¸ ì„ íƒì‹œ í¬ìž¥ë°•ìŠ¤ ë‹¤ì‹œ ê·¸ë ¤ì£¼ê¸° by ì˜ì§„ 2021.10.26
		viewboxmedi(obj["packing"],obj); // í•œì•½ë°•ìŠ¤ ë‹¤ì‹œ ê·¸ë ¤ì£¼ê¸° by ì˜ì§„ 2021.11.30
		viewmarking(obj["mrDescList"], obj);//ë§ˆí‚¹ 
	}
	function getpackCategory()
	{
		return getpacktypedivon().data("category");
		//return $("select[name=packtype]").children("option:selected").data("category");
	}
	//******************************************************************************

	//******************************************************************************
	// DOO:: chartì™€ NHISchartì—ì„œ ë‹¹ë„,ë‹¹ë„ì„ íƒ,í–¥ê¸°,í–¥ê¸°ì„ íƒ,í’ˆì§ˆë³´ì¦ì„œ ê°™ì´ ì“°ìž„
	//******************************************************************************
	//ë‹¹ë„ì¶”ê°€
	function changesugarbrix()
	{
		var sugarbrix=$("#sugarbrix option:selected").val();
		var sugarkinds=$("#sugarkinds option:selected").val();
		//console.log("sugarbrix = " + sugarbrix);

		if(isEmpty(sugarbrix)) 
		{
			$("#sugarkinds option:eq(0)").prop("selected", true);
		}
		if(isEmpty(sugarkinds))
		{
			$("#sugarbrix option:eq(0)").prop("selected", true);
		}
		resetCnt();
	}
	//ë‹¹ë„ì„ íƒ
	function changesugarkinds()
	{
		var sugarkinds=$("#sugarkinds option:selected").val();
		if(!isEmpty(sugarkinds))
		{
			$("#sugarbrix").removeAttr("disabled");
		}
		else
		{
			$("#sugarbrix option:eq(0)").prop("selected", true);
			//$("#sugarbrix").attr("disabled","disabled");
		}
		resetCnt();
	}
	//í–¥ê¸°ì¶”ê°€
	function changeflavor()
	{
		var flavor=$("#flavor option:selected").val();
		if(isEmpty(flavor))
		{
			$("#flavorkinds option:eq(0)").prop("selected", true);
		}
		resetCnt();
	}
	//í–¥ê¸°ì„ íƒ
	function changeflavorkinds()
	{
		var flavorkinds=$("#flavorkinds option:selected").val();
		if(!isEmpty(flavorkinds))
		{
			$("#flavor").removeAttr("disabled");
		}
		else
		{
			$("#flavor option:eq(0)").prop("selected", true);
			//$("#flavor").attr("disabled","disabled");
		}
		resetCnt();
	}
	//******************************************************************************
	
	//******************************************************************************
	// DOO:: chartì™€ NHISchartì—ì„œ ì•½ìž¬ì´ˆê¸°í™” ê°™ì´ì“°ìž„ 
	//******************************************************************************
	function clearpatient(type)
	{
		if(type != 'tab-list'){ // íƒ­ì°½ ë¦¬ìŠ¤íŠ¸ í´ë¦­ì‹œ ì„¸íŒ…ëœ ì •ë³´ ì´ˆê¸°í™”X
			$("input[name=patientcode]").val("");
			$("input[name=patientname]").val("");
			$("input[name=patientgender]").val("");
			$("input[name=patientgendertxt]").val("");
			$("input[name=patientbirth]").val("");
			$("input[name=patientage]").val("");
			$("input[name=patientphone]").val("");
			$("input[name=patientmobile]").val("");
			$("input[name=patientzipcode]").val("");
			$("input[name=patientaddr]").val("");
			$("input[name=patientchartno]").val("");
			$("input[name=patientDiv]").val("");
			$("input[name=patientmedical]").val("");
			$("#patientmemo").val("");
			$("#beforememo").text("");
			$("#cautionadvice").val("");
		}

		removePatientClass();
		$("#ptlist").addClass("active");
		callapi("GET","patient",getdata("patientlist"));//í™”ë©´ì— 6ê°œë°–ì— ì•ˆë³´ìž„ 
	}
	function sortmedicine()
	{
		var mdarr=new Array();
		var sdarr=new Array();
		$("#meditbl tbody tr").each(function()
		{
			var mdType=$(this).data("type");
			var mediMaker=$(this).data("maker");
			var mediHerb=$(this).data("herb");
			var mmIsZero=$(this).data("iszero");
			var mmUnit=$(this).data("unit");
			var mmUse=$(this).data("use");
			var mediType=$(this).children("td").eq(6).find("select").val();//ì²˜ë°©íƒ€ìž…
			var mediCode=$(this).children("td").eq(0).find("input").val(); //ì•½ìž¬ì½”ë“œ
			var mediName=$(this).children("td").eq(1).find("span").text();//ì•½ìž¬ëª…
			var sublist=$(this).children("td").eq(1).find("textarea").text();//sublist 
			var mediPoison="";//ë…ì„± ( 0 , 1)
			var mediDismatch=""; //ìƒê·¹ ( 0 , 1)
			var mediOrigin="";//ì›ì‚°ì§€ì½”ë“œ
			var mediOriginTxt=$(this).children("td").eq(2).find("span.origin").text();//ì›ì‚°ì§€ëª… 
			var mediMakerTxt=$(this).children("td").eq(2).find("span.maker").text();//ì œì¡°ì‚¬ëª…  
			var mediCapa=$(this).children("td").eq(3).find("input").val();//ì²©ë‹¹ì•½ìž¬ëŸ‰
			var mediAmount=$(this).children("td").eq(5).find(".amount").attr("value");//ì²©ë‹¹ì•½ìž¬ë¹„
			var mediTotalAmount=$(this).children("td").eq(5).find(".amount").data("total");//í† íƒˆì•½ìž¬ë¹„
			var mediselcapa=$(this).children("td").eq(3).find("select").val();//ì²©ë‹¹ì•½ìž¬ëŸ‰

			//alert(code);
			//console.log("mediType = " + mediType);
			if(mdType=="sweet" || mdType=="alcohol")
			{
				var mdata={};
				mdata["mediType"]=mediType;
				mdata["mediHerb"]=mediHerb;
				mdata["mdType"]="sweet";
				mdata["mediCode"]=mediCode;
				mdata["mediName"]=mediName;
				mdata["mediPoison"]=mediPoison;
				mdata["mediDismatch"]=mediDismatch;
				mdata["mediOrigin"]=mediOrigin;
				mdata["mediOriginTxt"]=mediOriginTxt;
				mdata["mediMaker"]=mediMaker;
				mdata["mediMakerTxt"]=mediMakerTxt;
				mdata["mediCapa"]=mediCapa;
				mdata["mediAmount"]=mediAmount;
				mdata["mediTotalAmount"]=mediTotalAmount;
				mdata["mmIsZero"]=mmIsZero;
				mdata["mmUnit"]=mmUnit;
				mdata["mediselcapa"]=mediselcapa;
				mdata["mmUse"]=mmUse;
				if(!isEmpty(sublist))
				{
					mdata["sublist"]=JSON.parse(sublist);
				}
				else
				{
					mdata["sublist"]="";
				}

				sdarr.push(mdata);
			}
			else
			{
				var mdata={};
				mdata["mediType"]=mediType;
				mdata["mediHerb"]=mediHerb;
				mdata["mdType"]="medicine";
				mdata["mediCode"]=mediCode;
				mdata["mediName"]=mediName;
				mdata["mediPoison"]=mediPoison;
				mdata["mediDismatch"]=mediDismatch;
				mdata["mediOrigin"]=mediOrigin;
				mdata["mediOriginTxt"]=mediOriginTxt;
				mdata["mediMaker"]=mediMaker;
				mdata["mediMakerTxt"]=mediMakerTxt;
				mdata["mediCapa"]=mediCapa;
				mdata["mediAmount"]=mediAmount;
				mdata["mediTotalAmount"]=mediTotalAmount;
				mdata["mmIsZero"]=mmIsZero;
				mdata["mmUnit"]=mmUnit;
				mdata["mediselcapa"]=mediselcapa;
				mdata["mmUse"]=mmUse;
				if(!isEmpty(sublist))
				{
					mdata["sublist"]=JSON.parse(sublist);
				}
				else
				{
					mdata["sublist"]="";
				}

				mdarr.push(mdata);
			}

		});
		//ë†’ì€ìˆœìœ¼ë¡œ ì •ë ¬  
		mdarr.sort(function(a, b) { 
		    return parseFloat(a.mediCapa) > parseFloat(b.mediCapa) ? -1 : parseFloat(a.mediCapa) < parseFloat(b.mediCapa) ? 1 : 0;
		});

		$("#meditbl tbody tr td").each(function(){
			$(this).parent().remove();
		});
		var data=[];
		if(!isEmpty(mdarr))
		{
			$.each(mdarr,function(idx, val){
				data["mdCode"]=val["mediCode"];
				data["mediHerb"]=val["mediHerb"];
				data["mdType"]="medicine";
				data["mediType"]=val["mediType"];
				data["mdTitle"]=val["mediName"];
				data["mdOrigin"]=val["mediOriginTxt"];
				data["mdMaker"]=val["mediMakerTxt"];
				data["mdPrice"]=val["mediAmount"];
				data["mediCapa"]=val["mediCapa"];
				data["mediWater"]=val["mediWater"];
				data["mediOper"]=val["mediOper"];
				data["mmUse"]=val["mmUse"];				
				data["mediMaker"]=val["mediMaker"];
				data["mmIsZero"]=val["mmIsZero"];
				data["mmUnit"]=val["mmUnit"];
				data["mediselcapa"]=val["mediselcapa"];
				data["sublist"]=val["sublist"];
				addmeditbl(data);
			});
		}
		if(!isEmpty(sdarr))
		{
			$.each(sdarr,function(idx, val){
				data["mdCode"]=val["mediCode"];
				data["mediHerb"]=val["mediHerb"];
				data["mdType"]="sweet";
				data["mediType"]=val["mediType"];
				data["mdTitle"]=val["mediName"];
				data["mdOrigin"]=val["mediOriginTxt"];
				data["mdMaker"]=val["mediMakerTxt"];
				data["mdPrice"]=val["mediAmount"];
				data["mediCapa"]=val["mediCapa"];
				data["mediWater"]=val["mediWater"];
				data["mediOper"]=val["mediOper"];
				data["mmUse"]=val["mmUse"];				
				data["mediMaker"]=val["mediMaker"];
				data["mmIsZero"]=val["mmIsZero"];
				data["mmUnit"]=val["mmUnit"];
				data["mediselcapa"]=val["mediselcapa"];
				data["sublist"]=val["sublist"];
				addmeditbl(data);
			});
		}

	}
	function clearmedicine()
	{
		$("#meditbl tbody tr td").each(function(){
			$(this).parent().remove();
		});
		$("textarea[name=rcMedioper]").val("");
		$("input[name=odTitle]").val("");

		//ë‹¹ë„
		$("#sugarbrix option:eq(0)").prop("selected", true);
		//í–¥ê¸°
		$("#flavor option:eq(0)").prop("selected", true);
		//ë‹¹ë„ì„ íƒ
		$("#sugarkinds option:eq(0)").prop("selected", true);
		//í–¥ê¸°ì„ íƒ
		$("#flavorkinds option:eq(0)").prop("selected", true);
		//ìží•˜ê±°
		$("#zahager option:eq(0)").prop("selected", true);
		//ë…¹ìš©í‹´í¬ 
		$("#velvet option:eq(0)").prop("selected", true);

		resetCnt();
	}
	//******************************************************************************
	function viewchangeordertieddesc(obj)
	{
		if(!isEmpty(obj["receiveType"]))
		{
			//ë¶€ëª¨ì²˜ë°©ë²ˆí˜¸ 
			$("input[name=receiveTied]").val(obj["parentcode"]);
			//íƒë°°ì‚¬ì„ íƒ
			$("#deliverysel").val(obj["re_delicomp"]).attr("selected", "selected");
			//ë°°ì†¡í¬ë§ì¼
			$("input[name=deliveryDate]").val(obj["re_delidate"]);
			//ìˆ˜ì‹ ì¸ì„ íƒ
			$("input[name=reReceiverType]:input[value="+obj["receiveType"]+"]").prop("checked", true);
			//ìˆ˜ì‹ ì¸ì´ë¦„
			$("input[name=receiveName]").val(obj["re_name"]);
			//ìˆ˜ì‹ ì¸ì „í™”ë²ˆí˜¸
			$("input[name=receivePhone]").val(obj["re_phone"]);
			//ìˆ˜ì‹ ì¸íœ´ëŒ€í°
			$("input[name=receiveMobile]").val(obj["re_mobile"]);
			//ìˆ˜ì‹ ì¸ìš°íŽ¸ë²ˆí˜¸ 
			$("input[name=receiveZipcode]").val(obj["re_zipcode"]);
			//ìˆ˜ì‹ ì¸ì£¼ì†Œ 
			$("input[name=receiveAddress]").val(obj["re_address"]);
			//ìˆ˜ì‹ ì¸ ìƒì„¸ì£¼ì†Œ 
			$("input[name=receiveAddressDesc]").val(obj["re_addressdesc"]);

			changeordertieddata(true);
		}
		else
		{
			var reSendType = $('input[name=reSendType]:checked').val();
			$("input[name=reSendType]:input[value="+reSendType+"]").prop("checked", true).trigger("click");

			var reReceiverType = $('input[name=reReceiverType]:checked').val();
			$("input[name=reReceiverType]:input[value="+reReceiverType+"]").prop("checked", true).trigger("click");

			changeordertieddata(false);
			
			if(isEmpty(obj["parentcode"]))
			{
				$("input[name=receiveTied]").val("");
			}
			
		}

		if(obj["ordertypecode"]=="goods")
		{
			resetproductamount();
		}
		else
		{
		}	
	}

	function tomyrecipe(){
		if(!confirm("ë‚˜ì˜ ì²˜ë°©ìœ¼ë¡œ ì¶”ê°€í•˜ì‹œê² ìŠµë‹ˆê¹Œ?"))return false;
		callapi("POST","recipe",getdata("tomyrecipe"));
	}

	function advicePreview()
	{
		var editorData=CKEDITOR.instances.editor.getData();
		var orderAdvice=editorData;
		var mapForm = document.createElement("form");
			mapForm.target = "Map";
			mapForm.method = "POST";
			mapForm.action = "/inc/modal.advicepreview.php";
		var mapInput = document.createElement("input");
			mapInput.type = "text";
			mapInput.name = "orderAdviceBg";
			mapInput.value = $("#advicebg").val();
			mapForm.appendChild(mapInput);

		var mapInput = document.createElement("input");
			mapInput.type = "text";
			mapInput.name = "orderAdvice";
			mapInput.value = orderAdvice;
			mapForm.appendChild(mapInput);

		document.body.appendChild(mapForm);

		map = window.open("", "Map", "status=0,title=0,height=1000,width=900,scrollbars=1");

		if (map) {
			mapForm.submit();
		} else {
			alert('You must allow popups for this map to work.');
		}
	}

//ìƒì„¸
function viewboarddesc(obj)
{
	$(".addbtn").remove();
	$("#btn-area").fadeIn(0);
	$("#serach-area").fadeOut(0);
	$(".service__head").remove();
	$(".pagination").remove();
	var txt="<div class='desc'>";
		txt+="<div class='notice__item flex'>";
		//txt+="<span class='category'>ê³µì§€ì‚¬í•­</span>";
		txt+="<div class='txt'>";
		txt+="<h3>"+obj["bbTitle"]+"</h3>";
		txt+="</div>";
		txt+="<div class='date'>";
		txt+="<span>"+obj["bbModify"]+"</span>";
		txt+="</div>";
		if(getCookie("mck_cfcode") == "cy" || getCookie("mck_cfcode") == "hm"){
			txt+="<div class='date' style='margin-left:10px;'>";
			txt+="<span>ì¡°íšŒìˆ˜ : "+obj["bbHit"]+"</span>";
		}
		txt+="</div>";
		txt+="</div>";

		if(!isEmpty(obj["noticeimglist"]))
		{
			txt+="<div class='files'>"
			var i=0;
			$(obj["noticeimglist"]).each(function( index, value )
			{
				i++;
				txt+="<a href='javascript:download(\""+encodeURI(value["FilesubPop"])+"\",\""+encodeURI(value["FilesubPopName"])+"\");'><img src='/assets/images/icon/ic_download.png' style='width:60px;'>#ì²¨ë¶€íŒŒì¼ : "+value["FilesubPopName"]+"</a> ";
			});
			txt+="</div>"
		}

		// íŒŒì¼ë§í¬ ì¶”ê°€ by ì˜ì§„ 2021.11.22
		//if(obj["FilesubPop"])
		//{
		//	txt +='<div class="files"><a href="'+ obj["FilesubPop"]+'">ì²¨ë¶€íŒŒì¼ : '+obj["FilesubPopName"]+'</a><a href="'+ obj["FilesubPop"]+'">ì²¨ë¶€íŒŒì¼ : '+obj["FilesubPopName"]+'</a></div>';
		//}


		txt+="</div>";
		if(!isEmpty(obj["bbDesc"]))txt+="<div class='board-home'>"+obj["bbDesc"]+"</div>";
		if(!isEmpty(obj["afUrl"])){
			txt+="<div class='board-detail'><img src='"+obj["bbImgurl"]+"'></div>";
		}

		$("#contentsdiv").html(txt);

	//ì´ì „ ë‹¤ìŒë²„íŠ¼
	var data="<p class='addbtn'>";
	if(obj["egoseq"])
	{
		data+='<a href="javascript:goview('+ obj["egoseq"]+');" class="prev">ì´ì „</a>';
	}
	if(obj["nextseq"])
	{
		data+='<a href="javascript:goview('+ obj["nextseq"]+');" class="next">ë‹¤ìŒ</a>';
	}
	data+="</p>";
	$("#contentsdiv").after(data);
}


//ì²˜ë°© í™˜ìž ìˆ˜ì • ë²„íŠ¼ 
function setModalPatient(obj){
	$("input[name=meSeq]").val(obj["meSeq"]);
	$("input[name=apatientName]").val(obj['meName']);
	$("input[name=apatientHonor]").val(obj['meHonor']);
	$("input[name=apatientNickname]").val(obj['meNickname']);
	$("input[name=apatientChartno]").val(obj['meChartno']);
	$("input[name=apatientBrith]").val(obj['meBirth']);
	$("input[name=apatientRegistno]").val(obj['meRegistno']);
	$("select[name=apatientSex]").val(obj['meSex']);

	$("input[name=apatientPhone]").val(obj['mePhone']);
	$("input[name=apatientMobile]").val(obj['meMobile']);

	$("input[name=apatientZipcode]").val(obj["meZipcode"]);
	$("input[name=apatientAddress]").val(obj["meAddress0"]);
	$("input[name=apatientAddressDesc]").val(obj["meAddress1"]);

	$("input[name=apatientRemark]").val(obj["meRemark"]);


}

function getSibdan(amount)
{
	return parseInt(amount/10)*10;
}

function getNewTypePrice(type, chkunit)
{
	var newpricejson=$("textarea[name=newpricejson]").val();
	var newprice=0;
	if(!isEmpty(newpricejson))
	{
		var newpricedata=JSON.parse(newpricejson);
		var npricedata=null;
		switch(type)
		{
		//íƒ•ì œ
		case "making":
			newprice=newpricedata["making"];
			break;
		case "infirst":
			newprice=newpricedata["infirst"];
			break;
		case "inafter":
			newprice=newpricedata["inafter"];
			break;
		case "remaking_standing":
			newprice=newpricedata["remaking_standing"];
			break;
		case "remaking_spout":
			newprice=newpricedata["remaking_spout"];
			break;
		case "alcoholunit":
			newprice=newpricedata["alcohol"][0]["unit"];
			break;
		case "alcoholprice":
			newprice=newpricedata["alcohol"][0]["price"];
			break;
		case "alcoholpersonnel":
			newprice=newpricedata["alcoholpersonnel"];
			break;
		case "decoction":
			npricedata=newpricedata["decoction"];
			break;
		case "decoctionspout":
			npricedata=newpricedata["decoctionspout"];
			break;
		case "medicinecount":
			npricedata=newpricedata["medicinecount"];
			break;
		case "residue":
			newprice=newpricedata["residue"];
			break;
		case "decoctype":
			newprice=newpricedata["decoctype"];
			break;
		case "decoctype_spout":
			newprice=newpricedata["decoctype_spout"];
			break;
		case "distillation":
			npricedata=newpricedata["distillation"];
			break;
		case "dry":
			npricedata=newpricedata["dry"];
			break;
		case "packing_spout":
			npricedata=newpricedata["packing_spout"];
			break;
		case "packing_standing":
			npricedata=newpricedata["packing_standing"];
			break;
		case "packing_etc":
			npricedata=newpricedata["packing_etc"];
			break;

		
		//ë¡œì   íƒ•ì œ 
		case "delivery_logen":
			npricedata=newpricedata["delivery_logen"];
			break;
		//ë¡œì  _íŠ¹ìˆ˜í¬ìž¥
		case "delivery_logen_special":
			npricedata=newpricedata["delivery_logen_special"];
			break;
		//ë¡œì  _í™˜ì œ_ìƒˆë¡œìš´
		case "delivery_logen_decopill":
			npricedata=newpricedata["delivery_logen_decopill"];
			break;
		//ë¡œì  _ì—°ì¡°ì œ_ìƒˆë¡œìš´
		case "delivery_logen_ointments":
			npricedata=newpricedata["delivery_logen_ointments"];
			break;
		//ë¡œì  _ì‚°ì œ_ìƒˆë¡œìš´
		case "delivery_logen_powder":
			npricedata=newpricedata["delivery_logen_powder"];
			break;
		//ë¡œì  _í™˜ì œ
		//case "decopillprice_logen":
		//	newprice=newpricedata["decopillprice_logen"];
		//	break;
		//ë¡œì  _ì²©ì œ
		case "herbalprice_logen":
			newprice=newpricedata["herbalprice_logen"];
			break;
		//ë¡œì  _ì‚°ì œ
		//case "powderprice_logen":
		//	newprice=newpricedata["powderprice_logen"];
		//	break;
		//ë¡œì  _ì—°ì¡°ì œ_ìŠ¤í‹± 
		//case "ointmentsstick_logen":
		//	newprice=newpricedata["ointmentsstick_logen"];
		//	break;
		//ë¡œì  _ì—°ì¡°ì œ_ê°€ê²©
		//case "ointmentsprice_logen":
		//	newprice=newpricedata["ointmentsprice_logen"];
		//	break;
		//ë¡œì  _ì²©ì•½
		case "NHISprice_logen":
			newprice=newpricedata["NHISprice_logen"];
			break;
		//ë¡œì  _ì•½ì†
		case "goodsprice_logen":
			newprice=newpricedata["goodsprice_logen"];
			break;

		//ìš°ì²´êµ­_íƒ•ì œ 
		case "delivery_post":
			npricedata=newpricedata["delivery_post"];
			break;
		//ìš°ì²´êµ­_íŠ¹ìˆ˜í¬ìž¥ 
		case "delivery_post_special":
			npricedata=newpricedata["delivery_post_special"];
			break;
		//ìš°ì²´êµ­_í™˜ì œ_ìƒˆë¡œìš´
		case "delivery_post_decopill":
			npricedata=newpricedata["delivery_post_decopill"];
			break;
		//ìš°ì²´êµ­_ì—°ì¡°ì œ_ìƒˆë¡œìš´ 
		case "delivery_post_ointments":
			npricedata=newpricedata["delivery_post_ointments"];
			break;
		//ìš°ì²´êµ­_ì‚°ì œ_ìƒˆë¡œìš´ 
		case "delivery_post_powder":
			npricedata=newpricedata["delivery_post_powder"];
			break;
		//ìš°ì²´êµ­_í™˜ì œ
		//case "decopillprice_post":
		//	newprice=newpricedata["decopillprice_post"];
		//	break;
		//ìš°ì²´êµ­_ì²©ì œ
		case "herbalprice_post":
			newprice=newpricedata["herbalprice_post"];
			break;
		//ìš°ì²´êµ­_ì‚°ì œ
		//case "powderprice_post":
		//	newprice=newpricedata["powderprice_post"];
		//	break;
		//ìš°ì²´êµ­_ì—°ì¡°ì œ_ìŠ¤í‹± 
		//case "ointmentsstick_post":
		//	newprice=newpricedata["ointmentsstick_post"];
		//	break;
		//ìš°ì²´êµ­_ì—°ì¡°ì œ_ê°€ê²©
		//case "ointmentsprice_post":
		//	newprice=newpricedata["ointmentsprice_post"];
		//	break;
		//ìš°ì²´êµ­_ì²©ì•½
		case "NHISprice_post":
			newprice=newpricedata["NHISprice_post"];
			break;
		//ìš°ì²´êµ­_ì•½ì†
		case "goodsprice_post":
			newprice=newpricedata["goodsprice_post"];
			break;

		//CJ_íƒ•ì œ
		case "delivery_cj":
			npricedata=newpricedata["delivery_cj"];
			break;
		//CJ_íŠ¹ìˆ˜í¬ìž¥ 
		case "delivery_cj_special":
			npricedata=newpricedata["delivery_cj_special"];
			break;
		//CJ_í™˜ì œ_ìƒˆë¡œìš´
		case "delivery_cj_decopill":
			npricedata=newpricedata["delivery_cj_decopill"];
			break;
		//CJ_ì—°ì¡°ì œ_ìƒˆë¡œìš´
		case "delivery_cj_ointments":
			npricedata=newpricedata["delivery_cj_ointments"];
			break;
		//CJ_ì‚°ì œ_ìƒˆë¡œìš´
		case "delivery_cj_powder":
			npricedata=newpricedata["delivery_cj_powder"];
			break;

		//CJ_í™˜ì œ
		//case "decopillprice_cj":
		//	newprice=newpricedata["decopillprice_cj"];
		//	break;
		//CJ_ì²©ì œ
		case "herbalprice_cj":
			newprice=newpricedata["herbalprice_cj"];
			break;
		//CJ_ì‚°ì œ
		//case "powderprice_cj":
		//	newprice=newpricedata["powderprice_cj"];
		//	break;
		//CJ_ì—°ì¡°ì œ_ìŠ¤í‹± 
		//case "ointmentsstick_cj":
		//	newprice=newpricedata["ointmentsstick_cj"];
		//	break;
		//CJ_ì—°ì¡°ì œ_ê°€ê²©
		//case "ointmentsprice_cj":
		//	newprice=newpricedata["ointmentsprice_cj"];
		//	break;
		//CJ_ì²©ì•½
		case "NHISprice_cj":
			newprice=newpricedata["NHISprice_cj"];
			break;
		//CJ_ì•½ì†
		case "goodsprice_cj":
			newprice=newpricedata["goodsprice_cj"];
			break;

		//HPL_íƒ•ì œ
		case "delivery_hpl":
			npricedata=newpricedata["delivery_hpl"];
			break;
		//HPL_íŠ¹ìˆ˜í¬ìž¥ 
		case "delivery_hpl_special":
			npricedata=newpricedata["delivery_hpl_special"];
			break;
		//HPL_í™˜ì œ_ìƒˆë¡œìš´
		case "delivery_hpl_decopill":
			npricedata=newpricedata["delivery_hpl_decopill"];
			break;
		//HPL_ì—°ì¡°ì œ_ìƒˆë¡œìš´
		case "delivery_hpl_ointments":
			npricedata=newpricedata["delivery_hpl_ointments"];
			break;
		//HPL_ì‚°ì œ_ìƒˆë¡œìš´
		case "delivery_hpl_powder":
			npricedata=newpricedata["delivery_hpl_powder"];
			break;

		//HPL_í™˜ì œ
		//case "decopillprice_hpl":
		//	newprice=newpricedata["decopillprice_hpl"];
		//	break;
		//HPL_ì²©ì œ
		case "herbalprice_hpl":
			newprice=newpricedata["herbalprice_hpl"];
			break;
		//HPL_ì‚°ì œ
		//case "powderprice_hpl":
		//	newprice=newpricedata["powderprice_hpl"];
		//	break;
		//HPL_ì—°ì¡°ì œ_ìŠ¤í‹± 
		//case "ointmentsstick_hpl":
		//	newprice=newpricedata["ointmentsstick_hpl"];
		//	break;
		//HPL_ì—°ì¡°ì œ_ê°€ê²©
		//case "ointmentsprice_hpl":
		//	newprice=newpricedata["ointmentsprice_hpl"];
		//	break;
		//HPL_ì²©ì•½
		case "NHISprice_hpl":
			newprice=newpricedata["NHISprice_hpl"];
			break;
		//HPL_ì•½ì†
		case "goodsprice_hpl":
			newprice=newpricedata["goodsprice_hpl"];
			break;

		//ì§ì ‘ìˆ˜ë ¹_íƒ•ì œ
		case "delivery_pickup":
			npricedata=newpricedata["delivery_pickup"];
			break;
		//ì§ì ‘ìˆ˜ë ¹_íŠ¹ìˆ˜í¬ìž¥ 
		case "delivery_pickup_special":
			npricedata=newpricedata["delivery_pickup_special"];
			break;
		//ì§ì ‘ìˆ˜ë ¹_í™˜ì œ_ìƒˆë¡œìš´
		case "delivery_pickup_decopill":
			npricedata=newpricedata["delivery_pickup_decopill"];
			break;
		//ì§ì ‘ìˆ˜ë ¹_ì—°ì¡°ì œ_ìƒˆë¡œìš´
		case "delivery_pickup_ointments":
			npricedata=newpricedata["delivery_pickup_ointments"];
			break;
		//ì§ì ‘ìˆ˜ë ¹_ì‚°ì œ_ìƒˆë¡œìš´
		case "delivery_pickup_powder":
			npricedata=newpricedata["delivery_pickup_powder"];
			break;

		//ì§ì ‘ìˆ˜ë ¹_í™˜ì œ
		//case "decopillprice_pickup":
		//	newprice=newpricedata["decopillprice_pickup"];
		//	break;
		//ì§ì ‘ìˆ˜ë ¹_ì²©ì œ
		case "herbalprice_pickup":
			newprice=newpricedata["herbalprice_pickup"];
			break;
		//ì§ì ‘ìˆ˜ë ¹_ì‚°ì œ
		//case "powderprice_pickup":
		//	newprice=newpricedata["powderprice_pickup"];
		//	break;
		//ì§ì ‘ìˆ˜ë ¹_ì—°ì¡°ì œ_ìŠ¤í‹± 
		//case "ointmentsstick_pickup":
		//	newprice=newpricedata["ointmentsstick_pickup"];
		//	break;
		//ì§ì ‘ìˆ˜ë ¹_ì—°ì¡°ì œ_ê°€ê²©
		//case "ointmentsprice_pickup":
		//	newprice=newpricedata["ointmentsprice_pickup"];
		//	break;
		//ì§ì ‘ìˆ˜ë ¹_ì²©ì•½
		case "NHISprice_pickup":
			newprice=newpricedata["NHISprice_pickup"];
			break;
		//ì§ì ‘ìˆ˜ë ¹_ì•½ì†
		case "goodsprice_pickup":
			newprice=newpricedata["goodsprice_pickup"];
			break;

		//í€µ_íƒ•ì œ
		case "delivery_quick":
			npricedata=newpricedata["delivery_quick"];
			break;
		//í€µ_íŠ¹ìˆ˜í¬ìž¥ 
		case "delivery_quick_special":
			npricedata=newpricedata["delivery_quick_special"];
			break;
		//í€µ_í™˜ì œ_ìƒˆë¡œìš´
		case "delivery_quick_decopill":
			npricedata=newpricedata["delivery_quick_decopill"];
			break;
		//í€µ_ì—°ì¡°ì œ_ìƒˆë¡œìš´
		case "delivery_quick_ointments":
			npricedata=newpricedata["delivery_quick_ointments"];
			break;
		//í€µ_ì‚°ì œ_ìƒˆë¡œìš´
		case "delivery_quick_powder":
			npricedata=newpricedata["delivery_quick_powder"];
			break;

		//í€µ_í™˜ì œ
		//case "decopillprice_quick":
		//	newprice=newpricedata["decopillprice_quick"];
		//	break;
		//í€µ_ì²©ì œ
		case "herbalprice_quick":
			newprice=newpricedata["herbalprice_quick"];
			break;
		//í€µ_ì‚°ì œ
		//case "powderprice_quick":
		//	newprice=newpricedata["powderprice_quick"];
		//	break;
		//í€µ_ì—°ì¡°ì œ_ìŠ¤í‹± 
		//case "ointmentsstick_quick":
		//	newprice=newpricedata["ointmentsstick_quick"];
		//	break;
		//í€µ_ì—°ì¡°ì œ_ê°€ê²©
		//case "ointmentsprice_quick":
		//	newprice=newpricedata["ointmentsprice_quick"];
		//	break;
		//í€µ_ì²©ì•½
		case "NHISprice_quick":
			newprice=newpricedata["NHISprice_quick"];
			break;
		//í€µ_ì•½ì†
		case "goodsprice_quick":
			newprice=newpricedata["goodsprice_quick"];
			break;

		case "alcohol":
			npricedata=newpricedata["alcohol"];
			break;
		case "naeng":
			npricedata=newpricedata["naeng"];
			break;

		//ì²©ì•½
		case "NHISmkprice":
			newprice=newpricedata["NHISmkprice"];
			break;
		case "NHISpkprice":
			newprice=newpricedata["NHISpkprice"];
			break;
		case "NHISdcprice":
			newprice=newpricedata["NHISdcprice"];
			break;

		//ì²©ì œ 
		case "herbalprice"://ì²©ì œê¸°ë³¸ë£Œ 
			newprice=newpricedata["herbalprice"];
			break;
		case "herbalonechupprice"://ì²©ì œ1ì²©í¬ìž¥ë¹„
			newprice=newpricedata["herbalonechupprice"];
			break;
		case "herbaltwochupprice"://ì²©ì œ2ì²©í¬ìž¥ë¹„
			newprice=newpricedata["herbaltwochupprice"];
			break;
		case "herbalallprice"://ì²©ì œì¼ê´„í¬ìž¥ë¹„
			newprice=newpricedata["herbalallprice"];
			break;
		//case "herbalrepirce"://ì²©ì œë°°ì†¡ë¹„
		//	newprice=newpricedata["herbalrepirce"];
		//	break;
		
		//ì‚°ì œ 
		case "powderprice_c":
			newprice=newpricedata["powderprice_c"];
			break;
		case "powderprice_p":
			newprice=newpricedata["powderprice_p"];
			break;
		case "powdermkprice_mise_c":
			newprice=newpricedata["powdermkprice_mise_c"];
			break;
		case "powdermkprice_mise_p":
			newprice=newpricedata["powdermkprice_mise_p"];
			break;
		case "powdermkprice_cho_c":
			newprice=newpricedata["powdermkprice_cho_c"];
			break;
		case "powdermkprice_cho_p":
			newprice=newpricedata["powdermkprice_cho_p"];
			break;
		case "powderpakprice_c":
			newprice=newpricedata["powderpakprice_c"];
			break;
		case "powderpakprice_p":
			newprice=newpricedata["powderpakprice_p"];
			break;
		//case "powderrepirce":
		//	newprice=newpricedata["powderrepirce"];
		//	break;

		//í™˜ì œ_ì œí™˜ë¹„_ìƒˆë¡œìš´
		case "decopillprice":
			npricedata=newpricedata["decopillprice"];
			break;
		//í™˜ì œ_í¬ìž¥ë¹„_ìƒˆë¡œìš´
		case "decopillpakprice":
			npricedata=newpricedata["decopillpakprice"];
			break;
		//í™˜ì œ_ì œí™˜ë¹„í• ì¸_ìƒˆë¡œìš´
		case "decopilldiscountprice":
			npricedata=newpricedata["decopilldiscountprice"];
			break;
		//í™˜ì œ ì œí™˜ë¹„ ìµœì†ŒëŸ‰ 
		case "decopill_minimum_c":
			newprice=newpricedata["decopill_minimum_c"];
			break;
		//ì‚°ì œ ì œë¶„ë¹„ ìµœì†ŒëŸ‰ 
		case "powder_minimum_c":
			newprice=newpricedata["powder_minimum_c"];
			break;

		//í™˜ì œ 
		//case "decopillprice_c":
		//	newprice=newpricedata["decopillprice_c"];
		//	break;
		//case "decopillprice_p":
		//	newprice=newpricedata["decopillprice_p"];
		//	break;
		//case "decopillpakprice_c":
		//	newprice=newpricedata["decopillpakprice_c"];
		//	break;
		//case "decopillpakprice_p":
		//	newprice=newpricedata["decopillpakprice_p"];
		//	break;
		//case "decopillrepirce":
		//	newprice=newpricedata["decopillrepirce"];
		//	break;


		//ì—°ì¡°ì œ 
		case "ointmentsprice":
			npricedata=newpricedata["ointmentsprice"];
			break;
		//case "ointmentsrepirce_c":
		//	newprice=newpricedata["ointmentsrepirce_c"];
		//	break;
		//case "ointmentsrepirce_p":
		//	newprice=newpricedata["ointmentsrepirce_p"];
		//	break;
		case "ointmentsalcohol_c":
			newprice=newpricedata["ointmentsalcohol_c"];
			break;
		case "ointmentsalcohol_p":
			newprice=newpricedata["ointmentsalcohol_p"];
			break;
		//ì—°ì¡°ì œí¬ìž¥ë¹„ 
		case "ointmentspakprice":
			npricedata=newpricedata["ointmentspakprice"];
			break;
		
		//ì•½ì†
		//ë¬´ë£Œë°°ì†¡ 
		case "freedelivery":
			newprice=newpricedata["freedelivery"];
			break;

		//ì†Œë…¹ë‘ëŒ€ 
		case "nokttudae_wheat_p":
			newprice=newpricedata["nokttudae_wheat_p"];
			break;
		case "nokttudae_glutinousrice_p":
			newprice=newpricedata["nokttudae_glutinousrice_p"];
			break;
		case "nokttudae_singokpul_p":
			newprice=newpricedata["nokttudae_singokpul_p"];
			break;
		case "nokttudae_kyoi_p":
			newprice=newpricedata["nokttudae_kyoi_p"];
			break;
		case "nokttudae_honey_p":
			newprice=newpricedata["nokttudae_honey_p"];
			break;
		case "nokttudae_kyoi1_p":
			newprice=newpricedata["nokttudae_kyoi1_p"];
			break;
		case "nokttudae_water_p":
			newprice=newpricedata["nokttudae_water_p"];
			break;
 		case "nokttudae_tanjadaehoney_p":
			newprice=newpricedata["nokttudae_tanjadaehoney_p"];
			break;
		//ë…¹ë‘ëŒ€ 
		case "nokttudae1_wheat_p":
			newprice=newpricedata["nokttudae1_wheat_p"];
			break;
		case "nokttudae1_glutinousrice_p":
			newprice=newpricedata["nokttudae1_glutinousrice_p"];
			break;
		case "nokttudae1_singokpul_p":
			newprice=newpricedata["nokttudae1_singokpul_p"];
			break;
		case "nokttudae1_kyoi_p":
			newprice=newpricedata["nokttudae1_kyoi_p"];
			break;
		case "nokttudae1_honey_p":
			newprice=newpricedata["nokttudae1_honey_p"];
			break;
		case "nokttudae1_kyoi1_p":
			newprice=newpricedata["nokttudae1_kyoi1_p"];
			break;
		case "nokttudae1_water_p":
			newprice=newpricedata["nokttudae1_water_p"];
			break;
 		case "nokttudae1_tanjadaehoney_p":
			newprice=newpricedata["nokttudae1_tanjadaehoney_p"];
			break;
		//ì˜¤ìžëŒ€ 
		case "ojadae_wheat_p":
			newprice=newpricedata["ojadae_wheat_p"];
			break;
		case "ojadae_glutinousrice_p":
			newprice=newpricedata["ojadae_glutinousrice_p"];
			break;
		case "ojadae_singokpul_p":
			newprice=newpricedata["ojadae_singokpul_p"];
			break;
		case "ojadae_kyoi_p":
			newprice=newpricedata["ojadae_kyoi_p"];
			break;
		case "ojadae_honey_p":
			newprice=newpricedata["ojadae_honey_p"];
			break;
		case "ojadae_kyoi1_p":
			newprice=newpricedata["ojadae_kyoi1_p"];
			break;
		case "ojadae_water_p":
			newprice=newpricedata["ojadae_water_p"];
			break;
 		case "ojadae_tanjadaehoney_p":
			newprice=newpricedata["ojadae_tanjadaehoney_p"];
			break;
		//ì€ë‹¨ëŒ€ 
		case "eundandae_wheat_p":
			newprice=newpricedata["eundandae_wheat_p"];
			break;
		case "eundandae_glutinousrice_p":
			newprice=newpricedata["eundandae_glutinousrice_p"];
			break;
		case "eundandae_singokpul_p":
			newprice=newpricedata["eundandae_singokpul_p"];
			break;
		case "eundandae_kyoi_p":
			newprice=newpricedata["eundandae_kyoi_p"];
			break;
		case "eundandae_honey_p":
			newprice=newpricedata["eundandae_honey_p"];
			break;
		case "eundandae_kyoi1_p":
			newprice=newpricedata["eundandae_kyoi1_p"];
			break;
		case "eundandae_water_p":
			newprice=newpricedata["eundandae_water_p"];
			break;
 		case "eundandae_tanjadaehoney_p":
			newprice=newpricedata["eundandae_tanjadaehoney_p"];
			break;
		//íƒ„ìžëŒ€ 
		case "tanjadae_wheat_p":
			newprice=newpricedata["tanjadae_wheat_p"];
			break;
		case "tanjadae_glutinousrice_p":
			newprice=newpricedata["tanjadae_glutinousrice_p"];
			break;
		case "tanjadae_singokpul_p":
			newprice=newpricedata["tanjadae_singokpul_p"];
			break;
		case "tanjadae_kyoi_p":
			newprice=newpricedata["tanjadae_kyoi_p"];
			break;
		case "tanjadae_honey_p":
			newprice=newpricedata["tanjadae_honey_p"];
			break;
		case "tanjadae_kyoi1_p":
			newprice=newpricedata["tanjadae_kyoi1_p"];
			break;
		case "tanjadae_water_p":
			newprice=newpricedata["tanjadae_water_p"];
			break;
 		case "tanjadae_tanjadaehoney_p":
			newprice=newpricedata["tanjadae_tanjadaehoney_p"];
			break;
		//ì•µë‘ëŒ€ 
		case "aengdudae_wheat_p":
			newprice=newpricedata["aengdudae_wheat_p"];
			break;
		case "aengdudae_glutinousrice_p":
			newprice=newpricedata["aengdudae_glutinousrice_p"];
			break;
		case "aengdudae_singokpul_p":
			newprice=newpricedata["aengdudae_singokpul_p"];
			break;
		case "aengdudae_kyoi_p":
			newprice=newpricedata["aengdudae_kyoi_p"];
			break;
		case "aengdudae_honey_p":
			newprice=newpricedata["aengdudae_honey_p"];
			break;
		case "aengdudae_kyoi1_p":
			newprice=newpricedata["aengdudae_kyoi1_p"];
			break;
		case "aengdudae_water_p":
			newprice=newpricedata["aengdudae_water_p"];
			break;
		case "aengdudae_tanjadaehoney_p":
			newprice=newpricedata["aengdudae_tanjadaehoney_p"];
			break;
		//ë†ì¶•í™˜ë¹„ìš©
		case "concentprice_basic_c":
			newprice=newpricedata["concentprice_basic_c"];
			break;
		case "concentprice_basic_p":
			newprice=newpricedata["concentprice_basic_p"];
			break;
		case "concentprice_gram_p":
			newprice=newpricedata["concentprice_gram_p"];
			break;
		}

		if(!isEmpty(npricedata))
		{
			var len=npricedata.length;
			for(var i=0;i<len;i++)
			{
				if((parseInt(chkunit) <= parseInt(npricedata[i]["unit"])))
				{
					newprice=npricedata[i]["price"];
					break;
				}
				else if(i>0)
				{
					if(parseInt(npricedata[i-1]["unit"]) > parseInt(chkunit) && parseInt(chkunit) <= parseInt(npricedata[i]["unit"]))
					{
						newprice=npricedata[i]["price"];
						break;
					}
					else if(((len-1)==i) && parseInt(npricedata[len-1]["unit"]) < parseInt(chkunit))
					{
						newprice=npricedata[i]["price"];
						break;
					}
				}
				else
				{
					if((len==1) && i==0)
					{
						newprice=npricedata[i]["price"];
						break;
					}
				}
			}
		}
	}
	return newprice;
}

function getIconPersonalcontrol(width, title)
{
	var iconstyle="";
	if(!isEmpty(width))
	{
		//iconstyle="style='width:"+width+"px;'";
	}
	return "<img src=\"/assets/images/inew_personalcontrol.png\" title=\""+title+"\" class=\"m-auto\" "+iconstyle+">";
}
function getIconMemo(width, title)
{
	var iconstyle="";
	if(!isEmpty(width))
	{
		//iconstyle="style='width:"+width+"px;'";
	}
	return "<img src=\"/assets/images/inew_memo.png\" title=\""+title+"\" class=\"m-auto\" "+iconstyle+">";
}
function getIconUpdate(width, title)
{
	var iconstyle="";
	if(!isEmpty(width))
	{
		//iconstyle="style='width:"+width+"px;'";
	}
	return "<img src=\"/assets/images/inew_update.png\" title=\""+title+"\" class=\"m-auto\" "+iconstyle+" >";
}
function getIconDel()
{
	return "<img src=\"/assets/images/inew_del.png\" title=\"ì‚­ì œ\" class=\"m-auto\">";
}
function getIconView()
{
	return "<img src=\"/assets/images/inew_view.png\" title=\"ë³´ê¸°\" class=\"m-auto\">";
}
function getIconBookmark()
{
	return "<img src=\"/assets/images/inew_bookmark.png\" title=\"ì¦ê²¨ì°¾ê¸°\" class=\"m-auto\">";
}
function getIconAuthority()
{
	return "<img src=\"/assets/images/inew_authority.png\" title=\"ê¶Œí•œ\" class=\"m-auto\">";
}
function getIconTransportation()
{
	return "<img src=\"/assets/images/inew_transportation.png\" title=\"ë°°ì†¡ì¡°íšŒ\" class=\"m-auto\">";
}

	//ì²˜ë°©ë³„ë°°ì†¡ì¶”ê°€ì¼
	function addMatypeDay(deliday)
	{
		var maType=$("input[name=maType]").val();
		if(isEmpty(maType))maType=$("input[name=matype]").val();
		var selmatype=$("select[name=selmatype]").children("option:selected").val();
		if(maType!="decoction"){
			var odtype=maType;
		}else{
			var odtype=selmatype;
		}
		var deliveryDate=addMatypeDaydetail(odtype, deliday);
		return deliveryDate;
	}
	function addMatypeDaydetail(odtype, deliday)
	{
		var basedeliday=1;
		if(!isEmpty($("textarea[name=exdeliverydate]").val()))
		{
			var exdeliverydate=JSON.parse($("textarea[name=exdeliverydate]").val());
			$.map( exdeliverydate, function( val, i ) {
				if(val["code"]==odtype){
					basedeliday=val["data"];
					return;
				}
			});
		}
		basedeliday=parseInt(basedeliday);
		var now = new Date();	// í˜„ìž¬ ë‚ ì§œ ë° ì‹œê°„
		var oneDayLater = new Date(now.setDate(now.getDate() + basedeliday + deliday));
		var year = oneDayLater.getFullYear();
		var month = new String(oneDayLater.getMonth()+1);
		var day = new String(oneDayLater.getDate());
		var deliveryDate = year + "." + pad(month,2) + "." + pad(day,2);
		return deliveryDate;
	}

	//ë‚ ì§œí”ŒëŸ¬ìŠ¤
	function addDay(sdate, cnt, code)
	{
		var delidate=$("input[name=deliveryDate]").val();
		var basicDelidate="";
		$("#delidatelist").remove();
		var listdate="<dl id='delidatelist'>";
		var holidays="";
		var holidaysall="";
		if(!isEmpty($("textarea[name=deliveryHolidays]").val()))
		{
			var deliverysel=$("select[name=deliverysel]").val();
			var delicomp=$("#cartSelectList tbody tr").eq(0).attr("data-delitype");
			if(isEmpty(deliverysel))deliverysel=delicomp;

			holidaysall=JSON.parse($("textarea[name=deliveryHolidays]").val());
			//console.log(holidaysall);

			if(!isEmpty(holidaysall) && !isEmpty(holidaysall[deliverysel]))
			{
				holidays=(holidaysall[deliverysel]);
			}
			else
			{
				holidays=(holidaysall["before"]);
			}
			//console.log(holidays);
		}
		var arr=sdate.split(".");
		var date = new Date(arr[0],arr[1]-1,arr[2],0,0,0);
		for(var n=0;n<=cnt;n++){
			var year = date.getFullYear();
			var month = new String(date.getMonth()+1);
			var day = new String(date.getDate());
			if($.inArray(year+"-"+pad(month,2)+"-"+pad(day,2),holidays) > -1){
				var deny="deny";var onclick="";
			}else{
				if(basicDelidate=="")basicDelidate=year+"."+pad(month,2)+"."+pad(day,2);
				if(code.substr(0, 5)=="cart|")
				{
					var codearr=code.split("|");
					var deny="";var onclick="setcartDelidate('"+codearr[1]+"','"+year+"."+pad(month,2)+"."+pad(day,2)+"')";
				}
				else
				{
					var deny="";var onclick="setDelidate('"+year+"."+pad(month,2)+"."+pad(day,2)+"')";
				}
			}
			var theday=year+"."+pad(month,2)+"."+pad(day,2);
			if(delidate==theday){var clson=" on";}else{var clson=" ";}
			listdate+="<dd class='"+deny+clson+"' onclick=\""+onclick+"\">"+theday+"</dd>";
			date.setDate(date.getDate()+1);
		}
		listdate+="</dl>"
		if(code=="basic"){
			$("input[name=deliveryDate]").val(basicDelidate);
		}else if(code=="date"){
			if(delidate < basicDelidate){
				$("input[name=deliveryDate]").val(basicDelidate);
				var ck_cfcode=getCookie("mck_cfcode");
				if(ck_cfcode!="cy")
				{
					alert("ì´ì „ì— ì„ íƒí•˜ì‹  ë°°ì†¡ìš”ì²­ì¼ì´ ë¶ˆê°€í•˜ì—¬\nê°€ëŠ¥í•œ ë‚ ì§œë¡œ ë³€ê²½ë©ë‹ˆë‹¤.");
				}
			}
		}else{
			if(!isEmpty(codearr))
			{
				$("#deliveryDate"+codearr[1]).parents("td").css("background-color","#ccc");
				$("#deliveryDate"+codearr[1]).addClass("delidiv");
				$("#deliveryDate"+codearr[1]).html(listdate);
			}
			else
			{
				$("#deliveryDate").before(listdate);
			}

		}
		return;
	}

	function setDelidate(date){
		$("#delidatelist").remove();
		$("input[name=exdeliverydate]").val(date);
		$("input[name=deliveryDate]").val(date);
	}

	function getdelitime(odtype, delitype, chknaengchim)
	{
		var limitTime=0;
		var ck_cfcode=getCookie("mck_cfcode");
		var limithourdata=$("textarea[name=limithour]").val();
		var limithour="";
		if(!isEmpty(limithourdata))
		{
			var limithour=JSON.parse(limithourdata);
		}
		//í˜„ìž¬ìš”ì¼
		var weekarr=getNowDay();
		var week=weekarr[0];
		//í˜„ìž¬ì‹œê°„
		var ntime=parseInt(getNowTime().substring(8,12));
		
		if(chknaengchim=="Y")//ëƒ‰ì¹¨ì¼ê²½ìš° +6 hour
		{
			ntime=ntime+600;
		}
		if(!isEmpty(limithour)) //DOO::jqueryì—ëŸ¬ë‚˜ì„œ ì¶”ê°€ 
		{
			$(limithour).each(function(idx, val){
				if(val["type"]==odtype){
					if(!isEmpty(val["data"]))  //DOO::jqueryì—ëŸ¬ë‚˜ì„œ ì¶”ê°€ 
					{
						$(val["data"]).each(function(idx2, val2){
							//console.log("delicomp = "+ val2["delicomp"]+", delitype = " + delitype);
							if(!isEmpty(val2["delicomp"])&&!isEmpty(delitype)&&val2["delicomp"].toLowerCase()==delitype.toLowerCase()){
								if(val2["week"].indexOf(week) > -1){
									limitTime=parseInt(val2["hour"]);
								}
							}
						});
					}
				}
			});
		}
		//console.log("ntime = " + ntime +", limitTime = " + limitTime);
		if(ntime < limitTime){//í¬í•¨ì•ˆë˜ëŠ”ê²½ìš°ëŠ” +1
			return 0;
		}else{
			return 1;
		}
	}


	//ë°°ì†¡ì¶œê³ ì¼ ì§€ì •
	function getdelitype(){
		var maType=$("input[name=maType]").val();
		if(isEmpty(maType))maType=$("input[name=matype]").val();
		var selmatype=$("select[name=selmatype]").val();
		if(isEmpty(selmatype))selmatype=$("input[name=selmatype]").val();
		if(maType!="decoction"){
			var odtype=maType;
		}else{
			if(!isEmpty(selmatype))
			{
				var odtype=selmatype;
			}
			else
			{
				var odtype=maType;
			}
		}
		var seldelitype=$("select[name=deliverysel]").val();
		var delitype="";
		if(!isEmpty(seldelitype))
		{
			delitype=seldelitype;
		}
		else
		{
			var delicomp=$("input[name=orderDelivery]").val();
			delitype=delicomp;
		}
		//ëƒ‰ì¹¨ 
		var chknaengchim="N";
		if($("input:checkbox[name='naengchim']").is(":checked")==true)
		{
			chknaengchim="Y";
		}
		var chktime=getdelitime(odtype, delitype, chknaengchim);
		return chktime;
	}

	function getdelidate(code){
		var matype=$("input[name=maType]").val();
		if(isEmpty(matype))matype=$("input[name=matype]").val();
		var selmatype=$("select[name=selmatype]").val();
		if(isEmpty(selmatype))selmatype=$("input[name=selmatype]").val();
		var seldelitype=$("select[name=deliverysel]").val();

		if(matype!="decoction"){
			var odtype=matype;
		}else{
			if(!isEmpty(selmatype))
			{
				var odtype=selmatype;
			}
			else
			{
				var odtype=matype;
			}
		}
		if(!isEmpty(odtype) && !isEmpty(seldelitype))
		{
			addDay(addMatypeDay(getdelitype()), 31, code);
		}
	}

	function getcartdelidate(seq,odtype,delitype,chknaengchim)//odtype í™•ì¸ í•„ìš”
	{
		var time=getdelitime(odtype, delitype, chknaengchim);
		addDay(addMatypeDaydetail(odtype, time), 31, "cart|"+seq);
	}

	function setcartDelidate(seq, date)
	{
		if(confirm("ë°°ì†¡ìš”ì²­ì¼ì„ ë³€ê²½í•˜ì‹œê² ìŠµë‹ˆê¹Œ?"))
		{
			$("#delidatelist").remove();
			callapi("POST","order",getdata("orderdelidateupdate")+"&seq="+seq+"&delidate="+date);
		}
	}
	function chkshowdelivery()
	{
		var ck_cfcode=getCookie("mck_cfcode");
		var medicalId=$("input[name=medicalId]").val();
		
		if(ck_cfcode=="cy")
		{
			if(medicalId=="5184287981" || medicalId=="3727799420") //3727799420 : ë”í•œíƒ•ì „1ì›ì¼ê²½ìš°ì—ë§Œ , 5184287981 : ì²­ì—°_ìˆ˜ì™„í•œë°© 
			{
				$("#iddelivery").show();
			}
			else
			{
				$("#iddelivery").hide();
			}
		}
		else
		{
			$("#iddelivery").show();
		}
	}
	function chkshowmarking(miIsmarking)
	{
		//ë§ˆí‚¹ì‚¬ìš©ì—¬ë¶€ì— ë”°ë¼ ë³´ì´ê³  ì•ˆë³´ì´ê³  
		$("#idMarking").hide();
		if(!isEmpty(miIsmarking) && miIsmarking=="Y")
		{
			$("#idMarking").show();
		}
	}

	// íŠ¹ìˆ˜ë¬¸ìž ì²´í¬
	function SpCharcheck(event ){
		var _value = event.srcElement.value;		
		var special_pattern = /[`,.~!#$%^&*|\\\'\";:\/?]/gi;
		if(special_pattern.test(_value) == true){
			event.srcElement.value=_value.replace( /[`,.~!#$%^&*|\\\'\";:\/?]/gi, '' );		
			alert(',.~!#$%^&*|\\\'\";:\/? í•´ë‹¹íŠ¹ìˆ˜ë¬¸ìžëŠ” ì‚¬ìš© ë¶ˆê°€ëŠ¥í•©ë‹ˆë‹¤.');
		}		
	}

	function chkcfMeditime(medicode)
	{
		var chknok=false;

		if(!isEmpty(medicode))
		{
			//ë…¹ê°(3090H1AHM),ë…¹ê°êµ(3091H1AHM),ë…¹ìš©(3094H1AHM),ë…¹ê°êµì§ˆ(3605H1AHM)
			//if((medicode.indexOf("3090H1AHM")!=-1) || (medicode.indexOf("3091H1AHM")!=-1) || (medicode.indexOf("3094H1AHM")!=-1) || (medicode.indexOf("3605H1AHM")!=-1))
			//DOO::ë…¹ê°(3090H1AHM),ë…¹ê°êµ(3091H1AHM),ë…¹ìš©(3094H1AHM),ë…¹ê°êµì§ˆ(3605H1AHM) ì²˜ìŒì— ìž‘ì—…í•˜ë‹¤ 20230404 ì±„ì›€ìƒì—ì„œ ë…¹ê°êµëŠ” ì•ˆí•˜ê¸°ë¡œ - íŒ€ìž¥ë‹˜, ëŒ€í‘œë‹˜ê³¼ ì–˜ê¸°í•œê±°ìž„ 
			if((medicode.indexOf("3094H1AHM")!=-1))
			{
				chknok=true;
			}
		}
		return chknok;
	}
	function getchknoktime()
	{
		var ck_cfcode=getCookie("mck_cfcode");
		/*if(ck_cfcode=="on")
		{
			return 150;
		}*/
		return 120;
	}
	function chknoktimenone()
	{
		var ck_cfcode=getCookie("mck_cfcode");
		if(ck_cfcode=="hs" || ck_cfcode=="hp" ) //|| ck_cfcode=="on"  240318 ê¹€ì •íƒœê³¼ìž¥ì´  ë…¹ìš©ì´ í¬í•¨ëœ í•œì•½ì€ 120ë¶„ìœ¼ë¡œ í”½ìŠ¤ ê°€ëŠ¥í•œê°€ìš” 
		{
			return true;
		}
		return false;
	}
	function viewdctime(chknok)
	{
		var ck_cfcode=getCookie("mck_cfcode");
		var cfdcTime=$("input[name=cfdcTime]").val();
		var medicaldcTime=$("input[name=medicaldcTime]").val();		
		var dcTimejson=$("textarea[name=dcTimeList]").val();
		var cfmedidctime=!isEmpty(medicaldcTime)?medicaldcTime:cfdcTime;
		var bakdcTime=$("select[name=dcTime]").children("option:selected").val();
		if(chknok==true)
		{
			seldctime=!isEmpty(bakdcTime)?bakdcTime:cfmedidctime;
		}
		else
		{
			if(getCookie("mck_cfcode")=="cy")
			{
				seldctime=!isEmpty(bakdcTime)?bakdcTime:cfmedidctime;
			}
			else if(getCookie("mck_cfcode")=="on")//ì˜¨ì€ ë…¹ìš©ì€ 2ì‹œê°„ ì¼ë°˜ì•½ì€ 1ì‹œê°„30ìž„..
			{
				seldctime=cfmedidctime;
			}
			else
			{
				seldctime=!isEmpty(bakdcTime)?bakdcTime:cfmedidctime;
			}	
		}

		if(chknoktimenone()==true && chknok==true)
		{
			chknok=false;
		}

		if(chknok==true)
		{
			if(ck_cfcode!="hm"){
				$("#dcTime option").remove();
				var noktime=getchknoktime();
				$("#dcTime").append('<option value="'+noktime+'">'+noktime+'ë¶„</option>');			
			}
		}
		else
		{
			if(!isEmpty(dcTimejson))
			{
				var selected="";
				var dcTimeList=JSON.parse(dcTimejson);
				$("#dcTime option").remove();
				$.each(dcTimeList, function(idx, val){
					var code=val["cdCode"];
					var title=val["cdName"];
					selected="";
					if(seldctime==code)
					{
						selected=" selected ";
					}
					$("#dcTime").append('<option value="'+code+'" '+selected+'>'+title+'</option>');
				});
			}
			else
			{
				$("#dcTime option").remove();
				$("#dcTime").append('<option value="80">80ë¶„</option>');
			}
		}

		var dcTime=$("select[name=dcTime]").children("option:selected").val();
		//console.log("dcTimedcTimedcTime = " + dcTime);

	}

	
function getNewdcTimePrice()
{
	var dctimePrice=$("textarea[name=dctimePrice]").val();
	var dcTime=$("select[name=dcTime]").children("option:selected").val();
	var newprice=0;
	if(!isEmpty(dctimePrice))
	{
		var newpricedata=JSON.parse(dctimePrice);
		switch(dcTime)
		{
		case "60":
			newprice=!isEmpty(newpricedata["cf_dctime_60"])?newpricedata["cf_dctime_60"]:0;
			break;
		case "80":
			newprice=!isEmpty(newpricedata["cf_dctime_80"])?newpricedata["cf_dctime_80"]:0;
			break;
		case "90":
			newprice=!isEmpty(newpricedata["cf_dctime_90"])?newpricedata["cf_dctime_90"]:0;
			break;
		case "120":
			newprice=!isEmpty(newpricedata["cf_dctime_120"])?newpricedata["cf_dctime_120"]:0;
			break;
		case "150":
			newprice=!isEmpty(newpricedata["cf_dctime_150"])?newpricedata["cf_dctime_150"]:0;
			break;
		case "180":
			newprice=!isEmpty(newpricedata["cf_dctime_180"])?newpricedata["cf_dctime_180"]:0;
			break;
		case "210":
			newprice=!isEmpty(newpricedata["cf_dctime_210"])?newpricedata["cf_dctime_210"]:0;
			break;
		case "240":
			newprice=!isEmpty(newpricedata["cf_dctime_240"])?newpricedata["cf_dctime_240"]:0;
			break;
		case "300":
			newprice=!isEmpty(newpricedata["cf_dctime_300"])?newpricedata["cf_dctime_300"]:0;
			break;
		}
	}

	return newprice;
}
function getdcwaterdjmeditype()
{
	var cfWaterratio=$("input[name=cfWaterratio]").val();
	if(!isEmpty(cfWaterratio))
	{
		if(parseFloat(cfWaterratio)==0)
		{
			return "Y";
		}
		else
		{
			return "N";
		}
	}
	else
	{
		return "Y";
	}
	//var ck_cfcode=getCookie("mck_cfcode");
	//if(ck_cfcode=="pn" || ck_cfcode=="on")
	//{
	//	return "N";
	//}
	//return "Y";
}
function viewselpaybilling(obj)
{
	$("#paybillingdiv").show();
	$("#paybillingdiv").html("");
	var customer_uid=!isEmpty(obj["customer_uid"])?obj["customer_uid"]:"";
	var seldata='<div class="select" >';
	seldata+='<select name="selpaybilling" id="selpaybilling" class="listdata">';
	if(!isEmpty(obj["billingkeylist"]))
	{
		$(obj["billingkeylist"]).each(function( index, value )
		{
			var selected="";
			if(customer_uid==value["customer_uid"])
			{
				selected=" selected ";
			}
			seldata+='<option value="'+value["customer_uid"]+'" data-chkpwd="'+value["pwdchk"]+'"  '+selected+'>'+value["cardname"]+' '+value["cardaccount"]+'</option>';
		});
	}
	seldata+='<option value="">ê¸°íƒ€ì‹ ìš©ì¹´ë“œë“±ë¡ê²°ì œ</option>';
	seldata+='<option value="carddirect">ì¼ë°˜ì‹ ìš©ì¹´ë“œê²°ì œ</option>';
	seldata+='</select></div>';
	$("#paybillingdiv").html(seldata);
}

function selyears(type){
		$("#selyears").remove();
		var carr=[2024,2023,2022,2021,2020,2019,2018,2017];
		var data="<div class='sel' id='selyears'>";
			data+="<select name='selectyears' class='seardata sear"+type+"' onchange=selectyears('"+type+"') style='appearance:auto;'>";
		$(carr).each(function(idx,val){
			var add="";
			if(val==2024)add=" ì´í›„";
			data+="<option value='"+val+"'>"+val+"ë…„ "+add;
		});
		data+="</select></div>";
		return data;
}

function setlimithour(limithour)
{
	$("textarea[name=limithour]").val(limithour);
}
//ë³µì•½ì„¤ì •>ìš©ë²•
function viewdoseRule(doseRuleList, doseRule)
{
	$("#doseRule").html("");
	txt="<option value=''>-</option>";
	$.each(doseRuleList, function(idx, val){
		var code=val["cdCode"];
		var title=val["cdName"];
		txt+='<option value="'+code+'" >'+title+'</option>';
	});
	$("#doseRule").html(txt);
	if(!isEmpty(doseRule))
	{
		$("#doseRule option[value="+doseRule+"]").attr("selected", "selected");
	}
}

//ë‹¹ë„
function viewsugarkinds(sugarKindsList, sugarkinds, sugarbrixList, sugarBrix)
{
	//ë‹¹ë„ì„ íƒ
	$("#sugarkinds").html("");
	txt='<option value="">ì—†ìŒ</option>';
	$.each(sugarKindsList, function(idx, val){
		var code=val["mdCode"];
		var title=val["mdTitle"];
		var water=val["mdWater"];
		var price=val["mdPrice"];
		txt+='<option value="'+code+'" data-price="'+price+'" data-water="'+water+'" >'+title+'</option>';
	});
	$("#sugarkinds").html(txt);

	if(!isEmpty(sugarkinds))
	{
		$("#sugarkinds option[value="+sugarkinds+"]").attr("selected", "selected");
	}

	//ë‹¹ë„
	$("#sugarbrix").html("");
	txt='<option value="">ì—†ìŒ</option>';
	$.each(sugarbrixList, function(idx, val){
		var code=val["cdCode"];
		var title=val["cdName"];
		var value=val["cdValue"];
		var brix="0";
		if(!isEmpty(value))
		{
			var vajson=JSON.parse(value);
			var cfcode=getCookie("mck_cfcode");
			brix=vajson[cfcode];
		}
		txt+='<option value="'+code+'" data-brix="'+brix+'">'+title+'</option>';
	});
	$("#sugarbrix").html(txt);

	if(!isEmpty(sugarBrix))
	{
		$("#sugarkinds").removeAttr("disabled");
		$("#sugarbrix option[value="+sugarBrix+"]").attr("selected", "selected");
	}

}

//í–¥ê¸° 
function viewflavorkinds(flavorKindsList, flavorkinds, flavorList, flavor)
{
	$("#flavorkinds").html("");
	txt='<option value="">ì—†ìŒ</option>';
	$.each(flavorKindsList, function(idx, val){
		var code=val["mdCode"];
		var title=val["mdTitle"];
		var water=val["mdWater"];
		var price=val["mdPrice"];
		txt+='<option value="'+code+'" data-price="'+price+'" data-water="'+water+'" >'+title+'</option>';
	});
	$("#flavorkinds").html(txt);

	if(!isEmpty(flavorkinds))
	{
		$("#flavorkinds option[value="+flavorkinds+"]").attr("selected", "selected");
	}

	//í–¥ê¸°
	$("#flavor").html("");
	txt='<option value="">ì—†ìŒ</option>';
	$.each(flavorList, function(idx, val){
		var code=val["cdCode"];
		var title=val["cdName"];
		var value=val["cdValue"];
		var odor="0";
		if(!isEmpty(value))
		{
			var vajson=JSON.parse(value);
			var cfcode=getCookie("mck_cfcode");
			odor=vajson[cfcode];
		}
		txt+='<option value="'+code+'" data-odor="'+odor+'">'+title+'</option>';
	});
	$("#flavor").html(txt);
	
	if(!isEmpty(flavor))
	{
		$("#flavorkinds").removeAttr("disabled");
		$("#flavor option[value="+flavor+"]").attr("selected", "selected");
	}
}
//ìží•˜ê±° 
function viewzahager(zahagerList, zahagervalue)
{
	$("#zahager").html("");
	txt='<option value="">ì—†ìŒ</option>';
	$.each(zahagerList, function(idx, val){
		var code=val["cdCode"];
		var title=val["cdName"];
		var price=val["cdPrice"];
		var unit=val["mmUnit"];
		var medicode=val["medicode"];
		var water=val["cdWater"];
		var cnt=val["cdCnt"];
		var medititle=val["medititle"];
		txt+='<option value="'+code+'" data-price="'+price+'" data-unit="'+unit+'" data-code="'+medicode+'" data-title="'+medititle+'" data-water="'+water+'" data-cnt="'+cnt+'" >'+title+'</option>';
	});
	$("#zahager").html(txt);
	if(!isEmpty(zahagervalue))
	{
		$("#zahager option[value="+zahagervalue+"]").attr("selected", "selected");
	}
}
//ë…¹ìš©í‹´í¬ 
function viewvelvet(velvetList, velvetvalue)
{
	$("#velvet").html("");
	if(getCookie("mck_cfcode")=="hs")
	{
		txt='<option value="" selected>ìˆ˜ê¸‰ë¶ˆê°€ë¡œ ì¸í•œ í’ˆì ˆ</option>';
		$("#velvet").html(txt);
	}
	else
	{
		txt='<option value="">ì—†ìŒ</option>';
		$.each(velvetList, function(idx, val){
			var code=val["cdCode"];
			var title=val["cdName"];
			var price=val["cdPrice"];
			var unit=val["mmUnit"];
			var medicode=val["medicode"];
			var water=val["cdWater"];
			var cnt=val["cdCnt"];
			var medititle=val["medititle"];
			txt+='<option value="'+code+'" data-price="'+price+'" data-unit="'+unit+'" data-code="'+medicode+'" data-title="'+medititle+'" data-water="'+water+'" data-cnt="'+cnt+'" >'+title+'</option>';
		});
		$("#velvet").html(txt);
		if(!isEmpty(velvetvalue))
		{
			$("#velvet option[value="+velvetvalue+"]").attr("selected", "selected");
		}
	}
}
//í’ˆì§ˆë³´ì¦ì„œ 
function viewqualityreport(meReportList, qualityreport)
{
	$("#qualityreport").html("");
	txt="";
	$.each(meReportList, function(idx, val){
		txt+='<option value="'+val["cdCode"]+'">'+val["cdName"]+'</option>';
	});
	$("#qualityreport").html(txt);
	if(!isEmpty(qualityreport))
	{
		$("#qualityreport option[value="+qualityreport+"]").attr("selected", "selected");
	}
}
//ë°œíš¨ìˆ˜ 
function viewfermentedwater(fermentedWaterList, fermentedwatervalue)
{
	$("#fermentedwater").html("");
	txt='<option value="">ì—†ìŒ</option>';
	$.each(fermentedWaterList, function(idx, val){
		var code=val["cdCode"];
		var title=val["cdName"];
		var price=val["cdPrice"];
		var unit=val["mmUnit"];
		var medicode=val["medicode"];
		var water=val["cdWater"];
		var cnt=val["cdCnt"];
		var medititle=val["medititle"];
		txt+='<option value="'+code+'" data-price="'+price+'" data-unit="'+unit+'" data-code="'+medicode+'" data-title="'+medititle+'" data-water="'+water+'" data-cnt="'+cnt+'" >'+title+'</option>';
	});
	$("#fermentedwater").html(txt);
	if(!isEmpty(fermentedwatervalue))
	{
		$("#fermentedwater option[value="+fermentedwatervalue+"]").attr("selected", "selected");
	}
}
// ì•”í˜¸í™”
function jsencrypt(text)
{
	var secretKey = 'DJqPn3JkxVLkJetMjCExXUIhmYK4dvJ6'; // 32ìžë¦¬ ë¹„ë°€í‚¤
	var iv = 'abcdefghijklmnop'; // 16ìžë¦¬ iv
   const cipher = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(secretKey), {
		iv: CryptoJS.enc.Utf8.parse(iv),
		padding: CryptoJS.pad.Pkcs7,
		mode: CryptoJS.mode.CBC,
	});

	return cipher.toString();
}

// ë³µí˜¸í™”
function jsdecrypt(encryptedText)
{
	var secretKey = 'DJqPn3JkxVLkJetMjCExXUIhmYK4dvJ6'; // 32ìžë¦¬ ë¹„ë°€í‚¤
	var iv = 'abcdefghijklmnop'; // 16ìžë¦¬ iv
	const decipher = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(secretKey), {
		iv: CryptoJS.enc.Utf8.parse(iv),
		padding: CryptoJS.pad.Pkcs7,
		mode: CryptoJS.mode.CBC,
	});

	return decipher.toString(CryptoJS.enc.Utf8);
}
function chkmultipay(cfMultipay)
{
	if(cfMultipay=="multi" || cfMultipay=="nonauth" || cfMultipay=="twoway")
	{
		return true;
	}
	return false; 
}

	function selectemail(id){
		var id=$(id).attr("id");
		var nid=id.replace("2","");
		var data=$("#"+id).val();
		if(!isEmpty(data)){
			$("#"+nid+"1").attr("type","hidden").css("visibility","hidden");
		}else{
			$("#"+nid+"1").attr("type","text").css("visibility","visible");
		}
	}

//DOO::ë°•ìŠ¤ë¼ë²¨ - ê°ìžíŽ˜ì´ì§€ì— ìžˆë˜ ë°•ìŠ¤ë¼ë²¨ì„ í•˜ë‚˜ë¡œ ë­‰ì¹¨ 
function viewboxlabel(obj, matype)
{
	$("#boxlabeldiv").hide();
	if(obj["mi_boxlabel"]=="Y")
	{
		$("#boxlabeldiv").show();
		console.log(obj["me_boxlabel"]);
		var boxlabeldata=getBoxlabeldata(obj["me_boxlabel"], matype, obj["boxlabel"]["code"]);
		console.log("boxlabeldata = " + boxlabeldata+", matype = " + matype+", code = " + obj["boxlabel"]["code"]);

		//boxlabel
		if(!isEmpty(obj["boxlabelList"]))
		{
			var html="";
			$(obj["boxlabelList"]).each(function(idx, val){
				var selected="";
				//if((idx==0) || (!isEmpty(boxlabeldata)&&boxlabeldata==val["code"]))
				if( (!isEmpty(boxlabeldata)&&boxlabeldata==val["code"]))
				{
					selected=" selected";	
				}
		console.log(val["code"]+"_"+boxlabeldata+"_"+selected);
				var desc=val["desc"].replace(/\n|\r|\s*/gi, '');
				html+="<option value='"+val["code"]+"' data-title='"+val["title"]+"' data-desc='"+desc+"' "+selected+">"+val["title"]+"";
			});
			$("select[name=boxlabel]").html(html);		
		}
		
	}
}
//ë°•ìŠ¤ë¼ë²¨ë°ì´í„°ì…‹íŒ… 
function getBoxlabeldata(me_boxlabel, matype, cboxlabel)
{
	var boxdata="";
	if(!isEmpty(cboxlabel))
	{
		boxdata=cboxlabel;
	}
	else
	{
		if(!isEmpty(me_boxlabel))
		{
			$(me_boxlabel).each(function(idx, val)
			{
				switch(matype)
				{
				case "decoction":
					if(val["code"]=="decoction")
					{
						boxdata=val["basic"];
						console.log("decoction : " + boxdata);
					}
					break;
				case "decopill":case "powder":case "herbal":case "ointments":
					if(val["code"]=="pill")
					{
						boxdata=val["basic"];
						console.log("pill : " + boxdata);
					}
					break;
				case "decoctionta":
					if(val["code"]=="decoctionta")
					{
						boxdata=val["basic"];
						console.log("decoctionta : " + boxdata);
					}
					break;
				case "NHIS":
					if(val["code"]=="nhis")
					{
						boxdata=val["basic"];
						console.log("nhis : " + boxdata);
					}
					break;
				case "goods":
					if(val["code"]=="produce")
					{
						boxdata=val["basic"];
						console.log("produce : " + boxdata);
					}
					break;
				}
			});
		}
	}
	//if(isEmpty(boxdata))boxdata="none";
	return boxdata;
}