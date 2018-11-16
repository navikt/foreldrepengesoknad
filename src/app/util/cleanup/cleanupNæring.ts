import { Næring } from '../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import visibility from '../../components/selvstendig-næringsdrivende-modal/visibility';

const cleanupNæring = (næring: Næring): Næring => {
    const {
        registrertILand,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        oppstartsdato,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        harRegnskapsfører,
        harRevisor,
        kanInnhenteOpplsyningerFraRevisor,
        regnskapsfører,
        revisor,
        organisasjonsnummer,
        ...rest
    } = næring;

    const newNæring: Partial<Næring> = {
        registrertILand: visibility.næringRegistrertILand(næring) ? registrertILand : undefined,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: visibility.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene(
            næring
        )
            ? harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
            : undefined,
        organisasjonsnummer: næring.registrertINorge === true ? organisasjonsnummer : undefined,
        oppstartsdato: visibility.oppstartsdato(næring) ? oppstartsdato : undefined,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår: visibility.varigEndringAvNæringsinntekt(næring)
            ? hattVarigEndringAvNæringsinntektSiste4Kalenderår
            : undefined,
        harRevisor: visibility.revisorBolk(næring) ? harRevisor : undefined,
        regnskapsfører: harRegnskapsfører ? regnskapsfører : undefined,
        harRegnskapsfører,
        revisor: harRevisor ? revisor : undefined,
        kanInnhenteOpplsyningerFraRevisor:
            harRevisor && visibility.kanInnhenteOpplysningerFraRevisor(næring)
                ? kanInnhenteOpplsyningerFraRevisor
                : undefined,
        ...rest
    };

    return newNæring as Næring;
};

export default cleanupNæring;
