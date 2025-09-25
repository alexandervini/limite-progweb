const formularioLimite = document.getElementById('formularioLimite');
const campoLimite = document.getElementById('campoLimite');
const campoGasto = document.getElementById('campoGasto');
const btnBack = document.getElementById('btnBack');

btnBack.addEventListener("click", (evento) => {
    window.open('paginaLogin.html', '_self');
})


formularioLimite.addEventListener('submit', (evento) => {
    evento.preventDefault();
    inserido();
    alert(`O limite é ${valorLimite}`);
})

function inserido()     
{
    valorLimite = campoLimite.value;
    valor
    return valorLimite;
}
