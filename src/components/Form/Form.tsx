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
        <form onSubmit={formSubmitHandler((data) => {handleSubmit(data)
            reset();
        })} className="mt-5">
            <div className="form-group mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input {...register('description')} type="text" className="form-control" id="description" />
                {errors.description && <div className="text-danger">{errors.description.message}</div>}
            </div>
            <div className="form-group mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input {...register('amount', {valueAsNumber: true})} className="form-control" type="number"  id="amount" />
                {errors.amount && <div className="text-danger">{errors.amount.message}</div>}
            </div>
            <div className="form-group mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select {...register('category')} id="category" className="form-select">
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
                {errors.category && <div className="text-danger">{errors.category.message}</div>}
            </div>
            <button className="btn btn-primary " type="submit">Submit</button>
        </form>
    )
}

export default Form