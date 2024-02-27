import { bemUtils, guid } from '@navikt/fp-common';
import './../graf.css';
import classNames from 'classnames';
import { FordelingDager } from 'app/types/FordelingOversikt';

interface Props {
    fordelingsdager: FordelingDager[];
    sumDager: number;
}

const DelGraf: React.FunctionComponent<Props> = ({ fordelingsdager, sumDager }) => {
    const rowHeightRem = 0.75;
    const bem = bemUtils('graf');

    return (
        <div
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
