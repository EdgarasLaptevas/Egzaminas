import { useLocation } from "react-router"


export const useCurrentPath = () => {

    const location = useLocation()
    const path = location.pathname.split("/").filter(Boolean).pop()

    return path

}

export const useEntityPath = () => {

    const location = useLocation()
    const path = location.pathname.split("/").filter(Boolean).shift()

    return path
}