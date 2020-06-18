import * as React from 'react';
import { useIntl } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';
import { UtsettelseÅrsakType } from 'app/types/uttaksplan/periodetyper';
import UttaksplanSkjemaSpørsmål from '../UttaksplanSkjemaSpørsmål';

interface OwnProps {
    visible?: boolean;
    navn: string;
}

type Props = OwnProps;

const UtsettelseBegrunnelse = (props: Props) => {
    const { visible = true, navn } = props;
    const intl = useIntl();

    return (
        <UttaksplanSkjemaSpørsmål
            visible={visible}
            render={(data, onChange) => (
                <RadioPanelGruppeResponsive
                    twoColumns={true}
                    checked={data.begrunnelseForUtsettelse}
                    legend={getMessage(intl, 'spørsmål.utsettelse.begrunnelse.legend', { navn })}
                    radios={[
                        {
                            label: getMessage(intl, 'spørsmål.utsettelse.begrunnelse.label.ferie'),
                            value: UtsettelseÅrsakType.Ferie,
                        },
                        {
                            label: getMessage(intl, 'spørsmål.utsettelse.begrunnelse.label.jobb'),
                            value: UtsettelseÅrsakType.Arbeid,
                        },
                        {
                            label: getMessage(intl, 'spørsmål.utsettelse.begrunnelse.label.sykdom', {
                                antallUker: UtsettelseÅrsakType.Sykdom,
                            }),
                            value: UtsettelseÅrsakType.Sykdom,
                        },
                    ]}
                    name="begrunnelseForUtsettelse"
                    onChange={(_e, v: UtsettelseÅrsakType) => onChange({ begrunnelseForUtsettelse: v })}
                />
            )}
        />
    );
};

export default UtsettelseBegrunnelse;
