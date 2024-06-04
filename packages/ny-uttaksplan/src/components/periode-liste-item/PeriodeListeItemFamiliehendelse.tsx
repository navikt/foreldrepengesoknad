import { FunctionComponent } from 'react';

import { Accordion } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-common';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import PeriodeListeContent from '../periode-liste-content/PeriodeListeContent';
import PeriodeListeHeader from '../periode-liste-header/PeriodeListeHeader';
import './periode-liste-item.css';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    familiehendelsedato: string;
    erFamiliehendelse?: boolean;
}

const PeriodeListeItemFamiliehendelse: FunctionComponent<Props> = ({
    permisjonsperiode,
    familiehendelsedato,
    erFamiliehendelse,
}) => {
    const bem = bemUtils('periode-liste-item');

    return (
        <Accordion className={bem.element('item')}>
            <Accordion.Item>
                <Accordion.Header className={bem.element('header')}>
                    <PeriodeListeHeader
                        permisjonsperiode={permisjonsperiode}
                        familiehendelsedato={familiehendelsedato}
                        erFamiliehendelse={erFamiliehendelse}
                    />
                </Accordion.Header>
                <Accordion.Content>
                    <PeriodeListeContent
                        periode={permisjonsperiode.perioder[0]}
                        erFamiliehendelse={!!erFamiliehendelse}
                    />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default PeriodeListeItemFamiliehendelse;
