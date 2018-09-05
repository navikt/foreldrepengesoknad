import * as React from 'react';
import { PeriodePartial, UttaksperiodePartial } from '../../types/uttaksplan/periodetyper';
import { TidsperiodePartial } from 'common/types';
import TidsperiodeBolk from '../../bolker/TidsperiodeBolk';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';

interface Props {
    periode: UttaksperiodePartial;
    onChange: (periode: PeriodePartial) => void;
}

const NyUttaksperiodeForm = (props: Props) => {
    const { periode, onChange } = props;
    const { tidsperiode } = periode;
    const bem = BEMHelper('nyPeriodeForm');

    return (
        <React.Fragment>
            <Block margin="s">
                <EtikettLiten className={bem.element('heading')}>Ny periode med uttak</EtikettLiten>
            </Block>
            <TidsperiodeBolk
                onChange={(t: TidsperiodePartial) => onChange({ tidsperiode: t })}
                tidsperiode={tidsperiode as TidsperiodePartial}
            />
        </React.Fragment>
    );
};

export default NyUttaksperiodeForm;
