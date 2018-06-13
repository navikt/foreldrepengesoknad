import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { getUkerOgDagerFromDager } from 'common/util/datoUtils';

export interface Props {
    dager: number;
    visKunDager?: boolean;
}

const UkerOgDager: React.StatelessComponent<Props & InjectedIntlProps> = ({
    dager,
    visKunDager,
    intl
}) => {
    if (visKunDager) {
        return (
            <React.Fragment>
                {intl.formatMessage(
                    {
                        id: 'common.varighet.dager'
                    },
                    { dager }
                )}
            </React.Fragment>
        );
    }
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
