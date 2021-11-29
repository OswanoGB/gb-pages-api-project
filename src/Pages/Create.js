import useAxios from "axios-hooks";
import Form from "../Components/Form";
import { useAuth } from "../Hooks/useAuth";

const Create = () => {
    const auth = useAuth();

    const items = [
        { type: 'text', name: 'Titulo', id: 'title', placeholder: 'Mi post' },
		{ type: 'text', name: 'Descripcion', id: 'description', placeholder: 'La descripcion de mi primer post' },
        { type: 'text', name: 'Imagen', id: 'image', placeholder: 'Url de tu imagen' },
    ]

    const [, createPost] = useAxios({
        url: `${process.env.REACT_APP_API}/post/create`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${auth?.user?.token}`
        }
    }, { manual: true })

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const validate = Array.from(formData.values());

            if (validate.some(it => it === "")) {
                alert('Llena los campos necesarios');
                return;
            }

            const body = Object.fromEntries(formData.entries());

            await createPost({ data: body })

            alert('Post creado');
        } catch(err) {
            alert('error');
            console.log(err.response);
        }
    }
    
    return (
        <div className="-mt-10 w-screen h-screen px-10 flex flex-col items-center justify-center space-y-10 max-w-screen-sm mx-auto">
            <Form items={items} submitText={"Crear"} handleSubmit={handleSubmit} />
        </div>
    )
}

export default Create;
