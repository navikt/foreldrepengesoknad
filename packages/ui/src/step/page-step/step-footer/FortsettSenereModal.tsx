import { FloppydiskIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyLong, Box, Button, Dialog } from '@navikt/ds-react';

interface Props {
    onFortsettSenere: () => void;
}

export const FortsettSenereModal = ({ onFortsettSenere }: Props) => {
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
                        <FormattedMessage id="StepFooter.ContinueLater" />
                    </Button>
                </Box.New>
            </Dialog.Trigger>
            <Dialog.Popup>
                <Dialog.Header>
                    <Dialog.Title>
                        <FormattedMessage id="FortsettSenereModal.Tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <BodyLong>
                        <FormattedMessage id="FortsettSenereModal.Info" />
                    </BodyLong>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="primary" onClick={onFortsettSenere}>
                            <FormattedMessage id="FortsettSenereModal.Ok" />
                        </Button>
                    </Dialog.CloseTrigger>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
