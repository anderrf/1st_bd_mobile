// This is a JavaScript file

$(document).on("click", "#cadastrar", function(){
  var parametros = {
    "nome": $("#nome").val(),
    "email": $("#email").val()
  };

  $.ajax({
    type: "post", //Como enviar
    url: "https://bd-first-mobile-andersonrf.c9users.io/webservice/registra.php", //Para onde enviar
    data: parametros, //O que enviar
    //Se der certo
    success: function (data){
      navigator.notification.alert("Certo:"+data);
      $("#nome").val("");
      $("#email").val("");
    },
    //Se der errado
    error: function(data){
      navigator.notification.alert(data);
    }
  });

});

$(document).on("click", "#lista", function(){
  $(location).attr("href", "lista.html");
});