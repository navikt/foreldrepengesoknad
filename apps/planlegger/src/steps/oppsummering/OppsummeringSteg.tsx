import { ArrowLeftIcon, LinkIcon, TasklistStartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import Infoboks from 'components/boxes/Infobox';
import ShareDataInfobox from 'components/boxes/ShareDataInfobox';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { erAlenesøker } from 'utils/HvemPlanleggerUtils';
import { erBarnetFødt } from 'utils/barnetUtils';
import { mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto } from 'utils/stønadskontoerUtils';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { Alert, BodyLong, Box, Button, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { DATE_3_YEARS_AGO } from '@navikt/fp-constants/src/dates';
import { LocaleAll } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import OppgittInformasjon from './OppgittInformasjon';
import OppsummeringHarRett from './OppsummeringHarRett';
import OppsummeringHeader from './OppsummeringHeader';
import HvaSkjerNårIkon from './ikoner/HvaSkjerNårIkon';
import HvorMyeIkon from './ikoner/HvorMyeIkon';
import styles from './oppsummeringSteg.module.css';

const copyUrlToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
};

interface Props {
    stønadskontoer?: TilgjengeligeStønadskontoerDTO;
    locale: LocaleAll;
}

const OppsummeringSteg: FunctionComponent<Props> = ({ locale, stønadskontoer }) => {
    const navigator = usePlanleggerNavigator(locale);

    useScrollBehaviour();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const hvorLangPeriode = useContextGetData(ContextDataType.HVOR_LANG_PERIODE);
    const arbeidssituasjon = useContextGetData(ContextDataType.ARBEIDSSITUASJON);
    const fordeling = useContextGetData(ContextDataType.FORDELING);

    const erAleneforsørger = erAlenesøker(hvemPlanlegger);

    const valgtStønadskonto =
        stønadskontoer && hvorLangPeriode
            ? mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(stønadskontoer[hvorLangPeriode.dekningsgrad])
            : undefined;

    const harRett =
        (erBarnetFødt(barnet) && dayjs(barnet.fødselsdato).isBefore(DATE_3_YEARS_AGO)) ||
        (arbeidssituasjon?.status === Arbeidsstatus.INGEN && arbeidssituasjon?.jobberAnnenPart !== true) ||
        (arbeidssituasjon?.status === Arbeidsstatus.UFØR && arbeidssituasjon?.jobberAnnenPart !== true)
            ? false
            : true;

    return (
        <>
            <OppsummeringHeader>
                <VStack gap="10">
                    {!harRett && (
                        <VStack gap="5">
                            <Infoboks
                                header={
                                    erAleneforsørger ? (
                                        <FormattedMessage id="OppsummeringSteg.Infoboks.IngenHarRettDeg" />
                                    ) : (
                                        <FormattedMessage id="OppsummeringSteg.Infoboks.IngenHarRett" />
                                    )
                                }
                                icon={<TasklistStartIcon height={28} width={28} color="#236B7D" aria-hidden />}
                            >
                                <BodyLong>
                                    <FormattedMessage
                                        id="OppsummeringSteg.Infoboks.BasertPåSvarene"
                                        values={{ erAleneforsørger }}
                                    />
                                </BodyLong>
                                <BodyLong>
                                    <FormattedMessage id="OppsummeringSteg.Infoboks.Engangsstønad" />
                                    <Link inlineText href={links.veiviser}>
                                        <FormattedMessage id="OppsummeringSteg.Infoboks.Engangsstønad.Link" />
                                    </Link>
                                </BodyLong>
                            </Infoboks>
                        </VStack>
                    )}
                    <Alert variant="info">
                        {!harRett ? (
                            <FormattedMessage id="OppsummeringSteg.InformasjonPlanleggerErUnderUtviklingIkkeRett" />
                        ) : (
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
                        )}
                    </Alert>
                    {stønadskontoer && valgtStønadskonto && hvorLangPeriode && arbeidssituasjon && (
                        <VStack gap="5">
                            {harRett && (
                                <OppsummeringHarRett
                                    valgtStønadskonto={valgtStønadskonto}
                                    hvorLangPeriode={hvorLangPeriode}
                                    hvemPlanlegger={hvemPlanlegger}
                                    barnet={barnet}
                                    arbeidssituasjon={arbeidssituasjon}
                                    fordeling={fordeling}
                                />
                            )}
                            <OppgittInformasjon
                                stønadskontoer={stønadskontoer}
                                barnet={barnet}
                                hvemPlanlegger={hvemPlanlegger}
                                arbeidssituasjon={arbeidssituasjon}
                                hvorLangPeriode={hvorLangPeriode}
                                fordeling={fordeling}
                            />
                        </VStack>
                    )}
                    <VStack gap="4">
                        <ShareDataInfobox />
                        <HStack justify="center">
                            <Button
                                className={styles.button}
                                variant="primary"
                                icon={<LinkIcon aria-hidden />}
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
                                icon={<ArrowLeftIcon aria-hidden />}
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
                        href={links.veiviser}
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
