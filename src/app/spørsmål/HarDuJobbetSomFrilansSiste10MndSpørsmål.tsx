import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

enum FrilansSiste10Mnd {
    'HAR_JOBBET_FRILANS_SISTE_10_MND' = 'harJobbetFrilansSiste10Mnd',
    'IKKE_JOBBET_FRILANS_SISTE_10_MND' = 'harIkkeJobbetFrilansSiste10Mnd'
}

interface HarDuJobbetSomFrilansSiste10MndSpørsmålProps {
    harJobbetSomFrilansSiste10Mnd: boolean;
    onChange: (
        erFrilanser: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = HarDuJobbetSomFrilansSiste10MndSpørsmålProps & InjectedIntlProps;

const HarDuJobbetSomFrilansSiste10MndSpørsmål = (props: Props) => {
    const {
        onChange,
        harJobbetSomFrilansSiste10Mnd,
        intl,
        ...otherProps
    } = props;

    let checked;
    if (harJobbetSomFrilansSiste10Mnd === true) {
        checked = FrilansSiste10Mnd.HAR_JOBBET_FRILANS_SISTE_10_MND;
    } else if (harJobbetSomFrilansSiste10Mnd === false) {
        checked = FrilansSiste10Mnd.IKKE_JOBBET_FRILANS_SISTE_10_MND;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(
                intl,
                'harDuJobbetSomFrilansSiste10Mnd.spørsmål'
            )}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: FrilansSiste10Mnd.HAR_JOBBET_FRILANS_SISTE_10_MND
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: FrilansSiste10Mnd.IKKE_JOBBET_FRILANS_SISTE_10_MND
                }
            ]}
            name="harJobbetSomFrilansSiste10Mnd"
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: FrilansSiste10Mnd
            ) =>
                onChange(
                    v === FrilansSiste10Mnd.HAR_JOBBET_FRILANS_SISTE_10_MND,
                    e
                )
            }
            {...otherProps}
        />
    );
};

export default injectIntl(HarDuJobbetSomFrilansSiste10MndSpørsmål);
