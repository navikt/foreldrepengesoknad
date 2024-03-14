import TeddyBearCot from 'assets/TeddyBearCot';

import { BodyShort, Heading } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import './topp.css';

interface Props {
    saksnummer: string | undefined;
}

const Topp: React.FunctionComponent<Props> = ({ saksnummer }) => {
    const bem = bemUtils('topp');

    return (
        <section>
            <div className={bem.block}>
                <Heading size="large">Dine foreldrepenger</Heading>
                <div className={bem.element('content')}>
                    <div>
                        {saksnummer && <BodyShort>Saksnummer {saksnummer}</BodyShort>}
                        <BodyShort>Termindato 13. okt 2022</BodyShort>
                    </div>
                    <TeddyBearCot />
                </div>
            </div>
        </section>
    );
};

export default Topp;
