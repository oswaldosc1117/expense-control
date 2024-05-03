import { useMemo } from "react"
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import { AmountDisplay } from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"
import "react-swipeable-list/dist/styles.css"

type ExpenseDetailProps = {
    expense: Expense
}
export const ExpenseDetail = ({expense}: ExpenseDetailProps) => {

    const {dispatch} = useBudget()

    const categoryInfo = useMemo(() => categories.filter(e => e.id === expense.category)[0], [expense])

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({type: 'get-expense', payload: {id: expense.id}})}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => dispatch({type: 'remove-expense', payload:{id: expense.id}})} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem maxSwipe={1} leadingActions={leadingActions()} trailingActions={trailingActions()}>
                <div className=" bg-white p-10 w-full border-b border-gray-200 flex gap-5 items-center rounded-lg shadow-sm mb-2">
                    <div>
                        <img src={`/icono_${categoryInfo.icon}.svg`} alt="Icono gasto" className=" w-20"/>
                    </div>

                    <div className=" flex-1 space-y-2">
                        <p className=" text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className=" text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p> {/* NG - 1. */}
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

/** NOTAS GENERALES
 * 
 * 1.- El signo de exclamacion es una forma de decirle a React que nosotros le garantizamos que ese valor va a existir. Es como decirle a React "No te preocupes por
 * ese valor, yo me encargo de el".
*/
