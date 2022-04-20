import * as React from 'react';
import { useIntl } from 'react-intl';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import moment from 'moment';
import { TilgjengeligeDager } from 'shared/types';
import Block from 'common/components/block/Block';
import { NavnPåForeldre } from 'common/types';
import TilgjengeligeDagerGraf from 'app/components/elementer/tilgjengeligeDagerGraf/TilgjengeligeDagerGraf';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { Periodene } from 'app/util/uttaksplan/Periodene';
import { getFlerbarnsuker } from 'app/util/validation/uttaksplan/uttaksplanHarForMangeFlerbarnsuker';
import VeilederInfo from '../../components/veilederInfo/VeilederInfo';
import { isAdopsjonsbarn } from '../../types/søknad/Barn';
import Søknad, { SøkerRolle } from '../../types/søknad/Søknad';
import { dateIsSameOrAfter, findOldestDate } from '../../util/dates/dates';
import { getNavnGenitivEierform } from '../../util/tekstUtils';
import { Uttaksdagen } from '../../util/uttaksplan/Uttaksdagen';
import AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål from './enkeltspørsmål/AntallUkerOgDagerFellesperiodeFarMedmorSpørsmål';
import DekningsgradSpørsmål from './enkeltspørsmål/DekningsgradSpørsmål';
import FarSinFørsteUttaksdagSpørsmål from './enkeltspørsmål/FarSinFørsteUttaksdagSpørsmål';
import FordelingFellesperiodeSpørsmål from './enkeltspørsmål/FordelingFellesperiodeSpørsmål';
import HarAnnenForelderSøktForeldrepengerSpørsmål from './enkeltspørsmål/HarAnnenForelderSøktForeldrepengerSpørsmål';
import MorSinSisteUttaksdagSpørsmål from './enkeltspørsmål/MorSinSisteUttaksdagSpørsmål';
import SkalHaDelAvFellesperiodeSpørsmål from './enkeltspørsmål/SkalHaDelAvFellesperiodeSpørsmål';
import StartdatoAdopsjonBolk from './enkeltspørsmål/StartdatoAdopsjonBolk';
import StartdatoPermisjonMorBolk from './enkeltspørsmål/StartdatoPermisjonMorBolk';
import StartdatoUttakFarMedmorAleneomsorgSpørsmål from './enkeltspørsmål/StartdatoUttakFarMedmorAleneomsorgSpørsmål';
import StartdatoUttakFarMedmorSpørsmål from './enkeltspørsmål/StartdatoUttakFarMedmorSpørsmål';
import UtsettelseBegrunnelse from './enkeltspørsmål/UtsettelseBegrunnelse';
import { skalFarUtsetteEtterMorSinSisteUttaksdag } from './utils';
import { UttaksplanSkjemaScenario } from './uttaksplanSkjemaScenario';
import { veilederMessageAvsnitt } from '../../components/veilederInfo/utils';

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
    tilgjengeligeDager: TilgjengeligeDager;
    erDeltUttak: boolean;
    ekstraDagerGrunnetPrematurFødsel: number | undefined;
    visInfoOmPrematuruker: boolean;
}
export interface OwnProps extends ScenarioProps {
    scenario: UttaksplanSkjemaScenario;
}

type Props = OwnProps;

const Scenario1: React.FunctionComponent<ScenarioProps> = ({
    søknad,
    antallUkerFellesperiode,
    familiehendelsesdato,
    navnPåForeldre,
    søkerHarMidlertidigOmsorg,
    tilgjengeligeDager,
    erFarEllerMedmor,
    erDeltUttak,
    ekstraDagerGrunnetPrematurFødsel,
    visInfoOmPrematuruker,
}) => {
    const harSvartPåDekningsgradSpørsmål = søknad.dekningsgrad !== undefined;
    const intl = useIntl();
    const { farSinFørsteUttaksdag, morSinSisteUttaksdag } = søknad.ekstrainfo.uttaksplanSkjema;
    return (
        <>
            <VeilederInfo
                messages={[
                    {
                        type: 'normal',
                        contentIntlKey: 'uttaksplan.skjema.informasjonTilAnnenForelder',
                        values: { navn: getNavnGenitivEierform(søknad.annenForelder.fornavn, intl.locale) },
                    },
                ]}
            />

            <DekningsgradSpørsmål />
            {søknad.dekningsgrad !== undefined && (
                <TilgjengeligeDagerGraf
                    navnPåForeldre={navnPåForeldre}
                    tilgjengeligeDager={tilgjengeligeDager}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erDeltUttak={erDeltUttak}
                />
            )}
            <Block
                visible={
                    (søknad.søker.rolle === SøkerRolle.FAR || søknad.søker.rolle === SøkerRolle.MEDMOR) &&
                    harSvartPåDekningsgradSpørsmål &&
                    !søkerHarMidlertidigOmsorg
                }
                margin="xs"
            >
                <VeilederInfo
                    messages={veilederMessageAvsnitt(
                        [
                            {
                                type: 'normal',
                                contentIntlKey:
                                    'uttaksplan.skjema.farMedmor.infoOmTidsromMellomMorsSisteDagOgFarsFørsteDag',
                                values: { navnMor: navnPåForeldre.mor },
                            },
                        ],
                        [
                            {
                                type: 'normal',
                                contentIntlKey: 'uttaksplan.informasjon.prematuruker',
                                values: {
                                    antallprematuruker: Math.floor(ekstraDagerGrunnetPrematurFødsel! / 5),
                                    antallprematurdager: ekstraDagerGrunnetPrematurFødsel! % 5,
                                },
                            },
                        ],
                        visInfoOmPrematuruker
                    )}
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
                    !dateIsSameOrAfter(ISOStringToDate(morSinSisteUttaksdag), ISOStringToDate(farSinFørsteUttaksdag))
                }
                antallUkerFellesperiode={antallUkerFellesperiode}
            />
        </>
    );
};

const Scenario3: React.FunctionComponent<ScenarioProps> = ({
    søknad,
    antallUkerFellesperiode,
    navnPåForeldre,
    antallUkerFedreKvote,
    antallUkerMødreKvote,
    familiehendelsesdato,
    tilgjengeligeDager,
    erFarEllerMedmor,
    erDeltUttak,
    ekstraDagerGrunnetPrematurFødsel,
    visInfoOmPrematuruker,
}) => {
    const harSvartPåStartdato =
        søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon !== undefined ||
        søknad.ekstrainfo.uttaksplanSkjema.skalIkkeHaUttakFørTermin === true;
    return (
        <>
            <DekningsgradSpørsmål />
            {søknad.dekningsgrad !== undefined && (
                <TilgjengeligeDagerGraf
                    navnPåForeldre={navnPåForeldre}
                    tilgjengeligeDager={tilgjengeligeDager}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erDeltUttak={erDeltUttak}
                />
            )}
            <Block visible={visInfoOmPrematuruker === true}>
                <VeilederInfo
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'uttaksplan.informasjon.prematuruker',
                            values: {
                                antallprematuruker: Math.floor(ekstraDagerGrunnetPrematurFødsel! / 5),
                                antallprematurdager: ekstraDagerGrunnetPrematurFødsel! % 5,
                            },
                        },
                    ]}
                />
            </Block>

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
                                            navnMor: navnPåForeldre.mor,
                                        },
                                    },
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

const Scenario4: React.FunctionComponent<ScenarioProps> = ({
    søknad,
    antallUkerFellesperiode,
    navnPåForeldre,
    antallUkerFedreKvote,
    antallUkerMødreKvote,
    familiehendelsesdato,
    tilgjengeligeDager,
    erDeltUttak,
    erFarEllerMedmor,
}) => {
    /** Mor og far, adopsjon, begge har rett, adopterer alene, bare en har rett */
    const intl = useIntl();
    const skjema = søknad.ekstrainfo.uttaksplanSkjema;
    const { barn } = søknad;
    if (!isAdopsjonsbarn(barn, søknad.situasjon)) {
        throw new Error('Barn er ikke adopsjonsbarn');
    }

    const ankomstdatoDate = ISOStringToDate(barn.ankomstdato);
    const adopsjonsdatoDate = ISOStringToDate(barn.adopsjonsdato);

    const latestDate =
        ankomstdatoDate !== undefined && adopsjonsdatoDate !== undefined
            ? dateToISOString(findOldestDate([ankomstdatoDate, adopsjonsdatoDate])) // todo - sjekk logikk her
            : barn.adopsjonsdato;
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
                            values: { navn: getNavnGenitivEierform(søknad.annenForelder.fornavn, intl.locale) },
                        },
                    ]}
                />
            )}
            <DekningsgradSpørsmål
                visible={skjema.harAnnenForelderSøktFP !== undefined || !søknad.annenForelder.harRettPåForeldrepenger}
            />
            {søknad.dekningsgrad !== undefined && (
                <TilgjengeligeDagerGraf
                    navnPåForeldre={navnPåForeldre}
                    tilgjengeligeDager={tilgjengeligeDager}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erDeltUttak={erDeltUttak}
                />
            )}
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
                    !dateIsSameOrAfter(ISOStringToDate(morSinSisteUttaksdag), ISOStringToDate(farSinFørsteUttaksdag)) &&
                    skjema.harAnnenForelderSøktFP === true
                }
                antallUkerFellesperiode={antallUkerFellesperiode}
            />
            <Block
                visible={
                    startdatoPermisjon !== undefined &&
                    moment(ISOStringToDate(latestDate)).isBefore(moment(ISOStringToDate(startdatoPermisjon))) &&
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
                                    : 'uttaksplanSkjema.info.ikkeAdoptertIUtlandet',
                        },
                    ]}
                />
            </Block>
            {søknad.søker.erAleneOmOmsorg === false && søknad.annenForelder.harRettPåForeldrepenger && (
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
                                        navnMor: navnPåForeldre.mor,
                                    },
                                },
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

const Scenario5: React.FunctionComponent<ScenarioProps> = ({
    søknad,
    familiehendelsesdato,
    navnPåForeldre,
    tilgjengeligeDager,
    erFarEllerMedmor,
    erDeltUttak,
    ekstraDagerGrunnetPrematurFødsel,
    visInfoOmPrematuruker,
}) => {
    const omsorgsDato: Date = ISOStringToDate(søknad.barn.datoForAleneomsorg) || familiehendelsesdato;

    return (
        <>
            <DekningsgradSpørsmål />
            {søknad.dekningsgrad !== undefined && (
                <TilgjengeligeDagerGraf
                    navnPåForeldre={navnPåForeldre}
                    tilgjengeligeDager={tilgjengeligeDager}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erDeltUttak={erDeltUttak}
                />
            )}
            <Block visible={søknad.dekningsgrad !== undefined && søknad.situasjon === 'fødsel'}>
                <VeilederInfo
                    messages={veilederMessageAvsnitt(
                        [
                            {
                                type: 'normal',
                                contentIntlKey: 'uttaksplan.skjema.aleneomsorgFarMedmor.navSaraVeileder',
                                values: {
                                    navn: søknad.annenForelder.fornavn,
                                    b: (msg: any) => <b>{msg}</b>,
                                },
                            },
                        ],
                        [
                            {
                                type: 'normal',
                                contentIntlKey: 'uttaksplan.informasjon.prematuruker',
                                values: {
                                    antallprematuruker: Math.floor(ekstraDagerGrunnetPrematurFødsel! / 5),
                                    antallprematurdager: ekstraDagerGrunnetPrematurFødsel! % 5,
                                },
                            },
                        ],
                        visInfoOmPrematuruker
                    )}
                />
            </Block>
            <Block visible={søknad.dekningsgrad !== undefined && søknad.situasjon === 'adopsjon'}>
                <VeilederInfo
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'uttaksplan.skjema.adopsjon.navSaraVeileder',
                            values: { navn: søknad.annenForelder.fornavn },
                            formatContentAsHTML: true,
                        },
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

const Scenario6: React.FunctionComponent<ScenarioProps> = ({
    søknad,
    familiehendelsesdato,
    navnPåForeldre,
    erDeltUttak,
    erFarEllerMedmor,
    tilgjengeligeDager,
    ekstraDagerGrunnetPrematurFødsel,
    visInfoOmPrematuruker,
}) => {
    const førsteUttaksdag = Uttaksdagen(familiehendelsesdato).denneEllerNeste();

    return (
        <>
            <DekningsgradSpørsmål />
            {søknad.dekningsgrad !== undefined && (
                <TilgjengeligeDagerGraf
                    navnPåForeldre={navnPåForeldre}
                    tilgjengeligeDager={tilgjengeligeDager}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erDeltUttak={erDeltUttak}
                />
            )}
            <Block visible={visInfoOmPrematuruker === true}>
                <VeilederInfo
                    messages={[
                        {
                            type: 'normal',
                            contentIntlKey: 'uttaksplan.informasjon.prematuruker',
                            values: {
                                antallprematuruker: Math.floor(ekstraDagerGrunnetPrematurFødsel! / 5),
                                antallprematurdager: ekstraDagerGrunnetPrematurFødsel! % 5,
                            },
                        },
                    ]}
                />
            </Block>
            <StartdatoUttakFarMedmorSpørsmål
                visible={søknad.dekningsgrad !== undefined && søknad.annenForelder.erUfør === true}
                familiehendelsesdato={førsteUttaksdag}
            />
        </>
    );
};

const Scenario7: React.FunctionComponent<ScenarioProps> = ({
    søknad,
    navnPåForeldre,
    familiehendelsesdato,
    tilgjengeligeDager,
    erFarEllerMedmor,
    erDeltUttak,
}) => (
    <>
        <HarAnnenForelderSøktForeldrepengerSpørsmål navnAnnenForelder={søknad.annenForelder.fornavn} visible={true} />
        <DekningsgradSpørsmål visible={søknad.ekstrainfo.uttaksplanSkjema.harAnnenForelderSøktFP !== undefined} />
        {søknad.dekningsgrad !== undefined && (
            <TilgjengeligeDagerGraf
                navnPåForeldre={navnPåForeldre}
                tilgjengeligeDager={tilgjengeligeDager}
                erFarEllerMedmor={erFarEllerMedmor}
                erDeltUttak={erDeltUttak}
            />
        )}
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

const Scenario8: React.FunctionComponent<ScenarioProps> = () => {
    return (
        <>
            <DekningsgradSpørsmål />
        </>
    );
};

const Scenario9: React.FunctionComponent<ScenarioProps> = ({ søknad, navnPåForeldre, familiehendelsesdato }) => {
    const { uttaksplanSkjema, eksisterendeSak } = søknad.ekstrainfo;
    const annenPartsSistePeriode =
        eksisterendeSak && eksisterendeSak.erAnnenPartsSak && eksisterendeSak.uttaksplan
            ? Periodene(eksisterendeSak.uttaksplan).finnSisteInfoperiode()
            : undefined;

    const morSinSisteUttaksdag = annenPartsSistePeriode ? annenPartsSistePeriode.tidsperiode.tom : undefined;
    const farSinFørsteUttaksdagDate = ISOStringToDate(uttaksplanSkjema.farSinFørsteUttaksdag);

    return (
        <>
            <FarSinFørsteUttaksdagSpørsmål
                visible={true}
                familiehendelsesdato={familiehendelsesdato}
                morSinSisteUttaksdag={dateToISOString(morSinSisteUttaksdag)}
                eksisterendeSakAnnenPart={
                    eksisterendeSak && eksisterendeSak.erAnnenPartsSak ? eksisterendeSak : undefined
                }
                navnPåForeldre={navnPåForeldre}
            />
            {farSinFørsteUttaksdagDate && morSinSisteUttaksdag && (
                <UtsettelseBegrunnelse
                    visible={skalFarUtsetteEtterMorSinSisteUttaksdag(farSinFørsteUttaksdagDate, morSinSisteUttaksdag)}
                    navn={navnPåForeldre.mor}
                />
            )}
        </>
    );
};

const UttaksplanSkjemaScenarioes: React.FunctionComponent<Props> = (props) => {
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

export default UttaksplanSkjemaScenarioes;
