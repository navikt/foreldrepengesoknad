import { TidsperiodeDate } from '@navikt/fp-common';
import AnnenForelder from 'app/context/types/AnnenForelder';
import { Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Situasjon } from 'app/types/Situasjon';
import { convertYesOrNoOrUndefinedToBoolean } from 'app/utils/formUtils';
import { PeriodeUttakFormData } from 'uttaksplan/components/uttaks-forms/periode-uttak-form/periodeUttakFormConfig';
import { Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getUttaksdatoer } from '../uttaksdatoerUtils';
import { aktivitetskravMorSkalBesvares } from './aktivitetskravMorSkalBesvares';
import erMorForForSykSkalBesvares from './erMorForSykSkalBesvares';
import { graderingSkalBesvares } from './graderingSkalBesvares';
import { graderingSkalBesvaresPgaWLBUttakRundtFødsel } from './graderingSkalBesvaresPgaWLBUttakRundtFødsel';
import samtidigUttakSkalBesvares from './samtidigUttakSkalBesvares';
import { ønskerFlerbarnsdagerSkalBesvares } from './ønskerFlerbarnsdagerSkalBesvares';
import uttakRundtFødselÅrsakSpørsmålSkalBesvares from './uttakRundtFødselÅrsakSpørsmålSkalBesvares';
import kontoSkalBesvares from './kontoSkalBesvarer';
import { StønadskontoUttak } from 'uttaksplan/types/StønadskontoUttak';
import hvemSkalTaUttakSkalBesvares from './hvemSkalTaUttakSkalBesvares';
import overføringsårsakSkalBesvares from './overføringsårsakSkalBesvares';
export interface UttakSkjemaregler {
    aktivitetskravMorSkalBesvares: () => boolean;
    erMorForSykSkalBesvares: () => boolean;
    uttakRundtFødselÅrsakSpørsmålSkalBesvares: () => boolean;
    samtidigUttakSkalBesvares: () => boolean;
    kontoSkalBesvares: () => boolean;
    hvemSkalTaUttakSkalBesvares: () => boolean;
    overføringsårsakSkalBesvares: () => boolean;
    ønskerFlerbarnsdagerSkalBesvares: () => boolean;
    graderingSkalBesvares: () => boolean;
    graderingSkalBesvaresPgaWLBUttakRundtFødsel: () => boolean;
}

export interface UttakSkjemaReglerProps {
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
    annenForelder: AnnenForelder;
    situasjon: Situasjon;
    erFlerbarnssøknad: boolean;
    erDeltUttakINorge: boolean;
    familiehendelsesdato: Date;
    periodetype: Periodetype;
    termindato: Date | undefined;
    morHarRett: boolean;
    stønadskontoer: StønadskontoUttak[];
    antallBarn: number;
}

export const getUttakSkjemaregler = (
    formValues: PeriodeUttakFormData,
    regelProps: UttakSkjemaReglerProps
): UttakSkjemaregler => {
    const {
        erFarEllerMedmor,
        erAleneOmOmsorg,
        annenForelder,
        situasjon,
        erFlerbarnssøknad,
        erDeltUttakINorge,
        familiehendelsesdato,
        periodetype,
        termindato,
        stønadskontoer,
        morHarRett,
        antallBarn,
    } = regelProps;

    const { konto } = formValues;

    const uttaksdatoer = getUttaksdatoer(familiehendelsesdato, erFarEllerMedmor, termindato);
    const tidsperiode: TidsperiodeDate = { fom: formValues.fom!, tom: formValues.tom! };

    return {
        aktivitetskravMorSkalBesvares: () =>
            aktivitetskravMorSkalBesvares(
                convertYesOrNoOrUndefinedToBoolean(formValues.ønskerFlerbarnsdager),
                convertYesOrNoOrUndefinedToBoolean(formValues.samtidigUttak),
                convertYesOrNoOrUndefinedToBoolean(formValues.erMorForSyk),
                periodetype,
                konto as StønadskontoType,
                !erFarEllerMedmor,
                erAleneOmOmsorg,
                annenForelder.kanIkkeOppgis,
                false, // TODO Midlertidig omsorg,
                tidsperiode,
                familiehendelsesdato,
                erFlerbarnssøknad,
                termindato,
                situasjon,
                stønadskontoer,
                !morHarRett
            ),
        erMorForSykSkalBesvares: (): boolean =>
            erMorForForSykSkalBesvares(
                periodetype,
                konto as StønadskontoType,
                tidsperiode,
                situasjon,
                erFarEllerMedmor,
                uttaksdatoer,
                erFlerbarnssøknad,
                erAleneOmOmsorg,
                annenForelder.kanIkkeOppgis,
                convertYesOrNoOrUndefinedToBoolean(formValues.ønskerFlerbarnsdager),
                false, // TODO Midlertidig omsorg,
                familiehendelsesdato,
                termindato,
                !morHarRett
            ),
        samtidigUttakSkalBesvares: (): boolean =>
            samtidigUttakSkalBesvares(
                periodetype,
                konto as StønadskontoType,
                Tidsperioden(tidsperiode).erInnenforFørsteSeksUker(familiehendelsesdato) && situasjon === 'fødsel',
                periodetype === Periodetype.Uttak && konto === StønadskontoType.ForeldrepengerFørFødsel,
                erAleneOmOmsorg,
                erDeltUttakINorge,
                false, // TODO Midlertidig omsorg,
                convertYesOrNoOrUndefinedToBoolean(formValues.erMorForSyk),
                convertYesOrNoOrUndefinedToBoolean(formValues.ønskerFlerbarnsdager)
            ),
        kontoSkalBesvares: (): boolean =>
            kontoSkalBesvares(periodetype, tidsperiode, stønadskontoer, familiehendelsesdato, erFarEllerMedmor),
        ønskerFlerbarnsdagerSkalBesvares: (): boolean => {
            return ønskerFlerbarnsdagerSkalBesvares(
                periodetype,
                erFlerbarnssøknad,
                erFarEllerMedmor,
                familiehendelsesdato,
                tidsperiode,
                konto as StønadskontoType,
                !morHarRett,
                antallBarn,
                erAleneOmOmsorg,
                erDeltUttakINorge
            );
        },
        hvemSkalTaUttakSkalBesvares: (): boolean =>
            hvemSkalTaUttakSkalBesvares(
                tidsperiode,
                erDeltUttakINorge,
                familiehendelsesdato,
                erFarEllerMedmor,
                situasjon
            ),
        graderingSkalBesvares: (): boolean => {
            return graderingSkalBesvares(
                periodetype,
                konto as StønadskontoType,
                familiehendelsesdato,
                erFarEllerMedmor,
                convertYesOrNoOrUndefinedToBoolean(formValues.erMorForSyk),
                tidsperiode
            );
        },
        graderingSkalBesvaresPgaWLBUttakRundtFødsel: (): boolean => {
            return graderingSkalBesvaresPgaWLBUttakRundtFødsel(
                tidsperiode,
                periodetype,
                konto as StønadskontoType,
                erFarEllerMedmor,
                familiehendelsesdato,
                termindato,
                situasjon,
                erFlerbarnssøknad,
                convertYesOrNoOrUndefinedToBoolean(formValues.ønskerFlerbarnsdager)
            );
        },
        overføringsårsakSkalBesvares: (): boolean => {
            return overføringsårsakSkalBesvares(
                periodetype,
                erFarEllerMedmor,
                konto as StønadskontoType,
                annenForelder
            );
        },
        uttakRundtFødselÅrsakSpørsmålSkalBesvares: () => {
            return uttakRundtFødselÅrsakSpørsmålSkalBesvares(
                periodetype,
                konto as StønadskontoType,
                tidsperiode,
                erFarEllerMedmor,
                erFlerbarnssøknad,
                erAleneOmOmsorg,
                annenForelder.kanIkkeOppgis,
                convertYesOrNoOrUndefinedToBoolean(formValues.ønskerFlerbarnsdager),
                false, //TODO: midlertidig omsorg
                familiehendelsesdato,
                termindato,
                situasjon,
                !morHarRett
            );
        },
    };
};

export default getUttakSkjemaregler;
