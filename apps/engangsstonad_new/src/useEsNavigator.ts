import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export enum Path {
    VELKOMMEN = '/',
    SØKERSITUASJON = '/soknad/søkersituasjon',
    OM_BARNET = '/soknad/om-barnet',
    UTENLANDSOPPHOLD = '/soknad/utenlandsopphold',
    NESTE_UTENLANDSOPPHOLD = '/soknad/neste-utenlandsopphold',
    SISTE_UTENLANDSOPPHOLD = '/soknad/siste-utenlandsopphold',
    OPPSUMMERING = '/soknad/oppsummering',
    KVITTERING = '/kvittering',
}

const getPreviousStepHref = (path?: Path): string => {
    let href;
    switch (path) {
        case Path.VELKOMMEN:
            href = '';
            break;
        case Path.SØKERSITUASJON:
            href = Path.VELKOMMEN;
            break;
        case Path.OM_BARNET:
            href = Path.SØKERSITUASJON;
            break;
        /* case 'utenlandsopphold':
            href = '/soknad/om-barnet';
            break;
        case 'sisteUtenlandsopphold':
            href = '/soknad/siste-utenlandsopphold';
            break;
        case 'nesteUtenlandsopphold':
            href = '/soknad/neste-utenlandsopphold';
            break;
        case 'oppsummering':
            href = '/soknad/utenlandsopphold';
            break; */
        default:
            throw new Error('Unreachable code');
    }
    return href;
};

const getNextStepHref = (path?: Path): string => {
    let href;
    switch (path) {
        case Path.VELKOMMEN:
            href = Path.SØKERSITUASJON;
            break;
        case Path.SØKERSITUASJON:
            href = Path.OM_BARNET;
            break;
        /* case 'omBarnet':
            href = '/soknad/søkersituasjon';
            break;
        case 'utenlandsopphold':
            href = '/soknad/om-barnet';
            break;
        case 'sisteUtenlandsopphold':
            href = '/soknad/siste-utenlandsopphold';
            break;
        case 'nesteUtenlandsopphold':
            href = '/soknad/neste-utenlandsopphold';
            break;
        case 'oppsummering':
            href = '/soknad/utenlandsopphold';
            break; */
        default:
            throw new Error('Unreachable code');
    }
    return href;
};

const useEsNavigator = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = Object.values(Path).find((v) => v === decodeURIComponent(location.pathname));

    // TODO Må av og til sjå på context for å finna ut kor ein skal gå tilbake
    const previousStepHref = useMemo(() => getPreviousStepHref(path), [path]);

    const goToNextStep = useCallback(() => {
        // TODO For Enkelte sider må ein sjekka context for å finna ut kor ein skal gå
        // TODO Må ha reglar for om ein skal resette noko gitt kor ein skal gå og kva som er satt fra før
        navigate(getNextStepHref(path));
    }, [navigate, path]);

    const avbrytSøknad = useCallback(() => {
        // TODO Resett context
        navigate(Path.VELKOMMEN);
    }, []);

    return {
        previousStepHref,
        goToNextStep,
        avbrytSøknad,
    };
};

export default useEsNavigator;
