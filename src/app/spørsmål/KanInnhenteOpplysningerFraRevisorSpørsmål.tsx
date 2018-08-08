import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import RadioPanelGruppeResponsive from 'common/components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { InputChangeEvent } from '../types/dom/Events';

interface InnhenteOpplsyningerOmRevisorSpørsmålProps {
    hentOpplysningerOmRevisor?: boolean;
    onChange: (hentOpplysningerOmRevisor: boolean) => void;
}

type Props = InnhenteOpplsyningerOmRevisorSpørsmålProps & InjectedIntlProps;

enum OpplysningerOmRevior {
    'HENT_OPPLYSNINGER_OM_REVISOR' = 'hentOpplysningerOmRevisor',
    'IKKE_HENT_OPPLYSNINGER_OM_REVISOR' = 'ikkeHentOpplysningerOmRevisor'
}

const KanInnhenteOpplsyningerFraRevisorSpørsmål = (props: Props) => {
    const { onChange, hentOpplysningerOmRevisor, intl } = props;

    let checked;
    if (hentOpplysningerOmRevisor === true) {
        checked = OpplysningerOmRevior.HENT_OPPLYSNINGER_OM_REVISOR;
    } else if (hentOpplysningerOmRevisor === false) {
        checked = OpplysningerOmRevior.IKKE_HENT_OPPLYSNINGER_OM_REVISOR;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'hentOpplysningerOmRevisor.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: OpplysningerOmRevior.HENT_OPPLYSNINGER_OM_REVISOR
                },
                {
                    label: getMessage(intl, 'nei'),
                    value:
                        OpplysningerOmRevior.IKKE_HENT_OPPLYSNINGER_OM_REVISOR
                }
            ]}
            name="hentOpplysningerOmRevisor"
            onChange={(e: InputChangeEvent, v: OpplysningerOmRevior) =>
                onChange(
                    v === OpplysningerOmRevior.HENT_OPPLYSNINGER_OM_REVISOR
                )
            }
        />
    );
};

export default injectIntl(KanInnhenteOpplsyningerFraRevisorSpørsmål);
