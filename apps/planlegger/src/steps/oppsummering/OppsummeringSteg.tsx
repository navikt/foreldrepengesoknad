import { ArrowLeftIcon, TasklistStartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { erAlenesøker } from 'utils/HvemPlanleggerUtils';
import { erBarnetFødt } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyShort, Box, Button, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { DATE_3_YEARS_AGO } from '@navikt/fp-constants/src/dates';
import { LocaleAll, Satser, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { notEmpty } from '@navikt/fp-validation';

import ShareDataInfobox from '../../components/boxes/ShareDataInfobox';
import OppsummeringHeader from './OppsummeringHeader';
import SøkOmForeldrepenger from './SøkOmForeldrepenger';
import BarnehageplassOppsummering from './expansion-cards/BarnehageplassOppsummering';
import OppgittInformasjon from './expansion-cards/OppgittInformasjon';
import OppsummeringHarRett from './expansion-cards/OppsummeringHarRett';
import HvorMyeOppsummering from './expansion-cards/hvor-mye/HvorMyeOppsummering';
import HvaSkjerNårIkon from './ikoner/HvaSkjerNårIkon';
import HvorMyeIkon from './ikoner/HvorMyeIkon';
import styles from './oppsummeringSteg.module.css';

interface Props {
    stønadskontoer?: TilgjengeligeStønadskontoer;
    satser: Satser;
    locale: LocaleAll;
}

const OppsummeringSteg: FunctionComponent<Props> = ({ stønadskontoer, satser, locale }) => {
    const navigator = usePlanleggerNavigator(locale);

    useScrollBehaviour();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvorLangPeriode = useContextGetData(ContextDataType.HVOR_LANG_PERIODE);
    const arbeidssituasjon = useContextGetData(ContextDataType.ARBEIDSSITUASJON);
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const hvorMye = useContextGetData(ContextDataType.HVOR_MYE);

    const erAleneforsørger = erAlenesøker(hvemPlanlegger);

    const valgtStønadskonto =
        stønadskontoer && hvorLangPeriode ? stønadskontoer[hvorLangPeriode.dekningsgrad] : undefined;

    const erBarnetFødtForMerEnnTreÅrSiden =
        erBarnetFødt(barnet) && dayjs(barnet.fødselsdato).isBefore(DATE_3_YEARS_AGO);

    const hvemHarRett = arbeidssituasjon ? utledHvemSomHarRett(arbeidssituasjon) : 'ingenHarRett';

    const harRettTilForeldrepenger = !erBarnetFødtForMerEnnTreÅrSiden && hvemHarRett !== 'ingenHarRett';

    return (
        <>
            <OppsummeringHeader>
                <VStack gap="10">
                    <VStack gap="5">
                        {!harRettTilForeldrepenger && (
                            <VStack gap="5">
                                <Infobox
                                    header={
                                        erAleneforsørger ? (
                                            <FormattedMessage id="OppsummeringSteg.Infoboks.IngenHarRettDeg" />
                                        ) : (
                                            <FormattedMessage id="OppsummeringSteg.Infoboks.IngenHarRett" />
                                        )
                                    }
                                    icon={<TasklistStartIcon height={24} width={24} color="#7F8900" aria-hidden />}
                                    color="green"
                                >
                                    <BodyShort>
                                        <FormattedMessage
                                            id="OppsummeringSteg.Infoboks.BasertPåSvarene"
                                            values={{ erAleneforsørger }}
                                        />
                                    </BodyShort>
                                    <BodyShort>
                                        <FormattedMessage id="OppsummeringSteg.Infoboks.Engangsstønad" />
                                        <Link inlineText href={links.veiviser}>
                                            <FormattedMessage id="OppsummeringSteg.Infoboks.Engangsstønad.Link" />
                                        </Link>
                                    </BodyShort>
                                </Infobox>
                            </VStack>
                        )}
                        {stønadskontoer && valgtStønadskonto && hvorLangPeriode && arbeidssituasjon && (
                            <VStack gap="2">
                                {harRettTilForeldrepenger && (
                                    <OppsummeringHarRett
                                        valgtStønadskonto={valgtStønadskonto}
                                        hvorLangPeriode={hvorLangPeriode}
                                        hvemPlanlegger={hvemPlanlegger}
                                        barnet={barnet}
                                        arbeidssituasjon={arbeidssituasjon}
                                        fordeling={fordeling}
                                    />
                                )}
                                {hvorMye && <HvorMyeOppsummering satser={satser} />}
                                <BarnehageplassOppsummering hvemPlanlegger={hvemPlanlegger} barnet={barnet} />
                                <OppgittInformasjon
                                    stønadskontoer={stønadskontoer}
                                    barnet={barnet}
                                    hvemPlanlegger={hvemPlanlegger}
                                    arbeidssituasjon={arbeidssituasjon}
                                    hvorLangPeriode={hvorLangPeriode}
                                    fordeling={fordeling}
                                    satser={satser}
                                />
                            </VStack>
                        )}
                        <ShareDataInfobox erAlenesøker={erAleneforsørger} />
                        <SøkOmForeldrepenger erAlenesøker={erAleneforsørger} barnet={barnet} />
                    </VStack>

                    <VStack gap="10">
                        <HStack>
                            <Button
                                variant="secondary"
                                onClick={navigator.goToPreviousDefaultStep}
                                icon={<ArrowLeftIcon aria-hidden height={24} width={24} />}
                            >
                                <FormattedMessage id="OppsummeringSteg.TilbakeTil" />
                            </Button>
                        </HStack>
                    </VStack>
                </VStack>
            </OppsummeringHeader>
            <div className={styles.background}>
                <VStack gap="4" className={styles.content}>
                    <Heading level="2" size="medium">
                        <FormattedMessage id="OppsummeringSteg.AndreVeivisere" />
                    </Heading>
                    <Link
                        inlineText
                        href={links.hvorMye}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.lenkepanel}
                    >
                        <Box
                            padding="4"
                            background="surface-default"
                            borderRadius="xlarge"
                            shadow="medium"
                            className={styles.panel}
                        >
                            <HStack gap="5" align="center">
                                <HvorMyeIkon />
                                <Heading level="3" size="small">
                                    <FormattedMessage id="OppsummeringSteg.VeiviserHvorMye" />
                                </Heading>
                            </HStack>
                        </Box>
                    </Link>
                    <Link
                        inlineText
                        href={links.hvaSkjerNår}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.lenkepanel}
                    >
                        <Box
                            padding="4"
                            background="surface-default"
                            borderRadius="xlarge"
                            shadow="medium"
                            className={styles.panel}
                        >
                            <HStack gap="5" align="center">
                                <HvaSkjerNårIkon />
                                <Heading level="3" size="small">
                                    <FormattedMessage id="OppsummeringSteg.VeiviserHvaSkjerNår" />
                                </Heading>
                            </HStack>
                        </Box>
                    </Link>
                </VStack>
            </div>
        </>
    );
};
export default OppsummeringSteg;
