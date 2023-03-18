import React from 'react';
import { ModalProps } from '@navikt/ds-react';
export interface BekreftDialogProps extends ModalProps {
    tittel?: string;
    onBekreft: () => void;
    onAvbryt?: () => void;
    bekreftLabel: string;
    avbrytLabel: string;
}
declare const BekreftDialog: React.FunctionComponent<BekreftDialogProps>;
export default BekreftDialog;
