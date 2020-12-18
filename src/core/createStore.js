export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let subscribers = []


  return {
    subscribe(fn) {
      subscribers.push(fn)
      return {
        unsubscribe() {
          subscribers = subscribers.filter(l => l !== fn)
        }
      }
      // return () => subscribers = subscribers.filter(l => l !== fn)
    },

    dispatch(action) {
      state = rootReducer(state, action)
      subscribers.forEach(sub => sub(state))
    },

    getState() {
      return state
    }

  }
}
