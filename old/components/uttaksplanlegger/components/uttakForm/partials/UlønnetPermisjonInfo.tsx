import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import UtvidetInformasjon from 'app/components/elementer/utvidetinformasjon/UtvidetInformasjon';
import Block from 'common/components/block/Block';
import { førsteOktober2021ReglerGjelder } from 'app/util/dates/dates';

interface Props {
    familiehendelsesdato: Date;
}

const UlønnetPermisjonInfo: React.FunctionComponent<Props> = ({ familiehendelsesdato }) => {
    const intl = useIntl();

    return (
        <UtvidetInformasjon apneLabel={intl.formatMessage({ id: 'uttaksplan.ulønnetPermisjonInfo.tittel' })}>
            {!førsteOktober2021ReglerGjelder(familiehendelsesdato) && (
                <Block margin="xs">
                    <FormattedMessage
                        id="uttaksplan.ulønnetPermisjonInfo.del1"
                        values={{ b: (msg: any) => <b>{msg}</b> }}
                    />
                </Block>
            )}
            <FormattedMessage
                id="uttaksplan.ulønnetPermisjonInfo.del2"
                values={{
                    a: (msg: any) => (
                        <a
                            href="https://www.nav.no/no/Person/Arbeid/Sykmeldt%2C+arbeidsavklaringspenger+og+yrkesskade/Sykepenger/Sykepenger+til+sarskilte+grupper#chapter-5"
                            className="lenke"
                            rel="noreferrer"
                            target="_blank"
                        >
                            {msg}
                        </a>
                    ),
                }}
            />
        </UtvidetInformasjon>
    );
};

export default UlønnetPermisjonInfo;
