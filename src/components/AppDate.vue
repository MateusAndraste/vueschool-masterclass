<template>
  <span :title="timestamp | humanFriendlyDate">{{ timestamp | diffForHumans }}</span>
</template>

<script>
import moment from 'moment'

export default {
    props: {
        timestamp: {
            required: true,
            type: Number
        }
    },

  filters: {
    humanFriendlyDate (date) {
      return moment
        .unix(date)
        .locale('pt-br')
        .format('MMMM DD YYYY, hh:mm:ss a');
    },
    diffForHumans (date) {
      return moment.unix(date).locale('pt-br').fromNow()
    }
  }
};
</script>

<style></style>
