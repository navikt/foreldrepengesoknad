import * as React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import { Periode, Utsettelsesperiode } from '../../types/uttaksplan/periodetyper';
import { TidsperiodePartial } from 'common/types';
import { RecursivePartial } from '../../types/Partial';
import TidsperiodeBolk from '../../bolker/TidsperiodeBolk';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål from '../../spørsmål/HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål';

interface Props {
    periode: RecursivePartial<Utsettelsesperiode>;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

const UtsettelsesperiodeForm = (props: Props) => {
    const { periode, onChange } = props;
    const { tidsperiode, årsak } = periode;
    const bem = BEMHelper('periodeForm');

    return (
        <React.Fragment>
            <Block margin="s">
                <EtikettLiten className={bem.element('heading')}>Ny utsettelse</EtikettLiten>
            </Block>
            <Block margin="s">
                <TidsperiodeBolk
                    onChange={(v: TidsperiodePartial) => onChange({ tidsperiode: v })}
                    tidsperiode={tidsperiode as TidsperiodePartial}
                />
            </Block>
            <Block margin="s">
                <HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål
                    onChange={(v) => onChange({ årsak: v })}
                    årsak={årsak}
                />
            </Block>
        </React.Fragment>
    );
};

export default UtsettelsesperiodeForm;
