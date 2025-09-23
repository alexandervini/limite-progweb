const formularioEsqueceuSenha = document.getElementById('formularioEsqueceuSenha');
const campoEmail = document.getElementById('campoEmail');



formularioEsqueceuSenha.addEventListener('submit', (evento) => {
    evento.preventDefault();
    let validado = processoCadastro();

    if (validado) 
        {
            alert('Codigo enviado para o e-mail.');
            window.open('paginaLogin.html', '_self')
        }
})

function processoCadastro()
{
    let valido = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if ( !emailRegex.test(campoEmail.value.trim())) {
		teveErro('campoEmailErro', true);
		valido = false;
	}

	else {
		teveErro('campoEmailErro', false);
	}
    
        return valido;
}

 
function teveErro(errorId, show) 
{
    const errorElement = document.getElementById(errorId);
    errorElement.style.display=show ? 'block': 'none';
}
