import styled from "styled-components"

import RightOutline from '../../assets/btn_arrowr@2x.png'
import { useNavigate } from 'react-router-dom';
const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  justify-content: space-between;
  line-height: 26px;
  font-size: 14px;
  font-weight: 400;
  color: #323643;
  img {
    margin-top: 7px
  }
`
const Wrap =  styled.div`
    padding: 26px 16px 20px 16px;
    background-color: #fff;
`
const guideList = [
    'How to place the baby camera in the optimal position?',
    'Why do you often hear a clicking sound?',
    'How to avoid frequent night vision mode changes?',
    'How is the night summary video generated?',
    'How is the baby data report generated?',
    'How to use the baby diary function?',
  ]

  const BabyGuide = ()=> {
    const history = useNavigate();

    const gotoDetail = (id)=>{
        history('/babyDetail',{state:{id:id}})
    }
    return (
        <Wrap>
        {
           guideList.map((item, index)=>{
            return <Row onClick={()=>gotoDetail(index)}><span style={{paddingRight: '20px' }}>{item}</span><img src={RightOutline} width={7} height={13}/></Row>
           }) 
        }
        <Row/>
        </Wrap>
    )
  }
export default BabyGuide