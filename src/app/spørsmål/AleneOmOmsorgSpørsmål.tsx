import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

enum Omsorgsfordeling {
    'DELT_OMSORG' = 'deltOmsorg',
    'ALENEOMSORG' = 'aleneomsorg'
}

interface AleneOmOmsorgsSpørsmålProps {
    aleneOmOmsorg?: boolean;
    onChange: (aleneomsorg: boolean) => void;
}

type Props = AleneOmOmsorgsSpørsmålProps & InjectedIntlProps;

const AleneOmOmsorgsSpørsmål = (props: Props) => {
    const { onChange, aleneOmOmsorg, intl } = props;

    let checked;
    if (aleneOmOmsorg === true) {
        checked = Omsorgsfordeling.ALENEOMSORG;
    } else if (aleneOmOmsorg === false) {
        checked = Omsorgsfordeling.DELT_OMSORG;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'annenForelder.aleneOmOmsorg')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: Omsorgsfordeling.ALENEOMSORG
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: Omsorgsfordeling.DELT_OMSORG
                }
            ]}
            name="omsorgsfordeling"
            infoboksTekst="Du har omsorgen for barnet alene, og du bor ikke sammen med den andre forelderen."
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: Omsorgsfordeling
            ) => onChange(v === Omsorgsfordeling.ALENEOMSORG)}
        />
    );
};

export default injectIntl(AleneOmOmsorgsSpørsmål);
