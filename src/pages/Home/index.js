import './index.scss'
import { Card, Col, Row } from 'antd';
import BarChart from './components/BarChart';

const data1 = ['vue', 'angular', 'react']
const data2 = ['angular', 'react', 'vue']
const Home = () => {
    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <Card> <BarChart title={'三大框架满意度'} data={data1} /> </Card>

                </Col>
                <Col span={12}>
                    <Card > <BarChart title={'三大框架使用度'} data={data2} /> </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Home