import React from 'react';
export interface AvbrytSøknadDialogProps {
    synlig: boolean;
    onAvbrytSøknad: () => void;
    onFortsettSøknad: () => void;
}
declare const AvbrytSøknadDialog: React.FunctionComponent<AvbrytSøknadDialogProps>;
export default AvbrytSøknadDialog;
