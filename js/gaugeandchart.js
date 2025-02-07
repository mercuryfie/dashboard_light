 
// $(document).ready(function() {

  document.addEventListener('DOMContentLoaded', function() {

  function setData(){
    //작업실 온/습도 tempbox
    $("#GaugeMeter_101").attr("data-percent",36);
    $("#GaugeMeter_102").attr("data-percent",36);

    //각 공정 현황
    $("#GaugeMeter_103").attr("data-used",36);
    $("#GaugeMeter_104").attr("data-used",36);
    $("#GaugeMeter_105").attr("data-used",36);
    $("#GaugeMeter_106").attr("data-used",36); 

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

  // 각 공정 현황 procbox
$(".GaugeMeter3").gaugeMeter({
  theme: 'green',
  color: '#6AF288',
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
     
  //bar chart 전체진척도
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
              x: { 
                ticks: {
                  color:'#ececec',
                  
                }, 
                grid: {
                  color: '#5c5c5c',   
                },
              },
              y: {
                beginAtZero: false,
                max:450,
                ticks: {
                  color:'#ececec'
                }, 
                grid: {
                  color: '#5c5c5c',   
                },
              }
            }
            
          }
        }); 

  // 탕전 주문 건수 weekbox
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


  //전체 작업 현황 radar chart
    const ctx2 = document.getElementById('radarChart');  
    const radarChart = new Chart(ctx2, {
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
        pointBackgroundColor: 'transparent',
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


      // 전체 물량 대비 현재 작업량 leftbox2 leftchart 
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

      // 전체 물량 대비 현재 작업량 rightbox2 rightChart 
      const ctx6 = document.getElementById('rightChart');  
      const rightChart = new Chart(ctx6, {
        type: 'line',
        data: {
          labels: ['대기', '로젠', '한진', '기타', ],
          datasets: [{
          label: '# of last week',
          data: [400,300,300,300],
          tension:0.4,
          borderWidth: 5,
          borderColor:'rgba(236,236,236,0.5)',

          pointBorderColor: 'white',
          pointWidth:5,
          pointRadius: 5,
          pointBorderWidth: 2,
          pointBackgroundColor: 'rgba(174,174,174,1)',
          fill: '1',
          backgroundColor: 'rgba(236, 236, 236, 0.1)', 
          },
          {
          label: '# this week',
          data: [300,200,150,180],
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
              min:100,
              max:450,
              ticks: {
                color:'#ececec'
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