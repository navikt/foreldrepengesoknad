import { Accordion } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-common';

import PeriodeListeContent from '../periode-liste-content/PeriodeListeContent';
import PeriodeListeHeader from '../periode-liste-header/PeriodeListeHeader';
import './periode-liste-item.css';

const PeriodeListeItem = () => {
    const bem = bemUtils('periode-liste-item');

    return (
        <Accordion className={bem.element('item')}>
            <Accordion.Item>
                <Accordion.Header className={bem.element('header')}>
                    <PeriodeListeHeader />
                </Accordion.Header>
                <Accordion.Content>
                    <PeriodeListeContent />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default PeriodeListeItem;
