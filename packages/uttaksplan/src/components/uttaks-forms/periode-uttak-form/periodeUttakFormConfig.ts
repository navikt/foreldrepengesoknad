import { Attachment, Forelder, MorsAktivitet, StønadskontoType, OverføringÅrsakType } from '@navikt/fp-common';
import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { Arbeidsform } from 'types/Periode';
import { UttakRundtFødselÅrsak } from 'types/UttakRundtFødselÅrsak';

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

export const PeriodeUttakFormComponents = getTypedFormComponents<PeriodeUttakFormField, PeriodeUttakFormData>();
