import { guid } from '@navikt/fp-common';
import { KvoteFordeling } from '../FordelingOversikt';

interface Props {
    fordelingList: KvoteFordeling[];
    sumUker: number;
    farge: string;
}

const KvoteGraf: React.FunctionComponent<Props> = ({ fordelingList, sumUker, farge }) => {
    return fordelingList.map((fordeling: KvoteFordeling) => {
        const width = (fordeling.uker / sumUker) * 100 * 0.98;
        const borderColor = farge === '#ECEEF0' ? 'black' : `${farge}`;
        return (
            <div
                key={guid()}
                style={{
                    width: `${width}%`,
                    backgroundColor: `${farge}`,
                    height: '10px',
                    borderRadius: '5px',
                    borderColor: `${borderColor}`,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    padding: '0',
                    margin: '0',
                }}
            ></div>
        );
    });
};

export default KvoteGraf;
