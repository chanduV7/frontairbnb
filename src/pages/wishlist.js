import { useEffect } from "react";
import { getWishList} from "../redux/slices/homePageSlice";
import { useDispatch } from "react-redux";

export default function Wishlist(){
    const dispatch = useDispatch()
    useEffect(() => {
        const userId = localStorage.getItem("userId")
       dispatch(getWishList({userId : userId}))
    },[])
    return(
        <div>
             
        </div>
    )
}