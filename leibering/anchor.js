
// The function actually applying the offset
function offsetAnchor() {
  if (location.hash.length !== 0) {
    window.scrollTo(window.scrollX, window.scrollY - 75);
  }
}

// Captures click events of all a elements with href starting with #
$(document).on('click', 'a[href^="#"]', function(event) 
{
  // Click events are captured before hashchanges. Timeout
  // causes offsetAnchor to be called after the page jump.
  window.setTimeout(function() {
    offsetAnchor();
  }, 0);
});

// Set the offset when entering page with hash present in the url
window.setTimeout(offsetAnchor, 0);


function map()
{
  var left = "40%"
  var top = "37%"

  if ($(window).width() <= 1750 && $(window).width() > 1600)
  {
    $("#map").width($(window).width() / 4.25);
    $("#map").height($(window).width() / 4.5);
    $(".centerframe").css("left", "55%");
    $(".centerframe").css("top", "0%");
  }
  else if ($(window).width() <= 1600)
  {
     $("#map").width($(window).width() / 4.25);
     $("#map").height($(window).width() / 4.5);
     $(".centerframe").css("left", left);
     $(".centerframe").css("top", top);
  }
  else 
  {
     $("#map").width($(window).width() / 3.25);
     $("#map").height($(window).width() / 3.5);
     $(".centerframe").css("left", "49%");
     $(".centerframe").css("top", "0%");
  }
}


$(document).ready(function(){

  $('#menuBar').append(`

      <center>
				<nav>
					<ul>
						<li>
							<a href="index.html">Home</a>
						</li>

						<li>
							<a href="index.html#contact">Contact Us</a>
						</li>

						<li>
							<a href="product.html#Sustainability">Sustainability</a>
						</li>

						<li>
							<a href="product.html#Products">Products</a>
						</li>
					</ul>
				</nav>
			</center>

`);

  map();

  window.addEventListener('resize', map);

})


$(function() {
  $('a[href*=#]:not([href=#])').click(function() 
  {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && 
           location.hostname == this.hostname) 
    {

      var target = $(this.hash);

      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

      if (target.length) 
      {
        $('html,body').animate(
        {
          scrollTop: target.offset().top - 75
        }, 1000);
        return false;
      }
    }
  });
});
