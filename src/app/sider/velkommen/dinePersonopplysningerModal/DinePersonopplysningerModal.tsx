import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Ingress, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, FormattedMessage, IntlShape } from 'react-intl';
import Block from 'common/components/block/Block';

interface DineRettigheterModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    intl: IntlShape;
}

const Avsnitt: React.StatelessComponent<{ id: string }> = ({ id }) => {
    return (
        <Block margin="s">
            <Ingress tag="h2">
                <FormattedMessage id={`dinePersonopplysninger.avsnitt.${id}.tittel`} />
            </Ingress>
            <Normaltekst>
                <FormattedMessage id={`dinePersonopplysninger.avsnitt.${id}.html`} />
            </Normaltekst>
        </Block>
    );
};

type Props = DineRettigheterModalProps;
const DinePersonopplysningerModal = (props: Props) => {
    const { intl } = props;
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
                        <FormattedMessage id="dinePersonopplysninger.behandling.html" />
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

export default injectIntl(DinePersonopplysningerModal);
