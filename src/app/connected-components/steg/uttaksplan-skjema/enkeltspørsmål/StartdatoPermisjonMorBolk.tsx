import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import DatoInput from 'common/components/skjema/elements/dato-input/DatoInput';
import Block from 'common/components/block/Block';
import { Checkbox } from 'nav-frontend-skjema';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';

type Props = UttaksplanSkjemaspørsmålProps & InjectedIntlProps;

const StartdatoPermisjonMorBolk = (props: Props) => {
    const { visible, intl } = props;

    return (
        <UttaksplanSkjemaSpørsmål
            harUnderspørsmål={true}
            visible={visible}
            render={(data, onChange) => (
                <>
                    <Block margin="xs">
                        <DatoInput
                            id="permisjonStartdato"
                            label={getMessage(intl, 'spørsmål.startdatoPermisjon.label')}
                            onChange={(startdatoPermisjon) => onChange({ startdatoPermisjon })}
                            dato={data.startdatoPermisjon}
                            disabled={data.skalIkkeHaUttakFørTermin}
                        />
                    </Block>
                    <Block>
                        <Checkbox
                            checked={data.skalIkkeHaUttakFørTermin || false}
                            label={getMessage(intl, 'spørsmål.startdatoPermisjon.skalIkkeHaUttak.label')}
                            onChange={(e) =>
                                onChange({ skalIkkeHaUttakFørTermin: e.target.checked, startdatoPermisjon: undefined })
                            }
                        />
                    </Block>
                </>
            )}
        />
    );
};

export default injectIntl(StartdatoPermisjonMorBolk);
