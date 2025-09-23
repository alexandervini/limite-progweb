const formularioLogin = document.getElementById('formularioLogin');
const campoUsuario = document.getElementById('campoUsuario');
const campoSenha = document.getElementById('campoSenha');


formularioLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let validado = processoCadastro();

    if (validado) 
        {
            window.open('paginaPrincipal.html', '_self')
        }
})

function processoCadastro()
{
    let valido = true;
    
    if (campoUsuario.value.trim().length < 5) 
        {
            teveErro('campoUsuarioErro', true);
            valido = false;
        }
    else 
        {
            teveErro('campoUsuarioErro', false);
        }

    if (campoSenha.value.trim().length < 6) 
        {
            teveErro('campoSenhaErro', true);
            valido = false;
        }
    else 
        {
            teveErro('campoSenhaErro', false);
        }

        return valido;
}

 
function teveErro(errorId, show) 
{
    const errorElement = document.getElementById(errorId);
    errorElement.style.display=show ? 'block': 'none';
}
