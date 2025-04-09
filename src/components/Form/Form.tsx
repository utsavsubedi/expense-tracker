import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface formProps{
    categories : string[];
    handleSubmit: (data: any) => void;
}


function Form({categories, handleSubmit} : formProps) {
    const schema = z.object({
        description: z.string().min(1, { message: "Description is required" }),
        amount: z.number().min(1, { message: "Amount is required" }),
        category: z.enum(categories as [string, ...string[]], { message: "Category is required" }),
    })
    
    type FormData = z.infer<typeof schema>;

    const {
        register,
        handleSubmit: formSubmitHandler,
        reset,
        formState: { errors },
      } = useForm<FormData>({
        resolver: zodResolver(schema)
      });
    return (
        <form 
            onSubmit={formSubmitHandler((data) => {
                handleSubmit(data);
                reset();
            })} 
            className="p-4 shadow-sm rounded bg-light"
        >
            <h3 className="text-primary mb-4">Add Expense</h3>
            <div className="form-group mb-4">
                <label htmlFor="description" className="form-label fw-bold">Description</label>
                <input 
                    {...register('description')} 
                    type="text" 
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`} 
                    id="description" 
                    placeholder="Enter description"
                />
                {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
            </div>
            <div className="form-group mb-4">
                <label htmlFor="amount" className="form-label fw-bold">Amount</label>
                <input 
                    {...register('amount', { valueAsNumber: true })} 
                    className={`form-control ${errors.amount ? 'is-invalid' : ''}`} 
                    type="number" 
                    id="amount" 
                    placeholder="Enter amount"
                />
                {errors.amount && <div className="invalid-feedback">{errors.amount.message}</div>}
            </div>
            <div className="form-group mb-4">
                <label htmlFor="category" className="form-label fw-bold">Category</label>
                <select 
                    {...register('category')} 
                    id="category" 
                    className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
                {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
            </div>
            <button className="btn btn-primary w-100" type="submit">Add Expense</button>
        </form>
    )
}

export default Form