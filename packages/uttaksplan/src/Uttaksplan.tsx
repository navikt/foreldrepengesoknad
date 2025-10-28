import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import {
    AnnenForelder,
    Barn,
    BarnFraNesteSak,
    Dekningsgrad,
    EksisterendeSak,
    ForeldreparSituasjon,
    NavnPåForeldre,
    Periode,
    Situasjon,
    Søkersituasjon,
    Utsettelsesperiode,
    Uttaksperiode,
    isAnnenForelderOppgitt,
    isAnnenPartInfoPeriode,
    isUtsettelsesperiode,
} from '@navikt/fp-common';
import { loggAmplitudeEvent } from '@navikt/fp-metrics';
import {
    EksternArbeidsforholdDto_fpoversikt,
    KontoBeregningDto_fpoversikt,
    Periode as PeriodeType,
} from '@navikt/fp-types';
import { UttaksplanKalender } from '@navikt/fp-uttaksplan-kalender';

import Uttaksplanbuilder from './builder/Uttaksplanbuilder';
import { splittPeriodePåDato, splittUttaksperiodePåFamiliehendelsesdato } from './builder/leggTilPeriode';
import Block from './common/block/Block';
import OversiktKvoter from './components/oversikt-kvoter/OversiktKvoter';
import Planlegger from './components/planlegger/Planlegger';
import PlanvisningToggle from './components/planvisning-toggle/PlanvisningToggle';
import ResetUttaksplanModal from './components/reset-uttaksplan-modal/ResetUttaksplanModal';
import SlettUttaksplanModal from './components/slett-uttaksplan-modal/SlettUttaksplanModal';
import { ISOStringToDate, getToTetteReglerGjelder, tidperiodeOverlapperDato } from './utils/dateUtils';
import { getHarAktivitetskravIPeriodeUtenUttak } from './utils/uttaksplanUtils';
import { farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato } from './utils/wlbUtils';
import { validerUttaksplan } from './validering/validerUttaksplan';
import VeilederInfo from './validering/veilederInfo/VeilederInfo';
import { getPeriodelisteMeldinger, getUttaksplanVeilederinfo } from './validering/veilederInfo/utils';

interface Props {
    foreldreSituasjon: ForeldreparSituasjon;
    erDeltUttak: boolean;
    uttaksplan: Periode[];
    familiehendelsesdato: string;
    handleOnPlanChange: (nyPlan: Periode[]) => void;
    stønadskontoer: KontoBeregningDto_fpoversikt;
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
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
    harKomplettUttaksplan: boolean;
    opprinneligPlan: Periode[] | undefined;
    termindato: Date | undefined;
    barn: Barn;
    setUttaksplanErGyldig: (planErGyldig: boolean) => void;
    handleSlettUttaksplan: () => void;
    handleResetUttaksplan: () => void;
    barnFraNesteSak: BarnFraNesteSak | undefined;
    familiehendelsesdatoNesteSak: Date | undefined;
    førsteUttaksdagNesteBarnsSak: Date | undefined;
    minsterettUkerToTette: number | undefined;
}

interface PeriodeValidState {
    id: string;
    isValid: boolean;
}

const Uttaksplan = ({
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
}: Props) => {
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato)!;
    const intl = useIntl();
    const [visningsmodus, setVisningsmodus] = useState<string>('liste');
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
    const harAktivitetsfriKvote = stønadskontoer.kontoer.some((st) => st.konto === 'AKTIVITETSFRI_KVOTE');

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

    const handleUpdatePeriode = (oppdatertPeriode: Periode, famHendelsesdato: Date) => {
        let resultat: Periode[] = [];
        if (
            farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato(
                oppdatertPeriode,
                famHendelsesdato,
                morHarRett,
                termindato,
            )
        ) {
            const perioder = splittUttaksperiodePåFamiliehendelsesdato(
                oppdatertPeriode as Uttaksperiode,
                famHendelsesdato,
                harAktivitetsfriKvote,
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

    const handleAddPeriode = (nyPeriode: Periode, famHendelsesdato: Date) => {
        let resultat: Periode[] = [];
        if (
            farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato(nyPeriode, famHendelsesdato, morHarRett, termindato)
        ) {
            const perioder = splittUttaksperiodePåFamiliehendelsesdato(nyPeriode as Uttaksperiode, famHendelsesdato);

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

    // TODO: finn ut om det var riktig å slette oldArbeidsforhold mapping
    const uttaksplanValidering = validerUttaksplan({
        søkersituasjon: søkersituasjon,
        arbeidsforhold,
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
        loggAmplitudeEvent({
            origin: 'foreldrepengesoknad',
            eventName: 'button klikk',
            eventData: { tittel: 'slettUttaksplan' },
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
    const navnAnnenPart = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    return (
        <div>
            <PlanvisningToggle setVisningsmodus={setVisningsmodus} />
            {visningsmodus === 'liste' && (
                <>
                    <Block padBottom="l">
                        <Planlegger
                            uttaksplan={uttaksplan}
                            familiehendelsesdato={familiehendelsesdatoDate}
                            handleUpdatePeriode={handleUpdatePeriode}
                            stønadskontoer={stønadskontoer}
                            navnPåForeldre={navnPåForeldre}
                            annenForelder={annenForelder}
                            arbeidsforhold={arbeidsforhold}
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
                </>
            )}
            {visningsmodus === 'kalender' && (
                <Block padBottom="xxl">
                    <UttaksplanKalender
                        uttaksplan={uttaksplan as PeriodeType[]}
                        erFarEllerMedmor={erFarEllerMedmor}
                        barn={barn}
                        navnAnnenPart={navnAnnenPart}
                    />
                </Block>
            )}
            <Block visible={uttaksplanVeilederInfo.length > 0} padBottom="l">
                <VeilederInfo
                    messages={uttaksplanVeilederInfo}
                    ariaTittel={intl.formatMessage({ id: 'uttaksplan.regelAvvik.ariaTittel' })}
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
        </div>
    );
};

// eslint-disable-next-line import/no-default-export
export default Uttaksplan;
