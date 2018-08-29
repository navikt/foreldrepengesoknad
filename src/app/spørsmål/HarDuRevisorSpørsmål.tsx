import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { InputChangeEvent } from '../types/dom/Events';

interface HarDuRevisorSpørsmålProps {
    harRevisor?: boolean;
    onChange: (harDuRevisor: boolean) => void;
}

type Props = HarDuRevisorSpørsmålProps & InjectedIntlProps;

enum HarRevisor {
    'HAR_REVISOR' = 'harRevisor',
    'HAR_IKKE_REVISOR' = 'harIkkeRevisor'
}

const HarDuRevisorSpørsmål = (props: Props) => {
    const { onChange, harRevisor, intl } = props;

    let checked;
    if (harRevisor === true) {
        checked = HarRevisor.HAR_REVISOR;
    } else if (harRevisor === false) {
        checked = HarRevisor.HAR_IKKE_REVISOR;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'harRevisor.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: HarRevisor.HAR_REVISOR
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: HarRevisor.HAR_IKKE_REVISOR
                }
            ]}
            name="harDuRevisor"
            onChange={(e: InputChangeEvent, v: HarRevisor) => onChange(v === HarRevisor.HAR_REVISOR)}
        />
    );
};

export default injectIntl(HarDuRevisorSpørsmål);
