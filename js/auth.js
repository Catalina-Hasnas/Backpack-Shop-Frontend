auth.onAuthStateChanged(user => {
    if (user) {
        setOrderButton(user);
        setLoginButton(user);
    } else {
        setOrderButton();
        setLoginButton();
    }
});

getUserUid = async () => {
    var uid = await firebase.auth().currentUser.uid;
    return uid;
};


setOrderButton = user => {
    let startOrder = document.getElementById('startOrder');

    if (startOrder) {
        let orderButton;
        let html = '';

        if (user) {
            orderButton = `<a onclick="getOrderData()" id="addToBasket" href="#" class="btn  btn-outline-primary" data-toggle="modal"
            data-target="#exampleModalCenter"> Start Order </a>`;
            html += orderButton;
        } else {
            orderButton = `<a href="../pages/login.html" class="btn  btn-outline-primary"> Please sign in to order </a>`;
            html += orderButton;
        }
        startOrder.insertAdjacentHTML('beforeend', html);
    }
};

const login = document.querySelectorAll('.login');
const logout = document.querySelectorAll('.logout');

setLoginButton = user => {
    if (user) {
        logout.forEach(item => item.style.display = 'block');
        login.forEach(item => item.style.display = 'none');
    } else {
        logout.forEach(item => item.style.display = 'none');
        login.forEach(item => item.style.display = 'block');
    }
};

logout.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        auth.signOut().then( () => {
            console.log("You're signed out!")
        })
    })
});

document.querySelectorAll('.login-form').forEach(item => {
    item.addEventListener('click', async event => {
        event.preventDefault();
        const email = item['signIn-email'].value;
        const password = item['signIn-password'].value;
        await auth.signInWithEmailAndPassword(email, password);
        if (window.location.pathname == "/pages/login.html") {
        window.location.replace("../index.html");
        } else {
            window.location.reload(); 
        }
        
    });
});


