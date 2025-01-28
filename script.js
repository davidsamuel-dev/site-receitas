const input = document.querySelector('.input_busca'); // Correção: selecionar o input diretamente
const formulario = document.querySelector('.formulario_busca');
const receita_lista = document.querySelector('.receitas_lista'); // Correção no seletor

formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    const inputValue = input.value; // Obter valor do input
    if (inputValue.trim() === '') {
        alert('Digite um ingrediente!');
        return;
    }
    ProcurarReceitas(inputValue);
});

async function ProcurarReceitas(ingrediente) {
    try {
        const resposta = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
        const data = await resposta.json();

        if (!data.meals) {
            receita_lista.innerHTML = `<p>Nenhuma receita encontrada para "${ingrediente}".</p>`;
            return;
        }

        MostrarReceitas(data.meals);
    } catch (error) {
        receita_lista.innerHTML = '<p>Erro ao buscar receitas. Tente novamente mais tarde.</p>';
    }
}

function MostrarReceitas(receitas) {
    receita_lista.innerHTML = receitas.map(
        (item) => `
        <div class="card_receita">
            <img src="${item.strMealThumb}" alt="receita-foto">
            <h3>${item.strMeal}</h3>
        </div>
        `
    ).join('');
}
