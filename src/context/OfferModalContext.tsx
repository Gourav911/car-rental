import React, { createContext, useContext, useState } from 'react';
import LimitedTimeOfferModal from '../components/LimitedTimeOfferModal';

interface OfferModalContextType {
  openOfferModal: () => void;
}

const OfferModalContext = createContext<OfferModalContextType>({
  openOfferModal: () => {},
});

export const useOfferModal = () => useContext(OfferModalContext);

export const OfferModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openOfferModal = () => {
    setIsOpen(true);
  };

  const closeOfferModal = () => {
    setIsOpen(false);
  };

  return (
    <OfferModalContext.Provider value={{ openOfferModal }}>
      {children}
      <LimitedTimeOfferModal isOpen={isOpen} onClose={closeOfferModal} />
    </OfferModalContext.Provider>
  );
};
