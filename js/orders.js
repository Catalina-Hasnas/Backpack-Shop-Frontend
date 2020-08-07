var order = {
    currentOrderId: "02",
    products: [],

    getOrderId: function(){
        $.ajax(
            {
                type:'GET',
                async: false,
                url:'http://localhost:8000/orders/02',
                success: function(data){
                    saveProducts(data.products);
                }
            }
        );

        return "02";
    },
    
    addProduct: function(productId, qty){
        const product = {
            "orderId": this.currentOrderId,
            "productId": productId,
            "quantity" : qty
        };
        
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/orders/addProduct",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(product),
            success: function(data){
                console.log(data);
                saveProducts(data.products);
            },
            failure: function(errMsg) {
                console.log(errMsg);
            }
        });      
    },

    removeProduct: function(productId){
        const product = {
            "orderId": this.currentOrderId,
            "productId": productId,
        };
        
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/orders/removeProduct",
            data: JSON.stringify(product),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                console.log(data);
                saveProducts(data.products);
                $("#cartList").html("");
                console.log(data.products);
                data.products.forEach(function(product) {
                    renderCartProduct(product.productId, product.quantity);            
                });
            },
            failure: function(errMsg) {
                console.log(errMsg);
            }
        });  
    }    
};

function saveProducts(p) {
    order.products = p;
    changeHeader();
};