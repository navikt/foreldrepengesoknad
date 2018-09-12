import * as React from 'react';
import FlervalgSpørsmål, {
    FlervalgAlternativ
} from '../../../../components/flervalg-sp\u00F8rsm\u00E5l/FlervalgSp\u00F8rsm\u00E5l';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSp\u00F8rsm\u00E5l';
import { Adopsjonsbarn } from '../../../../types/s\u00F8knad/Barn';
import Block from 'common/components/block/Block';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { ValgalternativerAdopsjonStartdato } from '../uttaksplanSkjemadata';
import DatoInput from 'common/components/skjema/elements/dato-input/DatoInput';
import getMessage from 'common/util/i18nUtils';

interface OwnProps {
    barn: Adopsjonsbarn;
}

type Props = UttaksplanSkjemaspørsmålProps & OwnProps & InjectedIntlProps;

const getAlternativ = (
    intl: InjectedIntl,
    alternativ: ValgalternativerAdopsjonStartdato,
    dato?: Date
): FlervalgAlternativ => {
    return {
        label: getMessage(
            intl,
            `uttaksplan.skjema.startdatoAdopsjon.alternativ.${alternativ}`,
            dato ? { dato: formaterDatoUtenDag(dato) } : undefined
        ),
        value: alternativ
    };
};

const getStartdatoFromAlternativ = (
    alternativ: ValgalternativerAdopsjonStartdato,
    barn: Adopsjonsbarn
): Date | undefined => {
    if (alternativ === ValgalternativerAdopsjonStartdato.omsorgsovertakelse) {
        return barn.adopsjonsdato;
    } else if (alternativ === ValgalternativerAdopsjonStartdato.ankomst) {
        return barn.ankomstdato;
    }
    return undefined;
};

const StartdatoAdopsjonBolk = (props: Props) => {
    const { visible, barn, intl } = props;

    const alternativer: FlervalgAlternativ[] = [];
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
                            toKolonner={alternativer.length === 2}
                            onChange={(value: ValgalternativerAdopsjonStartdato) =>
                                onChange({
                                    valgtAdopsjonStartdato: value,
                                    startdatoPermisjon: getStartdatoFromAlternativ(value, barn)
                                })
                            }
                        />
                    </Block>
                    <Block visible={data.valgtAdopsjonStartdato === ValgalternativerAdopsjonStartdato.annen}>
                        <DatoInput
                            id="annenStartdatoAdopsjon"
                            label={getMessage(intl, 'uttaksplan.skjema.startdatoAdopsjon.annenDato.spørsmål')}
                            onChange={(startdatoPermisjon) => onChange({ startdatoPermisjon })}
                            dato={data.startdatoPermisjon}
                            disabled={data.skalIkkeHaUttakFørTermin}
                        />
                    </Block>
                </>
            )}
        />
    );
};

export default injectIntl(StartdatoAdopsjonBolk);
