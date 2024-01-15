import { bemUtils, guid } from '@navikt/fp-common';
import { KvoteFordeling } from '../FordelingOversikt';
import './../begge-har-rett-graf/begge-har-rett-graf.css';
import classNames from 'classnames';

interface Props {
    fordelingList: KvoteFordeling[];
    sumUker: number;
    colorClass: string;
}

const DelGraf: React.FunctionComponent<Props> = ({ fordelingList, sumUker, colorClass }) => {
    const rowHeightRem = 0.75;

    //TODO: flytt alt fra begge-har-rett-graf.css til fordeling-oversikt.css?
    const bem = bemUtils('begge-har-rett-graf');

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            {fordelingList.map((fordeling: KvoteFordeling) => {
                const width = (fordeling.uker / sumUker) * 100;
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
