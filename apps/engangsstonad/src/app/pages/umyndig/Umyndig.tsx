import { Heading, Link } from '@navikt/ds-react';
import { bemUtils, intlUtils, Sidebanner, useDocumentTitle } from '@navikt/fp-common';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import Person from 'app/types/domain/Person';
import { PageKeys } from 'app/types/PageKeys';
import { lenker } from 'app/util/lenker';
import React from 'react';
import { useIntl } from 'react-intl';

import './umyndig.less';

interface Props {
    person: Person;
}

const Umyndig: React.FunctionComponent<Props> = ({ person }) => {
    const bem = bemUtils('umyndig');
    const intl = useIntl();
    useDocumentTitle(intlUtils(intl, 'velkommen.standard.dokumenttittel'));

    logAmplitudeEvent('sidevisning', {
        app: 'engangsstonadny',
        team: 'foreldrepenger',
        pageKey: PageKeys.Umyndig,
    });

    return (
        <div className={bem.block}>
            <Sidebanner
                dialog={{
                    title: intlUtils(intl, 'velkommen.standard.bobletittel', {
                        name: person.fornavn.toLowerCase(),
                    }),
                    text: (
                        <div>
                            <div className={bem.element('info')}>{intlUtils(intl, 'velkommen.under18.bobletekst')}</div>
                            <Link href={lenker.papirsøknad}>
                                {intlUtils(intl, 'velkommen.under18.boblelenketekst')}
                            </Link>
                        </div>
                    ),
                }}
            />
            <div className={bem.element('content')}>
                <Heading size="large">Søknad om Engangsstønad</Heading>
            </div>
        </div>
    );
};

export default Umyndig;
