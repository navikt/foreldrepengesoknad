import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Radioliste from 'uttaksplan/components/radioliste/Radioliste';
import { Feil } from 'common/components/skjema-input-element/types';
import { Forelder } from 'common/types';
import { UtsettelseÅrsakType } from 'uttaksplan/types';

export interface OwnProps {
    utsettelsesårsak?: UtsettelseÅrsakType;
    forelder: Forelder;
    navnForelder1?: string;
    navnForelder2?: string;
    feil?: Feil;
    onChange: (årsak: UtsettelseÅrsakType) => void;
}

export type Props = OwnProps & InjectedIntlProps;

const UtsettelsesårsakSpørsmål: React.StatelessComponent<Props> = ({
    utsettelsesårsak,
    forelder,
    navnForelder1,
    navnForelder2,
    feil,
    onChange,
    intl
}) => (
    <Radioliste
        tittel={
            <FormattedMessage
                id="uttaksplan.utsettelseskjema.årsak.sporsmal"
                values={{
                    navn:
                        forelder === 'forelder1'
                            ? 'du'
                            : navnForelder2 ||
                              intl
                                  .formatMessage({
                                      id: 'uttaksplan.forelder2'
                                  })
                                  .toLowerCase()
                }}
            />
        }
        stil="ekstern"
        feil={feil}
        valg={[
            {
                tittel: intl.formatMessage({
                    id: 'uttaksplan.utsettelseskjema.årsak.arbeid'
                }),
                verdi: UtsettelseÅrsakType.Arbeid
            },
            {
                tittel: intl.formatMessage({
                    id: 'uttaksplan.utsettelseskjema.årsak.ferie'
                }),
                verdi: UtsettelseÅrsakType.Ferie
            }
        ]}
        inputnavn="utsettelse"
        valgtVerdi={utsettelsesårsak}
        onChange={(value) => onChange(value as UtsettelseÅrsakType)}
    />
);

export default injectIntl(UtsettelsesårsakSpørsmål);
