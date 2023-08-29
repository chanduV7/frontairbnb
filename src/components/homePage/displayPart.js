import { useSelector } from "react-redux/es/hooks/useSelector";
import "../../styles/displayPart.scss";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchHotelsByType, add } from "../../redux/slices/homePageSlice";
import { Link } from "react-router-dom";
export default function DisplayPart({ open }) {
  const dispatch = useDispatch();
  const fetchedData = useSelector((state) => state.HomePage.value.selectedType);
  const hotelListData = useSelector((state) => state.HomePage.value.hotelList);
  console.log(hotelListData);
  const [page, setPage] = useState(1);
  const loadMore = () => {
    setPage(page + 1);
    dispatch(
      fetchHotelsByType({
        name_id: fetchedData[1].property_type,
        page: page,
      })
    );
  };
  return (
    <div className="display-main">
      <div className="display-container">
        {fetchedData.length &&
          fetchedData.map((e) => {
            return (
              <Link to={"/room/" + e._id}>
                <div className="display-items">
                  <div className="imgDiv">
                    {" "}
                    <img src={e.picture_url} />
                  </div>

                  <div>
                    <div>{`${e.street}`}</div>
                    <div></div>
                  </div>
                  <div className="heartlogo">
                    <AiOutlineHeart />
                  </div>
                  <div>{`${e.price} night`}</div>
                  <div></div>
                  <div></div>
                </div>
              </Link>
            );
          })}

        {hotelListData.length &&
          hotelListData.map((e) => {
            return (
              <Link to={"/room/" + e._id}>
                <div
                  className={`${open ? "display-items" : "display-items-none"}`}
                >
                  <div className="imgDiv">
                    {" "}
                    <img src={e.picture_url} />
                  </div>
                  <div>
                    <div>{`${e.street}`}</div>
                    <div></div>
                  </div>
                  <div className="heartlogo">
                    <AiOutlineHeart />
                  </div>
                  <div>{`${e.price} night`}</div>
                  <div></div>
                  <div></div>
                </div>
              </Link>
            );
          })}
      </div>
      <div className="loadmore" onClick={loadMore}>
        Load More <HiOutlineChevronDoubleDown />
      </div>
    </div>
  );
}
