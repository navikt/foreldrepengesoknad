import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage, useIntl } from 'react-intl';
import { bemUtils, Block, intlUtils } from '@navikt/fp-common';

import './dinePersonopplysningerModal.less';

interface DineRettigheterModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

type Props = DineRettigheterModalProps;

const DinePersonopplysningerModal = (props: Props) => {
    const intl = useIntl();
    const bem = bemUtils('dinePersonopplysningerModal');

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={() => props.onRequestClose()}
            closeButton={true}
            className={bem.block}
            contentLabel={intlUtils(intl, 'velkommen.dinePersonopplysninger.sectionheading')}
        >
            <article className="velkommenModalContent velkommenModalContent--50">
                <Block padBottom="s">
                    <Systemtittel tag="h1" className="velkommenModalContent__header">
                        {intlUtils(intl, 'velkommen.dinePersonopplysninger.sectionheading')}
                    </Systemtittel>
                </Block>
                <Block padBottom="s">
                    <Normaltekst>
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
                    </Normaltekst>
                </Block>
                <Block padBottom="s">
                    <Ingress>
                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.tittel" />
                    </Ingress>
                    <Normaltekst>
                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.del1" />
                    </Normaltekst>
                    <ul>
                        <li>
                            <Normaltekst>
                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.punkt1" />
                            </Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>
                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.punkt2" />
                            </Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>
                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.punkt3" />
                            </Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>
                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.punkt4" />
                            </Normaltekst>
                        </li>
                    </ul>
                    <Normaltekst>
                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.innhenting.del2" />
                    </Normaltekst>
                </Block>
                <Block padBottom="s">
                    <Ingress>
                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.tittel" />
                    </Ingress>
                    <Normaltekst>
                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.del1" />
                    </Normaltekst>
                    <ul>
                        <li>
                            <Normaltekst>
                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt1" />
                            </Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>
                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt2" />
                            </Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>
                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt3" />
                            </Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>
                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt4" />
                            </Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>
                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.automatiskBehandling.punkt5" />
                            </Normaltekst>
                        </li>
                    </ul>
                </Block>
                <Block padBottom="s">
                    <Ingress>
                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.tittel" />
                    </Ingress>
                    <Normaltekst>
                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.del1" />
                    </Normaltekst>
                    <ul>
                        <li>
                            <Normaltekst>
                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.punkt1" />
                            </Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>
                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.punkt2" />
                            </Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>
                                <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.svarPaSoknaden.punkt3" />
                            </Normaltekst>
                        </li>
                    </ul>
                </Block>
                <Block padBottom="s">
                    <Ingress tag="h2">
                        <FormattedMessage id="velkommen.dinePersonopplysninger.avsnitt.personvernerklaringen.tittel" />
                    </Ingress>
                    <Normaltekst>
                        <FormattedMessage
                            id="velkommen.dinePersonopplysninger.avsnitt.personvernerklaringen.html"
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
