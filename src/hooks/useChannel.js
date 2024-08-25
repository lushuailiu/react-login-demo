//封装获取频道列表的函数

import { getCchannelAPI } from "@/apis/article"
import { useEffect, useState } from "react"

function useChannel() {
    //1.获取频道列表的所有逻辑
    const [channelList, setChannelList] = useState([])

    useEffect(() => {
        // 获取频道列表
        const getCchannelList = async () => {
            const res = await getCchannelAPI()
            setChannelList(res.data.channels)
        }
        getCchannelList()
    }, [])
    //2.把组件中用到的数据return出去

    return {channelList}
}
export { useChannel }