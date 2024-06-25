import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(){
    // const [pokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');
    // Advanced Hook===>
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon', 
        nextUrl: '',
        prevUrl: ''
    })

    async function downloadPokemons(){
       
        //iterating over the array of pokemons, and using their url, to create an array of promises
        // that will download those 20 pokemons
        
             // setIsLoading(true);
            setPokemonListState({...pokemonListState, isLoading: true});

            const response = await axios.get(pokemonListState.pokedexUrl); //this will downloads list of 20 pokemons

            const pokemonResults = response.data.results; //we get the array of pokemons from result

            console.log(response.data.pokemon);

            // setNextUrl(response.data.next);
            // setPrevUrl(response.data.previous);
            setPokemonListState((state)=>({ 
                ...state, 
                nextUrl: response.data.next, 
                prevUrl: response.data.previous
            }));


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
            // setPokemonList(pokeListResult);
            // setIsLoading(false);
            setPokemonListState((state)=>({
                ...state, 
                pokemonList: pokeListResult, 
                isLoading: false
            }));
    
    }

    // used to connect to outerworld(data downloading) ==> it accepts callback "()" and dependency array/list "[]"
    // if we do not pass [] in this then it will re-render whenever called 
    // whatever we pass to its callback/"()=>{}" of useEffect that will execute when functional component render's 
    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]);


    return [pokemonListState, setPokemonListState]
}

export default usePokemonList;