import * as React from 'react';
import { Periode, Uttaksperiode } from '../../types/uttaksplan/periodetyper';
import { TidsperiodePartial } from 'common/types';
import TidsperiodeBolk from '../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import { RecursivePartial } from '../../types/Partial';

interface Props {
    periode: RecursivePartial<Uttaksperiode>;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

const UttaksperiodeForm = (props: Props) => {
    const { periode, onChange } = props;
    const { tidsperiode } = periode;
    const bem = BEMHelper('periodeForm');

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

export default UttaksperiodeForm;
