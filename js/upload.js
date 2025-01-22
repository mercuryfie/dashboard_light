
// ì´ë¯¸ì§€ ì •ë³´ë“¤ì„ ë‹´ì„ ë°°ì—´
var sel_files = [];

$(document).ready(function(){
	var bar=$("#bar");
	var percent=$("#percent");
	//var status=$("#status");
	var percentVal='';
	//console.log(getUrlData("FILE_URL")+"ajaxupload.php");
	$('#frm').ajaxForm({
		url:getUrlData("FILE_URL")+"ajaxupload.php", //https://data.cy.djmedi.net/ajaxupload.php
		processData : false,
		contentType : false,
		headers : {"HeaderKEY":"first value"},
		beforeSubmit: function (data,form,option) {
			//console.log("beforeSubmit  data = " + data + ", form = " + form + ", opotion = " + option);
			console.log("115 beforeSubmit", data, form, option, getUrlData("FILE_URL"));

			try{
				var data_type = $('#filecode').attr('data-type');
				console.log('data_type = ', data_type);
				if(data_type == 'license'){
					console.log(data[0].value.name);
					var fileNm  = data[0].value.name;
					var fileExt = fileNm.substring(fileNm.lastIndexOf(".") + 1 , fileNm.length );
						fileExt = fileExt.toLowerCase();
					if( !(fileExt == 'jpeg' || fileExt == 'jpg' || fileExt == 'gif' || fileExt == 'png')  ){
						alert('ì²¨ë¶€íŒŒì¼ì€ jpeg, png , gifë§Œ ì²¨ë¶€ ê°€ëŠ¥í•©ë‹ˆë‹¤.\n[ '+fileExt+' ] í™•ìž¥ìžëŠ” ì²¨ë¶€í•  ìˆ˜ ì—†ìŠµë‹ˆë‹¤.');
						return false;
					}
				}
			}catch(e){console.log(e);}

			//status.empty();
			// percentVal = '0%';
			// bar.width(percentVal);
			// percent.html(percentVal);
			//validationì²´í¬ 
			//ë§‰ê¸°ìœ„í•´ì„œëŠ” return falseë¥¼ ìž¡ì•„ì£¼ë©´ë¨
			return true;
		},
		uploadProgress:function(event,position,total,percentComplete){
			// percentVal = percentComplete + '%';
			// percent.html(percentVal);
			// bar.width(percentVal);
		},
		error: function(response, status, e){
			console.log(JSON.stringify(e));
			console.log("error  response = " + response+", status = " + status+", e = " + e);
		}, 
		complete:function(xhr){
			var obj = JSON.parse(xhr.responseText);
			console.log(obj);

			if(!isEmpty(obj["data"]) && (obj["data"][0]["afCode"]=="docx" || obj["data"][0]["afCode"]=="advicebg"))
			{
				sel_files=[];
			}

			if(!isEmpty(obj["data"])&&obj["data"][0]["afCode"]=="businessno" || !isEmpty(obj["data"])&&obj["data"][0]["afCode"]=="license" || !isEmpty(obj["data"])&&obj["data"][0]["afCode"]=="joinetc1" || !isEmpty(obj["data"])&&obj["data"][0]["afCode"]=="joinetc2" ) //ì‚¬ì—…ìžë“±ë¡ì¦, ì˜ì‚¬ë©´í—ˆì¦, ê³„ì•½ì„œì²¨ë¶€
			{
				showfiles(obj["data"]);
			}
			else
			{
				handleImgFileSelect(obj["data"]);
			}	
			
			if(obj["status"] == "SUCCESS" && obj["message"] == "FILE_UPLOAD_OK")
			{
				console.log("#####");
				console.log(obj);
				if(obj["data"][0]["afCode"]=="docx" || obj["data"][0]["afCode"]=="advicebg")
				{
					var imgurl=getUrlData("FILE_URL")+obj["data"][0]["afUrl"];

					//viewmemberadvicedesc(obj);

					console.log("docx/advicebg==>"+imgurl);
					$("input[name=mdFileIdx]").val(obj["data"][0]["afseq"]);//ë³µìš©ì§€ì‹œì²¨ë¶€ 
					$("textarea[name=orderadvicefile]").val(imgurl);

				}
				else if(obj["data"][0]["afCode"]=="license")
				{
					$("input[name=mmFileSeq]").val(obj["data"][0]["afseq"]);//ë©´í—ˆì¦ì²¨ë¶€ 
				}
				else if(obj["data"][0]["afCode"]=="businessno")
				{
					$("input[name=mmbFileSeq]").val(obj["data"][0]["afseq"]);//ë©´í—ˆì¦ì²¨ë¶€ 
				}
				else if(obj["data"][0]["afCode"]=="joinetc1")
				{
					$("input[name=mmc1FileSeq]").val(obj["data"][0]["afseq"]);//ê³„ì•½ì„œì²¨ë¶€(í•œì˜ì‚¬) 
				}
				else if( obj["data"][0]["afCode"]=="joinetc2")
				{
					$("input[name=mmc2FileSeq]").val(obj["data"][0]["afseq"]);//ê³„ì•½ì„œì²¨ë¶€(í•œì˜ì›)
				}
				
			}
			else
			{
				if(obj["message"] == "FILE_UPLOAD_FAIL")
					alert('íŒŒì¼ì—…ë¡œë“œì— ì‹¤íŒ¨í–ˆìŠµë‹ˆë‹¤.');//íŒŒì¼ì—…ë¡œë“œì— ì‹¤íŒ¨í–ˆìŠµë‹ˆë‹¤.
				else if(obj["message"] == "FILE_UPLOAD_ERR01")
					alert('ì²¨ë¶€íŒŒì¼ ì‚¬ì´ì¦ˆëŠ” 5MB ì´ë‚´ë¡œ ë“±ë¡ ê°€ëŠ¥í•©ë‹ˆë‹¤.');//ì²¨ë¶€íŒŒì¼ ì‚¬ì´ì¦ˆëŠ” 5MB ì´ë‚´ë¡œ ë“±ë¡ ê°€ëŠ¥í•©ë‹ˆë‹¤.
				else if(obj["message"] == "FILE_UPLOAD_ERR02")
					alert('í—ˆìš©ëœ íŒŒì¼í˜•ì‹ì´ ì•„ë‹™ë‹ˆë‹¤.');//í—ˆìš©ëœ íŒŒì¼í˜•ì‹ì´ ì•„ë‹™ë‹ˆë‹¤.
				else if(obj["message"] == "FILE_UPLOAD_ERR04")
					alert('ë„ë©”ì¸ ê´€ë¦¬ìžì—ê²Œ ë¬¸ì˜ ë°”ëžë‹ˆë‹¤.');//ë„ë©”ì¸ ê´€ë¦¬ìžì—ê²Œ ë¬¸ì˜ ë°”ëžë‹ˆë‹¤.
				else 
					alert('íŒŒì¼ ì˜¤ë¥˜ìž…ë‹ˆë‹¤.');//íŒŒì¼ ì˜¤ë¥˜ìž…ë‹ˆë‹¤.
			}
		}
	});
});
function signupimage()
{
	var len=$(".imgs_wrap a").length;
	console.log("len = " + len);
	if(len==0)
	{
		uploadImage();
	}
	else
	{
		alert("ì´ë¯¸ ì²¨ë¶€ì™„ë£Œí•˜ì˜€ìŠµë‹ˆë‹¤.");
	}
}
function uploadImage()
{
	$("#input_imgs").click();
}
function fileup()
{
	$("#frm").submit();
}
function fileUploadFunc()
{
	$("#fileName").text($("#file").val());
	fileup();
}
//ì´ë¯¸ì§€ë¯¸ë¦¬ë³´ê¸° 
function handleImgFileSelect(filesArr)
{
	var index = 0;
	$(".imgs_wrap").empty();
	var imghtml="";

	for(var key in filesArr)
	{
		sel_files.push(filesArr[key]);
	}

	for(var key in sel_files)
	{
		var chk=sel_files[key]["afThumbUrl"].substring(0,4);//ë²„í‚¤ ì´ë¯¸ì§€ URLì¸ì§€ ì²´í¬í•˜ê¸° ìœ„í•´ì„œ 
		
		if(chk=="http")
		{
			imghtml+="<img src=\"" + (sel_files[key]["afThumbUrl"]) + "\"  data-file='"+sel_files[key]["afName"]+"' class='selProductFile' title='Click to remove'>";
		}
		else
		{
			var sliceRs = sel_files[key]["afThumbUrl"].slice(-3);
			sliceRs=sliceRs.toLowerCase();
			console.log(sliceRs);
			if(sliceRs=="png" || sliceRs=="bmp" || sliceRs=="jpeg" || sliceRs=="peg" || sliceRs=="jpg" || sliceRs=="gif" || sliceRs=="PNG" || sliceRs=="JPEG" || sliceRs=="JPG" || sliceRs=="GIF" || sliceRs=="BMP" )
			{
				imghtml = "<a href=\"javascript:void(0);\" id=\"img_id_"+index+"\" data-seq='"+sel_files[key]["afseq"]+"' >";
				imghtml+= "<i class='xbtn' onclick=\"deleteImageAction("+index+")\">X</i>";
				imghtml+="<img src=\"" + (getUrlData("FILE_URL")+sel_files[key]["afThumbUrl"]) + "\"  data-file='"+sel_files[key]["afName"]+"' class='selProductFile' title='Click to remove'>";

			}
			else  //pdfì´ë©´
			{
				imghtml = "<a href=\"javascript:download('"+getUrlData("FILE_URL")+encodeURI(sel_files[key]["afUrl"])+"','"+encodeURI(sel_files[key]["afName"])+"');\" id=\"img_id_"+index+"\" data-seq='"+sel_files[key]["afseq"]+"' >";
				imghtml+= "<i class='xbtn' onclick=\"deleteImageAction("+index+")\">X</i>";
				imghtml+=sel_files[key]["afName"];
				//imghtml+="<img src=\"" + (getUrlData("FILE_URL")+"pdf.png") + "\"  data-file='"+sel_files[key]["afName"]+"' class='selProductFile' >"+sel_files[key]["afName"];
			}			
			imghtml+="</a>";
		}

		$(".imgs_wrap").append(imghtml);
		index++;
	}

}

//ì´ë¯¸ì§€ê°€ ìžˆë˜ ë°°ì—´ ë¹„ì›Œì£¼ê¸°
function initImgDiv()
{
	sel_files=[]; 
}

//ì´ë¯¸ì§€ ì‚­ì œ 
function deleteImageAction(index) 
{
	var language = getCookie("mck_language");
	var img_txt="ì‚­ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?";
	
	if(language == "chn")
		img_txt="æ˜¯å¦å–æ¶ˆï¼Ÿ";
	else if(language == "eng")
		img_txt="Are you sure you want to delete this image?";
	else 
		img_txt="ì‚­ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?";

	console.log("index : "+index);
	var img_id = "#img_id_"+index;
	//fildelete api í˜¸ì¶œ 
	var af_seq=$("#img_id_"+index).attr("data-seq");
	if(confirm(img_txt))
	{
		var data = "seq="+af_seq;
		sel_files.splice(index, 1);		
		$(img_id).remove(); 
		callapiupload('GET','file','filedelete',data);
		$("#input_imgs").val("");
	}

}
function setFileCode(code, fcode, seq)
{
	var upType=$("input[name=filecode]").data("type");
	upType=(!isEmpty(upType)) ? upType : code;
	console.log("setFileCode  upType = " + upType);
	$("input[name=filecode]").val(upType+"|"+fcode+"|"+seq);
	//$("input[name=filecode]").val("medihub|"+mhcode+"|"+seq);
}
function callapiupload(type,group,code,data)
{

	var language=$("#gnb-wrap").attr("value");
	var timestamp = new Date().getTime();
	if(isEmpty(language)){language="kor";}
	var ck_cfcode=getCookie("mck_cfcode");
	data=data+"&ck_cfcode="+ck_cfcode;

	var url=getUrlData("URL_API_MANAGER")+group+"/";
	console.log("url    >>>   "+url+", type = " + type+", group = " + group);
	
	switch(type)
	{
	case "GET": case "DELETE":
		url+="?apiCode="+code+"&language="+language+"&v="+timestamp+"&"+data;
		data="";
		break;
	case "POST":
		data["apiCode"]=code;
		data["language"]=language;
		break;
	}
	$.ajax({
		type : type, //method
		url : url,
		data : data,
		success : function (result) {
			//console.log("result " + result);
			chkMember(type, result);
		},
		error:function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
   });
}

//ì¶”ê°€ë¨
function uploadfiles(code, fcode, seq)
{
	uploadfiles2(code, fcode, 1);
}
function uploadfiles2(code, fcode, seq)
{
	$("#uploadfrm").appendTo("#"+fcode+"upDiv");
	console.log("uploadfiles2  code = "+code+", fcode = "+fcode+", seq = " + seq);
	goupload(code, fcode, seq);
}
function goupload(code, fcode, seq)
{
	console.log("goupload  code = "+code+", fcode = "+fcode+", seq = " + seq);
	resetuploadfrm2(code, fcode, seq);
	$("#input_imgs").click();
}
function resetuploadfrm(code, fcode)
{
	resetuploadfrm2(code, fcode, 1);
}
function resetuploadfrm2(code, fcode, seq){
	console.log("resetuploadfrm2  code = "+code+", fcode = "+fcode+", seq = " + seq);
	var id=getCookie("mck_stStaffid");
	var language = getCookie("ck_language");
	if(isEmpty(language)){language="kor";}
	$("#uploadfrm").find(".bar").css("width","0")
	$("#uploadfrm").find(".percent").text("0%")
	$("#uploadfrm").appendTo("#uploadfrm"+fcode);
	$("#input_imgs").val("");
	$("#filecode").val(code+"|"+fcode+"|"+seq);
	$("#fileck").val(id+"|"+language);
}
//ì—…ë¡œë“œíŒŒì¼ë¯¸ë¦¬ë³´ê¸° 
function showfiles(files)
{
	$(files).each(function(idx, val){
		console.log( idx+'====>  afCode : ', val["afCode"]+", afFcode : " + val["afFcode"]);
		if(val["afCode"]=="license" || val["afCode"]=="businessno")
		{
			$("#"+val["afCode"]+"files").append(viewfile("ori",val));
		}else if( val["afCode"]=="joinetc1" ||  val["afCode"]=="joinetc2"){
			$("#"+val["afCode"]+"files .filespan").remove();
			$("#"+val["afCode"]+"files").append(viewfile("ori",val));
		}else if( val["afCode"]=="contract2" ){
			$("#"+val["afCode"]+"files .filespan").remove();
			$("#"+val["afCode"]+"files").append(viewfile("",val));
		}
		else{
			$("#"+val["afFcode"]+"files").html(viewfile("ori",val));
		}
		//ì—…ë¡œë“œë°•ìŠ¤ì›ìœ„ì¹˜
		setTimeout("restorebox()",1000);
	});
}
function restorebox(){
	//ì—…ë¡œë“œë°•ìŠ¤ì›ìœ„ì¹˜
	$("#uploadfrm").appendTo("#uploadtmp");
	setTimeout("$('#bar').width(0)",500);
}
//íŒŒì¼ë³´ê¸°
function viewfile(type, val){
	var imghtml="";
	//ë¡œê³ ì¸ ê²½ìš° ì¸ë„¤ì¼ ì‚¬ìš©ì•ˆí•¨
	if(type=="ori"){
		var thefile=val["afUrl"];
	}else{
		var thefile=val["afThumbUrl"];
	}
	if(!isEmpty(thefile))
	{
		var afUse=val["afUse"];
		var checked="";
		var chk=thefile.substring(0,4);//ë²„í‚¤ ì´ë¯¸ì§€ URLì¸ì§€ ì²´í¬í•˜ê¸° ìœ„í•´ì„œ 
		imghtml="<span class='filespan' style='display:inline-block;padding:7px;'>";
		if(afUse=="M")
		{
			checked="checked";
		}
		if(chk=="http")
		{
			imghtml+="<img src='"+thefile+"'  data-file='"+val["afName"]+"' class='selProductFile' title='Click to remove'>";
		}
		else
		{
			var n_afseq = val["afseq"];
			if(n_afseq == undefined){
				n_afseq = val["afSeq"];
			}
			imghtml+= "<a href='javascript:void(0);' onclick='Imagedel("+n_afseq+",\""+val["afFcode"]+"\")' data-seq='"+n_afseq+"' id='file"+n_afseq+"'>";
			var sliceRs = val["afThumbUrl"].slice(-3);
			sliceRs=sliceRs.toLowerCase();
			console.log(sliceRs);
			if(sliceRs=="png" || sliceRs=="bmp" || sliceRs=="jpeg" || sliceRs=="peg" || sliceRs=="jpg" || sliceRs=="gif" || sliceRs=="PNG" || sliceRs=="JPEG" || sliceRs=="JPG" || sliceRs=="GIF" || sliceRs=="BMP" )
			{
				imghtml+="<img src='"+getUrlData("FILE_URL")+thefile+"'  data-file='"+val["afName"]+"' class='selProductFile' title='Click to remove'>";

			}
			else  //pdfì´ë©´
			{
				imghtml+=val["afName"];
			}	
			//imghtml+="<img src='"+getUrlData("FILE_URL")+thefile+"'  data-file='"+val["afName"]+"' class='selProductFile' title='Click to remove'>";
			imghtml+="</a>";
		}
		imghtml+="</span>";
	
	}
	return imghtml;
}

//ì´ë¯¸ì§€ ì‚­ì œ 
function Imagedel(seq,fcode) 
{
	console.log("seq   >>>   "+seq);
	console.log("fcode   >>>   "+fcode);
	if(confirm("ì‚­ì œí•˜ì‹œê² ìŠµë‹ˆê¹Œ?"))
	{
		var ck_cfcode=getCookie("ck_cfcode");
		//fildelete api í˜¸ì¶œ 
		var data = "seq="+seq+"&ck_cfcode="+ck_cfcode;
		console.log("data : "+data);
		$("#img_id_"+fcode).remove(); 
		callapiupload('GET','file','filedelete',data);
		$("#file"+seq).parent(".filespan").remove();
		//location.reload();
	}
}
