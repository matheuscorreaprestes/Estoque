function Admin() {
    var done=0;
    window.usuario = document.getElementsByName('usuario')[0].value;
    window.usuario=window.usuario.toLowerCase();
    var senha= document.getElementsByName('senha')[0].value;
    senha=senha.toLowerCase();
    if (window.usuario=="wilson" && senha=="wilson") {
      window.location="../pages/menu.html";
      done=1;
    }
    if (done==0) { alert("Dados incorretos, tente novamente"); }
  }