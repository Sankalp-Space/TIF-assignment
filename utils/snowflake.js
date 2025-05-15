
import { Snowflake } from '@theinternetfolks/snowflake';

export function snowflakeId() {
    return Snowflake.generate();
}
