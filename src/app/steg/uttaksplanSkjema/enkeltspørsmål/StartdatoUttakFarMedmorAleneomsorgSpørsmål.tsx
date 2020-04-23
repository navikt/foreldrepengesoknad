import * as React from 'react';
import FlervalgSpørsmål from '../../../../common/components/skjema/elements/flervalg-spørsmål/FlervalgSpørsmål';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import Block from 'common/components/block/Block';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import { useIntl, IntlShape } from 'react-intl';
import { ValgalternativerAleneomsorgFarMedmor } from '../uttaksplanSkjemadata';
import getMessage from 'common/util/i18nUtils';
import { uttaksplanDatoavgrensninger } from '../../../util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import ValiderbarDatoInput from 'common/lib/validation/elements/ValiderbarDatoInput';
import startdatoFarMedmorValidation from '../../../util/validation/uttaksplan/startdatoFarMedmorValidation';
import { DateValue } from '../../../types/common';
import { RadioProps } from 'nav-frontend-skjema';

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
                                    startdatoPermisjon: getStartdatoFromAlternativ(
                                        value,
                                        datoForAleneomsorg,
                                        data.startdatoPermisjon
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
                            onChange={(startdatoPermisjon: DateValue) => onChange({ startdatoPermisjon })}
                            dato={data.startdatoPermisjon}
                            disabled={data.skalIkkeHaUttakFørTermin}
                            datoAvgrensinger={avgrensningerAnnenDato}
                            validators={startdatoFarMedmorValidation(intl, data.startdatoPermisjon)}
                        />
                    </Block>
                </>
            )}
        />
    );
};

export default StartdatoUttakFarMedmorAleneomsorgSpørsmål;
