import {
    Periode,
    Periodetype,
    ForeldrepengerFørFødselUttaksperiode,
    isForeldrepengerFørFødselUttaksperiode,
    Overføringsperiode,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    Uttaksperiode
} from '../../types/uttaksplan/periodetyper';
import aktivitetskravMorUtil from '../domain/aktivitetskravMor';
import AnnenForelder from '../../types/søknad/AnnenForelder';
import { Søker } from '../../types/søknad/Søker';
import { erFarEllerMedmor } from '../domain/personUtil';

const cleanupUtsettelse = (
    periode: Utsettelsesperiode,
    søker: Søker,
    annenForelder: AnnenForelder
): Utsettelsesperiode => {
    const morsAktivitetIPerioden = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(
        erFarEllerMedmor(søker.rolle),
        annenForelder.harRettPåForeldrepenger
    )
        ? periode.morsAktivitetIPerioden
        : undefined;

    return {
        type: Periodetype.Utsettelse,
        id: periode.id,
        årsak: periode.årsak,
        tidsperiode: periode.tidsperiode,
        forelder: periode.forelder,
        morsAktivitetIPerioden,
        orgnr: periode.årsak === UtsettelseÅrsakType.Arbeid ? periode.orgnr : undefined,
        selvstendigNæringsdrivendeEllerFrilans: UtsettelseÅrsakType.Arbeid
            ? periode.selvstendigNæringsdrivendeEllerFrilans
            : undefined
    };
};

const cleanupUttak = (periode: Uttaksperiode): Uttaksperiode => {
    const uttaksperiode: Uttaksperiode = {
        type: Periodetype.Uttak,
        id: periode.id,
        konto: periode.konto,
        vedlegg: periode.vedlegg,
        forelder: periode.forelder,
        tidsperiode: periode.tidsperiode,
        gradert: periode.gradert,
        morsAktivitetIPerioden: periode.morsAktivitetIPerioden,
        ønskerSamtidigUttak: periode.ønskerSamtidigUttak,
        stillingsprosent: periode.gradert === true ? periode.stillingsprosent : undefined,
        selvstendigNæringsdrivendeEllerFrilans:
            periode.gradert === true ? periode.selvstendigNæringsdrivendeEllerFrilans : undefined,
        orgnr: periode.gradert === true ? periode.orgnr : undefined
    };
    if (isForeldrepengerFørFødselUttaksperiode(periode)) {
        (uttaksperiode as ForeldrepengerFørFødselUttaksperiode).skalIkkeHaUttakFørTermin =
            periode.skalIkkeHaUttakFørTermin;
    }
    return uttaksperiode;
};

const cleanupOverføring = (periode: Overføringsperiode): Overføringsperiode => {
    return {
        type: Periodetype.Overføring,
        id: periode.id,
        konto: periode.konto,
        vedlegg: periode.vedlegg,
        forelder: periode.forelder,
        tidsperiode: periode.tidsperiode,
        årsak: periode.årsak
    };
};

export const cleanupPeriode = (periode: Periode, søker: Søker, annenForelder: AnnenForelder): Periode => {
    switch (periode.type) {
        case Periodetype.Overføring:
            return cleanupOverføring(periode);
        case Periodetype.Utsettelse:
            return cleanupUtsettelse(periode, søker, annenForelder);
        case Periodetype.Uttak:
            return cleanupUttak(periode);
    }
    return periode;
};
