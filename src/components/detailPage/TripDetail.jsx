import "leaflet/dist/leaflet.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarIcon from "@mui/icons-material/Star";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import axios from "axios";

const sections = ["Overview", "Iternary", "Map", "Calendar", "Review"];
const offers = [
  "Accommodation",
  "An expert Tour Guide and professional Driver",
  "Meals (except Lunch)",
  "Hotel pickup and drop-off",
];
const notOffers = [
  "Priority access to attractions",
  "Gratuities (optional when checking out or after tour)",
  "No wine or alcohol allow",
];

const TripDetail = ({ tour, onDateSelect, user }) => {
  const details = tour.description ? tour.description.split("\n\n") : [];
  console.log(tour);
  const [open, setOpen] = useState(null);
  const [openAll, setOpenAll] = useState(false);
  const [section, setSection] = useState("Overview");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const events =
    tour?.startDates?.flatMap((isoDate) => {
      const start = new Date(isoDate);
      const days = tour.duration || 1;

      return Array.from({ length: days }).map((_, i) => {
        const nextDate = new Date(start);
        nextDate.setDate(start.getDate() + i);
        return {
          title: `Tour Day ${i + 1}`,
          date: nextDate.toISOString().split("T")[0],
          color: "#09D1C7",
        };
      });
    }) || [];

  useEffect(() => {
    if (!tour?._id) return; // Prevents request if _id is undefined

    const fetchReview = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/tours/${tour._id}/reviews`
        );
        const reviews = response.data?.data?.reviews || [];
        setReviews(reviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]);
      }
    };

    fetchReview();
  }, [tour?._id]);

  //! Handle date select
  const handleDateClick = (info) => {
    onDateSelect(info.dateStr);
  };

  //! Handle review
  const handleClick = () => {
    if (!user) {
      alert("Please login to leave a review");
      return;
    }
  };
  return (
    <div>
      <div className="flex justify-between gap-2">
        {sections.map((el, i) => (
          <button
            key={i}
            className="flex-1 px-[6px] py-[12px] text-[20px] border-2 rounded-full bg-primary_4"
            onClick={() => {
              setSection(el);
            }}
          >
            {el}
          </button>
        ))}
      </div>
      {section == "Overview" && (
        <div className="pt-[24px]">
          <span className="text-[28px] font-bold">Overview</span>
          <div
            className="text-[18px] py-[12px]"
            style={{ wordSpacing: "0.2em" }}
          >
            {details.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          <div>
            <div className="text-[28px] font-bold">What's included</div>
            {offers.map((el, i) => (
              <div
                key={i}
                className="flex items-center text-[18px] gap-2 py-[5px]"
              >
                <div>
                  <CheckIcon color="primary" />
                </div>
                <div>{el}</div>
              </div>
            ))}
            {notOffers.map((el, i) => (
              <div
                key={i}
                className="flex items-center text-[18px] gap-2 py-[5px]"
              >
                <div>
                  <CloseIcon color="error" />
                </div>
                <div>{el}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {section == "Iternary" && (
        <div className="pt-[24px]">
          <span className="text-[28px] font-bold">Iternary</span>
          <div
            className="text-[18px] py-[12px]"
            style={{ wordSpacing: "0.2em" }}
          >
            {tour?.longSummary}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[25px] font-bold">Plan</span>
            <span
              className="text-[18px] text-[#728156] font-bold cursor-pointer"
              onClick={() => {
                setOpenAll(!openAll);
              }}
            >
              Open all
            </span>
          </div>
          <ol className="relative border-s border-gray-200 dark:border-gray-700 mt-4">
            {tour?.locations?.map((location, index) => (
              <li
                className="mb-10 ms-4 cursor-pointer"
                key={index}
                onClick={() => {
                  setOpen(open === index ? null : index);
                }}
              >
                <div className="mb-5 hover:text-[#0C6478] cursor-pointer">
                  <div className="border-t-2 border-dotted border-gray-300 my-4"></div>
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <div className="flex items-center gap-4">
                    <time className=" ml-2 text-lg font-normal leading-none border-2 border-gray-300 rounded-full px-3 py-1 text-[#0C6478]">
                      Day {index + 1}
                    </time>
                    <h3 className="text-lg font-semibold">{location.title}</h3>
                  </div>
                </div>
                {(openAll || open === index) && (
                  <div className="pl-3">{location.description}</div>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
      {section == "Map" && (
        <div className="pt-[24px] relative z-0">
          <span className="text-[28px] font-bold">Map</span>
          {tour?.startLocation?.coordinates && (
            <div
              className="text-[18px] py-[12px]"
              style={{ wordSpacing: "0.2em" }}
            >
              <MapContainer
                center={tour.startLocation.coordinates}
                zoom={13}
                scrollWheelZoom={false}
                className="h-[600px]"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={tour.startLocation.coordinates}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          )}
        </div>
      )}
      {section == "Calendar" && (
        <div className="pt-[24px]">
          <span className="text-[28px] font-bold">Calendar</span>
          <div style={{ maxWidth: "900px", margin: "auto" }}>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              dateClick={handleDateClick}
              selectable={true}
              dayCellDidMount={(arg) => {
                const today = new Date();
                const cellDate = new Date(arg.date);

                // Disable past dates by making them less opaque and non-clickable
                if (cellDate < new Date(today.toDateString())) {
                  arg.el.style.opacity = "0.6";
                  arg.el.style.pointerEvents = "none";
                } else {
                  // Change cursor to pointer for selectable dates
                  arg.el.style.cursor = "pointer";
                }
              }}
            />
          </div>
        </div>
      )}
      {section == "Review" && (
        <div className="pt-[24px]">
          <span className="text-[28px] font-bold">Reviews</span>
          <div
            className="text-[18px] py-[12px]"
            style={{ wordSpacing: "0.2em" }}
          >
            <div className="flex flex-col bg-gray-200 rounded-2xl px-5 py-5 my-10">
              <div className="flex items-center justify-center text-[40px] gap-4">
                <StarIcon fontSize="large" className="text-yellow-500" />
                <span>{tour.ratingsAverage} / 5</span>
              </div>

              <div className="text-center">
                {tour.ratingsQuantity} verified reviews
              </div>
            </div>
            {reviews.map((review, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <div className="pt-[24px]">
                  <AccountCircleIcon fontSize="large" />
                </div>
                <div className="bg-gray-200 rounded-2xl px-5 py-5">
                  <div className="font-bold">{review.user.name}</div>
                  <div className="text-[16px]">
                    {new Date(review.createAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <p className="mt-3 mb-4">{review.review}</p>
                </div>
              </div>
            ))}
          </div>
          <span className="text-[28px] font-bold">Leave your review</span>
          <div className="mb-6">
            <textarea
              placeholder="Write your review here"
              rows="5"
              className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg text-base resize-none"
              onChange={(e) => {
                setNewReview(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className="bg-primary_4 hover:bg-primary_2 hover:text-white p-2 px-3 text-[18px] rounded-2xl"
              onClick={handleClick}
            >
              Post a review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripDetail;
