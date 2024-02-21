import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Alert, BodyShort, Button, ConfirmationPanel, GuidePanel, HStack, Heading, VStack } from '@navikt/ds-react';
import { LanguageToggle, bemUtils } from '@navikt/fp-common';
import { ContentWrapper } from '@navikt/fp-ui';
import { LocaleNo } from '@navikt/fp-types';
import { links } from '@navikt/fp-constants';
import { ContextDataType, useContextSaveData } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';

import './forside.css';

export interface Props {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void;
    harGodkjentVilkår: boolean;
    onChangeLocale: (locale: LocaleNo) => void;
    locale: LocaleNo;
}

const Forside: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    setHarGodkjentVilkår,
    harGodkjentVilkår,
    locale,
    onChangeLocale,
}) => {
    const intl = useIntl();
    const bem = bemUtils('forside');

    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const [isError, setIsError] = useState(false);
    const [isChecked, setChecked] = useState(harGodkjentVilkår);

    const bekreft = () => {
        if (!isChecked) {
            setIsError(true);
        } else {
            setHarGodkjentVilkår(true);

            oppdaterAppRoute(SøknadRoutes.BARNET);

            mellomlagreSøknadOgNaviger();
        }
    };

    return (
        <ContentWrapper>
            <VStack gap="10">
                <LanguageToggle
                    locale={locale}
                    availableLocales={['nb', 'nn']}
                    toggle={(l: LocaleNo) => onChangeLocale(l)}
                    isCleanVersion
                />
                <VStack gap="8">
                    <Heading size="xlarge" className={`${bem.element('tittel')}`}>
                        <FormattedMessage id="forside.tittel" />
                    </Heading>
                    <GuidePanel poster>
                        <BodyShort size="medium">
                            <FormattedMessage id="forside.guidepanel" />
                        </BodyShort>
                        <ul className={`${bem.element('liste')}`}>
                            <li>
                                <FormattedMessage id="forside.guidepanel.punkt1" />
                            </li>
                            <li>
                                <FormattedMessage id="forside.guidepanel.punkt2" />
                            </li>
                            <li>
                                <FormattedMessage id="forside.guidepanel.punkt3" />
                            </li>
                        </ul>
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
                        onChange={() => setChecked((state) => !state)}
                        checked={isChecked}
                        error={
                            isError &&
                            !isChecked &&
                            intl.formatMessage({ id: 'forside.valideringsfeil.harForståttRettigheterOgPlikter' })
                        }
                    >
                        <BodyShort size="medium">{intl.formatMessage({ id: 'forside.samtykkeIntro' })}</BodyShort>
                        <ul className={`${bem.element('liste')}`}>
                            <li>
                                <FormattedMessage id="forside.samtykkeIntro.punkt1" />
                            </li>
                            <li>
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
                            </li>
                        </ul>
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

export default Forside;
