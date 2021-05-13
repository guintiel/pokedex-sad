const numPokemon = 151;

const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const fetchPokemon = async () => {
    const pokemonURL = `https://pokeapi.co/api/v2/pokemon?limit=${numPokemon}`;
    const res = await fetch(pokemonURL);
    const data = await res.json();
    const pokesilinks = data.results.map((result, index) => ({
        ...result, //result és un objecte amb name i url com a atributs
        id: index + 1
    }))

    for (let j = 0; j < numPokemon; j++) {
        const pokemon = await obtainPokemon(pokesilinks[j]);
        displayPokemon(pokemon);
    }
};

//A partir d'1 objecte pokemon, es realitza el codi HTML amb les classes CSS adients per a visualitzar-lo
const displayPokemon = (pokemon) => {
    const li = document.createElement('LI');
    li.classList.add('card');
    const img = document.createElement('IMG');
    img.classList.add('card-image');
    img.setAttribute('src', `${pokemon.image}`);
    const h2 = document.createElement('H2');
    h2.classList.add('card-title');
    h2.textContent = `${pokemon.id}. ${pokemon.name}`;
    const p = document.createElement('P');

    p.textContent = 'Type:';
    pokemon.types.forEach((type) => {
        const span = document.createElement('SPAN');
        span.textContent = type.toUpperCase();
        span.classList.add(type);
        span.classList.add('typebox');
        p.appendChild(span);
    });

    li.appendChild(img);
    li.appendChild(h2);
    li.appendChild(p);
    const pokedex = document.getElementById('pokedex');
    pokedex.appendChild(li);
}

//A partir d'1 objecte pokeilink (name, url i id), s'obtenen les dades del pokemon
const obtainPokemon = async (pokeilink) => {
    const url = pokeilink.url;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.types.map(type => type.type.name));
    return {
        name: pokeilink.name,
        id: pokeilink.id,
        types: data.types.map(type => type.type.name),
        image: data.sprites.front_default
    }
}

fetchPokemon();