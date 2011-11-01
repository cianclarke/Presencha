document.onready = function(){
  var hash = window.location.hash;
  if (hash.indexOf('preview')!==-1){
    document.getElementById('getStarted').style.display = "inline-block";
  }
  
}

function getStarted(){
  
  $('#hcard1').fadeOut('fast', function(){
    $('#hcard2').fadeIn('slow');  
  });

}

function uploadSubmit(evt){
  // TODO: Something with iFrame's and catching the submit...
   
}

