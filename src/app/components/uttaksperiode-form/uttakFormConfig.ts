import { QuestionConfig, Questions, QuestionVisibility, questionIsAnswered } from '../../util/questions/Question';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger';
import {
    Uttaksperiode,
    Overføringsperiode,
    StønadskontoType,
    Periodetype,
    OverføringÅrsakType
} from '../../types/uttaksplan/periodetyper';
import { RecursivePartial } from '../../types/Partial';

export enum UttakSpørsmålKeys {
    'tidsperiode' = 'tidsperiode',
    'kvote' = 'kvote',
    'samtidigUttak' = 'samtidigUttak',
    'aktivitetskravMor' = 'aktivitetskravMor',
    'overføringsårsak' = 'overføringsårsak',
    'overføringsdokumentasjon' = 'overføringsdokumentasjon'
}

export type UttaksFormPeriodeType = RecursivePartial<Uttaksperiode> | RecursivePartial<Overføringsperiode>;

export interface UttakFormPayload {
    periode: UttaksFormPeriodeType;
    velgbareStønadskontotyper: StønadskontoType[];
    kanEndreStøndskonto: boolean;
    søkerErAleneOmOmsorg: boolean;
    søkerErFarEllerMedmor: boolean;
}

export type UttakSpørsmålVisibility = QuestionVisibility<UttakSpørsmålKeys>;

const Sp = UttakSpørsmålKeys;

const erUttakEgenKvote = (payload: UttakFormPayload): boolean => {
    const { søkerErFarEllerMedmor, periode } = payload;
    if (søkerErFarEllerMedmor) {
        return periode.konto === StønadskontoType.Fedrekvote;
    }
    return periode.konto === StønadskontoType.Mødrekvote;
};

const skalViseAktivitetskravMor = (payload: UttakFormPayload): boolean => {
    const { periode, søkerErFarEllerMedmor } = payload;
    if (søkerErFarEllerMedmor && periode.konto !== undefined && periode.konto === StønadskontoType.Fellesperiode) {
        return true;
    }
    return false;
};

const skalViseSamtidigUttak = (payload: UttakFormPayload): boolean => {
    const { periode, søkerErFarEllerMedmor } = payload;
    if (periode.type === Periodetype.Overføring || periode.konto === undefined) {
        return false;
    } else if (periode.type === Periodetype.Uttak && periode.konto !== undefined) {
        const erEgenKonto = erUttakEgenKvote(payload);
        const visAktivitetskravMor = skalViseAktivitetskravMor(payload);
        const aktivitetskravMorOk =
            (visAktivitetskravMor && questionIsAnswered(periode.morsAktivitetIPerioden)) ||
            visAktivitetskravMor === false;
        if (erEgenKonto && aktivitetskravMorOk) {
            return true;
        }
        if (søkerErFarEllerMedmor && periode.konto === StønadskontoType.Fellesperiode && aktivitetskravMorOk) {
            return true;
        }
        if (periode.konto === StønadskontoType.Flerbarnsuker && aktivitetskravMorOk) {
            return true;
        }
    }
    return false;
};

const visOverføringsdokumetasjon = (payload: UttakFormPayload): boolean => {
    const { periode } = payload;
    if (periode.type !== Periodetype.Overføring || periode.årsak === undefined) {
        return false;
    }
    return (
        periode.årsak !== OverføringÅrsakType.aleneomsorg ||
        (periode.årsak === OverføringÅrsakType.aleneomsorg && payload.søkerErFarEllerMedmor === true)
    );
};

export const uttaksperiodeFormConfig: QuestionConfig<UttakFormPayload, UttakSpørsmålKeys> = {
    [Sp.tidsperiode]: {
        isAnswered: ({ periode }) => getValidTidsperiode(periode.tidsperiode as Tidsperiode) !== undefined
    },
    [Sp.kvote]: {
        isAnswered: ({ periode }) => questionIsAnswered(periode.konto),
        parentQuestion: Sp.tidsperiode,
        condition: ({ kanEndreStøndskonto, velgbareStønadskontotyper }) =>
            kanEndreStøndskonto === true && velgbareStønadskontotyper.length > 0
    },
    [Sp.aktivitetskravMor]: {
        isAnswered: ({ periode }) =>
            periode.type === Periodetype.Uttak &&
            periode.konto === StønadskontoType.Fellesperiode &&
            periode.morsAktivitetIPerioden !== undefined,
        condition: (payload) => skalViseAktivitetskravMor(payload)
    },
    [Sp.samtidigUttak]: {
        isAnswered: ({ periode }) =>
            periode.type === Periodetype.Uttak && questionIsAnswered(periode.ønskerSamtidigUttak),
        condition: (payload) => skalViseSamtidigUttak(payload)
    },
    [Sp.overføringsårsak]: {
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionIsAnswered(periode.årsak),
        condition: (payload) => payload.periode.type === Periodetype.Overføring && erUttakEgenKvote(payload) === false
    },
    [Sp.overføringsdokumentasjon]: {
        isOptional: () => true,
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionIsAnswered(periode.årsak),
        condition: (payload) => visOverføringsdokumetasjon(payload)
    }
};

export const getUttakFormVisibility = (
    periode: UttaksFormPeriodeType,
    velgbareStønadskontotyper: StønadskontoType[],
    kanEndreStøndskonto: boolean,
    søkerErAleneOmOmsorg: boolean,
    søkerErFarEllerMedmor: boolean
): UttakSpørsmålVisibility => {
    return Questions(uttaksperiodeFormConfig).getVisbility({
        periode,
        velgbareStønadskontotyper,
        kanEndreStøndskonto,
        søkerErAleneOmOmsorg,
        søkerErFarEllerMedmor
    });
};
