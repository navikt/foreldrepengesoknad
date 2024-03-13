import dayjs from 'dayjs';
import { FunctionComponent, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import {
    AnnenForelder,
    Barn,
    BarnFraNesteSak,
    Block,
    Dekningsgrad,
    EksisterendeSak,
    Forelder,
    ForeldreparSituasjon,
    ISOStringToDate,
    NavnPåForeldre,
    Arbeidsforhold as OldArbeidsforhold,
    Periode,
    Situasjon,
    Søkersituasjon,
    TilgjengeligStønadskonto,
    Utsettelsesperiode,
    Uttaksperiode,
    farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato,
    getToTetteReglerGjelder,
    intlUtils,
    isAnnenForelderOppgitt,
    isAnnenPartInfoPeriode,
    isUtsettelsesperiode,
    tidperiodeOverlapperDato,
} from '@navikt/fp-common';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { Arbeidsforhold } from '@navikt/fp-types';

import Uttaksplanbuilder from './builder/Uttaksplanbuilder';
import { splittPeriodePåDato, splittUttaksperiodePåFamiliehendelsesdato } from './builder/leggTilPeriode';
import OversiktKvoter from './components/oversikt-kvoter/OversiktKvoter';
import Planlegger from './components/planlegger/Planlegger';
import ResetUttaksplanModal from './components/reset-uttaksplan-modal/ResetUttaksplanModal';
import SlettUttaksplanModal from './components/slett-uttaksplan-modal/SlettUttaksplanModal';
import { getHarAktivitetskravIPeriodeUtenUttak } from './utils/uttaksplanUtils';
import { validerUttaksplan } from './validering/validerUttaksplan';
import VeilederInfo from './validering/veilederInfo/VeilederInfo';
import { getPeriodelisteMeldinger, getUttaksplanVeilederinfo } from './validering/veilederInfo/utils';

//TODO (TOR) temp-mapping. Fjern
const mapNewToOldArbeidsforhold = (arbeidsforhold: Arbeidsforhold[] | undefined): OldArbeidsforhold[] => {
    if (!arbeidsforhold) {
        return [];
    }

    return arbeidsforhold.map((arbforhold) => {
        return {
            arbeidsgiverId: arbforhold.arbeidsgiverId,
            arbeidsgiverIdType: arbforhold.arbeidsgiverIdType,
            arbeidsgiverNavn: arbforhold.arbeidsgiverNavn,
            fom: dayjs.utc(arbforhold.fom).toDate(),
            stillingsprosent: arbforhold.stillingsprosent,
            tom: arbforhold.tom ? dayjs.utc(arbforhold.tom).toDate() : undefined,
        };
    });
};

interface Props {
    foreldreSituasjon: ForeldreparSituasjon;
    forelderVedAleneomsorg: Forelder | undefined;
    erDeltUttak: boolean;
    uttaksplan: Periode[];
    familiehendelsesdato: string;
    handleOnPlanChange: (nyPlan: Periode[]) => void;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    arbeidsforhold: Arbeidsforhold[];
    erEndringssøknad: boolean;
    erFarEllerMedmor: boolean;
    erFlerbarnssøknad: boolean;
    erAleneOmOmsorg: boolean;
    harMidlertidigOmsorg: boolean;
    situasjon: Situasjon;
    erMorUfør: boolean;
    morHarRett: boolean;
    søkersituasjon: Søkersituasjon;
    dekningsgrad: Dekningsgrad;
    antallBarn: number;
    eksisterendeSak: EksisterendeSak | undefined;
    perioderSomSkalSendesInn: Periode[];
    morsSisteDag: Date | undefined;
    harKomplettUttaksplan: boolean;
    opprinneligPlan: Periode[] | undefined;
    termindato: Date | undefined;
    barn: Barn;
    setUttaksplanErGyldig: (planErGyldig: boolean) => void;
    handleSlettUttaksplan: () => void;
    handleResetUttaksplan: () => void;
    visAutomatiskJusteringForm: boolean;
    perioderMedUttakRundtFødsel: Uttaksperiode[];
    barnFraNesteSak: BarnFraNesteSak | undefined;
    familiehendelsesdatoNesteSak: Date | undefined;
    førsteUttaksdagNesteBarnsSak: Date | undefined;
    minsterettUkerToTette: number | undefined;
}

export interface PeriodeValidState {
    id: string;
    isValid: boolean;
}

const Uttaksplan: FunctionComponent<Props> = ({
    foreldreSituasjon,
    erDeltUttak,
    uttaksplan,
    familiehendelsesdato,
    stønadskontoer,
    handleOnPlanChange,
    navnPåForeldre,
    annenForelder,
    arbeidsforhold,
    erEndringssøknad,
    erFarEllerMedmor,
    erFlerbarnssøknad,
    erAleneOmOmsorg,
    harMidlertidigOmsorg,
    situasjon,
    erMorUfør,
    morHarRett,
    søkersituasjon,
    dekningsgrad,
    antallBarn,
    eksisterendeSak,
    perioderSomSkalSendesInn,
    harKomplettUttaksplan,
    termindato,
    opprinneligPlan,
    setUttaksplanErGyldig,
    handleSlettUttaksplan,
    handleResetUttaksplan,
    barn,
    barnFraNesteSak,
    familiehendelsesdatoNesteSak,
    førsteUttaksdagNesteBarnsSak,
    minsterettUkerToTette,
}) => {
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato)!;
    const intl = useIntl();
    const [perioderErGyldige, setPerioderErGyldige] = useState<PeriodeValidState[]>([]);
    const [slettUttaksplanModalOpen, setSlettUttaksplanModalOpen] = useState(false);
    const [resetUttaksplanModalOpen, setResetUttaksplanModalOpen] = useState(false);
    const harAktivitetskravIPeriodeUtenUttak = getHarAktivitetskravIPeriodeUtenUttak({
        erDeltUttak,
        morHarRett,
        søkerErAleneOmOmsorg: erAleneOmOmsorg,
    });
    const uttaksplanUtenAnnenPartsSamtidigUttak = uttaksplan.filter(
        (p) => !(isAnnenPartInfoPeriode(p) && !p.visPeriodeIPlan),
    );
    const bareFarHarRett = !morHarRett && !erAleneOmOmsorg;
    const annenForelderHarRettINorge =
        isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerINorge!;
    const toTetteReglerGjelder = getToTetteReglerGjelder(familiehendelsesdatoDate, familiehendelsesdatoNesteSak);

    const builder = Uttaksplanbuilder(
        uttaksplanUtenAnnenPartsSamtidigUttak,
        familiehendelsesdatoDate,
        harAktivitetskravIPeriodeUtenUttak,
        situasjon === 'adopsjon',
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
        opprinneligPlan,
    );

    const handleDeletePeriode = (periodeId: string) => {
        const slettetPeriode = uttaksplan.find((p) => p.id === periodeId)!;
        const result = builder.slettPeriode(slettetPeriode);

        handleOnPlanChange(result);
    };

    const handleUpdatePeriode = (oppdatertPeriode: Periode, familiehendelsesdato: Date) => {
        let resultat: Periode[] = [];
        if (
            farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato(
                oppdatertPeriode,
                familiehendelsesdato,
                morHarRett,
                termindato,
            )
        ) {
            const perioder = splittUttaksperiodePåFamiliehendelsesdato(
                oppdatertPeriode as Uttaksperiode,
                familiehendelsesdato,
            );

            resultat = builder.oppdaterPerioder(perioder);

            handleOnPlanChange(resultat);
        } else if (
            førsteUttaksdagNesteBarnsSak !== undefined &&
            tidperiodeOverlapperDato(oppdatertPeriode.tidsperiode, førsteUttaksdagNesteBarnsSak)
        ) {
            const perioder = splittPeriodePåDato(oppdatertPeriode, førsteUttaksdagNesteBarnsSak);
            resultat = builder.oppdaterPerioder(perioder);
            handleOnPlanChange(resultat);
        } else {
            const result = builder.oppdaterPeriode(oppdatertPeriode);

            handleOnPlanChange(result);
        }
    };

    const handleAddPeriode = (nyPeriode: Periode, familiehendelsesdato: Date) => {
        let resultat: Periode[] = [];
        if (
            farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato(
                nyPeriode,
                familiehendelsesdato,
                morHarRett,
                termindato,
            )
        ) {
            const perioder = splittUttaksperiodePåFamiliehendelsesdato(
                nyPeriode as Uttaksperiode,
                familiehendelsesdato,
            );

            resultat = builder.leggTilPerioder(perioder);

            handleOnPlanChange(resultat);
        } else if (
            førsteUttaksdagNesteBarnsSak !== undefined &&
            tidperiodeOverlapperDato(nyPeriode.tidsperiode, førsteUttaksdagNesteBarnsSak)
        ) {
            const perioder = splittPeriodePåDato(nyPeriode, førsteUttaksdagNesteBarnsSak);
            resultat = builder.leggTilPerioder(perioder);
            handleOnPlanChange(resultat);
        } else {
            resultat = builder.leggTilPeriode(nyPeriode);
            handleOnPlanChange(resultat);
        }
    };

    const oldFormatArbeidsforhold = mapNewToOldArbeidsforhold(arbeidsforhold);

    const uttaksplanValidering = validerUttaksplan({
        søkersituasjon: søkersituasjon,
        arbeidsforhold: oldFormatArbeidsforhold,
        dekningsgrad: dekningsgrad,
        erEndringssøknad: erEndringssøknad,
        antallBarn: antallBarn,
        annenForelder: annenForelder,
        navnPåForeldre: navnPåForeldre,
        søkerErFarEllerMedmor: erFarEllerMedmor,
        søkerErAleneOmOmsorg: erAleneOmOmsorg,
        søkerHarMidlertidigOmsorg: harMidlertidigOmsorg,
        erDeltUttak: erDeltUttak,
        morErUfør: erMorUfør,
        morHarRett: morHarRett,
        erFlerbarnssøknad: erFlerbarnssøknad,
        familiehendelsesdato: familiehendelsesdatoDate,
        termindato: termindato,
        stønadskontoer: stønadskontoer,
        perioder: uttaksplan,
        harKomplettUttaksplan,
        eksisterendeSak: eksisterendeSak,
        perioderSomSkalSendesInn: perioderSomSkalSendesInn,
        barn: barn,
        familiehendelsesdatoNesteSak,
        førsteUttaksdagNesteBarnsSak,
        minsterettUkerToTette,
    });

    useEffect(() => {
        if (perioderErGyldige.some((p) => !p.isValid) || uttaksplanValidering.harFeil) {
            setUttaksplanErGyldig(false);
        } else {
            setUttaksplanErGyldig(true);
        }
    });

    const handleSlettUttaksplanModalClose = () => {
        setSlettUttaksplanModalOpen(false);
    };

    const handleSlettUttaksplanModalBekreft = () => {
        setSlettUttaksplanModalOpen(false);
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            hendelse: 'slettUttaksplan',
        });
        handleSlettUttaksplan();
    };

    const handleResetUttaksplanModalClose = () => {
        setResetUttaksplanModalOpen(false);
    };

    const handleResetUttaksplanModalBekreft = () => {
        setResetUttaksplanModalOpen(false);
        handleResetUttaksplan();
    };

    const uttaksplanVeilederInfo = getUttaksplanVeilederinfo(uttaksplanValidering.avvik, intl, true);
    const meldingerPerPeriode = getPeriodelisteMeldinger(uttaksplanVeilederInfo);

    const utsettelserIPlan = uttaksplan.filter((p) => isUtsettelsesperiode(p)) as Utsettelsesperiode[];

    return (
        <>
            <Block padBottom="l">
                <Planlegger
                    uttaksplan={uttaksplan}
                    familiehendelsesdato={familiehendelsesdatoDate}
                    handleUpdatePeriode={handleUpdatePeriode}
                    stønadskontoer={stønadskontoer}
                    navnPåForeldre={navnPåForeldre}
                    annenForelder={annenForelder}
                    arbeidsforhold={oldFormatArbeidsforhold}
                    handleDeletePeriode={handleDeletePeriode}
                    handleAddPeriode={handleAddPeriode}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erFlerbarnssøknad={erFlerbarnssøknad}
                    erDeltUttak={erDeltUttak}
                    erAleneOmOmsorg={erAleneOmOmsorg}
                    situasjon={situasjon}
                    meldingerPerPeriode={meldingerPerPeriode}
                    erMorUfør={erMorUfør}
                    setPerioderErGyldige={setPerioderErGyldige}
                    erEndringssøknad={erEndringssøknad}
                    setSlettUttaksplanModalOpen={setSlettUttaksplanModalOpen}
                    setResetUttaksplanModalOpen={setResetUttaksplanModalOpen}
                    termindato={termindato}
                    barn={barn}
                    utsettelserIPlan={utsettelserIPlan}
                    barnFraNesteSak={barnFraNesteSak}
                    perioderErGyldige={perioderErGyldige}
                />
            </Block>

            <Block padBottom="xl">
                <OversiktKvoter
                    tilgjengeligeStønadskontoer={stønadskontoer}
                    uttaksplan={uttaksplan}
                    erDeltUttak={erDeltUttak}
                    foreldreparSituasjon={foreldreSituasjon}
                    familiehendelsesdato={familiehendelsesdatoDate}
                    annenForelderHarRettINorge={annenForelderHarRettINorge}
                    toTetteReglerGjelder={toTetteReglerGjelder}
                    intl={intl}
                    erAleneOmOmsorg={erAleneOmOmsorg}
                    erEndringssøknad={erEndringssøknad}
                    rolle={søkersituasjon.rolle}
                    situasjon={søkersituasjon.situasjon}
                    navnPåForeldre={navnPåForeldre}
                />
            </Block>
            <Block visible={uttaksplanVeilederInfo.length > 0} padBottom="l">
                <VeilederInfo
                    messages={uttaksplanVeilederInfo}
                    ariaTittel={intlUtils(intl, 'uttaksplan.regelAvvik.ariaTittel')}
                />
            </Block>
            <SlettUttaksplanModal
                isOpen={slettUttaksplanModalOpen}
                erEndringssøknad={erEndringssøknad}
                onClose={handleSlettUttaksplanModalClose}
                handleSlettUttaksplanModalBekreft={handleSlettUttaksplanModalBekreft}
            />
            <ResetUttaksplanModal
                isOpen={resetUttaksplanModalOpen}
                onClose={handleResetUttaksplanModalClose}
                handleResetUttaksplanModalBekreft={handleResetUttaksplanModalBekreft}
            />
        </>
    );
};

export default Uttaksplan;
