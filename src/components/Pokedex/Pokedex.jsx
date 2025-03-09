import Search from "../Search/Search"
import PokemonList from "../PokemonList/PokemonList"

// css import
import './Pokedex.css'

function Pokedex() {
    return(
        <div className="pokedex-wrapper">
       
        <Search/>
        <PokemonList/>
        </div>

    )

    // 14:41 tak ka ho gaya blkl theek se 

}
export default Pokedex