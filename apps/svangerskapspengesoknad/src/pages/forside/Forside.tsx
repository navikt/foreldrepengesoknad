import { useQuery } from '@tanstack/react-query';
import { ContextDataType, useContextSaveData } from 'appData/SvpDataContext';
import { SøknadRoute } from 'appData/routes';
import ky from 'ky';
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
    Link,
    List,
    VStack,
} from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { ContentWrapper } from '@navikt/fp-ui';

import { Saker } from '../../../../../packages/types';
import styles from './forside.module.css';

interface Props {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void;
    harGodkjentVilkår: boolean;
}

export const Forside = ({ mellomlagreSøknadOgNaviger, setHarGodkjentVilkår, harGodkjentVilkår }: Props) => {
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
                                    <Link rel="noopener noreferrer" href={links.svangerskapspenger}>
                                        {msg}
                                    </Link>
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
                                            <Link rel="noopener noreferrer" href={links.tilretteleggingsskjema}>
                                                {msg}
                                            </Link>
                                        ),
                                    }}
                                />
                            </div>
                            <div>
                                <FormattedMessage
                                    id="forside.tilrettelegging.info.del2"
                                    values={{
                                        a: (msg: any) => (
                                            <Link rel="noopener noreferrer" href={links.slikSøkerDuSvp}>
                                                {msg}
                                            </Link>
                                        ),
                                    }}
                                />
                            </div>
                        </VStack>
                    </Alert>
                    <EksisterendeSøknad />
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
                                            <Link rel="noopener noreferrer" href={links.rettOgPlikt}>
                                                {msg}
                                            </Link>
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

const EksisterendeSøknad = () => {
    const harÅpenBehandling =
        useQuery({
            queryKey: ['SAKER'],
            queryFn: () => ky.get(`${import.meta.env.BASE_URL}/rest/innsyn/v2/saker`).json<Saker>(),
            select: (saker) => {
                return !!saker.svangerskapspenger.find((sak) => sak.åpenBehandling !== undefined);
            },
        }).data ?? false;

    if (!harÅpenBehandling) {
        return null;
    }

    return (
        <Alert variant="warning">
            Du har en søknad til behandling. Ønsker du å sende inn en ny søknad erstatter du søknaden som ligger til
            behandling.
        </Alert>
    );
};
