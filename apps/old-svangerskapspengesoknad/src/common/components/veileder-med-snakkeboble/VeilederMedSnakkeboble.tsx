import Veileder, { VeilederProps } from '../veileder/Veileder';
import PersonMedSnakkeboble from 'common/components/person-med-snakkeboble/PersonMedSnakkeboble';

interface Props {
    dialog?: VeilederMedSnakkebobleDialog;
    veileder?: VeilederProps;
}

export interface VeilederMedSnakkebobleDialog {
    title: string;
    text: string | React.ReactNode;
}

const VeilederMedSnakkeboble: React.FunctionComponent<Props> = ({ dialog, veileder }) => {
    return (
        <PersonMedSnakkeboble fyltBakgrunn={true} dialog={dialog} personRenderer={() => <Veileder {...veileder} />} />
    );
};

export default VeilederMedSnakkeboble;
