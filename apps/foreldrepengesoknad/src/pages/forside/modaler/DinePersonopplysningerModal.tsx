import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Heading, Ingress, Modal, VStack } from '@navikt/ds-react';

interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
}

export const DinePersonopplysningerModal = (props: Props) => {
    const intl = useIntl();

    return (
        <Modal
            open={props.isOpen}
            onClose={() => props.onRequestClose()}
            aria-label={intl.formatMessage({ id: 'velkommen.dinePersonopplysninger.sectionheading' })}
        >
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
                            <ul>
                                <li>
                                    <BodyShort>
                                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.punkt1" />
                                    </BodyShort>
                                </li>
                                <li>
                                    <BodyShort>
                                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.punkt2" />
                                    </BodyShort>
                                </li>
                                <li>
                                    <BodyShort>
                                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.punkt3" />
                                    </BodyShort>
                                </li>
                                <li>
                                    <BodyShort>
                                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.punkt4" />
                                    </BodyShort>
                                </li>
                            </ul>
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
                            <ul>
                                <li>
                                    <BodyShort>
                                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt1" />
                                    </BodyShort>
                                </li>
                                <li>
                                    <BodyShort>
                                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt2" />
                                    </BodyShort>
                                </li>
                                <li>
                                    <BodyShort>
                                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt3" />
                                    </BodyShort>
                                </li>
                                <li>
                                    <BodyShort>
                                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt4" />
                                    </BodyShort>
                                </li>
                                <li>
                                    <BodyShort>
                                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt5" />
                                    </BodyShort>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <Ingress>
                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.tittel" />
                            </Ingress>
                            <BodyShort>
                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.del1" />
                            </BodyShort>
                            <ul>
                                <li>
                                    <BodyShort>
                                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.punkt1" />
                                    </BodyShort>
                                </li>
                                <li>
                                    <BodyShort>
                                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.punkt2" />
                                    </BodyShort>
                                </li>
                                <li>
                                    <BodyShort>
                                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.punkt3" />
                                    </BodyShort>
                                </li>
                            </ul>
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
                                                    'https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og' +
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
    );
};
