import React, { useEffect, useRef, useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import ProfileForm from "../ProfileForm";
import AddressPopup from "./AddressPopup";
import { useForm } from "../useForm";
import * as Services from "../../Service/Services";
import Controls from "../Controls/Controls";
import { Typeahead } from "react-bootstrap-typeahead";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Hobbies({
  mobile,
  addressesData,
  hobbiesData,
  joinInStatus,
  profileCompletion,
  setProfileCompletion,
  setUpdate,
}) {
  const matches = useMediaQuery("(max-width:768px)");
  const token = JSON.parse(sessionStorage.getItem("token"));
  const [newAddressOpen, setNewAddressOpen] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const [addHobby, setAddHobby] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayAddress, setDisplayAddress] = useState([]);

  const newAddress = {
    streetAddress: "",
    society: "",
    locality: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    primary: false,
  };
  const {
    values: newAddressValues,
    handleInput: newAddressInput,
    setValues: setNewAddressValues,
  } = useForm(newAddress);
  const snackbarRef = useRef(null);
  const [newAddressError, setNewAddressError] = useState({});
  const validateNewAddress = () => {
    let temp = {};
    temp.label = newAddressValues.label ? undefined : "This field is required.";
    temp.city = newAddressValues.city ? undefined : "This field is required.";
    temp.state = newAddressValues.state ? undefined : "This field is required.";
    temp.country = newAddressValues.country
      ? undefined
      : "This field is required.";
    setNewAddressError({ ...temp });
    return Object.values(temp).every((x) => x === undefined);
  };

  const editAddressData = [];
  const {
    values: editAddressValues,
    setValues: setEditAddressValues,
    handleArr: addressInput,
  } = useForm(editAddressData);
  const [addressMenu, setAddressMenu] = useState(
    Array(editAddressValues.length).fill(false)
  );
  const [editAddressError, setEditAddressError] = useState({});
  const validateEditedAddress = (index) => {
    let temp = {};
    temp.label = editAddressValues[index].label
      ? undefined
      : "This field is required.";
    temp.city = editAddressValues[index].city
      ? undefined
      : "This field is required.";
    temp.state = editAddressValues[index].state
      ? undefined
      : "This field is required.";
    temp.country = editAddressValues[index].country
      ? undefined
      : "This field is required.";
    setEditAddressError({ ...temp });
    return Object.values(temp).every((x) => x === undefined);
  };
  const saveEditedAddress = () => {
    if (validateEditedAddress(currentIndex)) {
      Services.addressService.updateAddress(
        {
          addressId: editAddressValues[currentIndex]._id,
          address: editAddressValues[currentIndex],
        },
        token
      );
      setUpdate(true);
      return true;
    }
    return false;
  };
  const setMenu = (state, index) => {
    setCurrentIndex(index);
    let newVal = Array(editAddressValues.length).fill(false);
    newVal[index] = state;
    setAddressMenu([...newVal]);
  };
  const handlePrimaryAddress = (index) => {
    const id = editAddressValues[index]._id;
    let newVal = [...editAddressValues];
    newVal.forEach((val) => {
      val.primary = false;
    });
    newVal[index] = { ...newVal[index], primary: true };
    Services.addressService.setPrimaryAddress(
      {
        addressId: id,
      },
      token
    );
    setEditAddressValues([...newVal]);
    setUpdate(true);
  };
  const saveNewAddress = () => {
    if (validateNewAddress()) {
      Services.addressService.addAddress({ address: newAddressValues }, token);
      setEditAddressValues([...editAddressValues, newAddressValues]);
      //setDisplayAddress([...editAddressData, newAddressValues]);
      setNewAddressValues(newAddress);
      if (joinInStatus) {
        setProfileCompletion((parseInt(profileCompletion) + 20).toString());
        sessionStorage.setItem("joinIn", null);
      }
      setUpdate(true);
      return true;
    }
    return false;
  };
  const deleteAddress = (index) => {
    const id = editAddressValues[index]._id;
    Services.addressService.deleteAddressId(id, token);
    const newVal = [...editAddressValues];
    newVal.splice(index, 1);
    setEditAddressValues([...newVal]);
    setUpdate(true);
  };

  //-------------------------------------Hobbies-------------------------------------//

  const [openNewHobby, setOpenNewHobby] = useState(false);
  const [hobbies, setHobbies] = useState([]);
  const [selection, setSelection] = useState([]);
  const selectHobbies = (hobby) => {
    if (Array.isArray(hobby)) {
      setSelection(hobby);
      setNewHobbyValues({ ...newHobbyValues, hobby: hobby[0] });
    } else {
      setNewHobbyValues({ ...newHobbyValues, hobby });
    }
  };
  useEffect(() => {
    Services.hobbyService.getHobby(setHobbies);
  }, []);
  const myHobbies = [];
  const { values: myHobbiesValues, setValues: myHobbiesSetValues } =
    useForm(myHobbies);
  const newHobbyData = {
    hobby: "",
    level: "Beginner",
  };
  const { values: newHobbyValues, setValues: setNewHobbyValues } =
    useForm(newHobbyData);
  const addNewHobby = () => {
    if (
      hobbies.find(
        (hobby) => hobby.toLowerCase() === newHobbyValues.hobby.toLowerCase()
      ) === undefined
    ) {
      newHobbyValues.hobby !== "" && setOpenNewHobby(true);
    } else if (
      myHobbiesValues.some(
        (obj) => obj.hobby.toLowerCase() === newHobbyValues.hobby.toLowerCase()
      )
    ) {
      snackbarRef.current.show();
      setNewHobbyValues(newHobbyData);
      setSelection([]);
    } else {
      myHobbiesValues.length === 0 &&
        setProfileCompletion((parseInt(profileCompletion) + 20).toString());
      Services.hobbyService.addHobby(newHobbyValues, token);
      myHobbiesSetValues([...myHobbiesValues, newHobbyValues]);
      setNewHobbyValues(newHobbyData);
      setSelection([]);
      setUpdate(true);
    }
    return true;
  };
  const [hobbyTableLevels, setHobbyTableLevels] = useState(
    Array(myHobbiesValues.length).fill(false)
  );
  const setEditedHobby = (state, index) => {
    let newVal = Array(myHobbiesValues.length).fill(false);
    newVal[index] = state;
    setHobbyTableLevels([...newVal]);
  };
  const updateHobbyLevel = (index, level) => {
    const id = myHobbiesValues[index]._id;
    Services.hobbyService.updateHobby({ hobbyId: id, level }, token);
    let newVal = myHobbiesValues;
    newVal[index].level = level;
    myHobbiesSetValues([...newVal]);
    setUpdate(true);
  };
  const deleteHobby = (index) => {
    const id = myHobbiesValues[index]._id;
    Services.hobbyService.deleteHobbyId(id, token);
    let newVal = [...myHobbiesValues];
    newVal.splice(index, 1);
    myHobbiesSetValues([...newVal]);
    setUpdate(true);
  };
  useEffect(() => {
    if (addressesData !== null) {
      setEditAddressValues(addressesData);
      setDisplayAddress(addressesData);
      setAddressMenu(Array(addressesData.length).fill(false));
    }
    if (hobbiesData !== null) {
      myHobbiesSetValues(hobbiesData);
      setHobbyTableLevels(Array(hobbiesData.length).fill(false));
    }
    if (joinInStatus) {
      setNewAddressOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <span className="main-profile__small-txt m-b-8">
        Your personalized Cues will depend on these choices.
      </span>
      <div className="df-ac-jb m-b-24">
        <span className="main-profile__heading">Primary Location</span>
        <button
          className="main-profile__btn"
          onClick={() => {
            setNewAddressOpen(true);
          }}
        >
          + add new location
        </button>
      </div>
      {displayAddress.map((displayAdd, index) => {
        return (
          <div className="df-ac-jb" key={index}>
            <Controls.Checkbox
              name="primary"
              uncheck={<RadioButtonUncheckedIcon fontSize="small" />}
              check={<RadioButtonCheckedIcon fontSize="small" />}
              value={displayAdd.primary}
              onClick={() => handlePrimaryAddress(index)}
              label={displayAdd.label + ", " + displayAdd.city}
            />
            <Controls.Options
              open={addressMenu[index]}
              setOpen={setMenu}
              index={index}
              data={[
                <button
                  className="menu-drop__item"
                  onClick={() => {
                    setMenu(!addressMenu[index], index);
                    setEditAddressOpen(true);
                  }}
                >
                  Edit
                </button>,
                <button
                  className="menu-drop__item"
                  onClick={() => {
                    setMenu(!addressMenu[index], index);
                    deleteAddress(index);
                  }}
                >
                  Delete
                </button>,
              ]}
              icon={<MoreVertIcon className="color--purple cursor-pointer" />}
              listClass={addressMenu[index] ? "menu-drop" : "menu-drop--hide"}
            />
          </div>
        );
      })}
      <hr
        className="profile-page__main-sec__separator"
        style={{ margin: "1.5rem 0" }}
      />
      {!mobile && (
        <span className="main-profile__small-txt">
          Added hobbies appear in the table below.
        </span>
      )}
      <span className="main-profile__heading">Add Hobby</span>
      <div className={mobile ? "dfc m-t-16" : "df-ac-jb m-t-24"}>
        <Typeahead
          highlightOnlyResult={true}
          className="hobbies__search-hobby"
          id="basic-typeahead-single"
          labelKey="name"
          onChange={selectHobbies}
          onInputChange={selectHobbies}
          options={hobbies}
          placeholder="Choose a state..."
          selected={selection}
        />
        <Controls.Options
          open={addHobby}
          setOpen={setAddHobby}
          showSelected={newHobbyValues.level}
          titleClass={`new-hobby-drop ft-sz-14 ${
            mobile ? "" : "m-l-24 m-r-24"
          }`}
          listClass={
            addHobby ? "new-hobby-droplist" : "new-hobby-droplist--hide"
          }
          data={[
            <button
              className="menu-drop__item"
              onClick={() => {
                setAddHobby(false);
                setNewHobbyValues({ ...newHobbyValues, level: "Beginner" });
              }}
            >
              Beginner
            </button>,
            <button
              className="menu-drop__item"
              onClick={() => {
                setAddHobby(false);
                setNewHobbyValues({ ...newHobbyValues, level: "Intermediate" });
              }}
            >
              Intermediate
            </button>,
            <button
              className="menu-drop__item"
              onClick={() => {
                setAddHobby(false);
                setNewHobbyValues({ ...newHobbyValues, level: "Advanced" });
              }}
            >
              Advanced
            </button>,
          ]}
        />
        <button className="hobbies__add-hobby-btn" onClick={addNewHobby}>
          Add
        </button>
        {mobile && (
          <span className="main-profile__small-txt">
            Added hobbies appear in the table below.
          </span>
        )}
      </div>
      <hr
        className={`profile-page__main-sec__separator ${
          mobile ? "m-t-16 m-b-16" : "m-t-24 m-b-24"
        }`}
      />
      <span className="main-profile__heading main-profile__heading--required m-b-24">
        My Hobbies
      </span>
      <table className="hobby__table">
        <thead>
          <tr>
            <th>Hobby</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        {myHobbiesValues.map((hobby, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td>{hobby.hobby}</td>
                <td>
                  <Controls.Options
                    open={hobbyTableLevels[index]}
                    index={index}
                    setOpen={setEditedHobby}
                    showSelected={hobby.level}
                    titleClass="edit-level"
                    listClass={
                      hobbyTableLevels[index]
                        ? "edit-level-droplist"
                        : "new-hobby-droplist--hide"
                    }
                    data={[
                      <button
                        className="menu-drop__item"
                        onClick={() => {
                          setEditedHobby(!hobbyTableLevels[index], index);
                          updateHobbyLevel(index, "Beginner");
                        }}
                      >
                        Beginner
                      </button>,
                      <button
                        className="menu-drop__item"
                        onClick={() => {
                          setEditedHobby(!hobbyTableLevels[index], index);
                          updateHobbyLevel(index, "Intermediate");
                        }}
                      >
                        Intermediate
                      </button>,
                      <button
                        className="menu-drop__item"
                        onClick={() => {
                          setEditedHobby(!hobbyTableLevels[index], index);
                          updateHobbyLevel(index, "Advanced");
                        }}
                      >
                        Advanced
                      </button>,
                    ]}
                  />
                </td>
                <td>
                  <DeleteIcon
                    className={`color--purple cursor-pointer ${
                      matches ? "ft-sz-16" : "ft-sz-24"
                    }`}
                    onClick={() => {
                      deleteHobby(index);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
      <ProfileForm
        title={
          joinInStatus
            ? "Please set your Location and add at least one Hobby"
            : "Location"
        }
        open={newAddressOpen}
        setOpen={setNewAddressOpen}
        data={
          <AddressPopup
            values={newAddressValues}
            setValues={setNewAddressValues}
            handleInput={newAddressInput}
            error={newAddressError}
          />
        }
        handleClick={saveNewAddress}
      />
      <ProfileForm
        title="Edit Location"
        open={editAddressOpen}
        setOpen={setEditAddressOpen}
        data={
          <AddressPopup
            values={editAddressValues[currentIndex]}
            setValues={setEditAddressValues}
            handleInput={(e) => {
              addressInput(e, currentIndex);
            }}
            index={currentIndex}
            error={editAddressError}
          />
        }
        handleClick={saveEditedAddress}
      />
      <ProfileForm
        title="Request New Hobby"
        open={openNewHobby}
        setOpen={setOpenNewHobby}
        data={
          <div className="m-l-24">
            Would you like to request Admin to add{" "}
            <span className="ft-wt-600">{newHobbyValues.hobby}</span> as a new
            hobby?.
          </div>
        }
        handleClick={() => {
          setOpenNewHobby(false);
          setNewHobbyValues(newHobbyData);
        }}
        acceptTxt="Send"
      />
      <Controls.Snackbar
        ref={snackbarRef}
        message="This hobby is already added to your profile"
        type="failure"
      />
    </>
  );
}
