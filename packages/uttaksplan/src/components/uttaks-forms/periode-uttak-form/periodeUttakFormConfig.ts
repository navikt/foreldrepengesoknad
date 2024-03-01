import { YesOrNo, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

import {
    Arbeidsform,
    Forelder,
    MorsAktivitet,
    OverføringÅrsakType,
    StønadskontoType,
    UttakRundtFødselÅrsak,
} from '@navikt/fp-common';

export enum PeriodeUttakFormField {
    fom = 'fom',
    tom = 'tom',
    konto = 'konto',
    samtidigUttak = 'samtidigUttak',
    aktivitetskravMor = 'aktivitetskravMor',
    overføringsårsak = 'overføringsårsak',
    skalHaGradering = 'skalHaGradering',
    stillingsprosent = 'stillingsprosent',
    arbeidsformer = 'arbeidsformer',
    erMorForSyk = 'erMorForSyk',
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
    [PeriodeUttakFormField.overføringsårsak]: OverføringÅrsakType | '';
    [PeriodeUttakFormField.skalHaGradering]: YesOrNo;
    [PeriodeUttakFormField.stillingsprosent]: string;
    [PeriodeUttakFormField.arbeidsformer]: Arbeidsform | '';
    [PeriodeUttakFormField.erMorForSyk]: YesOrNo;
    [PeriodeUttakFormField.uttakRundtFødselÅrsak]: UttakRundtFødselÅrsak | '';
    [PeriodeUttakFormField.samtidigUttakProsent]: string;
    [PeriodeUttakFormField.hvemSkalTaUttak]: Forelder | '';
    [PeriodeUttakFormField.ønskerFlerbarnsdager]: YesOrNo;
}

export const PeriodeUttakFormComponents = getTypedFormComponents<PeriodeUttakFormField, PeriodeUttakFormData>();
