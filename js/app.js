  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD04JnrKHNhf__-wUZq2tV8rzj-W0TNX8E",
    authDomain: "fir-intro-c40e9.firebaseapp.com",
    databaseURL: "https://fir-intro-c40e9.firebaseio.com",
    projectId: "fir-intro-c40e9",
    storageBucket: "fir-intro-c40e9.appspot.com",
    messagingSenderId: "155180589066"
  };
  firebase.initializeApp(config);

  var objDb = {
    usuarios:[]
  };

  var formulario = document.getElementById("crear-usuario");
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    var nombre = document.getElementById('name').value;
    var correo = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    objDb.usuarios.push({
      name: nombre,
      email: correo,
      password: password
    });
    guardarDatos(objDb);
  });

  // Get a reference to the database service
  var database = firebase.database();

  function guardarDatos(usuarios) {
    //Usar metodo .set para guardar en la base de datos
    //.ref() --> lo que queremos guardar, el tipo de dato es un string
    database.ref("/").set(usuarios);
  };


  //funcion para mostrar usuarios en el HTML
  function mostrarUsuarios(usuarios) {
    //Se agrega esta parte para limpiar el HTML cuando se agrega un nuevo usuario
    document.getElementById('usuarios').innerHTML = "";
    usuarios.forEach(function (usuario) {
      var div = document.createElement("div");
      var h3 = document.createElement("h3");
      var p = document.createElement("p");

      h3.textContent = usuario.name;
      p.innerHTML = "<strong>Email:</strong> " + usuario.email;

      div.appendChild(h3);
      div.appendChild(p);

      document.getElementById('usuarios').appendChild(div);
    });
  };



//Para leer datos es usar .on('value')
// snapshot --> la captura de los ultimos datos obtenidos
  database.ref('/usuarios').on('value', function (snapshot) {
    var usuarios = snapshot.val();
    objDb.usuarios = usuarios;
    // console.log(usuario);
    mostrarUsuarios(usuarios);
  })
