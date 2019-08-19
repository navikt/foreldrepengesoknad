import { Selector } from 'testcafe';

const fortsettKnapp = Selector('.steg .fortsettKnapp');
const avbrytSøknadLenke = Selector('#avbrytSøknadLenke');
const radioPanelGruppe = (name: string) => Selector(`input[name="${name}"]`).parent('.radioPanelGruppe');
const radioPanelElement = (name: string, value: string | number) => Selector(`input[name="${name}"][value="${value}"]`);
const checkboxPanelElement = (value: string | number, name?: string) => {
    return name
        ? Selector(`input[type="checkbox"][name="${name}"][value="${value}"]`)
        : Selector(`input[type="checkbox"][value="${value}"]`);
};

const StegSelectors = {
    fortsettKnapp,
    avbrytSøknadLenke,
    radioPanelGruppe,
    radioPanelElement,
    checkboxPanelElement
};

export default StegSelectors;
