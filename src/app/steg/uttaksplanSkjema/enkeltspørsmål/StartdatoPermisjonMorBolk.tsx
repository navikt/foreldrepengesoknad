import * as React from 'react';
import { useIntl, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Block from 'common/components/block/Block';
import { Checkbox } from 'nav-frontend-skjema';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import ValiderbarDatoInput from 'common/lib/validation/elements/ValiderbarDatoInput';
import startdatoFørTerminValidators from '../../../util/validation/uttaksplan/startdatoFørTerminValidation';
import { uttaksplanDatoavgrensninger } from '../../../util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import { Tidsperioden, getValidTidsperiode } from '../../../util/uttaksplan/Tidsperioden';
import { getVarighetString } from 'common/util/intlUtils';
import { UttaksplanSkjemadata } from '../uttaksplanSkjemadata';
import { getDefaultPermisjonStartdato } from '../../../util/uttaksplan/permisjonUtils';
import { ValidFormContext, ValidFormContextInterface } from 'common/lib/validation/elements/ValiderbarForm';
import { DateValue } from '../../../types/common';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';
import uttaksConstants from 'app/constants';
import VeilederStartdatoPermisjon from './VeilederStartdatoPermisjon';

interface OwnProps {
    barnetErFødt: boolean;
    familiehendelsesdato: Date;
}

type Props = OwnProps & UttaksplanSkjemaspørsmålProps;

const getVarighetForStartdato = (antallDager: number, barnetErFødt: boolean, intl: IntlShape): string | undefined =>
    antallDager > 0
        ? barnetErFødt
            ? getMessage(intl, 'spørsmål.startdatoPermisjon.barnetErFødt.varighet', {
                  varighet: getVarighetString(antallDager, intl),
              })
            : getMessage(intl, 'spørsmål.startdatoPermisjon.varighet', {
                  varighet: getVarighetString(antallDager, intl),
              })
        : undefined;

const renderContent = (
    props: Props,
    data: Partial<UttaksplanSkjemadata>,
    onChange: (data: Partial<UttaksplanSkjemadata>) => void,
    formContext: ValidFormContextInterface
) => {
    const { barnetErFødt, familiehendelsesdato } = props;
    const intl = useIntl();

    const spørsmålNår = barnetErFødt
        ? getMessage(intl, 'spørsmål.startdatoPermisjon.barnetErFødt.label')
        : getMessage(intl, 'spørsmål.startdatoPermisjon.label');

    const spørsmålHaddeIkke = barnetErFødt
        ? getMessage(intl, 'spørsmål.startdatoPermisjon.skalIkkeHaUttak.barnetErFødt.label')
        : getMessage(intl, 'spørsmål.startdatoPermisjon.skalIkkeHaUttak.label');

    const sisteUttaksdagFørTermin = Uttaksdagen(familiehendelsesdato).forrige();
    const tidsperiode = getValidTidsperiode({
        fom: data.startdatoPermisjon,
        tom: sisteUttaksdagFørTermin,
    });
    const antallDager = tidsperiode ? Tidsperioden(tidsperiode).getAntallUttaksdager() : 0;
    const antallDagerFørFødselIhtRegler = uttaksConstants.ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5;

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
                        minDato: undefined,
                    }}
                    dayPickerProps={{
                        initialMonth: data.startdatoPermisjon ? data.startdatoPermisjon : familiehendelsesdato,
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
                                : getDefaultPermisjonStartdato(familiehendelsesdato),
                        });
                        if (formContext) {
                            formContext.validateField('permisjonStartdato');
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
                    førsteMuligeStartdato={datoAvgrensninger.minDato ? new Date(datoAvgrensninger.minDato) : undefined}
                />
            </Block>
        </>
    );
};

const StartdatoPermisjonMorBolk: React.FunctionComponent<Props> = (props) => {
    const formContext = React.useContext(ValidFormContext);

    return (
        <UttaksplanSkjemaSpørsmål
            harUnderspørsmål={true}
            visible={props.visible}
            render={(data, onChange) => renderContent(props, data, onChange, formContext)}
        />
    );
};

export default StartdatoPermisjonMorBolk;
