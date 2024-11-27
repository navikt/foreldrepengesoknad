import classNames from 'classnames';
import { FordelingDager } from 'types/FordelingOversikt';
import { guid } from 'utils/guid';

import { getFargeClass } from '../begge-har-rett-graf/BeggeHarRettGraf';
import styles from './../graf.module.css';

interface Props {
    fordelingsdager: FordelingDager[];
    sumDager: number;
}

export const DelGraf = ({ fordelingsdager, sumDager }: Props) => {
    const rowHeightRem = 0.75;

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
                        className={classNames(styles.delGrafBox, getFargeClass(fordeling.fargekode))}
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
