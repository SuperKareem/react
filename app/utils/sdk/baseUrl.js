var base = 'http://192.165.208.149:1338/api/'
// NOTE: parents urls
var system = base + 'system/'
var mikrotik = base + 'mikrotik/'
var sysUsers = system + 'users/'
var networks = system + 'networks/'
var serials = system + 'serials/'
var logs = system + 'logs/'
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
    },
    serials: {
      base: serials,
      add: serials + 'add/',
      delete: serials,
      update: serials,
      charge: serials + 'charge/',
      create: serials + 'create/',
    },
    logs: {
      base: logs,
      system: logs + 'sys/',
      mikrotik: logs + 'mikro/'
    }
  },
  mikrotik: {
    base: mikrotik,
    users: {
      base: mikroUsers,
      get: mikroUsers + 'get/',
      update: mikroUsers,
      delete: mikroUsers,
      check: mikroUsers + 'check/',
      add: mikroUsers,
      subscribe: mikroUsers + 'subscribe/',
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
