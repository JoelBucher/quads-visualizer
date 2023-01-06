import { Input, Row, Col} from 'antd';
import 'antd/dist/antd.min.css'
import QuadsScene from './QuadsScene';
import { SRtoIR } from '../../../backend/parsers/SR-IR.js'
import { IRtoSR } from '../../../backend/parsers/IR-SR.js'

export function SearchView(props){
    const { Search } = Input;
    
    return (
    <>
        <Row gutter={[16, 16]}>
            <Col span={2}/>
            <Col span={20}>
                <Search
                    style={{marginTop: "50px"}}
                    placeholder="Enter Quads String"
                    onSearch={value => {props.setIR(SRtoIR(value))}}
                    defaultValue={IRtoSR(props.ir)}
                    />
            </Col>
            <Col span={2} />
        </Row>

        <QuadsScene
            ir = {props.ir}
            so = {null}
            updateSO = {null}
            zoom = {props.zoom}
        />
    </>
    )
}