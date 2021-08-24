<template>
    <div class="component-style p-2">
        <div class="media w-100 bg-danger"></div>
        <h1 class="video-title m-0" v-bind:title="video.title">{{video.title}}</h1>
        <p class="video-info m-0">{{video.username}}</p>
        <p class="video-info m-0">{{video.views}}</p>
    </div>
</template>

<script>
    export default {
        name: "VideoCard",
        data: () => {
            return {
                c_bgc: "#fff",
                c_width: "",
                video: {
                    title: "Title",
                    username: "Username",
                    views: "Views"
                }
            };
        },
    };
</script>

<style scoped>
    .component-style {
        background-color: #fff; /*Change to c_bgc variable later*/
    }
    .media {
        aspect-ratio: 16 / 9;
    }

    .video-title {
        font-size: 1.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .video-info {
        font-size: 1em;
    }
</style>