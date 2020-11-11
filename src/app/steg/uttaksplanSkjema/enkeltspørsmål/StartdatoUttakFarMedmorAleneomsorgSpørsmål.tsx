import * as React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { RadioProps } from 'nav-frontend-skjema';
import Block from 'common/components/block/Block';
import ValiderbarDatoInput from 'common/lib/validation/elements/ValiderbarDatoInput';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import getMessage from 'common/util/i18nUtils';
import FlervalgSpørsmål from '../../../../common/components/skjema/elements/flervalg-spørsmål/FlervalgSpørsmål';
import { DateValue } from '../../../types/common';
import startdatoFarMedmorValidation from '../../../util/validation/uttaksplan/startdatoFarMedmorValidation';
import { uttaksplanDatoavgrensninger } from '../../../util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import { ValgalternativerAleneomsorgFarMedmor } from '../uttaksplanSkjemadata';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';

interface OwnProps {
    familiehendelsesdato: Date;
    datoForAleneomsorg: Date;
}

type Props = UttaksplanSkjemaspørsmålProps & OwnProps;

const getAlternativ = (intl: IntlShape, alternativ: ValgalternativerAleneomsorgFarMedmor, dato?: Date): RadioProps => {
    return {
        label: getMessage(
            intl,
            `uttaksplan.skjema.startdatoAleneomsorgFarMedmor.alternativ.${alternativ}`,
            dato ? { dato: formaterDatoUtenDag(dato) } : undefined
        ),
        value: alternativ,
        name: 'startdatoUttakFarMedmorAleneomsorg',
    };
};

const getStartdatoFromAlternativ = (
    alternativ: ValgalternativerAleneomsorgFarMedmor,
    datoForAleneomsorg: Date,
    valgtVerdi?: Date
): DateValue => {
    if (alternativ === ValgalternativerAleneomsorgFarMedmor.datoForAleneomsorg) {
        return datoForAleneomsorg;
    }
    return valgtVerdi;
};

const StartdatoUttakFarMedmorAleneomsorgSpørsmål = (props: Props) => {
    const { visible, datoForAleneomsorg, familiehendelsesdato } = props;
    const intl = useIntl();

    const alternativer: RadioProps[] = [
        getAlternativ(intl, ValgalternativerAleneomsorgFarMedmor.datoForAleneomsorg, datoForAleneomsorg),
        getAlternativ(intl, ValgalternativerAleneomsorgFarMedmor.annen),
    ];

    const avgrensningerAnnenDato = uttaksplanDatoavgrensninger.startdatoPermisjonAleneomsorgFarMedmor(
        datoForAleneomsorg,
        familiehendelsesdato
    );
    return (
        <UttaksplanSkjemaSpørsmål
            harUnderspørsmål={true}
            visible={visible}
            render={(data, onChange) => (
                <>
                    <Block>
                        <FlervalgSpørsmål
                            navn="startdatoAleneomsorgFarMedmor"
                            spørsmål={getMessage(intl, 'uttaksplan.skjema.startdatoAleneomsorgFarMedmor.spørsmål')}
                            valgtVerdi={data.valgtStartdatoAleneomsorgFarMedmor}
                            alternativer={alternativer}
                            toKolonner={alternativer.length === 2}
                            onChange={(value: ValgalternativerAleneomsorgFarMedmor) =>
                                onChange({
                                    valgtStartdatoAleneomsorgFarMedmor: value,
                                    startdatoPermisjon: dateToISOString(
                                        getStartdatoFromAlternativ(
                                            value,
                                            datoForAleneomsorg,
                                            ISOStringToDate(data.startdatoPermisjon)
                                        )
                                    ),
                                })
                            }
                        />
                    </Block>
                    <Block
                        visible={data.valgtStartdatoAleneomsorgFarMedmor === ValgalternativerAleneomsorgFarMedmor.annen}
                    >
                        <ValiderbarDatoInput
                            id="annenStartdatoAleneomsorgFarMedmor"
                            name="annenStartdatoAleneomsorgFarMedmor"
                            label={getMessage(
                                intl,
                                'uttaksplan.skjema.startdatoAleneomsorgFarMedmor.annenDato.spørsmål'
                            )}
                            onChange={(startdatoPermisjon) => onChange({ startdatoPermisjon })}
                            dato={data.startdatoPermisjon}
                            disabled={data.skalIkkeHaUttakFørTermin}
                            datoAvgrensinger={avgrensningerAnnenDato}
                            validators={startdatoFarMedmorValidation(intl, ISOStringToDate(data.startdatoPermisjon))}
                        />
                    </Block>
                </>
            )}
        />
    );
};

export default StartdatoUttakFarMedmorAleneomsorgSpørsmål;
