import { QuestionConfig, Questions } from '../../util/questions/Question';
import {
    Utsettelsesperiode,
    Oppholdsperiode,
    UtsettelseÅrsakType,
    UtsettelsePgaArbeidPeriode,
    Periode,
    Periodetype
} from '../../types/uttaksplan/periodetyper';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Utsettelsesvariant } from './UtsettelsesperiodeForm';
import { RecursivePartial } from '../../types/Partial';
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
    periode: RecursivePartial<Utsettelsesperiode> | RecursivePartial<Oppholdsperiode>;
    variant?: Utsettelsesvariant;
    søkerErAleneOmOmsorg: boolean;
    søkerErFarEllerMedmor: boolean;
}

const Sp = UtsettelseSpørsmålKeys;

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
        parentQuestion: Sp.variant
    },
    [Sp.ferieinfo]: {
        getValue: () => true,
        condition: ({ periode, variant }) =>
            periode.årsak === UtsettelseÅrsakType.Ferie || variant === Utsettelsesvariant.Ferie
    },
    [Sp.arbeidsplass]: {
        getValue: ({ periode }) => (periode as UtsettelsePgaArbeidPeriode).årsak,
        condition: ({ periode, variant }) =>
            periode.årsak === UtsettelseÅrsakType.Arbeid || variant === Utsettelsesvariant.ArbeidHeltid
    },
    [Sp.morsAktivitet]: {
        getValue: ({ periode }) => (periode as Utsettelsesperiode).morsAktivitetIPerioden,
        condition: (payload) =>
            payload.søkerErAleneOmOmsorg === false &&
            payload.søkerErFarEllerMedmor === true &&
            payload.variant !== undefined
    }
};

export const getUtsettelsesperiodeVisibility = (
    periode: RecursivePartial<Periode>,
    variant: Utsettelsesvariant | undefined,
    søkerErAleneOmOmsorg: boolean,
    søkerErFarEllerMedmor: boolean
) => {
    if (periode.type === Periodetype.Utsettelse || periode.type === Periodetype.Opphold) {
        return Questions(utsettelsesperiodeVisibilityConfig).getVisbility({
            periode,
            variant,
            søkerErAleneOmOmsorg,
            søkerErFarEllerMedmor
        });
    }
    return undefined;
};
