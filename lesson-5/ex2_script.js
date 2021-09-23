function Item(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.newPrice = function () {
        return this.price * this.quantity;
    };

}

var basket = [];
basket.push(
    new Item('pen', 10, 2)
);
basket.push(
    new Item('pencil', 15, 3)
);
basket.push(
    new Item('file', 20, 9)
);
basket.push(
    new Item('paper', 25, 20)
);


function countBasketPrice(basket) {
    return basket.reduce(function (acc, basket) {
        return acc + (basket.newPrice())
    }, 0)
}


var n = basket.length;
var m = countBasketPrice(basket);

var div = document.createElement("div");
document.body.appendChild(div);

if (n <= 0) {
    div.innerHTML = String("В корзина пуста");
} else {
    div.innerHTML = String("В корзине: " + String(n) + " товаров на сумму " + String(m) + " рублей");
}
