import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { DraftTarea, Tarea } from "./types";
import { devtools, persist } from "zustand/middleware";

type TareaState = {
    tareas: Tarea[]
    activarId: Tarea['id']
    agregarTarea: (data: DraftTarea) => void

    eliminarTarea: (id: Tarea['id']) => void

    obtenerTareaPorId: (id: Tarea['id']) => void

    actualizarTarea: (data: DraftTarea) => void
}

const crearTarea = (tarea: DraftTarea): Tarea => {
    return {
        id: uuidv4(),
        ...tarea
    }
}

export const useTareasStore = create<TareaState>()(
    devtools(
        persist(
            (set) => ({
                tareas: [],
                activarId: '',
                agregarTarea: (data) => {
                    const nuevaTarea = crearTarea(data)
                    set((state) => ({
                        tareas: [...state.tareas, nuevaTarea]
                    }))
                },
                eliminarTarea: (id) => {
                    set((state) => ({
                        tareas: state.tareas.filter(tarea => tarea.id !== id)
                    }))
                },
                obtenerTareaPorId: (id) => {
                    set(() => ({
                        activarId: id
                    }))
                },
                actualizarTarea: (data) => {
                    set((state) => ({
                        tareas: state.tareas.map(tarea => 
                            tarea.id === state.activarId ? { id: state.activarId, ...data } : tarea
                        ),
                        activarId: ''
                    }))
                },
            }),
            {
                name: 'tareas-storage', // Nombre para localStorage
                // Opcional: puedes especificar qué campos persistir
                // partialize: (state) => ({ tareas: state.tareas })
            }
        )
    )
)
/*
Tarea en Lista de Tareas =>
Editar =>
1. Envia la id actividadId / 2. Envia la tarea a Borrador/Draft (no tiene el id) =>
una vez que es editado y guardado el borrarod =>
Actividad y Draft se juntan y modifican la tarea original


*/