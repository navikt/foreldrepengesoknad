import { BodyShort, Button, Heading, Label } from '@navikt/ds-react';
import { bemUtils, formatDate } from '@navikt/fp-common';
import { Frilans } from 'app/types/Frilans';
import { FunctionComponent } from 'react';
import './frilansvisning.css';
import { PencilWritingIcon } from '@navikt/aksel-icons';
interface Props {
    frilans: Frilans;
    setRedigererFrilans: React.Dispatch<React.SetStateAction<boolean>>;
}

const FrilansVisning: FunctionComponent<Props> = ({ frilans, setRedigererFrilans }) => {
    const bem = bemUtils('frilansvisning');
    const frilansTekst =
        !frilans.jobberFremdelesSomFrilans && frilans.sluttDato ? 'Du jobbet frilans' : 'Du jobber frilans';
    const tilTekst =
        !frilans.jobberFremdelesSomFrilans && frilans.sluttDato ? formatDate(frilans.sluttDato) : 'Pågående';
    const handleOnClickRediger = () => {
        setRedigererFrilans(true);
    };

    return (
        <>
            <Heading level="3" size="small">
                Frilansarbeid
            </Heading>
            <div className={bem.block}>
                <Label className={bem.element('tittel')}>{frilansTekst}</Label>

                <BodyShort className={bem.element('dato')}>
                    {formatDate(frilans.oppstart)} - {tilTekst}
                </BodyShort>

                <Button
                    aria-label="rediger frilansinformasjon"
                    variant="secondary"
                    className={bem.element('rediger')}
                    icon={<PencilWritingIcon aria-hidden />}
                    onClick={handleOnClickRediger}
                />
            </div>
        </>
    );
};

export default FrilansVisning;
