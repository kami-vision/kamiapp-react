import { useLocation } from 'react-router-dom';

const BabyGuideDetail = (props)=>{
    const {state} = useLocation();
    return(
        <div>this is NO.{state.id+1} page,baby detail</div>
    )
}

export default BabyGuideDetail