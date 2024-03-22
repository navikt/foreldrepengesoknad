import { CalendarIcon, ClockIcon } from '@navikt/aksel-icons';
import GreenHeading from 'components/boxes/GreenHeading';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import LanguageToggle from 'components/language/LanguageToggle';
import PlanleggerPage from 'components/page/PlanleggerPage';
import { FormattedMessage } from 'react-intl';

import { BodyShort, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { LocaleAll } from '@navikt/fp-types';

import styles from './planleggerForside.module.css';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    children: React.ReactElement | React.ReactElement[];
}

const PlanleggerForside: React.FunctionComponent<Props> = ({ locale, changeLocale, children }) => (
    <PlanleggerPage
        header={
            <>
                <Show below="md">
                    <GreenHeading isDarkGreen>
                        <VStack gap="4" align="center">
                            <div className={styles.languageToggle}>
                                <LanguageToggle locale={locale} changeLocale={changeLocale} />
                            </div>
                            <IconCircleWrapper color="darkGreen" size="xl">
                                <CalendarIcon height={28} width={28} fontSize="1.5rem" />
                            </IconCircleWrapper>
                            <VStack gap="1" align="center">
                                <Heading size="large">
                                    <FormattedMessage id="om.tittel" />
                                </Heading>
                                <HStack gap="2" align="center">
                                    <ClockIcon />
                                    <BodyShort>
                                        <FormattedMessage id="om.label" />
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
                                <CalendarIcon height={35} width={35} fontSize="1.5rem" />
                            </IconCircleWrapper>
                            <VStack gap="1">
                                <Heading size="large">
                                    <FormattedMessage id="om.tittel" />
                                </Heading>
                                <HStack gap="2" align="center">
                                    <ClockIcon />
                                    <BodyShort>
                                        <FormattedMessage id="om.label" />
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
    </PlanleggerPage>
);

export default PlanleggerForside;
