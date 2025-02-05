$(document).ready(function () {
    //GaugeMeter  
    // $('.GaugeMeter').gaugeMeter();
    $('#GaugeMeter_101').gaugeMeter({ percent: 15 });
    $(".GaugeMeter").gaugeMeter({
    theme: 'pink',
    color: '#FF5894', 
    }); 

    // $('.GaugeMeter2').gaugeMeter();
    $('#GaugeMeter_102').gaugeMeter({ percent: 15 });
    $(".gmhum").gaugeMeter({
    theme: 'cyonblue',
    color: '#41F3F5', 
    }); 


  });