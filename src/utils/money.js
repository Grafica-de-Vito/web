function Format(value, type) {
    if (type === 'remove') {
        if (value?.length === 0) {
            return '';
        }

        const decimal = value?.split(',')[1] || '';

        value = value + '';
        value = parseInt(value.replace(/[\D]+/g, '')).toString();
        value = value.slice(0, value.length - decimal.length) + '.' + decimal;

        return parseFloat(value);
    }

    // type = add
    else {
        if (value?.length === 0) {
            return '';
        }

        value = value + '';
        value = parseInt(value.replace(/[\D]+/g, ''));
        value = value + '';
        value = value.replace(/([0-9]{2})$/g, ",$1");

        if (value.length > 6) {
            value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }

        return value;
    }
}

export { Format }