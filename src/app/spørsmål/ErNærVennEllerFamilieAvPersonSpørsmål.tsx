import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import RadioPanelGruppeResponsive from 'common/components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { InputChangeEvent } from '../types/dom/Events';

interface ErNærVennEllerFamilieAvPersonSpørsmålProps {
    erNærVennEllerFamilieAvPerson?: boolean;
    onChange: (erNærVennEllerFamilieAvPerson: boolean) => void;
}

type Props = ErNærVennEllerFamilieAvPersonSpørsmålProps & InjectedIntlProps;

enum ErNærVennEllerFamilieAvPerson {
    'ER_NÆR_VENN_ELLER_FAMILIE_AV_PERSON' = 'erNærVennEllerFamilieAvPerson',
    'ER_IKKE_NÆR_VENN_ELLER_FAMILIE_AV_PERSON' = 'erIkkeNærVennEllerFamilieAvPerson'
}

const ErNærVennEllerFamilieAvPersonSpørsmål = (props: Props) => {
    const { onChange, erNærVennEllerFamilieAvPerson, intl } = props;

    let checked;
    if (erNærVennEllerFamilieAvPerson === true) {
        checked =
            ErNærVennEllerFamilieAvPerson.ER_NÆR_VENN_ELLER_FAMILIE_AV_PERSON;
    } else if (erNærVennEllerFamilieAvPerson === false) {
        checked =
            ErNærVennEllerFamilieAvPerson.ER_IKKE_NÆR_VENN_ELLER_FAMILIE_AV_PERSON;
    }

    return (
        <RadioPanelGruppeResponsive
            checked={checked}
            legend={getMessage(intl, 'næringsrelasjon.nærVennEllerFamilie')}
            radios={[
                {
                    label: getMessage(intl, 'ja'),
                    value:
                        ErNærVennEllerFamilieAvPerson.ER_NÆR_VENN_ELLER_FAMILIE_AV_PERSON
                },
                {
                    label: getMessage(intl, 'nei'),
                    value:
                        ErNærVennEllerFamilieAvPerson.ER_IKKE_NÆR_VENN_ELLER_FAMILIE_AV_PERSON
                }
            ]}
            name="erNærVennEllerFamilieAvPerson"
            onChange={(e: InputChangeEvent, v: ErNærVennEllerFamilieAvPerson) =>
                onChange(
                    v ===
                        ErNærVennEllerFamilieAvPerson.ER_NÆR_VENN_ELLER_FAMILIE_AV_PERSON
                )
            }
        />
    );
};

export default injectIntl(ErNærVennEllerFamilieAvPersonSpørsmål);
