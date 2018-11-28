import { createSelector } from 'reselect';
import {
    selectSituasjon,
    selectDekningsgrad,
    selectSøkerErAleneOmOmsorg,
    selectAnnenForelder,
    selectSøker
} from './søknadSelector';
import { Søkersituasjon } from '../types/søknad/Søknad';
import { Dekningsgrad } from 'common/types';
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

const selectOmSøknaden = createSelector(
    [
        selectSituasjon,
        selectFamiliehendelsesdato,
        selectDekningsgrad,
        selectErDeltUttak,
        selectErFlerbarnssøknad,
        selectErFødsel
    ],
    (
        situasjon,
        familiehendelsesdato,
        dekningsgrad,
        erDeltUttak,
        erFlerbarnssøknad,
        erFødsel
    ): OmSøknaden | undefined => {
        if (
            situasjon !== undefined &&
            familiehendelsesdato !== undefined &&
            erDeltUttak !== undefined &&
            erFlerbarnssøknad !== undefined &&
            erFødsel !== undefined
        ) {
            return {
                situasjon,
                familiehendelsesdato,
                dekningsgrad,
                erDeltUttak,
                erFlerbarnssøknad,
                erFødsel
            };
        }
        return undefined;
    }
);

const getNavn = ({
    fornavn,
    etternavn
}: {
    fornavn: string | undefined;
    etternavn: string | undefined;
}): Navn | undefined => {
    if (fornavn !== undefined && etternavn !== undefined) {
        return {
            fornavn,
            etternavn,
            navn: `${fornavn} ${etternavn}`
        };
    }
    return undefined;
};

const selectOmSøker = createSelector(
    [selectSøkerErAleneOmOmsorg, selectSøkerErFarEllerMedmor, selectSøkerErMor, selectSøkerinfo],
    (erAleneOmOmsorg, erFarEllerMedmor, erMor, søkerinfo): OmSøker | undefined => {
        if (
            erAleneOmOmsorg !== undefined &&
            erFarEllerMedmor !== undefined &&
            erMor !== undefined &&
            søkerinfo !== undefined
        ) {
            return {
                erAleneOmOmsorg,
                erFarEllerMedmor,
                erMor
            };
        }
        return undefined;
    }
);

const selectOmMor = createSelector(
    [selectMorHarAleneomsorg, selectMorHarRett, selectMorErUfør],
    (erAleneOmOmsorg, harRett, erUfør): OmMor | undefined => {
        if (erAleneOmOmsorg !== undefined && harRett !== undefined && erUfør) {
            return {
                erAleneOmOmsorg,
                harRett,
                erUfør
            };
        }
        return undefined;
    }
);

const selectOmFarMedmor = createSelector(
    [selectFarEllerMedmorHarRett, selectFarEllerMedmorHarAleneomsorg],
    (harRett, erAleneOmOmsorg): OmFarMedmor | undefined => {
        if (erAleneOmOmsorg !== undefined && harRett !== undefined) {
            return {
                erAleneOmOmsorg,
                harRett
            };
        }
        return undefined;
    }
);

const selectOmAnnenForelder = createSelector(
    [selectAnnenForelder, selectSøkerErFarEllerMedmor],
    (annenForelder, søkerErFarEllerMedmor): OmAnnenForelder | undefined => {
        if (annenForelder !== undefined && søkerErFarEllerMedmor !== undefined) {
            return {
                harRett: annenForelder.harRettPåForeldrepenger === true,
                erFarEllerMedmor: søkerErFarEllerMedmor === false,
                erMor: søkerErFarEllerMedmor === true
            };
        }
        return undefined;
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

export const getSøknadsinfo = createSelector(
    [selectOmSøknaden, selectOmSøker, selectOmMor, selectOmFarMedmor, selectOmAnnenForelder, selectNavnISøknaden],
    (omSøknaden, omSøker, omMor, omFarMedmor, omAnnenForelder, navn): Søknadsinfo | undefined => {
        if (
            omSøker !== undefined &&
            omSøknaden !== undefined &&
            omMor !== undefined &&
            omFarMedmor !== undefined &&
            omAnnenForelder !== undefined &&
            navn !== undefined
        ) {
            return {
                søknaden: omSøknaden,
                søker: omSøker,
                mor: omMor,
                farMedmor: omFarMedmor,
                annenForelder: omAnnenForelder,
                navn
            };
        }
        return undefined;
    }
);

export const getNavnISøknaden = (
    søkerpersonalia: Person,
    søker: Søker,
    annenForelder: AnnenForelder
): NavnISøknaden => {
    const erFarMedmor = getErSøkerFarEllerMedmor(søker.rolle);
    const navnSøker = getNavn(søkerpersonalia);
    const navnAnnenForelder = getNavn(annenForelder);
    return {
        søker: navnSøker!,
        annenForelder: navnAnnenForelder,
        mor: erFarMedmor ? navnAnnenForelder! : navnSøker!,
        farMedmor: erFarMedmor ? navnSøker : navnAnnenForelder
    };
};

interface OmSøknaden {
    situasjon: Søkersituasjon;
    familiehendelsesdato: Date;
    dekningsgrad: Dekningsgrad | undefined;
    erFødsel: boolean;
    erDeltUttak: boolean;
    erFlerbarnssøknad: boolean;
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
    annenForelder?: Navn;
    farMedmor?: Navn;
}

export interface Søknadsinfo {
    søknaden: OmSøknaden;
    navn: NavnISøknaden;
    annenForelder: OmAnnenForelder;
    søker: OmSøker;
    mor: OmMor;
    farMedmor: OmFarMedmor;
}
