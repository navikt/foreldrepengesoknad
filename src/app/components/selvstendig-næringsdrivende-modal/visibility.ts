import * as moment from 'moment';
import { Næring, NæringPartial } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { date4YearsAgo } from '../../util/validation/values';
import { erMindreEnn4ÅrSidenOppstart } from '../../util/domain/næringer';
import { erNærVennEllerFamilieVisible } from '../../bolker/næringsrelasjon-bolk/visibility';
import VisibilityFunction from '../../types/dom/Visibility';

const navnPåNæringenVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { næringstyper } = næring;
    return næringstyper !== undefined && næringstyper.length > 0;
};

const organisasjonsnummerVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { navnPåNæringen } = næring;
    return navnPåNæringenVisible(næring) && navnPåNæringen !== undefined;
};

const tidsperiodeVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { organisasjonsnummer } = næring;
    return organisasjonsnummerVisible(næring) && organisasjonsnummer !== undefined;
};

const tidsperiodeErUtfylt: VisibilityFunction<NæringPartial> = (næring: NæringPartial): boolean => {
    const { tidsperiode, pågående } = næring;
    if (tidsperiode !== undefined) {
        const { fom, tom } = tidsperiode;
        return fom !== undefined && (tom !== undefined || pågående === true);
    }
    return false;
};

const næringsinntektVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { tidsperiode } = næring;
    if (tidsperiode && tidsperiodeErUtfylt(næring)) {
        const { fom } = tidsperiode;
        return moment(fom, moment.ISO_8601) > date4YearsAgo && tidsperiodeVisible(næring);
    }
    return false;
};

const næringRegistrertINorgeVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { næringsinntekt } = næring;
    if (næringsinntektVisible(næring)) {
        return næringsinntekt !== undefined;
    }
    return tidsperiodeVisible(næring) && tidsperiodeErUtfylt(næring);
};

const næringRegistrertILandVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { registrertINorge } = næring;
    return næringRegistrertINorgeVisible(næring) && registrertINorge === false;
};

const stillingsprosentVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { registrertINorge, registrertILand } = næring;
    if (registrertINorge === true) {
        return næringRegistrertINorgeVisible(næring);
    } else {
        return registrertINorge === false && registrertILand !== undefined && næringRegistrertILandVisible(næring);
    }
};

const nyIArbeidslivetVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { stillingsprosent } = næring;
    return (
        næring !== undefined &&
        næring.tidsperiode !== undefined &&
        erMindreEnn4ÅrSidenOppstart(næring as Næring) &&
        stillingsprosentVisible(næring) &&
        stillingsprosent !== undefined
    );
};

const varigEndringAvNæringsinntektVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { stillingsprosent } = næring;
    return (
        næring !== undefined &&
        næring.tidsperiode !== undefined &&
        !erMindreEnn4ÅrSidenOppstart(næring as Næring) &&
        stillingsprosentVisible(næring) &&
        stillingsprosent !== undefined
    );
};

const regnskapsførerBolkVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { nyIArbeidslivet, hattVarigEndringAvNæringsinntektSiste4Kalenderår } = næring;
    if (nyIArbeidslivetVisible(næring)) {
        return nyIArbeidslivet !== undefined;
    }
    if (varigEndringAvNæringsinntektVisible(næring)) {
        return hattVarigEndringAvNæringsinntektSiste4Kalenderår !== undefined;
    }
    return false;
};

const revisorBolkVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { harRegnskapsfører } = næring;
    if (regnskapsførerBolkVisible(næring)) {
        return harRegnskapsfører === false;
    }
    return false;
};

const kanInnhenteOpplysningerFraRevisorVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { harRevisor, revisor } = næring;
    if (revisorBolkVisible(næring) && revisor !== undefined) {
        const { erNærVennEllerFamilie } = revisor;
        return harRevisor === true && erNærVennEllerFamilie !== undefined && erNærVennEllerFamilieVisible(revisor);
    }
    return false;
};

const formButtonsVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
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
        return erNærVennEllerFamilie !== undefined && erNærVennEllerFamilieVisible(regnskapsfører);
    }
    if (harRevisor && revisor !== undefined) {
        return kanInnhenteOpplsyningerFraRevisor !== undefined && kanInnhenteOpplysningerFraRevisorVisible(næring);
    }
    if (harRegnskapsfører === false && harRevisor === false) {
        return nyIArbeidslivetVisible(næring) && nyIArbeidslivet !== undefined;
    }
    return false;
};

export default {
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
