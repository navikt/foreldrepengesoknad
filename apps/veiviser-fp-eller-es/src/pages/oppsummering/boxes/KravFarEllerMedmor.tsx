import { QuestionmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Box, Heading, Link, List, VStack } from '@navikt/ds-react';

import { Infobox } from '@navikt/fp-ui';

export const KravFarEllerMedmor = () => {
    return (
        <>
            <Heading size="small">
                <FormattedMessage id="HvorforHarJegRettPanel.FarEllerMedmor" />
            </Heading>
            <Infobox
                icon={
                    <QuestionmarkIcon
                        height={24}
                        width={24}
                        color="var(--ax-bg-neutral-strong)"
                        fontSize="1.5rem"
                        aria-hidden
                    />
                }
                color="gray"
            >
                <VStack gap="space-8">
                    <BodyShort>
                        <FormattedMessage id="HvorforHarJegRettPanel.HvisDuErFarEllerMedmor" />
                    </BodyShort>
                    <Box marginBlock="space-16" asChild>
                        <List data-aksel-migrated-v8 as="ul">
                            <List.Item>
                                <FormattedMessage id="HvorforHarJegRettPanel.AdoptererAlene" />
                            </List.Item>
                            <List.Item>
                                <FormattedMessage
                                    id="HvorforHarJegRettPanel.OvertarOmsorgMorDød"
                                    values={{
                                        a: (msg) => (
                                            <Link
                                                href="https://lovdata.no/dokument/NL/lov/1981-04-08-7"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {msg}
                                            </Link>
                                        ),
                                    }}
                                />
                            </List.Item>
                            <List.Item>
                                <FormattedMessage id="HvorforHarJegRettPanel.OvertarOmsorgMorDødFødsel" />
                            </List.Item>
                            <List.Item>
                                <FormattedMessage id="HvorforHarJegRettPanel.Innen56Uker" />
                            </List.Item>
                        </List>
                    </Box>
                    <BodyShort>
                        <FormattedMessage id="HvorforHarJegRettPanel.DersomEtAvTilfellene" />
                    </BodyShort>
                </VStack>
            </Infobox>
        </>
    );
};
