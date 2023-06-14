import getMessage from 'common/util/i18nUtils';
import { FormattedMessage, useIntl } from 'react-intl';
import { BodyShort, Heading, Link, Modal } from '@navikt/ds-react';

interface DineRettigheterModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

type Props = DineRettigheterModalProps;
const DinePlikterModal = (props: Props) => {
    const intl = useIntl();
    return (
        <Modal
            open={props.isOpen}
            onClose={() => props.onRequestClose()}
            closeButton={true}
            shouldCloseOnOverlayClick={false}
            aria-label={getMessage(intl, 'intro.dinePlikter.sectionheading')}
        >
            <Modal.Content>
                <article className="velkommenModalContent">
                    <Heading size="medium" className="velkommenModalContent__header">
                        {getMessage(intl, 'intro.dinePlikter.sectionheading')}
                    </Heading>
                    <ul>
                        <li>
                            <BodyShort>{getMessage(intl, 'intro.dinePlikter.listeElement.1')}</BodyShort>
                        </li>
                        <li>
                            <BodyShort>
                                <FormattedMessage
                                    id="intro.dinePlikter.listeElement.2"
                                    values={{
                                        link: (
                                            <Link href="https://nav.no/rettOgPlikt" target="_blank">
                                                <FormattedMessage id="intro.dinePlikter.listeElement.2.link" />
                                            </Link>
                                        ),
                                    }}
                                />
                            </BodyShort>
                        </li>
                    </ul>
                </article>
            </Modal.Content>
        </Modal>
    );
};

export default DinePlikterModal;
