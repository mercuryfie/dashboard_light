$(document).ready(function () { 
    // $('.mboxb-1').css('border','1px solid blue'); 
    var $ul = $('.mboxb-1-t');
    var liHeight = $ul.find('mboxb-1-t>li:first').outerHeight();
    var currentIndex = 0;


    //탕전 주문 건수 -------------------------------------
    setInterval(function() {
        var $ul = $('.mboxb-1-t');
        var $li = $ul.find('li');
        
        // 첫 번째 li를 슬라이드업
        $li.first().show(1000, function() {
        // 슬라이드업이 끝난 후, 맨 뒤로 이동
        $(this).appendTo($ul);
        
        // 다음 li를 슬라이드 다운
        $ul.find('li').last().slideDown(2000);
        });
    }, 3000); // 3초마다 실행

    //400,200 -------------------------------------
    setInterval(function() {
      var $counterul = $('.counterul');
      var $counterli = $counterul.find('li'); 
      
      // 첫 번째 li를 슬라이드업
      $counterli.first().show(1000, function() {
      // 슬라이드업이 끝난 후, 맨 뒤로 이동
      $(this).appendTo($counterul);
      
      // 다음 li를 슬라이드 다운
      $counterul.find('li').last().slideDown(2000);
      });
      }, 3000); // 3초마다 실행



    //count 증가 -------------------------------------
    $('#counter').each(function() {
        var $this = $(this);
        var targetNumber = 465; // 목표 숫자 
        var duration = 500; // 애니메이션 지속 시간 (ms) 

        //count funtion ------------------------------
        $({ countNum: $this.text() }).animate(
          { countNum: targetNumber },
          {
            duration: duration,
            easing: 'swing', // 애니메이션 방식
            step: function() {
              // 애니메이션 진행 중에 숫자를 갱신
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              // 애니메이션 완료 후 숫자 정확히 설정
              $this.text(targetNumber);
            }
          }
        ); 
      });
});