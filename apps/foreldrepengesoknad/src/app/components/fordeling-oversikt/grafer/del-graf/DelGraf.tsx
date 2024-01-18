import { bemUtils, guid } from '@navikt/fp-common';
import './../graf.css';
import classNames from 'classnames';
import { FordelingsUke } from '../../FordelingOversikt';

interface Props {
    fordelingsuker: FordelingsUke[];
    sumUker: number;
}

const DelGraf: React.FunctionComponent<Props> = ({ fordelingsuker, sumUker }) => {
    const rowHeightRem = 0.75;
    const bem = bemUtils('graf');

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            {fordelingsuker.map((uke) => {
                const width = (uke.antallUker / sumUker) * 100;
                return (
                    <div
                        key={guid()}
                        className={classNames(bem.element('del-graf-box'), bem.modifier(`${uke.fargekode}`))}
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
