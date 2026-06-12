import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Fjernar `planleggerData` frå URL-en når brukaren landar på forsida frå
 * planleggjaren. Sjølve dataen er allereie lest inn i FpDataContext, og vi vil
 * ikkje at den skal henge att i adresselinja.
 */
export const useFjernPlanleggerDataFraUrl = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.has('planleggerData')) {
            const oppdatert = new URLSearchParams(searchParams);
            oppdatert.delete('planleggerData');
            setSearchParams(oppdatert, { replace: true });
        }
    }, [searchParams, setSearchParams]);
};
