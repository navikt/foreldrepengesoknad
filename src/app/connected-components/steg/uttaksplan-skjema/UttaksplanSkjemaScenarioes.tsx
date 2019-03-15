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
import { findOldestDate, dateIsSameOrAfter } from '../../../util/dates/dates';
import Block from 'common/components/block/Block';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';
import FarSinFørsteUttaksdagSpørsmål from './enkeltspørsmål/FarSinFørsteUttaksdagSpørsmål';
import AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål from './enkeltspørsmål/AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'common/components/veileder/Veileder';
import VeilederpanelInnhold from 'app/components/veilederpanel-innhold/VeilederpanelInnhold';
import { getFlerbarnsuker } from 'app/util/validation/uttaksplan/uttaksplanHarForMangeFlerbarnsuker';

export interface ScenarioProps {
    søknad: Søknad;
    navnPåForeldre: NavnPåForeldre;
    antallUkerFellesperiode: number;
    antallUkerMødreKvote: number | undefined;
    antallUkerFedreKvote: number | undefined;
}
export interface Props extends ScenarioProps {
    scenario: UttaksplanSkjemaScenario;
}

const Scenario1: React.StatelessComponent<ScenarioProps> = ({ søknad, antallUkerFellesperiode }) => {
    const harSvartPåDekningsgradSpørsmål = søknad.dekningsgrad !== undefined;
    const { farSinFørsteUttaksdag, morSinSisteUttaksdag } = søknad.ekstrainfo.uttaksplanSkjema;
    return (
        <>
            <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                <VeilederpanelInnhold
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'uttaksplan.skjema.informasjonTilAnnenForelder',
                            values: { navn: søknad.annenForelder.fornavn }
                        }
                    ]}
                />
            </Veilederpanel>
            <DekningsgradSpørsmål />
            <MorSinSisteUttaksdagSpørsmål
                visible={harSvartPåDekningsgradSpørsmål}
                navnMor={søknad.annenForelder.fornavn}
                familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
            />
            <FarSinFørsteUttaksdagSpørsmål
                visible={morSinSisteUttaksdag !== undefined}
                familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
            />
            <AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål
                visible={
                    farSinFørsteUttaksdag !== undefined &&
                    !dateIsSameOrAfter(morSinSisteUttaksdag, farSinFørsteUttaksdag)
                }
                antallUkerFellesperiode={antallUkerFellesperiode}
            />
        </>
    );
};

const Scenario3: React.StatelessComponent<ScenarioProps> = ({
    søknad,
    antallUkerFellesperiode,
    navnPåForeldre,
    antallUkerFedreKvote,
    antallUkerMødreKvote
}) => {
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
                    <>
                        <Block visible={søknad.barn.antallBarn > 1 && harSvartPåStartdato}>
                            <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                                <VeilederpanelInnhold
                                    messages={[
                                        {
                                            type: 'normal',
                                            contentIntlKey: 'uttaksplan.skjema.flerbarnsInformasjon',
                                            values: {
                                                uker: getFlerbarnsuker(søknad.dekningsgrad!, søknad.barn.antallBarn),
                                                navnFar: navnPåForeldre.farMedmor,
                                                navnMor: navnPåForeldre.mor
                                            }
                                        }
                                    ]}
                                />
                            </Veilederpanel>
                        </Block>
                        <FordelingFellesperiodeSpørsmål
                            visible={harSvartPåStartdato}
                            ukerFellesperiode={antallUkerFellesperiode}
                            navnPåForeldre={navnPåForeldre}
                            annenForelderErFarEllerMedmor={navnPåForeldre.farMedmor === søknad.annenForelder.fornavn}
                            antallUkerFedreKvote={antallUkerFedreKvote!}
                            antallUkerMødreKvote={antallUkerMødreKvote!}
                        />
                    </>
                )}
        </>
    );
};

const Scenario4: React.StatelessComponent<ScenarioProps> = ({
    søknad,
    antallUkerFellesperiode,
    navnPåForeldre,
    antallUkerFedreKvote,
    antallUkerMødreKvote
}) => {
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
    const { farSinFørsteUttaksdag, morSinSisteUttaksdag } = skjema;

    return (
        <>
            <HarAnnenForelderSøktForeldrepengerSpørsmål
                visible={søknad.annenForelder.harRettPåForeldrepenger}
                navnAnnenForelder={søknad.annenForelder.fornavn}
            />
            {skjema.harAnnenForelderSøktFP === true && (
                <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                    <VeilederpanelInnhold
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'uttaksplan.skjema.informasjonTilAnnenForelder',
                                values: { navn: søknad.annenForelder.fornavn }
                            }
                        ]}
                    />
                </Veilederpanel>
            )}
            <DekningsgradSpørsmål
                visible={skjema.harAnnenForelderSøktFP !== undefined || !søknad.annenForelder.harRettPåForeldrepenger}
            />
            <StartdatoAdopsjonBolk
                familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
                visible={søknad.dekningsgrad !== undefined && skjema.harAnnenForelderSøktFP !== true}
                barn={søknad.barn as Adopsjonsbarn}
            />
            <MorSinSisteUttaksdagSpørsmål
                visible={søknad.dekningsgrad !== undefined && skjema.harAnnenForelderSøktFP === true}
                navnMor={søknad.annenForelder.fornavn}
                familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
            />
            <FarSinFørsteUttaksdagSpørsmål
                visible={morSinSisteUttaksdag !== undefined && skjema.harAnnenForelderSøktFP === true}
                familiehendelsesdato={getFamiliehendelsedato(søknad.barn, søknad.situasjon)}
            />
            <AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål
                visible={
                    farSinFørsteUttaksdag !== undefined &&
                    !dateIsSameOrAfter(morSinSisteUttaksdag, farSinFørsteUttaksdag) &&
                    skjema.harAnnenForelderSøktFP === true
                }
                antallUkerFellesperiode={antallUkerFellesperiode}
            />
            <Block
                visible={
                    startdatoPermisjon !== undefined &&
                    moment(latestDate).isBefore(moment(startdatoPermisjon)) &&
                    stebarnsadopsjon !== true
                }>
                <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                    <VeilederpanelInnhold
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey:
                                    adoptertIUtlandet !== undefined && adoptertIUtlandet === true
                                        ? 'uttaksplanSkjema.info.adoptertIUtlandet'
                                        : 'uttaksplanSkjema.info.ikkeAdoptertIUtlandet'
                            }
                        ]}
                    />
                </Veilederpanel>
            </Block>
            {søknad.søker.erAleneOmOmsorg === false &&
                søknad.annenForelder.harRettPåForeldrepenger && (
                    <>
                        <Block
                            visible={
                                søknad.barn.antallBarn > 1 &&
                                skjema.startdatoPermisjon !== undefined &&
                                skjema.harAnnenForelderSøktFP !== true
                            }>
                            <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                                <VeilederpanelInnhold
                                    messages={[
                                        {
                                            type: 'normal',
                                            contentIntlKey: 'uttaksplan.skjema.flerbarnsInformasjon',
                                            values: {
                                                uker: getFlerbarnsuker(søknad.dekningsgrad!, søknad.barn.antallBarn),
                                                navnFar: navnPåForeldre.farMedmor,
                                                navnMor: navnPåForeldre.mor
                                            }
                                        }
                                    ]}
                                />
                            </Veilederpanel>
                        </Block>
                        <FordelingFellesperiodeSpørsmål
                            visible={skjema.startdatoPermisjon !== undefined && skjema.harAnnenForelderSøktFP !== true}
                            ukerFellesperiode={antallUkerFellesperiode}
                            navnPåForeldre={navnPåForeldre}
                            annenForelderErFarEllerMedmor={navnPåForeldre.farMedmor === søknad.annenForelder.fornavn}
                            antallUkerMødreKvote={antallUkerMødreKvote!}
                            antallUkerFedreKvote={antallUkerFedreKvote!}
                        />
                    </>
                )}
        </>
    );
};

const Scenario5: React.StatelessComponent<ScenarioProps> = ({ søknad }) => {
    const omsorgsDato = søknad.barn.datoForAleneomsorg || getFamiliehendelsedato(søknad.barn, søknad.situasjon);
    return (
        <>
            <DekningsgradSpørsmål />
            <Block visible={søknad.dekningsgrad !== undefined && søknad.situasjon === 'fødsel'}>
                <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                    <VeilederpanelInnhold
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'uttaksplan.skjema.aleneomsorgFarMedmor.navSaraVeileder',
                                values: { navn: søknad.annenForelder.fornavn },
                                formatContentAsHTML: true
                            }
                        ]}
                    />
                </Veilederpanel>
            </Block>
            <Block visible={søknad.dekningsgrad !== undefined && søknad.situasjon === 'adopsjon'}>
                <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                    <VeilederpanelInnhold
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'uttaksplan.skjema.adopsjon.navSaraVeileder',
                                values: { navn: søknad.annenForelder.fornavn },
                                formatContentAsHTML: true
                            }
                        ]}
                    />
                </Veilederpanel>
            </Block>
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
                visible={søknad.dekningsgrad !== undefined && søknad.annenForelder.erUfør === true}
                familiehendelsesdato={førsteUttaksdag}
            />
            <Block visible={dagensDatoFørReservertMorDato}>
                <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                    <VeilederpanelInnhold
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'uttaksplanSkjema.info.reservertMor'
                            }
                        ]}
                    />
                </Veilederpanel>
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
