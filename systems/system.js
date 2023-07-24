import Library from "../modules/library"

export default class System {
	static addMember(systemState, member) {
		const prev = systemState.get()
		const next = Library.addMember(prev, member)

		systemState.commit(prev, next)
	}
}