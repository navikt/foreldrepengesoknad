import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-sp\u00F8rsm\u00E5l/JaNeiSp\u00F8rsm\u00E5l';

interface PlanlagtOppholdIUttakSpørsmålProps {
    harPlanlagtOpphold?: boolean;
    onChange: (erBarnetFødt: boolean) => void;
}

type Props = PlanlagtOppholdIUttakSpørsmålProps & InjectedIntlProps;

const PlanlagtOppholdIUttakSpørsmål = (props: Props) => {
    const { onChange, harPlanlagtOpphold, intl } = props;

    return (
        <JaNeiSpørsmål
            navn="planlagtOppholdIUttak"
            spørsmål={getMessage(intl, 'spørsmål.planlagtOppholdIUttak.label')}
            valgtVerdi={harPlanlagtOpphold}
            onChange={onChange}
        />
    );
};

export default injectIntl(PlanlagtOppholdIUttakSpørsmål);
