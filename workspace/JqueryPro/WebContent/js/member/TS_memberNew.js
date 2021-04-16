/**
 * 
 */

var loginId = "";

$(document).ready(function() {

	initSelect();

	// 취미,직업, 기념일코드 세팅
	// initLikeSelect();
	// initJobSelect();
	// initMemorialSelect();

	// 이메일 수신동의 default 세팅(N)
	$("#recvEmail_N").prop("checked", true);

	// 우편번호찾기 화면-시 세팅
	// initCitySelect();

	
	// 아래 두줄의 차이 
	// $("#tbZipResult tbody").dblclick(function(){
	//);
	$("#tbZipResult tbody").on("dblclick","tbody tr", function(){
		// this ==> tr
		console.log(this);
		
		var zipcode = $(this).children("td:eq(0)").text();
		var addr = $(this).children("td:eq(1)").text();
		
		// 메인화면(부모창)의 우편번호, 주소 input에 데이터 세팅
		$("#memZip").val(zipcode);
		$("#memAdd1").val(addr);
		
	});
	
	// on : 동적 요소 포함 ( e.g. 그 당시 테이블이 없어도 이 후에 생기게 되면 바인딩 O)(계속 추적하는 느낌?)  
	// dblclick : 동적 요소 미포함   (e.g. 그 당시 테이블이 없다면 바인딩 X) 
});
// 취미코드 조회해서 세팅
function initSelect() {
	var strId = [];
	// var param;
	// param ={"flag" : "init"};
	$.ajax({
		url : "/JqueryPro/CodeServlet",
		type : "post"
		// ,data : param
		,
		dataType : "json",
		success : function(data) {
			// console.log(data);
			makeSelect(data);
			alert("성공");
		},
		error : function(xhr) {
			console.error(xhr);
			alert("오류");
		}
	});

}

function makeSelect(data) {
	var strId;
	var idx;
	for (i = 0; i < data.length; i++) {
		// data[i].get("value") : 그룹 코드 번호
		// data[i].get("name") : 그룹 코드 이름 e.g.취미코드
		// "취미코드".indexOf("코드") : 2
		// "취미코드".substr(0,2)

		$.ajax({
			url : "/JqueryPro/CodeServlet",
			type : "post"
			// ,data : {
			// "groupCode" : data[i].get("groupCode")
			// }
			,
			dataType : "json",
			success : function(data) {
				// console.log(data);
				var tmp = data;
				makemakeSelect(data);
				// alert("성공");
			},
			error : function(xhr) {
				console.error(xhr);
				alert("오류");
			}
		});
	}
	;
}
function makemakeSelect(data) {
	var strHtml = "";

	for (i = 0; i < data.length; i++) {

		if (data[i].groupCodeName.indexOf("코드") != -1) {
			idx = data[i].groupCodeName.indexOf("코드");
			strId = data[i].groupCodeName.substr(0, idx);
			strHtml += "<option value=" + data[i].cnt + ">" + data[i].codeName
			+ "</option>";
			if (i != (data.length - 1)) {
				if (data[i].groupCode != data[i + 1].groupCode) {
					$("select[title='"+strId+"'").html();
					strHtml = "";
				}
			}
		} else {
			idx = data[i].groupCodeName.indexOf("유형");
			strId = data[i].groupCodeName.substr(0, idx);
			if(strId.equals("취미")){
				var Eng = Like;
			} else 
			strHtml += "<label for='memLike" + data[i].description
			+ "'><input type='checkbox' id='memLike" + data[i].description
			+ "' name='memLike' value='" + data[i].value + "'>"
			+ data[i].name + "</label>";
			if (i != (data.length - 1)) {
				if (data[i].groupCode != data[i + 1].groupCode) {
					$("div[title='"+strId+"'").html();
					strHtml = "";
				}
			}

		}
		

		
	}
	console.log(strHtml);
	// if($("select").attr("title").equlas(strId)){
	// $("select").attr("title").html(strHtml);
	// }
}

// DB에서 중복검사 수행
function checkId() {
	var memId = $("#memId").val();
	alert(memId);
	// 빈값 확인
	if (isEmpty(memId)) {
		// console.log(memId);
		alert("ID 값이 입력되지 않았습니댜");
		$("#memId").focus();
		return;
	}
	// 유효성 검사 - 영어소문자와 숫자로 구성, 3글자 이상 10글지 이하
	var regExp = /^[a-z0-9]{3,10}$/;
	// console.log(regExp);
	if (!regExp.test(memId)) {
		alert("ID값이 유효하지 않습니다");
		$("#memId").focus();
		return;
	}
	// DB에서 중복검사 수행

	$.ajax({
		url : "/JqueryPro/MemberServlet",
		type : "post",
		data : {
			'memId' : memId,
			'flag' : 'CHKID'
		},
		dataType : "json",
		success : function(data) {
			// console.log(data);
			// console.log(data.resultCnt);
			// console.log(typeof data.resultCnt); // String
			if (data.resultCnt == 0) {
				alert("사용가능!!");
			} else {
				alert("중복!!");
			}
		},
		error : function(xhr) {
			console.error(xhr);
		}
	});
}

function initCitySelect() {
	$.ajax({
		url : "/JqueryPro/ZipServlet",
		type : "post"
		// ,data : {
		// "groupCode" : "A01"
		// }
		,
		dataType : "json",
		success : function(data) {
			console.log(data);
			makeSidoSelect(data);
			alert("성공");
		},
		error : function(xhr) {
			console.error(xhr);
			alert("오류");
		}
	});
}

function makeSidoSelect(data) {
	// 방법1)
	var strHtml = "<option value=''>선택하세요</option>";
	for (i = 0; i < data.length; i++) {
		strHtml += "<option value=" + data[i].value + ">" + data[i].sido
				+ "</option>";
	}
	console.log(strHtml);
	$("#Sido").html(strHtml);
	// 방법2)
	// setGugun();
	// 방법3)
	// 트리거로 Change호출
}

function makeGugunSelect(data) {
	if ($("#Sido").val() != '') {
		$("#Gugun").prop("disabled", false);
	}
	var strHtml = "<option value=''>선택하세요</option>";
	for (i = 0; i < data.length; i++) {
		strHtml += "<option value=" + data[i].value + ">" + data[i].gugun
				+ "</option>";
	}
	console.log(strHtml);
	$("#Gugun").html(strHtml);

}

function makeDongSelect(data) {
	if ($("#Gugun").val() != '') {
		$("#Dong").prop("disabled", false);
	}
	var strHtml = "<option value=''>선택하세요</option>";
	for (i = 0; i < data.length; i++) {
		strHtml += "<option value=" + data[i].value + ">" + data[i].dong
				+ "</option>";
	}
	console.log(strHtml);
	$("#Dong").html(strHtml);

}
function makeZipTable(data) {
	$("#divZipResult").show();
	$("#tbZipResult tbody").empty();
	var strHtml = "";
	for (i = 0; i < data.length; i++) {
		// <tr onclick = 'fntest( " 300-301", "대전" , "중구", "문화1동", "1번지" );'>
		// strHtml += "<tr onclick='fntest( \"" + data[i].sido + "\",
		// \""+data[i].gugun+"\"+, \""+data[i].dong+"\");'>" // "300-801
		strHtml += "<tr onclick = 'fntest( " + data[i] + " );'>" // "300-801
				+ "<td>" + data[i].zipcode + "</td>" + "<td>" + data[i].sido
				+ " " + data[i].gugun + " " + data[i].dong + " "
				+ changeEmptyVal(data[i].bunji) + "</td>" + "</tr>";
	}
	$("#tbZipResult tbody").html(strHtml);
	console.log(strHtml);
	// $("#Dong").html(strHtml);
}

function test(obj) {

	console.log(obj);

}
function setGugun() {
	var param;
	param = {
		"sido" : $("#Sido").val(),
		"flag" : "GUGUN"
	};
	$.ajax({
		url : "/JqueryPro/ZipServlet",
		type : "post",
		data : param,
		dataType : "json",
		success : function(data) {
			console.log(data);
			makeGugunSelect(data);
			// alert("성공");
		},
		error : function(xhr) {
			console.error(xhr);
			alert("오류");
		}
	});
}

function setDong() {
	var param;
	param = {
		"sido" : $("#Sido").val(),
		"gugun" : $("#Gugun").val(),
		"flag" : "DONG"
	};
	$.ajax({
		url : "/JqueryPro/ZipServlet",
		type : "post",
		data : param,
		dataType : "json",
		success : function(data) {
			console.log(data);
			makeDongSelect(data);
			// alert("성공");
		},
		error : function(xhr) {
			console.error(xhr);
			alert("오류");
		}
	});
}

function setZip() {
	var param;
	param = {
		"sido" : $("#Sido").val(),
		"gugun" : $("#Gugun").val(),
		"dong" : $("#Dong").val(),
		"flag" : "ZIP"
	};

	$.ajax({
		url : "/JqueryPro/ZipServlet",
		type : "post",
		data : param,
		dataType : "json",
		success : function(data) {
			console.log(data);
			makeZipSelect(data);
			// alert("성공");
		},
		error : function(xhr) {
			console.error(xhr);
			alert("오류");
		}
	});
}