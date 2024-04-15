import React from "react";
import { IoIosContact } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { IoMdTrash } from "react-icons/io";
import { db } from "../config/firbase";
import { deleteDoc, doc } from "firebase/firestore";
import AddAndUpdate from "./AddAndUpdate";
import { useState } from "react";
import { toast } from "react-toastify";
// eslint-disable-next-line react/prop-types
function ContactCard({ contacts }) {
  const [isOpen, setIsopen] = useState(false);

  const onOpen = () => {
    setIsopen(true);
  };
  const onClose = () => {
    setIsopen(false);
  };

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contact", id));
      toast.success("contact deleted sucsessfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div
        key={contacts.id}
        className=" flex justify-between  items-center py-2 pl-2 pr-2 bg-yellow mt-2 mr-2 rounded-xl "
      >
        <div className="flex gap-2">
          <IoIosContact className="text-orange text-4xl" />
          <div className="text-black">
            <h1 className="font-medium">{contacts.name}</h1>
            <p className="text-sm">{contacts.email}</p>
          </div>
        </div>

        <div className="flex text-3xl">
          <CiEdit onClick={onOpen} className="cursor-pointer " />
          <IoMdTrash
            onClick={() => {
              deleteContact(contacts.id);
            }}
            className="text-orange"
          />
        </div>
      </div>
      <AddAndUpdate contacts={contacts} isUpdate isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default ContactCard;
