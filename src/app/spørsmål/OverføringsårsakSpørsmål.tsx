import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { OverføringÅrsakType } from '../types/uttaksplan/periodetyper';
import FlervalgSpørsmål, { FlervalgAlternativ } from '../components/flervalg-spørsmål/FlervalgSpørsmål';

interface OverføringsårsakSpørsmålProps {
    årsak: OverføringÅrsakType | undefined;
    annenForelderNavn: string;
    onChange: (årsak: OverføringÅrsakType) => void;
}

type Props = OverføringsårsakSpørsmålProps & InjectedIntlProps;

const getOverføringsårsakAlternativ = (
    årsak: OverføringÅrsakType,
    annenForelderNavn: string,
    intl: InjectedIntl
): FlervalgAlternativ => ({
    label: intl.formatMessage({ id: `overføringsårsaktype.${årsak}` }, { annenForelderNavn }),
    value: årsak
});

const OverføringsårsakSpørsmål = (props: Props) => {
    const { årsak, annenForelderNavn, intl, onChange } = props;

    return (
        <FlervalgSpørsmål
            navn="overføringsårsak"
            toKolonner={true}
            spørsmål={intl.formatMessage({ id: 'uttaksplan.overføring.årsak.spørsmål' }, { annenForelderNavn })}
            alternativer={[
                getOverføringsårsakAlternativ(
                    OverføringÅrsakType.insititusjonsoppholdAnnenForelder,
                    annenForelderNavn,
                    intl
                ),
                getOverføringsårsakAlternativ(OverføringÅrsakType.sykdomAnnenForelder, annenForelderNavn, intl)
            ]}
            valgtVerdi={årsak}
            onChange={(valgtÅrsak) => onChange(valgtÅrsak as OverføringÅrsakType)}
        />
    );
};

export default injectIntl(OverføringsårsakSpørsmål);
