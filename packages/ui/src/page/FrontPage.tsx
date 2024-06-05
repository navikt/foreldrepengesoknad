import { ArrowRightIcon, CalendarIcon, ClockIcon } from '@navikt/aksel-icons';
import { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { LocaleAll } from '@navikt/fp-types';

import GreenHeading from '../boxes/GreenHeading';
import IconCircleWrapper from '../iconCircle/IconCircleWrapper';
import LanguageToggle from '../languageToggleNew/LanguageToggle';
import Page from './Page';
import styles from './frontPage.module.css';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    children?: ReactElement;
    titleLabel: string;
    minutesLabel: string;
    innholdLabel: string;
    goToNextDefaultStep: () => void;
}

const FrontPage: React.FunctionComponent<Props> = ({
    locale,
    changeLocale,
    children,
    titleLabel,
    minutesLabel,
    innholdLabel,
    goToNextDefaultStep,
}) => (
    <Page
        useLargerBorderRadius
        header={
            <>
                <Show below="md">
                    <GreenHeading isDarkGreen>
                        <VStack gap="4" align="center">
                            <div className={styles.languageToggle}>
                                <LanguageToggle locale={locale} changeLocale={changeLocale} />
                            </div>
                            <IconCircleWrapper color="darkGreen" size="xl">
                                <CalendarIcon height={28} width={28} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                            <VStack gap="1" align="center">
                                <Heading size="large">{titleLabel}</Heading>
                                <HStack gap="2" align="center">
                                    <ClockIcon aria-hidden />
                                    <BodyShort>{minutesLabel}</BodyShort>
                                </HStack>
                            </VStack>
                        </VStack>
                    </GreenHeading>
                </Show>
                <Show above="md">
                    <GreenHeading>
                        <VStack gap="4">
                            <IconCircleWrapper color="darkGreen" size="xl">
                                <CalendarIcon height={35} width={35} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                            <VStack gap="1">
                                <Heading size="large">{titleLabel}</Heading>
                                <HStack gap="2" align="center">
                                    <ClockIcon aria-hidden />
                                    <BodyShort>{minutesLabel}</BodyShort>
                                </HStack>
                            </VStack>
                        </VStack>
                    </GreenHeading>
                </Show>
            </>
        }
    >
        <VStack gap={{ xs: '3', sm: '10' }}>
            <BodyShort size="large">{innholdLabel}</BodyShort>
            <VStack gap={{ xs: '8', sm: '20' }}>
                <VStack gap={{ xs: '2', sm: '5' }}>{children}</VStack>
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
            </VStack>
            <Show above="md" asChild>
                <HStack justify="center">
                    <div className={styles.languageToggle}>
                        <LanguageToggle locale={locale} changeLocale={changeLocale} />
                    </div>
                </HStack>
            </Show>
        </VStack>
    </Page>
);

export default FrontPage;
