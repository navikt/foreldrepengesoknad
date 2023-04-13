import { BodyShort } from '@navikt/ds-react';
import { intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import EksternUrl from 'app/components/ekstern-url/EksternUrl';
import links from 'app/links/links';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const HvemKanVæreFrilanser = () => {
    const intl = useIntl();

    return (
        <UtvidetInformasjon
            apneLabel={intlUtils(intl, 'inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.apneLabel')}
        >
            <div style={{ backgroundColor: '#f1f1f1', padding: '1.5rem' }}>
                <BodyShort>
                    <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.del1" />
                </BodyShort>
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
                <BodyShort>
                    <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.del2" />
                    <EksternUrl url={links.frilanserInfoBoks} lenkeTekst={intlUtils(intl, 'hjemmeside')} />
                </BodyShort>
            </div>
        </UtvidetInformasjon>
    );
};

export default HvemKanVæreFrilanser;
