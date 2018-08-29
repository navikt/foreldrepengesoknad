import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import classnames from 'classnames';
import { BeregnetUttak } from 'uttaksplan/types';

import './uttaksoversikt.less';

export interface OwnProps {
    uttak: BeregnetUttak[];
}

type Props = OwnProps & InjectedIntlProps;

const Uttaksoversikt: React.StatelessComponent<Props> = ({ uttak }) => {
    return (
        <div className="uttaksoversikt">
            {uttak.map((u, idx) => (
                <div
                    key={idx}
                    className={classnames('uttaksoversikt__konto', {
                        'uttaksoversikt__konto--overforbruk': u.overforbruk
                    })}>
                    <h2 className="uttaksoversikt__navn">{u.navn}</h2>
                    <div className="uttaksoversikt__dager">{u.dager}</div>
                    <div className="uttaksoversikt_post">
                        dag
                        {u.dager !== 1 ? 'er' : ''} igjen
                    </div>
                </div>
            ))}
        </div>
    );
};
export default injectIntl(Uttaksoversikt);
