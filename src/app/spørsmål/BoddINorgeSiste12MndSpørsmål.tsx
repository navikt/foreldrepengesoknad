import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

export enum BoddINorgeSiste12Mnd {
    'BODD_I_NORGE_SISTE_12' = 'boddINorgeSiste12',
    'BODD_I_UTLANDET_SISTE_12' = 'boddIUtlandetSiste12'
}

interface BoddINorgeSiste12MndSpørsmålProps {
    iNorgeSiste12?: boolean;
    onChange: (iNorgeSiste12: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
}

type Props = BoddINorgeSiste12MndSpørsmålProps & InjectedIntlProps;

const BoddINorgeSiste12MndSpørsmål = (props: Props) => {
    const { onChange, iNorgeSiste12, intl, ...otherProps } = props;

    let checked;
    if (iNorgeSiste12 === true) {
        checked = BoddINorgeSiste12Mnd.BODD_I_NORGE_SISTE_12;
    } else if (iNorgeSiste12 === false) {
        checked = BoddINorgeSiste12Mnd.BODD_I_UTLANDET_SISTE_12;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            twoColumns={true}
            legend={getMessage(intl, 'boddINorgeSiste12Mnd.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'boddINorgeSiste12Mnd.alternativ.boddINorge'),
                    value: BoddINorgeSiste12Mnd.BODD_I_NORGE_SISTE_12
                },
                {
                    label: getMessage(intl, 'boddINorgeSiste12Mnd.alternativ.boddIUtlandet'),
                    value: BoddINorgeSiste12Mnd.BODD_I_UTLANDET_SISTE_12
                }
            ]}
            name="boddINorgeSiste12Mnd"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: BoddINorgeSiste12Mnd) =>
                onChange(v === BoddINorgeSiste12Mnd.BODD_I_NORGE_SISTE_12, e)
            }
            {...otherProps}
        />
    );
};

export default injectIntl(BoddINorgeSiste12MndSpørsmål);
