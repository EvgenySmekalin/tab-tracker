<template>
  <panel title="Song Metadata">
    <v-layout>
      <v-flex xs6>
        <div class="song-title">
          {{ song.title }}
        </div>

        <div class="song-artist">
          {{ song.artist }}
        </div>

        <div class="song-genre">
          {{ song.genre }}
        </div>
        <v-btn
            class="cyan"
            :to="{
              name: 'song-edit',
              params () {
                return {
                  songId: song.id
                }
              }
            }"
            dark>
          View
        </v-btn>
        <v-btn
            v-if="isUserLoggedIn && !bookmark"
            class="cyan"
            @click="setAsBookmark"
            dark>
          Set As Bookmark
        </v-btn>
        <v-btn
            v-if="isUserLoggedIn && bookmark"
            class="cyan"
            @click="unsetAsBookmark"
            dark>
          Unset As Bookmark
        </v-btn>
      </v-flex>
      <v-flex xs6>
        <img :src="song.albumImageUrl" alt="" class="album-image"><br>
        {{ song.album }}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  data () {
    return {
      bookmark: null
    }
  },
  props: [
    'song'
  ],
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  watch: {
    async song () {
      console.log(this.song)
      try {
        this.bookmark = (await BookmarksService.index({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })).data
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsBookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
    .song {
        padding: 20px;
        height: 330px;
        overflow: hidden;
    }
    .song-title {
        font-size: 30px;
    }
    .song-artist {
        font-size: 24px;
    }
    .song-genre {
        font-size: 18px;
    }
    .album-image {
        width: 70%;
        margin: 0 auto;
    }
</style>
