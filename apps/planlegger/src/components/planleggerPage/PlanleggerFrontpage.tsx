import { BabyWrappedIcon, ClockIcon } from '@navikt/aksel-icons';
import GreenHeading from 'components/GreenHeading';
import LanguageToggle from 'components/LanguageToggle';
import { FormattedMessage } from 'react-intl';

import { BodyShort, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { LocaleAll } from '@navikt/fp-types';

import styles from './planleggerFrontpage.module.css';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
    children: React.ReactElement | React.ReactElement[];
}

const PlanleggerFrontpage: React.FunctionComponent<Props> = ({ locale, changeLocale, children }) => {
    return (
        <div className={styles.background}>
            <div className={styles.header}>
                <Show below="md">
                    <GreenHeading useDarkGreen>
                        <VStack gap="4" align="center">
                            <div className={styles.languageToggle}>
                                <LanguageToggle locale={locale} changeLocale={changeLocale} />
                            </div>
                            <BabyWrappedIcon height={45} width={45} />
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
                            <BabyWrappedIcon height={45} width={45} />
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
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default PlanleggerFrontpage;
