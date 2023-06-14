import { useState, useEffect } from 'react';

const useFormikSubmit = (isSubmitting: boolean, isValid: boolean, onSubmit: () => void) => {
    const [wasSubmitting, setSubmittingForm] = useState<boolean>(isSubmitting);

    useEffect(() => {
        if (wasSubmitting === false && isSubmitting === true && isValid === true) {
            onSubmit();
        }

        setSubmittingForm(isSubmitting);
    }, [isSubmitting, isValid]);
};

export default useFormikSubmit;
