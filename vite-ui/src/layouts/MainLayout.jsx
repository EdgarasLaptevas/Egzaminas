import { NavBar } from "@/components/NavBar"
import { Outlet } from "react-router"

export const MainLayout = () => {
    return (
        <div className="max-w-[1500px] mx-auto">
            <header>
                <NavBar/>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}