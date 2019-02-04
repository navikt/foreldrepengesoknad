import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import getMessage from 'common/util/i18nUtils';
import { StønadskontoType } from '../types/uttaksplan/periodetyper';
import { getStønadskontoNavn } from '../util/uttaksplan';
import { NavnPåForeldre } from 'common/types';
import FlervalgSpørsmål from '../components/flervalg-spørsmål/FlervalgSpørsmål';

interface HvilkenKvoteSkalBenyttesSpørsmålProps {
    onChange: (stønadskonto: StønadskontoType) => void;
    valgtKvote?: StønadskontoType;
    navnPåForeldre: NavnPåForeldre;
    velgbareStønadskontoer: StønadskontoType[];
}

type Props = HvilkenKvoteSkalBenyttesSpørsmålProps & InjectedIntlProps;

const HvilkenKvoteSkalBenyttesSpørsmål = (props: Props) => {
    const { valgtKvote, navnPåForeldre, velgbareStønadskontoer, intl, onChange } = props;
    const radios = velgbareStønadskontoer.map((konto): RadioProps => ({
        label: getStønadskontoNavn(intl, konto, navnPåForeldre),
        value: `${konto}`
    }));

    return (
        <FlervalgSpørsmål
            valgtVerdi={valgtKvote}
            alternativer={radios}
            navn="kvote"
            toKolonner={true}
            spørsmål={getMessage(intl, 'hvilkenkvoteskalbenyttes.spørsmål')}
            onChange={(v: StønadskontoType) => onChange(v)}
        />
    );
};

export default injectIntl(HvilkenKvoteSkalBenyttesSpørsmål);
