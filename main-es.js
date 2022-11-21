//rearange navbar when zoomed in.
if ($(window).width() > 650) {

if ($(".language-button").width() > 1){
$(window).keydown(function() {

    var navbarWidth = $(".language-button").width();
    if(navbarWidth < 200) {
        $(".navbar-expand-lg .navbar-nav").css("flex-direction", "row")


    } else {
        $(".navbar-expand-lg .navbar-nav").css("flex-direction", "column")

    }
    });
}
}
//navbar shadow and logo shrink during scroll
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 120 ) {
        $(".sticky-top").addClass("active");
        $(".navbar-brand").children().css("max-width", "180px");

    } else if (scroll < 80 ) {
        $(".sticky-top").removeClass("active");
        if ($(window).width() < 640) {
            $(".navbar-brand").children().css("max-width", "180px");


        } else {
            $(".navbar-brand").children().css("max-width", "220px");

        }

    }
    if (scroll > 200) {
        $(".sticky-top").addClass("white-bg")
    } else if (scroll < 200) {
        $(".sticky-top").removeClass("white-bg")
    }
});

//=============
//collapsibles
//=============

//list collapsibles
var coll = document.getElementsByClassName("collapsible-button");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.children[0].classList.toggle("fa-chevron-circle-down");
        this.children[0].classList.toggle("fa-chevron-circle-up");
        var content = this.parentNode.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            this.setAttribute("aria-expanded", "false");
            this.parentNode.nextElementSibling.setAttribute("aria-hidden", "true");
            this.parentNode.nextElementSibling.style.visibility = "hidden";
        } else {
            this.parentNode.nextElementSibling.style.visibility = "visible";
            content.style.maxHeight = content.scrollHeight + "px";
            this.setAttribute("aria-expanded", "true");
            this.parentNode.nextElementSibling.setAttribute("aria-hidden", "false");

        }
    });
}



//3 main programs collapsibles
var coll = document.getElementsByClassName("main-collapsible-button");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {

        var content = this.parentNode.nextElementSibling;
        if (content.style.maxHeight) {
            this.setAttribute("aria-expanded", "false");
            content.setAttribute("aria-hidden", "true")
            content.style.maxHeight = null;
            content.style.transition = "max-height " + 1 + "s" + " cubic-bezier(0,.97,0,1)";
            content.style.visibility = "hidden"
        } else {
            content.style.visibility = "visible"
            this.setAttribute("aria-expanded", "true");
            content.setAttribute("aria-hidden", "false")
            content.style.transition = "max-height " + .1 * Math.sqrt(content.scrollHeight) + "s" + " cubic-bezier(.38,.16,.98,.93)";
            content.style.maxHeight = content.scrollHeight * 5 + "px";

        }
    });
}



//================
//nav icon toggle
//================

    $(".navbar-toggler").click(function() {

        this.children[0].children[0].classList.toggle("fa-times");
        this.children[0].children[0].classList.toggle("fa-bars");
    })

    $(".navbar-toggler").click(function(e) {
        if (e.key == 'Enter') {
            this.children[0].children[0].classList.toggle("fa-times");
            this.children[0].children[0].classList.toggle("fa-bars");
        }
    });


//===========
//add tabindex=0 to help card text
//===========
 $(".scroll-text").attr("tabindex","0")

 //Tab navigation made accessible
$(document).ready(function () {

    $('.tab-nav a').click(function() {
      return false;
  });




  var homeTabButtons = $('.tabbed-content-videos a.tab');
  var opioidTabButtons = $('.opioid-videos a.tab')
  var caregiversTabButtons = $('.caregivers-videos a.tab')
  var thisThatTabButtons = $('.this-that a.tab')

  $(function(){

      var index = 0;
      var $tabs = homeTabButtons;


      $tabs.bind({
        // on keydown,
        // determine which tab to select
        keydown: function(ev){
          var LEFT_ARROW = 37;
          var UP_ARROW = 38;
          var RIGHT_ARROW = 39;
          var DOWN_ARROW = 40;

          var k = ev.which || ev.keyCode;

          // if the key pressed was an arrow key
          if (k >= LEFT_ARROW && k <= DOWN_ARROW){
            // move left one tab for left and up arrows
            if (k == LEFT_ARROW || k == UP_ARROW){
              if (index > 0) {
                index--;
              }
              // unless you are on the first tab,
              // in which case select the last tab.
              else {
                index = $tabs.length - 1;
              }
            }

            // move right one tab for right and down arrows
            else if (k == RIGHT_ARROW || k == DOWN_ARROW){
              if (index < ($tabs.length - 1)){
                index++;
              }
              // unless you're at the last tab,
              // in which case select the first one
              else {
                index = 0;
              }
            }

            // trigger a click event on the tab to move to
            $($tabs.get(index)).click();
            $('.yt_player_iframe').each(function(){
              this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
            });

          }
        },

        // just make the clicked tab the selected one
        click: function(ev){

          index = $.inArray(this, $tabs.get());
          setTimeout(function() {
          setFocus();
        }, 300)
          ev.preventDefault();

        }
      });

      $(".next").click(function(ev){
        $('.yt_player_iframe').each(function(){
          this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
        });
        setTimeout(function() {

        if (index < ($tabs.length - 1)){
          index++;
        }
        // unless you're at the last tab,
        // in which case select the first one
        else {
          index = 0;
        }
        setFocus();
        ev.preventDefault();


        }, 300)
      })

      $(".previous").click(function(ev){
        $('.yt_player_iframe').each(function(){
          this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
        });
        setTimeout(function() {

        if (index > 0) {
          index--;
        }
        // unless you are on the first tab,
        // in which case select the last tab.
        else {
          index = $tabs.length - 1;
        }
        setFocus();
        ev.preventDefault();


        }, 300)
      })

      var setFocus = function(){
        $('.yt_player_iframe').each(function(){
          this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
        });

        $('.main-content').css('animation', 'fadeInAnimation ease .3s');
        // undo tab control selected state,
        // and make them not selectable with the tab key
        // (all tabs)
        $tabs.attr(
        {
          tabindex: '-1',
          'aria-selected': 'false'
        }).removeClass('selected');

        // hide all tab panels.
        $('.tabbed-content-videos .tab-panel').removeClass('current');

        // make the selected tab the selected one, shift focus to it
        $($tabs.get(index)).attr(
        {
          tabindex: '0',
          'aria-selected': 'true'
        }).addClass('selected').focus();

        // handle parent <li> current class (for coloring the tabs)
        $($tabs.get(index)).parent().siblings().removeClass('current');
        $($tabs.get(index)).parent().addClass('current');

        // add a current class also to the tab panel
        // controlled by the clicked tab
        $($($tabs.get(index)).attr('href')).addClass('current');
      };
    });

    $(function(){
      var index = 0;
      var $tabs = opioidTabButtons;

      var $iframe = $(".opioid-videos iframe");
      var $vidContent = $(".opioid-videos .content .tab-panel")

      var videoURL = [
        "https://www.youtube.com/embed/6iMB4OIlgcM?rel=0",
        "https://www.youtube.com/embed/whfg-ak0nyY?rel=0",
        "https://www.youtube.com/embed/r8gVO_dQ37A?rel=0"
      ]

      var videoTitle = [
        "Tienes el Poder de Prevenir el Uso Indebido de Opioides",
        "Cómo Actúan los Opioides Recetados",
        "Conozca los Riesgos del Uso Indebido de Opioides"
      ]

      $tabs.bind({
        // on keydown,
        // determine which tab to select
        keydown: function(ev){
          var LEFT_ARROW = 37;
          var UP_ARROW = 38;
          var RIGHT_ARROW = 39;
          var DOWN_ARROW = 40;

          var k = ev.which || ev.keyCode;

          // if the key pressed was an arrow key
          if (k >= LEFT_ARROW && k <= DOWN_ARROW){
            // move left one tab for left and up arrows
            if (k == LEFT_ARROW || k == UP_ARROW){
              if (index > 0) {
                index--;
              }
              // unless you are on the first tab,
              // in which case select the last tab.
              else {
                index = $tabs.length - 1;
              }
            }

            // move right one tab for right and down arrows
            else if (k == RIGHT_ARROW || k == DOWN_ARROW){
              if (index < ($tabs.length - 1)){
                index++;
              }
              // unless you're at the last tab,
              // in which case select the first one
              else {
                index = 0;
              }
            }

            // trigger a click event on the tab to move to
            $($tabs.get(index)).click();
            ev.preventDefault();
          }
        },

        // just make the clicked tab the selected one
        click: function(ev){

          index = $.inArray(this, $tabs.get());
          setTimeout(function() {
          setFocus();
        }, 100)
          ev.preventDefault();

        }
      });

      var setFocus = function(){
        // undo tab control selected state,
        // and make them not selectable with the tab key
        // (all tabs)
        $tabs.attr(
        {
          tabindex: '-1',
          'aria-selected': 'false'
        }).removeClass('selected');

        // make the selected tab the selected one, shift focus to it
        $($tabs.get(index)).attr(
        {
          tabindex: '0',
          'aria-selected': 'true'
        }).addClass('selected').focus();

        // handle parent <li> current class (for coloring the tabs)
        $($tabs.get(index)).parent().siblings().removeClass('current');
        $($tabs.get(index)).parent().addClass('current');

        $iframe.attr('src', videoURL[index])
        $iframe.attr('title', videoTitle[index])

        $vidContent.attr('aria-labelledby', "tab-care-vid-" + [index + 1])
        $vidContent.attr('id', "care-vid-" + [index + 1])
      };
    });

    $(function(){
      var index = 0;
      var $tabs = caregiversTabButtons;
      var $iframe = $(".caregivers-videos iframe");
      var $vidContent = $(".caregivers-videos .content .tab-panel")

      var videoURL = [
        "https://www.youtube.com/embed/yJPFhFcAjEU?rel=0",
        "https://www.youtube.com/embed/hXTZqV0YsTE?rel=0",
        "https://www.youtube.com/embed/SfQoFEym7IE?rel=0",
        "https://www.youtube.com/embed/RHrjDBscilY?rel=0"
      ]

      https://youtu.be/SfQoFEym7IE


      var videoTitle = [
        "Cómo Hablar del Uso Indebido de Opioides Recetados",
        "Hable con Su Pareja Sobre el Consumo de Opioides con Receta",
        "Hable con un/a Amigo/a Sobre el Uso Indebido de Opioides con Receta",
        "Hable con Su Padre/Madre Sobre el Uso Indebido de Opioides Recetados"
      ]


      //tab keyboard navigation
      $tabs.bind({
        // on keydown,
        // determine which tab to select
        keydown: function(ev){
          var LEFT_ARROW = 37;
          var UP_ARROW = 38;
          var RIGHT_ARROW = 39;
          var DOWN_ARROW = 40;

          var k = ev.which || ev.keyCode;

          // if the key pressed was an arrow key
          if (k >= LEFT_ARROW && k <= DOWN_ARROW){
            // move left one tab for left and up arrows
            if (k == LEFT_ARROW || k == UP_ARROW){
              if (index > 0) {
                index--;
              }
              // unless you are on the first tab,
              // in which case select the last tab.
              else {
                index = $tabs.length - 1;
              }
            }

            // move right one tab for right and down arrows
            else if (k == RIGHT_ARROW || k == DOWN_ARROW){
              if (index < ($tabs.length - 1)){
                index++;
              }
              // unless you're at the last tab,
              // in which case select the first one
              else {
                index = 0;
              }
            }

            // trigger a click event on the tab to move to
            $($tabs.get(index)).click();
            ev.preventDefault();
          }
        },

        // just make the clicked tab the selected one
        click: function(ev){

          index = $.inArray(this, $tabs.get());
          setTimeout(function() {
          setFocus();
        }, 100)
          ev.preventDefault();

        }
      });


      var setFocus = function(){
        // undo tab control selected state,
        // and make them not selectable with the tab key
        // (all tabs)
        $tabs.attr(
        {
          tabindex: '-1',
          'aria-selected': 'false'
        }).removeClass('selected');


        // make the selected tab the selected one, shift focus to it
        $($tabs.get(index)).attr(
        {
          tabindex: '0',
          'aria-selected': 'true'
        }).addClass('selected').focus();

        // handle parent <li> current class (for coloring the tabs)
        $($tabs.get(index)).parent().siblings().removeClass('current');
        $($tabs.get(index)).parent().addClass('current');

        // replace youtube embed link and rename attributes for current video
        // controlled by the clicked tab
        $iframe.attr('src', videoURL[index])
        $iframe.attr('title', videoTitle[index])

        $vidContent.attr('aria-labelledby', "tab-care-vid-" + [index + 1])
        $vidContent.attr('id', "care-vid-" + [index + 1])
      };
    });

    $(function(){
      var index = 0;
      var $tabs = thisThatTabButtons;

      $tabs.bind({
        // on keydown,
        // determine which tab to select
        keydown: function(ev){
          var LEFT_ARROW = 37;
          var UP_ARROW = 38;
          var RIGHT_ARROW = 39;
          var DOWN_ARROW = 40;

          var k = ev.which || ev.keyCode;

          // if the key pressed was an arrow key
          if (k >= LEFT_ARROW && k <= DOWN_ARROW){
            // move left one tab for left and up arrows
            if (k == LEFT_ARROW || k == UP_ARROW){
              if (index > 0) {
                index--;
              }
              // unless you are on the first tab,
              // in which case select the last tab.
              else {
                index = $tabs.length - 1;
              }
            }

            // move right one tab for right and down arrows
            else if (k == RIGHT_ARROW || k == DOWN_ARROW){
              if (index < ($tabs.length - 1)){
                index++;
              }
              // unless you're at the last tab,
              // in which case select the first one
              else {
                index = 0;
              }
            }

            // trigger a click event on the tab to move to
            $($tabs.get(index)).click();
            ev.preventDefault();
          }
        },

        // just make the clicked tab the selected one
        click: function(ev){

          index = $.inArray(this, $tabs.get());
          setTimeout(function() {
          setFocus();
        }, 300)
          ev.preventDefault();

        }
      });

      $(".next").click(function(ev){
        setTimeout(function() {

        if (index < ($tabs.length - 1)){
          index++;
        }
        // unless you're at the last tab,
        // in which case select the first one
        else {
          index = 0;
        }

          setFocus();
          ev.preventDefault();
        }, 300)
      })
      $(".previous").click(function(ev){
        setTimeout(function() {

        if (index > 0) {
          index--;
        }
        // unless you are on the first tab,
        // in which case select the last tab.
        else {
          index = $tabs.length - 1;
        }
          setFocus();
          ev.preventDefault();
        }, 300)
      })

      var setFocus = function(){
        // undo tab control selected state,
        // and make them not selectable with the tab key
        // (all tabs)
        $tabs.attr(
        {
          tabindex: '-1',
          'aria-selected': 'false'
        }).removeClass('selected');

        // hide all tab panels.
        $('.this-that .tab-panel').removeClass('current');

        // make the selected tab the selected one, shift focus to it
        $($tabs.get(index)).attr(
        {
          tabindex: '0',
          'aria-selected': 'true'
        }).addClass('selected').focus();

        // handle parent <li> current class (for coloring the tabs)
        $($tabs.get(index)).parent().siblings().removeClass('current');
        $($tabs.get(index)).parent().addClass('current');

        // add a current class also to the tab panel
        // controlled by the clicked tab
        $($($tabs.get(index)).attr('href')).addClass('current');
      };
    });
});
$('a.tab').focusin(function(){
    $(this).addClass('pulse')
})

$('a.tab').focusout(function(){
  $(this).removeClass('pulse')
})


$(".say-button").on("click",function(){
  $(".content").css("opacity", "0");
  setTimeout(function() {
    $(".content").css("opacity", "100");
  }, 300)
});

$(".tab").on("click",function(){
  $(".content").css("opacity", "0");
  setTimeout(function() {
    $(".content").css("opacity", "100");
  }, 300)
});

$(".next").on("click",function(){
  $(".content").css("opacity", "0");
  setTimeout(function() {
    $(".content").css("opacity", "100");
  }, 300)
});

$(".previous").on("click",function(){
  $(".content").css("opacity", "0");
  setTimeout(function() {
    $(".content").css("opacity", "100");
  }, 300)
});

