// components/radio/radio.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    radioItems: Object,
    answer: {
      type: Boolean,
      value: false,
    }
  },
  

  data: {
    imgalist: []
  },
  /**
   * 组件的初始数据
   */


  /**
   * 组件的方法列表
   */
  methods: {
    previewImage: function (e) {
      var current = e.target.dataset.src;
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: this.data.imgalist// 需要预览的图片http链接列表
      })
    },
    radioChange: function (e) {
      if (this.data.radioItems.ck) { return false }
      let value = e.detail.value;
      var radioItems = this.data.radioItems;

      if (this.data.answer) {
        radioItems.ck = true;
      }
      for (var i = 0, len = radioItems.choiceList.length; i < len; ++i) {
        radioItems.choiceList[i].checked = radioItems.choiceList[i].value == e.detail.value;
      }

      if (this.data.answer && value != radioItems.answer) {
        radioItems.statu = true;
      }

      this.setData({
        radioItems: radioItems
      });

      this.triggerEvent("change", { value: e.detail.value, ok: value == radioItems.answer, data: radioItems });
    }
  }
})
