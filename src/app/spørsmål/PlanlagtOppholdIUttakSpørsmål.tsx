import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';
import UttaksplanSkjemaSpørsmål, {
    UttaksplanSkjemaspørsmålProps
} from '../connected-components/steg-forstegangssoknad/uttaksplan-skjema/UttaksplanSkjemaSpørsmål';

type Props = UttaksplanSkjemaspørsmålProps & InjectedIntlProps;

const PlanlagtOppholdIUttakSpørsmål = (props: Props) => {
    const { visible, intl } = props;

    return (
        <UttaksplanSkjemaSpørsmål
            visible={visible}
            render={(data, onChange) => (
                <JaNeiSpørsmål
                    navn="planlagtOppholdIUttak"
                    spørsmål={getMessage(intl, 'spørsmål.planlagtOppholdIUttak.label')}
                    valgtVerdi={data.harPlanlagtOppholdIUttak}
                    onChange={(harPlanlagtOppholdIUttak) => onChange({ harPlanlagtOppholdIUttak })}
                />
            )}
        />
    );
};

export default injectIntl(PlanlagtOppholdIUttakSpørsmål);
