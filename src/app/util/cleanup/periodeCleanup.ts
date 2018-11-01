import {
    ForeldrepengerFørFødselUttaksperiode,
    isForeldrepengerFørFødselUttaksperiode,
    Oppholdsperiode,
    Overføringsperiode,
    Periode,
    Periodetype,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    Uttaksperiode
} from '../../types/uttaksplan/periodetyper';
import aktivitetskravMorUtil from '../domain/aktivitetskravMor';
import AnnenForelder from '../../types/søknad/AnnenForelder';
import { Søker } from '../../types/søknad/Søker';
import { erFarEllerMedmor } from '../domain/personUtil';
import { shouldPeriodeHaveAttachment } from '../søknad/missingAttachmentUtil';

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
        konto: periode.konto,
        id: periode.id,
        årsak: periode.årsak,
        tidsperiode: periode.tidsperiode,
        forelder: periode.forelder,
        morsAktivitetIPerioden,
        orgnr: periode.årsak === UtsettelseÅrsakType.Arbeid ? periode.orgnr : undefined,
        arbeidsform: UtsettelseÅrsakType.Arbeid ? periode.arbeidsform : undefined,
        erArbeidstaker: periode.erArbeidstaker,
        vedlegg: shouldPeriodeHaveAttachment(periode, erFarEllerMedmor(søker.rolle)) ? periode.vedlegg : undefined
    };
};

const cleanupUttak = (periode: Uttaksperiode, søker: Søker): Uttaksperiode => {
    const uttaksperiode: Uttaksperiode = {
        type: Periodetype.Uttak,
        id: periode.id,
        konto: periode.konto,
        vedlegg: shouldPeriodeHaveAttachment(periode, erFarEllerMedmor(søker.rolle)) ? periode.vedlegg : undefined,
        forelder: periode.forelder,
        tidsperiode: periode.tidsperiode,
        gradert: periode.gradert,
        morsAktivitetIPerioden: periode.morsAktivitetIPerioden,
        ønskerSamtidigUttak: periode.ønskerSamtidigUttak,
        stillingsprosent: periode.gradert === true ? periode.stillingsprosent : undefined,
        arbeidsform: periode.gradert === true ? periode.arbeidsform : undefined,
        harIkkeAktivitetskrav: periode.harIkkeAktivitetskrav,
        orgnr: periode.gradert === true ? periode.orgnr : undefined,
        erArbeidstaker: periode.gradert ? periode.erArbeidstaker : undefined,
        ønskerFlerbarnsdager: periode.ønskerFlerbarnsdager
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

const cleanupOpphold = (periode: Oppholdsperiode): Oppholdsperiode => {
    return {
        type: Periodetype.Opphold,
        id: periode.id,
        tidsperiode: periode.tidsperiode,
        vedlegg: periode.vedlegg,
        årsak: periode.årsak,
        forelder: periode.forelder
    };
};

export const cleanupPeriode = (periode: Periode, søker: Søker, annenForelder: AnnenForelder): Periode => {
    switch (periode.type) {
        case Periodetype.Overføring:
            return cleanupOverføring(periode);
        case Periodetype.Utsettelse:
            return cleanupUtsettelse(periode, søker, annenForelder);
        case Periodetype.Uttak:
            return cleanupUttak(periode, søker);
        case Periodetype.Opphold:
            return cleanupOpphold(periode);
    }
    return periode;
};
