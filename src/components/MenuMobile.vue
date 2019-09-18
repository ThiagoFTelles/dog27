<template>
  <section class="menu-mobile">
    <img
      @click.prevent="openButton()"
      class="menu-sandwich"
      src="@/assets/header/menu-mobile.svg"
      alt="Dog27"
    />
    <div class="menu-overlay"></div>

    <div class="side-menu-wrapper">
      <div class="top-menu">
        <a href="#" class="menu-close" @click.prevent="closeButton()">×</a>
        <router-link to="/" class="logo-inside-menu">
          <img src="@/assets/header/icone-logo-com-texto-branca.svg" alt="Dog27" />
        </router-link>
      </div>
      <ul>
        <li>
          <a>PRODUTOS ></a>
        </li>
        <li>
          <a>ESTAMPAS ></a>
        </li>
        <li>
          <a>FALE CONOSCO ></a>
        </li>
        <li>
          <a target="_blank" href="https://blog.dog27.com.br/">BLOG ></a>
        </li>
      </ul>
    </div>
  </section>
</template>
<script
  src="https://code.jquery.com/jquery-3.1.0.slim.min.js"
  integrity="sha256-cRpWjoSOw5KcyIOaZNo4i6fZ9tKPhYYb6i5T9RSVJG8="
  crossorigin="anonymous"></script>
<script>
$(document).on("click", function(e) {
  if (
    !e.target.closest(".side-menu-wrapper") &&
    $(".side-menu-wrapper").hasClass("active")
  ) {
    $(".side-menu-wrapper")
      .css({ left: -$(".side-menu-wrapper").outerWidth() + "px" })
      .removeClass("active");
    $(".menu-overlay").css({ opacity: "0", width: "0" });
  }
});

export default {
  name: "MenuMobile",
  methods: {
    openButton() {
      $(".side-menu-wrapper").css({ left: "0px" });
      setTimeout(function() {
        $(".side-menu-wrapper").addClass("active");
      }, 50);
      $(".menu-overlay").css({ opacity: "0", width: "100%" });
    },
    closeButton() {
      $(".side-menu-wrapper").css({
        left: -$(".side-menu-wrapper").outerWidth() + "px"
      });
      setTimeout(function() {
        $(".side-menu-wrapper").removeClass("active");
      }, 50);
      $(".menu-overlay").css({ opacity: "0", width: "0" });
    }
  },
  created() {
    $(".side-menu-wrapper")
      .hide()
      .css({ left: -$(".side-menu-wrapper").outerWidth() + "px" })
      .delay(50)
      .queue(function() {
        $(".side-menu-wrapper").show();
      });
  }
};
</script>
<style scoped>
.menu-mobile {
  margin-left: 20px;
  grid-column: 1/2;
  grid-row: 1;
}

.menu-mobile,
.menu-sandwich {
  width: 25px;
  height: inherit;
}

.top-menu {
  display: flex;
}

.top-menu a {
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  flex: 1;
}

.logo-inside-menu {
  height: 50px;
}

.logo-inside-menu img {
  height: 35px;
  display: flex;
  flex: 1;
}

/* ////////////////////////////////////////////////////////////////////////////////////// */
.side-menu-wrapper {
  /* style menu wrapper */
  background: #2f2c2c;
  padding: 4px 0 0 20px;
  position: fixed; /* Fixed position */
  top: 30px;
  left: -250px; /* Sidebar initial position. "right:0" for right positioned menu */
  height: 100%;
  z-index: 2;
  transition: 0.5s; /* CSS transition speed */
  width: 250px;
  font: 20px "Courier New", Courier, monospace;
  box-sizing: border-box;
}
.side-menu-wrapper > ul {
  /* css ul list style */
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto; /* enable scroll for menu items */
  height: 95%;
}
.side-menu-wrapper > ul > li > a {
  /* links */
  display: block;
  padding: 6px 4px 6px 4px;
  color: #fff;
  transition: 0.3s;
  text-decoration: none;
}
.side-menu-wrapper > a.menu-close {
  /* close button */
  color: #fff;
  display: block;
  margin: -30px 0 -10px -20px;
  font-size: 35px;
  text-decoration: none;
}

.menu-overlay {
  /* overlay */
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 30px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  overflow-y: auto;
  overflow-x: hidden;
  text-align: center;
  opacity: 0;
  transition: opacity 1s;
}
</style> 
 