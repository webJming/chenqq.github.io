// components/ysy/checkbox/checkbox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checkboxItems: Object,
    answer: {
      type: Boolean,
      value: false,
    }
  },
  observers: {
    'checkboxItems': function (checkboxItems) {
      let d = [];
      if (checkboxItems.titleImg) {
        d.push(checkboxItems.titleImg)
      }
      for (let i = 0, dd; dd = checkboxItems.choiceList[i++];) {
        if (dd.src) {
          d.push(dd.src)
        }
      }
      this.setData({
        imgalist: d
      });
    },

  },
  /**
   * 组件的初始数据
   */
  data: {
    imgalist: [],
    bgcolor:'#1AAD19',
    values:[]
  },

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
    checkboxChange: function (e) {
      if (this.data.checkboxItems.ck) { return false }
      var checkboxItems = this.data.checkboxItems, values = e.detail.value;
      for (var i = 0, lenI = checkboxItems.choiceList.length; i < lenI; ++i) {
        checkboxItems.choiceList[i].checked = false;

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (checkboxItems.choiceList[i].value == values[j]) {
            checkboxItems.choiceList[i].checked = true;
            break;
          }
        }
      }
     
      this.setData({
        values: values,
        checkboxItems: checkboxItems,
        bgcolor:'#1AAD19'
      });
      
    },
    sure(){
      var checkboxItems = this.data.checkboxItems;
      let values = this.data.values;
      if (values.length<1){
        return false
      }
     
      let cv = '';
      let cw = ''
      if (values instanceof Array) {
        cv = values.join('');
      }else{
        cv = values;
      }
      if (checkboxItems.answer instanceof Array) {
        cw = checkboxItems.answer.join('');
      }else{
        cw = checkboxItems.answer
      }
      if (this.data.answer && cv != cw) {
        checkboxItems.statu = true;
      }
      if (this.data.answer) {
        checkboxItems.ck = true;
      }
      this.setData({
        checkboxItems: checkboxItems,
        bgcolor:'#9ED99D'
      });
     
      if (cv.length > 1) {
        var b = cv.split("")
        b.sort(function (a, b) {
          if (a.toString().toLowerCase() > b.toString().toLowerCase())
            return 1;
          return -1;
        })
        cv = b.join("");
      }
      console.log(cv)
      console.log(cw)
      this.triggerEvent("change", { value: cv, ok: cv == cw, data: checkboxItems });
    }
  }
})
