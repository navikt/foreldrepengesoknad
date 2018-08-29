import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

enum FarEllerMedmor {
    'SKAL_HA_FORELDREPENGER' = 'skalHaForeldrepenger',
    'SKAL_IKKE_HA_FORELDREPENGER' = 'skalIkkeHaForeldrepenger'
}

interface SkalFarEllerMedmorHaForeldrepengerSpørsmålProps {
    navn?: string;
    skalFarEllerMedmorHaForeldrepenger?: boolean;
    onChange: (harAnnenForelderRettPåForeldrepenger: boolean) => void;
}

type Props = SkalFarEllerMedmorHaForeldrepengerSpørsmålProps & InjectedIntlProps;

const SkalFarEllerMedmorHaForeldrepengerSpørsmål = (props: Props) => {
    const { navn, onChange, skalFarEllerMedmorHaForeldrepenger, intl } = props;

    let checked;
    if (skalFarEllerMedmorHaForeldrepenger === true) {
        checked = FarEllerMedmor.SKAL_HA_FORELDREPENGER;
    } else if (skalFarEllerMedmorHaForeldrepenger === false) {
        checked = FarEllerMedmor.SKAL_IKKE_HA_FORELDREPENGER;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'skalFarEllerMedmorHaForeldrepenger.spørsmål', { navn })}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: FarEllerMedmor.SKAL_HA_FORELDREPENGER
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: FarEllerMedmor.SKAL_IKKE_HA_FORELDREPENGER
                }
            ]}
            name="skalFarEllerMedmorHaForeldrepenger"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: FarEllerMedmor) =>
                onChange(v === FarEllerMedmor.SKAL_HA_FORELDREPENGER)
            }
        />
    );
};

export default injectIntl(SkalFarEllerMedmorHaForeldrepengerSpørsmål);
