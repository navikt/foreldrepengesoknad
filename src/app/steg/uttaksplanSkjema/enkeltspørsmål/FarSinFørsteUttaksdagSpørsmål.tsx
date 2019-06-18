import * as React from 'react';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import getMessage from 'common/util/i18nUtils';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import { uttaksplanDatoavgrensninger } from 'app/util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import LenkeKnapp from 'common/components/lenkeKnapp/LenkeKnapp';
import { Checkbox } from 'nav-frontend-skjema';
import { Uttaksdagen } from 'app/util/uttaksplan/Uttaksdagen';
import Block from 'common/components/block/Block';
import { NavnPåForeldre } from 'common/types';
import { formatDate } from 'app/util/dates/dates';

interface FarSinFørsteUttaksdagSpørsmålProps {
    familiehendelsesdato: Date;
    morSinSisteUttaksdag?: Date;
    harAnnenPartEkisterendeSak?: boolean;
    navnPåForeldre?: NavnPåForeldre;
}

type Props = FarSinFørsteUttaksdagSpørsmålProps & UttaksplanSkjemaspørsmålProps & InjectedIntlProps;

const FarSinFørsteUttaksdagSpørsmål: React.StatelessComponent<Props> = ({
    visible,
    familiehendelsesdato,
    morSinSisteUttaksdag,
    harAnnenPartEkisterendeSak = false,
    navnPåForeldre,
    intl
}) => (
    <UttaksplanSkjemaSpørsmål
        visible={visible}
        render={(data, onChange) => {
            return (
                <>
                    <Block visible={harAnnenPartEkisterendeSak} margin="xs">
                        <DatoInput
                            name="farSinFørsteUttaksdagSpørsmål"
                            id="farSinFørsteUttaksdagSpørsmål"
                            label={getMessage(intl, 'spørsmål.farSinFørsteUttaksdagSpørsmål.label')}
                            onChange={(farSinFørsteUttaksdag: Date) =>
                                onChange(
                                    morSinSisteUttaksdag
                                        ? { farSinFørsteUttaksdag, morSinSisteUttaksdag }
                                        : { farSinFørsteUttaksdag }
                                )
                            }
                            dato={data.farSinFørsteUttaksdag}
                            datoAvgrensinger={uttaksplanDatoavgrensninger.startdatoPermisjonFarMedmor(
                                familiehendelsesdato
                            )}
                            disabled={data.ønskerIkkeFlerePerioder}
                        />
                    </Block>
                    {harAnnenPartEkisterendeSak &&
                        morSinSisteUttaksdag &&
                        navnPåForeldre && (
                            <>
                                <Block margin="xs">
                                    <LenkeKnapp
                                        text={
                                            <FormattedMessage
                                                id="spørsmål.farSinFørsteUttaksdagSpørsmål.førsteUttaksdagEtterAnnenPart"
                                                values={{ navn: navnPåForeldre.mor, dato: formatDate(Uttaksdagen(morSinSisteUttaksdag).neste()) }}
                                            />
                                        }
                                        onClick={() =>
                                            onChange({
                                                morSinSisteUttaksdag,
                                                farSinFørsteUttaksdag: morSinSisteUttaksdag
                                                    ? Uttaksdagen(morSinSisteUttaksdag).neste()
                                                    : undefined
                                            })
                                        }
                                    />
                                </Block>
                                <Checkbox
                                    label={
                                        <FormattedMessage
                                            id="spørsmål.farSinFørsteUttaksdagSpørsmål.ønskerIkkeFlerePerioder.checkbox.label"
                                            values={{ dato: Uttaksdagen(morSinSisteUttaksdag).neste() }}
                                        />
                                    }
                                    checked={data.ønskerIkkeFlerePerioder}
                                    onChange={(e) => onChange({ ønskerIkkeFlerePerioder: e.target.checked })}
                                />
                            </>
                        )}
                </>
            );
        }}
    />
);

export default injectIntl(FarSinFørsteUttaksdagSpørsmål);
