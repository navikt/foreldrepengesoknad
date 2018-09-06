import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { UtsettelseÅrsakType } from '../types/uttaksplan/periodetyper';

interface HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmålProps {
    årsak?: UtsettelseÅrsakType;
    onChange: (grunn: UtsettelseÅrsakType) => void;
}

type Props = HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmålProps & InjectedIntlProps;

const HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål = (props: Props) => {
    const { onChange, årsak, intl } = props;

    return (
        <RadioPanelGruppeResponsive
            checked={årsak}
            legend={getMessage(intl, 'nyIArbeidslivet.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'jegskalhaferie'),
                    value: UtsettelseÅrsakType.Ferie
                },
                {
                    label: getMessage(intl, 'jegskaliarbeid'),
                    value: UtsettelseÅrsakType.Arbeid
                },
                {
                    label: getMessage(intl, 'pgasykdom'),
                    value: UtsettelseÅrsakType.Sykdom
                }
            ]}
            name="årsakTilUtsettelse"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: UtsettelseÅrsakType) => onChange(v)}
        />
    );
};

export default injectIntl(HvaErGrunnenTilAtDuSkalUtsetteDittUttakSpørsmål);
