import Post from "../Components/Posts/Post";
import useAxios from "axios-hooks";
import { useAuth } from "../Hooks/useAuth";
import { useEffect, useState } from "react";
import { generate } from "shortid";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const All = () => {
    const auth = useAuth();
    const [paging, setPaging] = useState({ limit: 14, page: 0 });

    const [{ data }, fetcher] = useAxios({
        url: process.env.REACT_APP_API + "/post/all",
        params: paging,
        headers: {
            Authorization: `Bearer ${auth?.user?.token}`
        }
    }, { manual: true });

    useEffect(() => {
        fetcher();
    }, [paging, fetcher]);

    function setLimitsForPaging(increment) {
        if (paging.page + increment > data.pages || paging.page + increment < 0)
            return;
        else
            setPaging({ ...paging, page: paging.page + increment });
    }

    return (
        <div className="w-full flex flex-wrap items-center justify-center">
            <div className="w-full bg-primary py-4">
                <div className="w-1/3 flex justify-evenly mx-auto items-center">
                    <Icon icon={faArrowLeft} onClick={() => setLimitsForPaging(-1)}/>
                    Mostrando pagina { data?.page + 1 }
                    <Icon icon={faArrowRight} onClick={() => setLimitsForPaging(1)}/>
                </div>
            </div>
            {
                data?.data && data?.data.map((it) => <Post key={ generate() } post={it}/>)
            }
        </div>
    )
}

export default All;