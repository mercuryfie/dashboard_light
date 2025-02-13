document.addEventListener('DOMContentLoaded', function() {



// 전체 물량 대비 현재 작업량 leftbox2 leftchart 
const ctx5 = document.getElementById('leftChart2');  
const leftChart2 = new Chart(ctx5, {
    type: 'line',
    data: {
    labels: ['대기', '로젠', '한진', '기타'],
    datasets: [{
    label: '# of this week',
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
    label: '# of last week',
    data: [300,200,150,180],
    borderWidth: 5,
    borderColor: '#FF34EB', //hotpink
    tension:0.4,
    
    pointBorderColor: '#FF34EB',
    pointRadius: 5,
    pointBorderWidth: 2,
    pointBackgroundColor: '#fff', //hotpink
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
           color:'#000'
         },
         grid: {
         color: '#ccc', // x축 그리드 색상 변경 
       }
       },
       y: {
         beginAtZero: false,
         max:5,
         ticks: {
           color:'#000',
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

 // 탕전기별 소요 시간
 // bottombox1-2 decChart 
 const ctx10 = document.getElementById('decChart');  
 const decChart = new Chart(ctx10, {
   type: 'line',
   data: {
     labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
     datasets: [
    {
      label: '# this week',
      data: [120,130,140,120,120,150,150,150,150,150,  120,130,140,120,120,150,150,150,150,150],
      tension:0.4,
      borderWidth: 5,
      borderColor: '#C322FB', //purple
      pointBorderColor: 'white',
      pointRadius: 5,
      pointBorderWidth: 2,
      pointBackgroundColor: '#C322FB', //purple
      fill: 'start',
      backgroundColor: 'rgba(130, 53, 250, 0.2)', 
      },
    {
      label: '# of last week',
      data: [150,150,150,150,150,150,150,150,150,150,  150,150,150,150,150,150,150,150,150,150],
      tension:0.4,
      borderWidth: 3,
      borderColor:'rgba(174,174,174,0.99)', 

      pointBorderColor: '#9c9c9c',
      pointWidth:1,
      pointRadius: 1,
      pointBorderWidth: 1,
      pointBackgroundColor: 'black',
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
           color:'#000'
         },
         grid: {
         color: '#5c5c5c', // x축 그리드 색상 변경 
       }
       },
       y: {
         beginAtZero: false,
         min:100,
         max:180,
         ticks: {
           color:'#000',
           stepSize: 50 // 간격을 1로 설정
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

 //마킹기별 소요 시간 markChart 
 const ctx6 = document.getElementById('markChart'); 
 
 const markChart = new Chart(ctx6, {
   type: 'line',
   data: {
     labels: ['1', '2', '3', '4', '5',],
     datasets: [{
     label: '# of last week',
     data: [3.5,3.5,3.5,3.5,3.5,],
     tension:0.4,
     borderWidth: 3,
     borderColor:'rgba(174,174,174,0.99)',
     
     // 기존 데이터셋 설정 

     pointBorderColor: '#9c9c9c',
     pointWidth:1,
     pointRadius: 1,
     pointBorderWidth: 1,
     pointBackgroundColor: 'black',
     fill: 'start',
     backgroundColor: 'rgba(236, 236, 236, 0.1)', 
     },
     {
     label: '# this week',
     data: [2.5,3.5,4.5,4.5,2.5],
     tension:0.4,
     borderWidth: 5,
     borderColor: '#C322FB', //purple
     pointBorderColor: 'white',
     pointRadius: 5,
     pointBorderWidth: 2,
     pointBackgroundColor: '#C322FB', //purple
     fill: 'start',
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
           color:'#ececec'
         },
         grid: {
         color: '#5c5c5c', // x축 그리드 색상 변경 
       }
       },
       y: {
         beginAtZero: false,
         min:2,
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

 //포장대별 소요 시간  packChart
 const ctx11 = document.getElementById('packChart'); 
      
 const packChart = new Chart(ctx11, {
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