import React, { useEffect, useState } from "react";

export default function SearchableDrop(props) {
  const { placeholder, list, values, setValues, name, className } = props;
  const [search, setSearch] = useState(values.hobby);
  const [selected, setSelected] = useState(false);
  const onChange = (e) => {
    setSearch(e.target.value);
    setValues({ ...values, [name]: e.target.value });
  };
  const handleClick = (e) => {
    setSearch(e.target.innerText);
    setValues({ ...values, [name]: e.target.innerText });
    setSelected(false);
  };
  useEffect(() => {
    setSearch(values.hobby);
  }, [values.hobby]);
  return (
    <div className="dfc width-100">
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={onChange}
        className={`color--black width-100 ${className}`}
        onFocus={() => setSelected(true)}
        onBlur={() => setTimeout(() => setSelected(false), 300)}
        onKeyDown={(e) => {
          console.log(e);
        }}
      />
      <ul
        className={`searchable-drop ${
          selected ? "searchable-drop--selected" : "searchable-drop--disabled"
        }`}
      >
        {list
          .filter((element) => {
            return element.toLowerCase().includes(search.toLowerCase());
          })
          .map((hobby, index) => {
            return (
              <li
                key={index}
                onClick={handleClick}
                className="p-a-12 searchable-drop__list"
              >
                {hobby}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
