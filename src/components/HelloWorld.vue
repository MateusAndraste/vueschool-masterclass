<template>
<div>
  <h1>Welcome to the Forum</h1>
</div>
</template>

<script>
import sourceData from '@/data'
export default {
  name: 'HelloWorld',
  data () {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users
    }
  }
}
</script>
