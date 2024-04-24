import { bemUtils } from '@navikt/fp-common';

import './periode-liste-header.css';

const PeriodeListeHeader = () => {
    const bem = bemUtils('periode-liste-header');

    return (
        <div className={bem.block}>
            <div className={bem.element('dato')}>21. jan - 3. mars</div>
            <div className={bem.element('uker')}>3 uker</div>
            <div className={bem.element('ikon')}>Ikon</div>
        </div>
    );
};

export default PeriodeListeHeader;
