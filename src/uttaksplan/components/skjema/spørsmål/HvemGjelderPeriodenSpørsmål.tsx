import * as React from 'react';
import Radioliste from 'uttaksplan/components/radioliste/Radioliste';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Forelder } from 'common/types';
import { Feil } from 'common/components/skjema/elements/skjema-input-element/types';

export interface OwnProps {
    spørsmål: string;
    forelder?: Forelder;
    navnForelder1?: string;
    navnForelder2?: string;
    feil?: Feil;
    onChange: (forelder: Forelder) => void;
}

export type Props = OwnProps & InjectedIntlProps;

const HvemGjelderPeriodenSpørsmål: React.StatelessComponent<Props> = ({
    spørsmål,
    forelder,
    navnForelder1,
    navnForelder2,
    feil,
    onChange,
    intl
}) => (
    <Radioliste
        kolonner="2"
        tittel={spørsmål}
        inputnavn="forelder"
        stil="ekstern"
        feil={feil}
        valg={[
            {
                tittel:
                    navnForelder1 ||
                    intl.formatMessage({
                        id: 'uttaksplan.Forelder1'
                    }),
                verdi: 'forelder1'
            },
            {
                tittel:
                    navnForelder2 ||
                    intl.formatMessage({
                        id: 'uttaksplan.Forelder2'
                    }),
                verdi: 'forelder2'
            }
        ]}
        valgtVerdi={forelder}
        onChange={(value) => {
            onChange(value as Forelder);
        }}
    />
);

export default injectIntl(HvemGjelderPeriodenSpørsmål);
