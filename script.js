const numPokemon = 151;

const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const fetchPokemon = async () => {
    const pokemonURL = `https://pokeapi.co/api/v2/pokemon?limit=${numPokemon}`;
    const res = await fetch(pokemonURL);
    const data = await res.json();
    const pokeilink = data.results.map((result, index) => ({
        ...result, //result és un objecte amb name i url com a atributs
        id: index + 1
    }))

    for (let j = 0; j < numPokemon; j++) {
        const pokemon = await selectPokemon(pokeilink[j]);
        displayPokemon(j, pokemon);
        //selectPokemon(j)
    }
};

/*const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map(pokemon => `
    <li class = "card"  oneclick = "selectPokemon(${pokemon.id})">
        <img class="card-image" src="${pokemon.image}"/>
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
    </li>
    `).join('');
    pokedex.innerHTML = pokemonHTMLString;
}*/

const displayPokemon = (pos, pokemon) => {
    const li = document.createElement('LI');
    li.classList.add('card');
    const img = document.createElement('IMG');
    img.classList.add('card-image');
    img.setAttribute('src', `${pokemon.image}`);
    const h2 = document.createElement('H2');
    h2.classList.add('card-title');
    h2.textContent = `${pokemon.id}. ${pokemon.name}`;
    const p = document.createElement('P');

    if (pokemon.type.startsWith('grass') || pokemon.type.endsWith('grass')) {
        p.classList.add('grass');
    }
    p.textContent = `Type: ${pokemon.type}`;
    li.appendChild(img);
    li.appendChild(h2);
    li.appendChild(p);
    const pokedex = document.getElementById('pokedex');
    pokedex.appendChild(li);
}

const selectPokemon = async (pokeilink) => {
    const url = pokeilink.url;
    const res = await fetch(url);
    const data = await res.json();
    const type = data.types.map(type => type.type.name).join(", ")
    return {
        name: pokeilink.name,
        id: pokeilink.id,
        type: type,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeilink.id}.png`
    }
}

fetchPokemon();