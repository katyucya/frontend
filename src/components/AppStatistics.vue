<template>
    <div>
        <v-card class="pa-2">
            <v-row>
                <v-col xs="6">
                    <v-avatar size="100">
                        <img :src="getImage(statistics.username)" :alt="statistics.username">
                    </v-avatar>
                </v-col>
                <v-col xs="6">
                    <h4 class="mb-2">{{ statistics.username}} </h4>
                    <div><b> {{statistics.postsCount}} </b>posts</div>
                    <div><b> {{statistics.likesCount}} </b>curtidas</div>
                    <div><b> {{statistics.commentsCount}} </b>comentários</div>
                </v-col>    
            </v-row>
        </v-card>
    </div>
</template>

<script>
import AvatarMixin from '@/mixins/avatar';
export default {
    props: ['statistics'],
    mixins: [AvatarMixin]
}
</script>

<style>

</style>