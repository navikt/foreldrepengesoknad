import { FormattedMessage } from 'react-intl';

import { BodyLong, BodyShort, Box, Dialog, HStack, Link, List, VStack } from '@navikt/ds-react';

export const DinePersonopplysningerModal = () => {
    return (
        <Dialog>
            <Dialog.Trigger>
                <HStack justify="center">
                    <Link href="#">
                        <FormattedMessage id="velkommen.lesMerOmPersonopplysninger" />
                    </Link>
                </HStack>
            </Dialog.Trigger>
            <Dialog.Popup>
                <Dialog.Header>
                    <Dialog.Title>
                        <FormattedMessage id="velkommen.dinePersonopplysninger.sectionheading" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <article>
                        <VStack gap="space-8">
                            <BodyShort>
                                <FormattedMessage
                                    id="velkommen.dinePersonopplysninger.behandling.html"
                                    values={{
                                        a: (msg) => (
                                            <Link
                                                href="https://www.nav.no/foreldrepenger"
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                {msg}
                                            </Link>
                                        ),
                                    }}
                                />
                            </BodyShort>
                            <div>
                                <BodyLong size="large">
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.tittel" />
                                </BodyLong>
                                <BodyShort>
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.del1" />
                                </BodyShort>
                                <Box marginBlock="space-16" asChild>
                                    <List>
                                        <List.Item>
                                            <BodyShort>
                                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.punkt1" />
                                            </BodyShort>
                                        </List.Item>
                                        <List.Item>
                                            <BodyShort>
                                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.punkt2" />
                                            </BodyShort>
                                        </List.Item>
                                        <List.Item>
                                            <BodyShort>
                                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.punkt3" />
                                            </BodyShort>
                                        </List.Item>
                                        <List.Item>
                                            <BodyShort>
                                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.punkt4" />
                                            </BodyShort>
                                        </List.Item>
                                    </List>
                                </Box>
                                <BodyShort>
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.del2" />
                                </BodyShort>
                            </div>
                            <div>
                                <BodyLong size="large">
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.tittel" />
                                </BodyLong>
                                <BodyShort>
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.del1" />
                                </BodyShort>
                                <Box marginBlock="space-16" asChild>
                                    <List>
                                        <List.Item>
                                            <BodyShort>
                                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt1" />
                                            </BodyShort>
                                        </List.Item>
                                        <List.Item>
                                            <BodyShort>
                                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt2" />
                                            </BodyShort>
                                        </List.Item>
                                        <List.Item>
                                            <BodyShort>
                                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt3" />
                                            </BodyShort>
                                        </List.Item>
                                        <List.Item>
                                            <BodyShort>
                                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt4" />
                                            </BodyShort>
                                        </List.Item>
                                        <List.Item>
                                            <BodyShort>
                                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt5" />
                                            </BodyShort>
                                        </List.Item>
                                    </List>
                                </Box>
                            </div>
                            <div>
                                <BodyLong size="large">
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.tittel" />
                                </BodyLong>
                                <BodyShort>
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.del1" />
                                </BodyShort>
                                <Box marginBlock="space-16" asChild>
                                    <List>
                                        <List.Item>
                                            <BodyShort>
                                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.punkt1" />
                                            </BodyShort>
                                        </List.Item>
                                        <List.Item>
                                            <BodyShort>
                                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.punkt2" />
                                            </BodyShort>
                                        </List.Item>
                                        <List.Item>
                                            <BodyShort>
                                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.punkt3" />
                                            </BodyShort>
                                        </List.Item>
                                    </List>
                                </Box>
                            </div>
                            <div>
                                <BodyLong size="large">
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.personvernerklaringen.tittel" />
                                </BodyLong>
                                <BodyShort>
                                    <FormattedMessage
                                        id="velkommen.dinePersonopplysninger.avsnitt.personvernerklaringen.html"
                                        values={{
                                            a: (msg) => (
                                                <Link
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={
                                                        'https://www.nav.no/no/Nav+og+samfunn/Om+Nav/personvern-i-arbeids-og' +
                                                        '-velferdsetaten/personvernerkl%C3%A6ring-for-arbeids-og-velferdsetaten'
                                                    }
                                                >
                                                    {msg}
                                                </Link>
                                            ),
                                        }}
                                    />
                                </BodyShort>
                            </div>
                        </VStack>
                    </article>
                </Dialog.Body>
            </Dialog.Popup>
        </Dialog>
    );
};
