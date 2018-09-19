import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import DatoInput from 'common/components/skjema/elements/dato-input/DatoInput';
import Block from 'common/components/block/Block';
import { Checkbox } from 'nav-frontend-skjema';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';

interface OwnProps {
    barnetErFødt: boolean;
}

type Props = OwnProps & UttaksplanSkjemaspørsmålProps & InjectedIntlProps;

const StartdatoPermisjonMorBolk = (props: Props) => {
    const { barnetErFødt, visible, intl } = props;
    const spørsmålNår = barnetErFødt
        ? getMessage(intl, 'spørsmål.startdatoPermisjon.barnetErFødt.label')
        : getMessage(intl, 'spørsmål.startdatoPermisjon.label');

    const spørsmålHaddeIkke = barnetErFødt
        ? getMessage(intl, 'spørsmål.startdatoPermisjon.skalIkkeHaUttak.barnetErFødt.label')
        : getMessage(intl, 'spørsmål.startdatoPermisjon.skalIkkeHaUttak.label');

    return (
        <UttaksplanSkjemaSpørsmål
            harUnderspørsmål={true}
            visible={visible}
            render={(data, onChange) => (
                <>
                    <Block margin="xs">
                        <DatoInput
                            id="permisjonStartdato"
                            label={spørsmålNår}
                            onChange={(startdatoPermisjon) => onChange({ startdatoPermisjon })}
                            dato={data.startdatoPermisjon}
                            disabled={data.skalIkkeHaUttakFørTermin}
                        />
                    </Block>
                    <Block>
                        <Checkbox
                            checked={data.skalIkkeHaUttakFørTermin || false}
                            label={spørsmålHaddeIkke}
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
