import { ArrowLeftIcon, BabyWrappedIcon, TasklistStartIcon, WalletIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import { usePlanleggerNavigator } from 'appData/usePlanleggerNavigator';
import dayjs from 'dayjs';
import { FormattedMessage } from 'react-intl';
import { erAlenesøker } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { BodyShort, Box, Button, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { DATE_3_YEARS_AGO } from '@navikt/fp-constants/src/dates';
import { Satser, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { notEmpty } from '@navikt/fp-validation';

import { ShareDataInfobox } from '../../components/boxes/ShareDataInfobox';
import { OppsummeringHeader } from './OppsummeringHeader';
import { SøkOmForeldrepenger } from './SøkOmForeldrepenger';
import { BarnehageplassOppsummering, getFamiliehendelsedato } from './expansion-cards/BarnehageplassOppsummering';
import { OppgittInformasjon } from './expansion-cards/OppgittInformasjon';
import { OppsummeringHarRett } from './expansion-cards/OppsummeringHarRett';
import { HvorMyeOppsummering } from './expansion-cards/hvor-mye/HvorMyeOppsummering';
import styles from './oppsummeringSteg.module.css';

interface Props {
    stønadskontoer?: TilgjengeligeStønadskontoer;
    satser: Satser;
}

export const OppsummeringSteg = ({ stønadskontoer, satser }: Props) => {
    const navigator = usePlanleggerNavigator();

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
    const familiehendelsedato = getFamiliehendelsedato(barnet);
    const svangerskapsuke22EllerSenere = dayjs().add(18, 'weeks').add(3, 'days').toDate();
    const erAdoptert = erBarnetAdoptert(barnet);

    return (
        <>
            <OppsummeringHeader>
                <VStack gap="space-40">
                    <VStack gap="space-20">
                        {!harRettTilForeldrepenger && (
                            <VStack gap="space-20">
                                <Infobox
                                    header={
                                        erAleneforsørger ? (
                                            <FormattedMessage id="OppsummeringSteg.Infoboks.IngenHarRettDeg" />
                                        ) : (
                                            <FormattedMessage id="OppsummeringSteg.Infoboks.IngenHarRett" />
                                        )
                                    }
                                    icon={
                                        <TasklistStartIcon
                                            height={24}
                                            width={24}
                                            color="var(--ax-bg-success-strong)"
                                            aria-hidden
                                        />
                                    }
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
                                        .
                                    </BodyShort>
                                </Infobox>
                            </VStack>
                        )}
                        {stønadskontoer && valgtStønadskonto && hvorLangPeriode && arbeidssituasjon && (
                            <VStack gap="space-8">
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
                                {!erAdoptert && (
                                    <BarnehageplassOppsummering hvemPlanlegger={hvemPlanlegger} barnet={barnet} />
                                )}
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
                        {((harRettTilForeldrepenger &&
                            dayjs(familiehendelsedato).isBefore(svangerskapsuke22EllerSenere)) ||
                            (harRettTilForeldrepenger && erAdoptert)) && (
                            <SøkOmForeldrepenger erAlenesøker={erAleneforsørger} barnet={barnet} />
                        )}
                    </VStack>

                    <VStack gap="space-40">
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
                <VStack gap="space-16" className={styles.content}>
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
                        <Box.New
                            padding="4"
                            background="default"
                            borderRadius="xlarge"
                            shadow="dialog"
                            className={styles.panel}
                        >
                            <HStack gap="5" align="center">
                                <WalletIcon height={43} width={43} />
                                <Heading level="3" size="small">
                                    <FormattedMessage id="OppsummeringSteg.VeiviserHvorMye" />
                                </Heading>
                            </HStack>
                        </Box.New>
                    </Link>
                    <Link
                        inlineText
                        href={links.veiviser}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.lenkepanel}
                    >
                        <Box.New
                            padding="4"
                            background="default"
                            borderRadius="xlarge"
                            shadow="dialog"
                            className={styles.panel}
                        >
                            <HStack gap="space-20" align="center">
                                <BabyWrappedIcon height={43} width={43} />
                                <Heading level="3" size="small">
                                    <FormattedMessage id="OppsummeringSteg.VeiviserFpEllerEs" />
                                </Heading>
                            </HStack>
                        </Box.New>
                    </Link>
                </VStack>
            </div>
        </>
    );
};
