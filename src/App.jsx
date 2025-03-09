
import { Link } from 'react-router-dom'
import './App.css'

import CustomRoutes from './routes/CustomRoutes'

function App() {
  

  return (
    <div className="outer-pokedex">
     <h1 id="pokedex-heading">
     {/* ye link ke andar pokedex rakha and fr to = "/"  aesa krne se jab bhi ham pokedex pr click krenge to vapas se home page pr aa jaynge ye bada achha tarika hai hamesha yaad rakhna hai */}
     <Link to="/">Pokedex</Link> 
     </h1>
    <CustomRoutes/>
    </div>
  )
}

export default App
