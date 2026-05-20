import { useState } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const openModal = (modalData = null) => {
    setData(modalData);
    setIsOpen(true);
  };

  const closeModal = () => {
    setData(null);
    setIsOpen(false);
  };

  return {
    isOpen,
    data,
    openModal,
    closeModal,
  };
}