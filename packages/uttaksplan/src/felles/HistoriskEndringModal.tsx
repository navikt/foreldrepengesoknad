import { FormattedMessage } from 'react-intl';

import { Alert, BodyLong, Button, Dialog } from '@navikt/ds-react';

export type HistoriskEndring = {
    type: 'slettet' | 'endret';
    utfør: () => void;
};

type Props = {
    historiskEndring: HistoriskEndring | undefined;
    erÅpen: boolean;
    lukk: () => void;
};

export const HistoriskEndringModal = ({ historiskEndring, erÅpen, lukk }: Props) => {
    const handlingstype = historiskEndring?.type ?? 'endret';

    const bekreft = () => {
        lukk();
        historiskEndring?.utfør();
    };

    return (
        <Dialog
            open={erÅpen}
            onOpenChange={(open) => {
                if (!open) {
                    lukk();
                }
            }}
        >
            <Dialog.Popup id="HistoriskEndring">
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
                    <Button type="button" variant="primary" onClick={bekreft}>
                        <FormattedMessage
                            id="KalenderRedigering.HistoriskEndring.Modal.Knapp.Bekreft"
                            values={{ handlingstype }}
                        />
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
