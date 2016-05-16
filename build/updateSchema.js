
import fs from 'fs';
import path from 'path';
import { graphql }  from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

export default function() {
  delete require.cache[require.resolve('../src/data/schema.js')];
  var Schema = require('../src/data/schema.js').default;
  // Save JSON of full schema introspection for Babel Relay Plugin to use
  return graphql(Schema, introspectionQuery).then(result => {
    if (result.errors) {
      console.error(
        'ERROR introspecting schema: ',
        JSON.stringify(result.errors, null, 2)
      );
    } else {
      fs.writeFileSync(
        path.join(__dirname, '../src/data/schema.json'),
        JSON.stringify(result, null, 2)
      );
    }
    // Save user readable type system shorthand of schema
    fs.writeFileSync(
      path.join(__dirname, '../src/data/schema.graphql'),
      printSchema(Schema)
    );

    return result;
  });


}
