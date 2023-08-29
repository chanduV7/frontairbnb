import { useDispatch} from 'react-redux';
import '../../styles/carousel.scss';
import { fetchHotelsByType} from "../../redux/slices/homePageSlice";
import DisplayPart from './displayPart';
import { useState } from 'react';
export default function Carousel({data}){
    const [open, setOpen] = useState(true);
    const dispatch  = useDispatch()
    const func = (name) => {
      dispatch(fetchHotelsByType({name_id : name})); 
      setOpen(false)
    }
   
    return(
        <div className="carousel-main-container">
          <div className="carousel-container">
            {
                data.length && data.map((e) => {
                    return(
                        <div className='carousel-item1' onClick={() => func(e.type)}>
                            <div className='carousel-img'> <img src={e.url} alt={e.type}/> </div>
                            <div className='carousel-name'>{e.type} </div>
                        </div>
                    )
                })
            }
           </div>
           <DisplayPart open ={open}/>
        </div>
      
    )
}