import { createSelector } from 'reselect';
import {
    selectSituasjon,
    selectDekningsgrad,
    selectSøkerErAleneOmOmsorg,
    selectAnnenForelder,
    selectSøker,
    selectErEndringssøknad
} from './søknadSelector';
import { Søkersituasjon } from '../types/søknad/Søknad';
import { Dekningsgrad, NavnPåForeldre } from 'common/types';
import {
    selectFamiliehendelsesdato,
    selectErDeltUttak,
    selectErFlerbarnssøknad,
    selectSøkerErFarEllerMedmor,
    selectSøkerErMor,
    selectMorHarAleneomsorg,
    selectFarEllerMedmorHarRett,
    selectFarEllerMedmorHarAleneomsorg,
    selectMorHarRett,
    selectErFødsel,
    selectMorErUfør
} from './utledetSøknadsinfoSelectors';
import { selectSøkerinfo } from './apiSelector';
import { Søker } from '../types/søknad/Søker';
import AnnenForelder from '../types/søknad/AnnenForelder';
import Person from '../types/Person';
import { getErSøkerFarEllerMedmor } from '../util/domain/personUtil';
import { Navn } from '../types/common';
import { Uttaksdatoer } from './types';
import { getUttaksdatoer } from '../util/uttaksplan/uttaksdatoer';

export interface Søknadsinfo {
    søknaden: OmSøknaden;
    navn: NavnISøknaden;
    annenForelder: OmAnnenForelder;
    søker: OmSøker;
    mor: OmMor;
    farMedmor: OmFarMedmor;
    uttaksdatoer: Uttaksdatoer;
}

interface OmSøknaden {
    saksnummer?: string;
    situasjon: Søkersituasjon;
    familiehendelsesdato: Date;
    dekningsgrad: Dekningsgrad | undefined;
    erFødsel: boolean;
    erDeltUttak: boolean;
    erFlerbarnssøknad: boolean;
    erEndringssøknad: boolean;
}

interface OmSøker {
    erMor: boolean;
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
}
interface OmAnnenForelder {
    harRett: boolean;
    erMor: boolean;
    erFarEllerMedmor: boolean;
}
interface OmMor {
    erUfør: boolean;
    harRett: boolean;
    erAleneOmOmsorg: boolean;
}

interface OmFarMedmor {
    harRett: boolean;
    erAleneOmOmsorg: boolean;
}

export interface NavnISøknaden {
    mor: Navn;
    søker: Navn;
    annenForelder: Navn;
    farMedmor: Navn;
    navnPåForeldre: NavnPåForeldre;
}

const selectOmSøknaden = createSelector(
    [
        selectSituasjon,
        selectFamiliehendelsesdato,
        selectDekningsgrad,
        selectErDeltUttak,
        selectErFlerbarnssøknad,
        selectErFødsel,
        selectErEndringssøknad
    ],
    (
        situasjon,
        familiehendelsesdato,
        dekningsgrad,
        erDeltUttak,
        erFlerbarnssøknad,
        erFødsel,
        erEndringssøknad
    ): OmSøknaden | undefined => {
        if (
            situasjon !== undefined &&
            familiehendelsesdato !== undefined &&
            erDeltUttak !== undefined &&
            erFlerbarnssøknad !== undefined &&
            erFødsel !== undefined &&
            erEndringssøknad !== undefined
        ) {
            return {
                situasjon,
                familiehendelsesdato,
                dekningsgrad,
                erDeltUttak,
                erFlerbarnssøknad,
                erFødsel,
                erEndringssøknad
            };
        }
        return undefined;
    }
);

const getNavn = ({ fornavn, etternavn }: { fornavn: string | undefined; etternavn: string | undefined }): Navn => {
    if (fornavn !== undefined && etternavn !== undefined) {
        return {
            fornavn,
            etternavn,
            navn: `${fornavn} ${etternavn}`
        };
    }
    return {
        fornavn: '',
        etternavn: '',
        navn: ''
    };
};

const selectOmSøker = createSelector(
    [selectSøkerErAleneOmOmsorg, selectSøkerErFarEllerMedmor, selectSøkerErMor],
    (erAleneOmOmsorg, erFarEllerMedmor, erMor): OmSøker => {
        return {
            erAleneOmOmsorg,
            erFarEllerMedmor,
            erMor
        };
    }
);

const selectOmMor = createSelector(
    [selectMorHarAleneomsorg, selectMorHarRett, selectMorErUfør],
    (erAleneOmOmsorg, harRett, erUfør): OmMor => {
        return {
            erAleneOmOmsorg: erAleneOmOmsorg === true,
            harRett: harRett === true,
            erUfør: erUfør === true
        };
    }
);

const selectOmFarMedmor = createSelector(
    [selectFarEllerMedmorHarRett, selectFarEllerMedmorHarAleneomsorg],
    (harRett, erAleneOmOmsorg): OmFarMedmor => {
        return {
            erAleneOmOmsorg: erAleneOmOmsorg === true,
            harRett: harRett === true
        };
    }
);

const selectOmAnnenForelder = createSelector(
    [selectAnnenForelder, selectSøkerErFarEllerMedmor],
    (annenForelder = {}, søkerErFarEllerMedmor): OmAnnenForelder => {
        return {
            harRett: annenForelder.harRettPåForeldrepenger === true,
            erFarEllerMedmor: søkerErFarEllerMedmor === false,
            erMor: søkerErFarEllerMedmor === true
        };
    }
);

const selectNavnISøknaden = createSelector(
    [selectSøkerinfo, selectSøker, selectAnnenForelder, selectSøkerErFarEllerMedmor],
    (søkerinfo, søker, annenForelder, søkerErFarEllerMedmor) => {
        if (
            søker !== undefined &&
            søkerinfo !== undefined &&
            annenForelder !== undefined &&
            søkerErFarEllerMedmor !== undefined
        ) {
            return getNavnISøknaden(søkerinfo.person, søker as Søker, annenForelder as AnnenForelder);
        }
        return undefined;
    }
);

const getNavnISøknaden = (søkerpersonalia: Person, søker: Søker, annenForelder: AnnenForelder): NavnISøknaden => {
    const erSøkerFarMedmor = getErSøkerFarEllerMedmor(søker.rolle);
    const navnSøker = getNavn(søkerpersonalia);
    const navnAnnenForelder = getNavn(annenForelder);
    const navnMor = erSøkerFarMedmor ? navnAnnenForelder : navnSøker;
    const navnFarMedmor = erSøkerFarMedmor ? navnSøker : navnAnnenForelder;
    return {
        søker: navnSøker,
        annenForelder: navnAnnenForelder,
        mor: navnMor,
        farMedmor: navnFarMedmor,
        navnPåForeldre: { mor: navnMor.fornavn, farMedmor: navnFarMedmor.fornavn }
    };
};

export const getSøknadsinfo = createSelector(
    [selectOmSøknaden, selectOmSøker, selectOmMor, selectOmFarMedmor, selectOmAnnenForelder, selectNavnISøknaden],
    (omSøknaden, omSøker, omMor, omFarMedmor, omAnnenForelder, navn): Søknadsinfo | undefined => {
        if (omSøknaden !== undefined && navn !== undefined) {
            return {
                søknaden: omSøknaden,
                søker: omSøker,
                mor: omMor,
                farMedmor: omFarMedmor,
                annenForelder: omAnnenForelder,
                navn,
                uttaksdatoer: getUttaksdatoer(omSøknaden.familiehendelsesdato)
            };
        }
        return undefined;
    }
);
