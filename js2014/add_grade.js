function ClearSelect(select_clear){
	var select = select_clear;
  console.log(select);
    if( select.children("option[value='Отсутствует']").length > 0){
  	  $(select).val("Отсутствует");
  	  $(select).selectpicker('render');
  	  $(select).closest("input[name$='_own']").attr("style", "display: none");
			$(select).closest("input[name$='_own']").val("");
  	} else {
  	  $(select).val("Нет");
  	  $(select).selectpicker('render');
  	  $(select).closest("input[name$='_own']").attr("style", "display: none");
			$(select).closest("input[name$='_own']").val("");
  	}
}


$(document).ready(function() {
	$('.selectpicker').selectpicker();

	/*Own variant value of select button*/

	$("select[id^='Select-']").change(function(){
		var nameselect = $(this).attr("name");
		var selectedoption = $(this).find(":selected").val();
		var selectedoptionid = $(this).find(":selected").attr("id");
		
		if (selectedoptionid.indexOf("-0-") >= 0) {
			$("input[name='"+nameselect+"_own']").slideDown("slow");
		} else {
			$("input[name='"+nameselect+"_own']").attr("style", "display: none");
			$("input[name='"+nameselect+"_own']").val("");
			$(this).parent().parent().find("option[id^='Select-0-']").val("");
		} 
	});

	$("input[name$='_own']").keyup(function(){
  	$(this).parent().parent().find("option[id^='Select-0-']").val($(this).val());
	});
	/*Own variant value of select button*/


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

	$("button[data-toggle=collapse]").click(function(){
	  $(this).toggleClass('btn-primary btn-default');
	  ($(this).html() == '<i class="fa fa-power-off"></i> Включить') ? $(this).html('<i class="fa fa-power-off"></i> Выключить') : $(this).html('<i class="fa fa-power-off"></i> Включить');
	  if($(this).html() == '<i class="fa fa-power-off"></i> Включить'){
	  	$($(this).data("target")).find("select").each(function(){
	  		ClearSelect($(this));
	  	});
	  }
	});

});


function UpdateSelectInGrade(labels){
	var obj_labels = labels; 	
	for(var key in obj_labels) {
    var value = obj_labels[key];
    var targetselect = $("select[name='"+key+"']");

    if ($(targetselect).parent().parent().parent().hasClass("collapse") ){
    	var divcollapse = $(targetselect).parent().parent().parent();
    	var id_divcollapse = divcollapse.attr("id");
    	console.log(id_divcollapse);
    	if (value!="Отсутствует" && value!="Нет"){
	    	divcollapse.addClass("in");
				$("button[data-target=#"+id_divcollapse+"]").html('<i class="fa fa-power-off"></i> Выключить');
				$("button[data-target=#"+id_divcollapse+"]").removeClass('btn-primary').addClass('btn-default');
    	}
    }
    
    var ownvariant = true;
    $(targetselect).children("option").each(function(){
    	if(($(this).val().indexOf(value) >= 0)&&(($(this).val().length) == value.length)){
    		$(targetselect).val($(this).val());
				$(targetselect).selectpicker('render');
    		ownvariant = false;
    	}

    });
    if (ownvariant) {
    	$(targetselect).val('Свой вариант');
			$(targetselect).selectpicker('render');
			$(targetselect).val(value);
    	$("input[name='"+key+"_own']").slideDown("slow");
    	$("input[name='"+key+"_own']").val(value);
    }
    
	}
}


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


