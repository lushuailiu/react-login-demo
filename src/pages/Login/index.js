import { Button, Card, Form, Input, message } from 'antd'
import logo from '@/assets/logo.png'
import '@/pages/Login/index.scss'
import {useDispatch} from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log(values)
        //触发异步action fetchLogin
        await dispatch(fetchLogin(values))
        //1.跳转到首页
        navigate('/')
        //1.提示用户用户
        message.success('登录成功')
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form
                    // 提交表单且数据验证成功后回调事件	
                    onFinish={onFinish}
                    //提交表单且数据验证失败后回调事件	
                    onFinishFailed={ onFinishFailed}
                >
                    <Form.Item
                        name="mobile"
                        validateTrigger='onBlur'
                        rules={[
                            { required: true, message: '请输入手机号' },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号格式'
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" defaultValue='13800000002'></Input>
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            { required: true, message: '请输入验证码' }
                        ]}>
                        <Input size="large" placeholder="请输入验证码" defaultValue='246810'></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType='submit' block>登录</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login