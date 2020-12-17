import Product from "@/../models/product"
export const getTotalPrice = (items, promocode) => {
    let total = items.reduce((sum, item) => {
        sum += new Product(
            item.item,
            item.variation,
            item.options,
            item.date,
            item.cnt,
        ).getTotalPrice();
        return sum;
    }, 0);
    total = getPromocodeValue(total)
    total = Math.round(total)
    if (total < 0) total = 0
    return total

    function getPromocodeValue(total) {
        if (!promocode) return total
        const type = promocode.sale_type
        let value = promocode.value
        if (type === 'percent') {
            const k = value / 100
            total = total - (total * k)
        }
        if (type === 'fixed') {
            total -= value
        }
        return total
    }
}

export const loadSvg = (image) => {
    var $img = $(image);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    $.get(imgURL, function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);

    }, 'xml');
}