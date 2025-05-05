import { useEffect } from "react";
import { ClipLoader } from "react-spinners";


export default function LogoutPage ()  {


    return (
        <div className="fixed z-[9999] top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,.8)]">
            <ClipLoader size={30} color="#fff" />
        </div>
    )
}