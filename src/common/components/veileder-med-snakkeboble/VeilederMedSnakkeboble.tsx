import * as React from 'react';
import Veileder, { VeilederProps } from '../veileder/Veileder';
import PersonMedSnakkeboble from 'common/components/person-med-snakkeboble/PersonMedSnakkeboble';

interface Props {
    dialog?: Dialog;
    veileder?: VeilederProps;
}

interface Dialog {
    title: string;
    text: string | React.ReactNode;
}

const VeilederMedSnakkeboble: React.StatelessComponent<Props> = ({ dialog, veileder }) => {
    return (
        <PersonMedSnakkeboble fyltBakgrunn={true} dialog={dialog} personRenderer={() => <Veileder {...veileder} />} />
    );
};

export default VeilederMedSnakkeboble;
