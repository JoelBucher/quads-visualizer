import { EditOutlined, CodeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Slider, Row, Col } from 'antd';

export function ButtonBar(props){
    return (
    <>
    <Row>
        <Col span={8}/>
        <Col span={8}>
            <Slider min={0} max={5} step={0.01} onChange={(z) => {props.setZoom(z)}}/>
        </Col>
        <Col span={8}/>
    </Row>
    <Row>
        <Col span={9} />
        <Col span={2}><Button shape="circle" icon={<EditOutlined/>} size={'large'} onClick={() => {props.setWindow(1)}}/></Col>
        <Col span={2}><Button shape="circle" icon={<CodeOutlined/>} size={'large'} onClick={() => {props.setWindow(2)}}/></Col>
        <Col span={2}><Button shape="circle" icon={<UnorderedListOutlined/>} size={'large'} onClick={() => {props.setWindow(3)}}/></Col>
        <Col span={9} />
    </Row>
    </>
    );
}