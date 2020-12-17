module.exports = class Product {
    constructor(product, activeVariationId = '', activeOptions = {}, activeDateId = '', cnt,) {
        this.product = product
        this.dates = product.date || []
        this.variations = product.product_variations || []
        this.activeVariationId = activeVariationId
        this.activeOptions = activeOptions
        this.activeDateId = activeDateId
        this.cnt = cnt
        this.isBonus = product.is_bonus
        if (this.isBonus) this.cnt = 1

    }
    get activeVariation() {
        return this.getActiveVariation()
    }
    get productOptions() {
        return this.getProductOptions()
    }
    get price() {
        return this.getPrice()
    }
    get normOptions() {
        return this.getNormOptions()
    }
    get optionsPrice() {
        return this.getOptionsPrice()
    }
    get activeDate() {
        return this.getActiveDate()
    }
    get totalPrice() {
        return this.getTotalPrice()
    }
    get freeCnt() {
        return this.getFreeCnt()
    }
    getFreeCnt() {
        if (this.activeDate) {
            return this.activeDate.free_cnt
        }
        return false
    }

    getNormOptions() {
        const options = [];
        const optIds = Object.keys(this.activeOptions);

        optIds.forEach((optId) => {
            const option = this.productOptions.find((opt) => opt._id.toString() === optId.toString());
            // if(!option) return
            const type = option.type;
            let values;
            if (type === "range") {
                values = this.activeOptions[optId];
            } else {
                values = option.values.filter((val) =>
                    this.activeOptions[optId].includes(val._id.toString())
                );
            }

            options.push({
                option,
                values,
            });
        });
        return options;
    }
    getOptionsPrice() {
        let optionPrice = 0;
        this.normOptions.forEach((option) => {
            const type = option.option.type;
            if (type === "range") {
                const acitveValues = option.values;
                const firstVal = acitveValues[0];
                const secondVal = acitveValues[1];
                const optValues = option.option.values;
                const firstOptValIdx = optValues.findIndex((val) => {
                    return val.settings.from <= firstVal && val.settings.to > firstVal;
                });
                const secondOptValIdx = optValues.findIndex((val) => {
                    return (
                        val.settings.from < secondVal && val.settings.to >= secondVal
                    );
                });
                const firstHandlePrice = optValues.reduce((sum, item, index) => {
                    if (index > firstOptValIdx) return sum;
                    const price = item.price;
                    const step = item.settings.step;
                    let d = item.settings.to - item.settings.from;
                    if (index === firstOptValIdx) {
                        d = firstVal - item.settings.from;
                    }
                    const stepCnt = Math.round(d / step);

                    const rangePrice = stepCnt * price;
                    sum += rangePrice;
                    return sum;
                }, 0);
                const secondHandlePrice = optValues.reduce((sum, item, index) => {
                    if (index > secondOptValIdx) return sum;
                    const price = item.price;
                    const step = item.settings.step;
                    let d = item.settings.to - item.settings.from;
                    if (index === secondOptValIdx) {
                        d = secondVal - item.settings.from;
                    }
                    const stepCnt = Math.round(d / step);

                    const rangePrice = stepCnt * price;
                    sum += rangePrice;
                    return sum;
                }, 0);
                const d = secondHandlePrice - firstHandlePrice;
                optionPrice += d;
            }
            option.values.forEach((value) => {
                const price = value.price || 0;
                optionPrice += price;
            });
        });
        return optionPrice;
    }
    getTotalPrice() {
        const dateSale = this.activeDate.sale / 100 || 0;
        const saleD = Math.round(this.price * dateSale);
        let total = ((this.price - saleD) + this.optionsPrice) * this.cnt;
        return Math.round(total)
    }
    getActiveDate() {
        const activeDate = this.dates.find(
            (date) => date._id.toString() === this.activeDateId
        );
        return activeDate || {};
    }
    getPrice() {
        if (Object.keys(this.activeVariation).length > 0) {
            return this.activeVariation.price || 0;
        }
        return this.product.price || 0;
    }
    getActiveVariation() {
        return (
            this.variations.find(
                (variation) => variation.attrValue._id.toString() === this.activeVariationId.toString()
            ) || {}
        );
    }
    getProductOptions() {
        if (this.product.product_type === 'variation') {
            return this.activeVariation.product_options || []

        } else {
            return this.product.product_options || []

        }
    }

}