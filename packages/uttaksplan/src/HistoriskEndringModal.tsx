import { FormattedMessage } from 'react-intl';

import { Alert, BodyLong, Button, Dialog } from '@navikt/ds-react';

import { notEmpty } from '@navikt/fp-validation';

import { useUttaksplanRedigering } from './context/UttaksplanRedigeringContext';

export const HistoriskEndringModal = () => {
    const { historiskEndring, visHistoriskEndringModal, setVisHistoriskEndringModal, nullstillHistoriskEndring } =
        notEmpty(useUttaksplanRedigering());

    const handlingstype = historiskEndring?.type ?? 'endret';

    const bekreft = () => {
        setVisHistoriskEndringModal(false);
        historiskEndring?.utfør();
    };

    return (
        <Dialog
            open={visHistoriskEndringModal}
            onOpenChange={setVisHistoriskEndringModal}
            onOpenChangeComplete={(open) => {
                if (!open) {
                    nullstillHistoriskEndring();
                }
            }}
        >
            <Dialog.Popup id="HistoriskEndringModal">
                <Dialog.Header>
                    <Dialog.Title>
                        <FormattedMessage id="HistoriskEndring.Modal.Tittel" values={{ handlingstype }} />
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    <Alert variant="warning">
                        <BodyLong>
                            <FormattedMessage id="HistoriskEndring.Modal.Advarsel" values={{ handlingstype }} />
                        </BodyLong>
                    </Alert>
                </Dialog.Body>
                <Dialog.Footer>
                    <Dialog.CloseTrigger>
                        <Button type="button" variant="secondary">
                            <FormattedMessage id="HistoriskEndring.Modal.Knapp.Avbryt" />
                        </Button>
                    </Dialog.CloseTrigger>
                    <Button type="button" variant="primary" onClick={bekreft}>
                        <FormattedMessage id="HistoriskEndring.Modal.Knapp.Bekreft" values={{ handlingstype }} />
                    </Button>
                </Dialog.Footer>
            </Dialog.Popup>
        </Dialog>
    );
};
