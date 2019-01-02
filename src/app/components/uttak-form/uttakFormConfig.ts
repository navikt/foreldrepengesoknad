import { QuestionConfig, Questions, QuestionVisibility, questionValueIsOk } from '../../util/questions/Question';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger';
import {
    StønadskontoType,
    Periodetype,
    OverføringÅrsakType,
    isForeldrepengerFørFødselUttaksperiode,
    isUttaksperiode,
    Uttaksperiode
} from '../../types/uttaksplan/periodetyper';
import { UttakFormPeriodeType } from './UttakForm';
import { Søknadsinfo } from '../../selectors/types';
import { Søknadsperiode } from '../../regler/s\u00F8knadsperioden/S\u00F8knadsperioden';
import { UttakSkjemaregler } from '../../regler/uttak/uttakSkjemaregler';

export enum UttakSpørsmålKeys {
    'tidsperiode' = 'tidsperiode',
    'konto' = 'konto',
    'samtidigUttak' = 'samtidigUttak',
    'aktivitetskravMor' = 'aktivitetskravMor',
    'overføringsårsak' = 'overføringsårsak',
    'overføringsdokumentasjon' = 'overføringsdokumentasjon',
    'skalHaGradering' = 'skalHaGradering',
    'stillingsprosent' = 'stillingsprosent',
    'hvorSkalDuJobbe' = 'hvorSkalDuJobbe',
    'erMorForSyk' = 'erMorForSyk',
    'samtidigUttakProsent' = 'samtidigUttakProsent'
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

const visKontospørsmål = (payload: UttakFormPayload): boolean => {
    const { kanEndreStønadskonto, velgbareStønadskontotyper, søknadsperiode } = payload;
    return kanEndreStønadskonto === true && velgbareStønadskontotyper.length > 0 && søknadsperiode.erUttakEtterFødsel();
};

const visAktivitetskravMor = ({ periode }: UttakFormPayload): boolean => {
    return periode.konto !== undefined;
};

const visSamtidigUttak = (payload: UttakFormPayload): boolean => {
    const { periode } = payload;
    if (isUttaksperiode(periode)) {
        if (visErMorForSyk(payload) && periode.erMorForSyk === false) {
            return false;
        }
        if (visAktivitetskravMor(payload) && questionValueIsOk(periode.morsAktivitetIPerioden)) {
            return false;
        }
    }
    return true;
};

const visOverføringsdokumentasjon = (payload: UttakFormPayload): boolean => {
    const {
        periode,
        søknadsinfo: { søker }
    } = payload;
    if (periode.type !== Periodetype.Overføring || periode.årsak === undefined) {
        return false;
    }
    return (
        periode.årsak !== OverføringÅrsakType.aleneomsorg ||
        (periode.årsak === OverføringÅrsakType.aleneomsorg && søker.erFarEllerMedmor === true)
    );
};

const visGradering = (payload: UttakFormPayload): boolean => {
    const { periode, søknadsperiode } = payload;
    if (
        periode.konto === undefined ||
        periode.type !== Periodetype.Uttak ||
        søknadsperiode.erUttakFørFødsel() ||
        (visSamtidigUttak(payload) && periode.ønskerSamtidigUttak === undefined) ||
        (visAktivitetskravMor(payload) && periode.morsAktivitetIPerioden === undefined) ||
        (visErMorForSyk(payload) && periode.erMorForSyk !== true)
    ) {
        return false;
    }
    return true;
};

const hvorSkalDuJobbeErBesvart = (payload: UttakFormPayload): boolean => {
    const periode = payload.periode as Uttaksperiode;
    return (
        isUttaksperiode(periode) &&
        ((periode.arbeidsformer !== undefined && periode.arbeidsformer.length > 0) ||
            (periode.orgnumre !== undefined && periode.orgnumre.length > 0))
    );
};

const visErMorForSyk = (payload: UttakFormPayload) => {
    const { søknadsperiode } = payload;
    if (
        søknadsperiode.harGyldigTidsperiode() &&
        søknadsperiode.erInnenFørsteSeksUkerFødselFarMedmor() &&
        søknadsperiode.erUttakFedrekvote() &&
        !payload.velgbareStønadskontotyper.includes(StønadskontoType.Flerbarnsdager)
    ) {
        return true;
    }

    return false;
};

export const uttaksperiodeFormConfig: QuestionConfig<UttakFormPayload, UttakSpørsmålKeys> = {
    [Sp.tidsperiode]: {
        isRequired: () => true,
        isAnswered: ({ periode }) =>
            getValidTidsperiode(periode.tidsperiode as Tidsperiode) !== undefined ||
            (isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin === true)
    },
    [Sp.konto]: {
        parentQuestion: Sp.tidsperiode,
        isRequired: () => true,
        isAnswered: ({ periode }) => questionValueIsOk(periode.konto),
        visibilityFilter: (payload) => visKontospørsmål(payload)
    },
    [Sp.aktivitetskravMor]: {
        parentQuestion: Sp.tidsperiode,
        isRequired: ({ skjemaregler }) => skjemaregler.aktivitetskravMorSkalBesvares(),
        isAnswered: ({ periode }) =>
            isUttaksperiode(periode) &&
            periode.morsAktivitetIPerioden !== undefined &&
            periode.morsAktivitetIPerioden.length > 0,
        visibilityFilter: (payload) => visAktivitetskravMor(payload)
    },
    [Sp.samtidigUttak]: {
        parentQuestion: Sp.tidsperiode,
        isRequired: ({ skjemaregler }) => skjemaregler.samtidigUttakSkalBesvares(),
        isAnswered: ({ periode }) => isUttaksperiode(periode) && questionValueIsOk(periode.ønskerSamtidigUttak),
        visibilityFilter: (payload) => visSamtidigUttak(payload)
    },
    [Sp.erMorForSyk]: {
        parentQuestion: Sp.konto,
        isRequired: ({ skjemaregler }) => skjemaregler.erMorForSykSkalBesvares(),
        isAnswered: ({ periode }) =>
            isUttaksperiode(periode) &&
            periode.konto === StønadskontoType.Fedrekvote &&
            periode.erMorForSyk !== undefined
    },
    [Sp.samtidigUttakProsent]: {
        parentQuestion: Sp.samtidigUttak,
        isRequired: ({ periode }) => isUttaksperiode(periode) && periode.ønskerSamtidigUttak === true,
        isAnswered: ({ periode }) => isUttaksperiode(periode) && questionValueIsOk(periode.samtidigUttakProsent)
    },
    [Sp.overføringsårsak]: {
        isRequired: ({ skjemaregler }) => skjemaregler.overføringsårsakSkalBesvares(),
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak)
    },
    [Sp.overføringsdokumentasjon]: {
        isOptional: () => true,
        isRequired: (payload) => visOverføringsdokumentasjon(payload),
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak)
    },
    [Sp.skalHaGradering]: {
        isAnswered: ({ periode }) => isUttaksperiode(periode) && questionValueIsOk(periode.gradert),
        isRequired: (payload) => visGradering(payload)
    },
    [Sp.stillingsprosent]: {
        parentQuestion: Sp.skalHaGradering,
        isRequired: ({ periode }) => isUttaksperiode(periode) && periode.gradert === true,
        isAnswered: ({ periode }) => isUttaksperiode(periode) && questionValueIsOk(periode.stillingsprosent)
    },
    [Sp.hvorSkalDuJobbe]: {
        parentQuestion: Sp.stillingsprosent,
        isAnswered: (payload) => hvorSkalDuJobbeErBesvart(payload)
    }
};

export const getUttakFormVisibility = (payload: UttakFormPayload): UttakSpørsmålVisibility => {
    return Questions(uttaksperiodeFormConfig).getVisbility(payload);
};
