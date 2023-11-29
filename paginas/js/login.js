function Login() {
    var done=0;
    var usuario = document.getElementsByName('usuario')[0].value;
    usuario=usuario.toLowerCase();
    var senha= document.getElementsByName('senha')[0].value;
    senha=senha.toLowerCase();
    if ((usuario=="matheus" && senha=="matheus") || (usuario=="wilson" && senha=="wilson")) {
      window.location="../pages/menu.html";
      done=1;
    }
    if (done==0) { alert("Dados incorretos, tente novamente"); }
  }
  export const usuario =document.getElementsByName('usuario')[0].value; ; 