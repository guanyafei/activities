/*!
 * selectbox
 * Date: 2014-01-10
 * https://github.com/aui/popupjs
 * (c) 2009-2013 TangBin, http://www.planeArt.cn
 *
 * This is licensed under the GNU LGPL, version 2.1 or later.
 * For details, see: http://www.gnu.org/licenses/lgpl-2.1.html
 */
define(function(require, exports, module) {
    var $ = require('$');
    var Popup = require('./popup');
    var css = '';


    // css loader: RequireJS & SeaJS
    css = require[require.toUrl ? 'toUrl' : 'resolve'](css);
    css = '<link rel="stylesheet" href="' + css + '" />';
    if ($('base')[0]) {
        $('base').before(css);
    } else {
        $('head').append(css);
    }


    function Selectbox(select, options) {

        select = this.select = $(select);

        $.extend(this, options || {});

        var that = this;
        var isIE6 = !('minWidth' in select[0].style);
        //var selectHeight = select.outerHeight() + 'px';



        if (select.is('[multiple]')) {
            return;
        }


        if (select.data('selectbox')) {
            // 鍒犻櫎涓婁竴娆＄殑 selectbox 浠ラ噸鏂版洿鏂�
            select.data('selectbox').remove();
        }


        var selectboxHtml = this._tpl(this.selectboxHtml, $.extend({
            textContent: that._getOption().html() || ''
        }, select.data()));

        this._selectbox = $(selectboxHtml);
        this._value = this._selectbox.find('[data-value]');


        // selectbox 鐨勪簨浠剁粦瀹�
        if (this.isShowDropdown && !select.attr('disabled')) {
            this._globalKeydown = $.proxy(this._globalKeydown, this);

            this._selectbox.on(this._clickType + ' focus blur', function(event) {
                that[that._clickType === event.type ? 'click' : event.type]();
            });
        }


        this._selectbox.css({
            width: select.outerWidth() + 'px'
        });


        // 鍏嬮殕鍘熺敓 select 楂樺害
        // this._value.css({
        //     minHeight: selectHeight,
        //     height: isIE6 ? selectHeight : '',
        //     lineHeight: selectHeight
        // });


        // 鍏嬮殕鍘熺敓 select 鐨勫熀鏈� UI 浜嬩欢
        select.on('focus blur', function(event) {
            that[event.type]();
            event.preventDefault();
        }).on('change', function() {
            var text = that._getOption().html();
            that._value.html(text);

            var opts = {
                'text': text
            }
            var data = $.extend(that._getOption().data(), opts || {})
            that.getData(data);
        });


        // 闅愯棌鍘熺敓 select
        // 鐩蹭汉浠嶇劧鍙互閫氳繃 tab 閿闂埌鍘熺敓鎺т欢
        // iPad 涓� iPhone 绛夎澶囩偣鍑讳粛鐒惰兘澶熶娇鐢ㄦ粴鍔ㄦ搷浣� select
        select.css({
            opacity: 0,
            position: 'absolute',
            left: isIE6 ? '-9999px' : 'auto',
            right: 'auto',
            top: 'auto',
            bottom: 'auto',
            zIndex: this.isShowDropdown ? -1 : 1
        }).data('selectbox', this);

        // 浠ｆ浛鍘熺敓 select
        select.after(this._selectbox);
    }

    var popup = function() {};
    popup.prototype = Popup.prototype;
    Selectbox.prototype = new popup();

    $.extend(Selectbox.prototype, {

        selectboxHtml: '<div class="ui-selectbox" hidefocus="true" style="user-select:none" onselectstart="return false" tabindex="-1" aria-hidden>' + '<div class="ui-selectbox-inner" data-value="">{{textContent}}</div>' + '<i class="ui-selectbox-icon"></i>' + '</div>',

        dropdownHtml: '<dl class="ui-selectbox-dropdown">{{options}}</dl>',
        optgroupHtml: '<dt class="ui-selectbox-optgroup">{{label}}</dt>',
        optionHtml: '<dd class="ui-selectbox-option {{className}}" data-option="{{index}}" tabindex="-1">{{textContent}}</dd>',
        selectedClass: 'ui-selectbox-selected',
        disabledClass: 'ui-selectbox-disabled',
        focusClass: 'ui-selectbox-focus',
        openClass: 'ui-selectbox-open',

        // 绉诲姩绔笉浣跨敤妯℃嫙涓嬫媺灞�
        isShowDropdown: !('createTouch' in document),

        selectedIndex: 0,
        value: '',
        getData: 銆€
        function(data) {
            return data;
        },


        close: function() {
            if (this._popup) {
                this._popup.close().remove();
                this.change();
            }
        },


        show: function() {

            var that = this;
            var select = this.select;
            var selectbox = that._selectbox;

            if (!select[0].length) {
                return false;
            }
            var selectHeight = select.outerHeight();
            var topHeight = select.offset().top - $(document).scrollTop();
            var bottomHeight = $(window).height() - topHeight - selectHeight;
            var maxHeight = Math.max(topHeight, bottomHeight) - 20;

            var popup = this._popup = new Popup();
            popup.backdropOpacity = 0;
            popup.node.innerHTML = this._dropdownHtml();

            this._dropdown = $(popup.node);
            $(popup.backdrop).on(this._clickType, function() {
                that.close();
            });


            var children = that._dropdown.children();
            var isIE6 = !('minWidth' in children[0].style);


            children.css({
                minWidth: selectbox.innerWidth(),
                maxHeight: maxHeight,
                width: isIE6 ? Math.max(selectbox.innerWidth(), children.outerWidth()) : 'auto',
                height: isIE6 ? Math.min(maxHeight, children.outerHeight()) : 'auto',
                overflowY: 'auto',
                overflowX: 'hidden'
            });


            this._dropdown.on(this._clickType, '[data-option]', function(event) {
                var index = $(this).data('option');
                that.selected(index);
                that.close();

                event.preventDefault();
            });


            popup.onshow = function() {
                $(document).on('keydown', that._globalKeydown);
                selectbox.addClass(that.openClass);
                //selectbox.find('[data-option=' +  + ']').focus()
                that.selectedIndex = select[0].selectedIndex;
                that.selected(that.selectedIndex);
            };


            popup.onremove = function() {
                $(document).off('keydown', that._globalKeydown);
                selectbox.removeClass(that.openClass);
            };


            // 璁板綍灞曞紑鍓嶇殑 value
            this._oldValue = this.select.val();

            popup.showModal(selectbox[0]);
        },


        selected: function(index) {
            // 妫€鏌ュ綋鍓嶉」鏄惁琚鐢�
            if (this._getOption(index).attr('disabled')) {
                return false;
            }
            var dropdown = this._dropdown;
            var option = this._dropdown.find('[data-option=' + index + ']');
            var value = this.select[0].options[index].value;
            var oldIndex = this.select[0].selectedIndex;
            var selectedClass = this.selectedClass;

            // 鏇存柊閫変腑鐘舵€佹牱寮�
            dropdown.find('[data-option=' + oldIndex + ']').removeClass(selectedClass);

            option.addClass(selectedClass);
            option.focus();

            // 鏇存柊妯℃嫙鎺т欢鐨勬樉绀哄€�
            this._value.html(this._getOption(index).html());

            // 鏇存柊 Selectbox 瀵硅薄灞炴€�
            this.value = value;
            this.selectedIndex = index;


            // 鍚屾鏁版嵁鍒板師鐢� select
            this.select[0].selectedIndex = this.selectedIndex;
            this.select[0].value = this.value;
            return true;
        },


        change: function() {

            if (this._oldValue !== this.value) {
                this.select.triggerHandler('change');
            }
        },


        click: function() {
            this.select.focus();
            if (this._popup && this._popup.open) {
                this.close();
            } else {
                this.show();
            }
        },


        focus: function() {
            this._selectbox.addClass(this.focusClass);
        },


        blur: function() {
            this._selectbox.removeClass(this.focusClass);
        },


        remove: function() {
            this.close();
            this._selectbox.remove();
        },


        _clickType: 'onmousedown' in document ? 'mousedown' : 'touchstart',


        // 鑾峰彇鍘熺敓 select 鐨� option jquery 瀵硅薄
        _getOption: function(index) {
            index = index === undefined ? this.select[0].selectedIndex : index;
            return this.select.find('option').eq(index);
        },


        // 绠€鍗曟ā鏉挎浛鎹�
        _tpl: function(tpl, data) {
            return tpl.replace(/{{(.*?)}}/g, function($1, $2) {
                return data[$2];
            });
        },


        // 鑾峰彇涓嬫媺妗嗙殑 HTML
        _dropdownHtml: function() {
            var options = '';
            var that = this;
            var select = this.select;
            var selectData = select.data();

            var index = 0;

            var getOptionsData = function($options) {
                $options.each(function() {
                    var $this = $(this);
                    var className = '';


                    if (this.selected) {
                        className = that.selectedClass;
                    } else {
                        className = this.disabled ? that.disabledClass : '';
                    }

                    options += that._tpl(that.optionHtml, $.extend({
                        value: $this.val(),
                        // 濡傛灉鍐呭绫讳技锛� "<s>閫夐」</s>" 浣跨敤 .text() 浼氬鑷� XSS
                        // 鍙﹀锛屽師鐢� option 涓嶆敮鎸� html 鏂囨湰
                        textContent: $this.html(),
                        index: index,
                        className: className
                    }, $this.data(), selectData));
                    index++;
                });
            };


            if (select.find('optgroup').length) {
                select.find('optgroup').each(function(index) {
                    options += that._tpl(that.optgroupHtml, $.extend({
                        index: index,
                        label: this.label
                    }, $(this).data(), selectData));

                    getOptionsData($(this).find('option'));
                });

            } else {
                getOptionsData(select.find('option'));
            }

            return this._tpl(this.dropdownHtml, {
                options: options
            });
        },


        // 涓婁笅绉诲姩
        _move: function(n) {
            var min = 0;
            var max = this.select[0].length - 1;
            var index = this.select[0].selectedIndex + n;

            if (index >= min && index <= max) {
                // 璺宠繃甯︽湁 disabled 灞炴€х殑閫夐」
                if (!this.selected(index)) {
                    this._move(n + n);
                }
            }
        },


        // 鍏ㄥ眬閿洏鐩戝惉
        _globalKeydown: function(event) {

            var p;

            switch (event.keyCode) {
                case 8:
                    // backspace
                    p = true;
                    break;

                    // tab
                case 9:
                    // esc
                case 27:
                    // enter
                case 13:
                    this.close();
                    p = true;
                    break;

                    // up
                case 38:

                    this._move(-1);
                    p = true;
                    break;

                    // down
                case 40:

                    this._move(1);
                    p = true;
                    break;
            }

            if (p) {
                event.preventDefault();
            }
        }

    });


    return function(elem, options) {
        // 娉ㄦ剰锛氫笉瑕佽繑鍥� Selectbox 鏇村鎺ュ彛缁欏閮紝鍙繚鎸佽楗扮敤閫�
        // 淇濊瘉妯℃嫙鐨勪笅鎷夋槸鍘熺敓鎺т欢鐨勫瓙闆嗭紝杩欐牱鍙互闅忔椂鍦ㄩ」鐩腑鎾ら攢瑁呴グ

        if (elem.type === 'select') {
            new Selectbox(elem, options);
        } else {
            $(elem).each(function() {
                new Selectbox(this, options);
            });
        }
    };

});