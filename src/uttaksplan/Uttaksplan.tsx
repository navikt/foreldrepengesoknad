import React, { FunctionComponent } from 'react';
import { Block } from '@navikt/fp-common';
import Planlegger from './components/planlegger/Planlegger';
import PlanleggerInfo from './components/planlegger-info/PlanleggerInfo';
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
import addPeriode from './builder/addPeriode';
import { Situasjon } from 'app/types/Situasjon';
import OversiktKvoter from './components/oversikt-kvoter/OversiktKvoter';
import { ISOStringToDate } from 'app/utils/dateUtils';

interface Props {
    foreldreSituasjon: ForeldreparSituasjon;
    forelderVedAleneomsorg: Forelder | undefined;
    erDeltUttak: boolean;
    uttaksplan: Periode[];
    familiehendelsesdato: string;
    handleOnPlanChange: (plan: Periode[]) => void;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    arbeidsforhold: Arbeidsforhold[];
    erEndringssøknad: boolean;
    erFarEllerMedmor: boolean;
    erFlerbarnssøknad: boolean;
    erAleneOmOmsorg: boolean;
    situasjon: Situasjon;
}

const Uttaksplan: FunctionComponent<Props> = ({
    foreldreSituasjon,
    forelderVedAleneomsorg,
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
    situasjon,
}) => {
    const familiehendelsesdatoDate = ISOStringToDate(familiehendelsesdato)!;

    const handleDeletePeriode = (periodeId: string) => {
        const slettetPeriode = uttaksplan.find((p) => p.id === periodeId);

        const updatedPlan = deletePeriode({
            getUttaksstatusFunc: getUttaksstatusFunc({
                erDeltUttak,
                erEndringssøknad,
                harKomplettUttaksplan: false,
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
            relevantStartDatoForUttak: familiehendelsesdatoDate,
            harMidlertidigOmsorg: false,
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
        });

        handleOnPlanChange(updatedPlan);
    };

    const handleUpdatePeriode = (oppdatertPeriode: Periode) => {
        const updatedPlan = updatePeriode({
            getUttaksstatusFunc: getUttaksstatusFunc({
                erDeltUttak,
                erEndringssøknad,
                harKomplettUttaksplan: false,
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
            relevantStartDatoForUttak: familiehendelsesdatoDate,
            harMidlertidigOmsorg: false,
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
        });

        handleOnPlanChange(updatedPlan);
    };

    const handleAddPeriode = (nyPeriode: Periode) => {
        const addPeriodeResult = addPeriode({
            getUttaksstatusFunc: getUttaksstatusFunc({
                erDeltUttak,
                erEndringssøknad,
                harKomplettUttaksplan: false,
                erFarEllerMedmor,
                tilgjengeligeStønadskontoer: stønadskontoer,
                uttaksplan,
            }),
            uttaksplan,
            nyPeriode,
            tilgjengeligeStønadskontoer: stønadskontoer,
            familiehendelsesdato: familiehendelsesdatoDate!,
            erFlerbarnssøknad,
            erEndringsøknadUtenEkisterendeSak: false,
            relevantStartDatoForUttak: familiehendelsesdatoDate,
            harMidlertidigOmsorg: false,
            harAktivitetskravIPeriodeUtenUttak: false,
            erAdopsjon: false,
        });

        handleOnPlanChange(addPeriodeResult.updatedPlan);
    };

    return (
        <>
            <Block padBottom="l">
                <PlanleggerInfo
                    foreldreSituasjon={foreldreSituasjon}
                    forelderVedAleneomsorg={forelderVedAleneomsorg}
                    erDeltUttak={erDeltUttak}
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
        </>
    );
};

export default Uttaksplan;
