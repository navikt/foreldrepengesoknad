import { QuestionConfig, Questions, QuestionVisibility, questionValueIsOk } from '../../util/questions/Question';
import { getValidTidsperiode, isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
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
import { Søknadsinfo } from '../../selectors/søknadsinfoSelector';
import { PeriodeRegler } from '../../regler/perioder/periodeRegler';
import { erUttakFørFødsel } from '../../regler/perioder/erUttakF\u00F8rF\u00F8dsel';
import { UttakRegler } from '../../regler/uttak/uttakRegler';

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
    'samtidigUttakProsent' = 'samtidigUttakProsent'
}

export interface UttakFormPayload {
    periode: UttakFormPeriodeType;
    velgbareStønadskontotyper: StønadskontoType[];
    kanEndreStønadskonto: boolean;
    søknadsinfo: Søknadsinfo;
}

export type UttakSpørsmålVisibility = QuestionVisibility<UttakSpørsmålKeys>;

const Sp = UttakSpørsmålKeys;

const visKvote = ({
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
    return periode.konto !== undefined && UttakRegler(søknadsinfo, periode).aktivitetskravMorSkalBesvares();
};

const visSamtidigUttak = (payload: UttakFormPayload): boolean => {
    const { søknadsinfo, periode, velgbareStønadskontotyper } = payload;
    const skalBesvares = UttakRegler(søknadsinfo, periode).samtidigUttakSkalBesvares(velgbareStønadskontotyper);

    if (skalBesvares === false) {
        return false;
    }

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
    if (
        periode.konto === undefined ||
        periode.type !== Periodetype.Uttak ||
        PeriodeRegler(søknadsinfo).erUttakFørFødsel(payload.periode as Periode) ||
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
    const { tidsperiode } = periode;

    if (
        isValidTidsperiode(tidsperiode) &&
        PeriodeRegler(søknadsinfo).erUttakInnenFørsteSeksUkerFødselFarMedmor(periode as Periode) &&
        payload.periode.konto === StønadskontoType.Fedrekvote &&
        !payload.velgbareStønadskontotyper.includes(StønadskontoType.Flerbarnsdager)
    ) {
        return true;
    }

    return false;
};

export const uttaksperiodeFormConfig: QuestionConfig<UttakFormPayload, UttakSpørsmålKeys> = {
    [Sp.tidsperiode]: {
        isIncluded: () => true,
        isAnswered: ({ periode }) =>
            getValidTidsperiode(periode.tidsperiode as Tidsperiode) !== undefined ||
            (isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin === true)
    },
    [Sp.kvote]: {
        isIncluded: () => false,
        isAnswered: ({ periode }) => questionValueIsOk(periode.konto),
        parentQuestion: Sp.tidsperiode,
        visibilityRequirements: (payload) => visKvote(payload)
    },
    [Sp.aktivitetskravMor]: {
        isIncluded: ({ periode, søknadsinfo }) => UttakRegler(søknadsinfo, periode).aktivitetskravMorSkalBesvares(),
        isAnswered: ({ periode }) =>
            isUttaksperiode(periode) &&
            periode.morsAktivitetIPerioden !== undefined &&
            periode.morsAktivitetIPerioden.length > 0,
        parentQuestion: Sp.tidsperiode,
        visibilityRequirements: (payload) => visAktivitetskravMor(payload)
    },
    [Sp.samtidigUttak]: {
        isIncluded: ({ søknadsinfo, periode, velgbareStønadskontotyper }) =>
            UttakRegler(søknadsinfo, periode).samtidigUttakSkalBesvares(velgbareStønadskontotyper),
        isAnswered: ({ periode }) => isUttaksperiode(periode) && questionValueIsOk(periode.ønskerSamtidigUttak),
        parentQuestion: Sp.tidsperiode,
        visibilityRequirements: (payload) => visSamtidigUttak(payload)
    },
    [Sp.erMorForSyk]: {
        isAnswered: ({ periode }) =>
            isUttaksperiode(periode) &&
            periode.konto === StønadskontoType.Fedrekvote &&
            periode.erMorForSyk !== undefined,
        parentQuestion: Sp.kvote,
        visibilityRequirements: (payload) => visErMorForSyk(payload)
    },
    [Sp.samtidigUttakProsent]: {
        isAnswered: ({ periode }) => isUttaksperiode(periode) && questionValueIsOk(periode.samtidigUttakProsent),
        parentQuestion: Sp.samtidigUttak,
        visibilityRequirements: ({ periode }) => isUttaksperiode(periode) && periode.ønskerSamtidigUttak === true
    },
    [Sp.overføringsårsak]: {
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak),
        visibilityRequirements: (payload) =>
            visKvote(payload) &&
            payload.periode.type === Periodetype.Overføring &&
            PeriodeRegler(payload.søknadsinfo).erUttakEgenKvote(payload.periode.konto)
    },
    [Sp.overføringsdokumentasjon]: {
        isOptional: () => true,
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak),
        visibilityRequirements: (payload) => visOverføringsdokumentasjon(payload)
    },
    [Sp.skalHaGradering]: {
        isAnswered: ({ periode }) => isUttaksperiode(periode) && questionValueIsOk(periode.gradert),
        visibilityRequirements: (payload) => visGradering(payload)
    },
    [Sp.stillingsprosent]: {
        isAnswered: ({ periode }) => isUttaksperiode(periode) && questionValueIsOk(periode.stillingsprosent),
        parentQuestion: Sp.skalHaGradering,
        visibilityRequirements: ({ periode }) => isUttaksperiode(periode) && periode.gradert === true
    },
    [Sp.hvorSkalDuJobbe]: {
        isAnswered: (payload) => hvorSkalDuJobbeErBesvart(payload),
        parentQuestion: Sp.stillingsprosent
    }
};

export const getUttakFormVisibility = (payload: UttakFormPayload): UttakSpørsmålVisibility => {
    return Questions(uttaksperiodeFormConfig).getVisbility(payload);
};
