import * as moment from 'moment';
import {
    Næring,
    NæringPartial
} from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { date4YearsAgo } from '../../util/validation/values';
import { erMindreEnn4ÅrSidenOppstart } from '../../util/domain/næringer';
import { erNærVennEllerFamilieVisible } from '../../bolker/næringsrelasjon-bolk/visibility';

type VisibilityFunction = (næring: NæringPartial) => boolean;
interface FieldVisibilityFunctions {
    navnPåNæringen: VisibilityFunction;
    organisasjonsnummer: VisibilityFunction;
    tidsperiode: VisibilityFunction;
    næringsinntekt: VisibilityFunction;
    næringRegistrertINorge: VisibilityFunction;
    næringRegistrertILand: VisibilityFunction;
    stillingsprosent: VisibilityFunction;
    nyIArbeidslivet: VisibilityFunction;
    varigEndringAvNæringsinntekt: VisibilityFunction;
    regnskapsførerBolk: VisibilityFunction;
    revisorBolk: VisibilityFunction;
    kanInnhenteOpplysningerFraRevisor: VisibilityFunction;
    formButtons: VisibilityFunction;
}

export const navnPåNæringenVisible = (næring: NæringPartial) => {
    const { næringstyper } = næring;
    return næringstyper !== undefined && næringstyper.length > 0;
};

export const organisasjonsnummerVisible = (næring: NæringPartial) => {
    const { navnPåNæringen } = næring;
    return navnPåNæringenVisible(næring) && navnPåNæringen !== undefined;
};

export const tidsperiodeVisible = (næring: NæringPartial) => {
    const { organisasjonsnummer } = næring;
    return (
        organisasjonsnummerVisible(næring) && organisasjonsnummer !== undefined
    );
};

export const tidsperiodeErUtfylt = (næring: NæringPartial): boolean => {
    const { tidsperiode, pågående } = næring;
    if (tidsperiode !== undefined) {
        const { fom, tom } = tidsperiode;
        return fom !== undefined && (tom !== undefined || pågående === true);
    }
    return false;
};

export const næringsinntektVisible = (næring: NæringPartial) => {
    const { tidsperiode } = næring;
    if (tidsperiode && tidsperiodeErUtfylt(næring)) {
        const { fom } = tidsperiode;
        return (
            moment(fom, moment.ISO_8601) > date4YearsAgo &&
            tidsperiodeVisible(næring)
        );
    }
    return false;
};

export const næringRegistrertINorgeVisible = (næring: NæringPartial) => {
    const { næringsinntekt } = næring;
    if (næringsinntektVisible(næring)) {
        return næringsinntekt !== undefined;
    }
    return tidsperiodeVisible(næring) && tidsperiodeErUtfylt(næring);
};

export const næringRegistrertILandVisible = (næring: NæringPartial) => {
    const { registrertINorge } = næring;
    return næringRegistrertINorgeVisible(næring) && registrertINorge === false;
};

export const stillingsprosentVisible = (næring: NæringPartial) => {
    const { registrertINorge, registrertILand } = næring;
    if (registrertINorge === true) {
        return næringRegistrertINorgeVisible(næring);
    } else {
        return (
            registrertINorge === false &&
            registrertILand !== undefined &&
            næringRegistrertILandVisible(næring)
        );
    }
};

export const nyIArbeidslivetVisible = (næring: NæringPartial) => {
    const { stillingsprosent } = næring;
    return (
        næring !== undefined &&
        næring.tidsperiode !== undefined &&
        erMindreEnn4ÅrSidenOppstart(næring as Næring) &&
        stillingsprosentVisible(næring) &&
        stillingsprosent !== undefined
    );
};

export const varigEndringAvNæringsinntektVisible = (næring: NæringPartial) => {
    const { stillingsprosent } = næring;
    return (
        næring !== undefined &&
        næring.tidsperiode !== undefined &&
        !erMindreEnn4ÅrSidenOppstart(næring as Næring) &&
        stillingsprosentVisible(næring) &&
        stillingsprosent !== undefined
    );
};

export const regnskapsførerBolkVisible = (næring: NæringPartial) => {
    const {
        nyIArbeidslivet,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår
    } = næring;
    if (nyIArbeidslivetVisible(næring)) {
        return nyIArbeidslivet !== undefined;
    }
    if (varigEndringAvNæringsinntektVisible(næring)) {
        return hattVarigEndringAvNæringsinntektSiste4Kalenderår !== undefined;
    }
    return false;
};

export const revisorBolkVisible = (næring: NæringPartial) => {
    const { harRegnskapsfører } = næring;
    if (regnskapsførerBolkVisible(næring)) {
        return harRegnskapsfører === false;
    }
    return false;
};

export const kanInnhenteOpplysningerFraRevisorVisible = (
    næring: NæringPartial
) => {
    const { harRevisor, revisor } = næring;
    if (revisorBolkVisible(næring) && revisor !== undefined) {
        const { erNærVennEllerFamilie } = revisor;
        return (
            harRevisor === true &&
            erNærVennEllerFamilie !== undefined &&
            erNærVennEllerFamilieVisible(revisor)
        );
    }
    return false;
};

export const formButtonsVisible = (næring: NæringPartial) => {
    const {
        harRegnskapsfører,
        harRevisor,
        revisor,
        regnskapsfører,
        kanInnhenteOpplsyningerFraRevisor,
        nyIArbeidslivet
    } = næring;

    if (harRegnskapsfører && regnskapsfører !== undefined) {
        const { erNærVennEllerFamilie } = regnskapsfører;
        return (
            erNærVennEllerFamilie !== undefined &&
            erNærVennEllerFamilieVisible(regnskapsfører)
        );
    }
    if (harRevisor && revisor !== undefined) {
        return (
            kanInnhenteOpplsyningerFraRevisor !== undefined &&
            kanInnhenteOpplysningerFraRevisorVisible(næring)
        );
    }
    if (harRegnskapsfører === false && harRevisor === false) {
        return nyIArbeidslivetVisible(næring) && nyIArbeidslivet !== undefined;
    }
    return false;
};

const fieldVisibilityFunctions: FieldVisibilityFunctions = {
    navnPåNæringen: navnPåNæringenVisible,
    organisasjonsnummer: organisasjonsnummerVisible,
    tidsperiode: tidsperiodeVisible,
    næringsinntekt: næringsinntektVisible,
    næringRegistrertINorge: næringRegistrertINorgeVisible,
    næringRegistrertILand: næringRegistrertILandVisible,
    stillingsprosent: stillingsprosentVisible,
    nyIArbeidslivet: nyIArbeidslivetVisible,
    varigEndringAvNæringsinntekt: varigEndringAvNæringsinntektVisible,
    regnskapsførerBolk: regnskapsførerBolkVisible,
    revisorBolk: revisorBolkVisible,
    kanInnhenteOpplysningerFraRevisor: kanInnhenteOpplysningerFraRevisorVisible,
    formButtons: formButtonsVisible
};

export default fieldVisibilityFunctions;
