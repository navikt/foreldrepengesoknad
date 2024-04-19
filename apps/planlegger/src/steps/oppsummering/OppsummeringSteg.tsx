import { ArrowLeftIcon, CalendarIcon, TasklistStartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import Infoboks from 'components/boxes/Infobox';
import Calendar from 'components/calendar/Calendar';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { isAlene } from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { lagKalenderPerioder } from 'utils/kalenderPerioderHjelper';
import { mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto } from 'utils/stønadskontoer';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { Alert, BodyLong, Box, Button, ExpansionCard, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { notEmpty } from '@navikt/fp-validation';

import OppgittInformasjon from './OppgittInformasjon';
import OppsummeringHeader from './OppsummeringHeader';
import HvaSkjerNårIkon from './ikoner/HvaSkjerNårIkon';
import HvorMyeIkon from './ikoner/HvorMyeIkon';
import styles from './oppsummeringSteg.module.css';

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoerDTO;
}

const OppsummeringSteg: FunctionComponent<Props> = ({ stønadskontoer }) => {
    const navigator = usePlanleggerNavigator();

    useScrollBehaviour();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const hvorLangPeriode = useContextGetData(ContextDataType.HVOR_LANG_PERIODE);
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));

    const erAleneforsørger = isAlene(hvemPlanlegger);
    const harRett =
        (arbeidssituasjon.status === Arbeidsstatus.INGEN && arbeidssituasjon.jobberAnnenPart !== true) ||
        (arbeidssituasjon.status === Arbeidsstatus.UFØR && arbeidssituasjon.jobberAnnenPart !== true)
            ? false
            : true;

    const valgtStønadskonto = hvorLangPeriode
        ? mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(stønadskontoer[hvorLangPeriode.dekningsgrad])
        : undefined;

    const uttaksperioder = valgtStønadskonto
        ? lagKalenderPerioder(valgtStønadskonto, barnet, hvemPlanlegger, arbeidssituasjon, fordeling?.antallUkerSøker1)
        : [];

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
                                icon={<TasklistStartIcon height={28} width={28} color="#236B7D" />}
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
                    {valgtStønadskonto && hvorLangPeriode && (
                        <VStack gap="5">
                            {harRett && (
                                <ExpansionCard aria-label="">
                                    <ExpansionCard.Header>
                                        <HStack gap="5" align="center" wrap={false}>
                                            <IconCircleWrapper size="large" color="green">
                                                <CalendarIcon height={28} width={28} fontSize="1.5rem" />
                                            </IconCircleWrapper>
                                            <ExpansionCard.Title size="medium">
                                                <FormattedMessage
                                                    id="OppsummeringSteg.Planen"
                                                    values={{ erAlenesøker: isAlene(hvemPlanlegger) }}
                                                />
                                            </ExpansionCard.Title>
                                        </HStack>
                                    </ExpansionCard.Header>
                                    <ExpansionCard.Content>
                                        <Calendar periods={uttaksperioder} useSmallerWidth />
                                    </ExpansionCard.Content>
                                </ExpansionCard>
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
                    <VStack gap="10">
                        <HStack>
                            <Button
                                variant="secondary"
                                onClick={navigator.goToPreviousDefaultStep}
                                icon={<ArrowLeftIcon />}
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
