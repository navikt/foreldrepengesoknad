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
import { Situasjon } from 'types/Søkersituasjon';

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
                            <FormattedMessage id="OmÅTilpassePlanen.Oversikt.OmÅTilpassePlanen" />
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
    const erFar = hvemPlanlegger.type === Situasjon.FAR;
    // TODO: endre fra erFar til kun far har rett
    return (
        <>
            <VStack gap="5">
                <BodyLong>
                    <FormattedMessage id="OmÅTilpassePlanen.Tekst" />
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
                                    <FormattedMessage id="OmÅTilpassePlanen.FørTermin" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="OmÅTilpassePlanen.FørTermin.Tekst" />
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
                                    <FormattedMessage id="OmÅTilpassePlanen.DeFørsteSeksUkene" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="OmÅTilpassePlanen.DeFørsteSeksUkene.Tekst" />
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
                                    <FormattedMessage id="OmÅTilpassePlanen.LeggeTilFerie" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="OmÅTilpassePlanen.LeggeTilFerie.Tekst" />
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
                                    <FormattedMessage id="OmÅTilpassePlanen.JobbeSamtidig" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="OmÅTilpassePlanen.JobbeSamtidig.Tekst" />
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
                                    <FormattedMessage id="OmÅTilpassePlanen.PermisjonSamtidig" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="OmÅTilpassePlanen.PermisjonSamtidig.Tekst" />
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
                                    <FormattedMessage id="OmÅTilpassePlanen.ToUkerRundtFødsel" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="OmÅTilpassePlanen.ToUkerRundtFødsel.Tekst" />
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
                                    <FormattedMessage id="OmÅTilpassePlanen.LeggeTilFerie" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="OmÅTilpassePlanen.LeggeTilFerie.TekstFar" />
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
