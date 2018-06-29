import * as React from 'react';
import Modal from 'nav-frontend-modal';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import getMessage from 'common/util/i18nUtils';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import lenker from '../../util/routing/lenker';

interface DineRettigheterModalProps {
    isOpen: boolean;
    onRequestClose: any;
}

type Props = DineRettigheterModalProps & InjectedIntlProps;
const DinePlikterModal = (props: Props) => {
    const { intl } = props;
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={() => props.onRequestClose()}
            closeButton={true}
            contentLabel="dine plikter">
            <div className="velkommenModalContent">
                <Undertittel className="velkommenModalContent__header">
                    {getMessage(intl, 'dinePlikter.sectionheading')}
                </Undertittel>

                <ul>
                    <li>
                        <Normaltekst>
                            {getMessage(intl, 'dinePlikter.listeElement.1')}
                        </Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>
                            <FormattedMessage
                                id="dinePlikter.listeElement.2"
                                values={{
                                    link: (
                                        <Lenke
                                            href={lenker.rettOgPlikt}
                                            target="_blank">
                                            <FormattedMessage id="dinePlikter.listeElement.2.link" />
                                        </Lenke>
                                    )
                                }}
                            />
                        </Normaltekst>
                    </li>
                </ul>
            </div>
        </Modal>
    );
};

export default injectIntl(DinePlikterModal);
