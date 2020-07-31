function getProduct(id) {
    $.ajax(
        {
           type:'GET',
           url:'http://localhost:8000/products/' + id,
           success: function(data){
            //  getElementById("product-title").innerHTML = data.title;
           }
        }
     );
}

function getProducts() {
    $.ajax(
            {
                type:'GET',
                url:'http://localhost:8000/products/',
                success: function(data){
                    renderProducts(data);
                }
            }
        );
}


function renderProducts(products) {
    console.log(products);

    $("#products").html("");
    products.forEach(product => {
        var card = $("<div></div>").addClass("col-md-3 col-sm-6");
        var figure = $("<figure></figure>").addClass("card card-product");
        var preimg = $("<div></div>").addClass("img-wrap");
        var img = $("<img/>").attr('src', "" + product.img + ""); 
        var figcaption = $("<figcaption></figcaption>").addClass("info-wrap");
        var a = $("<a></a>").addClass("title").attr("href","#");
        var preprice = $("<div></div>").addClass("price-wrap");
        var price = $("<span></span>").addClass("price-new");
        price.append("$ "+ product.price);
        a.append(product.name);
        preprice.append(price);
        figcaption.append(a, preprice);
        preimg.append(img);
        figure.append(preimg,figcaption);
        card.append(figure);
        $("#products").append(card);
        
    });
}

// ("Product name = " + product.name +
//         " Product category" + product.category)

getProducts();
// getProduct(3);

/*<div class="col-md-3 col-sm-6">
    <figure class="card card-product">
        <div class="img-wrap"> <img src="../images/items/etnotransform/2.jpg"></div>
        <figcaption class="info-wrap">
            <a href="#" class="title">Etno transformer backpack</a>
            <div class="price-wrap">
                <span class="price-new">$180</span>
            </div> <!-- price-wrap.// -->
        </figcaption>
    </figure> <!-- card // -->
</div> <!-- col // --> */

