 
 
$(document).ready(function () { 
  // tempbox
  $(".GaugeMeter").gaugeMeter({
    theme: 'pink',
    color: '#FF5894', 
    });    
  $(".GaugeMeter2").gaugeMeter({
    theme: 'cyonblue',
    color: '#41F3F5', 
  });  

  // procbox
  $(".GaugeMeter3").gaugeMeter({
    theme: 'green',
    color: '#6AF288',
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


  //bar chart

  const ctx = document.getElementById('barChart');   
      
        new Chart(ctx, {
          type: 'bar', 
          data: {
            labels: ['전체','조제','탕전','마킹', '포장'],
            datasets: [{
            label: '전체',
            data: [100,100,100,100,100], 
            borderWidth: 1,
            borderColor:'#ececec',
            fill:true,
            backgroundColor: [
              'rgba(236,236,236,0.3)',
              'rgba(236,236,236,0.3)',
              'rgba(236,236,236,0.3)',
              'rgba(236,236,236,0.3)', 
            ],   }, 
            {
            label: '진척도',
            data: [60,80,60, 40, 40], 
            borderWidth: 1,
            borderColor:'#ececec',
            fill:true,
            backgroundColor: [
              'rgba(106,242,136,0.7)',
              'rgba(106,242,136,0.8)',
              'rgba(106,242,136,0.8)',
              'rgba(106,242,136,0.8)',  
            ],   }, 
          ]
          },
            options: {
            responsive: true,
            indexAxis: 'y',
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
              bar: {
                borderWidth: 5,
              }
            },
            plugins: {
                    title: {
                        display: false,
                        text: '전체 작업 시간', 
                        color:'#ececec'
                         
                    },
                    legend: {
                        position: 'right',
                        display:false,
                        labels: {
                            color:'#ececec'
                        },
                        data: {
                            color:'white', 
                        },
                        title: {
                        display: false,
                        text: 'Chart.js Horizontal Bar Chart'
                      }
                    }
                    },
            
            scales: {
              // x: { 
              //   ticks: {
              //     color:'#ececec',
                  
              //   }, 
              // },
              y: {
                beginAtZero: false,
                max:450,
                ticks: {
                  color:'#ececec'
                }, 
              }
            }
            
          }
        }); 


  //radar chart
  const ctx2 = document.getElementById('myChart');
        function getRandomData() {
          return Array.from({length: 5}, () => Math.floor(Math.random() * (100 - 50 + 1)) + 50);
        }
      
        const chart = new Chart(ctx2, {
          type: 'radar',
          data: {
            labels: ['전체', '조제', '탕전', '마킹','포장'],
            datasets: [
              
            {
            label: '# of last week',
            data: [100, 100, 100, 100, 100], 
            borderWidth: 2,
            borderColor: '#ececec',  
            pointBorderColor: 'white',
            pointRadius: 5,
            pointBorderWidth: 2,
            pointBackgroundColor: '#ececec',
            fill: '1',
            backgroundColor: 'rgba(236, 236, 236, 0.1)', 
            
            },
            {
            label: '# of this week',
            data: [100, 80, 80, 60, 60],  
            borderWidth: 5,
            borderColor:'#6AF288', //green 

            pointBorderColor: 'white',
            pointWidth:5,
            pointRadius: 5,
            pointBorderWidth: 2,
            pointBackgroundColor: '#6AF288',

            fill: '2',
            backgroundColor: 'rgba(106,242,136, 0.3)', 
            },
            {
            label: '# of last week',
            data: [80, 60, 60, 50, 30], 
            borderWidth: 5,
            borderColor: '#C322FB', //purple
            pointBorderColor: 'white',
            pointRadius: 5,
            pointBorderWidth: 2,
            pointBackgroundColor: '#C322FB', //purple

            fill: true,
            backgroundColor: 'rgba(195, 34, 251, 0.3)', 
            }
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
              r: {
                ticks: {
                  color:'#ececec',
                  backdropColor: 'transparent', 
                  z:1,
                  max:400,
                  // stepSize: 100,
                  padding:50,  
                  font: {
                    size:12
                  }
                }, 
                pointLabels: {
                padding: 20 // 포인트 레이블을 바깥쪽으로 이동
              },
                grid: {
                color: '#5c5c5c',   
              },
                angleLines: {
                  color:'#5c5c5c'},
                pointLabels: {
                  color:'#ececec',
                  font: {
                    size:14
                  }
                  
                },
                suggestedMin: 0,
                suggestedMax: 120 // y축의 최대값을 100으로 설정
                },
                // y: {
                //   max:500,
                //   ticks: {
                //     color:'#ececec'
                //   }
                // }
              // x: { 
              //   ticks: {
              //     color:'#ececec'
              //   },
              //   grid: {
              //   color: '#5c5c5c', // x축 그리드 색상 변경 
                
              // }
              // },
              // y: {
              //   beginAtZero: false,
              //   max:100,
              //   ticks: {
              //     color:'#ececec'
              //   },
              //   grid: {
              //   color: '#5c5c5c' // x축 그리드 색상 변경
              // }
              // }
            }
            
          }
        }); 

        setInterval(() => {
        // chart.data.datasets[0].data = getRandomData();
        chart.data.datasets[1].data = getRandomData();
        chart.data.datasets[2].data = getRandomData();
        chart.update();
      }, 3000);
});