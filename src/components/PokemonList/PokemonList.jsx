import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon';
    async function downloadPokemons(){
        const response = await axios.get(POKEDEX_URL); //this will downloads list of 20 pokemons

        const pokemonResults = response.data.results; //we get the array of pokemons from result

        //iterating over the array of pokemons, and using their url, to create an array of promises
        // that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        // passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
        console.log(pokemonData);

        // now iterate on the data of each pokemon, and extract id, name, image, types
        const pokeListResult = (pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                    id: pokemon.id, 
                    name: pokemon.name, 
                    image: pokemon.sprites.other.dream_world.front_default, 
                    types: pokemon.types 
                }
        }))
        console.log(pokeListResult);
        setPokemonList(pokeListResult);
        setIsLoading(false);
    }

    // used to connect to outerworld(data downloading) ==> it accepts callback "()" and dependency array/list "[]"
    // if we do not pass [] in this then it will re-render whenever called 
    // whatever we pass to its callback/"()=>{}" of useEffect that will execute when functional component render's 
    useEffect(() => {
        downloadPokemons();
    }, []);


    return(
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
            {(isLoading) ? "Loading....." : 
                pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
            }
        </div>
    );
}

export default PokemonList;