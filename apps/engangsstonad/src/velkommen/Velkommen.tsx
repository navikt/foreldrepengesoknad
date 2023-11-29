import { FunctionComponent, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
    BodyShort,
    Button,
    ConfirmationPanel,
    ExpansionCard,
    GuidePanel,
    HStack,
    Heading,
    Link,
    VStack,
} from '@navikt/ds-react';
import { LanguageToggle, useDocumentTitle } from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';
import { LocaleAll } from '@navikt/fp-types';
import { ContentWrapper, useCustomIntl } from '@navikt/fp-ui';

import useEsNavigator from 'appData/useEsNavigator';

export interface Props {
    onChangeLocale: (locale: LocaleAll) => void;
    locale: LocaleAll;
    startSøknad: (start: boolean) => void;
    erVelkommen: boolean;
}

const Velkommen: FunctionComponent<Props> = ({ locale, onChangeLocale, startSøknad, erVelkommen }) => {
    const { i18n } = useCustomIntl();

    useDocumentTitle(i18n('Velkommen.Dokumenttittel'));

    const navigator = useEsNavigator();

    const [isError, setIsError] = useState(false);
    const [isChecked, setChecked] = useState(erVelkommen);

    const bekreft = () => {
        if (!isChecked) {
            setIsError(true);
        } else {
            startSøknad(true);
            navigator.goToNextDefaultStep();
        }
    };

    return (
        <ContentWrapper>
            <VStack gap="10">
                <LanguageToggle
                    locale={locale}
                    availableLocales={['en', 'nb', 'nn']}
                    toggle={(l: LocaleAll) => onChangeLocale(l)}
                    isCleanVersion
                />
                <Heading size="large">
                    <FormattedMessage id={'Søknad.Pageheading'} />
                </Heading>
                <GuidePanel poster>
                    <VStack gap="5">
                        <BodyShort>
                            <FormattedMessage id="Velkommen.Ingress.Del1" />
                        </BodyShort>
                        <BodyShort>
                            <FormattedMessage id="Velkommen.Ingress.Del2" />
                            <Link href={links.farMedmor} target="_blank">
                                <FormattedMessage id="Velkommen.Bobletekst.Del2.link" />
                            </Link>
                        </BodyShort>
                    </VStack>
                    <ul>
                        <li>
                            <FormattedMessage id={'Velkommen.Bobletekst.Del1'} />
                        </li>
                        <li>
                            <FormattedMessage id={'Velkommen.Bobletekst.Del2'} />
                        </li>
                    </ul>
                    <VStack gap="5">
                        <BodyShort>
                            <FormattedMessage id="Velkommen.Ingress.Del3" />
                        </BodyShort>
                        <Link href={links.engangsstonad} target="_blank">
                            <BodyShort>
                                <FormattedMessage id="Velkommen.Ingress.Link" />
                            </BodyShort>
                        </Link>
                    </VStack>
                </GuidePanel>
                <ExpansionCard size="medium" aria-label={i18n('Velkommen.Info.Header')}>
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">
                            <FormattedMessage id="Velkommen.Info.Header" />
                        </ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="5">
                            <BodyShort>
                                <FormattedMessage id="Velkommen.Info.Del1" />
                            </BodyShort>
                            <BodyShort>
                                <FormattedMessage id="Velkommen.Info.Del2" />
                            </BodyShort>
                            <BodyShort>
                                <FormattedMessage id="Velkommen.Info.Del3" />
                            </BodyShort>
                            <BodyShort>
                                <FormattedMessage id="Velkommen.Info.Del4" />
                            </BodyShort>
                            <HStack gap="1">
                                <BodyShort>
                                    <FormattedMessage id="Velkommen.Info.Del5" />
                                </BodyShort>
                                <BodyShort>
                                    <Link href={links.barn} target="_blank">
                                        <FormattedMessage id="Velkommen.Info.Del5.Link" />
                                    </Link>
                                </BodyShort>
                            </HStack>
                            <Link href={links.veiviser} target="_blank">
                                <FormattedMessage id="Velkommen.Info.Veiviser.Link" />
                            </Link>
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>
                <ConfirmationPanel
                    label={i18n('Velkommen.Samtykke')}
                    onChange={() => setChecked((state) => !state)}
                    checked={isChecked}
                    error={isError && !isChecked && i18n('Velkommen.Validering.BekreftLestOgForståttRettigheter')}
                >
                    <VStack gap="5">
                        <HStack gap="1">
                            <BodyShort>
                                <FormattedMessage id="Velkommen.Plikter.ApneLabel" />
                            </BodyShort>
                            <BodyShort>
                                <Link href={links.plikter} target="_blank" style={{ color: 'var(--a-text-action)' }}>
                                    <FormattedMessage id="Velkommen.LestOgForstått.Link" />
                                </Link>
                            </BodyShort>
                        </HStack>
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
        </ContentWrapper>
    );
};

export default Velkommen;
