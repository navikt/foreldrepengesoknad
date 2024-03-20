import {
    getHarAktivitetskravIPeriodeUtenUttak,
    leggTilAnnenPartsPerioderISøkerenesUttaksplan,
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
    getAntallUkerFellesperiode,
    getKunFarHarRett,
    isAdoptertAnnetBarn,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/fp-formik';
import { SøkersituasjonFp } from '@navikt/fp-types';

import { getIsDeltUttak } from 'app/components/fordeling-oversikt/fordelingOversiktUtils';
import Fordeling from 'app/context/types/Fordeling';
import { getAntallUkerFellesperiodeTilSøker, getOppstartsdatoFromInput } from 'app/steps/fordeling/fordelingFormUtils';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';

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
    fordeling: Fordeling | undefined,
    uttaksplanMetadata: UttaksplanMetaData | undefined,
    oppdaterUttaksplanMetadata: (metadata: UttaksplanMetaData) => void,
): Periode[] => {
    if (!fordeling) {
        throw new Error('Fordeling er undefined.');
    }
    const situasjon = søkersituasjon.situasjon;
    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);
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
    const fellesperiodeUkerTilSøker = getAntallUkerFellesperiodeTilSøker(antallUkerFellesperiode, fordeling);
    const fellesperiodeUkerMor = erFarEllerMedmor ? undefined : fellesperiodeUkerTilSøker;
    const antallUkerFellesperiodeFarMedmor = erFarEllerMedmor ? fellesperiodeUkerTilSøker : undefined;
    const farSinFørsteUttaksdag = erFarEllerMedmor ? startdatoPermisjon : undefined;
    const erAdopsjon = situasjon === 'adopsjon';
    let søkerensUttaksplanForslag = [] as Periode[];

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

            søkerensUttaksplanForslag = finnOgSettInnHull(
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

            søkerensUttaksplanForslag = finnOgSettInnHull(
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

    if (annenPartsPerioder && annenPartsPerioder.length > 0 && søkerensUttaksplanForslag.length > 0) {
        const harAktivitetskravIPeriodeUtenUttak = getHarAktivitetskravIPeriodeUtenUttak({
            erDeltUttak,
            morHarRett,
            søkerErAleneOmOmsorg,
        });
        const uttaksplanForslagMedAnnenPartsVedtak = leggTilAnnenPartsPerioderISøkerenesUttaksplan(
            annenPartsPerioder,
            søkerensUttaksplanForslag,
            familiehendelsesdato,
            harAktivitetskravIPeriodeUtenUttak,
            erAdopsjon,
            bareFarMedmorHarRett,
            erFarEllerMedmor,
            barnFraNesteSak?.startdatoFørsteStønadsperiode,
        );
        oppdaterUttaksplanMetadata({
            ...uttaksplanMetadata,
            annenPartsUttakErLagtTilIPlan: true,
        });
        return uttaksplanForslagMedAnnenPartsVedtak;
    } else if (annenPartsPerioder && annenPartsPerioder.length > 0) {
        oppdaterUttaksplanMetadata({
            ...uttaksplanMetadata,
            annenPartsUttakErLagtTilIPlan: true,
        });
        return annenPartsPerioder;
    } else {
        return søkerensUttaksplanForslag;
    }
};
