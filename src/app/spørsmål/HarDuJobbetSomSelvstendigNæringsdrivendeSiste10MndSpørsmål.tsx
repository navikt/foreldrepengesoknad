import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../components/ja-nei-spørsmål/JaNeiSpørsmål';
import EksternUrl from 'common/components/infoboks/EksternUrl';
import lenker from '../util/routing/lenker';

interface HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmålProps {
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean | undefined;
    onChange: (harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean) => void;
    planInneholderSelvstendignæringaktivitet: boolean;
}

type Props = HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmålProps & InjectedIntlProps;

const HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål = (props: Props) => {
    const {
        onChange,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd,
        planInneholderSelvstendignæringaktivitet,
        intl
    } = props;

    const validerSelvstendignæring = [
        {
            test: () =>
                planInneholderSelvstendignæringaktivitet
                    ? harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === true
                    : false,
            failText: getMessage(intl, 'valideringsfeil.selvstendigNæringsdrivende.måBesvares')
        }
    ];

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd.spørsmål')}
            navn="harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd"
            valgtVerdi={harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd}
            onChange={(verdi) => onChange(verdi)}
            clsName="jobbetSomSelvstendigNaringsdrivende"
            hjelpetekst={
                <EksternUrl
                    tekst="harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd.infoboks.tekst"
                    url={lenker.NaringsdrivendeInfoBoks}
                    lenkeTekst="hjemmeside"
                />
            }
            validators={validerSelvstendignæring}
        />
    );
};

export default injectIntl(HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål);
