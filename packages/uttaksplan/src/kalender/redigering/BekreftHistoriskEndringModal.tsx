import { FormattedMessage } from 'react-intl';

import { Alert, BodyLong, Button, Dialog } from '@navikt/ds-react';

export type TypeHistoriskEndring = 'slettet' | 'endret';

type Props = {
    open: boolean;
    handlingstype: TypeHistoriskEndring;
    onBekreft: () => void;
    onAvbryt: () => void;
};

export const BekreftHistoriskEndringModal = ({ open, handlingstype, onBekreft, onAvbryt }: Props) => (
    <Dialog
        open={open}
        onOpenChange={(isOpen) => {
            if (!isOpen) {
                onAvbryt();
            }
        }}
    >
        <Dialog.Popup id="KalenderRedigeringHistoriskEndring">
            <Dialog.Header>
                <Dialog.Title>
                    <FormattedMessage
                        id="KalenderRedigering.HistoriskEndring.Modal.Tittel"
                        values={{ handlingstype }}
                    />
                </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
                <Alert variant="warning">
                    <BodyLong>
                        <FormattedMessage
                            id="KalenderRedigering.HistoriskEndring.Modal.Advarsel"
                            values={{ handlingstype }}
                        />
                    </BodyLong>
                </Alert>
            </Dialog.Body>
            <Dialog.Footer>
                <Dialog.CloseTrigger>
                    <Button type="button" variant="secondary">
                        <FormattedMessage id="KalenderRedigering.HistoriskEndring.Modal.Knapp.Avbryt" />
                    </Button>
                </Dialog.CloseTrigger>
                <Button type="button" variant="primary" onClick={onBekreft}>
                    <FormattedMessage
                        id="KalenderRedigering.HistoriskEndring.Modal.Knapp.Bekreft"
                        values={{ handlingstype }}
                    />
                </Button>
            </Dialog.Footer>
        </Dialog.Popup>
    </Dialog>
);
