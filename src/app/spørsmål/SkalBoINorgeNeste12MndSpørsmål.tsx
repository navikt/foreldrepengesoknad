import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

export enum SkalBoINorgeNeste12Mnd {
    'SKAL_BO_I_NORGE_NESTE_12' = 'skalBoINorgeNeste12',
    'SKAL_BO_I_UTLANDET_NESTE_12' = 'skalBoIUtlandetNeste12'
}

interface SkalBoINorgeNeste12MndSpørsmålProps {
    iNorgeNeste12?: boolean;
    onChange: (
        iNorgeSiste12: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = SkalBoINorgeNeste12MndSpørsmålProps & InjectedIntlProps;

const SkalBoINorgeNeste12MndSpørsmål = (props: Props) => {
    const { onChange, iNorgeNeste12, intl, ...otherProps } = props;

    let checked;
    if (iNorgeNeste12 === true) {
        checked = SkalBoINorgeNeste12Mnd.SKAL_BO_I_NORGE_NESTE_12;
    } else if (iNorgeNeste12 === false) {
        checked = SkalBoINorgeNeste12Mnd.SKAL_BO_I_UTLANDET_NESTE_12;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'iNorgeNeste12Mnd.spørsmål')}
            radios={[
                {
                    label: getMessage(
                        intl,
                        'iNorgeNeste12Mnd.alternativ.boINorge'
                    ),
                    value: SkalBoINorgeNeste12Mnd.SKAL_BO_I_NORGE_NESTE_12
                },
                {
                    label: getMessage(
                        intl,
                        'iNorgeNeste12Mnd.alternativ.boIUtlandet'
                    ),
                    value: SkalBoINorgeNeste12Mnd.SKAL_BO_I_UTLANDET_NESTE_12
                }
            ]}
            name="iNorgeNeste12Mnd"
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: SkalBoINorgeNeste12Mnd
            ) =>
                onChange(
                    v === SkalBoINorgeNeste12Mnd.SKAL_BO_I_NORGE_NESTE_12,
                    e
                )
            }
            {...otherProps}
        />
    );
};

export default injectIntl(SkalBoINorgeNeste12MndSpørsmål);
