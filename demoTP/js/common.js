/**
 * 等待提交按钮
 *
 * submit-url : 提交目标url
 * submit-method: GET/POST
 * submit-data: 提交数据，json格式
 * submit-handler: 数据成功返回处理器
 * submit-form-ref: 相应的表单ref
 * before-submit:提交前的处理
 * btn-text: 提交按钮文本
 *
 */
Vue.component('dz-submit-button', {
    template: ' <el-button type="primary" @click="beginSubmit" :loading="loading">{{buttonText}}</el-button>',
    props: ['submitUrl', 'submitMethod', 'submitData', 'submitHandler', 'submitFormRef', 'btnText', 'beforeSubmit'],
    data: function () {
        return {
            buttonText: '提交',
            loading: false,
            loadingText: '',
        }
    },
    mounted: function () {
        this.buttonText = this.btnText || this.buttonText;
        this.loadingText = "正在" + this.buttonText;
    },
    methods: {
        afterSubmit: function (data) {
            //恢复提交按钮UI
            this.loading = false;
            this.buttonText = this.btnText || '提交';

            //处理返回结果
            var result = JSON.parse(data);


            //多条form相关的错误信息，增加rules, 且显示一次后不再有效
            var triggerCountFromServer = 0;
            //1条错误信息，上方显示


            if (result.code == 0) {
                this.submitHandler(result);
            } else if (result.code == -1) {
                vue.$message.error(result.msg);
                return;
            } else if (result.code == -2) {
                for (var msgKey in result.content) {
                    var msgContent = result.content[msgKey];
                    vue.rules[msgKey].push({
                        validator: function (rule, value, callback) {
                            if (triggerCountFromServer > 0) {
                                callback(new Error(msgContent));
                                triggerCountFromServer--;
                            } else {
                                callback();
                            }
                        },
                        trigger: 'server',
                    });
                    triggerCountFromServer++;
                }

                //触发验证，显示错误信息
                vue.$refs[this.submitFormRef].validate(function (valid) {

                });

                return;
            } else {
                vue.$message.error(result.msg);
                return;
            }

        },

        beginSubmit: function () {

            var component = this;
            if (this.beforeSubmit) {
                if (this.beforeSubmit() != true) {
                    return
                }
            }
            //验证数据
            vue.$refs[this.submitFormRef].validate(function (valid) {
                if (!valid) {
                    return;
                }
                //上线修改成true
                component.loading = false;
                component.buttonText = component.loadingText;

                if (component.submitMethod == 'GET') {
                    vue.$http.get(component.submitUrl, {
                        params: component.submitData
                    }).then(function (data) {
                        component.afterSubmit(data.bodyText);
                    }).catch(function (data) {
                        omponent.loading = false;
                        component.buttonText = component.loadingText;
                    });
                } else {
                    var formData = {};
                    for (var key in component.submitData) {
                        if (component.submitData[key] instanceof Object) {
                            formData[key] = JSON.stringify(component.submitData[key]);
                        } else {
                            formData[key] = component.submitData[key];
                        }
                    }
                    vue.$http({
                        method: 'POST',
                        url: component.submitUrl,
                        //编码方式按照x-www-form-urlencoded
                        emulateJSON: true,
                        body: formData
                    }).then(function (data) {
                        component.afterSubmit(data.bodyText);
                    }).catch(function (data) {
                        omponent.loading = false;
                        component.buttonText = component.loadingText;
                    });

                }
            });
        }

    },
});


/**
 * yun文件上传组件
 *
 * mutiple : true/false 是否允许多选
 * max-count : 最多允许上传多少张
 * tip : 上传提示文字
 * file-list : 上传文件列表
 * size-limit : 单文件大小限制， 单位Kb
 * errorMessage ：错误信息提示
 * callBackParams: {classId:"7",handleType:"yunClass",schoolId:1,superId:0,teacherId:85} //图片的一些参数
 *
 *
 */
Vue.component('dz-upload-files', {
    template: '<el-upload :multiple="true" ref="upload" :auto-upload="false" class="upload-demo" :action="uploadUrl" :data="formData" :on-preview="handlePreview" :on-remove="onRemove" :before-upload="beforeUpload" :on-success="afterUpload"  :disabled="disabled" :file-list="fileList">' +
    '<el-button  type="success"></i>选择文件</el-button>' +
    '<div slot="tip" class="el-upload__tip">{{tip}}</div></el-upload>',
    props: {
        callBackParmas: {},
        submitUpload: 1,
        multiple: {},
        maxCount: {},
        tip: "",
        fileList: {},
        sizeLimit: {},
        context: '',
        errorMessage: '',
    },
    data: function () {
        return {
            uploadUrl: null,
            formData: {},
            fileUrls: [],
            disabled: false,
            innerFileList: [],
            fileList: [],
            maxCount: 3,
            fileNames: [],
            errorMessage: '',
        };
    },
    methods: {
        handlePreview: function (file) {
            window.open(file.url);
        },

        beforeUpload: function (file) {
            if (file.size / 1024 > this.sizeLimit) {
                this.errorMessage = this.errorMessage.length === 0 ? '文件超过' + file.size / 1024 + 'M' : this.tip;
                alert(this.errorMessage);
                return false;
            }
            console.log(file.name.slice());

            var lastName = file.name.slice(file.name.lastIndexOf("."));
            var component = this;
            component.callBackParmas = Object.assign(component.callBackParmas, {fileName: file.name});
            return this.$http.post('/uploader/default/get-oss-token-with-call-back', Object.assign(component.callBackParmas, {context: component.context})).then(function (data) {
                var tokenObj = JSON.parse(data.bodyText);
                component.uploadUrl = tokenObj['host'] || '';
                component.formData = {
                    'key': component.context + '/' + dz.utils.getRandomString() + lastName,
                    'policy': tokenObj['policy'] || '',
                    'OSSAccessKeyId': tokenObj['accessid'] || '',
                    'success_action_status': '200',
                    'callback': tokenObj['callback'] || '',
                    'signature': tokenObj['signature'] || '',
                };
                component.fileUrls[file.uid] = {
                    url: tokenObj['host'] + '/' + component.formData.key,
                    name: file.name
                };
            });
        },
        afterUpload: function (response, file, fileList) {
            if (fileList.length >= this.maxCount) {
                this.disabled = true;
            }
            _this = this;
            //推送给后端
            _this.$http.post('/uploader/oss-call-back/handle', response).then(function (data) {


            });

            var newFileList = [];

            dz.utils.foreach(this.fileUrls, function (key, item) {
                newFileList.push({
                    name: item.name,
                    url: item.url
                });
            });
            this.$emit('update:fileList', newFileList);
            window.location.reload()
        },
        onRemove: function (file, fileList) {
            if (fileList.length < this.maxCount) {
                this.disabled = false;
            }
            var newFileList = [];
            var _fileUrls = this.fileUrls;
            dz.utils.foreach(this.fileUrls, function (key, item) {
                if (item.url != file.url) {
                    newFileList.push({
                        name: item.name,
                        url: item.url
                    });
                } else {
                    delete(_fileUrls[key]);
                }
            });
            this.$emit('update:fileList', newFileList);

        },
    },
    watch: {
        'submitUpload': function () {
            this.$refs.upload.submit();
        }
    }
});

/*
Vue.component('dz-upload-files', {
    template: '<el-upload :multiple="true" ref="upload" :auto-upload="false" class="upload-demo" :action="uploadUrl" :data="formData" :on-preview="handlePreview" :on-remove="onRemove" :before-upload="beforeUpload" :on-success="afterUpload"  :disabled="disabled" :file-list="fileList">' +
    '<el-button  type="success"></i>选择文件</el-button>' +
    '<div slot="tip" class="el-upload__tip">{{tip}}</div></el-upload>',
    props: {
        callBackParmas: {},
        submitUpload: 1,
        multiple: {},
        maxCount: {},
        tips: {},
        tip: "",
        fileList: {},
        sizeLimit: {},
        imageUrl: {},
        context: '',
        errorMessage: ''
    },
    data: function () {
        return {
            uploadUrl: null,
            formData: {},
            fileUrls: [],
            disabled: false,
            tip: '',
            innerFileList: [],
            fileList: [],
            maxCount: 3,
            fileNames: [],
            errorMessage: ''
        };
    },
    methods: {
        handlePreview: function (file) {
            window.open(file.url);
        },

        beforeUpload: function (file) {
            if (file.size / 1024 > this.sizeLimit) {
                this.errorMessage = this.errorMessage.length === 0 ? '文件超过' + file.size / 1024 + 'M' : this.tip;
                alert(this.errorMessage);
                return false;
            }
            console.log(file.name.slice());

            var lastName = file.name.slice(file.name.lastIndexOf("."));
            var component = this;
            component.callBackParmas = Object.assign(component.callBackParmas, {fileName: file.name});
            return this.$http.post('/uploader/default/get-oss-token-with-call-back', Object.assign(component.callBackParmas, {context: component.context})).then(function (data) {
                var tokenObj = JSON.parse(data.bodyText);
                component.uploadUrl = tokenObj['host'] || '';
                component.formData = {
                    'key': component.context + '/' + dz.utils.getRandomString() + lastName,
                    'policy': tokenObj['policy'] || '',
                    'OSSAccessKeyId': tokenObj['accessid'] || '',
                    'success_action_status': '200',
                    'callback': tokenObj['callback'] || '',
                    'signature': tokenObj['signature'] || '',
                };
                component.fileUrls[file.uid] = {
                    url: tokenObj['host'] + '/' + component.formData.key,
                    name: file.name
                };
            });
        },
        afterUpload: function (response, file, fileList) {
            if (fileList.length >= this.maxCount) {
                this.disabled = true;
            }
            _this = this;
            //推送给后端
            _this.$http.post('/uploader/oss-call-back/handle', response).then(function (data) {


            });

            var newFileList = [];

            dz.utils.foreach(this.fileUrls, function (key, item) {
                newFileList.push({
                    name: item.name,
                    url: item.url
                });


            });
            this.$emit('update:fileList', newFileList);
            window.location.reload()
        },
        onRemove: function (file, fileList) {
            if (fileList.length < this.maxCount) {
                this.disabled = false;
            }
            var newFileList = [];
            var _fileUrls = this.fileUrls;
            dz.utils.foreach(this.fileUrls, function (key, item) {
                if (item.url != file.url) {
                    newFileList.push({
                        name: item.name,
                        url: item.url
                    });
                } else {
                    delete(_fileUrls[key]);
                }
            });
            this.$emit('update:fileList', newFileList);

        },
    },
    watch: {
        'submitUpload': function () {
            this.$refs.upload.submit();
        }
    }
});
*/


/**
 * 文件上传组件-可以拖拽
 *
 * mutiple : true/false 是否允许多选
 * max-count : 最多允许上传多少张
 * tip : 上传提示文字
 * file-list : 上传文件列表
 * size-limit : 单文件大小限制， 单位Kb
 *
 */
Vue.component('dz-upload-file-drag', {
    template: '<el-upload drag class="upload-demo" :action="uploadUrl" :data="formData" :on-preview="handlePreview" :on-remove="onRemove" :before-upload="beforeUpload" :on-success="afterUpload"  :disabled="disabled" :file-list="fileList"><i class="el-icon-upload"></i> <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div><div slot="tip" class="el-upload__tip">{{tip}}</div></el-upload>',
    props: {
        multiple: {},
        maxCount: {},
        tip: '',
        fileList: {},
        sizeLimit: {},
        // imageUrl: {},
        context: {
            default: 'teacher-pc'
        }
    },
    data: function () {
        return {
            uploadUrl: null,
            formData: {},
            context: "test",
            fileUrls: [],
            disabled: false,
            tip: '只能上传jpg/png文件，且不超过500Kb',
            innerFileList: [],
            fileList: [],
            maxCount: 3,
        };
    },
    methods: {
        handlePreview: function (file) {
            window.open(file.url);
        },
        beforeUpload: function (file) {
            if (file.size / 1024 > this.sizeLimit) {
                alert('超过限制大小');
                return false;
            }
            var lastName = file.name.slice(file.name.lastIndexOf("."));
            var component = this;
            return this.$http.get('/uploader/default/get-oss-token?context=' + this.context).then(function (data) {
                var tokenObj = JSON.parse(data.bodyText);
                component.uploadUrl = tokenObj['host'] || '';
                component.formData = {
                    'key': component.context + '/' + dz.utils.getRandomString() + lastName,
                    'policy': tokenObj['policy'] || '',
                    'OSSAccessKeyId': tokenObj['accessid'] || '',
                    'success_action_status': '200',
                    'callback': tokenObj['callback'] || '',
                    'signature': tokenObj['signature'] || '',
                };

                component.fileUrls[file.uid] = {
                    url: tokenObj['host'] + '/' + component.formData.key,
                    name: file.name
                };
            });
        },
        afterUpload: function (response, file, fileList) {
            if (fileList.length >= this.maxCount) {
                this.disabled = true;
            }
            var newFileList = [];
            dz.utils.foreach(this.fileUrls, function (key, item) {
                newFileList.push({
                    name: item.name,
                    url: item.url
                });
            });
            this.$emit('update:fileList', newFileList);
        },
        onRemove: function (file, fileList) {
            if (fileList.length < this.maxCount) {
                this.disabled = false;
            }
            var newFileList = [];
            var _fileUrls = this.fileUrls;
            dz.utils.foreach(this.fileUrls, function (key, item) {
                if (item.url != file.url) {
                    newFileList.push({
                        name: item.name,
                        url: item.url
                    });
                } else {
                    delete(_fileUrls[key]);
                }
            });
            this.$emit('update:fileList', newFileList);
        },
    },
});

/**
 * 文件上传组件
 *
 * mutiple : true/false 是否允许多选
 * max-count : 最多允许上传多少张
 * tip : 上传提示文字
 * file-list : 上传文件列表
 * size-limit : 单文件大小限制， 单位Kb
 *
 */
Vue.component('dz-upload-file', {
    template: '<el-upload  class="upload-demo" :action="uploadUrl" :data="formData" :on-preview="handlePreview" :on-remove="onRemove" :before-upload="beforeUpload" :on-success="afterUpload"  :disabled="disabled" :file-list="fileList"><el-button size="small" type="primary">点击上传</el-button><div slot="tip" class="el-upload__tip">{{tip}}</div></el-upload>',
    props: {
        multiple: {},
        maxCount: {},
        tip: '',
        fileList: {},
        sizeLimit: {},
        // imageUrl: {},
        context: {
            default: 'teacher-pc'
        }
    },
    data: function () {
        return {
            uploadUrl: null,
            formData: {},
            context: "test",
            fileUrls: [],
            disabled: false,
            tip: '只能上传jpg/png文件，且不超过500Kb',
            innerFileList: [],
            fileList: [],
            maxCount: 3,
        };
    },
    methods: {
        handlePreview: function (file) {
            window.open(file.url);
        },
        beforeUpload: function (file) {
            if (file.size / 1024 > this.sizeLimit) {
                alert('超过限制大小');
                return false;
            }
            var lastName = file.name.slice(file.name.lastIndexOf("."));
            var component = this;
            return this.$http.get('/uploader/default/get-oss-token?context=' + this.context).then(function (data) {
                var tokenObj = JSON.parse(data.bodyText);
                component.uploadUrl = tokenObj['host'] || '';
                component.formData = {
                    'key': component.context + '/' + dz.utils.getRandomString() + lastName,
                    'policy': tokenObj['policy'] || '',
                    'OSSAccessKeyId': tokenObj['accessid'] || '',
                    'success_action_status': '200',
                    'callback': tokenObj['callback'] || '',
                    'signature': tokenObj['signature'] || '',
                };

                component.fileUrls[file.uid] = {
                    url: tokenObj['host'] + '/' + component.formData.key,
                    name: file.name
                };
            });
        },
        afterUpload: function (response, file, fileList) {
            if (fileList.length >= this.maxCount) {
                this.disabled = true;
            }
            var newFileList = [];
            dz.utils.foreach(this.fileUrls, function (key, item) {
                newFileList.push({
                    name: item.name,
                    url: item.url
                });
            });
            this.$emit('update:fileList', newFileList);
        },
        onRemove: function (file, fileList) {
            if (fileList.length < this.maxCount) {
                this.disabled = false;
            }
            var newFileList = [];
            var _fileUrls = this.fileUrls;
            dz.utils.foreach(this.fileUrls, function (key, item) {
                if (item.url != file.url) {
                    newFileList.push({
                        name: item.name,
                        url: item.url
                    });
                } else {
                    delete(_fileUrls[key]);
                }
            });
            this.$emit('update:fileList', newFileList);
        },
    },
});

/**
 * 图片上传组件
 *
 * mutiple : true/false 是否允许多选
 * max-count : 最多允许上传多少张
 * tip : 上传提示文字
 * file-list : 上传文件列表
 * size-limit : 单文件大小限制， 单位Kb
 *
 */
Vue.component('dz-upload', {
    template: ' <el-upload :multiple="multiple" class="upload-demo" :data="formData" :action="uploadUrl" :on-preview="handlePreview" :on-remove="onRemove" :before-upload="beforeUpload" :on-success="afterUpload" list-type="picture" :file-list="fileList"  :disabled="disabled"><el-button size="small" type="primary">点击上传</el-button><div slot="tip" class="el-upload__tip">{{tip}}</div></el-upload>',
    props: {
        tip: "",
        multiple: {},
        fileList: {},
        sizeLimit: {},
        // imageUrl: {},
        context: {
            default: 'teacher-pc'
        }
    },
    data: function () {
        return {
            uploadUrl: null,
            formData: {},
            context: 'test',
            fileUrls: [],
            disabled: false,
            tip: '只能上传jpg/png文件，且不超过500Kb',
            innerFileList: [],
            fileList: [],
            maxCount: 3,
        };
    },
    methods: {
        handlePreview: function (file) {
            window.open(file.url);
        },
        beforeUpload: function (file) {
            this.ossContext = this.context;
            if (file.size / 1024 > this.sizeLimit) {
                alert('超过限制大小');
                return false;
            }
            var component = this;
            return this.$http.get('/uploader/default/get-oss-token?context=' + this.context).then(function (data) {
                var tokenObj = JSON.parse(data.bodyText);
                component.uploadUrl = tokenObj['host'] || '';
                component.formData = {
                    'key': component.context + '/' + dz.utils.getRandomString() + '.jpg',
                    'policy': tokenObj['policy'] || '',
                    'OSSAccessKeyId': tokenObj['accessid'] || '',
                    'success_action_status': '200',
                    'callback': tokenObj['callback'] || '',
                    'signature': tokenObj['signature'] || '',
                };

                component.fileUrls[file.uid] = {
                    url: tokenObj['host'] + '/' + component.formData.key,
                    name: file.name
                };
            });
        },
        afterUpload: function (response, file, fileList) {
            if (fileList.length >= this.maxCount) {
                this.disabled = true;
            }
            var newFileList = [];
            dz.utils.foreach(this.fileUrls, function (key, item) {
                newFileList.push({
                    name: item.name,
                    url: item.url
                });
            });
            this.$emit('update:fileList', newFileList);
            this.$emit('getfilelist', newFileList);
        },
        onRemove: function (file, fileList) {
            if (fileList.length < this.maxCount) {
                this.disabled = false;
            }
            var newFileList = [];
            var _fileUrls = this.fileUrls;
            dz.utils.foreach(this.fileUrls, function (key, item) {
                if (item.url != file.url) {
                    newFileList.push({
                        name: item.name,
                        url: item.url
                    });
                } else {
                    delete(_fileUrls[key]);
                }
            });
            this.$emit('update:fileList', newFileList);
            this.$emit('getfilelist', newFileList);
        },
    },
});

/**
 * 头像上传按钮
 * image-url:头像地址
 * tips：上传失败提示信息
 * size-limit 上传大小限制 KB
 *
 */
Vue.component('dz-upload-avatar', {
    template: '<div><el-upload :data="formData" class="avatar-uploader" :show-file-list="false" :multiple="false" :action="uploadUrl" :before-upload="beforeUpload" :on-success="afterUpload" ><img v-if="imageUrl" :src="imageUrl" class="avatar"><i v-else class="el-icon-plus avatar-uploader-icon" v-loading.body="loading"></i></el-upload></div>',
    props: {
        tips: {},
        fileList: {},
        sizeLimit: {},
        imageUrl: {},
        context: {
            default: 'teacher-pc'
        },
        test: {}
    },
    data: function () {
        return {
            imageUrl: '',
            uploadUrl: '',
            formData: {},
            fileUrl: '',
            ossContext: 'test',
            loading: false,
            fileName: '',
        }
    },
    mounted: function () {
        console.log(this.context)
    },
    methods: {
        beforeUpload: function (file) {
            this.ossContext = this.context;
            if (file.size / 1024 > this.sizeLimit) {
                this.$message.error(this.tips);
                return false;
            }

            this.loading = true;
            var component = this;
            return this.$http.get('/uploader/default/get-oss-token?context=' + this.ossContext).then(function (data) {
                var tokenObj = JSON.parse(data.bodyText);
                component.uploadUrl = tokenObj['host'] || '';
                component.fileName = dz.utils.getRandomString() + '.jpg';
                component.formData = {
                    'key': component.ossContext + '/' + component.fileName,
                    'policy': tokenObj['policy'] || '',
                    'OSSAccessKeyId': tokenObj['accessid'] || '',
                    'success_action_status': '200',
                    'callback': tokenObj['callback'] || '',
                    'signature': tokenObj['signature'] || '',
                };

                component.fileUrl = tokenObj['host'] + '/' + component.formData.key;
            });
        },
        afterUpload: function (response, file, fileList) {
            this.$emit('update:imageUrl', this.fileUrl);
            this.loading = false;
        },

        setOssParams: function (data) {
            var tokenObj = JSON.parse(data);
            this.uploadUrl = tokenObj.host;
            this.fileName = dz.utils.getRandomString() + '.jpg';
            this.formData = {
                'key': this.ossContext + '/' + this.fileName,
                'policy': tokenObj.policy || '',
                'OSSAccessKeyId': tokenObj.accessid || '',
                'success_action_status': '200',
                'callback': tokenObj.callback || '',
                'signature': tokenObj.signature || '',
            };

            this.fileUrl = tokenObj['host'] + '/' + this.ossContext + '/' + this.fileName;

        }
    },

});


/**
 * 上传照片组件
 * image-url:头像地址
 * tips：上传失败提示信息
 * size-limit 上传大小限制 KB
 *
 */
Vue.component('dz-upload-photo', {
    template: ' <el-upload :data="formData"  class="avatar-uploader" :show-file-list="false" :multiple="false" :action="uploadUrl" :before-upload="beforeUpload" :on-success="afterUpload" ><div v-if="imageUrl" class="photoBox"><img  :src="imageUrl.url" class="avatar"><input :placeholder="placeholder" class="photo-ipt" v-on:click.stop="handlePrevent" v-model="imageUrl.name"></input></div><i v-else class="el-icon-plus avatar-uploader-icon" v-loading.body="loading"></i></el-upload>',
    props: {
        tips: {},
        fileList: {},
        sizeLimit: {},
        imageUrl: {},
        context: {
            default: 'teacher-pc'
        },
        test: {},
        placeholder: {}
    },
    data: function () {
        return {
            iptHtml: '',
            imageUrl: '',
            uploadUrl: '',
            formData: {},
            fileUrl: '',
            ossContext: 'photo',
            loading: false,
            fileName: '',
        }
    },
    mounted: function () {
        // document.on('.el-input','click', function () {
        // console.log(123);
        // })
    },
    methods: {
        handlePrevent: function () {

        },
        beforeUpload: function (file) {
            if (file.size / 1024 > this.sizeLimit) {
                this.$message.error(this.tips);
                return false;
            }

            this.loading = true;
            var component = this;
            return this.$http.get('/uploader/default/get-oss-token?context=' + this.context).then(function (data) {
                var tokenObj = JSON.parse(data.bodyText);
                component.uploadUrl = tokenObj['host'] || '';
                component.fileName = dz.utils.getRandomString() + '.jpg';
                component.formData = {
                    'key': component.context + '/' + component.fileName,
                    'policy': tokenObj['policy'] || '',
                    'OSSAccessKeyId': tokenObj['accessid'] || '',
                    'success_action_status': '200',
                    'callback': tokenObj['callback'] || '',
                    'signature': tokenObj['signature'] || '',
                };
                var arr = file.name.split('\.');//通过\分隔字符串，成字符串数组
                var fileName = arr[0];//取最后一个，就是文件名
                component.fileUrl = {url: tokenObj['host'] + '/' + component.formData.key, name: fileName}
            });
        },
        afterUpload: function (response, file, fileList) {
            this.$emit('update:imageUrl', this.fileUrl);
            this.loading = false;
        },

        setOssParams: function (data) {
            var tokenObj = JSON.parse(data);
            this.uploadUrl = tokenObj.host;
            this.fileName = dz.utils.getRandomString() + '.jpg';
            this.formData = {
                'key': this.context + '/' + this.fileName,
                'policy': tokenObj.policy || '',
                'OSSAccessKeyId': tokenObj.accessid || '',
                'success_action_status': '200',
                'callback': tokenObj.callback || '',
                'signature': tokenObj.signature || '',
            };

            this.fileUrl = tokenObj['host'] + '/' + this.context + '/' + this.fileName;

        }
    },

});

/**
 * 上传活动图片组件
 * image-url:头像地址
 * tips：上传失败提示信息
 * size-limit 上传大小限制 KB
 *
 */
Vue.component('dz-upload-active-photo', {
    template: ' <el-upload :data="formData"  class="avatar-uploader ptoBox" :show-file-list="false" :multiple="false" :action="uploadUrl" :before-upload="beforeUpload" :on-success="afterUpload" ><div v-if="imageUrl" class="photoBox"><img  :src="imageUrl.url" class="avatar"><textarea class="photo-text" v-on:click.stop="handlePrevent" v-model="imageUrl.describe" :placeholder="placeholder"></textarea></div><i v-else class="el-icon-plus avatar-uploader-icon" v-loading.body="loading"></i></el-upload>',
    props: {
        tips: {},
        fileList: {},
        sizeLimit: {},
        imageUrl: {},
        context: {
            default: 'teacher-pc'
        },
        test: {},
        placeholder: {}
    },
    data: function () {
        return {
            iptHtml: '',
            imageUrl: '',
            uploadUrl: '',
            formData: {},
            fileUrl: '',
            ossContext: 'photo',
            loading: false,
            fileName: '',
        }
    },
    mounted: function () {
        // document.on('.el-input','click', function () {
        // console.log(123);
        // })
    },
    methods: {
        handlePrevent: function () {

        },
        beforeUpload: function (file) {
            this.ossContext = this.context;
            if (file.size / 1024 > this.sizeLimit) {
                this.$message.error(this.tips);
                return false;
            }

            this.loading = true;
            var component = this;
            return this.$http.get('/uploader/default/get-oss-token?context=' + this.context).then(function (data) {
                var tokenObj = JSON.parse(data.bodyText);
                component.uploadUrl = tokenObj['host'] || '';
                component.fileName = dz.utils.getRandomString() + '.jpg';
                component.formData = {
                    'key': component.context + '/' + component.fileName,
                    'policy': tokenObj['policy'] || '',
                    'OSSAccessKeyId': tokenObj['accessid'] || '',
                    'success_action_status': '200',
                    'callback': tokenObj['callback'] || '',
                    'signature': tokenObj['signature'] || '',
                };

                component.fileUrl = {url: tokenObj['host'] + '/' + component.formData.key, describe: ''}
            });
        },
        afterUpload: function (response, file, fileList) {
            this.$emit('update:imageUrl', this.fileUrl);
            this.loading = false;
        },

        setOssParams: function (data) {
            var tokenObj = JSON.parse(data);
            this.uploadUrl = tokenObj.host;
            this.fileName = dz.utils.getRandomString() + '.jpg';
            this.formData = {
                'key': this.ossContext + '/' + this.fileName,
                'policy': tokenObj.policy || '',
                'OSSAccessKeyId': tokenObj.accessid || '',
                'success_action_status': '200',
                'callback': tokenObj.callback || '',
                'signature': tokenObj.signature || '',
            };

            this.fileUrl = tokenObj['host'] + '/' + this.ossContext + '/' + this.fileName;

        }
    },

});


/**
 * 分页控件
 * <dz-pager :pager="pager"></dz-pager>
 *  pager={
 * 	count:总数，
 * 	currentPage:当前页数
 * 	pageSize:每页显示数量
 * 	url:'url'当前页面 相对地址
 * }
 */
Vue.component('dz-pager', {
    template: '<el-pagination layout="pager" :page-size="pager.pageSize" :current-page="pager.currentPage" @current-change="pagerChange" :total="pager.count"></el-pagination>',
    props: ['pager'],
    data: function () {
        return {}
    },
    methods: {
        pagerChange: function (currentPage) {
            window.location.href = this.pager.url + "?page=" + currentPage;
        }

    },
});

/**
 * 完整分页控件
 * <dz-pager-all :pager="pager"></dz-pager-all>
 * pager={
 * 	count:总数，
 * 	currentPage:当前页数
 * 	pageSize:每页显示数量
 * 	url:'url'当前页面 相对地址
 * }
 */
Vue.component('dz-pager-all', {
    template: '<el-pagination v-show="pager.count"  layout="total, prev, pager, next, jumper" :page-size="pager.pageSize" :current-page="pager.currentPage" @current-change="pagerChange" :total="pager.count"></el-pagination>',
    props: ['pager'],
    data: function () {
        return {}
    },
    methods: {
        pagerChange: function (currentPage) {
            if (this.pager.url.indexOf('?') > -1) {
                var pageIndex = this.pager.url.indexOf('&page=');
                if (pageIndex > -1) {
                    this.pager.url = this.pager.url.substring(0, pageIndex);
                }
                window.location.href = this.pager.url + "&page=" + currentPage;
            } else {
                window.location.href = this.pager.url + "?page=" + currentPage;
            }

        },
        handleSizeChange: function (size) {
            window.location.href = this.pager.url + "?pageSize=" + size;
        }

    },
});

/**
 * 发送短信验证码控件
 *
 * @code-url 发送验证码url
 * @mobile 手机
 * @count-down 倒计时秒数
 * <dz-sms-code-button code-url="/product/send-sms-code" mobile="18883137025" count-down="5"></dz-sms-code-button>
 *
 */
Vue.component('dz-sms-code-button', {
    template: ' <el-button class="code-btn" type="primary" :disabled="disabled" @click="fetchSmsCode" >{{buttonText}}</el-button>',
    props: ['codeUrl', 'countDown', 'mobile'],
    data: function () {
        return {
            buttonText: '获取验证码',
            disabled: false,
            countDownTimer: null,
            counter: 0
        };
    },
    methods: {
        fetchSmsCode: function () {
            if ((this.mobile || '') == '') {
                this.$message.error('请先填写手机号码');
                return;
            } else if (!/^1\d{10}$/.test(this.mobile)) {
                this.$message.error('请先填写正确的手机号码');
                return;
            }

            this.disabled = true;
            this.buttonText = (this.countDown || 60) + "秒后重发";
            this.counter = parseInt(this.countDown || 60);
            var component = this;
            this.countDownTimer = setInterval(function () {
                component.counter--;
                component.buttonText = component.counter + "秒后重发";
                if (component.counter <= 0) {
                    component.reset();
                }
            }, 1000);
            this.$http.post(this.codeUrl, {

                mobile: this.mobile

            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                emulateJSON: true
            }).then(function (data) {
                var returnInfo = JSON.parse(data.bodyText);
                if (returnInfo.code != 0) {
                    component.$message.error(returnInfo.msg);
                    component.reset();
                }
            });
        },
        reset: function () {
            this.disabled = false;
            this.buttonText = "获取验证码";
            clearInterval(this.countDownTimer);

        }
    },
});

/**
 * 选择城市级联
 *@city-id  城市ID
 *
 *<dz-city-select :city-id.sync="cityId"></dz-city-select>
 */
Vue.component('dz-city-select', {
    template: '<div><el-select @change="provinceChange" v-model="provinceId" filterable placeholder="选择省份"><el-option v-for="item in provinces" :key="item.id" :label="item.name" :value="item.id"></el-option></el-select><span style="width:20px;display: inline-block;"></span><el-select @change="cityChange" v-model="cityId" filterable placeholder="选择城市"><el-option v-for="city in cities" :key="city.id" :label="city.name" :value="city.id"></el-option></el-select></div>',
    props: ['cityId'],
    data: function () {
        return {
            provinces: [],
            cities: [],
            provinceId: '',
            cityId: '',
        };
    },
    methods: {
        provinceChange: function (val) {
            this.$http.get('/city/v1/get-sub-cities', {
                params: {
                    id: val
                }
            }).then(function (data) {
                var result = JSON.parse(data.bodyText);
                this.cities = result.content;
                this.cityId = this.cities[0].id;
            });
        },
        cityChange: function (val) {
            this.$emit('update:cityId', val);
        }
    },
    mounted: function () {
        if (this.cityId != '') {
            this.$http.get('/city/v1/get-city-context', {
                params: {
                    id: this.cityId
                }
            }).then(function (data) {
                var result = JSON.parse(data.bodyText);
                this.provinces = result.content.provinces;
                this.cities = result.content.cities;
                this.provinceId = result.content.provinceId + '';
            });
        } else {
            this.$http.get('/city/v1/get-all-provinces').then(function (data) {
                var result = JSON.parse(data.bodyText);
                this.provinces = result.content;
            });
        }
    }
});

/**
 * 年级班级联级选择器
 *  <dz-grade-select :grades-id.sync="searchData.grade" :classes-id.sync="searchData.classes"></dz-grade-select>
 * grades-id:年级id
 *classes-id:班级id
 *
 */
Vue.component('dz-grade-select', {
    template: '<div style="display: inline-block"><el-select v-model="gradeId" style="margin-right: 4px;" placeholder="选择年级" @change="gradeChange">' +
    '<el-option v-for="item in gradeOptions" :key="item.id" :label="item.label" :value="item.id"></el-option>' +
    '</el-select>' +
    '<el-select v-model="classId" placeholder="选择班级" @change="classChange">' +
    '<el-option v-for="item in classOptions" :key="item.id" :label="item.label" :value="item.id"></el-option>' +
    '</el-select></div>',
    props: ['gradesId', 'classesId'],
    data: function () {
        return {
            gradeOptions: [],
            classOptions: [],
            gradeId: '',
            classId: ''
        };
    },
    methods: {
        gradeChange: function (val) {
            if (val != this.gradesId) {
                this.classId = '';
            }
            var _this = this;
            this.$emit('update:gradesId', val);
            _this.classOptions = [],
                _this.$http.post('/grade/v1/get-class', {
                    gradeId: val
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    emulateJSON: true
                }).then(function (data) {
                    var result = JSON.parse(data.bodyText);
                    dz.utils.foreach(result.content, function (key, val) {
                        _this.classOptions.push({
                            id: key,
                            label: val
                        });
                    });
                    //默认班级
                    // if(this.classId=='') {
                    // 	this.classId = _this.classOptions[0].id;
                    // }
                })
        },
        classChange: function (val) {
            this.$emit('update:classesId', val);
        }
    },
    mounted: function () {
        this.gradeId = this.gradesId;
        this.classId = this.classesId;
        var _this = this;
        _this.$http.post('/grade/v1/get-all-grade', {
            params: {
                id: this.gradeId
            }
        }).then(function (data) {
            var result = JSON.parse(data.bodyText);
            dz.utils.foreach(result.content, function (key, val) {
                _this.gradeOptions.push({
                    id: key,
                    label: val
                });
            });
        });
    }
});

/**
 * 选择省份
 *@city-id  城市ID
 *
 *<dz-province-select :province-id="provinceId"></dz-province-select>
 */
Vue.component('dz-province-select', {
    template: '<div><el-select @change="provinceChange" v-model="provinceId" filterable placeholder="选择省份"><el-option v-for="item in provinces" :key="item.id" :label="item.name" :value="item.id"></el-option></el-select></div>',
    props: ['provinceId'],
    data: function () {
        return {
            provinces: [],
            provinceId: ''
        };
    },
    methods: {
        provinceChange: function (val) {
            this.$emit('update:provinceId', val);
        },
    },
    mounted: function () {
        this.$http.get('/city/v1/get-all-provinces').then(function (data) {
            var result = JSON.parse(data.bodyText);
            this.provinces = result.content;
        });
    }
});


/**
 * 时间选择器
 * <dz-time-picker :step="step" :date.sync="date"></dz-time-picker>
 * start：初试时间
 * step：步长
 * end：结束时间
 * date：传入的值
 * placeholder：提示文字
 */
Vue.component('dz-time-picker', {
    template: '<el-time-select v-model="date" :placeholder="placeholder" :picker-options="pickerOptions"></el-time-select>',
    props: {
        start: {
            type: String,
            default: '00:00'
        },
        end: {
            type: String,
            default: '24:00'
        },
        step: {
            type: String,
            require: true
        },
        date: {
            type: String,
            require: true
        },
        placeholder: {
            type: String,
            default: '选择时间'
        }
    },
    data: function () {
        return {
            pickerOptions: {}
        }
    },
    created: function () {
        this.pickerOptions = {
            start: this.start,
            step: this.step,
            end: this.end
        };
        console.log(this.placeholderText)
    }
})

/**
 * 日期选择器，自动把绑定值转化为timestamp格式
 *@city-id  城市ID
 *handler-change function()
 *<dz-date-picker :date.sync="1498492800"></dz-date-picker>
 */
Vue.component('dz-date-picker', {
    template: ' <el-date-picker v-model="innerDate" format="yyyy-MM-dd" @change="change" type="date" placeholder="选择日期" picker-options="pickerOptions0"></el-date-picker>',
    props: ['date', 'handlerChange'],
    data: function () {
        return {
            innerDate: '',
            pickerOptions0: {
                disabledDate: function (time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            }
        };
    },
    methods: {
        change: function (val) {
            // val = new Date(Date.parse(val.replace(/-/g, "/")));
            // this.date = val.getTime() / 1000;
            // modified by gonglong 20180425, 日期转换, 如: '2018-04-05' --> 1522857600
            this.date = parseInt(moment(val, 'YYYY-MM-DD').format('X'), 10)
            console.log(this.date)
            this.$emit('update:date', this.date);
            if (this.handlerChange) {
                this.handlerChange();
            }

        }
    },
    mounted: function () {
        if (this.date) {
            this.innerDate = (parseInt(this.date) * 1000);
        } else {
            this.innerDate = "";
        }


    },
    watch: {
        date: function (val) {
            if (val == '') {
                this.innerDate = '';
            }
        }
    }
});

/**
 * 日期段选择器，自动把绑定值转化为timestamp格式
 *@date :[]时间
 *handler-change function()
 *<dz-date-pickers :date.sync="1498492800"></dz-date-pickers>
 */
Vue.component('dz-date-pickers', {
    template: ' <el-date-picker v-model="innerDate" range-separator=" ~ " format="yyyy-MM-dd" @change="change" type="daterange" placeholder="选择日期" picker-options="pickerOptions0"></el-date-picker>',
    props: ['date', 'handlerChange'],
    data: function () {
        return {
            innerDate: '',
            pickerOptions0: {
                disabledDate: function (time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            }
        };
    },
    methods: {
        change: function (val) {
            var dates = val.split(' ~ ');
            var okDate = [];
            dz.utils.foreach(dates, function (key, value) {
                // modified by gonglong 20180425, 日期转换, 如: '2018-04-05' --> 1522857600
                // okDate.push(Date.parse(value) / 1000)
                okDate.push(parseInt(moment(value, 'YYYY-MM-DD').format('X'), 10))
            });
            this.$emit('update:date', okDate);
            if (this.handlerChange) {
                this.handlerChange();
            }
        }
    },
    created: function () {
        var _this = this;
        var timer = setInterval(function () {
            if (_this.date.length > 0) {
                var dates = [];
                clearInterval(timer);
                dz.utils.foreach(_this.date, function (key, value) {
                    dates.push(value * 1000);
                });
                if (_this.date != '') {
                    _this.innerDate = dates;
                    // this.innerDate.setTime(parseInt(this.date) * 1000);
                } else {
                    _this.innerDate = _this.date;
                }
            }
        }, 200)


    }
});

//日期选择器，日期时间格式的，用法同上
Vue.component('dz-datetime-picker', {
    template: ' <el-date-picker v-model="innerDate" format="yyyy-MM-dd HH:mm" @change="change" type="datetime" placeholder="选择日期" picker-options="pickerOptions0"></el-date-picker>',
    props: ['date', 'handlerChange'],
    data: function () {
        return {
            innerDate: '',
            pickerOptions0: {
                disabledDate: function (time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            }
        };
    },
    methods: {
        change: function (val) {
            // modified by gonglong 20180425, 日期转换, 如: '2018-04-05' --> 1522857600
            // var timestamp = Date.parse(val);
            // this.date = timestamp / 1000;
            this.date = parseInt(moment(val, 'YYYY-MM-DD HH:mm').format('X'), 10)
            if (isNaN(this.date)) {
                this.date = ''
            }
            this.$emit('update:date', this.date);
            if (this.handlerChange) {
                this.handlerChange();
            }
        }
    },
    mounted: function () {
        if (this.date !== '') {
            this.innerDate = new Date();
            this.innerDate.setTime(parseInt(this.date) * 1000);
        }
    },
    watch: {
        date: function (val) {
            if (val != 'undefined') {
                this.innerDate = new Date();
                this.innerDate.setTime(parseInt(this.date) * 1000);
            }
        }
    }
});


/**
 * 搜索、重置按钮组件
 *url  相对路径url
 *search-data 搜索数据
 *<dz-search-btn search-data.sync='' url="11"></dz-search-btn>
 */
Vue.component('dz-search-btn', {
    template: ' <div style="display: inline-block"><el-button type="primary" @click="handleSearch">搜索</el-button> <el-button @click="handleRestSearch">重置</el-button></div>',
    props: ['url', 'searchData'],
    data: function () {
        return {};
    },
    methods: {
        handleSearch: function () {
            var none = false;
            dz.utils.foreach(this.searchData, function (key, value) {
                if (value.length != 0) {
                    none = true
                }
            });
            if (none) {
                if (this.url.indexOf('/') === 0) {
                    window.location.href = this.url + '?' + dz.utils.buildSearchQueryFromJson(this.searchData);
                } else {
                    window.location.href = '/' + this.url + '?' + dz.utils.buildSearchQueryFromJson(this.searchData);
                }
            } else {
                this.$message({
                    type: 'warning',
                    message: '搜索内容不能为空！'
                })
            }

        },
        handleRestSearch: function () {
            if (this.url.indexOf('/') === 0) {
                window.location.href = this.url;
            } else {
                window.location.href = '/' + this.url;
            }

        }
    },
});

/**
 *  倒计时工具：显示剩余时间
 *  endTime：结束时间的时间戳
 *  endText：结束后显示的文字
 *  用法：<dz-count-down :end-time="1499394503" end-text="已过期" count-down-format="s"></dz-count-down>
 *  countDownFormat：表示要显示的倒计时最小单位的格式(有 天(d)/时(h)/分(m)/秒(s)，默认为秒)
 *
 */

Vue.component('dz-count-down', {
    template: ' <p>{{content}}</p>',
    props: ['endTime', 'endText', 'countDownFormat'],
    data: function () {
        return {
            content: '开始倒计时',
            loading: false,
        }
    },
    mounted: function () {
        this.countdowm(this.endTime)
    },
    methods: {
        countdowm: function (timestamp) {
            //timestamp为时间戳
            "use strict";
            var self = this;
            var timer = setInterval(function () {
                var nowTime = new Date();
                var endTime = new Date(timestamp * 1000);
                var t = endTime.getTime() - nowTime.getTime();
                var countDownFormat = self.countDownFormat;
                switch (countDownFormat) {
                    case 'd':
                        //在最小单位为天时执行
                        if (t > 0) {
                            var day = Math.floor(t / 86400000);
                            var format = '';
                            if (day > 0) {
                                format = ("剩余时间：" + day + "天");
                            }
                            if (day <= 0) {
                                format = ("剩余时间：<1天");
                            }
                            self.content = format;
                            console.log(format);
                        } else {
                            clearInterval(timer);
                            self.content = self.endText;
                            self.reSet_callback();
                        }
                        break;
                    case 'h':
                        //在最小单位为小时时执行
                        if (t > 0) {
                            var day = Math.floor(t / 86400000);
                            var hour = Math.floor((t / 3600000) % 24);
                            hour = hour < 10 ? "0" + hour : hour;
                            var format = '';
                            if (day > 0) {
                                format = ("剩余时间：" + day + "天" + hour + "小时");
                            }
                            if (day <= 0 && hour > 0) {
                                format = ("剩余时间：" + hour + "小时");
                            }
                            if (day <= 0 && hour <= 0) {
                                format = ("剩余时间：<1小时");
                            }
                            self.content = format;
                        } else {
                            clearInterval(timer);
                            self.content = self.endText;
                            self.reSet_callback();
                        }
                        break;

                    case 'm':
                        //在最小单位为分钟时执行
                        if (t > 0) {
                            var day = Math.floor(t / 86400000);
                            var hour = Math.floor((t / 3600000) % 24);
                            var min = Math.floor((t / 60000) % 60);
                            hour = hour < 10 ? "0" + hour : hour;
                            min = min < 10 ? "0" + min : min;
                            var format = '';
                            if (day > 0) {
                                format = ("剩余时间：" + day + "天" + hour + "小时" + min + "分");
                            }
                            if (day <= 0 && hour > 0) {
                                format = ("剩余时间：" + hour + "小时" + min + "分");
                            }
                            if (day <= 0 && hour <= 0) {
                                format = ("剩余时间：" + min + "分");
                            }
                            self.content = format;
                        } else {
                            clearInterval(timer);
                            self.content = self.endText;
                            self.reSet_callback();
                        }
                        break;

                    default:
                        //默认为秒
                        if (t > 0) {
                            var day = Math.floor(t / 86400000);
                            var hour = Math.floor((t / 3600000) % 24);
                            var min = Math.floor((t / 60000) % 60);
                            var sec = Math.floor((t / 1000) % 60);
                            hour = hour < 10 ? "0" + hour : hour;
                            min = min < 10 ? "0" + min : min;
                            sec = sec < 10 ? "0" + sec : sec;
                            var format = '';
                            if (day > 0) {
                                format = ("剩余时间：" + day + "天" + hour + "小时" + min + "分" + sec + "秒");
                            }
                            if (day <= 0 && hour > 0) {
                                format = ("剩余时间：" + hour + "小时" + min + "分" + sec + "秒");
                            }
                            if (day <= 0 && hour <= 0) {
                                format = ("剩余时间：" + min + "分" + sec + "秒");
                            }
                            self.content = format;
                        } else {
                            clearInterval(timer);
                            self.content = self.endText;
                            self.reSet_callback();
                        }
                        break;
                }
            }, 1000);
            return {};
        },
        reSet_callback: function () {

            if (this.callback && this.callback instanceof Function) {
                this.callback.apply($traceurRuntime.spread(this));
            }

        }

    }
});

/**
 * 适用于输入控件的回车事件处理
 * v-enter @enter.native="handler"
 */
Vue.directive('enter', {
    bind: function (el, binding, vnode) {
        var input = el.getElementsByTagName('input')[0];

        input.addEventListener('keypress', function (e) {
            var key = e.which || e.keyCode;

            if (key === 13) {
                el.dispatchEvent(new Event('enter'));
                e.preventDefault();

            }
        });
    },
});

/**
 * 图片点击放大
 *
 * img-list:图片url []
 */
Vue.component('dz-preview-img', {
    template: '<div class="largeImg"><img class="img-list" @click="showBigImg(index)"    v-for="(item, index) in imgList" :src="item">' +
    '<el-dialog size="full"   :visible.sync="dialogTableVisible">' +
    '<el-carousel :initial-index="index" height="70vh" autoplay="false">' +
    '<el-carousel-item  v-for="urlItem in imgList"  ><img class="img-power" :src="urlItem" alt=""></el-carousel-item></el-carousel></el-dialog> </div>',
    props: ['imgList'],
    data: function () {
        return {
            dialogTableVisible: false,
            index: 0
        }
    },
    mounted: function () {

    },
    methods: {
        showBigImg: function (item) {
            this.index = item;
            this.dialogTableVisible = true;
        }
    }
});

var dz = dz || {};

dz.validator = {
    //验证身份证号码格式
    checkId: function (rules, value, callback) {
        if (value === '') {
            callback(new Error('请输入身份证号码'));
        } else if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
            callback(new Error('请输入正确的身份证号码'));
        } else {
            callback();
        }
    },

    //验证手机号码
    mobile: function (rules, value, callback) {
        if (!/^1\d{10}$/.test(value)) {
            callback(new Error('请输入正确的手机号码'));
        } else {
            callback();
        }
    },
    //验证邮箱格式
    checkEmail: function (rules, value, callback) {
        if (value === '') {
            callback(new Error('请输入邮箱地址'));
        } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
            callback(new Error('请输入正确的邮箱地址'));
        } else {
            callback();
        }
    },

    //验证QQ号码
    checkQQ: function (rules, value, callback) {
        if (value === '') {
            callback(new Error('请输入QQ号码'));
        } else if (!/[1-9][0-9]{4,}/.test(value)) {
            //腾讯QQ从10000开始
            callback(new Error('请输入正确的QQ号码'));
        } else {
            callback();
        }
    },
    //验证微信
    checkWX: function (rules, value, callback) {
        if (value === '') {
            callback(new Error('请输入微信号码'));
        } else if (!/^[a-zA-Z][a-zA-Z0-9_]{5,11}$/.test(value)) {
            callback(new Error('请输入正确的微信号码'));
        } else {
            callback();
        }
    },
    //带小数的格式

    rate: function (rules, value, callback) {
        if (!/^(([12]?[0-9](\.[0-9]{1,2})?)|30)$/.test(value)) {
            callback(new Error('请输入正确的整数或者小数格式,且返利点不可大于30%'));
        } else {
            callback();
        }
    },

    money: function (rules, value, callback) {
        if (!/^[0-9]+(\.\d+)?$/.test(value)) {
            callback(new Error('请输入正确的整数或者小数格式'));
        } else {
            callback();
        }
    }
};

dz.utils = {
    /**
     * 有搜索的分页组件URL拼接
     *searchData搜索数据
     */
    pagerSeachUrl: function (url, searchData) {
        var content = false;
        dz.utils.foreach(searchData, function (key, val) {
            if (key != 'type') {
                if (val != '') {
                    return content = true
                }
            }
        });
        if (content) {
            url += "?" + dz.utils.buildSearchQueryFromJson(searchData)
        }
        return url
    },


    /**
     * 生成随机字符串
     * @param len
     * @returns {string}
     */
    getRandomString: function (len) {
        var len = len || 32;
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },

    GetQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },

    /**
     * 从json数据生成URL查询字符串
     * @param obj
     */
    buildQueryFromJson: function (obj) {
        var queryString = [];
        for (var key in obj) {
            queryString.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
        }

        return queryString.join('&');
    },

    /**
     * 从json数据生成URL搜索查询字符串
     * @param obj
     */
    buildSearchQueryFromJson: function (obj) {
        var queryString = [];
        for (var key in obj) {
            queryString.push('searchData[' + encodeURIComponent(key) + "]=" + encodeURIComponent(obj[key]));
        }

        return queryString.join('&');
    },

    foreach: function (arr, func) {
        for (var i in arr) {
            if (func(i, arr[i]) === false) {
                return false;
            }
        }
        return true;
    },
    clone: function (obj) {
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0; i < obj.length; ++i) {
                copy[i] = dz.utils.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = dz.utils.clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    },
    //精确到分
    timestampToMText: function (value) {
        return moment(parseInt(value) * 1000).format('YYYY-MM-DD HH:mm')
    },

    //精确到秒
    timestampToLongText: function (value) {
        return moment(parseInt(value) * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    //时间戳转 xxxx-xx-xx
    timestampToshortText: function (value) {
        return moment(parseInt(value) * 1000).format('YYYY-MM-DD')
    },
    /**
     * 提示返回消息并刷新页面
     * @param type 消息类型string
     * @param msg 消息内容 string
     */
    showRemindRefreshPage: function (type, msg) {
        vue.$notify({
            title: '提示',
            message: msg,
            type: type,
            duration: '2000'
        });
        setTimeout(function () {
            window.location.reload(true);
        }, '2000');
    },
    /**
     * 提示返回消息
     * @param type 消息类型string
     * @param msg 消息内容 string
     */
    notify: function (type, title, msg, duration) {
        vue.$notify({
            title: title,
            message: msg,
            type: type,
            duration: duration ? duration : 2000
        })
    },
    /**
     * 提示消息
     * @param type 消息类型string
     * @param msg 消息内容 string
     */
    message: function (type, msg) {
        if (type == 'error') {
            vue.$message.error(msg);
        } else {
            vue.$message({
                type: type,
                message: msg
            })
        }
    }
}

Vue.filter('date',
    function (value) {
        return dz.utils.timestampToshortText(value)
    });
Vue.filter('time',
    function (value) {
        return dz.utils.timestampToLongText(value)
    });

//请求会以application/x-www-form-urlencoded作为MIME type
Vue.http.options.emulateJSON = true;

