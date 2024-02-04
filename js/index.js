document.addEventListener('DOMContentLoaded', function () {
});

// Esta funcion permite buscar pokemones
function buscarPokemon() {
    const pokemonInput = document.getElementById('pokemonInput');
    const infoPokemonElemento = document.getElementById('infoPokemon');

    const nombrePokemon = pokemonInput.value.trim().toLowerCase();

    if (nombrePokemon !== '') {
        fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon no encontrado');
                }
                return response.json();
            })
            .then(data => {
                mostrarInfoPokemon(data);
            })
            .catch(error => {
                console.error(error);
                infoPokemonElemento.innerHTML = '<p class="text-danger">Pokémon no encontrado. Intente nuevamente.</p>';
            });
    } else {
        infoPokemonElemento.innerHTML = '<p class="text-danger">Por favor, ingrese un nombre de Pokémon.</p>';
    }
}

// Esta funcion muestra la informacion de los pokemones
function mostrarInfoPokemon(data) {
    const infoPokemonElemento = document.getElementById('infoPokemon');
    infoPokemonElemento.innerHTML = '';

    const nombrePokemon = data.name;
    const imagenPokemon = data.sprites.front_default;
    const tiposPokemon = data.types.map(type => type.type.name).join(', ');
    const habilidadesPokemon = data.abilities.map(ability => ability.ability.name).join(', ');

    const imagen = document.createElement('img');
    imagen.src = imagenPokemon;
    imagen.alt = nombrePokemon;

    const nombre = document.createElement('h2');
    nombre.textContent = nombrePokemon;

    const tipos = document.createElement('p');
    tipos.textContent = `Tipos: ${tiposPokemon}`;

    const habilidades = document.createElement('p');
    habilidades.textContent = `Habilidades: ${habilidadesPokemon}`;

    infoPokemonElemento.appendChild(imagen);
    infoPokemonElemento.appendChild(nombre);
    infoPokemonElemento.appendChild(tipos);
    infoPokemonElemento.appendChild(habilidades);
}