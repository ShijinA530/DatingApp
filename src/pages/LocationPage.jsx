import React, { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  InteractionIcon,
  MatchCardComponent,
  SubHeader,
  ButtonGroup,
  UserIcon,
} from "../Components";
import { Userdata } from "../datas/Userdata";
import { Link } from "react-router-dom";

const LocationPage = () => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [error, setError] = useState(null);
  const [nearByUsers, setNearByUsers] = useState([]);
  const hasFetchedLocation = useRef();

  const fetchLocation = () => {
    if (hasFetchedLocation.current) return;
    hasFetchedLocation.current = true;
    console.log("fetch location called");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        console.log(latitude, longitude);

        try {
          await axios.post(
            "http://localhost:5000/api/v1/users/getlocation",
            { latitude, longitude },
            { withCredentials: true }
          );
          const response = await axios.get(
            `http://localhost:5000/api/v1/users/findNearByUsers?latitude=${latitude}&longitude=${longitude}`,
            { withCredentials: true }
          );
          setNearByUsers(response.data);
          console.log(response.data);
        } catch (error) {
          setError(error.message);
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(true);
        }
      }
    );
  };

  useEffect(() => {
    // Check if Geolocation is available in the browser
    if (navigator.geolocation) {
      fetchLocation();
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  if (locationError) {
    return (
      <div>
        <p>
          Location services are disabled. Please enable location access to find
          nearby users.
        </p>
      </div>
    );
  }

  return (
    <section className="sm: w-screen md:w-full lg:w-full pt-5 px-5 pb-24 md:pb-5 h-screen overflow-y-auto overflow-x-hidden">
      <div>

        <div className="flex justify-between items-center gap-5 overflow-x-auto  lg:w-full sm: w-screen  ">

          <button>
            <UserIcon add={"purple"} />
            <p className="mt-0.5 text-[14px]">My Story</p>
          </button>
          {Userdata?.map((user, i) => (
            <button key={i}>
              <UserIcon key={user.id} story={true} url={user.img} />
              <p className="mt-0.5 text-[14px]">{user.firstName}</p>
            </button>
          ))}
        </div>
        <ButtonGroup />

        <SubHeader title="Location" />
        <InteractionIcon />
        <p className="text-text font-medium my-3 text-lg">
          Your Matches <span className="text-light-purple">42</span>
        </p>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-3 grid-cols-2 gap-5">
        {nearByUsers?.map((user, i) => (
          <Link to={`/profile/${user._id}`} key={i}>
            <MatchCardComponent
              isNew={false}
              img={user.profileImage.url}
              distance=""
              name={user.name}
              age={user.age}
              place={user.place}
              match={user.matchPercentage}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LocationPage;
