import * as React from 'react';
import { PeriodePartial, UttaksperiodePartial } from '../../types/uttaksplan/periodetyper';

interface Props {
    periode: UttaksperiodePartial;
    onChange: (periode: PeriodePartial) => void;
}

const NyUttaksperiodeForm = (props: Props) => {
    return <React.Fragment>Uttaksperiode-form</React.Fragment>;
};
export default NyUttaksperiodeForm;
