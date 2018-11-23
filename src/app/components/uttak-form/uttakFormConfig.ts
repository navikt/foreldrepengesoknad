import moment from 'moment';
import { QuestionConfig, Questions, QuestionVisibility, questionValueIsOk } from '../../util/questions/Question';
import { getValidTidsperiode, isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
import { Tidsperiode } from 'nav-datovelger';
import {
    StønadskontoType,
    Periodetype,
    OverføringÅrsakType,
    isForeldrepengerFørFødselUttaksperiode,
    isUttaksperiode
} from '../../types/uttaksplan/periodetyper';
import { UttakFormPeriodeType } from './UttakForm';
import { erUttakEgenKvote } from '../../util/uttaksplan/uttakUtils';
import { uttaksdatoer } from 'app/util/uttaksplan/uttaksdatoer';
import { Uttaksdagen } from 'app/util/uttaksplan/Uttaksdagen';
import { Søkersituasjon } from 'app/types/søknad/Søknad';

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
    'erMorForSyk' = 'erMorForSyk'
}

export interface UttakFormPayload {
    periode: UttakFormPeriodeType;
    velgbareStønadskontotyper: StønadskontoType[];
    kanEndreStønadskonto: boolean;
    søkerErAleneOmOmsorg: boolean;
    søkerErFarEllerMedmor: boolean;
    annenForelderHarRett: boolean;
    morErUfør: boolean;
    familiehendelsesdato: Date;
    situasjon: Søkersituasjon;
}

export type UttakSpørsmålVisibility = QuestionVisibility<UttakSpørsmålKeys>;

const Sp = UttakSpørsmålKeys;

const erUttakFørFødsel = (payload: UttakFormPayload): boolean => {
    const { periode, familiehendelsesdato } = payload;
    return (
        (periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel) ||
        moment(periode.tidsperiode && (periode.tidsperiode.tom as Date)).isBefore(familiehendelsesdato, 'day')
    );
};

const erUttakInnenFørsteSeksUkerFødselFarMedmor = (payload: UttakFormPayload): boolean => {
    if (payload.situasjon === Søkersituasjon.ADOPSJON || !payload.søkerErFarEllerMedmor) {
        return false;
    }

    if (isValidTidsperiode(payload.periode.tidsperiode)) {
        const førsteUttaksdag = uttaksdatoer(payload.familiehendelsesdato).førsteUttaksdagPåEllerEtterFødsel;
        const førsteUttaksdagEtterSeksUker = Uttaksdagen(førsteUttaksdag).leggTil(30);

        if (moment(payload.periode.tidsperiode.fom).isBefore(moment(førsteUttaksdagEtterSeksUker))) {
            return true;
        }
    }

    return false;
};

const visKvote = (payload: UttakFormPayload): boolean => {
    const { kanEndreStønadskonto, velgbareStønadskontotyper } = payload;
    return erUttakFørFødsel(payload) === false && kanEndreStønadskonto === true && velgbareStønadskontotyper.length > 0;
};

const visAktivitetskravMor = (payload: UttakFormPayload): boolean => {
    const { periode, søkerErFarEllerMedmor, annenForelderHarRett, søkerErAleneOmOmsorg } = payload;
    if (søkerErFarEllerMedmor === false || periode.konto === undefined) {
        return false;
    }
    const erDeltUttak = søkerErAleneOmOmsorg === false && annenForelderHarRett === true;
    if (
        erDeltUttak &&
        (periode.konto === StønadskontoType.Fellesperiode || periode.konto === StønadskontoType.Foreldrepenger)
    ) {
        return true;
    } else if (erDeltUttak === false && annenForelderHarRett === false) {
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
    const { periode, søkerErFarEllerMedmor, annenForelderHarRett, søkerErAleneOmOmsorg } = payload;
    if (
        periode.konto === undefined ||
        periode.type === Periodetype.Overføring ||
        erUttakFørFødsel(payload) ||
        (periode.type === Periodetype.Uttak && visErMorForSyk(payload) && periode.erMorForSyk === false)
    ) {
        return false;
    } else if (periode.type === Periodetype.Uttak && periode.konto !== undefined) {
        const erEgenKonto = erUttakEgenKvote(periode.konto, payload.søkerErFarEllerMedmor);
        const aktivitetskravMor = visAktivitetskravMor(payload);
        const aktivitetskravMorOk =
            (aktivitetskravMor && questionValueIsOk(periode.morsAktivitetIPerioden)) || aktivitetskravMor === false;
        const erDeltUttak = !søkerErAleneOmOmsorg && annenForelderHarRett;

        if (
            periode.konto === StønadskontoType.Fellesperiode &&
            søkerErFarEllerMedmor === true &&
            aktivitetskravMorOk &&
            erDeltUttak
        ) {
            return true;
        }

        if (periode.konto === StønadskontoType.Fellesperiode && søkerErFarEllerMedmor === false && erDeltUttak) {
            return true;
        }

        if (erEgenKonto && aktivitetskravMorOk && erDeltUttak) {
            if (
                erUttakInnenFørsteSeksUkerFødselFarMedmor(payload) &&
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
            søkerErFarEllerMedmor &&
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
    if (
        periode.konto === undefined ||
        periode.type !== Periodetype.Uttak ||
        erUttakFørFødsel(payload) ||
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
    const { tidsperiode } = payload.periode;

    if (
        isValidTidsperiode(tidsperiode) &&
        erUttakInnenFørsteSeksUkerFødselFarMedmor(payload) &&
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
    [Sp.overføringsårsak]: {
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak),
        condition: (payload) =>
            visKvote(payload) &&
            payload.periode.type === Periodetype.Overføring &&
            erUttakEgenKvote(payload.periode.konto, payload.søkerErFarEllerMedmor) === false
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
