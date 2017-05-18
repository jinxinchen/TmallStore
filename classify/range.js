$(function(){
	$(".sortBarPrice").keyup(function(){
		var num = $(this).val();
		if(num.lenght==0){
			$(".productUnit").show();
			return;
		}
		num = parseInt(num);
		if(isNaN(num)){
			num=1
		}
		if(num<0){
			num=1;
		}
		$(this).val(num);
		var beginPrice = $(".beginPrice").val();
		var endPrice = $(".endPrice").val();
		if(!isNaN(beginPrice) && !isNaN(endPrice)){
			$(".productUnit").hide();
			$(".productUnit").each(function(){
				var price = $(this).attr("price");
				price = new Number(price);
				if(price<=endPrice && price>=beginPrice){
					$(this).show();
				}
			})
		}
	})
})