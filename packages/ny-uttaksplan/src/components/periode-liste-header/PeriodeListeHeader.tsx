import { BabyWrappedFillIcon, PersonPregnantFillIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';

import { bemUtils, formatDateShortMonth } from '@navikt/fp-common';

import './periode-liste-header.css';

const PeriodeListeHeader = () => {
    const bem = bemUtils('periode-liste-header');

    const getIkon = (førTermindato: boolean) => {
        if (førTermindato) {
            return <PersonPregnantFillIcon className={bem.modifier('farge-blaa')} width={24} height={24} />;
        }

        return <BabyWrappedFillIcon className={bem.modifier('farge-gronn')} width={24} height={24} />;
    };

    return (
        <div className={bem.block}>
            <div className={bem.element('dato')}>
                {formatDateShortMonth(new Date('2024-11-01'))} - {formatDateShortMonth(new Date('2024-12-05'))}
            </div>
            <div className={bem.element('uker')}>3 uker</div>
            <div
                className={classNames(
                    bem.element('hendelse'),
                    true ? bem.modifier('farge-bg-lysblaa') : bem.modifier('farge-bg-gronn'),
                )}
            >
                <div>Du i permisjon</div>
                {getIkon(true)}
            </div>
        </div>
    );
};

export default PeriodeListeHeader;
