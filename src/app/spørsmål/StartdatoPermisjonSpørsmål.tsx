import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import DatoInput from 'common/components/skjema/elements/dato-input/DatoInput';

interface StartdatoPermisjonSpørsmålProps {
    startdato?: Date;
    onChange: (dato: Date) => void;
}

type Props = StartdatoPermisjonSpørsmålProps & InjectedIntlProps;

const StartdatoPermisjonSpørsmål = (props: Props) => {
    const { onChange, startdato, intl } = props;

    return (
        <DatoInput
            id="permisjonStartdato"
            label={getMessage(intl, 'spørsmål.startdatoPermisjon.label')}
            onChange={onChange}
            dato={startdato}
        />
    );
};

export default injectIntl(StartdatoPermisjonSpørsmål);
