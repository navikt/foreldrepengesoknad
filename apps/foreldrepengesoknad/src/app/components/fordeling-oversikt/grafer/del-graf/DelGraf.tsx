import { bemUtils, guid } from '@navikt/fp-common';
import './../graf.css';
import classNames from 'classnames';

interface Props {
    uker: number[];
    sumUker: number;
    colorClass: string;
}

const DelGraf: React.FunctionComponent<Props> = ({ uker, sumUker, colorClass }) => {
    const rowHeightRem = 0.75;
    const bem = bemUtils('graf');

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            {uker.map((uke) => {
                const width = (uke / sumUker) * 100;
                return (
                    <div
                        key={guid()}
                        className={classNames(bem.element('del-graf-box'), bem.modifier(`${colorClass}`))}
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
