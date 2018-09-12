import * as React from 'react';
import Søknad from '../../../types/søknad/Søknad';
import HarAnnenForelderSøktForeldrepengerSpørsmål from './enkeltspørsmål/HarAnnenForelderSøktForeldrepengerSpørsmål';
import DekningsgradSpørsmål from './enkeltspørsmål/DekningsgradSpørsmål';
import MorSinSisteUttaksdagSpørsmål from './enkeltspørsmål/MorSinSisteUttaksdagSpørsmål';
import SkalStarteRettEtterMorSpørsmål from './enkeltspørsmål/SkalStarteRettEtterMorSpørsmål';
import UtsettelseEtterMor from './enkeltspørsmål/UtsettelseEtterMorBolk';
import SkalHaDelAvFellesperiodeSpørsmål from './enkeltspørsmål/SkalHaDelAvFellesperiodeSpørsmål';
import { UttaksplanSkjemaScenario } from './uttaksplanSkjemaScenario';
import StartdatoPermisjonBolk from './enkeltspørsmål/StartdatoPermisjonBolk';
import PlanlagtOppholdIUttakSpørsmål from '../../../spørsmål/PlanlagtOppholdIUttakSpørsmål';
import FordelingFellesperiodeSpørsmål from '../../../spørsmål/FordelingFellesperiodeSpørsmål';
import { Søkerinfo } from '../../../types/søkerinfo';
import PlanlagtOppholdBolk from './enkeltspørsmål/PlanlagtOppholdBolk';

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

const UttaksplanSkjemaScenarioes: React.StatelessComponent<Props> = (props) => {
    const { scenario, ...scenarioProps } = props;
    switch (scenario) {
        case UttaksplanSkjemaScenario.s1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan:
            return <Scenario1 {...scenarioProps} />;
        case UttaksplanSkjemaScenario.s3_morFødsel:
            return <Scenario3 {...scenarioProps} />;
        default:
            return <>Undefined scenario</>;
    }
};

export default UttaksplanSkjemaScenarioes;
