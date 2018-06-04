import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getUkerOgDagerFromDager } from 'common/util/datoUtils';

export interface Props {
    dager: number;
}

const UkerOgDager: React.StatelessComponent<Props & InjectedIntlProps> = ({
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
                            ? 'common.varighet.ukerogdager'
                            : 'common.varighet.dager'
                },
                { ...ukerOgDager }
            )}
        </React.Fragment>
    );
};

export default injectIntl(UkerOgDager);
