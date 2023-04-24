import { Block, DisplayTextWithLabel } from '@navikt/fp-common';

interface Props {
    søkerNavn: string;
    søkerFnr: string;
}

const OmDegOppsummering: React.FunctionComponent<Props> = ({ søkerNavn, søkerFnr }) => {
    return (
        <div>
            <Block padBottom="l">
                <DisplayTextWithLabel label={søkerNavn} text={søkerFnr} />
            </Block>
        </div>
    );
};
export default OmDegOppsummering;
