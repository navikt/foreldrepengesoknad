import { ArrowRightIcon, CalendarIcon, ClockIcon } from '@navikt/aksel-icons';
import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { BlueHeading } from '../../boxes/BlueHeading';
import { IconCircleWrapper } from '../../icon-circle/IconCircleWrapper';
import { Page } from '../../page/Page';
import styles from './frontPage.module.css';

interface Props {
    children?: ReactElement | ReactElement[];
    titleLabel: string;
    minutesLabel: string;
    innholdLabel: string;
    goToNextDefaultStep: () => void;
    icon?: ReactElement;
    childrenBelowStartButton?: boolean;
}

export const FrontPage = ({
    children,
    titleLabel,
    minutesLabel,
    innholdLabel,
    goToNextDefaultStep,
    icon,
    childrenBelowStartButton = false,
}: Props) => (
    <Page
        header={
            <>
                <Show below="md">
                    <BlueHeading>
                        <VStack gap="4" align="center">
                            <IconCircleWrapper color="blue" size="xl">
                                {icon}
                                {!icon && <CalendarIcon height={28} width={28} fontSize="1.5rem" aria-hidden />}
                            </IconCircleWrapper>
                            <VStack gap="1" align="center">
                                <Heading size="large">{titleLabel}</Heading>
                                <HStack gap="2" align="center">
                                    <ClockIcon aria-hidden />
                                    <BodyShort>{minutesLabel}</BodyShort>
                                </HStack>
                            </VStack>
                        </VStack>
                    </BlueHeading>
                </Show>
                <Show above="md">
                    <BlueHeading>
                        <VStack gap="4">
                            <IconCircleWrapper color="blue" size="xl">
                                {icon}
                                {!icon && <CalendarIcon height={35} width={35} fontSize="1.5rem" aria-hidden />}
                            </IconCircleWrapper>
                            <VStack gap="1">
                                <Heading size="large">{titleLabel}</Heading>
                                <HStack gap="2" align="center">
                                    <ClockIcon aria-hidden />
                                    <BodyShort>{minutesLabel}</BodyShort>
                                </HStack>
                            </VStack>
                        </VStack>
                    </BlueHeading>
                </Show>
            </>
        }
    >
        <VStack gap={{ xs: '3', sm: '10' }}>
            <BodyShort size="large">{innholdLabel}</BodyShort>
            <VStack gap={{ xs: childrenBelowStartButton ? '6' : '8', sm: childrenBelowStartButton ? '10' : '20' }}>
                {!childrenBelowStartButton && <VStack gap={{ xs: '2', sm: '5' }}>{children}</VStack>}
                <HStack justify="center">
                    <Button
                        onClick={goToNextDefaultStep}
                        icon={<ArrowRightIcon aria-hidden height={24} width={24} />}
                        iconPosition="right"
                        className={styles.button}
                        autoFocus
                    >
                        <FormattedMessage id="FrontPage.Start" />
                    </Button>
                </HStack>
                {childrenBelowStartButton && <VStack gap={{ xs: '2', sm: '5' }}>{children}</VStack>}
            </VStack>
        </VStack>
    </Page>
);
