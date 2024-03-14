import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Link, ReadMore } from '@navikt/ds-react';

import { Block, intlUtils } from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';

const HvemKanVæreFrilanser = () => {
    const intl = useIntl();

    return (
        <ReadMore header={intlUtils(intl, 'inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.apneLabel')}>
            <div>
                <Block padBottom="l">
                    <BodyShort>
                        <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.del1" />
                    </BodyShort>
                </Block>
                <Block padBottom="l">
                    <BodyShort>
                        <FormattedMessage id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.del2" />
                    </BodyShort>
                </Block>
                <BodyShort>
                    <FormattedMessage
                        id="inntektsinformasjon.harDuJobbetSomFrilansSiste10Mnd.infoboksTekst.del3"
                        values={{
                            a: (msg) => (
                                <Link href={links.frilanserInfoBoks} rel="noreferrer" target="_blank">
                                    {msg}
                                </Link>
                            ),
                        }}
                    />
                </BodyShort>
            </div>
        </ReadMore>
    );
};

export default HvemKanVæreFrilanser;
