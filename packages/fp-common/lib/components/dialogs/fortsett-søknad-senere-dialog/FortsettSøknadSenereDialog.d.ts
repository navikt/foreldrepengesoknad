import React from 'react';
export interface Props {
    synlig: boolean;
    onFortsettSøknadSenere: () => void;
    onFortsettSøknad: () => void;
}
declare const FortsettSøknadSenereDialog: React.FunctionComponent<Props>;
export default FortsettSøknadSenereDialog;
