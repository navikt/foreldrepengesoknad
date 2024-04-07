import classNames from 'classnames';

import { guid } from '@navikt/fp-common';
import { bemUtils } from '@navikt/fp-utils';

import { FordelingDager } from 'app/types/FordelingOversikt';

import './../graf.css';

interface Props {
    fordelingsdager: FordelingDager[];
    sumDager: number;
}

const DelGraf: React.FunctionComponent<Props> = ({ fordelingsdager, sumDager }) => {
    const rowHeightRem = 0.75;
    const bem = bemUtils('graf');

    return (
        <div
            aria-hidden={true}
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            {fordelingsdager.map((fordeling) => {
                const width = (fordeling.antallDager / sumDager) * 100;
                return (
                    <div
                        key={guid()}
                        className={classNames(bem.element('del-graf-box'), bem.modifier(`${fordeling.fargekode}`))}
                        style={{
                            width: `${width}%`,
                            height: `${rowHeightRem}rem`,
                            borderRadius: `${rowHeightRem / 2}rem`,
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

export default DelGraf;
