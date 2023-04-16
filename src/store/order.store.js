// import { orderService } from '../services/order.service.local'
import { orderService } from '../services/order.service'

export const orderStore = {
    state: {
        orders: []
    },
    getters: {
        orders({ orders }) { return orders },
    },
    mutations: {
        addOrder(state, { order }) {
            console.log(order)
            orders=orders.sort((a, b) => a.date.localeCompare(b.date)) 
            state.orders= orders
        },
        addOrder(state, { order }) {
            state.orders.push(order)
        },
        updateOrder(state, { order }) {
            const idx = state.orders.findIndex(g => g._id === order._id)
            state.orders.splice(idx, 1, order)
        },
        removeOrder(state, { orderId }) {
            state.orders = state.orders.filter(order => order._id !== orderId)
        },
        addOrderMsg(state, { orderId, msg }) {
            const order = state.orders.find(order => order._id === orderId)
            if (!order.msgs) order.msgs = []
            order.msgs.push(msg)
        },
        setCurrentOrder(state, { order }) {
            state.currOrder = order
        },
        setOrders(state, { orders }) {
            orders=orders.sort((a, b) => a.date.localeCompare(b.date)) 
            state.orders= orders
        },
    },
    actions: {
        async saveOrder(context, { order }) {
            try {
              order = await orderService.save(order)
              context.commit({ type: 'addOrder', order })
              return order
            } catch (err) {
              console.log('orderStore: Error in addOrder', err)
              throw err
            }
        },
        async addOrder(context, { order }) {
            try {
                order = await orderService.save(order)
                context.commit(getActionAddOrder(order))
                return order
            } catch (err) {
                console.log('orderStore: Error in addOrder', err)
                throw err
            }
        },
        async updateOrder(context, { order }) {
            try {
                order = await orderService.save(order)
                context.commit({ type: 'updateOrder', order })
                return order
            } catch (err) {
                console.log('orderStore: Error in updateOrder', err)
                throw err
            }
        },
        async loadOrders(context, {filterBy}) {
            try {
                // console.log('filterBy');
                const orders = await orderService.query(filterBy)
                console.log('orders',orders)
                context.commit({ type: 'setOrders', orders })
            } catch (err) {
                console.log('orderStore: Error in loadOrders', err)
                throw err
            }
        },
        async removeOrder(context, { orderId }) {
            try {
                await orderService.remove(orderId)
                context.commit(getActionRemoveOrder(orderId))
            } catch (err) {
                console.log('orderStore: Error in removeOrder', err)
                throw err
            }
        },
        async addOrderMsg(context, { orderId, txt }) {
            try {
                const msg = await orderService.addOrderMsg(orderId, txt)
                context.commit({ type: 'addOrderMsg', orderId, msg })
            } catch (err) {
                console.log('orderStore: Error in addOrderMsg', err)
                throw err
            }
        },
        async setCurrentOrder({ commit }, { orderId }) {
            try {
                const order = await orderService.getById(orderId)
                commit({ type: 'setCurrentOrder', order })
                return order
            }
            catch {
                console.log('orderStore: Error in setCurrentOrder', err)
                throw err
            }
        }

    }
}