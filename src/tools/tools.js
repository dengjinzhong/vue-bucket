/**
 * 格式化时间
 * @param date
 * @param format
 * @returns {string}
 */

export function isType(obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
}

export function padLeftZero(str, length) {
    return ('00' + str).slice(-length);
}

export function formatDate(date, format = 'yyyy-mm-dd hh:ii') {
    if (!isType(date, 'Date')) {
        if (isType(date, 'String')) {
            date = date ? new Date(date.replace(/\-/g, "/")) : emptyDate;
        } else {
            let v = date;
            date = new Date();
            date.setTime(v * 1000);
        }
    }
    if (!date.getRealMonth) {
        date.getRealMonth = () => {
            return date.getMonth() + 1;
        };
    }

    let o = {
        'y+': date.getFullYear(),
        'm+': date.getRealMonth(),
        'd+': date.getDate(),
        'h+': date.getHours(),
        'i+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        let str = o[k] + '';
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(RegExp.$1, padLeftZero(str, RegExp.$1.length));
        }
    }
    return format;
}