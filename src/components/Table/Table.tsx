

interface tableItem {
    description: string;
    amount: number;
    category: string;
}

interface tableItems {
    items: tableItem[];
    categories: string[];
    handleDelete: (index: number) => void;
    filterItems: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Table({ items, filterItems, categories,  handleDelete }: tableItems) {
    return (
        <>

            <select onChange={filterItems} name="activeCategoy" id="activeCategory" className="form-select mt-5">
                <option  key="all" value="all">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                ))}
            </select>

            <table className="table mt-5">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 ? <h5>No items added yet</h5> :
                        items.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.description}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(index)} 
                                            className="btn btn-outline-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        )
                    }

                </tbody>
            </table>
        </>
    )
}

export default Table