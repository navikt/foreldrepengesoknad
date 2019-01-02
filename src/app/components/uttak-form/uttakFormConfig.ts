import moment from 'moment';
import { QuestionConfig, Questions, QuestionVisibility, questionValueIsOk } from '../../util/questions/Question';
import { getValidTidsperiode, isValidTidsperiode } from '../../util/uttaksplan/Tidsperioden';
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
import { erUttakEgenKvote } from '../../util/uttaksplan/uttakUtils';
import { uttaksdatoer } from 'app/util/uttaksplan/uttaksdatoer';
import { Uttaksdagen } from 'app/util/uttaksplan/Uttaksdagen';
import { Søkersituasjon } from 'app/types/søknad/Søknad';
import { Søknadsinfo } from '../../selectors/types';
import { Søknadsperiode } from '../../regler/s\u00F8knadsperioden/S\u00F8knadsperioden';
import { UttakSkjemaregler } from '../../regler/uttak/uttakSkjemaregler';

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
    søknadsperiode: Søknadsperiode;
    skjemaregler: UttakSkjemaregler;
}

export type UttakSpørsmålVisibility = QuestionVisibility<UttakSpørsmålKeys>;

const Sp = UttakSpørsmålKeys;

const erUttakFørFødsel = (payload: UttakFormPayload): boolean => {
    const { periode, søknadsinfo } = payload;
    const { familiehendelsesdato } = søknadsinfo.søknaden;
    return (
        (periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel) ||
        moment(periode.tidsperiode && (periode.tidsperiode.tom as Date)).isBefore(familiehendelsesdato, 'day')
    );
};

const erUttakInnenFørsteSeksUkerFødselFarMedmor = (payload: UttakFormPayload): boolean => {
    const {
        søknadsinfo: { søknaden, søker }
    } = payload;
    if (søknaden.situasjon === Søkersituasjon.ADOPSJON || !søker.erFarEllerMedmor) {
        return false;
    }

    if (isValidTidsperiode(payload.periode.tidsperiode)) {
        const førsteUttaksdag = uttaksdatoer(søknaden.familiehendelsesdato).førsteUttaksdagPåEllerEtterFødsel;
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
    const {
        periode,
        søknadsinfo: { søker, annenForelder }
    } = payload;
    if (søker.erFarEllerMedmor === false || periode.konto === undefined) {
        return false;
    }
    const erDeltUttak = søker.erAleneOmOmsorg === false && annenForelder.harRett === true;
    if (
        erDeltUttak &&
        (periode.konto === StønadskontoType.Fellesperiode || periode.konto === StønadskontoType.Foreldrepenger)
    ) {
        return true;
    } else if (erDeltUttak === false && annenForelder.harRett === false) {
        if (
            (isUttaksperiode(periode) && periode.harIkkeAktivitetskrav === true) ||
            isUttaksperiode(periode) === false ||
            periode.konto === StønadskontoType.Flerbarnsdager
        ) {
            return false;
        }
        return true;
    }
    return false;
};

const visSamtidigUttak = (payload: UttakFormPayload): boolean => {
    const {
        periode,
        søknadsinfo: { søker, annenForelder }
    } = payload;
    if (
        periode.konto === undefined ||
        periode.type === Periodetype.Overføring ||
        erUttakFørFødsel(payload) ||
        (periode.type === Periodetype.Uttak && visErMorForSyk(payload) && periode.erMorForSyk === false)
    ) {
        return false;
    } else if (periode.type === Periodetype.Uttak && periode.konto !== undefined) {
        const erEgenKonto = erUttakEgenKvote(periode.konto, søker.erFarEllerMedmor);
        const aktivitetskravMor = visAktivitetskravMor(payload);
        const aktivitetskravMorOk =
            (aktivitetskravMor && questionValueIsOk(periode.morsAktivitetIPerioden)) || aktivitetskravMor === false;
        const erDeltUttak = !søker.erAleneOmOmsorg && annenForelder.harRett;

        if (
            periode.konto === StønadskontoType.Fellesperiode &&
            søker.erFarEllerMedmor === true &&
            aktivitetskravMorOk &&
            erDeltUttak
        ) {
            return true;
        }

        if (periode.konto === StønadskontoType.Fellesperiode && søker.erFarEllerMedmor === false && erDeltUttak) {
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
    const periode = payload.periode as Uttaksperiode;
    return (
        periode.type === Periodetype.Uttak &&
        ((periode.arbeidsformer !== undefined && periode.arbeidsformer.length > 0) ||
            (periode.orgnumre !== undefined && periode.orgnumre.length > 0))
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
        isRequired: (payload) => visKvote(payload)
    },
    [Sp.erMorForSyk]: {
        isAnswered: ({ periode }) =>
            periode.type === Periodetype.Uttak &&
            periode.konto === StønadskontoType.Fedrekvote &&
            periode.erMorForSyk !== undefined,
        parentQuestion: Sp.kvote,
        isRequired: (payload) => visErMorForSyk(payload)
    },
    [Sp.aktivitetskravMor]: {
        isAnswered: ({ periode }) =>
            periode.type === Periodetype.Uttak &&
            periode.morsAktivitetIPerioden !== undefined &&
            periode.morsAktivitetIPerioden.length > 0,
        parentQuestion: Sp.tidsperiode,
        isRequired: (payload) => visAktivitetskravMor(payload)
    },
    [Sp.samtidigUttak]: {
        isAnswered: ({ periode }) =>
            periode.type === Periodetype.Uttak && questionValueIsOk(periode.ønskerSamtidigUttak),
        parentQuestion: Sp.tidsperiode,
        isRequired: (payload) => visSamtidigUttak(payload)
    },
    [Sp.samtidigUttakProsent]: {
        isAnswered: ({ periode }) =>
            periode.type === Periodetype.Uttak && questionValueIsOk(periode.samtidigUttakProsent),
        parentQuestion: Sp.samtidigUttak,
        isRequired: ({ periode }) => periode.type === Periodetype.Uttak && periode.ønskerSamtidigUttak === true
    },
    [Sp.overføringsårsak]: {
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak),
        isRequired: (payload) =>
            visKvote(payload) &&
            payload.periode.type === Periodetype.Overføring &&
            erUttakEgenKvote(payload.periode.konto, payload.søknadsinfo.søker.erFarEllerMedmor) === false
    },
    [Sp.overføringsdokumentasjon]: {
        isOptional: () => true,
        isAnswered: ({ periode }) => periode.type === Periodetype.Overføring && questionValueIsOk(periode.årsak),
        isRequired: (payload) => visOverføringsdokumentasjon(payload)
    },
    [Sp.skalHaGradering]: {
        isAnswered: ({ periode }) => periode.type === Periodetype.Uttak && questionValueIsOk(periode.gradert),
        isRequired: (payload) => visGradering(payload)
    },
    [Sp.stillingsprosent]: {
        isAnswered: ({ periode }) => periode.type === Periodetype.Uttak && questionValueIsOk(periode.stillingsprosent),
        parentQuestion: Sp.skalHaGradering,
        isRequired: ({ periode }) => periode.type === Periodetype.Uttak && periode.gradert === true
    },
    [Sp.hvorSkalDuJobbe]: {
        isAnswered: (payload) => hvorSkalDuJobbeErBesvart(payload),
        parentQuestion: Sp.stillingsprosent
    }
};

export const getUttakFormVisibility = (payload: UttakFormPayload): UttakSpørsmålVisibility => {
    return Questions(uttaksperiodeFormConfig).getVisbility(payload);
};
