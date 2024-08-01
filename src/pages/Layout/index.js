import { requst } from "@/utils"
import { useEffect } from "react"
const Layout = () => {

    useEffect(() => {
        requst.get('/user/profile')
    }, [])

    return <div>a layout</div>
}

export default Layout