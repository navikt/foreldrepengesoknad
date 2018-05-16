import * as React from 'react';
import { getUkerOgDagerFromDager } from '../../../utils/uttaksdagerUtils';
import { FormattedMessage } from 'react-intl';

export interface Props {
    dager: number;
}

const Varighet: React.StatelessComponent<Props> = (props) => {
    const ukerOgDager = getUkerOgDagerFromDager(props.dager);

    return ukerOgDager.uker > 0 ? (
        <FormattedMessage
            id="uttaksplan.ukerogdager"
            values={{ ...ukerOgDager }}
        />
    ) : (
        <FormattedMessage id="uttaksplan.dager" values={{ ...ukerOgDager }} />
    );
};

export default Varighet;
