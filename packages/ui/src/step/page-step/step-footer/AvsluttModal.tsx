import { TrashIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyLong, Button, Dialog } from '@navikt/ds-react';

interface Props {
    onAvsluttOgSlett: () => void;
}

export const AvsluttModal = ({ onAvsluttOgSlett }: Props) => {
    return (
        <Dialog>
            <Dialog.Trigger>
                <Button
                    type="button"
                    variant="tertiary"
                    icon={<TrashIcon aria-hidden />}
                    iconPosition="left"
                    className="order-4"
                >
                    <FormattedMessage id="StepFooter.Avslutt" />
                </Button>
            </Dialog.Trigger>

            <Dialog.Popup>
                <Dialog.Header>
                    <Dialog.Title>
                        <FormattedMessage id="AvsluttModal.Tittel" />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <BodyLong>
                        <FormattedMessage id="AvsluttModal.Info" />
                    </BodyLong>
                </Dialog.Body>
                <Dialog.Footer>
                    <Button type="button" variant="primary" onClick={() => onAvsluttOgSlett()}>
                        <FormattedMessage id="AvsluttModal.Delete" />
                    </Button>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="tertiary">
                            <FormattedMessage id="AvsluttModal.Cancel" />
                        </Button>
                    </Dialog.CloseTrigger>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
