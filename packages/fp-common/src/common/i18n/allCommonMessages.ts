import commonMessagesNb from './common.nb.json';
import commonMessagesNn from './common.nn.json';
import commonMessagesEn from './common.en.json';

const bokmålstekster = {
    ...commonMessagesNb,
};
const nynorsktekster = {
    ...commonMessagesNn,
};

const engelsktekster = {
    ...commonMessagesEn,
};

const allCommonMessages = {
    nb: bokmålstekster,
    nn: nynorsktekster,
    en: engelsktekster,
};

export default allCommonMessages;
