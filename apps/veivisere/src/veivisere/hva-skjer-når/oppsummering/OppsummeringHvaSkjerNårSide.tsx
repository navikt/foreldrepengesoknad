import { QuestionmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { BodyShort, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

import { BluePanel, IconCircleWrapper } from '@navikt/fp-ui';

import VeiviserPage from '../../felles/VeiviserPage';
import { HvaSkjerNårSituasjon } from '../situasjon/SituasjonSide';

interface Props {
    hvaSkjerNårSituasjon: HvaSkjerNårSituasjon;
}
const finnHvemSomPlanlegger = (hvaSkjerNårSituasjon: HvaSkjerNårSituasjon) => {
    if (hvaSkjerNårSituasjon.situasjon === 'morOgFar') {
        return <FormattedMessage id="HvaSkjerNår.OppsummeringSide.MorOgFar" />;
    }
    if (hvaSkjerNårSituasjon.situasjon === 'morOgMedmor') {
        return <FormattedMessage id="HvaSkjerNår.OppsummeringSide.MorOgMedmor" />;
    }
    if (hvaSkjerNårSituasjon.situasjon === 'farOgFar') {
        return <FormattedMessage id="HvaSkjerNår.OppsummeringSide.FarOgFar" />;
    }
    if (hvaSkjerNårSituasjon.situasjon === 'kunMor') {
        return <FormattedMessage id="HvaSkjerNår.OppsummeringSide.Mor" />;
    }
    if (hvaSkjerNårSituasjon.situasjon === 'kunFarEllerMedmor') {
        return <FormattedMessage id="HvaSkjerNår.OppsummeringSide.FarEllerMedmor" />;
    }
    if (hvaSkjerNårSituasjon.situasjon === 'aleneomsorg') {
        return <FormattedMessage id="HvaSkjerNår.OppsummeringSide.Jeg" />;
    }
    return 'undefined';
};
const OppsummeringHvaSkjerNårSide: React.FunctionComponent<Props> = ({ hvaSkjerNårSituasjon }) => {
    const intl = useIntl();
    const { ref } = useScrollBehaviour();
    const { situasjon, fødselsdato, termindato } = hvaSkjerNårSituasjon;
    const erAleneforsørger = situasjon === 'aleneomsorg' || situasjon === 'kunMor' || situasjon === 'kunFarEllerMedmor';
    return (
        <VeiviserPage ref={ref} label={intl.formatMessage({ id: 'OppsummeringHvaSkjerNårSide.Oppsummering' })}>
            <VStack gap="8">
                <ExpansionCard aria-label="" size="small">
                    <ExpansionCard.Header>
                        <HStack gap="6" align="center" wrap={false}>
                            <IconCircleWrapper size="medium" color="green">
                                <QuestionmarkIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                            <ExpansionCard.Title size="small">
                                <FormattedMessage
                                    id="HvaSkjerNår.OppsummeringSide.Svar"
                                    values={{ erAleneforsørger }}
                                />
                            </ExpansionCard.Title>
                        </HStack>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="4">
                            <Heading size="xsmall">
                                <FormattedMessage
                                    id="HvaSkjerNår.OppsummeringSide.Hvem"
                                    values={{
                                        hvem: finnHvemSomPlanlegger(hvaSkjerNårSituasjon),
                                    }}
                                />
                            </Heading>
                            <BluePanel isDarkBlue>
                                <VStack gap="4">
                                    {termindato && (
                                        <BodyShort>
                                            <FormattedMessage
                                                id="HvaSkjerNår.OppsummeringSide.Termin"
                                                values={{
                                                    termindato: intl.formatDate(termindato, {
                                                        day: '2-digit',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    }),
                                                }}
                                            />
                                        </BodyShort>
                                    )}
                                    {fødselsdato && (
                                        <BodyShort>
                                            <FormattedMessage
                                                id="HvaSkjerNår.OppsummeringSide.Fødselsdato"
                                                values={{
                                                    fødselsdato: intl.formatDate(fødselsdato, {
                                                        day: '2-digit',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    }),
                                                }}
                                            />
                                        </BodyShort>
                                    )}
                                </VStack>
                            </BluePanel>
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>
            </VStack>
        </VeiviserPage>
    );
};

export default OppsummeringHvaSkjerNårSide;
