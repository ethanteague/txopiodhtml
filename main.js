//navbar shadow and logo shrink during scroll
document.addEventListener('scroll', ((event) => {
  var scroll = $(window).scrollTop();
  if (scroll > 120) {
    $(".sticky-top").addClass("active");
    $(".navbar-brand").children().css("max-width", "180px");

  } else if (scroll < 80) {
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
}));

//rearange navbar when zoomed in.
if ($(window).width() > 769) {

  if ($(".language-button").width() > 1) {
    $(window).keydown(function () {

      var navbarWidth = $(".language-button").width();
      if (navbarWidth < 200) {
        $(".navbar-expand-lg .navbar-nav").css("flex-direction", "row")


      } else {
        $(".navbar-expand-lg .navbar-nav").css("flex-direction", "column")

      }
    });
  }
}



//=============
//collapsibles
//=============

//list collapsibles
var coll = document.getElementsByClassName("collapsible-button");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
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
  coll[i].addEventListener("click", function () {

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



//===========
//add tabindex=0 to help card text
//===========
$(".scroll-text").attr("tabindex", "0")

//Tab navigation made accessible
$(document).ready(function () {

  $('.tab-nav a').click(function () {
    return false;
  });




  var homeTabButtons = $('.tabbed-content-videos a.tab');
  var opioidTabButtons = $('.opioid-videos a.tab')
  var caregiversTabButtons = $('.caregivers-videos a.tab')
  var thisThatTabButtons = $('.this-that a.tab')

  $(function () {

    var index = 0;
    var $tabs = homeTabButtons;

    $tabs.bind({
      // on keydown,
      // determine which tab to select
      keydown: function (ev) {
        var LEFT_ARROW = 37;
        var UP_ARROW = 38;
        var RIGHT_ARROW = 39;
        var DOWN_ARROW = 40;

        var k = ev.which || ev.keyCode;

        // if the key pressed was an arrow key
        if (k >= LEFT_ARROW && k <= DOWN_ARROW) {
          // move left one tab for left and up arrows
          if (k == LEFT_ARROW || k == UP_ARROW) {
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
          else if (k == RIGHT_ARROW || k == DOWN_ARROW) {
            if (index < ($tabs.length - 1)) {
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
          $('.yt_player_iframe').each(function () {
            this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
          });

        }
      },

      // just make the clicked tab the selected one
      click: function (ev) {

        index = $.inArray(this, $tabs.get());
        setTimeout(function () {
          setFocus();
        }, 300)
        ev.preventDefault();

      }
    });

    $(".next").click(function (ev) {
      $('.yt_player_iframe').each(function () {
        this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
      });
      setTimeout(function () {

        if (index < ($tabs.length - 1)) {
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

    $(".previous").click(function (ev) {
      $('.yt_player_iframe').each(function () {
        this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
      });
      setTimeout(function () {

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

    var setFocus = function () {
      $('.yt_player_iframe').each(function () {
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

  $(function () {
    var index = 0;
    var $tabs = opioidTabButtons;

    var $iframe = $(".opioid-videos iframe");
    var $vidContent = $(".opioid-videos .content .tab-panel")

    var videoURL = [
      "https://www.youtube.com/embed/6iMB4OIlgcM?rel=0",
      "https://www.youtube.com/embed/2w0zT1oCPVI?rel=0",
      "https://www.youtube.com/embed/is9I_BsjO_U?rel=0"
    ]

    var videoTitle = [
      "You have the power to prevent opioid misuse video",
      "See How Prescription Opioids Work",
      "Learn the Risks of Opioid Misuse"
    ]

    $tabs.bind({
      // on keydown,
      // determine which tab to select
      keydown: function (ev) {
        var LEFT_ARROW = 37;
        var UP_ARROW = 38;
        var RIGHT_ARROW = 39;
        var DOWN_ARROW = 40;

        var k = ev.which || ev.keyCode;

        // if the key pressed was an arrow key
        if (k >= LEFT_ARROW && k <= DOWN_ARROW) {
          // move left one tab for left and up arrows
          if (k == LEFT_ARROW || k == UP_ARROW) {
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
          else if (k == RIGHT_ARROW || k == DOWN_ARROW) {
            if (index < ($tabs.length - 1)) {
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
      click: function (ev) {

        index = $.inArray(this, $tabs.get());
        setTimeout(function () {
          setFocus();
        }, 100)
        ev.preventDefault();

      }
    });

    var setFocus = function () {
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

  $(function () {
    var index = 0;
    var $tabs = caregiversTabButtons;
    var $iframe = $(".caregivers-videos iframe");
    var $vidContent = $(".caregivers-videos .content .tab-panel")

    var videoURL = [
      "https://www.youtube.com/embed/9U3MIFYGPek?rel=0",
      "https://www.youtube.com/embed/vMDQKOpZBFo?rel=0",
      "https://www.youtube.com/embed/ctcBlgWUjoI?rel=0",
      "https://www.youtube.com/embed/nlOT0i2rwCg?rel=0"
    ]

    var videoTitle = [
      "How to Talk About Prescription Opioid Misuse",
      "Talking to Your Partner about Opioid Misuse",
      "Talking to Your Friend about Opioid Misuse",
      "Talking to Your Parent about Opioid Misuse"
    ]

    //tab keyboard navigation
    $tabs.bind({
      // on keydown,
      // determine which tab to select
      keydown: function (ev) {
        var LEFT_ARROW = 37;
        var UP_ARROW = 38;
        var RIGHT_ARROW = 39;
        var DOWN_ARROW = 40;

        var k = ev.which || ev.keyCode;

        // if the key pressed was an arrow key
        if (k >= LEFT_ARROW && k <= DOWN_ARROW) {
          // move left one tab for left and up arrows
          if (k == LEFT_ARROW || k == UP_ARROW) {
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
          else if (k == RIGHT_ARROW || k == DOWN_ARROW) {
            if (index < ($tabs.length - 1)) {
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
      click: function (ev) {

        index = $.inArray(this, $tabs.get());
        setTimeout(function () {
          setFocus();
        }, 100)
        ev.preventDefault();

      }
    });


    var setFocus = function () {
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

  $(function () {
    var index = 0;
    var $tabs = thisThatTabButtons;

    $tabs.bind({
      // on keydown,
      // determine which tab to select
      keydown: function (ev) {
        var LEFT_ARROW = 37;
        var UP_ARROW = 38;
        var RIGHT_ARROW = 39;
        var DOWN_ARROW = 40;

        var k = ev.which || ev.keyCode;

        // if the key pressed was an arrow key
        if (k >= LEFT_ARROW && k <= DOWN_ARROW) {
          // move left one tab for left and up arrows
          if (k == LEFT_ARROW || k == UP_ARROW) {
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
          else if (k == RIGHT_ARROW || k == DOWN_ARROW) {
            if (index < ($tabs.length - 1)) {
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
      click: function (ev) {

        index = $.inArray(this, $tabs.get());
        setTimeout(function () {
          setFocus();
        }, 300)
        ev.preventDefault();

      }
    });

    $(".next").click(function (ev) {
      setTimeout(function () {

        if (index < ($tabs.length - 1)) {
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
    $(".previous").click(function (ev) {
      setTimeout(function () {

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

    var setFocus = function () {
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
$('a.tab').focusin(function () {
  $(this).addClass('pulse')
})

$('a.tab').focusout(function () {
  $(this).removeClass('pulse')
})


$(".say-button").on("click", function () {
  $(".content").css("opacity", "0");
  setTimeout(function () {
    $(".content").css("opacity", "100");
  }, 300)
});

$(".tab").on("click", function () {
  $(".content").css("opacity", "0");
  setTimeout(function () {
    $(".content").css("opacity", "100");
  }, 300)
});

$(".next").on("click", function () {
  $(".content").css("opacity", "0");
  setTimeout(function () {
    $(".content").css("opacity", "100");
  }, 300)
});

$(".previous").on("click", function () {
  $(".content").css("opacity", "0");
  setTimeout(function () {
    $(".content").css("opacity", "100");
  }, 300)
});



function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

const mobileNavButton = document.querySelector(".navbar-toggler");
mobileNavButton.addEventListener("click", () => {
  console.log(document.getElementById("navbarNav").classList)
  var delayInMilliseconds = 1000;

  setTimeout(function () {
    if (document.getElementById("navbarNav").classList.contains("show")) {
      console.log('fewfwefwf')
      mobileNavButton.classList.add("move-to-mobile-close");
    }
    else {
      console.log("WEfwef")
      mobileNavButton.classList.remove("move-to-mobile-close");
    }
  }, delayInMilliseconds);

})
