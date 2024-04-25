import { Accordion } from '@navikt/ds-react';

import { Forelder, Periodetype, StønadskontoType, Uttaksperiode, bemUtils } from '@navikt/fp-common';

import PeriodeListeContent from '../periode-liste-content/PeriodeListeContent';
import PeriodeListeHeader from '../periode-liste-header/PeriodeListeHeader';
import './periode-liste-item.css';

const PeriodeListeItem = () => {
    const bem = bemUtils('periode-liste-item');

    const termindato = '2024-04-24';
    const perioder: Uttaksperiode[] = [
        {
            id: '1',
            forelder: Forelder.mor,
            konto: StønadskontoType.Mødrekvote,
            tidsperiode: {
                fom: new Date(),
                tom: new Date('2024-05-20'),
            },
            type: Periodetype.Uttak,
        },
    ];

    return (
        <Accordion className={bem.element('item')}>
            <Accordion.Item>
                <Accordion.Header className={bem.element('header')}>
                    <PeriodeListeHeader periode={perioder[0]} termindato={termindato} />
                </Accordion.Header>
                <Accordion.Content>
                    <PeriodeListeContent />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default PeriodeListeItem;
