import * as React from 'react';
import FlervalgSpørsmål from '../../../flervalg-sp\u00F8rsm\u00E5l/FlervalgSp\u00F8rsm\u00E5l';
import { OppholdÅrsakType } from '../../../../types/uttaksplan/periodetyper';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';

export interface OwnProps {
    oppholdsårsak: OppholdÅrsakType | undefined;
    navnAnnenForelder: string;
    onChange: (årsak: OppholdÅrsakType) => void;
}

type Props = OwnProps & InjectedIntlProps;

const UtsettelsePgaUttakAnnenForelderForm: React.StatelessComponent<Props> = ({
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
                    value: OppholdÅrsakType.UttakFellesperiodeAnnenForelder
                },
                {
                    label: getMessage(intl, 'stønadskontotype.FELLESPERIODE'),
                    value: OppholdÅrsakType.UttakKvoteAnnenForelder
                }
            ]}
        />
    </>
);

export default injectIntl(UtsettelsePgaUttakAnnenForelderForm);
