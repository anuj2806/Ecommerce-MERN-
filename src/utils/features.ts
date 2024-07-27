import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponce } from "../types/api-types";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";

type  ResType = {
    data: MessageResponce;
} | { 
    error: FetchBaseQueryError | SerializedError;
}

export const ResponseToast = (
    res:ResType,
    navigate:NavigateFunction | null,
    url:string) =>
    {
        if("data" in res){
            toast.success(res.data.message);
            if(navigate) navigate(url);
        }else{
            const error = res.error as FetchBaseQueryError;
            const message = error.data as MessageResponce;
            toast.error(message.message);
        }
}