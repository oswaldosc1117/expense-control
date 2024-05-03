import { ChangeEvent } from "react"
import { useBudget } from "../hooks/useBudget"
import { categories } from "../data/categories"

export const FilterByCategory = () => {

    const {dispatch} = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'filter-category', payload: {id: +e.target.value}})
    }

    return (
        <div className=" bg-white shadow-lg rounded-lg p-10">
            <form>
                <div className=" flex flex-col md:flex-row md:items-center gap-5">
                    <label htmlFor="category">Filtrar Gastos</label>
                    <select
                        id="category"
                        className=" bg-slate-100 flex-1 p-3 rounded-lg outline-blue-500"
                        onChange={handleChange}
                    >
                        <option value={0}>Todas las Categorías</option>

                        {categories.map(e => (
                            <option key={e.id} value={e.id}>{e.name}</option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}
