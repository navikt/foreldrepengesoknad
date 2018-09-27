import * as React from 'react';
import FlervalgSpørsmål from '../../flervalg-spørsmål/FlervalgSpørsmål';
import { OppholdÅrsakType } from '../../../types/uttaksplan/periodetyper';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

export interface OwnProps {
    oppholdsårsak: OppholdÅrsakType | undefined;
    navnAnnenForelder: string;
    onChange: (årsak: OppholdÅrsakType) => void;
}

type Props = OwnProps & InjectedIntlProps;

const HvaErÅrsakTilOppholdSpørsmål: React.StatelessComponent<Props> = ({
    oppholdsårsak,
    onChange,
    navnAnnenForelder,
    intl
}) => (
    <>
        <FlervalgSpørsmål
            navn="oppholdsårsaktype"
            spørsmål={getMessage(intl, 'uttaksplan.skjema.opphold.årsak.spørsmål', { navn: navnAnnenForelder })}
            valgtVerdi={oppholdsårsak}
            onChange={onChange}
            toKolonner={true}
            alternativer={[
                {
                    label: getMessage(intl, 'stønadskontotype.foreldernavn.kvote', { navn: navnAnnenForelder }),
                    value: OppholdÅrsakType.UttakKvoteAnnenForelder
                },
                {
                    label: getMessage(intl, 'stønadskontotype.FELLESPERIODE'),
                    value: OppholdÅrsakType.UttakFellesperiodeAnnenForelder
                }
            ]}
        />
    </>
);

export default injectIntl(HvaErÅrsakTilOppholdSpørsmål);
