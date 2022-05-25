import React, { FunctionComponent, useEffect, useState } from 'react';
import { Block, intlUtils } from '@navikt/fp-common';
import Planlegger from './components/planlegger/Planlegger';
import { ForeldreparSituasjon } from 'app/types/ForeldreparSituasjonTypes';
import { Forelder } from 'app/types/Forelder';
import { Periode } from './types/Periode';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import AnnenForelder from 'app/context/types/AnnenForelder';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import deletePeriode from './builder/deletePeriode';
import { getUttaksstatusFunc } from './utils/uttaksstatus';
import updatePeriode from './builder/updatePeriode';
import { Situasjon } from 'app/types/Situasjon';
import OversiktKvoter from './components/oversikt-kvoter/OversiktKvoter';
import { ISOStringToDate } from 'app/utils/dateUtils';
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
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import InfoOmSøknaden from 'app/components/info-eksisterende-sak/InfoOmSøknaden';
import SlettUttaksplanModal from './components/slett-uttaksplan-modal/SlettUttaksplanModal';
import UttaksplanbuilderNew from './builder/UttaksplanbuilderNew';

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
    harMorRett: boolean;
    søkersituasjon: Søkersituasjon;
    dekningsgrad: Dekningsgrad;
    antallBarn: number;
    tilleggsopplysninger: Tilleggsopplysninger;
    eksisterendeSak: EksisterendeSak | undefined;
    perioderSomSkalSendesInn: Periode[];
    morsSisteDag: Date | undefined;
    harKomplettUttaksplan: boolean;
    opprinneligPlan: Periode[] | undefined;
    setUttaksplanErGyldig: (planErGyldig: boolean) => void;
    handleBegrunnelseChange: (årsak: SenEndringÅrsak, begrunnelse: string) => void;
    handleSlettUttaksplan: () => void;
}

const getRelevantStartdato = (
    familiehendelsesdato: Date,
    erFarEllerMedmor: boolean,
    erAdopsjon: boolean,
    morsSisteDag: Date | undefined
) => {
    const førsteUttaksdagEtterSeksUker = Uttaksdagen(Uttaksdagen(familiehendelsesdato).denneEllerNeste()).leggTil(30);

    if (erFarEllerMedmor) {
        if (morsSisteDag) {
            return Uttaksdagen(morsSisteDag).neste();
        }

        if (erAdopsjon) {
            return familiehendelsesdato;
        }

        return førsteUttaksdagEtterSeksUker;
    }

    return familiehendelsesdato;
};

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
    harMorRett,
    søkersituasjon,
    dekningsgrad,
    antallBarn,
    tilleggsopplysninger,
    eksisterendeSak,
    perioderSomSkalSendesInn,
    morsSisteDag,
    harKomplettUttaksplan,
    opprinneligPlan,
    setUttaksplanErGyldig,
    handleBegrunnelseChange,
    handleSlettUttaksplan,
}) => {
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato)!;
    const intl = useIntl();
    const relevantStartdato = getRelevantStartdato(
        familiehendelsesdatoDate,
        erFarEllerMedmor,
        situasjon === 'adopsjon',
        morsSisteDag
    );
    const [periodeErGyldig, setPeriodeErGyldig] = useState(true);
    const [slettUttaksplanModalOpen, setSlettUttaksplanModalOpen] = useState(false);

    const handleDeletePeriode = (periodeId: string) => {
        const slettetPeriode = uttaksplan.find((p) => p.id === periodeId);

        const updatedPlan = deletePeriode({
            getUttaksstatusFunc: getUttaksstatusFunc({
                erDeltUttak,
                erEndringssøknad,
                harKomplettUttaksplan,
                erFarEllerMedmor,
                tilgjengeligeStønadskontoer: stønadskontoer,
                uttaksplan,
            }),
            uttaksplan,
            slettetPeriode: slettetPeriode!,
            tilgjengeligeStønadskontoer: stønadskontoer,
            familiehendelsesdato: familiehendelsesdatoDate!,
            erFlerbarnssøknad,
            erEndringsøknadUtenEkisterendeSak: false,
            relevantStartDatoForUttak: relevantStartdato,
            harMidlertidigOmsorg: false,
            harAktivitetskravIPeriodeUtenUttak: !erDeltUttak && !harMorRett,
            erAdopsjon: situasjon === 'adopsjon',
            opprinneligPlan,
        });

        handleOnPlanChange(updatedPlan);
    };

    const handleUpdatePeriode = (oppdatertPeriode: Periode) => {
        const updatedPlan = updatePeriode({
            getUttaksstatusFunc: getUttaksstatusFunc({
                erDeltUttak,
                erEndringssøknad,
                harKomplettUttaksplan,
                erFarEllerMedmor,
                tilgjengeligeStønadskontoer: stønadskontoer,
                uttaksplan,
            }),
            uttaksplan,
            oppdatertPeriode,
            tilgjengeligeStønadskontoer: stønadskontoer,
            familiehendelsesdato: familiehendelsesdatoDate!,
            erFlerbarnssøknad,
            erEndringsøknadUtenEkisterendeSak: false,
            relevantStartDatoForUttak: relevantStartdato,
            harMidlertidigOmsorg: false,
            harAktivitetskravIPeriodeUtenUttak: !erDeltUttak && !harMorRett,
            erAdopsjon: situasjon === 'adopsjon',
            opprinneligPlan,
        });
        handleOnPlanChange(updatedPlan);
    };

    const handleAddPeriode = (nyPeriode: Periode) => {
        const builder = UttaksplanbuilderNew(uttaksplan, familiehendelsesdatoDate);
        const resultat = builder.leggTilPeriode(nyPeriode);

        handleOnPlanChange(resultat);
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
        morHarRett: harMorRett,
        erFlerbarnssøknad: erFlerbarnssøknad,
        familiehendelsesdato: familiehendelsesdatoDate,
        stønadskontoer: stønadskontoer,
        perioder: uttaksplan,
        harKomplettUttaksplan,
        tilleggsopplysninger: tilleggsopplysninger,
        eksisterendeSak: eksisterendeSak,
        perioderSomSkalSendesInn: perioderSomSkalSendesInn,
    });

    useEffect(() => {
        if (!periodeErGyldig) {
            setUttaksplanErGyldig(false);
        } else if (uttaksplanValidering.harFeil) {
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

    //TODO: trenges grupperAvvik i det hele tatt? Sendes inn som false her.
    const uttaksplanVeilederInfo = getUttaksplanVeilederinfo(uttaksplanValidering.avvik, intl, false);
    const meldingerPerPeriode = getPeriodelisteMeldinger(uttaksplanVeilederInfo);

    return (
        <>
            <Block padBottom="l">
                <InfoOmSøknaden
                    eksisterendeSak={eksisterendeSak}
                    erIUttaksplanenSteg={true}
                    tilgjengeligeStønadskontoer={stønadskontoer}
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
                />
            </Block>
            <Block padBottom="l">
                <OversiktKvoter
                    tilgjengeligeStønadskontoer={stønadskontoer}
                    uttaksplan={uttaksplan}
                    erDeltUttak={erDeltUttak}
                    foreldreparSituasjon={foreldreSituasjon}
                    familiehendelsesdato={familiehendelsesdatoDate}
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
                onClose={handleSlettUttaksplanModalClose}
                handleSlettUttaksplanModalBekreft={handleSlettUttaksplanModalBekreft}
            />
        </>
    );
};

export default Uttaksplan;
