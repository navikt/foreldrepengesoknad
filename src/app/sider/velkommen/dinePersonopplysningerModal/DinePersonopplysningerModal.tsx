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
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        {msg}
                                    </a>
                                ),
                            }}
                        />
                    </Normaltekst>
                </Block>
                <Block margin="s">
                    <Ingress>
                        <FormattedMessage id="dinePersonopplysninger.avsnitt.innhenting.tittel" />
                    </Ingress>
                    <Normaltekst>
                        <FormattedMessage id="dinePersonopplysninger.avsnitt.innhenting.del1" />
                        <ul>
                            <li>
                                <FormattedMessage id="dinePersonopplysninger.avsnitt.innhenting.punkt1" />
                            </li>
                            <li>
                                <FormattedMessage id="dinePersonopplysninger.avsnitt.innhenting.punkt2" />
                            </li>
                            <li>
                                <FormattedMessage id="dinePersonopplysninger.avsnitt.innhenting.punkt3" />
                            </li>
                            <li>
                                <FormattedMessage id="dinePersonopplysninger.avsnitt.innhenting.punkt4" />
                            </li>
                        </ul>
                        <FormattedMessage id="dinePersonopplysninger.avsnitt.innhenting.del2" />
                    </Normaltekst>
                </Block>
                <Block margin="s">
                    <Ingress>
                        <FormattedMessage id="dinePersonopplysninger.avsnitt.automatiskBehandling.tittel" />
                    </Ingress>
                    <Normaltekst>
                        <FormattedMessage id="dinePersonopplysninger.avsnitt.automatiskBehandling.del1" />
                        <ul>
                            <li>
                                <FormattedMessage id="dinePersonopplysninger.avsnitt.automatiskBehandling.punkt1" />
                            </li>
                            <li>
                                <FormattedMessage id="dinePersonopplysninger.avsnitt.automatiskBehandling.punkt2" />
                            </li>
                            <li>
                                <FormattedMessage id="dinePersonopplysninger.avsnitt.automatiskBehandling.punkt3" />
                            </li>
                            <li>
                                <FormattedMessage id="dinePersonopplysninger.avsnitt.automatiskBehandling.punkt4" />
                            </li>
                            <li>
                                <FormattedMessage id="dinePersonopplysninger.avsnitt.automatiskBehandling.punkt5" />
                            </li>
                        </ul>
                    </Normaltekst>
                </Block>
                <Block margin="s">
                    <Ingress>
                        <FormattedMessage id="dinePersonopplysninger.avsnitt.svarPaSoknaden.tittel" />
                    </Ingress>
                    <Normaltekst>
                        <FormattedMessage id="dinePersonopplysninger.avsnitt.svarPaSoknaden.del1" />
                        <ul>
                            <li>
                                <FormattedMessage id="dinePersonopplysninger.avsnitt.svarPaSoknaden.punkt1" />
                            </li>
                            <li>
                                <FormattedMessage id="dinePersonopplysninger.avsnitt.svarPaSoknaden.punkt2" />
                            </li>
                            <li>
                                <FormattedMessage id="dinePersonopplysninger.avsnitt.svarPaSoknaden.punkt3" />
                            </li>
                        </ul>
                    </Normaltekst>
                </Block>
                <Block margin="s">
                    <Ingress tag="h2">
                        <FormattedMessage id="dinePersonopplysninger.avsnitt.personvernerklaringen.tittel" />
                    </Ingress>
                    <Normaltekst>
                        <FormattedMessage
                            id="dinePersonopplysninger.avsnitt.personvernerklaringen.html"
                            values={{
                                a: (msg: any) => (
                                    <a
                                        className="lenke"
                                        target="_blank"
                                        rel="noreferrer"
                                        href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten/personvernerkl%C3%A6ring-for-arbeids-og-velferdsetaten"
                                    >
                                        {msg}
                                    </a>
                                ),
                            }}
                        />
                    </Normaltekst>
                </Block>
            </article>
        </Modal>
    );
};

export default DinePersonopplysningerModal;
