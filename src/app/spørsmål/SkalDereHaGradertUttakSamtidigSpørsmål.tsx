import * as React from 'react';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { InputChangeEvent } from '../types/dom/Events';
import getMessage from 'common/util/i18nUtils';

export enum GradertUttak {
    'SKAL_HA_SAMTIDIG_GRADERT_UTTAK' = 'skalHaSamtidigGradertUttak',
    'SKAL_IKKE_HA_SAMTIDIG_GRADERT_UTTAK' = 'skalIkkeHaSamtidigGradertUttak'
}

interface SkalDereHaGradertUttakSamtidigSpørsmålProps {
    samtidigGradertUttak?: boolean;
    onChange: (samtidigGradertUttak: boolean) => void;
}

type Props = SkalDereHaGradertUttakSamtidigSpørsmålProps & InjectedIntlProps;

const SkalDereHaGradertUttakSamtidigSpørsmål = (props: Props) => {
    const { samtidigGradertUttak, onChange, intl } = props;

    let checked;
    if (samtidigGradertUttak === true) {
        checked = GradertUttak.SKAL_HA_SAMTIDIG_GRADERT_UTTAK;
    } else if (samtidigGradertUttak === false) {
        checked = GradertUttak.SKAL_IKKE_HA_SAMTIDIG_GRADERT_UTTAK;
    }

    return (
        <RadioPanelGruppeResponsive
            name="samtidigGradertUttak"
            checked={checked}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: GradertUttak.SKAL_HA_SAMTIDIG_GRADERT_UTTAK
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: GradertUttak.SKAL_IKKE_HA_SAMTIDIG_GRADERT_UTTAK
                }
            ]}
            legend={getMessage(intl, 'skalDereHaGradertUttakSamtidig.spørsmål')}
            onChange={(e: InputChangeEvent, v: string) => onChange(v === GradertUttak.SKAL_HA_SAMTIDIG_GRADERT_UTTAK)}
        />
    );
};

export default injectIntl(SkalDereHaGradertUttakSamtidigSpørsmål);
