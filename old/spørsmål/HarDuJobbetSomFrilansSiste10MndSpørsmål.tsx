import * as React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import JaNeiSpørsmål from '../../common/components/skjema/elements/ja-nei-spørsmål/JaNeiSpørsmål';
import EksternUrl from 'common/components/infoboks/EksternUrl';
import lenker from '../util/routing/lenker';
import { Validator } from 'common/lib/validation/types';
import { Normaltekst } from 'nav-frontend-typografi';

interface HarDuJobbetSomFrilansSiste10MndSpørsmålProps {
    harJobbetSomFrilansSiste10Mnd: boolean;
    onChange: (erFrilanser: boolean) => void;
    planInneholderFrilansaktivitet: boolean;
    validators?: Validator[];
}

type Props = HarDuJobbetSomFrilansSiste10MndSpørsmålProps;

const HarDuJobbetSomFrilansSiste10MndSpørsmål = (props: Props) => {
    const { onChange, harJobbetSomFrilansSiste10Mnd, planInneholderFrilansaktivitet } = props;
    const intl = useIntl();

    const validerFrilans = [
        {
            test: () => (planInneholderFrilansaktivitet ? harJobbetSomFrilansSiste10Mnd === true : true),
            failText: getMessage(intl, 'valideringsfeil.frilans.måBesvares'),
        },
    ];

    return (
        <JaNeiSpørsmål
            spørsmål={getMessage(intl, 'harDuJobbetSomFrilansSiste10Mnd.spørsmål')}
            navn="harJobbetSomFrilansSiste10Mnd"
            valgtVerdi={harJobbetSomFrilansSiste10Mnd}
            onChange={(verdi) => onChange(verdi)}
            clsName="frilanseSiste10mnd"
            hjelpetekstApneLabel={getMessage(intl, 'harDuJobbetSomFrilansSiste10Mnd.spørsmål.apneLabel')}
            hjelpetekst={
                <div style={{ backgroundColor: '#e9e7e7', padding: '1.5rem' }}>
                    <Normaltekst>
                        <FormattedMessage id="harDuJobbetSomFrilansSiste10Mnd.spørsmål.infoboksTekst.del1" />
                    </Normaltekst>
                    <ul>
                        <li>
                            <FormattedMessage id="harDuJobbetSomFrilansSiste10Mnd.spørsmål.infoboksTekst.punkt1" />
                        </li>
                        <li>
                            <FormattedMessage id="harDuJobbetSomFrilansSiste10Mnd.spørsmål.infoboksTekst.punkt2" />
                        </li>
                        <li>
                            <FormattedMessage id="harDuJobbetSomFrilansSiste10Mnd.spørsmål.infoboksTekst.punkt3" />
                        </li>
                        <li>
                            <FormattedMessage id="harDuJobbetSomFrilansSiste10Mnd.spørsmål.infoboksTekst.punkt4" />
                        </li>
                        <li>
                            <FormattedMessage id="harDuJobbetSomFrilansSiste10Mnd.spørsmål.infoboksTekst.punkt5" />
                        </li>
                        <li>
                            <FormattedMessage id="harDuJobbetSomFrilansSiste10Mnd.spørsmål.infoboksTekst.punkt6" />
                        </li>
                        <li>
                            <FormattedMessage id="harDuJobbetSomFrilansSiste10Mnd.spørsmål.infoboksTekst.punkt7" />
                        </li>
                        <li>
                            <FormattedMessage id="harDuJobbetSomFrilansSiste10Mnd.spørsmål.infoboksTekst.punkt8" />
                        </li>
                    </ul>
                    <Normaltekst>
                        <FormattedMessage id="harDuJobbetSomFrilansSiste10Mnd.spørsmål.infoboksTekst.del2" />
                        <EksternUrl url={lenker.frilanserInfoBoks} lenkeTekst={getMessage(intl, 'hjemmeside')} />
                    </Normaltekst>
                </div>
            }
            validators={validerFrilans}
        />
    );
};

export default HarDuJobbetSomFrilansSiste10MndSpørsmål;
