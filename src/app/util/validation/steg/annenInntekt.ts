import { FrilansInformasjon } from '../../../types/søknad/FrilansInformasjon';
import Søker from '../../../types/søknad/Søker';

const frilansErGyldig = (frilansInformasjon: FrilansInformasjon): boolean => {
    const {
        jobberFremdelesSomFrilans,
        oppstart,
        driverFosterhjem,
        harJobbetForNærVennEllerFamilieSiste10Mnd,
        oppdragForNæreVennerEllerFamilieSiste10Mnd,
    } = frilansInformasjon;

    let oppdragGyldig = true;
    if (harJobbetForNærVennEllerFamilieSiste10Mnd) {
        oppdragGyldig =
            oppdragForNæreVennerEllerFamilieSiste10Mnd !== undefined &&
            oppdragForNæreVennerEllerFamilieSiste10Mnd.length > 0 &&
            driverFosterhjem !== undefined;
    }

    return (
        oppstart !== undefined &&
        jobberFremdelesSomFrilans !== undefined &&
        oppdragGyldig &&
        driverFosterhjem !== undefined
    );
};

export const annenInntektErGyldig = (søker: Søker): boolean => {
    const {
        harHattAnnenInntektSiste10Mnd,
        andreInntekterSiste10Mnd,
        harJobbetSomFrilansSiste10Mnd,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd,
        frilansInformasjon,
        selvstendigNæringsdrivendeInformasjon,
    } = søker;

    let frilansGyldig = true;
    let selvstendigNæringsdrivendeGyldig = true;
    let andreTyperInntektGyldig = true;

    if (harJobbetSomFrilansSiste10Mnd) {
        frilansGyldig = frilansInformasjon !== undefined && frilansErGyldig(frilansInformasjon);
    }

    if (harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd) {
        selvstendigNæringsdrivendeGyldig =
            selvstendigNæringsdrivendeInformasjon !== undefined && selvstendigNæringsdrivendeInformasjon.length > 0;
    }

    if (harHattAnnenInntektSiste10Mnd) {
        andreTyperInntektGyldig = andreInntekterSiste10Mnd !== undefined && andreInntekterSiste10Mnd.length > 0;
    }

    return (
        harHattAnnenInntektSiste10Mnd !== undefined &&
        harJobbetSomFrilansSiste10Mnd !== undefined &&
        frilansGyldig &&
        selvstendigNæringsdrivendeGyldig &&
        andreTyperInntektGyldig
    );
};
