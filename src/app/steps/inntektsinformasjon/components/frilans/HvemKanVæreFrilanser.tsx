import { intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import EksternUrl from 'app/components/ekstern-url/EksternUrl';
import links from 'app/links/links';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const HvemKanVæreFrilanser = () => {
    const intl = useIntl();

    return (
        <UtvidetInformasjon
            apneLabel={intlUtils(intl, 'inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.apneLabel')}
        >
            <div style={{ backgroundColor: '#e9e7e7', padding: '1.5rem' }}>
                <Normaltekst>
                    <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.del1" />
                </Normaltekst>
                <ul>
                    <li>
                        <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.punkt1" />
                    </li>
                    <li>
                        <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.punkt2" />
                    </li>
                    <li>
                        <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.punkt3" />
                    </li>
                    <li>
                        <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.punkt4" />
                    </li>
                    <li>
                        <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.punkt5" />
                    </li>
                    <li>
                        <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.punkt6" />
                    </li>
                    <li>
                        <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.punkt7" />
                    </li>
                    <li>
                        <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.punkt8" />
                    </li>
                </ul>
                <Normaltekst>
                    <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.del2" />
                    <EksternUrl url={links.frilanserInfoBoks} lenkeTekst={intlUtils(intl, 'hjemmeside')} />
                </Normaltekst>
            </div>
        </UtvidetInformasjon>
    );
};

export default HvemKanVæreFrilanser;
