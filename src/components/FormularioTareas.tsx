import { useForm } from "react-hook-form"
import Error from "./Error"
import { DraftTarea } from "../types"
import { useTareasStore } from "../store"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function FormularioTareas() {

    const { agregarTarea, activarId, tareas, actualizarTarea } = useTareasStore()

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<DraftTarea>()

    useEffect(() => {
        if (activarId) {
            const activarTarea = tareas.filter(tarea => tarea.id === activarId)[0]
            console.log("Desde el useEffect en el form", activarTarea)
            setValue('tarea', activarTarea.tarea)
            setValue('fecha', activarTarea.fecha)
            setValue('descripcion', activarTarea.descripcion)
        }
    }
        , [activarId, tareas, setValue])

    const registroTarea = (data: DraftTarea) => {
        if (activarId) {
            console.log("Desde el registroTarea", data)
            actualizarTarea(data)
            toast.success("Se ha actualizado la tarea")

        } else {
            console.log(data)
            agregarTarea(data)
            toast.success("Se ha guardado la tarea")
        }


        // Limpiar el formulario
        reset()

    }
    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <p className="font-black text-lg mt-5 text-center mb-10">Añadir Tareas</p>

            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                noValidate
                onSubmit={handleSubmit(registroTarea)}
            >
                <div className="mb-5">
                    <label htmlFor="tarea" className="text-sm uppercase font-bold">
                        Nombre de la Tarea
                    </label>
                    <input
                        id="tarea"
                        className="w-full p-3 border border-gray-100"
                        type="text"
                        placeholder="Nombre de la Tarea"
                        {...register('tarea', {
                            required: "falta el nombre de la tarea",
                            maxLength: {
                                value: 10,
                                message: "El nombre de la tarea no puede superar los 10 caracteres"
                            }
                        })}
                    />
                    {errors.tarea && <Error>{errors.tarea?.message?.toString()}</Error>}

                </div>

                <div className="mb-5">
                    <label htmlFor="fecha" className="text-sm uppercase font-bold">
                        Fecha de la Tarea
                    </label>
                    <input
                        id="fecha"
                        className="w-full p-3 border border-gray-100"
                        type="date"
                        {...register('fecha', {
                            required: "falta la fecha de la tarea",
                            validate: (value) => {
                                const fecha = new Date(value)
                                if (fecha < new Date()) {
                                    return "La fecha no puede ser menor a la actual"
                                }
                            }
                        })}
                    />
                    {errors.fecha && <Error>{errors.fecha?.message?.toString()}</Error>}
                </div>

                <div className="mb-5">
                    <label htmlFor="descripcion" className="text-sm uppercase font-bold">
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        className="w-full p-3 border border-gray-100"
                        placeholder="Descripción de la Tarea"
                        {...register('descripcion', {
                            required: "falta la descripción de la tarea",
                            maxLength: {
                                value: 200,
                                message: "La descripción no puede superar los 200 caracteres"
                            }
                        })}

                    />
                    {errors.descripcion && <Error>{errors.descripcion?.message?.toString()}</Error>}
                </div>

                <input
                    type="submit"
                    className="bg-blue-600 w-full p-3 text-white uppercase font-bold hover:bg-blue-700 cursor-pointer transition-colors rounded"
                    value="Guardar Tarea"
                />
            </form>
        </div>
    )
}