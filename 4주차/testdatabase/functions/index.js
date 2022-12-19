const functions = require("firebase-functions");
let admin = require("firebase-admin");
const cors = require("cors")({origin:true});

let serviceAccount = require("./test-database93-firebase-adminsdk-oi2ek-be89e45a4e");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-database93-default-rtdb.firebaseio.com"
});

let db = admin.database();

exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{

    db.ref("msgs").on("value",(snapshot)=>{
      response.send(snapshot.val());
    });
  });
});

exports.CEOcampHan = functions.https.onRequest((request, response) => {
  let Jong = {
    name : "한호종",
    age : 30,
    height : 180
  }

  response.send(Jong);
});

exports.login = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{
    let id = request.body.id;
    let pwd = request.body.pwd;

    db.ref("members/"+id).on("value",(snapshot)=>{
      if(snapshot.val()){
        if(snapshot.val() == pwd){
          response.send({"result":"로그인 되었습니다."});
        }else {
          response.send({"result":"비밀번호가 일치하지 않습니다."});
        }
      }else {
        response.send({"result":"가입되지 않은 회원입니다."});
      }
    });
  });
});

exports.join = functions.https.onRequest((request, response) => {
  cors(request, response, ()=>{
    let id = request.body.id;
    let pwd = request.body.pwd;
    db.ref("members/"+id).set(pwd);
  });
});
