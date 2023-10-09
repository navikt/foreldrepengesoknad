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
    Link,
    VStack,
} from '@navikt/ds-react';
import { LanguageToggle, Locale, useDocumentTitle } from '@navikt/fp-common';

import { lenker } from 'fpcommon/lenker';
import ContentWrapper from 'fpcommon/components/ContentWrapper';
import useEsNavigator from 'appData/useEsNavigator';

export interface Props {
    onChangeLocale: (locale: Locale) => void;
    locale: Locale;
    startSøknad: (start: boolean) => void;
    erVelkommen: boolean;
}

const Velkommen: FunctionComponent<Props> = ({ locale, onChangeLocale, startSøknad, erVelkommen }) => {
    const intl = useIntl();

    useDocumentTitle(intl.formatMessage({ id: 'Velkommen.Dokumenttittel' }));

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
                <VStack gap="4">
                    <Heading size="large">
                        <FormattedMessage id={'Søknad.Pageheading'} />
                    </Heading>
                    <VStack gap="10">
                        <GuidePanel poster>
                            <FormattedMessage id="Velkommen.Ingress" />
                            <ul>
                                <li>
                                    <FormattedMessage id={'Velkommen.Bobletekst.Del1'} />
                                </li>
                                <li>
                                    <FormattedMessage id={'Velkommen.Bobletekst.Del2'} />
                                </li>
                            </ul>
                        </GuidePanel>
                        <Alert variant="info">
                            <VStack gap="5">
                                <FormattedMessage id="Velkommen.Veiviser" />
                                <a className="lenke" rel="noopener noreferrer" href={lenker.veiviser} target="_blank">
                                    <FormattedMessage id={'Velkommen.Veiviser.Lenke'} />
                                </a>
                            </VStack>
                        </Alert>
                        <ConfirmationPanel
                            label={intl.formatMessage({ id: 'Velkommen.Samtykke' })}
                            onChange={toggleCheck}
                            checked={isChecked}
                            error={
                                isError &&
                                !isChecked &&
                                intl.formatMessage({ id: 'Velkommen.Validering.BekreftLestOgForståttRettigheter' })
                            }
                        >
                            <VStack gap="5">
                                <BodyShort>
                                    <HStack gap="1">
                                        <FormattedMessage id="Velkommen.Plikter.ApneLabel" />
                                        <Link
                                            href={lenker.plikter}
                                            target="_blank"
                                            style={{ color: 'var(--a-text-action)' }}
                                        >
                                            <FormattedMessage id="Velkommen.LestOgForstått.Link" />
                                        </Link>
                                    </HStack>
                                </BodyShort>
                                <BodyShort>
                                    <FormattedMessage id="Velkommen.KunEnStønad" />
                                </BodyShort>
                            </VStack>
                        </ConfirmationPanel>
                        <HStack justify="center">
                            <Button type="button" onClick={bekreft}>
                                <FormattedMessage id="Velkommen.StartSøknad" />
                            </Button>
                        </HStack>
                    </VStack>
                </VStack>
            </ContentWrapper>
        </>
    );
};

export default Velkommen;
