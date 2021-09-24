import { QuestionConfig, Questions, QuestionVisibility, questionValueIsOk } from '../../../../util/questions/Question';
import { getValidTidsperiode, isValidTidsperiode } from '../../../../util/uttaksplan/Tidsperioden';
import {
    StønadskontoType,
    Periodetype,
    OverføringÅrsakType,
    isForeldrepengerFørFødselUttaksperiode,
    isUttaksperiode,
    Uttaksperiode,
    isOverføringsperiode,
    isOppholdsperiode,
} from '../../../../types/uttaksplan/periodetyper';
import { UttakFormPeriodeType } from './UttakForm';
import { getStønadskontoFromOppholdsårsak } from 'app/util/uttaksplan/uttaksperiodeUtils';
import { Tidsperiode } from 'common/types';
import { Søknadsinfo } from 'app/selectors/types';
import { Søknadsperiode } from 'app/regler/søknadsperioden/Søknadsperioden';
import { UttakSkjemaregler } from 'app/regler/uttak/uttaksskjema/uttakSkjemaregler';

export enum UttakSpørsmålKeys {
    'tidsperiode' = 'tidsperiode',
    'kvote' = 'kvote',
    'samtidigUttak' = 'samtidigUttak',
    'aktivitetskravMor' = 'aktivitetskravMor',
    'overføringsårsak' = 'overføringsårsak',
    'overføringsdokumentasjon' = 'overføringsdokumentasjon',
    'skalHaGradering' = 'skalHaGradering',
    'stillingsprosent' = 'stillingsprosent',
    'hvorSkalDuJobbe' = 'hvorSkalDuJobbe',
    'erMorForSyk' = 'erMorForSyk',
    'samtidigUttakProsent' = 'samtidigUttakProsent',
    'hvemSkalTaUttak' = 'hvemSkalTaUttak',
    'ønskerFlerbarnsdager' = 'ønskerFlerbarnsdager',
}

export interface UttakFormPayload {
    periode: UttakFormPeriodeType;
    velgbareStønadskontotyper: StønadskontoType[];
    kanEndreStønadskonto: boolean;
    søknadsinfo: Søknadsinfo;
    søknadsperiode: Søknadsperiode;
    skjemaregler: UttakSkjemaregler;
}

export type UttakSpørsmålVisibility = QuestionVisibility<UttakSpørsmålKeys>;

const Sp = UttakSpørsmålKeys;

const visKvote = (payload: UttakFormPayload): boolean => {
    const { kanEndreStønadskonto, velgbareStønadskontotyper, søknadsperiode } = payload;
    return kanEndreStønadskonto === true && velgbareStønadskontotyper.length > 0 && søknadsperiode.erUttakEtterFødsel();
};

const visAktivitetskravMor = (payload: UttakFormPayload): boolean => {
    const { periode, skjemaregler } = payload;

    if (isUttaksperiode(periode)) {
        if (skjemaregler.erMorForSykSkalBesvares() && periode.erMorForSyk !== undefined) {
            return false;
        }

        if (skjemaregler.ønskerFlerbarnsdagerSkalBesvares() && periode.ønskerFlerbarnsdager === undefined) {
            return false;
        }

        return skjemaregler.samtidigUttakSkalBesvares()
            ? periode.ønskerSamtidigUttak !== undefined
            : periode.konto !== undefined;
    } else {
        return false;
    }
};

const visSamtidigUttak = (payload: UttakFormPayload): boolean => {
    const { periode, skjemaregler } = payload;

    if (isUttaksperiode(periode) && periode.konto !== StønadskontoType.Foreldrepenger) {
        if (periode.konto === undefined) {
            return false;
        }

        if (skjemaregler.ønskerFlerbarnsdagerSkalBesvares() && periode.ønskerFlerbarnsdager === undefined) {
            return false;
        }

        if (skjemaregler.erMorForSykSkalBesvares() && periode.erMorForSyk === false) {
            return false;
        }

        return true;
    }

    return false;
};

const visOverføringsdokumentasjon = (payload: UttakFormPayload): boolean => {
    const { periode, søknadsinfo } = payload;
    if (!isOverføringsperiode(periode) || periode.årsak === undefined) {
        return false;
    }

    return (
        periode.årsak !== OverføringÅrsakType.aleneomsorg ||
        (periode.årsak === OverføringÅrsakType.aleneomsorg && søknadsinfo.søker.erFarEllerMedmor === true)
    );
};

const visGradering = (payload: UttakFormPayload): boolean => {
    const { periode, skjemaregler } = payload;

    if (isUttaksperiode(periode)) {
        if (getValidTidsperiode(periode.tidsperiode) === undefined) {
            return false;
        }

        if (
            periode.konto === undefined ||
            (skjemaregler.samtidigUttakSkalBesvares() && periode.ønskerSamtidigUttak === undefined) ||
            (skjemaregler.ønskerFlerbarnsdagerSkalBesvares() && periode.ønskerFlerbarnsdager === undefined) ||
            (skjemaregler.aktivitetskravMorSkalBesvares() && periode.morsAktivitetIPerioden === undefined) ||
            (skjemaregler.erMorForSykSkalBesvares() && periode.erMorForSyk !== true)
        ) {
            return false;
        }
        return true;
    }

    return false;
};

const hvorSkalDuJobbeErBesvart = (payload: UttakFormPayload): boolean => {
    const periode = payload.periode as Uttaksperiode;
    return (
        isUttaksperiode(periode) &&
        ((periode.arbeidsformer !== undefined && periode.arbeidsformer.length > 0) ||
            (periode.orgnumre !== undefined && periode.orgnumre.length > 0))
    );
};

const visErMorForSyk = () => {
    return true;
};

const visØnskerFlerbarnsdager = (payload: UttakFormPayload) => {
    const { periode, søknadsinfo } = payload;

    if (isUttaksperiode(periode) && søknadsinfo.søknaden.erFlerbarnssøknad) {
        if (!isValidTidsperiode(periode.tidsperiode)) {
            return false;
        }

        return (
            periode.konto === StønadskontoType.Fellesperiode ||
            periode.konto === StønadskontoType.Fedrekvote ||
            periode.konto === StønadskontoType.Foreldrepenger
        );
    }

    return false;
};

export const uttaksperiodeFormConfig: QuestionConfig<UttakFormPayload, UttakSpørsmålKeys> = {
    [Sp.tidsperiode]: {
        isAnswered: ({ periode }) =>
            getValidTidsperiode(periode.tidsperiode as Tidsperiode) !== undefined ||
            (isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin === true),
    },
    [Sp.kvote]: {
        isAnswered: ({ periode }) =>
            ((isUttaksperiode(periode) || isOverføringsperiode(periode)) && questionValueIsOk(periode.konto)) ||
            (isOppholdsperiode(periode) && questionValueIsOk(getStønadskontoFromOppholdsårsak(periode.årsak))),
        parentQuestion: Sp.tidsperiode,
        isIncluded: (payload) => visKvote(payload),
    },
    [Sp.erMorForSyk]: {
        isAnswered: ({ periode }) =>
            (isUttaksperiode(periode) &&
                (periode.konto === StønadskontoType.Fedrekvote || periode.konto === StønadskontoType.Foreldrepenger) &&
                periode.erMorForSyk !== undefined) ||
            isOppholdsperiode(periode),
        parentQuestion: Sp.kvote,
        isIncluded: ({ skjemaregler }) => skjemaregler.erMorForSykSkalBesvares(),
        visibilityFilter: () => visErMorForSyk(),
    },
    [Sp.ønskerFlerbarnsdager]: {
        isAnswered: ({ periode }) =>
            (isUttaksperiode(periode) && questionValueIsOk(periode.ønskerFlerbarnsdager)) || isOppholdsperiode(periode),
        isIncluded: ({ skjemaregler }) => skjemaregler.ønskerFlerbarnsdagerSkalBesvares(),
        visibilityFilter: (payload) => visØnskerFlerbarnsdager(payload),
    },
    [Sp.aktivitetskravMor]: {
        isAnswered: ({ periode }) =>
            (isUttaksperiode(periode) &&
                periode.morsAktivitetIPerioden !== undefined &&
                periode.morsAktivitetIPerioden.length > 0) ||
            isOppholdsperiode(periode),
        parentQuestion: Sp.tidsperiode,
        isIncluded: ({ skjemaregler }) => skjemaregler.aktivitetskravMorSkalBesvares(),
        visibilityFilter: (payload) => visAktivitetskravMor(payload),
    },
    [Sp.samtidigUttak]: {
        isAnswered: ({ periode }) =>
            (isUttaksperiode(periode) && questionValueIsOk(periode.ønskerSamtidigUttak)) || isOppholdsperiode(periode),
        parentQuestion: Sp.tidsperiode,
        isIncluded: ({ skjemaregler }) => skjemaregler.samtidigUttakSkalBesvares(),
        visibilityFilter: (payload) => visSamtidigUttak(payload),
    },
    [Sp.samtidigUttakProsent]: {
        isAnswered: ({ periode }) =>
            (isUttaksperiode(periode) && questionValueIsOk(periode.samtidigUttakProsent)) || isOppholdsperiode(periode),
        parentQuestion: Sp.samtidigUttak,
        isIncluded: ({ periode }) => isUttaksperiode(periode) && periode.ønskerSamtidigUttak === true,
    },
    [Sp.overføringsårsak]: {
        isAnswered: ({ periode }) =>
            (periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak)) || isOppholdsperiode(periode),
        isIncluded: (payload) => payload.skjemaregler.overføringsårsakSkalBesvares(),
    },
    [Sp.overføringsdokumentasjon]: {
        isOptional: () => true,
        isAnswered: ({ periode }) =>
            (periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak)) || isOppholdsperiode(periode),
        isIncluded: (payload) => visOverføringsdokumentasjon(payload),
    },
    [Sp.skalHaGradering]: {
        isAnswered: ({ periode }) =>
            (isUttaksperiode(periode) && questionValueIsOk(periode.gradert)) || isOppholdsperiode(periode),
        isIncluded: ({ skjemaregler }) => skjemaregler.graderingSkalBesvares(),
        visibilityFilter: (payload) => visGradering(payload),
    },
    [Sp.stillingsprosent]: {
        isAnswered: ({ periode }) =>
            (isUttaksperiode(periode) && questionValueIsOk(periode.stillingsprosent)) || isOppholdsperiode(periode),
        parentQuestion: Sp.skalHaGradering,
        isIncluded: ({ periode }) => isUttaksperiode(periode) && periode.gradert === true,
    },
    [Sp.hvorSkalDuJobbe]: {
        isAnswered: (payload) => hvorSkalDuJobbeErBesvart(payload) || isOppholdsperiode(payload.periode),
        parentQuestion: Sp.stillingsprosent,
    },
};

export const getUttakFormVisibility = (payload: UttakFormPayload): UttakSpørsmålVisibility => {
    return Questions(uttaksperiodeFormConfig).getVisbility(payload);
};
