import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { set } from "react-hook-form";

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

const TripDetail = ({ tour }) => {
  const details = tour.description ? tour.description.split("@") : [];
  const [open, setOpen] = useState(null);
  const [openAll, setOpenAll] = useState(false);

  return (
    <div>
      <div className="flex justify-between gap-2">
        {sections.map((el, i) => (
          <button
            key={i}
            className="flex-1 px-[6px] py-[12px] text-[20px] border-2 rounded-full bg-primary_4"
          >
            {el}
          </button>
        ))}
      </div>
      <div className="pt-[24px]">
        <span className="text-[28px] font-bold">Overview</span>
        <div className="text-[18px] py-[12px]" style={{ wordSpacing: "0.2em" }}>
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
      <div className="pt-[24px]">
        <span className="text-[28px] font-bold">Iternary</span>
        <div className="text-[18px] py-[12px]" style={{ wordSpacing: "0.2em" }}>
          {details.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
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
      <div className="pt-[24px]">
        <span className="text-[28px] font-bold">Map</span>
        <div className="text-[18px] py-[12px]" style={{ wordSpacing: "0.2em" }}>
          {details.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <div className="pt-[24px]">
        <span className="text-[28px] font-bold">Calendar</span>
        <div className="text-[18px] py-[12px]" style={{ wordSpacing: "0.2em" }}>
          {details.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <div className="pt-[24px]">
        <span className="text-[28px] font-bold">Review</span>
        <div className="text-[18px] py-[12px]" style={{ wordSpacing: "0.2em" }}>
          {details.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
