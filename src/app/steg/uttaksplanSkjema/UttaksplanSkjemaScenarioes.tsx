import * as React from 'react';
import moment from 'moment';
import Søknad, { SøkerRolle } from '../../types/søknad/Søknad';
import HarAnnenForelderSøktForeldrepengerSpørsmål from './enkeltspørsmål/HarAnnenForelderSøktForeldrepengerSpørsmål';
import DekningsgradSpørsmål from './enkeltspørsmål/DekningsgradSpørsmål';
import MorSinSisteUttaksdagSpørsmål from './enkeltspørsmål/MorSinSisteUttaksdagSpørsmål';
import SkalHaDelAvFellesperiodeSpørsmål from './enkeltspørsmål/SkalHaDelAvFellesperiodeSpørsmål';
import { UttaksplanSkjemaScenario } from './uttaksplanSkjemaScenario';
import StartdatoPermisjonMorBolk from './enkeltspørsmål/StartdatoPermisjonMorBolk';
import FordelingFellesperiodeSpørsmål from './enkeltspørsmål/FordelingFellesperiodeSpørsmål';
import StartdatoAdopsjonBolk from './enkeltspørsmål/StartdatoAdopsjonBolk';
import { isAdopsjonsbarn } from '../../types/søknad/Barn';
import StartdatoUttakFarMedmorSpørsmål from './enkeltspørsmål/StartdatoUttakFarMedmorSpørsmål';
import StartdatoUttakFarMedmorAleneomsorgSpørsmål from './enkeltspørsmål/StartdatoUttakFarMedmorAleneomsorgSpørsmål';
import { NavnPåForeldre } from 'common/types';
import { findOldestDate, dateIsSameOrAfter } from '../../util/dates/dates';
import Block from 'common/components/block/Block';
import { Uttaksdagen } from '../../util/uttaksplan/Uttaksdagen';
import FarSinFørsteUttaksdagSpørsmål from './enkeltspørsmål/FarSinFørsteUttaksdagSpørsmål';
import AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål from './enkeltspørsmål/AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål';
import VeilederInfo from '../../components/veilederInfo/VeilederInfo';
import { getFlerbarnsuker } from 'app/util/validation/uttaksplan/uttaksplanHarForMangeFlerbarnsuker';
import { getNavnGenitivEierform } from '../../util/tekstUtils';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import UtsettelseBegrunnelse from './enkeltspørsmål/UtsettelseBegrunnelse';
import { Periodene } from 'app/util/uttaksplan/Periodene';
import { skalFarUtsetteEtterMorSinSisteUttaksdag } from './utils';

export interface ScenarioProps {
    søknad: Søknad;
    navnPåForeldre: NavnPåForeldre;
    antallUkerFellesperiode: number;
    antallUkerMødreKvote: number | undefined;
    antallUkerFedreKvote: number | undefined;
    familiehendelsesdato: Date;
    erFarEllerMedmor: boolean;
    eksisterendeSak?: EksisterendeSak;
    søkerHarMidlertidigOmsorg: boolean;
}
export interface OwnProps extends ScenarioProps {
    scenario: UttaksplanSkjemaScenario;
}

type Props = OwnProps & InjectedIntlProps;

const Scenario1: React.StatelessComponent<ScenarioProps & InjectedIntlProps> = ({
    søknad,
    antallUkerFellesperiode,
    familiehendelsesdato,
    navnPåForeldre,
    søkerHarMidlertidigOmsorg,
    intl
}) => {
    const harSvartPåDekningsgradSpørsmål = søknad.dekningsgrad !== undefined;
    const { farSinFørsteUttaksdag, morSinSisteUttaksdag } = søknad.ekstrainfo.uttaksplanSkjema;
    return (
        <>
            <VeilederInfo
                messages={[
                    {
                        type: 'normal',
                        contentIntlKey: 'uttaksplan.skjema.informasjonTilAnnenForelder',
                        values: { navn: getNavnGenitivEierform(søknad.annenForelder.fornavn, intl.locale) }
                    }
                ]}
            />

            <DekningsgradSpørsmål />
            <Block
                visible={
                    (søknad.søker.rolle === SøkerRolle.FAR || søknad.søker.rolle === SøkerRolle.MEDMOR) &&
                    harSvartPåDekningsgradSpørsmål &&
                    !søkerHarMidlertidigOmsorg
                }
                margin="xs"
            >
                <VeilederInfo
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey:
                                'uttaksplan.skjema.farMedmor.infoOmTidsromMellomMorsSisteDagOgFarsFørsteDag',
                            values: {
                                navnMor: navnPåForeldre.mor
                            }
                        }
                    ]}
                />
            </Block>
            <MorSinSisteUttaksdagSpørsmål
                visible={harSvartPåDekningsgradSpørsmål && !søkerHarMidlertidigOmsorg}
                navnMor={søknad.annenForelder.fornavn}
                familiehendelsesdato={familiehendelsesdato}
            />
            <FarSinFørsteUttaksdagSpørsmål
                visible={morSinSisteUttaksdag !== undefined}
                morSinSisteUttaksdag={morSinSisteUttaksdag}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
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
    antallUkerMødreKvote,
    familiehendelsesdato
}) => {
    const harSvartPåStartdato =
        søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon !== undefined ||
        søknad.ekstrainfo.uttaksplanSkjema.skalIkkeHaUttakFørTermin === true;
    return (
        <>
            <DekningsgradSpørsmål />
            <StartdatoPermisjonMorBolk
                visible={søknad.dekningsgrad !== undefined}
                familiehendelsesdato={familiehendelsesdato}
                barnetErFødt={søknad.barn.erBarnetFødt}
            />
            {søknad.søker.erAleneOmOmsorg === false &&
                søknad.annenForelder.harRettPåForeldrepenger &&
                søknad.dekningsgrad !== undefined && (
                    <>
                        <Block visible={søknad.barn.antallBarn > 1 && harSvartPåStartdato}>
                            <VeilederInfo
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
                        </Block>
                        <FordelingFellesperiodeSpørsmål
                            visible={harSvartPåStartdato}
                            ukerFellesperiode={Math.floor(antallUkerFellesperiode)}
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

const Scenario4: React.StatelessComponent<ScenarioProps & InjectedIntlProps> = ({
    søknad,
    antallUkerFellesperiode,
    navnPåForeldre,
    antallUkerFedreKvote,
    antallUkerMødreKvote,
    familiehendelsesdato,
    intl
}) => {
    /** Mor og far, adopsjon, begge har rett, adopterer alene, bare en har rett */
    const skjema = søknad.ekstrainfo.uttaksplanSkjema;
    const { barn } = søknad;
    if (!isAdopsjonsbarn(barn, søknad.situasjon)) {
        throw new Error('Barn er ikke adopsjonsbarn');
    }
    const latestDate =
        barn.ankomstdato !== undefined ? findOldestDate([barn.adopsjonsdato!, barn.ankomstdato!]) : barn.adopsjonsdato;
    const startdatoPermisjon = søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon;
    const stebarnsadopsjon = barn.adopsjonAvEktefellesBarn;
    const adoptertIUtlandet = barn.adoptertIUtlandet;
    const { farSinFørsteUttaksdag, morSinSisteUttaksdag } = skjema;

    return (
        <>
            <HarAnnenForelderSøktForeldrepengerSpørsmål
                visible={søknad.annenForelder.harRettPåForeldrepenger}
                navnAnnenForelder={søknad.annenForelder.fornavn}
            />
            {skjema.harAnnenForelderSøktFP === true && (
                <VeilederInfo
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'uttaksplan.skjema.informasjonTilAnnenForelder',
                            values: { navn: getNavnGenitivEierform(søknad.annenForelder.fornavn, intl.locale) }
                        }
                    ]}
                />
            )}
            <DekningsgradSpørsmål
                visible={skjema.harAnnenForelderSøktFP !== undefined || !søknad.annenForelder.harRettPåForeldrepenger}
            />
            <StartdatoAdopsjonBolk
                familiehendelsesdato={familiehendelsesdato}
                visible={søknad.dekningsgrad !== undefined && skjema.harAnnenForelderSøktFP !== true}
                barn={barn}
            />
            <MorSinSisteUttaksdagSpørsmål
                visible={søknad.dekningsgrad !== undefined && skjema.harAnnenForelderSøktFP === true}
                navnMor={søknad.annenForelder.fornavn}
                familiehendelsesdato={familiehendelsesdato}
            />
            <FarSinFørsteUttaksdagSpørsmål
                visible={morSinSisteUttaksdag !== undefined && skjema.harAnnenForelderSøktFP === true}
                familiehendelsesdato={familiehendelsesdato}
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
                }
            >
                <VeilederInfo
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
            </Block>
            {søknad.søker.erAleneOmOmsorg === false &&
                søknad.annenForelder.harRettPåForeldrepenger && (
                    <>
                        <Block
                            visible={
                                søknad.barn.antallBarn > 1 &&
                                skjema.startdatoPermisjon !== undefined &&
                                skjema.harAnnenForelderSøktFP !== true
                            }
                        >
                            <VeilederInfo
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
                        </Block>
                        <FordelingFellesperiodeSpørsmål
                            visible={skjema.startdatoPermisjon !== undefined && skjema.harAnnenForelderSøktFP !== true}
                            ukerFellesperiode={Math.floor(antallUkerFellesperiode)}
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

const Scenario5: React.StatelessComponent<ScenarioProps> = ({ søknad, familiehendelsesdato }) => {
    const omsorgsDato = søknad.barn.datoForAleneomsorg || familiehendelsesdato;
    return (
        <>
            <DekningsgradSpørsmål />
            <Block visible={søknad.dekningsgrad !== undefined && søknad.situasjon === 'fødsel'}>
                <VeilederInfo
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'uttaksplan.skjema.aleneomsorgFarMedmor.navSaraVeileder',
                            values: { navn: søknad.annenForelder.fornavn },
                            formatContentAsHTML: true
                        }
                    ]}
                />
            </Block>
            <Block visible={søknad.dekningsgrad !== undefined && søknad.situasjon === 'adopsjon'}>
                <VeilederInfo
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'uttaksplan.skjema.adopsjon.navSaraVeileder',
                            values: { navn: søknad.annenForelder.fornavn },
                            formatContentAsHTML: true
                        }
                    ]}
                />
            </Block>
            <StartdatoUttakFarMedmorAleneomsorgSpørsmål
                familiehendelsesdato={familiehendelsesdato}
                datoForAleneomsorg={omsorgsDato}
                visible={søknad.dekningsgrad !== undefined}
            />
        </>
    );
};

const Scenario6: React.StatelessComponent<ScenarioProps> = ({ søknad, familiehendelsesdato }) => {
    const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();

    return (
        <>
            <DekningsgradSpørsmål />
            <StartdatoUttakFarMedmorSpørsmål
                visible={søknad.dekningsgrad !== undefined && søknad.annenForelder.erUfør === true}
                familiehendelsesdato={førsteUttaksdag}
            />
        </>
    );
};

const Scenario7: React.StatelessComponent<ScenarioProps> = ({ søknad, navnPåForeldre, familiehendelsesdato }) => (
    <>
        <HarAnnenForelderSøktForeldrepengerSpørsmål navnAnnenForelder={søknad.annenForelder.fornavn} visible={true} />
        <DekningsgradSpørsmål visible={søknad.ekstrainfo.uttaksplanSkjema.harAnnenForelderSøktFP !== undefined} />
        <MorSinSisteUttaksdagSpørsmål
            visible={
                søknad.dekningsgrad !== undefined &&
                søknad.ekstrainfo.uttaksplanSkjema.harAnnenForelderSøktFP !== undefined
            }
            navnMor={navnPåForeldre.mor}
            familiehendelsesdato={familiehendelsesdato}
        />
        <SkalHaDelAvFellesperiodeSpørsmål
            visible={søknad.ekstrainfo.uttaksplanSkjema.morSinSisteUttaksdag !== undefined}
        />
    </>
);

const Scenario8: React.StatelessComponent<ScenarioProps> = () => {
    return (
        <>
            <DekningsgradSpørsmål />
        </>
    );
};

const Scenario9: React.StatelessComponent<ScenarioProps> = ({ søknad, navnPåForeldre, familiehendelsesdato }) => {
    const { uttaksplanSkjema, eksisterendeSak } = søknad.ekstrainfo;
    const annenPartsSistePeriode =
        eksisterendeSak && eksisterendeSak.erAnnenPartsSak && eksisterendeSak.uttaksplan
            ? Periodene(eksisterendeSak.uttaksplan).finnSisteInfoperiode()
            : undefined;

    const morSinSisteUttaksdag = annenPartsSistePeriode ? annenPartsSistePeriode.tidsperiode.tom : undefined;

    return (
        <>
            <FarSinFørsteUttaksdagSpørsmål
                visible={true}
                familiehendelsesdato={familiehendelsesdato}
                morSinSisteUttaksdag={morSinSisteUttaksdag}
                eksisterendeSakAnnenPart={
                    eksisterendeSak && eksisterendeSak.erAnnenPartsSak ? eksisterendeSak : undefined
                }
                navnPåForeldre={navnPåForeldre}
            />
            {uttaksplanSkjema.farSinFørsteUttaksdag &&
                morSinSisteUttaksdag && (
                    <UtsettelseBegrunnelse
                        visible={skalFarUtsetteEtterMorSinSisteUttaksdag(
                            uttaksplanSkjema.farSinFørsteUttaksdag,
                            morSinSisteUttaksdag
                        )}
                        navn={navnPåForeldre.mor}
                    />
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
        case UttaksplanSkjemaScenario.s9_førstegangssøknadMedAnnenPart:
            return <Scenario9 {...scenarioProps} />;
        default:
            return <>Undefined scenario</>;
    }
};

export default injectIntl(UttaksplanSkjemaScenarioes);
