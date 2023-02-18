import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import { Attachment } from 'app/types/Attachment';
import { Forelder } from 'app/types/Forelder';
import { UttakRundtFødselÅrsak } from 'app/types/UttakRundtFødselÅrsak';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { OverføringÅrsakType } from 'uttaksplan/types/OverføringÅrsakType';
import { Arbeidsform } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export enum PeriodeUttakFormField {
    fom = 'fom',
    tom = 'tom',
    konto = 'konto',
    samtidigUttak = 'samtidigUttak',
    aktivitetskravMor = 'aktivitetskravMor',
    aktivitetskravMorDokumentasjon = 'aktivitetskravMorDokumentasjon',
    overføringsårsak = 'overføringsårsak',
    overføringsdokumentasjon = 'overføringsdokumentasjon',
    skalHaGradering = 'skalHaGradering',
    stillingsprosent = 'stillingsprosent',
    arbeidsformer = 'arbeidsformer',
    erMorForSyk = 'erMorForSyk',
    erMorForSykDokumentasjon = 'erMorForSykDokumentasjon',
    uttakRundtFødselÅrsak = 'uttakRundtFødselÅrsak',
    samtidigUttakProsent = 'samtidigUttakProsent',
    hvemSkalTaUttak = 'hvemSkalTaUttak',
    ønskerFlerbarnsdager = 'ønskerFlerbarnsdager',
}

export interface PeriodeUttakFormData {
    [PeriodeUttakFormField.fom]: Date | undefined;
    [PeriodeUttakFormField.tom]: Date | undefined;
    [PeriodeUttakFormField.konto]: StønadskontoType | '';
    [PeriodeUttakFormField.samtidigUttak]: YesOrNo;
    [PeriodeUttakFormField.aktivitetskravMor]: MorsAktivitet | '';
    [PeriodeUttakFormField.aktivitetskravMorDokumentasjon]: Attachment[];
    [PeriodeUttakFormField.overføringsårsak]: OverføringÅrsakType | '';
    [PeriodeUttakFormField.overføringsdokumentasjon]: Attachment[];
    [PeriodeUttakFormField.skalHaGradering]: YesOrNo;
    [PeriodeUttakFormField.stillingsprosent]: string;
    [PeriodeUttakFormField.arbeidsformer]: Arbeidsform | '';
    [PeriodeUttakFormField.erMorForSyk]: YesOrNo;
    [PeriodeUttakFormField.erMorForSykDokumentasjon]: Attachment[];
    [PeriodeUttakFormField.uttakRundtFødselÅrsak]: UttakRundtFødselÅrsak | '';
    [PeriodeUttakFormField.samtidigUttakProsent]: string;
    [PeriodeUttakFormField.hvemSkalTaUttak]: Forelder | '';
    [PeriodeUttakFormField.ønskerFlerbarnsdager]: YesOrNo;
}

export const PeriodeUttakFormComponents = getTypedFormComponents<PeriodeUttakFormField, PeriodeUttakFormData, string>();
