$(function(){
	$("a[orderStatus]").click(function(){
		var orderStatus = $(this).attr("orderStatus");
		if('all' == orderStatus){
			$("table[orderStatus]").show();
		}else{
			$("table[orderStatus]").hide();
			$("table[orderStatus="+orderStatus+"]").show();
		}
		$(".orderType div").removeClass("selectedOrderType");
		$(this).parent("div").addClass("selectedOrderType");
	});
})