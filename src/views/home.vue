<template>
  <section class="home-page-container">
    <header class="home-page-header">
      <div class="home-page-header-content">
        <div class="header-logo">
          <router-link to="/">
            <img src="@/assets/main-logo.png" alt="" />
          </router-link>
        </div>
        <nav class="header-desktop-content">
          <div class="login-link-wrapper">
            <router-link class="login-link" to="login">Log in</router-link>
          </div>
          <div class="header-button-started flex align-center">
            <router-link to="boards" class="btn link-get-started flex align-center">
              <span> Get started </span>
              <font-awesome-icon icon="chevron-right" />
            </router-link>
          </div>
        </nav>
      </div>
    </header>

    <main class="main-home-page">
      <div class="main-head flex column align-center text-center text-center">
        <h1 class="core-title">Work without limits</h1>
        <h2 class="paragraph-body">Easily manage and scale anything you're working on with monday.com Work OS.</h2>
      </div>

      <div class="tag-items">
        <div class="tag">
          <div class="tag-img-wrapper">
            <img src="https://dapulse-res.cloudinary.com/image/upload/remote_mondaycom_static/products/product-icons/icons_3d/Projects_icon_circle.png" alt="" />
          </div>
          <div class="tag-text">Projects</div>
        </div>
        <div class="tag">
          <div class="tag-img-wrapper">
            <div class="tag-picture">
              <img src="https://dapulse-res.cloudinary.com/image/upload/remote_mondaycom_static/products/product-icons/icons_3d/Marketing_icon_circle.png" alt="" />
            </div>
          </div>
          <div class="tag-text"><span>Marketing</span></div>
        </div>
        <div class="tag">
          <div class="tag-img-wrapper">
            <div class="tag-picture">
              <img src="https://dapulse-res.cloudinary.com/image/upload/remote_mondaycom_static/products/product-icons/icons_3d/CRM_icon_circle.png" alt="" />
            </div>
          </div>
          <div class="tag-text"><span>CRM</span></div>
        </div>
        <div class="tag">
          <div class="tag-img-wrapper">
            <div class="tag-picture">
              <img src="https://dapulse-res.cloudinary.com/image/upload/remote_mondaycom_static/products/product-icons/icons_3d/Software_icon_circle.png" alt="" />
            </div>
          </div>
          <div class="tag-text"><span>Software</span></div>
        </div>
        <div class="tag">
          <div class="tag-img-wrapper">
            <div class="tag-picture">
              <img src="https://dapulse-res.cloudinary.com/image/upload/remote_mondaycom_static/products/product-icons/icons_3d/Creative_design_icon_circle.png" alt="" />
            </div>
          </div>
          <div class="tag-text"><span>Creative & design</span></div>
        </div>
        <div class="tag">
          <div class="tag-img-wrapper">
            <div class="tag-picture">
              <img src="https://dapulse-res.cloudinary.com/image/upload/remote_mondaycom_static/products/product-icons/icons_3d/HR_icon_circle.png" alt="" />
            </div>
          </div>
          <div class="tag-text"><span>HR</span></div>
        </div>
        <div class="tag">
          <div class="tag-img-wrapper">
            <div class="tag-picture">
              <img src="https://dapulse-res.cloudinary.com/image/upload/remote_mondaycom_static/products/product-icons/icons_3d/Operations_icon_circle.png" alt="" />
            </div>
          </div>
          <div class="tag-text"><span>Operations</span></div>
        </div>
        <div class="tag">
          <div class="tag-img-wrapper">
            <div class="tag-picture">
              <img src="https://dapulse-res.cloudinary.com/image/upload/remote_mondaycom_static/products/product-icons/icons_3d/IT_icon_circle.png" alt="" />
            </div>
          </div>
          <div class="tag-text"><span>IT</span></div>
        </div>
        <div class="tag">
          <div class="tag-img-wrapper">
            <div class="tag-picture">
              <img src="https://dapulse-res.cloudinary.com/image/upload/remote_mondaycom_static/products/product-icons/icons_3d/200_workflows_icon_circle.png" alt="" />
            </div>
          </div>
          <div class="tag-text"><span>200+ workflows</span></div>
        </div>
      </div>

      <div class="get-started-btn-wrapper flex align-center">
        <router-link to="boards" class="btn link-get-started-main">
          Get started
          <font-awesome-icon icon="chevron-right" />
        </router-link>
      </div>

      <div class="video-container">
        <video
          style="width: 100%; height: 100%"
          preload="auto"
          loop=""
          poster="https://dapulse-res.cloudinary.com/video/upload/so_0p/remote_mondaycom_static/video/video-library/Tests - DON'T USE!/hp_animation_with_text_3.jpg"
          playsinline=""
          webkit-playsinline=""
          x5-playsinline=""
        >
          <source src="https://dapulse-res.cloudinary.com/video/upload/q_auto,f_auto,cs_copy/remote_mondaycom_static/video/video-library/Tests - DON'T USE!/hp_animation_with_text_3.mp4" />
        </video>
      </div>
    </main>
  </section>
</template>

<script>
// import selectableTag from '@/components/selectable-tag';
export default {
  name: 'home',
  data() {
    return {
      selectableTags: [
        'Project management',
        'Sales and CRM',
        'Marketing',
        'Creative and design',
        'Software development',
        'Task management',
        'Operations',
        'HR and recruitment',
        'IT',
        '200+ workflows',
      ],
    };
  },
  created() {
    this.$store.dispatch({ type: 'loadBoards' });
  },
  computed: {},
  methods: {},
  components: {
    // selectableTag,
  },
  //   mounted() {
  //     this.$refs.videoRef.src =
  //       "cloudinary.com/video/upload/q_auto,f_auto,cs_copy/remote_mondaycom_static/video/video-library/Tests%20-%20DON'T%20USE!/hp_animation_with_text_3.mp4";
  //     this.$refs.videoRef.play();
  //   },
};

//  <header class="flex space-between">
//       <h2>monday</h2>
//       <router-link to="login" class="btn btn-blue-round">
//         Get starred
//         <span>icon</span>
//       </router-link>
//     </header>

//     <h1>Work Without Limits</h1>
//     <p>
//       Easily build, run, and scale your dream workflows on one platform. What
//       would you like to manage with monday.com Work OS?
//     </p>
//     <!-- TODO: - add cmp "selectable tags"-->
//     <selectable-tag :tags="selectableTags" />

//     <router-link to="login" class="btn btn-blue-round">
//       Get starred
//       <span>icon</span>
//     </router-link>
//     <div class="body-">
//       <!-- TODO:add the video from the original page -->
//       <!-- <video src="https://dapulse-res.cloudinary.com/video/upload/q_auto,f_auto,cs_copy/remote_mondaycom_static/video/video-library/Tests - DON'T USE!/hp_animation_with_text_3.mp4"></video> -->
//     </div>
</script>
