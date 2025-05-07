import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { logoutThunk } from "~/redux/features/logoutThunk";
import { useAppDispatch } from "~/redux/store";


export default function LogoutPage ()  {
    const dispatch = useAppDispatch()

    const handleLogout = async () => {
        await dispatch(logoutThunk());
        
    }

    useEffect( () => {
        handleLogout()
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
    }, [])

    return (
        <div className="fixed z-[9999] top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[rgba(255,255,255,0.8)]">
            <ClipLoader size={30} color="#000" />
        </div>
    )
}