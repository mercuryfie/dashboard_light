 
// $(document).ready(function() {
  document.addEventListener('DOMContentLoaded', function() {

    $(".GaugeMeter").gaugeMeter({
      theme: 'pink',
      color: '#FF5894', 
      });    
    $(".GaugeMeter2").gaugeMeter({
      theme: 'cyonblue',
      color: '#41F3F5', 
    });  

    // parbox
  $(".GaugeMeter5").gaugeMeter({
    theme: 'blue',
    color: '#2986cc', 
  });  
  $(".GaugeMeter6").gaugeMeter({ 
    theme: 'cyonblue',
    color: '#62E9EB',  
  });  

  // leftbox
  $(".GaugeMeter7").gaugeMeter({
    theme: 'Purple',
    color: '#C322FB',
  });  

  // rightbox
  $(".GaugeMeter8").gaugeMeter({
    theme: 'green',
    color: '#6AF288',
  });   
    
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
      
      // 기존 데이터셋 설정
      fill: '-1',
      backgroundColor: 'rgba(0, 123, 255, 0.2)',

      pointBorderColor: 'white',
      pointWidth:5,
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: '#6AF288'
      },
      {
      label: '# of last week',
      data: [596, 512, 417, 389, 348, 342],
      tension:0.4,
      borderWidth: 5,
      borderColor: '#ccc',
      pointBorderColor: 'white',
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: '#ccc'
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
            color:'#ececec'
          },
          grid: {
          color: '#5c5c5c', // x축 그리드 색상 변경 
        }
        },
        y: {
          beginAtZero: false,
          min:100,
          max:700,
          ticks: {
            color:'#ececec'
          },
          grid: {
          color: '#5c5c5c' // x축 그리드 색상 변경
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

   // leftbox2 leftchart 
   const ctx5 = document.getElementById('leftChart'); 
      
   const leftChart = new Chart(ctx5, {
     type: 'line',
     data: {
       labels: ['대기', '로젠', '한진', '기타'],
       datasets: [{
       label: '# of this week',
       data: [400,300,350,300],
       borderWidth: 5,
       borderColor:'rgba(236,236,236,0.5)',
       tension:0.4,
       // 기존 데이터셋 설정
       fill: '-1',
       backgroundColor: 'rgba(0, 123, 255, 0.2)',

       pointBorderColor: 'white',
       pointWidth:5,
       pointRadius: 5,
       pointBorderWidth: 2,
       pointBackgroundColor: 'rgba(236,236,236,0.5)',
       fill: '1',
       backgroundColor: 'rgba(236, 236, 236, 0.1)', 
       },
       {
       label: '# of last week',
       data: [300,200,150,180],
       borderWidth: 5,
       borderColor: '#FF34EB', //hotpink
       tension:0.4,
       
       pointBorderColor: 'pink',
       pointRadius: 5,
       pointBorderWidth: 2,
       pointBackgroundColor: '#FF34EB' //hotpink
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
             color:'#ececec'
           },
           grid: {
           color: '#5c5c5c', // x축 그리드 색상 변경 
         }
         },
         y: {
           beginAtZero: false,
           min:100,
           max:450,
           ticks: {
             color:'#ececec'
           },
           grid: {
           color: '#5c5c5c' // x축 그리드 색상 변경
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
     datasets: [{
     label: '# of last week',
     data: [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, ],
     tension:0.4,
     borderWidth: 5,
     borderColor:'rgba(174,174,174,0.99)',
     
     // 기존 데이터셋 설정
     fill: '2',
     backgroundColor: 'rgba(0, 123, 255, 0.5)',

     pointBorderColor: 'white',
     pointWidth:5,
     pointRadius: 5,
     pointBorderWidth: 2,
     pointBackgroundColor: 'rgba(174,174,174,1)',
     fill: 'start',
     backgroundColor: 'rgba(236, 236, 236, 0.1)', 
     },
     {
     label: '# this week',
     data: [2.5, 3.5, 4.5, 4.5, 2.5, 3.5, 3.5, 3.5, 4.5, 4.5, 4.5, 4.5, 3.5, 3.5, 3.5, ],
     tension:0.4,
     borderWidth: 5,
     borderColor: '#C322FB', //purple
     pointBorderColor: 'pink',
     pointRadius: 5,
     pointBorderWidth: 2,
     pointBackgroundColor: '#C322FB', //purple
     fill: '1',
     backgroundColor: 'rgba(130, 53, 250, 0.2)', 
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
           color:'#5c5c5c'
         },
         grid: {
         color: '#5c5c5c', // x축 그리드 색상 변경 
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
         color: '#5c5c5c' // x축 그리드 색상 변경
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