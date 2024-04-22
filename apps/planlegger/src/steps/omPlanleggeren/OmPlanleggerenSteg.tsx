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
    const navigator = usePlanleggerNavigator(locale);

    return (
        <PlanleggerForside locale={locale} changeLocale={changeLocale}>
            <VStack gap={{ xs: '3', sm: '10' }}>
                <BodyShort size="large">
                    <FormattedMessage id="OmPlanleggerenSteg.Ingress" />
                </BodyShort>
                <VStack gap={{ xs: '8', sm: '20' }}>
                    <VStack gap={{ xs: '2', sm: '5' }}>
                        <Heading level="2" size="xsmall">
                            <FormattedMessage id="OmPlanleggerenSteg.Underoverskrift" />
                        </Heading>
                        <HStack gap="4" align="center" wrap={false}>
                            <IconCircleWrapper color="green" size="medium">
                                <QuestionmarkIcon width="24" height="25" aria-hidden />
                            </IconCircleWrapper>
                            <BodyShort>
                                <FormattedMessage id="OmPlanleggerenSteg.Trinn1" />
                            </BodyShort>
                        </HStack>
                        <HStack gap="4" align="center" wrap={false}>
                            <IconCircleWrapper color="green" size="medium">
                                <CalendarIcon width="24" height="25" aria-hidden />
                            </IconCircleWrapper>
                            <BodyShort>
                                <FormattedMessage id="OmPlanleggerenSteg.Trinn2" />
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
                            <FormattedMessage id="OmPlanleggerenSteg.Start.Planlegger" />
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
