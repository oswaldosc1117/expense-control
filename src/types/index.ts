export type Expense = {
    id: string,
    expenseName: string,
    amount: number,
    category: number,
    date: Value
}

export type DraftExpense = Omit<Expense, 'id'> // NG - 1.

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Category = {
    id: number,
    name: string,
    icon: string
}


/** NOTAS GENERALES
 * 
 * 1.- Forma de copiar otro type, seleccionando algun elemento que no queramos incluir en el nuevo type.
*/