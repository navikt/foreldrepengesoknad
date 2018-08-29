import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Forelder } from 'common/types';

export interface OwnProps {
    forelder: Forelder;
    navn?: string;
    capitalize?: boolean;
}

export type Props = OwnProps & InjectedIntlProps;

const Foreldernavn: React.StatelessComponent<Props> = ({ forelder, navn, capitalize, intl }) => {
    let foreldernavn: string;
    if (navn !== undefined && navn !== '') {
        foreldernavn = navn;
    } else {
        const cap = capitalize ? 'F' : 'f';
        const nr = forelder === 'forelder1' ? 1 : 2;
        foreldernavn = intl.formatMessage({
            id: `uttaksplan.${cap}orelder${nr}`
        });
    }
    return <React.Fragment>{foreldernavn}</React.Fragment>;
};

export default injectIntl(Foreldernavn);
