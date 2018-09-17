import * as React from 'react';
import Søknad, { Søkersituasjon } from '../../../types/søknad/Søknad';
import HarAnnenForelderSøktForeldrepengerSpørsmål from './enkeltspørsmål/HarAnnenForelderSøktForeldrepengerSpørsmål';
import DekningsgradSpørsmål from './enkeltspørsmål/DekningsgradSpørsmål';
import MorSinSisteUttaksdagSpørsmål from './enkeltspørsmål/MorSinSisteUttaksdagSpørsmål';
import SkalStarteRettEtterMorSpørsmål from './enkeltspørsmål/SkalStarteRettEtterMorSpørsmål';
import UtsettelseEtterMor from './enkeltspørsmål/UtsettelseEtterMorBolk';
import SkalHaDelAvFellesperiodeSpørsmål from './enkeltspørsmål/SkalHaDelAvFellesperiodeSpørsmål';
import { UttaksplanSkjemaScenario } from './uttaksplanSkjemaScenario';
import StartdatoPermisjonMorBolk from './enkeltspørsmål/StartdatoPermisjonMorBolk';
import PlanlagtOppholdIUttakSpørsmål from '../../../spørsmål/PlanlagtOppholdIUttakSpørsmål';
import FordelingFellesperiodeSpørsmål from './enkeltspørsmål/FordelingFellesperiodeSpørsmål';
import { Søkerinfo } from '../../../types/søkerinfo';
import PlanlagtOppholdBolk from './enkeltspørsmål/PlanlagtOppholdBolk';
import StartdatoAdopsjonBolk from './enkeltspørsmål/StartdatoAdopsjonBolk';
import { Adopsjonsbarn, ForeldreansvarBarn } from '../../../types/søknad/Barn';
import StartdatoUttakFarMedmorSpørsmål from './enkeltspørsmål/StartdatoUttakFarMedmorSpørsmål';
import StartdatoUttakFarMedmorAleneomsorgSpørsmål from './enkeltspørsmål/StartdatoUttakFarMedmorAleneomsorgSpørsmål';

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
            <StartdatoPermisjonMorBolk visible={søknad.dekningsgrad !== undefined} />
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
                        navnMor={søkerinfo.person.fornavn}
                        navnFarMedmor={søknad.annenForelder.navn}
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
                        navnMor={søkerinfo.person.fornavn}
                        navnFarMedmor={søknad.annenForelder.navn}
                    />
                </>
            )}
        </>
    );
};

const Scenario5: React.StatelessComponent<ScenarioProps> = ({ søknad, søkerinfo, antallUkerFellesperiode }) => {
    const skjema = søknad.ekstrainfo.uttaksplanSkjema;
    return (
        <>
            <DekningsgradSpørsmål />
            <StartdatoUttakFarMedmorAleneomsorgSpørsmål
                barn={søknad.barn as ForeldreansvarBarn}
                visible={søknad.dekningsgrad !== undefined}
            />
            {skjema.startdatoPermisjon && (
                <>
                    <PlanlagtOppholdIUttakSpørsmål visible={skjema.startdatoPermisjon !== undefined} />
                    <PlanlagtOppholdBolk visible={skjema.harPlanlagtOppholdIUttak === true} />
                </>
            )}
        </>
    );
};

const Scenario6: React.StatelessComponent<ScenarioProps> = ({ søknad, søkerinfo, antallUkerFellesperiode }) => {
    const skjema = søknad.ekstrainfo.uttaksplanSkjema;
    return (
        <>
            <DekningsgradSpørsmål />
            <StartdatoUttakFarMedmorSpørsmål visible={søknad.dekningsgrad !== undefined} />
            {skjema.startdatoPermisjon && (
                <>
                    <PlanlagtOppholdIUttakSpørsmål visible={skjema.startdatoPermisjon !== undefined} />
                    <PlanlagtOppholdBolk visible={skjema.harPlanlagtOppholdIUttak === true} />
                </>
            )}
        </>
    );
};

const Scenario7: React.StatelessComponent<ScenarioProps> = ({ søknad }) => (
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

const UttaksplanSkjemaScenarioes: React.StatelessComponent<Props> = (props) => {
    const { scenario, ...scenarioProps } = props;
    switch (scenario) {
        case UttaksplanSkjemaScenario.s1_farMedmorFødselFørsteganggsøknadBeggeHarRett_ikkeDeltPlan:
            return <Scenario1 {...scenarioProps} />;
        case UttaksplanSkjemaScenario.s3_morFødsel:
            return <Scenario3 {...scenarioProps} />;
        case UttaksplanSkjemaScenario.s4_morFarAdopsjon:
            return <Scenario4 {...scenarioProps} />;
        case UttaksplanSkjemaScenario.s5_farMedmorAleneomsorgFødselAdopsjon:
            return <Scenario5 {...scenarioProps} />;
        case UttaksplanSkjemaScenario.s6_bareFarMedmorRettTilFpFødsel:
            return <Scenario6 {...scenarioProps} />;
        case UttaksplanSkjemaScenario.s7_farMorAdopsjon_morFarAlleredeSøkt_ikkeDeltPlan:
            return <Scenario7 {...scenarioProps} />;
        default:
            return <>Undefined scenario</>;
    }
};

export default UttaksplanSkjemaScenarioes;
