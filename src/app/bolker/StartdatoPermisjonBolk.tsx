import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import DatoInput from 'common/components/skjema/elements/dato-input/DatoInput';
import Block from 'common/components/block/Block';
import { Checkbox } from 'nav-frontend-skjema';

interface StartdatoPermisjonSpørsmålProps {
    startdato?: Date;
    skalIkkeHaUttakFørTermin?: boolean;
    onDatoChange: (dato: Date) => void;
    onSkalIkkeHaUttakChange: (skalIkkeHaUttakFørTermin: boolean) => void;
}

type Props = StartdatoPermisjonSpørsmålProps & InjectedIntlProps;

const StartdatoPermisjonSpørsmål = (props: Props) => {
    const { onDatoChange, onSkalIkkeHaUttakChange, startdato, skalIkkeHaUttakFørTermin, intl } = props;

    return (
        <>
            <Block margin="xs">
                <DatoInput
                    id="permisjonStartdato"
                    label={getMessage(intl, 'spørsmål.startdatoPermisjon.label')}
                    onChange={onDatoChange}
                    dato={startdato}
                    disabled={skalIkkeHaUttakFørTermin}
                />
            </Block>
            <Block>
                <Checkbox
                    checked={skalIkkeHaUttakFørTermin || false}
                    label={getMessage(intl, 'spørsmål.startdatoPermisjon.skalIkkeHaUttak.label')}
                    onChange={(e) => onSkalIkkeHaUttakChange(e.target.checked)}
                />
            </Block>
        </>
    );
};

export default injectIntl(StartdatoPermisjonSpørsmål);
