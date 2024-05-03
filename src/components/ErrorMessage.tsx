import { PropsWithChildren } from "react"


export const ErrorMessage = ({children}: PropsWithChildren) => { // NG - 1.
    return (
        <>
            <p className=" bg-red-600 p-2 font-bold text-sm text-center text-white rounded-lg">{children}</p>
        </>
    )
}

/** NOTAS GENERALES
 * 
 * 1.- Otra forma de darle types a los childrens es con el type PropsWithChildren. De esta forma, no es necesario crear un type propio y especificar que sea
 * de tipo React Node y luego pasarselo al componente.
*/
