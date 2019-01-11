import {
    ForeldrepengerFørFødselUttaksperiode,
    isForeldrepengerFørFødselUttaksperiode,
    isUttaksperiode,
    Oppholdsperiode,
    Overføringsperiode,
    Periode,
    Periodetype,
    StønadskontoType,
    Utsettelsesperiode,
    UtsettelseÅrsakType,
    Uttaksperiode
} from '../../types/uttaksplan/periodetyper';
import aktivitetskravMorUtil from '../domain/aktivitetskravMor';
import AnnenForelder from '../../types/søknad/AnnenForelder';
import { Søker } from '../../types/søknad/Søker';
import { getErSøkerFarEllerMedmor } from '../domain/personUtil';
import { UttakSpørsmålVisibility } from '../../components/uttak-form/uttakFormConfig';
import { UtsettelseFormPeriodeType } from '../../components/utsettelse-form/UtsettelseForm';
import { UtsettelseSpørsmålVisibility } from '../../components/utsettelse-form/utsettelseFormConfig';
import { UttakFormPeriodeType } from '../../components/uttak-form/UttakForm';
import { RecursivePartial } from '../../types/Partial';
import Søknad from '../../types/søknad/Søknad';
import { shouldPeriodeHaveAttachment } from '../attachments/missingAttachmentUtil';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { erÅrsakSykdomEllerInstitusjonsopphold } from '../uttaksplan/utsettelsesperiode';

const periodeKontotypeHasAktivitetskrav = (periode: Periode) => {
    if (isUttaksperiode(periode)) {
        const validPeriodeTypes: StønadskontoType[] = [
            StønadskontoType.Fellesperiode,
            StønadskontoType.Foreldrepenger,
            StønadskontoType.AktivitetsfriKvote
        ];
        if (validPeriodeTypes.includes(periode.konto)) {
            return true;
        }
    }

    return false;
};

const fjernIrrelevanteVedleggForUtsettelse = (
    attachments: Attachment[],
    fjernDokumentasjonForMorsAktivitet: boolean,
    fjernDokumentasjonForSykdom: boolean
) => {
    if (fjernDokumentasjonForMorsAktivitet) {
        attachments = attachments.filter((a: Attachment) => a.type !== AttachmentType.MORS_AKTIVITET_DOKUMENTASJON);
    }

    if (fjernDokumentasjonForSykdom) {
        attachments = attachments.filter((a: Attachment) => a.type !== AttachmentType.UTSETTELSE_SYKDOM);
    }
    return attachments;
};

const cleanupUtsettelse = (
    periode: Utsettelsesperiode,
    søker: Søker,
    annenForelder: AnnenForelder
): Utsettelsesperiode => {
    const erSøkerFarEllerMedmor = getErSøkerFarEllerMedmor(søker.rolle);
    const morsAktivitetIPerioden = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(erSøkerFarEllerMedmor, annenForelder)
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
        orgnumre: periode.årsak === UtsettelseÅrsakType.Arbeid ? periode.orgnumre : undefined,
        arbeidsformer: periode.årsak === UtsettelseÅrsakType.Arbeid ? periode.arbeidsformer : undefined,
        erArbeidstaker: periode.erArbeidstaker,
        vedlegg: shouldPeriodeHaveAttachment(periode, getErSøkerFarEllerMedmor(søker.rolle), annenForelder)
            ? periode.vedlegg &&
              fjernIrrelevanteVedleggForUtsettelse(
                  periode.vedlegg,
                  morsAktivitetIPerioden === undefined,
                  !erÅrsakSykdomEllerInstitusjonsopphold(periode.årsak)
              )
            : undefined
    };
};

const cleanupUttak = (
    periode: Uttaksperiode,
    søker: Søker,
    annenForelder: AnnenForelder,
    visibility?: UttakSpørsmålVisibility
): Uttaksperiode => {
    const uttaksperiode: Uttaksperiode = {
        type: Periodetype.Uttak,
        id: periode.id,
        konto: periode.konto,
        vedlegg: shouldPeriodeHaveAttachment(periode, getErSøkerFarEllerMedmor(søker.rolle), annenForelder)
            ? periode.vedlegg
            : undefined,
        forelder: periode.forelder,
        tidsperiode: periode.tidsperiode,
        gradert: periode.gradert,
        morsAktivitetIPerioden:
            periodeKontotypeHasAktivitetskrav(periode) && periode.morsAktivitetIPerioden
                ? periode.morsAktivitetIPerioden
                : undefined,
        ønskerSamtidigUttak: periode.ønskerSamtidigUttak,
        samtidigUttakProsent: periode.ønskerSamtidigUttak === true ? periode.samtidigUttakProsent : undefined,
        stillingsprosent: periode.gradert === true ? periode.stillingsprosent : undefined,
        arbeidsformer: periode.gradert === true ? periode.arbeidsformer : undefined,
        harIkkeAktivitetskrav: periode.harIkkeAktivitetskrav,
        orgnumre: periode.gradert === true ? periode.orgnumre : undefined,
        erArbeidstaker: periode.gradert ? periode.erArbeidstaker : undefined,
        ønskerFlerbarnsdager: periode.ønskerFlerbarnsdager,
        erMorForSyk: periode.erMorForSyk
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

export const cleanupNyPeriode = (
    periode: UtsettelseFormPeriodeType | UttakFormPeriodeType | Periode,
    søker: Søker,
    annenForelder: AnnenForelder,
    visibility?: UttakSpørsmålVisibility | UtsettelseSpørsmålVisibility
): RecursivePartial<UtsettelseFormPeriodeType | UttakFormPeriodeType> | Periode => {
    switch (periode.type) {
        case Periodetype.Overføring:
            return cleanupOverføring(periode as Overføringsperiode);
        case Periodetype.Utsettelse:
            return cleanupUtsettelse(periode as Utsettelsesperiode, søker, annenForelder);
        case Periodetype.Uttak:
            return cleanupUttak(periode as Uttaksperiode, søker, annenForelder, visibility as UttakSpørsmålVisibility);
        case Periodetype.Opphold:
            return cleanupOpphold(periode as Oppholdsperiode);
    }
    return periode;
};

function applyChangesAndCleanPeriode(
    periode: Periode,
    periodeChanges: RecursivePartial<Periode>,
    søknad: Søknad,
    visibility: UtsettelseSpørsmålVisibility | UttakSpørsmålVisibility
): Periode {
    const { søker, annenForelder } = søknad;
    let updatedPeriode = { ...periode };
    const type = periodeChanges.type || periode.type;
    if (type === Periodetype.Utsettelse) {
        updatedPeriode = {
            ...periode,
            ...(periodeChanges as Utsettelsesperiode)
        };
        updatedPeriode = PeriodeCleanup.cleanupUtsettelse(updatedPeriode, søker, annenForelder);
    } else if (type === Periodetype.Uttak) {
        updatedPeriode = {
            ...periode,
            ...(periodeChanges as Uttaksperiode)
        };
        updatedPeriode = PeriodeCleanup.cleanupUttak(
            updatedPeriode,
            søker,
            søknad.annenForelder,
            visibility as UttakSpørsmålVisibility
        );
    } else if (type === Periodetype.Overføring) {
        updatedPeriode = {
            ...periode,
            ...(periodeChanges as Overføringsperiode)
        };
        updatedPeriode = PeriodeCleanup.cleanupOverføring(updatedPeriode);
    } else if (type === Periodetype.Opphold) {
        updatedPeriode = { ...periode, ...(periodeChanges as Oppholdsperiode) };
        updatedPeriode = PeriodeCleanup.cleanupOpphold(updatedPeriode);
    }
    return updatedPeriode;
}

const PeriodeCleanup = {
    cleanupUttak,
    cleanupUtsettelse,
    cleanupOverføring,
    cleanupOpphold,
    cleanupNyPeriode,
    applyChangesAndCleanPeriode
};

export default PeriodeCleanup;
