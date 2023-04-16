import { gigService } from '../services/gig.service'
import { utilService } from '../services/util.service.js'
import { storageService } from '../services/async-storage.service.js'
// import { gigService } from '../services/gig.service'

export function getActionRemoveGig(gigId) {
    return {
        type: 'removeGig',
        gigId
    }
}
export function getActionAddGig(gig) {
    return {
        type: 'addGig',
        gig
    }
}
export function getActionUpdateGig(gig) {
    return {
        type: 'updateGig',
        gig
    }
}
export function getActionAddGigMsg(gigId) {
    return {
        type: 'addGigMsg',
        gigId,
        txt: 'Stam txt'
    }
}

export const gigStore = {
    state: {
        gigs: [],
        currGig: null,

    },
    getters: {
        gigs({ gigs }) { return gigs},
        gigsByUserId({ gigs }, userId){
            let gigsByUserId = gigs.filter(gig => gig.owner._id === userId)
            if (!gigsByUserId.length) return []
            return gigsByUserId
        }
    },
    mutations: {
        setGigs(state, { gigs }) {
            state.gigs = gigs
        },
        addGig(state, { gig }) {
            state.gigs.push(gig)
        },
        updateGig(state, { gig }) {
            const idx = state.gigs.findIndex(g => g._id === gig._id)
            state.gigs.splice(idx, 1, gig)
        },
        removeGig(state, { gigId }) {
            state.gigs = state.gigs.filter(gig => gig._id !== gigId)
        },
        addGigMsg(state, { gigId, msg }) {
            const gig = state.gigs.find(gig => gig._id === gigId)
            if (!gig.msgs) gig.msgs = []
            gig.msgs.push(msg)
        },
        setCurrentGig(state, { gig }) {
            state.currGig = gig
        }
    },
    actions: {
        async addGig(context, { gig }) {
            try {
                gig = await gigService.save(gig)
                context.commit(getActionAddGig(gig))
                return gig
            } catch (err) {
                console.log('gigStore: Error in addGig', err)
                throw err
            }
        },
        async updateGig(context, { gig }) {
            try {
                gig = await gigService.save(gig)
                context.commit(getActionUpdateGig(gig))
                return gig
            } catch (err) {
                console.log('gigStore: Error in updateGig', err)
                throw err
            }
        },
        async loadGigs(context, {filterBy}) {
            try {
                console.log({...filterBy});
                const gigs = await gigService.query(filterBy)
                context.commit({ type: 'setGigs', gigs })
            } catch (err) {
                console.log('gigStore: Error in loadGigs', err)
                throw err
            }
        },
        async removeGig(context, { gigId }) {
            try {
                await gigService.remove(gigId)
                context.commit(getActionRemoveGig(gigId))
            } catch (err) {
                console.log('gigStore: Error in removeGig', err)
                throw err
            }
        },
        async addGigMsg(context, { gigId, txt }) {
            try {
                const msg = await gigService.addGigMsg(gigId, txt)
                context.commit({ type: 'addGigMsg', gigId, msg })
            } catch (err) {
                console.log('gigStore: Error in addGigMsg', err)
                throw err
            }
        },
        async setCurrentGig({ commit }, { gigId }) {
            try {
                const gig = await gigService.getById(gigId)
                commit({ type: 'setCurrentGig', gig })
                return gig
            }
            catch(err) {
                console.log('gigStore: Error in setCurrentGig', err)
                throw err
            }
        }

    }
}