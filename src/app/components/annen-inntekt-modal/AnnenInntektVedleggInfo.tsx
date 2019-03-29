import * as React from 'react';
import { AnnenInntektType } from '../../types/søknad/AnnenInntekt';
import VeilederMeldinger from '../veilederpanel-innhold/VeilederpanelInnhold';

interface OwnProps {
    type?: AnnenInntektType;
}

export type Props = OwnProps;

const AnnenInntektVedleggInfo: React.StatelessComponent<Props> = ({ type }) => {
    if (type === undefined) {
        return null;
    }
    const textKey = `inntektstype.${type.toLowerCase()}_info`;

    return (
        <VeilederMeldinger
            messages={[
                {
                    type: 'normal',
                    contentIntlKey: textKey
                }
            ]}
        />
    );
};

export default AnnenInntektVedleggInfo;
