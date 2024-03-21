import {
    BabyWrappedIcon,
    BriefcaseIcon,
    ParasolBeachIcon,
    PencilWritingIcon,
    PersonGroupIcon,
    PersonPregnantIcon,
} from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage } from 'react-intl';
import { isFar } from 'types/HvemPlanlegger';

import { BodyLong, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

const OmÅTilpassePlanen: React.FunctionComponent = () => {
    return (
        <ExpansionCard aria-label="Expansion card">
            <ExpansionCard.Header>
                <HStack gap="10" align="center">
                    <div>
                        <IconCircleWrapper color="green" size="large">
                            <PencilWritingIcon height={22} width={22} fontSize="1.5rem" />
                        </IconCircleWrapper>
                    </div>
                    <div>
                        <ExpansionCard.Title size="medium">
                            <FormattedMessage id="oversikt.omÅTilpassePlanen" />
                        </ExpansionCard.Title>
                    </div>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Innhold />
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

const Innhold = () => {
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const erFar = isFar(hvemPlanlegger);
    // TODO: endre fra erFar til kun far har rett
    return (
        <>
            <VStack gap="5">
                <BodyLong>
                    <FormattedMessage id="oversikt.omÅTilpassePlanen.tekst" />
                </BodyLong>

                {!erFar && (
                    <VStack gap="5">
                        <HStack gap="5" align="start" wrap={false} justify="space-between">
                            <div>
                                <IconCircleWrapper color="lightBlue" size="medium">
                                    <PersonPregnantIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" />
                                </IconCircleWrapper>
                            </div>
                            <div>
                                <Heading size="small">
                                    <FormattedMessage id="oversikt.omÅTilpassePlanen.førTermin" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="oversikt.omÅTilpassePlanen.førTermin.tekst" />
                                </BodyLong>
                            </div>
                        </HStack>
                        <HStack gap="5" align="start" wrap={false} justify="space-between">
                            <div>
                                <IconCircleWrapper color="lightBlue" size="medium">
                                    <BabyWrappedIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" />
                                </IconCircleWrapper>
                            </div>
                            <div>
                                <Heading size="small">
                                    <FormattedMessage id="oversikt.omÅTilpassePlanen.deFørsteSeksUkene" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="oversikt.omÅTilpassePlanen.deFørsteSeksUkene.tekst" />
                                </BodyLong>
                            </div>
                        </HStack>
                        <HStack gap="5" align="start" wrap={false} justify="space-between">
                            <div>
                                <IconCircleWrapper color="lightBlue" size="medium">
                                    <ParasolBeachIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" />
                                </IconCircleWrapper>
                            </div>
                            <div>
                                <Heading size="small">
                                    <FormattedMessage id="oversikt.omÅTilpassePlanen.leggeTilFerie" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="oversikt.omÅTilpassePlanen.leggeTilFerie.tekst" />
                                </BodyLong>
                            </div>
                        </HStack>
                        <HStack gap="5" align="start" wrap={false} justify="space-between">
                            <div>
                                <IconCircleWrapper color="lightBlue" size="medium">
                                    <BriefcaseIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" />
                                </IconCircleWrapper>
                            </div>
                            <div>
                                <Heading size="small">
                                    <FormattedMessage id="oversikt.omÅTilpassePlanen.jobbeSamtidig" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="oversikt.omÅTilpassePlanen.jobbeSamtidig.tekst" />
                                </BodyLong>
                            </div>
                        </HStack>
                        <HStack gap="5" align="start" wrap={false} justify="space-between">
                            <div>
                                <IconCircleWrapper color="lightBlue" size="medium">
                                    <PersonGroupIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" />
                                </IconCircleWrapper>
                            </div>
                            <div>
                                <Heading size="small">
                                    <FormattedMessage id="oversikt.omÅTilpassePlanen.permisjonSamtidig" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="oversikt.omÅTilpassePlanen.permisjonSamtidig.tekst" />
                                </BodyLong>
                            </div>
                        </HStack>
                    </VStack>
                )}
                {erFar && (
                    <VStack gap="5">
                        <HStack gap="5" align="start" wrap={false} justify="space-between">
                            <div>
                                <IconCircleWrapper color="lightBlue" size="medium">
                                    <BabyWrappedIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" />
                                </IconCircleWrapper>
                            </div>
                            <div>
                                <Heading size="small">
                                    <FormattedMessage id="oversikt.omÅTilpassePlanen.toUkerRundtFødsel" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="oversikt.omÅTilpassePlanen.toUkerRundtFødsel.tekst" />
                                </BodyLong>
                            </div>
                        </HStack>
                        <HStack gap="5" align="start" wrap={false} justify="space-between">
                            <div>
                                <IconCircleWrapper color="lightBlue" size="medium">
                                    <ParasolBeachIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" />
                                </IconCircleWrapper>
                            </div>
                            <div>
                                <Heading size="small">
                                    <FormattedMessage id="oversikt.omÅTilpassePlanen.leggeTilFerie" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="oversikt.omÅTilpassePlanen.leggeTilFerie.tekstFar" />
                                </BodyLong>
                            </div>
                        </HStack>
                    </VStack>
                )}
            </VStack>
        </>
    );
};
export default OmÅTilpassePlanen;
