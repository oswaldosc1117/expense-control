import { useContext } from "react"
import { BudgetContext } from "../context/BudgetContext"

export const useBudget = () => {

    const context = useContext(BudgetContext) // NG - 1.

    if(!context){
        throw new Error('useBudget must be used whithin a BudgetProvider')
    }

    return context
}

/** NOTAS GENERALES
 * 
 * 1.- La funcion useContext es un Hook de React que te permite leer y suscribirte a un contexto desde tu componente. En este caso, lee el BudgetContext que a su
 * vez emplea un createContext que es la funcion que crea un contexto para que este luego se pueda leer en los componentes. Explicado de forma sencilla, useContext
 * lee el contexto que se crea en createContext. * 
*/