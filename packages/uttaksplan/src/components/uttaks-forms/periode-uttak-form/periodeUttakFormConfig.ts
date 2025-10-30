import { Arbeidsform, Forelder, UttakRundtFødselÅrsak } from '@navikt/fp-common';
import { KontoTypeUttak_fpoversikt, MorsAktivitet_fpoversikt, UttakOverføringÅrsak_fpoversikt } from '@navikt/fp-types';

import { YesOrNo, getTypedFormComponents } from '../../../formik-wrappers';

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
    [PeriodeUttakFormField.konto]: KontoTypeUttak_fpoversikt | '';
    [PeriodeUttakFormField.samtidigUttak]: YesOrNo;
    [PeriodeUttakFormField.aktivitetskravMor]: MorsAktivitet_fpoversikt | '';
    [PeriodeUttakFormField.overføringsårsak]: UttakOverføringÅrsak_fpoversikt | '';
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
