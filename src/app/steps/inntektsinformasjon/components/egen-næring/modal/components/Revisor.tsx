import React, { FunctionComponent } from 'react';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import { EgenNæringModalFormComponents, EgenNæringModalFormField } from '../egenNæringModalFormConfig';
import { Block } from '@navikt/fp-common';
import Veilederpanel from 'nav-frontend-veilederpanel';
import VeilederNormal from 'app/assets/VeilederNormal';

interface Props {
    visibility: QuestionVisibility<EgenNæringModalFormField, undefined>;
}

const Revisor: FunctionComponent<Props> = ({ visibility }) => {
    return (
        <>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.harRevisor)}>
                <EgenNæringModalFormComponents.YesOrNoQuestion
                    name={EgenNæringModalFormField.harRevisor}
                    legend="Har du revisor?"
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.navnRevisor)}>
                <EgenNæringModalFormComponents.Input
                    name={EgenNæringModalFormField.navnRevisor}
                    label="Oppgi navnet til revisor"
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.telefonRevisor)}>
                <EgenNæringModalFormComponents.Input
                    name={EgenNæringModalFormField.telefonRevisor}
                    label="Oppgi telefonnummeret til revisor"
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.revisorNærVennEllerFamilie)}>
                <EgenNæringModalFormComponents.YesOrNoQuestion
                    name={EgenNæringModalFormField.revisorNærVennEllerFamilie}
                    legend="Er dere nære venner eller i familie?"
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.revisorOpplysningerFullmakt)}>
                <EgenNæringModalFormComponents.YesOrNoQuestion
                    name={EgenNæringModalFormField.revisorOpplysningerFullmakt}
                    legend="Gir du NAV fullmakt til å innhente opplysninger direkte fra revisor?"
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(EgenNæringModalFormField.revisorOpplysningerFullmakt)}>
                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                    Vi henter inn opplysninger om virksomheten og inntekten din fra offentlige registre. Vi tar kontakt
                    med deg hvis vi trenger flere opplysninger.
                </Veilederpanel>
            </Block>
        </>
    );
};

export default Revisor;
