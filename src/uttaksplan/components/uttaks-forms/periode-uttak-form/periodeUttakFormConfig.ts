import { getTypedFormComponents, YesOrNo } from '@navikt/sif-common-formik/lib';
import { Attachment } from 'app/types/Attachment';
import { Forelder } from 'app/types/Forelder';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { OverføringÅrsakType } from 'uttaksplan/types/OverføringÅrsakType';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export enum PeriodeUttakFormField {
    fom = 'fom',
    tom = 'tom',
    kvote = 'kvote',
    samtidigUttak = 'samtidigUttak',
    aktivitetskravMor = 'aktivitetskravMor',
    aktivitetskravMorDokumentasjon = 'aktivitetskravMorDokumentasjon',
    overføringsårsak = 'overføringsårsak',
    overføringsdokumentasjon = 'overføringsdokumentasjon',
    skalHaGradering = 'skalHaGradering',
    stillingsprosent = 'stillingsprosent',
    hvorSkalDuJobbe = 'hvorSkalDuJobbe',
    erMorForSyk = 'erMorForSyk',
    samtidigUttakProsent = 'samtidigUttakProsent',
    hvemSkalTaUttak = 'hvemSkalTaUttak',
    ønskerFlerbarnsdager = 'ønskerFlerbarnsdager',
}

export interface PeriodeUttakFormData {
    [PeriodeUttakFormField.fom]: string;
    [PeriodeUttakFormField.tom]: string;
    [PeriodeUttakFormField.kvote]: StønadskontoType;
    [PeriodeUttakFormField.samtidigUttak]?: YesOrNo;
    [PeriodeUttakFormField.aktivitetskravMor]?: MorsAktivitet;
    [PeriodeUttakFormField.aktivitetskravMorDokumentasjon]?: Attachment[];
    [PeriodeUttakFormField.overføringsårsak]?: OverføringÅrsakType;
    [PeriodeUttakFormField.overføringsdokumentasjon]?: Attachment[];
    [PeriodeUttakFormField.skalHaGradering]: YesOrNo;
    [PeriodeUttakFormField.stillingsprosent]?: string;
    [PeriodeUttakFormField.hvorSkalDuJobbe]?: string;
    [PeriodeUttakFormField.erMorForSyk]?: YesOrNo;
    [PeriodeUttakFormField.samtidigUttakProsent]?: string;
    [PeriodeUttakFormField.hvemSkalTaUttak]?: Forelder;
    [PeriodeUttakFormField.ønskerFlerbarnsdager]?: YesOrNo;
}

export const PeriodeUttakFormComponents = getTypedFormComponents<PeriodeUttakFormField, PeriodeUttakFormData, string>();
