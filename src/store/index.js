import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters: {
    authUser(state) {
      return state.users[state.authId]
    }
  },

  actions: {
    createPost({ commit, state }, post) {
      const postId = 'greatPost' + Math.random()
      // Date.now() traz a data em milisegundos, precisamos em segundos
      // por isso dividimos por 1000 e o Math.floor usamos para arredondar
      // o valor

      post['.key'] = postId
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('setPost', { post, postId })
      commit('appendPostToThread', { threadId: post.threadId, postId })
      commit('appendPostToUser', { userId: post.userId, postId })
    },

    createThread({ state, commit, dispatch }, { text, title, forumId }) {
      const threadId = 'greatThread' + Math.random()
      const userId = state.authId
      const publishedAt = Math.floor(Date.now() / 1000)

      const thread = {
        '.key': threadId,
        title,
        forumId,
        publishedAt,
        userId
      }

      commit('setThread', { threadId, thread })
      commit('appendThreadToForum', { forumId, threadId })
      commit('appendThreadToUser', { userId, threadId })

      dispatch('createPost', { text, threadId })
    },

    updateUser({ commit }, user) {
      commit('setUser', { userId: user['.key'], user })
    }
  },

  mutations: {
    // Vue.set(obj, propertyName, value)
    setPost(state, { postId, post }) {
      Vue.set(state.posts, postId, post)
    },

    setThread(state, { thread, threadId }) {
      Vue.set(state.threads, threadId, thread)
    },

    setUser(state, { userId, user }) {
      Vue.set(state.users, userId, user)
    },

    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads[threadId]

      if (!thread.posts) {
        Vue.set(thread, 'posts', {})
      }

      Vue.set(thread.posts, postId, postId)
    },

    appendPostToUser(state, { postId, userId }) {
      const user = state.users[userId]

      if (!user.posts) {
        Vue.set(user, 'posts', {})
      }

      Vue.set(user.posts, postId, postId)
    },

    appendThreadToForum(state, { forumId, threadId }) {
      const forum = state.forums[forumId]

      if (!forum.threads) {
        Vue.set(forum, 'threads', {})
      }

      Vue.set(forum.threads, threadId, threadId)
    },

    appendThreadToUser(state, { userId, threadId }) {
      const user = state.users[userId]

      if (!user.threads) {
        Vue.set(user, 'threads', {})
      }

      Vue.set(user.threads, threadId, threadId)
    }
  }
})
