//  var cartProduct=[
//      {
//         name: "dasdhaksd"
//      }
//  ];
var data = JSON.parse(localStorage.getItem("cartProduct"));
var cartProducts = data ? data : []
 const cartProduct = (state = cartProducts, action)=>{
     switch(action.type){
         case ('reloadToCart'):
            var data = JSON.parse(localStorage.getItem("cartProduct"));
             console.log('a')
             return [...data];
         default: return [...state];
     }
 }
 export default cartProduct;