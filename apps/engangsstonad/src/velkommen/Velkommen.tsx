import { useEsNavigator } from 'appData/useEsNavigator';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import {
    BodyShort,
    Button,
    ConfirmationPanel,
    ExpansionCard,
    GuidePanel,
    HStack,
    Link,
    List,
    VStack,
} from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { SkjemaRotLayout } from '@navikt/fp-ui';

interface Props {
    startSøknad: (start: boolean) => void;
    erVelkommen: boolean;
    mellomlagreOgNaviger: () => Promise<void>;
}

export const Velkommen = ({ startSøknad, erVelkommen, mellomlagreOgNaviger }: Props) => {
    const intl = useIntl();

    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const [isError, setIsError] = useState(false);
    const [isChecked, setIsChecked] = useState(erVelkommen);

    const bekreft = () => {
        if (!isChecked) {
            setIsError(true);
        } else {
            startSøknad(true);
            void navigator.goToNextDefaultStep();
        }
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id={'Søknad.Pageheading'} />}>
            <VStack gap="space-40">
                <GuidePanel poster>
                    <VStack gap="space-20">
                        <BodyShort>
                            <FormattedMessage id="Velkommen.Ingress.Del1" />
                        </BodyShort>
                        <BodyShort>
                            <FormattedMessage id="Velkommen.Ingress.Del2" />
                            <Link href={links.farMedmor}>
                                <FormattedMessage id="Velkommen.Bobletekst.Del2.link" />
                            </Link>
                        </BodyShort>
                    </VStack>
                    <List>
                        <List.Item>
                            <FormattedMessage id={'Velkommen.Bobletekst.Del1'} />
                        </List.Item>
                        <List.Item>
                            <FormattedMessage id={'Velkommen.Bobletekst.Del2'} />
                        </List.Item>
                    </List>
                    <VStack gap="space-20">
                        <BodyShort>
                            <FormattedMessage id="Velkommen.Ingress.Del3" />
                        </BodyShort>
                        <Link href={links.engangsstonad}>
                            <BodyShort>
                                <FormattedMessage id="Velkommen.Ingress.Link" />
                            </BodyShort>
                        </Link>
                    </VStack>
                </GuidePanel>
                <ExpansionCard size="medium" aria-label={intl.formatMessage({ id: 'Velkommen.Info.Header' })}>
                    <ExpansionCard.Header>
                        <ExpansionCard.Title size="small">
                            <FormattedMessage id="Velkommen.Info.Header" />
                        </ExpansionCard.Title>
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack gap="space-20">
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
                            <HStack gap="space-4">
                                <BodyShort>
                                    <FormattedMessage id="Velkommen.Info.Del5" />
                                </BodyShort>
                                <BodyShort>
                                    <Link href={links.barn}>
                                        <FormattedMessage id="Velkommen.Info.Del5.Link" />
                                    </Link>
                                </BodyShort>
                            </HStack>
                            <Link href={links.veiviser}>
                                <FormattedMessage id="Velkommen.Info.Veiviser.Link" />
                            </Link>
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>
                <ConfirmationPanel
                    label={intl.formatMessage({ id: 'Velkommen.Samtykke' })}
                    onChange={() => setIsChecked((state) => !state)}
                    checked={isChecked}
                    error={
                        isError &&
                        !isChecked &&
                        intl.formatMessage({ id: 'Velkommen.Validering.BekreftLestOgForståttRettigheter' })
                    }
                >
                    <VStack gap="space-20">
                        <HStack gap="space-4">
                            <BodyShort>
                                <FormattedMessage id="Velkommen.Plikter.ApneLabel" />
                            </BodyShort>
                            <BodyShort>
                                <Link href={links.plikter} style={{ color: 'var(--ax-text-accent-subtle)' }}>
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
        </SkjemaRotLayout>
    );
};
