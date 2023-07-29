import SystemConsistency from "./systemConsistency"

export default class SystemState {
  systemData
  prevSystemData

  get() {
    return this.systemData
  }

  commit(prev, next) {
    const systemDataBeforeUpdate = this.systemData
    const nextSystemData = SystemConsistency.reconcile(this.systemData, prev, next)

    this.systemData = nextSystemData
    this.prevSystemData = systemDataBeforeUpdate
  }

  undoLastMutation() {
    this.systemData = this.prevSystemData
  }
}