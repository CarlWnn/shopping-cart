// an array with all of our cart items
var cart = [];



var updateCart = function () {
  // TODO: Write this function. In this function we render the page.
  // Meaning we make sure that all our cart items are displayed in the browser.
  // Remember to empty the "cart div" before you re-add all the item elements.
  $('.cart-list').empty();
  var cartTotal=0;
 
  for (var i=0; i<cart.length; i++ ){
    cartTotal += cart[i].price; 
    if(cart[i].quantity > 1)
        $(".cart-list").append ('<p>'+ cart[i].name + '(' + cart[i].quantity + ') - $' + cart[i].price +
        ' <a class="trash-btn" data-id=' + i + '> <i class="fa fa-trash"></i> </a>' + '</p>' );
    else
        $(".cart-list").append ('<p>'+ cart[i].name + '- $' + cart[i].price +
        ' <a class="trash-btn" data-id=' + i + '> <i class="fa fa-trash"></i> </a>' + '</p>' );
  }
   
  $('.total').text(cartTotal);
  
} 

var _findIndex= function(item_name){
  for (var i=0; i<cart.length; i++){
     if(cart[i].name==item_name)
       return i;
  }
  return -1;
}

var addItem = function (name, price) {
  // TODO: Write this function. Remember this function has nothing to do with display. 
  // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
      var index= _findIndex(name);
      if (index!== -1){ // item in cart
        cart[index].quantity ++;
        //console.log(item.quantity);
      }else{
        var item= {
          name: name,
          price: price,
          quantity: 1,
        }
        cart.push(item);
      }
 
}

var clearCart = function () {
  // TODO: Write a function that clears the cart ;-)
  // cart.empty();
  cart = [];
  updateCart();
}

// update the cart as soon as the page loads!
updateCart();


/****************EVENT LISTNERS ************************************************ */

$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!>>toggle
  $('.shopping-cart').toggle();
});


$('.add-to-cart').on('click', function () {
  // TODO: get the "item" object from the page

    // var item = {};
    //item.name= $(this).parent().closest('.item').data().name;
     //item.price= $(this).parent().closest('.item').data().price;

     var item= $(this).closest('.item'); 
     item_name= item.data().name;
     item_price= item.data().price;
     //console.log(item_name);
     addItem(item_name, item_price);
     updateCart();
});


$('.clear-cart').on('click', function () {
  clearCart();
});
 

$('.cart-list').on('click','.trash-btn', function(){
  var index = $(this).data().id;
  cart.splice(index,1);
  updateCart();
});
