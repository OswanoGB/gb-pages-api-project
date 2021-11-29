import { generate } from "shortid";

const FormGroup = ({ type, name, id, placeholder }) => {
    return (
        <div className="w-full flex flex-col space-y-2">
            <label className="font-medium" htmlFor={name}>{name}</label>
            <input className="px-3 py-1 rounded-full border-2 border-primary" type={type} id={id} name={id} placeholder={placeholder} />
        </div>
    )
}

const Form = ({ items, submitText, handleSubmit }) => {
    return (
        <form className="w-full bg-white rounded-2xl p-4 space-y-8 flex flex-col items-end" onSubmit={handleSubmit}>
            {
                items?.map((it) => <FormGroup key={generate()} type={it.type} name={it.name} id={it.id} placeholder={it.placeholder} />)
            }
            <button className="text-white bg-primary font-bold rounded-full px-4 py-2" type="submit">{submitText}</button>
        </form>
    );
}

export default Form;