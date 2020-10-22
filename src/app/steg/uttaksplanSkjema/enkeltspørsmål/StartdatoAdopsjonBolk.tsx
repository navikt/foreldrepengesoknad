import * as React from 'react';
import { IntlShape, useIntl } from 'react-intl';
import { dateToISOString, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { RadioProps } from 'nav-frontend-skjema';
import Block from 'common/components/block/Block';
import DatoInput from 'common/components/skjema/elements/dato-input/DatoInput';
import { formaterDatoUtenDag } from 'common/util/datoUtils';
import getMessage from 'common/util/i18nUtils';
import FlervalgSpørsmål from '../../../../common/components/skjema/elements/flervalg-spørsmål/FlervalgSpørsmål';
import { DateValue } from '../../../types/common';
import { Adopsjonsbarn } from '../../../types/søknad/Barn';
import { uttaksplanDatoavgrensninger } from '../../../util/validation/uttaksplan/uttaksplanDatoavgrensninger';
import { ValgalternativerAdopsjonStartdato } from '../uttaksplanSkjemadata';
import UttaksplanSkjemaSpørsmål, { UttaksplanSkjemaspørsmålProps } from '../UttaksplanSkjemaSpørsmål';

interface OwnProps {
    barn: Adopsjonsbarn;
    familiehendelsesdato: Date;
}

type Props = UttaksplanSkjemaspørsmålProps & OwnProps;

const getAlternativ = (intl: IntlShape, alternativ: ValgalternativerAdopsjonStartdato, dato?: Date): RadioProps => {
    return {
        label: getMessage(
            intl,
            `uttaksplan.skjema.startdatoAdopsjon.alternativ.${alternativ}`,
            dato ? { dato: formaterDatoUtenDag(dato) } : undefined
        ),
        value: alternativ,
        name: 'startdatoAdopsjonBolk',
    };
};

const getStartdatoFromAlternativ = (
    alternativ: ValgalternativerAdopsjonStartdato,
    barn: Adopsjonsbarn,
    valgtVerdi?: Date
): DateValue => {
    if (alternativ === ValgalternativerAdopsjonStartdato.omsorgsovertakelse) {
        return ISOStringToDate(barn.adopsjonsdato);
    } else if (alternativ === ValgalternativerAdopsjonStartdato.ankomst) {
        return ISOStringToDate(barn.ankomstdato);
    }
    return valgtVerdi;
};

const StartdatoAdopsjonBolk = (props: Props) => {
    const { visible, barn, familiehendelsesdato } = props;
    const intl = useIntl();

    const alternativer: RadioProps[] = [];
    if (barn.adoptertIUtlandet && barn.ankomstdato) {
        alternativer.push(
            getAlternativ(intl, ValgalternativerAdopsjonStartdato.ankomst, ISOStringToDate(barn.ankomstdato))
        );
    }
    alternativer.push(
        getAlternativ(intl, ValgalternativerAdopsjonStartdato.omsorgsovertakelse, ISOStringToDate(barn.adopsjonsdato))
    );
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
                                    startdatoPermisjon: dateToISOString(
                                        getStartdatoFromAlternativ(
                                            value,
                                            barn,
                                            ISOStringToDate(data.startdatoPermisjon)
                                        )
                                    ),
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

export default StartdatoAdopsjonBolk;
