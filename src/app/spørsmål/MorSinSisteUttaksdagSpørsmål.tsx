import * as React from 'react';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntlProps, injectIntl } from 'react-intl';

export interface Props {
    startdato?: Date;
    onChange: (dato: Date) => void;
}

const MorSinSisteUttaksdagSpørsmål: React.StatelessComponent<Props & InjectedIntlProps> = ({
    startdato,
    onChange,
    intl
}) => (
    <>
        <DatoInput
            id="startdatoUttakMor"
            label={getMessage(intl, 'spørsmål.morSinSisteUttaksdag.label')}
            onChange={onChange}
            dato={startdato}
        />
    </>
);

export default injectIntl(MorSinSisteUttaksdagSpørsmål);
