import * as React from 'react';
import moment from 'moment';
import Søknad from '../../../types/søknad/Søknad';
import HarAnnenForelderSøktForeldrepengerSpørsmål from './enkeltspørsmål/HarAnnenForelderSøktForeldrepengerSpørsmål';
import DekningsgradSpørsmål from './enkeltspørsmål/DekningsgradSpørsmål';
import MorSinSisteUttaksdagSpørsmål from './enkeltspørsmål/MorSinSisteUttaksdagSpørsmål';
import SkalHaDelAvFellesperiodeSpørsmål from './enkeltspørsmål/SkalHaDelAvFellesperiodeSpørsmål';
import { UttaksplanSkjemaScenario } from './uttaksplanSkjemaScenario';
import StartdatoPermisjonMorBolk from './enkeltspørsmål/StartdatoPermisjonMorBolk';
import FordelingFellesperiodeSpørsmål from './enkeltspørsmål/FordelingFellesperiodeSpørsmål';
import StartdatoAdopsjonBolk from './enkeltspørsmål/StartdatoAdopsjonBolk';
import { Adopsjonsbarn } from '../../../types/søknad/Barn';
import StartdatoUttakFarMedmorSpørsmål from './enkeltspørsmål/StartdatoUttakFarMedmorSpørsmål';
import StartdatoUttakFarMedmorAleneomsorgSpørsmål from './enkeltspørsmål/StartdatoUttakFarMedmorAleneomsorgSpørsmål';
import { NavnPåForeldre } from 'common/types';
import { getFamiliehendelsedato } from '../../../util/uttaksplan';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { FormattedMessage } from 'react-intl';
import { findOldestDate } from '../../../util/dates/dates';
import Block from 'common/components/block/Block';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';

export interface ScenarioProps {
    søknad: Søknad;
    navnPåForeldre: NavnPåForeldre;
    antallUkerFellesperiode: number;
}
export interface Props extends ScenarioProps {
    scenario: UttaksplanSkjemaScenario;
}

const Scenario1: React.StatelessComponent<ScenarioProps> = ({ søknad }) => (
    <>
        <Veilederinfo>
            <FormattedMessage
                id="uttaksplan.skjema.informasjonTilAnnenForelder"
                values={{ navn: søknad.annenForelder.fornavn }}
            />
        </Veilederinfo>
        <DekningsgradSpørsmål />
    </>
);

const Scenario3: React.StatelessComponent<ScenarioProps> = ({ søknad, antallUkerFellesperiode, navnPåForeldre }) => {
    const harSvartPåStartdato =
        søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon !== undefined ||
        søknad.ekstrainfo.uttaksplanSkjema.skalIkkeHaUttakFørTermin === true;
    return (
        <>
            <DekningsgradSpørsmål />
            <StartdatoPermisjonMorBolk
                visible={søknad.dekningsgrad !== undefined}
                familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
                barnetErFødt={søknad.barn.erBarnetFødt}
            />
            {søknad.søker.erAleneOmOmsorg === false &&
                søknad.annenForelder.harRettPåForeldrepenger &&
                søknad.dekningsgrad !== undefined && (
                    <FordelingFellesperiodeSpørsmål
                        visible={harSvartPåStartdato}
                        ukerFellesperiode={antallUkerFellesperiode}
                        navnPåForeldre={navnPåForeldre}
                    />
                )}
        </>
    );
};

const Scenario4: React.StatelessComponent<ScenarioProps> = ({ søknad, antallUkerFellesperiode, navnPåForeldre }) => {
    /** Mor og far, adopsjon, begge har rett, adopterer alene, bare en har rett */
    const skjema = søknad.ekstrainfo.uttaksplanSkjema;
    const latestDate =
        (søknad.barn as Adopsjonsbarn).ankomstdato !== undefined
            ? findOldestDate([
                  (søknad.barn as Adopsjonsbarn).adopsjonsdato!,
                  (søknad.barn as Adopsjonsbarn).ankomstdato!
              ])
            : (søknad.barn as Adopsjonsbarn).adopsjonsdato;
    const startdatoPermisjon = søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon;
    const stebarnsadopsjon = (søknad.barn as Adopsjonsbarn).adopsjonAvEktefellesBarn;
    const adoptertIUtlandet = (søknad.barn as Adopsjonsbarn).adoptertIUtlandet;

    return (
        <>
            <HarAnnenForelderSøktForeldrepengerSpørsmål
                visible={søknad.annenForelder.harRettPåForeldrepenger}
                navnAnnenForelder={søknad.annenForelder.fornavn}
            />
            {skjema.harAnnenForelderSøktFP === true && (
                <Veilederinfo>
                    <FormattedMessage
                        id="uttaksplan.skjema.informasjonTilAnnenForelder"
                        values={{ navn: søknad.annenForelder.fornavn }}
                    />
                </Veilederinfo>
            )}
            <DekningsgradSpørsmål
                visible={skjema.harAnnenForelderSøktFP !== undefined || !søknad.annenForelder.harRettPåForeldrepenger}
            />
            <StartdatoAdopsjonBolk
                familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
                visible={søknad.dekningsgrad !== undefined && skjema.harAnnenForelderSøktFP !== true}
                barn={søknad.barn as Adopsjonsbarn}
            />
            <Block
                visible={
                    startdatoPermisjon !== undefined &&
                    moment(latestDate).isBefore(moment(startdatoPermisjon)) &&
                    stebarnsadopsjon !== true
                }>
                <Veilederinfo>
                    <FormattedMessage
                        id={
                            adoptertIUtlandet !== undefined && adoptertIUtlandet === true
                                ? 'uttaksplanSkjema.info.adoptertIUtlandet'
                                : 'uttaksplanSkjema.info.ikkeAdoptertIUtlandet'
                        }
                    />
                </Veilederinfo>
            </Block>
            {søknad.søker.erAleneOmOmsorg === false &&
                søknad.annenForelder.harRettPåForeldrepenger && (
                    <FordelingFellesperiodeSpørsmål
                        visible={skjema.startdatoPermisjon !== undefined && skjema.harAnnenForelderSøktFP !== true}
                        ukerFellesperiode={antallUkerFellesperiode}
                        navnPåForeldre={navnPåForeldre}
                    />
                )}
        </>
    );
};

const Scenario5: React.StatelessComponent<ScenarioProps> = ({ søknad }) => {
    const omsorgsDato = søknad.barn.datoForAleneomsorg || getFamiliehendelsedato(søknad.barn, søknad.situasjon);

    return (
        <>
            <DekningsgradSpørsmål />
            <StartdatoUttakFarMedmorAleneomsorgSpørsmål
                familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
                datoForAleneomsorg={omsorgsDato}
                visible={søknad.dekningsgrad !== undefined}
            />
        </>
    );
};

const Scenario6: React.StatelessComponent<ScenarioProps> = ({ søknad }) => {
    const familiehendelsesdato = getFamiliehendelsedato(søknad.barn, søknad.situasjon);
    const startdatoPermisjon = søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon;
    const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    const reservertMorFørDenneDatoen = Uttaksdagen(førsteUttaksdag).leggTil(30);
    const dagensDatoFørReservertMorDato = moment(startdatoPermisjon).isBefore(reservertMorFørDenneDatoen);

    return (
        <>
            <DekningsgradSpørsmål />
            <StartdatoUttakFarMedmorSpørsmål
                visible={søknad.dekningsgrad !== undefined}
                familiehendelsesdato={førsteUttaksdag}
            />
            <Block visible={dagensDatoFørReservertMorDato}>
                <Veilederinfo>
                    <FormattedMessage id="uttaksplanSkjema.info.reservertMor" />
                </Veilederinfo>
            </Block>
        </>
    );
};

const Scenario7: React.StatelessComponent<ScenarioProps> = ({ søknad, navnPåForeldre }) => (
    <>
        <HarAnnenForelderSøktForeldrepengerSpørsmål navnAnnenForelder={søknad.annenForelder.fornavn} visible={true} />
        <DekningsgradSpørsmål visible={søknad.ekstrainfo.uttaksplanSkjema.harAnnenForelderSøktFP !== undefined} />
        <MorSinSisteUttaksdagSpørsmål
            visible={
                søknad.dekningsgrad !== undefined &&
                søknad.ekstrainfo.uttaksplanSkjema.harAnnenForelderSøktFP !== undefined
            }
            navnMor={navnPåForeldre.mor}
            familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
        />
        <SkalHaDelAvFellesperiodeSpørsmål
            visible={søknad.ekstrainfo.uttaksplanSkjema.morSinSisteUttaksdag !== undefined}
        />
    </>
);

const Scenario8: React.StatelessComponent<ScenarioProps> = ({ søknad }) => <DekningsgradSpørsmål />;

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
        case UttaksplanSkjemaScenario.s8_endringssøknad:
            return <Scenario8 {...scenarioProps} />;
        default:
            return <>Undefined scenario</>;
    }
};

export default UttaksplanSkjemaScenarioes;
