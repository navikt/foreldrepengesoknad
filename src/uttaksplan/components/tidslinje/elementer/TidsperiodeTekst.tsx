import * as React from 'react';
import { Tidsperiode } from '../../../types';

import './tidsperiodeTekst.less';
import FormatertDato from 'common/components/formatert-dato/FormatertDato';

export interface Props {
    tidsperiode: Tidsperiode;
    visSluttdato?: boolean;
}

const TidsperiodeTekst: React.StatelessComponent<Props> = ({
    tidsperiode,
    visSluttdato
}) => {
    return (
        <div className="tidsperiodeTekst">
            <span className="tidsperiodeTekst__periode">
                <FormatertDato dato={tidsperiode.startdato} />
                {visSluttdato && (
                    <span>
                        {' '}
                        - <FormatertDato dato={tidsperiode.sluttdato} />
                    </span>
                )}
            </span>
        </div>
    );
};

export default TidsperiodeTekst;
