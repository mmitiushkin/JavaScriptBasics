function converter(num) {
    if (0 > num || num > 999) {
        console.log('Only from 0 to 999');
        return {};
    } else {
        var b = String(num);
        num = {
            'Ones': b.split('')[2],
            'Tens': b.split('')[1],
            'Hundreds': b.split('')[0]
        };
        return num;
    }

};
console.log(converter(142));
