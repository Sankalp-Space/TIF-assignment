// utils/snowflake.js
import pkg from '@theinternetfolks/snowflake';
const { generate } = pkg;

export function snowflakeId() {
    return generate();
}
