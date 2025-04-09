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

function Table({ items, filterItems, categories, handleDelete }: tableItems) {
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary">Expense Tracker</h2>
                <select 
                    onChange={filterItems} 
                    name="activeCategory" 
                    id="activeCategory" 
                    className="form-select w-25"
                >
                    <option key="all" value="all">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <table className="table table-striped table-hover shadow-sm">
                <thead className="table-primary">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center text-muted">
                                No items added yet
                            </td>
                        </tr>
                    ) : (
                        items.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.description}</td>
                                <td>${item.amount.toFixed(2)}</td>
                                <td>{item.category}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(index)} 
                                        className="btn btn-outline-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table