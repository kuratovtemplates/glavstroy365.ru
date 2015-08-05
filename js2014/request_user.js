$(document).ready(function() {

	$("#ulradioButton li").click(function(e){
		$("input#requset_users_typebuilding").val($(this).data("value"));
	});

  $("#ULbiudjhetselect li a").click(function(e){
  	$("input#requset_users_price").val($(this).data("value"));
  });

});