var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var city_from = new google.maps.LatLng(58.595347,35.800685);
var city_end = new google.maps.LatLng(55.755826,37.6173);

var bounds = new google.maps.LatLngBounds();

var rendererOptions = {
  draggable: true
};

function isset(e,tt,tt1){
    /**
     *
     * e:       element for test
     * tt,tt1:  ['string'] - check for empty string.
     *              return: if string isset but is empty - return false
     *          ['array'] - check for empty array.
     *              return: if array isset but is empty - return false
     *
     * function return: true - if isset
     *                  false - if not isset
     *                  0 - if can`t check
     *
     * usage note:
     *  for check jQuery element like $('div'), need use param 'array'.
     *  parameters after 'e' can be administered in any order (isset(e,'string'); isset(e,'array'); isset(e,'string','array'); - all this work fine)
     */
    var t = [];
    if(typeof tt != 'undefined'){
        t[t.length] = tt;
    }
    if(typeof tt1 != 'undefined'){
        t[t.length] = tt1;
    }
    var type = typeof e;

    if(type != 'undefined' && e != null){
        if(t.length>0){
            for(var j=0;j<t.length;j++){
                if(e.length<=0
                    && ((type == 'string' && t[j] == 'string')
                    || (type == 'object' && t[j] == 'array'))){
                    return false;
                }
            }
        }
        return true;
    }else{
        return false;
    }
    return 0;
}


function initialize() {
  //var deliveryRubPerKM = document.getElementById('searchTextField').getAttribute('data-deliveryprice');
  //var distanceStart = document.getElementById('searchTextField').getAttribute('data-distancestart');

  var deliveryRubPerKM = document.getElementById('deliveryprice').value;
  var distanceStart = document.getElementById('distancestart').value;
  if (!isset(distanceStart)) distanceStart=0;
  var input = document.getElementById('searchTextField');
  var input_from = document.getElementById('searchTextField_from');

  //var city_from = "п. Волховец, Новгородская область, Россия";
  var options = {
    types: ['(cities)'],
  };

  var autocomplete = new google.maps.places.Autocomplete(input, options);
  var autocomplete_from = new google.maps.places.Autocomplete(input_from, options);
  


  directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
  
  var mapOptions = {
    zoom:7,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: city_from
  }

  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  directionsDisplay.setMap(map);

   google.maps.event.addListener(autocomplete_from, 'place_changed', function() {
    var place_from = autocomplete_from.getPlace(); //получаем место
    //console.log(place_from.geometry.location.lng()); 
    //city_from = new google.maps.LatLng(58.525974,31.267662);
    var deliveryRubPerKM = document.getElementById('deliveryprice').value;
    var distanceStart = document.getElementById('distancestart').value;
    city_from  = place_from.formatted_address;
    calcRoute(city_from, city_end, deliveryRubPerKM, distanceStart);
    //$('input[name=adrdost]').val(place.formatted_address);
  });


  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace(); //получаем место
    //city_from = new google.maps.LatLng(58.525974,31.267662);
    var deliveryRubPerKM = document.getElementById('deliveryprice').value;
    var distanceStart = document.getElementById('distancestart').value;
    city_end = place.formatted_address;
    calcRoute(city_from, city_end, deliveryRubPerKM, distanceStart);
    //$('input[name=adrdost]').val(place.formatted_address);
  });

/*
 google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
    //computeTotalDistance(directionsDisplay.getDirections());
    var deliveryRubPerKM = document.getElementById('deliveryprice').value;
    var distanceStart = document.getElementById('distancestart').value;
     calcRoute(directionsDisplay.getDirections().mc.origin, directionsDisplay.getDirections().mc.destination, deliveryRubPerKM, distanceStart);
    //calcRoute(city_from, city_end, deliveryRubPerKM, distanceStart);
  });
*/

}

function calcRoute(start, end, priceRubPerKM, distanceMin) {
 
  var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
     
      bounds = response.routes[0].bounds;
      for (var i = 0; i < route.legs.length; i++) {
              var routeSegment = i + 1;
              var km_int = parseInt ((route.legs [i].distance.text).replace (/\s/g, ''));

              var price_delivery = (km_int > distanceMin) ? priceRubPerKM*(km_int-distanceMin) : 0;
              if($('#searchTextField').val() != "" && $('#searchTextField_from').val() != "") { 
                $('#distance').html('<b>Примерная стоимость доставки комплекта материалов: <span class="price_red">'+price_delivery+' руб. (<span id="kmId">'+km_int+'</span> км)</span></b>');
                $('#distance').css({'margin-top' :'10px'});
              }
      }
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);

      $(document).ready(function(){
        $('#searchTextField, #searchTextField_from').change(function(){
          $('html, body').animate({scrollTop: $("#formDelivery").offset().top}, 2000);
          if($('#searchTextField').val() != "" && $('#searchTextField_from').val() != "") { 

            $('#map_canvas').slideDown("slow", function() {
              google.maps.event.trigger(map, 'resize');
              map.fitBounds(bounds);
            });
           
          } else {
            $('#map_canvas').hide("slow", function() {
              google.maps.event.trigger(map, 'resize');
            });
            $('#distance').html('<b>Не выбран город</b>');
            $('input[name=addrdost]').val('');
          }

        });
       
      $('#formDelivery').submit(function() {
        //$('html, body').animate({scrollTop: $("#formDelivery").offset().top}, 2000);
        return false;
      });

      $('#deliveryprice, #distancestart').change(function(){
        if($('#searchTextField').val() != "" && $('#searchTextField_from').val() != "") { 
          var km_int_n = $('#kmId').text();
          var distanceMin_n = $('#distancestart').val();
          var priceRubPerKM_n = $('#deliveryprice').val();
          var price_delivery_n = (km_int_n > distanceMin_n) ? priceRubPerKM_n*(km_int_n-distanceMin_n) : 0;
          

          $('#distance').html('<b>Примерная стоимость доставки комплекта материалов: <span class="price_red">'+price_delivery_n+' руб. (<span id="kmId">'+km_int_n+'</span> км)</span></b>');
        }

      });

    });
