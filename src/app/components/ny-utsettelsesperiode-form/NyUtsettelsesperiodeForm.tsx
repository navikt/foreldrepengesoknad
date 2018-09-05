import * as React from 'react';
import { PeriodePartial, UtsettelsesperiodePartial } from '../../types/uttaksplan/periodetyper';
import { TidsperiodePartial } from 'common/types';
import TidsperiodeBolk from '../../bolker/TidsperiodeBolk';

interface Props {
    periode: UtsettelsesperiodePartial;
    onChange: (periode: PeriodePartial) => void;
}

const NyUtsettelsesperiodeForm = (props: Props) => {
    const { periode, onChange } = props;
    const { tidsperiode } = periode;
    return (
        <React.Fragment>
            <h2>Utsettelsesperiode-form</h2>
            <TidsperiodeBolk
                onChange={(t: TidsperiodePartial) => onChange({ tidsperiode: t })}
                tidsperiode={tidsperiode as TidsperiodePartial}
            />
        </React.Fragment>
    );
};
export default NyUtsettelsesperiodeForm;
