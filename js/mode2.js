 
// $(document).ready(function() {
  document.addEventListener('DOMContentLoaded', function() {
   // 탕전기별 소요 시간
 const ctx10 = document.getElementById('decChart');  
 const decChart = new Chart(ctx10, {
   type: 'line',
   data: {
     labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
     datasets: [{
     label: '# of last week',
     data: [150,150,150,150,150,150,150,150,150,150,  150,150,150,150,150,150,150,150,150,150],
     tension:0.4,
     borderWidth: 2,
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
     data: [120,130,140,120,120,150,150,150,150,150,  120,130,140,120,120,150,150,150,150,150],
     tension:0.4,
     borderWidth: 5,
     borderColor: '#C322FB', //purple
     pointBorderColor: 'pink',
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
         min:100,
         max:180,
         ticks: {
           color:'#ececec',
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
});