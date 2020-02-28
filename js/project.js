$(document).ready(function(){

// Slider Options

jQuery(document).ready(function() {

  jQuery('.tp-banner').show().revolution(
  {
    dottedOverlay:"none",
    delay:10000,
    startwidth:1200,
    startheight:700,
    hideThumbs:200,
    thumbWidth:100,
    thumbHeight:50,
    thumbAmount:5,
    navigationType:"bullet",
    navigationArrows:"solo",
    navigationStyle:"preview1",
    touchenabled:"on",
    onHoverStop:"off",
    swipe_velocity: 0.7,
    swipe_min_touches: 1,
    swipe_max_touches: 1,
    drag_block_vertical: false,          
    parallax:"mouse",
    parallaxBgFreeze:"on",
    parallaxLevels:[7,4,3,2,5,4,3,2,1,0],           
    keyboardNavigation:"on",
    navigationHAlign:"center",
    navigationVAlign:"bottom",
    navigationHOffset:0,
    navigationVOffset:20,
    soloArrowLeftHalign:"left",
    soloArrowLeftValign:"center",
    soloArrowLeftHOffset:20,
    soloArrowLeftVOffset:0,
    soloArrowRightHalign:"right",
    soloArrowRightValign:"center",
    soloArrowRightHOffset:20,
    soloArrowRightVOffset:0,   
    shadow:0,
    fullWidth:"on",
    fullScreen:"off",
    spinner:"spinner4",
    stopLoop:"off",
    stopAfterLoops:-1,
    stopAtSlide:-1,
    shuffle:"off",
    autoHeight:"off",           
    forceFullWidth:"off",                       
    hideThumbsOnMobile:"on",
    hideNavDelayOnMobile:1500,            
    hideBulletsOnMobile:"off",
    hideArrowsOnMobile:"off",
    hideThumbsUnderResolution:0,
    hideSliderAtLimit:0,
    hideCaptionAtLimit:0,
    hideAllCaptionAtLilmit:0,
    startWithSlide:0,
    fullScreenOffsetContainer: ".header"  
  });       
});  

// Current Year

var currentYear = (new Date).getFullYear();
$(".current-year").html(currentYear);

// Navigation Section Change //

var aChildren = $(".navigation li").children();
var aArray = [];
for (var i=0; i < aChildren.length; i++) {    
  var aChild = aChildren[i];
  var ahref = $(aChild).attr('href');
  aArray.push(ahref);
};

$(window).scroll(function(){

  var windowPos = $(window).scrollTop();
  var windowHeight = $(window).height();
  var docHeight = $(document).height();

  for (var i=0; i < aArray.length; i++) {
    var theID = aArray[i];
    var divPos = $(theID);
    if (divPos.length) {
      var divPos = divPos.offset().top;
    }
    var divHeight = $(theID).height();
    if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
        $("a[href='" + theID + "']").addClass("active").parent().siblings().children().removeClass("active");
    } else {
        $("a[href='" + theID + "']").removeClass("active");
    }
  }
});

// Navigation Scroll //

$('.navigation li a').click(function(event) {
  var id = $(this).attr("href");
  var target = $(id).offset().top;
  if($(window).width() > 980){
    $('html, body').animate({
        scrollTop: target
    }, 1000, 'easeInExpo');
  } else{
    $('html, body').animate({
        scrollTop: target
    }, 1000, 'easeInExpo');
  }
  event.preventDefault();
});

// Sticky Navigation Bar

$(window).scroll(function() {

  if ($(window).scrollTop() > 0) {
      $('.navigation').addClass('sticky');
  } else {
      $('.navigation').removeClass('sticky');
  }

});

// Mobile Navigation



// Mini-section Scripts

var miniSectionInterval;
var sectionAutoplay = function(){
  $('span#firstQuote-button').toggleClass('active').siblings().toggleClass('active');
  $('blockquote.firstQuote').toggleClass('active').siblings().toggleClass('active');
};

function do_slide(){
    miniSectionInterval = setInterval(function(){
        sectionAutoplay();
    }, 4000);
  };

do_slide();

$('span#firstQuote-button').click(function(){
  $(this).addClass('active');
  $('blockquote.firstQuote').addClass('active').siblings().removeClass('active');
  $('span#secondQuote-button').removeClass('active');
});

$('span#secondQuote-button').click(function(){
  $(this).addClass('active');
  $('blockquote.secondQuote').addClass('active').siblings().removeClass('active');
  $('span#firstQuote-button').removeClass('active');
});

$('span#secondQuote-button, span#firstQuote-button, blockquote').mouseenter(function(){
  clearInterval(miniSectionInterval);
});

$('span#secondQuote-button, span#firstQuote-button, blockquote').mouseleave(function(){
  do_slide();
});

// Form Title

$('form input:not(.reverse-input)').on('focus', function(){
  $('.form-title.english').addClass('active');
  $('.form-title.farsi').removeClass('active');
}).on('blur', function(){
  $('.form-title.english').removeClass('active');
});

$('form input.reverse-input').on('focus', function(){
  $('.form-title.farsi').addClass('active');
  $('.form-title.english').removeClass('active');
}).on('blur', function(){
  $('.form-title.farsi').removeClass('active');
});

// Datepicker

$(function() {
  $('.datepicker').datepicker({
    showOtherMonths: true,
    changeMonth: true,
    changeYear: true,
    yearRange: '-100y:c+nn',
    dateFormat: "mm-dd-yy"
  });
});

$(".from_datepicker").datepicker({ 
    dateFormat: "mm-dd-yy",
    changeMonth: true,
    changeYear: true,
    minDate: new Date(),
    maxDate: '+4y'
});

$(function() {
  $('.pdatepicker').persianDatepicker({
    initialValue: false,
    autoClose: true,
    format: 'YYYY/MM/DD'
  });
});

$(function() {
  $('.from_pdatepicker').persianDatepicker({
    initialValue: false,
    autoClose: true,
    format: 'YYYY/MM/DD',
    minDate: new persianDate().unix(),
    checkYear: function(year){
        return year >= 1396;
    }
  });
});

// Form Validate //

$('.number-field').numeric();

$('.msc_signup_form').validate({
  rules: {
    firstname: {
      required: true,
      minlength: 2
    },
    firstname_fa: {
      required: true,
      minlength: 2
    },
    lastname: {
      required: true,
      minlength: 2
    },
    lastname_fa: {
      required: true,
      minlength: 2
    },
    date_of_birth: {
      required: true,
      minlength: 2
    },
    date_of_birth_fa: {
      required: true,
      minlength: 2
    },
    place_of_birth: {
      required: true,
      minlength: 2
    },
    place_of_birth_fa: {
      required: true,
      minlength: 2
    },
    nationality: {
      required: true,
      minlength: 2
    },
    nationality_fa: {
      required: true,
      minlength: 2
    },
    id_number: {
      required: true,
      minlength: 2,
      number:true
    },
    id_number_fa: {
      required: true,
      minlength: 2,
      number:true
    },
    passport_number: {
      required: true,
      minlength: 2
    },
    passport_number_fa: {
      required: true,
      minlength: 2
    },
    passport_date_of_expiry: {
      required: true,
      minlength: 2
    },
    passport_date_of_expiry_fa: {
      required: true,
      minlength: 2
    },
    history_of_disease: {
      required: true,
      minlength: 1
    },
    history_of_disease_fa: {
      required: true,
      minlength: 1
    },
    blood_type: {
      required: true,
      minlength: 1
    },
    blood_type_fa: {
      required: true,
      minlength: 1
    },
    phone_number: {
      required: true,
      minlength: 5,
      number:true
    },
    phone_number_fa: {
      required: true,
      minlength: 5,
      number:true
    },
    mobile_number: {
      required: true,
      minlength: 5,
      number:true
    },
    mobile_number_fa: {
      required: true,
      minlength: 5,
      number:true
    },
    emergency_phone: {
      required: true,
      minlength: 5,
      number:true
    },
    emergency_phone_fa: {
      required: true,
      minlength: 5,
      number:true
    },
    telegram_id: {
      required: true,
      minlength: 1
    },
    telegram_id_fa: {
      required: true,
      minlength: 1
    },
    email_address: {
      required: true,
      minlength: 5,
      email:true
    },
    email_address_fa: {
      required: true,
      minlength: 5,
      email:true
    }
  },
  errorPlacement: function(error, element) {
    return false;
  },
  submitHandler: function (form) {
    if($('.samanira_secure').val() == '') {
      $.ajax({
        type: "POST",
        url: "msc_signup.php",
        data: $(form).serialize(),
        success: function () {
            $('.overlay.signup-overlay').remove();
            $('.overlay.thankyou-overlay').addClass('active');
        }
      });
      return false; // required to block normal submit since you used ajax
    } else {
        $('.msc_signup_form input[type="submit"]').prop('disabled', true);
      return false;
    }
  }

});

$('.contact_form').validate({
  rules: {
    full_name: {
      required: true,
      minlength: 2
    },
    email_address: {
      required: true,
      minlength: 5,
      email:true
    },
    mobile_number: {
      required: true,
      minlength: 5,
      number:true
    },
    message_subject: {
      required: true,
      minlength: 2
    },
    message: {
      required: true,
      minlength: 10
    }
  },
  errorPlacement: function(error, element) {
    return false;
  },
  submitHandler: function (form) {
    if($('.samanira_secure').val() == '') {
      $.ajax({
        type: "POST",
        url: "mail.php",
        data: $(form).serialize(),
        success: function () {
            $('.contact_form :input').prop('disabled', true);
            $('.message.success').addClass('active'); 
            setTimeout(function(){
              $('.message.success').removeClass('active');
            },8000);
        }
      });
      return false; // required to block normal submit since you used ajax
    } else {
      $('.contact_form input[type="submit"]').prop('disabled', true);
      return false;
    }
  }

});

});