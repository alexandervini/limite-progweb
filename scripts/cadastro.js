const btnLogin = document.getElementById('btnLogin');
const campoUsuario = document.getElementById('campoUsuario');
const campoSenha = document.getElementById('campoSenha');
const campoSenhaConfirmar = document.getElementById('campoSenhaConfirmar');
const container = document.querySelector('.container');


container.addEventListener('submit', (evento) => {
    evento.preventDefault;
    processoLogin();
})

function processoLogin() 
{
    if (campoUsuario.value === '' && campoSenha.value === '' && campoSenhaConfirmar.value === '') 
        {
            alert('Preencha os campos vazios')
        }
    else if ( campoUsuario.value === '') 
        {
            alert('Insira o seu usuário')
        }
    else if ( campoSenha.value === '') 
        {
            alert('Insira a sua senha')
        }
    else if ( campoSenhaConfirmar.value === '') 
        {
            alert('Insira a sua senha novamente')
        }
    else 
        {
            //window.location.replace('principal.html');
            window.open('index.html', '_blank')
            alert('Cadastro realizado!')
        }
}