import dayjs from 'dayjs';

import {
    AnnenForelder,
    Barn,
    BarnFraNesteSak,
    Periode,
    Uttaksdagen,
    getAntallUkerFellesperiode,
    getKunFarHarRett,
    isAdoptertAnnetBarn,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
} from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/fp-formik';
import { SøkersituasjonFp, TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';
import {
    finnOgSettInnHull,
    getHarAktivitetskravIPeriodeUtenUttak,
    leggTilAnnenPartsPerioderISøkerenesUttaksplan,
} from '@navikt/fp-uttaksplan';

import Fordeling from 'app/context/types/Fordeling';
import { UttaksplanMetaData } from 'app/types/UttaksplanMetaData';
import { getDatoForAleneomsorg, getErAleneOmOmsorg, getIsDeltUttak } from 'app/utils/annenForelderUtils';
import { getFamiliehendelsedatoDate, getTermindato } from 'app/utils/barnUtils';
import { getAntallDagerFellesperiodeTilSøker, getOppstartsdatoFromFordelingValg } from 'app/utils/fordelingUtils';
import { deltUttak } from 'app/utils/uttaksplan/deltUttak';
import { ikkeDeltUttak } from 'app/utils/uttaksplan/ikkeDeltUttak';

const getSøkerensUttaksplanForslag = (
    søkersituasjon: SøkersituasjonFp,
    barn: Barn,
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad,
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
    const annenPartsSisteDag =
        annenPartsPerioder && annenPartsPerioder.length > 0
            ? Uttaksdagen(annenPartsPerioder[annenPartsPerioder.length - 1].tidsperiode.tom).denneEllerForrige()
            : undefined;
    const startdatoPermisjon = getOppstartsdatoFromFordelingValg(
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

    const fellesperiodeDagerTilSøker = getAntallDagerFellesperiodeTilSøker(antallUkerFellesperiode, fordeling);
    const fellesperiodeDagerMor = erFarEllerMedmor ? undefined : fellesperiodeDagerTilSøker;
    const antallUkerFellesperiodeFarMedmor = erFarEllerMedmor ? fellesperiodeDagerTilSøker : undefined;
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
            tilgjengeligeStønadskontoer: valgtStønadskonto.kontoer,
            startdatoPermisjon,
            fellesperiodeDagerMor,
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
            valgtStønadskonto.kontoer,
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
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad,
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
