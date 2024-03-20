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

const getSøkerensUttaksplanForslag = (
    søkersituasjon: SøkersituasjonFp,
    barn: Barn,
    valgtStønadskonto: TilgjengeligStønadskonto[],
    annenForelder: AnnenForelder,
    annenPartsPerioder: Periode[] | undefined,
    fordeling: Fordeling,
    barnFraNesteSak: BarnFraNesteSak | undefined,
): Periode[] => {
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const erDeltUttak = getIsDeltUttak(annenForelder);
    const situasjon = søkersituasjon.situasjon;
    const erAdopsjon = situasjon === 'adopsjon';
    const familiehendelsesdato = getFamiliehendelsedatoDate(barn);
    const antallUkerFellesperiode = getAntallUkerFellesperiode(valgtStønadskonto);
    const datoForAleneomsorg = ISOStringToDate(getDatoForAleneomsorg(annenForelder));
    const termindato = ISOStringToDate(getTermindato(barn));
    const ankomstNorgeForAdoptertBarn =
        isAdoptertAnnetBarn(barn) && barn.adoptertIUtlandet ? dayjs(barn.ankomstdato).toDate() : undefined;
    const søkerErAleneOmOmsorg = getErAleneOmOmsorg(annenForelder);
    const annenPartsSisteDag = annenPartsPerioder
        ? Uttaksdagen(annenPartsPerioder[annenPartsPerioder.length - 1].tidsperiode.tom).denneEllerForrige()
        : undefined;
    const startdatoPermisjon = getOppstartsdatoFromInput(
        fordeling.oppstartAvForeldrepengerValg,
        fordeling.oppstartDato,
        termindato,
        familiehendelsesdato,
        ankomstNorgeForAdoptertBarn,
        annenPartsSisteDag,
        datoForAleneomsorg,
    );
    const morSinSisteUttaksdag = erFarEllerMedmor ? annenPartsSisteDag : undefined;
    const bareFarMedmorHarRett = getKunFarHarRett(erFarEllerMedmor, annenForelder, søkerErAleneOmOmsorg);
    const morHarRett = !erFarEllerMedmor || !bareFarMedmorHarRett;

    const fellesperiodeUkerTilSøker = getAntallUkerFellesperiodeTilSøker(antallUkerFellesperiode, fordeling);
    const fellesperiodeUkerMor = erFarEllerMedmor ? undefined : fellesperiodeUkerTilSøker;
    const antallUkerFellesperiodeFarMedmor = erFarEllerMedmor ? fellesperiodeUkerTilSøker : undefined;
    const farSinFørsteUttaksdag = erFarEllerMedmor ? startdatoPermisjon : undefined;
    const annenForelderErUfør = isAnnenForelderOppgitt(annenForelder) && annenForelder.erMorUfør;
    const annenForelderHarRettPåForeldrepengerIEØS =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerIEØS;
    const førsteUttaksdagNesteBarnsSak = barnFraNesteSak?.startdatoFørsteStønadsperiode;

    const harAktivitetskravIPeriodeUtenUttak = getHarAktivitetskravIPeriodeUtenUttak({
        erDeltUttak,
        morHarRett,
        søkerErAleneOmOmsorg,
    });
    const harAnnenForelderSøktFP = annenPartsPerioder !== undefined;
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
};

const oppdaterPlanForslagMedAnnenPartsPerioder = (
    søkerensUttaksplanForslag: Periode[],
    annenPartsPerioder: Periode[] | undefined,
    annenForelder: AnnenForelder,
    uttaksplanMetadata: UttaksplanMetaData | undefined,
    barn: Barn,
    søkersituasjon: SøkersituasjonFp,
    barnFraNesteSak: BarnFraNesteSak | undefined,
    oppdaterUttaksplanMetadata: (metadata: UttaksplanMetaData) => void,
): Periode[] => {
    const familiehendelsesdato = getFamiliehendelsedatoDate(barn);
    const situasjon = søkersituasjon.situasjon;
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const søkerErAleneOmOmsorg = getErAleneOmOmsorg(annenForelder);
    const bareFarMedmorHarRett = getKunFarHarRett(erFarEllerMedmor, annenForelder, søkerErAleneOmOmsorg);
    const morHarRett = !erFarEllerMedmor || !bareFarMedmorHarRett;
    const erDeltUttak = getIsDeltUttak(annenForelder);
    const erAdopsjon = situasjon === 'adopsjon';
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

    const søkerensUttaksplanForslag = getSøkerensUttaksplanForslag(
        søkersituasjon,
        barn,
        valgtStønadskonto,
        annenForelder,
        annenPartsPerioder,
        fordeling,
        barnFraNesteSak,
    );

    return oppdaterPlanForslagMedAnnenPartsPerioder(
        søkerensUttaksplanForslag,
        annenPartsPerioder,
        annenForelder,
        uttaksplanMetadata,
        barn,
        søkersituasjon,
        barnFraNesteSak,
        oppdaterUttaksplanMetadata,
    );
};
