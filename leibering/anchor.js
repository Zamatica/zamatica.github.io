
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

   $("#map").width($("#wrapper").width() / 2.25);
   $("#map").height($("#wrapper").width() / 2.5);

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
