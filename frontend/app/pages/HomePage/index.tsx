import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify"
import Footer from "~/components/Footer"
import TopNavBar from "~/components/TopNavBar"

const Homepage = () => {
    return (
        <div>
             <TopNavBar />
              <Outlet />
              <Footer />
        </div>
    )
}

export default Homepage