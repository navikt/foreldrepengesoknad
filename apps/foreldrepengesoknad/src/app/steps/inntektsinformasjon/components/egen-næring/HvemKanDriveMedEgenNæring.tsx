import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Link, ReadMore } from '@navikt/ds-react';

import { Block, intlUtils } from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';

const HvemKanDriveMedEgenNæring = () => {
    const intl = useIntl();

    return (
        <ReadMore
            header={intlUtils(intl, 'inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd.apneLabel')}
        >
            <div>
                <Block padBottom="l">
                    <BodyShort>
                        <FormattedMessage id="inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd.infoboks.del1" />
                    </BodyShort>
                </Block>
                <BodyShort>
                    <FormattedMessage
                        id="inntektsinformasjon.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd.infoboks.del2"
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
