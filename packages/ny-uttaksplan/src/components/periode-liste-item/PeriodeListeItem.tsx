import { FunctionComponent } from 'react';

import { Accordion, Hide, Show } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-common';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import PeriodeListeContent from '../periode-liste-content/PeriodeListeContent';
import PeriodeListeHeader from '../periode-liste-header/PeriodeListeHeader';
import PeriodeListeHeaderMobil from '../periode-liste-header/PeriodeListeHeaderMobil';
import './periode-liste-item.css';

interface Props {
    permisjonsperiode: Permisjonsperiode;
}

const PeriodeListeItem: FunctionComponent<Props> = ({ permisjonsperiode }) => {
    const bem = bemUtils('periode-liste-item');

    const termindato = '2024-01-22';

    return (
        <Accordion className={bem.element('item')}>
            <Accordion.Item>
                <Show asChild above="md">
                    <Accordion.Header className={bem.element('header')}>
                        <PeriodeListeHeader permisjonsperiode={permisjonsperiode} termindato={termindato} />
                    </Accordion.Header>
                </Show>
                <Hide asChild above="md">
                    <Accordion.Header className={bem.element('header')}>
                        <PeriodeListeHeaderMobil permisjonsperiode={permisjonsperiode} termindato={termindato} />
                    </Accordion.Header>
                </Hide>
                <Accordion.Content>
                    <PeriodeListeContent />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default PeriodeListeItem;
