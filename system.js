class System {
	addMember(member) {
		const prev = SystemState.get()
		const next = Library.addMember(prev, member)

		SystemState.commit(prev, next)
	}
}