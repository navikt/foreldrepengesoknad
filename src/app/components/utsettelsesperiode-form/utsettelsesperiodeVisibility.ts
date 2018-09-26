import { QuestionConfig, Questions } from '../../util/questions/Question';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Utsettelsesvariant, UtsettelseperiodeFormPeriodeType } from './UtsettelsesperiodeForm';
import { Tidsperiode } from 'nav-datovelger';
import { RecursivePartial } from '../../types/Partial';
import {
    UtsettelsePgaArbeidPeriode,
    UtsettelseÅrsakType,
    Utsettelsesperiode
} from '../../types/uttaksplan/periodetyper';

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
    variant: Utsettelsesvariant | undefined;
    periode: UtsettelseperiodeFormPeriodeType;
    søkerErAleneOmOmsorg: boolean;
    søkerErFarEllerMedmor: boolean;
}

const Sp = UtsettelseSpørsmålKeys;

const harRegistrertArbeidOk = (variant: Utsettelsesvariant, periode: RecursivePartial<UtsettelsePgaArbeidPeriode>) =>
    (variant === Utsettelsesvariant.Arbeid && periode.orgnr !== undefined) ||
    periode.skalJobbeSomFrilansEllerSelvstendigNæringsdrivende === true;

export const utsettelsesperiodeVisibilityConfig: QuestionConfig<UtsettelsesPayload, UtsettelseSpørsmålKeys> = {
    [Sp.tidsperiode]: {
        getValue: ({ periode }) => getValidTidsperiode(periode.tidsperiode as Tidsperiode)
    },
    [Sp.variant]: {
        getValue: ({ variant }) => variant,
        parentQuestion: Sp.tidsperiode
    },
    [Sp.sykdomsårsak]: {
        getValue: ({ periode }) => periode.årsak,
        condition: ({ variant }) => variant === Utsettelsesvariant.Sykdom
    },
    [Sp.ferieinfo]: {
        getValue: () => true,
        condition: ({ variant }) => variant === Utsettelsesvariant.Ferie
    },
    [Sp.arbeidsplass]: {
        getValue: ({ periode }) =>
            periode.årsak === UtsettelseÅrsakType.Arbeid &&
            (periode.orgnr !== undefined || periode.skalJobbeSomFrilansEllerSelvstendigNæringsdrivende !== undefined),
        condition: ({ variant }) => variant === Utsettelsesvariant.Arbeid
    },
    [Sp.morsAktivitet]: {
        getValue: ({ periode }) => (periode as Utsettelsesperiode).morsAktivitetIPerioden,
        condition: ({ variant, periode, søkerErAleneOmOmsorg, søkerErFarEllerMedmor }) =>
            variant === Utsettelsesvariant.Ferie ||
            (periode.årsak === UtsettelseÅrsakType.Arbeid &&
                variant !== undefined &&
                harRegistrertArbeidOk(variant, periode) &&
                søkerErAleneOmOmsorg === false &&
                søkerErFarEllerMedmor === true)
    }
};

export const getUtsettelsesperiodeVisibility = (
    variant: Utsettelsesvariant | undefined,
    periode: UtsettelseperiodeFormPeriodeType,
    søkerErAleneOmOmsorg: boolean,
    søkerErFarEllerMedmor: boolean
) => {
    return Questions(utsettelsesperiodeVisibilityConfig).getVisbility({
        variant,
        periode,
        søkerErAleneOmOmsorg,
        søkerErFarEllerMedmor
    });
};
