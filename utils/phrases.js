module.exports = {
  device: {
    register: {
      limit: "You've reached the limit of registered devices.",
      time: 'You already registered a device within 30 last days.',
      allow: 'You can change devices.',
      nallow: 'You cannot change devices.',
      nextDate: 'But you can add another from: ',
    },
    delete: {
      nallow: 'Device cannot be removed since you would not be able to register another.',
      success: 'Device deleted successfully.',
    },
  },
};
