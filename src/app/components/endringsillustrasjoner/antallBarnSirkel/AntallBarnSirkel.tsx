import * as React from 'react';
import Sirkelmaske from 'common/components/sirkelmaske/Sirkelmaske';
import TåteflaskeIkon from 'common/components/ikoner/TåteflaskeIkon';
import BEMHelper from 'common/util/bem';

import './antallBarnSirkel.less';

interface Props {
    antallBarn: number;
}

const bem = BEMHelper('antallBarnSirkel');

const renderBarn = (antall: number) => {
    const barn: React.ReactNode[] = [];
    while (barn.length < antall) {
        barn.push(<TåteflaskeIkon key={barn.length} />);
    }
    return barn;
};

const AntallBarnSirkel: React.StatelessComponent<Props> = ({ antallBarn }) => {
    return (
        <div className={bem.className}>
            <div className={bem.element('ikon', `antall-${antallBarn}`)}>
                <Sirkelmaske diameter="5rem">
                    <div className={bem.element('svgs', `antall-${antallBarn}`)}>{renderBarn(antallBarn)}</div>
                </Sirkelmaske>
            </div>
        </div>
    );
};

export default AntallBarnSirkel;
