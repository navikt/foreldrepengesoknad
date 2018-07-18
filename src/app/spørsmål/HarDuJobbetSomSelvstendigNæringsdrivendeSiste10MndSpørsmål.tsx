import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

export enum HarJobbetSomSelvstendigNæringsdrivendeSiste10Mnd {
    'HAR_VÆRT_SELVSTENDIG_NÆRINGSDRIVENDE_SISTE_10_MND' = 'harVærtSelvstendigNæringsdrivendeSiste10Mnd',
    'HAR_IKKE_VÆRT_SELVSTENDIG_NÆRINGSDRIVENDE_SISTE_10_MND' = 'harIkkeVærtSelvstendigNæringsdrivendeSiste10Mnd'
}

interface HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmålProps {
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean;
    onChange: (
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmålProps &
    InjectedIntlProps;

const HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål = (
    props: Props
) => {
    const {
        onChange,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd,
        intl,
        ...otherProps
    } = props;

    let checked;
    if (harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === true) {
        checked =
            HarJobbetSomSelvstendigNæringsdrivendeSiste10Mnd.HAR_VÆRT_SELVSTENDIG_NÆRINGSDRIVENDE_SISTE_10_MND;
    } else if (harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === false) {
        checked =
            HarJobbetSomSelvstendigNæringsdrivendeSiste10Mnd.HAR_IKKE_VÆRT_SELVSTENDIG_NÆRINGSDRIVENDE_SISTE_10_MND;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(
                intl,
                'harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd.spørsmål'
            )}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value:
                        HarJobbetSomSelvstendigNæringsdrivendeSiste10Mnd.HAR_VÆRT_SELVSTENDIG_NÆRINGSDRIVENDE_SISTE_10_MND
                },
                {
                    label: getMessage(intl, 'nei'),
                    value:
                        HarJobbetSomSelvstendigNæringsdrivendeSiste10Mnd.HAR_IKKE_VÆRT_SELVSTENDIG_NÆRINGSDRIVENDE_SISTE_10_MND
                }
            ]}
            name="harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd"
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: HarJobbetSomSelvstendigNæringsdrivendeSiste10Mnd
            ) =>
                onChange(
                    v ===
                        HarJobbetSomSelvstendigNæringsdrivendeSiste10Mnd.HAR_VÆRT_SELVSTENDIG_NÆRINGSDRIVENDE_SISTE_10_MND,
                    e
                )
            }
            {...otherProps}
        />
    );
};

export default injectIntl(
    HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål
);
