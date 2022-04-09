import './App.css';
import {AgGridReact} from 'ag-grid-react';
import React, {useRef, useState, useCallback, useEffect, useMemo} from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import AllData from "./MOCK_DATA.json"
import CustomPinnedRowRenderer from "./components/fixedRow/fixedRow";

const columnIdDefs = [
    {field: "outlet"},
    {field: "date"},
    {field: "transaction_id"},
    {field: "vendor_commission_rate"},
    {field: "vendor_commission_amount"},
    {field: "amount_incl_f"},
    {field: "management_commission_rate"},
    {field: "management_commission_amount"},
    {field: "amount_incl_fg"},
    {field: "commission_rate"},
    {field: "commission_amount"},
    {field: "amount_incl_fgc"},
    {field: "retro_commission_rate"},
    {field: "retro_commission_amount"},
    {field: "amount_incl_fgcr"}]

const startStateTotal = {
    vendor_commission_rate: [],
    vendor_commission_amount: [],
    amount_incl_f: [],
    management_commission_rate: [],
    management_commission_amount: [],
    amount_incl_fg: [],
    commission_rate: [],
    commission_amount: [],
    amount_incl_fgc: [],
    retro_commission_rate: [],
    retro_commission_amount: [],
    amount_incl_fgcr: []
}

const startPinned = {
    outlet: 'Total',
    vendor_commission_rate: 'vendor_commission_rate',
    vendor_commission_amount: 'vendor_commission_amount',
    amount_incl_f: 'amount_incl_f',
    management_commission_rate: 'management_commission_rate',
    management_commission_amount: 'management_commission_amount',
    amount_incl_fg: 'amount_incl_fg',
    commission_rate: 'commission_rate',
    commission_amount: 'commission_amount',
    amount_incl_fgc: 'amount_incl_fgc',
    retro_commission_rate: 'retro_commission_rate',
    retro_commission_amount: 'retro_commission_amount',
    amount_incl_fgcr: 'amount_incl_fgcr',
}

function reducerFn(acc, value, index, array) {
    let calculatedValue = acc + value;

    if (index === array.length - 1) {
        return calculatedValue / array.length;
    }
    return calculatedValue;
}

function App() {
    const [rowData] = useState(AllData);
    const gridRef = useRef();

    const [columnDefs] = useState([
        {field: "id", sortable: true, filter: 'agNumberColumnFilter', resizable: true, width: 70,},
        {field: "outlet", sortable: true, filter: true, resizable: true, cellRendererSelector: function (params) {
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            style: { color: 'black', fontWeight: 'bold' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            }},
        {field: "date", sortable: true, filter: 'agDateColumnFilter', resizable: true},
        {field: "transaction_id", sortable: true, filter: true, resizable: true},
        {field: "vendor_commission_rate", sortable: true, filter: 'agNumberColumnFilter', resizable: true, cellRendererSelector: function (params) {
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            style: { color: 'blue', fontWeight: 'bold' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            }},
        {field: "vendor_commission_amount", sortable: true, filter: 'agNumberColumnFilter', resizable: true, cellRendererSelector: function (params) {
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            style: { color: 'blue', fontWeight: 'bold' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            },},
        {field: "amount_incl_f", sortable: true, filter: 'agNumberColumnFilter', resizable: true, cellRendererSelector: function (params) {
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            style: { color: 'blue', fontWeight: 'bold' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            },},
        {field: "management_commission_rate", sortable: true, filter: 'agNumberColumnFilter', resizable: true, cellRendererSelector: function (params) {
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            style: { color: 'blue', fontWeight: 'bold' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            },},
        {field: "management_commission_amount", sortable: true, filter: 'agNumberColumnFilter', resizable: true, cellRendererSelector: function (params) {
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            style: { color: 'blue', fontWeight: 'bold' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            },},
        {field: "amount_incl_fg", sortable: true, filter: 'agNumberColumnFilter', resizable: true, cellRendererSelector: function (params) {
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            style: { color: 'blue', fontWeight: 'bold' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            },},
        {field: "commission_rate", sortable: true, filter: 'agNumberColumnFilter', resizable: true, cellRendererSelector: function (params) {
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            style: { color: 'blue', fontWeight: 'bold' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            },},
        {field: "commission_amount", sortable: true, filter: 'agNumberColumnFilter', resizable: true, cellRendererSelector: function (params) {
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            style: { color: 'blue', fontWeight: 'bold' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            },},
        {field: "amount_incl_fgc", sortable: true, filter: 'agNumberColumnFilter', resizable: true, cellRendererSelector: function (params) {
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            style: { color: 'blue', fontWeight: 'bold' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            },},
        {field: "retro_commission_rate", sortable: true, filter: 'agNumberColumnFilter', resizable: true, cellRendererSelector: function (params) {
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            style: { color: 'blue', fontWeight: 'bold' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            },},
        {field: "retro_commission_amount", sortable: true, filter: 'agNumberColumnFilter', resizable: true, cellRendererSelector: function (params) {
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            style: { color: 'blue', fontWeight: 'bold' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            },},
        {field: "amount_incl_fgcr", sortable: true, filter: 'agNumberColumnFilter', resizable: true, cellRendererSelector: function (params) {
                if (params.node.rowPinned) {
                    return {
                        component: CustomPinnedRowRenderer,
                        params: {
                            style: { color: 'blue', fontWeight: 'bold' },
                        },
                    };
                } else {
                    // rows that are not pinned don't use any cell renderer
                    return undefined;
                }
            },},
    ]);
    const [stateTotal, setStateTotal] = useState(startStateTotal);

    const pinnedBottomRowData = useMemo(() => {
        return [startPinned];
    }, []);


    const resetTotalState = () => {
        console.log('ever in resett ???');
        setStateTotal(startStateTotal);
    }
    const calcTotal = (node, index) => {
        const allRow = node?.data;
        const dataLength = node?.parent?.allChildrenCount;
        const res = startStateTotal;
        let oldVal = 0;
        Object.keys(allRow)?.forEach(key => {
            const name = stateTotal[key];
            let getArr = res[key];
            if (name || name === 0) {
                getArr.push(allRow[key]);
            }
            console.log(res[key]?.length, dataLength, 'HHH', oldVal);
            if (res[key]?.length === (dataLength)) {
                if (key.includes('amount')) {
                    let totalSum = getArr?.reduce((accumulator, current) => accumulator + current, 0);
                    setStateTotal(prevState => ({...prevState, [key] : totalSum}));
                }
                if (key.includes('_rate')) {
                    let avgTotal = getArr?.reduce(reducerFn, 0);
                    setStateTotal(prevState => ({...prevState, [key] : avgTotal}));
                }
                oldVal = res[key]?.length;
            }
        });
    };



    useEffect(() => {
        gridRef.current?.api?.setPinnedBottomRowData([{...stateTotal, outlet: 'Total'}]);
    }, [stateTotal]);

    const onFilterChanged = () => {
        console.log('inside');
        if (stateTotal.vendor_commission_rate.length > 0){
            resetTotalState();
        }
        gridRef.current.api.forEachNodeAfterFilterAndSort(calcTotal);
        console.log('we have finished it here');
    }

    // const onGridReady = useCallback((params) => {
    //     console.log('how many times');
    //     gridRef.current.api.forEachNodeAfterFilterAndSort(calcTotal);
    // }, []);

    return (
        <div className="App">
            <h1>Table overview</h1>
            <br />
            <div>
                On activating each filter on column Total is recalculated and represented in footer cells.
            </div>
            <br />
            <div className="ag-theme-alpine" style={{minWidth: '100%', height: '550px'}}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pinnedBottomRowData={pinnedBottomRowData}
                    animateRows={true}
                    onFilterChanged={onFilterChanged}
                    // onGridReady={onGridReady}
                >
                </AgGridReact>
            </div>
        </div>
    );
}

export default App;
