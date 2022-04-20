import * as React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { Checkbox } from 'nav-frontend-skjema';
import Block from 'common/components/block/Block';
import { ValidFormContext, ValidFormContextInterface } from 'common/lib/validation/elements/ValiderbarForm';
import getMessage from 'common/util/i18nUtils';
import { getVarighetString } from 'common/util/intlUtils';
import uttaksConstants from 'app/constants';
import { getDefaultPermisjonStartdato } from '../../../util/uttaksplan/permisjonUtils';
import { getValidTidsperiode, Tidsperioden } from '../../../util/uttaksplan/Tidsperioden';
import { Uttaksdagen } from '../../../util/uttaksplan/Uttaksdagen';
import startdatoFørTerminValidators from '../../../util/validation/uttaksplan/startdatoFørTerminValidation';
import { uttaksplanDatoavgrensninger } from '../../../util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import { UttaksplanSkjemadata } from '../uttaksplanSkjemadata';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import VeilederStartdatoPermisjon from './VeilederStartdatoPermisjon';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';

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
        fom: ISOStringToDate(data.startdatoPermisjon),
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
                <DatoInput
                    name="permisjonStartdato"
                    id="permisjonStartdato"
                    label={spørsmålNår}
                    onChange={(startdatoPermisjon) => {
                        onChange({ startdatoPermisjon });
                    }}
                    dato={startdato}
                    disabled={data.skalIkkeHaUttakFørTermin}
                    datoAvgrensinger={{
                        ...datoAvgrensninger,
                        minDato: undefined,
                    }}
                    dayPickerProps={{
                        initialMonth: ISOStringToDate(data.startdatoPermisjon) || familiehendelsesdato,
                    }}
                    allowInvalidDateSelection={true}
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
                    autoComplete="off"
                    onChange={(e) => {
                        onChange({
                            skalIkkeHaUttakFørTermin: e.target.checked,
                            startdatoPermisjon: e.target.checked
                                ? undefined
                                : dateToISOString(getDefaultPermisjonStartdato(familiehendelsesdato)),
                        });
                        if (formContext) {
                            formContext.validateField('permisjonStartdato');
                        }
                    }}
                />
            </Block>
            <Block margin="none" visible={visVeileder}>
                <VeilederStartdatoPermisjon
                    startdato={ISOStringToDate(startdato)}
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
