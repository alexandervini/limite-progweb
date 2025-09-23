const cadastroFormulario = document.getElementById('cadastroFormulario');
const campoUsuario = document.getElementById('campoUsuario');
const campoSenha = document.getElementById('campoSenha');
const campoSenhaConfirmar = document.getElementById('campoSenhaConfirmar');
const campoEmail = document.getElementById('campoEmail');


cadastroFormulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let validado = processoCadastro();

    if (validado) 
        {
            alert('Cadastro realizado com sucesso!');
            location.href = "paginaLogin.html";
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if ( !emailRegex.test(campoEmail.value.trim())) {
		teveErro('campoEmailErro', true);
		valido = false;
	}

	else {
		teveErro('campoEmailErro', false);
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

    if ( campoSenhaConfirmar.value !== campoSenha.value || campoSenhaConfirmar.value === '')
        {
            teveErro('campoSenhaConfirmarErro', true);
            valido = false;
        }
    else 
        {
            teveErro('campoSenhaConfirmarErro', false);
        }

        return valido;
}

 
function teveErro(erroId, show) 
{
    const errorElement = document.getElementById(erroId);
    errorElement.style.display=show ? 'block': 'none';
}
