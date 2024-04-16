import { ExclamationmarkIcon, PersonPregnantIcon, StethoscopeIcon } from '@navikt/aksel-icons';
import { ContextDataType, useContextGetData } from 'appData/PlanleggerDataContext';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage, useIntl } from 'react-intl';
import { Arbeidsstatus } from 'types/Arbeidssituasjon';
import { erBarnetAdoptert } from 'types/Barnet';
import { Situasjon, finnAnnenPartTekst } from 'types/HvemPlanlegger';

import { BodyLong, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

const UforutsetteEndringer: React.FunctionComponent = () => {
    return (
        <ExpansionCard aria-label=".">
            <ExpansionCard.Header>
                <HStack gap="10" align="center">
                    <div>
                        <IconCircleWrapper color="green" size="large">
                            <ExclamationmarkIcon height={22} width={22} fontSize="1.5rem" />
                        </IconCircleWrapper>
                    </div>
                    <div>
                        <ExpansionCard.Title size="medium">
                            <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer" />
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
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const erFar = hvemPlanlegger.type === Situasjon.FAR;
    const antallBarn = barnet.antallBarn;

    const morHarIkkeRett =
        arbeidssituasjon.status === Arbeidsstatus.INGEN || arbeidssituasjon.status === Arbeidsstatus.UFØR;
    // TODO: endre fra erFar til kun far har rett

    return (
        <>
            <VStack gap="5">
                <HStack gap="5" align="start" wrap={false} justify="space-between">
                    <div>
                        <IconCircleWrapper color="lightBlue" size="medium">
                            <StethoscopeIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" />
                        </IconCircleWrapper>
                    </div>
                    <div>
                        <Heading size="small">
                            {erFar ? (
                                <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk.Far" />
                            ) : (
                                <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk" />
                            )}
                        </Heading>

                        <BodyLong>
                            {erFar ? (
                                <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk.TekstFar" />
                            ) : (
                                <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManBlirSyk.Tekst" />
                            )}
                        </BodyLong>
                    </div>
                </HStack>
                {!morHarIkkeRett && (
                    <>
                        {!erBarnetAdoptert(barnet) && (
                            <HStack gap="5" align="start" wrap={false} justify="space-between">
                                <div>
                                    <IconCircleWrapper color="lightBlue" size="medium">
                                        <StethoscopeIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" />
                                    </IconCircleWrapper>
                                </div>
                                <div>
                                    <Heading size="small">
                                        <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk" />
                                    </Heading>
                                    <BodyLong>
                                        <FormattedMessage
                                            id="UforutsetteEndringer.UforutsetteEndringer.HvisMorBlirSyk.Tekst"
                                            values={{ antallBarn, hvem: finnAnnenPartTekst(intl, hvemPlanlegger) }}
                                        />
                                    </BodyLong>
                                </div>
                            </HStack>
                        )}
                    </>
                )}

                <HStack gap="5" align="start" wrap={false} justify="space-between">
                    <div>
                        <IconCircleWrapper color="lightBlue" size="medium">
                            <PersonPregnantIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" />
                        </IconCircleWrapper>
                    </div>
                    <div>
                        <Heading size="small">
                            <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManFårNyttBarnFørTreÅr" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManFårNyttBarnFørTreÅr.Tekst" />
                        </BodyLong>
                    </div>
                </HStack>
            </VStack>
        </>
    );
};
export default UforutsetteEndringer;
