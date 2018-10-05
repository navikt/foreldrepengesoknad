import * as React from 'react';
import moment from 'moment';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import { Checkbox } from 'nav-frontend-skjema';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import ValiderbarDatoInput from 'common/lib/validation/elements/ValiderbarDatoInput';
import startdatoFørTerminValidators from '../../../../util/validation/uttaksplan/startdatoFørTerminValidation';
import { uttaksplanDatoavgrensninger } from '../../../../util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import { Tidsperioden } from '../../../../util/uttaksplan/Tidsperioden';
import { getVarighetString } from 'common/util/intlUtils';
import { UttaksplanSkjemadata } from '../uttaksplanSkjemadata';
import { getPermisjonsregler } from '../../../../util/uttaksplan/permisjonsregler';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { Uttaksdagen } from '../../../../util/uttaksplan/Uttaksdagen';
import { getDefaultPermisjonStartdato } from '../../../../util/uttaksplan/permisjonUtils';

interface OwnProps {
    barnetErFødt: boolean;
    familiehendelsesdato: Date;
}

type Props = OwnProps & UttaksplanSkjemaspørsmålProps & InjectedIntlProps;

const getAntallUttaksdager = (fom: Date | undefined, tom: Date | undefined): number | undefined => {
    if (fom !== undefined && tom !== undefined && moment(fom).isBefore(tom)) {
        return Tidsperioden({
            fom,
            tom: Uttaksdagen(tom).forrige()
        }).getAntallUttaksdager();
    }
    return undefined;
};

const getVarighet = (fom: Date | undefined, tom: Date | undefined, intl: InjectedIntl): string | undefined => {
    const antallDager = getAntallUttaksdager(fom, tom);
    return antallDager !== undefined ? getVarighetString(antallDager, intl) : undefined;
};

class StartdatoPermisjonMorBolk extends React.Component<Props> {
    renderContent(data: Partial<UttaksplanSkjemadata>, onChange: (data: Partial<UttaksplanSkjemadata>) => void) {
        const { barnetErFødt, familiehendelsesdato, intl } = this.props;
        const spørsmålNår = barnetErFødt
            ? getMessage(intl, 'spørsmål.startdatoPermisjon.barnetErFødt.label')
            : getMessage(intl, 'spørsmål.startdatoPermisjon.label');

        const spørsmålHaddeIkke = barnetErFødt
            ? getMessage(intl, 'spørsmål.startdatoPermisjon.skalIkkeHaUttak.barnetErFødt.label')
            : getMessage(intl, 'spørsmål.startdatoPermisjon.skalIkkeHaUttak.label');

        const antallDager = getAntallUttaksdager(data.startdatoPermisjon, familiehendelsesdato);
        const permisjonsregler = getPermisjonsregler();
        const visVeileder =
            antallDager !== undefined && antallDager > permisjonsregler.antallUkerForeldrepengerFørFødsel * 5;

        const startdato = data.skalIkkeHaUttakFørTermin !== true ? data.startdatoPermisjon : undefined;

        const varighet = getVarighet(startdato, familiehendelsesdato, intl);
        const varighetString =
            varighet !== undefined
                ? barnetErFødt
                    ? getMessage(intl, 'spørsmål.startdatoPermisjon.barnetErFødt.varighet', { varighet })
                    : getMessage(intl, 'spørsmål.startdatoPermisjon.varighet', { varighet })
                : undefined;
        return (
            <>
                <Block margin="xs">
                    <ValiderbarDatoInput
                        name="permisjonStartdato"
                        id="permisjonStartdato"
                        label={spørsmålNår}
                        onChange={(startdatoPermisjon: Date | undefined) => {
                            onChange({ startdatoPermisjon });
                        }}
                        dato={startdato}
                        disabled={data.skalIkkeHaUttakFørTermin}
                        avgrensninger={uttaksplanDatoavgrensninger.startdatoFørTermin(familiehendelsesdato)}
                        dayPickerProps={{
                            initialMonth: data.startdatoPermisjon ? data.startdatoPermisjon : familiehendelsesdato
                        }}
                        validators={startdatoFørTerminValidators(
                            intl,
                            data.startdatoPermisjon,
                            familiehendelsesdato,
                            data.skalIkkeHaUttakFørTermin
                        )}
                        postfix={varighetString}
                    />
                </Block>
                <Block margin={visVeileder ? 'xs' : 'm'}>
                    <Checkbox
                        checked={data.skalIkkeHaUttakFørTermin || false}
                        label={spørsmålHaddeIkke}
                        onChange={(e) => {
                            onChange({
                                skalIkkeHaUttakFørTermin: e.target.checked,
                                startdatoPermisjon: e.target.checked
                                    ? undefined
                                    : getDefaultPermisjonStartdato(familiehendelsesdato, permisjonsregler)
                            });
                        }}
                    />
                </Block>
                <Block margin="none" visible={visVeileder}>
                    <Veilederinfo>Informason når en har lenger enn tre uker permisjon før fødsel</Veilederinfo>
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
