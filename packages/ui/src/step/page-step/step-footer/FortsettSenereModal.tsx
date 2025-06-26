import { FloppydiskIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { BodyLong, Box, Button, Heading, Modal } from '@navikt/ds-react';

interface Props {
    onFortsettSenere?: () => void;
}

export const FortsettSenereModal = ({ onFortsettSenere }: Props) => {
    const intl = useIntl();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                aria-label={intl.formatMessage({ id: 'FortsettSenereModal.Tittel' })}
            >
                <Modal.Header>
                    <Heading size="medium">{intl.formatMessage({ id: 'FortsettSenereModal.Tittel' })}</Heading>
                </Modal.Header>
                <Modal.Body>
                    <BodyLong>{intl.formatMessage({ id: 'FortsettSenereModal.Info' })}</BodyLong>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => {
                            if (onFortsettSenere) {
                                onFortsettSenere();
                            }
                            setIsOpen(false);
                        }}
                    >
                        {intl.formatMessage({ id: 'FortsettSenereModal.Ok' })}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Box asChild marginBlock={{ xs: '4 0', sm: '0' }} onClick={() => setIsOpen(true)}>
                <Button variant="tertiary" icon={<FloppydiskIcon aria-hidden />} iconPosition="left">
                    {intl.formatMessage({ id: 'StepFooter.ContinueLater' })}
                </Button>
            </Box>
        </>
    );
};
