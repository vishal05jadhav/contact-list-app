import  { useState } from 'react'

const usedesclose =()=> {
    // const [isOpen, setIsopen] = useState(false);
    const [isOpen,setIsopen]= useState(false);

    const onOpen = () => {
      setIsopen(true);
    };
    const onClose = () => {
      setIsopen(false);
    };
  return (onClose,onOpen,isOpen)
}

export default usedesclose;