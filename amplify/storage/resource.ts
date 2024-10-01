import { defineStorage } from '@aws-amplify/backend';

export const profilePicBucket = defineStorage({
  name: 'profilePicBucket',
  isDefault: true,
  access: (allow) => ({
    'profile-pictures/{entity_id}/*': [
      allow.guest.to(['read']),
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
  })
});

export const servicePicBucket = defineStorage({
  name: 'servicePicBucket',
  access: (allow) => ({
    'service-pictures/{entity_id}/*': [
      allow.guest.to(['read']),
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
  })
})