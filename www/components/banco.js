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

$(document).on("click", "#btnDeletar", function(){
  $.ajax({
    type: "get", //como enviar
    url: "https://first-bd-mobile-2-andersonrf.c9users.io/webservice/deleta.php", //para onde enviar
    data: "id="+$("#codigoL").val(),
    dataType:"json",
    //se der certo
    success: function(data){
      navigator.notification.alert(data);
      location.reload();//recarrega a página
    },
    //se der errado
    error: function(data){
      navigator.notification.alert(data);
    }
  });
});

$(document).on("click", "#btnSalvar", function(){
  var parametros = {
    "codigo": $("#codigoL").val(),
    "nome": $("#nomeL").val(),
    "email": $("#emailL").val()
  };

  $.ajax({
    type: "post", //como enviar
    url: "https://first-bd-mobile-2-andersonrf.c9users.io/webservice/update.php", //para onde enviar
    data: parametros,
    dataType:"json",
    //se der certo
    success: function(data){
      navigator.notification.alert(data);
      location.reload();
    },
    //se der errado
    error: function(data){
      navigator.notification.alert(data);
    }
  });
});

function habilita(){
  $("#nomeL").prop("readonly", false);
  $("#emailL").prop("readonly", false);
}

function desabilita(){
  $("#nomeL").prop("readonly", true);
  $("#emailL").prop("readonly", true);
}

$(document).on("click", "#btnEditar", function(){
  habilita();
});

$(document).on("click", "#btnCancelar", function(){
  desabilita();
});