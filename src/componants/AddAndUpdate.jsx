import React from "react";
import Model from "./Model";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { db } from "../config/firbase";
import { addDoc, collection,doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import * as Yup from "yup"

const contactScemaValidation = Yup.object().shape({
  name:Yup.string().required("Name is reqired"),
  email:Yup.string().email("Invalid Email").required("email is reqired")
})



function AddAndUpdate({ isOpen, onClose ,isUpdate, contacts }) {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contact");
      await addDoc(contactRef, contact);
      toast.success("contact add successfully")
      onClose()
    } catch (error) {
      console.error(error);
    }
  };
  const updateContact = async (contact,id) => {
    try {
      const contactRef = doc(db, "contact" ,id);
      await updateDoc(contactRef, contact)
      toast.success("contact add update")
      onClose()
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Model isOpen={isOpen} onClose={onClose}>
        <Formik
        validationSchema={contactScemaValidation}
          initialValues={
          isUpdate
        ? { 
           name: contacts.name,
           email: contacts.email,
         }
         :{
            name:"",
            email:""
         }
                      
          }
          onSubmit={(values) => {
            console.log(values);
            isUpdate?  updateContact(values,contacts.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col w-full flex-wrap">
            <div className="flex flex-col gap-1 mt-4 ml-10">
              <label htmlFor="name">name</label>
              <Field name="name" className="border bottom-4 h-10 " />
              <div className="text-xs text-red-500">
                <ErrorMessage name="name"/>
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-4 ml-10">
              <label htmlFor="name">email</label>
              <Field type="email" name="email" className="border h-10 " />
              <div className="text-xs text-red-500">
                <ErrorMessage name="email"/>
              </div>
            </div>
            <button className="bg-orange px-3 py-1.5 border mt-3 ml-10 self-end rounded-lg hover:bg-green-500 ">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Model>
    </div>
  );
}

export default AddAndUpdate;
