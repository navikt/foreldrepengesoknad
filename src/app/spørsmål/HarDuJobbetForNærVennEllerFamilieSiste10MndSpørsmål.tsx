import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

export enum HarJobbetForNærVennEllerFamilieSiste12Mnd {
    'HAR_JOBBET_FOR_NÆR_VENN_ELLER_FAMILIE_SISTE_10_MND' = 'harJobbetForNærVennEllerFamilieSiste10Mnd',
    'HAR_IKKE_JOBBET_FOR_NÆR_VENN_ELLER_FAMILIE_SISTE_10_MND' = 'harIkkeJobbetForNærVennEllerFamilieSiste10Mnd'
}

interface HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmålProps {
    harJobbetForNærVennEllerFamilieSiste10Mnd?: boolean;
    onChange: (
        harJobbetForNærVennEllerFamilieSiste10Mnd: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmålProps &
    InjectedIntlProps;

const HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål = (props: Props) => {
    const { onChange, harJobbetForNærVennEllerFamilieSiste10Mnd, intl } = props;

    let checked;
    if (harJobbetForNærVennEllerFamilieSiste10Mnd === true) {
        checked =
            HarJobbetForNærVennEllerFamilieSiste12Mnd.HAR_JOBBET_FOR_NÆR_VENN_ELLER_FAMILIE_SISTE_10_MND;
    } else if (harJobbetForNærVennEllerFamilieSiste10Mnd === false) {
        checked =
            HarJobbetForNærVennEllerFamilieSiste12Mnd.HAR_IKKE_JOBBET_FOR_NÆR_VENN_ELLER_FAMILIE_SISTE_10_MND;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(
                intl,
                'harJobbetForNærVennEllerFamilieSiste10Mnd.spørsmål'
            )}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value:
                        HarJobbetForNærVennEllerFamilieSiste12Mnd.HAR_JOBBET_FOR_NÆR_VENN_ELLER_FAMILIE_SISTE_10_MND
                },
                {
                    label: getMessage(intl, 'nei'),
                    value:
                        HarJobbetForNærVennEllerFamilieSiste12Mnd.HAR_IKKE_JOBBET_FOR_NÆR_VENN_ELLER_FAMILIE_SISTE_10_MND
                }
            ]}
            name="harJobbetForNærVennEllerFamilieSiste12Mnd"
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: HarJobbetForNærVennEllerFamilieSiste12Mnd
            ) =>
                onChange(
                    v ===
                        HarJobbetForNærVennEllerFamilieSiste12Mnd.HAR_JOBBET_FOR_NÆR_VENN_ELLER_FAMILIE_SISTE_10_MND,
                    e
                )
            }
        />
    );
};

export default injectIntl(HarDuJobbetForNærVennEllerFamilieSiste10MndSpørsmål);
