import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';
import UttaksplanSkjemaSpørsmål, {
    UttaksplanSkjemaspørsmålProps,
} from '../steg/uttaksplanSkjema/UttaksplanSkjemaSpørsmål';

type Props = UttaksplanSkjemaspørsmålProps;

const PlanlagtOppholdIUttakSpørsmål = (props: Props) => {
    const { visible } = props;
    const intl = useIntl();

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

export default PlanlagtOppholdIUttakSpørsmål;
