import { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, HStack, Heading, Ingress, Link, List, Modal, VStack } from '@navikt/ds-react';

export const DinePersonopplysningerModal = () => {
    const intl = useIntl();
    const ref = useRef<HTMLDialogElement>(null);

    return (
        <>
            <HStack justify="center">
                <Link
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        ref.current?.showModal();
                    }}
                >
                    <FormattedMessage id="velkommen.lesMerOmPersonopplysninger" />
                </Link>
            </HStack>
            <Modal ref={ref} aria-label={intl.formatMessage({ id: 'velkommen.dinePersonopplysninger.sectionheading' })}>
                <Modal.Header>
                    <Heading size="medium" level="1" className="velkommenModalContent__header">
                        <FormattedMessage id="velkommen.dinePersonopplysninger.sectionheading" />
                    </Heading>
                </Modal.Header>
                <Modal.Body>
                    <article className="velkommenModalContent velkommenModalContent--50">
                        <VStack gap="2">
                            <BodyShort>
                                <FormattedMessage
                                    id="velkommen.dinePersonopplysninger.behandling.html"
                                    values={{
                                        a: (msg: any) => (
                                            <a
                                                href="https://www.nav.no/foreldrepenger"
                                                className="lenke"
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                {msg}
                                            </a>
                                        ),
                                    }}
                                />
                            </BodyShort>
                            <div>
                                <Ingress>
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.tittel" />
                                </Ingress>
                                <BodyShort>
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.del1" />
                                </BodyShort>
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
                                <BodyShort>
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.del2" />
                                </BodyShort>
                            </div>
                            <div>
                                <Ingress>
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.tittel" />
                                </Ingress>
                                <BodyShort>
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.del1" />
                                </BodyShort>
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
                            </div>
                            <div>
                                <Ingress>
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.tittel" />
                                </Ingress>
                                <BodyShort>
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.del1" />
                                </BodyShort>
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
                            </div>
                            <div>
                                <Ingress as="h2">
                                    <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.personvernerklaringen.tittel" />
                                </Ingress>
                                <BodyShort>
                                    <FormattedMessage
                                        id="velkommen.dinePersonopplysninger.avsnitt.personvernerklaringen.html"
                                        values={{
                                            a: (msg: any) => (
                                                <a
                                                    className="lenke"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={
                                                        'https://www.nav.no/no/Nav+og+samfunn/Om+Nav/personvern-i-arbeids-og' +
                                                        '-velferdsetaten/personvernerkl%C3%A6ring-for-arbeids-og-velferdsetaten'
                                                    }
                                                >
                                                    {msg}
                                                </a>
                                            ),
                                        }}
                                    />
                                </BodyShort>
                            </div>
                        </VStack>
                    </article>
                </Modal.Body>
            </Modal>
        </>
    );
};
