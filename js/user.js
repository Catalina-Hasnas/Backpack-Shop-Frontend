function getUserUid() {
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    db.collection('users').doc(uid).set({
        orders: []
    });
}       