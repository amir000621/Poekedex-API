import {useEffect, useState} from "react";
 import axios, { Axios } from 'axios'
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){

    const [pokemonListState,setPokemonListState] = useState({
        pokemonList:[],
        isLoading:true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl:'',
        prevUrl:''
    });//pehle ye sari chije mene alag alag usestate mein bana rakhi thi ab ye sab ek jgh hi rakh ke kr sakta hu

    async function downloadPokemons() {
        setPokemonListState((state)=>({...state,isLoading:true}));
        const response = await axios.get(pokemonListState.pokedexUrl); //THIS DOWNLOADS LIST OF 20 POKEMONS 
        const pokemonResults = response.data.results; //we get the array of pokemons from the results
        console.log("response ise" ,response.data,response.data.next);
        console.log(pokemonListState);
        //console.log(response.data);
        setPokemonListState((state) => ({
            ...state,
            nextUrl:response.data.next,
            prevUrl:response.data.previous
        }));
        //setPrevUrl(response.data.previous);

        //iterating over the array of pokemons,and using their url,to create an array of promises that will download those 20 pokemons
        const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
        //passing that promise array to axios.all 
        //console.log(pokemonResultsPromise);
        const pokemonData = await axios.all(pokemonResultsPromise)//array of 20 pokemons detailed data
        console.log(pokemonData);

        // now iterate on the data of each pokemon deatails ,and extraxt id,name,image,types 
        const pokeListResults = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return{
                id:pokemon.id,
                name: pokemon.name,
                image:(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default:pokemonData.sprites.other.home,
                types:pokemon.types
            }
        });

        //console.log(pokeListResults);
        setPokemonListState((state) =>({
            ...state,
            pokemonList:pokeListResults,
            isLoading:false
        }));
       
        
    }
    //callback and dependency array ye do chije useeffect expect krta hia like this-> useEffect(()=>{},[])
    //call back ke andar ham jo bhi logic likhenge vo execute hoga pehli baar to jab execute hoga jab component pehli baar render hoga,jab bhi component re-render hoga ye dobara execute hoga

    //ye khali array(its is called dependency array) call back ko detect krne ke liye 

    //ye khali array ka mean useffect kisi pr bhi dependent nhi hai agar mien ye array hata deta hu to ye useeffect baar baar call hota hai inspect mien dekho or agar miein empty rakhta hu to sirf ek baar call hota hai jab vo pehli baar render hua tha agar mein is empty array ke andar x ya y rakhdu to to sirf x ya f ke increment pr ye useeffect call hoga  


   

    useEffect(()=>{
        downloadPokemons();

    },[pokemonListState.pokedexUrl]);
    //use effect name ke hook hame help krta hai ki kisi component ke render pr tumhe kya krna hai uske dobara render pr  kya krna chahte hai ,,agar ye array na ho to first ke sath sare render pr exexute hoga empty hone pr sirf pehle render pr execute hoga and agar kuchh pass kro to first render ke sath sath us state ya event jo bhi is array ke andat de rahe hai uske render pr ye bhi execute hoga

   
    return(
       
        <div className="pokemon-list-wrapper">
        

        <div className="pokemon_wrapper">
        {(pokemonListState.isLoading) ? 'Loading....': 
            pokemonListState.pokemonList.map((p) => <Pokemon name = {p.name} image = {p.image} key = {p.id} id={p.id}/>)
            }
            

    </div>
    <div className="controls" >
    {/* undefined ki jagah null bhi daal sakte hai */}
        <button disabled = { pokemonListState.prevUrl === null} onClick={()=>setPokemonListState({...pokemonListState,pokedexUrl:pokemonListState.prevUrl})} className="controls" >Prev</button>
        <button disabled = { pokemonListState.nextUrl === undefined} onClick={()=>setPokemonListState({...pokemonListState,pokedexUrl:pokemonListState.nextUrl})}className="controls">Next</button>
    </div>
       </div>

    )

}


export default PokemonList;

//ye video dubara dekhni hai bhasad ho rai hai error aaye hai