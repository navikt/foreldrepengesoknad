import { CalendarIcon, ClockIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { LocaleAll } from '@navikt/fp-types';
import { BlueHeading, IconCircleWrapper, LanguageToggleNew, Page } from '@navikt/fp-ui';

import styles from './planleggerForside.module.css';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    children: React.ReactElement | React.ReactElement[];
}

export const PlanleggerForside = ({ locale, changeLocale, children }: Props) => (
    <Page
        header={
            <>
                <Show below="md">
                    <BlueHeading>
                        <VStack gap="4" align="center">
                            <div className={styles.languageToggle}>
                                <LanguageToggleNew locale={locale} changeLocale={changeLocale} />
                            </div>
                            <IconCircleWrapper color="lightBlue" size="xl">
                                <CalendarIcon height={44} width={44} fontSize="1.5rem" aria-hidden />
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
                    </BlueHeading>
                </Show>
                <Show above="md">
                    <BlueHeading>
                        <VStack gap="4">
                            <IconCircleWrapper color="lightBlue" size="large">
                                <CalendarIcon height={30} width={30} fontSize="1.5rem" aria-hidden />
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
                    </BlueHeading>
                </Show>
            </>
        }
    >
        {children}
    </Page>
);
