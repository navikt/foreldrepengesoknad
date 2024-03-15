import {
    getHarAktivitetskravIPeriodeUtenUttak, // leggTilAnnenPartsPerioderISøkerenesUttaksplan,
} from '@navikt/uttaksplan';
import { finnOgSettInnHull } from '@navikt/uttaksplan/src/builder/uttaksplanbuilderUtils';
import dayjs from 'dayjs';

import {
    AnnenForelder,
    Barn,
    BarnFraNesteSak,
    Periode,
    TilgjengeligStønadskonto,
    Uttaksdagen,
    getKunFarHarRett,
    isAdoptertAnnetBarn,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { ISOStringToDate, getNumberFromNumberInputValue } from '@navikt/fp-formik';
import { SøkersituasjonFp } from '@navikt/fp-types';

import { getIsDeltUttak } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';
import Fordeling from 'app/context/types/Fordeling';
import { getOppstartsdatoFromInput } from 'app/steps/fordeling/fordelingFormUtils';

import { getDatoForAleneomsorg, getErAleneOmOmsorg } from '../annenForelderUtils';
import { getFamiliehendelsedatoDate, getTermindato } from '../barnUtils';
import { deltUttak } from './deltUttak';
import { ikkeDeltUttak } from './ikkeDeltUttak';

export const lagUttaksplanForslag = (
    valgtStønadskonto: TilgjengeligStønadskonto[],
    annenPartsPerioder: Periode[] | undefined,
    søkersituasjon: SøkersituasjonFp,
    barn: Barn,
    barnFraNesteSak: BarnFraNesteSak | undefined,
    annenForelder: AnnenForelder,
    fordeling: Fordeling,
    antallOppstartsValg: number,
): Periode[] => {
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
        antallOppstartsValg,
    );
    const fellesperiodeUkerTilSøker = getNumberFromNumberInputValue(fordeling.antallUkerFellesperiodeTilSøker);
    const fellesperiodeUkerMor = erFarEllerMedmor ? undefined : fellesperiodeUkerTilSøker;
    const antallUkerFellesperiodeFarMedmor = erFarEllerMedmor ? fellesperiodeUkerTilSøker : undefined;
    const farSinFørsteUttaksdag = erFarEllerMedmor ? startdatoPermisjon : undefined;
    const erAdopsjon = situasjon === 'adopsjon';
    // let forslag = [] as Periode[];

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
                termindato: termindatoDate,
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
                termindatoDate,
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

    // if (annenPartsPerioder && annenPartsPerioder.length > 0) {
    //     return leggTilAnnenPartsPerioderISøkerenesUttaksplan(
    //         annenPartsPerioder,
    //         forslag,
    //         familiehendelsesdato,
    //         harAktivitetskravIPeriodeUtenUttak,
    //         erAdopsjon,
    //         bareFarMedmorHarRett,
    //         erFarEllerMedmor,
    //         førsteUttaksdagNesteBarnsSak,
    //     );
    // }

    return [];
};
