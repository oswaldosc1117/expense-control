import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail"

export const ExpenseList = () => {

    const { state } = useBudget()

    const filteredExpense = state.currentCategory ? state.expenses.filter(e => e.category === state.currentCategory) : state.expenses

    const isEmpty = useMemo(() => filteredExpense.length < 1, [state])


    return (
        <div className=" mt-10">
            {isEmpty ? 
            <p className=" text-gray-600 text-2xl font-bold">No hay gastos aún</p> : (
                <>
                    <p className=" text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                    {filteredExpense.map(e => (
                        <ExpenseDetail
                            key={e.id}
                            expense={e}
                        />
                    ))}
                </>
                
            )}
        </div>
    )
}
