import { Block, bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import './delvis-tilrettelegging-visning.css';
import { Button, Label } from '@navikt/ds-react';
import { PencilWritingIcon, TrashIcon } from '@navikt/aksel-icons';
import { TilretteleggingInput } from 'app/types/Tilrettelegging';

interface Props {
    tilrettelegging: TilretteleggingInput;
    setSelectedTilrettelegging: React.Dispatch<React.SetStateAction<TilretteleggingInput | undefined>>;
    deleteTilrettelegging: (tilrettelegging: TilretteleggingInput) => void;
}

const DelvisTilretteleggingVisning: FunctionComponent<Props> = ({
    tilrettelegging,
    setSelectedTilrettelegging,
    deleteTilrettelegging,
}) => {
    const intl = useIntl();
    const bem = bemUtils('delvisTilretteleggingVisning');

    const handleOnClickRediger = (tilrettelegging: TilretteleggingInput) => {
        setSelectedTilrettelegging(tilrettelegging);
    };

    const handleOnClickSlett = (tilrettelegging: TilretteleggingInput) => {
        deleteTilrettelegging(tilrettelegging);
    };

    return (
        <div>
            <Block padBottom="l">
                <div className={bem.block}>
                    <div>
                        <Label className={bem.element('tittel')}>
                            {intlUtils(intl, 'tilrettelegging.delvisTilretteleggingVisning', {
                                stillingsprosent: tilrettelegging.stillingsprosent,
                                fom: formatDate(tilrettelegging.fom),
                            })}
                        </Label>
                    </div>
                    <Button
                        aria-label="rediger informasjon delvis tilrettelegging"
                        variant="secondary"
                        className={bem.element('rediger')}
                        icon={<PencilWritingIcon aria-hidden />}
                        onClick={() => handleOnClickRediger(tilrettelegging)}
                    />
                    <Button
                        aria-label="slett informasjon delvis tilrettelegging"
                        variant="secondary"
                        className={bem.element('slett')}
                        icon={<TrashIcon aria-hidden />}
                        onClick={() => handleOnClickSlett(tilrettelegging)}
                    />
                </div>
            </Block>
        </div>
    );
};

export default DelvisTilretteleggingVisning;
