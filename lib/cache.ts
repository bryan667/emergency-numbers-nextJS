import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 120 });
export default cache;
