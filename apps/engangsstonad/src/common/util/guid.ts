const s4 = (): string =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString()
    .substring(1);

const guid = (): string => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

export default guid;
