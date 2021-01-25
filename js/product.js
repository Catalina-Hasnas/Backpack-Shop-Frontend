// PRODUCT PAGE

function getProduct(id) {
    db.collection('products').where('id', '==', id ).get().then((snapshot) => {
        snapshot.forEach(doc => {
            const product = doc.data();
            // //PRODUCT PAGE
                $("#title").html(product.name);
                $("#price").html("$"+ (product.price - product.discount)); 
                $("#description").html(product.description);

                var i = 0;

                product.img.forEach(function(img) {
                    var li = $("<li></li>").attr("data-target","#carousel1_indicator").attr("data-slide-to", i.toString());
                    i++;
                    $(".carousel-indicators").append(li);
                    var image = $("<img/>").attr('src', "" + img + "").addClass("d-block w-100");
                    var preimage = $("<div></div>").addClass("carousel-item");
                    preimage.append(image);
                    $(".carousel-inner").append(preimage);

                });

            // MODAL - PRODUCT PAGE

                var finalprice = product.price - product.discount;

                $("li").first().addClass("active");
                $(".carousel-item").first().addClass("active");

                $("#thumbnail").addClass("col-lg-6").attr('src', "" + product.img[0] + "");
                $("#material").html("material: " + product.material);
                $("#color").html("color: " + product.color);
                $("#modal-price").append("price: $" + finalprice);
                $("#addToBasket").data("product-id", id);
                $("#addToBasket").data("product-price", (finalprice));
        });
    })
}

// CATEGORY/ TYPE FILTERING

function getProducts(category="", type="") {

    if (category=="" && type=="") {
        db.collection('products').orderBy('id').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderProducts(doc.data())
            })
        });
    }
    if (category !=="" && type=="") {
        db.collection('products').where('category', '==', category).orderBy('id').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderProducts(doc.data())
            })
        });
    }
    if (category !=="" && type !=="") {
        db.collection('products').where('category', '==', category).where('type', '==', type).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderProducts(doc.data())
            })
        });
    }
}

//RENDERING PRODUCTS LIST

function renderProducts(product) {
    var card = $("<div></div>").addClass("col-md-3 col-sm-6");
    var figure = $("<figure></figure>").addClass("card card-product");
    var preimg = $("<div></div>").addClass("img-wrap");
    var img = $("<img/>").attr('src', "" + product.img[0] + ""); 
    var figcaption = $("<figcaption></figcaption>").addClass("info-wrap");
    var a = $("<a></a>").addClass("title").attr("href","/categories/productpage.html?id=" + product.id);
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
};

//CART PRODUCTS

function renderCartProduct(id, quantity) {

    if (id, quantity) {
        db.collection('products').where('id', '==', id ).get().then((snapshot) => {
            snapshot.forEach(doc => {
                const product = doc.data();
                
                const fixedPrice = product.price - product.discount;
                var html = `<div class="row mb-4">
                                <div class="col-md-5 col-lg-3 col-xl-3">
                                    <a href="/categories/productpage.html?id=${product.id}">
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
                                                <p class="mb-3 text-muted text-uppercase small">Color: ${product.color}</p>
                                                <p class=" font-weight-bold text-muted text-uppercase small">Price: $${fixedPrice}</p>
                                            </div>
                                            <div>
                                                <div class="pt-3 mb-0 w-100">
                                                    <button
                                                        class="btn-edit btn-primary minus" data-button-id="${product.id}"> - </button>
                                                    <input class="quantity" min="1" name="quantity" value="${quantity}" type="number" data-input-id="${product.id}" data-product-price="${fixedPrice}">
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
                $("#cartList").prepend(tempDom);
            });
        });

        changeHeader();

    } else {
        var authChecker = $("#authChecker").addClass("d-flex align-items-start justify-content-center");
        var message = $("<h2></h2>").addClass("py-5").html('Please sign in to view items in your cart.');
        
        authChecker.html(message);
    }
};   

function changeHeader(){
    var itemsCount = 0;

    orderProducts.forEach(product => {
        itemsCount += parseInt(product.quantity);
    });

    function pluralize(itemsCount, word) {
        return itemsCount + " " + word + (itemsCount === 1 ? "" : "s"); 
    }

    document.getElementById("span").innerHTML = pluralize(itemsCount, "item"); 
};

function registerCartClickEvents(){
    $('#cartList').on('click', '.plus', function() {
        var id = $(this).data("button-id");
        var input = document.querySelector(`.quantity[data-input-id="${id}"]`);
        input.stepUp(1);
        var productPrice = input.getAttribute("data-product-price");
        var totalPrice = productPrice * input.value;
        updateProduct(id, input.value, totalPrice);
        changeHeader();
    });
    
    $('#cartList').on('click', '.minus', function() {
        var id = $(this).data("button-id");
        var input = document.querySelector(`.quantity[data-input-id="${id}"]`);
        input.stepDown(1);
        var productPrice = input.getAttribute("data-product-price");
        var totalPrice = productPrice * input.value;
        updateProduct(id, input.value, totalPrice);
        changeHeader();
    });

    $('#cartList').on('click', '.deleteBtn', async function() {
        var id = $(this).data("button-id");
        removeProduct(id);
        changeHeader();
    });
};