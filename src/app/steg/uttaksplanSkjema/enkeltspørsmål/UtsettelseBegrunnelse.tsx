import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';
import { UtsettelseÅrsakType } from 'app/types/uttaksplan/periodetyper';
import UttaksplanSkjemaSpørsmål from '../UttaksplanSkjemaSpørsmål';

interface StateProps {}
interface OwnProps {
    visible?: boolean;
}

type Props = OwnProps & StateProps & InjectedIntlProps;

const UtsettelseBegrunnelse = (props: Props) => {
    const { visible = true, intl } = props;
    return (
        <UttaksplanSkjemaSpørsmål
            visible={visible}
            render={(data, onChange) => (
                <RadioPanelGruppeResponsive
                    twoColumns={true}
                    checked={data.begrunnelseForUtsettelse}
                    legend={getMessage(intl, 'spørsmål.utsettelse.begrunnelse.legend')}
                    radios={[
                        {
                            label: getMessage(intl, 'spørsmål.utsettelse.begrunnelse.label.ferie'),
                            value: UtsettelseÅrsakType.Ferie
                        },
                        {
                            label: getMessage(intl, 'spørsmål.utsettelse.begrunnelse.label.jobb'),
                            value: UtsettelseÅrsakType.Arbeid
                        },
                        {
                            label: getMessage(intl, 'spørsmål.utsettelse.begrunnelse.label.sykdom', {
                                antallUker: UtsettelseÅrsakType.Sykdom
                            }),
                            value: UtsettelseÅrsakType.Sykdom
                        }
                    ]}
                    name="begrunnelseForUtsettelse"
                    onChange={(e, v: UtsettelseÅrsakType) => onChange({ begrunnelseForUtsettelse: v })}
                />
            )}
        />
    );
};

export default injectIntl(UtsettelseBegrunnelse);