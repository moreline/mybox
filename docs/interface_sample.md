### 接口名:

'/area/get-shool-list.json'

### 请求类型:

'post'

> // 入参

```json
{
    pageSize: 10, // {Number} 每页size
    currentPage: 2, // {Number} 当前页
    schoolName: "", // {String} 学校名
    masterName: "", // {String} 校长名
    schoolType: "", // {String} 办学类型
    schoolHost: "2" // {String} 学校办别
}
```

> // 出参

```bash
{
	code: 0 // 0为真, 其他为失败
	message: '',
	content: {
		pager: {
			'count':100,  	// {Number} 总数
			'pageSize': 20, // {Number} 当页数量
			'url': '/area/', // {String}请求的url
			'currentPage':1, // {String} 当前页
		},
		list: [
			{
				"id": "1001",
				"code": "学校代码-NKMS",
				"name": "南开小学",
				"higherSchool": "上级学校-南开中学",
				"nameInEn": "nankai primary school",

				"addr": "重庆市xx区",
				"postCode": "邮编-400101",
				"regionCode": "0579",		   // 学校区划码
				"bornDate": "2017-12-12",	   // 建校年月
				"celebrateDate": "2017-12-12", // 校庆日

				"schoolType": "2",	// 学校办学类型. '2': 小学 , '3': 初中, '4': 高中;
				"authority": "地级教育部门",    // 主管部门
				"corporateNo": "JCTB020120", // 法人代表
				"corporateLicense": "FR165132", // 法人证书号
				"headMaterNo": "XZ026",   // 校长工号

				"headMaterName": "1001",  // 校长姓名
				"partyLeaderNo": "1001",  // 党委负责人号
				"organizationCode": "932185476",  // 组织机构代码
				"tel": "6800000",  // 联系电话
				"fax": "6800000",  // 传真

				"email": "xxx@163.com",  		  // 电子邮箱
				"webHomepage": "http://sss.com",  // 主页地址
				"history": "历史悠久",  // 历史沿革
				"shcollHost": "2",      // 学校办别: '1': 普通中小学/职业中学, '2': 民办, '3':民办公助, '4': 公办;
				"higherAuthority": "同安区教育局",  // 所属主管单位(上级单位)

				"cityType": "主城区",  		  // 所在地城乡类型.
				"economyType": "非贫困",  	  // 所在地经济类型
				"minzuType": "非民族自治县",  // 所在地民族类型
				"primarySchCourse": "6年",    // 小学学制(period, course)
				"primarySchAge": "7周岁",     // 小学入学年龄

				"juniorMidSchCourse": "xxx",  // 初中学制 junior middle
				"juniorMidSchAge": "xxx",     // 初中入学年龄
				"seniorMidSchCourse": "xxx",  // 高中学制 senior middle
				"firstLanguage": "汉语",  // 主教学语言
				"secondLanguage": "汉语",  // 辅助教学语言

				"studentArea": " ",  // 招生半径
				"note": "无",  // 备注

				// 班级信息
				"classInfo": {
					//
				},
			}
		]
	},
}
```
