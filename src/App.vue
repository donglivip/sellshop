<template>
  <div id="app">
    <router-view class="child-view"></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data() {
      return {

      }
    },

    watch: {

    },
    methods: {

    },
    mounted: function() {
      var that = this
      function plusReady() {
        plus.key.addEventListener("backbutton", function() {
          that.$router.back()
        })
        plus.navigator.setStatusBarBackground('#e9e9e9');
        plus.navigator.setStatusBarStyle('dark')
        plus.runtime.getProperty(plus.runtime.appid, function(inf) {
          $.ajax({
            type: "post",
            url: that.myurl03 + "/showVersion",
            dataType: 'json',
            success: function(res) {
              if (res.data.bpAvSellerNum != inf.version) {
                //								版本更新
                plus.nativeUI.toast("正在为您更新资源~");
                plus.downloader.createDownload(that.myurl03 + res.data.bpAvSellerAppUrl, {
                  filename: "_doc/update/"
                }, function(d, status) {
                  if (status == 200) {
                    plus.runtime.install(d.filename, {}, function() {
                      plus.nativeUI.alert("应用资源更新完成！点击重启！", function() {
                        plus.runtime.restart();
                      });
                    }, function(e) {
                      alert("安装更新包失败[" + e.code + "]：" + e.message);
                    });
                  } else {
                    plus.nativeUI.closeWaiting();
                    alert("下载更新包失败！");
                  }
                }).start();
              }
            },
            error: function(err) {
              alert(JSON.stringify(err))
            }
          });
        });
      }
      if (window.plus) {
        plusReady();
      } else {
        document.addEventListener("plusready", plusReady, false);
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      },
      myurl03() {
        return this.$store.state.myurl03
      }
    }
  }
</script>
