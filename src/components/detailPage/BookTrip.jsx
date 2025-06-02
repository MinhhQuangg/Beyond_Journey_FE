import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { styles } from "../../styles";
import { format } from "date-fns";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Checkbox, Select } from "@mui/material";

const group = [
  "Elder (60+ y/o)",
  "Adult (20-59 y/o)",
  "Youth (15-19 y/o)",
  "Children (5-14 y/o)",
];

const fee = [
  { type: "Booking Service", price: "$30" },
  { type: "Cancel Insurance", price: "$50" },
];

const BookTrip = ({ selectedDate }) => {
  const [counts, setCounts] = useState({
    "Elder (60+ y/o)": 0,
    "Adult (20-59 y/o)": 0,
    "Youth (15-19 y/o)": 0,
    "Children (5-14 y/o)": 0,
  });

  const handleCountChange = (groupName, action) => {
    setCounts((prevCounts) => {
      const newCount =
        action === "increment"
          ? prevCounts[groupName] + 1
          : prevCounts[groupName] - 1;
      return {
        ...prevCounts,
        [groupName]: newCount >= 0 ? newCount : 0,
      };
    });
  };

  return (
    <div className="px-[32px]">
      <div className=" flex items-center py-[25px]">
        <div className={`${styles.searchHomePage} w-[60%] mx-auto`}>
          <span className="flex items-center">
            <CalendarMonthIcon />
            <div className="ml-2 text-center">
              {selectedDate ? selectedDate : "Date"}
            </div>
          </span>
        </div>
      </div>
      <div className="divide-y-2 divide-dashed">
        <div className="pb-[15px] font-bold">Time</div>
        <div>
          <div className="pt-[15px] font-bold">Tickets</div>
          {group.map((el, i) => (
            <div key={i} className="flex flex-col pt-[15px]">
              <div className="flex justify-between items-center">
                <div>{el}</div>
                <div>
                  <div className="flex items-center">
                    <div className="mr-2">{counts[el]}</div>
                    <div className="flex">
                      <button
                        className="text-black font-bold text-[20px] w-[30px] border-y-2 border-l-2 rounded-l-3xl border-black"
                        onClick={() => handleCountChange(el, "decrement")}
                      >
                        -
                      </button>
                      <button
                        className="text-black text-[20px] w-[30px] border-y-2 border-r-2 rounded-r-3xl border-black"
                        onClick={() => handleCountChange(el, "increment")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="pb-[15px]"></div>
        </div>
        <div>
          <div>
            <div className="pt-[15px] font-bold">Tickets</div>
            {fee.map((el, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Checkbox />
                    <div>{el.type}</div>
                  </div>
                  <div className="font-bold">{el.price}</div>
                </div>
              </div>
            ))}
            <div className="pb-[15px]"></div>
          </div>
        </div>
        <div className="flex justify-center items-center pt-[15px]">
          <button className="w-[80%] bg-primary_4 hover:bg-primary_2 hover:text-white p-2 text-[18px] rounded-2xl">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookTrip;
