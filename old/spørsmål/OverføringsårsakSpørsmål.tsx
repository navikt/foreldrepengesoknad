import * as React from 'react';
import { useIntl, IntlShape } from 'react-intl';
import { OverføringÅrsakType } from '../types/uttaksplan/periodetyper';
import FlervalgSpørsmål from '../../common/components/skjema/elements/flervalg-spørsmål/FlervalgSpørsmål';
import { getNavnGenitivEierform } from '../util/tekstUtils';
import { RadioProps } from 'nav-frontend-skjema';

interface OverføringsårsakSpørsmålProps {
    årsak: OverføringÅrsakType | undefined;
    annenForelderNavn: string;
    onChange: (årsak: OverføringÅrsakType) => void;
    visAleneomsorgSomMuligÅrsak: boolean;
}

type Props = OverføringsårsakSpørsmålProps;

const getOverføringsårsakAlternativ = (
    årsak: OverføringÅrsakType,
    annenForelderNavn: string,
    radioName: string,
    intl: IntlShape
): RadioProps => ({
    label: intl.formatMessage({ id: `overføringsårsaktype.${årsak}` }, { annenForelderNavn }),
    value: årsak,
    name: radioName,
});

const OverføringsårsakSpørsmål = (props: Props) => {
    const { årsak, annenForelderNavn, visAleneomsorgSomMuligÅrsak, onChange } = props;
    const intl = useIntl();
    const radioName = 'overføringsårsak';

    const alternativer = [
        getOverføringsårsakAlternativ(
            OverføringÅrsakType.institusjonsoppholdAnnenForelder,
            annenForelderNavn,
            radioName,
            intl
        ),
        getOverføringsårsakAlternativ(OverføringÅrsakType.sykdomAnnenForelder, annenForelderNavn, radioName, intl),
    ];

    if (visAleneomsorgSomMuligÅrsak) {
        alternativer.push(
            getOverføringsårsakAlternativ(OverføringÅrsakType.aleneomsorg, annenForelderNavn, radioName, intl)
        );
        alternativer.push(
            getOverføringsårsakAlternativ(OverføringÅrsakType.ikkeRettAnnenForelder, annenForelderNavn, radioName, intl)
        );
    }

    return (
        <FlervalgSpørsmål
            navn={radioName}
            toKolonner={true}
            spørsmål={intl.formatMessage(
                { id: 'uttaksplan.overføring.årsak.spørsmål' },
                { annenForelderNavn: getNavnGenitivEierform(annenForelderNavn, intl.locale) }
            )}
            alternativer={alternativer}
            valgtVerdi={årsak}
            onChange={(valgtÅrsak) => onChange(valgtÅrsak as OverføringÅrsakType)}
        />
    );
};

export default OverføringsårsakSpørsmål;
