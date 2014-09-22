/* Myo Chrome Extension JavaScript */
var index = 0;
var totalTiles = 0;
var popupOpen = false;


$(window).on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if(e.ctrlKey && keyCode == '13' && !popupOpen) {
    $("body").append('<div id="myo-popup"><div class="tile" id="reddit" data-href="http://www.reddit.com" tabindex="1"></div><div class="tile" id="ycombinator" data-href="http://news.ycombinator.com" tabindex="2"></div><div class="tile" id="facebook" data-href="http://facebook.com" tabindex="3"></div><div class="tile" id="googleplus" data-href="http://googleplus.com" tabindex="4"></div><div class="tile" id="twitter" data-href="http://twitter.com" tabindex="5"></div><div class="tile" id="tweetdeck" data-href="http://tweetdeck.twitter.com" tabindex="6"></div><div class="tile" id="9gag" data-href="http://9gag.com" tabindex="7"></div></div><div id="myo-popup-blanket"></div>');
    $('#myo-popup .tile').each(function() {
      var elementId = $(this).attr('id');
      var imgUrl = "url(" + chrome.extension.getURL('img/' + elementId + '.png') + ")";
      $(this).css('background-image', imgUrl);
      totalTiles++;
    });

    elementFocus();
    popupOpen = true;
  }
});

$(window).on('keydown', function(e) {
    var keyCode = e.keyCode || e.which;
    console.log('keydown', keyCode);
  if (popupOpen) {
    if ( keyCode == '9' ) {
      e.preventDefault();
      if (index == (totalTiles - 1)) {
        index = 0;
      } else {
        index++;
      }
      elementFocus();
    } else if (keyCode == '13') {
      e.preventDefault();
      window.location.href = $('.tile:eq(' + index + ')').data('href');
    } else if (keyCode == '27') {
      $("#myo-popup").remove();
      $("#myo-popup-blanket").remove();
      popupOpen = false;
    }
  }
});

// $('.tile').click(function() {
//   var href = $(this).data('href');
//   window.location.href = href;
// });

function elementFocus () {
  $('.tile:eq(' + index + ')').focus();
}
