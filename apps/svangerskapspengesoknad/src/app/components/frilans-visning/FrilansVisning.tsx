import { BodyShort, Label } from '@navikt/ds-react';
import { Block, bemUtils, formatDate } from '@navikt/fp-common';
import { Frilans } from 'app/types/Frilans';
import { FunctionComponent } from 'react';
import './frilans-visning.css';
interface Props {
    frilans: Frilans;
}

const FrilansVisning: FunctionComponent<Props> = ({ frilans }) => {
    const bem = bemUtils('frilans-visning');
    const frilansTekst = 'Arbeid som frilanser';
    const tilTekst =
        !frilans.jobberFremdelesSomFrilans && frilans.sluttDato ? formatDate(frilans.sluttDato) : 'Pågående';
    return (
        <Block padBottom="l">
            <div className={bem.block}>
                <Label className={bem.element('tittel')}>{frilansTekst}</Label>

                <BodyShort className={bem.element('dato')}>
                    {formatDate(frilans.oppstart)} - {tilTekst}
                </BodyShort>
            </div>
        </Block>
    );
};

export default FrilansVisning;
