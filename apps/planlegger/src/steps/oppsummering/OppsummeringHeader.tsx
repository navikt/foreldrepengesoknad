import { CheckmarkCircleIcon, CheckmarkIcon } from '@navikt/aksel-icons';
import GreenHeading from 'components/boxes/GreenHeading';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import PlanleggerStep from 'components/page/PlanleggerPage';
import { FormattedMessage } from 'react-intl';

import { HStack, Heading, Show } from '@navikt/ds-react';

interface Props {
    children: React.ReactElement | React.ReactElement[];
}

const OppsummeringHeader: React.FunctionComponent<Props> = ({ children }) => (
    <PlanleggerStep
        useLargerBorderRadius
        header={
            <>
                <Show below="md">
                    <GreenHeading isDarkGreen>
                        <HStack gap="4" align="center">
                            <IconCircleWrapper color="darkGreen" size="xl">
                                <CheckmarkCircleIcon height={28} width={28} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                            <Heading size="medium">
                                <FormattedMessage id="OppsummeringHeader.Tittel" />
                            </Heading>
                        </HStack>
                    </GreenHeading>
                </Show>
                <Show above="md">
                    <GreenHeading>
                        <HStack gap="4" align="center">
                            <IconCircleWrapper color="darkGreen" size="xl">
                                <CheckmarkIcon height={40} width={40} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                            <Heading size="medium">
                                <FormattedMessage id="OppsummeringHeader.Tittel" />
                            </Heading>
                        </HStack>
                    </GreenHeading>
                </Show>
            </>
        }
    >
        {children}
    </PlanleggerStep>
);

export default OppsummeringHeader;
