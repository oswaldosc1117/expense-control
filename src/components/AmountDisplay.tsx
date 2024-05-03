import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string, // NG - 1.
    amount: number
}

export const AmountDisplay = ({label, amount}: AmountDisplayProps) => {
    return (
        <p className=" text-2xl text-blue-600 font-bold">
            {label && `${label}: `} {/* NG - 2. */}
            <span className=" font-black text-black">{formatCurrency(amount)}</span>
        </p>
    )
}

/** NOTAS GENERALES
 * 
 * 1.- El signo de interrogacion especifica a react que ese parametro es opcional y no obligatorio.
 * 
 * 2.- Realizamos una comprobacion unicamente para true dado que el label es opcional. Si existe, imprimelo como esta alli. Si no existe (quiere decir que la
 * comprobacion devolvio false), no lo imprimira.
*/
