import * as React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import { PeriodePartial, UtsettelsesperiodePartial } from '../../types/uttaksplan/periodetyper';
import { TidsperiodePartial } from 'common/types';
import TidsperiodeBolk from '../../bolker/TidsperiodeBolk';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';

interface Props {
    periode: UtsettelsesperiodePartial;
    onChange: (periode: PeriodePartial) => void;
}

const NyUtsettelsesperiodeForm = (props: Props) => {
    const { periode, onChange } = props;
    const { tidsperiode } = periode;
    const bem = BEMHelper('nyPeriodeForm');

    return (
        <React.Fragment>
            <Block margin="s">
                <EtikettLiten className={bem.element('heading')}>Ny utsettelse</EtikettLiten>
            </Block>
            <TidsperiodeBolk
                onChange={(t: TidsperiodePartial) => onChange({ tidsperiode: t })}
                tidsperiode={tidsperiode as TidsperiodePartial}
            />
        </React.Fragment>
    );
};
export default NyUtsettelsesperiodeForm;
