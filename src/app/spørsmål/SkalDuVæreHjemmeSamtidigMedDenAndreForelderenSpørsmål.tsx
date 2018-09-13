import * as React from 'react';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { InputChangeEvent } from '../types/dom/Events';
import getMessage from 'common/util/i18nUtils';

export enum HjemmeSamtidig {
    'SKAL_VÆRE_HJEMME_SAMTIDIG' = 'skalVæreHjemmeSamtidig',
    'SKAL_IKKE_VÆRE_HJEMME_SAMTIDIG' = 'skalIkkeVæreHjemmeSamtidig'
}

interface SkalDuVæreHjemmeSamtidigMedDenAndreForelderenProps {
    skalVæreHjemmeSamtidig?: boolean;
    onChange: (samtidigGradertUttak: boolean) => void;
}

type Props = SkalDuVæreHjemmeSamtidigMedDenAndreForelderenProps & InjectedIntlProps;

const SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål = (props: Props) => {
    const { skalVæreHjemmeSamtidig, onChange, intl } = props;

    let checked;
    if (skalVæreHjemmeSamtidig === true) {
        checked = HjemmeSamtidig.SKAL_VÆRE_HJEMME_SAMTIDIG;
    } else if (skalVæreHjemmeSamtidig === false) {
        checked = HjemmeSamtidig.SKAL_IKKE_VÆRE_HJEMME_SAMTIDIG;
    }

    return (
        <RadioPanelGruppeResponsive
            name="samtidigGradertUttak"
            checked={checked}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: HjemmeSamtidig.SKAL_VÆRE_HJEMME_SAMTIDIG
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: HjemmeSamtidig.SKAL_IKKE_VÆRE_HJEMME_SAMTIDIG
                }
            ]}
            legend={getMessage(intl, 'skalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål.spørsmål')}
            onChange={(e: InputChangeEvent, v: string) => onChange(v === HjemmeSamtidig.SKAL_VÆRE_HJEMME_SAMTIDIG)}
        />
    );
};

export default injectIntl(SkalDuVæreHjemmeSamtidigMedDenAndreForelderenSpørsmål);
