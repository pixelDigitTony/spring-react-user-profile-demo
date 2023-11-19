import { useState } from 'react';

const stateModal = (initialState = false) => {
    const [isOpen, setIsOpen] = useState<boolean>(initialState);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isVisible = () => {
        setIsOpen(true);
    };

    const isClosed = () => {
        setIsOpen(false);
    };

    const triggerLoading = () => {
        if(isOpen) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 5000);
        }
    }

    return {
        isOpen,
        isLoading,
        isVisible,
        triggerLoading,
        isClosed
    };
};

export default stateModal;
