import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Users: a
    .model({
      cognitoId: a.string().required(),
      firstName: a.string().required(),
      lastName: a.string().required(),
      biography: a.string(),
      location: a.string(),
      services: a.hasMany('Services', 'user'),
    })
    .authorization((allow) => [allow.owner()]),


  Services: a
    .model({
      title: a.string().required(),
      description: a.string().required(),
      category: a.string().required(),
      price: a.float().required(),
      user: a.belongsTo('Users', 'services'),
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


