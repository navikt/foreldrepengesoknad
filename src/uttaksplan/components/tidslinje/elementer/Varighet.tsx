import * as React from 'react';
import { getUkerOgDagerFromDager } from '../../../utils/uttaksdagerUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

export interface Props {
    dager: number;
}

const Varighet: React.StatelessComponent<Props & InjectedIntlProps> = ({
    dager,
    intl
}) => {
    const ukerOgDager = getUkerOgDagerFromDager(dager);

    return (
        <React.Fragment>
            {intl.formatMessage(
                {
                    id:
                        ukerOgDager.uker > 0
                            ? 'uttaksplan.ukerogdager'
                            : 'uttaksplan.dager'
                },
                { ...ukerOgDager }
            )}
        </React.Fragment>
    );
};

export default injectIntl(Varighet);
