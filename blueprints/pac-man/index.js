var RSVP = require('rsvp');

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return RSVP.all([
      this.addBowerPackageToProject('mousetrap'),
      this.addPackageToProject('ember-keyboard-shortcuts')
    ]);
  }
};
