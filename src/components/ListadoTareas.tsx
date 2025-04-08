import { Bounce, toast } from "react-toastify"
import { useTareasStore } from "../store"
import { Tarea } from "../types"


export default function ListadoTareas() {

  const { tareas , eliminarTarea, obtenerTareaPorId} = useTareasStore()

  console.log("tareas con id listarTareas", tareas)

  
  const handleAccion = (accion: 'eliminar' | 'editar', tarea: Tarea) => {
    console.log(`${accion === 'eliminar' ? 'Eliminamos' : 'Editamos'}  latarea con id: ${tarea.id}`)
    if (accion === 'eliminar') {
      eliminarTarea(tarea.id),
      toast.error("Se ha eliminado la tarea" , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
        })
    }
    if (accion === 'editar') {
      obtenerTareaPorId(tarea.id)
    }
  }
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-auto">
      {tareas.length ? (
        <div>
          <p className="font-black text-lg mt-5 text-center mb-10">Listado de Tareas</p>
          {tareas.map((tarea) => (
            <div key={tarea.id} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
              <p>{tarea.id}</p>
              <p className=" ml-5"><span className="font-bold">Nombre de la Tarea: </span>{tarea.tarea}</p>
              <p className=" ml-5"><span className="font-bold">Fecha de la Tarea: </span>{tarea.fecha}</p>
              <p className=" ml-5"><span className="font-bold">Descripción de la Tarea: </span>{tarea.descripcion}</p>
              <div className=" flex justify-between mt-10">

                <button
                  type="button"
                  onClick={() => handleAccion('editar', tarea)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                >
                  Editar

                </button>
                <button
            
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                  onClick= {() => handleAccion('eliminar', tarea)}
                >
                  Eliminar
                </button>

              </div>

            </div>
          ))}

        </div>
      ) : (
        <div >
          <h2 className="font-black text-lg mt-5 text-center mb-10">No hay tareas</h2>
          <p className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">Agraga tu tarea para que aparezca en este lugar</p>
        </div>
      )}

    </div>
  )
}
