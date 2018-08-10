import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { InputChangeEvent } from '../types/dom/Events';

interface HarDuRegnskapsførerSpørsmålProps {
    harRegnskapsfører?: boolean;
    onChange: (harDuRegnskapsfører: boolean) => void;
}

type Props = HarDuRegnskapsførerSpørsmålProps & InjectedIntlProps;

enum HarRegnskapsfører {
    'HAR_REGNSKAPSFØRER' = 'harRegnskapsfører',
    'HAR_IKKE_REGNSKAPSFØRER' = 'harIkkeRegnskapsfører'
}

const HarDuRegnskapsførerSpørsmål = (props: Props) => {
    const { onChange, harRegnskapsfører, intl } = props;

    let checked;
    if (harRegnskapsfører === true) {
        checked = HarRegnskapsfører.HAR_REGNSKAPSFØRER;
    } else if (harRegnskapsfører === false) {
        checked = HarRegnskapsfører.HAR_IKKE_REGNSKAPSFØRER;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'harRegnskapsfører.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: HarRegnskapsfører.HAR_REGNSKAPSFØRER
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: HarRegnskapsfører.HAR_IKKE_REGNSKAPSFØRER
                }
            ]}
            name="harDuRegnskapsfører"
            onChange={(e: InputChangeEvent, v: HarRegnskapsfører) =>
                onChange(v === HarRegnskapsfører.HAR_REGNSKAPSFØRER)
            }
        />
    );
};

export default injectIntl(HarDuRegnskapsførerSpørsmål);
