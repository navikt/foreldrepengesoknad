import * as React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import { Checkbox } from 'nav-frontend-skjema';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import ValiderbarDatoInput from 'common/lib/validation/elements/ValiderbarDatoInput';
import startdatoFørTerminValidators from '../../../../util/validation/uttaksplan/startdatoFørTerminValidation';
import { uttaksplanDatoavgrensninger } from '../../../../util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import { Tidsperioden, getValidTidsperiode } from '../../../../util/uttaksplan/Tidsperioden';
import { getVarighetString } from 'common/util/intlUtils';
import { UttaksplanSkjemadata } from '../uttaksplanSkjemadata';
import { getPermisjonsregler } from '../../../../util/uttaksplan/permisjonsregler';
import { getDefaultPermisjonStartdato } from '../../../../util/uttaksplan/permisjonUtils';
import { ValidFormContext } from 'common/lib/validation/elements/ValiderbarForm';
import { DateValue } from '../../../../types/common';
import { Uttaksdagen } from '../../../../util/uttaksplan/Uttaksdagen';
import VeilederStartdatoPermisjon from '../../../../components/veilederStartdatoPermisjon/VeilederStartdatoPermisjon';

interface OwnProps {
    barnetErFødt: boolean;
    familiehendelsesdato: Date;
}

type Props = OwnProps & UttaksplanSkjemaspørsmålProps & InjectedIntlProps;

const getVarighetForStartdato = (antallDager: number, barnetErFødt: boolean, intl: InjectedIntl): string | undefined =>
    antallDager > 0
        ? barnetErFødt
            ? getMessage(intl, 'spørsmål.startdatoPermisjon.barnetErFødt.varighet', {
                  varighet: getVarighetString(antallDager, intl)
              })
            : getMessage(intl, 'spørsmål.startdatoPermisjon.varighet', {
                  varighet: getVarighetString(antallDager, intl)
              })
        : undefined;

class StartdatoPermisjonMorBolk extends React.Component<Props> {
    static contextTypes = {
        validForm: PropTypes.object
    };
    context: ValidFormContext;

    renderContent(data: Partial<UttaksplanSkjemadata>, onChange: (data: Partial<UttaksplanSkjemadata>) => void) {
        const { barnetErFødt, familiehendelsesdato, intl } = this.props;

        const spørsmålNår = barnetErFødt
            ? getMessage(intl, 'spørsmål.startdatoPermisjon.barnetErFødt.label')
            : getMessage(intl, 'spørsmål.startdatoPermisjon.label');

        const spørsmålHaddeIkke = barnetErFødt
            ? getMessage(intl, 'spørsmål.startdatoPermisjon.skalIkkeHaUttak.barnetErFødt.label')
            : getMessage(intl, 'spørsmål.startdatoPermisjon.skalIkkeHaUttak.label');

        const permisjonsregler = getPermisjonsregler();
        const sisteUttaksdagFørTermin = Uttaksdagen(familiehendelsesdato).forrige();
        const tidsperiode = getValidTidsperiode({
            fom: data.startdatoPermisjon,
            tom: sisteUttaksdagFørTermin
        });
        const antallDager = tidsperiode ? Tidsperioden(tidsperiode).getAntallUttaksdager() : 0;
        const antallDagerFørFødselIhtRegler = permisjonsregler.antallUkerForeldrepengerFørFødsel * 5;

        const datoAvgrensninger = uttaksplanDatoavgrensninger.startdatoFørTermin(familiehendelsesdato);
        const startdato = data.skalIkkeHaUttakFørTermin !== true ? data.startdatoPermisjon : undefined;

        const visVeileder = antallDager !== antallDagerFørFødselIhtRegler;

        return (
            <>
                <Block margin="xs">
                    <ValiderbarDatoInput
                        name="permisjonStartdato"
                        id="permisjonStartdato"
                        label={spørsmålNår}
                        onChange={(startdatoPermisjon: DateValue) => {
                            onChange({ startdatoPermisjon });
                        }}
                        dato={startdato}
                        disabled={data.skalIkkeHaUttakFørTermin}
                        datoAvgrensinger={{
                            ...datoAvgrensninger,
                            minDato: undefined
                        }}
                        dayPickerProps={{
                            initialMonth: data.startdatoPermisjon ? data.startdatoPermisjon : familiehendelsesdato
                        }}
                        kanVelgeUgyldigDato={true}
                        validators={startdatoFørTerminValidators(
                            intl,
                            data.startdatoPermisjon,
                            familiehendelsesdato,
                            data.skalIkkeHaUttakFørTermin
                        )}
                        postfix={getVarighetForStartdato(antallDager, barnetErFødt, intl)}
                    />
                </Block>
                <Block margin={visVeileder ? 'xs' : 'm'}>
                    <Checkbox
                        name="skalIkkeHaUttakFørTermin"
                        checked={data.skalIkkeHaUttakFørTermin || false}
                        label={spørsmålHaddeIkke}
                        onChange={(e) => {
                            onChange({
                                skalIkkeHaUttakFørTermin: e.target.checked,
                                startdatoPermisjon: e.target.checked
                                    ? undefined
                                    : getDefaultPermisjonStartdato(familiehendelsesdato, permisjonsregler)
                            });
                            if (this.context.validForm) {
                                this.context.validForm.validateField('permisjonStartdato');
                            }
                        }}
                    />
                </Block>
                <Block margin="none" visible={visVeileder}>
                    <VeilederStartdatoPermisjon
                        startdato={startdato}
                        antallDager={antallDager}
                        skalIkkeHaUttakFørTermin={data.skalIkkeHaUttakFørTermin === true}
                        antallDagerFørFødselIhtRegler={antallDagerFørFødselIhtRegler}
                        førsteMuligeStartdato={
                            datoAvgrensninger.minDato ? new Date(datoAvgrensninger.minDato) : undefined
                        }
                    />
                </Block>
            </>
        );
    }

    render() {
        const { visible } = this.props;

        return (
            <UttaksplanSkjemaSpørsmål
                harUnderspørsmål={true}
                visible={visible}
                render={(data, onChange) => this.renderContent(data, onChange)}
            />
        );
    }
}

export default injectIntl(StartdatoPermisjonMorBolk);
