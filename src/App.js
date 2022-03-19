import './App.css';
import { AgGridReact } from 'ag-grid-react';
import React, {useRef, useState, useCallback, useEffect} from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import AllData from "./MOCK_DATA.json"

const newResults = AllData.reduce((accumulator, current) => accumulator + current.commission_amount, 0);

console.log(newResults, 'neww');

const columnIdDefs = [
    { field: "outlet"},
  { field: "date"},
  { field: "transaction_id" },
  { field: "vendor_commission_rate" },
  { field: "vendor_commission_amount" },
  { field: "amount_incl_f"},
  { field: "management_commission_rate"},
  { field: "management_commission_amount"},
  { field: "amount_incl_fg"},
  { field: "commission_rate"},
  { field: "commission_amount"},
  { field: "amount_incl_fgc"},
  { field: "retro_commission_rate"},
  { field: "retro_commission_amount"},
  { field: "amount_incl_fgcr"}]

const startStateTotal = {
  vendor_commission_rate: [] ,
  vendor_commission_amount: [] ,
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
function App() {
  const [rowData] = useState(AllData);
  const gridRef = useRef();

  const [columnDefs] = useState([
    { field: "id", sortable: true, filter: 'agNumberColumnFilter', resizable: true, width: 70, },
    { field: "outlet", sortable: true, filter: true , resizable: true},
    { field: "date", sortable: true , filter: 'agDateColumnFilter', resizable: true},
    { field: "transaction_id" , sortable: true, filter: true, resizable: true},
    { field: "vendor_commission_rate" , sortable: true, filter: 'agNumberColumnFilter', resizable: true},
    { field: "vendor_commission_amount" , sortable: true, filter: 'agNumberColumnFilter', resizable: true},
    { field: "amount_incl_f" , sortable: true, filter: 'agNumberColumnFilter', resizable: true},
    { field: "management_commission_rate" , sortable: true, filter: 'agNumberColumnFilter', resizable: true},
    { field: "management_commission_amount" , sortable: true,  filter: 'agNumberColumnFilter', resizable: true},
    { field: "amount_incl_fg" , sortable: true, filter: 'agNumberColumnFilter', resizable: true},
    { field: "commission_rate" , sortable: true, filter: 'agNumberColumnFilter', resizable: true},
    { field: "commission_amount" , sortable: true, filter: 'agNumberColumnFilter', resizable: true},
    { field: "amount_incl_fgc" , sortable: true, filter: 'agNumberColumnFilter', resizable: true},
    { field: "retro_commission_rate" , sortable: true, filter: 'agNumberColumnFilter', resizable: true},
    { field: "retro_commission_amount" , sortable: true, filter: 'agNumberColumnFilter', resizable: true},
    { field: "amount_incl_fgcr" , sortable: true, filter: 'agNumberColumnFilter', resizable: true}
  ]);
  const [stateTotal, setStateTotal] = useState(startStateTotal)

  const calcTotalSum = (sum, name) => {
    setStateTotal(prevState => ({...prevState, [name]: [...prevState[name], sum]}));
  }

  const calcRateAvg = (rate, name, index) => setStateTotal(prevState => ({...prevState, [name]: [...prevState[name], rate]}));

  const calcTotal = (node, index) => {
    const allRow = node.data;
    Object.keys(allRow).forEach((key, value) => {
      const name = stateTotal[key];
      if (name || name === 0) {
        if (key.includes('_rate')){
          calcRateAvg(allRow[key], key, index)
        }
        if( key.includes('amount')) {
          calcTotalSum(allRow[key], key)
        }
      }
    })
    console.log(stateTotal, 'yeah');
  };

  const onBtForEachNodeAfterFilterAndSort = useCallback(() => {
    gridRef.current.api.forEachNodeAfterFilterAndSort(calcTotal);
  }, []);


  useEffect(() => {
    console.log(stateTotal, 'totalll');
  }, [stateTotal])

  return (
    <div className="App">
      <h1>Table overview</h1>
      <button onClick={onBtForEachNodeAfterFilterAndSort}>
      For-Each Node After Filter and Sort
    </button>
      <div className="ag-theme-alpine" style={{minWidth: '100%', height: '550px'}} >
        <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
