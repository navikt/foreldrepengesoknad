import { InntektsinformasjonFormData } from '../../inntektsinformasjonFormConfig';
import { Block, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { FunctionComponent, useState } from 'react';
import { Frilans } from 'app/types/Frilans';
import FrilansVisning from './FrilansVisning';
import FrilansSubform from './subform/FrilansSubform';
import { useIntl } from 'react-intl';
import { Heading } from '@navikt/ds-react';
interface Props {
    frilans: Frilans | undefined;
    formValues: Partial<InntektsinformasjonFormData>;
    setFrilans: React.Dispatch<React.SetStateAction<Frilans | undefined>>;
}
const FrilansDetaljer: FunctionComponent<Props> = ({ frilans, formValues, setFrilans }) => {
    const intl = useIntl();
    const [redigererFrilans, setRedigererFrilans] = useState(false);
    const visFrilansInput = (formValues.hattInntektSomFrilans === YesOrNo.YES && !frilans) || redigererFrilans;
    const visFrilansInfo = frilans && !redigererFrilans && formValues.hattInntektSomFrilans === YesOrNo.YES;
    if (formValues.hattInntektSomFrilans !== YesOrNo.YES) {
        return null;
    }
    return (
        <>
            <Block padBottom="l">
                <Heading level="3" size="small">
                    {intlUtils(intl, 'inntektsinformasjon.frilansArbeid.tittel')}
                </Heading>
            </Block>
            {visFrilansInput && (
                <Block padBottom="l">
                    <FrilansSubform
                        frilans={frilans}
                        setFrilans={setFrilans}
                        setRedigererFrilans={setRedigererFrilans}
                    />
                </Block>
            )}
            {visFrilansInfo && (
                <Block padBottom="l">
                    <FrilansVisning frilans={frilans!} setRedigererFrilans={setRedigererFrilans} />
                </Block>
            )}
        </>
    );
};

export default FrilansDetaljer;
