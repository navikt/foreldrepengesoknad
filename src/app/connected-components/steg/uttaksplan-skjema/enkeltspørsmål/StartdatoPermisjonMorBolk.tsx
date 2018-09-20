import * as React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import { Checkbox } from 'nav-frontend-skjema';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import ValiderbarDatoInput from 'common/lib/validation/elements/ValiderbarDatoInput';
import StartdatoFørTerminValidation from '../../../../util/validation/uttaksplan/startdatoF\u00F8rTerminValidation';
import { ValidFormContext } from 'common/lib/validation/elements/ValiderbarForm';

interface OwnProps {
    barnetErFødt: boolean;
    familiehendelsesdato: Date;
}

type Props = OwnProps & UttaksplanSkjemaspørsmålProps & InjectedIntlProps;

class StartdatoPermisjonMorBolk extends React.Component<Props> {
    static contextTypes = {
        validForm: PropTypes.object
    };
    render() {
        const validForm: ValidFormContext = this.context.validForm;
        console.log(validForm);
        const { barnetErFødt, familiehendelsesdato, visible, intl } = this.props;
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
                            <ValiderbarDatoInput
                                id="permisjonStartdato"
                                label={spørsmålNår}
                                onChange={(startdatoPermisjon: Date | undefined) => onChange({ startdatoPermisjon })}
                                dato={data.startdatoPermisjon}
                                disabled={data.skalIkkeHaUttakFørTermin}
                                avgrensninger={StartdatoFørTerminValidation.getDatoavgrensninger(familiehendelsesdato)}
                                dayPickerProps={{
                                    month: data.startdatoPermisjon ? data.startdatoPermisjon : familiehendelsesdato
                                }}
                                validators={StartdatoFørTerminValidation.getValidators(
                                    intl,
                                    data.startdatoPermisjon,
                                    familiehendelsesdato,
                                    data.skalIkkeHaUttakFørTermin
                                )}
                            />
                        </Block>
                        <Block>
                            <Checkbox
                                checked={data.skalIkkeHaUttakFørTermin || false}
                                label={spørsmålHaddeIkke}
                                onChange={(e) => {
                                    onChange({
                                        skalIkkeHaUttakFørTermin: e.target.checked,
                                        startdatoPermisjon: undefined
                                    });
                                    validForm.validateField('permisjonStartdato');
                                }}
                            />
                        </Block>
                    </>
                )}
            />
        );
    }
}

export default injectIntl(StartdatoPermisjonMorBolk);
