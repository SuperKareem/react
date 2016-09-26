var base = 'http://one:1338/api/'
// NOTE: parents urls
var system = base + 'system/'
var mikrotik = base + 'mikrotik/'
var sysUsers = system + 'users/'
var networks = system + 'networks/'
var mikroUsers = mikrotik + 'users/'
var mikroProfiles = mikrotik + 'users-profiles/'
// NOTE: full url object
var baseUrl = {
  base: base,
  system: {
    base: system,
    users: {
      base: sysUsers,
      add: sysUsers+'add/',
      check: sysUsers+'check/'
    },
    networks: {
      base: networks,
      add: networks+'add/',
      delete: networks+ 'delete/'
    }
  },
  mikrotik: {
    base: mikrotik,
    users: {
      base: mikroUsers,
      get: mikroUsers + 'get/',
      update: mikroUsers,
      delete: mikroUsers,
      add: mikroUsers
    },
    profiles: {
      base: mikroProfiles,
      get: mikroProfiles + 'get/',
      add: mikroProfiles,
      update: mikroProfiles,
      delete: mikroProfiles,
    }
  }
}

export default baseUrl
