// App.js
import React, { useState, useEffect } from "react";
import TableC from "./Components/TableC";
import {
    group_by_state_city,
    group_by_state_city_type,
    filter_data,
} from "./utilty";
import { Col, Row, Input, InputNumber, Button } from "antd";

interface I_tableData {
    state: string;
    type: string;
    city: any;
    count: any;
    avgPrice: number;
}

interface I_filter {
    state?: string;
    city?: string;
    type?: string;
    priceRange?: string[];
}

function App() {
    let [oriTableData, setOriTableData] = useState<I_tableData[]>([]);
    let [tableData, setTableData] = useState<I_tableData[]>([]);
    let [loading, setLoading] = useState<boolean>(false);
    let [filter, setFiter] = useState<I_filter>({});

    //點擊篩選
    const click_search = () => {
        if (oriTableData.length <= 0) return false;
        setTableData(filter_data(oriTableData, filter));

        // console.log(filter);
        // console.log("未篩選前的資料", oriTableData);
    };

    useEffect(() => {
        setLoading(true);
        fetch("/api/properties")
            .then((response) => response.json())
            .then((json) => {
                // console.log("json", json);
                setOriTableData(group_by_state_city_type(json.properties));
                setTableData(group_by_state_city_type(json.properties));
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Row justify="space-around">
                <Col span={4}>
                    state:
                    <Input
                        onBlur={(v) => {
                            setFiter({ ...filter, state: v.target.value });
                            console.log("input onblur");
                        }}
                        placeholder="Basic usage"
                    />
                </Col>
                <Col span={4}>
                    city:
                    <Input
                        onBlur={(v) => {
                            setFiter({ ...filter, city: v.target.value });
                            console.log("input onblur");
                        }}
                        placeholder="Basic usage"
                    />
                </Col>
                <Col span={4}>
                    type:
                    <Input
                        onBlur={(v) => {
                            setFiter({ ...filter, type: v.target.value });
                        }}
                        placeholder="Basic usage"
                    />
                </Col>
                <Col span={4}>
                    price:
                    <div>
                        <InputNumber
                            onBlur={(v) => {
                                console.log("input onblur");
                                if (!filter.priceRange) {
                                    setFiter({
                                        ...filter,
                                        priceRange: [v.target.value],
                                    });
                                } else {
                                    let tmp = [...filter.priceRange];
                                    tmp[0] = v.target.value;
                                    setFiter({
                                        ...filter,
                                        priceRange: tmp,
                                    });
                                }
                            }}
                            placeholder="Basic usage"
                        />
                        -
                        <InputNumber
                            onBlur={(v) => {
                                console.log("input onblur");
                                if (!filter.priceRange) {
                                    setFiter({
                                        ...filter,
                                        priceRange: [v.target.value],
                                    });
                                } else {
                                    let tmp = [...filter.priceRange];
                                    tmp[1] = v.target.value;
                                    setFiter({
                                        ...filter,
                                        priceRange: tmp,
                                    });
                                }
                            }}
                            placeholder="Basic usage"
                        />
                    </div>
                </Col>
                <Col span={4}>
                    <Button onClick={() => click_search()}>Search</Button>
                </Col>
            </Row>
            <TableC data={tableData} loading={loading} />
        </>
    );
}

export default App;
