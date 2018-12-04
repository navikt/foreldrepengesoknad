import { QuestionConfig, Questions, QuestionVisibility, questionValueIsOk } from '../../util/questions/Question';
import { getValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger';
import {
    StønadskontoType,
    Periodetype,
    OverføringÅrsakType,
    isForeldrepengerFørFødselUttaksperiode,
    isUttaksperiode,
    Periode,
    Uttaksperiode
} from '../../types/uttaksplan/periodetyper';
import { UttakFormPeriodeType } from './UttakForm';
import { UttakSkjemaregler } from '../../regler/uttak/uttakSkjemaregler';
import { erUttakFørFødsel } from '../../regler/søknadsperioden/erUttakFørFødsel';
import { Søknadsperioden } from '../../regler/søknadsperioden/Søknadsperioden';
import { Søknadsinfo } from '../../selectors/types';

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
    skjemaregler: UttakSkjemaregler;
}

export type UttakSpørsmålVisibility = QuestionVisibility<UttakSpørsmålKeys>;

const Sp = UttakSpørsmålKeys;

const visKontospørsmål = ({
    periode,
    kanEndreStønadskonto,
    velgbareStønadskontotyper,
    søknadsinfo
}: UttakFormPayload): boolean => {
    return (
        erUttakFørFødsel(periode as Periode, søknadsinfo.søknaden.familiehendelsesdato) === false &&
        kanEndreStønadskonto === true &&
        velgbareStønadskontotyper.length > 0
    );
};

const visAktivitetskravMor = ({ periode, søknadsinfo }: UttakFormPayload): boolean => {
    return periode.konto !== undefined;
};

const visSamtidigUttak = (payload: UttakFormPayload): boolean => {
    const { periode } = payload;

    if (isUttaksperiode(periode) && visErMorForSyk(payload) && periode.erMorForSyk === false) {
        return false;
    }

    if (
        visAktivitetskravMor(payload) &&
        isUttaksperiode(periode) &&
        questionValueIsOk((periode as Uttaksperiode).morsAktivitetIPerioden) === false
    ) {
        return false;
    }

    return true;
};

const visOverføringsdokumentasjon = (payload: UttakFormPayload): boolean => {
    const { periode, søknadsinfo } = payload;
    if (periode.type !== Periodetype.Overføring || periode.årsak === undefined) {
        return false;
    }
    return (
        periode.årsak !== OverføringÅrsakType.aleneomsorg ||
        (periode.årsak === OverføringÅrsakType.aleneomsorg && søknadsinfo.søker.erFarEllerMedmor)
    );
};

const visGradering = (payload: UttakFormPayload): boolean => {
    const { periode, søknadsinfo } = payload;
    const søknadsperioden = Søknadsperioden(søknadsinfo, periode as Periode);
    if (
        periode.konto === undefined ||
        periode.type !== Periodetype.Uttak ||
        søknadsperioden.erUttakFørFødsel() ||
        (visSamtidigUttak(payload) && periode.ønskerSamtidigUttak === undefined) ||
        (visAktivitetskravMor(payload) && periode.morsAktivitetIPerioden === undefined) ||
        (visErMorForSyk(payload) && periode.erMorForSyk !== true)
    ) {
        return false;
    }
    return true;
};

const hvorSkalDuJobbeErBesvart = (payload: UttakFormPayload): boolean => {
    const { periode } = payload;
    return isUttaksperiode(periode) && (questionValueIsOk(periode.arbeidsform) || questionValueIsOk(periode.orgnr));
};

const visErMorForSyk = (payload: UttakFormPayload) => {
    const { periode, søknadsinfo } = payload;
    const søknadsperioden = Søknadsperioden(søknadsinfo, periode as Periode);
    if (
        søknadsperioden.harGyldigTidsperiode() &&
        søknadsperioden.erInnenFørsteSeksUkerFødselFarMedmor() &&
        søknadsperioden.erUttakFedrekvote() &&
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
        visibilityFilter: ({ periode }) => periode.konto !== undefined
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
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak),
        visibilityFilter: (payload) => visOverføringsdokumentasjon(payload)
    },
    [Sp.skalHaGradering]: {
        isAnswered: ({ periode }) => isUttaksperiode(periode) && questionValueIsOk(periode.gradert),
        visibilityFilter: (payload) => visGradering(payload)
    },
    [Sp.stillingsprosent]: {
        parentQuestion: Sp.skalHaGradering,
        isAnswered: ({ periode }) => isUttaksperiode(periode) && questionValueIsOk(periode.stillingsprosent),
        visibilityFilter: ({ periode }) => isUttaksperiode(periode) && periode.gradert === true
    },
    [Sp.hvorSkalDuJobbe]: {
        parentQuestion: Sp.stillingsprosent,
        isAnswered: (payload) => hvorSkalDuJobbeErBesvart(payload)
    }
};

export const getUttakFormVisibility = (payload: UttakFormPayload): UttakSpørsmålVisibility => {
    return Questions(uttaksperiodeFormConfig).getVisbility(payload);
};
