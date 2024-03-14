import {
    getHarAktivitetskravIPeriodeUtenUttak,
    leggTilAnnenPartsPerioderISøkerenesUttaksplan,
} from '@navikt/uttaksplan';
import { finnOgSettInnHull } from '@navikt/uttaksplan/src/builder/uttaksplanbuilderUtils';
import dayjs from 'dayjs';

import {
    Periode,
    TilgjengeligStønadskonto,
    Uttaksdagen,
    getKunFarHarRett,
    isAdoptertAnnetBarn,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/fp-formik';
import { notEmpty } from '@navikt/fp-validation';

import { getIsDeltUttak } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';
import { getOppstartsdatoFromInput } from 'app/steps/fordeling/fordelingFormUtils';

import { getDatoForAleneomsorg, getErAleneOmOmsorg } from '../annenForelderUtils';
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
    const fordeling = notEmpty(useContextGetData(ContextDataType.FORDELING));

    const situasjon = søkersituasjon.situasjon;
    const familiehendelsesdato = getFamiliehendelsedatoDate(barn);
    const erDeltUttak = getIsDeltUttak(annenForelder);
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const søkerErAleneOmOmsorg = getErAleneOmOmsorg(annenForelder);
    const datoForAleneomsorg = ISOStringToDate(getDatoForAleneomsorg(annenForelder));
    const annenForelderErUfør = isAnnenForelderOppgitt(annenForelder) && annenForelder.erMorUfør;
    const bareFarMedmorHarRett = getKunFarHarRett(erFarEllerMedmor, annenForelder, søkerErAleneOmOmsorg);
    const morHarRett = !erFarEllerMedmor || !bareFarMedmorHarRett;
    const termindato = getTermindato(barn);
    const termindatoDate = ISOStringToDate(termindato);
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
        isAdoptertAnnetBarn(barn) && barn.adoptertIUtlandet ? dayjs(barn.ankomstdato).toDate() : undefined;
    const startdatoPermisjon = getOppstartsdatoFromInput(
        fordeling.oppstartAvForeldrepengerValg,
        fordeling.oppstartDato,
        termindatoDate,
        familiehendelsesdato,
        ankomstNorgeForAdoptertBarn,
        annenPartsSisteDag,
        datoForAleneomsorg,
    );
    const fellesperiodeUkerTilSøker = fordeling.antallUkerFellesperiodeTilSøker;
    const fellesperiodeUkerMor = erFarEllerMedmor ? undefined : fellesperiodeUkerTilSøker;
    const antallUkerFellesperiodeFarMedmor = erFarEllerMedmor ? fellesperiodeUkerTilSøker : undefined;
    const farSinFørsteUttaksdag = erFarEllerMedmor ? startdatoPermisjon : undefined;
    const erAdopsjon = situasjon === 'adopsjon';
    let forslag = [] as Periode[];

    if (familiehendelsesdato) {
        if (erDeltUttak) {
            const forslagDeltUttak = deltUttak({
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
                termindato: termindatoDate,
                førsteUttaksdagNesteBarnsSak,
            });

            forslag = finnOgSettInnHull(
                forslagDeltUttak,
                harAktivitetskravIPeriodeUtenUttak,
                familiehendelsesdato,
                erAdopsjon,
                false,
                erFarEllerMedmor,
                førsteUttaksdagNesteBarnsSak,
            );
        } else {
            const forslagIkkeDeltUttak = ikkeDeltUttak(
                situasjon,
                familiehendelsesdato,
                erFarEllerMedmor,
                valgtStønadskonto,
                startdatoPermisjon,
                annenForelderErUfør,
                bareFarMedmorHarRett,
                termindatoDate,
                førsteUttaksdagNesteBarnsSak,
            );

            forslag = finnOgSettInnHull(
                forslagIkkeDeltUttak,
                harAktivitetskravIPeriodeUtenUttak,
                familiehendelsesdato,
                erAdopsjon,
                bareFarMedmorHarRett,
                erFarEllerMedmor,
                førsteUttaksdagNesteBarnsSak,
            );
        }
    }

    if (annenPartsPerioder && annenPartsPerioder.length > 0) {
        return leggTilAnnenPartsPerioderISøkerenesUttaksplan(
            annenPartsPerioder,
            forslag,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
            bareFarMedmorHarRett,
            erFarEllerMedmor,
            førsteUttaksdagNesteBarnsSak,
        );
    }

    return forslag;
};
