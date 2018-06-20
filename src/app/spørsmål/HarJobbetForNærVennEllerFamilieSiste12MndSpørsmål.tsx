import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

export enum HarJobbetForNærVennEllerFamilieSiste12Mnd {
    'HAR_JOBBET_FOR_NÆR_VENN_ELLER_FAMILIE_SISTE_12_MND' = 'harJobbetForNærVennEllerFamilieSiste12Mnd',
    'HAR_IKKE_JOBBET_FOR_NÆR_VENN_ELLER_FAMILIE_SISTE_12_MND' = 'harIkkeJobbetForNærVennEllerFamilieSiste12Mnd'
}

interface HarJobbetForNærVennEllerFamilieSiste12MndSpørsmålProps {
    harJobbetForNærVennEllerFamilieSiste12Mnd?: boolean;
    onChange: (
        harJobbetForNærVennEllerFamilieSiste12Mnd: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = HarJobbetForNærVennEllerFamilieSiste12MndSpørsmålProps &
    InjectedIntlProps;

const HarJobbetForNærVennEllerFamilieSiste12MndSpørsmål = (props: Props) => {
    const { onChange, harJobbetForNærVennEllerFamilieSiste12Mnd, intl } = props;

    let checked;
    if (harJobbetForNærVennEllerFamilieSiste12Mnd === true) {
        checked =
            HarJobbetForNærVennEllerFamilieSiste12Mnd.HAR_JOBBET_FOR_NÆR_VENN_ELLER_FAMILIE_SISTE_12_MND;
    } else if (harJobbetForNærVennEllerFamilieSiste12Mnd === false) {
        checked =
            HarJobbetForNærVennEllerFamilieSiste12Mnd.HAR_IKKE_JOBBET_FOR_NÆR_VENN_ELLER_FAMILIE_SISTE_12_MND;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(
                intl,
                'harJobbetForNærVennEllerFamilieSiste12Mnd.spørsmål'
            )}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value:
                        HarJobbetForNærVennEllerFamilieSiste12Mnd.HAR_JOBBET_FOR_NÆR_VENN_ELLER_FAMILIE_SISTE_12_MND
                },
                {
                    label: getMessage(intl, 'nei'),
                    value:
                        HarJobbetForNærVennEllerFamilieSiste12Mnd.HAR_IKKE_JOBBET_FOR_NÆR_VENN_ELLER_FAMILIE_SISTE_12_MND
                }
            ]}
            name="harJobbetForNærVennEllerFamilieSiste12Mnd"
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: HarJobbetForNærVennEllerFamilieSiste12Mnd
            ) =>
                onChange(
                    v ===
                        HarJobbetForNærVennEllerFamilieSiste12Mnd.HAR_JOBBET_FOR_NÆR_VENN_ELLER_FAMILIE_SISTE_12_MND,
                    e
                )
            }
        />
    );
};

export default injectIntl(HarJobbetForNærVennEllerFamilieSiste12MndSpørsmål);
