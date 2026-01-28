import { useQuery } from '@tanstack/react-query';
import { ContextDataType, useContextSaveData } from 'appData/SvpDataContext';
import { sakerOptions } from 'appData/queries';
import { SøknadRoute } from 'appData/routes';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import {
    Alert,
    BodyShort,
    Box,
    Button,
    ConfirmationPanel,
    GuidePanel,
    HStack,
    Link,
    List,
    VStack,
} from '@navikt/ds-react';

import { DEFAULT_SATSER, links } from '@navikt/fp-constants';
import { SkjemaRotLayout } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

interface Props {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void;
    harGodkjentVilkår: boolean;
}

export const Forside = ({ mellomlagreSøknadOgNaviger, setHarGodkjentVilkår, harGodkjentVilkår }: Props) => {
    const intl = useIntl();

    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const minimumOpptjening = DEFAULT_SATSER.grunnbeløp[0]!.verdi * 0.5;

    const [isError, setIsError] = useState(false);
    const [isChecked, setIsChecked] = useState(harGodkjentVilkår);

    const bekreft = () => {
        if (isChecked) {
            setHarGodkjentVilkår(true);

            oppdaterAppRoute(SøknadRoute.BARNET);

            void mellomlagreSøknadOgNaviger();
        } else {
            setIsError(true);
        }
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="forside.tittel" />}>
            <VStack gap="space-32">
                <GuidePanel poster>
                    <BodyShort size="medium">
                        <FormattedMessage id="forside.guidepanel" />
                    </BodyShort>
                    <Box marginBlock="space-16" asChild>
                        <List>
                            <List.Item>
                                <FormattedMessage id="forside.guidepanel.punkt1" />
                            </List.Item>
                            <List.Item>
                                <FormattedMessage
                                    id="forside.guidepanel.punkt2"
                                    values={{ beløp: formatCurrencyWithKr(minimumOpptjening) }}
                                />
                            </List.Item>
                            <List.Item>
                                <FormattedMessage id="forside.guidepanel.punkt3" />
                            </List.Item>
                        </List>
                    </Box>
                    <FormattedMessage
                        id="forside.guidepanel.lesMer"
                        values={{
                            a: (msg) => (
                                <Link rel="noopener noreferrer" href={links.svangerskapspenger}>
                                    {msg}
                                </Link>
                            ),
                        }}
                    />
                </GuidePanel>
                <Alert variant="info">
                    <VStack gap="space-16">
                        <div>
                            <FormattedMessage
                                id="forside.tilrettelegging.info.del1"
                                values={{
                                    a: (msg) => (
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
                                    a: (msg) => (
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
                    <Box marginBlock="space-16" asChild>
                        <List>
                            <List.Item>
                                <FormattedMessage id="forside.samtykkeIntro.punkt1" />
                            </List.Item>
                            <List.Item>
                                <FormattedMessage
                                    id="forside.samtykkeIntro.punkt2"
                                    values={{
                                        a: (msg) => (
                                            <Link rel="noopener noreferrer" href={links.rettOgPlikt}>
                                                {msg}
                                            </Link>
                                        ),
                                    }}
                                />
                            </List.Item>
                        </List>
                    </Box>
                </ConfirmationPanel>
                <HStack justify="center">
                    <Button type="button" onClick={bekreft}>
                        <FormattedMessage id="forside.begynnMedSøknad" />
                    </Button>
                </HStack>
            </VStack>
        </SkjemaRotLayout>
    );
};

const EksisterendeSøknad = () => {
    const harÅpenBehandling =
        useQuery({
            ...sakerOptions(),
            select: (saker) => {
                return saker.svangerskapspenger.some((sak) => sak.åpenBehandling !== undefined);
            },
        }).data ?? false;

    if (!harÅpenBehandling) {
        return null;
    }

    return (
        <Alert variant="warning">
            <FormattedMessage id="forside.eksisterendeSøknad" />
        </Alert>
    );
};
