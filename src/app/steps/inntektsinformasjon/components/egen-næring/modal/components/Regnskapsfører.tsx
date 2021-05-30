import React, { FunctionComponent } from 'react';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { EgenNæringModalFormComponents, EgenNæringModalFormField } from '../egenNæringModalFormConfig';
import { Block } from '@navikt/fp-common';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'app/assets/VeilederNormal';

interface Props {
    visibility: QuestionVisibility<EgenNæringModalFormField, undefined>;
}

const Regnskapsfører: FunctionComponent<Props> = ({ visibility }) => {
    return (
        <>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.harRegnskapsfører)}>
                <EgenNæringModalFormComponents.YesOrNoQuestion
                    name={EgenNæringModalFormField.harRegnskapsfører}
                    legend="Har du regnskapsfører?"
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.navnRegnskapsfører)}>
                <EgenNæringModalFormComponents.Input
                    name={EgenNæringModalFormField.navnRegnskapsfører}
                    label="Oppgi navnet til regnskapsfører"
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.telefonRegnskapsfører)}>
                <EgenNæringModalFormComponents.Input
                    name={EgenNæringModalFormField.telefonRegnskapsfører}
                    label="Oppgi telefonnummeret til regnskapsfører"
                />
            </Block>
            <Block
                padBottom="l"
                visible={visibility.isVisible(EgenNæringModalFormField.regnskapsførerNærVennEllerFamilie)}
            >
                <EgenNæringModalFormComponents.YesOrNoQuestion
                    name={EgenNæringModalFormField.regnskapsførerNærVennEllerFamilie}
                    legend="Er dere nære venner eller i familie?"
                />
            </Block>
            <Block
                padBottom="l"
                visible={visibility.isVisible(EgenNæringModalFormField.regnskapsførerNærVennEllerFamilie)}
            >
                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                    Vi henter inn opplysninger om virksomheten og inntekten din fra offentlige registre. Vi tar kontakt
                    med deg hvis vi trenger flere opplysninger.
                </Veilederpanel>
            </Block>
        </>
    );
};

export default Regnskapsfører;
