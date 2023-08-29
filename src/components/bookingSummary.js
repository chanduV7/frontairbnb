import {FaChevronDown} from "react-icons/fa";
import "../styles/bookingSummary.scss"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset, addDetails} from "../redux/slices/homePageSlice";
import Calendar from 'react-calendar';
export default function BookingSummary({ data }) {
  const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [value, onChange] = useState(new Date());
    const [value1, onChange1] = useState(new Date());
   console.log(value)
    console.log(value1)
    const handleDrop = () => {
        setOpen(!open)
    }
   const count = useSelector((state) => state.HomePage.value.count);
   const sendDetails = (value,value1,count) => {
    if(value.length && value1.length){
      console.log("value123")
      const temp1 = value[1].getTime()/(1000*60*60*24);
      console.log(temp1)
      const temp2 = value1[0].getTime()/(1000*60*60*24);
      console.log(temp2)
       const duration = parseInt(temp1) - parseInt(temp2)
      dispatch(addDetails(
         {startDate : `${value1[0].getDate() + `/` + value1[0].getMonth() + "/" + value1[0].getFullYear()}`,
          endDate :    `${value[0].getDate() + `/` + value[0].getMonth() + "/" + value[0].getFullYear()}`  ,
           duration : duration,
            adults : count[0].count1,
             children: count[0].count1,
              infants: count[0].count1
            }
      ))
    }
   
   }
  //  const handlePayment = async() => {
  //   try {
  //       const {data} = await axios.post(baseUrl+"/payment/checkout",details,{
  //         headers: {
  //           Authorization: "Bearer "+ localStorage.getItem("token")
  //         }
  //       });
  //       localStorage.setItem("cs_id", data.id);
  //       window.location.assign(data.url);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
   useEffect(() => {
      dispatch(reset())
   },[])
  return (
    <div className="booking">
      <div className="shadow-lg p-3" style={{borderRadius:"15px"}}>
        <div className="d-flex justify-content-between ms-3 me-3">
          <div> {`${data.price} night`}</div>
          <div>
            <span>{`${parseInt(Math.random() * 5)}.${parseInt(
              Math.random() * 5
            )}${parseInt(Math.random() * 5)}- `}</span>
            <span className="text-decoration-underline-">{`${parseInt(
              Math.random() * 500
            )} reviews`}</span>
          </div>
        </div>
        <div className="table1 d-flex flex-column">
          <div className="d-flex pt-3 ps-3 pe-3">
            <div className="d-flex  flex-column border p-3">
              <label>CHECK-IN</label>
              <div>{ value1.length ? value1[0].getDate() + `/` + value1[0].getMonth() + "/" + value1[0].getFullYear() : <p></p> }</div>
              <div>
                 <Calendar selectRange={true}  onChange={onChange1} value={value1} />
              </div>
            </div>
            <div className="d-flex  flex-column border p-3">
              <label>CHECK-OUT</label>
              <div>{ value.length ? value[0].getDate() + `/` + value[0].getMonth() + "/" + value[0].getFullYear() : <p></p> }</div>
              <div>
                 <Calendar  selectRange={true} onChange={onChange} value={value} />
              </div>
              
            </div>
          </div>
          <div className="dropdownDiv d-flex  flex-row justify-content-between border p-3 ms-3 me-3 ">
            <div  className="d-flex  flex-column ">
              <label>GUESTS</label>
             <div>{
                  parseInt(count[0].count1)+parseInt(count[1].count2) + ` guests , ` }
                  <span>{parseInt(count[2].count3) ? parseInt(count[2].count3) + ` infants` : ""}</span></div>
            </div>
            <button className="buttonDown" onClick={handleDrop}><FaChevronDown/></button>
          </div>
        </div>
          <div  className="row ms-3 me-3 reserve pt-3"><button onClick={sendDetails(value,value1,count)}>Reserve</button></div>
          <p className="text-center pt-3 pb-3">You won't be charged yet</p>
          <div className="d-flex justify-content-between">
              <div>{`${data.price} x 5 nights`}</div>
              <div>{data.price && "$" + parseInt(data.price.substring(1,data.price.length))*5}</div>
          </div>
          <div className="d-flex justify-content-between border-bottom pt-3 pb-3">
              <div>{`Long stay discount`}</div>
              <div>{data.price && `- $` + parseInt(data.price.substring(1,data.price.length))}</div>
          </div>
          <div className="d-flex justify-content-between pt-4 pb-4">
              <div className="h5">{`Total before taxes`}</div>
              <div>{data.price && `- $` + parseInt(parseInt(data.price.substring(1,data.price.length))*5 - parseInt(data.price.substring(1,data.price.length)))}</div>
          </div>
      </div>

       <div className={open?"dropDownItems p-4 shadow-lg": "dropdown-none"}>
            <div className="d-flex justify-content-between pb-3">
                <div className="d-flex flex-column">
                      <div className="h6">Adults</div>
                      <div>Age 13+</div>
                </div>
                <div className="d-flex align-items-center jusstify-content-center gap-3">
                      <div className="minus" 
                        onClick={() => {
                                        dispatch(decrement("adult"))
                                  }}
                      >
                        -</div>
                      <div>{ count[0].count1}</div>
                      <div className="plus" onClick={() => { dispatch(increment("adult"))}}>+</div>
                </div>
            </div>
            <div className="d-flex justify-content-between pb-3">
                <div className="d-flex flex-column">
                      <div className="h6">Children</div>
                      <div>Age 2-12</div>
                </div>
                <div className="d-flex align-items-center jusstify-content-center gap-3">
                      <div className="minus" onClick={() => { dispatch(decrement("children"))}}>-</div>
                      <div>{count[1].count2}</div>
                      <div className="plus" onClick={() => { dispatch(increment("children"))}}>+</div>
                </div>
            </div>
            <div className="d-flex justify-content-between pb-3">
                <div className="d-flex flex-column">
                      <div className="h6">Infants</div>
                      <div>Under 2</div>
                </div>
                <div className="d-flex align-items-center jusstify-content-center gap-3">
                      <div className="minus" onClick={() => { dispatch(decrement("infant"))}}>-</div>
                      <div>{count[2].count3}</div>
                      <div className="plus" onClick={() => { dispatch(increment("infant"))}}>+</div>
                </div>
            </div>
            <div className="d-flex justify-content-between pb-3">
                <div className="d-flex flex-column">
                      <div className="h6">Pets</div>
                      <div></div>
                </div>
                <div className="d-flex align-items-center jusstify-content-center gap-3">
                      <div className="minus">-</div>
                      <div>0</div>
                      <div className="plus">+</div>
                </div>
            </div>
            <div className="text-end h5 pt-2 text-primary" onClick={handleDrop} style={{cursor:"pointer"}}>Close</div>
       </div>
    </div>
  );
}
