var orderProducts = [];
var existingInfo =  localStorage.getItem('orderProducts');
var newArray = JSON.parse(existingInfo);

if (existingInfo) {
    orderProducts = newArray;
}

function addProduct(productId, qty, price){
    const product = {
        "productId": productId,
        "quantity" : qty,
        "price" : price
    };

    orderProducts.push(product); 
    getUserUid(orderProducts);
    localStorage.setItem('orderProducts', JSON.stringify(orderProducts));
    console.log(localStorage);
};

function getUserUid(orderProducts) {
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    db.collection('users').doc(uid).set({
        orderProducts
    });
};       

//     updateProduct: function() {

//     },

//     removeProduct: function(productId){
//         const product = {
//             "orderId": this.currentOrderId,
//             "productId": productId,
//         };
    
//         $.ajax({
//             type: "POST",
//             url: "http://localhost:8000/orders/removeProduct",
//             data: JSON.stringify(product),
//             contentType: "application/json; charset=utf-8",
//             dataType: "json",
//             success: function(data){
//                 saveProducts(data.products);
//                 $("#cartList").html("");
//                 data.products.forEach(function(product) {
//                     renderCartProduct(product.productId, product.quantity);            
//                 });
//             },
//             failure: function(errMsg) {
//                 console.log(errMsg);
//             }
//         });  
//     }    
// };

// function changeTotal() {

//     $.ajax({
//         type: "GET",
//         url: "http://localhost:8000/orders/summary/" + order.currentOrderId,
//         success: function(data){
//             $("#preaside").html("");
//             data.products.forEach(product => {
//                 var productName = $("<span></span>");
//                 var productPrice = $("<span><span>");
//                 var aside = $("<div></div>").addClass("pt-2 d-flex flex-row justify-content-between");

//                 productName.append(product.name);
//                 productPrice.append(product.price + " x " + product.quantity);
//                 aside.append(productName, productPrice);
            
//                 $("#preaside").prepend(aside);
//             });

//         $("#total-price").html(data.productsTotal);
        
//         },
//         failure: function(errMsg) {
//             console.log(errMsg);
//         }
//     });

//     // var total = 0;
//     // order.products.forEach(product => {
//     //     total += parseInt(product.price) * parseInt(product.quantity);
//     //     // console.log(product);
//     // });
//     // $("#totalPrice").html("<strong>$" + total + "</strong>");
// }