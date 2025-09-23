const formularioLimite = document.getElementById('formularioLimite');
const campoLimite = document.getElementById('campoLimite');
const campoGasto = document.getElementById('campoGasto');

formularioLimite.addEventListener('submit', (evento) => {
    evento.preventDefault();
    inserido();
    alert(`O limite é ${valorLimite}`);
})

function inserido() 
{
    valorLimite = campoLimite.value;
    return valorLimite;
}