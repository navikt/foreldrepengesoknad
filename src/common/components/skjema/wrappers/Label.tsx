import * as React from 'react';
import Infoboks from 'common/components/infoboks/Infoboks';
import { CommonSkjemaelementProps } from 'common/components/skjema/wrappers/types/common';
import './styles.less';

export type SkjemaLabelProps = CommonSkjemaelementProps & {
    label: React.ReactNode;
    inputId: string;
};

const InputLabel: React.StatelessComponent<SkjemaLabelProps> = ({ label, infotekst, inputId }) => {
    return (
        <label htmlFor={inputId}>
            {label}
            {infotekst && <Infoboks tekst={infotekst} />}
        </label>
    );
};

export default InputLabel;
