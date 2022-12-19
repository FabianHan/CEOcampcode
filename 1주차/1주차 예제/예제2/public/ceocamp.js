const firebaseConfig = {
  apiKey: "AIzaSyAJwJew17BOly2yE6TNzX54x1anFIkw0N4",
  authDomain: "hojong-cab2d.firebaseapp.com",
  databaseURL: "https://hojong-cab2d-default-rtdb.firebaseio.com",
  projectId: "hojong-cab2d",
  storageBucket: "hojong-cab2d.appspot.com",
  messagingSenderId: "803849919892",
  appId: "1:803849919892:web:741bde236fec40c4f8c381",
  measurementId: "G-KHMFDRL7X2"
};

firebase.initializeApp(firebaseConfig);
database = firebase.database();


function sendMsg(){
    let date = new Date();
    let msg = $("#message").val();
    database.ref("msgs/"+date.getTime()).set(msg);
    $("#message").val("");
}

function loadMsgs(){
    database.ref("msgs").on("value", callback);
    function callback(snapshot){
        $("#chatlist").html("");
        console.log(snapshot);
        snapshot.forEach(function(child){
             $("#chatlist").append("<div>"+child.val()+"</div>");
        });
        $("#chatlist").scrollTop(15000);
    }
}
