import * as moment from 'moment';
import { Næring, NæringPartial } from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { date4YearsAgo } from '../../../util/validation/values';
import { er4ÅrSidenOppstartEllerMindre } from '../../../util/domain/næringer';
import VisibilityFunction from '../../../types/dom/Visibility';
import næringsrelasjonFns from './næringsrelasjonBolk/visibility';

const navnPåNæringenVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { næringstyper } = næring;
    return næringstyper !== undefined && næringstyper.length > 0;
};

const næringRegistrertINorgeVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { navnPåNæringen } = næring;
    return module.navnPåNæringen(næring) && navnPåNæringen !== undefined && navnPåNæringen !== '';
};

const næringRegistrertILandVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { registrertINorge } = næring;
    return module.næringRegistrertINorge(næring) && registrertINorge === false;
};

const organisasjonsnummerVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { registrertINorge, registrertILand } = næring;
    if (module.næringRegistrertINorge(næring) && (registrertINorge === undefined || registrertINorge === false)) {
        return false;
    }
    return (
        module.næringRegistrertINorge(næring) &&
        (registrertINorge === true || (registrertINorge === false && registrertILand !== undefined))
    );
};

const tidsperiodeVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { organisasjonsnummer, registrertINorge, registrertILand } = næring;
    if (module.næringRegistrertINorge(næring) === false) {
        return false;
    }
    return (
        (module.organisasjonsnummer(næring) && organisasjonsnummer !== undefined && organisasjonsnummer !== '') ||
        (module.organisasjonsnummer(næring) === false &&
            (registrertINorge === true ||
                (registrertINorge === false && registrertILand !== undefined && registrertILand !== '')))
    );
};

const tidsperiodeErUtfylt: VisibilityFunction<NæringPartial> = (næring: NæringPartial): boolean => {
    const { tidsperiode } = næring;
    if (tidsperiode !== undefined) {
        const { fom, tom } = tidsperiode;
        return fom !== undefined && (tom !== undefined || tidsperiode.pågående === true);
    }
    return false;
};

const næringsinntektVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const { tidsperiode } = næring;
    if (tidsperiode && module.tidsperiodeUtfylt(næring)) {
        const { fom } = tidsperiode;
        return moment(fom?.date).isAfter(date4YearsAgo, 'day') && module.tidsperiode(næring);
    }
    return false;
};

const harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneVisible: VisibilityFunction<NæringPartial> = (
    næring: NæringPartial
) => {
    return (
        næring !== undefined &&
        næring.tidsperiode !== undefined &&
        (næring.registrertINorge !== undefined ||
            (næring.registrertILand !== undefined && næring.registrertILand !== '')) &&
        er4ÅrSidenOppstartEllerMindre(næring as Næring) &&
        module.næringsinntekt(næring) &&
        næring.næringsinntekt !== undefined
    );
};

const oppstartsdatoVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    return (
        næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene === true &&
        module.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene(næring)
    );
};

const varigEndringAvNæringsinntektVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    return (
        næring !== undefined &&
        næring.tidsperiode !== undefined &&
        (næring.registrertINorge !== undefined ||
            (næring.registrertILand !== undefined && næring.registrertILand !== '')) &&
        !er4ÅrSidenOppstartEllerMindre(næring as Næring) &&
        (module.næringRegistrertILand(næring) || module.næringRegistrertINorge(næring))
    );
};

const regnskapsførerBolkVisible: VisibilityFunction<NæringPartial> = (næring: NæringPartial) => {
    const {
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår,
    } = næring;
    if (module.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene(næring)) {
        return harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene !== undefined;
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
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
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
            (module.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene(næring) &&
                harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene !== undefined) ||
            varigEndringAvNæringsinntektVisible(næring)
        );
    }
    return false;
};

export const module = {
    navnPåNæringen: navnPåNæringenVisible,
    organisasjonsnummer: organisasjonsnummerVisible,
    tidsperiodeUtfylt: tidsperiodeErUtfylt,
    tidsperiode: tidsperiodeVisible,
    næringsinntekt: næringsinntektVisible,
    næringRegistrertINorge: næringRegistrertINorgeVisible,
    næringRegistrertILand: næringRegistrertILandVisible,
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅreneVisible,
    oppstartsdato: oppstartsdatoVisible,
    varigEndringAvNæringsinntekt: varigEndringAvNæringsinntektVisible,
    regnskapsførerBolk: regnskapsførerBolkVisible,
    revisorBolk: revisorBolkVisible,
    kanInnhenteOpplysningerFraRevisor: kanInnhenteOpplysningerFraRevisorVisible,
    formButtons: formButtonsVisible,
};

export default module;
