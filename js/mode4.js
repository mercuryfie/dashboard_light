 
// $(document).ready(function() {
  document.addEventListener('DOMContentLoaded', function() {

    function setData(){
      //작업실 온/습도 tempbox
      $("#GaugeMeter_101").attr("data-percent",36);
      $("#GaugeMeter_102").attr("data-percent",36); 
  
      //탕전 주문 현황
      $("#GaugeMeter_107").attr("data-percent",36);
      $("#GaugeMeter_108").attr("data-percent",36);
      $("#GaugeMeter_109").attr("data-percent",36);
      $("#GaugeMeter_110").attr("data-percent",36); 
  
      //예비 조제 주문 현황
      $("#GaugeMeter_111").attr("data-percent",36);
      $("#GaugeMeter_112").attr("data-percent",36);
      $("#GaugeMeter_113").attr("data-percent",36);
      $("#GaugeMeter_114").attr("data-percent",36); 
      $("#GaugeMeter_115").attr("data-percent",36); 
  
      //택배 발송 현황
      $("#GaugeMeter_116").attr("data-used",36);
      $("#GaugeMeter_117").attr("data-used",36);
      $("#GaugeMeter_118").attr("data-used",36);
      $("#GaugeMeter_119").attr("data-used",36); 
    }
    setData();

  //작업실 온/습도 tempbox
  $(".GaugeMeter").gaugeMeter({
    theme: 'pink',
    color: '#FF5894', 
    });    
  $(".GaugeMeter2").gaugeMeter({
    theme: 'cyonblue',
    color: '#41F3F5', 
  });  

    // 택배발송현황 parbox 
  $(".GaugeMeter5").gaugeMeter({
    theme: 'blue',
    color: '#2986cc', 
  });  
  $(".GaugeMeter6").gaugeMeter({ 
    theme: 'cyonblue',
    color: '#62E9EB',  
  });  

  // 탕전 주문현황 leftbox 
  $(".GaugeMeter7").gaugeMeter({
    theme: 'Purple',
    color: '#C322FB',
  });  

  // 예비조제 주문현황 rightbox 
  $(".GaugeMeter8").gaugeMeter({
    theme: 'green',
    color: '#6AF288',
  });   
    
  //탕전 주문 건수 weekbox 
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

  // 전체 주문 대비 현재 작업량
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

   //포장대별 소요 시간  packChart
   const ctx6 = document.getElementById('packChart'); 
      
        const packChart = new Chart(ctx6, {
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
            }  ,
            {
            label: '# of last week',
            data: [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, ],
            tension:0.4,
            borderWidth: 3,
            borderColor:'rgba(174,174,174,0.99)', 

            pointBorderColor: 'white',
            pointWidth:1,
            pointRadius: 1,
            pointBorderWidth: '0',
            pointBackgroundColor: 'rgba(174,174,174,1)',
            fill: 'start',
            backgroundColor: 'rgba(236, 236, 236, 0.1)', 
            },
             ]
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
                max:5,
                ticks: {
                  color:'#ececec',
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