

// smooth scroll to div
$('a[href*=#]:not([href=#])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});


//Menu
(function() {
  
  var Menu = (function() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('.menu');
    var menuList = document.querySelector('.menu__list');
    var brand = document.querySelector('.menu__brand');
    var menuItems = document.querySelectorAll('.menu__item');
    
    var active = false;
    
    var toggleMenu = function() {
      if (!active) {
        menu.classList.add('menu--active');
        menuList.classList.add('menu__list--active');
        brand.classList.add('menu__brand--active');
        burger.classList.add('burger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.add('menu__item--active');
        }
        
        active = true;
      } else {
        menu.classList.remove('menu--active');
        menuList.classList.remove('menu__list--active');
        brand.classList.remove('menu__brand--active');
        burger.classList.remove('burger--close');
        for (var i = 0, ii = menuItems.length; i < ii; i++) {
          menuItems[i].classList.remove('menu__item--active');
        }
        
        active = false;
      }
    };
    
    var bindActions = function() {
	  burger.addEventListener('click', toggleMenu, false); 
	  for (var i = 0, ii = menuItems.length; i < ii; i++) {
		menuItems[i].addEventListener('click', function () {
			toggleMenu()
		})
	  }
    };
    
    var init = function() {
      bindActions();
    };
    
    return {
      init: init
    };
    
  }());
  
  Menu.init();
  
}());











// checkbox


$(window).keyup(function(e){
  var target = $('.checkbox-other input:focus');
  if (e.keyCode == 9 && $(target).length){
    $(target).parent().addClass('focused');
  }
});
 
$('.checkbox-other input').focusout(function(){
  $(this).parent().removeClass('focused');
});

















$(document).ready(function($) {
  // Клик по ссылке "Закрыть".
  $('.popup-close').click(function() {
    $(this).parents('.popup-fade').fadeOut();
    return false;
  });        
 
  // Закрытие по клавише Esc.
  $(document).keydown(function(e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      $('.popup-fade').fadeOut();
    }
  });
  
  // Клик по фону, но не по окну.
  $('.popup-fade').click(function(e) {
    if ($(e.target).closest('.popup').length == 0) {
      $(this).fadeOut();          
    }
  }); 
});

$('.filter_tab__subcat a').click(function(event) {
	$(".filter_tabs").addClass('hidden').removeClass("showed");
  });


$('.menu__link').click(function(event) {
  if ($('.menu').hasClass('menu--active')) {
   

    $('.menu__list').removeClass('menu__list--active');
    $('.burger').removeClass('burger--close');
    $('.menu').removeClass('menu--active');
    $('.menu__item').removeClass('menu--active');

    $('.menu__list').css('transform', 'translate3d(0, -100%, 0)');
    $('.menu__list').css('transform', 'translate3d(0, -0%, 0)');
    
  } else {

    $('.menu__list').addClass('menu--active');
    $('.burger').addClass('burger--close');
    $('.menu').addClass('menu--active');
    $('.menu__item').addClass('menu--active');

  }
  
});













//модалка
$('.js-open-modal').click(function(event) {
   event.preventDefault();
   
   var modalName = $(this).attr('data-modal');
   var modal = $('.js-modal[data-modal="' + modalName + '"]');
   
   modal.addClass('is-show');
   $('.js-modal-overlay').addClass('is-show')
});

$('.js-modal-close').click(function() {
   $(this).parent('.js-modal').removeClass('is-show');
   $('.js-modal-overlay').removeClass('is-show');
});
   
$('.js-modal-overlay').click(function() {
   $('.js-modal.is-show').removeClass('is-show');
   $(this).removeClass('is-show');
})

// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
// <script src="https://rawgit.com/RobinHerbots/jquery.inputmask/3.x/dist/jquery.inputmask.bundle.js"></script>

if ($('body').hasClass('.tel2')) {
	$('.tel2').inputmask("+7(999) 999-9999");
 
}
 
 