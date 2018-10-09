import * as moment from 'moment';
import { Næring, NæringPartial } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { date4YearsAgo } from '../../util/validation/values';
import { erMindreEnn4ÅrSidenOppstart } from '../../util/domain/næringer';
import næringsrelasjonFns from '../../bolker/næringsrelasjon-bolk/visibility';
import VisibilityFunction from '../../types/dom/Visibility';

const navnPåNæringenVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { næringstyper } = næring;
    return næringstyper !== undefined && næringstyper.length > 0;
};

const organisasjonsnummerVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { navnPåNæringen } = næring;
    return module.navnPåNæringen(næring) && navnPåNæringen !== undefined;
};

const tidsperiodeVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { organisasjonsnummer } = næring;
    return module.organisasjonsnummer(næring) && organisasjonsnummer !== undefined;
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
    if (tidsperiode && module.tidsperiodeUtfylt(næring)) {
        const { fom } = tidsperiode;
        return moment(fom).isAfter(date4YearsAgo, 'day') && module.tidsperiode(næring);
    }
    return false;
};

const næringRegistrertINorgeVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { næringsinntekt } = næring;
    if (module.næringsinntekt(næring)) {
        return næringsinntekt !== undefined;
    }
    return module.tidsperiodeUtfylt(næring) && module.tidsperiode(næring);
};

const næringRegistrertILandVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { registrertINorge } = næring;
    return module.næringRegistrertINorge(næring) && registrertINorge === false;
};

const stillingsprosentVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { registrertINorge, registrertILand } = næring;
    if (registrertINorge === true) {
        return module.næringRegistrertINorge(næring);
    } else {
        return registrertINorge === false && registrertILand !== undefined && module.næringRegistrertILand(næring);
    }
};

const nyIArbeidslivetVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { stillingsprosent } = næring;
    return (
        næring !== undefined &&
        næring.tidsperiode !== undefined &&
        erMindreEnn4ÅrSidenOppstart(næring as Næring) &&
        module.stillingsprosent(næring) &&
        stillingsprosent !== undefined
    );
};

const oppstartsdatoVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    return næring.nyIArbeidslivet === true && module.nyIArbeidslivet(næring);
};

const varigEndringAvNæringsinntektVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { stillingsprosent } = næring;
    return (
        næring !== undefined &&
        næring.tidsperiode !== undefined &&
        !erMindreEnn4ÅrSidenOppstart(næring as Næring) &&
        module.stillingsprosent(næring) &&
        stillingsprosent !== undefined
    );
};

const regnskapsførerBolkVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { nyIArbeidslivet, hattVarigEndringAvNæringsinntektSiste4Kalenderår } = næring;
    if (module.nyIArbeidslivet(næring)) {
        return nyIArbeidslivet !== undefined;
    }
    if (module.varigEndringAvNæringsinntekt(næring)) {
        return hattVarigEndringAvNæringsinntektSiste4Kalenderår !== undefined;
    }
    return false;
};

const revisorBolkVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { harRegnskapsfører } = næring;
    if (module.regnskapsførerBolk(næring)) {
        return harRegnskapsfører === false;
    }
    return false;
};

const kanInnhenteOpplysningerFraRevisorVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { harRevisor, revisor } = næring;
    if (module.revisorBolk(næring) && revisor !== undefined) {
        const { erNærVennEllerFamilie } = revisor;
        return (
            harRevisor === true &&
            erNærVennEllerFamilie !== undefined &&
            næringsrelasjonFns.erNærVennEllerFamilie(revisor)
        );
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
        return erNærVennEllerFamilie !== undefined && næringsrelasjonFns.erNærVennEllerFamilie(regnskapsfører);
    }
    if (harRevisor && revisor !== undefined) {
        return kanInnhenteOpplsyningerFraRevisor !== undefined && module.kanInnhenteOpplysningerFraRevisor(næring);
    }
    if (harRegnskapsfører === false && harRevisor === false) {
        return (
            (module.nyIArbeidslivet(næring) && nyIArbeidslivet !== undefined) ||
            varigEndringAvNæringsinntektVisible(næring)
        );
    }
    return false;
};

const module = {
    navnPåNæringen: navnPåNæringenVisible,
    organisasjonsnummer: organisasjonsnummerVisible,
    tidsperiodeUtfylt: tidsperiodeErUtfylt,
    tidsperiode: tidsperiodeVisible,
    næringsinntekt: næringsinntektVisible,
    næringRegistrertINorge: næringRegistrertINorgeVisible,
    næringRegistrertILand: næringRegistrertILandVisible,
    stillingsprosent: stillingsprosentVisible,
    nyIArbeidslivet: nyIArbeidslivetVisible,
    oppstartsdato: oppstartsdatoVisible,
    varigEndringAvNæringsinntekt: varigEndringAvNæringsinntektVisible,
    regnskapsførerBolk: regnskapsførerBolkVisible,
    revisorBolk: revisorBolkVisible,
    kanInnhenteOpplysningerFraRevisor: kanInnhenteOpplysningerFraRevisorVisible,
    formButtons: formButtonsVisible
};

export default module;
