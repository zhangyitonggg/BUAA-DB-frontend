<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="require(`@/assets/images/blogDefault.png`)" class="size" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>发帖人用户名:</strong>

          <br />
          发帖标题:
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small">
              <i class="fab fa-hotjar"></i>
            </span>
          32
          </a>

          <a class="level-item">
            <span class="icon is-small">
              <i class="fas fa-comment-dots"></i>
            </span>
              11
          </a>

          <a class="level-item">
            <span class="icon is-small">
              <i class="fas fa-heart"></i>
            </span>
         79
          </a>
        </div>
      </nav>
    </div>
    <div class="media-right">
      <a class="navbar-item" slot="trigger" role="button">
        <b-button type="is-info" outlined @click="detail(index)">查看详情</b-button>
      </a>
    </div>
  </article>

</template>

<script>

</script>

<style>

.size {
  width: 64px;
  height: 64px;
}

</style>