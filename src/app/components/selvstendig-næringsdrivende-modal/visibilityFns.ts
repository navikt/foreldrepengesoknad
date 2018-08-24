import * as moment from 'moment';
import {
    Næring,
    NæringPartial
} from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { date4YearsAgo } from '../../util/validation/values';
import { erMindreEnn4ÅrSidenOppstart } from '../../util/domain/næringer';
import { erNærVennEllerFamilieVisible } from '../../bolker/næringsrelasjon-bolk/visibilityFns';

type NæringVisibilityFn = (næring: NæringPartial) => boolean;

export const navnPåNæringenVisible: NæringVisibilityFn = (
    næring: NæringPartial
) => {
    const { næringstyper } = næring;
    return næringstyper !== undefined && næringstyper.length > 0;
};

export const organisasjonsnummerVisible: NæringVisibilityFn = (
    næring: NæringPartial
) => {
    const { navnPåNæringen } = næring;
    return navnPåNæringenVisible(næring) && navnPåNæringen !== undefined;
};

export const tidsperiodeVisible: NæringVisibilityFn = (
    næring: NæringPartial
) => {
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

export const næringsinntektVisible: NæringVisibilityFn = (
    næring: NæringPartial
) => {
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

export const næringRegistrertINorgeVisible: NæringVisibilityFn = (
    næring: NæringPartial
) => {
    const { næringsinntekt } = næring;
    if (næringsinntektVisible(næring)) {
        return næringsinntekt !== undefined;
    }
    return tidsperiodeVisible(næring) && tidsperiodeErUtfylt(næring);
};

export const næringRegistrertILandVisible: NæringVisibilityFn = (
    næring: NæringPartial
) => {
    const { registrertINorge } = næring;
    return næringRegistrertINorgeVisible(næring) && registrertINorge === false;
};

export const stillingsprosentVisible: NæringVisibilityFn = (
    næring: NæringPartial
) => {
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

export const nyIArbeidslivetVisible: NæringVisibilityFn = (
    næring: NæringPartial
) => {
    const { stillingsprosent } = næring;
    return (
        næring !== undefined &&
        næring.tidsperiode !== undefined &&
        erMindreEnn4ÅrSidenOppstart(næring as Næring) &&
        stillingsprosentVisible(næring) &&
        stillingsprosent !== undefined
    );
};

export const varigEndringAvNæringsinntektVisible: NæringVisibilityFn = (
    næring: NæringPartial
) => {
    const { stillingsprosent } = næring;
    return (
        næring !== undefined &&
        næring.tidsperiode !== undefined &&
        !erMindreEnn4ÅrSidenOppstart(næring as Næring) &&
        stillingsprosentVisible(næring) &&
        stillingsprosent !== undefined
    );
};

export const regnskapsførerBolkVisible: NæringVisibilityFn = (
    næring: NæringPartial
) => {
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

export const revisorBolkVisible: NæringVisibilityFn = (
    næring: NæringPartial
) => {
    const { harRegnskapsfører } = næring;
    if (regnskapsførerBolkVisible(næring)) {
        return harRegnskapsfører === false;
    }
    return false;
};

export const kanInnhenteOpplysningerFraRevisorVisible: NæringVisibilityFn = (
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

export const formButtonsVisible: NæringVisibilityFn = (
    næring: NæringPartial
) => {
    const {
        harRegnskapsfører,
        harRevisor,
        revisor,
        regnskapsfører,
        kanInnhenteOpplsyningerFraRevisor
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
    return false;
};
