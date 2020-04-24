import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import getMessage from 'common/util/i18nUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from 'common/components/block/Block';

interface DineRettigheterModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const Avsnitt: React.StatelessComponent<{ id: string }> = ({ id }) => {
    return (
        <Block margin="s">
            <Ingress tag="h2">
                <FormattedMessage id={`dinePersonopplysninger.avsnitt.${id}.tittel`} />
            </Ingress>
            <Normaltekst>
                <FormattedMessage
                    id={`dinePersonopplysninger.avsnitt.${id}.html`}
                    values={{
                        ul: (msg: any) => <ul>{msg}</ul>,
                        li: (...msg: any) => <li>{msg}</li>,
                        a: (msg: any) => (
                            <a
                                className="lenke"
                                target="_blank"
                                rel="noopener"
                                href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten/personvernerkl%C3%A6ring-for-arbeids-og-velferdsetaten"
                            >
                                {msg}
                            </a>
                        )
                    }}
                />
            </Normaltekst>
        </Block>
    );
};

type Props = DineRettigheterModalProps;

const DinePersonopplysningerModal = (props: Props) => {
    const intl = useIntl();

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={() => props.onRequestClose()}
            closeButton={true}
            contentLabel={getMessage(intl, 'dinePersonopplysninger.sectionheading')}
        >
            <article className="velkommenModalContent velkommenModalContent--50">
                <Block margin="s">
                    <Systemtittel tag="h1" className="velkommenModalContent__header">
                        {getMessage(intl, 'dinePersonopplysninger.sectionheading')}
                    </Systemtittel>
                </Block>
                <Block margin="s">
                    <Normaltekst>
                        <FormattedMessage
                            id="dinePersonopplysninger.behandling.html"
                            values={{
                                a: (msg: any) => (
                                    <a
                                        href="https://www.nav.no/foreldrepenger"
                                        className="lenke"
                                        rel="noopener"
                                        target="_blank"
                                    >
                                        {msg}
                                    </a>
                                )
                            }}
                        />
                    </Normaltekst>
                </Block>

                <Avsnitt id="innhenting" />
                <Avsnitt id="automatiskBehandling" />
                <Avsnitt id="svarPaSoknaden" />
                <Avsnitt id="personvernerklaringen" />
            </article>
        </Modal>
    );
};

export default DinePersonopplysningerModal;
