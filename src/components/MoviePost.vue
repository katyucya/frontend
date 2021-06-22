<template>
  <div>
    <v-card>
      <v-row>
        <v-col cols="12" md="5" sm="6" class="py-0">
          <v-img :lazy-src="post.picture" contain :src="post.picture"></v-img>
        </v-col>
        <v-col cols="12" md="7" sm="6">
          <div class="pa-4">
            <div class="d-flex flex-row mb-5">
              <user-avatar :user="post.user" class="mr-4"></user-avatar>
              <div class="d-flex align-center">{{ post.title }}</div>
            </div>
            <div class="d-flex flex-row mb-2">
              <post-likes
                :likes="likes"
                :user="user"
                class="mr-4"
                @like="handleLike"
              ></post-likes>
              <post-comments-count :comments="comments"></post-comments-count>
            </div>
            <v-divider></v-divider>
            <v-item-group class="scrollable">
              <post-comment
                v-for="(comment, index) in comments"
                :key="index"
                :comment="comment"
                class="mb-3"
              ></post-comment>
            </v-item-group>
            <v-spacer></v-spacer>
            <v-text-field
              label="Comentar..."
              v-model="newComment"
              @keyup.enter="addComment"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { v4 as uid } from 'uuid';
import PostCommentsCount from '@/components/PostCommentsCount';
import PostLikes from '@/components/PostLikes';
import PostComment from '@/components/PostComment';

export default {
  props: ['post', 'user'],
  data() {
    return {
      newComment: '',
      comments: [],
      likes: [],
    };
  },
  components: {
    PostLikes,
    PostComment,
    PostCommentsCount,
  },
  mounted() {
    // este é mais um exemplo da limitação da reatividade no vue
    // tentei aqui manipular as informações dentro do post.comments
    // porem, apesar de atualizar a lista de comentarios, o contador de comentarios
    // não estava sendo atualizado. Portanto fiz uma copia dos comments aqui
    // para tratar o array de comments do post diretamente.
    this.comments = [...this.post.comments];
    this.likes = [...this.post.likes];
  },
  methods: {
    addComment() {
      if (this.newComment.length === 0) {
        return;
      }
      this.comments.push({
        id: uid(),
        comment: this.newComment,
        postId: this.post.id,
        user: this.user,
      });

      // emitimos aqui o evento somente de um novo comentario para atualizar a contagem de comentarios
      this.$emit('new-comment');

      // limpa o comentario atual
      this.newComment = '';
    },
    handleLike(liked) {
      if (liked) {
        this.likes.push({
          id: uid(),
          postId: this.post.id,
          user: this.user,
        });

        this.$emit('like', 1);
        return;
      }

      const user = this.user;
      const userLikeIndex = this.likes.findIndex((like) => like.user === user);
      this.likes.splice(userLikeIndex, 1);
      this.$emit('like', -1);
    },
  },
};
</script>

<style scoped>
.scollable {
  max-height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
}
</style>
