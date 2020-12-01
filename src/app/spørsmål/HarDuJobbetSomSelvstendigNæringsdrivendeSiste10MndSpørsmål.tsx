import * as React from 'react';
import { useIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';
import EksternUrl from 'common/components/infoboks/EksternUrl';
import lenker from '../util/routing/lenker';
import { Normaltekst } from 'nav-frontend-typografi';

interface HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmålProps {
    harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean | undefined;
    onChange: (harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: boolean) => void;
    planInneholderSelvstendignæringaktivitet: boolean;
}

type Props = HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmålProps;

const HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål = (props: Props) => {
    const {
        onChange,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd,
        planInneholderSelvstendignæringaktivitet,
    } = props;
    const intl = useIntl();

    const validerSelvstendignæring = [
        {
            test: () =>
                planInneholderSelvstendignæringaktivitet
                    ? harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd === true
                    : true,
            failText: getMessage(intl, 'valideringsfeil.selvstendigNæringsdrivende.måBesvares'),
        },
    ];

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd.spørsmål')}
            navn="harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd"
            valgtVerdi={harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd}
            onChange={(verdi) => onChange(verdi)}
            clsName="jobbetSomSelvstendigNaringsdrivende"
            hjelpetekstApneLabel="Les mer om hvem som kan være selvstendig næringsdrivende"
            hjelpetekst={
                <div style={{ backgroundColor: '#e9e7e7', padding: '1.5rem' }}>
                    <Normaltekst>
                        <EksternUrl
                            tekst="harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd.infoboks.tekst"
                            url={lenker.NaringsdrivendeInfoBoks}
                            lenkeTekst="hjemmeside"
                        />
                    </Normaltekst>
                </div>
            }
            validators={validerSelvstendignæring}
        />
    );
};

export default HarDuJobbetSomSelvstendigNæringsdrivendeSiste10MndSpørsmål;
