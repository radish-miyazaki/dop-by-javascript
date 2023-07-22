class SystemState {
  systemData
  prevSystemData

  get() {
    return this.systemData
  }

  commit(prev, next) {
    const systemDataBeforeUpdate = this.systemData
    const nextSystemData = SystemConsistency.reconcile(this.systemData, prev, next)

    // if(!SystemValidity.validate(prev, nextSystemData)) {
    //   throw 'The data to be committed is not valid'
    // }

    this.systemData = nextSystemData
    this.prevSystemData = systemDataBeforeUpdate
  }

  undoLastMutation() {
    this.systemData = this.prevSystemData
  }
}