import * as React from 'react';
import { PeriodePartial, UtsettelsesperiodePartial } from '../../types/uttaksplan/periodetyper';

interface Props {
    periode: UtsettelsesperiodePartial;
    onChange: (periode: PeriodePartial) => void;
}

const NyUtsettelsesperiodeForm = (props: Props) => {
    return <React.Fragment>Utsettelsesperiode-form</React.Fragment>;
};
export default NyUtsettelsesperiodeForm;
