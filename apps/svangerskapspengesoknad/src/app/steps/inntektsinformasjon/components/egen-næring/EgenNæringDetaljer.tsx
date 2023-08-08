import { InntektsinformasjonFormData } from '../../inntektsinformasjonFormConfig';
import { Block } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { FunctionComponent, useState } from 'react';
import { Næring } from 'app/types/Næring';
import EgenNæringVisning from './EgenNæringVisning';
import EgenNæringSubform from './subform/EgenNæringSubform';
interface Props {
    næring: Næring | undefined;
    formValues: InntektsinformasjonFormData;
    setNæring: React.Dispatch<React.SetStateAction<Næring | undefined>>;
}
const EgenNæringDetaljer: FunctionComponent<Props> = ({ næring, formValues, setNæring }) => {
    const [redigererNæring, setRedigererNæring] = useState(false);
    const visNæringInput = (formValues.hattInntektSomNæringsdrivende === YesOrNo.YES && !næring) || redigererNæring;
    const visNæringInfo = næring && !redigererNæring && formValues.hattInntektSomNæringsdrivende === YesOrNo.YES;

    return (
        <div>
            {visNæringInput && (
                <Block padBottom="xl">
                    <EgenNæringSubform setNæring={setNæring} setRedigererNæring={setRedigererNæring} næring={næring} />
                </Block>
            )}
            {visNæringInfo && (
                <Block padBottom="xl">
                    <EgenNæringVisning næring={næring!} setRedigererNæring={setRedigererNæring} />
                </Block>
            )}
        </div>
    );
};

export default EgenNæringDetaljer;
