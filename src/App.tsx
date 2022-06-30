// App.js
import React, { useState, useEffect } from "react";
import TableC from "./Components/TableC";
import { group_by_state_city, group_by_state_city_type } from "./utilty";

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

    useEffect(() => {
        setLoading(true);
        fetch("/api/properties")
            .then((response) => response.json())
            .then((json) => {
                // console.log("json", json);
                setProperties(json.properties);
                group_by_state_city_type(json.properties);
                setTableData(group_by_state_city(json.properties));
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
