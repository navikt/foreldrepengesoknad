import { QuestionConfig, Questions, QuestionVisibility, questionValueIsOk } from '../../util/questions/Question';
import { getValidTidsperiode, isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger';
import {
    StønadskontoType,
    Periodetype,
    OverføringÅrsakType,
    isForeldrepengerFørFødselUttaksperiode,
    isUttaksperiode,
    Periode
} from '../../types/uttaksplan/periodetyper';
import { UttakFormPeriodeType } from './UttakForm';
import { Søknadsinfo } from '../../selectors/s\u00F8knadsinfoSelector';
import { UttakFormRegler } from '../../selectors/uttakFormRegler';

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
    regler: UttakFormRegler;
}

export type UttakSpørsmålVisibility = QuestionVisibility<UttakSpørsmålKeys>;

const Sp = UttakSpørsmålKeys;

const visKvote = (payload: UttakFormPayload): boolean => {
    const { kanEndreStønadskonto, velgbareStønadskontotyper, regler } = payload;
    return (
        regler.erUttakFørFødsel(payload.periode as Periode) === false &&
        kanEndreStønadskonto === true &&
        velgbareStønadskontotyper.length > 0
    );
};

const visAktivitetskravMor = (payload: UttakFormPayload): boolean => {
    const { periode, søknadsinfo } = payload;
    const { søker, annenForelder, søknaden } = søknadsinfo;
    if (søker.erFarEllerMedmor === false || periode.konto === undefined) {
        return false;
    }
    if (
        søknaden.erDeltUttak &&
        (periode.konto === StønadskontoType.Fellesperiode || periode.konto === StønadskontoType.Foreldrepenger)
    ) {
        return true;
    } else if (søknaden.erDeltUttak === false && annenForelder.harRett === false) {
        if (
            (isUttaksperiode(periode) && periode.harIkkeAktivitetskrav === true) ||
            isUttaksperiode(periode) === false
        ) {
            return false;
        }
        return true;
    }
    return false;
};

const visSamtidigUttak = (payload: UttakFormPayload): boolean => {
    const { periode, søknadsinfo, regler } = payload;
    const { søker, annenForelder } = søknadsinfo;
    if (
        periode.konto === undefined ||
        periode.type === Periodetype.Overføring ||
        regler.erUttakFørFødsel(payload.periode as Periode) ||
        (periode.type === Periodetype.Uttak && visErMorForSyk(payload) && periode.erMorForSyk === false)
    ) {
        return false;
    } else if (periode.type === Periodetype.Uttak && periode.konto !== undefined) {
        const erEgenKonto = regler.erUttakEgenKvote(periode.konto);
        const aktivitetskravMor = visAktivitetskravMor(payload);
        const aktivitetskravMorOk =
            (aktivitetskravMor && questionValueIsOk(periode.morsAktivitetIPerioden)) || aktivitetskravMor === false;
        const erDeltUttak = !søker.erAleneOmOmsorg && annenForelder.harRett;

        if (
            periode.konto === StønadskontoType.Fellesperiode &&
            søker.erFarEllerMedmor &&
            aktivitetskravMorOk &&
            erDeltUttak
        ) {
            return true;
        }

        if (periode.konto === StønadskontoType.Fellesperiode && søker.erMor && erDeltUttak) {
            return true;
        }

        if (erEgenKonto && aktivitetskravMorOk && erDeltUttak) {
            if (
                regler.erUttakInnenFørsteSeksUkerFødselFarMedmor(periode.tidsperiode) &&
                periode.type === Periodetype.Uttak &&
                periode.konto === StønadskontoType.Fedrekvote &&
                periode.erMorForSyk === undefined &&
                !payload.velgbareStønadskontotyper.includes(StønadskontoType.Flerbarnsdager)
            ) {
                return false;
            }

            return true;
        }

        if (
            søker.erFarEllerMedmor &&
            periode.konto === StønadskontoType.Fellesperiode &&
            aktivitetskravMorOk &&
            erDeltUttak
        ) {
            return true;
        }

        if (periode.konto === StønadskontoType.Flerbarnsdager && aktivitetskravMorOk && erDeltUttak) {
            return true;
        }
    }
    return false;
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
    const { periode, regler } = payload;
    if (
        periode.konto === undefined ||
        periode.type !== Periodetype.Uttak ||
        regler.erUttakFørFødsel(payload.periode as Periode) ||
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
    return (
        periode.type === Periodetype.Uttak &&
        (questionValueIsOk(periode.arbeidsform) || questionValueIsOk(periode.orgnr))
    );
};

const visErMorForSyk = (payload: UttakFormPayload) => {
    const { regler, periode } = payload;
    const { tidsperiode } = periode;

    if (
        isValidTidsperiode(tidsperiode) &&
        regler.erUttakInnenFørsteSeksUkerFødselFarMedmor(tidsperiode) &&
        payload.periode.konto === StønadskontoType.Fedrekvote &&
        !payload.velgbareStønadskontotyper.includes(StønadskontoType.Flerbarnsdager)
    ) {
        return true;
    }

    return false;
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
        condition: (payload) => visKvote(payload)
    },
    [Sp.erMorForSyk]: {
        isAnswered: ({ periode }) =>
            periode.type === Periodetype.Uttak &&
            periode.konto === StønadskontoType.Fedrekvote &&
            periode.erMorForSyk === true,
        parentQuestion: Sp.kvote,
        condition: (payload) => visErMorForSyk(payload)
    },
    [Sp.aktivitetskravMor]: {
        isAnswered: ({ periode }) =>
            periode.type === Periodetype.Uttak &&
            periode.morsAktivitetIPerioden !== undefined &&
            periode.morsAktivitetIPerioden.length > 0,
        parentQuestion: Sp.tidsperiode,
        condition: (payload) => visAktivitetskravMor(payload)
    },
    [Sp.samtidigUttak]: {
        isAnswered: ({ periode }) =>
            periode.type === Periodetype.Uttak && questionValueIsOk(periode.ønskerSamtidigUttak),
        parentQuestion: Sp.tidsperiode,
        condition: (payload) => visSamtidigUttak(payload)
    },
    [Sp.samtidigUttakProsent]: {
        isAnswered: ({ periode }) =>
            periode.type === Periodetype.Uttak && questionValueIsOk(periode.samtidigUttakProsent),
        parentQuestion: Sp.samtidigUttak,
        condition: ({ periode }) => periode.type === Periodetype.Uttak && periode.ønskerSamtidigUttak === true
    },
    [Sp.overføringsårsak]: {
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak),
        condition: (payload) =>
            visKvote(payload) &&
            payload.periode.type === Periodetype.Overføring &&
            payload.regler.erUttakEgenKvote(payload.periode.konto)
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
        isAnswered: (payload) => hvorSkalDuJobbeErBesvart(payload),
        parentQuestion: Sp.stillingsprosent
    }
};

export const getUttakFormVisibility = (payload: UttakFormPayload): UttakSpørsmålVisibility => {
    return Questions(uttaksperiodeFormConfig).getVisbility(payload);
};
