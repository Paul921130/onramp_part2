// App.js
import React, { useState, useEffect, Children } from "react";
import TableC from "./Components/TableC";
import { createServer } from "miragejs";
import { arrayBuffer } from "stream/consumers";
interface I_data {
    name: string;
    id: string;
    // state: string;
    city: string;
    // type: string;
}

interface I_tableData {
    state: string;
    city: any;
    count: any;
    avgPrice: number;
}

function App() {
    let [properties, setProperties] = useState<I_data[]>([]);
    let [tableData, setTableData] = useState<I_tableData[]>([]);
    let [loading, setLoading] = useState<boolean>(false);
    //篩選出state是Georgia的資料
    const filter_byGeorgia = (arr: any) => {
        return arr.filter((ele: { state: string }) => ele.state === "Georgia");
    };

    const calc_tableData = (arr: any) => {
        //arrByGeorgia
        let arrByGeorgia = filter_byGeorgia(arr);
        // console.log("arrByGeorgia", arrByGeorgia);

        if (arrByGeorgia.length <= 0) return [];

        //去重
        let citysInGeorgia: any[] = [];

        arrByGeorgia.forEach((element: any) => {
            if (citysInGeorgia.indexOf(element.city) < 0) {
                citysInGeorgia.push(element.city);
            }
        });

        let tmp = citysInGeorgia.map((child: any) => {
            let theSameCity_arr = arrByGeorgia.filter(
                (e: any) => e.city === child
            );

            let count = theSameCity_arr.length;

            let totalprice = 0;

            theSameCity_arr.forEach((element: any) => {
                totalprice += parseFloat(element.price);
            });
            let avgPrice = Math.ceil(totalprice / count);

            return {
                state: "Georgia",
                city: child,
                count: count, //相同城市的數量
                avgPrice: avgPrice,
            };
        });

        console.log(tmp);

        return tmp;
        // console.log("citysInGeorgia", citysInGeorgia);
    };

    useEffect(() => {
        setLoading(true);
        fetch("/api/properties")
            .then((response) => response.json())
            .then((json) => {
                // console.log("json", json);
                setProperties(json.properties);
                setTableData(calc_tableData(json.properties));
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // console.log("properties", properties);
    }, [properties]);

    return (
        <>
            <TableC data={tableData} loading={loading} />
        </>
    );
}

export default App;
