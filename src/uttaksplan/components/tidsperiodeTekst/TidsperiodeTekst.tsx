import * as React from 'react';

import './tidsperiodeTekst.less';
import FormatertDato from 'common/components/formatert-dato/FormatertDato';
import { Tidsperiode } from 'common/types';

export interface Props {
    tidsperiode: Tidsperiode;
    visSluttdato?: boolean;
    visUkedag?: boolean;
}

const TidsperiodeTekst: React.StatelessComponent<Props> = ({
    tidsperiode,
    visUkedag = true,
    visSluttdato
}) => {
    return (
        <div className="tidsperiodeTekst">
            <span className="tidsperiodeTekst__periode">
                <FormatertDato dato={tidsperiode.fom} visUkedag={visUkedag} />
                {visSluttdato && (
                    <span>
                        {' '}
                        -{' '}
                        <FormatertDato
                            dato={tidsperiode.tom}
                            visUkedag={visUkedag}
                        />
                    </span>
                )}
            </span>
        </div>
    );
};

export default TidsperiodeTekst;
