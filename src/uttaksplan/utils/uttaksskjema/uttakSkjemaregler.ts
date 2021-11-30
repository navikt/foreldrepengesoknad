import AnnenForelder from 'app/context/types/AnnenForelder';
import { Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';
import { Situasjon } from 'app/types/Situasjon';
import { Periode, Periodetype } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getUttaksdatoer } from '../uttaksdatoerUtils';
import { aktivitetskravMorSkalBesvares } from './aktivitetskravMorSkalBesvares';
import erMorForForSykSkalBesvares from './erMorForSykSkalBesvares';
import { graderingSkalBesvares } from './graderingSkalBesvares';
import overføringsårsakSkalBesvares from './overføringsårsakSkalBesvares';
import samtidigUttakSkalBesvares from './samtidigUttakSkalBesvares';
import { ønskerFlerbarnsdagerSkalBesvares } from './ønskerFlerbarnsdagerSkalBesvares';

export interface UttakSkjemaregler {
    aktivitetskravMorSkalBesvares: () => boolean;
    erMorForSykSkalBesvares: () => boolean;
    samtidigUttakSkalBesvares: () => boolean;
    overføringsårsakSkalBesvares: () => boolean;
    ønskerFlerbarnsdagerSkalBesvares: () => boolean;
    graderingSkalBesvares: () => boolean;
}

export interface UttakSkjemaReglerProps {
    erFarEllerMedmor: boolean;
    erAleneOmOmsorg: boolean;
    annenForelder: AnnenForelder;
    situasjon: Situasjon;
    erFlerbarnssøknad: boolean;
    erDeltUttak: boolean;
    familiehendelsesdato: Date;
}

export const getUttakSkjemaregler = (periode: Periode, regelProps: UttakSkjemaReglerProps): UttakSkjemaregler => {
    const {
        erFarEllerMedmor,
        erAleneOmOmsorg,
        annenForelder,
        situasjon,
        erFlerbarnssøknad,
        erDeltUttak,
        familiehendelsesdato,
    } = regelProps;
    const uttaksdatoer = getUttaksdatoer(familiehendelsesdato);

    return {
        aktivitetskravMorSkalBesvares: () =>
            aktivitetskravMorSkalBesvares(
                periode as Periode,
                !erFarEllerMedmor,
                erAleneOmOmsorg,
                annenForelder.kanIkkeOppgis,
                false // TODO Midlertidig omsorg
            ),
        erMorForSykSkalBesvares: (): boolean =>
            erMorForForSykSkalBesvares(
                periode,
                situasjon,
                erFarEllerMedmor,
                uttaksdatoer,
                erFlerbarnssøknad,
                erAleneOmOmsorg,
                annenForelder.kanIkkeOppgis,
                false // TODO Midlertidig omsorg
            ),
        samtidigUttakSkalBesvares: (): boolean => {
            return samtidigUttakSkalBesvares(
                periode,
                Tidsperioden(periode.tidsperiode).erInnenforFørsteSeksUker(familiehendelsesdato),
                periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel,
                erAleneOmOmsorg,
                erDeltUttak,
                false // TODO Midlertidig omsorg
            );
        },
        ønskerFlerbarnsdagerSkalBesvares: (): boolean => {
            return ønskerFlerbarnsdagerSkalBesvares(periode, erFlerbarnssøknad, erFarEllerMedmor);
        },
        graderingSkalBesvares: (): boolean => {
            return graderingSkalBesvares(
                periode.type === Periodetype.Uttak && periode.konto === StønadskontoType.ForeldrepengerFørFødsel
            );
        },
        overføringsårsakSkalBesvares: () => overføringsårsakSkalBesvares(periode),
    };
};

export default getUttakSkjemaregler;
