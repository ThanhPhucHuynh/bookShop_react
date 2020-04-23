import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import './cssjs/table.css'
import MaterialTable from 'material-table';
const API_HOST = process.env.REACT_APP_API_URL
// const columns = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString(),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString(),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ];

const columns = [
    { id: 'id', label: 'ID', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'img', label: 'Picture', minWidth: 100 },
    {
      id: 'type',
      label: 'Type',
      minWidth: 170,
      align: 'right',
    //   format: (value) => value.toLocaleString(),
    },
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
      align: 'right',
    //   format: (value) => value.toLocaleString(),
    },
    {
      id: 'price',
      label: 'Price',
      minWidth: 170,
      align: 'right',
    //   format: (value) => value.toFixed(2),
    },
  ];
function createData(id, name, img, type,description, price) {
//   const density = population / size;
  return { id, name, img, type,description, price };
}

const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
];
// console.log(rows)
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [isReload, setIsReload] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
let i=true;
  const [state, setState] = useState({
    columns: [
      { title: 'ID', field: 'id',editable: 'never' },
      { title: 'Name', field: 'name' },
      { title: 'Picture', field: 'img',editable: 'never',
        render: (rowData) => (<img src={rowData.img} style={{width: 50,height: 50, borderRadius: '50%'}}/>)
    },
      {
        title: 'Type',
        field: 'type',
        // type: 'text' ,
        lookup: { 'food': 'food', 'care': 'care','oder': 'oder' },
      },
      {
        title: 'description',
        field: 'description',
        // type: 'text' ,
      },
      { title: 'Price', field: 'price',type: 'numeric'},
    ],
    data: [
    //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    //   {
    //     name: 'Zerya Betül',
    //     surname: 'Baran',
    //     birthYear: 2017,
    //     birthCity: 34,
    //   },
    ],
  });

  useEffect(() => {
    let API_URL = "http://"+API_HOST+":1234/product";
    axios.get(API_URL)
        .then(res => {
            setProduct(res.data.product);
            // setLoad(true);
        })
        // .catch(err => {
        //     setError(err.message);
        //     setLoad(true)
        // })
    }, [state,setState,isReload]);
  const handleChangePage = (event, newPage) => {
      console.log(event)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    console.log(event.target)
    setPage(0);
  };
  console.log(product);
  let rowaaaa = product.map(product=>{
    return createData(product.id, product.name, product.img,product.type,product.description,product.price);
  })

  let rowbbb= [...rowaaaa];
  console.log(rowaaaa);
  return (
      
      <div className='tableProductMain'>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
          <div className='tableOne'>
            <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowbbb.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                    return (
                        // <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}
                        
                            onClick={() => {
                                console.log(row);
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    // row.img='<div>ooooo</div>'
                                    if(data.length>0){
                                        data[0]=row;
                                    }else{
                                        data.push(row);

                                    }
                                    
                                    // return { ...prevState, data };
                                  return [...prevState, data ];

                                  });
                            }}
                        >

                        {columns.map((column) => {
                            if(column.id==="img"){
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                        <img 
                                            className='imgProduct'
                                            src = {row[column.id]}
                                            
                                        />
                                    </TableCell>
                                );
                            }else{
                                const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {value}
                                        </TableCell>
                                    );
                            }
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rowbbb.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            </Paper>
        </div>
        <div>
        <MaterialTable
      title="Edit"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
              //  return { ...prevState, data };
              return [...prevState, data ];
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                console.log(newData);
                let API_URL = "http://"+API_HOST+":1234/product";
                var product = {
                    id: newData.id,
                    name: newData.name,
                    type: newData.type,
                    description: newData.description,
                    price: newData.price,
                    total: 0
                    // number: event.target.number,
                    // img: this.state.imagePreviewUrl
                }
                console.log(product)
                axios.post('http://'+API_HOST+':1234/product/update',product)
                    .then(res=>{
                        console.log(res);
                    })
                    .catch(err=>{
                        console.log(err);
                    })

                setIsReload(!isReload);
                setState((prevState) => {
                    
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  i = !i;
                  //return { ...prevState, data };
                  return [...prevState, data ];
                });
              }
            }, 600);
            // window.location.reload();

          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              let API_URL = "http://"+API_HOST+":1234/product";
              var product = {
                  id: oldData.id,
                 
                  // number: event.target.number,
                  // img: this.state.imagePreviewUrl
              }
              console.log(product)
              axios.post('http://'+API_HOST+':1234/product/delete',product)
                  .then(res=>{
                      console.log(res);
                  })
                  .catch(err=>{
                      console.log(err);
                  })

              setIsReload(!isReload);


              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                // return { ...prevState, data };
                return [...prevState, data ];
              });
            }, 600);
          }),
      }}
    />
        </div>
    </div>
  );
}
