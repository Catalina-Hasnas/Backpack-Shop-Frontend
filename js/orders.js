var orderProducts = [];
var existingInfo =  localStorage.getItem('orderProducts');
var newArray = JSON.parse(existingInfo);

if (existingInfo) {
    orderProducts = newArray;
};

function addProduct(productId, qty, price){
    const product = {
        "productId": productId,
        "quantity" : qty,
        "price" : price
    };

    orderProducts.push(product); 
    localStorage.setItem('orderProducts', JSON.stringify(orderProducts));

    setProducts();
};      

function updateProduct(currentProductId, currentQuantity, currentPrice) {
    if (orderProducts.length == 1) {
        orderProducts[0].quantity = currentQuantity;
        orderProducts[0].price = currentPrice;
    } else {
        var index = orderProducts.findIndex(obj => obj.productId == currentProductId);
        orderProducts[index].quantity = currentQuantity;
        orderProducts[index].price = currentPrice;
    }
    
    localStorage.setItem('orderProducts', JSON.stringify(orderProducts));
    
    setProducts();
};

async function removeProduct(deletedProductId){
    
    if (orderProducts.length == 1) {
        orderProducts.splice(0, 1);
    } else {
        var index = orderProducts.findIndex(obj => obj.productId == deletedProductId);
        orderProducts.splice(index, 1);
    }
    
    localStorage.setItem('orderProducts', JSON.stringify(orderProducts));

    await setProducts();

    window.location.reload();
}; 

async function setProducts() {
    console.log(orderProducts);
    var uid = await getUserUid();
    return db.collection('users').doc(uid).set({
        orderProducts
    });
}; 

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