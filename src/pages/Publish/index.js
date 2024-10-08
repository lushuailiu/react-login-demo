import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useRef, useState } from 'react'
import { createArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'

const { Option } = Select

const Publish = () => {

    const {channelList} = useChannel()

    //提交表单
    const onFinish = async (formValue) => {
        console.log(formValue)
        if (imageType !== imageList.length) return message.warning('图片类型和数量不一致')
        //解构赋值
        const { channel_id, title, content, type } = formValue
        const reqData = {
            channel_id,
            title,
            content,
            cover: {
                type, //封面模式
                images: imageList.map(item => item.response.data.url)
            }
        }

        // 2. 调用接口提交

        createArticleAPI(reqData)



    }


    // 上传图片
    const cacheImageList = useRef([])
    const [imageList, setImageList] = useState([])
    const onUploadChange = (info) => {
        console.log('正在上传')
        console.log(info.fileList)
        setImageList(info.fileList)
        cacheImageList.current = info.fileList

    }

    // 控制图片Type
    const [imageType, setImageType] = useState(1)

    const onTypeChange = (e) => {
        const type = e.target.value
        setImageType(type)
        if (type === 1) {
          // 单图，截取第一张展示
          const imgList = cacheImageList.current[0] ? [cacheImageList.current[0]] : []
          setImageList(imgList)
        } else if (type === 3) {
          // 三图，取所有图片展示
          setImageList(cacheImageList.current)
        }
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
                                maxCount={imageType}
                                fileList={imageList}
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