$('.delete-btn').click(function(){
	var noticeNo = $(this).siblings()[0].value;
	
    $('.modal-container').fadeIn(100);
    $('.popup-title').text("๐ค ํด๋น ๊ฒ์๊ธ์ ์ญ์ ํ์๊ฒ ์ต๋๊น?");
    $('.btn-agree').text('์ญ์ ํ๊ธฐ');

    $('.btn-agree').off().click(noticeNo, function(){
        console.log(noticeNo);
    	$('.modal-container').fadeOut(100);
    	deleteNotice(noticeNo);
    })
})

$('.btn-cancel').click(function(){
    $('.modal-container').fadeOut(100);
})

// Modal์ฐฝ์์ ์ญ์ ํ๊ธฐ ๋ฒํผ ํด๋ฆญ ์ ํธ์ถ๋๋ ๋ฉ์๋
function deleteNotice(data){
	var pdata = {"noticeNo" : data};
	$.ajax({
		url : "/admin/deleteNotice.do"
		, type : "post"
		, data : pdata
		, success : function(data){
		    goNoticeList();
		}
		, error : function(xhr){
			alert("์๋ฌ ๋ฐ์ : " + xhr.status);
		}
	})
}

function goNoticeList(){
	window.location = "http://localhost:9090/admin/noticeList.do";
}

