/* import { type ClientSchema, a, defineData } from "@aws-amplify/backend";


const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
}); */


import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Users: a
    .model({
      cognitoId: a.string().required(),
      firstName: a.string().required(),
      lastName: a.string().required(),
      biography: a.string(),
      location: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});


