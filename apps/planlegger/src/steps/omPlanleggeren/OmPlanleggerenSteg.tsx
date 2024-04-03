import { ArrowRightIcon, CalendarIcon, QuestionmarkIcon } from '@navikt/aksel-icons';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import LanguageToggle from 'components/language/LanguageToggle';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { LocaleAll } from '@navikt/fp-types';

import PlanleggerForside from './PlanleggerForside';
import styles from './omPlanleggerenSteg.module.css';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const OmPlanleggerenSteg: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const navigator = usePlanleggerNavigator();

    return (
        <PlanleggerForside locale={locale} changeLocale={changeLocale}>
            <VStack gap="10">
                <BodyShort size="large">
                    <FormattedMessage id="om.ingress" />
                </BodyShort>
                <VStack gap="20">
                    <VStack gap="5">
                        <Heading level="2" size="xsmall">
                            <FormattedMessage id="om.underoverskrift" />
                        </Heading>
                        <HStack gap="4" align="center" wrap={false}>
                            <IconCircleWrapper color="green" size="medium">
                                <QuestionmarkIcon width="24" height="25" />
                            </IconCircleWrapper>
                            <BodyShort>
                                <FormattedMessage id="om.trinn1" />
                            </BodyShort>
                        </HStack>
                        <HStack gap="4" align="center" wrap={false}>
                            <IconCircleWrapper color="green" size="medium">
                                <CalendarIcon width="24" height="25" />
                            </IconCircleWrapper>
                            <BodyShort>
                                <FormattedMessage id="om.trinn2" />
                            </BodyShort>
                        </HStack>
                    </VStack>
                    <HStack justify="center">
                        <Button
                            onClick={navigator.goToNextDefaultStep}
                            icon={<ArrowRightIcon />}
                            iconPosition="right"
                            className={styles.button}
                            autoFocus
                        >
                            <FormattedMessage id="om.start.planlegger" />
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
        </PlanleggerForside>
    );
};

export default OmPlanleggerenSteg;
