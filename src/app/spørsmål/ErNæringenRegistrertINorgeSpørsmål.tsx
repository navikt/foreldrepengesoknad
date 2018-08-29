import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

export enum NæringRegistrertINorge {
    'NÆRINGEN_ER_REGISTRERT_I_NORGE' = 'næringenErRegistrertINorge',
    'NÆRINGEN_ER_IKKE_REGISTRERT_I_NORGE' = 'næringenErIkkeRegistrertINorge'
}

interface ErNæringenRegistrertINorgeSpørsmålProps {
    registrertINorge?: boolean;
    onChange: (registrertINorge: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
}

type Props = ErNæringenRegistrertINorgeSpørsmålProps & InjectedIntlProps;

const ErNæringenRegistrertINorgeSpørsmål = (props: Props) => {
    const { onChange, registrertINorge, intl, ...otherProps } = props;

    let checked;
    if (registrertINorge === true) {
        checked = NæringRegistrertINorge.NÆRINGEN_ER_REGISTRERT_I_NORGE;
    } else if (registrertINorge === false) {
        checked = NæringRegistrertINorge.NÆRINGEN_ER_IKKE_REGISTRERT_I_NORGE;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'erNæringenRegistrertINorge.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: NæringRegistrertINorge.NÆRINGEN_ER_REGISTRERT_I_NORGE
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: NæringRegistrertINorge.NÆRINGEN_ER_IKKE_REGISTRERT_I_NORGE
                }
            ]}
            name="erNæringenRegistrertINorge"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: NæringRegistrertINorge) =>
                onChange(v === NæringRegistrertINorge.NÆRINGEN_ER_REGISTRERT_I_NORGE, e)
            }
            {...otherProps}
        />
    );
};

export default injectIntl(ErNæringenRegistrertINorgeSpørsmål);
