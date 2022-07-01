import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/lib/table";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import React from "react";

interface DataType {
    key?: string;
    city: string;
    state: string;
    type: string;
    avgPrice: number;
    count: number;
}
interface I_TableC {
    data: DataType[];
    loading: boolean;
}
const columns: ColumnsType<DataType> = [
    {
        title: "State",
        dataIndex: "state",
        key: "state",
    },
    {
        title: "City",
        dataIndex: "city",
        key: "city",
    },
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
    },
    {
        title: "Houses",
        key: "count",
        dataIndex: "count",
    },
    {
        title: "Avg.Price",
        dataIndex: "avgPrice",
        key: "avgPrice",
    },
];

const data: DataType[] = [
    {
        key: "1",
        avgPrice: 0,
        city: "-",
        type: "-",
        count: 0,
        state: "-",
    },
];

const TableC: React.FC<I_TableC> = (props) => {
    let dataSource = props.data
        ? props.data.map((ele, i) => ({ ...ele, key: i.toString() }))
        : data;

    return (
        <Table
            loading={props.loading}
            columns={columns}
            dataSource={dataSource}
            pagination={false}
        />
    );
};

export default TableC;
