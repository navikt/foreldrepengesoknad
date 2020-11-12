import * as React from 'react';
import { AnnenInntektType } from '../../../types/søknad/AnnenInntekt';
import VeilederInfo from '../../../components/veilederInfo/VeilederInfo';

interface OwnProps {
    type?: AnnenInntektType;
}

export type Props = OwnProps;

const AnnenInntektVedleggInfo: React.FunctionComponent<Props> = ({ type }) => {
    if (type === undefined) {
        return null;
    }
    const textKey = `inntektstype.${type.toLowerCase()}_info`;

    return (
        <VeilederInfo
            messages={[
                {
                    type: 'normal',
                    contentIntlKey: textKey,
                },
            ]}
        />
    );
};

export default AnnenInntektVedleggInfo;
