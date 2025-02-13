 
// $(document).ready(function() {
  document.addEventListener('DOMContentLoaded', function() {

    function setData(){
      //작업실 온/습도 tempbox
      $("#GaugeMeter_101").attr("data-percent",100);
      $("#GaugeMeter_102").attr("data-percent",100); 
  
      //탕전 주문 현황
      $("#GaugeMeter_107").attr("data-percent",100);
      $("#GaugeMeter_108").attr("data-percent",100);
      $("#GaugeMeter_109").attr("data-percent",100);
      $("#GaugeMeter_110").attr("data-percent",100); 
  
      //예비 조제 주문 현황
      $("#GaugeMeter_111").attr("data-percent",100);
      $("#GaugeMeter_112").attr("data-percent",100);
      $("#GaugeMeter_113").attr("data-percent",100);
      $("#GaugeMeter_114").attr("data-percent",100); 
      $("#GaugeMeter_115").attr("data-percent",100); 
  
      //택배 발송 현황
      $("#GaugeMeter_116").attr("data-used",100);
      $("#GaugeMeter_117").attr("data-used",100);
      $("#GaugeMeter_118").attr("data-used",100);
      $("#GaugeMeter_119").attr("data-used",100); 
    }
    setData();

    //작업실 온/습도
    $(".GaugeMeter").gaugeMeter({
      theme: 'pink',
      color: '#FF5894', 
      });    
    $(".GaugeMeter2").gaugeMeter({
      theme: 'cyonblue',
      color: '#41F3F5', 
    });  

    // 택배발송현황
    // parbox
  $(".GaugeMeter5").gaugeMeter({
    theme: 'blue',
    color: '#2986cc', 
  });  
  $(".GaugeMeter6").gaugeMeter({ 
    theme: 'cyonblue',
    color: '#62E9EB',  
  });  

  // 탕전 주문현황
  // leftbox
  $(".GaugeMeter7").gaugeMeter({
    theme: 'Purple',
    color: '#C322FB',
  });  

  // 예비조제 주문현황
  // rightbox
  $(".GaugeMeter8").gaugeMeter({
    theme: 'green',
    color: '#6AF288',
  });   
    
  //탕전 주문 건수
  // weekbox
  const ctx3 = document.getElementById('weekChart');  
  const weekChart = new Chart(ctx3, {
    type: 'line',
    data: {
      labels: ['월', '화', '수', '목', '금', '토'],
      datasets: [{
      label: '# of this week',
      data: [464, 300, 400, 500, 600, 300],
      tension:0.4,
      borderWidth: 5,
      borderColor:'#6AF288',  
      pointBorderColor: '#6AF288',
      pointWidth:5,
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: '#fff'
      },
      {
      label: '# of last week',
      data: [596, 512, 417, 389, 348, 342],
      tension:0.4,
      borderWidth: 5,
      borderColor: '#ccc',
      pointBorderColor: '#ccc',
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      plugins: {
              title: {
                  display: true, 
                    
              },
              legend: {
                  display:false,
                  labels: {
                      color:'red'
                  },
                  data: {
                      color:'white'
                  }
              }
              },
      
      scales: {
        x: { 
          ticks: {
            color:'#000'
          },
          grid: {
          color: '#ccc', // x축 그리드 색상 변경 
        }
        },
        y: {
          beginAtZero: false,
          min:100,
          max:700,
          ticks: {
            color:'#000'
          },
          grid: {
          color: '#ccc' // x축 그리드 색상 변경
        }
        },
          
      },
      animations: {
        y: {
          easing: 'easeInOutElastic',
          from: (ctx) => {
            if (ctx.type === 'data') {
              if (ctx.mode === 'default' && !ctx.dropped) {
                ctx.dropped = true;
                return 0;
              }
            }
          }
        },
        
      }, 
        
    }
  }); 

  // 전체 주문 대비 현재 작업량
   // leftbox2 leftchart 
   const ctx5 = document.getElementById('leftChart'); 
      
   const leftChart = new Chart(ctx5, {
     type: 'line',
     data: {
       labels: ['대기', '로젠', '한진', '기타'],
       datasets: [{
       label: '# of all',
       data: [400,300,350,300],
       borderWidth: 5,
       borderColor:'#ccc',
       tension:0.4, 

       pointBorderColor: '#ccc',
       pointWidth:5,
       pointRadius: 5,
       pointBorderWidth: 2,
       pointBackgroundColor: '#fff',
       fill: '1',
       backgroundColor: 'rgba(236, 236, 236, 0.3)', 
       },
       {
       label: '# of now',
       data: [300,200,150,180],
       borderWidth: 5, 
       tension:0.4,
      borderWidth: 5,
      borderColor: '#FF34EB', //hotpink
      pointBorderColor: 'white',
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: '#FF34EB', //hotpink
      fill: 'start',
      backgroundColor: 'rgba(250, 53, 220, 0.2)', 
       }]
     },
       options: {
       responsive: true,
       plugins: {
               title: {
                   display: true, 
                    
               },
               legend: {
                   display:false,
                   labels: {
                       color:'red'
                   },
                   data: {
                       color:'white'
                   }
               }
               },
       
       scales: {
         x: { 
           ticks: {
             color:'#000'
           },
           grid: {
           color: '#ccc', // x축 그리드 색상 변경 
         }
         },
         y: {
           beginAtZero: false,
           min:100,
           max:450,
           ticks: {
             color:'#000'
           },
           grid: {
           color: '#ccc' // x축 그리드 색상 변경
         }
         }
       }
       
     }
   });  

 // 조제대별 소요 시간
 // bottombox1-2 presChart 
 const ctx7 = document.getElementById('presChart'); 
 const presChart = new Chart(ctx7, {
   type: 'line',
   data: {
     labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
     datasets: [
      
      
     {
      label: '# this week',
      data: [2.5, 3.5, 4.5, 4.5, 2.5, 3.5, 3.5, 3.5, 4.5, 4.5, 4.5, 4.5, 3.5, 3.5, 3.5, ],
      tension:0.4,
      borderWidth: 5,
      borderColor: '#C322FB', //purple
      pointBorderColor: 'white',
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: '#C322FB', //purple
      fill: '1',
      backgroundColor: 'rgba(130, 53, 250, 0.2)', 
      },{
     label: '# of last week',
     data: [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, ],
     tension:0.4,
     borderWidth: 3,
     borderColor:'rgba(174,174,174,0.99)',
     
     // 기존 데이터셋 설정 

     pointBorderColor: '#ececec',
     pointWidth:'1',
     pointRadius: '1',
     pointBorderWidth: '1',
     pointBackgroundColor: 'rgba(174,174,174,1)',
     fill: 'start',
     backgroundColor: 'rgba(236, 236, 236, 0.1)', 
     }, ]
   },
     options: {
     responsive: true,
     plugins: {
             title: {
                 display: true, 
                   
             },
             legend: {
                 display:false,
                 labels: {
                     color:'red'
                 },
                 data: {
                     color:'white'
                 }
             }
             },
     
     scales: {
       x: { 
         ticks: {
           color:'#5c5c5c'
         },
         grid: {
         color: '#ccc', // x축 그리드 색상 변경 
       }
       },
       y: {
         beginAtZero: false,
         max:5,
         ticks: {
           color:'#5c5c5c',
           stepSize: 1 // 간격을 1로 설정
         },
         grid: {
         color: '#ccc' // x축 그리드 색상 변경
       }
       }
     },
     // animations: {
     //   y: {
     //     easing: 'easeInOutElastic',
     //     from: (ctx) => {
     //       if (ctx.type === 'data') {
     //         if (ctx.mode === 'default' && !ctx.dropped) {
     //           ctx.dropped = true;
     //           return 0;
     //         }
     //       }
     //     }
     //   },
       
     // }, 
     
   }
 }); 
});