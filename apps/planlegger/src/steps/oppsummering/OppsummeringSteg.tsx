import { ArrowLeftIcon, CalendarIcon, TasklistStartIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import OppgittInformasjon from 'components/expansionCard/OppgittInformasjon';
import HvorMyeIkon from 'components/ikoner/HvorMyeIkon';
import IconCircle from 'components/ikoner/IconCircle';
import Infoboks from 'components/infoboks/Infoboks';
import OversiktKalender from 'components/kalender/OversiktKalender';
import OppsummeringHeader from 'components/oppsummeringPage/OppsummeringHeader';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { ArbeidssituasjonEnum } from 'types/Arbeidssituasjon';
import { isAlene } from 'types/HvemPlanlegger';
import { TilgjengeligeStønadskontoerDTO } from 'types/TilgjengeligeStønadskontoerDTO';
import { mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto } from 'utils/stønadskontoer';

import { Alert, BodyLong, Box, Button, ExpansionCard, HStack, Heading, Link, Loader, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { notEmpty } from '@navikt/fp-validation';

import HvaSkjerNårIkon from '../../components/ikoner/HvaSkjerNårIkon';
import styles from './oppsummering.module.css';

interface Props {
    stønadskontoer?: TilgjengeligeStønadskontoerDTO;
}

const Oppsummering: FunctionComponent<Props> = ({ stønadskontoer }) => {
    const navigator = usePlanleggerNavigator();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const fordeling = useContextGetData(ContextDataType.FORDELING);
    const hvorLangPeriode = useContextGetData(ContextDataType.HVOR_LANG_PERIODE);
    const erAleneforsørger = isAlene(hvemPlanlegger);
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const harRettEllerIkke = () => {
        if (
            arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.INGEN ||
            (arbeidssituasjon.arbeidssituasjon === ArbeidssituasjonEnum.UFØR &&
                arbeidssituasjon.arbeidssituasjonAnnenPart === false)
        ) {
            return false;
        }
        return true;
    };
    const harRett = harRettEllerIkke();

    if (!stønadskontoer) {
        return <Loader />;
    }

    const selectedKonto = hvorLangPeriode
        ? mapTilgjengeligStønadskontoDTOToTilgjengeligStønadskonto(stønadskontoer[hvorLangPeriode.dekningsgrad])
        : undefined;

    //TODO: dra ut expansioncards til egne komponenter
    //TODO: bruk input data til å vise riktig i kalenderen
    return (
        <div>
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

                    {selectedKonto && (
                        <VStack gap="5">
                            {harRett && (
                                <ExpansionCard aria-label="">
                                    <ExpansionCard.Header>
                                        <HStack gap="5" align="center">
                                            <IconCircle size="large" color="green">
                                                <CalendarIcon height={28} width={28} fontSize="1.5rem" />
                                            </IconCircle>
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
                                        <OversiktKalender
                                            valgtStønadskonto={selectedKonto}
                                            omBarnet={barnet}
                                            fellesperiodefordeling={fordeling?.fellesperiodefordeling}
                                        />
                                    </ExpansionCard.Content>
                                </ExpansionCard>
                            )}
                            <OppgittInformasjon stønadskontoer={stønadskontoer} />
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
        </div>
    );
};
export default Oppsummering;
