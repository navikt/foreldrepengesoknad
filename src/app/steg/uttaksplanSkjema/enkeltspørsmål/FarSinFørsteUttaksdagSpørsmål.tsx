import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Checkbox } from 'nav-frontend-skjema';
import Block from 'common/components/block/Block';
import LenkeKnapp from 'common/components/lenkeKnapp/LenkeKnapp';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { NavnPåForeldre } from 'common/types';
import getMessage from 'common/util/i18nUtils';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { Periodetype } from 'app/types/uttaksplan/periodetyper';
import { formatDate } from 'app/util/dates/dates';
import { Uttaksdagen } from 'app/util/uttaksplan/Uttaksdagen';
import { uttaksplanDatoavgrensninger } from 'app/util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { erGyldigDato } from 'app/util/validation/common';

interface FarSinFørsteUttaksdagSpørsmålProps {
    familiehendelsesdato: Date;
    morSinSisteUttaksdag?: string;
    eksisterendeSakAnnenPart?: EksisterendeSak;
    navnPåForeldre?: NavnPåForeldre;
}

type Props = FarSinFørsteUttaksdagSpørsmålProps & UttaksplanSkjemaspørsmålProps;

const FarSinFørsteUttaksdagSpørsmål: React.FunctionComponent<Props> = ({
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

    const morSinSisteUttaksdagDate = ISOStringToDate(morSinSisteUttaksdag);
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
                                onChange={(farSinFørsteUttaksdag) =>
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
                                validators={
                                    data.farSinFørsteUttaksdag
                                        ? [
                                              erGyldigDato(
                                                  data.farSinFørsteUttaksdag,
                                                  getMessage(
                                                      intl,
                                                      'valideringsfeil.spørsmål.farSinFørsteUttaksdagSpørsmål.gyldigDato'
                                                  )
                                              ),
                                          ]
                                        : undefined
                                }
                            />
                        </Block>
                        {morSinSisteUttaksdagDate && navnPåForeldre && (
                            <>
                                <Block margin="xs">
                                    <LenkeKnapp
                                        text={
                                            <FormattedMessage
                                                id="spørsmål.farSinFørsteUttaksdagSpørsmål.førsteUttaksdagEtterAnnenPart"
                                                values={{
                                                    navn: navnPåForeldre.mor,
                                                    dato: formatDate(Uttaksdagen(morSinSisteUttaksdagDate).neste()),
                                                }}
                                            />
                                        }
                                        onClick={() => {
                                            const farSinFørsteUttaksdag: string | undefined = morSinSisteUttaksdagDate
                                                ? dateToISOString(Uttaksdagen(morSinSisteUttaksdagDate).neste())
                                                : undefined;

                                            onChange({
                                                morSinSisteUttaksdag,
                                                farSinFørsteUttaksdag,
                                            });
                                        }}
                                    />
                                </Block>
                                {harAnnenPartForeslåttperioder && (
                                    <Checkbox
                                        label={
                                            <FormattedMessage
                                                id="spørsmål.farSinFørsteUttaksdagSpørsmål.ønskerIkkeFlerePerioder.checkbox.label"
                                                values={{ dato: Uttaksdagen(morSinSisteUttaksdagDate).neste() }}
                                            />
                                        }
                                        checked={data.ønskerIkkeFlerePerioder || false}
                                        onChange={(e) => onChange({ ønskerIkkeFlerePerioder: e.target.checked })}
                                        autoComplete="off"
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
