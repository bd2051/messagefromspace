(function () {
    var URL = '/api/get_messages?last_id=';
    var URLREADS = '/api/mark_read?id=';
    var SUCSESS_CODE = 200;
    var LOAD_TIME = 5000;
    var FIRST_ID = '0';
    var URLLoad = URL + FIRST_ID;
    var URLSave;
    var lastId = 0;
    var tempId = 0;
    var vueArray = [];
    var buttons = [];
    var listGroup = document.querySelector('.list-group');

    var requestData = function (cb, isSaveFunction) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        var errorMessage = isSaveFunction ? '' : 'Данные не загрузились! ';
        var onLoadData = function () {
            if (xhr.status === SUCSESS_CODE) {
                if (isSaveFunction) {
                    cb();
                } else {
                    if (xhr.response.length > 0) {
                        cb(xhr.response);
                    }
                }
            } else {
                console.log(errorMessage + ' Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
            }
        };
        var onErrorData = function () {
            console.log(errorMessage + ' Произошла ошибка соединения');
        };
        var onTimerData = function () {
            console.log(errorMessage + ' Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        };

        xhr.addEventListener('load', onLoadData);
        xhr.addEventListener('error', onErrorData);
        xhr.addEventListener('timeout', onTimerData);

        xhr.timeout = LOAD_TIME;

        if (isSaveFunction) {
            xhr.open('GET', URLSave);
            xhr.send();
        } else {
            xhr.open('GET', URLLoad);
            xhr.send();
            var timerId = setInterval(function () {
                xhr.open('GET', URL + lastId);
                xhr.send();
            }, 10000);
        }
    };

    var renderMessage = function (messages) {
        Vue.component('itemlist', {
            props: ['item', 'onClickButton', 'isMessageRead'],
            template: `<li class="list-group-item">
                       <span class="w-75"><strong>Сообщение:</strong> {{ item.date }} {{ item.message }}
                       </span>
                       <button type="button" class="btn btn-default" v-on:click="onClickButton()" >Прочитано</button>
                    </li>`
        });

        var clonTemplatete = listGroup.querySelector('#app' + tempId).cloneNode(true);

        messages.forEach(function (element) {
            vueArray[tempId] = new Vue({
                el: '#app' + tempId,
                data: {
                    item: {
                        id: element.pk,
                        date: element.fields.pub_date,
                        message: element.fields.mess_text
                    },
                    vueID: tempId
                },
                methods: {
                    onClickButton: function () {
                        URLSave = URLREADS + this.item.id;
                        var vueObj = this;
                        requestData(function () {
                            vueObj.$destroy();
                        }, true);
                    }
                },
                beforeDestroy: function () {
                    listGroup.removeChild(this.$el);
                    delete vueArray[this.vueID];
                }
            });

            tempId++;
            clonTemplatete.id = 'app' + tempId;
            listGroup.appendChild(clonTemplatete);
        });
        lastId = messages[messages.length - 1].pk
    };

    var removeEventListener = function (button, message) {
        button.removeEventListener('click', onClickButton);
    }

    requestData(renderMessage);
})();