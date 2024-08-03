//用户相关状态管理
import { createSlice } from '@reduxjs/toolkit'
import { requst, getToken, setToken as _setToken, removeToken } from '@/utils'
const userState = createSlice({
    name: 'user',
    //数据状态
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    //同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            //localStore 存储token
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        clearUserInfo(state){
            state.token = ''
            state.userInfo = {}
            removeToken()
        }
    }
})

//解构出actionCreater
const { setToken, setUserInfo,clearUserInfo } = userState.actions

//获取 reducer函数
const userReducer = userState.reducer

//异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        //1.发送异步请求
        const res = await requst.post('/authorizations', loginForm)
        //2.提交同步action 进行token存入
        dispatch(setToken(res.data.token))
    }
}

//获取个人用户信息 异步
const fetchUserInfo = () => {
    return async (dispatch) => {
        //1.发送异步请求
        const res = await requst.get('/user/profile')
        //2.提交同步action 
        console.log("res", res)
        dispatch(setUserInfo(res.data))
    }
}

// const clearUserInfo = () => {
//     return (dispatch) => {
//         dispatch(setToken(''))
//         dispatch(setUserInfo({}))
//     }
// }
export { fetchLogin, setToken, fetchUserInfo, clearUserInfo }

export default userReducer
