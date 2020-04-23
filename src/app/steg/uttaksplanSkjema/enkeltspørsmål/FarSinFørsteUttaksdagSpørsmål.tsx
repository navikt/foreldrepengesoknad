import * as React from 'react';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import getMessage from 'common/util/i18nUtils';
import { useIntl, FormattedMessage } from 'react-intl';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import { uttaksplanDatoavgrensninger } from 'app/util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import LenkeKnapp from 'common/components/lenkeKnapp/LenkeKnapp';
import { Checkbox } from 'nav-frontend-skjema';
import { Uttaksdagen } from 'app/util/uttaksplan/Uttaksdagen';
import Block from 'common/components/block/Block';
import { NavnPåForeldre } from 'common/types';
import { formatDate } from 'app/util/dates/dates';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { Periodetype } from 'app/types/uttaksplan/periodetyper';

interface FarSinFørsteUttaksdagSpørsmålProps {
    familiehendelsesdato: Date;
    morSinSisteUttaksdag?: Date;
    eksisterendeSakAnnenPart?: EksisterendeSak;
    navnPåForeldre?: NavnPåForeldre;
}

type Props = FarSinFørsteUttaksdagSpørsmålProps & UttaksplanSkjemaspørsmålProps;

const FarSinFørsteUttaksdagSpørsmål: React.StatelessComponent<Props> = ({
    visible,
    familiehendelsesdato,
    morSinSisteUttaksdag,
    eksisterendeSakAnnenPart,
    navnPåForeldre,
}) => {
    const intl = useIntl();
    const harAnnenPartForeslåttperioder =
        eksisterendeSakAnnenPart &&
        eksisterendeSakAnnenPart.uttaksplan &&
        eksisterendeSakAnnenPart.uttaksplan.filter((p) => p.type !== Periodetype.Info).length > 0;

    return (
        <UttaksplanSkjemaSpørsmål
            visible={visible}
            render={(data, onChange) => {
                return (
                    <>
                        <Block margin="xs">
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
                        {morSinSisteUttaksdag && navnPåForeldre && (
                            <>
                                <Block margin="xs">
                                    <LenkeKnapp
                                        text={
                                            <FormattedMessage
                                                id="spørsmål.farSinFørsteUttaksdagSpørsmål.førsteUttaksdagEtterAnnenPart"
                                                values={{
                                                    navn: navnPåForeldre.mor,
                                                    dato: formatDate(Uttaksdagen(morSinSisteUttaksdag).neste()),
                                                }}
                                            />
                                        }
                                        onClick={() =>
                                            onChange({
                                                morSinSisteUttaksdag,
                                                farSinFørsteUttaksdag: morSinSisteUttaksdag
                                                    ? Uttaksdagen(morSinSisteUttaksdag).neste()
                                                    : undefined,
                                            })
                                        }
                                    />
                                </Block>
                                {harAnnenPartForeslåttperioder && (
                                    <Checkbox
                                        label={
                                            <FormattedMessage
                                                id="spørsmål.farSinFørsteUttaksdagSpørsmål.ønskerIkkeFlerePerioder.checkbox.label"
                                                values={{ dato: Uttaksdagen(morSinSisteUttaksdag).neste() }}
                                            />
                                        }
                                        checked={data.ønskerIkkeFlerePerioder || false}
                                        onChange={(e) => onChange({ ønskerIkkeFlerePerioder: e.target.checked })}
                                    />
                                )}
                            </>
                        )}
                    </>
                );
            }}
        />
    );
};

export default FarSinFørsteUttaksdagSpørsmål;
