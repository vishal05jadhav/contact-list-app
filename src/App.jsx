import { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./componants/Navbar";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { IoIosContact, IoMdTrash } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

import { db } from "./config/firbase";
import ContactCard from "./componants/ContactCard";
import Model from "./componants/Model";
import AddAndUpdate from "./componants/AddAndUpdate";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [contact, setContact] = useState([]);
  const [isOpen, setIsopen] = useState(false);

  const onOpen = () => {
    setIsopen(true);
  };
  const onClose = () => {
    setIsopen(false);
  };
 
  const searchContact = (e)=>{
    let value = e.target.value
    const contactsRef = collection(db, "contact");
    onSnapshot(contactsRef, (snapshot) => {
      const conactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const searchContact = conactList.filter((contact)=> contact.name.toLowerCase().includes(value.toLowerCase()))
      setContact(searchContact);
      return searchContact;
    });
   
  }

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contact");

        onSnapshot(contactsRef, (snapshot) => {
          const conactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContact(conactList);
          return conactList;
        });
       
      } catch (error) {
        console.error(error);
      }
    };
    getContacts();
  }, []);
  return (
    <>
      <div className="mx-auto max-w-[370px] px-4 ">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <IoSearchSharp className="text-white text-3xl absolute ml-1" />
            <input
            onChange={searchContact}
              type="text"
              className=" bg-transparent border border-white rounded-md h-10 outline-none flex-grow text-white pl-9"
            />
          </div>
          <FaPlusCircle
            onClick={onOpen}
            className="text-[40px] text-white cursor-pointer"
          />
        </div>
        <div className="">
          {contact.map((contacts) => (
            <ContactCard key={contacts.id} contacts={contacts} />
          ))}
        </div>
      </div>
      <AddAndUpdate onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center"/>
    </>
  );
}

export default App;
