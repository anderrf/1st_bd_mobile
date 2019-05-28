// This is a JavaScript file

$(document).on("click", "#cadastrar", function(){
  var parametros = {
    "nome": $("#nome").val(),
    "email": $("#email").val()
  };

  $.ajax({
    type: "post", //Como enviar
    url: "https://first-bd-mobile-2-andersonrf.c9users.io/webservice/registra.php", //Para onde enviar
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

$(document).on("click", "#btnlista", function(){
  $(location).attr("href", "lista.html");
});

function listarPessoas(){
  $.ajax({
    type: "post", //como enviar
    url: "https://first-bd-mobile-2-andersonrf.c9users.io/webservice/lista.php", //para onde enviar
    dataType:"json",
    //se der certo
    success: function(data){
      var itemLista = "";
      $.each(data.pessoas, function(i, dados){
        itemLista += "<option value='"+dados.codigo+"'>"+dados.nome+"</option>";
      });
      $("#lista").html(itemLista);
    },
    //se der errado
    error: function(data){
      navigator.notification.alert(data);
    }
  });
}

$(document).on("change", "#lista", function(){
  var codigoEscolhido = $("option:selected", ("#lista")).val();
  $.ajax({
    type: "get", //como enviar
    url: "https://first-bd-mobile-2-andersonrf.c9users.io/webservice/lista-um.php", //para onde enviar
    data: "id="+codigoEscolhido,
    dataType:"json",
    //se der certo
    success: function(data){
      $("#codigoL").val(data.pessoas.codigo);
      $("#nomeL").val(data.pessoas.nome);
      $("#emailL").val(data.pessoas.email);
    },
    //se der errado
    error: function(data){
      navigator.notification.alert(data);
    }
  });
});