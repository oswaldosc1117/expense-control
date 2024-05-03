import { createContext, useReducer, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch: Dispatch<BudgetActions>
    spent: number,
    avaible: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!) // NG - 4.

export const BudgetProvider = ({children}: BudgetProviderProps) => { // NG - 2 / 3.

    const [state, dispatch] = useReducer(budgetReducer, initialState)


    const spent = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])
    const avaible = state.budget - spent

    return (
        <BudgetContext.Provider // NG - 5.
            value={{
                state,
                dispatch,
                spent,
                avaible
            }}
        >
            {children}

        </BudgetContext.Provider>
    )
}

/** NOTAS GENERALES
 * 
 * 1.- Context API nos permite manejar un estado de forma global. Es decir, en todo nuestro codigo.
 * 
 * 2.- Por convencion, la funcion que maneja todo se le emplea el sufijo provider.
 * 
 * 3.- children es una props especial de React que se pasa a los componentes. Toman de referencia un elemento padre (similar a las clases heredadas de CSS).
 * 
 * 4.- La funcion createContext permite crear un contexto que los componentes pueden proporcionar o leer.
 * 
 * 5.- Si bien en principio, la funcion del provider no recibe parametros del createContext, estos se pasan en el return con la sintaxis del nombre del context,
 * seguido del .provider (se refleja en el autocompletado). De esa forma se conectan ambos datos.
*/
