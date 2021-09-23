window.onload = addElement;


function addElement() {
    var newTable = document.createElement("table");

    for (var i = 0; i < 9; i++) {
        var newTr = document.createElement('tr');

        for (var j = 0; j < 9; j++) {
            var newTd = document.createElement('td');
            if (j == 0) {
                newTd.className = 'number';
            } else if (i == 8) {
                newTd.className = 'char';
            } else {
                if (i % 2 == j % 2) {
                    newTd.className = "white";
                } else {
                    newTd.className = "black";
                }
            }
            newTr.appendChild(newTd);
        }
        newTable.appendChild(newTr);
    }


    document.body.appendChild(newTable);
    var i = 0;
    var chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var nums = ['8', '7', '6', '5', '4', '3', '2', '1'];

    for (i = 0; i < 8; i++) {
        document.getElementsByClassName("char")[i].innerHTML = chars[i];
    }

    for (i = 0; i < 8; i++) {
        document.getElementsByClassName("number")[i].innerHTML = nums[i];
    }

    for (i = 0; i < document.getElementsByClassName("black").length; i++) {
        document.getElementsByClassName("black")[i].style.backgroundColor = "black";
    }

    for (i = 0; i < document.getElementsByClassName("white").length; i++) {
        document.getElementsByClassName("white")[i].style.backgroundColor = "white";
    }

    for (i = 0; i < document.getElementsByTagName("td").length; i++) {
        document.getElementsByTagName("td")[i].style.width = "25px";
        document.getElementsByTagName("td")[i].style.height = "25px";
    }

    


}
