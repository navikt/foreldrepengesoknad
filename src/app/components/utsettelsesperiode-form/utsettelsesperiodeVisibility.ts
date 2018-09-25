import { QuestionConfig, Questions } from '../../util/questions/Question';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Utsettelsesvariant, UtsettelsperiodeFormdata } from './UtsettelsesperiodeForm';
import { Tidsperiode } from 'nav-datovelger';

export enum UtsettelseSpørsmålKeys {
    'tidsperiode' = 'tidsperiode',
    'variant' = 'variant',
    'sykdomsårsak' = 'sykdomsårsak',
    'arbeidsplass' = 'arbeidsplass',
    'morsAktivitet' = 'morsAktivitet',
    'oppholdsårsak' = 'oppholdsårsak',
    'ferieinfo' = 'ferieinfo'
}

export interface UtsettelsesPayload {
    formdata: UtsettelsperiodeFormdata;
    søkerErAleneOmOmsorg: boolean;
    søkerErFarEllerMedmor: boolean;
}

const Sp = UtsettelseSpørsmålKeys;

const harRegistrertArbeidOk = (formdata: UtsettelsperiodeFormdata) =>
    (formdata.variant === Utsettelsesvariant.Arbeid && formdata.orgnr !== undefined) ||
    formdata.skalJobbeSomFrilansEllerSelvstendigNæringsdrivende === true;
const harRegistrerSykdomOk = (formdata: UtsettelsperiodeFormdata) =>
    formdata.variant === Utsettelsesvariant.Sykdom && formdata.sykdomsårsak !== undefined;

export const utsettelsesperiodeVisibilityConfig: QuestionConfig<UtsettelsesPayload, UtsettelseSpørsmålKeys> = {
    [Sp.tidsperiode]: {
        getValue: ({ formdata }) => getValidTidsperiode(formdata.tidsperiode as Tidsperiode)
    },
    [Sp.variant]: {
        getValue: ({ formdata }) => formdata.variant,
        parentQuestion: Sp.tidsperiode
    },
    [Sp.sykdomsårsak]: {
        getValue: ({ formdata }) => formdata.sykdomsårsak,
        parentQuestion: Sp.variant,
        condition: ({ formdata }) => formdata.variant === Utsettelsesvariant.Sykdom
    },
    [Sp.ferieinfo]: {
        getValue: () => true,
        condition: ({ formdata }) => formdata.variant === Utsettelsesvariant.Ferie
    },
    [Sp.arbeidsplass]: {
        getValue: ({ formdata }) =>
            formdata.orgnr !== undefined || formdata.skalJobbeSomFrilansEllerSelvstendigNæringsdrivende !== undefined,
        condition: ({ formdata }) => formdata.variant === Utsettelsesvariant.Arbeid
    },
    [Sp.morsAktivitet]: {
        getValue: ({ formdata }) => formdata.morsAktivitetIPerioden,
        condition: ({ formdata, søkerErAleneOmOmsorg, søkerErFarEllerMedmor }) =>
            (formdata.variant === Utsettelsesvariant.Ferie ||
                harRegistrertArbeidOk(formdata) ||
                harRegistrerSykdomOk(formdata)) &&
            søkerErAleneOmOmsorg === false &&
            søkerErFarEllerMedmor === true
    }
};

export const getUtsettelsesperiodeVisibility = (
    formdata: UtsettelsperiodeFormdata,
    søkerErAleneOmOmsorg: boolean,
    søkerErFarEllerMedmor: boolean
) => {
    return Questions(utsettelsesperiodeVisibilityConfig).getVisbility({
        formdata,
        søkerErAleneOmOmsorg,
        søkerErFarEllerMedmor
    });
};
