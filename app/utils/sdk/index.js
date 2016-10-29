import {
  signin,
  getAllUserNetworks,
  addNewNetwork,
  getAllSerials,
  createNewSerials,
  updateSerial,
  deleteSerial,
  addNewSerials,
 } from './system'
import {
  fetchMikrotikUsers,
  addNewMikrotikUser,
  fetchAllMikrotikProfiles,
  addNewMikrottikProfile,
  deleteMikrotikUsers,
  editMikrotikUser,
  deleteProfile
} from './mikrotik'
import users from './users'
import logs from './logs'
export default {
  signin,
  getAllUserNetworks,
  addNewNetwork,
  fetchMikrotikUsers,
  addNewMikrotikUser,
  fetchAllMikrotikProfiles,
  addNewMikrottikProfile,
  deleteMikrotikUsers,
  editMikrotikUser,
  getAllSerials,
  createNewSerials,
  deleteSerial,
  updateSerial,
  addNewSerials,
  users,
  logs,
  deleteProfile
}
