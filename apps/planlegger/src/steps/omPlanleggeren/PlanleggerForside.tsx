import { CalendarIcon, ClockIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { LocaleAll } from '@navikt/fp-types';
import { GreenHeading, IconCircleWrapper, LanguageToggleNew, Page } from '@navikt/fp-ui';

import styles from './planleggerForside.module.css';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    children: React.ReactElement | React.ReactElement[];
}

const PlanleggerForside: React.FunctionComponent<Props> = ({ locale, changeLocale, children }) => (
    <Page
        header={
            <>
                <Show below="md">
                    <GreenHeading isDarkGreen>
                        <VStack gap="4" align="center">
                            <div className={styles.languageToggle}>
                                <LanguageToggleNew locale={locale} changeLocale={changeLocale} />
                            </div>
                            <IconCircleWrapper color="darkGreen" size="xl">
                                <CalendarIcon height={28} width={28} fontSize="1.5rem" aria-hidden />
                            </IconCircleWrapper>
                            <VStack gap="1" align="center">
                                <Heading size="large">
                                    <FormattedMessage id="PlanleggerForside.Tittel" />
                                </Heading>
                                <HStack gap="2" align="center">
                                    <ClockIcon aria-hidden />
                                    <BodyShort>
                                        <FormattedMessage id="PlanleggerForside.Label" />
                                    </BodyShort>
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
                                <Heading size="large">
                                    <FormattedMessage id="PlanleggerForside.Tittel" />
                                </Heading>
                                <HStack gap="2" align="center">
                                    <ClockIcon aria-hidden />
                                    <BodyShort>
                                        <FormattedMessage id="PlanleggerForside.Label" />
                                    </BodyShort>
                                </HStack>
                            </VStack>
                        </VStack>
                    </GreenHeading>
                </Show>
            </>
        }
    >
        {children}
    </Page>
);

export default PlanleggerForside;
