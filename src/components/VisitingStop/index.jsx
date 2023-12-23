import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AttractionsContext from "../../hooks/attraction";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const attractionSuggestionsMock = [
  {
    id: 1,
    name: "Hanoi Train Street",
    address: "3 Tran Phu Street, Cua Dong Ward, Hoan Kiem District, Hanoi",
    location: {
      latitude: 21.0301079,
      longitude: 105.844027,
    },
    description:
      "Ngõ 224 Lê Duẩn is a narrow alley in Hanoi’s Old Quarter, known as “The Train Street”, which sees a twice-daily train...",
    relatedPost: [
      {
        id: 1,
        title: "Best experience ever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
        author: {
          id: 1,
          avatarURL: null,
          name: "John Smith",
        },
        createdAt: "15/02/2023",
        noUpvotes: 12,
        noComments: 2,
        noTags: 3,
      },
    ],
  },
  {
    id: 2,
    name: "St. Joseph's Cathedral",
    address: "Nha Chung Street, Hoan Kiem District, Hanoi",
    description:
      "Ngõ 224 Lê Duẩn is a narrow alley in Hanoi’s Old Quarter, known as “The Train Street”, which sees a twice-daily train...",
    location: {
      latitude: 21.028841,
      longitude: 105.8491188,
    },
    relatedPost: [
      {
        id: 1,
        title: "Best experience ever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
        author: {
          id: 1,
          avatarURL: null,
          name: "John Smith",
        },
        createdAt: "15/02/2023",
        noUpvotes: 12,
        noComments: 2,
        noTags: 3,
      },
    ],
  },
  {
    id: 3,
    name: "L'etage Cafe",
    address: "9A Hang Khay Street, Hoan Kiem District, Hanoi",
    description:
      "Ngõ 224 Lê Duẩn is a narrow alley in Hanoi’s Old Quarter, known as “The Train Street”, which sees a twice-daily train...",
    location: {
      latitude: 21.0255073,
      longitude: 105.8527225,
    },
    relatedPost: [
      {
        id: 1,
        title: "Best experience ever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
        author: {
          id: 1,
          avatarURL: null,
          name: "John Smith",
        },
        createdAt: "15/02/2023",
        noUpvotes: 12,
        noComments: 2,
        noTags: 3,
      },
    ],
  },
  {
    id: 4,
    name: "Bach Mai Hospital",
    address: "78 Giải Phóng, Phương Mai, Đống Đa, Hà Nội",
    description:
      "Ngõ 224 Lê Duẩn is a narrow alley in Hanoi’s Old Quarter, known as “The Train Street”, which sees a twice-daily train...",
    location: {
      latitude: 21.0027402,
      longitude: 105.8392475,
    },
    relatedPost: [
      {
        id: 1,
        title: "Best experience ever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
        author: {
          id: 1,
          avatarURL: null,
          name: "John Smith",
        },
        createdAt: "15/02/2023",
        noUpvotes: 12,
        noComments: 2,
        noTags: 3,
      },
    ],
  },
  {
    id: 5,
    name: "West Lake",
    address:
      "614 đường Lạc Long Quân, phường Nhật Tân, quận Tây Hồ, thành phố Hà Nội",
    description:
      "Ngõ 224 Lê Duẩn is a narrow alley in Hanoi’s Old Quarter, known as “The Train Street”, which sees a twice-daily train...",
    location: {
      latitude: 21.053238,
      longitude: 105.8260943,
    },
    relatedPost: [
      {
        id: 1,
        title: "Best experience ever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
        author: {
          id: 1,
          avatarURL: null,
          name: "John Smith",
        },
        createdAt: "15/02/2023",
        noUpvotes: 12,
        noComments: 2,
        noTags: 3,
      },
    ],
  },
  {
    id: 6,
    name: "Long Bien Bridge",
    address: "2VV6+P92, Cầu Long Biên, Ngọc Thụy, Hoàn Kiếm, Hà Nội",
    description:
      "Ngõ 224 Lê Duẩn is a narrow alley in Hanoi’s Old Quarter, known as “The Train Street”, which sees a twice-daily train...",
    location: {
      latitude: 21.0417839,
      longitude: 105.8545026,
    },
    relatedPost: [
      {
        id: 1,
        title: "Best experience ever",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...",
        author: {
          id: 1,
          avatarURL: null,
          name: "John Smith",
        },
        createdAt: "15/02/2023",
        noUpvotes: 12,
        noComments: 2,
        noTags: 3,
      },
    ],
  },
];

const VisitingStop = () => {
  const [attrractionInput, setAttractionInput] = useState("");
  const [attractionSuggestions, setAttractionSuggestions] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);
  const [attractionDetails, setAttractionDetails] = useState(null);
  const [attractions, setAttractions] = useContext(AttractionsContext);
  const navigate = useNavigate();

  const getAttrationSuggestions = (text) => {
    // TODO: Call auto-suggestion API
    if (text === "") setAttractionSuggestions([]);
    else setAttractionSuggestions(attractionSuggestionsMock);
  };

  const getAttractionDetails = (attractionId) => {
    // TODO: Call detail API
    setAttractionDetails(
      attractionSuggestionsMock.find(
        (attraction) => attraction.id === attractionId
      )
    );
  };

  return (
    <div className="px-5 pt-10">
      <div className="flex justify-between items-center">
        <Link to={"/"} className="hover:text-blue-500">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        {attractionDetails && (
          <button
            onClick={() => {
              if (
                attractions.findIndex(
                  (attraction) => attraction.id === attractionDetails.id
                ) === -1
              ) {
                attractionDetails.shownOnMap = false;
                setAttractions([
                  ...attractions.filter(
                    (value) => value.id !== attractionDetails.id
                  ),
                  attractionDetails,
                ]);
              }

              navigate("/");
            }}
            className="bg-blue-500 text-white rounded-md hover:bg-blue-600 px-2 py-1"
          >
            <FontAwesomeIcon icon={faPlus} /> Add
          </button>
        )}
      </div>
      <div>
        <input
          value={attrractionInput}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onChange={(evt) => {
            setAttractionInput(evt.target.value);
            getAttrationSuggestions();
          }}
          placeholder="Where do you want to visit?"
          className="block w-full mt-3 outline-none border-b border-gray-300 focus:border-black"
        />
        <div>
          {attractionSuggestions.length !== 0 &&
            attractionSuggestions.map((suggestion) => (
              <div
                className="hover:cursor-pointer hover:bg-gray-200 p-2 border-x border-b border-gray-300"
                key={suggestion.id}
                onClick={() => {
                  getAttractionDetails(suggestion.id);
                  setInputFocused(false);
                }}
              >
                <h3 className="font-bold">{suggestion.name}</h3>
                <address>{suggestion.address}</address>
              </div>
            ))}
        </div>
        {attractionDetails && (
          <div className="mt-5">
            <h3 className="font-bold text-4xl">{attractionDetails.name}</h3>
            <p className="mt-1">{attractionDetails.description}</p>
            <address className="mt-2">
              <span className="font-bold">Address:</span>{" "}
              {attractionDetails.address}
            </address>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitingStop;
