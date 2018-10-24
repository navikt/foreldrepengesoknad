import * as React from 'react';
import moment from 'moment';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import { uttaksplanDatoavgrensninger } from '../../../../util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import ValiderbarDatoInput from 'common/lib/validation/elements/ValiderbarDatoInput';
import startdatoFarMedmorValidation from '../../../../util/validation/uttaksplan/startdatoFarMedmorValidation';
import { DateValue } from '../../../../types/common';
import { Uttaksdagen } from '../../../../util/uttaksplan/Uttaksdagen';

interface OwnProps {
    familiehendelsesdato: Date;
}

type Props = OwnProps & UttaksplanSkjemaspørsmålProps & InjectedIntlProps;

const StartdatoPermisjonSpørsmål = (props: Props) => {
    const { visible, familiehendelsesdato, intl } = props;
    const dagensDato = new Date();
    const reservertMorFørDenneDatoen = Uttaksdagen(familiehendelsesdato).leggTil(30);
    const dagensDatoEtterReservertMorDato = moment(dagensDato).isAfter(reservertMorFørDenneDatoen);
    const foreslåttDato = dagensDatoEtterReservertMorDato ? dagensDato : reservertMorFørDenneDatoen;

    return (
        <UttaksplanSkjemaSpørsmål
            visible={visible}
            render={(data, onChange) => (
                <ValiderbarDatoInput
                    id="permisjonStartdato"
                    name="permisjonStartdato"
                    label={getMessage(intl, 'spørsmål.startdatoPermisjonFarMedmor.label')}
                    onChange={(startdatoPermisjon: DateValue) => onChange({ startdatoPermisjon })}
                    dato={data.startdatoPermisjon || foreslåttDato}
                    disabled={data.skalIkkeHaUttakFørTermin}
                    avgrensninger={uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(familiehendelsesdato)}
                    validators={startdatoFarMedmorValidation(intl, data.startdatoPermisjon)}
                />
            )}
        />
    );
};

export default injectIntl(StartdatoPermisjonSpørsmål);
