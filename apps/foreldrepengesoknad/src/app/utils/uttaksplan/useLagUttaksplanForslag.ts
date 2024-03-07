import { getHarAktivitetskravIPeriodeUtenUttak } from '@navikt/uttaksplan';
import { finnOgSettInnHull } from '@navikt/uttaksplan/src/builder/uttaksplanbuilderUtils';

import {
    Periode,
    TilgjengeligStønadskonto,
    Uttaksdagen,
    getKunFarHarRett,
    isAdoptertAnnetBarn,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';

import { getIsDeltUttak } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { getOppstartsdatoFromInput } from 'app/steps/fordeling/fordelingFormUtils';

import { getFamiliehendelsedatoDate, getTermindato } from '../barnUtils';
import { deltUttak } from './deltUttak';
import { ikkeDeltUttak } from './ikkeDeltUttak';

export const useLagUttaksplanForslag = (
    valgtStønadskonto: TilgjengeligStønadskonto[],
    annenPartsPerioder: Periode[] | undefined,
): Periode[] => {
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const søkerData = notEmpty(useContextGetData(ContextDataType.SØKER_DATA));
    const fordeling = notEmpty(useContextGetData(ContextDataType.FORDELING));

    const situasjon = søkersituasjon.situasjon;
    const familiehendelsesdato = getFamiliehendelsedatoDate(barn);
    const erDeltUttak = getIsDeltUttak(annenForelder);
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const søkerErAleneOmOmsorg = søkerData.erAleneOmOmsorg;
    const annenForelderErUfør = isAnnenForelderOppgitt(annenForelder) && annenForelder.erUfør;
    const bareFarMedmorHarRett = getKunFarHarRett(erFarEllerMedmor, annenForelder, søkerErAleneOmOmsorg);
    const morHarRett = !erFarEllerMedmor || !bareFarMedmorHarRett;
    const termindato = getTermindato(barn);
    const annenForelderHarRettPåForeldrepengerIEØS =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerIEØS;
    const førsteUttaksdagNesteBarnsSak = barnFraNesteSak?.startdatoFørsteStønadsperiode;
    const harAktivitetskravIPeriodeUtenUttak = getHarAktivitetskravIPeriodeUtenUttak({
        erDeltUttak,
        morHarRett,
        søkerErAleneOmOmsorg,
    });
    const harAnnenForelderSøktFP = annenPartsPerioder !== undefined;
    const annenPartsSisteDag = annenPartsPerioder
        ? Uttaksdagen(annenPartsPerioder[annenPartsPerioder.length - 1].tidsperiode.tom).denneEllerForrige()
        : undefined;
    const morSinSisteUttaksdag = erFarEllerMedmor ? annenPartsSisteDag : undefined;
    const ankomstNorgeForAdoptertBarn =
        isAdoptertAnnetBarn(barn) && barn.adoptertIUtlandet ? barn.ankomstdato : undefined;
    const startdatoPermisjon = getOppstartsdatoFromInput(
        fordeling.oppstartAvForeldrepengerValg,
        fordeling.oppstartDato,
        termindato,
        familiehendelsesdato,
        ankomstNorgeForAdoptertBarn,
        annenPartsSisteDag,
        barn.datoForAleneomsorg,
    );
    const fellesperiodeUkerTilSøker = fordeling.antallUkerFellesperiodeTilSøker;
    const fellesperiodeUkerMor = erFarEllerMedmor ? undefined : fellesperiodeUkerTilSøker;
    const antallUkerFellesperiodeFarMedmor = erFarEllerMedmor ? fellesperiodeUkerTilSøker : undefined;
    const farSinFørsteUttaksdag = erFarEllerMedmor ? startdatoPermisjon : undefined;
    const erAdopsjon = situasjon === 'adopsjon';

    if (familiehendelsesdato) {
        if (erDeltUttak) {
            const forslag = deltUttak({
                situasjon,
                famDato: familiehendelsesdato,
                erFarEllerMedmor,
                tilgjengeligeStønadskontoer: valgtStønadskonto,
                startdatoPermisjon,
                fellesperiodeUkerMor,
                harAnnenForelderSøktFP,
                antallUkerFellesperiodeFarMedmor,
                morSinSisteUttaksdag,
                farSinFørsteUttaksdag,
                annenForelderHarRettPåForeldrepengerIEØS,
                termindato,
                førsteUttaksdagNesteBarnsSak,
            });

            return finnOgSettInnHull(
                forslag,
                harAktivitetskravIPeriodeUtenUttak,
                familiehendelsesdato,
                erAdopsjon,
                false,
                erFarEllerMedmor,
                førsteUttaksdagNesteBarnsSak,
            );
        } else {
            const forslag = ikkeDeltUttak(
                situasjon,
                familiehendelsesdato,
                erFarEllerMedmor,
                valgtStønadskonto,
                startdatoPermisjon,
                annenForelderErUfør,
                bareFarMedmorHarRett,
                termindato,
                førsteUttaksdagNesteBarnsSak,
            );

            return finnOgSettInnHull(
                forslag,
                harAktivitetskravIPeriodeUtenUttak,
                familiehendelsesdato,
                erAdopsjon,
                bareFarMedmorHarRett,
                erFarEllerMedmor,
                førsteUttaksdagNesteBarnsSak,
            );
        }
    }

    return [];
};
