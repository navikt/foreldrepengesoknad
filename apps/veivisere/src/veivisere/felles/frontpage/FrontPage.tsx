import { ArrowRightIcon, CalendarIcon, ClockIcon } from '@navikt/aksel-icons';
import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { LocaleAll } from '@navikt/fp-types';
import { BlueHeading, IconCircleWrapper, Page } from '@navikt/fp-ui';

import styles from './frontPage.module.css';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    children?: ReactElement | ReactElement[];
    titleLabel: string;
    minutesLabel: string;
    innholdLabel: string;
    goToNextDefaultStep: () => void;
    icon?: ReactElement;
    childrenBelowStartButton?: boolean;
}

const FrontPage: React.FunctionComponent<Props> = ({
    children,
    titleLabel,
    minutesLabel,
    innholdLabel,
    goToNextDefaultStep,
    icon,
    childrenBelowStartButton = false,
}) => (
    <Page
        header={
            <>
                <Show below="md">
                    <BlueHeading isDarkBlue>
                        <VStack gap="4" align="center">
                            {/* <div className={styles.languageToggle}>
                                <LanguageToggleNew locale={locale} changeLocale={changeLocale} />
                            </div> */}
                            <IconCircleWrapper color="darkBlue" size="xl">
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
                            <IconCircleWrapper color="darkBlue" size="xl">
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
            {/* <Show above="md" asChild>
                <HStack justify="center">
                    <div className={styles.languageToggle}>
                        <LanguageToggleNew locale={locale} changeLocale={changeLocale} />
                    </div>
                </HStack>
            </Show> */}
        </VStack>
    </Page>
);

export default FrontPage;
