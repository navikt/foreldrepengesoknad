import { ArrowRightIcon } from '@navikt/aksel-icons';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import LanguageToggle from 'components/LanguageToggle';
import Kalender from 'components/ikoner/Kalender';
import Spørsmålstegn from 'components/ikoner/Spørsmålstegn';
import PlanleggerFrontpage from 'components/planleggerPage/PlanleggerFrontpage';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, Heading, Show, VStack } from '@navikt/ds-react';

import { LocaleAll } from '@navikt/fp-types';

import styles from './omPlanleggerenSteg.module.css';

interface Props {
    locale: LocaleAll;
    changeLocale: (locale: LocaleAll) => void;
}

const OmPlanleggerenSteg: FunctionComponent<Props> = ({ locale, changeLocale }) => {
    const navigator = usePlanleggerNavigator();

    return (
        <PlanleggerFrontpage locale={locale} changeLocale={changeLocale}>
            <VStack gap="10">
                <BodyShort size="large">
                    <FormattedMessage id="om.ingress" />
                </BodyShort>
                <VStack gap="20">
                    <VStack gap="5">
                        <Heading level="2" size="xsmall">
                            <FormattedMessage id="om.underoverskrift" />
                        </Heading>
                        <HStack gap="4" align="center">
                            <Spørsmålstegn />
                            <BodyShort>
                                <FormattedMessage id="om.trinn1" />
                            </BodyShort>
                        </HStack>
                        <HStack gap="4" align="center">
                            <Kalender />
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
        </PlanleggerFrontpage>
    );
};

export default OmPlanleggerenSteg;
