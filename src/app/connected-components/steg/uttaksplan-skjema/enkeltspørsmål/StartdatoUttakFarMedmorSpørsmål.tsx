import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import DatoInput from 'common/components/skjema/elements/dato-input/DatoInput';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';

type Props = UttaksplanSkjemaspørsmålProps & InjectedIntlProps;

const StartdatoPermisjonSpørsmål = (props: Props) => {
    const { visible, intl } = props;

    return (
        <UttaksplanSkjemaSpørsmål
            visible={visible}
            render={(data, onChange) => (
                <DatoInput
                    id="permisjonStartdato"
                    name="permisjonStartdato"
                    label={getMessage(intl, 'spørsmål.startdatoPermisjonFarMedmor.label')}
                    onChange={(startdatoPermisjon) => onChange({ startdatoPermisjon })}
                    dato={data.startdatoPermisjon}
                    disabled={data.skalIkkeHaUttakFørTermin}
                />
            )}
        />
    );
};

export default injectIntl(StartdatoPermisjonSpørsmål);
