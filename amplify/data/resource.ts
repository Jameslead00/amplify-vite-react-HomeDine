import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Users: a
    .model({
      userId: a.id(),
      cognitoId: a.string().required(),
      firstName: a.string().required(),
      lastName: a.string().required(),
      biography: a.string(),
      location: a.string(),
      services: a.hasMany('Services', 'userId'),
    })
    .authorization((allow) => [allow.owner()]),


  Services: a
    .model({
      serviceId: a.id(),
      title: a.string().required(),
      description: a.string().required(),
      category: a.string().required(),
      price: a.float().required(),
      userId: a.string().required(),
      user: a.belongsTo('Users', 'userId'),
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


