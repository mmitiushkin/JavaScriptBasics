window.onload = Drow;
function Drow(){

    
    // ----------- создаем объект каталога -----------
    function Item(product, image, description, price) {
        this.product = product;
        this.image = image;
        this.description = description;
        this.price = price;
    }

    let catalogList = []

    catalogList.push(new Item('Чипсы', ['./img/Image1-1.jpg', './img/Image1-2.jpg'], 'Новые', 95));
    catalogList.push(new Item('Медведь', ['./img/Image2-1.jpg', './img/Image2-2.jpg'], 'Классный', 57));
    catalogList.push(new Item('Кошка', ['./img/Image3-1.jpg', './img/Image3-2.jpg'], 'Б/У', 85));
    catalogList.push(new Item('Пикачу', ['./img/Image4-1.jpg', './img/Image4-2.jpg'], 'Ваще суперский', 52));
    

    // создаем отображение каталога


    const catalog = document.querySelector('#catalog');

    function drowItems() {
        catalogList.forEach(function (item, id) {
            let imagesHtml = item.image.map(function(src){
                return `<img class="small_img" src="${src}"></img>`;
                }).join('');
            
            let html = `<div id="item-${id}" class="prod_item">
                     <div class="item">
                         <div class="image">${imagesHtml}</div>
                         <div class="description"><h4>${item.product}</h4>${item.description}
                             <div class="price">Цена: 
                                 <span>${item.price}</span> руб.
                             </div>
                         </div>
                     </div>
                     <div class="sale">
                         <div data-id="${id}" class="button">В корзину</div>
                     </div>
                 </div>`
            catalog.insertAdjacentHTML('beforeend', html);
        })
    }
    drowItems()
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
            </div>
            <div id="buy_hidden">
                <p class="buy" id="buy">Купить</p>
            </div>
            <div id="confirmHtml" class="confirmHtml">
                <p class="buy" id="confirm">Подтвердить</p>
            </div>
            <div id="messageHtml" class="confirmHtml">
                <p class="buy" id="message">Завершить</p>
            </div>
            `);

            const $buy_hidden = document.getElementById('buy_hidden');
            const $confirmHtml = document.getElementById('confirmHtml');
            const $messageHtml = document.getElementById('messageHtml');

            function showChart(id=0) {
                for (const iterator of shoppingCart) {
                    let chartHtml = `<div id="${id}" class="buy_hidden__item">${iterator.product} за ${iterator.price} руб.`;    
                    $buy_hidden.insertAdjacentHTML('afterbegin', `${chartHtml}`);
                    id++;
                }
            }
            showChart();

            const buy = document.getElementById('buy');
            const confirm = document.getElementById('confirm');
            const message = document.getElementById('message');

            buy.addEventListener('click', function () {
                $buy_hidden.style.display = 'none';
                $confirmHtml.style.display = 'flex';
                confirmDrow();
            });
            confirm.addEventListener('click', function () {
                $confirmHtml.style.display = 'none';
                $messageHtml.style.display = 'flex';
                messageDrow();
                let inputAddr = document.getElementById('addr');
                $userAddr = inputAddr.value;
            });
            message.addEventListener('click', function () {
                $messageHtml.style.display = 'none';
                shoppingCart = [];
                drowTotal(shoppingCart);
                createConfirmWindow();
            });

            function confirmDrow() {
                let confirmHtml = 
                `<p class="buy_hidden__item">Адрес доставки:</p>
                <input id="addr" type="text" class="buy_hidden__confirm">`;
                $confirmHtml.insertAdjacentHTML('afterbegin', confirmHtml);
            }

            function messageDrow() {
                let messageHtml = 
                `<p class="buy_hidden__item">Комментарий к заказу:</p>
                    <form class="form" action="#">
                        <form action="#">
                            <input id="text" class="buy_hidden__confirm" type="text" placeholder="Ваше имя"><br>
                            <input id="email" class="buy_hidden__confirm" type="email" placeholder="Ваш email"><br>
                            <textarea id="message" class="buy_hidden__confirm" cols="30" rows="5" placeholder="Ваш комментарий"></textarea><br>
                        </form>
                    </form>`;
                $messageHtml.insertAdjacentHTML('afterbegin', messageHtml);
            }
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

    

    // создаем модальное окно для подверждения заказа

    const wrapper = document.getElementById('wrapper');

    function createConfirmWindow() {
        let orderDiv = document.createElement('div');
        let date = new Date().toLocaleDateString();

        orderDiv.className = 'orderDiv';
        orderDiv.insertAdjacentHTML('beforeend', `
        <h2>Ваш заказ от ${date}<br>на сумму ${totalSum(shoppingCart)} руб. передан в обработку.</h2>
        <h4>Адрес доставки: ${$userAddr}</h4>
        <button id="close">Закрыть</button>`);
        wrapper.append(orderDiv);
        
        orderDiv.addEventListener('click', function(e) {
            if( e.target.tagName === 'BUTTON' ) {
                orderDiv.style.display = 'none';
            }
        });
    }    
}