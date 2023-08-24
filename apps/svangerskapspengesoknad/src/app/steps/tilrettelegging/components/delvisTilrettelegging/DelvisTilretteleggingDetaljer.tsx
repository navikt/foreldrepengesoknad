import { Button, Heading } from '@navikt/ds-react';
import DelvisTilretteleggingSubform from './subform/DelvisTilretteleggingSubform';
import { Block, intlUtils } from '@navikt/fp-common';
import { FormattedMessage, useIntl } from 'react-intl';
import { FunctionComponent, useState } from 'react';
import DelvisTilretteleggingList from './DelvisTilretteleggingList';
import { TilretteleggingInput } from 'app/types/Tilrettelegging';

interface Props {
    tilretteleggingInput: TilretteleggingInput[];
    setTilretteleggingInput: React.Dispatch<React.SetStateAction<TilretteleggingInput[]>>;
}
const DelvisTilretteleggingDetaljer: FunctionComponent<Props> = ({ tilretteleggingInput, setTilretteleggingInput }) => {
    const intl = useIntl();
    const [selectedTilrettelegging, setSelectedTilrettelegging] = useState<TilretteleggingInput | undefined>(undefined);
    const [leggerTilNyttTilrettelegging, setLeggerTilNyttTilrettelegging] = useState(false);

    const addTilrettelegging = (tilrettelegging: TilretteleggingInput) => {
        const updatedandreInntekterInformasjon = tilretteleggingInput.concat(tilrettelegging);
        setTilretteleggingInput(updatedandreInntekterInformasjon);
        setSelectedTilrettelegging(undefined);
        setLeggerTilNyttTilrettelegging(false);
    };

    const deleteTilrettelegging = (tilretteleggingSomSlettes: TilretteleggingInput) => {
        const updatedTilrettelegginger = tilretteleggingInput.filter(
            (inntekt) => inntekt !== tilretteleggingSomSlettes
        );
        setTilretteleggingInput(updatedTilrettelegginger);
        setSelectedTilrettelegging(undefined);
    };

    const editTilrettelegging = (
        tilretteleggingSomEditeres: TilretteleggingInput,
        oppdatertTilrettelegging: TilretteleggingInput
    ) => {
        const updatedTilrettelegginger = tilretteleggingInput
            .filter((t) => t !== tilretteleggingSomEditeres)
            .concat(oppdatertTilrettelegging);
        setSelectedTilrettelegging(undefined);
        setTilretteleggingInput(updatedTilrettelegginger);
    };

    const handleOnLeggTilDelvisTilrettelegging = () => {
        setLeggerTilNyttTilrettelegging(true);
        setSelectedTilrettelegging(undefined);
    };

    return (
        <>
            <Block padBottom="l">
                <Heading level="3" size="small">
                    {intlUtils(intl, 'tilrettelegging.tilretteleggingsInput.tittel')}
                </Heading>
            </Block>
            {tilretteleggingInput.length > 0 && (
                <DelvisTilretteleggingList
                    selectedTilrettelegging={selectedTilrettelegging}
                    allTilrettelegging={tilretteleggingInput}
                    addTilrettelegging={addTilrettelegging}
                    editTilrettelegging={editTilrettelegging}
                    deleteTilrettelegging={deleteTilrettelegging}
                    setSelectedTilrettelegging={setSelectedTilrettelegging}
                    setLeggTilNyttTilrettelegging={setLeggerTilNyttTilrettelegging}
                />
            )}
            {(leggerTilNyttTilrettelegging || tilretteleggingInput.length === 0) && (
                <DelvisTilretteleggingSubform
                    selectedTilrettelegging={selectedTilrettelegging}
                    addTilrettelegging={addTilrettelegging}
                    editTilrettelegging={editTilrettelegging}
                    setSelectedTilrettelegging={setSelectedTilrettelegging}
                    erFørsteInput={tilretteleggingInput.length === 0}
                    setLeggTilNyttTilrettelegging={setLeggerTilNyttTilrettelegging}
                />
            )}
            {tilretteleggingInput.length > 0 && (
                <Block padBottom="xl">
                    <Button
                        aria-label="legg til ny periode med delvis tilrettelegging"
                        variant="secondary"
                        type="button"
                        onClick={handleOnLeggTilDelvisTilrettelegging}
                    >
                        <FormattedMessage id="leggTilNyPeriode" />
                    </Button>
                </Block>
            )}
        </>
    );
};

export default DelvisTilretteleggingDetaljer;
