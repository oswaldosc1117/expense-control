import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { categories } from "../data/categories"
import { DraftExpense, Value } from "../types";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export const ExpenseForm = () => {

    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: 0,
        date: new Date()
    })

    const [error, setError] = useState('')
    const [previousAmount, setPreviousAmount] = useState(0)
    const {state, dispatch, avaible} = useBudget()

    useEffect(() => {
        if(state.editId){
            const editExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editId)[0]
            setExpense(editExpense)
            setPreviousAmount(editExpense.amount)
        }
    }, [state.editId])

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        
        const {name, value} = e.target // NG - 2.
        const isAmountField = ['amount'].includes(name) // NG - 3
        const isCategorytField = ['category'].includes(name)
        
        setExpense({
            ...expense,
            [name]: isAmountField || isCategorytField ? +value : value // NG - 4.
        })
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        
        e.preventDefault()

        // Validacion.
        if(Object.values(expense).includes('') || Object.values(expense).includes(0)){
            setError('Todos los campos son obligatorios')
            return
        }

        // Validar que el presupuesto disponible quede en negativo.
        if((expense.amount - previousAmount) > avaible){
            setError('El gasto sobrpasa el presupuesto')
            return
        }

        // Agregar o actualizar el gasto.
        if(state.editId){
            dispatch({type: 'update-expense', payload: {expense: {...expense, id: state.editId}}})
        } else{
            dispatch({type: 'add-expense', payload: {expense}})
        }

        // Reiniciar los el state de la ventana modal.
        setExpense({
            expenseName: '',
            amount: 0,
            category: 0,
            date: new Date()
        })
        setPreviousAmount(0)
    }


    return (
        <>
            <form className=" space-y-5" onSubmit={handleSubmit}>
                <legend className=" uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                    {state.editId ? 'Actualizar Gasto' : 'Nuevo Gasto'}
                </legend>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <div className=" flex flex-col gap-2">
                    <label htmlFor="expenseName" className=" text-xl">Nombre:</label>
                    <input
                        type="text"
                        id="expenseName"
                        className=" bg-slate-200 p-2 rounded-lg"
                        placeholder="Ingresa el nombre del gasto"
                        name="expenseName"
                        value={expense.expenseName}
                        onChange={handleChange}
                    />
                </div>

                <div className=" flex flex-col gap-2">
                    <label htmlFor="amount" className=" text-xl">Cantidad:</label>
                    <input
                        type="number"
                        id="amount"
                        className=" bg-slate-200 p-2 rounded-lg"
                        placeholder="Ingresa la cantidad del gasto"
                        name="amount"
                        value={expense.amount || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className=" flex flex-col gap-2">
                    <label htmlFor="category" className=" text-xl">Categoría:</label>
                    <select name="category" id="category" className=" bg-slate-200 p-2 rounded-lg" value={expense.category} onChange={handleChange}> {/* NG - 1. */}

                        <option value={0} disabled>-- Seleccione --</option>

                        {categories.map(e => (
                            <option key={e.id} value={e.id}>{e.name}</option>
                        ))}
                    </select>
                </div>

                <div className=" flex flex-col gap-2">
                    <label htmlFor="date" className=" text-xl">Fecha:</label>
                    <DatePicker className=" bg-slate-100 p-2 border-0" value={expense.date} onChange={handleChangeDate}/>
                </div>

                <input
                type="submit"
                className=" bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer w-full p-2 text-white font-bold uppercase rounded-lg"
                value={state.editId ? 'Guardar Cambios' : 'Registrar Gasto'}
                />
            </form>
        </>
    )
}

/** NOTAS GENERALES
 * 
 * 1.- Con el parametro defaultValue puede establecer un parametro de inicio por defecto. Ejem: defaultValue={0}
 * 
 * 2.- Puedo extraer el name y el value de los inputs del e.target con esa sintaxis.
 * 
 * 3.- Es una funcion donde genero un arreglo con un unico string y reviso si incluye el name que se estableció en los value. Devolvera true o false.
 * 
 * 4.- Con ese [name], automaticamente establezco el resto de los parametros para actualizar el state. Igualmente, puedo establecer un operador logico para
 * comprobar que se cumplan una o mas condiciones.
*/
