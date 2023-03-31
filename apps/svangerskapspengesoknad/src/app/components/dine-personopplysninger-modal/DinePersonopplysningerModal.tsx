import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from 'common/components/block/Block';
import BEMHelper from 'common/util/bem';
import { BodyShort, Heading, Ingress, Modal } from '@navikt/ds-react';
const bem = BEMHelper('dinePersonOpplysningerModal');

interface DineRettigheterModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const Avsnitt: React.FunctionComponent<{ id: string }> = ({ id }) => {
    return (
        <Block margin="s">
            <Ingress>
                <FormattedMessage id={`intro.dinePersonopplysninger.avsnitt.${id}.tittel`} />
            </Ingress>
            <BodyShort className={bem.element('html')}>
                <FormattedMessage id={`intro.dinePersonopplysninger.avsnitt.${id}.html`} />
            </BodyShort>
            <ul>
                <FormattedMessage tagName="li" id="intro.dinePersonopplysninger.avsnitt.html.punkt1" />
                <FormattedMessage tagName="li" id="intro.dinePersonopplysninger.avsnitt.html.punkt2" />
                <FormattedMessage tagName="li" id="intro.dinePersonopplysninger.avsnitt.html.punkt3" />
            </ul>
        </Block>
    );
};

type Props = DineRettigheterModalProps;
const DinePersonopplysningerModal = (props: Props) => {
    const intl = useIntl();

    return (
        <Modal
            open={props.isOpen}
            onClose={() => props.onRequestClose()}
            shouldCloseOnOverlayClick={false}
            closeButton={true}
            aria-label={getMessage(intl, 'intro.dinePersonopplysninger.sectionheading')}
        >
            <Modal.Content>
                <article className="velkommenModalContent velkommenModalContent--50">
                    <Block margin="s">
                        <Heading size="medium" className="velkommenModalContent__header">
                            {getMessage(intl, 'intro.dinePersonopplysninger.sectionheading')}
                        </Heading>
                    </Block>
                    <Block margin="s">
                        <BodyShort>
                            <FormattedMessage
                                id="intro.dinePersonopplysninger.behandling.html"
                                values={{
                                    p: (msg: any) => <p>{msg}</p>,
                                    a: (msg: any) => (
                                        <a
                                            className="lenke"
                                            rel="noopener noreferrer"
                                            href="https://www.nav.no/foreldrepenger"
                                        >
                                            {msg}
                                        </a>
                                    ),
                                }}
                            />
                        </BodyShort>
                    </Block>

                    <Avsnitt id="innhenting" />
                    <Avsnitt id="automatiskBehandling" />
                    <Avsnitt id="svarPaSoknaden" />
                    <Avsnitt id="personvernerklaringen" />
                </article>
            </Modal.Content>
        </Modal>
    );
};

export default DinePersonopplysningerModal;
