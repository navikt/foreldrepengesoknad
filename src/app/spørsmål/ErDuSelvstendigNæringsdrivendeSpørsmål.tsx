import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';

enum SelvstendigNæringsdrivende {
    'ER_SELVSTENDIG_NÆRINGSDRIVENDE' = 'erSelvstendigNæringsdrivende',
    'IKKE_SELVSTENDIG_NÆRINGSDRIVENDE' = 'ikkeSelvstendigNæringsdrivende'
}

interface ErDuSelvstendigNæringsdrivendeProps {
    erSelvstendigNæringsdrivende: boolean;
    onChange: (
        erSelvstendigNæringsdrivende: boolean,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = ErDuSelvstendigNæringsdrivendeProps & InjectedIntlProps;

const ErDuSelvstendigNæringsdrivendeSpørsmål = (props: Props) => {
    const {
        onChange,
        erSelvstendigNæringsdrivende,
        intl,
        ...otherProps
    } = props;

    let checked;
    if (erSelvstendigNæringsdrivende === true) {
        checked = SelvstendigNæringsdrivende.ER_SELVSTENDIG_NÆRINGSDRIVENDE;
    } else if (erSelvstendigNæringsdrivende === false) {
        checked = SelvstendigNæringsdrivende.IKKE_SELVSTENDIG_NÆRINGSDRIVENDE;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'erDuSelvstendigNæringsdrivende.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value:
                        SelvstendigNæringsdrivende.ER_SELVSTENDIG_NÆRINGSDRIVENDE
                },
                {
                    label: getMessage(intl, 'nei'),
                    value:
                        SelvstendigNæringsdrivende.IKKE_SELVSTENDIG_NÆRINGSDRIVENDE
                }
            ]}
            name="erSelvstendigNæringsdrivende"
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: SelvstendigNæringsdrivende
            ) =>
                onChange(
                    v ===
                        SelvstendigNæringsdrivende.ER_SELVSTENDIG_NÆRINGSDRIVENDE,
                    e
                )
            }
            {...otherProps}
        />
    );
};

export default injectIntl(ErDuSelvstendigNæringsdrivendeSpørsmål);
