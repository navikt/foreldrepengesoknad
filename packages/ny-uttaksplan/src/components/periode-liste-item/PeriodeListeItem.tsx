import { FunctionComponent } from 'react';

import { Accordion } from '@navikt/ds-react';

import { bemUtils } from '@navikt/fp-utils';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import PeriodeListeContent from '../periode-liste-content/PeriodeListeContent';
import PeriodeListeHeader from '../periode-liste-header/PeriodeListeHeader';
import './periode-liste-item.css';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    erFamiliehendelse?: boolean;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
}

const PeriodeListeItem: FunctionComponent<Props> = ({ permisjonsperiode, erFamiliehendelse, handleUpdatePeriode }) => {
    const bem = bemUtils('periode-liste-item');

    return (
        <Accordion.Item>
            <Accordion.Header style={{ flexDirection: 'row-reverse' }} className={bem.element('header')}>
                <PeriodeListeHeader permisjonsperiode={permisjonsperiode} erFamiliehendelse={erFamiliehendelse} />
            </Accordion.Header>
            <Accordion.Content>
                <PeriodeListeContent
                    handleUpdatePeriode={handleUpdatePeriode}
                    erFamiliehendelse={!!erFamiliehendelse}
                    permisjonsperiode={permisjonsperiode}
                />
            </Accordion.Content>
        </Accordion.Item>
    );
};

export default PeriodeListeItem;
