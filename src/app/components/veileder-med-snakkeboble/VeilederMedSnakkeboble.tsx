import * as React from 'react';
import Snakkeboble from '../snakkeboble/Snakkeboble';

import './veilederMedSnakkeboble.less';
import Veileder, { VeilederProps } from '../veileder/Veileder';

interface Props {
    dialog?: Dialog;
    veileder?: VeilederProps;
}

interface Dialog {
    title: string;
    text: string | React.ReactNode;
}

const VeilederMedSnakkeboble: React.StatelessComponent<Props> = ({
    dialog,
    veileder
}) => {
    return (
        <div className="veilederMedSnakkeboble">
            {dialog && (
                <div className="veilederMedSnakkeboble__snakkeboble">
                    <Snakkeboble tittel={dialog.title} tekst={dialog.text} />
                </div>
            )}
            <Veileder {...veileder} />
        </div>
    );
};

export default VeilederMedSnakkeboble;
