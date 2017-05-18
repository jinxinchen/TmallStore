$(function(){
	$(".leaveMessageImg").click(function(){
		$(this).hide();
		$("span.leaveMessageTextareaSpan").show();
		$(".orderItemSumDiv").css("height","100px")
	})
})