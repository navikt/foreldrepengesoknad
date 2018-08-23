import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Undertittel } from 'nav-frontend-typografi';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

interface DineRettigheterModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

type Props = DineRettigheterModalProps & InjectedIntlProps;
const DinePersonopplysningerModal = (props: Props) => {
    const { intl } = props;
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={() => props.onRequestClose()}
            closeButton={true}
            contentLabel="dine rettigheter">
            <div className="velkommenModalContent">
                <Undertittel className="velkommenModalContent__header">
                    {getMessage(intl, 'dinePersonopplysninger.sectionheading')}
                </Undertittel>
            </div>
        </Modal>
    );
};

export default injectIntl(DinePersonopplysningerModal);
