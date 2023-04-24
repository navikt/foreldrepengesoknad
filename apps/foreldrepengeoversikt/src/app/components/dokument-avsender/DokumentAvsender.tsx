import { BodyShort } from '@navikt/ds-react';
import { bemUtils } from '@navikt/fp-common';
import { DokumentType } from 'app/types/DokumentType';

import './dokument-avsender.css';

interface Props {
    type: DokumentType;
}

const getAvsender = (type: DokumentType) => {
    if (type === DokumentType.INNGÅENDE_DOKUMENT) {
        return 'Du';
    }

    if (type === DokumentType.UTGÅENDE_DOKUMENT) {
        return 'NAV';
    }

    return 'Arbeidsgiver';
};

const DokumentAvsender: React.FunctionComponent<Props> = ({ type }) => {
    const bem = bemUtils('dokument-avsender');

    return (
        <div className={bem.block}>
            <BodyShort className={bem.element('text')}>{getAvsender(type)}</BodyShort>
        </div>
    );
};

export default DokumentAvsender;
