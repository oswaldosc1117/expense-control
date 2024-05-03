import { v4 as uuidv4 } from 'uuid'
import { Category, DraftExpense, Expense } from "../types"

export type BudgetActions =
    {type: 'add-budget', payload: {budget: number}} |
    {type: 'show-modal'} |
    {type: 'close-modal'} |
    {type: 'add-expense', payload: {expense: DraftExpense}} |
    {type: 'remove-expense', payload: {id: Expense['id']}} |
    {type: 'get-expense', payload: {id: Expense['id']}} |
    {type: 'update-expense', payload: {expense: Expense}} |
    {type: 'restart-app'} |
    {type: 'filter-category', payload: {id: Category['id']}}


export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editId: Expense['id']
    currentCategory: Category['id']
}

const initialBudget = (): number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const initialExpense = (): Expense[] => {
    const localStorageExpense = localStorage.getItem('expenses')
    return localStorageExpense ? JSON.parse(localStorageExpense) : []
}

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpense(),
    editId: '',
    currentCategory: 0
}

const createExpense = (draftExpense: DraftExpense): Expense => { // NG - 1.

    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (state: BudgetState = initialState, actions: BudgetActions) => {

    if(actions.type === 'add-budget'){

        return {
            ...state,
            budget: actions.payload.budget
        }
    }

    if(actions.type === 'show-modal'){

        return {
            ...state,
            modal: true
        }
    }

    if(actions.type === 'close-modal'){

        return {
            ...state,
            modal: false,
            editId: ''
        }
    }

    if(actions.type === 'add-expense'){

        const expense = createExpense(actions.payload.expense)
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false
        }
    }

    if(actions.type === 'remove-expense'){

        return {
            ...state,
            expenses: state.expenses.filter(e => e.id !== actions.payload.id)
        }
    }

    if(actions.type === 'get-expense'){

        return {
            ...state,
            editId: actions.payload.id,
            modal: true
        }
    }

    if(actions.type === 'update-expense'){

        return {
            ...state,
            expenses: state.expenses.map(e => e.id === actions.payload.expense.id ? actions.payload.expense : e),
            modal: false,
            editId: ''
        }
    }

    if(actions.type === 'restart-app'){

        return {
            ...state,
            budget: 0,
            expenses: []
        }
    }

    if(actions.type === 'filter-category'){

        return {
            ...state,
            currentCategory: actions.payload.id
        }
    }

    return state
}

/** NOTAS GENERALES
 * 
 * 1.- Podemos decirle a una funcion que reciba un valor de un tipo en especifico que a su vez sea de otro tipo diferente. 
*/