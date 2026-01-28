import { ArrowRightIcon, CalendarIcon, ClockIcon } from '@navikt/aksel-icons';
import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { BlueHeading } from '../../boxes/BlueHeading';
import { IconCircleWrapper } from '../../icon-circle/IconCircleWrapper';
import { Page } from '../../page/Page';

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
                        <VStack gap="space-16" align="center">
                            <IconCircleWrapper color="blue" size="xl">
                                {icon}
                                {!icon && <CalendarIcon height={28} width={28} fontSize="1.5rem" aria-hidden />}
                            </IconCircleWrapper>
                            <VStack gap="space-4" align="center">
                                <Heading size="large">{titleLabel}</Heading>
                                <HStack gap="space-8" align="center">
                                    <ClockIcon aria-hidden />
                                    <BodyShort>{minutesLabel}</BodyShort>
                                </HStack>
                            </VStack>
                        </VStack>
                    </BlueHeading>
                </Show>
                <Show above="md">
                    <BlueHeading>
                        <VStack gap="space-16">
                            <IconCircleWrapper color="blue" size="xl">
                                {icon}
                                {!icon && <CalendarIcon height={35} width={35} fontSize="1.5rem" aria-hidden />}
                            </IconCircleWrapper>
                            <VStack gap="space-4">
                                <Heading size="large">{titleLabel}</Heading>
                                <HStack gap="space-8" align="center">
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
        <VStack gap={{ xs: 'space-12', sm: 'space-40' }}>
            <BodyShort size="large">{innholdLabel}</BodyShort>
            <VStack
                gap={{
                    xs: childrenBelowStartButton ? 'space-24' : 'space-36',
                    sm: childrenBelowStartButton ? 'space-40' : 'space-80',
                }}
            >
                {!childrenBelowStartButton && <VStack gap={{ xs: 'space-8', sm: 'space-20' }}>{children}</VStack>}
                <HStack justify="center">
                    <Button
                        onClick={goToNextDefaultStep}
                        icon={<ArrowRightIcon aria-hidden height={24} width={24} />}
                        iconPosition="right"
                        className="w-[100px] max-[768px]:w-full"
                        autoFocus
                    >
                        <FormattedMessage id="FrontPage.Start" />
                    </Button>
                </HStack>
                {childrenBelowStartButton && <VStack gap={{ xs: 'space-8', sm: 'space-20' }}>{children}</VStack>}
            </VStack>
        </VStack>
    </Page>
);
