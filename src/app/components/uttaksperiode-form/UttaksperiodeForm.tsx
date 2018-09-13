import * as React from 'react';
import { Periode, Uttaksperiode } from '../../types/uttaksplan/periodetyper';
import { TidsperiodePartial } from 'common/types';
import TidsperiodeBolk from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { RecursivePartial } from '../../types/Partial';

interface Props {
    periode: RecursivePartial<Uttaksperiode>;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

const UttaksperiodeForm = (props: Props) => {
    const { periode, onChange } = props;
    const { tidsperiode } = periode;

    return (
        <React.Fragment>
            <TidsperiodeBolk
                onChange={(t: TidsperiodePartial) => onChange({ tidsperiode: t })}
                tidsperiode={tidsperiode as TidsperiodePartial}
            />
        </React.Fragment>
    );
};

export default UttaksperiodeForm;
