import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

export enum Omsorgsfordeling {
    'DELT_OMSORG' = 'deltOmsorg',
    'ALENEOMSORG' = 'aleneomsorg'
}

interface BarnFødtBolkProps {
    aleneOmOmsorg?: boolean;
    onChange: (
        erBarnetFødt: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = BarnFødtBolkProps & InjectedIntlProps;

const AleneOmOmsorgsSpørsmål = (props: Props) => {
    const { onChange, aleneOmOmsorg, intl, ...otherProps } = props;

    let checked;
    if (aleneOmOmsorg === true) {
        checked = Omsorgsfordeling.ALENEOMSORG;
    } else if (aleneOmOmsorg === false) {
        checked = Omsorgsfordeling.DELT_OMSORG;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'aleneOmOmsorg.spørsmål')}
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
            name="barnFødt"
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: Omsorgsfordeling
            ) => onChange(v === Omsorgsfordeling.ALENEOMSORG, e)}
            {...otherProps}
        />
    );
};

export default injectIntl(AleneOmOmsorgsSpørsmål);
