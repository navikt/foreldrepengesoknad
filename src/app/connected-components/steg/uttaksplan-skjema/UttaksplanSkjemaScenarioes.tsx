import * as React from 'react';
import Søknad, { Søkersituasjon } from '../../../types/søknad/Søknad';
import HarAnnenForelderSøktForeldrepengerSpørsmål from './enkeltspørsmål/HarAnnenForelderSøktForeldrepengerSpørsmål';
import DekningsgradSpørsmål from './enkeltspørsmål/DekningsgradSpørsmål';
import MorSinSisteUttaksdagSpørsmål from './enkeltspørsmål/MorSinSisteUttaksdagSpørsmål';
import SkalStarteRettEtterMorSpørsmål from './enkeltspørsmål/SkalStarteRettEtterMorSpørsmål';
import UtsettelseEtterMor from './enkeltspørsmål/UtsettelseEtterMorBolk';
import SkalHaDelAvFellesperiodeSpørsmål from './enkeltspørsmål/SkalHaDelAvFellesperiodeSpørsmål';
import { UttaksplanSkjemaScenario } from './uttaksplanSkjemaScenario';
import StartdatoPermisjonBolk from './enkeltspørsmål/StartdatoPermisjonBolk';
import PlanlagtOppholdIUttakSpørsmål from '../../../spørsmål/PlanlagtOppholdIUttakSpørsmål';
import FordelingFellesperiodeSpørsmål from './enkeltspørsmål/FordelingFellesperiodeSpørsmål';
import { Søkerinfo } from '../../../types/søkerinfo';
import PlanlagtOppholdBolk from './enkeltspørsmål/PlanlagtOppholdBolk';
import StartdatoAdopsjonBolk from './enkeltsp\u00F8rsm\u00E5l/StartdatoAdopsjonBolk';
import { Adopsjonsbarn } from '../../../types/s\u00F8knad/Barn';

export interface ScenarioProps {
    søknad: Søknad;
    søkerinfo: Søkerinfo;
    antallUkerFellesperiode: number;
}
export interface Props extends ScenarioProps {
    scenario: UttaksplanSkjemaScenario;
}

const Scenario1: React.StatelessComponent<ScenarioProps> = ({ søknad }) => (
    <>
        <HarAnnenForelderSøktForeldrepengerSpørsmål />
        <DekningsgradSpørsmål visible={søknad.ekstrainfo.uttaksplanSkjema.harAnnenForelderSøktFP !== undefined} />
        <MorSinSisteUttaksdagSpørsmål visible={søknad.dekningsgrad !== undefined} />
        <SkalStarteRettEtterMorSpørsmål
            visible={søknad.ekstrainfo.uttaksplanSkjema.morSinSisteUttaksdag !== undefined}
        />
        <UtsettelseEtterMor visible={søknad.ekstrainfo.uttaksplanSkjema.skalStarteRettEtterMor === false} />
        <SkalHaDelAvFellesperiodeSpørsmål
            visible={
                søknad.ekstrainfo.uttaksplanSkjema.skalStarteRettEtterMor === true ||
                søknad.ekstrainfo.uttaksplanSkjema.utsettelseEtterMorSkjemaValid === true
            }
        />
    </>
);

const Scenario3: React.StatelessComponent<ScenarioProps> = ({ søknad, søkerinfo, antallUkerFellesperiode }) => {
    const harSvartPåStartdato =
        søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon !== undefined ||
        søknad.ekstrainfo.uttaksplanSkjema.skalIkkeHaUttakFørTermin === true;
    return (
        <>
            <DekningsgradSpørsmål />
            <StartdatoPermisjonBolk visible={søknad.dekningsgrad !== undefined} />
            {harSvartPåStartdato && (
                <>
                    <PlanlagtOppholdIUttakSpørsmål />
                    <PlanlagtOppholdBolk
                        visible={søknad.ekstrainfo.uttaksplanSkjema.harPlanlagtOppholdIUttak === true}
                    />
                    <FordelingFellesperiodeSpørsmål
                        visible={
                            søknad.ekstrainfo.uttaksplanSkjema.harPlanlagtOppholdIUttak === true
                                ? søknad.ekstrainfo.uttaksplanSkjema.planlagtOppholdSkjemaValid === true
                                : søknad.ekstrainfo.uttaksplanSkjema.harPlanlagtOppholdIUttak !== undefined
                        }
                        ukerFellesperiode={antallUkerFellesperiode}
                        navnForelder1={søkerinfo.person.fornavn}
                        navnForelder2={søknad.annenForelder.navn}
                    />
                </>
            )}
        </>
    );
};

const Scenario4: React.StatelessComponent<ScenarioProps> = ({ søknad, søkerinfo, antallUkerFellesperiode }) => {
    const skjema = søknad.ekstrainfo.uttaksplanSkjema;
    return (
        <>
            <HarAnnenForelderSøktForeldrepengerSpørsmål />
            <DekningsgradSpørsmål visible={skjema.harAnnenForelderSøktFP !== undefined} />
            {søknad.situasjon === Søkersituasjon.ADOPSJON && (
                <StartdatoAdopsjonBolk
                    visible={søknad.dekningsgrad !== undefined}
                    barn={søknad.barn as Adopsjonsbarn}
                />
            )}
            {skjema.startdatoPermisjon && (
                <>
                    <PlanlagtOppholdIUttakSpørsmål visible={skjema.startdatoPermisjon !== undefined} />
                    <PlanlagtOppholdBolk visible={skjema.harPlanlagtOppholdIUttak === true} />
                    <FordelingFellesperiodeSpørsmål
                        visible={
                            søknad.ekstrainfo.uttaksplanSkjema.harPlanlagtOppholdIUttak === true
                                ? søknad.ekstrainfo.uttaksplanSkjema.planlagtOppholdSkjemaValid === true
                                : søknad.ekstrainfo.uttaksplanSkjema.harPlanlagtOppholdIUttak !== undefined
                        }
                        ukerFellesperiode={antallUkerFellesperiode}
                        navnForelder1={søkerinfo.person.fornavn}
                        navnForelder2={søknad.annenForelder.navn}
                    />
                </>
            )}
        </>
    );
};

const UttaksplanSkjemaScenarioes: React.StatelessComponent<Props> = (props) => {
    const { scenario, ...scenarioProps } = props;
    switch (scenario) {
        case UttaksplanSkjemaScenario.s1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan:
            return <Scenario1 {...scenarioProps} />;
        case UttaksplanSkjemaScenario.s3_morFødselFørsteganggsøknad:
            return <Scenario3 {...scenarioProps} />;
        case UttaksplanSkjemaScenario.s4_morFarAdopsjonFørstegangssøknad:
            return <Scenario4 {...scenarioProps} />;
        default:
            return <>Undefined scenario</>;
    }
};

export default UttaksplanSkjemaScenarioes;
