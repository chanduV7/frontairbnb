import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData ,fetchHotelsByType} from "../redux/slices/homePageSlice";
import { FiGlobe } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { HiUserCircle} from "react-icons/hi";
import "../styles/homePage.scss";
import { Button } from "reactstrap";
import Carousel from "../components/homePage/carousel";
import DisplayPart from "../components/homePage/displayPart";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../utlis/util";
export default function HomePage() {
  const userId  = localStorage.getItem("userId")
  const email = localStorage.getItem("email")
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const propertyTypes = [

    {
      type : "Apartment",
      url : "https://cdn-icons-png.flaticon.com/128/1018/1018525.png"
    },
    {
      type : "Serviced apartment",
      url :  "https://cdn-icons-png.flaticon.com/128/10335/10335280.png"
    },
    {
      type : "Nature lodge",
      url : "https://cdn-icons-png.flaticon.com/128/868/868459.png"
    },
    {
      type : "House",
      url : "https://cdn-icons-png.flaticon.com/128/845/845022.png"
    },
    {
      type : "Bed and breakfast",
      url :  "https://cdn-icons-png.flaticon.com/128/4289/4289212.png"
    },
    {
      type : "Condominium",
      url : "https://cdn-icons-png.flaticon.com/128/6001/6001679.png"
    },
    {
      type : "Guest suite",
      url : "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg"
    },
    {
      type : "Loft",
      url : "https://cdn-icons-png.flaticon.com/128/2243/2243662.png"
    },
    {
      type : "Hostel",
      url : "https://cdn-icons-png.flaticon.com/128/895/895477.png"
    },
    {
      type : "Boat",
      url :  "https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg"
    },
    {
      type : "Aparthotel",
      url : "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg"
    },
    {
      type : "Townhouse",
      url : "https://cdn-icons-png.flaticon.com/128/1648/1648641.png"
    },
    {
      type : "Boutique hotel",
      url : "https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg"
    },
    {
      type : "Guesthouse",
      url :  "https://cdn-icons-png.flaticon.com/128/8330/8330750.png"
    },
    {
      type : "Other",
      url : "https://a0.muscache.com/pictures/33dd714a-7b4a-4654-aaf0-f58ea887a688.jpg"
    },
    {
      type : "Villa",
      url : "https://a0.muscache.com/pictures/48b55f09-f51c-4ff5-b2c6-7f6bd4d1e049.jpg"
    }
  ];
  const filterType = useSelector((state) => state.HomePage.value.hotelList);
  console.log(filterType)
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const handleClick = () => {
    setOpen(!open);
  };
  const navigateToSignIn = () => {
    navigate("/register")
  }
  const navigateToLoginIn = () => {
    navigate("/login")
  }
  // useEffect(() => {
    
  //   dispatch(fetchData());
  // }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    if (verifyToken(token, userId, email)) navigate("/login");
      
      dispatch(fetchData());
  }, []);
  return (
    <div className="homePage-container">
      <div className="header">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaG9lNCdRENRAOn3TWtK_7epBLUW64gO4fBPzaHvS8VglfaeGfFfxBdvb2yMBPA-E7cUY&usqp=CAU" />
        <div className="border p-2 rounded-pill" style={{ cursor: "pointer" }}>
          <div className="anywhere">Anywhere</div>
          <div className="anywhere">Any week</div>
          <div>Add guests</div>
          <div className="search-icon">
            <BiSearch />
          </div>
        </div>
        <div>
          <div style={{ cursor: "pointer" }}>Switch to hosting</div>
          <div style={{ cursor: "pointer" }}>
            <FiGlobe />
          </div>
          <Button
            className="border rounded-pill p-2 btn btn-light profile-btn"
            onClick={handleClick}
          >
            <span className="ps-2">
              <AiOutlineMenu />
              <span className="ps-2 pe-2 pt-3 pb-3" style={{fontSize: "1.3rem"}}>
                {
                  email ?<span style={{color:"white",backgroundColor:"black",padding:"0 0.4rem 0 0.4rem",borderRadius:"50%"}}>{email[0]}</span>  :   <HiUserCircle/>
                } 
                </span>
            </span>
          </Button>
        </div>
      </div>

      <div className={`${open ? "profile-menu" : "profile-menu-disable"}`}>
        {
          token ? 
          <span>
             <li>Messages</li>
            <li>Notifications</li>
            <li>Trips</li>
            <li>Wishlists</li>
            <li>Manage listings</li>
            <li>Refer a host</li>
            <li>Account</li>
            <li>Logout</li>
          </span>
          :
          <span>
            <li onClick={navigateToSignIn}>Sign up</li>
            <li onClick={navigateToLoginIn}>Log in</li>
            <li>Airbnb your home</li>
            <li>Help Center</li>
          </span>
        
        }
       
      </div>

     
      <Carousel data={propertyTypes}/>
     
    </div>
  );
}
