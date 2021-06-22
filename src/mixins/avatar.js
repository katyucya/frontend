const avatarMixin = {
    methods: {
        getImage(username){
            return requestAnimationFrame(`@/assets/img/${username}.png`);
        }
    }
};

export default avatarMixin;