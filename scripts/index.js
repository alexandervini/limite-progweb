const btnLogin = document.getElementById('btnLogin');
const campoUsuario = document.getElementById('campoUsuario');
const campoSenha = document.getElementById('campoSenha');
const container = document.querySelector('.container');

container.addEventListener('submit', (evento) => {
    evento.preventDefault;
    processoLogin();
})

function processoLogin() 
{
    if (campoUsuario.value === '' && campoSenha.value === '') 
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
    else 
        {
            //window.location.replace('principal.html');
            window.open('principal.html', '_blank')
        }
}