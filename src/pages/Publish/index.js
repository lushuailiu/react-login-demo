import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { createArticleAPI, getCchannelAPI } from '@/apis/article'
import { type } from '@testing-library/user-event/dist/type'

const { Option } = Select

const Publish = () => {

    //获取频道列表
    const [channelList, setChannelList] = useState([])

    useEffect(() => {
        // 获取频道列表
        const getCchannelList = async () => {
            const res = await getCchannelAPI()
            setChannelList(res.data.channels)
        }
        getCchannelList()
    }, [])

    //提交表单
    const onFinish = async (formValue) => {
        console.log(formValue)
        //解构赋值
        const { channel_id, title, content } = formValue
        const reqData = {
            channel_id,
            title,
            content,
            cover: {
                type: 0,
                images: []
            }
        }

        // 2. 调用接口提交

        createArticleAPI(reqData)



    }

    // 上传图片
    const [imageList, setImageList] = useState([])
    const onUploadChange = (info) => {
        console.log(info)
        console.log('正在上传')
        setImageList(info.fileList)
    }

    // 控制图片Type
    const [imageType, setImageType] = useState(0)

    const onTypeChange = (e) => {
        console.log(e)
        setImageType(e.target.value)
    }

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '发布文章' },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: 1 }}
                    // 提交表单且数据验证成功后回调事件	
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {
                            imageType !== 0 && <Upload
                            name="image"
                            listType="picture-card"
                            showUploadList
                            onChange={onUploadChange}
                            action={'http://geek.itheima.net/v1_0/upload'}
                        >
                            <div style={{ marginTop: 8 }}>
                                <PlusOutlined />
                            </div>
                        </Upload>
                        }
                    </Form.Item>

                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >

                        {/* 富文本编辑器 */}
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>




                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish