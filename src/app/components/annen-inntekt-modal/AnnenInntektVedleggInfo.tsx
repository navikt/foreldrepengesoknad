import * as React from 'react';
import { AnnenInntektType } from '../../types/søknad/AnnenInntekt';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederpanelInnhold from '../veilederpanel-innhold/VeilederpanelInnhold';
import Veileder from 'common/components/veileder/Veileder';

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
        <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
            <VeilederpanelInnhold
                messages={[
                    {
                        type: 'normal',
                        contentIntlKey: textKey
                    }
                ]}
            />
        </Veilederpanel>
    );
};

export default AnnenInntektVedleggInfo;
