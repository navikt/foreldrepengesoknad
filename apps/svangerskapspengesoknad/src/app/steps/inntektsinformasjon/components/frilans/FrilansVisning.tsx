import { BodyShort, Button, Label } from '@navikt/ds-react';
import { bemUtils, formatDate } from '@navikt/fp-common';
import { Frilans } from 'app/types/Frilans';
import { FunctionComponent } from 'react';
import './frilans-visning.css';
import { PencilWritingIcon } from '@navikt/aksel-icons';
interface Props {
    frilans: Frilans;
    frilansTittel?: string;
    setRedigererFrilans?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FrilansVisning: FunctionComponent<Props> = ({ frilans, frilansTittel, setRedigererFrilans }) => {
    const bem = bemUtils('frilans-visning');
    const frilansTekst =
        !frilans.jobberFremdelesSomFrilans && frilans.sluttDato ? 'Du jobbet frilans' : 'Du jobber frilans';
    const tilTekst =
        !frilans.jobberFremdelesSomFrilans && frilans.sluttDato ? formatDate(frilans.sluttDato) : 'Pågående';
    const tekstForVisning = frilansTittel ? frilansTittel : frilansTekst;
    return (
        <div className={bem.block}>
            <Label className={bem.element('tittel')}>{tekstForVisning}</Label>

            <BodyShort className={bem.element('dato')}>
                {formatDate(frilans.oppstart)} - {tilTekst}
            </BodyShort>

            {setRedigererFrilans && (
                <Button
                    aria-label="rediger frilansinformasjon"
                    variant="secondary"
                    className={bem.element('rediger')}
                    icon={<PencilWritingIcon aria-hidden />}
                    onClick={() => setRedigererFrilans(true)}
                />
            )}
        </div>
    );
};

export default FrilansVisning;
