import { ContextDataType, useContextSaveData } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import {
    Alert,
    BodyShort,
    Button,
    ConfirmationPanel,
    GuidePanel,
    HStack,
    Heading,
    List,
    VStack,
} from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { LocaleNo } from '@navikt/fp-types';
import { ContentWrapper, LanguageToggle } from '@navikt/fp-ui';

import styles from './forside.module.css';

interface Props {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void;
    harGodkjentVilkår: boolean;
    onChangeLocale: (locale: LocaleNo) => void;
    locale: LocaleNo;
}

export const Forside = ({
    mellomlagreSøknadOgNaviger,
    setHarGodkjentVilkår,
    harGodkjentVilkår,
    locale,
    onChangeLocale,
}: Props) => {
    const intl = useIntl();

    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const [isError, setIsError] = useState(false);
    const [isChecked, setIsChecked] = useState(harGodkjentVilkår);

    const bekreft = () => {
        if (!isChecked) {
            setIsError(true);
        } else {
            setHarGodkjentVilkår(true);

            oppdaterAppRoute(SøknadRoute.BARNET);

            mellomlagreSøknadOgNaviger();
        }
    };

    return (
        <ContentWrapper>
            <VStack gap="10">
                <LanguageToggle
                    locale={locale}
                    availableLocales={['nb', 'nn']}
                    toggleLanguage={(l: LocaleNo) => onChangeLocale(l)}
                />
                <VStack gap="8">
                    <Heading size="xlarge" className={styles.tittel}>
                        <FormattedMessage id="forside.tittel" />
                    </Heading>
                    <GuidePanel poster>
                        <BodyShort size="medium">
                            <FormattedMessage id="forside.guidepanel" />
                        </BodyShort>
                        <List>
                            <List.Item>
                                <FormattedMessage id="forside.guidepanel.punkt1" />
                            </List.Item>
                            <List.Item>
                                <FormattedMessage id="forside.guidepanel.punkt2" />
                            </List.Item>
                            <List.Item>
                                <FormattedMessage id="forside.guidepanel.punkt3" />
                            </List.Item>
                        </List>
                        <FormattedMessage
                            id="forside.guidepanel.lesMer"
                            values={{
                                a: (msg: any) => (
                                    <a className="lenke" rel="noopener noreferrer" href={links.svangerskapspenger}>
                                        {msg}
                                    </a>
                                ),
                            }}
                        />
                    </GuidePanel>
                    <Alert variant="info">
                        <VStack gap="4">
                            <div>
                                <FormattedMessage
                                    id="forside.tilrettelegging.info.del1"
                                    values={{
                                        a: (msg: any) => (
                                            <a
                                                className="lenke"
                                                rel="noopener noreferrer"
                                                href={links.tilretteleggingsskjema}
                                            >
                                                {msg}
                                            </a>
                                        ),
                                    }}
                                />
                            </div>
                            <div>
                                <FormattedMessage
                                    id="forside.tilrettelegging.info.del2"
                                    values={{
                                        a: (msg: any) => (
                                            <a className="lenke" rel="noopener noreferrer" href={links.slikSøkerDuSvp}>
                                                {msg}
                                            </a>
                                        ),
                                    }}
                                />
                            </div>
                        </VStack>
                    </Alert>
                    <ConfirmationPanel
                        label={intl.formatMessage({ id: 'forside.samtykke' })}
                        onChange={() => setIsChecked((state) => !state)}
                        checked={isChecked}
                        error={
                            isError &&
                            !isChecked &&
                            intl.formatMessage({ id: 'forside.valideringsfeil.harForståttRettigheterOgPlikter' })
                        }
                    >
                        <BodyShort size="medium">{intl.formatMessage({ id: 'forside.samtykkeIntro' })}</BodyShort>
                        <List>
                            <List.Item>
                                <FormattedMessage id="forside.samtykkeIntro.punkt1" />
                            </List.Item>
                            <List.Item>
                                <FormattedMessage
                                    id="forside.samtykkeIntro.punkt2"
                                    values={{
                                        a: (msg: any) => (
                                            <a className="lenke" rel="noopener noreferrer" href={links.rettOgPlikt}>
                                                {msg}
                                            </a>
                                        ),
                                    }}
                                />
                            </List.Item>
                        </List>
                    </ConfirmationPanel>
                    <HStack justify="center">
                        <Button type="button" onClick={bekreft}>
                            <FormattedMessage id="forside.begynnMedSøknad" />
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </ContentWrapper>
    );
};
