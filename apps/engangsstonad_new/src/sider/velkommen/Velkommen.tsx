import { FunctionComponent, useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    Alert,
    BodyShort,
    Button,
    ConfirmationPanel,
    GuidePanel,
    HStack,
    Heading,
    ReadMore,
    VStack,
} from '@navikt/ds-react';
import { LanguageToggle, Locale, useDocumentTitle } from '@navikt/fp-common';

import { lenker } from 'fpcommon/lenker';
import ContentWrapper from 'fpcommon/components/ContentWrapper';
import Plikter from './Plikter';
import useEsNavigator from '../../useEsNavigator';

export interface Props {
    onChangeLocale: (locale: Locale) => void;
    locale: Locale;
    startSøknad: (start: boolean) => void;
    erVelkommen: boolean;
}

const Velkommen: FunctionComponent<Props> = ({ locale, onChangeLocale, startSøknad, erVelkommen }) => {
    const intl = useIntl();
    useDocumentTitle(intl.formatMessage({ id: 'velkommen.standard.dokumenttittel' }));

    const navigator = useEsNavigator();

    const [isError, setIsError] = useState(false);
    const [isChecked, setChecked] = useState(erVelkommen);
    const toggleCheck = useCallback(() => setChecked((state) => !state), []);

    const bekreft = useCallback(() => {
        if (!isChecked) {
            setIsError(true);
        } else {
            startSøknad(true);
            navigator.goToNextDefaultStep();
        }
    }, [isChecked, startSøknad]);

    const toggleLocale = useCallback((l: Locale) => onChangeLocale(l), []);

    return (
        <>
            <LanguageToggle locale={locale} availableLocales={['en', 'nb', 'nn']} toggle={toggleLocale} />
            <ContentWrapper>
                <VStack gap="10">
                    <HStack justify="center">
                        <Heading size="large">
                            <FormattedMessage id={'velkommen.standard.velkommentittel'} />
                        </Heading>
                    </HStack>
                    <GuidePanel poster>
                        <FormattedMessage id="velkommen.standard.ingress" />
                        <ul>
                            <li>
                                <FormattedMessage id={'velkommen.standard.bobletekst.del1'} />
                            </li>
                            <li>
                                <FormattedMessage id={'velkommen.standard.bobletekst.del2'} />
                            </li>
                        </ul>
                    </GuidePanel>
                    <Alert variant="info">
                        <VStack gap="5">
                            <FormattedMessage id="velkommen.text.veiviser" />
                            <a className="lenke" rel="noopener noreferrer" href={lenker.veiviser} target="_blank">
                                <FormattedMessage id={'velkommen.text.veiviser.lenke'} />
                            </a>
                        </VStack>
                    </Alert>
                    <ConfirmationPanel
                        label={intl.formatMessage({ id: 'velkommen.text.samtykke' })}
                        onChange={toggleCheck}
                        checked={isChecked}
                        error={
                            isError &&
                            !isChecked &&
                            intl.formatMessage({ id: 'valideringsfeil.velkommen.bekreftLestOgForståttRettigheter' })
                        }
                    >
                        <VStack gap="5">
                            <FormattedMessage id="velkommen.text.samtykkeIntro" />
                            <ReadMore header={intl.formatMessage({ id: 'velkommen.text.plikter.apneLabel' })}>
                                <Plikter />
                            </ReadMore>
                            <BodyShort>
                                <FormattedMessage id="velkommen.text.kunEnStønad" />
                            </BodyShort>
                        </VStack>
                    </ConfirmationPanel>
                    <HStack justify="center">
                        <Button type="button" onClick={bekreft}>
                            <FormattedMessage id="velkommen.button.startSøknad" />
                        </Button>
                    </HStack>
                </VStack>
            </ContentWrapper>
        </>
    );
};

export default Velkommen;
