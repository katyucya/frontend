<template>
  <v-app>
    <v-dialog width="500" heigth="400" v-model="loading">
      <v-card>
        <v-card-text class="pa-5">
          Carregando <b>Movinstagram</b>...
          <v-spacer></v-spacer>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-main v-if="!loading">
      <h1 class="text-center">Movinstagram</h1>
      <v-container>
        <v-row class="d-flex align-stretch fixed-on-scroll">
          <v-col cols="12" md="4" sn="12">
            <app-statistics
              :statistics="statistics"
              class="full-height"
            ></app-statistics>
          </v-col>
          <v-col cols="12" md="8" sn="12">
            <select-user
              :users="timelineUsers"
              :active-user="activeUser"
              class="full-height"
              @change-user="changeActiveUser"
            ></select-user>
          </v-col>
        </v-row>
        <v-divider class="my-3"></v-divider>
        <div v-for="(post, index) in posts" :key="index">
          <movie-post
            :post="post"
            :user="activeUser"
            @new-comment="updateCommentCount"
            @like="incrementLikeCount"
            class="mb-5"
          ></movie-post>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
//import { v4 as uid } from 'uuid';

import AppStatistics from '@/components/AppStatistics';
import SelectUser from '@/components/SelectUser';
import MoviePost from '@/components/MoviePost';

export default {
  components: {
    SelectUser,
    AppStatistics,
    MoviePost,
  },
  async created() {
    this.loading = true;
    axios.defaults.baseURL = 'http://localhost:3001';

    // Buscar dados do backend
    this.posts = await this.getPosts();
    this.comments = await this.getComments();
    this.likes = await this.getLikes();
    this.bestFriends = await this.getBestFriends();

    // Superman usuario ativo por padrão
    this.activeUser = 'superman';

    // constroi a estrutura de dados dos posts e  seus relacionamentos
    this.buildPosts();

    // Estatisticas iniciais da timeLine
    this.statistics.username = 'superman';
    this.statistics.likesCount = this.likes.length;
    this.statistics.postsCount = this.posts.length;
    this.statistics.commentsCount = this.comments.length;

    // Fechar janela de loading
    this.loading = false;
  },
  data() {
    return {
      statistics: {
        name: '',
        likesCount: 0,
        postsCount: 0,
        commentsCount: 0,
      },
      activeUser: '',
      loading: false,
      posts: [],
      comments: [],
      likes: [],
      bestFriends: [],
    };
  },
  computed: {
    timelineUsers() {
      return ['superman', ...this.bestFriends];
    },
  },
  methods: {
    async getPosts() {
      const { data } = await axios.get('/posts');
      return data;
    },
    async getComments() {
      const { data } = await axios.get('/comments');
      return data;
    },
    async getLikes() {
      const { data } = await axios.get('/likes');
      return data;
    },
    async getBestFriends() {
      const { data } = await axios.get('/bestfriends');
      return data;
    },
    buildPosts() {
      this.posts.forEach((post) => {
        post.comments = [
          ...this.comments.filter((comment) => comment.postId === post.id),
        ];
        post.likes = [...this.likes.filter((like) => like.postId === post.id)];
      });
    },
    channgeActiveUser(user) {
      this.activeUser = user;
    },
    updateCommentCount() {
      this.statistics.commentsCount++;
    },
    incrementLikeCount(increment) {
      this.statistics.likesCount = this.statistics.likesCount + increment;
    },
  },
};
</script>

<style>
.full-height {
  height: 100px;
}

.main {
  background: #f2f2f2;
}
</style>
