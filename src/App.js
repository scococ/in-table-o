import './App.css';
import { AgGridReact } from 'ag-grid-react';
import React, {useMemo, useState} from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import AllData from "./MOCK_DATA.json"

function App() {
  const [rowData] = useState(AllData);

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

  return (
    <div className="App">
      <h1>Table overview</h1>
      <div className="ag-theme-alpine" style={{minWidth: '100%', height: '550px'}} >
        <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
