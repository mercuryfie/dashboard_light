
	//ëª¨ë‹¬ì˜¤í”ˆ  - ê¸°ì¡´ëª¨ë‹¬ê°€ëŠ¥ , ì¶”ê°€ê°€ëŠ¥
	function modallayer2(w,h,url,data){
		var t=($(window).height() / 2) - (h / 2);
		var txt="<div id='screen'></div>";
				txt+="<div id='modaldiv'><div id='modal2' style='width:"+w+"px;height:"+h+"px;top:"+t+"px;'></div></div>";
		$("#wrapper").prepend(txt);
		$("#modal2").load("/inc/"+url+".php?"+data);
	}
	//ëª¨ë‹¬ë‹«ê¸°  - modallayer2ë¡œ ì˜¤í”ˆëœ ëª¨ë‹¬
	function closemodal2(){
		if( typeof getbackpayment == 'function' )
		{
			getbackpayment();
		}
		if( typeof closemyinfo == 'function' )
		{
			closemyinfo();
		}
		if( typeof getbackpoint == 'function' )
		{
			getbackpoint();
		}
		$("#screen").remove();
		$("#modaldiv").remove();
	}
	//ëª¨ë‹¬ë‚´ ì´ë™ modallayer2
	function nextmodal(url, data){
		$("#modal2").load("/inc/"+url+".php?"+data);
	}
	//ì¹´ë“œì‚­ì œ
	function paymethoddelete(code){
		if(!confirm("ë“±ë¡ëœ ê²°ì œì¹´ë“œë¥¼ ì‚­ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?"))return;
		var data="&apiCode=paymethoddelete&language=kor&medicalId="+getCookie("mck_miUserid");
				data+="&doctorId="+getCookie("mck_meUserId")+"&djGroup="+code;
		callapi("POST","mypage",data);
	}
	//ì¹´ë“œëª©ë¡
	function paymethodlist(obj){
		var list="";
		if(!isEmpty(obj["list"]))
		{
			$(obj["list"]).each(function( idx, val )
			{
				list+="<dl id='billingkey"+val["dj_group"]+"'>";
				list+="<dt><img src=''></dt>";
				list+="<dd class='info'>"+val["cardname"]+"<br>"+val["cardaccount"]+"</dd>";
				list+="<dd class=''><a href='javascript:paymethoddelete("+val["dj_group"]+")' class='button mint'>ì‚­ì œ</a></dd>";
				list+="</dl>";
			});
		}
		$("#modallist").html(list);
	}
	//ì¹´ë“œë²ˆí˜¸ì´ˆê¸°í™”í›„ í‚¤íŒ¨ë“œí˜¸ì¶œ
	function resetcardkeyno(){
		$("#cardno span.no").each(function(){
			$(this).text("");
		});
		var no=reloadcardno();
		$("#cardno").attr("value",0);
		getKeypad("card");
	}
	//ì¹´ë“œë²ˆí˜¸ì¶”ì¶œ
	function resetcardno(no){
		$("#cardinfo").find(".on").removeClass("on");
		$("#cardno input").attr("readonly",false).removeClass("on");
		$("#cardno input").eq(no).val("").focus().attr("readonly",false).addClass("on");
		reloadcardno();
		getKeypad("close");
	}
	//ì²´í¬ë°•ìŠ¤ ë¦¬ì…‹
	function setcheckbox(){
		var chk=$(".checkbox span ").css("background-color");
		if(chk=="rgb(255, 255, 255)"){
			$("#agreebox").val("Y");
		}else{
			$("#agreebox").val("N");
		}
		console.log($("#agreebox").val());
	}
	//ì¹´ë“œë²ˆí˜¸ë¶ˆëŸ¬ì˜¤ê¸°
	function reloadcardno(){
		var no="";
		$("input[name=precardno]").each(function(){
			no+=$(this).val();
		});
		$("#cardno span.no").each(function(){
			no+=$(this).attr("value");
		});
		$("input[name=cardno]").val(no);
		return no;
	}
	//ì¹´ë“œë²ˆí˜¸ëŠ” ìµœì¢…í•„ë“œ cardno ì— ì €ìž¥ 
	function inputcardno(){
		reloadcardno();
		var no0=$("input[name=precardno]").eq(0).val().length;
		var no1=$("input[name=precardno]").eq(1).val().length;
		var no=parseInt(no0)+parseInt(no1);
		console.log(no+"_"+no0+"_"+no1);
		if(no<=8){
			if(no==8){
				var fulllen=0
				$("#cardno span.no").each(function(){
					fulllen+=$(this).text().length;
				});
				if(fulllen<8){
					$("input[name=precardno]").eq(1).attr("readonly",true).removeClass("on");
					$("#keypad").focus();
					getKeypad("card");
				}
			}else if(no0>3){
				$("input[name=precardno]").eq(0).attr("readonly",true).removeClass("on");
				$("input[name=precardno]").eq(1).focus().addClass("on");
			}
		}
	}
	//ë¹„ë°€ë²ˆí˜¸ì°½ ìƒì„± 
	function setPasswd(){
		$("#cvcno div").removeClass("on");
		var chk=$("#passwdno").hasClass("info");
		if(chk==false){
			var txt="<dd id='passwdno' class='info' value='0'>";
					txt+="<div class='on'><i>ë¹„ë°€ë²ˆí˜¸</i><br><input type='password' name='passwd' placeholder='ë¹„ë°€ë²ˆí˜¸ ì•ž ë‘ìžë¦¬' maxlength='2' readonly onclick=setKeypad('passwd') class='paydata'></div>";
					txt+="</dd>";
			$("#cardinfo").append(txt).css("margin-top","-242px");
			getKeypad("passwd");
		}
	}
	//CVCì°½ ìƒì„± 
	function setCVC(){
		$("#exdateno div").removeClass("on");
		var chk=$("#cvcno").hasClass("info");
		if(chk==false){
			var txt="<dd id='cvcno' class='info' value='0'>";
					txt+="<div class='on'><i>birth</i><br><input type='password' name='birth' placeholder='YYMMDD' maxlength='6' readonly onclick=setKeypad('cvc') class='paydata'></div>";
					txt+="</dd>";
			$("#cardinfo").append(txt).css("margin-top","-161px");
			getKeypad("cvc");
		}
	}
	//ìœ íš¨ê¸°ê°„ì°½ ìƒì„± 
	function setExdate(){
		var chk=$("#exdateno").hasClass("exdate");
		console.log("#exdateno"+chk);
		if(chk==false){
			var txt="<dd id='exdateno' class='exdate' value='0'>";
					txt+="<div class='on'><i>ìœ íš¨ê¸°ê°„(mm)</i><br><input type='password' name='exmonth' placeholder='MM' maxlength='2' readonly onclick=setKeypad('exdate') class='paydata'></div>";
					txt+="<div><i>ìœ íš¨ê¸°ê°„(YY)</i><br><input type='password' name='exyear' placeholder='YY' maxlength='2' readonly onclick=setKeypad('exdate') class='paydata'></div>";
					txt+="</dd>";
			$("#cardinfo").append(txt).css("margin-top","-80px");
			getKeypad("exdate");
		}
	}
	//í‚¤íŒ¨ë“œ í˜¸ì¶œì „ ë°•ìŠ¤ì´ˆê¸°í™”
	function setKeypad(type){
		$("#cardinfo").find(".on").removeClass("on");
		$("#"+type+"no div input").val("");
		if(type=="exdate"){
			$("#exdateno").attr("value",0);
			$("#exdateno div").eq(0).addClass("on");
			$("#exdateno div").eq(0).children("input").focus();
		}else{
			$("#"+type+"no div").addClass("on");
			$("#"+type+"no div input").focus();
		}
		if(type=="exdate")$("#cardinfo").css("margin-top","-80px");
		if(type=="cvc")$("#cardinfo").css("margin-top","-150px");
		if(type=="passwd")$("#cardinfo").css("margin-top","-220px");
		
		getKeypad(type);
	}
	//í‚¤íŒ¨ë“œìˆ«ìžëžœë¤ 
	function shuffle(array) {
		array.sort(() => Math.random() - 0.5);
	}
	//í‚¤íŒ¨ë“œìƒì„± 
	function getKeypad(type){
		$("#keypad").remove();
		if(type=="close"){
			$("#cardinfo").css("margin-top",0);
		}else{
			var pad="<table id='keypad' value='0'><col width='133px'><col width='133px'><col width='133px'><tbody><tr>";
			let no=[1,2,3,4,5,6,7,8,9,0];
			shuffle(no);
			console.log(no);
			$(no).each(function(idx, val){
				if(idx>0 && idx%3==0){pad+="</tr><tr>";}
				if(idx==9){pad+="<td id='tmpkey' onclick=getKeypad('close')>ë‹«ê¸°</td>";}
				pad+="<td onclick=setpadno('"+type+"',"+val+")>"+val+"</td>";
			});
			pad+="<td onclick=delpadno('"+type+"')>DEL</td>";
			pad+="</tr></tbody></tbale>";
			$("#modal2").prepend(pad);
		}
	}
	//í‚¤íŒ¨ë“œë¡œìˆ«ìžìž…ë ¥  ì¹´ë“œë²ˆí˜¸, ìœ íš¨ê¸°ë‚œ, cvc, ë¹„ë²ˆ ê°ê°ì²˜ë¦¬
	function setpadno(type,no){
		var tot=$("#"+type+"no").attr("value");
		if(type=="card"){
			$("#cardno span.no").eq(tot).attr("value",no).text("*");
			reloadcardno();
			//tot==6 ì•„ë©•ìŠ¤ì¹´ë“œë²ˆí˜¸ëŠ” 15ìžë¦¬ 6ì´í›„ ë‹¤ìŒë²„íŠ¼í™œì„±í™” 
			if(tot==5){
				$("#tmpkey").attr("onclick","getKeypad('close')").css("color","#fff").text("ë‹«ê¸°")
			}
			if(tot==6){
				$("#tmpkey").attr("onclick","setExdate()").css("color","yellow").text("ë‹¤ìŒ")
			}
			if(tot==7){
				getKeypad("close");
				setExdate();
			}else{
				$("#cardno").attr("value",parseInt(tot)+1);
				if(tot>0 && tot%4==3){
					getKeypad("card");
				}
			}
		}
		if(type=="exdate"){
			var dat=$("#exdateno div").eq(tot).children("input").val();
			$("#exdateno div").eq(tot).children("input").val(dat+no);
			var len=$("#exdateno div").eq(tot).children("input").val().length;
			if(len>1){
				if(tot==0){
					$("#exdateno").attr("value",1);
					$("#exdateno div").removeClass("on");
					$("#exdateno div").eq(1).addClass("on");
				}else{
					var chk=$("#cvcno").hasClass("info");
					if(chk==true){
						$("#exdateno div").removeClass("on");
						getKeypad("close");
					}else{
						setCVC();
					}
				}
			}
		}
		if(type=="cvc"){
			var dat=$("#cvcno div input").val();
			$("#cvcno div input").val(dat+no);
			var len=$("#cvcno div input").val().length;
			if(len>5){
				var chk=$("#passwdno").hasClass("info");
				if(chk==true){
					$("#cvcno div").removeClass("on");
					getKeypad("close");
				}else{
					setPasswd();
				}
			}
		}
		if(type=="passwd"){
			var dat=$("#passwdno div input").val();
			$("#passwdno div input").val(dat+no);
			var len=$("#passwdno div input").val().length;
			if(len>1){
					$("#passwdno div").removeClass("on");
					$("#cardinfo").css("margin-top","0");
					getKeypad("close");
					$(".regist .button").removeClass("gray").addClass("mint")
						.attr("onclick","chkCardInfo()");
			}
		}
		if(type=="paypass"){
			$("#paypassno .no").text(no);
			var passdat="";
			$("#paypassno dd").each(function(idx, val){
				passdat+=$(this).text();
			});
			$("input[name=mypass]").val(passdat);
			var mypass=$("input[name=mypass]").val();
			var len=passdat.length;
			$("#paypassno").attr("value",len);
			//ìž…ë ¥ì™„ë£Œ
			if(len>5){
				//ë¹„ë²ˆìž…ë ¥
				var medicalId=getCookie("mck_miUserid");
				var doctorId=getCookie("mck_meUserid");
				var selpaybilling=$("select[name=selpaybilling]").val();
				var data="&apiCode=paypasscheck&language=kor&medicalId="+getCookie("mck_miUserid");
						data+="&doctorId="+getCookie("mck_meUserId")+"&mypass="+mypass+"&selpaybilling="+selpaybilling;
				console.log("mypass data = " + data);
				callapi("POST","mypage",data);
			}else{
				$("#paypassno dd").removeClass("no");
				$("#paypassno dd").eq(len).addClass("no");
			}
		}
		if(type=="mypass"){
			$("#mypassno .no").text(no);
			var passdat="";
			$("#mypassno dd").each(function(idx, val){
				passdat+=$(this).text();
			});
			var mypass=$("input[name=mypass]").val();
			var len=passdat.length;
			$("#mypassno").attr("value",len);
			//ìž…ë ¥ì™„ë£Œ
			if(len>5){
				//ë¹„ë²ˆìž…ë ¥
				if(mypass==""){
					$("#passtitle").text("ë¹„ë°€ë²ˆí˜¸í™•ì¸");
					$("input[name=mypass]").val(passdat);
					setMyPasswd();
				//ë¹„ë²ˆí™•ì¸
				}else{
					if(mypass==passdat){
						var medicalId=getCookie("mck_miUserid");
						var doctorId=getCookie("mck_meUserid");
						var data="&apiCode=paypassupdate&language=kor&medicalId="+getCookie("mck_miUserid");
								data+="&doctorId="+getCookie("mck_meUserId")+"&mypass="+mypass;
						callapi("POST","mypage",data);
					}else{
						$("#passtitle").text("ë¹„ë°€ë²ˆí˜¸ìž…ë ¥");
						$("input[name=mypass]").val("");
						setMyPasswd();
						alert("ìž…ë ¥í•˜ì‹ ë¹„ë°€ë²ˆí˜¸ê°’ì´ ë‹¤ë¦…ë‹ˆë‹¤.");
					}
				}
			}else{
				$("#mypassno dd").removeClass("no");
				$("#mypassno dd").eq(len).addClass("no");
			}
		}
	}
	//í‚¤íŒ¨ë“œí•œê¸€ìžì‚­ì œ
	function delpadno(type){
		var tot=parseInt($("#"+type+"no").attr("value"));
		if(tot>0){
			tot=tot-1;
			if(type=="mypass"){
				$("#mypassno dd").removeClass("no");
				$("#mypassno dd").eq(tot).text("").addClass("no");
			}
			$("#"+type+"no .no").eq(tot).text("");
			$("#"+type+"no").attr("value",tot);
		}
	}
	//ì¹´ë“œê´€ë ¨ë°ì´í„°í˜¸ì¶œ
	function payinfodata(){
		var paydata="";
		$(".paydata").each(function(){
			var name=$(this).attr("name");
			var value=!isEmpty($(this).val())?$(this).val():"";
			paydata+="&"+name+"="+value;
		});
		console.log("paydata = " + paydata);
		return paydata;
	}
	//ì¹´ë“œì •ë³´ ìµœì¢… value check
	function chkCardInfo(){
		var txt="";
		var chk="Y";
		var cardno=$("input[name=cardno]").val().length;
		console.log(cardno);
		if(!(cardno==15 || cardno==16)){
			chk="N";
			txt="ì¹´ë“œë²ˆí˜¸ ê²€ì¦ì˜¤ë¥˜"+cardno;
		}
		var exmonth=$("input[name=exmonth]").val();
		if(exmonth >=1 && exmonth <= 12){
			var monthlen=exmonth.length;
			if(monthlen!=2){
				chk="N";
				txt="ìœ íš¨ê¸°ê°„ ê²€ì¦ì˜¤ë¥˜1"+monthlen;
			}
		}else{
			chk="N";
			txt="ìœ íš¨ê¸°ê°„ ê²€ì¦ì˜¤ë¥˜2"+exmonth;
		}
		var birth=$("input[name=birth]").val().length;
		if(birth!=6){
			chk="N";
			txt="birth ê²€ì¦ì˜¤ë¥˜";
		}
		var passwd=$("input[name=passwd]").val().length;
		if(passwd!=2){
			chk="N";
			txt="ë¹„ë°€ë²ˆí˜¸ ê²€ì¦ì˜¤ë¥˜";
		}
		var agreebox=$("#agreebox").val();
		if(agreebox!="Y"){
			chk="N";
			txt="ì •ë³´ì œê³µ ë™ì˜ í•„ìˆ˜";
		}
		if(chk=="Y"){			
			$(".regist .button").removeAttr("onclick");
			var ctype=$("input[name=ctype]").val();
			if(ctype=="myinfo")
			{
				$(".regist .button").text("ì¹´ë“œë“±ë¡ì¤‘...");
			}
			else
			{
				ctype="";
				$(".regist .button").text("ê²°ì œì§„í–‰ì¤‘...");
			}
			callapi("POST","order",getdata("billingkeyupdate")+payinfodata()+"&ctype="+ctype);
			//api í˜¸ì¶œ ì—¬ê¸°ì—
		}else{
			alert(txt);
		}
	}
