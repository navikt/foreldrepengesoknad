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
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { erBarnetAdoptert } from 'types/Barnet';
import { finnAnnenPartTekst } from 'types/HvemPlanlegger';

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
    const intl = useIntl();
    const hvemPlanlegger = notEmpty(useContextGetData(ContextDataType.HVEM_PLANLEGGER));
    const arbeidssituasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSSITUASJON));
    const morHarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const antallBarn = barnet.antallBarn;

    return (
        <>
            <VStack gap="5">
                <BodyLong>
                    <FormattedMessage id="OmÅTilpassePlanen.Tekst" />
                </BodyLong>

                {!morHarIkkeRett && (
                    <VStack gap="5">
                        {!erBarnetAdoptert(barnet) && (
                            <>
                                <HStack gap="5" align="start" wrap={false} justify="space-between">
                                    <div>
                                        <IconCircleWrapper color="lightBlue" size="medium">
                                            <PersonPregnantIcon
                                                height={22}
                                                width={22}
                                                fontSize="1.5rem"
                                                color="#0067C5"
                                            />
                                        </IconCircleWrapper>
                                    </div>
                                    <div>
                                        <Heading size="small">
                                            <FormattedMessage id="OmÅTilpassePlanen.FørTermin" />
                                        </Heading>
                                        <BodyLong>
                                            <FormattedMessage
                                                id="OmÅTilpassePlanen.FørTermin.Tekst"
                                                values={{ antallBarn }}
                                            />
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
                                            <FormattedMessage
                                                id="OmÅTilpassePlanen.DeFørsteSeksUkene.Tekst"
                                                values={{
                                                    hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                                }}
                                            />
                                        </BodyLong>
                                    </div>
                                </HStack>
                            </>
                        )}

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
                {morHarIkkeRett && (
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
