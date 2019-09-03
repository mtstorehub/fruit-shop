
var $ = id => document.getElementById(id);
var CREATE_DOM = element => document.createElement(element);

window.onload = function () {

  $('username').innerHTML = localStorage.getItem('name').substr(localStorage.getItem('name').indexOf(' ') + 1);
  $('cart').style.visibility = 'hidden';
  renderingFruitData();

}


$('btnLogout').onclick = function (event) {
  event.preventDefault();
  window.close();
  window.open("index.html");
}

function gotoCart(){
  $('items').outerHTML = '';
  $('cart').style.visibility = 'visible';
  renderingCartData();
}

function renderingFruitData() {
  var view = CREATE_DOM('div');
  view.className = 'row';
  $('item-container').appendChild(view);
  // populating array
  data.map((item, index) => {
    view.appendChild(createItem(item, index))
  })
}

function renderingCartData() {
  busket.map((item, index) => {
    $('item-cart-container').appendChild(createCartItem(item, index));
  });
}

function createItem(_fruit, id) {
  var item = CREATE_DOM('div');
  item.className = 'column';
  // view.appendChild(item);
  var card = CREATE_DOM('div');
  card.className = 'card';
  item.appendChild(card);
  var image = CREATE_DOM('img');
  image.src = IMAGE_PATH + _fruit.image_src;
  image.alt = _fruit.name;
  image.className = 'image-style'
  card.appendChild(image);
  var item_title = CREATE_DOM('h3');
  item_title.className = 'card-title';
  item_title.textContent = _fruit.name
  card.appendChild(item_title);
  var item_detail_panel = CREATE_DOM('div');
  item_detail_panel.className = 'card-detail';
  card.appendChild(item_detail_panel);
  var box = CREATE_DOM('div');
  box.className = 'box';
  item_detail_panel.appendChild(box);
  var box_child_1 = CREATE_DOM('div');
  box.appendChild(box_child_1);
  var price_text = CREATE_DOM('span');
  price_text.className = 'sub-text';
  price_text.textContent = _fruit.price + ' MMK';
  box_child_1.appendChild(price_text);
  var box_child_2 = CREATE_DOM('div');
  box_child_2.className = 'rating';
  box.appendChild(box_child_2);
  for (let index = _fruit.rating; index > 0; index--) {
    var star = CREATE_DOM('i');
    star.className = 'fa fa-star';
    star.setAttribute('aria-hidden', 'true');
    box_child_2.appendChild(star)
  }
  var button_panel = CREATE_DOM('div');
  button_panel.className = 'container-card-button';
  item_detail_panel.appendChild(button_panel);
  var add_to_cart_btn = CREATE_DOM('button');
  add_to_cart_btn.type = 'button';
  add_to_cart_btn.className = 'btn btn-default';
  add_to_cart_btn.id = 'btn' + id;
  add_to_cart_btn.addEventListener('click', () => { addToCart(_fruit, id) })
  add_to_cart_btn.textContent = 'Add to Cart';
  var cart_icon = CREATE_DOM('i');
  cart_icon.className = 'fa fa-cart-plus';
  cart_icon.setAttribute('aria-hidden', 'true');
  add_to_cart_btn.appendChild(cart_icon);
  button_panel.appendChild(add_to_cart_btn);
  return item;
}

function createCartItem(item, id){
  var listitem = CREATE_DOM('div');
  listitem.className = 'items odd';
  var infoPanel = CREATE_DOM('div');
  infoPanel.className = 'infoWrap';
  listitem.appendChild(infoPanel);
  var child_1 = CREATE_DOM('div');
  child_1.className = 'cartSection';
  infoPanel.appendChild(child_1);
  var cart_image = CREATE_DOM('img');
  cart_image.src = IMAGE_PATH + item.image_src;
  cart_image.className = 'itemImg';
  child_1.appendChild(cart_image);
  var cart_name = CREATE_DOM('h3');
  cart_name.textContent = item.name;
  child_1.appendChild(cart_name);
  var qty_panel = CREATE_DOM('p');
  var qty_input = CREATE_DOM('input');
  qty_input.type = 'text';
  qty_input.className = 'qty';
  qty_input.placeholder = '1';
  qty_input.id='qty1';
  qty_panel.appendChild(qty_input);
  qty_panel.appendChild(document.createTextNode('x '+ item.price +' MMK'));
  child_1.appendChild(qty_panel);
  var status = CREATE_DOM('p');
  status.className = 'stockStatus';
  status.textContent = 'In Stock';
  child_1.appendChild(status);
  var item_total_panel = CREATE_DOM('div');
  item_total_panel.className = 'prodTotal cartSection';
  infoPanel.appendChild(item_total_panel);
  var item_total = CREATE_DOM('p');
  item_total.textContent = item.price+' MMK';
  item_total_panel.appendChild(item_total);
  return listitem;
}

function addToCart(item, id) {
  var btn = $('btn' + id);
  var cart = CREATE_DOM('i');
  cart.setAttribute('aria-hidden', 'true');

  if (busket.includes(item)) {
    console.log(item);
    busket.splice(busket.findIndex(buyItem => buyItem == item), 1)
    
    console.log(busket);
    
    btn.className = "btn btn-default"
    btn.textContent = 'Add to Cart';
    cart.className = 'fa fa-cart-plus';
    btn.appendChild(cart);
  } else {
    busket.push(item)
    btn.className = 'bought';
    btn.textContent = 'Remove Item';
    cart.className = 'fa fa-cart-arrow-down';
  }

  btn.appendChild(cart);
  // update cart
  $('cartItems').textContent = busket.length;
}

var IMAGE_PATH = 'img/fruits/';
var busket = []
var data = [
  { name: 'tomato', image_src: 'tomato.jpg', price: 1000, rating: 5 },
  { name: 'cucumber', image_src: 'cucumber.jpg', price: 2000, rating: 2 },
  { name: 'chayote', image_src: 'chayote.jpg', price: 3000, rating: 3 },
  { name: 'potato', image_src: 'potato.jpg', price: 1500, rating: 5 },
  { name: 'chilli', image_src: 'chilli.jpg', price: 1000, rating: 4 }
]