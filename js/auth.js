auth.onAuthStateChanged(user => {
    console.log(user);
});

const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;
        
        auth.createUserWithEmailAndPassword(email, password).then(credentials => {
            console.log(credentials.user);
            // window.location.replace("../index.html");
        });
    });
};

document.querySelectorAll('.logout').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        auth.signOut().then( () => {
            console.log("You're signed out!")
        })
    })
});

const signInForm = document.getElementById('signIn-form');
signInForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = signInForm['signIn-email'].value;
    const password = signInForm['signIn-password'].value;
    
    auth.signInWithEmailAndPassword(email, password).then(credentials => {
        console.log(credentials.user);
    });

});