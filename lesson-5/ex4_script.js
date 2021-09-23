window.onload = load;

function load() {
    function Item(name, description) {
        this.name = name;
        this.description = description;
    }

    var catalog = [];
    catalog.push(
        new Item('pen', 'new')
    );
    catalog.push(
        new Item('pencil', 'bad')
    );
    catalog.push(
        new Item('file', 'good')
    );
    catalog.push(
        new Item('paper', 'very good')
    );

    console.log(catalog)

    var n = catalog.length;
    var div = document.getElementById('catalog');


    if (n <= 0) {
        div.innerHTML = String("Каталог пуст");
    } else {
        var ul = document.createElement('ul');
        div.appendChild(ul);
        for (var i = 0; i < n; i++){
            var li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML = 'Название: ' + String(catalog[i].name) + '. Описание: ' + String(catalog[i].description);
        }
        
    }
}
