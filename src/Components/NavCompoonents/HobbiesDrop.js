import React from "react";

export default function HobbiesDrop({ matches }) {
  const sec1 = [
    {
      title: "Art",
      subTitle: ["Music", "Dancing", "Artwork", "Photography", "Theatre"],
    },
    {
      title: "Playing",
      subTitle: ["Games", "Sports"],
    },
    {
      title: "Making Things",
      subTitle: [
        "Clothing",
        "Cooking",
        "Gardening",
        "Building models",
        "Building a utility",
      ],
    },
  ];
  const sec2 = [
    {
      title: "Activity participation",
      subTitle: ["Animal", "Fitness", "Wellness", "Outdoor", "Travel"],
    },
    {
      title: "Collecting",
      subTitle: ["Record keeping", "Spotting"],
    },
    {
      title: "All hobbies",
      subTitle: ["Hobby challenges"],
    },
  ];
  const listing = (list) => {
    return list.map((element, index) => {
      return (
        <div key={index}>
          <div className="hobby-drop__heading m-b-16">{element.title}</div>
          {element.subTitle.map((subT, index) => {
            return (
              <div
                key={index}
                className="hobby-drop__sub-heading m-b-8 cursor-pointer"
              >
                {subT}
              </div>
            );
          })}
          {matches && list.length - 1 !== index && (
            <hr className="drop-separator m-t-8 m-b-8" />
          )}
        </div>
      );
    });
  };
  return (
    <div className="hobby-drop">
      <div className={matches ? "" : "df-as-jb m-b-32"}>{listing(sec1)}</div>
      {matches && <hr className="drop-separator m-t-8 m-b-8" />}
      <div className={matches ? "" : "df-as-jb"}>{listing(sec2)}</div>
    </div>
  );
}
