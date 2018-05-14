import * as React from 'react';
import Dato from '../../../elements/dato/Dato';
import { Tidsperiode } from '../../../types';

import './tidsperiodeTekst.less';

export interface Props {
    tidsperiode: Tidsperiode;
    visVarighet?: boolean;
    visSluttdato?: boolean;
}

const TidsperiodeTekst: React.StatelessComponent<Props> = ({
    tidsperiode,
    visVarighet,
    visSluttdato
}) => {
    return (
        <div className="tidsperiodeTekst">
            <span className="tidsperiodeTekst__periode">
                <Dato dato={tidsperiode.startdato} />
                {visSluttdato && (
                    <span>
                        {' '}
                        - <Dato dato={tidsperiode.sluttdato} />
                    </span>
                )}
            </span>
        </div>
    );
};

export default TidsperiodeTekst;
