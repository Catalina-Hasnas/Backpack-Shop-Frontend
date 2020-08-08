function getProduct(id) {
    $.ajax(
        {
           type:'GET',
           url:'http://localhost:8000/products/' + id,
           success: function(product){
                $("#title").html(product.name);
                $("#price").html("$"+ (product.price - product.discount)); 
                $("#description").html(product.description);

                var i = 0;
                console.log(product.img);

                product.img.forEach(function(img) {
                    var li = $("<li></li>").attr("data-target","#carousel1_indicator").attr("data-slide-to", i.toString());
                    i++;
                    $(".carousel-indicators").append(li);
                    var image = $("<img/>").attr('src', "" + img + "").addClass("d-block w-100");
                    var preimage = $("<div></div>").addClass("carousel-item");
                    preimage.append(image);
                    $(".carousel-inner").append(preimage);

                });

                $("li").first().addClass("active");
                $(".carousel-item").first().addClass("active");

                $("#addToBasket").data("product-id", "" + id)
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
        var img = $("<img/>").attr('src', "" + product.img[0] + ""); 
        var figcaption = $("<figcaption></figcaption>").addClass("info-wrap");
        var a = $("<a></a>").addClass("title").attr("href","productpage.html?id=" + product.id);
        var preprice = $("<div></div>").addClass("price-wrap");
        var price = $("<span></span>").addClass("price-new");
        var priceold = $("<span></span>").addClass("price-old");

        price.append("$"+ (product.price - product.discount));
        priceold.append("$"+ product.price);
        preprice.append(price, priceold);

        var realprice = product.price - product.discount;
        var oldprice = product.price;

        if (realprice == oldprice){
            priceold.remove();
        }
        a.append(product.name);
        figcaption.append(a, preprice);
        preimg.append(img);
        figure.append(preimg,figcaption);
        card.append(figure);
        $("#products").append(card);
        
    });
}

function renderCartProduct(id, quantity) {
    $.ajax(
        {
        type:'GET',
        url:'http://localhost:8000/products/' + id,
        success: function(product){
            console.log(product);
            var html = `<div class="row mb-4">
                            <div class="col-md-5 col-lg-3 col-xl-3">
                                <a href="productpage.html?id=${product.id}">
                                    <div class="mask">
                                        <img id="photo" class="img-fluid w-100"
                                            src="${product.img[0]}">
                                        <div class="mask rgba-black-slight"></div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-md-7 col-lg-9 col-xl-9 d-flex flex-column justify-content-between">
                                <div>
                                    <div class="d-flex justify-content-between flex-wrap">
                                        <div id="info">
                                            <h5 class= "pt-2 pb-2">${product.name}</h5>
                                            <p class="mb-3 text-muted text-uppercase small">Material: ${product.material}</p>
                                            <p class="mb-2 text-muted text-uppercase small">Color: ${product.color}</p>
                                        </div>
                                        <div>
                                            <div class="pt-3 mb-0 w-100">
                                                <button
                                                    class="btn-edit btn-primary minus" data-button-id="${product.id}"> - </button>
                                                <input class="quantity" min="0" name="quantity" value="${quantity}" type="number" data-input-id="${product.id}">
                                                <button
                                                    class="btn-edit btn-primary plus" data-button-id="${product.id}"> + </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="pt-3 d-flex justify-content-between">
                                        <div>
                                            <button 
                                                class="deleteBtn btn-edit btn-primary card-link-secondary small text-uppercase mr-3" data-button-id="${product.id}"><i
                                                    class="fas fa-trash-alt mr-1"></i> Remove item 
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>`;
            var tempDom = $($.parseHTML(html));
            $("#cartList").append(tempDom);
        }
    });

    var itemsCount = 0;
    order.products.forEach(product => {
        itemsCount += parseInt(product.quantity);
    });

    console.log(itemsCount);

    function pluralize(itemsCount, word) {
        
        if (itemsCount === 1) {
            return itemsCount + " " + word;
        } else {
            return itemsCount + " " + word + "s";
        }
    }

    document.getElementById("span").innerHTML = pluralize(itemsCount, "item"); 
}   

function changeHeader(){
    console.log("change header");
    var itemsCount = 0;

    order.products.forEach(product => {
        itemsCount += parseInt(product.quantity);
    });

    console.log(itemsCount);

    var pluralize = function(itemsCount, word) {
        
        if (itemsCount === 1) {
            return itemsCount + " " + word;
        } else {
            return itemsCount + " " + word + "s";
        }
    }

    document.getElementById("span").innerHTML = pluralize(itemsCount, "item"); 
}

function registerCartClickEvents(){
    $('#cartList').on('click', '.plus', function() {
        var id = $(this).data("button-id");
        var input = document.querySelector(`.quantity[data-input-id="${id}"]`);
        input.stepUp();
        order.addProduct(id, input.value);
    });
    
    
    $('#cartList').on('click', '.minus', function() {
        var id = $(this).data("button-id");
        var input = document.querySelector(`.quantity[data-input-id="${id}"]`);
        input.stepDown();
        order.addProduct(id, input.value);
    });
}

