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

import { Alert, BodyLong, Box, Button, ExpansionCard, HStack, Heading, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { notEmpty } from '@navikt/fp-validation';

import OppgittInformasjon from './OppgittInformasjon';
import OppsummeringHeader from './OppsummeringHeader';
import HvaSkjerNårIkon from './ikoner/HvaSkjerNårIkon';
import HvorMyeIkon from './ikoner/HvorMyeIkon';
import styles from './oppsummering.module.css';

interface Props {
    stønadskontoer: TilgjengeligeStønadskontoerDTO;
}

const OppsummeringSteg: FunctionComponent<Props> = ({ stønadskontoer }) => {
    const navigator = usePlanleggerNavigator();

    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const hvorLangPeriode = useContextGetData(ContextDataType.HVOR_LANG_PERIODE);
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));

    const erAleneforsørger = isAlene(hvemPlanlegger);
    const harRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN ||
        (arbeidssituasjon.status === Arbeidsstatus.UFØR && arbeidssituasjon.jobberAnnenPart === false)
            ? false
            : true;

    const valgtStønadskonto = hvorLangPeriode
        ? mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(stønadskontoer[hvorLangPeriode.dekningsgrad])
        : undefined;

    const uttaksperioder = valgtStønadskonto
        ? lagKalenderPerioder(valgtStønadskonto, barnet, hvemPlanlegger, arbeidssituasjon, fordeling?.antallUkerSøker1)
        : [];

    //TODO: dra ut expansioncards til egne komponenter
    //TODO: bruk input data til å vise riktig i kalenderen
    return (
        <>
            <OppsummeringHeader>
                <VStack gap="10">
                    {!harRett && (
                        <VStack gap="5">
                            <Infoboks
                                header={
                                    erAleneforsørger ? (
                                        <FormattedMessage id="oppsummering.infoboks.ingenHarRettDeg" />
                                    ) : (
                                        <FormattedMessage id="oppsummering.infoboks.ingenHarRett" />
                                    )
                                }
                                icon={<TasklistStartIcon height={28} width={28} color="#236B7D" />}
                            >
                                <BodyLong>
                                    {erAleneforsørger ? (
                                        <FormattedMessage id="oppsummering.infoboks.basertPåSvareneDeg" />
                                    ) : (
                                        <FormattedMessage id="oppsummering.infoboks.basertPåSvarene" />
                                    )}
                                </BodyLong>
                                <BodyLong>
                                    <FormattedMessage
                                        id="oppsummering.infoboks.engangsstønad"
                                        values={{
                                            a: (msg: any) => (
                                                <Link
                                                    href={links.veiviser}
                                                    target="_blank"
                                                    className="lenke"
                                                    rel="noreferrer"
                                                >
                                                    {msg}
                                                </Link>
                                            ),
                                        }}
                                    />
                                </BodyLong>
                            </Infoboks>
                        </VStack>
                    )}
                    <Alert variant="info">
                        {!harRett ? (
                            <FormattedMessage id="oppsummering.informasjonPlanleggerErUnderUtviklingIkkeRett" />
                        ) : (
                            <FormattedMessage
                                id="oppsummering.informasjonPlanleggerErUnderUtvikling"
                                values={{
                                    a: (msg: any) => (
                                        <Link
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
                                        <HStack gap="5" align="center">
                                            <IconCircleWrapper size="large" color="green">
                                                <CalendarIcon height={28} width={28} fontSize="1.5rem" />
                                            </IconCircleWrapper>
                                            <ExpansionCard.Title size="medium">
                                                {isAlene(hvemPlanlegger) ? (
                                                    <FormattedMessage id="oppsummering.planenDin" />
                                                ) : (
                                                    <FormattedMessage id="oppsummering.planenDeres" />
                                                )}
                                            </ExpansionCard.Title>
                                        </HStack>
                                    </ExpansionCard.Header>
                                    <ExpansionCard.Content>
                                        <Calendar periods={uttaksperioder} />
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
                                <FormattedMessage id="oppsummering.tilbakeTil" />
                            </Button>
                        </HStack>
                    </VStack>
                </VStack>
            </OppsummeringHeader>
            <div className={styles.background}>
                <VStack gap="4" className={styles.content}>
                    <Heading level="2" size="medium">
                        <FormattedMessage id="oppsummering.andreVeivisere" />
                    </Heading>
                    <Link href={links.veiviser} target="_blank" rel="noreferrer" className={styles.lenkepanel}>
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
                                    <FormattedMessage id="oppsummering.veiviserHvorMye" />
                                </Heading>
                            </HStack>
                        </Box>
                    </Link>
                    <Link href={links.veiviser} target="_blank" rel="noreferrer" className={styles.lenkepanel}>
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
                                    <FormattedMessage id="oppsummering.veiviserHvaSkjerNår" />
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
