
import { ToastContainer } from "react-toastify"
import FormularioTareas from "./components/FormularioTareas"
import ListadoTareas from "./components/ListadoTareas"
import 'react-toastify/dist/ReactToastify.css'
function App() {


  return (
    <>
      <div className="container mx-auto mt-20 bg-slate-200 shadow-lg rounded-lg p-10 w-auto max-w-5xl">
        <h1 className="font-bold text-center md:w-2/3 md: mx-auto"> Mis Tareas</h1>
        <div className="mt-12 md:flex">
          <FormularioTareas />
          <ListadoTareas />
          
        </div>
        
      </div>
      <ToastContainer/>
    </>
  )
}

export default App
