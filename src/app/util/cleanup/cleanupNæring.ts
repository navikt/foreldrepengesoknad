import { EndringAvNæringsinntektInformasjon, Næring } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import visibility from '../../steg/andreInntekter/selvstendigNæringsdrivendeModal/visibility';
import { replaceInvisibleCharsWithSpace } from '../stringUtils';

const cleanupEndringAvNæringsinntektInformasjon = (
    endringsinformasjon: EndringAvNæringsinntektInformasjon | undefined
): EndringAvNæringsinntektInformasjon | undefined => {
    if (endringsinformasjon !== undefined) {
        return {
            ...endringsinformasjon,
            forklaring: replaceInvisibleCharsWithSpace(endringsinformasjon.forklaring),
        };
    }
    return undefined;
};

const cleanupNæring = (næring: Næring): Næring => {
    const {
        registrertILand,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        oppstartsdato,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        harRegnskapsfører,
        harRevisor,
        næringsinntekt,
        kanInnhenteOpplsyningerFraRevisor,
        regnskapsfører,
        revisor,
        organisasjonsnummer,
        endringAvNæringsinntektInformasjon,
        navnPåNæringen,
        ...rest
    } = næring;

    const hattVarigEndring = visibility.varigEndringAvNæringsinntekt(næring)
        ? hattVarigEndringAvNæringsinntektSiste4Kalenderår
        : undefined;

    const newNæring: Partial<Næring> = {
        næringsinntekt: visibility.næringsinntekt(næring) ? næringsinntekt : undefined,
        registrertILand: visibility.næringRegistrertILand(næring) ? registrertILand : undefined,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: visibility.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene(
            næring
        )
            ? harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
            : undefined,
        organisasjonsnummer: næring.registrertINorge === true ? organisasjonsnummer : undefined,
        oppstartsdato: visibility.oppstartsdato(næring) ? oppstartsdato : undefined,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår: hattVarigEndring,
        harRevisor: visibility.revisorBolk(næring) ? harRevisor : undefined,
        regnskapsfører: harRegnskapsfører
            ? { ...regnskapsfører, navn: replaceInvisibleCharsWithSpace(regnskapsfører.navn) }
            : undefined,
        harRegnskapsfører,
        revisor: harRevisor ? { ...revisor, navn: replaceInvisibleCharsWithSpace(revisor.navn) } : undefined,
        kanInnhenteOpplsyningerFraRevisor:
            harRevisor && visibility.kanInnhenteOpplysningerFraRevisor(næring)
                ? kanInnhenteOpplsyningerFraRevisor
                : undefined,
        endringAvNæringsinntektInformasjon: hattVarigEndring
            ? cleanupEndringAvNæringsinntektInformasjon(endringAvNæringsinntektInformasjon)
            : undefined,
        navnPåNæringen: replaceInvisibleCharsWithSpace(navnPåNæringen),
        ...rest,
    };

    return newNæring as Næring;
};

export default cleanupNæring;
