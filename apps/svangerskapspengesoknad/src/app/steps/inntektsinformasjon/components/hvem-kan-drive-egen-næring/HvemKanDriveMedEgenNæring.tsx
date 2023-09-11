import { BodyShort, Link, ReadMore } from '@navikt/ds-react';
import { Block, intlUtils } from '@navikt/fp-common';
import links from 'app/links/links';

import { FormattedMessage, useIntl } from 'react-intl';

const HvemKanDriveMedEgenNæring = () => {
    const intl = useIntl();

    return (
        <ReadMore header={intlUtils(intl, 'inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende.apneLabel')}>
            <div>
                <Block padBottom="l">
                    <BodyShort>
                        <FormattedMessage id="inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende.infoboks.del1" />
                    </BodyShort>
                </Block>
                <BodyShort>
                    <FormattedMessage
                        id="inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivende.infoboks.del2"
                        values={{
                            a: (msg: any) => (
                                <Link href={links.næringsdrivendeInfoBoks} rel="noreferrer" target="_blank">
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

export default HvemKanDriveMedEgenNæring;
