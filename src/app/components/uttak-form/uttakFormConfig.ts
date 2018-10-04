import { QuestionConfig, Questions, QuestionVisibility, questionValueIsOk } from '../../util/questions/Question';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger';
import {
    StønadskontoType,
    Periodetype,
    OverføringÅrsakType,
    isForeldrepengerFørFødselUttaksperiode
} from '../../types/uttaksplan/periodetyper';
import { UttakFormPeriodeType } from './UttakForm';

export enum UttakSpørsmålKeys {
    'tidsperiode' = 'tidsperiode',
    'kvote' = 'kvote',
    'samtidigUttak' = 'samtidigUttak',
    'aktivitetskravMor' = 'aktivitetskravMor',
    'overføringsårsak' = 'overføringsårsak',
    'overføringsdokumentasjon' = 'overføringsdokumentasjon',
    'skalHaGradering' = 'skalHaGradering',
    'stillingsprosent' = 'stillingsprosent',
    'hvorSkalDuJobbe' = 'hvorSkalDuJobbe'
}

export interface UttakFormPayload {
    periode: UttakFormPeriodeType;
    velgbareStønadskontotyper: StønadskontoType[];
    kanEndreStønadskonto: boolean;
    søkerErAleneOmOmsorg: boolean;
    søkerErFarEllerMedmor: boolean;
    annenForelderHarRett: boolean;
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

const visAktivitetskravMor = (payload: UttakFormPayload): boolean => {
    const { periode, søkerErFarEllerMedmor } = payload;
    if (søkerErFarEllerMedmor && periode.konto !== undefined && periode.konto === StønadskontoType.Fellesperiode) {
        return true;
    }
    return false;
};

const visSamtidigUttak = (payload: UttakFormPayload): boolean => {
    const { periode, søkerErFarEllerMedmor } = payload;
    if (periode.type === Periodetype.Overføring || periode.konto === undefined) {
        return false;
    } else if (periode.type === Periodetype.Uttak && periode.konto !== undefined) {
        const erEgenKonto = erUttakEgenKvote(payload);
        const aktivitetskravMor = visAktivitetskravMor(payload);
        const aktivitetskravMorOk =
            (aktivitetskravMor && questionValueIsOk(periode.morsAktivitetIPerioden)) || aktivitetskravMor === false;
        if (periode.konto === StønadskontoType.Fellesperiode && søkerErFarEllerMedmor === true && aktivitetskravMorOk) {
            return true;
        }
        if (periode.konto === StønadskontoType.Fellesperiode && søkerErFarEllerMedmor === false) {
            return true;
        }
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

const visOverføringsdokumentasjon = (payload: UttakFormPayload): boolean => {
    const { periode } = payload;
    if (periode.type !== Periodetype.Overføring || periode.årsak === undefined) {
        return false;
    }
    return (
        periode.årsak !== OverføringÅrsakType.aleneomsorg ||
        (periode.årsak === OverføringÅrsakType.aleneomsorg && payload.søkerErFarEllerMedmor === true)
    );
};

const visGradering = (payload: UttakFormPayload): boolean => {
    const { periode } = payload;
    if (periode.type !== Periodetype.Uttak) {
        return false;
    }
    if (erUttakEgenKvote(payload) && periode.ønskerSamtidigUttak !== undefined) {
        return true;
    }
    return periode.type === Periodetype.Uttak && periode.ønskerSamtidigUttak !== undefined;
};

export const uttaksperiodeFormConfig: QuestionConfig<UttakFormPayload, UttakSpørsmålKeys> = {
    [Sp.tidsperiode]: {
        isAnswered: ({ periode }) =>
            getValidTidsperiode(periode.tidsperiode as Tidsperiode) !== undefined ||
            (isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin === true)
    },
    [Sp.kvote]: {
        isAnswered: ({ periode }) => questionValueIsOk(periode.konto),
        parentQuestion: Sp.tidsperiode,
        condition: ({ kanEndreStønadskonto, velgbareStønadskontotyper }) =>
            kanEndreStønadskonto === true && velgbareStønadskontotyper.length > 0
    },
    [Sp.aktivitetskravMor]: {
        isAnswered: ({ periode }) =>
            periode.type === Periodetype.Uttak &&
            periode.konto === StønadskontoType.Fellesperiode &&
            periode.morsAktivitetIPerioden !== undefined,
        parentQuestion: Sp.tidsperiode,
        condition: (payload) => visAktivitetskravMor(payload)
    },
    [Sp.samtidigUttak]: {
        isAnswered: ({ periode }) =>
            periode.type === Periodetype.Uttak && questionValueIsOk(periode.ønskerSamtidigUttak),
        parentQuestion: Sp.tidsperiode,
        condition: (payload) => visSamtidigUttak(payload)
    },
    [Sp.overføringsårsak]: {
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak),
        condition: (payload) => payload.periode.type === Periodetype.Overføring && erUttakEgenKvote(payload) === false
    },
    [Sp.overføringsdokumentasjon]: {
        isOptional: () => true,
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak),
        condition: (payload) => visOverføringsdokumentasjon(payload)
    },
    [Sp.skalHaGradering]: {
        isAnswered: ({ periode }) => periode.type === Periodetype.Uttak && questionValueIsOk(periode.gradert),
        condition: (payload) => visGradering(payload)
    },
    [Sp.stillingsprosent]: {
        isAnswered: ({ periode }) => periode.type === Periodetype.Uttak && questionValueIsOk(periode.stillingsprosent),
        parentQuestion: Sp.skalHaGradering,
        condition: ({ periode }) => periode.type === Periodetype.Uttak && periode.gradert === true
    },
    [Sp.hvorSkalDuJobbe]: {
        isAnswered: ({ periode }) => periode.type === Periodetype.Uttak && questionValueIsOk(periode.orgnr),
        parentQuestion: Sp.stillingsprosent
    }
};

export const getUttakFormVisibility = (payload: UttakFormPayload): UttakSpørsmålVisibility => {
    return Questions(uttaksperiodeFormConfig).getVisbility(payload);
};
