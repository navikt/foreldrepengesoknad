import { ArrowLeftIcon, LinkIcon, TasklistStartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { erAlenesøker } from 'utils/HvemPlanleggerUtils';
import { erBarnetFødt } from 'utils/barnetUtils';
import { utledHvemSomHarRett } from 'utils/hvemHarRettUtils';

import { Alert, BodyShort, Box, Button, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { DATE_3_YEARS_AGO } from '@navikt/fp-constants/src/dates';
import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { LocaleAll, Satser, TilgjengeligeStønadskontoer } from '@navikt/fp-types';
import { Infobox } from '@navikt/fp-ui';
import { useScrollBehaviour } from '@navikt/fp-utils/src/hooks/useScrollBehaviour';
import { notEmpty } from '@navikt/fp-validation';

import ShareDataInfobox from '../../components/boxes/ShareDataInfobox';
import OppgittInformasjon from './OppgittInformasjon';
import OppsummeringHarRett from './OppsummeringHarRett';
import OppsummeringHeader from './OppsummeringHeader';
import HvaSkjerNårIkon from './ikoner/HvaSkjerNårIkon';
import HvorMyeIkon from './ikoner/HvorMyeIkon';
import styles from './oppsummeringSteg.module.css';

const copyUrlToClipboard = async () => {
    logAmplitudeEvent('applikasjon-hendelse', {
        app: 'planlegger',
        team: 'foreldrepenger',
        pageKey: 'copy-url',
    });
    try {
        await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to copy: ', err);
    }
};

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
                        {harRettTilForeldrepenger && (
                            <Alert variant="info">
                                <BodyShort>
                                    <FormattedMessage
                                        id="OppsummeringSteg.InformasjonPlanleggerErUnderUtvikling"
                                        values={{
                                            a: (msg: any) => (
                                                <Link
                                                    inlineText
                                                    href={links.søknadForeldrepenger}
                                                    target="_blank"
                                                    className="lenke"
                                                    rel="noreferrer"
                                                >
                                                    {msg}
                                                </Link>
                                            ),
                                        }}
                                    />
                                </BodyShort>
                            </Alert>
                        )}
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
                            <VStack gap="5">
                                <OppgittInformasjon
                                    stønadskontoer={stønadskontoer}
                                    barnet={barnet}
                                    hvemPlanlegger={hvemPlanlegger}
                                    arbeidssituasjon={arbeidssituasjon}
                                    hvorLangPeriode={hvorLangPeriode}
                                    fordeling={fordeling}
                                    satser={satser}
                                />
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
                            </VStack>
                        )}
                    </VStack>
                    <VStack gap="4">
                        <ShareDataInfobox />
                        <HStack justify="center">
                            <Button
                                className={styles.button}
                                variant="primary"
                                icon={<LinkIcon aria-hidden height={24} width={24} />}
                                onClick={copyUrlToClipboard}
                            >
                                <FormattedMessage id="OppsummeringSteg.KopierUrl" />
                            </Button>
                        </HStack>
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
