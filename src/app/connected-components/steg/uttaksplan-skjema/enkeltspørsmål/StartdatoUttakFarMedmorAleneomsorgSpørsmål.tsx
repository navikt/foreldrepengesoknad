import * as React from 'react';
import FlervalgSpørsmål, { FlervalgAlternativ } from '../../../../components/flervalg-spørsmål/FlervalgSpørsmål';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import { ForeldreansvarBarn } from '../../../../types/søknad/Barn';
import Block from 'common/components/block/Block';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { ValgalternativerAleneomsorgFarMedmor } from '../uttaksplanSkjemadata';
import DatoInput from 'common/components/skjema/elements/dato-input/DatoInput';
import getMessage from 'common/util/i18nUtils';
import { uttaksplanDatoavgrensninger } from '../../../../util/validation/uttaksplan/uttaksplanDatoavgrensninger';

interface OwnProps {
    barn: ForeldreansvarBarn;
    familiehendelsesdato: Date;
}

type Props = UttaksplanSkjemaspørsmålProps & OwnProps & InjectedIntlProps;

const getAlternativ = (
    intl: InjectedIntl,
    alternativ: ValgalternativerAleneomsorgFarMedmor,
    dato?: Date
): FlervalgAlternativ => {
    return {
        label: getMessage(
            intl,
            `uttaksplan.skjema.startdatoAleneomsorgFarMedmor.alternativ.${alternativ}`,
            dato ? { dato: formaterDatoUtenDag(dato) } : undefined
        ),
        value: alternativ
    };
};

const getStartdatoFromAlternativ = (
    alternativ: ValgalternativerAleneomsorgFarMedmor,
    barn: ForeldreansvarBarn,
    valgtVerdi?: Date
): Date | undefined => {
    if (alternativ === ValgalternativerAleneomsorgFarMedmor.datoForAleneomsorg) {
        return barn.datoForAleneomsorg;
    }
    return valgtVerdi;
};

const StartdatoUttakFarMedmorAleneomsorgSpørsmål = (props: Props) => {
    const { visible, barn, familiehendelsesdato, intl } = props;

    const alternativer: FlervalgAlternativ[] = [
        getAlternativ(intl, ValgalternativerAleneomsorgFarMedmor.datoForAleneomsorg, barn.datoForAleneomsorg),
        getAlternativ(intl, ValgalternativerAleneomsorgFarMedmor.annen)
    ];

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
                                    startdatoPermisjon: getStartdatoFromAlternativ(value, barn, data.startdatoPermisjon)
                                })
                            }
                        />
                    </Block>
                    <Block
                        visible={
                            data.valgtStartdatoAleneomsorgFarMedmor === ValgalternativerAleneomsorgFarMedmor.annen
                        }>
                        <DatoInput
                            id="annenStartdatoAdopsjon"
                            label={getMessage(intl, 'uttaksplan.skjema.startdatoAdopsjon.annenDato.spørsmål')}
                            onChange={(startdatoPermisjon) => onChange({ startdatoPermisjon })}
                            dato={data.startdatoPermisjon}
                            disabled={data.skalIkkeHaUttakFørTermin}
                            avgrensninger={uttaksplanDatoavgrensninger.startdatoPermisjonVedAdopsjon(
                                familiehendelsesdato
                            )}
                        />
                    </Block>
                </>
            )}
        />
    );
};

export default injectIntl(StartdatoUttakFarMedmorAleneomsorgSpørsmål);
