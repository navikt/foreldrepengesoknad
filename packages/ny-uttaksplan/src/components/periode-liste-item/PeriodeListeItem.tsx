import { FunctionComponent } from 'react';

import { Accordion } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-common';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import PeriodeListeContent from '../periode-liste-content/PeriodeListeContent';
import PeriodeListeHeader from '../periode-liste-header/PeriodeListeHeader';
import './periode-liste-item.css';

interface Props {
    permisjonsperiode: Permisjonsperiode;
}

const PeriodeListeItem: FunctionComponent<Props> = ({ permisjonsperiode }) => {
    const bem = bemUtils('periode-liste-item');

    const termindato = '2024-05-21';

    return (
        <Accordion className={bem.element('item')}>
            <Accordion.Item>
                <Accordion.Header className={bem.element('header')}>
                    <PeriodeListeHeader permisjonsperiode={permisjonsperiode} termindato={termindato} />
                </Accordion.Header>
                <Accordion.Content>
                    <PeriodeListeContent />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default PeriodeListeItem;
