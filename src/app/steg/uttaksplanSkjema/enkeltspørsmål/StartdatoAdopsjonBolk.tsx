import * as React from 'react';
import FlervalgSpørsmål from '../../../../common/components/skjema/elements/flervalg-spørsmål/FlervalgSpørsmål';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';
import { Adopsjonsbarn } from '../../../types/søknad/Barn';
import Block from 'common/components/block/Block';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { ValgalternativerAdopsjonStartdato } from '../uttaksplanSkjemadata';
import DatoInput from 'common/components/skjema/elements/dato-input/DatoInput';
import getMessage from 'common/util/i18nUtils';
import { uttaksplanDatoavgrensninger } from '../../../util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import { DateValue } from '../../../types/common';
import { RadioProps } from 'nav-frontend-skjema';

interface OwnProps {
    barn: Adopsjonsbarn;
    familiehendelsesdato: Date;
}

type Props = UttaksplanSkjemaspørsmålProps & OwnProps & InjectedIntlProps;

const getAlternativ = (intl: InjectedIntl, alternativ: ValgalternativerAdopsjonStartdato, dato?: Date): RadioProps => {
    return {
        label: getMessage(
            intl,
            `uttaksplan.skjema.startdatoAdopsjon.alternativ.${alternativ}`,
            dato ? { dato: formaterDatoUtenDag(dato) } : undefined
        ),
        value: alternativ,
        name: 'startdatoAdopsjonBolk'
    };
};

const getStartdatoFromAlternativ = (
    alternativ: ValgalternativerAdopsjonStartdato,
    barn: Adopsjonsbarn,
    valgtVerdi?: Date
): DateValue => {
    if (alternativ === ValgalternativerAdopsjonStartdato.omsorgsovertakelse) {
        return barn.adopsjonsdato;
    } else if (alternativ === ValgalternativerAdopsjonStartdato.ankomst) {
        return barn.ankomstdato;
    }
    return valgtVerdi;
};

const StartdatoAdopsjonBolk = (props: Props) => {
    const { visible, barn, familiehendelsesdato, intl } = props;

    const alternativer: RadioProps[] = [];
    if (barn.adoptertIUtlandet && barn.ankomstdato) {
        alternativer.push(getAlternativ(intl, ValgalternativerAdopsjonStartdato.ankomst, barn.ankomstdato));
    }
    alternativer.push(getAlternativ(intl, ValgalternativerAdopsjonStartdato.omsorgsovertakelse, barn.adopsjonsdato));
    alternativer.push(getAlternativ(intl, ValgalternativerAdopsjonStartdato.annen));

    return (
        <UttaksplanSkjemaSpørsmål
            harUnderspørsmål={true}
            visible={visible}
            render={(data, onChange) => (
                <>
                    <Block>
                        <FlervalgSpørsmål
                            navn="startdatoAdopsjon"
                            spørsmål={getMessage(intl, 'uttaksplan.skjema.startdatoAdopsjon.spørsmål')}
                            valgtVerdi={data.valgtAdopsjonStartdato}
                            alternativer={alternativer}
                            toKolonner={true}
                            onChange={(value: ValgalternativerAdopsjonStartdato) =>
                                onChange({
                                    valgtAdopsjonStartdato: value,
                                    startdatoPermisjon: getStartdatoFromAlternativ(value, barn, data.startdatoPermisjon)
                                })
                            }
                        />
                    </Block>
                    <Block visible={data.valgtAdopsjonStartdato === ValgalternativerAdopsjonStartdato.annen}>
                        <DatoInput
                            id="annenStartdatoAdopsjon"
                            name="annenStartdatoAdopsjon"
                            label={getMessage(intl, 'uttaksplan.skjema.startdatoAdopsjon.annenDato.spørsmål')}
                            onChange={(startdatoPermisjon) => onChange({ startdatoPermisjon })}
                            dato={data.startdatoPermisjon}
                            datoAvgrensinger={uttaksplanDatoavgrensninger.startdatoPermisjonAdopsjon(
                                familiehendelsesdato
                            )}
                        />
                    </Block>
                </>
            )}
        />
    );
};

export default injectIntl(StartdatoAdopsjonBolk);
