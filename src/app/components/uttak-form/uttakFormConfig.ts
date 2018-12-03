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
    regler: UttakRegler;
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
    return periode.konto !== undefined; // && UttakRegler(søknadsinfo, periode).aktivitetskravMorSkalBesvares();
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
        isRelevant: () => true,
        isAnswered: ({ periode }) =>
            getValidTidsperiode(periode.tidsperiode as Tidsperiode) !== undefined ||
            (isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin === true)
    },
    [Sp.kvote]: {
        parentQuestion: Sp.tidsperiode,
        isRelevant: () => true,
        isAnswered: ({ periode }) => questionValueIsOk(periode.konto),
        isVisible: (payload) => visKvote(payload)
    },
    [Sp.aktivitetskravMor]: {
        parentQuestion: Sp.tidsperiode,
        isRelevant: ({ regler }) => regler.aktivitetskravMorSkalBesvares(),
        isAnswered: ({ periode }) =>
            isUttaksperiode(periode) &&
            periode.morsAktivitetIPerioden !== undefined &&
            periode.morsAktivitetIPerioden.length > 0,
        isVisible: (payload) => visAktivitetskravMor(payload)
    },
    [Sp.samtidigUttak]: {
        parentQuestion: Sp.tidsperiode,
        isRelevant: ({ regler, velgbareStønadskontotyper }) =>
            regler.samtidigUttakSkalBesvares(velgbareStønadskontotyper),
        isAnswered: ({ periode }) => isUttaksperiode(periode) && questionValueIsOk(periode.ønskerSamtidigUttak),
        isVisible: (payload) => visSamtidigUttak(payload)
    },
    [Sp.erMorForSyk]: {
        isAnswered: ({ periode }) =>
            isUttaksperiode(periode) &&
            periode.konto === StønadskontoType.Fedrekvote &&
            periode.erMorForSyk !== undefined,
        parentQuestion: Sp.kvote,
        isVisible: (payload) => visErMorForSyk(payload)
    },
    [Sp.samtidigUttakProsent]: {
        parentQuestion: Sp.samtidigUttak,
        isAnswered: ({ periode }) => isUttaksperiode(periode) && questionValueIsOk(periode.samtidigUttakProsent),
        isVisible: ({ periode }) => isUttaksperiode(periode) && periode.ønskerSamtidigUttak === true
    },
    [Sp.overføringsårsak]: {
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak),
        isVisible: (payload) =>
            visKvote(payload) &&
            payload.periode.type === Periodetype.Overføring &&
            PeriodeRegler(payload.søknadsinfo).erUttakEgenKvote(payload.periode.konto)
    },
    [Sp.overføringsdokumentasjon]: {
        isOptional: () => true,
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak),
        isVisible: (payload) => visOverføringsdokumentasjon(payload)
    },
    [Sp.skalHaGradering]: {
        isAnswered: ({ periode }) => isUttaksperiode(periode) && questionValueIsOk(periode.gradert),
        isVisible: (payload) => visGradering(payload)
    },
    [Sp.stillingsprosent]: {
        parentQuestion: Sp.skalHaGradering,
        isAnswered: ({ periode }) => isUttaksperiode(periode) && questionValueIsOk(periode.stillingsprosent),
        isVisible: ({ periode }) => isUttaksperiode(periode) && periode.gradert === true
    },
    [Sp.hvorSkalDuJobbe]: {
        parentQuestion: Sp.stillingsprosent,
        isAnswered: (payload) => hvorSkalDuJobbeErBesvart(payload)
    }
};

export const getUttakFormVisibility = (payload: UttakFormPayload): UttakSpørsmålVisibility => {
    return Questions(uttaksperiodeFormConfig).getVisbility(payload);
};
