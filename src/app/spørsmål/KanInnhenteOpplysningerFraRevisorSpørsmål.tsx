import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { InputChangeEvent } from '../types/dom/Events';

interface InnhenteOpplsyningerOmRevisorSpørsmålProps {
    kanInnhenteOpplysningerFraRevisor?: boolean;
    onChange: (hentOpplysningerOmRevisor: boolean) => void;
}

type Props = InnhenteOpplsyningerOmRevisorSpørsmålProps & InjectedIntlProps;

enum OpplysningerFraRevior {
    'KAN_INNHENTE_OPPLYSNINGER_FRA_REVISOR' = 'hentOpplysningerFraRevisor',
    'KAN_IKKE_INNHENTE_OPPLYSNINGER_FRA_REVISOR' = 'ikkeHentOpplysningerFraRevisor'
}

const KanInnhenteOpplysningerFraRevisorSpørsmål = (props: Props) => {
    const { onChange, kanInnhenteOpplysningerFraRevisor, intl } = props;

    let checked;
    if (kanInnhenteOpplysningerFraRevisor === true) {
        checked = OpplysningerFraRevior.KAN_INNHENTE_OPPLYSNINGER_FRA_REVISOR;
    } else if (kanInnhenteOpplysningerFraRevisor === false) {
        checked = OpplysningerFraRevior.KAN_IKKE_INNHENTE_OPPLYSNINGER_FRA_REVISOR;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'kanInnhenteOpplysningerFraRevisor.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: OpplysningerFraRevior.KAN_INNHENTE_OPPLYSNINGER_FRA_REVISOR
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: OpplysningerFraRevior.KAN_IKKE_INNHENTE_OPPLYSNINGER_FRA_REVISOR
                }
            ]}
            name="hentOpplysningerFraRevisor"
            onChange={(e: InputChangeEvent, v: OpplysningerFraRevior) =>
                onChange(v === OpplysningerFraRevior.KAN_INNHENTE_OPPLYSNINGER_FRA_REVISOR)
            }
        />
    );
};

export default injectIntl(KanInnhenteOpplysningerFraRevisorSpørsmål);
