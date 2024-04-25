import { BabyWrappedFillIcon, PersonPregnantFillIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';

import { Periode, bemUtils, formatDateShortMonth } from '@navikt/fp-common';

import './periode-liste-header.css';

interface Props {
    periode: Periode;
    termindato: string;
}

const PeriodeListeHeader: FunctionComponent<Props> = ({ periode, termindato }) => {
    const bem = bemUtils('periode-liste-header');
    const periodeFørTermindato = dayjs(termindato).isAfter(periode.tidsperiode.tom);

    const getIkon = () => {
        if (periodeFørTermindato) {
            return <PersonPregnantFillIcon className={bem.modifier('farge-blaa')} width={24} height={24} />;
        }

        return <BabyWrappedFillIcon className={bem.modifier('farge-gronn')} width={24} height={24} />;
    };

    return (
        <div className={bem.block}>
            <div className={bem.element('dato')}>
                {formatDateShortMonth(periode.tidsperiode.fom)} - {formatDateShortMonth(periode.tidsperiode.tom)}
            </div>
            <div className={bem.element('uker')}>3 uker</div>
            <div
                className={classNames(
                    bem.element('hendelse'),
                    true ? bem.modifier('farge-bg-lysblaa') : bem.modifier('farge-bg-gronn'),
                )}
            >
                <div>Du i permisjon</div>
                {getIkon()}
            </div>
        </div>
    );
};

export default PeriodeListeHeader;
