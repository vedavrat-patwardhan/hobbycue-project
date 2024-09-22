import React, { useEffect, useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProfileForm from "../ProfileForm";
import AddCardPopup from "./AddCardPopup";
import AddressPopup from "./AddressPopup";
import { useForm } from "../useForm";
import * as Services from "../../Service/Services";
import Controls from "../Controls/Controls";

export default function AddressAndPayment({
  mobile,
  addressesData,
  cardData,
  setUpdate,
}) {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const [newAddressOpen, setNewAddressOpen] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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
    setUpdate(true);
    setEditAddressValues([...newVal]);
  };
  const saveNewAddress = () => {
    if (validateNewAddress()) {
      Services.addressService.addAddress({ address: newAddressValues }, token);
      setEditAddressValues([...editAddressValues, newAddressValues]);
      setNewAddressValues(newAddress);
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

  //-----------------------------------------------------------------------Card-----------------------------------------------//

  const [newCardOpen, setNewCardOpen] = useState(false);
  const [editCardOpen, setEditCardOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const newCard = {
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    nameOnCard: "",
    primary: false,
  };
  const {
    values: newCardValues,
    handleInput: newCardInput,
    setValues: setNewCardValues,
    validateCard,
    cardType,
  } = useForm(newCard);

  const [newCardError, setNewCardError] = useState({});
  const validateNewCard = () => {
    let temp = {};
    temp.cardNumber = newCardValues.cardNumber
      ? validateCard(newCardValues.cardNumber)
        ? undefined
        : "Invalid"
      : "This field is required.";
    temp.nameOnCard = newCardValues.nameOnCard
      ? undefined
      : "This field is required.";
    setNewCardError({ ...temp });
    return Object.values(temp).every((x) => x === undefined);
  };

  const editCardData = [];
  const {
    values: editCardValues,
    setValues: setEditCardValues,
    handleArr: editCardInput,
  } = useForm(editCardData);
  const [cardMenu, setCardMenu] = useState(
    Array(editCardValues.length).fill(false)
  );
  const [editCardError, setEditCardError] = useState({});
  const validateEditedCard = (index) => {
    let temp = {};
    temp.cardNumber = editCardValues[index].cardNumber
      ? validateCard(editCardValues[index].cardNumber)
        ? undefined
        : "Invalid"
      : "This field is required.";
    temp.nameOnCard = editCardValues[index].nameOnCard
      ? undefined
      : "This field is required.";
    setEditCardError({ ...temp });
    return Object.values(temp).every((x) => x === undefined);
  };
  const cardOptions = (state, index) => {
    setCardIndex(index);
    let newVal = Array(editCardValues.length).fill(false);
    newVal[index] = state;
    setCardMenu([...newVal]);
  };
  const deleteCard = (index) => {
    const id = editCardValues[index]._id;
    Services.paymentService.delete({ cardId: id }, token);
    const newVal = [...editCardValues];
    newVal.splice(index, 1);
    setEditCardValues([...newVal]);
    setUpdate(true);
  };
  const handlePrimaryPayment = (index) => {
    const id = editCardValues[index]._id;
    let newVal = [...editCardValues];
    newVal.forEach((val) => {
      val.primary = false;
    });
    newVal[index] = { ...newVal[index], primary: true };
    Services.paymentService.setPrimaryCard(
      {
        cardId: id,
      },
      token
    );
    setUpdate(true);
    setEditCardValues([...newVal]);
  };
  const saveNewCard = () => {
    if (validateNewCard()) {
      Services.paymentService.addCard(newCardValues, token);
      setUpdate(true);
      setEditCardValues([...editCardValues, newCardValues]);
      setNewCardValues(newCard);
      return true;
    }
    return false;
  };
  const saveEditedCard = () => {
    if (validateEditedCard(cardIndex)) {
      Services.paymentService.updateCard(
        {
          ...editCardValues[cardIndex],
          cardId: editCardValues[cardIndex]._id,
        },
        token
      );
      setUpdate(true);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (addressesData !== null) {
      setEditAddressValues(addressesData);
      setAddressMenu(Array(addressesData.length).fill(false));
    }
    if (cardData !== null) {
      setEditCardValues(cardData);
      setCardMenu(Array(cardData.length).fill(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressesData]);

  return (
    <>
      <div className={`df-ac-jb ${mobile ? "m-b-16" : "m-b-24"}`}>
        <span className="main-profile__heading">Addresses</span>
        <button
          className="main-profile__btn"
          onClick={() => {
            setNewAddressOpen(true);
          }}
        >
          + add new location
        </button>
      </div>
      {editAddressValues.map((address, index) => {
        return (
          <div
            key={index}
            className={
              address.primary
                ? "selected__address"
                : mobile
                ? "p-l-8 m-b-12"
                : "p-l-8 m-b-24"
            }
          >
            <div className="df-ac-jb">
              <Controls.Checkbox
                name="primaryAddress"
                uncheck={<RadioButtonUncheckedIcon fontSize="small" />}
                check={<RadioButtonCheckedIcon fontSize="small" />}
                value={address.primary}
                onClick={() => handlePrimaryAddress(index)}
                label={address.label}
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
            <div className="hobbies__sub-address">
              {address.streetAddress +
                "\n" +
                address.city +
                " " +
                address.pincode +
                "\n" +
                address.state +
                ", " +
                address.country}
            </div>
          </div>
        );
      })}
      <hr
        className={`profile-page__main-sec__separator ${
          mobile ? "m-b-16" : "m-b-24"
        }`}
      />
      <div className={`df-ac-jb ${mobile ? "m-b-16" : "m-b-24"}`}>
        <span className="main-profile__heading">Payment Options</span>
        <button
          className="main-profile__btn"
          onClick={() => {
            setNewCardOpen(true);
          }}
        >
          + add a credit or debit card
        </button>
      </div>
      {editCardValues.map((payment, index) => {
        return (
          <div
            key={payment.cardNumber}
            className={
              payment.primary
                ? "selected__address"
                : mobile
                ? "p-l-8 m-b-12"
                : "p-l-8 m-b-24"
            }
          >
            <div className="df-ac-jb">
              <Controls.Checkbox
                name="primaryCard"
                uncheck={<RadioButtonUncheckedIcon fontSize="small" />}
                check={<RadioButtonCheckedIcon fontSize="small" />}
                value={payment.primary}
                onClick={() => handlePrimaryPayment(index)}
                label={cardType(payment.cardNumber)}
              />
              <Controls.Options
                open={cardMenu[index]}
                setOpen={cardOptions}
                index={index}
                data={[
                  <button
                    className="menu-drop__item"
                    onClick={() => {
                      cardOptions(!cardMenu[index], index);
                      setEditCardOpen(true);
                    }}
                  >
                    Edit
                  </button>,
                  <button
                    className="menu-drop__item"
                    onClick={() => {
                      cardOptions(!cardMenu[index], index);
                      deleteCard(index);
                    }}
                  >
                    Delete
                  </button>,
                ]}
                icon={<MoreVertIcon className="color--purple cursor-pointer" />}
                listClass={cardMenu[index] ? "menu-drop" : "menu-drop--hide"}
              />
            </div>
            <div className="hobbies__sub-address">
              {"Expire: " + payment.expiryMonth + "/" + payment.expiryYear}
            </div>
          </div>
        );
      })}
      <ProfileForm
        title="Add a credit or debit card"
        open={newCardOpen}
        setOpen={setNewCardOpen}
        data={
          <AddCardPopup
            values={newCardValues}
            handleInput={newCardInput}
            error={newCardError}
          />
        }
        handleClick={saveNewCard}
      />
      <ProfileForm
        title="Edit Card"
        open={editCardOpen}
        setOpen={setEditCardOpen}
        data={
          <AddCardPopup
            values={editCardValues[cardIndex]}
            handleInput={(e) => {
              editCardInput(e, cardIndex);
            }}
            error={editCardError}
          />
        }
        handleClick={saveEditedCard}
        onClose={() => {
          setEditCardValues([...cardData]);
        }}
      />
      <ProfileForm
        title="Location"
        open={newAddressOpen}
        setOpen={setNewAddressOpen}
        data={
          <AddressPopup
            values={newAddressValues}
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
            handleInput={(e) => {
              addressInput(e, currentIndex);
            }}
            error={editAddressError}
          />
        }
        handleClick={saveEditedAddress}
        onClose={() => {
          setEditAddressValues([...addressesData]);
        }}
      />
    </>
  );
}
