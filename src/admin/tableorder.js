import React,{ useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
// import './cssjs/table.css'


const API_HOST = process.env.REACT_APP_API_URL
export default function MaterialTableDemo() {
  const [state, setState] = useState({
    columns: [
      { title: 'ID', field: 'id' ,editable: 'never'},

      { title: 'email', field: 'email' ,editable: 'never'},
      { title: 'Adress', field: 'address' ,editable: 'never'},
      {
        title: 'Price',
        field: 'price',editable: 'never'
      }, {
        title: 'product',
        field: 'idproduct',editable: 'never'
        

      },{
        title: 'Status',
        field: 'status',
        type: 'numeric',
        lookup: { 0:"chờ xác nhận",1:"đã xác nhận",2:"đang giao",4:"đã giao" }
      }
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
  const [stateOrder, setStateOrder]= useState([])
  useEffect(() => {
    let API_URL = "http://"+API_HOST+":1234/order";
    axios.get(API_URL)
        .then(res => {
            // setState(res.data.order);
            let ab = [...res.data.order.reverse()];
            for(var a in ab){
                // ab[a].idproduct=  JSON.parse(ab[a].idproduct).toString().replace(/,/g," -- ")
                
            }
            // setStateOrder(res.data.order.reverse())
            setStateOrder([...ab])
            // console.log(typeof res.data.order[0].idproduct)
            // console.log(JSON.parse(res.data.order[0].idproduct).toString().replace(/,/g," "))

            // setState((prevState) => {
            // const data = [...prevState.data];
            //   return [...res.data.order, data ];

            //   });
            // setLoad(true);
        })
        // .catch(err => {
        //     setError(err.message);
        //     setLoad(true)
        // })
    }, []);
  return (
      <div className="mainOrderAdmin">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>

     <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={stateOrder}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return [ ...prevState, data ];
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                console.log(newData);
                let API_URL = "http://"+API_HOST+":1234/order/update";
                var order = {
                    id: newData.id,
                    email: newData.email,
                    address: newData.address,
                    idproduct: newData.idproduct,
                    price: newData.price,
                    phone: newData.phone,
                    status: parseInt(newData.status)
                    // number: event.target.number,
                    // img: this.state.imagePreviewUrl
                }
                console.log(order)
                axios.post('http://'+API_HOST+':1234/order/update',order)
                    .then(res=>{
                        console.log(res);
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                    setStateOrder((prevState) => {
                        console.log("pre",prevState);
                        console.log(oldData)
                    const data = [...prevState];
                    data[data.indexOf(oldData)] = newData;
                    console.log(data)
                    //return { ...prevState, data };
                    return [...data ];
                    });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return [ ...prevState, data ];
              });
            }, 600);
          }),
      }}
    />
    </div>
  );
}