import { guid } from '@navikt/fp-common';
import { KvoteFordeling } from '../FordelingOversikt';
interface Props {
    fordelingList: KvoteFordeling[];
    sumUker: number;
    farge: string;
}

const DelGraf: React.FunctionComponent<Props> = ({ fordelingList, sumUker, farge }) => {
    const rowHeightRem = 0.75;
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            {fordelingList.map((fordeling: KvoteFordeling) => {
                const width = (fordeling.uker / sumUker) * 100;
                const borderColor = farge === '#ECEEF0' ? 'black' : `${farge}`;
                return (
                    <div
                        key={guid()}
                        style={{
                            width: `${width}%`,
                            backgroundColor: `${farge}`,
                            height: `${rowHeightRem}rem`,
                            borderRadius: `${rowHeightRem / 2}rem`,
                            borderColor: `${borderColor}`,
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            margin: '0px 2px',
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

export default DelGraf;
