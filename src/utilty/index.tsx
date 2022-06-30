//將同state、同city組成一個群組
export const group_by_state_city = (arr: any[]) => {
    let tmpObj: any = {};
    //
    let result = arr.reduce(function (r, o) {
        let key = o.state + "-" + o.city;
        if (!tmpObj[key]) {
            tmpObj[key] = { ...o }; // create a copy of o
            tmpObj[key].count = 1;
            tmpObj[key].totalprice = parseFloat(o.price);
            r.push(tmpObj[key]);
        } else {
            tmpObj[key].count += 1;
            tmpObj[key].totalprice += parseFloat(o.price);
        }
        return r;
    }, []);

    result = result.map((e: any) => {
        return {
            state: e.state,
            city: e.city,
            type: e.type,
            count: e.count,
            id: e.id,
            price: e.price,
            avgPrice: Math.ceil(e.totalprice / e.count),
        };
    });
    return result;
};
//將同state、同city同type組成一個群組
export const group_by_state_city_type = (arr: any[]) => {
    let tmpObj: any = {};
    let result = arr.reduce(function (r, o) {
        let key = o.state + "-" + o.city + "-" + o.type;
        if (!tmpObj[key]) {
            tmpObj[key] = { ...o }; // create a copy of o
            tmpObj[key].count = 1;
            tmpObj[key].totalprice = parseFloat(o.price);
            r.push(tmpObj[key]);
        } else {
            tmpObj[key].count += 1;
            tmpObj[key].totalprice += parseFloat(o.price);
        }
        return r;
    }, []);

    result = result.map((e: any) => {
        return {
            state: e.state,
            city: e.city,
            type: e.type,
            count: e.count,
            id: e.id,
            price: e.price,
            avgPrice: Math.ceil(e.totalprice / e.count),
        };
    });
    return result;
};
