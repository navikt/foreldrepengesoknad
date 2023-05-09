import MannIkon from 'common/components/ikoner/MannIkon';
import KvinneIkon from 'common/components/ikoner/KvinneIkon';

import './søkerPersonalia.less';
import { BodyShort, Heading } from '@navikt/ds-react';

interface SøkersPersonaliaProps {
    navn: string;
    fnr: string;
    kjønn: 'M' | 'K';
}

const SøkerPersonalia = (props: SøkersPersonaliaProps) => {
    return (
        <div className="søkersPersonalia">
            <div className="søkersPersonalia__ikon">{props.kjønn === 'K' ? <KvinneIkon /> : <MannIkon />}</div>
            <div className="søkersPersonalia__text">
                <Heading size="small">{props.navn}</Heading>
                <BodyShort>{props.fnr}</BodyShort>
            </div>
        </div>
    );
};

export default SøkerPersonalia;
