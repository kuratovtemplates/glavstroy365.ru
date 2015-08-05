$(document).ready(function() {
	/*Own variant value of radio button*/
	$("input[id^='Radio-']").click(function(){
		var nameradio = $(this).attr("name");
		if ($(this).attr("id").indexOf("-0-") >= 0) {
			$("input[name='"+nameradio+"_own']").slideDown("slow");
		} else {
			$("input[name='"+nameradio+"_own']").attr("style", "display: none");
			$("input[name='"+nameradio+"_own']").val("");
		} 
	});

	$("input[name$='_own']").keyup(function(){
  	$(this).parent().parent().find("input[id^='Radio-0-']").val($(this).val());
	});
	/*Own variant value of radio button*/

});

function UpdateRadioInGrade(labels){
	var obj_labels = labels; 	
	for(var key in obj_labels) {
    var value = obj_labels[key];
    var targetlabel = $("label input[name='"+key+"']").parent();
    var ownvariant = true;
    targetlabel.each(function(){
    	if(($(this).children("input").val().indexOf(value) >= 0)&&(($(this).children("input").val().length) == value.length)){
    		$(this).children("input").attr("checked", "checked");
    		ownvariant = false;
    	}

    });
    if (ownvariant) {
    	$("label input[name='"+key+"']").parent().last().children("input").attr("checked", "checked");
    	$("label input[name='"+key+"']").parent().last().children("input").val(value);
    	$("input[name='"+key+"_own']").slideDown("slow");
    	$("input[name='"+key+"_own']").val(value);
    }
    
	}
}

