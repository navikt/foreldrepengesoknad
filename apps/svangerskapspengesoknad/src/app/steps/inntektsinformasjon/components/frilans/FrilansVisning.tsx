import { BodyShort, Button, Heading, Label } from '@navikt/ds-react';
import { Block, bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import { Frilans } from 'app/types/Frilans';
import { FunctionComponent } from 'react';
import './frilansvisning.css';
import { PencilWritingIcon } from '@navikt/aksel-icons';
import { useIntl } from 'react-intl';
interface Props {
    frilans: Frilans;
    setRedigererFrilans: React.Dispatch<React.SetStateAction<boolean>>;
}

const FrilansVisning: FunctionComponent<Props> = ({ frilans, setRedigererFrilans }) => {
    const intl = useIntl();
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
            <Block padBottom="l">
                <Heading level="3" size="small">
                    {intlUtils(intl, 'inntektsinformasjon.frilansArbeid.tittel')}
                </Heading>
            </Block>
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
