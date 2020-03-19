import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { StønadskontoType } from '../types/uttaksplan/periodetyper';
import { getStønadskontoNavn } from '../util/uttaksplan';
import { NavnPåForeldre } from 'common/types';
import FlervalgSpørsmål from '../../common/components/skjema/elements/flervalg-spørsmål/FlervalgSpørsmål';
import { RadioProps } from 'nav-frontend-skjema';

interface HvilkenKvoteSkalBenyttesSpørsmålProps {
    onChange: (stønadskonto: StønadskontoType) => void;
    valgtKvote?: StønadskontoType;
    navnPåForeldre: NavnPåForeldre;
    navnAnnenForelder: string;
    erOppholdsperiode: boolean;
    velgbareStønadskontoer: StønadskontoType[];
}

type Props = HvilkenKvoteSkalBenyttesSpørsmålProps & InjectedIntlProps;

const getSpørsmålsTekst = (erOppholdsperiode: boolean, intl: InjectedIntl, navnAnnenForelder: string): string => {
    if (erOppholdsperiode) {
        return getMessage(intl, 'hvilkenkvoteskalbenyttes.spørsmål.annenForelder', {
            navnAnnenForelder
        });
    } else {
        return getMessage(intl, 'hvilkenkvoteskalbenyttes.spørsmål');
    }
};

const HvilkenKvoteSkalBenyttesSpørsmål = (props: Props) => {
    const {
        valgtKvote,
        navnPåForeldre,
        velgbareStønadskontoer,
        erOppholdsperiode,
        navnAnnenForelder,
        intl,
        onChange
    } = props;

    const radios = velgbareStønadskontoer.map(
        (konto): RadioProps => ({
            label: getStønadskontoNavn(intl, konto, navnPåForeldre),
            value: `${konto}`,
            name: 'hvilkenKvote'
        })
    );

    return (
        <FlervalgSpørsmål
            valgtVerdi={valgtKvote}
            alternativer={radios}
            navn="kvote"
            toKolonner={true}
            spørsmål={getSpørsmålsTekst(erOppholdsperiode, intl, navnAnnenForelder)}
            onChange={(v: StønadskontoType) => onChange(v)}
        />
    );
};

export default injectIntl(HvilkenKvoteSkalBenyttesSpørsmål);
