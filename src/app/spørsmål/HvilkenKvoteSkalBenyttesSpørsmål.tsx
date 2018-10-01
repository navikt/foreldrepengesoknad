import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import getMessage from 'common/util/i18nUtils';
import { StønadskontoType } from '../types/uttaksplan/periodetyper';
import { InputChangeEvent } from '../types/dom/Events';
import { getStønadskontoNavn } from '../util/uttaksplan';
import { NavnPåForeldre } from 'common/types';
import RadioPanelGruppe from 'common/components/skjema/wrappers/RadioPanelGruppe';

interface HvilkenKvoteSkalBenyttesSpørsmålProps {
    onChange: (stønadskonto: StønadskontoType) => void;
    stønadskonto?: StønadskontoType;
    navnPåForeldre: NavnPåForeldre;
    velgbareStønadskontoer: StønadskontoType[];
}

type Props = HvilkenKvoteSkalBenyttesSpørsmålProps & InjectedIntlProps;

const HvilkenKvoteSkalBenyttesSpørsmål = (props: Props) => {
    const { stønadskonto, navnPåForeldre, velgbareStønadskontoer, intl, onChange } = props;
    const radios = velgbareStønadskontoer.map((konto): RadioProps => ({
        label: getStønadskontoNavn(intl, konto, navnPåForeldre),
        value: `${konto}`
    }));

    return (
        <RadioPanelGruppe
            checked={stønadskonto}
            radios={radios}
            name="kvote"
            twoColumns={true}
            legend={getMessage(intl, 'hvilkenkvoteskalbenyttes.spørsmål')}
            onChange={(e: InputChangeEvent, v: StønadskontoType) => onChange(v)}
            validators={[
                {
                    test: () => stønadskonto !== undefined,
                    failText: 'Påkrevd'
                }
            ]}
        />
    );
};

export default injectIntl(HvilkenKvoteSkalBenyttesSpørsmål);
