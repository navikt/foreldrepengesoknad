import { FloppydiskIcon } from '@navikt/aksel-icons';
import { useIntl } from 'react-intl';

import { BodyLong, Box, Button, Dialog } from '@navikt/ds-react';

interface Props {
    onFortsettSenere: () => void;
}

export const FortsettSenereModal = ({ onFortsettSenere }: Props) => {
    const intl = useIntl();

    return (
        <Dialog>
            <Dialog.Trigger>
                <Box.New asChild marginBlock={{ xs: '4 0', sm: '0' }}>
                    <Button
                        className="order-3"
                        variant="tertiary"
                        icon={<FloppydiskIcon aria-hidden />}
                        iconPosition="left"
                        type="button"
                    >
                        {intl.formatMessage({ id: 'StepFooter.ContinueLater' })}
                    </Button>
                </Box.New>
            </Dialog.Trigger>
            <Dialog.Popup>
                <Dialog.Header>
                    <Dialog.Title>{intl.formatMessage({ id: 'FortsettSenereModal.Tittel' })}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <BodyLong>{intl.formatMessage({ id: 'FortsettSenereModal.Info' })}</BodyLong>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="primary" onClick={onFortsettSenere}>
                            {intl.formatMessage({ id: 'FortsettSenereModal.Ok' })}
                        </Button>
                    </Dialog.CloseTrigger>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
