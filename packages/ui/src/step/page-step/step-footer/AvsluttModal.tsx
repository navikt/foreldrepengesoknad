import { TrashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';

interface Props {
    onAvsluttOgSlett: () => void;
}

export const AvsluttModal = ({ onAvsluttOgSlett }: Props) => {
    const intl = useIntl();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                aria-label={intl.formatMessage({ id: 'AvsluttModal.Tittel' })}
            >
                <Modal.Header>
                    <Heading size="medium">{intl.formatMessage({ id: 'AvsluttModal.Tittel' })}</Heading>
                </Modal.Header>
                <Modal.Body>
                    <BodyLong>{intl.formatMessage({ id: 'AvsluttModal.Info' })}</BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" variant="primary" onClick={() => onAvsluttOgSlett()}>
                        {intl.formatMessage({ id: 'AvsluttModal.Delete' })}
                    </Button>
                    <Button type="button" variant="tertiary" onClick={() => setIsOpen(false)}>
                        {intl.formatMessage({ id: 'AvsluttModal.Cancel' })}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Button
                type="button"
                variant="tertiary"
                icon={<TrashIcon aria-hidden />}
                iconPosition="left"
                onClick={() => setIsOpen(true)}
                className="order-4"
            >
                {intl.formatMessage({ id: 'StepFooter.Avslutt' })}
            </Button>
        </>
    );
};
