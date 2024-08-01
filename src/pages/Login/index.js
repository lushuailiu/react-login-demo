import { Button, Card, Form, Input } from 'antd'
import logo from '@/assets/logo.png'
import '@/pages/Login/index.scss'
const Login = () => {
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={ logo } alt="" />
                {/* 登录表单 */}
                <Form>
                    <Form.Item>
                        <Input size="large" placeholder="请输入手机号"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Input size="large" placeholder="请输入验证码"></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" block>登录</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login