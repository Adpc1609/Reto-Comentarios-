firebase.initializeApp({
    apiKey:  "AIzaSyBFg2L002eMUCHYDnZiCrpl3pcQTjAJT20",
    authDomain: "reto-comentario.firebaseapp.com",
    projectId: "reto-comentario"
  });
  
/*-------Initialize Cloud Firestore through Firebase-------*/
let db = firebase.firestore();

function comentar(){
let comment = document.getElementById('comment').value;
  db.collection("users").add({
   mensaje: comment
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    let comment = document.getElementById('comment').value= "";

})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}

/*-------------------------leer Documentos---------------*/ 

let cardTexto = document.getElementById("card");
db.collection("users").onSnapshot((querySnapshot) => {
 cardTexto.innerHTML = "";
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().mensaje}`);
        cardTexto.innerHTML += `
        <div class="card">
        <div class="card-body">
        ${doc.data().mensaje}
        </div>
        </div>
        <button class="btn btn-warning "onclick="eliminar('${doc.id}')">eliminar</button>
        `
    });
});

/*-----------------------------Eliminar----------------*/
function eliminar(id){
db.collection("users").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
}

