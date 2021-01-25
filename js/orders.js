var orderProducts = [];
var existingInfo =  localStorage.getItem('orderProducts');
var newArray = JSON.parse(existingInfo);

if (existingInfo) {
    orderProducts = newArray;
};

function addProduct(productId, qty, price, name){
    const product = {
        "productId": productId,
        "quantity" : qty,
        "price" : price,
        "name": name
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