import * as React from 'react';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import getMessage from 'common/util/i18nUtils';
import { StønadskontoType } from '../types/uttaksplan/periodetyper';
import { InputChangeEvent } from '../types/dom/Events';

interface HvilkenKvoteSkalBenyttesSpørsmålProps {
    onChange: (stønadskonto: StønadskontoType) => void;
    stønadskonto?: StønadskontoType;
    velgbareStønadskontoer: StønadskontoType[];
}

type Props = HvilkenKvoteSkalBenyttesSpørsmålProps & InjectedIntlProps;

const HvilkenKvoteSkalBenyttesSpørsmål = (props: Props) => {
    const { stønadskonto, velgbareStønadskontoer, intl, onChange } = props;

    const radios: RadioProps[] = [
        { label: getMessage(intl, 'stønadskontotype.FEDREKVOTE'), value: StønadskontoType.Fedrekvote },
        { label: getMessage(intl, 'stønadskontotype.MØDREKVOTE'), value: StønadskontoType.Mødrekvote },
        { label: getMessage(intl, 'stønadskontotype.FELLESPERIODE'), value: StønadskontoType.Fellesperiode },
        { label: getMessage(intl, 'stønadskontotype.FLERBARNSUKER'), value: StønadskontoType.Flerbarnsuker }
    ].filter((v) => velgbareStønadskontoer.indexOf(v.value) >= 0);

    return (
        <RadioPanelGruppeResponsive
            checked={stønadskonto}
            radios={radios}
            name=""
            legend={getMessage(intl, 'hvilkenkvoteskalbenyttes.spørsmål')}
            onChange={(e: InputChangeEvent, v: StønadskontoType) => onChange(v)}
        />
    );
};

export default injectIntl(HvilkenKvoteSkalBenyttesSpørsmål);
