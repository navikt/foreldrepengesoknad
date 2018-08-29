import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';
import { InputChangeEvent } from '../types/dom/Events';

export enum NÆR_VENN_ELLER_FAMILIE {
    'ER_NÆR_VENN_ELLER_FAMILIE' = 'erNærVennEllerFamilieVisible',
    'ER_IKKE_NÆR_VENN_ELLER_FAMILIE' = 'erIkkeNærVennEllerFamilie'
}

interface ErArbeidsgiverNærVennEllerFamilieSpørsmålProps {
    erArbeidsgiverNærVennEllerFamilie?: boolean;
    onChange: (nærVennEllerFamilie: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
}

type Props = ErArbeidsgiverNærVennEllerFamilieSpørsmålProps & InjectedIntlProps;

const ErArbeidsgiverNærVennEllerFamilieSpørsmål = (props: Props) => {
    const { onChange, erArbeidsgiverNærVennEllerFamilie, intl } = props;

    let checked;
    if (erArbeidsgiverNærVennEllerFamilie === true) {
        checked = NÆR_VENN_ELLER_FAMILIE.ER_NÆR_VENN_ELLER_FAMILIE;
    } else if (erArbeidsgiverNærVennEllerFamilie === false) {
        checked = NÆR_VENN_ELLER_FAMILIE.ER_IKKE_NÆR_VENN_ELLER_FAMILIE;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'erArbeidsgiverNærVennEllerFamilie.spørsmål')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value: NÆR_VENN_ELLER_FAMILIE.ER_NÆR_VENN_ELLER_FAMILIE
                },
                {
                    label: getMessage(intl, 'nei'),
                    value: NÆR_VENN_ELLER_FAMILIE.ER_IKKE_NÆR_VENN_ELLER_FAMILIE
                }
            ]}
            name="erArbeidsgiverNærVennEllerFamilie"
            onChange={(e: InputChangeEvent, v: NÆR_VENN_ELLER_FAMILIE) =>
                onChange(v === NÆR_VENN_ELLER_FAMILIE.ER_NÆR_VENN_ELLER_FAMILIE, e)
            }
        />
    );
};

export default injectIntl(ErArbeidsgiverNærVennEllerFamilieSpørsmål);
