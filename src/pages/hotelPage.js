import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useMatches } from "react-router-dom";
import { FiGlobe, FiShare } from "react-icons/fi";
import { TiUser } from "react-icons/ti";
import { fetchRoom ,addWishilist} from "../redux/slices/homePageSlice";
import { BiSearch } from "react-icons/bi";
import { HiUserCircle } from "react-icons/hi";
import { AiOutlineMenu, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { Button } from "reactstrap";
import "../styles/hotelPage.scss";
import BookingSummary from "../components/bookingSummary";

export default function HotelPage() {
  const pathData = useMatches();
  const amenities =[];
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
 
  const roomData = useSelector((state) => state.HomePage.value.room);
console.log(roomData)
 if(roomData.amenities){
  const temp = roomData.amenities.trim();
   const temp1 = temp.substring(1, temp.length-1).split(",")
   amenities.push(temp1.map(e => e))
 }
 console.log(amenities)
console.log(roomData.amenities);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const Wishlist = (roomData) => {
    const userId = localStorage.getItem("userId")
    if(roomData._id){
      dispatch(addWishilist({...roomData,...{userId : userId}}))
    }
  }
  useEffect(() => {
    dispatch(fetchRoom(pathData[0].params.propertyId));
  }, []);
  
  return (
    <div className="room-container">
      <div className="room-header ">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaG9lNCdRENRAOn3TWtK_7epBLUW64gO4fBPzaHvS8VglfaeGfFfxBdvb2yMBPA-E7cUY&usqp=CAU" />
        <div className="search-bar">
          <div>Start yout search</div>
          <div className="search-icons">
            <BiSearch />
          </div>
        </div>
        <div>
          <div style={{ cursor: "pointer" }}>Switch to hosting</div>
          <div style={{ cursor: "pointer" }}>
            <FiGlobe />
          </div>
          <Button
            className="border rounded-pill p-2 btn btn-light profile-btn1"
            onClick={handleClick}
          >
            <span className="ps-2">
              <AiOutlineMenu />
              <span
                className="ps-2 pe-2 pt-3 pb-3"
                style={{ fontSize: "1.3rem" }}
              >
                {email ? (
                  <span
                    style={{
                      color: "white",
                      backgroundColor: "black",
                      padding: "0 0.4rem 0 0.4rem",
                      borderRadius: "50%",
                    }}
                  >
                    {email[0]}
                  </span>
                ) : (
                  <HiUserCircle />
                )}
              </span>
            </span>
          </Button>
        </div>
      </div>
      <div className={`${open ? "profile-menu1" : "profile-menu1-disable"}`} style={{zIndex: "700", backgroundColor:"white"}}>
        <li>Messages</li>
        <li>Notifications</li>
        <li>Trips</li>
        <li>Wishlists</li>
        <li>Manage listings</li>
        <li>Refer a host</li>
        <li>Account</li>
        <li>Logout</li>
      </div>
     <div className="hotel-display-part container d-flex pt-5">
        <div className="">
          <div className="h2">{roomData.name}</div>
          <div>
            <span>
              <AiFillStar />
            </span>
            <span>{`${parseInt(Math.random() * 5)}.${parseInt(
              Math.random() * 5
            )}${parseInt(Math.random() * 5)}- `}</span>
            <span className="text-decoration-underline-">{`${parseInt(
              Math.random() * 500
            )} reviews - `}</span>
            <span>
              {" "}
              <TiUser /> Superhost{" "}
            </span>
            <span className="text-decoration-underline">{` - ${roomData.street}`}</span>
            <span className="ps-5">
              <FiShare />
            </span>
            <span className="text-decoration-underline ps-2">Share</span>
            <span className="ps-5" style={{cursor:"pointer"}} onClick={() => Wishlist(roomData)}>
              <AiOutlineHeart />
            </span>
            <span className="text-decoration-underline ps-2" style={{cursor:"pointer"}} onClick={() => Wishlist(roomData)}>Save</span>
          </div>
          <div className="pt-3">
            <img src={roomData.picture_url} />
          </div>
          <div className="host-details border-bottom pb-4">
            <div className="w-75">
              <div>{`${roomData.property_type} hosted by ${roomData.host_name}`}</div>
              <div>{`${roomData.accommodates} guests - ${roomData.bedrooms} bedroom - ${roomData.beds} beds -${roomData.bathrooms} bathrooms`}</div>
            </div>
            <div className="w-25">
              <img src={roomData.host_thumbnail_url} />
            </div>
          </div>
          <div className="h5 pt-4">Amenities:</div>
          <div className="amenities border-bottom pb-4" >
            <ul>
            { amenities.length && amenities.map((e) => {
              return <li>{e}</li>;
            })}
            </ul>
          </div>
          <div className="roomDesc pt-4">
                <p> {roomData.description}</p>
          </div>
        </div>
        <div className="">
            <BookingSummary data={roomData}/>
        </div>
      </div>
    </div>
  );
}
