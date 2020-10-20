import * as React from 'react';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import getMessage from 'common/util/i18nUtils';
import { useIntl } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import { uttaksplanDatoavgrensninger } from '../../../util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import { getNavnGenitivEierform } from '../../../util/tekstUtils';

interface OwnProps {
    navnMor: string;
    familiehendelsesdato: Date;
}

type Props = OwnProps & UttaksplanSkjemaspørsmålProps;

const MorSinSisteUttaksdagSpørsmål: React.StatelessComponent<Props> = ({ visible, navnMor, familiehendelsesdato }) => {
    const intl = useIntl();
    return (
        <UttaksplanSkjemaSpørsmål
            visible={visible}
            render={(data, onChange) => (
                <DatoInput
                    name="morSinSisteUttaksdag"
                    inputId="morSinSisteUttaksdag"
                    label={getMessage(intl, 'spørsmål.morSinSisteUttaksdag.label', {
                        navnMor: getNavnGenitivEierform(navnMor, intl.locale),
                    })}
                    onChange={(morSinSisteUttaksdag: Date) => onChange({ morSinSisteUttaksdag })}
                    dato={data.morSinSisteUttaksdag}
                    datoAvgrensinger={uttaksplanDatoavgrensninger.morsSisteUttaksdag(familiehendelsesdato)}
                />
            )}
        />
    );
};

export default MorSinSisteUttaksdagSpørsmål;
