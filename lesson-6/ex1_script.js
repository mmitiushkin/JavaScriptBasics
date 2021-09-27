window.onload = Drow;
function Drow(){

    
    // ----------- создаем объект каталога -----------
    function Item(product, image, description, price) {
        this.product = product;
        this.image = `img/${image}.jpg`;
        this.description = description;
        this.price = price;
    }

    let catalogList = []

    catalogList.push(new Item('Чипсы', 'Image1', 'Новые', 95));
    catalogList.push(new Item('Медведь', 'Image2', 'Хороший', 57));
    catalogList.push(new Item('Кошка', 'Image3', 'Б/У', 85));
    catalogList.push(new Item('Пикачу', 'Image4', 'Ваще суперский', 52));
    

    // создаем отображение каталога
    function drowItems() {
        catalogList.forEach(function (item, id) {
            drowItem(item, id);
        })
    }

    const catalog = document.querySelector('#catalog');

    function drowItem(item, id) {
        catalog.insertAdjacentHTML('beforeend', 
        `<div id="item-${id}" class="prod_item">
            <div class="item">
                <div class="image"><img class="img" src="${item.image}"></div>
                <div class="overlay" id="overlay-modal"></div>
                <div class="description"><h4>${item.product}</h4>${item.description}
                    <div class="price">Цена: 
                        <span>${item.price}</span> руб.
                    </div>
                </div>
            </div>
            <div class="sale">
                <div data-id="${id}" class="button">В корзину</div>
            </div>
        </div>`);
    }
    drowItems(catalogList);

    // ----------- создаем объект корзины -----------
    let shoppingCart = [];

    function basketItem(product, price) {
        this.product = product;
        this.price = price;
        }
        
    // получаем итоговую сумму
    function totalSum(shoppingCart) {
        return shoppingCart.reduce(function (acc, shoppingCart) {
            return acc + shoppingCart.price;
        }, 0);
    }

    // создаем отображение корзины
    function drowTotal (shoppingCart) {
        const basket = document.querySelector('#basket');
        basket.textContent = '';

        if (shoppingCart == 0) {
            basket.insertAdjacentHTML('beforeend', `<div class="total">Ваша корзина пуста.</div>`);
        } else {
            basket.insertAdjacentHTML('beforeend', 
            `<div class="total">
                <p>В корзине: ${shoppingCart.length} 
                товаров на сумму ${totalSum(shoppingCart)} рублей.</p>
            </div>`);
        }
    }
    drowTotal(shoppingCart);

    // событие - добавление объекта в корзину
    catalog.addEventListener('click', function (e) {
        if (e.target.className ==='button' ) {
            const id = Number(e.target.getAttribute('data-id'));
            const choice = catalogList[id];
            shoppingCart.push(new basketItem(choice.product, choice.price));

            drowTotal(shoppingCart);
        } 
    });

    function newModal(){
        document.addEventListener('DOMContentLoaded', function() {

            var modalButtons = document.querySelectorAll('.img'),
               overlay      = document.querySelector('#overlay-modal'),
               closeButtons = document.querySelector('.js-modal-close');
           
           
            modalButtons.forEach(function(item){
              
                item.addEventListener('click', function(e) {
                 
                    e.preventDefault();

                    var modalId = this.getAttribute('data-modal'),
                     modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
                 
                    modalElem.classList.add('active');
                    overlay.classList.add('active');

                });
            }); 
        });
    }


}