//柱状图组件
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({ title,data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        //保证dom可用 渲染图表
        //1.获取要渲染图标的dom
        const chartDom = chartRef.current;
        //2.初始化echarts图表实例
        const myChart = echarts.init(chartDom);
        //3.准备图标参数
        const option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: data
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 150, 180],
                    type: 'bar'
                }
            ]
        };
        //4.使用图表参数完成图表渲染
        option && myChart.setOption(option);

    }, [])

    return <div ref={chartRef} id="main"></div>
}

export default BarChart