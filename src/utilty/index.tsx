interface I_Data {
    city: string;
    id: string;
    price: string;
    state: string;
    type: string;
}

//將同state、同city組成一個群組
export const group_by_state_city = (arr: I_Data[]) => {
    console.log(arr);
    let tmpObj: any = {};
    //
    let result: any = arr.reduce(function (r: any, o) {
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
export const group_by_state_city_type = (arr: I_Data[]) => {
    console.log(arr);
    let tmpObj: any = {};
    let result = arr.reduce(function (r: any, o) {
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
//fitlerData
export const filter_data = (arr: any[], filter: any) => {
    let tmp = [...arr];
    Object.keys(filter).forEach((child) => {
        if (filter[child] == "" || child === "priceRange") return false;
        console.log("child", child);
        console.log("child", filter[child]);
        tmp = tmp.filter(
            (e) => e[child].toLowerCase() === filter[child].toLowerCase()
        );
    });
    //如果filter的obj有價格區間的情況
    if (filter.priceRange?.length > 0) {
        let sortRange = filter.priceRange.filter(
            (e: number | string) => e !== ""
        );

        if (sortRange.length > 1) {
            sortRange.sort((a: number, b: number) => a - b);
        }
        console.log("sortRange", sortRange);

        if (sortRange.length === 1) {
            tmp = tmp.filter((e) => e.avgPrice <= sortRange[0]);
        }
        if (sortRange.length === 2) {
            tmp = tmp.filter(
                (e) => e.avgPrice <= sortRange[1] && e.avgPrice >= sortRange[0]
            );
        }
    }

    return tmp;
    // console.log("tmp", tmp);
};
