import * as React from 'react';
import { PeriodePartial, UttaksperiodePartial } from '../../types/uttaksplan/periodetyper';
import { TidsperiodePartial } from 'common/types';
import TidsperiodeBolk from '../../bolker/TidsperiodeBolk';

interface Props {
    periode: UttaksperiodePartial;
    onChange: (periode: PeriodePartial) => void;
}

const NyUttaksperiodeForm = (props: Props) => {
    const { periode, onChange } = props;
    const { tidsperiode } = periode;
    return (
        <React.Fragment>
            <h2>Uttaksperiode-form</h2>
            <TidsperiodeBolk
                onChange={(t: TidsperiodePartial) => onChange({ tidsperiode: t })}
                tidsperiode={tidsperiode as TidsperiodePartial}
            />
        </React.Fragment>
    );
};

export default NyUttaksperiodeForm;
