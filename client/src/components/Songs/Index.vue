<template>
    <v-layout column>
        <v-flex xs6 offset-xs3>
          <songs-search-panel class="mb-4"></songs-search-panel>
          <songs-panel></songs-panel>
        </v-flex>
    </v-layout>
</template>

<script>
import SongService from '@/services/SongService'
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'
export default {
  components: {
    SongsPanel, SongsSearchPanel
  },
  data () {
    return {
      songs: []
    }
  },
  async mounted () {
    this.songs = (await SongService.index()).data
  }
}
</script>

<style scoped>

</style>
