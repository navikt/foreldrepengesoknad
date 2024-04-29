import { FunctionComponent } from 'react';

import { Accordion } from '@navikt/ds-react';

import { Periode, bemUtils } from '@navikt/fp-common';

import PeriodeListeContent from '../periode-liste-content/PeriodeListeContent';
import PeriodeListeHeader from '../periode-liste-header/PeriodeListeHeader';
import './periode-liste-item.css';

interface Props {
    periode: Periode;
}

const PeriodeListeItem: FunctionComponent<Props> = ({ periode }) => {
    const bem = bemUtils('periode-liste-item');

    const termindato = '2024-05-21';

    return (
        <Accordion className={bem.element('item')}>
            <Accordion.Item>
                <Accordion.Header className={bem.element('header')}>
                    <PeriodeListeHeader periode={periode} termindato={termindato} />
                </Accordion.Header>
                <Accordion.Content>
                    <PeriodeListeContent />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default PeriodeListeItem;
