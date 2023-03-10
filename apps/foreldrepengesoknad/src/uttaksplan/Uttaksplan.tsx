import React, { FunctionComponent, useEffect, useState } from 'react';
import { Block, intlUtils } from '@navikt/fp-common';
import Planlegger from './components/planlegger/Planlegger';
import { ForeldreparSituasjon } from 'app/types/ForeldreparSituasjonTypes';
import { Forelder } from 'app/types/Forelder';
import { isInfoPeriode, isUtsettelsesperiode, Periode, Utsettelsesperiode, Uttaksperiode } from './types/Periode';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import AnnenForelder, { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { Situasjon } from 'app/types/Situasjon';
import OversiktKvoter from './components/oversikt-kvoter/OversiktKvoter';
import { getToTetteReglerGjelder, ISOStringToDate, tidperiodeOverlapperDato } from 'app/utils/dateUtils';
import { validerUttaksplan } from './validering/validerUttaksplan';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import { Dekningsgrad } from 'app/types/Dekningsgrad';
import VeilederInfo from './validering/veilederInfo/VeilederInfo';
import { useIntl } from 'react-intl';
import { getPeriodelisteMeldinger, getUttaksplanVeilederinfo } from './validering/veilederInfo/utils';
import OppgiTilleggsopplysninger from './components/oppgi-tilleggsopplysninger/OppgiTilleggsopplysninger';
import { Tilleggsopplysninger } from 'app/context/types/Tilleggsopplysninger';
import { SenEndringÅrsak } from './types/SenEndringÅrsak';
import { getSeneEndringerSomKreverBegrunnelse } from 'app/steps/uttaksplan-info/utils/Periodene';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import InfoOmSøknaden from 'app/components/info-eksisterende-sak/InfoOmSøknaden';
import SlettUttaksplanModal from './components/slett-uttaksplan-modal/SlettUttaksplanModal';
import Uttaksplanbuilder from './builder/Uttaksplanbuilder';
import Barn, { BarnFraNesteSak } from 'app/context/types/Barn';
import { farMedmorsTidsperiodeSkalSplittesPåFamiliehendelsesdato } from 'app/utils/wlbUtils';
import { getHarAktivitetskravIPeriodeUtenUttak } from 'app/utils/uttaksplan/uttaksplanUtils';
import AutomatiskJusteringForm from './components/automatisk-justering-form/AutomatiskJusteringForm';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { UttaksplanFormField } from 'app/steps/uttaksplan/UttaksplanFormConfig';
import ResetUttaksplanModal from './components/reset-uttaksplan-modal/ResetUttaksplanModal';
import { splittPeriodePåDato, splittUttaksperiodePåFamiliehendelsesdato } from './builder/leggTilPeriode';

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
    tilleggsopplysninger: Tilleggsopplysninger;
    eksisterendeSak: EksisterendeSak | undefined;
    perioderSomSkalSendesInn: Periode[];
    morsSisteDag: Date | undefined;
    harKomplettUttaksplan: boolean;
    opprinneligPlan: Periode[] | undefined;
    termindato: Date | undefined;
    barn: Barn;
    setUttaksplanErGyldig: (planErGyldig: boolean) => void;
    handleBegrunnelseChange: (årsak: SenEndringÅrsak, begrunnelse: string) => void;
    handleSlettUttaksplan: () => void;
    handleResetUttaksplan: () => void;
    visibility: QuestionVisibility<UttaksplanFormField, undefined>;
    visAutomatiskJusteringForm: boolean;
    perioderMedUttakRundtFødsel: Uttaksperiode[];
    barnFraNesteSak: BarnFraNesteSak | undefined;
    familiehendelsesdatoNesteSak: Date | undefined;
    førsteUttaksdagNesteBarnsSak: Date | undefined;
    minsterettUkerToTette: number | undefined;
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
    tilleggsopplysninger,
    eksisterendeSak,
    perioderSomSkalSendesInn,
    harKomplettUttaksplan,
    termindato,
    opprinneligPlan,
    setUttaksplanErGyldig,
    handleBegrunnelseChange,
    handleSlettUttaksplan,
    handleResetUttaksplan,
    barn,
    visibility,
    visAutomatiskJusteringForm,
    perioderMedUttakRundtFødsel,
    barnFraNesteSak,
    familiehendelsesdatoNesteSak,
    førsteUttaksdagNesteBarnsSak,
    minsterettUkerToTette,
}) => {
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato)!;
    const intl = useIntl();
    const [periodeErGyldig, setPeriodeErGyldig] = useState(true);
    const [slettUttaksplanModalOpen, setSlettUttaksplanModalOpen] = useState(false);
    const [resetUttaksplanModalOpen, setResetUttaksplanModalOpen] = useState(false);
    const harAktivitetskravIPeriodeUtenUttak = getHarAktivitetskravIPeriodeUtenUttak({
        erDeltUttak,
        morHarRett,
        søkerErAleneOmOmsorg: erAleneOmOmsorg,
    });
    const uttaksplanUtenAnnenPartsSamtidigUttak = uttaksplan.filter((p) => !(isInfoPeriode(p) && !p.visPeriodeIPlan));
    const bareFarHarRett = !morHarRett;
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
        opprinneligPlan
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
                termindato
            )
        ) {
            const perioder = splittUttaksperiodePåFamiliehendelsesdato(
                oppdatertPeriode as Uttaksperiode,
                familiehendelsesdato
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
                termindato
            )
        ) {
            const perioder = splittUttaksperiodePåFamiliehendelsesdato(
                nyPeriode as Uttaksperiode,
                familiehendelsesdato
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

    const vedleggForSenEndring = []!; //TODO: handleBegrunnelseVedleggChange

    const årsakTilSenEndring = getSeneEndringerSomKreverBegrunnelse(perioderSomSkalSendesInn);

    const handleBegrunnelseTekstChange = (begrunnelse: string) => {
        handleBegrunnelseChange(årsakTilSenEndring, begrunnelse);
    };

    const uttaksplanValidering = validerUttaksplan({
        søkersituasjon: søkersituasjon,
        arbeidsforhold: arbeidsforhold,
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
        tilleggsopplysninger: tilleggsopplysninger,
        eksisterendeSak: eksisterendeSak,
        perioderSomSkalSendesInn: perioderSomSkalSendesInn,
        barn: barn,
        familiehendelsesdatoNesteSak,
        førsteUttaksdagNesteBarnsSak,
        minsterettUkerToTette,
    });

    useEffect(() => {
        if (!periodeErGyldig || uttaksplanValidering.harFeil) {
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
        handleSlettUttaksplan();
    };

    const handleResetUttaksplanModalClose = () => {
        setResetUttaksplanModalOpen(false);
    };

    const handleResetUttaksplanModalBekreft = () => {
        setResetUttaksplanModalOpen(false);
        handleResetUttaksplan();
    };

    //TODO: trenges grupperAvvik i det hele tatt? Sendes inn som false her..
    const uttaksplanVeilederInfo = getUttaksplanVeilederinfo(uttaksplanValidering.avvik, intl, false);
    const meldingerPerPeriode = getPeriodelisteMeldinger(uttaksplanVeilederInfo);

    const utsettelserIPlan = uttaksplan.filter((p) => isUtsettelsesperiode(p)) as Utsettelsesperiode[];

    return (
        <>
            <Block padBottom="l">
                <InfoOmSøknaden
                    eksisterendeSak={eksisterendeSak}
                    erIUttaksplanenSteg={true}
                    tilgjengeligeStønadskontoer={stønadskontoer}
                    minsterettUkerToTette={minsterettUkerToTette}
                />
            </Block>
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
                    setPeriodeErGyldig={setPeriodeErGyldig}
                    erEndringssøknad={erEndringssøknad}
                    setSlettUttaksplanModalOpen={setSlettUttaksplanModalOpen}
                    setResetUttaksplanModalOpen={setResetUttaksplanModalOpen}
                    termindato={termindato}
                    barn={barn}
                    utsettelserIPlan={utsettelserIPlan}
                    barnFraNesteSak={barnFraNesteSak}
                />
            </Block>
            {visAutomatiskJusteringForm && (
                <Block padBottom="l">
                    <AutomatiskJusteringForm
                        termindato={termindato!}
                        perioderMedUttakRundtFødsel={perioderMedUttakRundtFødsel}
                        antallBarn={barn.antallBarn}
                        visibility={visibility}
                    />
                </Block>
            )}
            <Block padBottom="l">
                <OversiktKvoter
                    tilgjengeligeStønadskontoer={stønadskontoer}
                    uttaksplan={uttaksplan}
                    erDeltUttak={erDeltUttak}
                    foreldreparSituasjon={foreldreSituasjon}
                    familiehendelsesdato={familiehendelsesdatoDate}
                    annenForelderHarRettINorge={annenForelderHarRettINorge}
                    toTetteReglerGjelder={toTetteReglerGjelder}
                    intl={intl}
                />
            </Block>
            <Block visible={uttaksplanVeilederInfo.length > 0} padBottom="l">
                <VeilederInfo
                    messages={uttaksplanVeilederInfo}
                    paneltype="plakat"
                    kompakt={true}
                    veilederStil={'normal'}
                    ariaTittel={intlUtils(intl, 'uttaksplan.regelAvvik.ariaTittel')}
                />
            </Block>
            {årsakTilSenEndring && årsakTilSenEndring !== SenEndringÅrsak.Ingen && (
                <OppgiTilleggsopplysninger
                    begrunnelse={
                        tilleggsopplysninger.begrunnelseForSenEndring
                            ? tilleggsopplysninger.begrunnelseForSenEndring.tekst
                            : ''
                    }
                    vedlegg={vedleggForSenEndring}
                    onBegrunnelseTekstChange={handleBegrunnelseTekstChange}
                    //onVedleggChange={handleBegrunnelseVedleggChange}
                />
            )}
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
