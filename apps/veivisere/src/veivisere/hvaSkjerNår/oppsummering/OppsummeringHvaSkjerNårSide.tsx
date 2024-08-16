import { QuestionmarkIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { BodyShort, ExpansionCard, HStack, Heading, VStack } from '@navikt/ds-react';

import { DDMMMMYYY_DATE_FORMAT } from '@navikt/fp-constants';
import { BluePanel, IconCircleWrapper } from '@navikt/fp-ui';

import VeiviserPage from '../../felles/VeiviserPage';
import { HvaSkjerNårSituasjon } from '../situasjon/SituasjonSide';

interface Props {
    hvaSkjerNårSituasjon: HvaSkjerNårSituasjon;
}
const finnHvemSomPlanlegger = (hvaSkjerNårSituasjon: HvaSkjerNårSituasjon) => {
    if (hvaSkjerNårSituasjon.situasjon === 'morOgFar') {
        return 'Mor og far';
    }
    if (hvaSkjerNårSituasjon.situasjon === 'morOgMedmor') {
        return 'Mor og medmor';
    }
    if (hvaSkjerNårSituasjon.situasjon === 'farOgFar') {
        return 'Far og far';
    }
    if (hvaSkjerNårSituasjon.situasjon === 'kunMor') {
        return 'Mor';
    }
    if (hvaSkjerNårSituasjon.situasjon === 'kunFarEllerMedmor') {
        return 'Far/medmor';
    }
    if (hvaSkjerNårSituasjon.situasjon === 'aleneomsorg') {
        return 'Jeg';
    }
    return 'undefined';
};
const OppsummeringHvaSkjerNårSide: React.FunctionComponent<Props> = ({ hvaSkjerNårSituasjon }) => {
    const intl = useIntl();
    const { ref } = useScrollBehaviour();
    const { situasjon, fødselsdato, termindato } = hvaSkjerNårSituasjon;
    const erAleneforsørger = situasjon === 'aleneomsorg' || situasjon === 'kunMor' || situasjon === 'kunFarEllerMedmor';
    return (
        <>
            <VeiviserPage ref={ref} label={intl.formatMessage({ id: 'OppsummeringFpEllerEsSide.Oppsummering' })}>
                <VStack gap="8">
                    <ExpansionCard aria-label="" size="small">
                        <ExpansionCard.Header>
                            <HStack gap="6" align="center" wrap={false}>
                                <IconCircleWrapper size="medium" color="green">
                                    <QuestionmarkIcon height={24} width={24} fontSize="1.5rem" aria-hidden />
                                </IconCircleWrapper>
                                <ExpansionCard.Title size="small">
                                    <FormattedMessage id="OppsummeringSide.Svar" values={{ erAleneforsørger }} />
                                </ExpansionCard.Title>
                            </HStack>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <VStack gap="4">
                                <Heading size="xsmall">
                                    <FormattedMessage
                                        id="OppsummeringSide.Hvem"
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
                                                    id="OppsummeringSide.Termin"
                                                    values={{
                                                        termindato: dayjs(termindato).format(DDMMMMYYY_DATE_FORMAT),
                                                    }}
                                                />
                                            </BodyShort>
                                        )}
                                        {fødselsdato && (
                                            <BodyShort>
                                                <FormattedMessage
                                                    id="OppsummeringSide.Fødselsdato"
                                                    values={{
                                                        fødselsdato: dayjs(fødselsdato).format(DDMMMMYYY_DATE_FORMAT),
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
        </>
    );
};

export default OppsummeringHvaSkjerNårSide;
